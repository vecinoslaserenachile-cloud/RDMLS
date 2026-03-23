import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MonitorPlay, CheckCircle2, Award, PlayCircle, ShieldAlert, Users, Compass, Globe, ArrowLeft, Star, GraduationCap, X, Briefcase } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import EscuelaOficios from '../components/EscuelaOficios';

export default function Elearning() {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEscuelaOficios, setShowEscuelaOficios] = useState(false);
    
    // Sistema de Bookmarking / Progreso
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('vls_elearning_progress');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('vls_elearning_progress', JSON.stringify(progress));
    }, [progress]);

    const markModuleComplete = (courseId, moduleIdx) => {
        setProgress(prev => ({
            ...prev,
            [courseId]: {
                ...(prev[courseId] || {}),
                [moduleIdx]: true
            }
        }));
    };

    const isModuleComplete = (courseId, moduleIdx) => {
        return progress[courseId] && progress[courseId][moduleIdx];
    };

    const getCourseProgress = (courseId, totalModules) => {
        if (!progress[courseId]) return 0;
        const completed = Object.values(progress[courseId]).filter(v => v).length;
        return Math.round((completed / totalModules) * 100);
    };

    const courses = [
        {
            id: 'induccion',
            title: 'Portal de Inducción ComunaSmart',
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
        const completedCount = progress[selectedCourse.id] ? Object.values(progress[selectedCourse.id]).filter(v => v).length : 0;
        const isCertified = completedCount >= selectedCourse.modules.length;

        return (
            <div className="page-container" style={{ paddingBottom: '4rem' }}>
                <header className="page-header" style={{ marginBottom: '2rem' }}>
                    <button onClick={() => setSelectedCourse(null)} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Volver a la Academia
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ padding: '1rem', background: `${selectedCourse.color}20`, borderRadius: '12px' }}>
                            <selectedCourse.icon size={40} color={selectedCourse.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '0.5rem' }}>
                                 <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', background: `${selectedCourse.color}40`, color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>{selectedCourse.category}</span>
                                 <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>{getCourseProgress(selectedCourse.id, selectedCourse.modules.length)}% Completado</span>
                            </div>
                            <h2 className="text-gradient" style={{ margin: 0 }}>{selectedCourse.title}</h2>
                            <p className="text-muted" style={{ margin: '0.5rem 0 0 0' }}>{selectedCourse.desc}</p>
                        </div>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Reproductor de Video (Streaming CDN Externo) */}
                        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: `1px solid ${selectedCourse.color}50`, background: '#000' }}>
                            <div style={{ width: '100%', height: '450px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {!isPlaying ? (
                                    <button onClick={() => setIsPlaying(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10 }}>
                                        <PlayCircle size={80} color="white" className="pulse" />
                                    </button>
                                ) : (
                                    <iframe 
                                        width="100%" height="100%" 
                                        src={`https://www.youtube.com/embed/${selectedCourse.videoId || 'dQw4w9WgXcQ'}?autoplay=1&modestbranding=1&rel=0`} 
                                        title="Curso Video" frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                        style={{ border: 'none' }}
                                    ></iframe>
                                )}
                                {!isPlaying && (
                                    <div style={{ position: 'absolute', inset: 0, opacity: 0.4, background: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop') center/cover` }}></div>
                                )}
                            </div>
                            <div style={{ padding: '1.5rem', background: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: 0, color: 'white' }}>Lección Activa: {selectedCourse.modules[0]}</h3>
                                        <p style={{ margin: '0.5rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Aprende paso a paso con la comunidad VLS.</p>
                                    </div>
                                    <button 
                                        onClick={() => markModuleComplete(selectedCourse.id, 0)}
                                        className="btn btn-primary"
                                        style={{ padding: '0.6rem 1.2rem', background: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}
                                    >
                                        <CheckCircle2 size={16} /> Marcar como Vista
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Descripción extendida / Recursos */}
                        <div className="glass-panel" style={{ padding: '1.5rem' }}>
                            <h4 style={{ color: 'white', marginBottom: '1rem' }}>Recursos del Curso</h4>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>PDF ADJUNTO</p>
                                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Guía de Estudio.pdf</strong>
                                </div>
                                <div style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: '0 0 0.5rem 0' }}>ENLACE</p>
                                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>Comunidad Discord VLS</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Lista de Módulos (Bookmarking) */}
                        <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
                            <h3 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                <MonitorPlay size={20} color={selectedCourse.color} /> Progreso del Alumno
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {selectedCourse.modules.map((mod, i) => {
                                    const complete = isModuleComplete(selectedCourse.id, i);
                                    return (
                                        <div key={i} style={{ 
                                            padding: '1rem', background: complete ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)', 
                                            borderRadius: '12px', border: `1px solid ${complete ? '#10b981' : 'rgba(255,255,255,0.1)'}`,
                                            display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer'
                                        }} onClick={() => markModuleComplete(selectedCourse.id, i)}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: complete ? '#10b981' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {complete ? <CheckCircle2 size={16} /> : i + 1}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.9rem', color: complete ? 'white' : '#cbd5e1', fontWeight: complete ? 'bold' : 'normal' }}>{mod}</div>
                                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>12:45 min</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Certificación Condicional */}
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', background: isCertified ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), #000)' : 'rgba(0,0,0,0.4)', border: `1px solid ${isCertified ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`, opacity: isCertified ? 1 : 0.6 }}>
                            <Award size={48} color={isCertified ? "#fcd34d" : "#475569"} style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Diploma Digital</h3>
                            <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                                {isCertified ? '¡Felicidades! Has completado el 100% del material.' : 'Completa todos los módulos para reclamar tu certificado.'}
                            </p>
                            <button 
                                className="btn btn-primary" 
                                disabled={!isCertified}
                                style={{ background: isCertified ? '#f59e0b' : '#334155', color: isCertified ? 'white' : '#94a3b8', fontWeight: 'bold', width: '100%' }}
                                onClick={() => {
                                    alert("🎓 Autenticando Soberanía Digital...\nGenerando Diploma para: Usuario VLS Local.");
                                    window.open('https://firebasestorage.googleapis.com/v0/b/vecinos-la-serena.appspot.com/o/diploma_demo.pdf?alt=media', '_blank');
                                }}
                            >
                                <Award size={18} /> DESCARGAR DIPLOMA
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ paddingBottom: '4rem' }}>
            <header className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                    <button onClick={() => navigate('/')} className="btn-glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '20px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} /> Volver al Escritorio
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.75rem', background: 'rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
                            <GraduationCap size={32} color="#38bdf8" />
                        </div>
                        <div>
                            <h2 className="text-gradient" style={{ margin: 0 }}>Academia Vecinal P2P</h2>
                            <p className="text-muted" style={{ margin: '0.25rem 0 0 0' }}>Soberanía del Conocimiento: Crea y consume cursos de la comunidad Serenense.</p>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary" 
                    style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', padding: '1rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)' }}
                >
                    <PlayCircle size={20} /> COMPARTIR MI CURSO
                </button>
            </header>

            {/* Modal de Creación P2P */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                            className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', border: '1px solid #38bdf8' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h3 style={{ margin: 0, color: '#38bdf8' }}>Nuevo Curso Comunitario</h3>
                                <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>TÍTULO DEL CURSO</label>
                                    <input type="text" placeholder="Ej: Tallado en Piedra Volcánica" style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>ID DE VIDEO (YOUTUBE/VIMEO)</label>
                                    <input type="text" placeholder="ID del video para streaming externo" style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>DESCRIPCIÓN BREVE</label>
                                    <textarea rows={3} style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', resize: 'none' }}></textarea>
                                </div>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '12px', fontSize: '0.8rem', color: '#38bdf8' }}>
                                    💡 <strong>Nota Técnica:</strong> El video se sirve desde CDNs externos para garantizar la fluidez de la plataforma. La Academia VLS solo gestiona los diplomas y el progreso.
                                </div>
                                <button className="btn btn-primary" style={{ padding: '1.2rem', background: '#38bdf8', color: 'black', fontWeight: 'bold' }} onClick={() => { alert('Curso enviado a revisión por el Consejo Vecinal Smart.'); setShowCreateModal(false); }}>
                                    PUBLICAR EN LA ACADEMIA
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {/* CARD BETA: ESCUELA DE OFICIOS */}
                <button
                    onClick={() => setShowEscuelaOficios(true)}
                    className="glass-panel animate-slide-up"
                    style={{
                        padding: '2rem 1.5rem', border: '2px solid #f59e0b', cursor: 'pointer', textAlign: 'left',
                        background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(0,0,0,0.4))', position: 'relative'
                    }}
                >
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#f59e0b', color: 'black', padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900' }}>BETA V3.5</div>
                    <div style={{ padding: '1rem', background: 'rgba(245,158,11,0.2)', borderRadius: '12px', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <Briefcase size={28} color="#f59e0b" />
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.2rem', fontWeight: '900' }}>Escuela de Oficios P2P</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem', flex: 1 }}>Creole para atención, electricidad y pilotaje de drones técnicos. Micro-certificaciones rápidas.</p>
                    <div style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.85rem' }}>Explorar Oficios &rarr;</div>
                </button>

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
                        onClick={() => { 
                            if (course.id === 'induccion') {
                                navigate('/induccion');
                                return;
                            }
                            setSelectedCourse(course); 
                            setIsPlaying(false); 
                        }}
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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.duration}</span>
                                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold' }}>{getCourseProgress(course.id, course.modules.length)}% completado</span>
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: course.color }}>{getCourseProgress(course.id, course.modules.length) > 0 ? 'Continuar' : 'Iniciar'} &rarr;</span>
                        </div>
                    </button>
                ))}
            </div>
            {showEscuelaOficios && <EscuelaOficios onClose={() => setShowEscuelaOficios(false)} />}
        </div>
    );
}
