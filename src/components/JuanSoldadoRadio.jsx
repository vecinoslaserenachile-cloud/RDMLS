import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Radio, Music, Sparkles } from 'lucide-react';

// ── Playlist con nombres contextuales temáticos de la Leyenda ────────────────
const PLAYLIST = [
  { id: 1, file: '/media/juansoldado/radio/track01.mp3', led1: 'JUAN SOLDADO', led2: 'EL CERRO BLANCO', artist: 'Voz del Pueblo — La Serena' },
  { id: 2, file: '/media/juansoldado/radio/track02.mp3', led1: 'REDENCIÓN', led2: 'CERRO DE LOS VIZCAÍNOS', artist: 'Tradición Oral Elquina' },
  { id: 3, file: '/media/juansoldado/radio/track03.mp3', led1: 'JUAN DÍAZ', led2: 'EL SOLDADO PROSCRITO', artist: 'Cantos de la Pampa' },
  { id: 4, file: '/media/juansoldado/radio/track04.mp3', led1: 'REMASTERED', led2: 'LUCES DEL ELQUI', artist: 'Archivo VLS — 2026' },
  { id: 5, file: '/media/juansoldado/radio/track05.mp3', led1: 'REMASTERED II', led2: 'LA CIUDAD PERDIDA', artist: 'Leyenda Serenense' },
  { id: 6, file: '/media/juansoldado/radio/track06.mp3', led1: 'CERROS DE COQUIMBO', led2: 'VIERNES SANTO', artist: 'Coplas del Norte Chico' },
  { id: 7, file: '/media/juansoldado/radio/track07.mp3', led1: 'MAL HERIDO', led2: 'CAMINO A LA CIMA', artist: 'Décimas del Elqui' },
  { id: 8, file: '/media/juansoldado/radio/track08.mp3', led1: 'MAL HERIDO RMST', led2: 'HÁBITO DE MONJE', artist: 'Melodías de Redención' },
  { id: 9, file: '/media/juansoldado/radio/track09.mp3', led1: 'MASHUP CERROS', led2: 'EL SANTO POPULAR', artist: 'Fusión Histórica — VLS' },
  { id: 10, file: '/media/juansoldado/radio/track10_joven.mp3', led1: 'JOVEN JUAN SOLDADO', led2: 'LOS INICIOS', artist: 'VecinosSmart' },
  { id: 11, file: '/media/juansoldado/radio/track11_laserena.mp3', led1: 'JUANITO LA SERENA', led2: 'EL TRIBUTO', artist: 'VecinosSmart' },
  { id: 12, file: '/media/juansoldado/radio/track12_soldado.mp3', led1: 'JUANITO SOLDADO', led2: 'EL CLÁSICO', artist: 'VecinosSmart' },
  { id: 13, file: '/media/juansoldado/radio/track13_wrangler1.mp3', led1: 'WRANGLER (VOL. 1)', led2: 'COUNTRY ELQUI', artist: 'nicerslides227' },
  { id: 14, file: '/media/juansoldado/radio/track14_wrangler.mp3', led1: 'JUANITO WRANGLER', led2: 'ACOUSTIC', artist: 'nicerslides227' },
];

