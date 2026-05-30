import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls, Environment, ContactShadows, Html, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Shield, Monitor, Radio, Play, Headphones, Box, FileText, Pause, Volume2, Lightbulb, BookOpen, Video, Eye, Database, Cpu, Activity, Download, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

// ── BANCO DE DATOS VALLENAR (INTELIGENCIA) ──────────────────────────────────
const VALLENAR_RESOURCES = {
  models: [
    { id: 'blas', name: 'WIZARD_BLAS_VLS', path: '/media/vallenar/blas_wizard_draco.glb' },
    { id: 'rufino', name: 'MINER_RUFINO_VLS', path: '/media/vallenar/rufino_miner_draco.glb' },
    { id: 'rosay', name: 'DOÑA_ROSA_VLS', path: '/media/vallenar/rosa_vineyard_draco.glb' }
  ],
  audio: [
    { id: 'vt1', title: 'Vallenar Tierra Querida (Gala)', file: '/media/vallenar/radio/Vallenar Tierra muy Querida.mp3' },
    { id: 'vt2', title: 'Valle del Huasco (Aire 1)', file: '/media/vallenar/radio/Vallenar Tierra Querida (1).mp3' },
    { id: 'vt3', title: 'Valle del Huasco (Aire 2)', file: '/media/vallenar/radio/Vallenar Tierra Querida (2).mp3' },
    { id: 'vt4', title: 'Atacama Místico (Sesión 3)', file: '/media/vallenar/radio/Vallenar Tierra Querida (3).mp3' },
    { id: 'vt5', title: 'Desierto Florido (Sesión 4)', file: '/media/vallenar/radio/Vallenar Tierra Querida (4).mp3' },
    { id: 'vt6', title: 'Relatos Minerales (Sesión 5)', file: '/media/vallenar/radio/Vallenar Tierra Querida (5).mp3' },
    { id: 'vt7', title: 'Vallenar en la Piel (Sesión 6)', file: '/media/vallenar/radio/Vallenar Tierra Querida (6).mp3' },
    { id: 'vt8', title: 'Tierra Querida (VLS Mashup A)', file: '/media/vallenar/radio/Vallenar Tierra Querida x Vallenar Tierra Querida (Mashup) (1).mp3' },
    { id: 'vt9', title: 'Tierra Querida (VLS Mashup B)', file: '/media/vallenar/radio/Vallenar Tierra Querida x Vallenar Tierra Querida (Mashup) (2).mp3' },
    { id: 'vt10', title: 'Tierra Querida (Mashup Final)', file: '/media/vallenar/radio/Vallenar Tierra Querida x Vallenar Tierra Querida (Mashup).mp3' },
    { id: 'vt11', title: 'Vallenar Tierra Querida (Original)', file: '/media/vallenar/radio/Vallenar Tierra Querida.mp3' }
  ],
  docs: [
    { id: 'bible', title: 'VALLENAR_DESIGN_BIBLE', file: '/media/vallenar/Vallenar_Design_Bible.pdf', summary: 'Criterios estéticos federales para el portal Vallenar.' },
    { id: 'arche', title: 'ATACAMA_ARCHETYPES', file: '/media/vallenar/Atacama_Archetypes.pdf', summary: 'Investigación antropológica regional.' },
    { id: 'alma', title: 'EL_ALMA_DE_VALLENAR', file: '/media/vallenar/El_Alma_de_Vallenar.pdf', summary: 'Crónica literaria sobre el valle de Atacama.' },
    { id: 'mitico', title: 'VALLENAR_MÍTICO', file: '/media/vallenar/Vallenar_Mitico.pdf', summary: 'Guía de leyendas y folclore regional.' }
  ],
  video: { id: 'clip1', title: 'VALLENAR_MITICO_RENDER', file: '/media/vallenar/VallenarMitico.mp4' }
};

const ModelAutoplay = ({ path }) => {
  const { scene } = useGLTF(path);
  return <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}><primitive object={scene} scale={2.8} position={[0, -1, 0]} /></Float>;
};

