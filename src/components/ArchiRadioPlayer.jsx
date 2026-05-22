import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio, Music, Zap, List, X, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ArchiRadioPlayer — Reproductor exclusivo para la campaña ARCHI Nueva Energía
 * - Fuente: archivos MP3 propios del repositorio /archi-media/audio/
 * - Sin ninguna señal ni referencia a vecinoslaserena.cl
 * - Arrastrable, con playlist, visualizador de espectro simulado y modo mini
 */

// ── PLAYLIST ARCHI ─────────────────────────────────────────────────────────────
// Los archivos MP3 deben estar en: public/archi-media/audio/
// Para agregar nuevos jingles: agregar entradas a este array
const ARCHI_PLAYLIST = [
  {
    id: 1,
    title: 'Aire',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Aire.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 2,
    title: 'Súmate Lista Nueva Energía',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Súmate Lista Nueva Energía.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 3,
    title: 'Primer Mujer Presi',
    artist: 'Solange Gómez',
    file: '/archi-media/audio/Primer Mujer Presi.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 4,
    title: 'Voz de Chile',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/voz de chile.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 5,
    title: 'La más transparente',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/La más transparente.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 6,
    title: 'La Antena de todo Chile',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/La Antena de todo Chile.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 7,
    title: 'Nueva E',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Nueva E.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 8,
    title: 'La ARChi vamos',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/La ARChi vamos.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 9,
    title: 'Motor Emergencia',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Motor Emergencia.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 10,
    title: 'Cambia E',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Cambia E.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 11,
    title: 'Nunca están de vacaciones',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Nunca están de vacaciones.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 12,
    title: 'Radio del Futuro',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Radio del Futuro.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 13,
    title: 'Súmate',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/súmate.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 14,
    title: 'ARCHI NUEVA CUECA ENERGÍA',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/ARCHI NUEVA CUECA ENERGÍA.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 15,
    title: 'Escudo de Chile',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Escudo de Chile.mp3',
    duration: null,
    category: 'Himno',
  },
  {
    id: 16,
    title: 'Expe',
    artist: 'Locución ARCHI',
    file: '/archi-media/audio/Expe.MP3',
    duration: null,
    category: 'Locución',
  },
  {
    id: 17,
    title: 'Motor Nueva E Radio',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Motor Nueva E Radio.mp3',
    duration: null,
    category: 'Spot',
  },
  {
    id: 18,
    title: 'Frecuencia Solanch',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Frecuencia Solanch.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 19,
    title: 'Tango ARCHI',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Tango ARCHI.mp3',
    duration: null,
    category: 'Jingle',
  },
  {
    id: 20,
    title: 'Cambiarchi',
    artist: 'ARCHI Nueva Energía',
    file: '/archi-media/audio/Cambiarchi.mp3',
    duration: null,
    category: 'Jingle',
  }
];

// Fallback: si un archivo MP3 no existe, usa el jingle_remastered anterior
const FALLBACK_AUDIO = '/archi-media/audio/Súmate Lista Nueva Energía.mp3';