// ── LED Strip: scrolling text ticker (Anti-Gravity Style) ──────────────────────
function LEDTicker({ text, color = '#22d3ee', speed = 40 }) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const textWidth = text.length * 10;

  useEffect(() => {
    let frame;
    let pos = 0;
    const animate = () => {
      pos -= 0.6;
      const containerW = containerRef.current?.offsetWidth || 300;
      if (pos < -textWidth) pos = containerW;
      setOffset(pos);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [text, textWidth]);

  return (
    <div ref={containerRef} style={{
      overflow: 'hidden', width: '100%', height: '32px',
      background: 'rgba(0,0,0,0.3)', borderTop: `1px solid ${color}22`, borderBottom: `1px solid ${color}22`,
      display: 'flex', alignItems: 'center', position: 'relative'
    }}>
      <span style={{
        position: 'absolute', whiteSpace: 'nowrap', transform: `translateX(${offset}px)`,
        fontFamily: '"Outfit", sans-serif', fontSize: '0.8rem', fontWeight: '900',
        color, letterSpacing: '4px', textShadow: `0 0 15px ${color}88`
      }}>
        {text} ◆ {text} ◆ {text}
      </span>
    </div>
  );
}

// ── Spectrum Bars (Anti-Gravity Matrix) ──────────────────────────────────────
function SpectrumLEDs({ levels, color, isPlaying }) {
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '80px', padding: '0 20px' }}>
      {levels.map((lvl, i) => {
        const bars = Math.round((lvl / 100) * 14);
        const cols = ['#ef4444', '#ef4444', '#f97316', '#f97316', '#eab308', '#eab308', '#22c55e', '#22c55e', '#22c55e', '#22d3ee', '#22d3ee', '#0ea5e9', '#0ea5e9', '#a78bfa'];
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '3px', flex: 1 }}>
            {[...Array(14)].map((_, j) => (
              <div key={j} style={{
                width: '100%', height: '4px', borderRadius: '2px',
                background: j < bars ? cols[j] : 'rgba(255,255,255,0.02)',
                boxShadow: j < bars ? `0 0 10px ${cols[j]}66` : 'none',
                transition: 'background 0.1s'
              }} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function JuanSoldadoRadio({ autoPlay = true }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [spectrum, setSpectrum] = useState(Array(16).fill(5));

  const audioRef = useRef(null);
  const animRef = useRef(null);
  const hasStarted = useRef(false);

  const track = PLAYLIST[currentIdx];

  // ── Synthetic spectrum (runs always when playing) ───────────────────────────
  const runSyntheticSpectrum = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const tick = () => {
      if (!audioRef.current || audioRef.current.paused) return;
      const t = Date.now() / 150;
      const vol = isMuted ? 0 : volume;
      const volFactor = Math.max(0.2, vol * 1.5);
      const newSpec = Array.from({ length: 16 }, (_, i) => {
        const wave = Math.abs(Math.sin(t + i * 0.4) * 60 + Math.cos(t * 0.6 + i * 0.25) * 40);
        return Math.min(100, wave * volFactor + Math.random() * 15);
      });
      setSpectrum(newSpec);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, [volume, isMuted]);

  useEffect(() => {
    if (!isPlaying) {
      const decay = setInterval(() => {
        setSpectrum(prev => prev.map(v => Math.max(0, v * 0.85)));
      }, 60);
      return () => clearInterval(decay);
    } else {
      runSyntheticSpectrum();
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, runSyntheticSpectrum]);

  const loadAndPlay = useCallback(async (idx) => {
    if (!audioRef.current) return;
    try {
      // If there's an ongoing play, it will be interrupted by the src change, 
      // but we catch it in the catch block of the previous play if applicable.
      const t = PLAYLIST[idx];
      audioRef.current.pause();
      audioRef.current.src = t.file;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.load();
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        runSyntheticSpectrum();
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.warn("[VLS Radio] Playback error:", error);
      }
      setIsPlaying(false);
    }
  }, [volume, isMuted, runSyntheticSpectrum]);

  useEffect(() => {
    if (!autoPlay) return;
    const events = ['click', 'touchstart', 'keydown'];
    const tryPlay = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;
      loadAndPlay(0);
      events.forEach(e => window.removeEventListener(e, tryPlay));
    };
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[0].file;
      audioRef.current.volume = volume;
      audioRef.current.load();
    }
    events.forEach(e => window.addEventListener(e, tryPlay, { once: true }));
    return () => events.forEach(e => window.removeEventListener(e, tryPlay));
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          runSyntheticSpectrum();
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn("[VLS Radio] Manual play error:", error);
        }
      }
    }
  };

  const skip = (dir) => {
    const next = (currentIdx + dir + PLAYLIST.length) % PLAYLIST.length;
    setCurrentIdx(next);
    loadAndPlay(next);
  };

  const onTrackEnd = () => {
    const next = (currentIdx + 1) % PLAYLIST.length;
    setCurrentIdx(next);
    loadAndPlay(next);
  };

  const onTrackClick = (idx) => {
    setCurrentIdx(idx);
    loadAndPlay(idx);
  };

  const ledScrollText = isPlaying
    ? `★ REPRODUCIENDO: ${track.led1} — ${track.led2} — ${track.artist} ★`
    : `◆ FRECUENCIA JUAN SOLDADO — SINCRONIZACIÓN PATRIMONIAL — LA SERENA ◆`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(35px)',
        borderRadius: '3rem',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        width: '100%',
        marginBottom: '4rem',
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* ── Station Header (Extremely Spacious) ───────────────────────────── */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        padding: '2.5rem 3.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '12px', height: '12px', borderRadius: '50%',
            background: isPlaying ? '#22d3ee' : 'rgba(255,255,255,0.1)',
            boxShadow: isPlaying ? '0 0 20px #22d3ee' : 'none',
            animation: isPlaying ? 'pulse-led 1.2s infinite' : 'none'
          }} />
          <span style={{ color: 'rgba(255,255,255,1)', fontWeight: '900', letterSpacing: '6px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
            JUAN SOLDADO AUDIO FEED
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#38bdf8' }}>
          <Sparkles size={18} className="animate-pulse" />
          <span style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '3px' }}>v2.0 MASTER SYNC</span>
        </div>
      </div>

      <LEDTicker text={ledScrollText} color={isPlaying ? '#22d3ee' : 'rgba(255,255,255,0.2)'} />

      {/* ── Main content (Generous Padding) ─────────────────────────────── */}
      <div style={{ padding: '3.5rem' }}>

        {/* Info Display (Glass Nested) */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)', borderRadius: '2rem', padding: '3rem',
          marginBottom: '2.5rem', border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexDirection: 'column', gap: '12px',
          boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.02)'
        }}>
          <div style={{ fontSize: '2.2rem', fontWeight: '950', color: 'white', tracking: 'tight', lineHeight: '1' }}>
            {track.led1}
          </div>
          <div style={{ fontSize: '1rem', color: 'white/60', fontWeight: '600', letterSpacing: '1px' }}>
            {track.led2}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '900', marginTop: '15px', letterSpacing: '3px', textTransform: 'uppercase', opacity: 0.8 }}>
            COORDENADAS: {track.artist}
          </div>
        </div>

        {/* Visualizer (Spacious Matrix) */}
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '2rem', overflow: 'hidden', marginBottom: '3rem', border: '1px solid rgba(255,255,255,0.02)', padding: '20px 0' }}>
          <SpectrumLEDs levels={spectrum} isPlaying={isPlaying} />
        </div>

        {/* ── Controls (Anti-Gravity Floating) ────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'space-between', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button onClick={() => skip(-1)} style={ctrlBtn()}>
              <SkipBack size={20} color="white" />
            </button>
            <button
              onClick={togglePlay}
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: isPlaying
                  ? 'linear-gradient(135deg, #a855f7, #6d28d9)'
                  : 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isPlaying
                  ? '0 15px 35px rgba(168,85,247,0.4)'
                  : '0 15px 35px rgba(56,189,248,0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {isPlaying
                ? <Pause size={30} color="white" />
                : <Play size={30} color="white" style={{ marginLeft: '4px' }} />}
            </button>
            <button onClick={() => skip(1)} style={ctrlBtn()}>
              <SkipForward size={20} color="white" />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, maxWidth: '280px', padding: '0 20px' }}>
            <button onClick={() => setIsMuted(m => !m)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: isMuted ? 0.3 : 0.8 }}>
              {isMuted ? <VolumeX size={24} color="#ef4444" /> : <Volume2 size={24} color="#38bdf8" />}
            </button>
            <input
              type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
              onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
              style={{ flex: 1, accentColor: '#38bdf8', cursor: 'pointer', height: '4px' }}
            />
          </div>
        </div>

        {/* ── Playlist (Floating List) ──────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '350px', overflowY: 'auto' }} className="custom-scrollbar">
          {PLAYLIST.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => onTrackClick(i)}
              whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.06)' }}
              style={{
                background: i === currentIdx
                  ? 'rgba(56, 189, 248, 0.1)'
                  : 'rgba(255, 255, 255, 0.02)',
                border: i === currentIdx
                  ? '1px solid rgba(56, 189, 248, 0.3)'
                  : '1px solid rgba(255,255,255,0.03)',
                borderRadius: '1.5rem',
                padding: '1.2rem 2rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '20px',
                textAlign: 'left', transition: 'all 0.2s'
              }}
            >
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: i === currentIdx ? '#38bdf8' : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {i === currentIdx && isPlaying
                  ? <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'pulse-led 0.6s infinite' }} />
                  : <Music size={14} color={i === currentIdx ? 'white' : 'rgba(255,255,255,0.2)'} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '1rem', fontWeight: '800', tracking: '0.5px',
                  color: i === currentIdx ? 'white' : 'rgba(255,255,255,0.6)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {t.led1}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '4px', fontWeight: 'bold' }}>{t.artist}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: i === currentIdx ? '#38bdf8' : 'rgba(255,255,255,0.1)', fontWeight: '950' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        onEnded={onTrackEnd}
        onPlay={() => { setIsPlaying(true); runSyntheticSpectrum(); }}
        onPause={() => setIsPlaying(false)}
        preload="auto"
      />

      <style>{`
        @keyframes pulse-led { 0%,100% { opacity:1; scale:1; } 50% { opacity:0.4; scale:0.8; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(56, 189, 248, 0.2); border-radius: 10px; }
      `}</style>
    </motion.div>
  );
}

function ctrlBtn() {
  return {
    width: '48px', height: '48px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  };
}