export default function VallenarPortal({ onClose }) {
  const navigate = useNavigate();
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    } else {
      navigate('/');
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('models');
  const [selectedModel, setSelectedModel] = useState(VALLENAR_RESOURCES.models[0]);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [backlight, setBacklight] = useState(false);
  
  // EQ Real State
  const [eq, setEq] = useState({ low: 4, mid: 2, high: 8 });
  const [viewerUrl, setViewerUrl] = useState(null);
  const [viewerType, setViewerType] = useState('pdf');

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const filtersRef = useRef({});

  useEffect(() => { 
    setIsLoaded(true); 
    document.body.style.overflow = 'hidden'; 
    return () => { 
        document.body.style.overflow = ''; 
        if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
        if (audioCtxRef.current) audioCtxRef.current.close().catch(e => console.error(e));
    }; 
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current && audioRef.current) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioCtxRef.current = ctx;

            const source = ctx.createMediaElementSource(audioRef.current);
            const low = ctx.createBiquadFilter(); low.type = 'lowshelf'; low.frequency.value = 320;
            const mid = ctx.createBiquadFilter(); mid.type = 'peaking'; mid.frequency.value = 1000; mid.Q.value = 0.7;
            const high = ctx.createBiquadFilter(); high.type = 'highshelf'; high.frequency.value = 3200;
            
            source.connect(low); low.connect(mid); mid.connect(high); high.connect(ctx.destination);
            filtersRef.current = { low, mid, high };
            low.gain.value = eq.low; mid.gain.value = eq.mid; high.gain.value = eq.high;
        } catch(e) { console.error("Web Audio API Error", e); }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }
  };

  useEffect(() => {
    if (filtersRef.current.low) filtersRef.current.low.gain.value = eq.low;
    if (filtersRef.current.mid) filtersRef.current.mid.gain.value = eq.mid;
    if (filtersRef.current.high) filtersRef.current.high.gain.value = eq.high;
  }, [eq]);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.src = VALLENAR_RESOURCES.audio[currentTrackIdx].file;
        if (isPlaying) {
            initAudio();
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }
    }
  }, [currentTrackIdx]);

  const togglePlayback = () => {
    initAudio();
    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play blocked", e));
    }
  };

  const handleShareVallenar = () => {
    const text = 'VLS INTELLIGENCE: Explorando Atacama en sus personajes 3D. Accede al Dossier Federal Vallenar en VecinosLaSerena.cl';
    if (navigator.share) {
      navigator.share({ title: 'VLS_VALLENAR_DOSSIER', text, url: window.location.href });
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#020617', zIndex: 9999, display: 'flex', flexDirection: 'column', color: 'white', fontFamily: '"Outfit", sans-serif', overflow: 'hidden' }}>
      <AnimatePresence>{!isLoaded && <LoadingScreen />}</AnimatePresence>

      {/* INTERNAL VIEWER OVERLAY */}
      <AnimatePresence>
        {viewerUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ position: 'fixed', inset: 0, zIndex: 20000, background: 'rgba(2, 6, 23, 0.98)', display: 'flex', flexDirection: 'column', padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #14b8a6', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 950, letterSpacing: '4px', color: '#14b8a6', margin: 0 }}>VLS_INTERNAL_VIEWER v1.0</h2>
              <button 
                onClick={() => { setViewerUrl(null); }}
                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: 950, cursor: 'pointer' }}
              >
                CERRAR VISOR
              </button>
            </div>
            <div style={{ flex: 1, borderRadius: '25px', overflow: 'hidden', background: '#000', border: '1px solid rgba(20, 184, 166, 0.3)' }}>
              {viewerType === 'pdf' ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <iframe src={viewerUrl + '#toolbar=0'} style={{ flex: 1, border: 'none' }} title="VLS Viewer" />
                  <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
                    <a href={viewerUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#14b8a6', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 950 }}>PANTALLA COMPLETA / DESCARGAR PDF</a>
                  </div>
                </div>
              ) : (
                <video src={viewerUrl} controls autoPlay playsInline onContextMenu={e => e.preventDefault()} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HEADER LED TÁCTICO ─── */}
      <header style={{ height: '80px', background: 'rgba(2, 6, 23, 0.82)', borderBottom: '1px solid rgba(20, 184, 166, 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2.5rem', zIndex: 1000, backdropFilter: 'blur(30px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ padding: '8px 15px', background: 'rgba(20, 184, 166, 0.1)', border: '1px solid #14b8a6', borderRadius: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 950, letterSpacing: '4px', color: '#14b8a6' }}>VLS_DEXTER_INTELLIGENCE</h1>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setBacklight(!backlight)} style={{ background: backlight ? '#14b8a6' : 'rgba(255,255,255,0.05)', color: backlight ? 'black' : 'white', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer' }}><Lightbulb size={18} /></button>
            <button onClick={handleShareVallenar} style={{ background: 'rgba(20, 184, 166, 0.1)', border: '1px solid #14b8a6', color: '#14b8a6', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}>
               <Share2 size={16} />
            </button>
          </div>
        </div>
        <button onClick={handleClose} style={{ background: '#ef4444', color: 'white', padding: '0.6rem 2.5rem', borderRadius: '12px', fontWeight: '950', border: 'none', cursor: 'pointer' }}>SALIR DEL SITIO</button>
      </header>

      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', overflowY: 'auto', overflowX: 'hidden' }}>
        
        {/* NAV LATERAL */}
        <aside style={{ flex: '1 1 320px', minWidth: '280px', maxWidth: '400px', background: 'rgba(2, 6, 23, 0.95)', padding: '2.5rem', borderRight: '1px solid rgba(20, 184, 166, 0.2)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '3rem' }}>
             <span style={{ fontSize: '0.6rem', color: '#14b8a6', fontWeight: 900, letterSpacing: '4px' }}>PROJECT_VALLENAR_v4.2</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 950, lineHeight: 0.9, marginTop: '10px' }}>ESTACIÓN <br /><span style={{ color: '#14b8a6' }}>VALLENAR</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {[
              { id: 'models', label: 'VISOR 3D LED', icon: Box },
              { id: 'player', label: 'RADIO REGIONAL', icon: Radio },
              { id: 'video', label: 'CLIP_ACTIVO', icon: Video },
              { id: 'docs', label: 'DOSSIER_PDF', icon: BookOpen }
            ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(20, 184, 166, 0.15)' : 'transparent', border: activeTab === tab.id ? '1px solid #14b8a6' : '1px solid transparent', color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.3)', padding: '1.25rem 1.5rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textAlign: 'left' }}>
                <tab.icon size={20} color={activeTab === tab.id ? '#14b8a6' : 'currentColor'} />
                <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main style={{ flex: '2 1 600px', minWidth: '300px', padding: '2rem 5%', overflowY: 'visible', overflowX: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">
             <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                
                {activeTab === 'models' && (
                  <div style={{ height: '70vh', background: '#020617', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                     <div style={{ display: 'flex', gap: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 20 }}>
                        {VALLENAR_RESOURCES.models.map(m => (
                           <button key={m.id} onClick={() => setSelectedModel(m)} style={{ background: selectedModel.id === m.id ? '#14b8a6' : 'rgba(255,255,255,0.05)', color: selectedModel.id === m.id ? 'black' : 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 950, cursor: 'pointer' }}>{m.name}</button>
                        ))}
                     </div>
                     <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                       <Suspense fallback={null}><ambientLight intensity={0.5} /><PresentationControls global><ModelAutoplay path={selectedModel.path} /></PresentationControls><Environment preset="city" /><ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={24} /></Suspense>
                     </Canvas>
                     <div style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 10 }}>
                        <h3 style={{ fontSize: '3rem', fontWeight: 950, color: 'white' }}>{selectedModel.name}</h3>
                        <p style={{ color: '#14b8a6', fontWeight: 900, letterSpacing: '4px' }}>RENDER_SATELLITE_ACTIVE</p>
                     </div>
                  </div>
                )}

                {activeTab === 'player' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
                    <div style={{ flex: '2 1 400px', background: 'rgba(2, 6, 23, 0.4)', borderRadius: '50px', padding: '4rem', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                       <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: '#020617', border: '4px solid #14b8a6', margin: '0 auto 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14b8a6', boxShadow: '0 0 50px rgba(20, 184, 166, 0.4)', overflow: 'hidden', position: 'relative' }}>
                          <motion.img 
                            animate={{ rotate: isPlaying ? 360 : 0 }} 
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            src="/media/vallenar/VallenarMiticolmagen.png" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                          />
                       </div>
                       <h3 style={{ fontSize: '2.5rem', fontWeight: 950, lineHeight: 1, marginBottom: '0.5rem' }}>{VALLENAR_RESOURCES.audio[currentTrackIdx].title}</h3>
                       <p style={{ color: '#14b8a6', fontWeight: 900, letterSpacing: '6px', marginBottom: '4rem' }}>RADIO_REGIONAL_VLS</p>
                       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
                          <audio ref={audioRef} onEnded={() => setCurrentTrackIdx((p) => (p + 1) % VALLENAR_RESOURCES.audio.length)} />
                          <button onClick={togglePlayback} style={{ width: '100px', height: '100px', borderRadius: '50%', background: isPlaying ? '#ef4444' : 'white', color: 'black', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isPlaying ? <Pause size={50} fill="currentColor" /> : <Play size={50} fill="currentColor" style={{ marginLeft: '10px' }} />}
                          </button>
                       </div>

                       {/* EQ SLIDERS */}
                       <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
                          <p style={{ fontSize: '0.7rem', color: '#14b8a6', fontWeight: 950, letterSpacing: '2px', marginBottom: '1.5rem' }}>VALLENAR_AUDIO_ENGINE (3-BAND)</p>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                             {['low', 'mid', 'high'].map(band => (
                               <div key={band} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                  <input 
                                    type="range" min="-12" max="12" step="1" 
                                    value={eq[band]} 
                                    onChange={(e) => setEq(prev => ({ ...prev, [band]: parseInt(e.target.value) }))}
                                    style={{ appearance: 'slider-vertical', width: '10px', height: '120px', background: '#333', borderRadius: '5px', cursor: 'ns-resize', accentColor: '#14b8a6' }} 
                                  />
                                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white' }}>{band.toUpperCase()}</span>
                                  <span style={{ fontSize: '0.6rem', color: '#14b8a6' }}>{eq[band]}dB</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '10px', height: '60vh', overflowY: 'auto', paddingRight: '1rem' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 950, color: '#14b8a6', letterSpacing: '3px', marginBottom: '1rem' }}>BIBLIOTECA_VALLENAR_MP3</h4>
                        {VALLENAR_RESOURCES.audio.map((track, idx) => (
                           <button key={track.id} onClick={() => { setCurrentTrackIdx(idx); setIsPlaying(true); }} style={{ background: currentTrackIdx === idx ? 'rgba(20, 184, 166, 0.15)' : 'rgba(255,255,255,0.02)', border: currentTrackIdx === idx ? '1px solid #14b8a6' : '1px solid rgba(255,255,255,0.05)', color: currentTrackIdx === idx ? 'white' : 'rgba(255, 255, 255, 0.4)', padding: '1.2rem', borderRadius: '15px', cursor: 'pointer', textAlign: 'left', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <Headphones size={18} color={currentTrackIdx === idx ? '#14b8a6' : 'currentColor'} />
                              {track.title}
                           </button>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === 'video' && (
                  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '5rem', borderRadius: '60px', border: '1px solid rgba(20, 184, 166, 0.3)', textAlign: 'center' }}>
                     <div style={{ width: '150px', height: '150px', borderRadius: '40px', background: '#14b8a6', margin: '0 auto 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 50px rgba(20, 184, 166, 0.3)' }}><Play size={70} /></div>
                     <h3 style={{ fontSize: '3rem', fontWeight: 950 }}>{VALLENAR_RESOURCES.video.title}</h3>
                     <p style={{ color: '#14b8a6', fontWeight: 900, letterSpacing: '6px', marginBottom: '4rem' }}>SOURCE: {VALLENAR_RESOURCES.video.file}</p>
                     <button onClick={() => { setViewerType('video'); setViewerUrl(VALLENAR_RESOURCES.video.file); }} style={{ padding: '1rem 4rem', background: 'white', color: 'black', borderRadius: '15px', fontWeight: 950, border: 'none', cursor: 'pointer' }}>VISUALIZAR CLIP</button>
                  </div>
                )}

                {activeTab === 'docs' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
                    {VALLENAR_RESOURCES.docs.map(doc => (
                      <div key={doc.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                          <FileText size={45} color="#14b8a6" />
                          <button onClick={() => { setViewerType('pdf'); setViewerUrl(doc.file); }} style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#14b8a6', padding: '10px 20px', borderRadius: '10px', border: '1px solid #14b8a6', fontSize: '0.7rem', fontWeight: 950, cursor: 'pointer' }}>ABRIR VISOR VLS</button>
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 950 }}>{doc.title}</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.5, margin: '10px 0 0 0' }}>{doc.summary}</p>
                        <p style={{ color: '#14b8a6', fontWeight: 950, fontSize: '0.7rem', marginTop: '15px' }}>{doc.file}</p>
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
