import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX,
  Radio, Mic2, Activity, Globe, Zap, Award, Users, Shield,
  MapPin, Youtube, Share2, X, Bot, Map, Disc, Heart,
  Headphones, Music, Antenna, Mic, MonitorPlay, Sparkles, ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';

/* ══════════════════════════════════════════════════════════════════
   SONICEV PORTAL — Producción & Estudio Soberano
   Dominio: sonicev.cl  |  Ruta: /sonicev
   Marca: fondo #050505, acento #ff4d4d
   Recuperado desde estado activo en commit f10bca1 (1 Mayo 2026)
══════════════════════════════════════════════════════════════════ */

const TRACKS = [
  { id: 1, title: 'Todo es Mentira 2025',          artist: 'Sonicev Radio',    file: '/sonicev_radio/todo_es_mentira_2025.mp3',       emoji: '🎙️' },
  { id: 2, title: 'Eres Serena',                   artist: 'Radio VLS',        file: '/music/eres_serena.mp3',                        emoji: '🌊' },
  { id: 3, title: 'Es Amor por La Serena',         artist: 'Radio VLS',        file: '/music/es_amor_por_la_serena.mp3',              emoji: '❤️' },
  { id: 4, title: 'Vals de mis Recuerdos',         artist: 'Archivo VLS',      file: '/music/vals_mis_recuerdos.mp3',                 emoji: '🎻' },
  { id: 5, title: 'Serenito Rap',                  artist: 'VLS Beat',         file: '/music/serenito_rap.mp3',                       emoji: '🎤' },
  { id: 6, title: 'Himno Peregrino (Soberanía)',   artist: 'Estudio Soberano', file: '/peregrino/peregrinos_tema.mp3',                emoji: '🏔️' },
  { id: 7, title: 'Frecuencia Peregrina (Loop)',   artist: 'Radio Peregrino',  file: '/peregrino_radio/peregrinos.mp3',               emoji: '📡' },
  { id: 8, title: 'Cuéntame tus Mentiras',         artist: 'Radio Peregrino',  file: '/peregrino/cuentame_mentiras.mp3',              emoji: '🎵' },
];

const YT_CLIPS = [
  { id: 'jFfuMjdgE6c', title: 'Manolo Pez — Nuevo Peregrino' },
  { id: 'G5V9-TddfR0', title: 'Angelo Escobar — Amapola'     },
  { id: 'rU1WLzwZF_U', title: 'Mona Simona — Los Inicios'    },
  { id: '8jpS-0Q5f10', title: 'Cuecas con Pandero'           },
  { id: 'y2XDTwEI7dU', title: 'El Dúo Cevicho'               },
  { id: 'ftE56z7Ro4c', title: 'Mauricio Redoles I'            },
];

