import React, { useState } from 'react';
import { 
    X, Heart, Activity, Stethoscope, Syringe, Plus, Search, 
    Calendar, Clock, User, Phone, MapPin, ShieldCheck, 
    Bell, MessageSquare, Clipboard, Sparkles, AlertCircle
} from 'lucide-react';

const MEDICAL_SERVICES = [
    { 
        id: 'inyectables', title: 'Inyectables & Suero', 
        description: 'Administración de medicamentos intramusculares y endovenosos con pauta médica.', 
        icon: Syringe, color: '#3b82f6', price: 'VLS Social' 
    },
    { 
        id: 'curaciones', title: 'Curaciones Avanzadas', 
        description: 'Tratamiento de heridas, quemaduras y úlceras con enfermería especializada.', 
        icon: Activity, color: '#10b981', price: 'VLS Social' 
    },
    { 
        id: 'cuidados', title: 'Cuidados Adulto Mayor', 
        description: 'Acompañamiento, higiene y control de signos vitales en domicilio.', 
        icon: Heart, color: '#ec4899', price: 'VLS Social' 
    },
    { 
        id: 'pediatria', title: 'Control Pediátrico', 
        description: 'Controles de salud infantil alternativos y apoyo en lactancia.', 
        icon: User, color: '#f59e0b', price: 'VLS Social' 
    }
];

export default function SmartEnfermeria({ onClose }) {
    const [view, setView] = useState('home');
    const [selectedService, setSelectedService] = useState(null);
    const [formSent, setFormSent] = useState(false);

    const handleBooking = (service) => {
        setSelectedService(service);
        setView('booking');
    };

    const submitForm = (e) => {
        e.preventDefault();
        setFormSent(true);
        setTimeout(() => {
            setFormSent(false);
            setView('home');
            setSelectedService(null);
        }, 3000);
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(25px)',
            display: 'flex', flexDirection: 'column',
            color: '#1e293b', fontFamily: 'Outfit, sans-serif'
        }}>
            {/* Header */}
            <div style={{ 
                padding: '1.5rem 2rem', 
                background: 'linear-gradient(90deg, #10b981, #1e40af)', 
                color: 'white',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '15px' }}>
                        <Stethoscope size={30} color="#10b981" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.5px' }}>SMART SALUD: ENFERMERÍA</h2>
                        <span style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: 'bold' }}>RED DE CUIDADOS VLS COQUIMBO/LA SERENA</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ 
                    width: '45px', height: '45px', borderRadius: '50%', border: 'none', 
                    background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer',
                    fontSize: '1.2rem', fontWeight: 'bold'
                }}>✕</button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
                {view === 'home' ? (
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', color: '#0f172a' }}>
                                ¿En qué podemos cuidarte hoy?
                            </h3>
                            <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
                                Accede a servicios de salud domiciliarios y comunitarios validados por la red Smart Comuna. Calidad clínica con rostro humano.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                            {MEDICAL_SERVICES.map(s => (
                                <div key={s.id} className="nurse-card" style={{
                                    background: 'white', padding: '2.5rem', borderRadius: '30px',
                                    border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    display: 'flex', flexDirection: 'column', gap: '1rem',
                                    transition: '0.3s'
                                }}>
                                    <div style={{ 
                                        width: '60px', height: '60px', borderRadius: '20px', 
                                        background: `${s.color}15`, color: s.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <s.icon size={32} />
                                    </div>
                                    <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '800' }}>{s.title}</h4>
                                    <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{s.description}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                                        <span style={{ fontWeight: 'bold', color: '#10b981' }}>{s.price}</span>
                                        <button 
                                            onClick={() => handleBooking(s)}
                                            style={{ 
                                                background: '#1e40af', color: 'white', border: 'none', 
                                                padding: '0.8rem 1.5rem', borderRadius: '15px', fontWeight: 'bold',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Solicitar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Banner Promocional */}
                        <div style={{ 
                            marginTop: '4rem', background: '#f8fafc', borderRadius: '40px', 
                            padding: '3rem', border: '2px dashed #cbd5e1',
                            display: 'flex', alignItems: 'center', gap: '3rem'
                        }}>
                             <div style={{ position: 'relative', width: '200px' }}>
                                <div style={{ 
                                    width: '180px', height: '180px', background: 'white', 
                                    borderRadius: '50%', border: '8px solid #10b981',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <img src="/perfil_serenito.png" style={{ height: '140px' }} alt="Serenito" />
                                </div>
                                <div style={{ position: 'absolute', top: 0, right: 0, background: '#10b981', color: 'white', padding: '10px', borderRadius: '50%' }}>
                                    <Sparkles size={24} />
                                </div>
                             </div>
                             <div>
                                <h4 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.5rem' }}>Personal Disponible 24/7</h4>
                                <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1.5rem' }}>
                                    Nuestro equipo de enfermaría cuenta con acreditación digital VLS. Puedes verificar su identidad mediante el código QR de su credencial institucional.
                                </p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#10b981', fontWeight: 'bold' }}>
                                        <ShieldCheck size={18} /> Acreditación Vigente
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#3b82f6', fontWeight: 'bold' }}>
                                        <Activity size={18} /> Monitoreo GPS
                                    </span>
                                </div>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        {!formSent ? (
                            <div className="glass-panel" style={{ padding: '3rem', borderRadius: '30px', border: '1px solid #e2e8f0', background: 'white' }}>
                                <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: '#1e40af', fontWeight: 'bold', marginBottom: '1rem', cursor: 'pointer' }}>← Volver</button>
                                <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Solicitud de {selectedService?.title}</h3>
                                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Completa los datos para asignar un profesional de la red.</p>
                                
                                <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Paciente</label>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <input type="text" placeholder="RUT Paciente" required style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                                            <input type="text" placeholder="Nombre Completo" required style={{ flex: 2, padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dirección / Sector</label>
                                        <input type="text" placeholder="Ej: Las Compañías, Av. La Paz #123" required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Observaciones Clínica / Diagnóstico</label>
                                        <textarea placeholder="Ej: Paciente operado recientemente, requiere curación post-operatoria..." style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #cbd5e1', minHeight: '100px' }} />
                                    </div>
                                    <button type="submit" style={{ 
                                        background: 'linear-gradient(45deg, #10b981, #1e40af)', color: 'white', 
                                        padding: '1.2rem', borderRadius: '15px', border: 'none', 
                                        fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer',
                                        boxShadow: '0 10px 20px rgba(30, 64, 175, 0.2)'
                                    }}>
                                        Confirmar Solicitud Digital
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 2rem' }} />
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>¡Solicitud en Trámite!</h2>
                                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                                    Hemos recibido tu requerimiento. Un profesional de la Red de Enfermería Vecinal se contactará contigo en breve para coordinar la visita.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`.nurse-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }`}</style>
        </div>
    );
}

function CheckCircle({ size, color, style }) {
    return <ShieldCheck size={size} color={color} style={style} />;
}
