import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Radio, GraduationCap, ClipboardList, Calendar, DoorOpen, 
    Zap, Github, Globe, Cloud, ShieldCheck, ChevronRight, ChevronLeft,
    Play, Info, BarChart3, Database, Users, ArrowRight, Monitor, Laptop, Smartphone,
    FileText, Download, Layers, Share2, Map, Activity, Volume2, VolumeX, Mic, Music, ExternalLink, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HechoEnChile from '../components/HechoEnChile';

const STEPS = [
    {
        id: 'genesis',
        month: 'FEB',
        year: '2026',
        title: 'RDMLS: El Génesis de la Señal',
        pillar: 'Smart Citizens',
        concept: 'Comunicación Soberana',
        desc: 'Implementación del nodo inicial de comunicación digital. Procesamiento de audio en tiempo real mediante Web Audio API y streaming sobre infraestructura dedicada.',
        icon: <Radio size={48} />,
        color: '#FFD700',
        tech: 'React + Web Audio API',
        platform: 'Soberana (Nativa)',
        component: 'CentroRadio',
        realUrl: 'https://rdmls.cl',
        auditUrl: 'https://github.com/VecinosLaSerena/RDMLS_Core'
    },
    {
        id: 'imls-hub',
        month: 'FEB',
        year: '2026',
        title: 'IMLS SmartCity Hub',
        pillar: 'Ecosistema Digital',
        concept: 'Consolidación Streamlit',
        desc: 'Prototipado rápido de servicios críticos (Honorarios, Protocolo, Puerta) en un entorno Streamlit para validación de flujos de trabajo antes de la migración nativa.',
        icon: <Monitor size={48} />,
        color: '#f59e0b',
        tech: 'Python + Streamlit Cloud',
        platform: 'Prototipo (External)',
        component: 'IMLSHub',
        realUrl: 'https://monitor-laserena.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/IMLS_SmartCity'
    },
    {
        id: 'elearning',
        month: 'FEB',
        year: '2026',
        title: 'E-Learning e Inducción',
        pillar: 'Smart Administration',
        concept: 'Formación Digital',
        desc: 'Digitalización del proceso de inducción municipal. Integración con Supabase para persistencia de progreso y generación dinámica de diplomas institucionales.',
        icon: <GraduationCap size={48} />,
        color: '#38bdf8',
        tech: 'React + Supabase Auth/DB',
        platform: 'Soberana (Nativa)',
        component: 'Elearning',
        realUrl: 'https://www.rdmls.cl/imls/induccion',
        auditUrl: 'https://github.com/VecinosLaSerena/SmartInduccion'
    },
    {
        id: 'honorarios',
        month: 'MAR',
        year: '2026',
        title: 'Gestión RRHH: Cero Papel',
        pillar: 'Smart Administration',
        concept: 'Eficiencia Ecológica',
        desc: 'Revolución en la gestión de honorarios. Los informes se firman digitalmente y se generan reportes automáticos, ahorrando toneladas de papel al año.',
        icon: <ClipboardList size={48} />,
        color: '#10b981',
        tech: 'Digital Signature API',
        platform: 'Soberana (Streamlit)',
        component: 'Honorarios',
        realUrl: 'https://honorarios-ls-me.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/RRHH_ZeroPaper'
    },
    {
        id: 'protocolo',
        month: 'MAR',
        year: '2026',
        title: 'Protocolo y Eventos Pro',
        pillar: 'Smart Events',
        concept: 'Gestión Institucional',
        desc: 'Optimización de la producción de eventos municipales. Sistema de precedencias en tiempo real para autoridades y gestión de invitados.',
        icon: <Calendar size={48} />,
        color: '#ec4899',
        tech: 'Precedence Logic Engine',
        platform: 'Soberana (Nativa)',
        component: 'Protocolo',
        realUrl: 'https://vecinoslaserenachile-cloud.github.io/serenito-app/',
        auditUrl: 'https://github.com/VecinosLaSerena/Protocolo_Master'
    },
    {
        id: 'puerta',
        year: 'Marzo 2026',
        title: 'PuertaSmart Evolution',
        subtitle: 'De Prototipo Streamlit a Soberanía .CL',
        description: 'Evolución del sistema original (puertaserena.streamlit.app) hacia un entorno de alta disponibilidad y marca institucional propia para el control de acceso inteligente.',
        icon: <DoorOpen size={48} />,
        color: '#f59e0b',
        tech: 'QR Dynamics + AI Radar',
        platform: 'Legacy (Streamlit) → Smart (.CL)',
        component: 'PuertaSmart',
        realUrl: 'https://www.puertasmart.cl',
        auditUrl: 'https://puertaserena.streamlit.app/'
    },
    {
        id: 'centinel',
        month: 'MAY',
        year: '2026',
        title: 'HITO 90 DÍAS: Smart Listening',
        pillar: 'Pilar #4: Inteligencia',
        concept: 'Escucha Territorial IA',
        desc: 'Culminación de 90 días de entrenamiento de modelos locales. Ingesta de menciones vía WebSockets y análisis de sentimiento con Sentinel Apex para la toma de decisiones soberanas.',
        icon: <Activity size={48} />,
        color: '#6366f1',
        tech: 'PyTorch + Local LLM + WebSockets',
        platform: 'Soberana (Hybrid Edge)',
        component: 'Centinel',
        realUrl: 'https://monitor-laserena.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/CentinelFaro_IA'
    },
    {
        id: 'sentinel-apex',
        month: 'MAY',
        year: '2026',
        title: 'HITO 90 DÍAS: Sentinel Apex',
        subtitle: 'Master Control Forense',
        description: 'Despliegue de la infraestructura de mando avanzado. Análisis forense de favorabilidad institucional en tiempo real sobre dashboards nativos React de alta fidelidad.',
        icon: <Search size={48} />,
        color: '#312e81',
        tech: 'Sentiment IA Engine + React 18',
        platform: 'Soberana (Nativa .CL)',
        component: 'SentinelApex',
        realUrl: 'https://monitor-laserena.streamlit.app/',
        auditUrl: 'https://github.com/VecinosLaSerena/Sentinel_Apex'
    },
    {
        id: 'mando-central',
        month: 'JUN',
        year: '2026',
        title: 'RDMLS: Centro de Mando Unificado',
        pillar: 'Ecosistema 360',
        concept: 'Operación Total',
        desc: 'EN DESARROLLO: Orquestación de micro-frontends para la integración de los 4 pilares en una única interfaz táctica descentralizada. Control global de señales y telemetría ciudadana.',
        icon: <Layers size={48} />,
        color: '#ef4444',
        tech: 'React Micro-Frontends + State Sync',
        platform: 'Cloudflare Edge (Sovereign Node)',
        component: 'SmartComunaOS',
        realUrl: '/',
        auditUrl: 'https://github.com/VecinosLaSerena/RDMLS_OS'
    }
];

