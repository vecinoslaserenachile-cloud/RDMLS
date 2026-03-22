import React, { useState } from 'react';
import { X, Clock, DollarSign, Trees, Activity, Brain, Server, ShieldCheck, Cpu, Star, Users, Heart, Maximize, Minimize, ChevronLeft, ChevronRight, Smartphone, Gamepad2, Building, Network, Target, Layout, Map, Leaf, ShieldAlert } from 'lucide-react';

export default function ProjectInfoModal({ onClose }) {
    const tabsLayout = [
        { id: 'slide1', label: '1. Introducción', icon: Heart, color: '#ec4899' },
        { id: 'slide2', label: '2. Descentralización', icon: Server, color: '#3b82f6' },
        { id: 'slide3', label: '3. Tecnología', icon: Smartphone, color: '#8b5cf6' },
        { id: 'slide4', label: '4. Eficiencia', icon: Trees, color: '#10b981' },
        { id: 'slide5', label: '5. Módulos', icon: Layout, color: '#f59e0b' },
        { id: 'slide6', label: '6. Roadmap', icon: Clock, color: '#38bdf8' },
        { id: 'slide7', label: '7. FODA', icon: Target, color: '#ef4444' },
        { id: 'slide8', label: '8. Gamificación', icon: Gamepad2, color: '#d4af37' },
        { id: 'slide9', label: '9. Integración A/B', icon: Building, color: '#00ffcc' },
        { id: 'slide10', label: '10. Integración C', icon: Network, color: '#a78bfa' }
    ];
    const [activeTab, setActiveTab] = useState('slide1');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleNext = () => {
        const idx = tabsLayout.findIndex(t => t.id === activeTab);
        if (idx < tabsLayout.length - 1) setActiveTab(tabsLayout[idx + 1].id);
    };

    const handlePrev = () => {
        const idx = tabsLayout.findIndex(t => t.id === activeTab);
        if (idx > 0) setActiveTab(tabsLayout[idx - 1].id);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
            <div className="glass-panel scale-in" style={{ width: '100%', maxWidth: isFullscreen ? '100vw' : '1200px', height: isFullscreen ? '100vh' : '90vh', overflowY: 'auto', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: isFullscreen ? '0px' : '24px', border: isFullscreen ? 'none' : '2px solid rgba(56, 189, 248, 0.4)', boxShadow: isFullscreen ? 'none' : '0 25px 60px rgba(56, 189, 248, 0.15)', transition: 'all 0.3s' }}>

                {/* Cabecera Interactiva Premium */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(0, 102, 204, 0.8) 100%)', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: '1 1 min-content' }}>
                        <h2 className="text-gradient" style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', display: 'flex', alignItems: 'center', gap: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            <Star size={28} color="#fcd34d" style={{ animation: 'spin 10s linear infinite', flexShrink: 0 }} />
                            ComunaSmart La Serena 2026
                        </h2>
                        <h3 style={{ margin: '0.5rem 0 0 0', color: '#fcd34d', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 'bold', letterSpacing: '1px' }}>"INNOVACIÓN MUNICIPAL DE NIVEL MUNDIAL CENTRADA EN LAS PERSONAS"</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={() => setIsFullscreen(!isFullscreen)} className="btn-glass" title="Modo Presentación" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                            {isFullscreen ? <Minimize size={24} color="white" /> : <Maximize size={24} color="white" />}
                        </button>
                        <button onClick={onClose} className="btn-glass" title="Cerrar" style={{ padding: '0.8rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', flexShrink: 0, border: '1px solid rgba(239, 68, 68, 0.5)', cursor: 'pointer' }}>
                            <X size={24} color="white" />
                        </button>
                    </div>
                </div>

                {/* Tab Navigation Rediseñada para 10 Slides */}
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {tabsLayout.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: '0 0 auto',
                                padding: '1rem 1.5rem',
                                background: activeTab === tab.id ? `linear-gradient(to top, ${tab.color}20, transparent)` : 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? `4px solid ${tab.color}` : '4px solid transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                                fontWeight: '900',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.4s',
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <tab.icon size={18} color={activeTab === tab.id ? tab.color : 'currentColor'} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Contenido Dinámico de las Diapositivas */}
                <div style={{ flex: 1, overflowY: 'auto', padding: isFullscreen ? 'clamp(1.5rem, 5vw, 6rem)' : 'clamp(1.5rem, 5vw, 3rem)', background: 'radial-gradient(circle at center, rgba(15,23,42,0.8) 0%, rgba(0,0,0,1) 100%)', position: 'relative' }}>

                    {activeTab !== tabsLayout[0].id && (
                        <button onClick={handlePrev} className="pulse" style={{ position: 'fixed', left: '20px', top: '55%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', padding: '1rem', cursor: 'pointer', zIndex: 10 }}>
                            <ChevronLeft size={32} color="white" />
                        </button>
                    )}

                    {activeTab !== tabsLayout[tabsLayout.length - 1].id && (
                        <button onClick={handleNext} className="pulse" style={{ position: 'fixed', right: '20px', top: '55%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', padding: '1rem', cursor: 'pointer', zIndex: 10 }}>
                            <ChevronRight size={32} color="white" />
                        </button>
                    )}

                    {/* DIAPOSITIVA 1: INTRODUCCIÓN */}
                    {activeTab === 'slide1' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#ec4899', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(236,72,153,0.5)' }}>
                                    <Heart size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>La Serena Smart City: De la Tradición a la Innovación Social</h3>
                            </div>
                            <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0.8) 100%)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(236,72,153,0.4)' }}>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ color: '#ec4899', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={24} /> Visión General</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>Presentación de "ComunaSmart", una plataforma tecnológica de bajo costo y código cerrado/abierto mixto diseñada exclusivamente para la Ilustre Municipalidad de La Serena.</p>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ color: '#ec4899', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={24} /> El Concepto "Humano-Céntrico"</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>La tecnología no reemplaza el valor humano ni el patrimonio de La Serena, sino que lo potencia. Acercar el municipio a las personas, rompiendo brechas digitales con interfaces amigables ("Home-Made").</p>
                                </div>
                                <div style={{ background: 'rgba(236,72,153,0.1)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #ec4899' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>Fundamentación Social</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>Fomentar la participación vecinal proactiva, la seguridad comunitaria en los barrios y recuperar el orgullo por la riqueza histórica y cultural serenense.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 2: FUNDAMENTACIÓN TÉCNICA */}
                    {activeTab === 'slide2' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#3b82f6', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}>
                                    <Server size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Descentralización y Autonomía Digital Municipal</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Fundamentación Técnica e Infraestructura de Respuesta Rápida.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(59,130,246,0.4)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><ShieldCheck size={120} color="#3b82f6" /></div>
                                    <h4 style={{ color: '#3b82f6', fontSize: '1.5rem', marginBottom: '1rem' }}>Centro de Comando (C5)</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>Descentralización operativa para el monitoreo de redes y videos mediante Inteligencia Artificial. Acceso en tiempo real a la seguridad pública territorial.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(16,185,129,0.4)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}><Trees size={120} color="#10b981" /></div>
                                    <h4 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem' }}>Cero Burocracia</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>Eliminación total del papeleo ("Paperless") mediante la digitalización integral de procesos, firmas digitales y flujos de trabajo en directo para trabajadores a honorarios y contrata.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(0,0,0,0.8))', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(245,158,11,0.4)', position: 'relative', overflow: 'hidden', gridColumn: '1 / -1' }}>
                                    <h4 style={{ color: '#f59e0b', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Activity size={28} /> Capacidad de Respuesta (Smart Listening)</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6', margin: 0 }}>Motorización inteligente de requerimientos vecinales y reportes ambientales y urbanos completamente georreferenciados (baches en vías, luminarias defectuosas, seguridad en playas, estado de los humedales).</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 3: TECNOLOGÍA */}
                    {activeTab === 'slide3' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#8b5cf6', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
                                    <Cpu size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Arquitectura Robusta, Liviana y Escalable</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Lenguaje y Tecnología detrás de la Plataforma.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', borderLeft: '5px solid #8b5cf6' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Server color="#8b5cf6" /> Stack Tecnológico Moderno</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>Construido sobre <strong>React.js / Vite</strong> y <strong>JavaScript</strong>, garantizando una experiencia de usuario (UX) ultrarrápida como *Single Page Application* sin recargas.</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', borderLeft: '5px solid #38bdf8' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Smartphone color="#38bdf8" /> Diseño "Mobile-First"</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>Requisito absoluto. Prioriza la operatividad en smartphones, garantizando accesibilidad desde cualquier lugar bajo un diseño estético institucional limpio (Glassmorphism y Neon) e innovador.</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', borderLeft: '5px solid #ec4899' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Brain color="#ec4899" /> Inteligencia Artificial Local</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}><strong>"Faro IA"</strong>, un motor conversacional empático y positivo con conocimiento exhaustivo de la historia local, pueblos originarios de la región (Diaguitas, Changos, Molles, Las Ánimas) e información institucional y de trámites municipales.</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '20px', borderLeft: '5px solid #fcd34d' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Map color="#fcd34d" /> Ecosistema Multimedia 3D</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>Herramientas nativas para el despliegue de avatares interactivos, mapas urbanos tácticos, el Paseo Histórico 3D inmersivo (tipo tanque) y Cuadros de Distancia regionales integrados.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 4: EFICIENCIA Y COSTOS */}
                    {activeTab === 'slide4' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#10b981', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(16,185,129,0.5)' }}>
                                    <DollarSign size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Hacer más con menos: El modelo "Bajo Costo - Alto Impacto"</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Ventajas Operativas y Eficiencia Presupuestaria de Costos.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0.6) 100%)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)', textAlign: 'center' }}>
                                    <Trees size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Reducción de Costos ("Paperless")</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>Sustitución dramática de trámites físicos, eliminando sistemáticamente las compras de papel, tóners e impresoras en las delegaciones municipales.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(0,0,0,0.6) 100%)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(56,189,248,0.3)', textAlign: 'center' }}>
                                    <Clock size={40} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Ahorro de Horas Hombre (HH)</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>Automatización del control de eventos, precedencias de autoridades (Smart Events) y digitalización auto-asistida del Portal de Inducción E-learning.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(0,0,0,0.6) 100%)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(245,158,11,0.3)', textAlign: 'center' }}>
                                    <Map size={40} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Optimización de Recursos Terreno</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>El mapa táctico y la geolocalización de incidentes permite trazar las mejores rutas logísticas y de seguridad, ahorrando combustible y tiempo de respuesta.</p>
                                </div>
                                <div style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(0,0,0,0.6) 100%)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(236,72,153,0.3)', textAlign: 'center' }}>
                                    <Network size={40} color="#ec4899" style={{ marginBottom: '1rem' }} />
                                    <h4 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Arquitectura Independiente</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>Evita las costosas licencias anuales de software privativo extranjero, logrando verdadera soberanía digital comunal apoyada en tecnologías abiertas.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 5: MÓDULOS (Vecinos vs Backoffice) */}
                    {activeTab === 'slide5' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#f59e0b', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(245,158,11,0.5)' }}>
                                    <Layout size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Sinergia Digital: Del Reporte en la Calle a la Solución en la Oficina</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Funcionamiento Específico de los Módulos Paralelos.</p>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                                {/* Smart Citizens */}
                                <div style={{ flex: '1 1 400px', background: 'linear-gradient(180deg, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0.8) 100%)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(56,189,248,0.4)', position: 'relative' }}>
                                    <Users size={60} color="#38bdf8" style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }} />
                                    <h4 style={{ color: '#38bdf8', fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(56,189,248,0.2)', paddingBottom: '0.5rem' }}>Smart Citizens<br /><span style={{ fontSize: '1rem', color: 'white' }}>(Front-End Vecinal)</span></h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                        Portal ciudadano intuitivo que entrega servicios esenciales y cercanía comunal:
                                    </p>
                                    <ul style={{ color: 'white', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1.2rem', fontSize: '1.1rem' }}>
                                        <li>Registro remoto de accesos comerciales.</li>
                                        <li>Alertas comunitarias y reportes rápidos.</li>
                                        <li>Radio Digital Municipal y estudio musical.</li>
                                        <li>Exploración de panoramas y distancias turísticas en La Serena interactiva.</li>
                                    </ul>
                                </div>

                                {/* Smart Administration */}
                                <div style={{ flex: '1 1 400px', background: 'linear-gradient(180deg, rgba(16,185,129,0.15) 0%, rgba(0,0,0,0.8) 100%)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(16,185,129,0.4)', position: 'relative' }}>
                                    <ShieldAlert size={60} color="#10b981" style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }} />
                                    <h4 style={{ color: '#10b981', fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(16,185,129,0.2)', paddingBottom: '0.5rem' }}>Smart Administration<br /><span style={{ fontSize: '1rem', color: 'white' }}>(Back-End Municipal / App In-Situ)</span></h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                                        El Centro de Gestión oficial donde los funcionarios monitorean y resuelven las alertas ciudadanas (*Smart Listening*).
                                    </p>
                                    <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', borderLeft: '4px solid #10b981' }}>
                                        <h5 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>App Fiscalizadora (Móvil)</h5>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1rem', lineHeight: '1.5' }}>Herramienta robusta de estabilidad multimedia que abre la cámara, graba y sube fotos/audios directamente al servidor al realizar un control en terreno, garantizando la trazabilidad absoluta del reporte institucional.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 6: ROADMAP GANTT */}
                    {activeTab === 'slide6' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#38bdf8', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(56,189,248,0.5)' }}>
                                    <Clock size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Hoja de Ruta para el Despliegue 2026/2027</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Planificación y Carta Gantt Estratégica en 5 Fases.</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(90deg, rgba(236,72,153,0.1), transparent)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #ec4899' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#ec4899', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>1</div>
                                    <div>
                                        <h4 style={{ color: 'white', margin: '0 0 0.2rem 0', fontSize: '1.2rem' }}>Fase 1: Arquitectura y Prototipado Base</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Levantamiento del diseño <em>Mobile-First</em>, arquitectura de menús principales y desarrollo total del Dashboard Ciudadano.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(90deg, rgba(59,130,246,0.1), transparent)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #3b82f6' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>2</div>
                                    <div>
                                        <h4 style={{ color: 'white', margin: '0 0 0.2rem 0', fontSize: '1.2rem' }}>Fase 2: Desarrollo Backend y Módulos Fundamentales</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Sistema de permisos/autenticación de funcionarios, recepción de data georreferenciada y estabilización de la subida multimedia en dispositivos móviles.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(90deg, rgba(16,185,129,0.1), transparent)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>3</div>
                                    <div>
                                        <h4 style={{ color: 'white', margin: '0 0 0.2rem 0', fontSize: '1.2rem' }}>Fase 3: Ecosistema "Smart Skills" & IA</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Implementación del Portal E-learning para capacitación, Bus del Tiempo, Motor inmersivo 3D y despliegue local del asistente cognitivo "Faro IA".</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(90deg, rgba(245,158,11,0.1), transparent)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>4</div>
                                    <div>
                                        <h4 style={{ color: 'white', margin: '0 0 0.2rem 0', fontSize: '1.2rem' }}>Fase 4: QA, Pruebas y Marcha Blanca</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Testeos rigurosos de estrés en terreno con juntas de vecinos pioneras y procesos de capacitación formal en las oficinas y delegaciones municipales.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(90deg, rgba(167,139,250,0.1), transparent)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #a78bfa' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#a78bfa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', flexShrink: 0 }}>5</div>
                                    <div>
                                        <h4 style={{ color: 'white', margin: '0 0 0.2rem 0', fontSize: '1.2rem' }}>Fase 5: Lanzamiento Oficial y Transferencia</h4>
                                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Puesta en producción total (App desplegada) y lanzamiento de la campaña publicitaria comunal masiva de adopción ciudadana.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 7: FODA */}
                    {activeTab === 'slide7' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#ef4444', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}>
                                    <Target size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Viabilidad Estratégica en el Territorio</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Análisis FODA (Fortalezas, Oportunidades, Debilidades, Amenazas).</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ background: 'rgba(16,185,129,0.1)', padding: '2rem', borderRadius: '20px', borderTop: '4px solid #10b981' }}>
                                    <h4 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Fortalezas</h4>
                                    <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>Tecnología propia moderna (no 'enlatada' genérica), enfoque hiper-local en la historia de La Serena, y fuerte innovación tecnológica en IA, gamificación y modelado 3D humanizado.</p>
                                </div>
                                <div style={{ background: 'rgba(56,189,248,0.1)', padding: '2rem', borderRadius: '20px', borderTop: '4px solid #38bdf8' }}>
                                    <h4 style={{ color: '#38bdf8', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Oportunidades</h4>
                                    <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>Posicionar a La Serena como la capital tecnológica pionera e inteligente en la zona norte de Chile. Inducir mayor cohesión barrial y la digitalización acelerada de las Pymes locales (Marketplace productivo).</p>
                                </div>
                                <div style={{ background: 'rgba(245,158,11,0.1)', padding: '2rem', borderRadius: '20px', borderTop: '4px solid #f59e0b' }}>
                                    <h4 style={{ color: '#f59e0b', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Debilidades</h4>
                                    <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>Potencial resistencia inicial al cambio tecnológico abrupto por parte de algunos funcionarios consolidados a las viejas metodologías de trabajo.</p>
                                </div>
                                <div style={{ background: 'rgba(239,68,68,0.1)', padding: '2rem', borderRadius: '20px', borderTop: '4px solid #ef4444' }}>
                                    <h4 style={{ color: '#ef4444', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Amenazas</h4>
                                    <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.5' }}>Intermitencias y brechas temporales en redes de telecomunicaciones (sectores rurales y despliegue 5G). Trabas burocráticas a nivel de presupuesto o aprobación del concejo municipal para opciones de despliegue avanzadas.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 8: GAMIFICACIÓN SERENITO */}
                    {activeTab === 'slide8' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#d4af37', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}>
                                    <Gamepad2 size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Identidad Barrial, Gamificación y Patrimonio</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>La Gran Campaña "Serenito" y el uso estratégico de sus 14 Personajes Territoriales.</p>
                            </div>

                            <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.8) 100%)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(212,175,55,0.4)' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                    <div>
                                        <h4 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '0.8rem' }}>Diseño Institucional Humanizado</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}><strong>Regla estética estricta:</strong> Todo personaje y render 3D (liderados por "Serenito") tiene un estilo obligatoriamente orgánico, cálido y humano. Se evitan plásticos genéricos.</p>
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '0.8rem' }}>Gamificación y Civismo Activo</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>El <strong>"Salón Arcade Retro"</strong> transforma las reglas de convivencia vial, cuidado del mobiliario y espacio público en experiencias interactivas y jugables amigables.</p>
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '0.8rem' }}>Despliegue Territorial (14 Avatares)</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>Cada rincón emblemático y delegación de La Serena (Las Compañías, La Pampa, La Antena, Sectores Rurales) es representado e identificado por su propio avatar cívico especializado.</p>
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '0.8rem' }}>Fomento Productivo y Turismo</h4>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>Conexión interactiva con el Parque Fray Jorge, Punta de Choros, Andacollo y el místico Valle, donde estos personajes actúan como guías patrimoniales 100% locales.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 9: INTEGRACIÓN 1 Y 2 */}
                    {activeTab === 'slide9' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#00ffcc', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(0,255,204,0.5)' }}>
                                    <Building size={48} color="#0f172a" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>Estrategias de Adopción Tecnológica Municipal (Opciones)</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Modelos de Integración Institucional (Opción 1 y 2).</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {/* Opcion 1 */}
                                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '100%', background: '#00ffcc', borderRadius: '20px 0 0 20px' }}></div>
                                    <h4 style={{ color: '#00ffcc', fontSize: '1.6rem', margin: '0 0 1.5rem 0' }}>Opción 1: Infraestructura Municipal Tradicional (Absorción Total)</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                        <div>
                                            <strong style={{ color: 'white', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Mecánica:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>El proyecto se ancla completamente a los pesados servidores internos locales y redes estructurales de la Dirección de Informática del actual municipio.</p>
                                        </div>
                                        <div>
                                            <strong style={{ color: 'white', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Proceso:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>Otorga un control físico absoluto y se apega a un marco de ejecución presupuestario municipal estándar.</p>
                                        </div>
                                        <div>
                                            <strong style={{ color: '#ef4444', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Desventaja:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>El informático del municipio carga con la brutal mantención dura de hardware, sufriendo cuellos de botella del personal actual y posible sobrecarga ("caída de sistema") en contingencias masivas.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Opcion 2 */}
                                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '100%', background: '#38bdf8', borderRadius: '20px 0 0 20px' }}></div>
                                    <h4 style={{ color: '#38bdf8', fontSize: '1.6rem', margin: '0 0 1.5rem 0' }}>Opción 2: Supra-Estructura "Asset Light" (Modelo Nube Híbrida)</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                        <div>
                                            <strong style={{ color: 'white', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Mecánica:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>Se crea un departamento municipal ágil y dedicado exclusivamente a la plataforma, que contrata infraestructura de nube bajo demanda (Ej: AWS / Google Cloud) sin requerir poseer "fierros" o metales ("Asset Light").</p>
                                        </div>
                                        <div>
                                            <strong style={{ color: 'white', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Proceso:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>Crecimiento dinámico y elástico (Auto-Scaling) ante los picos de demanda y consultas ciudadanas.</p>
                                        </div>
                                        <div>
                                            <strong style={{ color: '#ef4444', display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Desventaja:</strong>
                                            <p style={{ color: 'var(--text-secondary)' }}>Incurre en la dependencia financiera de pagos mensuales o regulares variables por los servicios consumidos corporativos en la nube (OPEX).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DIAPOSITIVA 10: INTEGRACION 3 Y CIERRE */}
                    {activeTab === 'slide10' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                                <div style={{ background: '#a78bfa', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(167,139,250,0.5)' }}>
                                    <Network size={48} color="white" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>El Ecosistema Corporativo Externo y Cierre</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem' }}>Opción 3 de Integración Definitiva y las Conclusiones del Proyecto.</p>
                            </div>

                            <div style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(0,0,0,0.8) 100%)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(167,139,250,0.4)', marginBottom: '2rem' }}>
                                <h4 style={{ color: '#a78bfa', fontSize: '1.8rem', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Star fill="#a78bfa" /> Opción 3: Externalización y Alianza Público-Privada (VLS Spa / Corp.)</h4>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <strong style={{ color: 'white', display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Mecánica Estratégica:</strong>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>La mantención profunda, el desarrollo continuo de software y el despliegue del proyecto recae formalmente (y legalmente) sobre un Consejo Consultivo o una entidad externa dedicada, como la "Corporación Smart City", administrada tecnológicamente por <strong>VLS Spa Desarrollos</strong>.</p>
                                </div>

                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #a78bfa' }}>
                                    <strong style={{ color: 'white', display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Ventajas Operativas Insuperables:</strong>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>Descongestiona de raíz los recursos de informática del municipio. Otorga una agilidad de innovación de clase mundial, incorpora talentos profesionales de forma dinámica y facilita enormemente la captación de donaciones, incentivos tributarios y subsidios tecnológicos nacionales que el municipio (por rigidez legal) no podría captar fácilmente.</p>
                                </div>
                            </div>

                            {/* Conclusion final */}
                            <div style={{ background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.2) 0%, rgba(0,0,0,0.8) 100%)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(56,189,248,0.5)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                                <Leaf size={100} color="rgba(56,189,248,0.1)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                <h3 style={{ color: 'white', fontSize: '2rem', margin: '0 0 1rem 0', position: 'relative', zIndex: 1 }}>Conclusión del Proyecto</h3>
                                <p style={{ color: '#e0f2fe', fontSize: '1.3rem', lineHeight: '1.6', margin: '0 auto', maxWidth: '800px', position: 'relative', zIndex: 1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                                    "La Plataforma ComunaSmart de La Serena es una inversión estratégica que pagará dividendos inmediatos en cohesión social comunitaria, seguridad urbana proactiva, eficiencia profunda del gasto público y, sobre todo, devolverá el orgullo de ser Serenense.
                                    <br /><br /><strong>La tecnología se convierte, así, en el mejor vecino de todos.</strong>"
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <style>{`
            .pulse {
                animation: pulse-ring 2s infinite;
            }
            @keyframes pulse-ring {
                0% { transform: translateY(-50%) scale(0.9); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
                70% { transform: translateY(-50%) scale(1); box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); }
                100% { transform: translateY(-50%) scale(0.9); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
            }
            `}</style>
        </div>
    );
}
