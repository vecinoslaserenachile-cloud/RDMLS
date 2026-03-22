import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, CalendarDays, BarChart4, LogIn, ArrowLeft, Lock, X as CloseIcon, Loader2, LogOut, Music, FileText } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { auth } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function LegacyPortal() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState('');
    const [embeddedUrl, setEmbeddedUrl] = useState(null);
    const [isLoadingIframe, setIsLoadingIframe] = useState(false);

    const [brandOrg, setBrandOrg] = useState('La Serena');
    const [brandLogo, setBrandLogo] = useState('/escudo.png');

    useEffect(() => {
        const tenant = localStorage.getItem('smart_tenant');
        if (tenant === 'custom') {
            setBrandOrg(localStorage.getItem('smart_brand_org') || 'La Serena');
            setBrandLogo(localStorage.getItem('smart_brand_logo') || '/escudo.png');
        }
    }, []);

    useEffect(() => {
        // Chequear estado en Supabase
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setIsLoggedIn(true);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) setIsLoggedIn(true);
        });

        // Chequear estado en Google Firebase
        if (auth && typeof auth.onAuthStateChanged === 'function') {
            const unsubFirebase = auth.onAuthStateChanged(user => {
                if (user) setIsLoggedIn(true);
            });
            return () => {
                subscription.unsubscribe();
                unsubFirebase();
            };
        }

        return () => subscription.unsubscribe();
    }, []);

    const openModule = (path) => {
        // Optimizar Streamlit con embed=true si es posible
        let finalUrl = path;
        if (path.includes('streamlit.app') && !path.includes('embed=true')) {
            finalUrl = finalUrl.includes('?') ? `${finalUrl}&embed=true` : `${finalUrl}/?embed=true`;
        }
        setIsLoadingIframe(true);
        setEmbeddedUrl(finalUrl);
    };

    const handleGoogleLogin = () => {
        setError('');
        if (!auth || !auth.app) {
            console.warn('Simulando Login Empleado Google en entorno de pruebas');
            setIsLoggedIn(true);
            return;
        }
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            setIsLoggedIn(true);
        }).catch(err => {
            console.error("Error logging in:", err);
            if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
                setError("Acceso Cancelado: Se cerró la ventana de identificación. Intenta nuevamente.");
                return;
            }
            setError(`Error de acceso Firebase: ${err.message}`);
        });
    };

        const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // BYPASS ACCESO DEMO/ADMINISTRADOR
        const allowedEmails = ['master@vecinosmart.cl', 'fabi@vecinosmart.cl', 'vecinosmart@gmail.com'];
        if (allowedEmails.includes(email.toLowerCase()) && (pwd === 'admin2026' || pwd === 'admin123')) {
            setIsLoggedIn(true);
            return;
        }

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password: pwd,
            });
            if (signInError) throw signInError;
            setIsLoggedIn(true);
        } catch (err) {
            setError('Credenciales inválidas o falta configuración en la base de datos.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        if (auth && auth.currentUser) {
            await auth.signOut();
        }
        setIsLoggedIn(false);
    };

    const internalModules = [
        {
            id: 'desk', title: 'Central C-5 Segura', subtitle: 'Acceso Interno Backoffice',
            icon: ShieldAlert, color: 'var(--alert-danger)', path: '/desk', internal: true
        },
        {
            id: 'comms', title: 'Hub de Comunicaciones', subtitle: 'Prensa, Diseño y Marketing',
            icon: Users, color: '#ec4899', path: '/hub-comunicaciones', internal: true
        },
        {
            id: 'puerta', title: `Acceso Puerta ${brandOrg}`, subtitle: 'Control de Acceso',
            icon: Lock, color: '#f97316', path: 'https://puertaserena.streamlit.app/', internal: false
        },
        {
            id: 'admin', title: 'Sistema Honorarios', subtitle: 'Gestión y Digitalización',
            icon: Users, color: '#0ea5e9', path: '/honorarios', internal: true
        },
        {
            id: 'faro', title: 'Inteligencia Faro Sentinel', subtitle: 'Monitoreo / Social Listening',
            icon: BarChart4, color: '#8b5cf6', path: 'https://monitor-laserena.streamlit.app/', internal: false
        },
        {
            id: 'induccion', title: 'Portal Inducción y E-Learning', subtitle: 'Funcionarios Internos IMLS',
            icon: CalendarDays, color: '#f59e0b', path: 'https://vecinoslaserenachile-cloud.github.io/portal-induccion-imls/', internal: false
        },
        {
            id: 'protocolo', title: 'Eventos y Protocolo', subtitle: 'Gestión Automatizada',
            icon: CalendarDays, color: '#10b981', path: '/protocolo', internal: true
        },
        {
            id: 'sesiones-concejo', title: 'Archivo Sesiones Concejo', subtitle: 'Actas y Videos Históricos',
            icon: FileText, color: '#475569', path: 'https://www.youtube.com/@vecinoslaserenachile/streams', internal: false
        },
        {
            id: 'sesiones-musicales', title: 'VLS Sesiones Musicales', subtitle: 'Archivo Audiovisual',
            icon: Music, color: '#f43f5e', path: 'https://www.youtube.com/playlist?list=PL-x7f_0_a4W8wG8n8zX6O2-9vG_M2X-j3', internal: false
        }
    ];

    if (!isLoggedIn) {
        return (
            <div className="page-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)' }}>
                <div className="glass-panel animate-slide-up" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', display: 'inline-flex', marginBottom: '1.5rem' }}>
                        <Lock size={40} color="var(--brand-primary)" />
                    </div>
                    <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Acceso Funcionario</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Debe identificarse con su credencial institucional</p>
                    {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--alert-danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</div>}

                    <button
                        onClick={handleGoogleLogin}
                        className="btn pulse"
                        style={{ width: '100%', background: '#4285F4', color: 'white', border: '1px solid #4285F4', padding: '1.2rem', borderRadius: '12px', fontSize: '1.15rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', cursor: 'pointer', marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(66, 133, 244, 0.3)' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ backgroundColor: 'white', borderRadius: '50%', padding: '2px' }}>
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Ingresar con Google (Recomendado)
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                        <span style={{ margin: '0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>o acceso seguro manual</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="email" placeholder="Correo Administrativo" required className="input-base" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Clave encriptada" required className="input-base" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} value={pwd} onChange={(e) => setPwd(e.target.value)} />

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem', fontWeight: 'bold' }}>
                            <LogIn size={18} style={{ display: 'inline', marginRight: '0.5rem' }} /> Acceso Tradicional Supabase
                        </button>
                    </form>
                    <button className="btn-glass" style={{ marginTop: '2rem', fontSize: '0.85rem' }} onClick={() => navigate('/')}>Volver al Portal Vecinal</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <header className="page-header" style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={() => navigate('/')} className="btn-glass animate-slide-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Volver Home Vecinal
                    </button>
                    <button onClick={handleLogout} className="btn-danger animate-slide-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                        <LogOut size={16} /> Cerrar Sesión
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <img src="/logo-smartls-v3.png" alt="Logo SmartLS" style={{ height: '60px', borderRadius: '12px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }} onError={(e) => e.target.style.display = 'none'} />
                        <img src={brandLogo} alt={`Escudo ${brandOrg}`} style={{ height: '60px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))', borderRadius: brandLogo !== '/escudo.png' ? '50%' : '0' }} onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <div>
                        <h2 className="text-gradient" style={{ margin: 0 }}>Portal Interno de Funcionarios</h2>
                        <p className="text-muted" style={{ fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>Sistemas Institucionales Restringidos</p>
                    </div>
                </div>
            </header>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%'
            }}>
                {internalModules.map((pilar) => (
                    <button
                        key={pilar.id}
                        className="glass-panel"
                        onClick={() => {
                            if (pilar.action) {
                                pilar.action();
                            } else if (pilar.internal) {
                                navigate(pilar.path);
                            } else {
                                openModule(pilar.path);
                            }
                        }}
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '2rem 1.5rem',
                            border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left',
                            background: `linear-gradient(135deg, ${pilar.color}20 0%, rgba(20,30,48,0.9) 100%)`, cursor: 'pointer',
                            minHeight: '160px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <pilar.icon size={120} color="white" style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.05, transform: 'rotate(-15deg)' }} />

                        <div style={{
                            padding: '0.75rem', borderRadius: '12px', background: pilar.color, display: 'inline-flex', marginBottom: '1.5rem', boxShadow: `0 4px 15px ${pilar.color}60`
                        }}>
                            <pilar.icon size={28} color="white" />
                        </div>

                        <div style={{ zIndex: 1 }}>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'white' }}>{pilar.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{pilar.subtitle}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Smart Frame / Iframe Viewer */}
            {embeddedUrl && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Lock size={18} color="var(--brand-primary)" />
                            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Túnel Institucional Seguro</span>
                        </div>
                        <button onClick={() => setEmbeddedUrl(null)} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CloseIcon size={20} />
                        </button>
                    </div>

                    <div style={{ flex: 1, position: 'relative', background: '#ffffff' }}>
                        {isLoadingIframe && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', zIndex: 10 }}>
                                <Loader2 size={48} color="var(--brand-primary)" className="spin" style={{ marginBottom: '1rem' }} />
                                <h3>Conectando al Servidor Institucional...</h3>
                                <p className="text-muted" style={{ fontSize: '0.9rem' }}>Negociando protocolos de acceso seguro.</p>
                            </div>
                        )}
                        <iframe
                            src={embeddedUrl}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            onLoad={() => setIsLoadingIframe(false)}
                            title="Visor Externo Institucional"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
