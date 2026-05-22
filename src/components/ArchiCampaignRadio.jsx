import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack, ListMusic, Radio, Disc } from 'lucide-react';
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
  const [spectrumLevels, setSpectrumLevels] = useState(Array(16).fill(5));

  const currentTrack = ARCHI_PLAYLIST[currentIndex];

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);
  
  const gold = '#fbbf24';
  const borderGold = 'rgba(251, 191, 36, 0.4)';
  const darkBg = 'rgba(10, 15, 30, 0.65)'; 

  const initAudioContext = () => {
    try {
      if (!audioContextRef.current && audioRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtx();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (e) {
      console.warn("AudioContext init failed:", e);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Control de reproducción automática (siguiente pista)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      loadTrack((currentIndex + 1) % ARCHI_PLAYLIST.length, true);
    };
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentIndex]);

  // Animación de espectro fluido (Premium - Real/Simulado)
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      setSpectrumLevels(Array(16).fill(5));
      return;
    }
    const animate = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const newLevels = [];
        for (let i = 0; i < 16; i++) {
          const value = dataArrayRef.current[i + 1] || 0;
          const percent = Math.max(5, (value / 255) * 100);
          newLevels.push(percent);
        }
        setSpectrumLevels(newLevels);
      } else {
        setSpectrumLevels(prev => prev.map((_, i) => {
          const base = [40, 60, 80, 50, 90, 70, 40, 60, 80, 50, 70, 90, 60, 40, 70, 50][i];
          return Math.max(5, base + (Math.sin(Date.now() / 100 + i) * 30));
        }));
      }
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
      initAudioContext();
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
    initAudioContext();
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
      maxWidth: isMobile ? '100%' : '420px',
      margin: '0 auto',
      fontFamily: '"Outfit", sans-serif',
      position: 'relative',
      zIndex: 50,
    }}>
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onTimeUpdate={() => {
          if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        }}
        onPlay={() => { initAudioContext(); setIsPlaying(true); }}
        onPause={() => setIsPlaying(false)}
      />

      {/* REPRODUCTOR PRINCIPAL - DISEÑO PREMIUM */}
      <motion.div 
        animate={{
          boxShadow: isPlaying 
            ? '0 20px 50px rgba(0,0,0,0.5), 0 0 60px rgba(251,191,36,0.15), inset 0 0 20px rgba(251,191,36,0.05)' 
            : '0 15px 45px rgba(0,0,0,0.5), 0 0 0px rgba(251,191,36,0), inset 0 0 0px rgba(251,191,36,0)'
        }}
        transition={{ duration: 1 }}
        style={{
          background: darkBg,
          backdropFilter: 'blur(30px) saturate(150%)',
          WebkitBackdropFilter: 'blur(30px) saturate(150%)',
          borderRadius: '30px',
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
          overflow: 'hidden',
          width: '100%',
          position: 'relative'
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
            <motion.div animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] } : {}} transition={{ repeat: Infinity, duration: 2 }}>
              <Radio size={18} color={gold} />
            </motion.div>
            <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              SEÑAL OFICIAL ARCHI
            </span>
          </div>
          <button 
            onClick={() => setShowPlaylist(!showPlaylist)}
            style={{
              background: showPlaylist ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.05)',
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
          
          {/* Disco giratorio decorativo de fondo */}
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '10%', right: '-15%', opacity: 0.05, pointerEvents: 'none' }}
          >
            <Disc size={180} color={gold} />
          </motion.div>

          {/* Metadata */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(251,191,36,0.1)', padding: '4px 12px', borderRadius: '20px',
              border: '1px solid rgba(251,191,36,0.2)',
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

          {/* Spectrum */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', height: '50px', margin: '10px 0' }}>
            {spectrumLevels.map((level, i) => (
              <div key={i} style={{
                width: '6px',
                height: `${level}%`,
                background: isPlaying ? `linear-gradient(to top, #b45309, ${gold})` : 'rgba(255,255,255,0.1)',
                borderRadius: '4px',
                transition: 'height 0.08s ease',
                boxShadow: isPlaying ? `0 0 10px rgba(251,191,36,0.3)` : 'none'
              }} />
            ))}
          </div>

          {/* ProgressBar */}
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: `linear-gradient(90deg, #b45309, ${gold})`, transition: 'width 0.1s linear', boxShadow: '0 0 10px rgba(251,191,36,0.5)' }} />
          </div>

          {/* Botonera */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', marginTop: '10px' }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevTrack} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '10px' }}>
              <SkipBack size={26} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay} 
              style={{
                width: '70px', height: '70px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${gold} 0%, #b45309 100%)`,
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isPlaying ? '0 10px 25px rgba(251,191,36,0.4), inset 0 -3px 10px rgba(0,0,0,0.2)' : '0 10px 25px rgba(0,0,0,0.3), inset 0 -3px 10px rgba(0,0,0,0.2)',
                color: '#0f172a'
              }}>
              {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextTrack} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '10px' }}>
              <SkipForward size={26} />
            </motion.button>
          </div>
        </div>

        {/* Playlist Desplegable - Glassmorphism */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '260px', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ padding: '15px 10px', height: '100%', overflowY: 'auto' }}>
                {ARCHI_PLAYLIST.map((t, i) => (
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    key={t.id}
                    onClick={() => { loadTrack(i, true); setShowPlaylist(false); }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '15px',
                      background: currentIndex === i ? 'rgba(251,191,36,0.15)' : 'transparent',
                      border: currentIndex === i ? `1px solid rgba(251,191,36,0.3)` : '1px solid transparent',
                      marginBottom: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {currentIndex === i && isPlaying ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} style={{ color: gold }}>
                        <Radio size={18} />
                      </motion.div>
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
