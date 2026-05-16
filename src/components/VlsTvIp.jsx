import React, { useState, useRef, useEffect } from 'react';
import { 
    X, Tv, Volume2, VolumeX, Maximize2, Minimize2, 
    Zap, Activity, Radio, Globe, Shield, 
    Monitor, Search, ChevronRight, Play, Pause,
    Cast, Settings, List, Info, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = [
    { 
        id: 1, 
        name: '24 Horas (TVN)', 
        category: 'NACIONAL', 
        provider: 'YOUTUBE', 
        stream: 'UCTXNz3gjAypWp3EhlIATEJQ', 
        logo: 'https://logo.clearbit.com/tvn.cl', 
        desc: 'Canal de noticias 24/7 de Televisión Nacional de Chile.' 
    },
    { 
        id: 2, 
        name: 'T13 En Vivo', 
        category: 'NACIONAL', 
        provider: 'YOUTUBE', 
        stream: 'UCsRnhjcUCR78Q3Ud6OXCTNg', 
        logo: 'https://logo.clearbit.com/13.cl', 
        desc: 'Departamento de Prensa de Canal 13 - Noticias en vivo.' 
    },
    { 
        id: 3, 
        name: 'CNN Chile', 
        category: 'NOTICIAS', 
        provider: 'YOUTUBE', 
        stream: 'UCpOAcjJNAp0Y0fhznRrXIJQ', 
        logo: 'https://logo.clearbit.com/cnn.com', 
        desc: 'Señal de noticias internacional y nacional.' 
    },
    { 
        id: 11, 
        name: 'PARTIDO: CD La Serena vs U de Chile', 
        category: 'DEPORTES', 
        provider: 'YOUTUBE', 
        stream: 'UCczkrFICr0xEgDsk51zZojA', 
        logo: '/escudo.png', 
        desc: 'Relatos y comentarios en vivo mediante Radio ADN.' 
    },
    { 
        id: 12, 
        name: 'Radio ADN (Deportes)', 
        category: 'DEPORTES', 
        provider: 'YOUTUBE', 
        stream: 'UCczkrFICr0xEgDsk51zZojA', 
        logo: 'https://logo.clearbit.com/adnradio.cl', 
        desc: 'ADN Radio Chile - Transmisión oficial de fútbol.' 
    },
    { 
        id: 4, 
        name: 'CHV Noticias', 
        category: 'NOTICIAS', 
        provider: 'YOUTUBE', 
        stream: 'UCfX0X-V-wUE', 
        logo: 'https://logo.clearbit.com/chv.cl', 
        desc: 'Chilevisión Noticias - Señal 24 Horas.' 
    },
    { 
        id: 8, 
        name: 'TV Pequén (Regional)', 
        category: 'REGIONAL', 
        provider: 'IPTV', 
        stream: 'https://telealerta.cl/hls/tvpequen.m3u8', 
        logo: '/escudo.png', 
        desc: 'Canal Regional de La Serena y Coquimbo.' 
    },
    { 
        id: 9, 
        name: 'NASA TV (Oficial)', 
        category: 'CIENCIA', 
        provider: 'YOUTUBE', 
        stream: 'zPH5KtjJFaQ', 
        logo: 'https://logo.clearbit.com/nasa.gov', 
        desc: 'Misión Artemisa y Exploración Espacial de la NASA.' 
    },
    { 
        id: 10, 
        name: 'RDMLS Radio', 
        category: 'INSTITUCIONAL', 
        provider: 'YOUTUBE', 
        stream: 'M7lc1UVf-VE', 
        logo: '/escudo.png', 
        desc: 'Red Digital La Serena - Señal Visual.' 
    }
];

export default function VlsTvIp({ onClose }) {
    const [currentChannel, setCurrentChannel] = useState(CHANNELS[0]);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTuning, setIsTuning] = useState(false);
    const [volume, setVolume] = useState(80);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('TODOS');
    
    const playerRef = useRef(null);
    const containerRef = useRef(null);

    const categories = ['TODOS', ...new Set(CHANNELS.map(ch => ch.category))];

    const filteredChannels = CHANNELS.filter(ch => {
        const matchesSearch = ch.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === 'TODOS' || ch.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    const handleChannelChange = (channel) => {
        if (channel.id === currentChannel.id) return;
        setIsTuning(true);
        setCurrentChannel(channel);
        setTimeout(() => setIsTuning(false), 1200);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsFullscreen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000000,
                background: 'rgba(5, 10, 20, 0.92)',
                backdropFilter: 'blur(15px)',
                display: 'flex',
                flexDirection: 'column',
                color: 'white',
                fontFamily: '"Outfit", sans-serif',
                overflow: 'hidden'
            }}
        >
            {/* Header Superior */}
            <div style={{ 
                padding: '1.2rem 2rem', 
                background: 'rgba(15, 23, 42, 0.8)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #38bdf8, #1e3a8a)', 
                        padding: '0.8rem', 
                        borderRadius: '12px',
                        boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
                    }}>
                        <Tv size={24} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            TV IP <span style={{ color: '#38bdf8' }}>VLS</span>
                        </h2>
                        <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '3px', opacity: 0.8 }}>
                            SISTEMA DE SOBERANÍA TELEVISIVA v3.5
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.4)', padding: '8px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                        <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#10b981' }}>SEÑAL ESTABLE</span>
                    </div>
                    <button 
                        onClick={onClose}
                        style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.background = '#ef4444' + '40'}
                        onMouseOut={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Layout Principal */}
            <div style={{ flex: 1, display: 'flex', padding: '1.5rem', gap: '1.5rem', overflow: 'hidden' }}>
                
                {/* Lateral Izquierda: Lista de Canales */}
                <div style={{ 
                    width: '350px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '24px',
                    padding: '1.2rem',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {/* Buscador */}
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar canal..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', 
                                background: 'rgba(0,0,0,0.3)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                borderRadius: '12px', 
                                padding: '12px 15px 12px 45px', 
                                color: 'white',
                                outline: 'none'
                            }} 
                        />
                    </div>

                    {/* Categorías */}
                    <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }} className="no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    whiteSpace: 'nowrap',
                                    background: selectedCategory === cat ? '#38bdf8' : 'rgba(255,255,255,0.05)',
                                    color: selectedCategory === cat ? '#000' : '#fff',
                                    border: 'none',
                                    padding: '6px 15px',
                                    borderRadius: '50px',
                                    fontSize: '0.75rem',
                                    fontWeight: '900',
                                    cursor: 'pointer',
                                    transition: '0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Lista Scrollable */}
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }} className="vls-scrollbar">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filteredChannels.map(ch => (
                                <button
                                    key={ch.id}
                                    onClick={() => handleChannelChange(ch)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        background: currentChannel.id === ch.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                                        border: `1px solid ${currentChannel.id === ch.id ? '#38bdf8' : 'rgba(255,255,255,0.05)'}`,
                                        padding: '12px',
                                        borderRadius: '16px',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        transition: '0.2s',
                                        width: '100%'
                                    }}
                                >
                                    <div style={{ 
                                        width: '45px', height: '45px', 
                                        background: '#fff', borderRadius: '10px', 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        overflow: 'hidden', flexShrink: 0
                                    }}>
                                        <img src={ch.logo} alt={ch.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '900', color: currentChannel.id === ch.id ? '#38bdf8' : '#fff' }}>{ch.name}</div>
                                        <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{ch.category}</div>
                                    </div>
                                    {currentChannel.id === ch.id && (
                                        <div style={{ width: '6px', height: '6px', background: '#38bdf8', borderRadius: '50%', boxShadow: '0 0 10px #38bdf8' }}></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Área Central: Player */}
                <div ref={containerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                    
                    {/* El Visualizador */}
                    <div style={{ 
                        flex: 1, 
                        background: '#000', 
                        borderRadius: '30px', 
                        overflow: 'hidden', 
                        position: 'relative',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <AnimatePresence mode="wait">
                            {isTuning ? (
                                <motion.div 
                                    key="tuning"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ 
                                        position: 'absolute', inset: 0, 
                                        zIndex: 10, 
                                        background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover', 
                                        opacity: 0.6,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                >
                                    <div style={{ 
                                        background: 'rgba(0,0,0,0.8)', 
                                        padding: '20px 40px', 
                                        borderRadius: '20px', 
                                        border: '1px solid #38bdf8',
                                        color: '#38bdf8',
                                        fontSize: '1.2rem',
                                        fontWeight: '900',
                                        letterSpacing: '5px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Optimizando Señal VLS...
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>

                        {currentChannel.provider === 'YOUTUBE' ? (
                            <iframe 
                                key={currentChannel.id}
                                src={currentChannel.stream.startsWith('UC') 
                                    ? `https://www.youtube.com/embed/live_stream?channel=${currentChannel.stream}&autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0`
                                    : `https://www.youtube.com/embed/${currentChannel.stream}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0`
                                }
                                frameBorder="0" 
                                allow="autoplay; encrypted-media; picture-in-picture" 
                                allowFullScreen
                                style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050a14' }}>
                                <video 
                                    src={currentChannel.stream}
                                    autoPlay loop muted={isMuted} playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                                <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                                    <Globe size={12} color="#38bdf8" /> DIRECT_STREAM (m3u8)
                                </div>
                            </div>
                        )}

                        {/* Overlays decorativos */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%)', backgroundSize: '100% 2px', zIndex: 5 }} />
                        
                        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, display: 'flex', gap: '10px' }}>
                            <div style={{ background: 'rgba(0,0,0,0.6)', padding: '5px 15px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '900', color: '#38bdf8', borderRight: '3px solid #38bdf8' }}>
                                CH-{(currentChannel.id < 10 ? '0' : '') + currentChannel.id}
                            </div>
                        </div>

                        {/* OSD Inferior en Fullscreen */}
                        {isFullscreen && (
                            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, display: 'flex', gap: '2rem', background: 'rgba(0,0,0,0.8)', padding: '10px 30px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                                <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>{isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}</button>
                                <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Minimize2 size={24} /></button>
                            </div>
                        )}
                    </div>

                    {/* Barra de Info Inferior */}
                    <div style={{ 
                        background: 'rgba(15, 23, 42, 0.6)', 
                        borderRadius: '24px', 
                        padding: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}>
                        <div style={{ 
                            width: '80px', height: '80px', 
                            background: '#fff', borderRadius: '20px', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                        }}>
                            <img src={currentChannel.logo} alt={currentChannel.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>{currentChannel.name}</div>
                            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: '4px' }}>{currentChannel.desc}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={toggleFullscreen}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '15px', borderRadius: '15px', cursor: 'pointer' }}
                            >
                                <Maximize2 size={20} />
                            </button>
                            <button 
                                onClick={() => setIsMuted(!isMuted)}
                                style={{ 
                                    background: isMuted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(56, 189, 248, 0.15)', 
                                    border: `1px solid ${isMuted ? '#ef4444' : '#38bdf8'}`, 
                                    color: isMuted ? '#ef4444' : '#38bdf8', 
                                    padding: '15px', borderRadius: '15px', cursor: 'pointer' 
                                }}
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Status Bar */}
            <div style={{ 
                padding: '0.6rem 2rem', 
                background: 'rgba(0,0,0,0.5)', 
                fontSize: '0.7rem', 
                color: 'rgba(255,255,255,0.4)', 
                display: 'flex', 
                justifyContent: 'space-between',
                fontWeight: '900',
                letterSpacing: '1px'
            }}>
                <div>CENTINEL TV CLOUD - LA SERENA, CHILE</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span>CPU: 12%</span>
                    <span>NET: 840 MBPS</span>
                    <span>SOCIOS VLS: 12.442 ONLINE</span>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                .vls-scrollbar::-webkit-scrollbar { width: 4px; }
                .vls-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
                .vls-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.3); borderRadius: 10px; }
                
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </motion.div>
    );
}
