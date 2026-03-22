import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Disc, Volume2, Volume1, VolumeX, FastForward, Rewind, Heart, ExternalLink, Headphones, Radio, Share2, Megaphone } from 'lucide-react';
import PublicUtilityService from '../services/PublicUtilityService';

const ImageFallback = ({ src, alt, style, className }) => {
    const [status, setStatus] = useState('loading');
    return (
        <div style={{ position: 'relative', width: style.width || '100%', height: style.height || '100%', flexShrink: 0, borderRadius: style.borderRadius, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: style.border }}>
            {status === 'loading' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="pulse-fast" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(56,189,248,0.5)' }}></div>
                </div>
            )}
            {status === 'error' ? (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.1)' }}>
                    <Music size={style.width === '50px' ? 20 : 40} color="rgba(255,255,255,0.2)" />
                </div>
            ) : (
                <img src={src} alt={alt} className={className} style={{ ...style, width: '100%', height: '100%', border: 'none', opacity: status === 'success' ? 1 : 0, transition: 'opacity 0.5s ease', objectFit: 'cover' }} onLoad={() => setStatus('success')} onError={() => setStatus('error')} loading="lazy" />
            )}
        </div>
    );
};

export default function MusicRanking({ insideModal = false }) {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [rpmSpeed, setRpmSpeed] = useState(33);
    const [votedTracks, setVotedTracks] = useState(new Set());
    const [voteFeedbackId, setVoteFeedbackId] = useState(null);
    const [liveAd, setLiveAd] = useState(null);
    const audioRef = useRef(null);

    const [playlist, setPlaylist] = useState([
        { id: 1, title: "Serenito Rap", artist: "Campaña Serenito", cover: "/music/portada_serenito_rap.png", audio: "/music/serenito_rap.mp3", likes: 10 },
        { id: 2, title: "Linda Provinciana", artist: "Radio VLS Originals", cover: "/music/portada_linda_provinciana.png", audio: "/music/linda_provinciana.mp3", likes: 8 },
        { id: 3, title: "Eres Serena", artist: "Radio VLS Originals", cover: "/music/portada_eres_Serena.png", audio: "/music/eres_serena.mp3", likes: 7 },
        { id: 4, title: "Vals Mis Recuerdos", artist: "Patrimonio Serenense", cover: "/music/portada_vals_mis_recuerdos.png", audio: "/music/vals_mis_recuerdos.mp3", likes: 5 },
        { id: 11, title: "Mujer", artist: "Radio VLS Originals", cover: "/music/portada_mujer.png", audio: "/music/mujer.mp3", likes: 9 },
        { id: 6, title: "Es Amor por La Serena", artist: "Radio VLS Exclusivo", cover: "/music/portada_es_amor_por_la_serena.png", audio: "/music/es_amor_por_la_serena.mp3", likes: 4 },
        { id: 7, title: "Himno La Serena en Jazz Blues", artist: "Ensambles Locales", cover: "/music/portada_himno_la_serena_jazz.png", audio: "/music/himno_la_serena_jazz.mp3", likes: 3 },
        { id: 8, title: "Serenito - Lose I Know", artist: "Campaña Serenito", cover: "/music/serenitolose.png", audio: "/music/loseiknow.mp3", likes: 2 },
        { id: 9, title: "Es Tiempo de La Serena", artist: "Campaña Serenito", cover: "/music/portada_tiempo_serena.jpg", audio: "/music/estiempodelaserena.mp3", likes: 1 },
        { id: 10, title: "Serenito Invita", artist: "Campaña Serenito", cover: "/music/portada_serenitoinvita.png", audio: "/music/serenitoinvita.MP3", likes: 1 }
    ].sort((a, b) => b.likes - a.likes));

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveAd(PublicUtilityService.getLiveAd());
        }, 8000);
        setLiveAd(PublicUtilityService.getLiveAd());
        return () => clearInterval(interval);
    }, []);

    const handleVote = (e, id) => {
        e.stopPropagation();
        if (votedTracks.has(id)) return;
        setVotedTracks(prev => new Set(prev).add(id));
        setVoteFeedbackId(id);
        setTimeout(() => setVoteFeedbackId(null), 2000);
        setPlaylist(prev => prev.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t).sort((a, b) => b.likes - a.likes));
    };

    const updateProgress = () => {
        if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const handlePlayTrack = (track) => {
        if (currentTrack && currentTrack.id === track.id) {
            setIsPlaying(!isPlaying);
        } else {
            setIsPlaying(false);
            setTimeout(() => {
                setCurrentTrack(track);
                setProgress(0);
                setTimeout(() => setIsPlaying(true), 100);
            }, 300);
        }
    };

    const playPromiseRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current || !currentTrack) return;
        const audio = audioRef.current;

        if (isPlaying) {
            playPromiseRef.current = audio.play();
            playPromiseRef.current.catch(error => {
                if (error.name !== 'AbortError') {
                    console.error("Audio block: [LoadError]", error);
                }
            });
        } else {
            if (playPromiseRef.current !== null) {
                playPromiseRef.current
                    .then(() => {
                        audio.pause();
                    })
                    .catch(() => {
                        audio.pause();
                    });
            } else {
                audio.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    return (
        <div style={{ maxWidth: '1200px', margin: insideModal ? '0 auto' : '4rem auto 0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <audio ref={audioRef} src={currentTrack ? currentTrack.audio : null} onTimeUpdate={updateProgress} onEnded={() => {
                const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
                handlePlayTrack(playlist[(currentIndex + 1) % playlist.length]);
            }} style={{ display: 'none' }} />

            {/* MARQUESINA DE UTILIDAD PÚBLICA (GRATIS) */}
            <div style={{ 
                background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', 
                color: 'white', 
                padding: '0.6rem 1.5rem', 
                borderRadius: '50px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                overflow: 'hidden'
            }}>
                <div style={{ background: '#fff', color: '#1e3a8a', padding: '2px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Megaphone size={14} /> UTILIDAD PÚBLICA VLS
                </div>
                <marquee scrollamount="5" style={{ flex: 1, fontWeight: 'bold', fontSize: '0.85rem' }}>
                    {liveAd ? `${liveAd.title}: ${liveAd.content} — REPORTA TU CASO GRATIS EN ComunaSmart — ` : 'SISTEMA DE AVISOS GRATUITOS PARA MASCOTAS Y DOCUMENTOS EXTRAVIADOS — COMUNÍCATE CON NOSOTROS — '}
                </marquee>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.5))' }}></div>
                <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.4rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Radio size={24} color="#38bdf8" /> RADIO VLS: RANKING CIUDADANO
                </h3>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(-90deg, transparent, rgba(56,189,248,0.5))' }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* HI-FI DECK */}
                <div className="glass-panel" style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', borderRadius: '12px', padding: '2rem', border: '2px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 10, right: 15, color: '#475569', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '2px' }}>PROFESSIONAL MASTER DECK VLS-3000</div>
                    
                    {/* Turntable */}
                    <div style={{ 
                        width: '260px', 
                        height: '260px', 
                        borderRadius: '50%', 
                        background: 'radial-gradient(circle, #334155 0%, #000 80%)', 
                        border: '8px solid #475569', 
                        position: 'relative', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginBottom: '2rem', 
                        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                        padding: '10px'
                    }}>
                        {/* The Disc */}
                        <div style={{ 
                            width: '100%', 
                            height: '100%', 
                            borderRadius: '50%', 
                            background: 'repeating-radial-gradient(#111 0px, #000 2px, #111 4px)', 
                            animation: isPlaying ? `spin-vinyl ${rpmSpeed === 33 ? '1.8s' : rpmSpeed === 45 ? '1.33s' : '0.77s'} linear infinite` : 'none', 
                            position: 'relative',
                            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
                        }}>
                             <div style={{ position: 'absolute', inset: '10%', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
                            {currentTrack && (
                                <div style={{ 
                                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    width: '35%', height: '35%', borderRadius: '50%', border: '4px solid #fff', overflow: 'hidden',
                                    background: '#fff', boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                                }}>
                                    <img src={currentTrack.cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://picsum.photos/seed/vls/150/150' }} />
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', background: '#000', borderRadius: '50%' }} />
                                </div>
                            )}
                        </div>

                        {/* EL CABEZAL (TONEARM) MOTORIZADO VLS */}
                        <div style={{ 
                            position: 'absolute', 
                            top: '-10px', 
                            right: '40px', 
                            width: '20px', 
                            height: '300px', 
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}>
                            {/* Base del brazo */}
                            <div style={{ position: 'absolute', top: '40px', right: '-15px', width: '60px', height: '60px', background: '#94a3b8', borderRadius: '50%', border: '3px solid #1e293b', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '15px', height: '15px', background: '#000', borderRadius: '50%' }} />
                            </div>

                            {/* Tracking Wrapper: Moves slowly during song */}
                            <div style={{ 
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                transformOrigin: 'top center',
                                transform: `rotate(${(progress / 100) * 28}deg)`,
                                transition: isPlaying ? 'transform 0.5s linear' : 'none'
                            }}>
                                {/* El Brazo: Start/Stop movement */}
                                <div style={{ 
                                    position: 'absolute', 
                                    top: '70px', 
                                    right: '15px', 
                                    width: '10px', 
                                    height: '220px', 
                                    background: 'linear-gradient(to bottom, #cbd5e1, #94a3b8)', 
                                    border: '1px solid #475569',
                                    borderRadius: '5px',
                                    transformOrigin: 'top center',
                                    animation: isPlaying ? 'vls-tonearm-start 1.5s forwards ease-in-out' : 'vls-tonearm-stop 1.2s forwards ease-in-out'
                                }}>
                                    <style>{`
                                        @keyframes spin-vinyl { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                                        @keyframes vls-tonearm-start { 0% { transform: rotate(-10deg); } 100% { transform: rotate(32deg); } }
                                        @keyframes vls-tonearm-stop { 0% { transform: rotate(32deg); } 100% { transform: rotate(-10deg); } }
                                    `}</style>

                                    <div style={{ position: 'absolute', top: '-15px', left: '-10px', width: '30px', height: '40px', background: 'linear-gradient(to right, #475569, #334155)', borderRadius: '4px', border: '1px solid #1e293b' }} />
                                    
                                    <div style={{ position: 'absolute', bottom: '-20px', left: '-10px', width: '32px', height: '55px', background: '#0f172a', borderRadius: '4px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 5px 10px rgba(0,0,0,0.5)' }}>
                                        <div style={{ width: '2px', height: '20px', background: '#94a3b8', marginTop: '30px', boxShadow: '0 0 5px #38bdf8' }} />
                                        <div style={{ fontSize: '8px', color: '#38bdf8', fontWeight: 'bold', transform: 'rotate(-90deg)', marginTop: '-18px' }}>VLSong</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls Panel */}
                    <div style={{ width: '100%', background: '#cbd5e1', borderRadius: '8px', padding: '1.2rem', borderBottom: '5px solid #475569', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.5)' }}>
                         {/* VU Meters & Sliders */}
                         <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
                            <div style={{ background: '#000', padding: '0.8rem', borderRadius: '4px', display: 'flex', gap: '4px', border: '2px solid #1e293b', flex: 1 }}>
                                {[1, 2, 3, 4].map(ch => (
                                    <div key={ch} style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                                        {[8, 7, 6, 5, 4, 3, 2, 1].map(b => (
                                            <div key={b} style={{ 
                                                height: '3px', 
                                                background: isPlaying ? (b > 6 ? '#ef4444' : b > 4 ? '#eab308' : '#10b981') : '#111', 
                                                opacity: isPlaying && Math.random() > 0.3 ? 1 : 0.3,
                                                transition: 'opacity 0.1s'
                                            }} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Selector de Velocidad VLS */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ fontSize: '0.6rem', color: '#1e293b', fontWeight: '900', textAlign: 'center' }}>SPEED RPM</label>
                                <div style={{ display: 'flex', gap: '5px', background: '#94a3b8', padding: '4px', borderRadius: '4px', border: '1px solid #475569' }}>
                                    {[33, 45, 78].map(s => (
                                        <button 
                                            key={s} 
                                            onClick={() => setRpmSpeed(s)}
                                            style={{ 
                                                fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '2px', border: 'none', 
                                                background: rpmSpeed === s ? '#1e293b' : 'transparent',
                                                color: rpmSpeed === s ? 'white' : '#1e293b',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                         </div>

                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => { if(audioRef.current) audioRef.current.currentTime = 0; }} style={{ background: '#475569', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: 'bold', fontSize: '0.7rem', cursor: 'pointer', boxShadow: '0 2px 0 #1e293b' }}>CUE</button>
                                <div style={{ background: '#94a3b8', width: '40px', height: '10px', borderRadius: '5px', border: '1px solid #1e293b', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: `${volume * 100}%`, top: '-5px', width: '10px', height: '20px', background: '#1e293b', borderRadius: '2px', cursor: 'pointer' }} />
                                </div>
                            </div>
                            <button onClick={() => setIsPlaying(!isPlaying)} style={{ background: isPlaying ? 'linear-gradient(to bottom, #ef4444, #991b1b)' : 'linear-gradient(to bottom, #10b981, #065f46)', color: 'white', border: 'none', padding: '0.8rem 2.5rem', borderRadius: '8px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 0 #000', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{isPlaying ? 'PAUSE' : 'PLAY'}</button>
                         </div>
                    </div>
                </div>

                {/* PLAYLIST */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {playlist.map(track => (
                        <div key={track.id} onClick={() => handlePlayTrack(track)} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: currentTrack?.id === track.id ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.05)', borderRadius: '12px', border: `1px solid ${currentTrack?.id === track.id ? '#38bdf8' : 'transparent'}`, cursor: 'pointer' }}>
                            <ImageFallback src={track.cover} alt="Cover" style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: 0, fontSize: '1rem' }}>{track.title}</h4>
                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{track.artist}</span>
                            </div>
                            <Heart size={16} color={votedTracks.has(track.id) ? '#ef4444' : '#475569'} fill={votedTracks.has(track.id) ? '#ef4444' : 'none'} onClick={(e) => { e.stopPropagation(); handleVote(e, track.id); }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
