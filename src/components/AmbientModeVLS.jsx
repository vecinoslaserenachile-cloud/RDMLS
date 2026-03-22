import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize, X, Image as ImageIcon } from 'lucide-react';

export default function AmbientModeVLS({ onClose }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1542456565-5c1cf81c4c81?q=80&w=2000&auto=format&fit=crop", // Faro
        "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2000&auto=format&fit=crop", // Playa
        "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2000&auto=format&fit=crop", // Valle
        "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=2000&auto=format&fit=crop"  // Ciudad colonial
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIdx(prev => (prev + 1) % images.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200000, background: '#000', overflow: 'hidden' }}>
            <audio 
                ref={audioRef}
                src="https://az11.yesstreaming.net:8630/radio.mp3" 
                autoPlay
            />
            
            {images.map((img, idx) => (
                <div 
                    key={idx}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: currentImageIdx === idx ? 1 : 0,
                        transition: 'opacity 2s ease-in-out',
                        filter: 'brightness(0.8)'
                    }}
                />
            ))}

            <div style={{ position: 'absolute', bottom: '40px', left: '40px', background: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h2 style={{ color: 'white', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ImageIcon color="#3b82f6" /> Modo Ambiente VLS
                </h2>
                <p style={{ color: '#cbd5e1', margin: '0 0 20px 0', fontSize: '0.9rem' }}>Fotografías de La Serena + Radio VLS</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button 
                        onClick={togglePlay}
                        style={{ background: isPlaying ? '#ef4444' : '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                        {isPlaying ? 'PAUSAR RADIO' : 'REPRODUCIR'}
                    </button>
                    <button 
                        onClick={onClose}
                        style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}
                    >
                        <X size={18} /> SALIR
                    </button>
                </div>
            </div>
        </div>
    );
}
