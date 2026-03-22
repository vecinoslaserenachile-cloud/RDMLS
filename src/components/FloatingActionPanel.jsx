import React, { useState, useEffect } from 'react';
import { Share2, X, ChevronRight, ChevronLeft, Play, Info, Sparkles, Phone } from 'lucide-react';

export default function FloatingActionPanel() {
    const [isVisible, setIsVisible] = useState(false);
    const [minimized, setMinimized] = useState(false);
    
    useEffect(() => {
        const handleOpen = () => setIsVisible(true);
        const handleCloseAll = () => setIsVisible(false);
        
        window.addEventListener('open-smart-share-hub', handleOpen);
        window.addEventListener('close-all-floating', handleCloseAll);
        
        return () => {
            window.removeEventListener('open-smart-share-hub', handleOpen);
            window.removeEventListener('close-all-floating', handleCloseAll);
        };
    }, []);

    const handleShareClick = () => {
        window.dispatchEvent(new CustomEvent('open-smart-share'));
    };

    const handleEmergencyClick = () => {
        window.dispatchEvent(new CustomEvent('open-emergency-directory'));
    };

    if (!isVisible) return null;

    return (
        <div 
            className="animate-slide-right"
            style={{
                position: 'fixed',
                bottom: '100px',
                left: minimized ? '-310px' : '20px',
                zIndex: 100000,
                width: '320px',
                transition: 'left 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {/* Panel de Serenito y Video */}
            <div className="glass-panel" style={{ 
                padding: '1.2rem', 
                borderRadius: '24px', 
                background: 'linear-gradient(135deg, rgba(5, 11, 20, 0.98) 0%, rgba(10, 17, 40, 0.98) 100%)',
                border: '1px solid var(--brand-primary)',
                boxShadow: '0 10px 50px rgba(0,229,255,0.3)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%'
            }}>
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10 }}
                >
                    <X size={20} />
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: 'var(--brand-primary)', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(0,229,255,0.5)' }}>
                            <Sparkles size={18} color="black" />
                        </div>
                        <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'white', letterSpacing: '0.5px' }}>SMART SHARE HUB</span>
                    </div>
                </div>

                <div style={{ 
                    width: '100%', 
                    aspectRatio: '9/16', 
                    background: '#000', 
                    borderRadius: '16px', 
                    marginBottom: '1.2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,229,255,0.2)'
                }}>
                    <iframe 
                        src="https://www.youtube.com/embed/O6rEZwVbIPY?autoplay=1&mute=1&loop=1&playlist=O6rEZwVbIPY&controls=0&modestbranding=1&rel=0&playsinline=1"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                        title="Serenito - Sombreros de Innovación"
                        allow="autoplay; encrypted-media"
                        loading="lazy"
                    />
                </div>

                <button 
                    onClick={handleShareClick}
                    className="btn btn-primary pulse-fast"
                    style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '12px',
                        background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                        border: 'none',
                        padding: '14px',
                        borderRadius: '16px',
                        fontWeight: '900',
                        color: 'white',
                        boxShadow: '0 8px 15px rgba(236, 72, 153, 0.3)',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        marginBottom: '0.8rem'
                    }}
                >
                    <Share2 size={20} />
                    Difundir App Vecinal
                </button>

                <button 
                    onClick={handleEmergencyClick}
                    style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: '12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1.5px solid #ef4444',
                        padding: '12px',
                        borderRadius: '16px',
                        fontWeight: '900',
                        color: '#ef4444',
                        textTransform: 'uppercase',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: '0.3s'
                    }}
                >
                    <Phone size={18} />
                    Emergencias 24/7
                </button>
            </div>
        </div>
    );
}
