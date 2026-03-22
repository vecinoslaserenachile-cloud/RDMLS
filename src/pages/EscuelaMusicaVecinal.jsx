import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Piano, Music, Headphones, Mic2, Disc, Play, 
    Home, GraduationCap, BookOpen, Settings, Sparkles, Guitar
} from 'lucide-react';
import ReelToReelStudio from '../components/ReelToReelStudio.jsx';
import SmartVerticalReel from '../components/SmartVerticalReel';

export default function EscuelaMusicaVecinal() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('welcome');
    const [isRecording, setIsRecording] = useState(false);
    const [showReel, setShowReel] = useState(false);
    const isMobile = window.innerWidth < 768;

    const COURSES = [
        { id: 'piano', title: 'Piano desde Cero', icon: Piano, color: '#10b981', lessons: 12, desc: 'Aprende las notas y tus primeras melodías sin saber leer partituras.' },
        { id: 'guitar', title: 'Guitarra Popular', icon: Guitar, color: '#f59e0b', lessons: 15, desc: 'Acordes básicos para acompañar tus canciones favoritas.' },
        { id: 'voice', title: 'Canto y Vocalización', icon: Mic2, color: '#ef4444', lessons: 10, desc: 'Descubre tu voz y técnicas de respiración para cantar sin miedo.' },
        { id: 'compose', title: 'Composición y Letras', icon: BookOpen, color: '#a855f7', lessons: 8, desc: 'Escribe tus propias historias y dales una estructura musical.' }
    ];

    const STUDIO_TOOLS = [
        { id: 'record', title: 'Grabación Digital', icon: Mic2, desc: 'Captura tu voz e instrumentos con calidad profesional.' },
        { id: 'mix', title: 'Mezcla y Efectos', icon: Settings, desc: 'Ecualización, Reverb y Delay para darle brillo a tu sonido.' },
        { id: 'master', title: 'Masterización IA', icon: Sparkles, desc: 'Optimización final para que tu música suene potente en Spotify.' }
    ];

    return (
        <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            
            {/* Cabecera Escuela */}
            <div className="glass-panel" style={{ 
                padding: '3rem', 
                borderRadius: '32px', 
                marginBottom: '2rem', 
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}>
                    <Music size={300} />
                </div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', padding: '15px', background: '#8b5cf6', borderRadius: '20px', marginBottom: '1.5rem' }}>
                        <GraduationCap size={48} color="white" />
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        Escuela de Música Vecinal
                    </h1>
                    <p style={{ fontSize: '1.3rem', color: '#ddd', marginTop: '1rem', maxWidth: '800px', marginInline: 'auto' }}>
                        "Transformamos tu pasión en arte. No necesitas conocimientos previos, solo las ganas de crear."
                    </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
                    <button onClick={() => setActiveSection('lessons')} className={`btn ${activeSection === 'lessons' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem 2rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <BookOpen size={20} /> Academia de Instrumentos
                    </button>
                    <button onClick={() => setActiveSection('studio')} className={`btn ${activeSection === 'studio' ? 'btn-primary' : 'btn-glass'}`} style={{ padding: '1rem 2rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '0.8rem', background: activeSection === 'studio' ? '#ef4444' : '', borderColor: activeSection === 'studio' ? '#ef4444' : '' }}>
                        <Disc size={20} /> Laboratorio de Producción
                    </button>
                </div>

                <button 
                    onClick={() => navigate('/')} 
                    className="btn-glass" 
                    style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.5rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}
                >
                    <Home size={18} /> Volver al Portal
                </button>

                {isMobile && (
                    <button 
                        onClick={() => setShowReel(true)} 
                        className="btn-glass animate-pulse-slow" 
                        style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', background: 'linear-gradient(45deg, #8b5cf6, #ef4444)', border: 'none', color: 'white' }}
                    >
                        <Play size={16} /> REEL TUTORIALES
                    </button>
                )}
            </div>

            {/* Contenido Dinámico */}
            <div className="animate-fade-in">
                {activeSection === 'welcome' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px' }}>
                            <h2 style={{ fontSize: '2rem', color: '#a855f7', marginBottom: '1.5rem' }}>¿Cómo funciona?</h2>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.8rem', borderRadius: '50%', height: 'fit-content' }}>1</div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>Elige tu Instrumento</h4>
                                        <p style={{ margin: 0, color: '#94a3b8' }}>Tutoriales guiados por Milagros y nuestro equipo de músicos Smart.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.8rem', borderRadius: '50%', height: 'fit-content' }}>2</div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>Compón y Graba</h4>
                                        <p style={{ margin: 0, color: '#94a3b8' }}>Usa nuestro estudio virtual para capturar tus ideas en tiempo real.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.8rem', borderRadius: '50%', height: 'fit-content' }}>3</div>
                                    <div>
                                        <h4 style={{ margin: 0 }}>Lanzamiento VLS</h4>
                                        <p style={{ margin: 0, color: '#94a3b8' }}>Tu música puede sonar en la Radio Digital Municipal y eventos de la comuna.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <img src="/characters/milagros.png" alt="Música" style={{ height: '400px', filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))' }} />
                        </div>
                    </div>
                )}

                {activeSection === 'lessons' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {COURSES.map(course => (
                            <div key={course.id} className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', borderTop: `6px solid ${course.color}`, transition: 'transform 0.3s' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{ background: `${course.color}20`, padding: '1rem', borderRadius: '15px' }}>
                                        <course.icon size={32} color={course.color} />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: course.color }}>{course.lessons} LECCIONES</span>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0' }}>{course.title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>{course.desc}</p>
                                <button className="btn-glass" style={{ width: '100%', borderColor: course.color, color: course.color }}>Empezar a Aprender</button>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'studio' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #ef444440' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <div>
                                    <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <Mic2 color="#ef4444" /> Consola de Grabación Vecinal
                                    </h2>
                                    <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Graba tu voz o instrumento directamente desde el navegador.</p>
                                </div>
                                <button 
                                    onClick={() => setIsRecording(!isRecording)}
                                    style={{ 
                                        background: isRecording ? '#ef4444' : 'rgba(239, 68, 68, 0.1)', 
                                        color: isRecording ? 'white' : '#ef4444',
                                        border: '1px solid #ef4444',
                                        padding: '1rem 2rem', 
                                        borderRadius: '50px', 
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.8rem',
                                        cursor: 'pointer',
                                        animation: isRecording ? 'pulse-red 1.5s infinite' : 'none'
                                    }}
                                >
                                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: isRecording ? 'white' : '#ef4444' }}></div>
                                    {isRecording ? 'GRABANDO...' : 'INICIAR GRABACIÓN'}
                                </button>
                            </div>
                            
                            <div style={{ height: '150px', background: 'rgba(0,0,0,0.4)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #334155' }}>
                                <div style={{ textAlign: 'center', color: '#475569' }}>
                                    <Headphones size={40} style={{ marginBottom: '0.5rem' }} />
                                    <p>Visualizador de Onda (Waveform) - Esperando Audio</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {STUDIO_TOOLS.map(tool => (
                                <div 
                                    key={tool.id} 
                                    className="glass-panel" 
                                    style={{ padding: '1.5rem', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                                    onClick={() => tool.id === 'master' ? window.dispatchEvent(new CustomEvent('open-reeltoreel')) : null}
                                >
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1.5rem' }}>
                                        <tool.icon size={28} color={tool.id === 'master' ? '#ef4444' : '#38bdf8'} style={{ animation: tool.id === 'master' ? 'pulse 2s infinite' : 'none' }} />
                                    </div>
                                    <h4 style={{ margin: '0 0 0.5rem 0' }}>{tool.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>{tool.desc}</p>
                                    {tool.id === 'master' && <span style={{ fontSize: '0.65rem', background: '#ef4444', padding: '2px 8px', borderRadius: '10px', marginTop: '10px', display: 'inline-block' }}>REVOX ANALOG</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes pulse-red {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
            `}</style>

            {showReel && (
                <SmartVerticalReel 
                    onClose={() => setShowReel(false)}
                    title="MUSIC TUTORIALS VLS"
                    accentColor="#8b5cf6"
                    items={COURSES.map(c => ({
                        title: c.title,
                        desc: c.desc,
                        tag: `${c.lessons} LECCIONES`,
                        bg: c.color,
                        actionText: 'EMPEZAR CLASE'
                    }))}
                />
            )}

        </div>
    );
}