export default function ArchiRadioPlayer({ isVisible = true, scale = 1 }) {
  const audioRef = useRef(null);
  const animationRef = useRef(null);
  const [playerMode, setPlayerMode] = useState('expanded'); // 'mini' | 'compact' | 'expanded'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCT] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [spectrumLevels, setSpectrumLevels] = useState(Array(12).fill(5));
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const currentTrack = ARCHI_PLAYLIST[currentIndex];
  const isExpanded = playerMode === 'expanded';
  const isCompact = playerMode === 'compact';
  const isMini = playerMode === 'mini';
  const isEmbedded = scale !== 1;

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const dataArrayRef = useRef(null);

  const initAudioContext = () => {
    try {
      if (!audioContextRef.current && audioRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtx();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 64; // Generates 32 bins
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
    
    // Auto-play the first track on mount
    loadTrack(0, true);

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

  // Autoplay al cargar la página
  useEffect(() => {
    // Intentar autoplay al iniciar. Los navegadores pueden bloquearlo si no hay interacción previa.
    const attemptAutoplay = setTimeout(() => {
      if (!isPlaying) {
        loadTrack(0, true);
      }
    }, 1000);
    return () => clearTimeout(attemptAutoplay);
  }, []);

  // Animación de espectro real / simulado
  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      setSpectrumLevels(Array(12).fill(5));
      return;
    }
    const animate = () => {
      if (analyserRef.current && dataArrayRef.current && !isMuted) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        const newLevels = [];
        // Map 12 bars from the 32 frequency bins (focusing on the lower/mid frequencies for better visuals)
        for (let i = 0; i < 12; i++) {
          const value = dataArrayRef.current[i + 1] || 0; // Skip bin 0 as it's often too constant
          const percent = Math.max(5, (value / 255) * 100 * volume);
          newLevels.push(percent);
        }
        setSpectrumLevels(newLevels);
      } else {
        setSpectrumLevels(prev => prev.map((_, i) => {
          const base = [70, 85, 60, 75, 50, 65, 80, 55, 45, 70, 60, 40][i] * volume;
          return Math.max(5, base + (Math.random() - 0.5) * 40);
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, volume, isMuted]);

  const loadTrack = (index, autoplay = false) => {
    if (!audioRef.current) return;
    const track = ARCHI_PLAYLIST[index];
    setHasError(false);
    setErrorCount(0);
    setCurrentIndex(index);
    setProgress(0);
    setCT(0);
    audioRef.current.pause();
    audioRef.current.src = track.file;
    audioRef.current.load();
    if (autoplay) {
      initAudioContext();
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Intentar con fallback
          audioRef.current.src = FALLBACK_AUDIO;
          audioRef.current.load();
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
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
      const playPromise = audioRef.current.play();
      if (playPromise) {
        playPromise.then(() => setIsPlaying(true)).catch(() => {
          // Intentar cargar fallback si hay error
          audioRef.current.src = FALLBACK_AUDIO;
          audioRef.current.load();
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        });
      }
    }
  };

  const nextTrack = () => {
    const next = (currentIndex + 1) % ARCHI_PLAYLIST.length;
    loadTrack(next, isPlaying);
  };

  const prevTrack = () => {
    const prev = (currentIndex - 1 + ARCHI_PLAYLIST.length) % ARCHI_PLAYLIST.length;
    loadTrack(prev, isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const ct = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    setCT(ct);
    setDuration(dur);
    if (dur > 0) setProgress((ct / dur) * 100);
  };

  const handleEnded = () => {
    nextTrack();
  };

  const handleError = () => {
    if (errorCount < 1) {
      // Primer error: intentar fallback
      setErrorCount(prev => prev + 1);
      audioRef.current.src = FALLBACK_AUDIO;
      audioRef.current.load();
      if (isPlaying) audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    audioRef.current.volume = next ? 0 : volume;
  };

  const seekTo = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const cycleMode = () => {
    setPlayerMode(prev => {
      if (prev === 'mini') return 'compact';
      if (prev === 'compact') return 'expanded';
      return 'mini';
    });
  };

  // ── COLORES CAMPAÑA ─────────────────────────────────────
  const gold = '#fbbf24';
  const darkBg = 'rgba(4, 9, 20, 0.97)';
  const borderGold = 'rgba(251, 191, 36, 0.5)';

  // ── MODO MINI ────────────────────────────────────────────
  if (isMini) {
    return (
      <motion.div
        drag dragMomentum={false}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          position: 'fixed',
          bottom: isMobile ? '160px' : '100px',
          right: isMobile ? '12px' : '100px',
          zIndex: 999998,
          display: isVisible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'grab',
          userSelect: 'none'
        }}
      >
        <audio
          ref={audioRef}
          crossOrigin="anonymous"
          onTimeUpdate={handleTimeUpdate}
          onError={handleError}
          onPlay={() => { initAudioContext(); setIsPlaying(true); }}
          onPause={() => setIsPlaying(false)}
        />

        {/* Burbuja ARCHI */}
        <motion.button
          onClick={cycleMode}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: isPlaying
              ? `linear-gradient(135deg, ${gold} 0%, #b45309 100%)`
              : 'rgba(7, 15, 32, 0.97)',
            border: `2px solid ${isPlaying ? gold : borderGold}`,
            boxShadow: isPlaying
              ? `0 0 24px rgba(251,191,36,0.7), 0 4px 15px rgba(0,0,0,0.5)`
              : '0 4px 15px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Radio size={22} color={isPlaying ? '#0f172a' : gold} />
        </motion.button>

        {/* Mini play/pause */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          whileTap={{ scale: 0.85 }}
          style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: `rgba(251, 191, 36, 0.9)`,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          {isPlaying
            ? <Pause size={12} color="#0f172a" />
            : <Play size={12} color="#0f172a" style={{ marginLeft: '2px' }} />}
        </motion.button>

        {isPlaying && (
          <div style={{ fontSize: '0.45rem', color: gold, fontWeight: '900', letterSpacing: '1px', animation: 'archiPulse 1s infinite' }}>
            ● ARCHI EN VIVO
          </div>
        )}
        <style>{`@keyframes archiPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </motion.div>
    );
  }

  // ── MODOS COMPACT / EXPANDED ─────────────────────────────
  const containerStyle = {
    position: isEmbedded ? 'relative' : 'fixed',
    bottom: isEmbedded ? 'auto' : (isMobile ? '70px' : '20px'),
    right: isEmbedded ? 'auto' : (isMobile ? '10px' : '110px'),
    zIndex: isEmbedded ? 10 : 999998,
    display: isVisible ? 'flex' : 'none',
    opacity: 1,
    flexDirection: 'column',
    gap: '6px',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: isEmbedded ? 'default' : 'grab',
    fontFamily: '"Outfit", sans-serif',
  };

  const PlayerContainer = isEmbedded ? 'div' : motion.div;
  const playerProps = isEmbedded ? { style: containerStyle } : {
    drag: true,
    dragMomentum: false,
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    style: containerStyle
  };

  return (
    <PlayerContainer {...playerProps}>
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
        onPlay={() => { initAudioContext(); setIsPlaying(true); }}
        onPause={() => setIsPlaying(false)}
      />

      {/* ── PANEL PRINCIPAL ── */}
      <div style={{
        background: darkBg,
        backdropFilter: 'blur(20px)',
        borderRadius: isExpanded ? '20px' : '30px',
        border: `2px solid ${borderGold}`,
        boxShadow: `0 15px 45px rgba(0,0,0,0.9), 0 0 40px rgba(251,191,36,0.08)`,
        width: isExpanded ? (isMobile ? '290px' : '340px') : '280px',
        overflow: 'hidden',
      }}>

        {/* ── HEADER ── */}
        <div style={{
          background: `linear-gradient(135deg, rgba(251,191,36,0.15), rgba(180,83,9,0.1))`,
          borderBottom: `1px solid ${borderGold}`,
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          {/* Logo + nombre */}
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
            background: `linear-gradient(135deg, ${gold}, #b45309)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 12px rgba(251,191,36,0.4)`
          }}>
            <Radio size={16} color="#0f172a" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: gold, fontWeight: 900, fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              📻 ARCHI Nueva Energía
            </div>
            <div style={{ color: '#64748b', fontSize: '0.65rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Radio de la Lista Nueva Energía · ARCHI 2026
            </div>
          </div>
          {/* Controles header */}
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
            <button onClick={() => setShowPlaylist(!showPlaylist)}
              style={{ background: showPlaylist ? 'rgba(251,191,36,0.2)' : 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', color: gold }}>
              <List size={14} />
            </button>
            <button onClick={cycleMode}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', color: '#64748b' }}>
              <GripHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* ── VISUALIZADOR ESPECTRO ── */}
        {isExpanded && (
          <div style={{
            padding: '12px 14px 4px',
            display: 'flex', alignItems: 'flex-end', gap: '3px', height: '50px',
            background: 'rgba(0,0,0,0.3)'
          }}>
            {spectrumLevels.map((level, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${Math.min(100, level)}%`,
                background: `linear-gradient(to top, ${gold}, #f59e0b, #ef4444)`,
                borderRadius: '2px 2px 0 0',
                transition: 'height 0.1s ease',
                opacity: isPlaying ? 1 : 0.2,
                minHeight: '3px'
              }} />
            ))}
          </div>
        )}

        {/* ── TRACK INFO ── */}
        <div style={{ padding: '12px 14px 6px' }}>
          <div style={{
            color: 'white', fontWeight: 900, fontSize: '0.9rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            marginBottom: '2px'
          }}>
            {hasError ? '⚠️ Archivo no disponible aún' : currentTrack.title}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ background: `rgba(251,191,36,0.1)`, color: gold, padding: '1px 6px', borderRadius: '10px', fontSize: '0.65rem', fontWeight: 700 }}>
              {currentTrack.category}
            </span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentTrack.artist}
            </span>
          </div>
        </div>

        {/* ── BARRA DE PROGRESO ── */}
        <div style={{ padding: '0 14px' }}>
          <div
            onClick={seekTo}
            style={{
              height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px',
              cursor: 'pointer', position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{
              height: '100%', width: `${progress}%`,
              background: `linear-gradient(to right, ${gold}, #f59e0b)`,
              borderRadius: '2px', transition: 'width 0.5s linear'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.6rem', color: '#475569' }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* ── CONTROLES ── */}
        <div style={{
          padding: '8px 14px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px'
        }}>
          {/* Skip atrás */}
          <button onClick={prevTrack}
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
            <SkipBack size={14} />
          </button>

          {/* Play/Pause central */}
          <button onClick={togglePlay}
            style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${gold}, #b45309)`,
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 20px rgba(251,191,36,0.4)`,
              transition: 'all 0.2s ease'
            }}>
            {isPlaying
              ? <Pause size={18} color="#0f172a" />
              : <Play size={18} color="#0f172a" style={{ marginLeft: '2px' }} />}
          </button>

          {/* Skip adelante */}
          <button onClick={nextTrack}
            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
            <SkipForward size={14} />
          </button>

          {/* Volumen */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, maxWidth: '100px' }}>
            <button onClick={toggleMute}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94a3b8', flexShrink: 0 }}>
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} color={gold} />}
            </button>
            <input
              type="range" min="0" max="1" step="0.02" value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{ flex: 1, accentColor: gold, cursor: 'pointer', height: '3px' }}
            />
          </div>
        </div>

        {/* ── PLAYLIST ── */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', borderTop: `1px solid rgba(255,255,255,0.06)` }}
            >
              <div 
                style={{ 
                  maxHeight: '320px', 
                  overflowY: 'auto', 
                  overscrollBehavior: 'contain' 
                }}
                onPointerDownCapture={e => e.stopPropagation()}
              >
                {ARCHI_PLAYLIST.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => loadTrack(idx, true)}
                    style={{
                      width: '100%', background: idx === currentIndex
                        ? 'rgba(251,191,36,0.08)' : 'none',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      padding: '10px 14px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
                      background: idx === currentIndex ? `linear-gradient(135deg, ${gold}, #b45309)` : 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {idx === currentIndex && isPlaying
                        ? <Zap size={12} color="#0f172a" />
                        : <Music size={12} color={idx === currentIndex ? '#0f172a' : '#64748b'} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        color: idx === currentIndex ? gold : 'white',
                        fontSize: '0.8rem', fontWeight: 700,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>{track.title}</div>
                      <div style={{ color: '#64748b', fontSize: '0.65rem' }}>{track.artist}</div>
                    </div>
                    <span style={{
                      background: 'rgba(255,255,255,0.05)', color: '#64748b',
                      fontSize: '0.6rem', padding: '2px 6px', borderRadius: '8px', flexShrink: 0
                    }}>{track.category}</span>
                  </button>
                ))}
              </div>

              {/* Aviso repositorio */}
              <div style={{ padding: '10px 14px', background: 'rgba(251,191,36,0.05)', borderTop: '1px solid rgba(251,191,36,0.1)' }}>
                <p style={{ color: '#64748b', fontSize: '0.65rem', margin: 0, lineHeight: 1.5 }}>
                  📁 Archivos MP3 en: <code style={{ color: gold }}>public/archi-media/audio/</code>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MODO INDICADOR ── */}
        <div style={{
          padding: '6px 14px 8px',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ color: '#334155', fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ARCHI · NUEVA ENERGÍA · 2026
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['mini', 'compact', 'expanded'].map(m => (
              <button key={m} onClick={() => setPlayerMode(m)}
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: playerMode === m ? gold : 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer', padding: 0
                }} />
            ))}
          </div>
        </div>
      </div>
    </PlayerContainer>
  );
}
