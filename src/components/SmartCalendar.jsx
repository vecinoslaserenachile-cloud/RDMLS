import React, { useState, useEffect } from 'react';
import { 
    X as CloseIcon, Calendar, Clock, Bell, Info, 
    ChevronLeft, ChevronRight, Star, Flag, Music,
    MapPin, Timer, Sparkles, User, Shield, Briefcase, Activity
} from 'lucide-react';

export default function SmartCalendar({ onClose }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Efemérides Nacionales, Regionales y de LA SERENA
    const officialEvents = [
        { 
            id: 'fundacion-ls',
            name: "Fundación de La Serena", 
            date: new Date('2026-08-26'), 
            category: 'Local',
            desc: "Segunda ciudad más antigua de Chile. Homenaje a Juan Bohón.",
            icon: <Star size={18} />, color: '#38bdf8'
        },
        { 
            id: 'batalla-los-loros',
            name: "Batalla de Los Loros", 
            date: new Date('2026-03-14'), // Reciente
            category: 'Histórica',
            desc: "Victoria de la Revolución Constituyente en suelo serenense.",
            icon: <Shield size={18} />, color: '#ef4444'
        },
        { 
            id: 'dia-region',
            name: "Aniversario Región de Coquimbo", 
            date: new Date('2026-04-14'), 
            category: 'Regional',
            desc: "Celebración de la identidad nortina y rural.",
            icon: <MapPin size={18} />, color: '#10b981'
        },
        { 
            id: 'sem-santa',
            name: "Semana Santa", 
            date: new Date('2026-04-03'), 
            category: 'Nacional',
            desc: "Tradición ecuménica y fervor ciudadano.",
            icon: <Sparkles size={18} />, color: '#8b5cf6'
        }
    ];

    // Agendas de Usuarios Autorizados (Simulado para convergencia)
    const userAgendas = [
        { id: 1, type: 'Vecinal', user: 'Presidente JJVV', title: 'Operación Invierno: Limpieza de Quebradas', time: '10:00 AM', status: 'Autorizado' },
        { id: 2, type: 'Municipal', user: 'Admin Segura', title: 'Instalación de Luminarias Paseo Balmaceda', time: '14:30 PM', status: 'En Curso' },
        { id: 3, type: 'Evento', user: 'Cultura VLS', title: 'Ensayo Orquesta Sinfónica Infantil en Memorial', time: '17:00 PM', status: 'Confirmado' }
    ];

    const calculateCountdown = (targetDate) => {
        const diff = targetDate - currentTime;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
            ended: false
        };
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100000, 
            backgroundColor: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(25px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div className="animate-scale-in" style={{
                width: '100%', maxWidth: '1200px', height: '90vh',
                background: 'linear-gradient(165deg, #0f172a, #020617)',
                borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8)'
            }}>
                {/* Header Premium */}
                <header style={{
                    padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #ef4444, #991b1b)',
                            padding: '1.2rem', borderRadius: '22px', boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Calendar size={32} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>
                                HUB DE CONVERGENCIA SMART VLS
                            </h2>
                            <div style={{ display: 'flex', gap: '15px', marginTop: '5px' }}>
                                <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>• AGENDAS AUTORIZADAS</span>
                                <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 'bold' }}>• EFEMÉRIDES LA SERENA</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                        <div style={{ textAlign: 'right', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '2rem' }}>
                            <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', letterSpacing: '2px' }}>
                                {currentTime.toLocaleTimeString('es-CL')}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>
                                {currentTime.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
                            </div>
                        </div>
                        <button onClick={onClose} style={{
                            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white',
                            width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s'
                        }} onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(90deg)'; e.currentTarget.style.background = '#ef4444'; }}
                           onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}>
                            <CloseIcon size={24} />
                        </button>
                    </div>
                </header>

                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    
                    {/* Left: Convergent Flow */}
                    <main style={{ flex: 1, overflowY: 'auto', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        
                        {/* 1. AGENDAS CIUDADANAS (Las Agendas Convergentes) */}
                        <section>
                            <h3 style={{ borderBottom: '2px solid #ef4444', paddingBottom: '0.5rem', width: 'fit-content', color: 'white', fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Briefcase color="#ef4444" size={24} /> AGENDAS CONVERGENTES AUTORIZADAS
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {userAgendas.map(item => (
                                    <div key={item.id} style={{
                                        background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '20px',
                                        border: '1px solid rgba(255,255,255,0.05)', position: 'relative'
                                    }}>
                                        <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#059669', color: 'white', fontSize: '0.6rem', padding: '3px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                                            {item.status}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold', marginBottom: '5px' }}>{item.user}</div>
                                        <h4 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '1rem' }}>{item.title}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', fontSize: '0.8rem' }}>
                                            <Clock size={14} /> {item.time} | <User size={14} /> {item.type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 2. EFEMÉRIDES DESTACADAS (Regional / La Serena) */}
                        <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3rem' }}>
                            <h3 style={{ borderBottom: '2px solid #38bdf8', paddingBottom: '0.5rem', width: 'fit-content', color: 'white', fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Star color="#38bdf8" size={24} /> EFEMÉRIDES & HITOS REGIONALES
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                                {officialEvents.map(event => {
                                    const countdown = calculateCountdown(event.date);
                                    return (
                                        <div key={event.id} style={{
                                            background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: `1px solid ${event.color}33`,
                                            padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                    <div style={{ background: event.color + '20', color: event.color, padding: '0.8rem', borderRadius: '15px' }}>{event.icon}</div>
                                                    <div>
                                                        <h4 style={{ margin: 0, color: 'white', fontSize: '1.2rem' }}>{event.name}</h4>
                                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{event.category.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ color: event.color, fontWeight: '900', fontSize: '1.8rem' }}>{countdown.days}</div>
                                                    <div style={{ fontSize: '0.6rem', color: '#64748b' }}>DÍAS FALTANTES</div>
                                                </div>
                                            </div>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6' }}>{event.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </main>

                    {/* Right: Sidebar */}
                    <aside style={{ width: '400px', background: 'rgba(0,0,0,0.3)', borderLeft: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div>
                            <h4 style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '900' }}>FERIADOS CHILE 2026</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { d: '03', m: 'ABRIL', t: 'Viernes Santo' },
                                    { d: '01', m: 'MAYO', t: 'Día del Trabajador' },
                                    { d: '21', m: 'MAYO', t: 'Glorias Navales' },
                                    { d: '29', m: 'JUNIO', t: 'San Pedro y San Pablo' }
                                ].map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ textAlign: 'center', minWidth: '55px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '1.2rem' }}>
                                            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{f.d}</div>
                                            <div style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 'bold' }}>{f.m}</div>
                                        </div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#cbd5e1' }}>{f.t}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '2.5rem', borderRadius: '28px', border: '1px solid #38bdf844', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Activity color="#38bdf8" size={32} />
                                <div>
                                    <b style={{ color: 'white', fontSize: '1rem' }}>SISTEMA DE ALERTA</b>
                                    <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>MONITOREO DE AGENDA</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
                                "Usa el sistema para coordinar actividades con las organizaciones vecinales y de seguridad."
                            </p>
                            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.8rem', color: '#fca5a5', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Bell size={16} /> EFEMÉRIDE HOY: Batalla de Los Loros.
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            
            <style>{`
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            `}</style>
        </div>
    );
}

