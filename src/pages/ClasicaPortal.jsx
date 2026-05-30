import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Compass, Globe, Zap, Calendar, ArrowDown, 
  Share2, Activity, Shield, Target,
  Cpu, Brain, Layers, Info, Monitor, Radio,
  Users, Crosshair, Database, Server, Type, Play, Headphones, Music, Mic2, Disc, Instagram, Youtube, Pause, Volume2, Lightbulb
} from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';

// ── VUMETER PARA CLÁSICA ──────────────────────────────────────────────────────
const VUMeterClasica = ({ isPlaying, volume, backlight }) => {
  const [needlePos, setNeedlePos] = useState(-55);
  useEffect(() => {
    let interval;
    if (isPlaying && volume > 0) {
      interval = setInterval(() => {
        const jitter = (Math.random() - 0.5) * 12;
        const target = (volume * 1.1) + jitter - 55;
        setNeedlePos(Math.min(Math.max(target, -60), 60));
      }, 120);
    } else { setNeedlePos(-55); }
    return () => clearInterval(interval);
  }, [isPlaying, volume]);

  return (
    <div style={{ width: '150px', height: '100px', background: backlight ? '#450a0a' : '#1a0d0d', border: '5px solid #991b1b', borderRadius: '12px', position: 'relative', overflow: 'hidden', boxShadow: backlight ? '0 0 40px rgba(153, 27, 27, 0.4), inset 0 0 20px rgba(0,0,0,0.3)' : 'inset 0 0 15px rgba(0,0,0,0.5)', transition: 'background 0.8s, box-shadow 0.8s' }}>
      <div style={{ position: 'absolute', bottom: '15px', left: '15px', fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>HI_RES ALPHA</div>
      <div style={{ position: 'absolute', bottom: '-5px', left: '50%', width: '2px', height: '110%', background: '#ff3131', transformOrigin: 'bottom center', transform: `rotate(${needlePos}deg)`, transition: 'transform 0.2s cubic-bezier(0.1, 0, 0.2, 1)', zIndex: 10, boxShadow: '0 0 8px rgba(255,0,0,0.4)' }} />
      <div style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', width: '35px', height: '35px', background: '#3b0d0d', borderRadius: '50%', zIndex: 11 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)', zIndex: 12, pointerEvents: 'none' }} />
    </div>
  );
};

const CLASICA_SECTIONS = [
  { id: 'master', label: 'SALA MAESTRA', icon: Disc, title: 'REPRODUCTOR_HI_FI_VLS' },
  { id: 'curator', label: 'ESCENA CLÁSICA', icon: Youtube, title: 'CURADURÍA_AUDIOVISUAL_VLS' },
  { id: 'maestros', label: 'MAESTROS', icon: Users, title: 'TALENTO_Y_CONCIERTOS' },
  { id: 'social', label: 'SOCIAL', icon: Instagram, title: 'UNIQUEPIECE_CULTURA' }
];

export default function ClasicaPortal({ onClose = () => window.location.href = '/' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('master');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [backlight, setBacklight] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Simulación de conexión real:
    // if(!isPlaying) audioRef.current.play(); else audioRef.current.pause();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#020617', zIndex: 9999999,
      display: 'flex', flexDirection: 'column', color: 'white', fontFamily: '"Outfit", sans-serif', overflow: 'hidden'
    }}>
      <AnimatePresence>{!isLoaded && <LoadingScreen />}</AnimatePresence>
      <header style={{ 
        height: '80px', background: 'rgba(2, 6, 23, 0.7)', borderBottom: '1px solid rgba(153, 27, 27, 0.4)', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2.5rem', zIndex: 500 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ padding: '8px 15px', background: 'rgba(153, 27, 27, 0.3)', border: '1px solid #991b1b', borderRadius: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 950, letterSpacing: '4px' }}>VLS_CLASSICAL_UNIT</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <button onClick={() => setBacklight(!backlight)} style={{ background: backlight ? '#991b1b' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '12px', cursor: 'pointer', transition: '0.5s' }}>
                <Lightbulb size={20} />
             </button>
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '10px 25px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Volume2 size={18} color="#991b1b" />
                <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} style={{ width: '150px', accentColor: '#991b1b', cursor: 'pointer' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 950, width: '40px', color: '#ef4444' }}>{volume}%</span>
             </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.6rem 2.5rem', borderRadius: '12px', fontWeight: '950', cursor: 'pointer' }}>CERRAR PORTAL</button>
      </header>

      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', position: 'relative', zIndex: 100, overflowY: 'auto', overflowX: 'hidden' }}>
        <aside style={{ flex: '1 1 320px', minWidth: '280px', maxWidth: '400px', background: 'rgba(2, 6, 23, 0.85)', padding: '2.5rem', borderRight: '1px solid rgba(153, 27, 27, 0.2)' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.6rem', color: '#ef4444', fontWeight: 900, letterSpacing: '4px' }}>ALMA ETERNA v4.2</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, lineHeight: 0.9, marginTop: '10px' }}>RADIO <br /><span style={{ color: '#ef4444' }}>CLÁSICA</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CLASICA_SECTIONS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(153, 27, 27, 0.15)' : 'transparent', border: activeTab === tab.id ? '1px solid #991b1b' : '1px solid transparent', color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.3)', padding: '1.25rem 1.5rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textAlign: 'left' }}>
                <tab.icon size={20} color={activeTab === tab.id ? '#ef4444' : 'currentColor'} />
                <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main style={{ flex: '2 1 600px', minWidth: '300px', padding: '2rem 5%', overflowY: 'auto', overflowX: 'hidden' }}>
           <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {activeTab === 'master' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '4rem' }}>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <VUMeterClasica isPlaying={isPlaying} volume={volume} backlight={backlight} />
                        <VUMeterClasica isPlaying={isPlaying} volume={volume} backlight={backlight} />
                    </div>
                    <div style={{ background: 'rgba(153, 27, 27, 0.05)', padding: '3rem 10%', borderRadius: '60px', border: '1px solid rgba(153, 27, 27, 0.2)', textAlign: 'center', width: '100%', maxWidth: '900px', position: 'relative' }}>
                        {isPlaying && (
                           <iframe width="1" height="1" style={{ opacity: 0, position: 'absolute' }} src="https://www.youtube.com/embed/F9cwSTOa_mg?list=PLfGRfgb645SPXkITFgQZZscqf58h_QCLl&autoplay=1" allow="autoplay; encrypted-media" frameBorder="0" />
                        )}
                        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '2px', background: 'linear-gradient(to right, transparent, rgba(239, 68, 68, 0.3), transparent)' }} />
                        <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)', fontWeight: 950, letterSpacing: '-2px', marginBottom: '1rem' }}>REPRODUCIENDO: <span style={{ color: '#ef4444' }}>HI-RES CLASSICAL STREAM</span></h3>
                        <p style={{ fontSize: 'clamp(0.7rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.4)', fontWeight: 900, letterSpacing: '6px', marginBottom: '4rem' }}>LOSSLESS_CRYSTAL_AUDIO</p>
                        <button 
                          onClick={togglePlayback} 
                          style={{ width: '120px', height: '120px', borderRadius: '50%', background: isPlaying ? '#ef4444' : 'white', color: isPlaying ? 'white' : 'black', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s', boxShadow: isPlaying ? '0 0 50px rgba(239, 68, 68, 0.5)' : 'none' }}
                        >
                            {isPlaying ? <Pause size={50} fill="currentColor" /> : <Play size={50} fill="currentColor" style={{ marginLeft: '10px' }} />}
                        </button>
                    </div>
                </div>
              )}
              {activeTab === 'curator' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2.5rem' }}>
                  {[
                    'z8DBajzz5DA',
                    'BIZB0p7sfjE',
                    'ukOt-iGCW0w',
                    'TiLN3TsUECg',
                    'goqUUfMpuJ0',
                    'WNPM7UmWg1o',
                    'neAmnGhL2zQ'
                  ].map(vid => (
                    <div key={vid} style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '25px', overflow: 'hidden', border: '1px solid rgba(153, 27, 27, 0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                      <iframe 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src={`https://www.youtube.com/embed/${vid}`}
                        title="VLS Classical Record"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
