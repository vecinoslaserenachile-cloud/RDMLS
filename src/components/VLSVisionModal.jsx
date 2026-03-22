import React, { useState } from 'react';
import { X, Heart, Star, Target, ShieldCheck, Sparkles, MessageSquare, BookOpen, Lightbulb, Users, Handshake } from 'lucide-react';

export default function VLSVisionModal({ onClose }) {
    const [activeSection, setActiveSection] = useState('vision');

    const sections = {
        vision: {
            title: "Nuestra Visión",
            icon: Target,
            color: "#38bdf8",
            content: "Para nosotros, La Serena no es solo edificios lindos y playa; es su gente. Queremos que la tecnología nos sirva a todos por igual, que el WhatsApp del barrio se convierta en una herramienta poderosa y que cada vecino se sienta parte de una ciudad que lo escucha y lo cuida de verdad.",
            quote: "Tecnología de vecino para vecinos, sin complicaciones."
        },
        values: {
            title: "Valores VLS",
            icon: ShieldCheck,
            color: "#10b981",
            content: "Nuestra brújula son los vecinos. Actuamos bajo la transparencia absoluta (Código Abierto), la empatía tecnológica (Interfaces amigables) y la soberanía digital (Hacemos lo propio, no lo arrendado).",
            list: ["Transparencia", "Empatía", "Soberanía", "Innovación Local"]
        },
        capabilities: {
            title: "Lo que Somos Capaces",
            icon: Sparkles,
            color: "#f59e0b",
            content: "Desde el Centro C5 que vigila con IA, hasta el RadioVecino que suena en cada rincón. Somos Smart Citizens reportando luminarias, Smart Administration eliminando el papel, y Smart Listening escuchando el latir de las redes sociales para prevenir problemas.",
            tags: ["Smart Citizens", "Smart Administration", "Smart Events", "Smart Listening"]
        },
        library: {
            title: "Biblioteca del Poder",
            icon: BookOpen,
            color: "#ec4899",
            content: "Nuestra biblioteca es un refugio para el pensamiento crítico. Destacamos 'Televisión Subliminal' (Joan Ferrés, 2001), una obra fundamental que analiza cómo la TV socializa mediante emociones y comunicaciones inadvertidas. Nos inspira a construir interfaces transparentes que respeten la conciencia del ciudadano y no busquen la seducción irracional.",
            featured: "Televisión Subliminal - Joan Ferrés",
            details: "Temas: Seducción narrativa, mitos de la objetividad y el poder del inconsciente en la comunicación masiva."
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(2, 6, 23, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(30px)' }}>
            <div className="glass-panel scale-in" style={{ 
                width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflow: 'hidden', 
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
                borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.3)', 
                display: 'flex', flexDirection: 'column', position: 'relative' 
            }}>
                
                {/* Header */}
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.8rem', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '16px' }}>
                            <Heart size={32} color="#38bdf8" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}>¿Qué es www.vecinoslaserena.cl?</h2>
                            <p style={{ margin: 0, color: '#bae6fd', fontWeight: 'bold' }}>Un sueño de barrio convertido en plataforma inteligente</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '300px 1fr' : '1fr', overflow: 'hidden' }}>
                    
                    {/* Sidebar Nav */}
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                        {Object.entries(sections).map(([key, sec]) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '16px', border: 'none',
                                    background: activeSection === key ? `${sec.color}15` : 'transparent',
                                    color: activeSection === key ? 'white' : '#94a3b8',
                                    cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left'
                                }}
                            >
                                <sec.icon size={20} color={activeSection === key ? sec.color : 'currentColor'} />
                                <span style={{ fontWeight: activeSection === key ? 'bold' : 'normal' }}>{sec.title}</span>
                            </button>
                        ))}

                        {/* Personaje 3D (Serenito) */}
                        <div style={{ marginTop: 'auto', textAlign: 'center', padding: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                            <img 
                                src="/serenito_security_guard_close_up_1773392164475.png" 
                                alt="Serenito" 
                                style={{ width: '120px', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 10px #38bdf8)' }}
                            />
                            <p style={{ color: '#38bdf8', fontSize: '0.8rem', margin: 0, fontWeight: 'bold' }}>"¡Aqui cuidamos lo que amamos!"</p>
                        </div>
                    </div>

                    {/* Content Display */}
                    <div style={{ padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="animate-fade-in" key={activeSection}>
                            <h3 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {sections[activeSection].title}
                            </h3>
                            <p style={{ fontSize: '1.3rem', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '2rem' }}>
                                {sections[activeSection].content}
                            </p>

                            {sections[activeSection].quote && (
                                <div style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '16px', borderLeft: '4px solid #38bdf8', fontStyle: 'italic', fontSize: '1.2rem', color: '#bae6fd' }}>
                                    "{sections[activeSection].quote}"
                                </div>
                            )}

                            {sections[activeSection].list && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {sections[activeSection].list.map(val => (
                                        <div key={val} style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                                            {val}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {sections[activeSection].tags && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                    {sections[activeSection].tags.map(tag => (
                                        <span key={tag} style={{ padding: '0.5rem 1rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fcd34d', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {sections[activeSection].featured && (
                                <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ width: '60px', height: '80px', background: '#ec4899', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '5px 5px 0 rgba(0,0,0,0.5)' }}>
                                        <BookOpen size={30} color="white" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: 'white', margin: 0 }}>Libro Destacado</h4>
                                        <p style={{ color: '#ec4899', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>{sections[activeSection].featured}</p>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Lectura recomendada para el juicio crítico ciudadano.</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer simple */}
                <div style={{ padding: '1rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>Todos los derechos reservados @www.vecinoslaserena.cl VLS SPA</p>
                    <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>CONECTANDO COMUNAS • VECINO SMART</p>
                </div>
            </div>
        </div>
    );
}
