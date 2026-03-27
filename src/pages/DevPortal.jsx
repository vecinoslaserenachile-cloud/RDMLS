import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bug, Hexagon, Code2, Rocket, MessageSquare, 
    ShieldAlert, ExternalLink, Share2, Info, 
    ArrowLeft, Terminal, Cpu, Database, Zap,
    Lightbulb, Sparkles, Layers, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import IdeaTerminal from '../components/IdeaTerminal';

const DEV_APPS = [
    {
        id: 'playground',
        title: 'VLS IDEAS & INNOVATION TERMINAL',
        subtitle: 'Módulo de Soberanía Tecnológica v3.5',
        component: <IdeaTerminal />,
        status: 'OPEN_CORE',
        tech: ['React', 'HTML5', 'Python', 'JS'],
        description: 'Escribe, programa y lanza tus ideas. Esta terminal es el corazón de la innovación abierta en La Serena. Prueba componentes en tiempo real.',
        color: '#10b981'
    },
    {
        id: 'qqei-trivia',
        title: 'QQEI: ¿Quién quiere estar informado?',
        subtitle: 'Trivia Original VLS - Motor de Gamificación v2026',
        url: 'https://ais-dev-ptoysws6xjjfiykb7rpetx-326498373174.us-west2.run.app/',
        status: 'RESTRECHTED / IAP',
        tech: ['React', 'Firebase', 'IAP'],
        description: 'Módulo interactivo de trivia. (Nota: Este módulo requiere autenticación de Google Workspace Municipal - IAP Cloud Run).',
        color: '#38bdf8'
    }
];