export default function SmartComunaEvolution() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const step = STEPS[currentStep];
    const [isTransitioning, setIsTransitioning] = useState(false);
    const host = window.location.host;
    const isRDMLS = host.includes('rdmls') || host.includes('radiomunicipal');

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentStep(prev => prev - 1);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isRadioPlaying, setIsRadioPlaying] = useState(false);
    const [currentMinicast, setCurrentMinicast] = useState(null);
    const [audioInstance, setAudioInstance] = useState(null);
    const [playlistIndex, setPlaylistIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const lyraMusic = [
        '/music/estiempodelaserena.mp3',
        '/music/es_amor_por_la_serena.mp3',
        '/music/himno_la_serena_jazz.mp3',
        '/music/vals_mis_recuerdos.mp3',
        '/audio/reggaeprendes.cl.mp3'
    ];

    const playNarration = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        
        if (audioInstance) audioInstance.volume = 0.05;

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Motor de Selección de Voz Humanizada (Google/Microsoft/Natural)
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => 
            (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Natural')) && 
            (v.lang.startsWith('es'))
        ) || voices.find(v => v.lang.startsWith('es'));
        
        if (preferredVoice) utterance.voice = preferredVoice;
        
        utterance.lang = 'es-CL';
        utterance.rate = 0.92; // Cadencia natural
        utterance.pitch = 1.0; 
        utterance.volume = 1.0;

        utterance.onend = () => {
            if (audioInstance) audioInstance.volume = 0.4;
            if (isRadioPlaying) playNextTrack();
        };
        window.speechSynthesis.speak(utterance);
    };

    const playNextTrack = () => {
        const nextIdx = (playlistIndex + 1) % lyraMusic.length;
        setPlaylistIndex(nextIdx);
        const audio = new Audio(lyraMusic[nextIdx]);
        audio.volume = 0.4;
        audio.onended = () => {
            // Interleave narration every few tracks or just play music
            if (Math.random() > 0.5) {
                playNarration(`Estás escuchando Radio Evolución. En este hito de ${step.month}, destacamos: ${step.desc}`);
            } else {
                playNextTrack();
            }
        };
        audio.play().catch(e => console.warn("Lyra Audio Play Error:", e));
        setAudioInstance(audio);
    };

    const toggleRadio = () => {
        if (!isRadioPlaying) {
            setIsRadioPlaying(true);
            setCurrentMinicast(`Iniciando Radio Evolución: Señal Independiente Showroom...`);
            
            // Start with a narration of the current milestone
            playNarration(`Bienvenido a Radio Evolución. Presentando el hito: ${step.title}. ${step.desc}`);
            
            const audio = new Audio(lyraMusic[playlistIndex]);
            audio.volume = 0.4;
            audio.play().catch(e => console.warn("Lyra Audio Play Error:", e));
            setAudioInstance(audio);
        } else {
            if (audioInstance) {
                audioInstance.pause();
                audioInstance.src = "";
            }
            window.speechSynthesis.cancel();
            setIsRadioPlaying(false);
            setCurrentMinicast(null);
            setAudioInstance(null);
        }
    };

    const handleDownloadPDF = () => {
        const confirm = window.confirm("¿Desea generar el Dossier Técnico IMLS 2024-2026 en formato PDF?");
        if (confirm) {
            alert("Generando Dossier de Evolución Smart Comuna...\n\nCompilando hitos:\n1. RDMLS\n2. E-Learning\n3. RRHH Cero Papel\n4. Protocolo\n5. PuertaSmart\n\nListo para imprimir.");
            window.print();
        }
    };

    return (
        <div className="evolution-showroom-container" style={{ 
            minHeight: '100vh', 
            background: '#020617', 
            color: 'white', 
            fontFamily: "'Outfit', sans-serif",
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .showroom-main { flex-direction: column !important; }
                    .milestones-sidebar { width: 100% !important; order: 2; height: auto !important; }
                    .presentation-grid { grid-template-columns: 1fr !important; padding: 1rem !important; }
                    .hide-mobile { display: none; }
                }
            `}</style>

            <nav className="showroom-nav" style={{ 
                padding: '1.5rem 2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(2, 6, 23, 0.8)',
                backdropFilter: 'blur(20px)',
                zIndex: 100,
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#38bdf8', padding: '8px', borderRadius: '10px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
                        <Zap size={20} color="black" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-1px' }}>
                            SMART COMUNA <span style={{ color: '#38bdf8' }}>EVOLUTION</span>
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.6rem', opacity: 0.5, fontWeight: 'bold', letterSpacing: '1px' }}>SHOWROOM SOBERANO</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '6px 15px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>ESTADO: 90 DÍAS (MAY-2026)</span>
                    </div>
                    <button 
                        onClick={handleDownloadPDF}
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '900', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Download size={14} /> PDF
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '900', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                        CERRAR
                    </button>
                </div>
            </nav>

            <main className="showroom-main" style={{ flex: 1, display: 'flex', position: 'relative' }}>
                <div className="milestones-sidebar" style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: '2rem 1rem', borderRight: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                    <div className="sidebar-clock-container" style={{ marginBottom: '2rem', padding: '0 1rem' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '3px', color: '#64748b', marginBottom: '1rem' }}>ARBOLITO DE HITOS</div>
                        
                        {/* Integrated Clock */}
                        <div style={{ 
                            background: 'rgba(56, 189, 248, 0.05)', 
                            border: '1px solid rgba(56, 189, 248, 0.2)', 
                            borderRadius: '15px', 
                            padding: '1rem',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.6rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '2px', marginBottom: '5px' }}>TIEMPO REAL IMLS</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '950', fontFamily: 'monospace', color: 'white' }}>
                                {currentTime.toLocaleTimeString('es-CL', { hour12: false })}
                            </div>
                            <div style={{ fontSize: '0.5rem', opacity: 0.5 }}>SYNCHRONIZED_UTC-4</div>
                        </div>
                    </div>

                    <div className="milestones-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                        {STEPS.map((s, idx) => (
                            <button 
                                key={s.id}
                                onClick={() => setCurrentStep(idx)}
                                className={`milestone-item ${idx === currentStep ? 'active' : ''}`}
                                style={{ 
                                    width: '100%', 
                                    padding: '1rem', 
                                    borderRadius: '12px', 
                                    background: idx === currentStep ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    border: '1px solid',
                                    borderColor: idx === currentStep ? 'rgba(56, 189, 248, 0.3)' : 'transparent',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ 
                                    width: '32px', height: '32px', borderRadius: '8px', 
                                    background: idx === currentStep ? s.color : 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: idx === currentStep ? 'black' : 'white',
                                    transition: '0.3s',
                                    flexShrink: 0
                                }}>
                                    {React.cloneElement(s.icon, { size: 16 })}
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '900', color: idx === currentStep ? s.color : 'white' }}>{s.month}</div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: idx === currentStep ? 'white' : '#cbd5e1', opacity: idx === currentStep ? 1 : 0.8 }}>{s.title.split(':')[0]}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="sidebar-status-container" style={{ marginTop: 'auto', padding: '1rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '1rem', borderRadius: '12px' }}>
                            <div style={{ fontSize: '0.6rem', color: '#4ade80', fontWeight: '900', marginBottom: '5px', letterSpacing: '1px' }}>OBJETIVOS 100% LOGRADOS</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'white', opacity: 1 }}>PRÓXIMAS ETAPAS EN EVALUACIÓN</div>
                        </div>
                    </div>
                </div>

                {/* Presentation Stage */}
                <div className="presentation-grid" style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center', overflowY: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={step.id}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: `${step.color}15`, padding: '10px 25px', borderRadius: '100px', border: `1px solid ${step.color}30`, marginBottom: '2.5rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: '950', color: step.color, letterSpacing: '4px' }}>{step.month} {step.year}</span>
                            </div>

                            <h2 className="step-title" style={{ fontSize: '3rem', fontWeight: '950', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
                                {step.title.split(':').map((t, i) => (
                                    <span key={i} style={{ display: 'block', color: i === 1 ? step.color : 'white' }}>{t}</span>
                                ))}
                            </h2>

                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>PILARES</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{step.pillar}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>CONCEPTO</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{step.concept}</div>
                                </div>
                            </div>

                            <p style={{ fontSize: '1.1rem', color: '#e2e8f0', lineHeight: '1.5', marginBottom: '2rem', maxWidth: '100%' }}>
                                {step.desc}
                            </p>

                            <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', marginBottom: '5px' }}>CORE</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                        <Monitor size={14} color={step.color} />
                                        <span style={{ fontWeight: 'bold' }}>{step.tech}</span>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold', marginBottom: '5px' }}>CLOUD</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                                        <Cloud size={14} color="#38bdf8" />
                                        <span style={{ fontWeight: 'bold' }}>{step.platform}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button 
                                    onClick={() => {
                                        if (step.realUrl.startsWith('/')) navigate(step.realUrl);
                                        else window.open(step.realUrl, '_blank');
                                    }}
                                    style={{ 
                                        background: step.color, color: 'black', border: 'none', 
                                        padding: '1rem 2rem', borderRadius: '15px', fontWeight: '950', 
                                        fontSize: '0.9rem', cursor: 'pointer', display: 'flex', 
                                        alignItems: 'center', gap: '10px', boxShadow: `0 10px 30px ${step.color}30`
                                    }}
                                >
                                    LANZAR SISTEMA REAL <ExternalLink size={16} />
                                </button>
                                <button 
                                    onClick={() => window.open(step.auditUrl, '_blank')}
                                    style={{ background: 'rgba(255,255,255,0.03)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem 1.5rem', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    AUDITAR CÓDIGO <Github size={14} />
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="visual-stage" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1/1', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={step.id}
                                    onClick={toggleRadio}
                                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                                    transition={{ type: 'spring', damping: 15 }}
                                    style={{ 
                                        width: '80%', height: '80%', background: '#111', 
                                        borderRadius: '40px', border: `2px solid ${step.color}50`,
                                        boxShadow: `0 30px 60px rgba(0,0,0,0.8), 0 0 50px ${step.color}20`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative', overflow: 'hidden', cursor: 'pointer'
                                    }}
                                >
                                    {/* Glassmorphic "Mock" Content */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isRadioPlaying ? '#10b981' : '#ef4444' }} />
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24' }} />
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                                        <span style={{ fontSize: '0.5rem', color: isRadioPlaying ? '#10b981' : '#444', marginLeft: 'auto' }}>{isRadioPlaying ? 'STREAMING_LIVE' : 'SIGNAL_IDLE'}</span>
                                    </div>

                                    {/* Hero Icon */}
                                    <div style={{ color: step.color, transform: isRadioPlaying ? 'scale(1.7)' : 'scale(1.5)', filter: `drop-shadow(0 0 15px ${step.color}50)`, transition: '0.5s' }}>
                                        {isRadioPlaying ? <Volume2 size={48} /> : step.icon}
                                    </div>

                                    {isRadioPlaying && (
                                        <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div 
                                                    key={i}
                                                    animate={{ height: [10, 30, 10] }}
                                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                                    style={{ width: '4px', background: step.color, borderRadius: '2px' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>

            {/* Presentation Controls Footer */}
            <footer style={{ 
                padding: '2rem 4rem', 
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(2, 6, 23, 0.8)'
            }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', 
                            padding: '1rem 2rem', borderRadius: '15px', cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px', opacity: currentStep === 0 ? 0.3 : 1
                        }}
                    >
                        <ChevronLeft size={20} /> ANTERIOR
                    </button>
                    <button 
                        onClick={nextStep}
                        disabled={currentStep === STEPS.length - 1}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', 
                            padding: '1rem 2rem', borderRadius: '15px', cursor: currentStep === STEPS.length - 1 ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '10px', opacity: currentStep === STEPS.length - 1 ? 0.3 : 1
                        }}
                    >
                        SIGUIENTE <ChevronRight size={20} />
                    </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold' }}>CICLO DE INNOVACIÓN ÁGIL RDMLS</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8' }}>90 DÍAS DE EJECUCIÓN ➔ 100% SOBERANO</div>
                </div>
            </footer>

            <HechoEnChile dark={true} />

            {/* RADIO EVOLUCIÓN: SOVEREIGN AUDIO ENGINE */}
            <div style={{ 
                position: 'fixed', 
                bottom: '220px', 
                right: '40px', 
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '1rem'
            }}>
                <AnimatePresence>
                    {isRadioPlaying && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            style={{ 
                                background: 'rgba(2, 6, 23, 0.95)', 
                                border: '1px solid rgba(56, 189, 248, 0.3)', 
                                padding: '1.5rem', 
                                borderRadius: '20px', 
                                width: '320px',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(56, 189, 248, 0.1)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                <div style={{ 
                                    width: '10px', 
                                    display: 'flex', gap: '2px', alignItems: 'flex-end', height: '20px' 
                                }}>
                                    {[1,2,3,4].map(i => (
                                        <motion.div 
                                            key={i}
                                            animate={{ height: [5, 15, 8, 18, 5] }}
                                            transition={{ repeat: Infinity, duration: 0.5 + i*0.1 }}
                                            style={{ width: '3px', background: '#38bdf8', borderRadius: '10px' }}
                                        />
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#38bdf8', letterSpacing: '2px' }}>RADIO EVOLUCIÓN | EN VIVO</div>
                                <div style={{ marginLeft: 'auto', fontSize: '0.6rem', background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Soberana</div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px', color: 'white' }}>
                                    {currentMinicast || "Sintonizando señal técnica..."}
                                </div>
                                <div style={{ fontSize: '0.6rem', color: '#64748b' }}>
                                    Motor de Audio: Lyra-Equivalent (Client-Side)
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px', overflow: 'hidden' }}>
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '65%' }}
                                    style={{ height: '100%', background: '#38bdf8' }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button 
                    onClick={toggleRadio}
                    style={{ 
                        width: '70px', 
                        height: '70px', 
                        borderRadius: '50%', 
                        background: isRadioPlaying ? '#38bdf8' : 'rgba(56, 189, 248, 0.1)',
                        border: `2px solid ${isRadioPlaying ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)'}`,
                        color: isRadioPlaying ? 'black' : '#38bdf8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isRadioPlaying ? '0 0 30px rgba(56, 189, 248, 0.5)' : 'none',
                        transition: '0.3s'
                    }}
                >
                    {isRadioPlaying ? <Volume2 size={32} /> : <VolumeX size={32} />}
                </button>
            </div>

            <style>{`
                @keyframes vls-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                .vls-floating { animation: vls-float 4s ease-in-out infinite; }
                .vls-floating-alt { animation: vls-float 6s ease-in-out infinite reverse; }
                
                @media (max-width: 900px) {
                    .showroom-main { flex-direction: column !important; }
                    .milestones-sidebar { 
                        width: 100% !important; 
                        height: auto !important; 
                        border-right: none !important; 
                        border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                        padding: 1rem !important;
                    }
                    .milestones-list { 
                        flex-direction: row !important; 
                        overflow-x: auto !important; 
                        padding-bottom: 0.5rem !important;
                    }
                    .milestone-item { width: auto !important; min-width: 150px !important; }
                    .sidebar-clock-container, .sidebar-status-container { display: none !important; }
                    
                    .presentation-grid { 
                        grid-template-columns: 1fr !important; 
                        padding: 1.5rem !important;
                        gap: 2rem !important;
                    }
                    .step-title { fontSize: 2rem !important; }
                    .visual-stage { height: 300px !important; order: -1; }
                    .hide-mobile { display: none !important; }
                }

                @media (max-width: 480px) {
                    .showroom-nav { padding: 1rem !important; }
                    .action-buttons button { width: 100% !important; justify-content: center !important; }
                    .tech-grid { grid-template-columns: 1fr !important; }
                }
                
                .milestones-list::-webkit-scrollbar { height: 4px; }
                .milestones-list::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.2); borderRadius: 10px; }
            `}</style>
        </div>
    );
}
