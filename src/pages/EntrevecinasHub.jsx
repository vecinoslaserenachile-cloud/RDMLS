import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import VLSNotesGallery from '../components/VLSNotesGallery';
import HechoEnChile from '../components/HechoEnChile';
import { Home, Heart, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio as RadioIcon, Info, ChevronRight, Sparkles, BookOpen, Moon, Stars, GraduationCap, Video, Flame, Hammer, TreePine, Sun, Apple, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EntrevecinasProposeModal from '../components/EntrevecinasProposeModal';

/**
 * ENTREVECINAS.CL PORTAL V4.1 - VECINAL ONLY
 * Sistema de transmisión continua con controles nativos VLS Studio.
 * Rebranding total: de Municipal a Vecinal.
 */
export default function EntrevecinasHub() {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(50);
    const [currentVideoTitle, setCurrentVideoTitle] = useState("Sincronizando señal vecinal...");
    const [quality, setQualityState] = useState('default');
    const [isProposeOpen, setIsProposeOpen] = useState(false);
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    // Lista de videos para el loop continuo (EntreVecinas)
    const playlist = [
        "EoIE7lVYWIw", // Manifiesto / Solange / Javiera / Margarita
        "lgjba4j0Afo", // Paulina Godoy
        "IPeBSr9Tuq4", // Mónica Sierra
        "hdVC1pCSeJ4", // Antonia Rodríguez
        "y2cUZXfk46E", // Andrea Torrejón
        "B3xxKc6Y3eo", // Daniela Olmos
        "Y2KW_QhGj5I", // Loreto Narbona
        "IUPiyBw6eSQ", // Camila Beltrand
        "jWmaGafzEuk"  // Camila Sabando
    ];

    // Configuración de Favicon y Título (Soberanía Vecinal)
    useEffect(() => {
        document.title = "entrevecinas.cl | Soberanía Vecinal";
        const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = '/entrevecinas_icon.png'; 
        document.getElementsByTagName('head')[0].appendChild(link);

        const handleOpenPropose = () => setIsProposeOpen(true);
        window.addEventListener('open-propose-content', handleOpenPropose);

        const handlePlayVideo = (e) => {
            const videoIdRaw = e.detail;
            if (playerRef.current && videoIdRaw) {
                const parts = videoIdRaw.split('?');
                const videoId = parts[0];
                const params = {};
                if (parts[1]) {
                    parts[1].split('&').forEach(p => {
                        const [k, v] = p.split('=');
                        params[k] = parseInt(v);
                    });
                }
                playerRef.current.loadVideoById({ videoId, startSeconds: params.start || 0 });
                playerRef.current.unMute();
                setIsMuted(false);
                setIsPlaying(true);
                containerRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        window.addEventListener('entrevecinas-play-video', handlePlayVideo);

        return () => {
            window.removeEventListener('open-propose-content', handleOpenPropose);
            window.removeEventListener('entrevecinas-play-video', handlePlayVideo);
        };
    }, []);

    // Cargar YouTube API
    useEffect(() => {
        const initPlayer = () => {
            playerRef.current = new window.YT.Player('vls-radio-player', {
                height: '100%',
                width: '100%',
                videoId: playlist[0],
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    playlist: playlist.join(',')
                },
                events: {
                    'onReady': (event) => {
                        const savedState = JSON.parse(sessionStorage.getItem('vls_radio_state') || '{}');
                        const startIdx = savedState.index || 0;
                        const startSec = savedState.currentTime || 0;

                        if (startIdx > 0 || startSec > 0) {
                            event.target.loadPlaylist({
                                playlist: playlist,
                                index: startIdx,
                                startSeconds: startSec
                            });
                        } else {
                            event.target.playVideo();
                        }
                        
                        event.target.setVolume(volume);

                        // Guardar estado de reproducción periódicamente
                        if (window.vlsRadioInterval) clearInterval(window.vlsRadioInterval);
                        window.vlsRadioInterval = setInterval(() => {
                           if (event.target && event.target.getPlaylistIndex) {
                               sessionStorage.setItem('vls_radio_state', JSON.stringify({
                                   index: event.target.getPlaylistIndex(),
                                   currentTime: event.target.getCurrentTime()
                               }));
                           }
                        }, 3000);
                    },
                    'onStateChange': (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                            setCurrentVideoTitle(event.target.getVideoData().title || "Emitiendo Señal...");
                        } else if (event.data === window.YT.PlayerState.PAUSED) {
                            setIsPlaying(false);
                        }
                    }
                }
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (window.vlsRadioInterval) clearInterval(window.vlsRadioInterval);
            if (playerRef.current) {
                try { 
                    if (playerRef.current.getPlaylistIndex) {
                        sessionStorage.setItem('vls_radio_state', JSON.stringify({
                            index: playerRef.current.getPlaylistIndex(),
                            currentTime: playerRef.current.getCurrentTime()
                        }));
                    }
                    playerRef.current.destroy(); 
                } catch(e) {}
            }
        };
    }, []);

    const togglePlay = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const val = parseInt(e.target.value);
        setVolume(val);
        if (playerRef.current) {
            playerRef.current.setVolume(val);
            if (val > 0) {
                if (isMuted) playerRef.current.unMute();
                setIsMuted(false);
            } else {
                playerRef.current.mute();
                setIsMuted(true);
            }
        }
    };

    const handleQuality = (q) => {
        if (playerRef.current && playerRef.current.setPlaybackQuality) {
            playerRef.current.setPlaybackQuality(q);
            setQualityState(q);
        }
    };

    const toggleMute = () => {
        if (playerRef.current) {
            if (isMuted) {
                playerRef.current.unMute();
            } else {
                playerRef.current.mute();
            }
            setIsMuted(!isMuted);
        }
    };

    const nextVideo = () => playerRef.current?.nextVideo();
    const prevVideo = () => playerRef.current?.previousVideo();

    const goToVLS = () => {
        window.location.href = "https://vecinoslaserena.cl";
    };

    return (
        <div style={{ 
            background: '#020617', 
            minHeight: '100vh', 
            color: 'white', 
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header con Rebranding Vecinal */}
            <header style={{
                padding: '1.2rem 2rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(2, 6, 23, 0.98)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div 
                    onClick={goToVLS}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                >
                    {/* El Favicon / Logo de Entrevecinas */}
                    <div style={{ 
                        width: '45px', 
                        height: '45px', 
                        background: '#f97316', // Color naranja del logo enviado
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 5px 15px rgba(249, 115, 22, 0.4)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '2px' }}>
                             <Heart size={24} fill="white" stroke="none" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ 
                            background: 'linear-gradient(to right, #ffffff, #f97316)', 
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '900', 
                            fontSize: '1.4rem',
                            letterSpacing: '1px',
                            lineHeight: '1'
                        }}>
                            entrevecinas.cl
                        </div>
                        <div style={{ fontSize: '0.65rem', fontWeight: '900', color: '#64748b', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>
                            Por vecinoslaserena.cl
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={goToVLS}
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'white',
                            padding: '0.6rem 1.4rem',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                        }}
                    >
                        <Home size={18} /> HUB VLS
                    </button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '2rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    
                    {/* SECCIÓN LIVE MASTER VECINAL */}
                    <section style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {/* REPRODUCTOR VECINAL TV */}
                        <div 
                            ref={containerRef}
                            style={{ 
                                gridColumn: 'span 2',
                                background: 'rgba(15, 23, 42, 0.8)', 
                                borderRadius: '35px', 
                                overflow: 'hidden', 
                                border: '1px solid rgba(249, 115, 22, 0.3)', // Borde Naranja
                                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6)',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                             <div style={{ 
                                position: 'absolute', 
                                top: '25px', 
                                left: '25px', 
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{ background: '#ef4444', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px', animation: 'pulse 2s infinite' }}>
                                    <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }} /> VECINAL EN VIVO
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.7)', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    SEÑAL TECNOLOGÍA AUTÓNOMA
                                </div>
                            </div>

                            <div style={{ flex: 1, position: 'relative', aspectRatio: '16/9', background: '#000' }}>
                                <div id="vls-radio-player" style={{ pointerEvents: 'none' }} />
                                {!isPlaying && (
                                    <div onClick={togglePlay} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', cursor: 'pointer', zIndex: 5 }}>
                                        <Play size={80} fill="white" color="white" />
                                    </div>
                                )}
                            </div>

                            {/* BARRA DE CONTROLES VECINALES */}
                            <div style={{ padding: '1.5rem 2rem', background: 'linear-gradient(to right, rgba(15,23,42,0.95), rgba(30,41, slate 59,0.95))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <button onClick={prevVideo} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><SkipBack size={24} fill="white" /></button>
                                    <button onClick={togglePlay} style={{ background: '#f97316', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' }}>
                                        {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" style={{ marginLeft: '4px' }} />}
                                    </button>
                                    <button onClick={nextVideo} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><SkipForward size={24} fill="white" /></button>
                                </div>

                                <div style={{ flex: 1, margin: '0 3rem', overflow: 'hidden' }}>
                                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#f97316', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>Crónica Vecinal:</p>
                                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentVideoTitle}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {/* Selectores de Calidad */}
                                    <div style={{ display: 'flex', gap: '6px', marginRight: '5px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <button 
                                            onClick={() => handleQuality('small')}
                                            style={{ 
                                                background: quality === 'small' ? '#f97316' : 'transparent', 
                                                border: 'none', 
                                                color: quality === 'small' ? 'white' : 'white', 
                                                opacity: quality === 'small' ? 1 : 0.4,
                                                fontSize: '0.6rem', 
                                                padding: '3px 8px', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer', 
                                                fontWeight: '900',
                                                transition: 'all 0.2s'
                                            }}
                                        >SD</button>
                                        <button 
                                            onClick={() => handleQuality('hd720')}
                                            style={{ 
                                                background: quality === 'hd720' ? '#f97316' : 'transparent', 
                                                border: 'none', 
                                                color: quality === 'hd720' ? 'white' : 'white', 
                                                opacity: quality === 'hd720' ? 1 : 0.4,
                                                fontSize: '0.6rem', 
                                                padding: '3px 8px', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer', 
                                                fontWeight: '900',
                                                transition: 'all 0.2s'
                                            }}
                                        >HD</button>
                                    </div>

                                    <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: isMuted ? '#f97316' : '#94a3b8', cursor: 'pointer' }}>
                                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                    </button>
                                    
                                    <input 
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="vls-volume-slider"
                                        style={{ 
                                            width: '80px', 
                                            height: '4px', 
                                            accentColor: '#f97316', 
                                            cursor: 'pointer'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* INFO PANEL CON SUBTEXTO SMART CIUDAD */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(139, 92, 246, 0.15))',
                            borderRadius: '35px',
                            padding: '3rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            border: '1px solid rgba(249, 115, 22, 0.2)',
                            backdropFilter: 'blur(30px)'
                        }}>
                            <div style={{ width: '60px', height: '60px', background: '#f97316', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 15px 30px rgba(249, 115, 22, 0.4)' }}>
                                <RadioIcon size={30} color="white" />
                            </div>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1', tracking: 'tight' }}>
                                <span style={{ color: '#f97316' }}>Radio TV</span> <br/>
                                <span style={{ opacity: 0.9 }}>Vecinal</span>
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                                Transmisión unificada de historias y liderazgo femenino. Smart Ciudad · Tecnología Vecinal Autónoma.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(249, 115, 22, 0.1)', padding: '12px 20px', borderRadius: '15px', border: '1px solid rgba(249, 115, 22, 0.3)', width: 'fit-content' }}>
                                <Info size={18} color="#f97316" />
                                <span style={{ color: '#f97316', fontSize: '0.8rem', fontWeight: '900', letterSpacing: '1px' }}>LOOP AUTOMÁTICO ACTIVO</span>
                            </div>
                        </div>
                    </section>

                    {/* TARJETA GRÁFICA: INVITACIÓN MILAGROS (SOLICITADO POR USUARIO) */}
                    <section style={{ marginBottom: '4rem' }}>
                        <motion.div 
                            whileHover={{ y: -10 }}
                            onClick={() => setIsProposeOpen(true)}
                            style={{
                                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                                borderRadius: '40px',
                                border: '1px solid rgba(236, 72, 153, 0.3)',
                                padding: '3rem',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '3rem',
                                alignItems: 'center',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            {/* Background Glow */}
                            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: '#ec4899', filter: 'blur(150px)', opacity: 0.1, pointerEvents: 'none' }} />
                            
                            <div style={{ position: 'relative', width: '100%', maxWidth: '280px', flexShrink: 0 }}>
                                <img 
                                    src="/characters/milagros.png" 
                                    alt="Milagros" 
                                    style={{ 
                                        width: '100%', 
                                        borderRadius: '35px', 
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                        border: '4px solid #ec4899'
                                    }} 
                                />
                                <div style={{ position: 'absolute', top: '-15px', left: '-15px', background: '#ec4899', color: 'white', padding: '10px 20px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: '900', boxShadow: '0 5px 15px rgba(236, 72, 153, 0.5)' }}>
                                    ¡HOLA VECINA!
                                </div>
                            </div>

                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                    <span style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', padding: '5px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '900', border: '1px solid rgba(236, 72, 153, 0.3)' }}>COMUNICACIÓN SOCIAL</span>
                                    <Sparkles size={20} color="#ec4899" />
                                </div>
                                <h2 style={{ fontSize: '3rem', fontWeight: '950', color: 'white', marginBottom: '1.5rem', lineHeight: '1' }}>
                                    ¿Tienes una historia <br/> 
                                    <span style={{ color: '#ec4899' }}>que contarnos?</span>
                                </h2>
                                <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                    Soy Milagros y estoy aquí para ayudarte a redactar y publicar tu relato en nuestro portal. El proceso es guiado y muy sencillo.
                                    <br/><br/>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '12px 20px', borderRadius: '15px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', color: '#e2e8f0' }}>
                                        💡 <strong>Tip Smart:</strong> Dentro del formulario usa la tecla <strong style={{ color: '#ec4899' }}>TAB</strong> para ver sugerencias mágicas de temas.
                                    </span>
                                </p>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setIsProposeOpen(true); }}
                                    style={{
                                        background: 'linear-gradient(90deg, #ec4899 0%, #d946ef 100%)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '1.2rem 3.5rem',
                                        fontSize: '1.2rem',
                                        fontWeight: '950',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        boxShadow: '0 15px 30px rgba(236, 72, 153, 0.4)',
                                        transition: '0.3s'
                                    }}
                                >
                                    EMPEZAR MI RELATO <ChevronRight size={24} />
                                </button>
                            </div>
                        </motion.div>
                    </section>

                    {/* SECCIÓN ACADEMIA ENTREVECINAS: ASTRONOMÍA E ITALIANO */}
                    <section style={{ marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {/* TARJETA: ASTRONOMÍA CON CAMILA */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(56, 189, 248, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#8b5cf6', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(139, 92, 246, 0.3)' }}>ACADEMIA ESTELAR</span>
                                    <Moon size={18} color="#a78bfa" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Astronomía <br/><span style={{ color: '#a78bfa' }}>con Camila</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    La Cruzada por la Noche: Defendiendo el Derecho a las Estrellas. Obtén tu certificado de "Guardiana de los Cielos".
                                </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button 
                                    onClick={() => navigate('/astronomia-beltrand')}
                                    style={{ background: 'linear-gradient(90deg, #8b5cf6, #38bdf8)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'IUPiyBw6eSQ' })); }}
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: ITALIANO CON FRANCESCA */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(239, 68, 68, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#10b981', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(16, 185, 129, 0.3)' }}>IDIOMAS</span>
                                    <BookOpen size={18} color="#34d399" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Aprende Italiano <br/><span style={{ color: '#34d399' }}>con Francesca</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    El idioma del arte y la arquitectura. Estudia, juega y certifícate desde la comodidad de tu hogar.
                                </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button 
                                    onClick={() => navigate('/tano')}
                                    style={{ background: 'linear-gradient(90deg, #10b981, #ef4444)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); navigate('/tano'); }}
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <Stars size={18} /> VER MÓDULOS
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: HUMEDALES CON JAVIERA */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(14, 165, 233, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(20, 184, 166, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#14b8a6', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(20, 184, 166, 0.2)', color: '#5eead4', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(20, 184, 166, 0.3)' }}>MEDIOAMBIENTE</span>
                                    <BookOpen size={18} color="#5eead4" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Humedales <br/><span style={{ color: '#5eead4' }}>con Javiera</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    La Guardiana del Borde. Entiende la Ley 21.202 y certifica tus conocimientos ambientales.
                                </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button 
                                    onClick={() => navigate('/humedales-campos')}
                                    style={{ background: 'linear-gradient(90deg, #14b8a6, #0ea5e9)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'EoIE7lVYWIw?start=1174' })); }}
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>
                        {/* TARJETA: ADOBE VIVO CON SOLANGE */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(252, 211, 77, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(217, 119, 6, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#d97706', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(217, 119, 6, 0.2)', color: '#fcd34d', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(217, 119, 6, 0.3)' }}>ARQUITECTURA VIVA</span>
                                    <Hammer size={18} color="#fcd34d" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Adobe Vivo <br/><span style={{ color: '#fcd34d' }}>con Solange</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    Desmitifica el adobe. Descubre su inercia térmica, aprende a reforzarlo sísmicamente y certifícate.
                                </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button 
                                    onClick={() => navigate('/adobe-vivo')}
                                    style={{ background: 'linear-gradient(90deg, #d97706, #f59e0b)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'EoIE7lVYWIw?start=1977' })); }}
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: RUINAS LAMBERT CON MARGARITA */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(251, 146, 60, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(234, 88, 12, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#ea580c', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(234, 88, 12, 0.2)', color: '#fb923c', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(234, 88, 12, 0.3)' }}>PATRIMONIO INDUSTRIAL</span>
                                    <Flame size={18} color="#fb923c" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Ruinas Lambert <br/><span style={{ color: '#fb923c' }}>con Margarita</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    El origen de la minería de cobre en Chile. Opera el horno de reverbero de 1840 y certifícate.
                                </p>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button 
                                    onClick={() => navigate('/ruinas-lambert')}
                                    style={{ background: 'linear-gradient(90deg, #ea580c, #f97316)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'EoIE7lVYWIw?start=54' })); }}
                                    style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                                >
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>
                        {/* TARJETA: PAULINA GODOY */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(4, 120, 87, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#10b981', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(16, 185, 129, 0.3)' }}>URBANISMO</span>
                                    <TreePine size={18} color="#6ee7b7" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Infraestructura Verde <br/><span style={{ color: '#6ee7b7' }}>con Paulina</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    Defensa costera y Plan Maestro. Transforma el Humedal El Culebrón y certifícate como Urbanista.
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={() => navigate('/paulina-godoy')} style={{ background: 'linear-gradient(90deg, #10b981, #059669)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'lgjba4j0Afo' })); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: ANDREA TORREJON */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#f59e0b', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fcd34d', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(245, 158, 11, 0.3)' }}>ENERGÍA</span>
                                    <Sun size={18} color="#fcd34d" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Paneles Solares <br/><span style={{ color: '#fcd34d' }}>con Andrea</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    Aprovecha el sol de Las Compañías. Ensambla tu sistema fotovoltaico y obtén tu diploma.
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={() => navigate('/andrea-torrejon')} style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <GraduationCap size={20} /> INGRESAR AL LABORATORIO
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'EoIE7lVYWIw' })); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: LORETO NARBONA */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(225, 29, 72, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(244, 63, 94, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#f43f5e', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#fda4af', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(244, 63, 94, 0.3)' }}>SALUD</span>
                                    <Apple size={18} color="#fda4af" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Plato Saludable <br/><span style={{ color: '#fda4af' }}>con Loreto</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    Nutrición de la Feria al Plato. Aprende las proporciones perfectas y certifícate.
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={() => navigate('/loreto-narbona')} style={{ background: 'linear-gradient(90deg, #f43f5e, #e11d48)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'EoIE7lVYWIw' })); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: DANIELA OLMOS */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(126, 34, 206, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(168, 85, 247, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#a855f7', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(168, 85, 247, 0.3)' }}>BIOCLIMÁTICA</span>
                                    <Home size={18} color="#d8b4fe" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Arquitectura Solar <br/><span style={{ color: '#d8b4fe' }}>con Daniela</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    Orientación Norte y aislamiento. Transforma tu hogar en un espacio eficiente y cálido.
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={() => navigate('/daniela-olmos')} style={{ background: 'linear-gradient(90deg, #a855f7, #9333ea)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <GraduationCap size={20} /> INGRESAR A LA ACADEMIA
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'EoIE7lVYWIw' })); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>

                        {/* TARJETA: MONICA SIERRA */}
                        <motion.div 
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(190, 24, 109, 0.1))',
                                borderRadius: '35px',
                                border: '1px solid rgba(236, 72, 153, 0.3)',
                                padding: '2.5rem',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: '#ec4899', filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <span style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#fbcfe8', padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', border: '1px solid rgba(236, 72, 153, 0.3)' }}>ARTE TEXTIL</span>
                                    <Palette size={18} color="#fbcfe8" />
                                </div>
                                <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'white', marginBottom: '1rem', lineHeight: '1.1' }}>
                                    Taller de Batik <br/><span style={{ color: '#fbcfe8' }}>con Mónica</span>
                                </h3>
                                <p style={{ color: '#94a3b8', lineHeight: '1.5', marginBottom: '2rem', fontSize: '1rem' }}>
                                    Magia en cera y seda. Aprende la técnica milenaria del teñido por reserva.
                                </p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button onClick={() => navigate('/monica-sierra')} style={{ background: 'linear-gradient(90deg, #ec4899, #db2777)', color: 'white', border: 'none', padding: '1rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <GraduationCap size={20} /> INGRESAR AL TALLER
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('open-vls-note', { detail: 'IPeBSr9Tuq4' })); }} style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}>
                                    <Video size={18} /> VER ENTREVISTA PREVIA
                                </button>
                            </div>
                        </motion.div>
                    </section>
                    <VLSNotesGallery initialFilter="EntreVecinas" hideFilters={true} />
                </div>
            </main>

            <HechoEnChile dark={true} />
            
            <EntrevecinasProposeModal 
                isOpen={isProposeOpen} 
                onClose={() => setIsProposeOpen(false)} 
            />

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(0.98); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
