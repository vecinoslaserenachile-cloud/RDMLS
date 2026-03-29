import React, { useState, useEffect } from 'react';
import { 
    X as CloseIcon, Send, Share2, Radio, SendHorizontal, 
    CheckCircle2, AlertCircle, MessageSquare, 
    Upload, Globe, Smartphone, Music, Mail, ShieldAlert, Zap, Waves, Bird, Phone, Shield, Search,
    Flame, Droplets, Trash2, MapPin, Eye, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function VLSRequestPortal({ onClose, isPage = false }) {
    const [view, setView] = useState('report'); // 'report' or 'feed'
    const [step, setStep] = useState(1);
    const [incidents, setIncidents] = useState(() => {
        const saved = localStorage.getItem('vls_public_incidents');
        return saved ? JSON.parse(saved) : [
            { id: 101, type: 'community', title: 'Bache Extremo', desc: 'Hoyo de 1 metro de profundidad en calle Balmaceda con Prat.', status: 'pending', time: 'hace 2 horas', user: 'Vecino Vigilante', color: '#f59e0b', icon: AlertCircle },
            { id: 102, type: 'emergency_env', title: 'Mascotas en Humedal', desc: 'Perros sueltos persiguiendo taguas en El Culebrón de noche.', status: 'pending', time: 'hace 45 mins', user: 'Fary0', color: '#ef4444', icon: ShieldAlert },
            { id: 103, type: 'lighting', title: 'Luminaria Apagada', desc: 'Todo el sector de Cuatro Esquinas sin luz desde las 20:00.', status: 'solved', time: 'hace 5 horas', user: 'Tata Rojas', color: '#10b981', icon: Zap }
        ];
    });

    const [formData, setFormData] = useState({
        type: '',
        name: '',
        rut: '',
        email: '',
        phone: '',
        message: '',
        link: '',
        reason: 'copyright',
        declaration: false
    });

    const [captchaValue, setCaptchaValue] = useState(0);
    const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem('vls_user_data') || '{}');
    const isAdmin = ['directorio@vecinosmart.cl', 'vecinossmart@gmail.com', 'admin@vecinosmart.cl'].includes(currentUser.email || '');

    useEffect(() => {
        localStorage.setItem('vls_public_incidents', JSON.stringify(incidents));
    }, [incidents]);

    const EMERGENCY_NUMBERS = [
        { name: 'Seguridad Ciudadana LS', phone: '1457', color: '#38bdf8', icon: Shield },
        { name: 'Carabineros de Chile', phone: '133', color: '#10b981', icon: Phone },
        { name: 'PDI (Investigaciones)', phone: '134', color: '#3b82f6', icon: Search },
        { name: 'Armada (Borde Costero)', phone: '137', color: '#06b6d4', icon: Waves },
        { name: 'Ambulancia / SAMU', phone: '131', color: '#ef4444', icon: Zap },
        { name: 'Bomberos', phone: '132', color: '#f59e0b', icon: AlertCircle }
    ];

    const REQUEST_TYPES = [
        { id: 'water', title: 'Agua y Alcantarillado', icon: Droplets, color: '#3b82f6', desc: 'Cortes de suministro, roturas o alcantarillado colapsado.', urgent: true },
        { id: 'lighting', title: 'Cortes de Luz', icon: Zap, color: '#fbbf24', desc: 'Apagones masivos, focos quemados o cables caídos.', urgent: true },
        { id: 'telecom', title: 'Falla Señal Móvil', icon: Radio, color: '#ef4444', desc: 'Caída de antenas celulares o falla de fibra óptica.', urgent: true },
        { id: 'security', title: 'Seguridad Ciudadana', icon: ShieldAlert, color: '#6366f1', desc: 'Actividades sospechosas, incivilidades o contingencias.' },
        { id: 'paving', title: 'Baches y Pavimento', icon: AlertCircle, color: '#f59e0b', desc: 'Calles en mal estado u hoyos peligrosos.' },
        { id: 'cleaning', title: 'Aseo y Ornato', icon: Trash2, color: '#10b981', desc: 'Microbasurales, retiro de escombros o mantención.' }
    ];

    const handleResolve = (id) => {
        if (!isAdmin) return alert("Solo administradores autorizados pueden gestionar incidentes.");
        setIncidents(prev => prev.map(incident => 
            incident.id === id ? { ...incident, status: 'solved', resolver: currentUser.email } : incident
        ));
        window.dispatchEvent(new CustomEvent('vls-show-alert', { 
            detail: { title: 'INCIDENTE RESUELTO', message: `El reporte #${id} ha sido marcado como solucionado.`, type: 'success' } 
        }));
    };

    const handleDelete = (id) => {
        if (!isAdmin) return;
        if (window.confirm("¿Eliminar este reporte permanentemente?")) {
            setIncidents(prev => prev.filter(i => i.id !== id));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isCaptchaSolved) return alert("Por favor, resuelve el desafío de seguridad.");
        setIsSubmitting(true);
        
        try {
            const typeInfo = REQUEST_TYPES.find(t => t.id === formData.type) || REQUEST_TYPES[0];
            const newIncident = {
                id: Date.now(),
                type: formData.type,
                title: typeInfo.title,
                desc: formData.message,
                status: 'pending',
                time: 'Justo ahora',
                user: formData.name,
                phone: formData.phone,
                color: typeInfo.color,
                iconName: typeInfo.icon.name || 'ShieldAlert', // Store internal icon name/id for db consistency
                isUrgent: !!typeInfo.urgent
            };

            await addDoc(collection(db, 'vls_reportes_ciudadanos'), {
                ...newIncident,
                userId: currentUser?.uid || 'guest',
                userEmail: currentUser?.email || formData.email || 'N/A',
                createdAt: serverTimestamp()
            });

            // Update purely visual state with actual Component Object reference
            const visualIncident = { ...newIncident, icon: typeInfo.icon };
            setIncidents(prev => [visualIncident, ...prev]);

            const currentTokens = parseInt(localStorage.getItem('vls_tokens') || '0');
            const newTokens = currentTokens + 10;
            localStorage.setItem('vls_tokens', newTokens.toString());
            window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newTokens }));
            
            window.dispatchEvent(new CustomEvent('vls-show-alert', { 
                detail: { title: '¡Misión Cumplida!', message: 'Tus prioridades fueron reportadas al C5. Ganaste 10 Fichas VLS.', type: 'success' } 
            }));
            
            setIsSuccess(true);
        } catch (error) {
            console.error("Error submitting request to Firebase:", error);
            alert("Hubo un error al enviar el reporte, por favor intente nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ position: isPage ? 'relative' : 'fixed', inset: 0, zIndex: 100090, background: isPage ? 'transparent' : 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isPage ? '0' : '1rem', height: isPage ? '100%' : '100vh', overflowY: isPage ? 'visible' : 'auto' }}>
            <div className="glass-panel scale-in" style={{ width: '100%', maxWidth: '1000px', background: '#0f172a', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', height: isPage ? 'auto' : '90vh', display: 'flex', flexDirection: 'column' }}>
                
                {/* Header Superior con Tabs */}
                <div style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', fontWeight: '900' }}>
                            <Shield size={24} color="#ef4444" className="animate-pulse" /> REPORTE CIUDADANO
                        </h3>
                        
                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', padding: '0.4rem' }}>
                            <button 
                                onClick={() => setView('report')}
                                style={{ padding: '0.6rem 1.5rem', borderRadius: '10px', border: 'none', background: view === 'report' ? '#ef4444' : 'transparent', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
                            >
                                NUEVO REPORTE
                            </button>
                            <button 
                                onClick={() => setView('feed')}
                                style={{ padding: '0.6rem 1.5rem', borderRadius: '10px', border: 'none', background: view === 'feed' ? '#ef4444' : 'transparent', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
                            >
                                TABLERO VIVO
                            </button>
                        </div>
                    </div>
                    {!isPage && (
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', padding: '0.6rem', cursor: 'pointer', color: 'white' }}><CloseIcon size={20} /></button>
                    )}
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
                    
                    {view === 'report' ? (
                        <div style={{ flex: 1, display: 'flex' }}>
                            {/* Sidebar Info */}
                            <div style={{ width: '300px', padding: '2.5rem', background: 'rgba(0,0,0,0.2)', borderRight: '1px solid rgba(255,255,255,0.05)', display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ color: '#ef4444', margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>PROTOCOLO DE EMERGENCIA</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5' }}>
                                        Cada reporte ciudadano es geolocalizado y enviado automáticamente al C5 de la ComunaSmart. Las alertas ambientales tienen prioridad RED.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {EMERGENCY_NUMBERS.slice(0, 3).map(num => (
                                        <div key={num.phone} style={{ borderLeft: `3px solid ${num.color}`, padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.02)' }}>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{num.name}</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: '900', color: num.color }}>{num.phone}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Formulario */}
                            <div style={{ flex: 1, padding: '2.5rem' }}>
                                {isSuccess ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                        <div style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                            <CheckCircle2 size={60} color="#10b981" />
                                        </div>
                                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>REPORTE REGISTRADO</h2>
                                        <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>Tu incidencia ya está en el sistema. Los gestores vecinales la revisarán pronto.</p>
                                        <button onClick={() => { setView('feed'); setIsSuccess(false); setStep(1); }} className="btn-primary-vls" style={{ padding: '1rem 3rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}>IR AL TABLERO</button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {step === 1 && (
                                            <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                                {REQUEST_TYPES.map(type => (
                                                    <button 
                                                        key={type.id} 
                                                        type="button"
                                                        onClick={() => { setFormData({...formData, type: type.id}); setStep(2); }}
                                                        style={{ 
                                                            padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                                                            borderRadius: '24px', cursor: 'pointer', textAlign: 'center', transition: '0.3s',
                                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.borderColor = type.color}
                                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                                                    >
                                                        <div style={{ padding: '1rem', background: `${type.color}20`, borderRadius: '18px', color: type.color }}>
                                                            <type.icon size={28} />
                                                        </div>
                                                        <strong style={{ color: 'white', fontSize: '0.9rem' }}>{type.title}</strong>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {step === 2 && (
                                            <div className="scale-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <button type="button" onClick={() => setStep(1)} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>← Volver</button>
                                                    <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold' }}>REPORTE: {REQUEST_TYPES.find(t => t.id === formData.type)?.title}</span>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <input required placeholder="Tu Nombre" className="vls-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                                    <input required placeholder="Teléfono" className="vls-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                                </div>
                                                <textarea required placeholder="Describe la situación (Lugar, detalles, urgencia)..." className="vls-input" style={{ minHeight: '120px' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                                                
                                                <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                                    <div style={{ fontSize: '0.7rem', color: '#ef4444', marginBottom: '10px', fontWeight: 'bold' }}>DESLIZA PARA ACTIVAR PROTOCOLO</div>
                                                    <input type="range" min="0" max="100" value={captchaValue} onChange={e => { setCaptchaValue(e.target.value); if(e.target.value > 95) setIsCaptchaSolved(true); }} disabled={isCaptchaSolved} style={{ width: '100%' }} />
                                                </div>

                                                <button disabled={!isCaptchaSolved || isSubmitting} className="vls-btn-main" style={{ width: '100%', padding: '1.2rem', borderRadius: '18px', background: isCaptchaSolved ? '#ef4444' : 'rgba(255,255,255,0.05)', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer' }}>
                                                    {isSubmitting ? 'ENVIANDO A C5...' : 'CONFIRMAR REPORTE CIUDADANO'}
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: 1, padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h4 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18} color="#ef4444" /> INCIDENCIAS ACTIVAS EN LA RM</h4>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f59e0b', fontSize: '0.8rem' }}><AlertCircle size={14} /> {incidents.filter(i => i.status === 'pending').length} Pendientes</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', fontSize: '0.8rem' }}><CheckCircle2 size={14} /> {incidents.filter(i => i.status === 'solved').length} Solucionadas</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {incidents.map(incident => (
                                    <motion.div 
                                        key={incident.id} layout
                                        style={{ 
                                            background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: `1px solid ${incident.status === 'solved' ? '#10b98130' : incident.color + '50'}`,
                                            padding: '1.5rem', position: 'relative', overflow: 'hidden'
                                        }}
                                    >
                                        {incident.status === 'solved' && (
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#10b981', color: '#0f172a', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold' }}>SOLUCIONADO</div>
                                        )}
                                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ padding: '0.7rem', background: `${incident.color}15`, borderRadius: '15px', color: incident.color, height: 'fit-content' }}>
                                                <incident.icon size={20} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{incident.time} · {incident.user}</div>
                                                <strong style={{ color: 'white', fontSize: '1rem' }}>{incident.title}</strong>
                                            </div>
                                        </div>
                                        <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0 0 1.5rem 0', lineHeight: '1.4' }}>{incident.desc}</p>
                                        
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {incident.status === 'pending' && isAdmin && (
                                                <button 
                                                    onClick={() => handleResolve(incident.id)}
                                                    style={{ flex: 1, padding: '0.6rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                                                >
                                                    MARCAR COMO SOLUCIONADO
                                                </button>
                                            )}
                                            {isAdmin && (
                                                <button 
                                                    onClick={() => handleDelete(incident.id)}
                                                    style={{ padding: '0.6rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '12px', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <style>{`
                .vls-input { width: 100%; background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 15px; color: white; outline: none; transition: 0.3s; }
                .vls-input:focus { border-color: #ef4444; background: rgba(0,0,0,0.6); }
                .scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}

const isMobile = window.innerWidth < 768;
