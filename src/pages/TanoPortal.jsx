import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Play, FileText, Download, Award, Music, Coffee, Map, Gamepad2, 
  ChevronRight, X, User, LogIn, CheckCircle, Volume2, Star
} from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';

const TANO_MODULES = [
  {
    id: 'intro',
    title: 'Módulo 1: Introducción',
    icon: BookOpen,
    desc: 'Bases del idioma italiano con la arquitecta Francesca Vives.',
    files: [
      { id: 'f1', name: 'Introducción al Italiano', path: '/media/tano/Introducción_al_Italiano.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'lezioni',
    title: 'Módulo 2: Lecciones Clave',
    icon: FileText,
    desc: 'Lección 2 y material gráfico de la Lección 4.',
    files: [
      { id: 'f2', name: 'Lezione 2 (PDF)', path: '/media/tano/Lezione 2.pdf', type: 'pdf' },
      { id: 'f3', name: 'Infografía Lezione 4', path: '/media/tano/Infografía Lezione 4.png', type: 'img' },
      { id: 'f4', name: 'Infografía General', path: '/media/tano/Infografía.png', type: 'img' }
    ]
  },
  {
    id: 'inclusiva',
    title: 'Módulo 3: Italiano Inclusivo',
    icon: CheckCircle,
    desc: 'Lección 3: Aprendizaje Inclusivo y Pictográfico.',
    files: [
      { id: 'f5', name: 'Lección 3 Inclusiva (PDF)', path: '/media/tano/Leccion_3_Inclusiva_Pictografica.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'ristorante',
    title: 'Módulo 4: Il Ristorante',
    icon: Coffee,
    desc: 'Vocabulario y situaciones en un restaurante italiano.',
    files: [
      { id: 'f8', name: 'Infografía Ristorante', path: '/media/tano/Infografia Ristorante.png', type: 'img' },
      { id: 'f6', name: 'Experiencia Ristorante (Interactivo)', type: 'interactive_ristorante' }
    ]
  },
  {
    id: 'musicale',
    title: 'Laboratorio Musicale',
    icon: Music,
    desc: 'Aprende italiano a través de las letras de sus grandes éxitos.',
    files: [
      { id: 'm1', name: 'Bella Ciao', path: '/media/tano/Bella Ciao.pdf', type: 'pdf' },
      { id: 'm2', name: "L'italiano", path: '/media/tano/L\'italiano.pdf', type: 'pdf' },
      { id: 'm3', name: 'La Differenza Tra Me e Te', path: '/media/tano/La Differenza Tra Me e Te.pdf', type: 'pdf' },
      { id: 'm4', name: 'Più Bella Cosa', path: '/media/tano/Più Bella Cosa.pdf', type: 'pdf' },
      { id: 'm5', name: 'Torna a casa', path: '/media/tano/Torna a casa.pdf', type: 'pdf' },
      { id: 'm6', name: 'Vivere la Vita', path: '/media/tano/Vivere la Vita.pdf', type: 'pdf' },
      { id: 'm7', name: 'Letras Interactivas (Karaoke VLS)', type: 'interactive_karaoke' }
    ]
  },
  {
    id: 'cultura',
    title: 'Cultura e Urbanismo',
    icon: Map,
    desc: 'Conecta la lengua con la historia y el entorno arquitectónico de Italia.',
    files: [
      { id: 'c1', name: 'Italian Urban Blueprint', path: '/media/tano/Italian_Urban_Blueprint.pdf', type: 'pdf' },
      { id: 'c2', name: 'Italy to the Stars', path: '/media/tano/Italy_to_the_Stars.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'juegos',
    title: 'Giochi: Bingo Italiano',
    icon: Gamepad2,
    desc: 'Cartillas para jugar y practicar vocabulario en comunidad.',
    files: [
      { id: 'j1', name: 'Jugar Bingo Italiano (Interactivo)', type: 'interactive_bingo' }
    ]
  }
];

// --- COMPONENTES INTERACTIVOS (Sustitutos de descarga) ---

const InteractiveRistorante = () => {
  const [step, setStep] = useState(0);
  const vocabulary = [
    { it: "Il Menu", es: "El Menú", icon: "📋" },
    { it: "Il Cameriere", es: "El Mesero", icon: "🤵" },
    { it: "Il Conto", es: "La Cuenta", icon: "🧾" },
    { it: "Il Piatto", es: "El Plato", icon: "🍽️" },
    { it: "Il Bicchiere", es: "El Vaso", icon: "🥛" }
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', borderRadius: '24px', padding: '2rem', color: 'white' }}>
      <Coffee size={80} color="#fcd34d" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center', color: '#fcd34d' }}>Benvenuti al Ristorante!</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center', maxWidth: '600px', color: '#94a3b8' }}>
        Aprende el vocabulario esencial para pedir comida como un verdadero italiano. Haz clic en las tarjetas para descubrir su significado.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', width: '100%' }}>
        {vocabulary.map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', padding: '2rem', borderRadius: '20px', cursor: 'pointer', textAlign: 'center', width: '220px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
          >
            <div style={{ fontSize: '4rem' }}>{item.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.it}</div>
            <div style={{ fontSize: '1rem', color: '#10b981', fontWeight: 'bold' }}>{item.es}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const InteractiveBingo = () => {
  const [number, setNumber] = useState(null);
  const [history, setHistory] = useState([]);

  const drawNumber = () => {
    const newNum = Math.floor(Math.random() * 90) + 1;
    setNumber(newNum);
    setHistory([newNum, ...history].slice(0, 5));
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #064e3b, #022c22)', borderRadius: '24px', padding: '3rem', color: 'white' }}>
      <Gamepad2 size={60} color="#10b981" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#10b981' }}>TOMBOLA ITALIANA</h2>
      <p style={{ fontSize: '1.5rem', color: '#6ee7b7', marginBottom: '3rem', textAlign: 'center' }}>Extracción en vivo para la comunidad</p>
      
      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <motion.div 
          key={number}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ width: '250px', height: '250px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem', fontWeight: 900, boxShadow: '0 0 50px rgba(16, 185, 129, 0.4)', color: '#022c22', border: '10px solid white' }}
        >
          {number || '?'}
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <button onClick={drawNumber} style={{ background: '#ef4444', color: 'white', padding: '1.5rem 3rem', borderRadius: '20px', border: 'none', fontSize: '1.8rem', fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)' }}>
            ESTRAI NUMERO
          </button>
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#10b981', fontSize: '1.2rem' }}>Últimos Extraídos</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              {history.map((n, i) => (
                <div key={i} style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', opacity: 1 - (i * 0.15) }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveKaraoke = () => {
  const songs = [
    { title: "Vivo Per Lei", artist: "Andrea Bocelli" },
    { title: "Volare (Nel Blu Dipinto Di Blu)", artist: "Domenico Modugno" },
    { title: "La Donna è Mobile", artist: "Giuseppe Verdi" }
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, #7f1d1d, #450a0a)', borderRadius: '24px', padding: '3rem', color: 'white', overflowY: 'auto' }}>
      <Music size={60} color="#f87171" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#f87171' }}>SALA KARAOKE VLS</h2>
      <p style={{ fontSize: '1.2rem', color: '#fca5a5', marginBottom: '3rem', textAlign: 'center' }}>Selecciona un clásico y practica tu pronunciación.</p>
      
      <div style={{ display: 'grid', gap: '1.5rem', width: '100%', maxWidth: '800px' }}>
        {songs.map((song, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(248, 113, 113, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{song.title}</h3>
              <p style={{ margin: 0, color: '#fca5a5', fontSize: '1.1rem' }}>{song.artist}</p>
            </div>
            <button style={{ background: '#f87171', color: 'black', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <Volume2 size={24} /> CANTAR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------

export default function TanoPortal() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(TANO_MODULES[0]);
  const [viewerFile, setViewerFile] = useState(null);
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0); 
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      if (session?.user) loadProgress(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) loadProgress(session.user.id);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const loadProgress = async (userId) => {
    setProgress(Math.floor(Math.random() * 40) + 60); 
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/tano' }
    });
  };

  const openViewer = (file) => {
    setViewerFile(file);
    if (user) setProgress(p => Math.min(p + 5, 100));
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b 0%, #111827 50%, #7f1d1d 100%)', color: 'white', fontFamily: '"Outfit", sans-serif' }}>
      
      {/* Viewer Overlay */}
      <AnimatePresence>
        {viewerFile && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(2, 6, 23, 0.98)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Star size={24} color="#fcd34d" />
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white', letterSpacing: '1px' }}>{viewerFile.name}</h3>
              </div>
              <button onClick={() => setViewerFile(null)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <X size={20} /> CERRAR
              </button>
            </div>
            <div style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              {viewerFile.type === 'pdf' ? (
                <iframe src={viewerFile.path + '#toolbar=0'} style={{ width: '100%', height: '100%', border: 'none', borderRadius: '24px', background: 'white' }} title="PDF Viewer" />
              ) : viewerFile.type === 'img' ? (
                <img src={viewerFile.path} alt={viewerFile.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              ) : viewerFile.type === 'interactive_ristorante' ? (
                <InteractiveRistorante />
              ) : viewerFile.type === 'interactive_bingo' ? (
                <InteractiveBingo />
              ) : viewerFile.type === 'interactive_karaoke' ? (
                <InteractiveKaraoke />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 900, background: 'linear-gradient(to right, #10b981, #fcd34d, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
            Italiano con Francesca
          </h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#9ca3af', fontSize: '1.2rem', fontWeight: 'bold' }}>Curso Básico Interactivo • Arch. Francesca Vives</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <User size={24} color="#10b981" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '900', color: 'white' }}>{user.email}</div>
                <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>Progreso: {progress}%</div>
              </div>
            </div>
          ) : (
            <button onClick={handleLogin} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s', fontSize: '1rem' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.2)'} onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'}>
              <LogIn size={20} /> Iniciar Sesión (Diploma)
            </button>
          )}
          <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '1rem 2rem', borderRadius: '16px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }} onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            VOLVER AL HOME
          </button>
        </div>
      </header>

      <main style={{ padding: '4rem', maxWidth: '1600px', margin: '0 auto', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        
        {/* Sidebar Nav */}
        <aside style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 1rem 0' }}>Módulos de Aprendizaje</h2>
          {TANO_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', textAlign: 'left',
                padding: '1.5rem', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: activeModule.id === mod.id ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))' : 'rgba(0,0,0,0.3)',
                border: activeModule.id === mod.id ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.05)',
                color: activeModule.id === mod.id ? '#10b981' : '#d1d5db',
                transform: activeModule.id === mod.id ? 'scale(1.02)' : 'none',
                boxShadow: activeModule.id === mod.id ? '0 10px 30px rgba(16, 185, 129, 0.2)' : 'none'
              }}
            >
              <mod.icon size={28} />
              <span style={{ fontWeight: '900', flex: 1, fontSize: '1.1rem' }}>{mod.title}</span>
              {activeModule.id === mod.id && <ChevronRight size={24} />}
            </button>
          ))}

          {/* Diploma Section */}
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05))', borderRadius: '24px', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'center' }}>
            <Award size={60} color="#fcd34d" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))' }} />
            <h3 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.8rem', fontWeight: 900 }}>Certificación VLS</h3>
            <p style={{ fontSize: '1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: 1.5 }}>Completa todo el material interactivo de la Profesora Francesca Vives para obtener tu diploma digital.</p>
            {user ? (
              <button style={{ width: '100%', padding: '1rem', background: progress >= 100 ? '#f59e0b' : 'rgba(255,255,255,0.1)', border: progress >= 100 ? 'none' : '1px solid rgba(255,255,255,0.2)', color: progress >= 100 ? 'black' : '#9ca3af', borderRadius: '12px', fontWeight: '900', cursor: progress >= 100 ? 'pointer' : 'not-allowed', fontSize: '1.1rem' }}>
                {progress >= 100 ? 'DESCARGAR DIPLOMA' : `EN PROGRESO (${progress}%)`}
              </button>
            ) : (
              <button onClick={handleLogin} style={{ width: '100%', padding: '1rem', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}>
                REGÍSTRATE GRATIS AHORA
              </button>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <section style={{ flex: '2 1 700px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ background: 'rgba(0,0,0,0.4)', padding: '4rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '24px', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <activeModule.icon size={50} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'white', fontWeight: 900 }}>{activeModule.title}</h2>
                  <p style={{ color: '#9ca3af', fontSize: '1.2rem', margin: '0.8rem 0 0 0', lineHeight: 1.5 }}>{activeModule.desc}</p>
                </div>
              </div>

              <div style={{ marginTop: '4rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#e5e7eb', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', fontWeight: 900 }}>
                  Materiales y Experiencias de la Lección
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                  {activeModule.files.map(file => {
                    const isInteractive = file.type.startsWith('interactive');
                    const isPdf = file.type === 'pdf';
                    
                    return (
                      <div 
                        key={file.id} 
                        onClick={() => openViewer(file)}
                        style={{ 
                          background: isInteractive ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))' : 'rgba(255,255,255,0.05)', 
                          padding: '2rem', borderRadius: '24px', 
                          border: isInteractive ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255,255,255,0.1)', 
                          cursor: 'pointer', transition: 'all 0.3s',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem',
                          position: 'relative', overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          if (!isInteractive) {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; 
                            e.currentTarget.style.borderColor = '#10b981';
                          }
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.transform = 'none';
                          if (!isInteractive) {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; 
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                          }
                        }}
                      >
                        {isInteractive && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#3b82f6' }} />}
                        
                        {isInteractive ? <Play size={50} color="#3b82f6" fill="#3b82f6" /> : 
                         isPdf ? <FileText size={50} color="#f87171" /> : 
                         <BookOpen size={50} color="#60a5fa" />}
                        
                        <span style={{ fontWeight: '900', color: 'white', fontSize: '1.1rem' }}>{file.name}</span>
                        
                        <span style={{ 
                          fontSize: '0.8rem', color: isInteractive ? '#60a5fa' : '#9ca3af', 
                          textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold',
                          background: isInteractive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0,0,0,0.5)', 
                          padding: '6px 16px', borderRadius: '20px' 
                        }}>
                          {isInteractive ? 'JUGAR EXPERIENCIA' : 'VISOR MULTIMEDIA'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </section>

      </main>
    </div>
  );
}