export default function SonicevPortal({ onClose }) {
  const navigate = useNavigate();
  const audioRef  = useRef(null);

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isMuted,      setIsMuted]      = useState(false);
  const [currentIdx,   setCurrentIdx]   = useState(0);
  const [volume,       setVolume]       = useState(0.8);
  const [progress,     setProgress]     = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [activeTab,    setActiveTab]    = useState('playlist');
  const [liked,        setLiked]        = useState({});
  const [isLoading,    setIsLoading]    = useState(true);
  const [bars,         setBars]         = useState(() => Array.from({ length: 28 }, () => Math.random()));

  const track = TRACKS[currentIdx];

  /* ── boot ── */
  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 900); return () => clearTimeout(t); }, []);

  /* ── visualizer ── */
  useEffect(() => {
    if (!isPlaying) return;
    const iv = setInterval(() => setBars(p => p.map(b => Math.max(0.08, Math.min(1, b + (Math.random() - 0.5) * 0.35)))), 75);
    return () => clearInterval(iv);
  }, [isPlaying]);

  /* ── audio helpers ── */
  const doPlay = (idx) => {
    setCurrentIdx(idx);
    setIsPlaying(false);
    setTimeout(() => { audioRef.current?.play().catch(() => {}); setIsPlaying(true); }, 80);
  };
  const togglePlay   = () => { if (!audioRef.current) return; isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(() => {}); setIsPlaying(p => !p); };
  const skipNext     = () => doPlay((currentIdx + 1) % TRACKS.length);
  const skipPrev     = () => doPlay((currentIdx - 1 + TRACKS.length) % TRACKS.length);
  const toggleMute   = () => { if (audioRef.current) audioRef.current.muted = !isMuted; setIsMuted(p => !p); };
  const handleSeek   = (e) => { const pct = +e.target.value; if (audioRef.current?.duration) audioRef.current.currentTime = (pct / 100) * audioRef.current.duration; setProgress(pct); };
  const handleVol    = (e) => { const v = +e.target.value; if (audioRef.current) audioRef.current.volume = v; setVolume(v); };
  const fmt          = (s) => { if (!s || isNaN(s)) return '0:00'; return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`; };

  /* ── loading screen (idéntico al fallback en App.jsx) ── */
  if (isLoading) return (
    <div style={{ background: '#050505', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ textAlign: 'center' }}>
        <Mic size={56} color="#ff4d4d" style={{ marginBottom: '1rem' }} />
        <div style={{ color: '#ff4d4d', fontSize: '2.2rem', fontWeight: 950, letterSpacing: '8px', fontFamily: "'Outfit', system-ui, sans-serif" }}>SONICEV</div>
        <div style={{ color: '#555', fontSize: '0.75rem', marginTop: '8px', letterSpacing: '4px' }}>PRODUCCIÓN · ESTUDIO SOBERANO</div>
      </motion.div>
    </div>
  );

  return (
    <div style={S.root}>
      <SEO title="Sonicev — Producción & Estudio Soberano" description="Estudio de producción y radio soberana de La Serena. Música, podcast y transmisión en vivo." />

      {/* AMBIENT */}
      <div style={S.ambientWrap} aria-hidden>
        <div style={S.glow1} /><div style={S.glow2} />
        <div style={S.scanlines} />
      </div>

      {/* NAV (4 PILARES + MAPA) */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          {[
            { label: 'CITIZENS',     color: '#38bdf8', ev: 'open-smart-citizens'   },
            { label: 'ADMIN',        color: '#10b981', ev: 'open-smart-admin-fixed' },
            { label: 'EVENTS',       color: '#fbbf24', ev: 'open-smart-events'      },
            { label: 'LISTENING',    color: '#ff4d4d', ev: 'open-social-vision'     },
          ].map(p => (
            <button key={p.label} style={{ ...S.navPill, color: p.color }}
              onClick={() => window.dispatchEvent(new CustomEvent(p.ev))}>
              {p.label}
            </button>
          ))}
          <span style={S.navSep} />
          <button style={S.navMap} onClick={() => window.dispatchEvent(new CustomEvent('vls-open-distances'))}>
            <Map size={12} /> MAPA
          </button>
        </div>
        {onClose && (
          <button onClick={onClose} style={S.closeBtn} title="Cerrar Sonicev">
            <X size={18} />
          </button>
        )}
      </nav>

      {/* MAIN GRID */}
      <div style={S.grid}>

        {/* ── LEFT: PLAYER ── */}
        <aside style={S.player}>
          {/* brand */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} style={S.brand}>
            <div style={S.brandIcon}><Mic size={26} color="#ff4d4d" /></div>
            <div>
              <div style={S.brandTitle}>SONICEV</div>
              <div style={S.brandSub}>PRODUCCIÓN · ESTUDIO SOBERANO</div>
            </div>
          </motion.div>

          {/* visualizer */}
          <div style={S.vizWrap} aria-hidden>
            {bars.map((h, i) => (
              <motion.div key={i} animate={{ scaleY: isPlaying ? h : 0.1 }} transition={{ duration: 0.075 }}
                style={{ ...S.vizBar, background: `hsl(${350 + i * 0.5}, 90%, ${44 + h * 24}%)`, opacity: 0.65 + h * 0.35 }} />
            ))}
          </div>

          {/* track info */}
          <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={S.trackInfo}>
            <div style={{ fontSize: '3.2rem', filter: 'drop-shadow(0 0 14px rgba(255,77,77,0.5))' }}>{track.emoji}</div>
            <div style={S.trackTitle}>{track.title}</div>
            <div style={S.trackArtist}>{track.artist}</div>
          </motion.div>

          {/* progress */}
          <div style={{ width: '100%' }}>
            <input type="range" min={0} max={100} value={progress} onChange={handleSeek} style={S.slider} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={S.time}>{fmt(audioRef.current?.currentTime)}</span>
              <span style={S.time}>{fmt(duration)}</span>
            </div>
          </div>

          {/* controls */}
          <div style={S.controls}>
            <button onClick={skipPrev} style={S.ctrlBtn}><SkipBack size={20} /></button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlay} style={S.playBtn}>
              {isPlaying ? <Pause size={26} fill="white" /> : <Play size={26} fill="white" />}
            </motion.button>
            <button onClick={skipNext} style={S.ctrlBtn}><SkipForward size={20} /></button>
            <button onClick={toggleMute} style={{ ...S.ctrlBtn, color: isMuted ? '#ff4d4d' : '#777' }}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <Volume2 size={13} color="#555" />
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVol} style={{ ...S.slider, flex: 1 }} />
            <span style={{ ...S.time, minWidth: 28 }}>{Math.round(volume * 100)}%</span>
          </div>

          {/* AUDIO ELEMENT */}
          <audio ref={audioRef} src={track.file}
            onTimeUpdate={() => { if (audioRef.current?.duration) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100); }}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
            onEnded={skipNext} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

          {/* RDMLS live */}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
            onClick={() => window.dispatchEvent(new CustomEvent('vls-start-radio'))} style={S.liveBtn}>
            <span style={S.liveDot} /><Radio size={15} /> RDMLS EN VIVO
          </motion.button>
        </aside>

        {/* ── RIGHT: CONTENT ── */}
        <main style={S.content}>

          {/* tabs */}
          <div style={S.tabs}>
            {[
              { key: 'playlist', icon: <Disc size={13} />,       label: 'PLAYLIST'   },
              { key: 'videos',   icon: <MonitorPlay size={13} />, label: 'VIDEOS'     },
              { key: 'live',     icon: <Mic2 size={13} />,        label: 'EN VIVO'    },
            ].map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                style={{ ...S.tab, ...(activeTab === t.key ? S.tabOn : {}) }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          {/* PLAYLIST TAB */}
          {activeTab === 'playlist' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {TRACKS.map((tr, idx) => (
                <motion.div key={tr.id} whileHover={{ x: 5 }}
                  onClick={() => doPlay(idx)}
                  style={{ ...S.trackRow, ...(currentIdx === idx ? S.trackRowOn : {}) }}>
                  <div style={S.trackNum}>
                    {currentIdx === idx && isPlaying
                      ? <motion.div animate={{ scale: [1, 1.35, 1] }} transition={{ repeat: Infinity, duration: 0.7 }}><Music size={15} color="#ff4d4d" /></motion.div>
                      : <span style={{ color: '#444', fontSize: '0.72rem' }}>{idx + 1}</span>}
                  </div>
                  <span style={{ fontSize: '1.3rem' }}>{tr.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '0.83rem', color: currentIdx === idx ? '#ff4d4d' : '#ddd' }}>{tr.title}</div>
                    <div style={{ fontSize: '0.67rem', color: '#555', marginTop: '2px' }}>{tr.artist}</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); setLiked(p => ({ ...p, [tr.id]: !p[tr.id] })); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <Heart size={15} fill={liked[tr.id] ? '#ff4d4d' : 'none'} color={liked[tr.id] ? '#ff4d4d' : '#444'} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* VIDEOS TAB */}
          {activeTab === 'videos' && (
            <div style={S.videosGrid}>
              {YT_CLIPS.map(v => (
                <motion.div key={v.id} whileHover={{ y: -5 }}
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${v.id}`, '_blank')}
                  style={S.videoCard}>
                  <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} loading="lazy" />
                    <div style={S.videoOverlay}><div style={S.videoPlayCircle}><Play size={18} color="white" fill="white" /></div></div>
                    <div style={S.ytBadge}><Youtube size={9} /> YT</div>
                  </div>
                  <div style={{ padding: '10px 12px', fontSize: '0.75rem', fontWeight: 800, color: '#ccc', lineHeight: 1.3 }}>{v.title}</div>
                </motion.div>
              ))}
            </div>
          )}

          {/* EN VIVO TAB */}
          {activeTab === 'live' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={S.liveCircle}>
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.1 }}
                    style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff4d4d' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 950, fontSize: '1.05rem', color: 'white' }}>RDMLS EN VIVO</div>
                  <div style={{ fontSize: '0.65rem', color: '#ff4d4d', fontWeight: 700, letterSpacing: '2px' }}>SEÑAL ACTIVA · 24/7</div>
                </div>
              </div>
              <p style={{ color: '#777', fontSize: '0.78rem', lineHeight: 1.7, margin: 0 }}>
                Radio Digital Municipal de La Serena — programación en vivo con música regional, noticias vecinales y
                cobertura cultural de la Región de Coquimbo.
              </p>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => window.dispatchEvent(new CustomEvent('vls-start-radio'))} style={S.bigLiveBtn}>
                <Radio size={20} /> INICIAR SEÑAL EN VIVO
              </motion.button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: <MapPin size={13} />,     text: 'La Serena · Región de Coquimbo' },
                  { icon: <Globe size={13} />,      text: 'Streaming Digital 24/7'          },
                  { icon: <Headphones size={13} />, text: 'Calidad HD · Señal continua'     },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555', fontSize: '0.75rem', fontWeight: 600 }}>
                    {item.icon}{item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer style={S.footer}>
        <span style={{ fontSize: '0.58rem', color: '#2a2a2a', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
          © 2026 SONICEV · Producción & Estudio Soberano · <span style={{ color: '#ff4d4d' }}>sonicev.cl</span>
        </span>
        <div style={{ display: 'flex', gap: '14px' }}>
          <Zap size={14} color="#ff4d4d" /><Globe size={14} color="#38bdf8" /><Headphones size={14} color="#10b981" />
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;800;900&display=swap');
        input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;width:100%}
        input[type=range]::-webkit-slider-runnable-track{height:3px;border-radius:3px;background:rgba(255,77,77,0.18)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:#ff4d4d;margin-top:-5px;cursor:pointer}
      `}</style>
    </div>
  );
}

/* ── STYLES ─────────────────────────────────────────────────────── */
const S = {
  root: { background: '#050505', color: '#f0f0f0', fontFamily: "'Outfit', system-ui, sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' },
  ambientWrap: { position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' },
  glow1: { position: 'absolute', top: '-15%', right: '-8%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,77,0.06) 0%, transparent 70%)' },
  glow2: { position: 'absolute', bottom: '-10%', left: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,77,0.04) 0%, transparent 70%)' },
  scanlines: { position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(transparent, transparent 3px, rgba(255,77,77,0.012) 3px, rgba(255,77,77,0.012) 4px)' },

  nav: { position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 20px', borderBottom: '1px solid rgba(255,77,77,0.08)', background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(20px)' },
  navInner: { display: 'flex', gap: '4px', alignItems: 'center', background: 'rgba(15,15,15,0.7)', padding: '5px 12px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' },
  navPill: { background: 'transparent', border: 'none', fontSize: '0.58rem', fontWeight: 900, letterSpacing: '1px', padding: '7px 9px', cursor: 'pointer', borderRadius: '20px' },
  navSep: { display: 'inline-block', width: '1px', height: '16px', background: 'rgba(255,255,255,0.07)', margin: '0 4px' },
  navMap: { background: 'rgba(56,189,248,0.12)', border: 'none', color: '#38bdf8', padding: '6px 10px', borderRadius: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.58rem', fontWeight: 900 },
  closeBtn: { position: 'absolute', right: '18px', background: 'rgba(255,77,77,0.12)', border: '1px solid rgba(255,77,77,0.25)', color: '#ff4d4d', padding: '7px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center' },

  grid: { position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexWrap: 'wrap', minHeight: 0 },

  player: { width: '320px', minWidth: '280px', flexShrink: 0, padding: '28px 22px', borderRight: '1px solid rgba(255,77,77,0.08)', display: 'flex', flexDirection: 'column', gap: '18px', background: 'rgba(5,5,5,0.5)' },
  brand: { display: 'flex', alignItems: 'center', gap: '14px' },
  brandIcon: { width: '50px', height: '50px', borderRadius: '14px', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(255,77,77,0.15)' },
  brandTitle: { fontSize: '1.6rem', fontWeight: 950, letterSpacing: '4px', background: 'linear-gradient(90deg,#ff4d4d,#ff7c7c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  brandSub: { fontSize: '0.55rem', color: '#444', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' },

  vizWrap: { display: 'flex', alignItems: 'flex-end', gap: '3px', height: '52px', padding: '0 2px', background: 'rgba(255,77,77,0.03)', borderRadius: '10px', border: '1px solid rgba(255,77,77,0.06)' },
  vizBar: { flex: 1, borderRadius: '2px 2px 0 0', minHeight: '3px', transformOrigin: 'bottom' },

  trackInfo: { textAlign: 'center', padding: '6px 0' },
  trackTitle: { fontSize: '1rem', fontWeight: 900, color: 'white', margin: '10px 0 4px', letterSpacing: '-0.3px' },
  trackArtist: { fontSize: '0.7rem', color: '#555', fontWeight: 600, letterSpacing: '1px' },

  slider: { width: '100%', height: '3px', cursor: 'pointer' },
  time: { fontSize: '0.62rem', color: '#3a3a3a', fontWeight: 700 },

  controls: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' },
  ctrlBtn: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: '#666', padding: '9px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' },
  playBtn: { background: 'linear-gradient(135deg,#ff4d4d,#cc0000)', border: 'none', color: 'white', width: '58px', height: '58px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(255,77,77,0.4)' },

  liveBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,77,77,0.08)', border: '1px solid rgba(255,77,77,0.2)', color: '#ff4d4d', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px', padding: '12px', borderRadius: '12px', cursor: 'pointer', textTransform: 'uppercase' },
  liveDot: { display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#ff4d4d', animation: 'pulse 1s infinite' },

  content: { flex: 1, minWidth: '260px', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' },

  tabs: { display: 'flex', gap: '6px', background: 'rgba(10,10,10,0.6)', padding: '5px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)', width: 'fit-content' },
  tab: { background: 'transparent', border: 'none', color: '#444', padding: '8px 16px', borderRadius: '9px', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '1.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.2s' },
  tabOn: { background: 'rgba(255,77,77,0.12)', color: '#ff4d4d', border: '1px solid rgba(255,77,77,0.2)' },

  trackRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '12px', cursor: 'pointer', border: '1px solid transparent', background: 'rgba(255,255,255,0.01)', transition: 'all 0.2s' },
  trackRowOn: { background: 'rgba(255,77,77,0.07)', border: '1px solid rgba(255,77,77,0.18)' },
  trackNum: { width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  videosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px,1fr))', gap: '14px' },
  videoCard: { background: 'rgba(12,12,12,0.6)', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'all 0.2s' },
  videoOverlay: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' },
  videoPlayCircle: { width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,77,77,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(255,77,77,0.4)' },
  ytBadge: { position: 'absolute', top: '7px', right: '7px', background: '#cc0000', color: 'white', fontSize: '0.52rem', fontWeight: 900, padding: '3px 6px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '3px' },

  liveCircle: { width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bigLiveBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(135deg,#ff4d4d,#cc0000)', border: 'none', color: 'white', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '2px', padding: '16px 24px', borderRadius: '14px', cursor: 'pointer', textTransform: 'uppercase', boxShadow: '0 0 28px rgba(255,77,77,0.35)' },

  footer: { position: 'relative', zIndex: 1, padding: '14px 22px', borderTop: '1px solid rgba(255,77,77,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(5,5,5,0.8)' },
};
