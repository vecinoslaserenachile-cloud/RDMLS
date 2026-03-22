import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Play, Info, Share2, Volume2, Maximize2, Heart } from 'lucide-react';

/**
 * SmartVerticalReel
 * A high-end, touch-optimized vertical module switcher.
 * Uses CSS Scroll Snap for native-feeling vertical swiping.
 */
export default function SmartVerticalReel({ 
    items = [], 
    onClose, 
    title = "SMART REEL VLS", 
    accentColor = "#38bdf8" 
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    const scrollTo = (index) => {
        if (!containerRef.current) return;
        containerRef.current.scrollTo({
            top: index * containerRef.current.clientHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 200000, 
            background: '#000', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Minimal Header Overlaid */}
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                padding: '1.5rem', 
                zIndex: 100, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: accentColor, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px ${accentColor}40` }}>
                        <Play size={20} color="white" fill="white" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, color: 'white', fontSize: '1rem', fontWeight: '900', letterSpacing: '1px' }}>{title}</h3>
                        <div style={{ fontSize: '0.7rem', color: accentColor, fontWeight: 'bold' }}>MÓDULO {activeIndex + 1} / {items.length}</div>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                    <X size={24} />
                </button>
            </div>

            {/* Vertical Snap Container */}
            <div 
                ref={containerRef}
                onScroll={handleScroll}
                style={{ 
                    flex: 1, 
                    overflowY: 'scroll', 
                    scrollSnapType: 'y mandatory', 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
            >
                <style>{`
                    div::-webkit-scrollbar { display: none; }
                `}</style>
                
                {items.map((item, idx) => (
                    <div 
                        key={idx}
                        style={{ 
                            height: '100dvh', 
                            width: '100%', 
                            scrollSnapAlign: 'start', 
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: item.bg || '#0f172a'
                        }}
                    >
                        {/* Background Media (Image or Video Placeholder) */}
                        {item.image && (
                            <img src={item.image} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} alt="" />
                        )}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 80%)', zIndex: 1 }}></div>

                        {/* Content */}
                        <div className="animate-slide-up" style={{ position: 'relative', zIndex: 2, padding: '2rem', textAlign: 'center', color: 'white', maxWidth: '500px' }}>
                            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: `${accentColor}20`, borderRadius: '50px', border: `1px solid ${accentColor}`, color: accentColor, fontSize: '0.7rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                {item.tag || 'Contenido Premium'}
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem', lineHeight: '1', textShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>{item.title}</h2>
                            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '2.5rem' }}>{item.desc}</p>
                            
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <button className="btn btn-primary" style={{ background: accentColor, color: 'black', padding: '1.2rem 2.5rem', borderRadius: '50px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                                            {item.actionText || 'EXPLORAR AHORA'}
                                        </button>
                                    </a>
                                ) : (
                                    <button className="btn btn-primary" style={{ background: accentColor, color: 'black', padding: '1.2rem 2.5rem', borderRadius: '50px', fontWeight: 'bold' }}>
                                        {item.actionText || 'EXPLORAR AHORA'}
                                    </button>
                                )}
                                <button className="btn-glass" style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Interactive Icons Sidebar */}
                        <div style={{ position: 'absolute', right: '1.5rem', bottom: '15dvh', zIndex: 3, display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                                    <Heart size={24} />
                                </button>
                                <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 'bold' }}>2.4k</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
                                    <Info size={24} />
                                </button>
                                <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 'bold' }}>Guía</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows for fallback */}
            <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.6, pointerEvents: 'none' }}>
                <ChevronUp className="animate-bounce" size={20} color="white" />
                <span style={{ fontSize: '0.6rem', color: 'white', fontWeight: 'bold', letterSpacing: '2px' }}>DESLIZA VERTICAL</span>
            </div>
        </div>
    );
}
