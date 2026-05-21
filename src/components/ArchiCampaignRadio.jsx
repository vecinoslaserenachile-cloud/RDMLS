import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack, ListMusic, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const animationRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [spectrumLevels, setSpectrumLevels] = useState(Array(12).fill(5));

  const currentTrack = ARCHI_PLAYLIST[currentIndex];
  
  const gold = '#fbbf24';
  const borderGold = 'rgba(251, 191, 36, 0.3)';
  const darkBg = 'rgba(7, 15, 32, 0.85)';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animación de espectro
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      setSpectrumLevels(Array(12).fill(5));
      return;
    }
    const animate = () => {
      setSpectrumLevels(prev => prev.map((_, i) => {
        const base = [70, 85, 60, 75, 50, 65, 80, 55, 45, 70, 60, 40][i];
        return Math.max(5, base + (Math.random() - 0.5) * 40);
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

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

  return (
    <div style={{
      width: '100%',
      maxWidth: isMobile ? '100%' : '400px',
      margin: '0 auto',
      fontFamily: '"Outfit", sans-serif',
      position: 'relative',
      zIndex: 50,
    }}>
      <audio
        ref={audioRef}
        onEnded={nextTrack}
        onTimeUpdate={() => {
          if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* REPRODUCTOR PRINCIPAL */}
      <div style={{
        background: darkBg,
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: \`2px solid \${borderGold}\`,
        boxShadow: \`0 15px 45px rgba(0,0,0,0.5), 0 0 40px rgba(251,191,36,0.1)\`,
        overflow: 'hidden',
        width: '100%',
      }}>
        {/* Top Header */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={16} color={gold} />
            <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px' }}>
              SEÑAL OFICIAL
            </span>
          </div>
          <button 
            onClick={() => setShowPlaylist(!showPlaylist)}
            style={{
              background: showPlaylist ? 'rgba(251,191,36,0.2)' : 'transparent',
              border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px',
              color: showPlaylist ? gold : '#94a3b8',
              transition: 'all 0.2s'
            }}
          >
            <ListMusic size={18} />
          </button>
        </div>

        {/* Info & Controles */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Metadata */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '0.75rem', color: gold, textTransform: 'uppercase',
              letterSpacing: '1px', fontWeight: 800, marginBottom: '6px'
            }}>
              {currentTrack.category}
            </div>
            <h4 style={{
              margin: 0, color: 'white', fontSize: isMobile ? '1.2rem' : '1.3rem',
              fontWeight: 800, lineHeight: 1.2, whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis'
            }}>
              {currentTrack.title}
            </h4>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
              {currentTrack.artist}
            </div>
          </div>

          {/* Spectrum */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '40px' }}>
            {spectrumLevels.map((level, i) => (
              <div key={i} style={{
                width: '6px',
                height: \`\${level}%\`,
                background: isPlaying ? \`linear-gradient(to top, #b45309, \${gold})\` : '#334155',
                borderRadius: '3px',
                transition: 'height 0.1s ease'
              }} />
            ))}
          </div>

          {/* ProgressBar */}
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: \`\${progress}%\`, height: '100%', background: gold, transition: 'width 0.1s linear' }} />
          </div>

          {/* Botonera */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
            <button onClick={prevTrack} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}>
              <SkipBack size={24} />
            </button>
            <button onClick={togglePlay} style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: \`linear-gradient(135deg, \${gold} 0%, #b45309 100%)\`,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: isPlaying ? '0 0 20px rgba(251,191,36,0.5)' : '0 4px 15px rgba(0,0,0,0.3)',
              color: '#0f172a'
            }}>
              {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
            </button>
            <button onClick={nextTrack} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}>
              <SkipForward size={24} />
            </button>
          </div>
        </div>

        {/* Playlist Desplegable */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '220px', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ padding: '10px', height: '100%', overflowY: 'auto' }}>
                {ARCHI_PLAYLIST.map((t, i) => (
                  <div
                    key={t.id}
                    onClick={() => { loadTrack(i, true); setShowPlaylist(false); }}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: currentIndex === i ? 'rgba(251,191,36,0.1)' : 'transparent',
                      border: currentIndex === i ? \`1px solid \${borderGold}\` : '1px solid transparent',
                      marginBottom: '4px'
                    }}
                  >
                    {currentIndex === i && isPlaying ? (
                      <div style={{ color: gold }}><Radio size={16} /></div>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#64748b', width: '16px', textAlign: 'center' }}>{i + 1}</div>
                    )}
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ color: currentIndex === i ? gold : '#e2e8f0', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {t.title}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                        {t.artist} • {t.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
