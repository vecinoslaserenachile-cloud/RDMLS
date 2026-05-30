import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Float, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Shield, Monitor, Radio, Play, Headphones, HardHat, Box, FileText, Pause, Volume2, Lightbulb, Video, Activity, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

// ── BANCO DE DATOS ANDACOLLO ────────────────────────────────────────────────
const ANDACOLLO_RESOURCES = {
  models: [
    { id: 'templo', name: 'TEMPLO MAYOR 3D', path: '/media/andacollo/templo_mayor_draco.glb' },
    { id: 'church', name: 'HISTORIC CHURCH', path: '/media/andacollo/historic_church_draco.glb' }
  ],
  audio: [
    { id: 'a1', title: 'Sonido Rajado (Ancestral Remix)', file: '/media/andacollo/Sonido Rajado (Remastered).mp3' },
    { id: 'a8', title: 'Tributo Andacollo (Estilo Astor)', file: '/media/andacollo/Tributo Andacollo y sus vecinos estilo Astor.mp3' },
    { id: 'a9', title: 'Bailes Chinos (Astor Tribute)', file: '/media/andacollo/wowAstor_TributeBailesChinos.mp3' },
    { id: 'a10', title: 'Andacollo & Vecinos (Astor)', file: '/media/andacollo/TRIBUTObailesChinosAstor.mp3' },
    { id: 'a2', title: 'Bailes Chinos (Sesión 1)', file: '/media/andacollo/Sonido Rajado (1).mp3' },
    { id: 'a3', title: 'Bailes Chinos (Sesión 2)', file: '/media/andacollo/Sonido Rajado (2).mp3' },
    { id: 'a4', title: 'Marcha de la Montaña', file: '/media/andacollo/Sonido Rajado March.mp3' },
    { id: 'a5', title: 'Andino Rock (Fusión)', file: '/media/andacollo/Andino Rock Andacollo.mp3' },
    { id: 'a6', title: 'Floyd Style (Andacollo Edit)', file: '/media/andacollo/Sonido Rajado Bailes Chinos Andacollo FloydStyle vls.mp3' },
    { id: 'a7', title: 'Radio Fe (Dossier VLS)', file: '/media/andacollo/Andacollo_Fe_Radio.mp3' }
  ],
  video: { id: 'clip1', title: 'REGISTRO_SOCAVÓN_3D', file: '/media/andacollo/ClipAndacollo.mp4' },
  docs: [
    { id: 'vortex', title: 'ANDACOLLO_VORTEX_DIGITAL', file: '/media/andacollo/clean_Andacollo_Digital_Vortex.pdf', summary: 'Análisis de yacimientos e impacto.' },
    { id: 'eco', title: 'ANDACOLLO_ECOSYSTEM', file: '/media/andacollo/clean_Andacollo_Digital_Ecosystem.pdf', summary: 'Historia del patrimonio eclesiástico y bailes chinos.' }
  ]
};

const ModelViewer = ({ path }) => {
  const { scene } = useGLTF(path);
  return <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}><primitive object={scene} scale={2} position={[0, -0.8, 0]} /></Float>;
};

const ANDACOLLO_SECTIONS = [
  { id: 'models', label: 'VISOR 3D ORO', icon: Box, title: 'MONUMENTOS_DIGITALES' },
  { id: 'player', label: 'AUDIO DE FE', icon: Headphones, title: 'BIBLIOTECA_ANDACOLLO_MP3' },
  { id: 'video', label: 'EVIDENCIA MP4', icon: Video, title: 'REGISTRO_EXPLORACIÓN_VLS' },
  { id: 'docs', label: 'DOSSIER PDF', icon: FileText, title: 'EXPEDIENTE_DIGITAL_VLS' }
];

