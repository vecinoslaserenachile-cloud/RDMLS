import React, { useState } from 'react';
import { X, Play, Film, Music, GraduationCap, Users, Monitor, Volume2, Maximize2 } from 'lucide-react';

export default function SmartTheater({ onClose }) {
    const [activeContent, setActiveContent] = useState(null); // { type, id, title }

    const programs = [
        {
            category: "Cine & Cortometrajes",
            icon: Film,
            items: [
                { id: 'XhiYJZ-po9U', title: 'Sundance La Serena: Selección Regional', type: 'film' },
                { id: 'n3LZGaXvqiY', title: 'Documental: La Serena de Antaño', type: 'film' },
            ]
        },
        {
            category: "Retro TV & Series",
            icon: Monitor,
            items: [
                { id: 'Y2qGy-ezuIY', title: 'El Hombre Nuclear', type: 'series' },
                { id: 'oc_DiS6XNTo', title: 'La Mujer Biónica', type: 'series' },
                { id: 't3uKEHojJGg', title: 'El Hombre Increíble', type: 'series' },
                { id: 'qlICHi6Vvn0', title: 'El Auto Fantástico (KITT)', type: 'series' },
            ]
        },
        {
            category: "Teatro & Obras",
            icon: Users,
            items: [
                { id: 'O6rEZwVbIPY', title: 'Obra Infantil: Serenito y el Cuidado del Agua', type: 'theater' },
                { id: 'mn9Joe3cWaQ', title: 'Gala de Comedia: Teatro Municipal', type: 'theater' },
            ]
        },
        {
            category: "Recitales & Conciertos",
            icon: Music,
            items: [
                { id: 'OMOGaugKpjw', title: 'Concierto Orquesta Filarmónica Regional', type: 'concert' },
                { id: 'KL8pW65W7wM', title: 'Gala de Jazz: Bajo las Estrellas', type: 'concert' },
            ]
        },
        {
            category: "Licenciaturas & Actos",
            icon: GraduationCap,
            items: [
                { id: '_MeFYP4PkqU', title: 'Licenciatura 2025: Colegio Seminario Conciliar', type: 'event' },
                { id: 'hTWKbfoikeg', title: 'Acto de Fin de Año: Escuela de Música', type: 'event' },
            ]
        }
    ];

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100003,
            background: 'rgba(0,0,0,0.98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {/* Ambient Lighting Background */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)', opacity: 0.8 }} />

            <div className="theater-casing" style={{
                width: '100%', maxWidth: '1200px', height: '90vh',
                position: 'relative', display: 'flex', flexDirection: 'column',
                boxShadow: '0 0 100px rgba(255, 0, 0, 0.1)'
            }}>
                {/* Stage Header */}
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#ef4444', padding: '1rem', borderRadius: '50%', boxShadow: '0 0 20px #ef4444' }}>
                            <Film size={28} color="white" />
                        </div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: '900', letterSpacing: '2px' }}>TEATRO MUNICIPAL SMART</h2>
                            <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>CENTRO CULTURAL DIGITAL LA SERENA</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                {/* Main Screen Area */}
                <div style={{ 
                    flex: 1, position: 'relative', overflow: 'hidden', padding: '0 2rem',
                    display: 'flex', gap: '2rem'
                }}>
                    {/* The Screen */}
                    <div style={{ 
                        flex: 3, background: '#0a0a0a', borderRadius: '12px', border: '5px solid #222',
                        boxShadow: '0 0 50px rgba(0,0,0,1), inset 0 0 20px rgba(255,255,255,0.1)',
                        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {activeContent ? (
                            <iframe 
                                src={`https://www.youtube.com/embed/${activeContent.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        ) : (
                            <div style={{ textAlign: 'center', color: '#444' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>🎬</div>
                                <h3 style={{ textTransform: 'uppercase', letterSpacing: '5px' }}>Seleccione una función</h3>
                            </div>
                        )}
                        {/* Cinema Curtains (Aesthetics) */}
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '40px', background: 'linear-gradient(90deg, #800 0%, transparent 100%)', opacity: 0.5, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(-90deg, #800 0%, transparent 100%)', opacity: 0.5, pointerEvents: 'none' }} />
                    </div>

                    {/* Content Sidebar */}
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '1rem' }}>
                        {programs.map((cat, idx) => (
                            <div key={idx}>
                                <h4 style={{ color: '#ef4444', borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                                    <cat.icon size={16} /> {cat.category}
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {cat.items.map(item => (
                                        <button 
                                            key={item.id}
                                            onClick={() => setActiveContent(item)}
                                            style={{ 
                                                padding: '1rem', background: activeContent?.id === item.id ? '#ef4444' : 'rgba(255,255,255,0.05)',
                                                border: 'none', color: activeContent?.id === item.id ? 'white' : '#94a3b8',
                                                borderRadius: '8px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                                                fontSize: '0.85rem', display: 'flex', gap: '10px'
                                            }}
                                        >
                                            <Play size={14} style={{ marginTop: '2px' }} />
                                            <span>{item.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Theater Controls UI */}
                <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', zInter: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 2rem', borderRadius: '50px' }}>
                        <Volume2 size={20} color="#666" />
                        <div style={{ width: '100px', height: '4px', background: '#333', borderRadius: '2px' }}>
                            <div style={{ width: '70%', height: '100%', background: '#ef4444', borderRadius: '2px' }} />
                        </div>
                        <Maximize2 size={20} color="#666" style={{ marginLeft: '1rem', cursor: 'pointer' }} />
                    </div>
                </div>

                {/* Floor Shadows */}
                <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '100px', background: 'radial-gradient(ellipse at bottom, rgba(239, 68, 68, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </div>

            <style>{`
                .theater-casing::-webkit-scrollbar { width: 4px; }
                .theater-casing::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            `}</style>
        </div>
    );
}
