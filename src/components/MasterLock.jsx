import React, { useState, useEffect } from 'react';
import { Share2, Car, Plane, ChevronLeft, ChevronRight, Lock, ShieldAlert, ShieldCheck, LogIn, Sparkles, UserCircle } from 'lucide-react';
import { auth } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const ALLOWED_ADMINS = [
    'directorio@vecinosmart.cl', 
    'admin@vecinosmart.cl',
    'soporte@vecinosmart.cl',
    'master@vecinosmart.cl'
];

const PROMO_SLIDES = [
    { title: "Smart Citizens", desc: "Reportes vecinales, monitoreo urbano y radio digital.", img: "/nostalgia/quien_quiere_ser_informado.jpg", color: "#38bdf8" },
    { title: "Smart Administration", desc: "Digitalización de procesos e inducción E-learning.", img: "/nostalgia/smart_admin_3d.png", color: "#10b981" },
    { title: "Smart Events", desc: "Gestión de protocolo y monitor de precedencias.", img: "/nostalgia/smart_events_3d.png", color: "#f59e0b" },
    { title: "Smart Listening", desc: "Inteligencia Sentinel Faro para audición social.", img: "/nostalgia/atari_altar.png", color: "#ef4444" }
];

function PromoSlider() {
    const [idx, setIdx] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIdx(prev => (prev + 1) % PROMO_SLIDES.length), 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = PROMO_SLIDES[idx];
    return (
        <div style={{ position: 'fixed', left: '2rem', bottom: '2rem', width: '320px', zIndex: 1000000, pointerEvents: 'none' }} className="animate-slide-up">
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '20px', border: `1px solid ${slide.color}40`, background: 'rgba(15, 23, 42, 0.9)', boxShadow: `0 10px 30px ${slide.color}20` }}>
                <img src={slide.img} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} alt={slide.title} />
                <h4 style={{ margin: 0, color: slide.color, fontSize: '1.1rem' }}>{slide.title}</h4>
                <p style={{ margin: '0.3rem 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>{slide.desc}</p>
                <div style={{ display: 'flex', gap: '4px', marginTop: '1rem' }}>
                    {PROMO_SLIDES.map((_, i) => (
                        <div key={i} style={{ height: '4px', flex: 1, background: i === idx ? slide.color : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: 'all 0.3s' }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function MasterLock({ onUnlock, setIsGuest, setGuestTimeLeft, setIsRegistered }) {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [view, setView] = useState('landing'); // 'landing', 'admin', 'register'
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        setIsAuthenticating(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (ALLOWED_ADMINS.some(admin => admin.toLowerCase() === user.email.toLowerCase())) {
                onUnlock(user);
            } else {
                // Not an admin -> automatic resident access
                setIsGuest(true);
                setGuestTimeLeft(3600); // Give them 1 hr
                localStorage.setItem('smart_is_guest', 'true');
            }
        } catch (err) {
            console.error("MasterLock Error:", err);
            if (err.code === 'auth/unauthorized-domain') {
                setError(`ERROR DE CONFIGURACIÓN: El dominio actual no está validado en la red de seguridad.`);
            } else if (err.code === 'auth/popup-closed-by-user') {
                setError("Acceso Cancelado: Parece que cerraste la ventana de identificación antes de tiempo. Vuelve a intentarlo.");
            } else {
                setError(`Error de conexión segura. Por favor, reintente.`);
            }
        } finally {
            setIsAuthenticating(false);
        }
    };

    const enterAsGuest = () => {
        setIsGuest(true);
        setGuestTimeLeft(600); // 10 minutes (600 seconds)
        localStorage.setItem('smart_is_guest', 'true');
    };

    return (
        <>
        <PromoSlider />
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 999999, 
            background: 'radial-gradient(circle at center, #0f172a 0%, #000 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            {/* Background Tech Particles (Simplified) */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: '#38bdf8', borderRadius: '50%', filter: 'blur(100px)' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: '#ef4444', borderRadius: '50%', filter: 'blur(100px)' }}></div>
            </div>

            <div className="glass-panel animate-float" style={{ 
                maxWidth: '450px', 
                width: '100%', 
                padding: '3rem', 
                borderRadius: '32px', 
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(15, 23, 42, 0.8)',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                position: 'relative'
            }}>
                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: '0', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)', zIndex: 0 }}></div>
                    <img 
                        src="/nostalgia/serenito_guard_oficial.png" 
                        alt="Serenito Guard Oficinal" 
                        style={{ height: '180px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 30px rgba(56, 189, 248, 0.3))' }}
                    />
                </div>

                <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '16px', marginBottom: '1.5rem' }}>
                    <Lock color="#38bdf8" size={32} />
                </div>

                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
                    SEGURIDAD COMUNASMART
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                    Identificación Requerida para Acceso Institucional.
                    <br/><span style={{ opacity: 0.6 }}>Red Digital Protegida de La Serena</span>
                </p>

                {error && (
                    <div style={{ 
                        padding: '1rem', 
                        background: 'rgba(239, 68, 68, 0.1)', 
                        border: '1px solid #ef4444', 
                        borderRadius: '12px', 
                        color: '#f87171', 
                        fontSize: '0.85rem', 
                        marginBottom: '1.5rem',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <ShieldAlert size={20} />
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button 
                        onClick={handleLogin}
                        disabled={isAuthenticating}
                        style={{ 
                            width: '100%', 
                            background: 'white', 
                            color: 'black', 
                            border: 'none', 
                            borderRadius: '16px', 
                            padding: '1.2rem', 
                            fontWeight: '900', 
                            fontSize: '1rem',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={e => !isAuthenticating && (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={e => !isAuthenticating && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        {isAuthenticating ? (
                            <div className="animate-spin" style={{ width: '20px', height: '20px', border: '3px solid #000', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                        ) : (
                            <>
                                <Sparkles size={20} color="#facc15" />
                                Ingresar con mi Identidad
                            </>
                        )}
                    </button>
                    
                    <button 
                        onClick={enterAsGuest}
                        style={{ 
                            background: 'transparent',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            color: '#38bdf8',
                            borderRadius: '16px',
                            padding: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        Pase Libre Vecinal (Temporal)
                    </button>

                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                        Acceso automático a tu perfil vecinal o directorio institucional.
                    </p>
                </div>

                <div style={{ 
                    marginTop: '2rem', 
                    paddingTop: '1.5rem', 
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <img src="/vls-logo-3d.png" alt="VLS Logo" style={{ height: '30px', opacity: 0.8 }} />
                    <UserCircle size={16} color="#10b981" />
                </div>
            </div>

            <div style={{ marginTop: '2rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                INTELIGENCIA ARTIFICIAL SENTINEL FARO & COMUNASMART &copy; 2026
            </div>

            <style>{`
                .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                .animate-spin { animation: spin 0.8s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-slide-up { animation: slideUp 0.5s ease-out; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
        </>
    );
}
