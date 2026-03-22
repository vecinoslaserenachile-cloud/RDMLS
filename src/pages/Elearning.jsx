import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MonitorPlay, CheckCircle2, Award, PlayCircle, ShieldAlert, Users, Compass, Globe, ArrowLeft, Star } from 'lucide-react';

export default function Elearning() {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const courses = [
        {
            id: 'induccion',
            title: 'Portal de Inducción Smart Comuna',
            category: 'Institucional',
            duration: '1 Módulo',
            icon: Star,
            color: '#ec4899',
            desc: 'Inducción obligatoria para nuevos funcionarios y colaboradores. Conoce los 4 pilares y la ética Smart City.',
            modules: ['Bienvenida Institucional', 'Los 4 Pilares VLS', 'Soberanía Digital', 'Código de Ética']
        },
        {
            id: 'ingles',
            title: 'Inglés Básico para Turismo Local',
            category: 'Habilidades',
            duration: '4 Módulos',
            icon: Globe,
            color: '#3b82f6',
            desc: 'Capacitación vecinal para atención de turistas angloparlantes en La Serena.',
            modules: ['Saludos y Presentaciones', 'Direcciones y Lugares', 'Precios y Gastronomía', 'Emergencias']
        },
        {
            id: 'patrimonio',
            title: 'Guía Turístico Patrimonial',
            category: 'Cultura',
            duration: '6 Módulos',
            icon: Compass,
            color: '#f59e0b',
            desc: 'Historia del Plan Serena, monumentos, iglesias de piedra y legado de Gabriel González Videla.',
            modules: ['Historia Prehispánica', 'Época de los Piratas', 'Plan Serena', 'Ruta de las Iglesias']
        },
        {
            id: 'liderazgo',
            title: 'Liderazgo y Dirigencia Vecinal',
            category: 'Comunidad',
            duration: '3 Módulos',
            icon: Users,
            color: '#10b981',
            desc: 'Aprende a formular proyectos de seguridad, postular a fondos y mediación de conflictos.',
            modules: ['Fondos Concursables', 'Resolución de Conflictos', 'Organización Comunitaria']
        },
        {
            id: 'seguridad',
            title: 'Prevención y Seguridad Vecinal',
            category: 'Seguridad',
            duration: '2 Módulos',
            icon: ShieldAlert,
            color: '#ef4444',
            desc: 'Curso rápido sobre protocolos de emergencia, uso de extintores y plan cuadrante.',
            modules: ['Uso Domiciliario de Extintores', 'Comunicación con C-5', 'Identificación de Riesgos']
        }
    ];

    if (selectedCourse) {
        return (
            <div className="page-container" style={{ paddingBottom: '4rem' }}>
                <header className="page-header" style={{ marginBottom: '2rem' }}>
                    <button onClick={() => setSelectedCourse(null)} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Volver a los Cursos
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ padding: '1rem', background: `${selectedCourse.color}20`, borderRadius: '12px' }}>
                            <selectedCourse.icon size={40} color={selectedCourse.color} />
                        </div>
                        <div>
                            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', background: `${selectedCourse.color}40`, color: 'white', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{selectedCourse.category}</span>
                            <h2 className="text-gradient" style={{ margin: 0 }}>{selectedCourse.title}</h2>
                            <p className="text-muted" style={{ margin: '0.5rem 0 0 0' }}>{selectedCourse.desc}</p>
                        </div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>

                    {/* Reproductor de Video */}
                    <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: `1px solid ${selectedCourse.color}50` }}>
                        <div style={{ width: '100%', height: '400px', background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {!isPlaying ? (
                                <button onClick={() => setIsPlaying(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10 }}>
                                    <PlayCircle size={80} color="white" className="pulse" />
                                </button>
                            ) : (
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Curso Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            )}

                            {/* Overlay falso de "Video Cargando" para simular la lección */}
                            {!isPlaying && (
                                <div style={{ position: 'absolute', inset: 0, opacity: 0.5, background: `url('/media__1772927842621.jpg') center/cover` }}></div>
                            )}
                        </div>
                        <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)' }}>
                            <h3 style={{ margin: 0, color: 'white' }}>Módulo 1: Introducción</h3>
                            <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Profesor(a) asignado por IMLS. Aprende los fundamentos en los próximos 15 minutos.</p>
                        </div>
                    </div>

                    {/* Lista de Módulos */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h3 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MonitorPlay size={20} color={selectedCourse.color} /> Plan de Estudios ({selectedCourse.duration})
                        </h3>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {selectedCourse.modules.map((mod, i) => (
                                <button key={i} className={`btn ${i === 0 ? 'btn-primary' : 'btn-glass'}`} style={{ justifyContent: 'flex-start', padding: '1rem', background: i === 0 ? `${selectedCourse.color}40` : '' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: i === 0 ? selectedCourse.color : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: 'white' }}>
                                                {i + 1}
                                            </div>
                                            <span style={{ fontWeight: i === 0 ? 'bold' : 'normal' }}>{mod}</span>
                                        </div>
                                        {i === 0 ? <MonitorPlay size={16} /> : <CheckCircle2 size={16} style={{ opacity: 0.3 }} />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Certificación */}
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(20, 30, 48, 0.9) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <Award size={48} color="#fcd34d" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Certificación Ofical Smart Comuna</h3>
                        <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ha completado los requisitos para este módulo. Obtenga su diploma digital con firma institucional.</p>
                        <button 
                            className="btn btn-primary" 
                            style={{ background: '#f59e0b', color: 'white', fontWeight: 'bold' }}
                            onClick={() => {
                                alert("🎓 Generando Diploma Digital VLS...\n¡Felicidades! Se ha enviado una copia a su correo municipal.");
                                window.open('https://firebasestorage.googleapis.com/v0/b/vecinos-la-serena.appspot.com/o/diploma_demo.pdf?alt=media', '_blank');
                            }}
                        >
                            <Award size={18} className="inline mr-2" /> DESCARGAR DIPLOMA (PDF)
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ paddingBottom: '4rem' }}>
            <header className="page-header" style={{ marginBottom: '2rem' }}>
                <button onClick={() => navigate('/')} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    <ArrowLeft size={16} /> Volver al Escritorio
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px' }}>
                        <BookOpen size={32} color="#f59e0b" className="pulse" />
                    </div>
                    <div>
                        <h2 className="text-gradient" style={{ margin: 0 }}>Smart E-Learning Vecinal</h2>
                        <p className="text-muted" style={{ margin: '0.25rem 0 0 0' }}>Capacitación y desarrollo gratuito para todos los Serenenses.</p>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {courses.map((course, idx) => (
                    <button
                        key={course.id}
                        className="glass-panel animate-slide-up"
                        style={{
                            animationDelay: `${idx * 0.1}s`,
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                            padding: '2rem 1.5rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = `0 10px 30px ${course.color}40`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                        }}
                        onClick={() => { setSelectedCourse(course); setIsPlaying(false); }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ padding: '1rem', background: `${course.color}20`, borderRadius: '12px' }}>
                                <course.icon size={28} color={course.color} />
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#fcd34d', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: '12px' }}>
                                <Star size={12} fill="#fcd34d" /> Recomendado
                            </span>
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.2rem', lineHeight: '1.3' }}>{course.title}</h3>
                        <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>{course.desc}</p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.duration}</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: course.color }}>Iniciar Curso &rarr;</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
