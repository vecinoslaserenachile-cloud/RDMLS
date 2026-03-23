import React, { useState, useEffect, useRef } from 'react';
import { Tv, X as CloseIcon, Maximize2, Minimize2, RadioReceiver, CloudSun, ShieldAlert, Activity, Volume2, VolumeX, Move, Star, Mic2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CHANNELS = [
    { 
        id: 'PLg_9ltHJC-02auBvkAB4-RSs9EJZOH_B4', 
        title: 'TVLS CONTENIDOS 1', 
        desc: 'Producción original VLS - Bloque A.',
        icon: Tv,
        color: '#f43f5e',
        isPlaylist: true
    },
    { 
        id: 'PLg_9ltHJC-01E9YPJtqiGosY2Hd3XHHSl', 
        title: 'TVLS CONTENIDOS 2', 
        desc: 'Producción original VLS - Bloque B.',
        icon: Tv,
        color: '#c026d3',
        isPlaylist: true
    },
    { 
        id: 'PLg_9ltHJC-03q4F0yNQ3idDvPCqtwoRsy', 
        title: 'TVLS CONTENIDOS 3', 
        desc: 'Producción original VLS - Bloque C.',
        icon: Tv,
        color: '#7c3aed',
        isPlaylist: true
    },
    { 
        id: 'b9LTH4muxR8', 
        title: 'FARO LA SERENA LIVE', 
        desc: 'Transmisión en vivo desde el Faro Monumental.',
        icon: Tv,
        color: '#38bdf8'
    },
    { 
        id: 'jfKfPfyJRdk', 
        title: 'LOFI VIBES VLS', 
        desc: 'Música para el laboratorio de ideas.',
        icon: Star,
        color: '#a78bfa'
    },
    { 
        id: '2B3Pq2xP810', 
        title: 'MONITOREO PUERTO', 
        desc: 'Actividad portuaria en tiempo real.',
        icon: Tv,
        color: '#3b82f6'
    },
    { 
        id: 'uQ4G15nZ1z0', 
        title: 'AEROPUERTO LIVE', 
        desc: 'Tráfico aéreo y pistas.',
        icon: Activity,
        color: '#10b981'
    },
    {
        id: 'sJ82z5f2E_M', // generic placeholder for serenamet or weather if not specific live
        title: 'SERENAMET COMPLETO',
        desc: 'Radar y meteorología zonal.',
        icon: CloudSun,
        color: '#eab308'
    }
];

const SOVEREIGN_JEWELS = [
    { 
        id: 'l6hqXu-5-5w', 
        title: 'Dread Mar I - Sálvame', 
        desc: 'Frecuencia de libertad y redención soberana.',
        icon: Star
    },
    { 
        id: 'EazNLUhXXdA', 
        title: 'Calamaro & Freestyle', 
        desc: 'La magia de lo imprevisto y el talento real.',
        icon: Mic2
    }
];

export default function SmartTV({ weather }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentChannelIdx, setCurrentChannelIdx] = useState(0);
  const [overlayData, setOverlayData] = useState({ text: 'Iniciando transmisión...', icon: Activity, color: '#10b981' });
  const [isMuted, setIsMuted] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentChannel = CHANNELS[currentChannelIdx];

  // Efecto de estática al cambiar de canal
  useEffect(() => {
    setIsSwitching(true);
    const timer = setTimeout(() => setIsSwitching(false), 1200);
    return () => clearTimeout(timer);
  }, [currentChannelIdx]);

  // Ciclo automático de información
  useEffect(() => {
    const cycleInfo = () => {
      const timeMs = Date.now();
      const seconds = Math.floor(timeMs / 1000) % 30;
      
      if (seconds < 10) {
        if (weather) {
           setOverlayData({ text: `Clima Local: ${weather.temp}°C`, icon: CloudSun, color: '#fcd34d' });
        } else {
           setOverlayData({ text: 'Pronóstico: Soleado 18°C', icon: CloudSun, color: '#fcd34d' });
        }
      } else if (seconds < 20) {
        setOverlayData({ text: 'COMUNA SMART: Nueva era de Soberanía Regional.', icon: Award, color: '#fcd34d' });
      } else {
        setOverlayData({ text: 'vecinoslaserena.cl: Dirección Estratégica Activa.', icon: ShieldAlert, color: '#38bdf8' });
      }
    };

    const interval = setInterval(cycleInfo, 5000);
    cycleInfo();
    return () => clearInterval(interval);
  }, [weather]);

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        className="btn-glass hover-lift"
        style={{
          position: 'fixed', bottom: '80px', right: '25px', zIndex: 100000,
          borderRadius: '50%', padding: '12px', background: 'rgba(15, 23, 42, 0.9)',
          boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)', border: '2px solid #38bdf8'
        }}
        title="Abrir VLS TV"
      >
        <Tv size={24} color="#38bdf8" className="pulse-slow" />
      </button>
    );
  }

  return (
    <motion.div 
      drag={!isFullScreen}
      dragMomentum={false}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        ...(isFullScreen ? { bottom: 0, right: 0, left: 0, top: 0 } : {})
      }}
      className="animate-slide-up"
      style={{
        position: 'fixed',
        backgroundColor: '#0f172a',
        borderRadius: isFullScreen ? '0' : '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        border: isFullScreen ? 'none' : '4px solid #334155',
        zIndex: 200000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        resize: isExpanded && !isFullScreen && window.innerWidth >= 768 ? 'both' : 'none',
        minWidth: isFullScreen ? '100vw' : (isExpanded ? (window.innerWidth < 768 ? '260px' : '380px') : (window.innerWidth < 768 ? '100px' : '220px')),
        minHeight: isFullScreen ? '100vh' : (isExpanded ? (window.innerWidth < 768 ? '146px' : '214px') : (window.innerWidth < 768 ? '56px' : '124px')),
        width: 'auto',
        height: 'auto',
        maxWidth: '100vw',
        maxHeight: '100vh',
        ...(!isFullScreen ? {
          bottom: window.innerWidth < 768 ? '85px' : 'auto',
          right: window.innerWidth < 768 ? '15px' : 'auto',
          left: window.innerWidth < 768 ? 'auto' : '50px',
          top: window.innerWidth < 768 ? 'auto' : '100px'
        } : {})
      }}
    >
      {/* Header del Televisor - Drag Handle */}
      <div 
        style={{ 
            background: '#1e293b', padding: '6px 10px', display: 'flex', 
            justifyContent: 'space-between', alignItems: 'center', 
            borderBottom: '2px solid #000', cursor: 'grab' 
        }}
      >
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: 'bold', color: currentChannel.color }}>
            <currentChannel.icon size={12} />
            <span style={{ letterSpacing: '1px' }}>{currentChannel.title}</span>
         </div>
         <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Controles Recuperados */}
            <button onClick={() => setCurrentChannelIdx((prev) => (prev > 0 ? prev - 1 : CHANNELS.length - 1))} style={{ background: '#334155', border: '1px solid #475569', color: 'white', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>CH -</button>
            <button onClick={() => setCurrentChannelIdx((prev) => (prev + 1) % CHANNELS.length)} style={{ background: '#334155', border: '1px solid #475569', color: 'white', cursor: 'pointer', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>CH +</button>
            <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'transparent', border: 'none', color: isMuted ? '#ef4444' : '#10b981', cursor: 'pointer', padding: '0 4px' }}>
               {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <div style={{ width: '1px', height: '14px', background: '#334155', margin: '0 4px' }}></div>
            
            <button onClick={() => { setIsFullScreen(!isFullScreen); setIsExpanded(true); }} style={{ background: 'transparent', border: 'none', color: '#facc15', cursor: 'pointer', padding: 0 }}>
               <Maximize2 size={14} />
            </button>
            <button onClick={() => { setIsExpanded(!isExpanded); setIsFullScreen(false); }} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
               {isExpanded ? <Minimize2 size={14} /> : <Tv size={14} />}
            </button>
            <button onClick={() => { setIsVisible(false); setIsFullScreen(false); }} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0 }}>
               <CloseIcon size={14} />
            </button>
         </div>
      </div>

      {/* Pantalla (Contenido YouTube + Overlays) */}
      <div style={{ flex: 1, position: 'relative', background: '#000', pointerEvents: 'none' }}>
        {/* Video Background - Refined URL to hide logos/controls as much as possible */}
        <iframe 
          key={currentChannel.id}
          width="100%" 
          height="100%" 
          src={currentChannel.isPlaylist 
            ? `https://www.youtube.com/embed/videoseries?list=${currentChannel.id}&autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&iv_load_policy=3&rel=0&showinfo=0&disablekb=1`
            : `https://www.youtube.com/embed/${currentChannel.id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${currentChannel.id}&modestbranding=1&iv_load_policy=3&rel=0&showinfo=0&disablekb=1`
          }
          title={currentChannel.title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          style={{ position: 'absolute', inset: 0, opacity: 0.9, pointerEvents: 'none' }}
        ></iframe>

        {/* Estática de cambio de canal */}
        <AnimatePresence>
            {isSwitching && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    style={{ 
                        position: 'absolute', inset: 0, 
                        background: 'url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif) center/cover',
                        zIndex: 20, pointerEvents: 'none'
                    }}
                />
            )}
        </AnimatePresence>

        {/* Scanlines CRT */}
        <div style={{ 
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))',
          backgroundSize: '100% 4px, 6px 100%',
          zIndex: 21
        }}></div>

        <div style={{ pointerEvents: "auto" }}></div>

        {/* Tickers */}
        <div style={{
          position: 'absolute', bottom: '0', left: '0', right: '0',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          padding: '20px 10px 10px 10px', display: 'flex', flexDirection: 'column',
          gap: '4px', pointerEvents: 'none'
        }}>
          <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15,23,42,0.85)', padding: '4px 10px', borderRadius: '4px', borderLeft: `4px solid ${overlayData.color}`, alignSelf: 'flex-start' }}>
            <overlayData.icon size={12} color={overlayData.color} />
            <span style={{ color: 'white', fontSize: isExpanded ? '0.8rem' : '0.7rem', fontWeight: 'bold' }}>{overlayData.text}</span>
          </div>
          {isExpanded && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', background: 'rgba(56, 189, 248, 0.85)', padding: '3px 0', fontSize: '0.65rem', color: '#0f172a', fontWeight: 'bold', borderRadius: '4px' }}>
              <div style={{ display: 'inline-block', animation: 'scroll-left 25s linear infinite', paddingLeft: '100%' }}>
                 🚨 COMUNA SMART VLS: INICIO DE TRANSMISIÓN OFICIAL — SOBERANÍA COMUNAL 2026 — DIRIGIDO POR vecinoslaserena.cl — REVOLUCIÓN URBANA 🚨
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
      `}</style>
    </motion.div>
  );
}