export default function DevPortal() {
    const navigate = useNavigate();
    const [selectedApp, setSelectedApp] = useState(DEV_APPS[0]);
    const [activeTab, setActiveTab] = useState('demo'); // demo or discussion
    
    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Enlace del VLS Dev Lab copiado al portapapeles.');
    };

    return (
        <div className="dev-portal-container" style={{ 
            minHeight: '100vh', 
            background: '#020617', 
            color: 'white', 
            fontFamily: '"Outfit", sans-serif',
            overflowX: 'hidden'
        }}>
            {/* Header / Navigator */}
            <header className="dev-header" style={{ 
                padding: '1rem 2rem', 
                borderBottom: '2px solid #38bdf8',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.98)',
                backdropFilter: 'blur(30px)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', padding: '1rem 2rem', borderRadius: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.3s' }}
                    >
                        <ArrowLeft size={20} /> VOLVER AL HUB
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ background: '#38bdf8', padding: '12px', borderRadius: '15px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                            <Code2 size={28} color="#020617" />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '2px', textShadow: '0 0 20px rgba(56, 189, 248, 0.3)' }}>VLS <span style={{ color: '#38bdf8' }}>DEV LAB</span></h1>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px' }}>SOBERANÍA DIGITAL LA SERENA 2026</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(56, 189, 248, 0.05)', padding: '0.8rem 1.5rem', borderRadius: '15px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                        <Zap size={20} color="#fcd34d" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#fcd34d', letterSpacing: '1px' }}>ACCESO_DESARROLLADOR_ALPHA</span>
                    </div>
                    <button onClick={handleShare} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '1rem', borderRadius: '15px', cursor: 'pointer', transition: '0.3s' }} className="hover-lift">
                        <Share2 size={24} />
                    </button>
                </div>
            </header>

            <main className="dev-main" style={{ padding: '2rem' }}>
                {/* Banner de Innovación */}
                <div className="dev-banner" style={{ 
                    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)', 
                    border: '1px solid rgba(56, 189, 248, 0.3)', 
                    borderRadius: '40px', 
                    padding: '1.5rem 2rem', 
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ background: '#38bdf8', padding: '18px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)' }}>
                        <ShieldAlert size={36} color="#020617" />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px' }}>LABORATORIO DE IDEAS Y SOBERANÍA TECNOLÓGICA</h4>
                        <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '800px' }}>
                            Bienvenido al Sandbox de <strong>vecinoslaserena.cl</strong>. Aquí el ciudadano es el programador del futuro. 
                            Usa la terminal de ideas para prototipar en tiempo real lo que será la Serena del siglo XXI.
                        </p>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px' }}>Status_System</span>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10b981' }}>OPTIMIZA_V3.5</div>
                    </div>
                </div>

                <div className="dev-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 450px) 1fr', gap: '2rem', alignItems: 'start' }}>
                    {/* Sidebar: App List */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2.5rem', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                                <Layers size={24} color="#38bdf8" />
                                <h3 style={{ margin: 0, fontSize: '1rem', color: '#38bdf8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px' }}>Módulos VLS</h3>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {DEV_APPS.map(app => (
                                    <motion.div 
                                        whileHover={{ scale: 1.03, x: 10 }}
                                        whileTap={{ scale: 0.97 }}
                                        key={app.id}
                                        onClick={() => setSelectedApp(app)}
                                        style={{ 
                                            padding: '1.8rem', 
                                            borderRadius: '30px', 
                                            background: selectedApp.id === app.id ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                                            border: `2px solid ${selectedApp.id === app.id ? '#38bdf8' : 'rgba(255,255,255,0.08)'}`,
                                            cursor: 'pointer',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: selectedApp.id === app.id ? '0 15px 30px rgba(0,0,0,0.3)' : 'none'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.65rem', background: app.status.includes('RESTRECHTED') ? '#ef4444' : '#10b981', color: '#020617', padding: '4px 12px', borderRadius: '8px', fontWeight: 900 }}>{app.status}</span>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {app.tech.map(t => <span key={t} style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>{t}</span>)}
                                            </div>
                                        </div>
                                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: selectedApp.id === app.id ? 'white' : '#94a3b8' }}>{app.title}</h4>
                                    </motion.div>
                                ))}
                            </div>

                            <div style={{ marginTop: '4rem', padding: '2.5rem', borderRadius: '35px', background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(56,189,248,0.3)', textAlign: 'center' }}>
                                <Hexagon size={50} color="#38bdf8" style={{ marginBottom: '20px', opacity: 0.6 }} />
                                <h5 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 900 }}>COMUNIDAD_VLS_DEV</h5>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.6' }}>Sube tu idea a la arena digital.<br/>Contacto: <strong>vls.dev@vecinosmart.cl</strong></p>
                            </div>
                        </div>

                        <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)', padding: '3rem', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                <Sparkles size={24} color="#fcd34d" />
                                <span style={{ fontWeight: 900, fontSize: '1rem', color: '#fcd34d', letterSpacing: '2px' }}>MANIFESTO 2026</span>
                            </div>
                            <p style={{ fontSize: '0.95rem', color: '#bae6fd', margin: 0, lineHeight: '1.8', fontStyle: 'italic' }}>
                                "La tecnología debe ser tan colectiva como la calle. Este laboratorio es la puerta para que nadie nunca más sea solo un usuario, sino un creador."
                            </p>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <section style={{ minHeight: '900px' }}>
                        {selectedApp ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {/* App Info Card */}
                                <div className="dev-app-card" style={{ padding: '4rem', borderRadius: '50px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.25)', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '25px' }}>
                                            <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '20px', borderRadius: '20px' }}>
                                                {selectedApp.id === 'playground' ? <Terminal size={40} color="#38bdf8" /> : <Rocket size={40} color="#38bdf8" />}
                                            </div>
                                            <div>
                                                <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-2px', lineHeight: 1 }}>{selectedApp.title}</h2>
                                                <p style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>{selectedApp.subtitle}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            {selectedApp.url && (
                                            <button 
                                                onClick={() => window.open(selectedApp.url, '_blank')}
                                                style={{ background: '#38bdf8', color: '#020617', border: 'none', padding: '1.2rem 2.5rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 15px 30px rgba(56, 189, 248, 0.3)', transition: '0.3s' }}
                                                className="hover-lift"
                                            >
                                                <ExternalLink size={24} /> LANZAR APP
                                            </button>
                                            )}
                                        </div>
                                    </div>
                                    <p style={{ color: '#94a3b8', lineHeight: '2', fontSize: '1.2rem', margin: 0, maxWidth: '90%' }}>{selectedApp.description}</p>
                                </div>

                                {/* Tabs Navigation */}
                                <div className="dev-tabs" style={{ display: 'flex', gap: '3rem', borderBottom: '3px solid rgba(255,255,255,0.06)', paddingBottom: '0' }}>
                                    {[
                                        { id: 'demo', label: 'VISTA PREVIA / PLAYGROUND CIUDADANO', icon: Zap },
                                        { id: 'discussion', label: 'CANAL DE COLABORACIÓN VLS', icon: MessageSquare }
                                    ].map(tab => (
                                        <button 
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            style={{ 
                                                background: 'none', border: 'none', 
                                                color: activeTab === tab.id ? '#38bdf8' : '#475569', 
                                                padding: '1.5rem 0.5rem', fontSize: '1.1rem', fontWeight: 900, 
                                                cursor: 'pointer', borderBottom: activeTab === tab.id ? '5px solid #38bdf8' : '5px solid transparent',
                                                display: 'flex', alignItems: 'center', gap: '12px', transition: '0.4s'
                                            }}
                                        >
                                            <tab.icon size={22} /> {tab.label.toUpperCase()}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div style={{ minHeight: '800px' }}>
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'demo' ? (
                                            <motion.div 
                                                key="demo"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -30 }}
                                                style={{ width: '100%', height: '100%' }}
                                            >
                                                {selectedApp.id === 'playground' ? (
                                                    selectedApp.component
                                                ) : (
                                                    <div style={{ 
                                                        width: '100%', 
                                                        height: '800px', 
                                                        background: '#000', 
                                                        borderRadius: '45px', 
                                                        overflow: 'hidden', 
                                                        border: '8px solid rgba(56, 189, 248, 0.2)',
                                                        boxShadow: '0 40px 90px rgba(0,0,0,0.85)',
                                                        position: 'relative'
                                                    }}>
                                                        {selectedApp.status.includes('RESTRECHTED') && (
                                                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.95)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem' }}>
                                                                <Lock size={80} color="#ef4444" style={{ marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.5))' }} />
                                                                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ef4444', letterSpacing: '-1px' }}>ACCESO RESTRINGIDO (IAP LOCK)</h3>
                                                                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '1.5rem 0 3rem 0', fontSize: '1.2rem', lineHeight: '1.8' }}>
                                                                    Este módulo está protegido por la capa de identidad Google Workspace. Se requiere una cuenta autorizada de la <strong>Ilustre Municipalidad de La Serena</strong> para acceder a la demo en vivo.
                                                                </p>
                                                                <div style={{ display: 'flex', gap: '20px' }}>
                                                                    <button onClick={() => setSelectedApp(DEV_APPS[0])} style={{ background: '#38bdf8', color: '#020617', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }} className="hover-lift">IR AL INNOVATION TERMINAL</button>
                                                                    <button onClick={() => window.open(selectedApp.url, '_blank')} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '1.2rem 3rem', borderRadius: '20px', fontWeight: 900, cursor: 'pointer', fontSize: '1.1rem' }}>REINTENTAR ACCESO EXTERNO</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <iframe 
                                                            src={selectedApp.url} 
                                                            style={{ width: '100%', height: '100%', border: 'none' }}
                                                            title={selectedApp.title}
                                                        />
                                                    </div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                key="discussion"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -30 }}
                                                style={{ background: 'white', borderRadius: '50px', padding: '4rem', color: '#020617', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '3rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '2rem' }}>
                                                    <Lightbulb size={40} color="#38bdf8" />
                                                    <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.5px' }}>ZONA DE CO-CREACIÓN Y FEEDBACK CIUDADANO</h3>
                                                </div>
                                                <CommentSection reportTitle={`DEV_PORTAL: ${selectedApp.title}`} themeColor="#38bdf8" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20rem 0', color: '#475569' }}>
                                <Terminal size={100} style={{ marginBottom: '40px', opacity: 0.2 }} />
                                <h3 style={{ fontWeight: 900, fontSize: '2rem', letterSpacing: '5px' }}>CONECTANDO CON EL NODO SOBERANO...</h3>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <footer className="dev-footer" style={{ padding: '8rem 4rem', borderTop: '4px solid rgba(56, 189, 248, 0.1)', marginTop: '10rem', background: 'rgba(15, 23, 42, 0.7)' }}>
                <div className="dev-footer-inner" style={{ display: 'flex', justifyContent: 'center', gap: '8rem', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#475569' }}>
                        <Cpu size={24} /> <span style={{ fontWeight: 900, letterSpacing: '2px', fontSize: '1rem' }}>VLS OS CORE v3.5.0</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#475569' }}>
                        <Database size={24} /> <span style={{ fontWeight: 900, letterSpacing: '2px', fontSize: '1rem' }}>SALA DE DATOS SOBERANA</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <img src="/vls-logo-3d.png" alt="VLS Logo" style={{ width: '80px', height: '80px', opacity: 0.3, marginBottom: '2rem' }} />
                    <p style={{ color: '#475569', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '8px', fontWeight: 900 }}>
                        2026 | UN PROYECTO DE VECINOSMAD & ILUSTRE MUNICIPALIDAD DE LA SERENA
                    </p>
                </div>
            </footer>

            <style>{`
                .glass-panel { backdrop-filter: blur(30px); }
                .hover-lift { transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .hover-lift:hover { transform: translateY(-8px); }
                input, textarea { font-family: 'Outfit', sans-serif; }
                
                @media (max-width: 1024px) {
                    .dev-header { padding: 1.5rem !important; flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
                    .dev-main { padding: 1.5rem !important; }
                    .dev-banner { flex-direction: column !important; padding: 2rem !important; gap: 1.5rem !important; border-radius: 20px !important; text-align: center; }
                    .dev-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
                    .dev-tabs { flex-direction: column !important; gap: 1rem !important; border-bottom: none !important; }
                    .dev-app-card { padding: 2rem !important; border-radius: 25px !important; }
                    .dev-footer { padding: 3rem 1.5rem !important; }
                    .dev-footer-inner { flex-direction: column !important; gap: 2rem !important; align-items: center !important; }
                }
            `}</style>
        </div>
    );
}
