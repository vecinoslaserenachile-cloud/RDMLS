import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';
import { 
  Music, Mic2, Tv, Film, Disc, ChevronDown, 
  Send, Play, Pause, Volume2, Search, ArrowRight,
  Globe, Share2, Award, Zap, X, MapPin, Compass, PlayCircle,
  ShoppingCart, Users as UsersIcon, Database, LayoutDashboard, Utensils, Coffee, Beer, Calculator, History, AlertCircle,
  Plus, DollarSign, Activity, HardHat, LogOut, Printer, Edit2, TrendingUp, User, LayoutGrid, Lock,
  MessageSquare, Compass as CompassIcon, Navigation, Youtube, Bot, Map, ShieldAlert
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import UniversalSerenito from '../components/UniversalSerenito';
import SEO from '../components/SEO';

const NuevoPeregrinoPortal = ({ onClose }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [radioFrequency, setRadioFrequency] = useState('peregrino'); // 'rdmls' or 'peregrino'
    const trackList = [
        { id: 1, title: "Himno Peregrino (Soberanía)", file: "/peregrino/peregrinos_tema.mp3" },
        { id: 2, title: "Cuéntame tus mentiras", file: "/peregrino/cuentame_mentiras.mp3" },
        { id: 3, title: "Frecuencia Peregrina (Loop)", file: "/peregrino_radio/peregrinos.mp3" },
        { id: 4, title: "Todo es Mentira 2025", file: "/sonicev/mp3 radio sonicev/Todo es mentira en el 2025.mp3" },
        { id: 5, title: "Eres Serena", file: "/music/eres_serena.mp3" },
        { id: 6, title: "Es Amor por La Serena", file: "/music/es_amor_por_la_serena.mp3" },
        { id: 7, title: "Vals de mis Recuerdos", file: "/music/vals_mis_recuerdos.mp3" },
        { id: 8, title: "Serenito Rap", file: "/music/serenito_rap.mp3" }
    ];

    const musicalArchives = [
        { title: "EN EL NUEVO PEREGRINO, Manolo Pez", url: "https://www.youtube.com/watch?v=jFfuMjdgE6c" },
        { title: "EN EL NUEVO PEREGRINO. Angelo Escobar, Amapola", url: "https://www.youtube.com/watch?v=G5V9-TddfR0" },
        { title: "EN EL BARDELUCILA, Noche Andina", url: "https://www.youtube.com/watch?v=jNsU3FDMe-4" },
        { title: "EN EL BARDELUCILA, Christian Galvez", url: "https://www.youtube.com/watch?v=iXLi5OzemBM" },
        { title: "EN EL NUEVO PEREGRINO, LOS INICIOS DE LA MONA SIMONA", url: "https://www.youtube.com/watch?v=rU1WLzwZF_U" },
        { title: "EN EL NUEVO PEREGRINO, Cuecas con Pandero e Rascha", url: "https://www.youtube.com/watch?v=8jpS-0Q5f10" },
        { title: "EN EL BARDELUCILA, El Dúo Cevicho", url: "https://www.youtube.com/watch?v=y2XDTwEI7dU" },
        { title: "EN EL BARDELUCILA, El Vicho al piano", url: "https://www.youtube.com/watch?v=-nqksSo7AIM" },
        { title: "EN EL BARDELUCILA, El Vicho en el piano", url: "https://www.youtube.com/watch?v=R3UW6oAIXlA" },
        { title: "EN EL BARDELUCILA, Muricio Redoles", url: "https://www.youtube.com/watch?v=ftE56z7Ro4c" },
        { title: "EN ELBARDELUCILA, Mauricio Redoles (Session 2)", url: "https://www.youtube.com/watch?v=rG3Elf-afMY" },
        { title: "EN EL BARDELUCILA, Mauricio Redoles (Session 3)", url: "https://www.youtube.com/watch?v=aaTLeJK1Ans" },
        { title: "EN ELBARDELUCILA, Mauricio Redoles (Session 4)", url: "https://www.youtube.com/watch?v=GxyKmr6y1fU" },
        { title: "EN EL NUEVO PEREGRINO, Pirqay", url: "https://www.youtube.com/watch?v=a5LftPY7CxM" },
        { title: "EN EL BARDELUCILA, Tablao Flamenco", url: "https://www.youtube.com/watch?v=ishfmBETY9Q" },
        { title: "JORGE CAMPOS: Arquitectura Jazz", url: "https://www.youtube.com/watch?v=ZAJpC9o-Mok" },
        { title: "LOS VIKINGS 5: Patrimonio Vivo", url: "https://www.youtube.com/watch?v=e4AYdzIF6OQ" },
        { title: "GRUPO COLAPSO: Rock Elquino", url: "https://www.youtube.com/watch?v=R-hC2QuUdE8" },
        { title: "PAULINA GODOY: El Culebrón", url: "https://www.youtube.com/watch?v=lgjba4j0Afo" },
        { title: "ANTONIA RODRÍGUEZ: Elite XCO", url: "https://www.youtube.com/watch?v=hdVC1pCSeJ4" },
        { title: "ANDREA TORREJÓN: Atrapanieblas", url: "https://www.youtube.com/watch?v=y2cUZXfk46E" },
        { title: "RODRIGO MIRANDA & TRUKEROS", url: "https://www.youtube.com/watch?v=S0Ra7dgllMA" },
        { title: "PAZ COURT: Sesión Peregrina", url: "https://www.youtube.com/watch?v=G9TVvuJ2Ap8" },
        { title: "NATALIA CORVETTO: Jazz Elquino", url: "https://www.youtube.com/watch?v=RgvZt1bcW_0" },
        { title: "NICOLE BUNOUT: Voz de Cristal", url: "https://www.youtube.com/watch?v=Vt1QoVGQ2l4" },
        { title: "PATRICIO MANNS: El Maestro", url: "https://www.youtube.com/watch?v=nRHYLZ2dm1E" },
        { title: "MEDINA TRIÓ: Jazz de Culto", url: "https://www.youtube.com/watch?v=n2s_oAoww-I" },
        { title: "ANGELO ESCOBAR: Trova Pura", url: "https://www.youtube.com/watch?v=bKBMJOk6DSc" },
        { title: "EL PLACER CULPABLE: Rock LS", url: "https://www.youtube.com/watch?v=9NPfB7aXBMI" },
        { title: "CUTURRUFO & JC BLUES: Legend", url: "https://www.youtube.com/watch?v=ifPK0PrXOaA" },
        { title: "EVELYN CORNEJO: Raíz", url: "https://www.youtube.com/watch?v=EHdbnJMxguk" },
        { title: "TABLAO FLAMENCO: Sesión II", url: "https://www.youtube.com/watch?v=Fc5y9hAdOJA" },
        { title: "TORREALBA & ALCAYAGA", url: "https://www.youtube.com/watch?v=M5fiorHVteM" },
        { title: "LOS VIKINGS 5: Master Session", url: "https://www.youtube.com/watch?v=aR0Y3p_1WvE" },
        { title: "MARIA ILLANES EN VIVO", url: "https://www.youtube.com/watch?v=LbDDrPr2Luo" },
        { title: "LA GAVIOTA: Silvio Rodriguez Cover", url: "https://www.youtube.com/watch?v=VT_Ydh1Eb64" },
        { title: "NICOLE BUNOUT EN EL NUEVO PEREGRINO", url: "https://www.youtube.com/watch?v=hLYK5RpYwnU" },
        { title: "PABLO MORALES EN VIVO", url: "https://www.youtube.com/watch?v=H77Y6Z_p0M0" },
        { title: "MANOLO PEZ: Sesión Nocturna", url: "https://www.youtube.com/watch?v=jFfuMjdgE6c" },
        { title: "DÚO CEVICHO: Cueca Urbana", url: "https://www.youtube.com/watch?v=y2XDTwEI7dU" }
    ];

    const youtubeClips = [
        { id: "e4AYdzIF6OQ", title: "Cumbia Eléctrica", duration: "3:45" },
        { id: "R-hC2QuUdE8", title: "Rock del Desierto", duration: "4:20" },
        { id: "wzNKbSUFHQk", title: "Trova Elquina", duration: "5:15" },
        { id: "lgjba4j0Afo", title: "Humedales Vivos", duration: "6:30" },
        { id: "ZAJpC9o-Mok", title: "Jorge Campos Session", duration: "8:00" },
        { id: "S0Ra7dgllMA", title: "Los Trukeros en Vivo", duration: "5:20" },
        { id: "G9TVvuJ2Ap8", title: "Paz Court Session", duration: "4:10" },
        { id: "nRHYLZ2dm1E", title: "Patricio Manns Live", duration: "10:15" },
        { id: "ifPK0PrXOaA", title: "Cuturrufo & JC Blues", duration: "7:45" },
        { id: "EHdbnJMxguk", title: "Evelyn Cornejo", duration: "6:30" },
        { id: "Vt1QoVGQ2l4", title: "Nicole Bunout Acústico", duration: "4:50" },
        { id: "bKBMJOk6DSc", title: "Angelo Escobar Trova", duration: "5:10" },
        { id: "0SnhwCppjI8", title: "Paisano: Memoria Viva", duration: "6:20" },
        { id: "9NPfB7aXBMI", title: "El Placer Culpable", duration: "4:30" },
        { id: "Fc5y9hAdOJA", title: "Tablao Flamenco", duration: "12:15" },
        { id: "hLYK5RpYwnU", title: "Nicole Bunout", duration: "5:45" },
        { id: "LbDDrPr2Luo", title: "Maria Illanes", duration: "4:15" },
        { id: "VT_Ydh1Eb64", title: "Alvaro Cotepa", duration: "3:50" },
        { id: "rU1WLzwZF_U", title: "Mona Simona", duration: "4:55" },
        { id: "8jpS-0Q5f10", title: "Cuecas Pandero", duration: "3:20" },
        { id: "y2XDTwEI7dU", title: "Dúo Cevicho", duration: "4:40" },
        { id: "-nqksSo7AIM", title: "El Vicho al Piano", duration: "6:10" },
        { id: "R3UW6oAIXlA", title: "Vicho en Piano", duration: "5:30" },
        { id: "ftE56z7Ro4c", title: "Mauricio Redoles I", duration: "8:20" },
        { id: "rG3Elf-afMY", title: "Mauricio Redoles II", duration: "7:15" },
        { id: "aaTLeJK1Ans", title: "Mauricio Redoles III", duration: "9:40" },
        { id: "GxyKmr6y1fU", title: "Mauricio Redoles IV", duration: "11:05" },
        { id: "a5LftPY7CxM", title: "Pirqay", duration: "4:50" },
        { id: "ishfmBETY9Q", title: "Tablao Session", duration: "14:20" },
        { id: "jFfuMjdgE6c", title: "Manolo Pez", duration: "3:40" },
        { id: "G5V9-TddfR0", title: "Angelo Escobar", duration: "5:15" },
        { id: "jNsU3FDMe-4", title: "Noche Andina", duration: "6:50" },
        { id: "iXLi5OzemBM", title: "Christian Galvez", duration: "7:10" }
    ];

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    const styles = {
        container: {
            backgroundColor: '#020617',
            color: '#f8fafc',
            fontFamily: "'Outfit', sans-serif",
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        btnPill: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 28px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        btnActive: {
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '50px',
            fontSize: '0.7rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5)'
        },
        smartPill: {
            background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            padding: '10px 20px',
            borderRadius: '15px',
            fontSize: '0.65rem',
            fontWeight: 900,
            letterSpacing: '1px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: '0.3s'
        }
    };

    if (isLoading) return <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}><Activity className="animate-spin text-blue-500" size={30} /></div>;

    return (
        <div style={styles.container}>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
            >
                <SEO 
                    title="Nuevo Peregrino · Portal Cultural" 
                    description="Espacio transmedia para la soberanía cultural y musical de La Serena." 
                />

                {/* BARRA DE NAVEGACIÓN INSTITUCIONAL (Smart Comuna - 4 PILARES) */}
                <div style={{ position: 'fixed', top: '15px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.8)', padding: '6px 15px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', width: 'auto', maxWidth: '95vw', overflowX: 'auto' }}>
                    <button 
                        onClick={() => window.open('https://www.puertasmart.cl', '_blank')}
                        style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <UsersIcon size={14} /> <span className="hide-on-mobile">CITIZENS</span>
                    </button>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-smart-admin-fixed'))}
                        style={{ background: 'transparent', border: 'none', color: '#10b981', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <ShieldAlert size={14} /> <span className="hide-on-mobile">ADMINISTRATION</span>
                    </button>
                    <button 
                        onClick={() => window.open('https://vecinoslaserenachile-cloud.github.io/serenito-app/', '_blank')}
                        style={{ background: 'transparent', border: 'none', color: '#fbbf24', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Award size={14} /> <span className="hide-on-mobile">EVENTS</span>
                    </button>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-smart-listening'))}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', padding: '8px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <Activity size={14} /> <span className="hide-on-mobile">LISTENING</span>
                    </button>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', height: '20px', alignSelf: 'center', margin: '0 5px' }} />
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('vls-open-distances'))}
                        style={{ background: 'rgba(56, 189, 248, 0.2)', border: 'none', color: '#38bdf8', padding: '8px 12px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        title="Cuadro de Distancias"
                    >
                        <Map size={14} /> <span style={{ fontSize: '0.6rem', fontWeight: '900' }}>MAPA</span>
                    </button>
                </div>

                <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.dispatchEvent(new CustomEvent('open-faro'))}
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: 'none', color: 'white', padding: '15px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 20px rgba(59, 130, 246, 0.5)' }}
                        title="Asistente Faro IA"
                    >
                        <Bot size={24} />
                    </motion.button>
                </div>
                {/* CINEMATIC AMBIENT VIDEO - FIXED BACKGROUND */}
                <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
                    <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(1.2) contrast(1.1)' }}>
                        <source src="/peregrino/GtoPeregrino.mp4" type="video/mp4" />
                    </video>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,6,23,0.4), rgba(2,6,23,0.9)), radial-gradient(circle at center, transparent, rgba(2,6,23,0.8))' }} />
                </div>

                {/* NAV OVERLAY */}
                <div style={{ padding: '40px 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                    <motion.img initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} src="/peregrino/logo_peregrino_blanco.png" style={{ height: '60px' }} />
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button onClick={() => window.dispatchEvent(new CustomEvent('open-smart-admin-fixed'))} style={{ ...styles.btnPill, background: 'rgba(56, 189, 248, 0.1)', borderColor: '#38bdf8', color: '#38bdf8' }}><Lock size={14} /> Soberanía Digital</button>
                    </div>
                </div>

                {/* HERO EXPERIENCE */}
                <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 6%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '320px' }}>

                            <motion.h1 
                                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                                style={{ fontSize: '7rem', fontWeight: 950, margin: '20px 0', lineHeight: 0.85, letterSpacing: '-6px', color: 'white' }}
                            >
                                NUEVO <br/>PERE<span style={{ color: '#3b82f6' }}>GRINO</span>
                            </motion.h1>
                            
                            {/* SMART QUICK ACCESS & RADIO SELECTOR */}
                            <div style={{ marginTop: '40px' }}>
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                    <button 
                                        onClick={() => {
                                            if (radioFrequency === 'rdmls') {
                                                window.dispatchEvent(new CustomEvent('vls-start-radio'));
                                            } else {
                                                setIsPlaying(!isPlaying);
                                                if (audioRef.current) {
                                                    isPlaying ? audioRef.current.pause() : audioRef.current.play();
                                                }
                                            }
                                        }} 
                                        style={{ ...styles.btnActive, padding: '20px 45px' }}
                                    >
                                        {radioFrequency === 'rdmls' ? <Music size={18} /> : (isPlaying ? <Pause size={18} /> : <Play size={18} />)} 
                                        {radioFrequency === 'rdmls' ? 'RDMLS en Vivo' : 'Radio Peregrino'}
                                    </button>
                                    <button onClick={() => window.open('https://www.youtube.com/@culturaperegrina7888', '_blank')} style={{ ...styles.btnPill, padding: '20px 45px' }}><Youtube size={18} /> Canal Oficial</button>
                                </div>

                                {/* FREQUENCY SELECTOR */}
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '15px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: '#64748b', marginLeft: '10px', textTransform: 'uppercase' }}>Frecuencia:</span>
                                    <button 
                                        onClick={() => { setRadioFrequency('rdmls'); setIsPlaying(false); audioRef.current?.pause(); }}
                                        style={{ 
                                            padding: '8px 15px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                                            backgroundColor: radioFrequency === 'rdmls' ? '#3b82f6' : 'transparent',
                                            color: radioFrequency === 'rdmls' ? 'white' : '#64748b'
                                        }}
                                    >1. RDMLS (Stream)</button>
                                    <button 
                                        onClick={() => setRadioFrequency('peregrino')}
                                        style={{ 
                                            padding: '8px 15px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 800, border: 'none', cursor: 'pointer',
                                            backgroundColor: radioFrequency === 'peregrino' ? '#3b82f6' : 'transparent',
                                            color: radioFrequency === 'peregrino' ? 'white' : '#64748b'
                                        }}
                                    >2. PEREGRINO (Local)</button>
                                </div>

                                {radioFrequency === 'peregrino' && (
                                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <audio 
                                            ref={audioRef} 
                                            src={trackList[currentTrackIndex].file} 
                                            onEnded={() => setCurrentTrackIndex((prev) => (prev + 1) % trackList.length)}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                        />
                                        <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 700 }}>
                                            Reproduciendo: <span style={{ color: 'white' }}>{trackList[currentTrackIndex].title}</span>
                                        </div>
                                        <button 
                                            onClick={() => setCurrentTrackIndex((prev) => (prev + 1) % trackList.length)}
                                            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                                            title="Siguiente"
                                        >
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3D MAITRE SERENITO */}
                        <div style={{ width: '450px', height: '600px', position: 'relative' }}>
                            <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
                                <ambientLight intensity={1.5} />
                                <Suspense fallback={null}>
                                    <UniversalSerenito animation="Greeting" scale={0.1} position={[0, -2.8, 0]} />
                                </Suspense>
                            </Canvas>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
                                style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(59,130,246,0.1)', backdropFilter: 'blur(20px)', padding: '15px 30px', borderRadius: '40px', border: '1px solid #3b82f6', whiteSpace: 'nowrap' }}
                            >
                                <div style={{ fontSize: '0.6rem', color: '#3b82f6', fontWeight: 950, letterSpacing: '3px', textTransform: 'uppercase' }}>Bienvenido Vecino</div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* CLIPS HORIZONTAL TRACK */}
                <div style={{ padding: '40px 6%', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '4px' }}>Peregrino <span style={{ color: '#3b82f6' }}>Visions</span></h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px' }}>Archivo Multimedia 2025</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '25px', overflowX: 'auto', paddingBottom: '20px' }} className="no-scrollbar">
                        {/* LOCAL CLIPS */}
                        <VideoClipCard src="/peregrino/gato_humo_duena.mp4" title="Sentir Elquino" duration="0:32" />
                        <VideoClipCard src="/peregrino/gato_y_duena_peregrino.mp4" title="Esencia del Barrio" duration="1:12" />
                        <VideoClipCard src="/peregrino/VideoLogoPeregrino.mp4" title="Identidad 2025" duration="0:20" />

                        {/* YOUTUBE CLIPS EXPANSION */}
                        {youtubeClips.map((clip, idx) => (
                            <YouTubeVideoClipCard key={idx} {...clip} />
                        ))}
                    </div>
                </div>

                {/* MUSICAL ARCHIVE SECTION */}
                <div style={{ padding: '80px 6%', background: 'linear-gradient(to bottom, #020617, #0f172a)' }}>
                    <div style={{ marginBottom: '50px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, margin: 0, letterSpacing: '-2px' }}>ARCHIVO MUSICAL <span style={{ color: '#3b82f6' }}>SOBERANO</span></h2>
                            <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 700, marginTop: '10px', textTransform: 'uppercase', letterSpacing: '4px' }}>Memoria Transmedia del Limarí y Elqui</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ padding: '10px 20px', backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', color: '#3b82f6', fontSize: '0.65rem', fontWeight: 900 }}>
                                {musicalArchives.length} PISTAS RECUPERADAS
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                        {musicalArchives.map((archive, idx) => (
                            <MusicArchiveCard key={idx} {...archive} />
                        ))}
                    </div>
                </div>

                {/* FOOTER SMART COMPLIANCE */}
                <div style={{ padding: '20px 6%', background: '#020617', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.6rem', color: '#475569', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>
                        © 2025 Nuevo Peregrino · Desarrollado por VLS Soberanía Digital
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Award size={18} color="#f59e0b" />
                        <Globe size={18} color="#3b82f6" />
                        <Zap size={18} color="#10b981" />
                    </div>
                </div>
            </motion.div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

const VideoClipCard = ({ src, title, duration }) => (
    <div style={{ minWidth: '340px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
        <div style={{ height: '200px', position: 'relative' }}>
            <video playsInline muted onMouseEnter={e => e.target.play()} onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={src} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#ef4444', padding: '4px 8px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>{duration}</div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', transition: '0.3s' }} className="hover:opacity-0">
                <PlayCircle size={40} color="white" />
            </div>
        </div>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: 'white' }}>{title}</h4>
            <Share2 size={16} color="#64748b" />
        </div>
    </div>
);

const MusicArchiveCard = ({ title, url }) => {
    const videoId = url.split('v=')[1] || url.split('/').pop().split('?')[0];
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <motion.div 
            whileHover={{ y: -10 }}
            onClick={() => window.open(url, '_blank')}
            style={{ 
                background: 'rgba(30, 41, 59, 0.4)', 
                borderRadius: '20px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.05)', 
                cursor: 'pointer',
                transition: '0.3s'
            }}
        >
            <div style={{ height: '160px', position: 'relative' }}>
                <img src={thumbUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt={title} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(59,130,246,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}>
                        <Play size={20} color="white" fill="white" />
                    </div>
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1.4 }}>{title}</h4>
                <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Youtube size={12} color="#ef4444" /> YouTube Archive
                </div>
            </div>
        </motion.div>
    );
};

const YouTubeVideoClipCard = ({ id, title, duration }) => {
    const thumbUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    
    return (
        <div 
            onClick={() => window.open(`https://www.youtube.com/watch?v=${id}`, '_blank')}
            style={{ minWidth: '340px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
        >
            <div style={{ height: '200px', position: 'relative' }}>
                <img src={thumbUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#ef4444', padding: '4px 8px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>{duration}</div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', transition: '0.3s' }}>
                    <PlayCircle size={40} color="white" />
                </div>
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900, color: 'white' }}>{title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Youtube size={16} color="#ef4444" />
                    <Share2 size={16} color="#64748b" />
                </div>
            </div>
        </div>
    );
};

export default NuevoPeregrinoPortal;
