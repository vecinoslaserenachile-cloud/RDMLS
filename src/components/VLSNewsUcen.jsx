import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, Globe, Zap, Users, Target, Rocket, Share2, ArrowRight, Play, Maximize2, 
  ShieldCheck, Database, Cpu, Droplets, Landmark, Music, Briefcase, Info, 
  Map, CloudRain, ChartBar, Mountain, MapPin, Quote, GraduationCap, Award, 
  BookOpen, Sparkles, Calendar, ChevronRight, FileText, Download, Volume2, 
  ChevronLeft, Mic2, Clock, Map as MapIcon, Share, ExternalLink, ChevronDown, Monitor
} from 'lucide-react';

// ASSETS CONFIGURATION (v2.7.6-ELITE)
const UCEN_PATH = '/UCEN/';
const RADIO_PLAYLIST = [
    { id: 1, title: 'Podcast: IA en Coquimbo (Especial VLS)', file: 'podcast_Universidades_chilenas_impulsan_la_IA_en_Coquimbo.mp3', duration: 'FULL' },
    { id: 2, title: 'Himno y Apertura: Congreso ASFAE 42', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/Congreso ASFAE 42.mp3', duration: 'Intro' },
    { id: 3, title: 'U-Cén: Visión Estratégica Regional', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/U-Cén As-fae.mp3', duration: 'Especial' },
    { id: 4, title: 'U-Cén: Cláusulas de Innovación 2026', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/U-Cén Cláusula.mp3', duration: 'Análisis' },
    { id: 5, title: 'U-Cén: Conexión Académica Nacional', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/U-Cén Conecta.mp3', duration: 'Cápsula' },
    { id: 6, title: 'U-Cén: Las 33 Facultades de Chile', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/U-Cén Treinta y Tres.mp3', duration: 'Tributo' },
    { id: 7, title: 'Sello y Tradición: UCEN Aro Aro', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/U-Cén Aro Aro.mp3', duration: 'Spot' },
    { id: 8, title: 'U-Cén: Desafío Veintitrés (AI Sync)', file: 'mp3s Radio propia encuentro ASFAE42 UCEN La Serena/U-Cén Veintitrés.mp3', duration: 'Promo' }
];

const PRESENTATIONS = [
    { id: 'vid', title: 'VIDEO INSTITUCIONAL', type: 'VIDEO', file: 'ucen_clip_congreso_42.mp4', icon: Play },
    { id: 'p1', title: 'BROCHURE SEDE 2026', type: 'PDF', file: 'UCEN_Sede_ASFAE_2026.pdf', icon: FileText },
    { id: 'p2', title: 'ESTRATEGIA ASFAE', type: 'PPTX', file: 'UCEN_Sede_ASFAE_2026.pptx', icon: Monitor },
    { id: 'p3', title: 'GALERÍA: Vice-Rector', type: 'IMAGE', file: 'Jaime Alonso UCEN.jpeg', icon: Users },
    { id: 'p4', title: 'PANORÁMICA SEDE', type: 'IMAGE', file: 'UCEN.jpeg', icon: MapPin }
];

const WHATSAPP_CHAT_FULL = [
    { id: 1, sender: 'Vecinos La Serena (VLS)', text: '¡Buenas tardes Vicerrector! ¿Cómo avanzan los preparativos para el 42° Congreso ASFAE en la sede Coquimbo?', time: '10:05' },
    { id: 2, sender: 'Jaime Alonso (UCEN)', text: 'Hola VLS. Avanzamos a paso firme. Estamos terminando el despliegue técnico en el Aula Magna. Las 33 universidades ya confirmaron su participación presencial.', time: '10:07' },
    { id: 3, sender: 'Vecinos La Serena (VLS)', text: 'Es un despliegue nacional sin precedentes. ¿Qué importancia tiene la Inteligencia Artificial en esta versión?', time: '10:08' },
    { id: 4, sender: 'Jaime Alonso (UCEN)', text: 'Fundamental. Ya no es una tendencia, es un imperativo. En este congreso mostraremos casos reales de cómo la IA está redefiniendo los modelos de negocio y la administración pública en Chile.', time: '10:10' },
    { id: 5, sender: 'Vecinos La Serena (VLS)', text: 'Sabemos que eligieron a la Región de Coquimbo por su potencial estratégico. ¿Qué mensaje le da a la comunidad académica?', time: '10:12' },
    { id: 6, sender: 'Jaime Alonso (UCEN)', text: 'Que la descentralización del conocimiento es real. Coquimbo será la capital de la innovación durante estos días y la UCEN está lista para liderar este diálogo constructivo.', time: '10:14' },
    { id: 7, sender: 'Vecinos La Serena (VLS)', text: 'Impresionante. ¡Muchas gracias por su tiempo, Vicerrector! Nos vemos en el congreso.', time: '10:15' },
    { id: 8, sender: 'Jaime Alonso (UCEN)', text: 'A ustedes. ¡Los esperamos a todos con los brazos abiertos en la Universidad Central!', time: '10:16' }
];

const VLSNewsUcen = ({ onClose }) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(RADIO_PLAYLIST[0]);
    const audioRef = useRef(null);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
    const [activeTip, setActiveTip] = useState(0);
    const [trackIndex, setTrackIndex] = useState(0);
    
    // NEW STATES
    const [activePresBody, setActivePresBody] = useState(PRESENTATIONS[0]);
    const [chatVisibleCount, setChatVisibleCount] = useState(2);

    const TIPS = [
        "¿Sabías que el 42° Congreso ASFAE reunirá a líderes de 33 universidades chilenas en el Aula Magna?",
        "Este año, la IA será el eje central de las discusiones sobre el futuro de los negocios.",
        "Recuerda descargar el brochure oficial de la sede en la sección de recursos.",
        "La Universidad Central Coquimbo te espera para vivir una experiencia soberana de conocimiento."
    ];

    useEffect(() => {
        const target = new Date('2026-11-11T09:00:00');
        const interval = setInterval(() => {
            const now = new Date();
            const diff = target - now;
            if (diff > 0) {
                setCountdown({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60)
                });
            }
        }, 1000);

        const tipInterval = setInterval(() => {
            setActiveTip(prev => (prev + 1) % TIPS.length);
        }, 8000);

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            clearInterval(tipInterval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleRadio = () => {
        if (!audioRef.current) return;
        if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        const next = (trackIndex + 1) % RADIO_PLAYLIST.length;
        setTrackIndex(next);
        setCurrentTrack(RADIO_PLAYLIST[next]);
    };

    const prevTrack = () => {
        const prev = (trackIndex - 1 + RADIO_PLAYLIST.length) % RADIO_PLAYLIST.length;
        setTrackIndex(prev);
        setCurrentTrack(RADIO_PLAYLIST[prev]);
    };

    const changeTrack = (track, idx) => {
        setTrackIndex(idx);
        setCurrentTrack(track);
        setIsPlaying(true);
        document.getElementById('radio')?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (!audioRef.current) return;
        const player = audioRef.current;
        const targetSrc = UCEN_PATH + currentTrack.file;
        
        // Sync mutation for reliability (Hardened v3.0)
        if (!player.src.includes(currentTrack.file)) {
            player.pause();
            player.src = targetSrc;
            player.load();
        }

        if (isPlaying) {
            const playPromise = player.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Autoplay blocked or stream issue:", error);
                    setIsPlaying(false);
                });
            }
        } else {
            player.pause();
        }
    }, [currentTrack, isPlaying]);

    return (
        <div style={{ 
            position: 'fixed', inset: 0, zIndex: 200000, background: '#020617', 
            display: 'flex', flexDirection: 'column', overflowY: 'scroll', 
            fontFamily: '"Outfit", sans-serif', color: 'white'
        }}>
            <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundImage: `url('${UCEN_PATH}Cartel 42 Congreso ASFAE en UCEN La Serena.png')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,6,23,0.95), rgba(15,23,42,0.85), #020617)' }} />
            </div>

            <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', padding: isMobile ? '1rem' : '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'white', padding: '6px', borderRadius: '12px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={UCEN_PATH + 'LOGO UCEN-01.jpg'} style={{ width: '100%', height: 'auto' }} alt="UCEN" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: isMobile ? '1rem' : '1.4rem', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>VLS <span style={{ color: '#00F0FF' }}>UCEN</span> <span style={{ color: '#ef4444' }}>ASFAE</span></h1>
                        <div style={{ color: '#00F0FF', fontSize: '0.75rem', fontWeight: 'bold' }}>SEDE COQUIMBO 2026</div>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '15px', fontWeight: '900', cursor: 'pointer' }}>VOLVER</button>
            </header>

            <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: isMobile ? '2rem 1rem' : '4rem 3rem', display: 'grid', gridTemplateColumns: isMobile ? '100%' : '1fr 380px', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ color: '#00F0FF', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '1.5rem' }}>PORTAL DE CONGRESO NACIONAL</div>
                        <h2 style={{ fontSize: isMobile ? '2.2rem' : '5rem', fontWeight: 900, lineHeight: 0.85, marginBottom: '1.5rem' }}>EL FUTURO DE LOS <br/> <span style={{ color: '#00F0FF' }}>NEGOCIOS & IA</span></h2>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '40px', padding: '2.5rem' }}>
                            <img src={UCEN_PATH + 'Cartel 42 Congreso ASFAE en UCEN La Serena.png'} style={{ width: '100%', borderRadius: '25px' }} alt="ASFAE" />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ background: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 900, marginBottom: '1.5rem', width: 'fit-content' }}>COMUNICADO SOBERANO</div>
                                <p style={{ color: '#e2e8f0', lineHeight: 1.6, marginBottom: '2rem' }}>La Universidad Central Sede Coquimbo recibe a las 33 universidades del país. Anfitrión: Jaime Alonso Barrientos.</p>
                                <button onClick={toggleRadio} style={{ background: isPlaying ? '#00F0FF' : 'white', color: '#020617', padding: '1rem 2rem', borderRadius: '18px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>RADIO ASFAE</button>
                            </div>
                        </div>
                    </motion.div>

                    {/* UNIFIED VISOR CONTAINER */}
                    <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: '40px', padding: isMobile ? '1rem' : '2rem', border: '1px solid rgba(0, 240, 255, 0.3)', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: '#00F0FF', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <activePresBody.icon size={18} color="#000" />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 900, margin: 0 }}>VISOR ESTRATÉGICO ASFAE</h3>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {PRESENTATIONS.map((pres) => (
                                    <button 
                                        key={pres.id}
                                        onClick={() => setActivePresBody(pres)}
                                        style={{ 
                                            background: activePresBody.id === pres.id ? '#00F0FF' : 'rgba(255,255,255,0.05)',
                                            color: activePresBody.id === pres.id ? '#000' : '#fff',
                                            padding: '8px 12px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 900, border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                                        }}
                                    >
                                        {pres.id === 'vid' ? 'VIDEO' : `PRES ${pres.id.replace('p','')}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '25px', overflow: 'hidden', border: '2px solid rgba(0,240,255,0.1)' }}>
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={activePresBody.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    {activePresBody.type === 'VIDEO' && (
                                        <video src={UCEN_PATH + activePresBody.file} controls autoPlay muted playsInline onContextMenu={e => e.preventDefault()} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    )}
                                    {activePresBody.type === 'PDF' && (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <iframe src={UCEN_PATH + activePresBody.file + '#toolbar=0'} style={{ flex: 1, border: 'none' }} title="PDF Viewer"/>
                                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                                <a href={UCEN_PATH + activePresBody.file} target="_blank" rel="noopener noreferrer" style={{ color: '#00F0FF', fontSize: '0.7rem', textDecoration: 'none' }}>
                                                    <Maximize2 size={12} style={{ verticalAlign: 'middle', marginRight: '5px' }} /> ABRIR EN PANTALLA COMPLETA
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {activePresBody.type === 'PPTX' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1.5rem', background: 'rgba(0,0,0,0.4)', borderRadius: '25px' }}>
                                            <Monitor size={64} color="#00F0FF" />
                                            <div style={{ textAlign: 'center' }}>
                                                <h3 style={{ margin: 0 }}>PRESENTACIÓN ESTRATÉGICA</h3>
                                                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Microsoft PowerPoint (PPTX)</p>
                                            </div>
                                            <a href={UCEN_PATH + activePresBody.file} download style={{ background: '#00F0FF', color: '#000', padding: '12px 24px', borderRadius: '12px', fontWeight: 900, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Download size={20} /> DESCARGAR PPTX
                                            </a>
                                        </div>
                                    )}
                                    {activePresBody.type === 'IMAGE' && (
                                        <img src={UCEN_PATH + activePresBody.file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Pres" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* INTERACTIVE WHATSAPP INTERVIEW - EXPANDABLE */}
                    <div style={{ background: 'rgba(7, 94, 84, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)', borderRadius: '40px', padding: isMobile ? '1.5rem' : '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: '#25D366', width: '12px', height: '12px', borderRadius: '50%' }} />
                                <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#25D366' }}>DIÁLOGO ESTRATÉGICO (WHATSAPP)</h3>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#25D366', fontWeight: 900 }}>VICERRECTOR JAIME ALONSO</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <AnimatePresence>
                                {WHATSAPP_CHAT_FULL.slice(0, chatVisibleCount).map((msg, i) => (
                                    <motion.div 
                                        key={msg.id} 
                                        initial={{ opacity: 0, x: msg.sender.includes('VLS') ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ 
                                            alignSelf: msg.sender.includes('VLS') ? 'flex-start' : 'flex-end', 
                                            maxWidth: '85%', 
                                            background: msg.sender.includes('VLS') ? 'rgba(255,255,255,0.05)' : '#075E54', 
                                            padding: '1.2rem', 
                                            borderRadius: msg.sender.includes('VLS') ? '0 25px 25px 25px' : '25px 0 25px 25px',
                                            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.65rem', fontWeight: 900, color: '#25D366', marginBottom: '6px' }}>{msg.sender.toUpperCase()}</div>
                                        <div style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{msg.text}</div>
                                        <div style={{ fontSize: '0.6rem', textAlign: 'right', opacity: 0.5, marginTop: '8px' }}>{msg.time} ✓✓</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {chatVisibleCount < WHATSAPP_CHAT_FULL.length && (
                                <button 
                                    onClick={() => setChatVisibleCount(prev => Math.min(prev + 2, WHATSAPP_CHAT_FULL.length))}
                                    style={{ 
                                        alignSelf: 'center', background: '#25D366', color: '#000', padding: '12px 24px', 
                                        borderRadius: '15px', fontWeight: 900, border: 'none', cursor: 'pointer',
                                        marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)'
                                    }}
                                >
                                    CONTINUAR DIÁLOGO <ChevronDown size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid #ef4444', borderRadius: '30px', padding: '2rem', textAlign: 'center' }}>
                        <div style={{ color: '#ef4444', fontWeight: 900, fontSize: '0.7rem', marginBottom: '1.5rem' }}>CONTEO REGRESIVO ASFAE</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '2rem', fontWeight: 900 }}>
                            <div>{countdown.days}<br/><span style={{ fontSize: '0.6rem', opacity: 0.5 }}>DÍAS</span></div>
                            <div style={{ opacity: 0.3 }}>:</div>
                            <div>{countdown.hours}<br/><span style={{ fontSize: '0.6rem', opacity: 0.5 }}>HORAS</span></div>
                        </div>
                    </div>

                    <div id="radio" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '35px', padding: '2rem' }}>
                        <div style={{ fontWeight: 900, color: '#00F0FF', marginBottom: '1rem' }}>RADIO CONGRESO</div>
                        <div style={{ background: '#000', borderRadius: '15px', padding: '10px', marginBottom: '1.5rem', border: '2px solid #00F0FF', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#00F0FF', fontWeight: 900 }}>{currentTrack.title.toUpperCase()}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '1.5rem' }}>
                            <button onClick={prevTrack} style={{ background: 'none', border: 'none', color: '#00F0FF' }}><ChevronLeft size={32} /></button>
                            <button onClick={toggleRadio} style={{ background: '#00F0FF', border: 'none', width: '56px', height: '56px', borderRadius: '50%' }}>{isPlaying ? <Mic2 size={24} /> : <Play size={24} />}</button>
                            <button onClick={nextTrack} style={{ background: 'none', border: 'none', color: '#00F0FF' }}><ChevronRight size={32} /></button>
                        </div>
                        <div style={{ maxHeight: '180px', overflowY: 'auto' }} className="custom-scroll">
                            {RADIO_PLAYLIST.map((track, idx) => (
                                <button key={track.id} onClick={() => changeTrack(track, idx)} style={{ width: '100%', textAlign: 'left', padding: '10px', background: currentTrack.id === track.id ? 'rgba(0,240,255,0.1)' : 'none', border: 'none', color: 'white', fontSize: '0.75rem', cursor: 'pointer' }}>{track.title}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '30px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ color: '#00F0FF', fontWeight: 900, fontSize: '0.8rem', marginBottom: '1.5rem' }}>RECURSOS RÁPIDOS</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button onClick={() => changeTrack(RADIO_PLAYLIST[0], 0)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '1.2rem', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '20px', border: '1px solid rgba(0, 240, 255, 0.2)', color: 'white', cursor: 'pointer', textAlign: 'left' }}>
                                <Mic2 size={20} color="#00F0FF" />
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 900 }}>PODCAST: IA COQUIMBO</div>
                                    <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>ESCUCHAR AHORA</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, #00F0FF20, transparent)', borderRadius: '35px', padding: '2rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                            <img src="/serenito_3d_humanized_2026_1774875415876.png" style={{ width: '45px', height: '45px', borderRadius: '50%' }} alt="Avatar" />
                            <div><div style={{ fontWeight: 900 }}>SERENITA SMART</div><div style={{ fontSize: '0.65rem', color: '#00F0FF' }}>TIP EXCLUSIVO</div></div>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', fontStyle: 'italic' }}>"{TIPS[activeTip]}"</p>
                    </div>
                </div>
            </main>

            <audio ref={audioRef} onEnded={nextTrack} />
            <style>{`
                .custom-scroll::-webkit-scrollbar { width: 4px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0, 240, 255, 0.2); border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default VLSNewsUcen;
