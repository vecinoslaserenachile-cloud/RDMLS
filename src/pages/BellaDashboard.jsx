import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    CloudSun, Wind, Droplets, Zap, Shield, 
    Home, Activity, TrendingUp, Search, 
    Bell, Settings, LayoutGrid, Clock,
    Monitor, Smartphone, Tablet, Menu,
    Radio, Play, SkipForward, Volume2,
    Calendar, Users, BookOpen, Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BellaDashboard() {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    const bentoItems = [
        { 
            id: 'weather', 
            title: 'Monitor Local', 
            size: 'large', 
            icon: CloudSun, 
            bg: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
            content: (
                <div style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900' }}>18°C</div>
                    <div style={{ color: '#93c5fd', fontSize: '1.2rem', fontWeight: 'bold' }}>Despejado</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '15px' }}>
                            <Wind size={16} /> 12 km/h
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '15px' }}>
                            <Droplets size={16} /> 75% Hum.
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'stats',
            title: 'Pulso Ciudadano',
            size: 'medium',
            icon: Activity,
            bg: 'rgba(0,0,0,0.4)',
            content: (
                <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                        <TrendingUp size={20} />
                        <span style={{ fontWeight: 'bold' }}>+28% este mes</span>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>14.2k</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Vecinos Activos</div>
                    </div>
                </div>
            )
        },
        {
            id: 'radio',
            title: 'Radio Digital VLS',
            size: 'medium',
            icon: Radio,
            bg: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
            content: (
                <div style={{ padding: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '50%' }}>
                            <Play size={24} fill="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>En Vivo: Éxitos 80s</div>
                            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>C5 Faro Engine</div>
                        </div>
                    </div>
                    <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                        <div style={{ height: '100%', width: '45%', background: 'white', borderRadius: '2px' }}></div>
                    </div>
                </div>
            )
        },
        {
            id: 'events',
            title: 'Agenda Comunal',
            size: 'small',
            icon: Calendar,
            bg: 'rgba(0,0,0,0.4)',
            content: (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>12 Mar</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>Consejo Municipal</div>
                </div>
            )
        },
        {
            id: 'security',
            title: 'Seguridad',
            size: 'small',
            icon: Shield,
            bg: 'rgba(239, 68, 68, 0.2)',
            content: (
                <div style={{ textAlign: 'center', color: '#f87171' }}>
                    <div style={{ fontWeight: 'bold' }}>ACTIVO</div>
                    <div style={{ fontSize: '0.7rem' }}>Faro Centinel</div>
                </div>
            )
        },
        {
            id: 'news',
            title: 'Smart Feed',
            size: 'wide',
            icon: Bell,
            bg: 'rgba(255,255,255,0.05)',
            content: (
                <div style={{ padding: '1rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ background: '#3b82f6', width: '8px', height: '100%', borderRadius: '10px' }}></div>
                    <div>
                        <div style={{ fontWeight: 'bold' }}>Operativo masivo de limpieza en Avenida del Mar</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Hace 15 minutos • #GestiónUrbana</div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#0a0a0a', 
            color: 'white', 
            fontFamily: "'Inter', sans-serif",
            padding: isMobile ? '1rem' : '2rem'
        }}>
            {/* Header Rediseñado */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: isMobile ? '0 auto 1.5rem auto' : '0 auto 3rem auto',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isMobile ? '1rem' : '0'
            }}>
                <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                      <Zap size={24} color="#3b82f6" />
                      <h1 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: '950', letterSpacing: '-1px', margin: 0 }}>
                         LA SERENA <span style={{ color: '#3b82f6' }}>SMART CITY</span>
                      </h1>
                   </div>
                   <div style={{ fontSize: '0.7rem', opacity: 0.5, letterSpacing: '4px', textTransform: 'uppercase', marginTop: '5px' }}>Bento Edition v3.5 Premium</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right', display: isMobile ? 'none' : 'block' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '900' }}>{currentTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{currentTime.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                    </div>
                    <button onClick={() => navigate('/')} style={{ background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Home size={18} /> <span style={{ fontSize: '0.8rem' }}>PORTAL BASE</span>
                    </button>
                </div>
            </div>

            {/* Grid Bento Box */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gridAutoRows: 'minmax(180px, auto)',
                gap: isMobile ? '1rem' : '1.5rem'
            }}>
                {bentoItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        style={{
                            gridColumn: isMobile ? 'span 1' : (item.size === 'wide' ? (isTablet ? 'span 2' : 'span 4') : item.size === 'large' ? 'span 2' : 'span 1'),
                            gridRow: isMobile ? 'auto' : (item.size === 'large' ? 'span 2' : 'span 1'),
                            background: item.bg,
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '12px' }}>
                                    <item.icon size={18} color="white" />
                                </div>
                                <span style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{item.title}</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {item.content}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Access Bar */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '3rem auto 0 auto',
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                {[
                    { title: 'Paseo 3D', icon: Map },
                    { title: 'Inversores', icon: TrendingUp },
                    { title: 'Salud', icon: Activity },
                    { title: 'Radio', icon: Radio },
                    { title: 'Social', icon: Users }
                ].map((btn, i) => (
                    <button key={i} style={{ flex: 1, minWidth: '150px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'} onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}>
                        <btn.icon size={18} /> {btn.title}
                    </button>
                ))}
            </div>

            <footer style={{ textAlign: 'center', marginTop: '5rem', padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.3, letterSpacing: '5px' }}>LA SERENA 2026 • DIGITAL TWIN SYSTEM</div>
            </footer>
        </div>
    );
}
