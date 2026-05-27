import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack, ListMusic, Radio, Disc } from 'lucide-react';

const ARCHI_PLAYLIST = [
  { id: 1, title: 'Aire', artist: 'Locución ARCHI', file: '/archi-media/audio/Aire.MP3', category: 'Locución' },
  { id: 2, title: 'Súmate Lista Nueva Energía', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Súmate Lista Nueva Energía.mp3', category: 'Jingle' },
  { id: 3, title: 'Primer Mujer Presi', artist: 'Solange Gómez', file: '/archi-media/audio/Primer Mujer Presi.mp3', category: 'Spot' },
  { id: 4, title: 'Voz de Chile', artist: 'Locución ARCHI', file: '/archi-media/audio/voz de chile.MP3', category: 'Locución' },
  { id: 5, title: 'La más transparente', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/La más transparente.mp3', category: 'Spot' },
  { id: 6, title: 'La Antena de todo Chile', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/La Antena de todo Chile.mp3', category: 'Spot' },
  { id: 7, title: 'Nueva E', artist: 'Locución ARCHI', file: '/archi-media/audio/Nueva E.MP3', category: 'Locución' },
  { id: 8, title: 'La ARChi vamos', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/La ARChi vamos.mp3', category: 'Jingle' },
  { id: 9, title: 'Motor Emergencia', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Motor Emergencia.mp3', category: 'Spot' },
  { id: 10, title: 'Cambia E', artist: 'Locución ARCHI', file: '/archi-media/audio/Cambia E.MP3', category: 'Locución' },
  { id: 11, title: 'Nunca están de vacaciones', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Nunca están de vacaciones.mp3', category: 'Spot' },
  { id: 12, title: 'Radio del Futuro', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Radio del Futuro.mp3', category: 'Spot' },
  { id: 13, title: 'Súmate', artist: 'Locución ARCHI', file: '/archi-media/audio/súmate.MP3', category: 'Locución' },
  { id: 14, title: 'ARCHI NUEVA CUECA ENERGÍA', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/ARCHI NUEVA CUECA ENERGÍA.mp3', category: 'Jingle' },
  { id: 15, title: 'Escudo de Chile', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Escudo de Chile.mp3', category: 'Himno' },
  { id: 16, title: 'Expe', artist: 'Locución ARCHI', file: '/archi-media/audio/Expe.MP3', category: 'Locución' },
  { id: 17, title: 'Motor Nueva E Radio', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Motor Nueva E Radio.mp3', category: 'Spot' },
  { id: 18, title: 'Frecuencia Solanch', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Frecuencia Solanch.mp3', category: 'Jingle' },
  { id: 19, title: 'Tango ARCHI', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Tango ARCHI.mp3', category: 'Jingle' },
  { id: 20, title: 'Cambiarchi', artist: 'ARCHI Nueva Energía', file: '/archi-media/audio/Cambiarchi.mp3', category: 'Jingle' }
];

const FALLBACK_AUDIO = '/archi-media/audio/Súmate Lista Nueva Energía.mp3';

export default function ArchiCampaignRadio() {
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const currentTrack = ARCHI_PLAYLIST[currentIndex];
  
  const gold = '#d4af37';
  const borderGold = 'rgba(212, 175, 55, 0.4)';
  const darkBg = '#002D8B'; 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadTrack = (index, autoplay = false) => {
    if (!audioRef.current) return;
    setCurrentIndex(index);
    setProgress(0);
    audioRef.current.pause();
    audioRef.current.src = ARCHI_PLAYLIST[index].file;
    audioRef.current.load();
    if (autoplay) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          audioRef.current.src = FALLBACK_AUDIO;
          audioRef.current.load();
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        loadTrack(currentIndex, false);
      }
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const nextTrack = () => loadTrack((currentIndex + 1) % ARCHI_PLAYLIST.length, true);
  const prevTrack = () => loadTrack((currentIndex - 1 + ARCHI_PLAYLIST.length) % ARCHI_PLAYLIST.length, true);

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: isMobile ? '100%' : '420px',
      margin: '0 auto',
      fontFamily: '"Outfit", sans-serif',
      position: 'relative',
      zIndex: 50,
    }}>

      {/* REPRODUCTOR PRINCIPAL - DISEÑO SEGURO */}
      <div style={{
          background: darkBg,
          borderRadius: '30px',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
          overflow: 'hidden',
          width: '100%',
          position: 'relative',
          boxShadow: '0 15px 45px rgba(0,0,0,0.5)'
        }}>
          
        {/* Glow de acento superior */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${gold}, transparent)`, opacity: 0.8 }} />

        {/* Top Header */}
        <div style={{
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={18} color={gold} />
            <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              SEÑAL NUEVA ENERGÍA ARCHI
            </span>
          </div>
          <button 
            onClick={() => setShowPlaylist(!showPlaylist)}
            style={{
              background: showPlaylist ? 'rgba(212, 175, 55,0.15)' : 'rgba(255,255,255,0.05)',
              border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '12px',
              color: showPlaylist ? gold : 'white',
              transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <ListMusic size={18} />
          </button>
        </div>

        {/* Info & Controles */}
        <div style={{ padding: '30px 24px 35px', display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative' }}>
          
          <div style={{ position: 'absolute', top: '10%', right: '-15%', opacity: 0.05, pointerEvents: 'none' }}>
            <Disc size={180} color={gold} />
          </div>

          {/* Metadata */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(212, 175, 55,0.1)', padding: '4px 12px', borderRadius: '20px',
              border: '1px solid rgba(212, 175, 55,0.2)',
              fontSize: '0.7rem', color: gold, textTransform: 'uppercase',
              letterSpacing: '1px', fontWeight: 900, marginBottom: '12px'
            }}>
              {currentTrack.category}
            </div>
            <h4 style={{
              margin: 0, color: 'white', fontSize: isMobile ? '1.4rem' : '1.6rem',
              fontWeight: 900, lineHeight: 1.2, whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {currentTrack.title}
            </h4>
            <div style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '6px', fontWeight: 500 }}>
              {currentTrack.artist}
            </div>
          </div>

          {/* Audio Native Controls as Fallback AND Engine */}
          <audio 
            ref={audioRef} 
            onTimeUpdate={handleTimeUpdate} 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={nextTrack}
            controls
            style={{ width: '100%', marginTop: '5px', borderRadius: '10px' }}
          />

          {/* Botonera Custom */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '5px' }}>
            <button onClick={prevTrack} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '10px' }}>
              <SkipBack size={26} />
            </button>
            <button 
              onClick={togglePlay} 
              style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${gold} 0%, #b45309 100%)`,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isPlaying ? '0 10px 25px rgba(212, 175, 55,0.4), inset 0 -3px 10px rgba(0,0,0,0.2)' : '0 10px 25px rgba(0,0,0,0.3), inset 0 -3px 10px rgba(0,0,0,0.2)',
                color: '#002D8B'
              }}>
              {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
            </button>
            <button onClick={nextTrack} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '10px' }}>
              <SkipForward size={26} />
            </button>
          </div>
        </div>

        {/* Playlist Desplegable */}
        {showPlaylist && (
          <div style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', height: '260px' }}>
            <div style={{ padding: '15px 10px', height: '100%', overflowY: 'auto' }}>
              {ARCHI_PLAYLIST.map((t, i) => (
                <div
                  key={t.id}
                  onClick={() => { loadTrack(i, true); setShowPlaylist(false); }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '15px',
                    background: currentIndex === i ? 'rgba(212, 175, 55,0.15)' : 'transparent',
                    border: currentIndex === i ? `1px solid rgba(212, 175, 55,0.3)` : '1px solid transparent',
                    marginBottom: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  {currentIndex === i && isPlaying ? (
                    <div style={{ color: gold }}>
                      <Radio size={18} />
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: '#64748b', width: '18px', textAlign: 'center', fontWeight: 'bold' }}>{i + 1}</div>
                  )}
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ color: currentIndex === i ? gold : 'white', fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {t.title}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '2px' }}>
                      {t.artist} • <span style={{ opacity: 0.8 }}>{t.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