export default function AndacolloPortal({ onClose }) {
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
  const [selectedModel, setSelectedModel] = useState(ANDACOLLO_RESOURCES.models[0]);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);
  const [backlight, setBacklight] = useState(false);
  
  // EQ Real State
  const [eq, setEq] = useState({ low: 5, mid: -2, high: 6 });
  const [viewerUrl, setViewerUrl] = useState(null);
  const [viewerType, setViewerType] = useState('pdf'); // 'pdf' or 'video'

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
        audioRef.current.src = ANDACOLLO_RESOURCES.audio[currentTrackIdx].file;
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

  const handleShareAndacollo = () => {
    const text = 'VLS INTELLIGENCE: El Templo de Oro y la Fe de Andacollo digitalizados en alta resolución. Visita VecinosLaSerena.cl';
    if (navigator.share) navigator.share({ title: 'VLS_ANDACOLLO', text, url: window.location.href });
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f59e0b', paddingBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 950, letterSpacing: '4px', color: '#f59e0b', margin: 0 }}>VLS_INTERNAL_VIEWER v1.0</h2>
              <button 
                onClick={() => { setViewerUrl(null); }}
                style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: 950, cursor: 'pointer' }}
              >
                CERRAR VISOR
              </button>
            </div>
            <div style={{ flex: 1, borderRadius: '25px', overflow: 'hidden', background: '#000', border: '1px solid rgba(245,158,11,0.3)' }}>
              {viewerType === 'pdf' ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <iframe src={viewerUrl + '#toolbar=0'} style={{ flex: 1, border: 'none' }} title="VLS Viewer" />
                  <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
                    <a href={viewerUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#f59e0b', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 950 }}>PANTALLA COMPLETA / DESCARGAR PDF</a>
                  </div>
                </div>
              ) : (
                <video src={viewerUrl} controls autoPlay playsInline onContextMenu={e => e.preventDefault()} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header style={{ height: '80px', background: 'rgba(2, 6, 23, 0.82)', borderBottom: '1px solid rgba(245, 158, 11, 0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2.5rem', zIndex: 1000, backdropFilter: 'blur(30px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ padding: '8px 15px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 950, letterSpacing: '4px', color: '#f59e0b' }}>VLS_ANDACOLLO_UNIT</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
             <button onClick={() => setBacklight(!backlight)} style={{ background: backlight ? '#f59e0b' : 'transparent', color: backlight ? 'black' : 'white', border: '1px solid #f59e0b', cursor: 'pointer', borderRadius: '10px', padding: '10px 15px' }}><Lightbulb size={18} /></button>
             <button onClick={handleShareAndacollo} style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', color: '#f59e0b', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}><Share2 size={16} /></button>
          </div>
        </div>
        <button onClick={handleClose} style={{ background: '#ef4444', color: 'white', padding: '0.6rem 2.8rem', borderRadius: '12px', fontWeight: '950', border: 'none', cursor: 'pointer' }}>CERRAR DOSSIER</button>
      </header>

      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', overflowY: 'auto', overflowX: 'hidden' }}>
        <aside style={{ flex: '1 1 320px', minWidth: '280px', maxWidth: '400px', background: 'rgba(2, 6, 23, 0.95)', padding: '2.5rem', borderRight: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.6rem', color: '#f59e0b', fontWeight: 900, letterSpacing: '4px' }}>DEX_UNIT v5.0</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, lineHeight: 0.9, marginTop: '10px' }}>ORO <br /><span style={{ color: '#f59e0b' }}>Y FE</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ANDACOLLO_SECTIONS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: activeTab === tab.id ? 'rgba(245, 158, 11, 0.15)' : 'transparent', border: activeTab === tab.id ? '1px solid #f59e0b' : '1px solid transparent', color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.3)', padding: '1.25rem 1.5rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textAlign: 'left' }}>
                <tab.icon size={20} color={activeTab === tab.id ? '#f59e0b' : 'currentColor'} />
                <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main style={{ flex: '2 1 500px', minWidth: '300px', padding: '2rem 5%', overflowY: 'visible', overflowX: 'hidden' }}>
           <AnimatePresence mode="wait">
             <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

               {activeTab === 'models' && (
                 <div style={{ display: 'flex', height: '70vh', background: '#020617', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
                         <Suspense fallback={null}><ambientLight intensity={0.5} /><PresentationControls global><ModelViewer path={selectedModel.path} /></PresentationControls><Environment preset="city" /><ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={5} blur={24} /></Suspense>
                      </Canvas>
                    </div>
                    <div style={{ width: '380px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(2, 6, 23, 0.6)', backdropFilter: 'blur(10px)', borderLeft: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 950, color: '#f59e0b', marginBottom: '1rem' }}>SELECCIÓN MÓDULO</h4>
                      {ANDACOLLO_RESOURCES.models.map(m => (<button key={m.id} onClick={() => setSelectedModel(m)} style={{ background: selectedModel.id === m.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)', border: selectedModel.id === m.id ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)', color: 'white', padding: '1.2rem', borderRadius: '15px', cursor: 'pointer', textAlign: 'left', fontWeight: 950 }}>{m.name}</button>))}
                    </div>
                 </div>
               )}

               {activeTab === 'player' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
                    <div style={{ flex: '2 1 400px', background: 'rgba(2, 6, 23, 0.4)', borderRadius: '50px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                       <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: '#020617', border: '4px solid #f59e0b', margin: '0 auto 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', boxShadow: '0 0 50px rgba(245, 158, 11, 0.3)', overflow: 'hidden', position: 'relative' }}>
                          <motion.img 
                            animate={{ rotate: isPlaying ? 360 : 0 }} 
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            src="/media/andacollo/Andacollo_vls.png" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                          />
                       </div>
                       <h3 style={{ fontSize: '2rem', fontWeight: 950, lineHeight: 1, marginBottom: '0.5rem' }}>{ANDACOLLO_RESOURCES.audio[currentTrackIdx].title}</h3>
                       <p style={{ color: '#f59e0b', fontWeight: 900, letterSpacing: '6px', marginBottom: '3rem' }}>RADIO_ORO_Y_FE_VLS</p>
                       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '3rem' }}>
                          <audio ref={audioRef} onEnded={() => setCurrentTrackIdx((p) => (p + 1) % ANDACOLLO_RESOURCES.audio.length)} />
                          <button onClick={togglePlayback} style={{ width: '90px', height: '90px', borderRadius: '50%', background: isPlaying ? '#ef4444' : 'white', color: 'black', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isPlaying ? <Pause size={45} fill="currentColor" /> : <Play size={45} fill="currentColor" style={{ marginLeft: '10px' }} />}
                          </button>
                       </div>

                       {/* EQ SLIDERS */}
                       <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(245,158,11,0.2)' }}>
                          <p style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 950, letterSpacing: '2px', marginBottom: '1.5rem' }}>ANDACOLLO_AUDIO_PROCESSOR (3-BAND)</p>
                          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
                             {['low', 'mid', 'high'].map(band => (
                               <div key={band} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                  <input 
                                    type="range" min="-12" max="12" step="1" 
                                    value={eq[band]} 
                                    onChange={(e) => setEq(prev => ({ ...prev, [band]: parseInt(e.target.value) }))}
                                    style={{ appearance: 'slider-vertical', width: '10px', height: '120px', background: '#333', borderRadius: '5px', cursor: 'ns-resize', accentColor: '#f59e0b' }} 
                                  />
                                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white' }}>{band.toUpperCase()}</span>
                                  <span style={{ fontSize: '0.6rem', color: '#f59e0b' }}>{eq[band]}dB</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '10px', height: '55vh', overflowY: 'auto', paddingRight: '1rem' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 950, color: '#f59e0b', letterSpacing: '3px', marginBottom: '1rem' }}>BIBLIOTECA_ANDACOLLO_MP3</h4>
                        {ANDACOLLO_RESOURCES.audio.map((track, idx) => (
                           <button key={track.id} onClick={() => { setCurrentTrackIdx(idx); setIsPlaying(true); }} style={{ background: currentTrackIdx === idx ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)', border: currentTrackIdx === idx ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)', color: currentTrackIdx === idx ? 'white' : 'rgba(255, 255, 255, 0.4)', padding: '1rem', borderRadius: '15px', cursor: 'pointer', textAlign: 'left', fontWeight: 950, display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <Headphones size={18} color={currentTrackIdx === idx ? '#f59e0b' : 'currentColor'} />
                              <span style={{ fontSize: '0.85rem' }}>{track.title}</span>
                           </button>
                        ))}
                    </div>
                  </div>
                )}

               {activeTab === 'video' && (
                  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '5rem', borderRadius: '60px', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'center' }}>
                     <div style={{ width: '150px', height: '150px', borderRadius: '40px', background: '#f59e0b', margin: '0 auto 3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', boxShadow: '0 0 50px rgba(245, 158, 11, 0.3)' }}><Video size={70} /></div>
                     <h3 style={{ fontSize: '3rem', fontWeight: 950 }}>{ANDACOLLO_RESOURCES.video.title}</h3>
                     <p style={{ color: '#f59e0b', fontWeight: 900, letterSpacing: '6px', marginBottom: '4rem' }}>SOURCE: {ANDACOLLO_RESOURCES.video.file}</p>
                     <button 
                        onClick={() => { setViewerType('video'); setViewerUrl(ANDACOLLO_RESOURCES.video.file); }}
                        style={{ padding: '1rem 4rem', background: 'white', color: 'black', borderRadius: '15px', fontWeight: 950, border: 'none', cursor: 'pointer' }}
                     >
                        VISUALIZAR EVIDENCIA
                     </button>
                  </div>
               )}

               {activeTab === 'docs' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
                    {ANDACOLLO_RESOURCES.docs.map(doc => (
                      <div key={doc.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem' }}>
                          <FileText size={45} color="#f59e0b" />
                          <button onClick={() => { setViewerType('pdf'); setViewerUrl(doc.file); }} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '10px 20px', borderRadius: '10px', border: '1px solid #f59e0b', fontSize: '0.7rem', fontWeight: 950, cursor: 'pointer' }}>ABRIR VISOR VLS</button>
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 950 }}>{doc.title}</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.5, margin: '10px 0 0 0' }}>{doc.summary}</p>
                        <p style={{ color: '#f59e0b', fontWeight: 950, fontSize: '0.7rem', marginTop: '15px' }}>{doc.file}</p>
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
