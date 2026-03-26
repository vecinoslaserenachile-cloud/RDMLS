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
    const [muted, setMuted] = useState(true);

    if (hidden || !item) return null;

    const isMobile = window.innerWidth < 768;
    const currentWidth = minimized ? '180px' : (isMobile ? widthMobile : widthDesktop);
    const currentHeight = minimized ? '40px' : (isMobile ? heightMobile : heightDesktop);

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
                right: initialX !== undefined ? initialX : '25px',
                width: currentWidth,
                height: currentHeight,
                zIndex: 100000,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: minimized ? '0 10px 20px rgba(0,0,0,0.8)' : '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.2)',
                border: minimized ? '1px solid rgba(255,255,255,0.2)' : '2px solid rgba(16, 185, 129, 0.4)',
                background: '#000',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ background: '#222', display: 'flex', justifyContent: 'space-between', padding: '6px 12px', alignItems: 'center', cursor: 'grab', userSelect: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}>
                    <div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                    <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{title}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button onTouchStart={(e) => { e.stopPropagation(); setMuted(!muted); }} onClick={(e) => { e.stopPropagation(); setMuted(!muted); }} style={{background:'transparent', border:0, padding:0, cursor:'pointer'}}>
                        {muted ? <VolumeX size={14} color="#ef4444" /> : <Volume2 size={14} color="#10b981" />}
                    </button>
                    <button onTouchStart={(e) => { e.stopPropagation(); setMinimized(!minimized); }} onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }} style={{background:'transparent', border:0, padding:0, cursor:'pointer'}}>
                        {minimized ? <Maximize size={14} color="#aaa" /> : <Minus size={14} color="#aaa" />}
                    </button>
                    <button onTouchStart={(e) => { e.stopPropagation(); setHidden(true); }} onClick={(e) => { e.stopPropagation(); setHidden(true); }} style={{background:'transparent', border:0, padding:0, cursor:'pointer'}}>
                        <X size={14} color="#ef4444" />
                    </button>
                </div>
            </div>
            
            {!minimized && (
                <div style={{ flex: 1, position: 'relative', background: '#000', overflow: 'hidden' }}>
                    {/* Overlay transparente para drag sin conflicto con iframe */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }} />
                    
                    {item.src || item.url ? (
                        item.url && item.url.includes('.mp4') ? (
                            <video
                                src={item.url}
                                autoPlay
                                muted={muted}
                                loop
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
                                style={{ objectFit: 'cover', transform: isVertical ? 'scale(1.05)' : 'none', background: '#fff' }}
                            />
                        )
                    ) : null}

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

