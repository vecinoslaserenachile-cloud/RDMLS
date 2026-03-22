import React, { useState, useEffect, useRef } from 'react';
import { 
    Mic, Send, AlertTriangle, CloudSun, Megaphone, 
    Camera, CheckCircle2, Volume2, ShieldCheck, 
    Smartphone, History, Activity, Zap, Wind, Navigation
} from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function SerenaMetAdmin({ onClose }) {
    const [activeTab, setActiveTab] = useState('console'); // console, field, climate
    const [injectionText, setInjectionText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [fieldReport, setFieldReport] = useState({ type: 'luminaria', desc: '' });
    const fileInputRef = useRef(null);

    // 1. INYECTORA DE LOCUTORES (Master Control)
    const handleInyectarLocucion = (priority = 'normal') => {
        if (!injectionText.trim()) return;
        setIsSending(true);
        
        // Dispatch event for GlobalAnnouncer
        window.dispatchEvent(new CustomEvent('vls-manual-announce', {
            detail: { text: injectionText, priority }
        }));

        setTimeout(() => {
            setIsSending(false);
            setInjectionText('');
            alert('📢 Locución Inyectada en la Red Municipal VLS');
        }, 1000);
    };

    // 2. CAPTURA DE CÁMARA (Regla de Backoffice Móvil)
    const handleCapture = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const options = { maxSizeMB: 0.8, maxWidthOrHeight: 1280, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onloadend = () => setCapturedPhoto(reader.result);
            reader.readAsDataURL(compressedFile);
        } catch (err) { console.error(err); }
    };

    const submitFieldReport = () => {
        if (!capturedPhoto) return alert('Debe capturar evidencia fotográfica obligatoriamente.');
        alert('✅ Reporte Administrativo enviado a central Serena Met.');
        setCapturedPhoto(null);
        setFieldReport({ type: 'luminaria', desc: '' });
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100100, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column' }}>
            
            {/* Header Administrativo */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '2px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '12px' }}>
                        <ShieldCheck size={24} color="#000" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900' }}>BACKOFFICE SERENA MET (Móvil)</h2>
                        <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>OPERADOR MUNICIPAL CERTIFICADO</div>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem 1rem', borderRadius: '12px' }}>CERRAR CONSOLA</button>
            </header>

            {/* Selector de Herramientas (Tab Bar) */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '0.5rem' }}>
                <button onClick={() => setActiveTab('console')} style={{ flex: 1, padding: '1rem', border: 'none', background: activeTab === 'console' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: activeTab === 'console' ? '#38bdf8' : '#94a3b8', borderBottom: activeTab === 'console' ? '2px solid #38bdf8' : 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    <Megaphone size={16} /> INYECTORA
                </button>
                <button onClick={() => setActiveTab('field')} style={{ flex: 1, padding: '1rem', border: 'none', background: activeTab === 'field' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: activeTab === 'field' ? '#38bdf8' : '#94a3b8', borderBottom: activeTab === 'field' ? '2px solid #38bdf8' : 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    <Camera size={16} /> REPORTE EN TERRENO
                </button>
                <button onClick={() => setActiveTab('climate')} style={{ flex: 1, padding: '1rem', border: 'none', background: activeTab === 'climate' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: activeTab === 'climate' ? '#38bdf8' : '#94a3b8', borderBottom: activeTab === 'climate' ? '2px solid #38bdf8' : 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    <CloudSun size={16} /> CLIMA & SMART
                </button>
            </div>

            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    
                    {/* ── CONSOLA DE INYECCIÓN ── */}
                    {activeTab === 'console' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '2rem', borderRadius: '24px' }}>
                                <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mic size={24} color="#38bdf8" /> Control de Locutores IA
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                                    Escriba la alerta de emergencia o boletín informativo. El sistema humanizará el texto y lo inyectará con prioridad Master sobre la música de la radio.
                                </p>
                                <textarea 
                                    value={injectionText}
                                    onChange={(e) => setInjectionText(e.target.value)}
                                    placeholder="Ej: 'Atención vecinos, se reporta corte de agua programado en sector Pedro Pablo Muñoz...'"
                                    style={{ width: '100%', height: '150px', background: '#000', border: '1px solid #38bdf830', borderRadius: '16px', padding: '1.5rem', color: 'white', resize: 'none', fontSize: '1.1rem', marginBottom: '2rem' }}
                                />
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button 
                                        onClick={() => handleInyectarLocucion('normal')}
                                        disabled={isSending || !injectionText}
                                        style={{ flex: 1, padding: '1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        BOLETÍN NORMAL
                                    </button>
                                    <button 
                                        onClick={() => handleInyectarLocucion('high')}
                                        disabled={isSending || !injectionText}
                                        style={{ flex: 1, padding: '1.2rem', borderRadius: '12px', background: '#38bdf8', color: '#000', fontWeight: 'bold', border: 'none' }}
                                    >
                                        INYECCIÓN CRÍTICA
                                    </button>
                                </div>
                            </div>

                            {/* Historial rápido (Muestras) */}
                            <div>
                                <h4 style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>PLANTILLAS RÁPIDAS</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {['Aviso Clima', 'Congestión Vial', 'Feria Vecinal', 'Seguridad'].map(tag => (
                                        <button key={tag} className="btn-glass" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', borderRadius: '20px' }} onClick={() => setInjectionText(`BOLETÍN V L S: ${tag} activo hoy.`)}>
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── REPORTE EN TERRENO (CÁMARA MÓVIL) ── */}
                    {activeTab === 'field' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0' }}>Captura de Incidencia Municipal</h3>
                                
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{ width: '100%', height: '250px', border: '2px dashed #38bdf8', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: capturedPhoto ? `url(${capturedPhoto}) center/cover` : 'rgba(56, 189, 248, 0.05)', overflow: 'hidden', position: 'relative' }}
                                >
                                    <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleCapture} style={{ display: 'none' }} />
                                    {!capturedPhoto && (
                                        <>
                                            <Camera size={48} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                                            <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>ABRIR CÁMARA</span>
                                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Obligatorio para registro in situ</span>
                                        </>
                                    )}
                                    {capturedPhoto && (
                                        <div style={{ position: 'absolute', bottom: 0, insetX: 0, background: 'rgba(0,0,0,0.6)', padding: '10px', textAlign: 'center', width: '100%' }}>
                                            CAMBIAR FOTO
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <select 
                                        value={fieldReport.type}
                                        onChange={(e) => setFieldReport({...fieldReport, type: e.target.value})}
                                        style={{ width: '100%', padding: '1rem', background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white' }}
                                    >
                                        <option value="luminaria">Falla Luminaria Smart</option>
                                        <option value="bache">Socavón o Bache Crítico</option>
                                        <option value="camion">Retiro Voluminosos Aseo</option>
                                        <option value="seguridad">Punto de Inseguridad Visual</option>
                                    </select>
                                    <textarea 
                                        placeholder="Descripción técnica del hallazgo..."
                                        value={fieldReport.desc}
                                        onChange={(e) => setFieldReport({...fieldReport, desc: e.target.value})}
                                        style={{ width: '100%', height: '100px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '1rem', color: 'white', resize: 'none' }}
                                    />
                                    <button 
                                        onClick={submitFieldReport}
                                        style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: '#10b981', color: 'black', fontWeight: 'bold', border: 'none' }}
                                    >
                                        ENVIAR REPORTE OFICIAL
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── CLIMA & SMART DATA ── */}
                    {activeTab === 'climate' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Thermometer size={20} color="#38bdf8" />
                                    <div style={{ fontSize: '2rem', fontWeight: '900', margin: '5px 0' }}>18°C</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>TEMPERATURA LA SERENA</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Wind size={20} color="#10b981" />
                                    <div style={{ fontSize: '2rem', fontWeight: '900', margin: '5px 0' }}>12k</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>VIENTO (KM/H)</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Zap size={20} color="#f59e0b" />
                                    <div style={{ fontSize: '2rem', fontWeight: '900', margin: '5px 0' }}>8.5</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ÍNDICE UV (EXTREMO)</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Navigation size={20} color="#ef4444" />
                                    <div style={{ fontSize: '2rem', fontWeight: '900', margin: '5px 0' }}>3.2</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>HUELLA CARBONO (MT)</div>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '1.5rem', borderRadius: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', marginBottom: '10px' }}>
                                    <AlertTriangle size={24} />
                                    <h4 style={{ margin: 0 }}>Protocolo Nocturnos D.S. 1/2022</h4>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#fca5a5', lineHeight: '1.4' }}>
                                    El monitoreo de cielos nocturnos indica una dispersión lumínica de 2.1%. Se recomienda ajuste de inclinación en luminarias de Ruta 5 Norte.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* Footer Informativo */}
            <footer style={{ padding: '1rem', background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748b' }}>
                    <Activity size={12} color="#10b981" /> SISTEMA DE MONITOREO EN TIEMPO REAL ACTIVO
                </div>
            </footer>
        </div>
    );
}
