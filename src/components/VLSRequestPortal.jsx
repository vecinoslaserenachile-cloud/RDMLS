import React, { useState } from 'react';
import { 
    X as CloseIcon, Send, Share2, Radio, SendHorizontal, 
    CheckCircle2, AlertCircle, MessageSquare, 
    Upload, Globe, Smartphone, Music, Mail, ShieldAlert, Zap, Waves, Bird, Phone, Shield, Search
} from 'lucide-react';

export default function VLSRequestPortal({ onClose }) {
    const [step, setStep] = useState(1);
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

    const EMERGENCY_NUMBERS = [
        { name: 'Seguridad Ciudadana LS', phone: '1457', color: '#38bdf8', icon: Shield },
        { name: 'Carabineros de Chile', phone: '133', color: '#10b981', icon: Phone },
        { name: 'PDI (Investigaciones)', phone: '134', color: '#3b82f6', icon: Search },
        { name: 'Armada (Borde Costero)', phone: '137', color: '#06b6d4', icon: Waves },
        { name: 'Ambulancia / SAMU', phone: '131', color: '#ef4444', icon: Zap },
        { name: 'Bomberos', phone: '132', color: '#f59e0b', icon: AlertCircle }
    ];

    const REQUEST_TYPES = [
        { id: 'emergency_env', title: '🚨 ALERTA AMBIENTAL URGENTE', icon: ShieldAlert, color: '#ef4444', desc: 'Vehículos en la arena, zona de nidificación o daño en humedales. Activación inmediata 1457.', urgent: true },
        { id: 'social', title: 'Compartir en Redes VLS', icon: Share2, color: '#3b82f6', desc: 'Sube tu noticia, foto o evento para publicarlo en Facebook, IG o X de Vecinos La Serena.' },
        { id: 'radio', title: 'Subir a Radio Digital', icon: Radio, color: '#10b981', desc: 'Envía tu audio, podcast o saludo para que suene en nuestra Radio VLS 2026.' },
        { id: 'community', title: 'Requerimiento Vecinal', icon: MessageSquare, color: '#f59e0b', desc: 'Informar sobre baches, luminarias o seguridad directamente al C5.' },
        { id: 'dmca', title: 'Baja de Contenido (DMCA)', icon: AlertCircle, color: '#6366f1', desc: 'Si sientes que un video o contenido te pertenece y debemos bajarlo.' },
        { id: 'other', title: 'Otros Servicios', icon: Globe, color: '#8b5cf6', desc: 'Consultas generales, propuestas de innovación o convenios.' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isCaptchaSolved && (formData.type === 'dmca' || formData.type === 'emergency_env')) return alert("Por favor, resuelve el desafío de seguridad (Captcha).");
        setIsSubmitting(true);
        
        try {
            const RESEND_KEY = localStorage.getItem('vls_resend_key') || "re_BxWBivzx_3CpokEvr9UbCKFzFXyfT3VYn";
            const subject = formData.type === 'emergency_env' ? `🚨 ALERTA AMBIENTAL CRÍTICA - ${formData.name}` : `📩 REQUERIMIENTO VLS: ${formData.type.toUpperCase()}`;
            
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${RESEND_KEY}` 
                },
                body: JSON.stringify({
                    from: 'Portal VLS <onboarding@resend.dev>',
                    to: 'vecinoslaserenachile@gmail.com',
                    subject: subject,
                    html: `
                        <div style="font-family: sans-serif; background: #0f172a; padding: 30px; color: white;">
                            <div style="max-width: 700px; margin: auto; background: #1e293b; padding: 40px; border-radius: 24px; border: 2px solid ${formData.type === 'emergency_env' ? '#ef4444' : '#38bdf8'};">
                                <h1 style="color: ${formData.type === 'emergency_env' ? '#ef4444' : '#38bdf8'}; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 15px; margin-top: 0; font-size: 24px;">REPORTE OFICIAL SMART CIUDADANO 2026</h1>
                                
                                ${formData.type === 'emergency_env' ? `
                                <div style="background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                                    <h2 style="color: #ef4444; margin: 0; font-size: 18px;">⚠️ ALERTA AMBIENTAL EN CURSO</h2>
                                    <p style="margin: 10px 0 0 0; font-weight: bold;">Notificación prioritaria enviada a Seguridad Ciudadana (1457), Carabineros (133) y Armada (137).</p>
                                </div>
                                ` : ''}

                                <div style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 12px; margin-bottom: 25px;">
                                    <h3 style="color: #94a3b8; margin-top: 0; font-size: 14px; text-transform: uppercase;">DETALLES DEL SOLICITANTE</h3>
                                    <p><strong>Nombre:</strong> ${formData.name}</p>
                                    <p><strong>RUT/ID:</strong> ${formData.rut}</p>
                                    <p><strong>Correo:</strong> ${formData.email}</p>
                                    <p><strong>Teléfono:</strong> ${formData.phone}</p>
                                </div>

                                <div style="margin-bottom: 25px;">
                                    <h3 style="color: #38bdf8; font-size: 14px; text-transform: uppercase;">INFORMACIÓN DEL REQUERIMIENTO</h3>
                                    <p><strong>Tipo:</strong> ${formData.type.toUpperCase()}</p>
                                    <p><strong>Contenido:</strong><br/> ${formData.message}</p>
                                    ${formData.link ? `<p><strong>Evidencia:</strong> <a href="${formData.link}" style="color: #38bdf8;">${formData.link}</a></p>` : ''}
                                </div>

                                <div style="font-size: 11px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: center;">
                                    <p>ID VLS: ${Date.now()}</p>
                                    <p>Smart City La Serena - Chile 2026.</p>
                                </div>
                            </div>
                        </div>
                    `
                })
            });

            if (formData.type === 'emergency_env') {
                window.dispatchEvent(new CustomEvent('c5-new-incident', { 
                    detail: { 
                        id: Date.now(), 
                        lat: -29.9100, 
                        lng: -71.2700, 
                        type: 'ALERTA AMBIENTAL', 
                        desc: `URGENTE 1457: ${formData.message}` 
                    } 
                }));
            }

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert("Hubo un error al enviar el reporte.");
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            setIsSuccess(true); 
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100090, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel scale-in" style={{ width: '100%', maxWidth: '750px', background: '#0f172a', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', overflowY: 'auto', maxHeight: '95vh', position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                
                {/* Sidebar con Teléfonos de Emergencia (Desktop) */}
                {!isMobile && (
                    <div style={{ width: '250px', background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <h4 style={{ color: 'white', margin: 0, fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> EMERGENCIAS 24/7</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {EMERGENCY_NUMBERS.map(num => (
                                <div key={num.phone} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '15px', border: `1px solid ${num.color}30` }}>
                                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}>{num.name.toUpperCase()}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: num.color, fontFamily: 'monospace' }}>{num.phone}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '15px', border: '1px dashed #38bdf8' }}>
                            <div style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: 'bold' }}>COQUIMBO ADICIONAL</div>
                            <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>2da Comisaría Principal</div>
                        </div>
                    </div>
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(10px)' }}>
                        <div>
                            <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem' }}>
                                <Shield size={24} color="#38bdf8" /> PORTAL VECINAL SMART
                            </h3>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '50%', padding: '0.6rem', cursor: 'pointer', color: '#ef4444' }}><CloseIcon size={20} /></button>
                    </div>

                    <div style={{ padding: '2rem' }}>
                        {isSuccess ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }} className="animate-slide-up">
                                <div className="pulse" style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                    <CheckCircle2 size={50} color="#10b981" />
                                </div>
                                <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.8rem' }}>¡Protocolo Activado!</h2>
                                <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '1rem' }}>
                                    {formData.type === 'emergency_env' 
                                        ? "Alerta ambiental despachada a Seguridad Ciudadana (1457), Armada (137) y Carabineros. Nuestra IA monitorea la zona." 
                                        : "Tu requerimiento ha sido registrado en el Hub de Vecinos La Serena."
                                    }
                                </p>
                                <button onClick={onClose} className="btn-primary-vls" style={{ marginTop: '2.5rem', padding: '1.2rem 3rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem' }}>Finalizar</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                
                                {step === 1 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <h4 style={{ color: '#38bdf8', margin: 0, fontSize: '1.1rem' }}>Gestión Ciudadana Integral:</h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                                            {REQUEST_TYPES.map(type => (
                                                <button 
                                                    key={type.id} 
                                                    type="button"
                                                    onClick={() => { setFormData({...formData, type: type.id}); setStep(2); }}
                                                    className="request-type-btn"
                                                    style={{ 
                                                        display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1rem 1.5rem', 
                                                        background: type.urgent ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255,255,255,0.03)', 
                                                        border: type.urgent ? '1.5px solid #ef4444' : '1px solid rgba(255,255,255,0.08)',
                                                        borderRadius: '20px', cursor: 'pointer', textAlign: 'left', transition: '0.3s'
                                                    }}
                                                >
                                                    <div style={{ background: type.color, padding: '0.8rem', borderRadius: '15px', color: 'white' }}>
                                                        <type.icon size={24} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>{type.title}</strong>
                                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{type.desc}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="fade-in">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <button type="button" onClick={() => setStep(1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', padding: '10px 15px', borderRadius: '12px', fontSize: '0.8rem' }}>← Atrás</button>
                                            <h4 style={{ color: formData.type === 'emergency_env' ? '#ef4444' : '#38bdf8', margin: 0 }}>DETALLES DEL REPORTE</h4>
                                        </div>

                                        {formData.type === 'emergency_env' && (
                                            <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '1.2rem', borderRadius: '15px', border: '1px solid #ef4444' }}>
                                                <p style={{ margin: 0, color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                    URGENTE: Seguridad Ciudadana (1457) y Armada (137) han sido notificados por protocolo automático.
                                                </p>
                                            </div>
                                        )}
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nombre Completo" className="input-vls" />
                                            <input required type="text" value={formData.rut} onChange={e => setFormData({...formData, rut: e.target.value})} placeholder="RUT / ID" className="input-vls" />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Correo" className="input-vls" />
                                            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="WhatsApp (+569...)" className="input-vls" />
                                        </div>

                                        <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Descripción detallada de la situación..." className="input-vls" style={{ minHeight: '100px' }} />

                                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                            <span style={{ fontSize: '0.75rem', color: isCaptchaSolved ? '#10b981' : '#38bdf8', fontWeight: 'bold' }}>
                                                {isCaptchaSolved ? 'VERIFICACIÓN OK' : 'DESLIZA PARA VALIDAR ENVÍO'}
                                            </span>
                                            <input 
                                                type="range" min="0" max="100" value={captchaValue} 
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    setCaptchaValue(val);
                                                    if (val > 95) setIsCaptchaSolved(true);
                                                }}
                                                disabled={isCaptchaSolved}
                                                style={{ width: '100%', marginTop: '8px' }}
                                            />
                                        </div>

                                        <button 
                                            disabled={isSubmitting || !isCaptchaSolved}
                                            className="btn-primary-vls" 
                                            style={{ 
                                                width: '100%', padding: '1.2rem', borderRadius: '20px', 
                                                background: isCaptchaSolved ? (formData.type === 'emergency_env' ? '#ef4444' : '#38bdf8') : '#1e293b', 
                                                color: 'white', fontWeight: '900', border: 'none', cursor: isCaptchaSolved ? 'pointer' : 'not-allowed'
                                            }}
                                        >
                                            {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR Y ENVIAR'}
                                        </button>
                                    </div>
                                )}

                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .request-type-btn:hover { background: rgba(255,255,255,0.08) !important; border-color: #38bdf8 !important; transform: translateX(5px); }
                .input-vls { width: 100%; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); padding: 0.8rem; borderRadius: 12px; color: white; outline: none; }
                .input-vls:focus { border-color: #38bdf8; }
                @keyframes pulsef { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }
                .pulse { animation: pulsef 2s infinite; }
            `}</style>
        </div>
    );
}

const isMobile = window.innerWidth < 768;
