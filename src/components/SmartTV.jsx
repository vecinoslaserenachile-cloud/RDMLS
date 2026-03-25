import React, { useState, useEffect, useRef } from 'react';
import { Tv, X as CloseIcon, Maximize2, Minimize2, Activity, Volume2, VolumeX, Move, Star, Mic2, Award, CloudSun, ShieldAlert, Square, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = [
    { 
        url: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_playa_con_gato_Juanin.mp4', 
        title: 'SERENITO CLIPS', 
        desc: 'Contenido Vertical Optimizado VLS.',
        icon: Tv,
        color: '#f43f5e'
    },
    { 
        url: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/Serenito_paseo_Avenida_del_Mar_La_Serena.mp4', 
        title: 'VECINO TV', 
        desc: 'Ojo en la Ciudad.',
        icon: Tv,
        color: '#38bdf8'
    },
    { 
        id: 'PLg_9ltHJC-02auBvkAB4-RSs9EJZOH_B4', 
        title: 'PLAYLIST VLS 1', 
        desc: 'Soberanía Digital Block A.',
        icon: Tv,
        color: '#f43f5e',
        isPlaylist: true
    },
    { 
        id: 'uQ4G15nZ1z0', 
        title: 'AEROPUERTO LIVE', 
        desc: 'Tráfico aéreo La Serena.',
        icon: Activity,
        color: '#10b981'
    }
];

export default function SmartTV({ weather }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentChannelIdx, setCurrentChannelIdx] = useState(0);
  const [overlayData, setOverlayData] = useState({ text: 'Soberanía Digital VLS', icon: Activity, color: '#10b981' });
  const [isMuted, setIsMuted] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  
  // Posición inicial: Superior Izquierda
  const [position, setPosition] = useState({ x: 20, y: 80 });
  const [size, setSize] = useState({ width: 220, height: 391 }); // ~9:16 aspect ratio

  const currentChannel = CHANNELS[currentChannelIdx];
  const containerRef = useRef(null);

  useEffect(() => {
    setIsSwitching(true);
    const timer = setTimeout(() => setIsSwitching(false), 800);
    return () => clearTimeout(timer);
  }, [currentChannelIdx]);

  useEffect(() => {
    const cycleTimer = setInterval(() => {
        setCurrentChannelIdx((prev) => (prev + 1) % CHANNELS.length);
    }, 20000); 
    return () => clearInterval(cycleTimer);
  }, []);

  useEffect(() => {
    const cycleInfo = () => {
      const seconds = Math.floor(Date.now() / 5000) % 3;
      if (seconds === 0) setOverlayData({ text: weather ? `VLS CLIMA: ${weather.temp}°C` : 'VLS HUB 2026', icon: CloudSun, color: '#fcd34d' });
      else if (seconds === 1) setOverlayData({ text: 'SOCIOS_VLS: Liderando el Cambio', icon: Award, color: '#10b981' });
      else setOverlayData({ text: 'SENTINEL_ACTIVO: Blindaje IA', icon: ShieldAlert, color: '#38bdf8' });
    };
    const interval = setInterval(cycleInfo, 5000);
    cycleInfo();
    return () => clearInterval(interval);
  }, [weather]);

  if (!isVisible) {
    return (
      <motion.button 
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => setIsVisible(true)}
        className="glass-panel"
        style={{
          position: 'fixed', top: '100px', left: '25px', zIndex: 200000,
          borderRadius: '12px', padding: '10px', background: 'rgba(5, 10, 20, 0.8)',
          border: '2px solid #38bdf8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
        }}
      >
        <Tv size={20} color="#38bdf8" />
        <span style={{ color: 'white', fontSize: '0.6rem', fontWeight: '950' }}>VLS_TV</span>
      </motion.button>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      drag={!isFullScreen}
      dragMomentum={false}
      initial={{ opacity: 0, x: position.x, y: position.y }}
      animate={{ opacity: 1, x: position.x, y: position.y }}
      onDragEnd={(e, info) => setPosition({ x: info.point.x, y: info.point.y })}
      className="vls-smart-tv-visor"
      style={{
        position: 'fixed',
        left: 0, top: 0, // motion x/y handles the rest
        width: isFullScreen ? '100vw' : size.width,
        height: isFullScreen ? '100vh' : size.height,
        backgroundColor: '#000',
        borderRadius: isFullScreen ? '0' : '20px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 30px rgba(56, 189, 248, 0.2)',
        border: isFullScreen ? 'none' : '3px solid rgba(255,255,255,0.15)',
        zIndex: 200000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        resize: 'both', // Resizable
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}
    >
      {/* Header Interactivo (Barra de Control Superior) */}
      <div 
        style={{ 
            background: 'linear-gradient(90deg, #1e293b, #0f172a)', 
            padding: '8px 12px', display: 'flex', 
            justifyContent: 'space-between', alignItems: 'center', 
            borderBottom: '1.5px solid rgba(255,255,255,0.1)', cursor: 'grab' 
        }}
      >
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem', fontWeight: '950', color: currentChannel.color }}>
            <Activity size={10} className="animate-pulse" />
            <span style={{ letterSpacing: '2px', textShadow: '0 0 5px rgba(255,255,255,0.3)' }}>VLS_VISOR_LIVE</span>
         </div>
         <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsFullScreen(!isFullScreen)} style={{ background: 'none', border: 'none', color: '#38bdf8', padding: 0 }}><Maximize2 size={13} /></button>
            <button onClick={() => setIsVisible(false)} style={{ background: 'none', border: 'none', color: '#ef4444', padding: 0 }}><CloseIcon size={14} /></button>
         </div>
      </div>

      {/* Screen Area (9:16 optimized) */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#000' }}>
         <AnimatePresence mode="wait">
            {!isSwitching && (
                <motion.div 
                    key={currentChannelIdx}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', inset: 0 }}
                >
                    {currentChannel.url ? (
                        <video 
                            src={currentChannel.url}
                            autoPlay loop muted={isMuted} playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <iframe 
                            width="100%" height="100%" 
                            src={`https://www.youtube.com/embed/${currentChannel.id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
                            frameBorder="0" allow="autoplay"
                            style={{ width: '100%', height: '103%', marginTop: '-1%', pointerEvents: 'none' }}
                        />
                    )}
                </motion.div>
            )}
         </AnimatePresence>

         {/* Estática / Conmutación */}
         {isSwitching && (
            <div style={{ position: 'absolute', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
               <div className="animate-pulse" style={{ color: '#38bdf8', fontSize: '0.6rem', fontWeight: '950', letterSpacing: '4px' }}>TUNING VLS...</div>
            </div>
         )}

         {/* Scanlines Effect */}
         <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 2px' }} />

         {/* Mute Overlay */}
         {isMuted && (
            <button 
                onClick={() => setIsMuted(false)}
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 20, background: 'rgba(56,189,248,0.9)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '50px', fontWeight: '900', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 0 20px rgba(56,189,248,0.5)' }}
            >
               <VolumeX size={14} /> ACTIVAR SONIDO VLS
            </button>
         )}

         {/* Info Overlay (Ticker) */}
         <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px 10px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 15, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '5px 10px', borderRadius: '4px', borderLeft: `3px solid ${overlayData.color}`, width: 'fit-content', maxWidth: '100%' }}>
               <overlayData.icon size={12} color={overlayData.color} />
               <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{overlayData.text}</span>
            </div>
         </div>
      </div>

      {/* Resize Handle Placeholder (El propio resize:both genera el tirador, pero podemos hacerlo más obvio) */}
      <div style={{ position: 'absolute', bottom: 2, right: 2, pointerEvents: 'none', borderRight: '2px solid rgba(56,189,248,0.5)', borderBottom: '2px solid rgba(56,189,248,0.5)', width: '10px', height: '10px' }} />
      
      <style>{`
        .vls-smart-tv-visor {
          transition: border-color 0.3s ease;
        }
        .vls-smart-tv-visor:hover {
          border-color: rgba(56, 189, 248, 0.4) !important;
        }
      `}</style>
    </motion.div>
  );
}
