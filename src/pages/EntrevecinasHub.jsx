import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import VLSNotesGallery from '../components/VLSNotesGallery';
import HechoEnChile from '../components/HechoEnChile';
import { Home, Heart, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Radio as RadioIcon, Info, ChevronRight, Sparkles } from 'lucide-react';
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
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
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
                        event.target.playVideo();
                        event.target.setVolume(volume);
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

        return () => {
            if (playerRef.current) {
                try { playerRef.current.destroy(); } catch(e) {}
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
