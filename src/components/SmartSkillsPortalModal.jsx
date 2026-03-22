import React, { useState, useEffect } from 'react';
import { Briefcase, X, GraduationCap, Users, FileText, Search, Star, Award, Zap, Linkedin, CheckCircle2, Volume2, Eye, TrendingUp, Globe } from 'lucide-react';

export default function SmartSkillsPortalModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('enrolar');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    // Accesibilidad TTS
    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    const toggleSpeech = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const content = `
                Portal de Empleo, Certificación y Oficios Smart La Serena.
                Pestaña actual: ${activeTab === 'enrolar' ? 'Enrolamiento y Oferta de Servicios' : activeTab === 'capacitacion' ? 'Capacitación y Creación de Currículum' : 'Empresas y Demanda'}.
                Este portal conecta el talento local con las oportunidades laborales del siglo veintiuno.
            `;
            const utterance = new SpeechSynthesisUtterance(content);
            utterance.lang = 'es-CL';
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const bgColor = highContrast ? '#000000' : 'rgba(5, 10, 25, 0.95)';
    const textColor = highContrast ? '#FFFFFF' : 'var(--text-secondary)';
    const accentColor = highContrast ? '#FFFF00' : '#10b981';

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
            <div className={`glass-panel scale-in ${highContrast ? 'high-contrast-mode' : ''}`} style={{ width: '100%', maxWidth: '1200px', height: '90vh', overflowY: 'auto', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: '24px', border: `2px solid ${highContrast ? '#FFFFFF' : 'rgba(16, 185, 129, 0.4)'}`, boxShadow: `0 25px 60px ${highContrast ? 'transparent' : 'rgba(16, 185, 129, 0.15)'}` }}>

                {/* Cabecera */}
                <div style={{ padding: '1.5rem', borderBottom: `1px solid ${highContrast ? '#FFFFFF' : 'rgba(255,255,255,0.1)'}`, background: highContrast ? '#000' : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(4, 120, 87, 0.8) 100%)', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: '1 1 min-content' }}>
                        <h2 className={highContrast ? '' : 'text-gradient'} style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', color: highContrast ? '#FFFF00' : 'inherit' }}>
                            <Briefcase size={32} color={accentColor} style={{ flexShrink: 0 }} />
                            Red Empleo & Oficios
                        </h2>
                        <h3 style={{ margin: '0.5rem 0 0 0', color: accentColor, fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', fontWeight: 'bold', letterSpacing: '1px' }}>VINCULANDO EL TALENTO MUNICIPAL CON EL FUTURO</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                        <button onClick={() => setHighContrast(!highContrast)} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: highContrast ? '#FFF' : 'rgba(255,255,255,0.1)', color: highContrast ? '#000' : 'white', border: highContrast ? '2px solid #000' : 'none' }} title="Alto Contraste">
                            <Eye size={20} />
                        </button>
                        <button onClick={toggleSpeech} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: isSpeaking ? accentColor : (highContrast ? '#FFF' : 'rgba(255,255,255,0.1)'), color: isSpeaking ? 'black' : (highContrast ? '#000' : 'white') }} title="Escuchar Portal">
                            <Volume2 size={20} />
                        </button>
                        <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', background: highContrast ? '#FFF' : 'rgba(255,255,255,0.1)', color: highContrast ? '#000' : 'white' }}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', background: highContrast ? '#000' : 'rgba(0,0,0,0.5)', borderBottom: `1px solid ${highContrast ? '#FFF' : 'rgba(255,255,255,0.05)'}`, flexWrap: 'wrap' }}>
                    {[
                        { id: 'enrolar', label: 'Mis Servicios', icon: Star, color: '#f59e0b' },
                        { id: 'capacitacion', label: 'CV y Cursos', icon: GraduationCap, color: '#38bdf8' },
                        { id: 'empresas', label: 'Empresas', icon: Search, color: '#ec4899' },
                        { id: 'diaspora', label: 'Diáspora', icon: Globe, color: '#a78bfa' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: '1 1 50%',
                                minWidth: '140px',
                                padding: '1rem',
                                background: activeTab === tab.id ? (highContrast ? '#333' : `linear-gradient(to top, ${tab.color}20, transparent)`) : 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? `4px solid ${highContrast ? '#FFF' : tab.color}` : '4px solid transparent',
                                color: activeTab === tab.id ? (highContrast ? '#FFF' : 'white') : textColor,
                                fontWeight: '900',
                                fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.4s',
                                textTransform: 'uppercase',
                                textAlign: 'center'
                            }}
                        >
                            <tab.icon size={20} color={highContrast ? (activeTab === tab.id ? '#FFF' : textColor) : (activeTab === tab.id ? tab.color : 'currentColor')} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Contenido Dinámico */}
                <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1.5rem, 5vw, 3rem)', background: highContrast ? '#000' : 'radial-gradient(circle at center, rgba(15,23,42,0.8) 0%, rgba(0,0,0,1) 100%)' }}>

                    {/* TAB 1: Enrolamiento y Oferta */}
                    {activeTab === 'enrolar' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '2.2rem', margin: '0 0 1rem 0' }}>Enrola tus Talentos en La Serena</h3>
                                <p style={{ color: textColor, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>Desde oficios tradicionales y terapeutas hasta técnicos y profesionales. Publica tus servicios en la vitrina municipal y conéctate con miles de vecinos y empresas locales.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : '#f59e0b'}` }}>
                                    <div style={{ background: highContrast ? '#FFF' : '#f59e0b', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1.5rem' }}>
                                        <TrendingUp size={28} color={highContrast ? '#000' : 'white'} />
                                    </div>
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', marginTop: 0 }}>Categorías en Foco</h4>
                                    <ul style={{ color: textColor, lineHeight: '2', paddingLeft: '1.5rem', fontSize: '1.1rem' }}>
                                        <li><strong>Bienestar y Salud:</strong> Masoterapia, Yoga, Meditación, Terapias.</li>
                                        <li><strong>Educación y Tutorías:</strong> Matemáticas, PAES, Idiomas, Música.</li>
                                        <li><strong>Oficios Técnicos:</strong> Gásfiter, Electricistas, Construcción, Reparaciones.</li>
                                        <li><strong>Servicios Profesionales:</strong> Contabilidad, Diseño, Abogados, Asesorías.</li>
                                    </ul>
                                </div>

                                <div style={{ background: highContrast ? '#111' : 'rgba(0,0,0,0.5)', padding: '2.5rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : 'rgba(255,255,255,0.1)'}`, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 color={accentColor} /> Formulario de Enrolamiento</h4>
                                    <input type="text" placeholder="Tu Especialidad Principal (Ej. Profesor de Matemáticas)" className="input-base" style={{ width: '100%', background: highContrast ? '#000' : 'rgba(255,255,255,0.05)', color: highContrast ? '#FFF' : 'white', border: `1px solid ${highContrast ? '#FFF' : 'rgba(255,255,255,0.2)'}` }} />
                                    <textarea placeholder="Describe brevemente tus años de experiencia y los servicios exactos que ofreces a los vecinos de La Serena..." className="input-base" style={{ width: '100%', minHeight: '100px', background: highContrast ? '#000' : 'rgba(255,255,255,0.05)', color: highContrast ? '#FFF' : 'white', border: `1px solid ${highContrast ? '#FFF' : 'rgba(255,255,255,0.2)'}` }}></textarea>
                                    <button className="btn pulse element-glow" style={{ background: highContrast ? '#FFF' : '#f59e0b', color: '#000', fontWeight: 'bold', fontSize: '1.1rem', padding: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: 'auto' }}>
                                        Publicar en Vitrina Smart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: Capacitación y CV */}
                    {activeTab === 'capacitacion' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '2.2rem', margin: '0 0 1rem 0' }}>Potencia tu Empleabilidad</h3>
                                <p style={{ color: textColor, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>Construye un currículum invencible, optimiza tus perfiles en redes profesionales y adquiere las competencias blandas y duras que exige el mercado laboral actual.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : '#38bdf8'}`, textAlign: 'center' }}>
                                    <FileText size={48} color={highContrast ? '#FFF' : "#38bdf8"} style={{ margin: '0 auto 1.5rem auto' }} />
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Generador de CV de Alto Impacto</h4>
                                    <p style={{ color: textColor, marginBottom: '1.5rem' }}>Utiliza nuestras plantillas diseñadas con IA para superar los algoritmos de reclutamiento (ATS). Destaca tus fortalezas con diseños limpios y exitosos.</p>
                                    <button className="btn-glass" style={{ width: '100%', borderColor: highContrast ? '#FFF' : '#38bdf8', color: highContrast ? '#FFF' : '#38bdf8' }}>Crear mi CV Ahora</button>
                                </div>

                                <div style={{ background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(14, 118, 168, 0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : '#0e76a8'}`, textAlign: 'center' }}>
                                    <Linkedin size={48} color={highContrast ? '#FFF' : "#0e76a8"} style={{ margin: '0 auto 1.5rem auto' }} />
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Asesoría LinkedIn & Redes</h4>
                                    <p style={{ color: textColor, marginBottom: '1.5rem' }}>Aprende a vender tu marca personal. Talleres asíncronos para optimizar tu perfil de LinkedIn y atraer reclutadores directamente a tu bandeja de entrada.</p>
                                    <button className="btn-glass" style={{ width: '100%', borderColor: highContrast ? '#FFF' : '#0e76a8', color: highContrast ? '#FFF' : '#0e76a8' }}>Ver Talleres Digitales</button>
                                </div>

                                <div style={{ background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : '#a78bfa'}`, textAlign: 'center', gridColumn: '1 / -1' }}>
                                    <Award size={48} color={highContrast ? '#FFF' : "#a78bfa"} style={{ margin: '0 auto 1.5rem auto' }} />
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Academia de Competencias (Blandas y Duras)</h4>
                                    <p style={{ color: textColor, marginBottom: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>Fórmate en las habilidades más demandadas: Liderazgo, resolución de problemas, alfabetización digital básica, manipulación de alimentos, y servicio al cliente.</p>
                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                                        <button className="btn" style={{ background: highContrast ? '#FFF' : '#a78bfa', color: '#000', fontWeight: 'bold' }}>Ingresar al E-Learning Municipal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: Empresas y Demanda */}
                    {activeTab === 'empresas' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '2.2rem', margin: '0 0 1rem 0' }}>Búsqueda de Talento y Servicios</h3>
                                <p style={{ color: textColor, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>¿Eres una empresa buscando contratación local o un vecino que necesita un servicio urgente en su hogar? Encuentra a los mejores especialistas validados de La Serena.</p>
                            </div>

                            <div style={{ background: highContrast ? '#111' : 'rgba(0,0,0,0.5)', padding: '2.5rem', borderRadius: '24px', border: `2px solid ${highContrast ? '#FFF' : 'rgba(236, 72, 153, 0.4)'}`, display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ background: highContrast ? '#FFF' : '#ec4899', padding: '1rem', borderRadius: '50%', boxShadow: highContrast ? 'none' : '0 0 20px #ec4899' }}>
                                    <Search size={40} color={highContrast ? '#000' : 'white'} />
                                </div>
                                <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.8rem', margin: 0 }}>Motor de Búsqueda Laboral IA</h4>

                                <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '800px', marginTop: '1rem' }}>
                                    <input type="text" placeholder="Ej: Especialista en preparación PAES, Gásfiter cerificado, Masajista..." className="input-base" style={{ flex: 1, padding: '1.2rem', fontSize: '1.1rem', background: highContrast ? '#000' : 'rgba(255,255,255,0.05)', color: highContrast ? '#FFF' : 'white', border: `1px solid ${highContrast ? '#FFF' : 'rgba(255,255,255,0.2)'}`, borderRadius: '12px' }} />
                                    <button className="btn pulse element-glow" style={{ background: highContrast ? '#FFF' : '#ec4899', color: '#000', fontWeight: 'bold', fontSize: '1.1rem', padding: '0 2rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
                                        Buscar Talento
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: textColor }}>Búsquedas populares:</span>
                                    <span style={{ background: highContrast ? '#333' : 'rgba(236, 72, 153, 0.2)', color: highContrast ? '#FFF' : '#ec4899', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>Yoga Integral</span>
                                    <span style={{ background: highContrast ? '#333' : 'rgba(236, 72, 153, 0.2)', color: highContrast ? '#FFF' : '#ec4899', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>Reparación PC</span>
                                    <span style={{ background: highContrast ? '#333' : 'rgba(236, 72, 153, 0.2)', color: highContrast ? '#FFF' : '#ec4899', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>Tutoría Matemáticas Médium</span>
                                    <span style={{ background: highContrast ? '#333' : 'rgba(236, 72, 153, 0.2)', color: highContrast ? '#FFF' : '#ec4899', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>Administrativo(a)</span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                {[
                                    { nombre: 'Juan Pérez', especialidad: 'Clases PAES (Matemáticas)', dist: 'A 2 km de ti', rating: 4.9 },
                                    { nombre: 'María González', especialidad: 'Terapia Reiki y Masajes', dist: 'Centro de La Serena', rating: 5.0 },
                                    { nombre: 'Miguel Herrera', especialidad: 'Electricista Autorizado SEC', dist: 'Las Compañías', rating: 4.8 }
                                ].map((prof, i) => (
                                    <div key={i} style={{ padding: '1.5rem', borderRadius: '16px', background: highContrast ? '#111' : 'rgba(255,255,255,0.03)', border: `1px solid ${highContrast ? '#FFF' : 'rgba(255,255,255,0.1)'}` }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: highContrast ? '#FFF' : 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Users size={24} color={highContrast ? '#000' : '#ec4899'} />
                                            </div>
                                            <div>
                                                <h5 style={{ margin: 0, color: highContrast ? '#FFF' : 'white', fontSize: '1.1rem' }}>{prof.nombre}</h5>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f59e0b', fontSize: '0.9rem' }}>
                                                    <Star size={14} fill="#f59e0b" /> {prof.rating}
                                                </div>
                                            </div>
                                        </div>
                                        <p style={{ color: highContrast ? '#FFF' : '#ec4899', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{prof.especialidad}</p>
                                        <p style={{ color: textColor, margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{prof.dist}</p>
                                        <button className="btn-glass" style={{ width: '100%', fontSize: '0.9rem', borderColor: highContrast ? '#FFF' : 'rgba(255,255,255,0.2)' }}>Contactar Profesonal</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: Red Serena Mundo (Diáspora y Nuevos Residentes) */}
                    {activeTab === 'diaspora' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '2.2rem', margin: '0 0 1rem 0' }}>Red Serena Mundo (Diáspora y Nuevos Vecinos)</h3>
                                <p style={{ color: textColor, fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>Conectando a las generaciones de Serenenses que emigraron por el mundo en el último siglo, y abrazando a quienes hoy eligen nuestra Smart City como su nuevo hogar.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(167, 139, 250, 0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : '#a78bfa'}`, textAlign: 'center' }}>
                                    <Globe size={48} color={highContrast ? '#FFF' : "#a78bfa"} style={{ margin: '0 auto 1.5rem auto' }} />
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Serenenses en el Exterior</h4>
                                    <p style={{ color: textColor, marginBottom: '2rem' }}>Forma parte del mapa mundial colaborativo. ¿Vives en Australia, Europa o Norteamérica? Encuentra a otros "papayeros" y establece redes de contacto profesional y apoyo emocional internacional.</p>
                                    <button className="btn" style={{ background: highContrast ? '#FFF' : '#a78bfa', color: '#000', fontWeight: 'bold', width: '100%', padding: '1rem', borderRadius: '12px', border: 'none' }}>Registrarme en el Exterior</button>
                                </div>

                                <div style={{ background: highContrast ? '#111' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: `1px solid ${highContrast ? '#FFF' : '#10b981'}`, textAlign: 'center' }}>
                                    <Users size={48} color={highContrast ? '#FFF' : "#10b981"} style={{ margin: '0 auto 1.5rem auto' }} />
                                    <h4 style={{ color: highContrast ? '#FFF' : 'white', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Nuevos Colonos y Residentes</h4>
                                    <p style={{ color: textColor, marginBottom: '2rem' }}>¿Acabas de llegar a establecerte en La Serena rural o urbana? Accede aquí a redes de contacto primarias, recomendaciones de oficios locales y grupos de adaptación a tu nuevo barrio.</p>
                                    <button className="btn" style={{ background: highContrast ? '#FFF' : '#10b981', color: '#000', fontWeight: 'bold', width: '100%', padding: '1rem', borderRadius: '12px', border: 'none' }}>Bienvenido a tu Nueva Ciudad</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
