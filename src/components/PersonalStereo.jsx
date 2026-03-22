import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, Music, Volume2, History } from 'lucide-react';

export default function PersonalStereo({ onClose }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [activeGenre, setActiveGenre] = useState('pensamiento_lateral');
    const [songIndex, setSongIndex] = useState(0);
    const audioRef = useRef(null);

    const LIBRE_MUSIC = {
        'pensamiento_lateral': [
            { title: "Vamos a recordar y pensar", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/Vamos%20a%20recordar%20y%20pensar.mp3" },
            { title: "La cumbia de los seis sombreros", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/La%20cumbia%20de%20los%20seis%20sombreros.mp3" },
            { title: "Sombrero heavy", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/Sombrero%20heavy.mp3" },
            { title: "Sombrero regalón", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/Sombrero%20regal%C3%B3n.mp3" },
            { title: "Blusero del jazz", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/Blusero%20del%20jazz%20con%20sombreros.mp3" },
            { title: "Todos podemos pensar", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/todos%20podemos%20pensar%20con%206%20sombreros.mp3" },
            { title: "Cámbiate el sombrero", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/cambiate%20el%20sombrero%20xcbrgavls26.mp3" },
            { title: "Cámbiate Carlitos", url: "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/assets/audio/Cambiate%20carlitos.mp3" }
        ],
        '80s_rock': [
            { title: 'The Cure - Lovesong (Remix VLS)', url: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a7345b.mp3' }, // Placeholder real sound
            { title: 'The Police - Every Breath (VLS Edit)', url: 'https://cdn.pixabay.com/audio/2023/05/15/audio_732a3962d8.mp3' }
        ],
        'tropical': [
            { title: 'Salsa Brava VLS', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
            { title: 'Cumbia Serenense', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
        ],
        'urbano': [
            { title: 'Reggaeton Smart', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
        ]
    };

    const currentPlaylist = LIBRE_MUSIC[activeGenre] || LIBRE_MUSIC['80s_rock'];
    const currentSong = currentPlaylist[songIndex % currentPlaylist.length];

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(() => {});
        }
    }, [currentSong.url, isPlaying]);

    useEffect(() => {
        const handleStop = () => {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
        };
        window.addEventListener('vls-stop-cassette', handleStop);
        window.addEventListener('stop-all-audio', handleStop);
        return () => {
            window.removeEventListener('vls-stop-cassette', handleStop);
            window.removeEventListener('stop-all-audio', handleStop);
        };
    }, []);

    useEffect(() => {
        const handleStop = () => {
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
        };
        window.addEventListener('vls-stop-cassette', handleStop);
        window.addEventListener('stop-all-audio', handleStop);
        return () => {
            window.removeEventListener('vls-stop-cassette', handleStop);
            window.removeEventListener('stop-all-audio', handleStop);
        };
    }, []);

    const GENRE_SKINS = {
        'pensamiento_lateral': { bg: '#e2e8f0', label: 'DE BONO v3.2', color: '#000' },
        '80s_rock': { bg: '#1e293b', label: 'ROCK 80s', color: '#fff' },
        'tropical': { bg: '#fcd34d', label: 'BAILABLE VLS', color: '#000' },
        'urbano': { bg: '#8b5cf6', label: 'TRAP SMART', color: '#fff' }
    };

    const skin = GENRE_SKINS[activeGenre] || GENRE_SKINS['80s_rock'];

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setRotation(prev => (prev + 5) % 360);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setSongIndex(prev => prev + 1);
        setIsPlaying(true);
    };

    const prevSong = () => {
        setSongIndex(prev => (prev > 0 ? prev - 1 : currentPlaylist.length - 1));
        setIsPlaying(true);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60000,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Old Standard TT', serif",
            backdropFilter: 'blur(10px)',
            color: 'white'
        }}>
            {/* Genre Selectors (Casetes apilados) */}
            <div style={{ position: 'absolute', left: '40px', top: '100px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ color: '#fcd34d', margin: '0 0 10px 0', fontSize: '0.8rem', letterSpacing: '1px' }}>ESCUCHAR:</h4>
                {Object.keys(LIBRE_MUSIC).map(genre => (
                    <button 
                        key={genre}
                        onClick={() => { setActiveGenre(genre); setSongIndex(0); setIsPlaying(true); }}
                        style={{ 
                            background: activeGenre === genre ? '#fcd34d' : '#334155',
                            color: activeGenre === genre ? 'black' : 'white',
                            border: 'none', padding: '10px 15px', borderRadius: '4px',
                            cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold',
                            textAlign: 'left', transition: 'all 0.2s', width: '120px'
                        }}
                    >
                        {genre.toUpperCase().replace('_', ' ')}
                    </button>
                ))}
            </div>
            {/* Header */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <History color="#fcd34d" size={32} />
                <h2 style={{ color: 'white', margin: 0, letterSpacing: '2px' }}>PERSONAL STEREO</h2>
            </div>
            
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={32} />
            </button>

            {/* Cassette Deck Container */}
            <div className="glass-panel" style={{ 
                padding: '3rem', 
                borderRadius: '30px', 
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '4px solid #334155',
                boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '500px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ color: '#fcd34d', margin: 0, textTransform: 'uppercase', fontSize: '1.2rem' }}>{activeGenre.replace('_', ' ')}</h3>
                    <div style={{ color: 'white', fontWeight: 'bold', marginTop: '5px' }}>{currentSong.title}</div>
                    <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontStyle: 'italic', fontSize: '0.8rem' }}>I. Municipalidad de La Serena</p>
                </div>

                {/* The Cassette Visual */}
                <div style={{ 
                    position: 'relative', 
                    width: '400px', 
                    height: '260px', 
                    perspective: '1000px' 
                }}>
                    <div className="cassette-body" style={{
                        width: '100%',
                        height: '100%',
                        background: '#e2e8f0',
                        borderRadius: '12px',
                        position: 'relative',
                        border: '5px solid #000',
                        boxShadow: isPlaying ? '0 0 20px #fcd34d' : 'none',
                        transition: 'box-shadow 0.3s'
                    }}>
                        {/* Cassette Label Image */}
                        <img 
                            src="/nostalgia/cassette_ls.jpg" 
                            alt="Cassette La Serena" 
                            style={{ 
                                position: 'absolute', 
                                inset: '10%', 
                                width: '80%', 
                                height: '80%', 
                                objectFit: 'contain',
                                opacity: 0.9,
                                filter: 'sepia(0.2)'
                            }} 
                        />

                        {/* Cassette Holes / Reels */}
                        <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%) rotate('+rotation+'deg)', width: '40px', height: '40px', background: '#000', borderRadius: '50%', border: '3px solid #333' }}>
                            <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#e2e8f0', left: '15px' }}></div>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', left: '70%', transform: 'translate(-50%, -50%) rotate('+rotation+'deg)', width: '40px', height: '40px', background: '#000', borderRadius: '50%', border: '3px solid #333' }}>
                            <div style={{ position: 'absolute', width: '10px', height: '10px', background: '#e2e8f0', left: '15px' }}></div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <button onClick={prevSong} className="btn-glass" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                        <SkipBack size={24} />
                    </button>
                    <button 
                        onClick={togglePlay}
                        style={{ 
                            width: '80px', 
                            height: '80px', 
                            borderRadius: '50%', 
                            background: '#fcd34d', 
                            border: 'none', 
                            color: 'black', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px #fcd34d'
                        }}
                    >
                        {isPlaying ? <Pause size={40} /> : <Play size={40} style={{ marginLeft: '5px' }} />}
                    </button>
                    <button onClick={nextSong} className="btn-glass" style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                        <SkipForward size={24} />
                    </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                    <Volume2 size={20} color="#94a3b8" />
                    <div style={{ flex: 1, h: '4px', background: '#334155', borderRadius: '2px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '70%', height: '100%', background: '#fcd34d', borderRadius: '2px' }}></div>
                    </div>
                </div>
            </div>

            <audio 
                ref={audioRef}
                src={currentSong.url} 
                autoPlay={isPlaying}
                loop
            />

            <style>{`
                .cassette-body::before {
                    content: '';
                    position: absolute;
                    bottom: -15px;
                    left: 20%;
                    right: 20%;
                    height: 20px;
                    background: #64748b;
                    border: 2px solid #000;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
