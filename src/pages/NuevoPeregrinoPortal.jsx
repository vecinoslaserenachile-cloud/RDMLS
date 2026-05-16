import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { useNavigate } from 'react-router-dom';
import { 
  Music, Mic2, Tv, Film, Disc, ChevronDown, 
  Send, Play, Pause, Volume2, Search, ArrowRight,
  Globe, Share2, Award, Zap, X, MapPin, Compass, PlayCircle,
  ShoppingCart, Users as UsersIcon, Database, LayoutDashboard, Utensils, Coffee, Beer, Calculator, History, AlertCircle,
  Plus, DollarSign, Activity, HardHat, LogOut, Printer, Edit2, TrendingUp, User, LayoutGrid, Lock,
  MessageSquare, Compass as CompassIcon, Navigation, Youtube
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import UniversalSerenito from '../components/UniversalSerenito';

const NuevoPeregrinoPortal = ({ onClose }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const trackList = [
        { id: 1, title: "Himno Peregrino (Soberanía)", file: "/peregrino/peregrinos_tema.mp3" },
        { id: 2, title: "Cuéntame tus mentiras", file: "/peregrino/cuentame_mentiras.mp3" }
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
        { title: "EN EL BARDELUCILA, Tablao Flamenco", url: "https://www.youtube.com/watch?v=ishfmBETY9Q" }
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
                        <button onClick={() => alert('ACCESO RESTRINGIDO - MÓDULO BLOQUEADO POR SEGURIDAD SOBERANA')} style={{ ...styles.btnPill, opacity: 0.5, cursor: 'not-allowed' }}><Lock size={14} /> Acceso Bloqueado</button>
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
                            
                            {/* SMART QUICK ACCESS */}
                            <div style={{ display: 'flex', gap: '15px', marginTop: '40px', flexWrap: 'wrap' }}>
                                <button onClick={() => window.dispatchEvent(new CustomEvent('open-vls-radio'))} style={{ ...styles.btnActive, padding: '20px 45px' }}><Music size={18} /> Radio en Vivo</button>
                                <button onClick={() => window.open('https://www.youtube.com/@culturaperegrina7888', '_blank')} style={{ ...styles.btnPill, padding: '20px 45px' }}><Youtube size={18} /> Canal Oficial</button>
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
                        <VideoClipCard src="/peregrino/gato_humo_duena.mp4" title="Sentir Elquino" duration="0:32" />

                        <VideoClipCard src="/peregrino/gato_y_duena_peregrino.mp4" title="Esencia del Barrio" duration="1:12" />
                        <VideoClipCard src="/peregrino/VideoLogoPeregrino.mp4" title="Identidad 2025" duration="0:20" />
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

export default NuevoPeregrinoPortal;
