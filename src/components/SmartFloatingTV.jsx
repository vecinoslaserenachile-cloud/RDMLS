import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Maximize, VolumeX, Volume2 } from 'lucide-react';

export default function SmartFloatingTV({
    title,
    isVertical,
    initialX,
    initialY,
    bottom,
    widthDesktop,
    widthMobile,
    heightDesktop,
    heightMobile,
    item,
    onEnded
}) {
    const [hidden, setHidden] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [muted, setMuted] = useState(true);

    if (hidden || !item) return null;

    const isMobile = window.innerWidth < 768;
    
    // Dimensiones dinámicas basadas en estado
    let currentWidth = isMobile ? widthMobile : widthDesktop;
    let currentHeight = isMobile ? heightMobile : heightDesktop;

    if (minimized) {
        currentWidth = isMobile ? '110px' : '180px';
        currentHeight = isMobile ? '32px' : '40px';
    } else if (isExpanded) {
        currentWidth = isMobile ? '90vw' : '640px';
        currentHeight = isMobile ? '50vh' : '360px';
    }

    const getBottom = () => {
        if (bottom !== undefined) return bottom;
        if (initialY === undefined) return '100px';
        return 'auto';
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                position: 'fixed',
                top: initialY !== undefined ? initialY : 'auto',
                bottom: getBottom(),
                right: isExpanded && !isMobile ? 'auto' : (initialX !== undefined ? initialX : '25px'),
                left: isExpanded && !isMobile ? '50%' : 'auto',
                x: isExpanded && !isMobile ? '-50%' : 0,
                width: currentWidth,
                height: currentHeight,
                zIndex: isExpanded ? 1000000 : 100000,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: minimized ? '0 10px 20px rgba(0,0,0,0.8)' : (isExpanded ? '0 30px 100px rgba(0,0,0,0.9), 0 0 40px rgba(16, 185, 129, 0.4)' : '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.2)'),
                border: minimized ? '1px solid rgba(255,255,255,0.2)' : (isExpanded ? '3px solid #10b981' : '2px solid rgba(16, 185, 129, 0.4)'),
                background: '#000',
                display: 'flex',
                transition: 'width 0.3s ease, height 0.3s ease, border 0.3s ease',
                flexDirection: 'column'
            }}
        >
            <div style={{ 
                background: 'linear-gradient(90deg, #1a1a1a, #333)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '8px 12px', 
                alignItems: 'center', 
                cursor: 'grab', 
                userSelect: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                    <div className="blink" style={{ width: '8px', height: '8px', background: isExpanded ? '#10b981' : '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                    <span style={{ fontSize: '11px', color: 'white', fontWeight: '900', whiteSpace: 'nowrap', textOverflow: 'ellipsis', letterSpacing: '0.5px' }}>{title}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button onTouchStart={(e) => { e.stopPropagation(); setMuted(!muted); }} onClick={(e) => { e.stopPropagation(); setMuted(!muted); }} title={muted ? "Activar Audio" : "Silenciar"} style={{background:'transparent', border:0, padding:0, cursor:'pointer', display: 'flex', alignItems: 'center'}}>
                        {muted ? <VolumeX size={15} color="#ef4444" /> : <Volume2 size={15} color="#10b981" />}
                    </button>
                    {!minimized && (
                        <button onTouchStart={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} title="Expandir" style={{background:'transparent', border:0, padding:0, cursor:'pointer', display: 'flex', alignItems: 'center'}}>
                            {isExpanded ? <Minimize size={15} color="#38bdf8" /> : <Maximize size={15} color="#38bdf8" />}
                        </button>
                    )}
                    <button onTouchStart={(e) => { e.stopPropagation(); setMinimized(!minimized); setIsExpanded(false); }} onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); setIsExpanded(false); }} title="Minimizar" style={{background:'transparent', border:0, padding:0, cursor:'pointer', display: 'flex', alignItems: 'center'}}>
                        {minimized ? <Maximize size={15} color="#fbbf24" /> : <Minus size={15} color="#fbbf24" />}
                    </button>
                    <button onTouchStart={(e) => { e.stopPropagation(); setHidden(true); }} onClick={(e) => { e.stopPropagation(); setHidden(true); }} title="Cerrar" style={{background:'transparent', border:0, padding:0, cursor:'pointer', display: 'flex', alignItems: 'center'}}>
                        <X size={16} color="#ef4444" strokeWidth={3} />
                    </button>
                </div>
            </div>
            
            {!minimized && (
                <div style={{ flex: 1, position: 'relative', background: '#000', overflow: 'hidden' }}>
                    {/* Overlay transparente para drag sin conflicto con iframe */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }} />
                    
                    {item.src || item.url ? (
                        item.isPoster ? (
                            <img 
                                src={item.url} 
                                alt={item.title} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) contrast(1.1)' }} 
                            />
                        ) : (
                            item.url && item.url.includes('.mp4') ? (
                                <video
                                    src={item.url}
                                    autoPlay
                                    muted={muted}
                                    loop={!onEnded}
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onEnded={onEnded}
                                />
                            ) : (
                                <iframe
                                    width="100%" height="100%"
                                    src={item.isPlaylist 
                                        ? `https://www.youtube.com/embed/videoseries?list=${item.id}&autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1`
                                        : (item.id 
                                            ? `https://www.youtube.com/embed/${item.id}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${item.id}`
                                            : item.url)}
                                    title={title}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media; fullscreen"
                                    style={{ objectFit: 'cover', transform: isVertical ? 'scale(1.05)' : 'none', background: '#000' }}
                                />
                            )
                        )
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
                            <div className="spin" style={{ width: '20px', height: '20px', border: '2px solid #38bdf8', borderTopColor: 'transparent', borderRadius: '50%' }} />
                        </div>
                    )}

                    {item.title && (
                       <div style={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)', zIndex: 10, width: '90%' }}>
                           <span style={{ display: 'block', color: 'white', fontSize: '9px', fontWeight: 'bold', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '10px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                               {item.title}
                           </span>
                       </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}

