import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Book, Globe, Wrench, Atom, Shield, Users, Award, 
    ArrowLeft, Brain, GraduationCap, Star, Languages, 
    Cpu, FlaskConical, Calculator, Scale, HeartHandshake, Home, Smartphone, Zap, Play
} from 'lucide-react';
import SmartVerticalReel from '../components/SmartVerticalReel';

export default function EscuelaArtesHumanidades() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showReel, setShowReel] = useState(false);
    const isMobile = window.innerWidth < 768;

    const ACADEMIES = [
        {
            id: 'lectoescritura',
            title: 'Campus Literario',
            subtitle: 'Aprender a Leer y Escribir',
            icon: Book,
            color: '#10b981',
            desc: 'Programas de alfabetización para niños y adultos. Nunca es tarde para abrir las puertas del conocimiento.',
            courses: [
                { id: 'lectura-1', title: 'Mis Primeras Letras', level: 'Básico', duration: '12 lecciones', progress: 0 },
                { id: 'lectura-adultos', title: 'Alfabetización Funcional', level: 'Adultos', duration: '20 lecciones', progress: 0 }
            ]
        },
        {
            id: 'humanidades',
            title: 'Humanidades y Ciudadanía',
            subtitle: 'Pensamiento y Sociedad',
            icon: Scale,
            color: '#3b82f6',
            desc: 'Filosofía, Sociología, Psicología y Educación Cívica para formar ciudadanos críticos.',
            courses: [
                { id: 'civica', title: 'Educación Cívica y Derechos', level: 'Intermedio', duration: '8 lecciones', progress: 0 },
                { id: 'psico', title: 'Introducción a la Psicología', level: 'Básico', duration: '10 lecciones', progress: 0 },
                { id: 'filos', title: 'Filosofía para la Vida', level: 'Avanzado', duration: '15 lecciones', progress: 0 }
            ]
        },
        {
            id: 'ciencias',
            title: 'Ciencias y Tecnología',
            subtitle: 'El Mundo Explicado',
            icon: Atom,
            color: '#a855f7',
            desc: 'Matemáticas, Química, Física e Informática aplicada para el mundo moderno.',
            courses: [
                { id: 'maths', title: 'Matemáticas Cotidianas', level: 'Básico', duration: '12 lecciones', progress: 0 },
                { id: 'physics', title: 'Física en el Entorno', level: 'Intermedio', duration: '10 lecciones', progress: 0 },
                { id: 'code', title: 'Informática y Programación', level: 'Básico', duration: '14 lecciones', progress: 0 }
            ]
        },
        {
            id: 'oficios',
            title: 'Escuela de Oficios',
            subtitle: 'Herramientas para el Trabajo',
            icon: Wrench,
            color: '#f59e0b',
            desc: 'Aprende oficios prácticos y técnicos para emprender y mejorar tu empleabilidad.',
            courses: [
                { id: 'mecanica', title: 'Mecánica Básica', level: 'Oficio', duration: '16 lecciones', progress: 0 },
                { id: 'electricidad', title: 'Electricidad Domiciliaria', level: 'Oficio', duration: '20 lecciones', progress: 0 }
            ]
        },
        {
            id: 'idiomas',
            title: 'Centro de Idiomas',
            subtitle: 'Conectando Lenguajes',
            icon: Languages,
            color: '#ec4899',
            desc: 'Inglés, Mapudungun y comunicación efectiva para la integración cultural.',
            courses: [
                { id: 'english', title: 'Inglés para el Ciudadano', level: 'A1-B1', duration: '30 lecciones', progress: 0 },
                { id: 'mapudungun', title: 'Mapudungun Nivel 1', level: 'Básico', duration: '12 lecciones', progress: 0 }
            ]
        }
    ];

    const filteredAcademies = activeCategory === 'all' 
        ? ACADEMIES 
        : ACADEMIES.filter(acc => acc.id === activeCategory);

    return (
        <div className="page-container" style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '2rem' }}>
            
            {/* Header Escuela */}
            <div className="glass-panel" style={{ 
                padding: '3rem', 
                borderRadius: '32px', 
                marginBottom: '3rem', 
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <button 
                    onClick={() => navigate('/')} 
                    className="btn-glass" 
                    style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.85rem' }}
                >
                    <Home size={16} /> Volver al Portal
                </button>

                {isMobile && (
                    <button 
                        onClick={() => setShowReel(true)} 
                        className="btn-glass animate-pulse-slow" 
                        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', background: 'linear-gradient(45deg, #3b82f6, #10b981)', border: 'none', color: 'white' }}
                    >
                        <Zap size={16} /> MODO EXPLORADOR
                    </button>
                )}

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', padding: '20px', background: 'rgba(59, 130, 246, 0.3)', borderRadius: '30px', marginBottom: '1.5rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(59, 130, 246, 0.5)' }}>
                        <GraduationCap size={56} color="#3b82f6" />
                    </div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: 0, letterSpacing: '-1px' }}>
                        Escuela de Artes & Humanidades
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: '1rem', maxWidth: '700px', marginInline: 'auto', lineHeight: '1.6' }}>
                        Transformando el futuro de La Serena a través de la educación gratuita, inclusiva y de calidad. 
                        Aprende, progresa y obtén tu certificación oficial.
                    </p>
                </div>

                {/* Filtros de Academia */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                    <button 
                        onClick={() => setActiveCategory('all')} 
                        className={`btn ${activeCategory === 'all' ? 'btn-primary' : 'btn-glass'}`}
                        style={{ borderRadius: '20px', padding: '0.6rem 1.5rem' }}
                    >
                        Todas las Academias
                    </button>
                    {ACADEMIES.map(acc => (
                        <button 
                            key={acc.id}
                            onClick={() => setActiveCategory(acc.id)}
                            className={`btn ${activeCategory === acc.id ? 'btn-primary' : 'btn-glass'}`}
                            style={{ 
                                borderRadius: '20px', 
                                padding: '0.6rem 1.5rem',
                                background: activeCategory === acc.id ? acc.color : '',
                                borderColor: activeCategory === acc.id ? acc.color : ''
                            }}
                        >
                            <acc.icon size={18} style={{ marginRight: '8px' }} />
                            {acc.title}
                        </button>
                    ))}
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-museum'))}
                        className="btn-glass"
                        style={{ borderRadius: '20px', padding: '0.6rem 1.5rem', borderColor: '#f59e0b', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}
                    >
                        <Zap size={18} style={{ marginRight: '8px' }} />
                        Museo del Hardware & AR
                    </button>
                </div>
            </div>

            {/* Grid de Academias y Cursos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {filteredAcademies.map((acc, idx) => (
                    <div 
                        key={acc.id} 
                        className="glass-panel animate-slide-up" 
                        style={{ 
                            padding: '2rem', 
                            borderRadius: '24px', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            animationDelay: `${idx * 0.1}s`
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '1rem', background: `${acc.color}20`, borderRadius: '16px', border: `1px solid ${acc.color}40` }}>
                                <acc.icon size={32} color={acc.color} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>{acc.title}</h3>
                                <span style={{ fontSize: '0.85rem', color: acc.color, fontWeight: 'bold' }}>{acc.subtitle}</span>
                            </div>
                        </div>

                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', minHeight: '3rem' }}>
                            {acc.desc}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Cursos Disponibles:</h4>
                            {acc.courses.map(course => (
                                <div 
                                    key={course.id}
                                    style={{ 
                                        padding: '1rem', 
                                        background: 'rgba(255,255,255,0.03)', 
                                        borderRadius: '16px', 
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        transition: 'all 0.3s'
                                    }}
                                    className="hover-lift"
                                >
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{course.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{course.level} • {course.duration}</div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedCourse({ ...course, academy: acc })}
                                        className="btn-glass" 
                                        style={{ padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.8rem', color: acc.color, borderColor: `${acc.color}40` }}
                                    >
                                        Inscribirse
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Curso / E-learning Simulado */}
            {selectedCourse && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5, 10, 25, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div className="glass-panel scale-in" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '3rem', borderRadius: '32px', border: `1px solid ${selectedCourse.academy.color}40` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ padding: '1.2rem', background: `${selectedCourse.academy.color}20`, borderRadius: '20px' }}>
                                    <selectedCourse.academy.icon size={40} color={selectedCourse.academy.color} />
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '2rem', margin: 0 }}>{selectedCourse.title}</h2>
                                    <p style={{ color: '#94a3b8', margin: '0.3rem 0 0 0' }}>Plan de Estudios Oficial Smart Comuna</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCourse(null)} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%' }}>✕</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: selectedCourse.academy.color }}>Lección 1: Fundamentos y Bienvenida</h3>
                                <div style={{ width: '100%', height: '300px', background: '#000', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <button style={{ background: selectedCourse.academy.color, border: 'none', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: `0 0 30px ${selectedCourse.academy.color}60` }}>
                                        <Play color="white" size={32} />
                                    </button>
                                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                                        <div style={{ width: '30%', height: '100%', background: selectedCourse.academy.color, borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '2rem' }}>
                                    <h4 style={{ margin: '0 0 0.8rem 0' }}>Material de Estudio:</h4>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button className="btn-glass" style={{ fontSize: '0.85rem' }}>📄 Guía PDF</button>
                                        <button className="btn-glass" style={{ fontSize: '0.85rem' }}>📝 Autoevaluación</button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Estatus de Certificación</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div>
                                            <span style={{ fontSize: '0.9rem' }}>Módulo 1: Completado</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.4 }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'white' }}></div>
                                            <span style={{ fontSize: '0.9rem' }}>Módulo 2: Pendiente</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.4 }}>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'white' }}></div>
                                            <span style={{ fontSize: '0.9rem' }}>Examen Final: Bloqueado</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                                        <Award size={48} color="#d4af37" style={{ opacity: 0.3, marginBottom: '1rem' }} />
                                        <button disabled className="btn btn-glass" style={{ width: '100%', color: 'var(--text-muted)' }}>Módulos Faltantes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Informativo */}
            <div style={{ marginTop: '5rem', padding: '4rem', textAlign: 'center', borderRadius: '40px', background: 'linear-gradient(to bottom, transparent, rgba(30, 58, 138, 0.2))' }}>
                <Brain size={48} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '2rem' }}>Alimentando la Mente Serenense</h2>
                <p style={{ color: '#94a3b8', maxWidth: '800px', marginInline: 'auto', marginBottom: '3rem' }}>
                    Contenidos validados por curadores expertos y fuentes de código abierto. 
                    Unimos la tecnología con las humanidades para construir una mejor sociedad.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem' }}>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>+25</div>
                        <div style={{ color: '#3b82f6', fontWeight: 'bold' }}>Cursos Gratuitos</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>1.2k</div>
                        <div style={{ color: '#10b981', fontWeight: 'bold' }}>Alumnos Activos</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>500+</div>
                        <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>Diplomas Entregados</div>
                    </div>
                </div>
            </div>

            {showReel && (
                <SmartVerticalReel 
                    onClose={() => setShowReel(false)}
                    title="ACADEMIA VLS SNAP"
                    accentColor="#3b82f6"
                    items={ACADEMIES.map(acc => ({
                        title: acc.title,
                        desc: acc.desc,
                        tag: acc.subtitle,
                        bg: acc.color,
                        actionText: 'INSCRIBIRSE AHORA'
                    }))}
                />
            )}

        </div>
    );
}
