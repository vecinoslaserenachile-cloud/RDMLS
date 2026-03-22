import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { Camera, MapPin, AlertTriangle, ShieldCheck, CheckCircle2, Mic, Droplets, Zap, Wifi, X as CloseIcon, Maximize2, ArrowLeft, Users, ShieldAlert } from 'lucide-react';
import { socket } from '../utils/socket';
import AcousticReport from './AcousticReport';

export default function Citizens() {
    const navigate = useNavigate();
    const [step, setStep] = useState('category'); // category, details, success, evaluation
    const [report, setReport] = useState({ category: '', subcategory: '', photo: null, lat: null, lng: null, address: '', reference: '', isAnonymous: true, contactName: '', contactPhone: '' });
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const resetForm = () => {
        setStep('category');
        setReport({ category: '', subcategory: '', photo: null, lat: null, lng: null, address: '', reference: '', isAnonymous: true, contactName: '', contactPhone: '' });
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const categories = [
        { id: 'seguridad', label: 'Seguridad Ciudadana (Municipal/Carabineros)', icon: AlertTriangle, color: 'var(--alert-danger)', bg: 'rgba(239, 68, 68, 0.1)' },
        { id: 'municipal', label: 'Gestión Municipal Directa', icon: ShieldCheck, color: 'var(--brand-secondary)', bg: 'rgba(16, 185, 129, 0.1)' },
        { id: 'servicios_basicos', label: 'Servicios Básicos (Agua/Luz) - Rol Representante Municipal', icon: Zap, color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)' },
        { id: 'ambiental', label: 'Medio Ambiente y Salubridad', icon: Droplets, color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)' },
        { id: 'mediacion', label: 'Mediación Vecinal', icon: Users, color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)' },
        { id: 'telecom', label: 'Cables / Telecom', icon: Wifi, color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)' },
        { id: 'bordeCostero', label: 'Borde Costero / Concesión Marítima', icon: MapPin, color: '#0284c7', bg: 'rgba(2, 132, 199, 0.1)' },
        { id: 'acustica', label: 'Medidor Acústico', icon: Mic, color: 'var(--brand-accent)', bg: 'rgba(139, 92, 246, 0.1)' }
    ];

    // Subcategorías divididas ahora por competencia legal y técnica de un municipio
    const subcategories = {
        seguridad: [
            'Asalto / S.O.S (Derivación Carabineros/PDI)',
            'Comercio ambulante no autorizado',
            'Vehículos abandonados',
            'Robo de bienes nacionales de uso público',
            'Consumo de alcohol/drogas en vía pública'
        ],
        municipal: [
            'Baches y socavones (Bienes Nacionales)',
            'Veredas en mal estado',
            'Mobiliario urbano dañado (plazas, escaños)',
            'Falta de riego en plazas/parques',
            'Poda necesaria / Árbol en riesgo de caída',
            'Basurales o microbasurales municipales',
            'Luminarias municipales defectuosas'
        ],
        servicios_basicos: [
            'Corte de Suministro Eléctrico - Empresa Distribuidora',
            'Corte de Agua Potable - Empresa Sanitaria',
            'Rebalse Aguas Servidas - Empresa Sanitaria',
            'Agua Turbia o Mal Olor - Denuncia SISS'
        ],
        ambiental: [
            'Plagas en espacios públicos (roedores/vectores)',
            'Derrame de Riles Industriales',
            'Escombros ilegales en vía pública',
            'Maltrato o abandono animal (Ley Cholito)'
        ],
        mediacion: [
            'Ruidos molestos y reiterados',
            'Humo u olores invasivos',
            'Problemas con mascotas (ladridos/daños) compartidos',
            'Problemas de límites o convivencia vecinal'
        ],
        telecom: [
            'Cables cortados en vía pública - Rol Superintendencia SEC/SUBTEL',
            'Antena sospechosa o dañada',
            'Sin señal celular masiva'
        ],
        bordeCostero: [
            'Personas ahogándose (Derivación DGTM / Armada)',
            'Nado en zona no habilitada / Bandera Roja',
            'Pesca en zona no habilitada',
            'Mascotas en playa sin collar',
            'Daños a infraestructura de playa'
        ]
    };

    const handleCategorySelect = (categoryId) => {
        if (categoryId === 'acustica') {
            setStep('acustica');
            return;
        }
        setReport({ ...report, category: categoryId });
        setStep('details');
    };

    if (step === 'acustica') {
        return <AcousticReport />;
    }

    const handleSubcategorySelect = (sub) => {
        setReport({ ...report, subcategory: sub });
    };

    const handlePhotoCapture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onloadend = () => setReport({ ...report, photo: reader.result });
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error("Error al comprimir imagen", error);
        }
    };

    const requestLocationSystem = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocalización no soportada');
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
                    (err) => reject(err),
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            }
        });
    };

    const handleSubmit = async () => {
        if (!report.subcategory) {
            alert("Por favor seleccione un detalle específico.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Intentar obtener location real
            const loc = await requestLocationSystem();
            const alertData = { 
                ...report, 
                lat: loc.lat, 
                lng: loc.lng,
                timestamp: new Date().toISOString(),
                protocol: report.category === 'servicios_basicos' ? 'P-REPRESENTACION_LEGAL' : (report.category === 'seguridad' ? 'P-URGENTE' : 'P-DOMINIO_MUNICIPAL')
            };
            setReport(prev => ({ ...prev, lat: loc.lat, lng: loc.lng }));
            socket.emit('new_alert', alertData);
            setTimeout(() => { setIsSubmitting(false); setStep('success'); }, 1000);
        } catch (error) {
            // Fallback a coordenadas de La Serena (para demostración en dev)
            console.warn("Usando location fallback (Centro La Serena)");
            const lat = -29.90453 + (Math.random() * 0.01 - 0.005);
            const lng = -71.24894 + (Math.random() * 0.01 - 0.005);
            const alertData = { 
                ...report, 
                lat, 
                lng,
                timestamp: new Date().toISOString(),
                protocol: report.category === 'servicios_basicos' ? 'P-REPRESENTACION_LEGAL' : (report.category === 'seguridad' ? 'P-URGENTE' : 'P-DOMINIO_MUNICIPAL')
            };
            setReport(prev => ({ ...prev, lat, lng }));
            socket.emit('new_alert', alertData);
            setTimeout(() => { setIsSubmitting(false); setStep('success'); }, 1000);
        }
    };

    if (step === 'evaluation') {
        return (
            <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '60vh' }}>
                <div className="glass-panel animate-slide-up" style={{ padding: '3rem 2rem', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Evalúa tu experiencia</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>
                        ¿Qué tan sencillo fue realizar este reporte ciudadano?
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} className="btn-glass" style={{ padding: '0.75rem', fontSize: '1.5rem', borderRadius: '50%' }} onClick={resetForm}>
                                ⭐
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-glass" onClick={() => navigate('/')}>Saltar y Volver</button>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        const fakeTicketId = `VEC-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
        
        // Determinar destinatario segun categoria (aproximado)
        let targetEmail = 'oficinadepartes@laserena.cl';
        if (report.category === 'servicios_basicos') targetEmail = 'siss@siss.gob.cl,sec@sec.gob.cl';
        if (report.category === 'seguridad') targetEmail = 'denuncia@pazciudadana.cl,oficinadepartes@laserena.cl';
        if (report.category === 'telecom') targetEmail = 'subtel@subtel.gob.cl';

        const subject = encodeURIComponent(`Reporte Vecinal [${fakeTicketId}]: ${report.subcategory || 'Incidencia'}`);
        const bodyText = encodeURIComponent(
            `Estimados,\n\nMediante el Portal Vecinal independiente, remito el siguiente reporte para su conocimiento y gestión:\n\n` +
            `- ID Requerimiento: ${fakeTicketId}\n` +
            `- Categoría: ${report.category}\n` +
            `- Detalle Específico: ${report.subcategory}\n` +
            `- Comentarios del Vecino: ${report.details || 'Sin detalles extra'}\n` +
            `- Fecha/Hora: ${new Date().toLocaleString('es-CL')}\n\n` +
            `*NOTA: Este correo es generado como puente de articulación vecinal, copiando este registro en el Historial Ciudadano.*\n\n` +
            `Atentamente,\nUn vecino de La Serena`
        );
        const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${bodyText}`;

        return (
            <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '60vh' }}>
                <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', width: '100%', maxWidth: '500px', background: 'linear-gradient(145deg, rgba(15,23,42,0.9), rgba(30,41,59,0.95))', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                    <CheckCircle2 size={70} color="#10b981" style={{ margin: '0 auto 1.5rem', display: 'block' }} className="animate-slide-up pulse" />
                    
                    <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'white' }}>Requerimiento Preparado</h2>
                    <p style={{ color: '#38bdf8', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '2rem', padding: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', display: 'inline-block' }}>
                        ID: {fakeTicketId}
                    </p>
                    
                    <div style={{ textAlign: 'left', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                            <div style={{ color: '#38bdf8', marginTop: '2px' }}>✓</div>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                                <strong>Plataforma Puente:</strong> Como vecinos organizados, no representamos a las entidades. Actuamos como puente tecnológico para facilitar tu gestión y fiscalización.
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
                            <div style={{ color: '#f59e0b', marginTop: '2px' }}>✓</div>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                                <strong>Copia de Respaldo:</strong> Los datos del formulario (<strong style={{color: 'white'}}>{report.category}</strong>) han sido guardados en tu historial local.
                            </p>
                        </div>
                    </div>

                    <a 
                        href={mailtoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-success pulse" 
                        style={{ display: 'block', textDecoration: 'none', background: '#10b981', color: 'black', width: '100%', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '12px', fontWeight: 'bold', marginBottom: '1rem' }}
                    >
                        Generar/Enviar Correo Oficial
                    </a>

                    <button 
                        className="btn-glass" 
                        style={{ width: '100%', padding: '1rem', fontSize: '1rem', borderRadius: '12px', color: '#94a3b8' }}
                        onClick={() => navigate('/vecinos')}
                    >
                        Volver al Portal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            {isPreviewOpen && report.photo && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
                    <button className="btn-glass" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '1rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.4)' }} onClick={() => setIsPreviewOpen(false)}>
                        <CloseIcon size={32} color="white" />
                    </button>
                    <img src={report.photo} alt="Evidencia en pantalla completa" style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }} />
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 2rem', borderRadius: '50px', marginTop: '1.5rem' }}>
                        <p style={{ color: 'white', margin: 0, textAlign: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Evidencia Fotográfica: <span style={{ color: 'var(--brand-primary)' }}>{report.subcategory || 'Reporte Vecinal'}</span>
                        </p>
                    </div>
                </div>
            )}

            <header className="page-header" style={{ marginBottom: '1rem' }}>
                <button onClick={() => navigate('/')} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> Volver al Escritorio
                </button>
                <h2 className="text-gradient">{step === 'category' ? 'Smart Citizens' : 'Detalles del Reporte'}</h2>
                <p className="text-muted">
                    {step === 'category' ? 'Selecciona el tipo de evento para asistencia inmediata.' : 'Adjunta evidencia si es seguro hacerlo.'}
                </p>
            </header>

            {step === 'category' && (
                <>
                    {/* ACCESOS RÁPIDOS DE EMERGENCIA */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>🚨 ACCESOS RÁPIDOS (PRIORIDAD ALTA)</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                            <button className="btn btn-primary" style={{ background: 'var(--alert-danger)', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }} onClick={() => { setReport({ ...report, category: 'seguridad', subcategory: 'Asalto / S.O.S (Derivación Carabineros/PDI)' }); setStep('details'); }}>
                                <ShieldAlert size={28} /> <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Robo / Asalto</span>
                            </button>
                            <button className="btn btn-primary animate-pulse-slow" style={{ background: '#eab308', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', color: 'black', boxShadow: '0 4px 15px rgba(234, 179, 8, 0.4)' }} onClick={() => { setReport({ ...report, category: 'servicios_basicos', subcategory: 'Corte de Suministro Eléctrico - Empresa Distribuidora' }); setStep('details'); }}>
                                <Zap size={28} /> <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Corte de Luz</span>
                            </button>
                            <button className="btn btn-primary" style={{ background: '#0ea5e9', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)' }} onClick={() => { setReport({ ...report, category: 'servicios_basicos', subcategory: 'Rebalse Aguas Servidas - Empresa Sanitaria' }); setStep('details'); }}>
                                <Droplets size={28} /> <span style={{ fontSize: '0.85rem', fontWeight: 'bold', lineHeight: '1.2' }}>Rebalse / Agua</span>
                            </button>
                            <button className="btn btn-primary" style={{ background: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(100, 116, 139, 0.4)' }} onClick={() => { setReport({ ...report, category: 'telecom', subcategory: 'Sin señal celular masiva' }); setStep('details'); }}>
                                <Wifi size={28} /> <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Sin Señal Celular</span>
                            </button>
                        </div>
                    </div>

                    <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>📋 CATEGORÍAS GENERALES</h4>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '12px',
                        padding: '0.5rem 0'
                    }}>
                        {categories.map((cat, index) => {
                            // Hacemos que la Seguridad y Medidor Acústico ocupen 2 columnas si hay espacio
                            const isWide = cat.id === 'seguridad' || cat.id === 'acustica';

                            return (
                                <button key={cat.id}
                                    className="glass-panel"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'space-between',
                                        padding: '1.25rem',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        textAlign: 'left',
                                        background: cat.id === 'seguridad' || cat.id === 'acustica'
                                            ? `linear-gradient(135deg, ${cat.color} 0%, rgba(0,0,0,0.8) 100%)`
                                            : 'rgba(20, 30, 48, 0.7)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        gridColumn: isWide ? '1 / -1' : 'auto', // Ocupa todo el ancho disponible
                                        minHeight: '120px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                    }}
                                    onClick={() => handleCategorySelect(cat.id)}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 8px 25px ${cat.color}40`; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)'; }}
                                >
                                    {/* Fondo de ícono tenue gigante atrás */}
                                    <cat.icon size={80} color="white" style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.1, transform: 'rotate(-15deg)' }} />

                                    <div style={{
                                        padding: '0.5rem',
                                        borderRadius: '12px',
                                        background: cat.id === 'seguridad' || cat.id === 'acustica' ? 'rgba(255,255,255,0.2)' : cat.color,
                                        display: 'inline-flex',
                                        marginBottom: '1rem',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                                    }}>
                                        <cat.icon size={24} color="white" />
                                    </div>

                                    <div style={{ width: '100%', zIndex: 1 }}>
                                        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: 'white', fontWeight: 'bold', lineHeight: '1.2' }}>{cat.label}</h3>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.3' }}>
                                            {cat.id === 'seguridad' && 'Actuación conjunta con Carabineros y PDI. C5.'}
                                            {cat.id === 'municipal' && 'Baches, Plazas, Escombros, Poda, Luminarias Municipales.'}
                                            {cat.id === 'servicios_basicos' && 'Problemas de red sanitaria, eléctrica o telecomunicaciones (Rol Municipal Coordinador).'}
                                            {cat.id === 'ambiental' && 'Plagas, Derrame de Riles, Abandono Animal (Veterinaria).'}
                                            {cat.id === 'mediacion' && 'Solución Vecinal: Conflictos, ruidos menores, límites.'}
                                            {cat.id === 'telecom' && 'Cables SEC, Subtel, Antenas.'}
                                            {cat.id === 'bordeCostero' && 'Coordinación DGTM Armada, Salvavidas, Playas.'}
                                            {cat.id === 'acustica' && 'Medir decibeles del sector en vivo.'}
                                        </p>
                                    </div>

                                    {/* Ribete de color abajo (estilo Windows Metro) */}
                                    {cat.id !== 'seguridad' && cat.id !== 'acustica' && (
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: cat.color }}></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}

            {step === 'details' && report.category && (
                <div className="glass-panel animate-slide-up" style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Especificar Situación:</h4>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {subcategories[report.category].map(sub => (
                                <button key={sub}
                                    className={`btn ${report.subcategory === sub ? 'btn-primary' : 'btn-glass'}`}
                                    style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
                                    onClick={() => handleSubcategorySelect(sub)}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Ubicación y Referencias:</h4>
                        <input type="text" placeholder="Dirección o punto exacto (Ej. Balmaceda 1234)" value={report.address} onChange={e => setReport({ ...report, address: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', marginBottom: '0.5rem', outline: 'none' }} />
                        <input type="text" placeholder="Calles cercanas / Referencias" value={report.reference} onChange={e => setReport({ ...report, reference: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: report.isAnonymous ? '0' : '1rem' }}>
                            <input type="checkbox" checked={report.isAnonymous} onChange={e => setReport({ ...report, isAnonymous: e.target.checked })} style={{ width: '1.2rem', height: '1.2rem' }} />
                            <span style={{ color: 'white' }}>Reporte Anónimo</span>
                        </label>
                        {!report.isAnonymous && (
                            <div style={{ display: 'grid', gap: '0.5rem', animation: 'fadeIn 0.3s ease' }}>
                                <input type="text" placeholder="Tu nombre completo" value={report.contactName} onChange={e => setReport({ ...report, contactName: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                                <input type="tel" placeholder="Tu teléfono de contacto" value={report.contactPhone} onChange={e => setReport({ ...report, contactPhone: e.target.value })} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }} />
                            </div>
                        )}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Evidencia Fotográfica (Opcional):</h4>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handlePhotoCapture}
                        />
                        {report.photo ? (
                            <div style={{ position: 'relative', borderRadius: 'var(--border-radius-md)', overflow: 'hidden', height: '150px', cursor: 'pointer', border: '2px solid var(--brand-primary)' }} onClick={() => setIsPreviewOpen(true)}>
                                <img src={report.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Maximize2 color="white" size={36} className="pulse" />
                                </div>
                                <button className="btn btn-danger" style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.5rem', zIndex: 10 }}
                                    onClick={(e) => { e.stopPropagation(); setReport({ ...report, photo: null }); }}>
                                    <CloseIcon size={16} />
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-glass" style={{ width: '100%', padding: '2rem 1rem', borderStyle: 'dashed' }} onClick={() => fileInputRef.current.click()}>
                                <Camera size={32} style={{ marginBottom: '0.5rem' }} />
                                <span>Abrir Cámara (Ahorro de Datos)</span>
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-glass" style={{ flex: 1 }} onClick={resetForm}>Volver</button>
                        <button className="btn btn-primary" style={{ flex: 2, background: 'var(--alert-danger)' }} disabled={isSubmitting} onClick={handleSubmit}>
                            {isSubmitting ? 'Ubicando...' : 'Emitir S.O.S Central'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
