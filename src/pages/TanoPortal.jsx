import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Play, FileText, Download, Award, Music, Coffee, Map, Gamepad2, 
  ChevronRight, X, User, LogIn, CheckCircle, Volume2, Star, Radio, Activity,
  Pause, SkipForward, SkipBack, LogOut
} from 'lucide-react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { TanoTranslator } from '../components/TanoTranslator';
import { ItalyRegionsMap } from '../components/ItalyRegionsMap';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import confetti from 'canvas-confetti';

const TANO_MODULES = [
  {
    id: 'intro',
    title: 'Módulo 1: Introducción',
    icon: BookOpen,
    desc: 'Bases del idioma italiano con la arquitecta Francesca Vives.',
    files: [
      { id: 'f1', name: 'Introducción al Italiano', path: '/media/tano/Introducción_al_Italiano.pdf?v=clean2', type: 'pdf' }
    ]
  },
  {
    id: 'lezioni',
    title: 'Módulo 2: Lecciones Clave',
    icon: FileText,
    desc: 'Lección 2 y material gráfico de la Lección 4.',
    files: [
      { id: 'f2', name: 'Lezione 2 (PDF)', path: '/media/tano/Lezione 2.pdf?v=clean3', type: 'pdf' },
      { id: 'f3', name: 'Infografía Lezione 4', path: '/media/tano/Infografía Lezione 4.png?v=clean2', type: 'img' },
      { id: 'f4', name: 'Infografía General', path: '/media/tano/Infografía.png?v=clean2', type: 'img' }
    ]
  },
  {
    id: 'inclusiva',
    title: 'Módulo 3: Italiano Inclusivo',
    icon: CheckCircle,
    desc: 'Lección 3: Aprendizaje Inclusivo y Pictográfico.',
    files: [
      { id: 'f5', name: 'Lección 3 Inclusiva (PDF)', path: '/media/tano/Leccion_3_Inclusiva_Pictografica.pdf?v=clean2', type: 'pdf' }
    ]
  },
  {
    id: 'ristorante',
    title: 'Módulo 4: Il Ristorante',
    icon: Coffee,
    desc: 'Vocabulario y situaciones en un restaurante italiano.',
    files: [
      { id: 'f8', name: 'Infografía Ristorante', path: '/media/tano/Infografia Ristorante.png?v=clean2', type: 'img' },
      { id: 'f6', name: 'Experiencia Ristorante (Interactivo)', type: 'interactive_ristorante' }
    ]
  },
  {
    id: 'musicale',
    title: 'Laboratorio Musicale',
    icon: Music,
    desc: 'Aprende italiano a través de las letras de sus grandes éxitos.',
    files: [
      { id: 'm1', name: 'Bella Ciao', path: '/media/tano/Bella Ciao.pdf?v=clean2', type: 'pdf' },
      { id: 'm2', name: "L'italiano", path: '/media/tano/L\'italiano.pdf?v=clean2', type: 'pdf' },
      { id: 'm3', name: 'La Differenza Tra Me e Te', path: '/media/tano/La Differenza Tra Me e Te.pdf?v=clean2', type: 'pdf' },
      { id: 'm4', name: 'Più Bella Cosa', path: '/media/tano/Più Bella Cosa.pdf?v=clean2', type: 'pdf' },
      { id: 'm5', name: 'Torna a casa', path: '/media/tano/Torna a casa.pdf?v=clean2', type: 'pdf' },
      { id: 'm6', name: 'Vivere la Vita', path: '/media/tano/Vivere la Vita.pdf?v=clean2', type: 'pdf' },
      { id: 'm7', name: 'Letras Interactivas (Karaoke VLS)', type: 'interactive_karaoke' }
    ]
  },
  {
    id: 'radio_tano',
    title: 'Radio Didattica Tano',
    icon: Radio,
    desc: 'Escucha 5 canciones didácticas para aprender italiano cantando.',
    files: [
      { id: 'r1', name: 'Abrir Reproductor Musical', type: 'interactive_radio' }
    ]
  },
  {
    id: 'cultura',
    title: 'Cultura e Geografia',
    icon: Map,
    desc: 'Explora Italia, su administración territorial, y su historia.',
    files: [
      { id: 'c1', name: 'Italian Urban Blueprint', path: '/media/tano/Italian_Urban_Blueprint.pdf?v=clean2', type: 'pdf' },
      { id: 'c2', name: 'Italy to the Stars', path: '/media/tano/Italy_to_the_Stars.pdf?v=clean2', type: 'pdf' },
      { id: 'c3', name: 'Mappa d\'Italia 2026 (Interactivo)', type: 'interactive_map' }
    ]
  },
  {
    id: 'traductor',
    title: 'Traductor Chileno-Italiano',
    icon: Volume2,
    desc: 'Aprende los mejores modismos con pronunciación real.',
    files: [
      { id: 'tr1', name: 'Abrir Traductor Interactivo', type: 'interactive_translator' }
    ]
  },
  {
    id: 'juegos',
    title: 'Giochi: Bingo e Trivia',
    icon: Gamepad2,
    desc: 'Pon a prueba tus conocimientos en comunidad.',
    files: [
      { id: 'j1', name: 'Jugar Bingo Italiano (Interactivo)', type: 'interactive_bingo' },
      { id: 't1', name: 'Jugar Trivia Interactiva', type: 'interactive_trivia' }
    ]
  }
];

// --- COMPONENTES INTERACTIVOS (Sustitutos de descarga) ---

const TanoMusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);

  const songs = [
    { title: "Bella Ciao", artist: "Música Tradicional Italiana", youtubeId: "S_rXmvQzKo0", color: "#e11d48", pdf: "Bella Ciao.pdf" },
    { title: "La Differenza Tra Me E Te", artist: "Tiziano Ferro", youtubeId: "pSuI2aZCPAE", color: "#3b82f6", pdf: "La Differenza Tra Me e Te.pdf" },
    { title: "Più Bella Cosa", artist: "Eros Ramazzotti", youtubeId: "uXcl8tOS_3c", color: "#10b981", pdf: "Più Bella Cosa.pdf" },
    { title: "Torna a casa", artist: "Måneskin", youtubeId: "kYQUdCPtvi0", color: "#a855f7", pdf: "Torna a casa.pdf" },
    { title: "Vivere La Vita", artist: "Mannarino", youtubeId: "ezHjGdBh830", color: "#f59e0b", pdf: "Vivere la Vita.pdf" }
  ];

  return (
    <div className="tano-interactive-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: '24px', padding: '2rem', color: 'white', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, background: 'linear-gradient(to right, #10b981, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Radio Didattica Tano</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Escucha 5 canciones didácticas para aprender italiano cantando.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', flex: 1, justifyContent: 'center' }}>
        {/* Reproductor de YouTube Embed */}
        <div style={{ flex: '1 1 400px', maxWidth: '600px', background: 'rgba(0,0,0,0.4)', borderRadius: '20px', padding: '1rem', display: 'flex', flexDirection: 'column', border: `1px solid ${songs[currentSong].color}40`, boxShadow: `0 10px 30px ${songs[currentSong].color}20` }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', background: '#000' }}>
            <iframe 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              src={`https://www.youtube.com/embed/${songs[currentSong].youtubeId}?autoplay=0&rel=0`}
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem', color: songs[currentSong].color }}>{songs[currentSong].title}</h3>
            <p style={{ margin: '0.5rem 0', color: '#94a3b8' }}>{songs[currentSong].artist}</p>
            <a href={`/media/tano/${songs[currentSong].pdf}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.3s' }}>
              Abrir Letra (PDF)
            </a>
          </div>
        </div>

        {/* Lista de Canciones */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {songs.map((song, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentSong(idx)}
              style={{ 
                padding: '1rem 1.5rem', borderRadius: '16px', cursor: 'pointer',
                background: currentSong === idx ? `${song.color}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${currentSong === idx ? song.color : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.3s',
                transform: currentSong === idx ? 'scale(1.02)' : 'none'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: song.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                {idx + 1}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: currentSong === idx ? song.color : 'white' }}>{song.title}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InteractiveRistorante = () => {
  const [speaking, setSpeaking] = useState(null);

  const vocabulary = [
    { it: "Il Menu", es: "El Menú", icon: "📋", frase: "Posso avere il menu, per favore?" },
    { it: "Il Cameriere", es: "El Mesero", icon: "🤵", frase: "Cameriere, un tavolo per due, per favore!" },
    { it: "Il Conto", es: "La Cuenta", icon: "🧾", frase: "Il conto, per favore. Grazie mille!" },
    { it: "Il Piatto", es: "El Plato", icon: "🍽️", frase: "Che piatto delizioso! Complimenti allo chef!" },
    { it: "Il Bicchiere", es: "El Vaso", icon: "🥛", frase: "Un bicchiere d'acqua, per favore." },
    { it: "La Pizza", es: "La Pizza", icon: "🍕", frase: "Una pizza margherita, per favore!" },
    { it: "Il Caffè", es: "El Café", icon: "☕", frase: "Un caffè espresso, grazie!" },
    { it: "Buon Appetito", es: "Buen Provecho", icon: "✨", frase: "Buon appetito a tutti!" }
  ];

  const speakItalian = (item, index) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(index);

    // First speak the word
    const wordUtterance = new SpeechSynthesisUtterance(item.it);
    wordUtterance.lang = 'it-IT';
    wordUtterance.rate = 0.8;
    wordUtterance.pitch = 1.1;

    // Then speak the example sentence
    const phraseUtterance = new SpeechSynthesisUtterance(item.frase);
    phraseUtterance.lang = 'it-IT';
    phraseUtterance.rate = 0.85;
    phraseUtterance.pitch = 1.0;
    phraseUtterance.onend = () => setSpeaking(null);

    window.speechSynthesis.speak(wordUtterance);
    window.speechSynthesis.speak(phraseUtterance);
  };

  return (
    <div className="tano-interactive-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', borderRadius: '24px', padding: '2rem', color: 'white', overflowY: 'auto' }}>
      <Coffee size={70} color="#fcd34d" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', textAlign: 'center', color: '#fcd34d' }}>Benvenuti al Ristorante!</h2>
      <p style={{ fontSize: '1rem', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '600px', color: '#94a3b8' }}>
        🔊 <strong>Haz clic en cada tarjeta</strong> para escuchar la pronunciación italiana y una frase de ejemplo.
      </p>
      {speaking !== null && (
        <div style={{ marginBottom: '1rem', padding: '0.8rem 2rem', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', borderRadius: '30px', color: '#34d399', fontWeight: 'bold', fontSize: '1rem', animation: 'pulse 1s infinite' }}>
          🎙️ {vocabulary[speaking]?.frase}
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center', width: '100%' }}>
        {vocabulary.map((item, i) => (
          <motion.div 
            key={i}
            onClick={() => speakItalian(item, i)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: speaking === i ? 'rgba(16,185,129,0.25)' : 'rgba(255,255,255,0.08)', 
              border: speaking === i ? '2px solid #10b981' : '2px solid rgba(255,255,255,0.15)', 
              padding: '1.5rem', borderRadius: '20px', cursor: 'pointer', textAlign: 'center', 
              width: '180px', height: '180px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
              boxShadow: speaking === i ? '0 0 30px rgba(16,185,129,0.5)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '3rem' }}>{speaking === i ? '🔊' : item.icon}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: speaking === i ? '#34d399' : 'white' }}>{item.it}</div>
            <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 'bold' }}>{item.es}</div>
            <div style={{ fontSize: '0.7rem', color: '#6ee7b7', opacity: 0.8 }}>← tocca per ascoltare</div>
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
    
    if ('speechSynthesis' in window) {
      // Cancel previous speech if spamming the button
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(newNum.toString());
      utterance.lang = 'it-IT';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="tano-interactive-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #064e3b, #022c22)', borderRadius: '24px', padding: '3rem', color: 'white', overflowY: 'auto' }}>
      <Gamepad2 size={60} color="#10b981" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#10b981' }}>TOMBOLA ITALIANA</h2>
      <p style={{ fontSize: '1.5rem', color: '#6ee7b7', marginBottom: '3rem', textAlign: 'center' }}>Extracción en vivo para la comunidad</p>
      
      <div className="tano-bingo-layout" style={{ display: 'flex', gap: '4rem', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <motion.div 
          className="tano-bingo-ball"
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

const TanoGlobalPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [audioError, setAudioError] = useState(false);
  
  const audioRef = useRef(null);

  const playlist = [
    { title: "Marraqueta Ponte (Los Saludos)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_saludos.mp3" },
    { title: "Marraqueta Ponte (Versión Acústica)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_saludos_alt.mp3" },
    { title: "Scusi Il Menu (En el Ristorante)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_ristorante.mp3" },
    { title: "Scusi Il Menu (Pop Remix)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_ristorante_alt1.mp3" },
    { title: "Scusi Il Menu (Acapella)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_ristorante_alt2.mp3" },
    { title: "Bingo Cartones (Los Números)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_numeros.mp3" },
    { title: "Bingo Cartones (Versión Disco)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_numeros_alt.mp3" },
    { title: "Palabras de Cortesía", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_cortesia.mp3" },
    { title: "Palabras de Cortesía (Remastered)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_cortesia_alt.mp3" },
    { title: "Palabras Mágicas (La Piazza)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_magicas.mp3" },
    { title: "La Nonna Siede (La Famiglia)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_familia.mp3" },
    { title: "La Nonna Siede (Lullaby Mix)", artist: "Francesca ft. Vecinos", duration: "🎶", src: "/tano_assets/audio/cancion_familia_alt.mp3" }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            // Ignore AbortError which happens if the user skips tracks quickly
            if (e.name !== 'AbortError') {
              console.error("Autoplay prevented or error", e);
              setIsPlaying(false);
              setAudioError(true);
            }
          });
        }
      }
    }
  }, [currentTrack, isPlaying]);

  const handleNext = () => {
    setAudioError(false);
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setAudioError(false);
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => setAudioError(true));
      setIsPlaying(true);
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if(audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div className="tano-radio-now-playing" style={{ width: '100%', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'sticky', top: '0', zIndex: 90 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 250px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)', flexShrink: 0 }}>
          <Music size={24} color="white" />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.2rem' }}>Radio Didattica Automática</div>
          <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'white', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{playlist[currentTrack].title}</h3>
          <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>{playlist[currentTrack].artist}</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 auto', justifyContent: 'center' }}>
        <button onClick={handlePrev} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='#9ca3af'}><SkipBack size={24} /></button>
        <button onClick={togglePlay} style={{ background: '#10b981', border: 'none', color: 'black', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s', flexShrink: 0 }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
          {isPlaying ? <Pause size={24} color="black" /> : <Play size={24} color="black" style={{ marginLeft: '4px' }} />}
        </button>
        <button onClick={handleNext} style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='#9ca3af'}><SkipForward size={24} /></button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 200px', justifyContent: 'center' }}>
        <Volume2 size={20} color="#9ca3af" style={{ flexShrink: 0 }} />
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} style={{ width: '100px', cursor: 'pointer', accentColor: '#10b981' }} />
      </div>

      <audio 
        id="tano-global-player-audio"
        ref={audioRef} 
        src={playlist[currentTrack].src} 
        onEnded={handleNext}
      />
    </div>
  );
};

const InteractiveKaraoke = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const songs = [
    { title: "Vivo Per Lei", artist: "Andrea Bocelli", videoId: "m5UcZ9thgPI" },
    { title: "Volare (Nel Blu Dipinto Di Blu)", artist: "Domenico Modugno", videoId: "u99ivDAqwSM" },
    { title: "La Donna è Mobile", artist: "Giuseppe Verdi", videoId: "uvhUmzBP_aI" }
  ];

  return (
    <div className="tano-interactive-container" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, #7f1d1d, #450a0a)', borderRadius: '24px', padding: '3rem', color: 'white', overflowY: 'auto' }}>
      <Music size={60} color="#f87171" style={{ marginBottom: '1rem' }} />
      <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 1rem 0', color: '#f87171', textAlign: 'center' }}>KARAOKE ENTRE VECINAS</h2>
      <p style={{ fontSize: '1.2rem', color: '#fca5a5', marginBottom: '3rem', textAlign: 'center' }}>Selecciona un clásico y practica tu pronunciación.</p>
      
      {activeVideo ? (
        <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', background: 'black', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          <button 
            onClick={() => setActiveVideo(null)}
            style={{ background: 'transparent', color: '#fca5a5', border: '1px solid #fca5a5', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s' }}>
            VOLVER A LA LISTA
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', width: '100%', maxWidth: '800px' }}>
          {songs.map((song, i) => (
            <div key={i} className="tano-karaoke-item" style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(248, 113, 113, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{song.title}</h3>
                <p style={{ margin: 0, color: '#fca5a5', fontSize: '1.1rem' }}>{song.artist}</p>
              </div>
              <button 
                onClick={() => setActiveVideo(song)}
                style={{ background: '#f87171', color: 'black', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <Volume2 size={24} /> CANTAR
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InteractiveTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameState, setGameState] = useState('playing'); // playing, checking, result

  const moneyTree = ['€ 500', '€ 1.000', '€ 2.000', '€ 3.000', '€ 5.000', '€ 10.000', '€ 20.000', '€ 50.000', '€ 100.000', '€ 250.000', '€ 500.000', '€ 1 MILIONE'];

  const questions = [
    {
      image: '/tano_assets/trivia_coffee.png',
      question: 'Come si chiama questa bevanda classica in Italia?',
      options: ['A) Un Cappuccino', 'B) Un Caffè', 'C) Un Tè', 'D) Una Birra'],
      answer: 'B) Un Caffè'
    },
    {
      image: '📝',
      question: 'Come si dice "Buenos días" in italiano?',
      options: ['A) Buonasera', 'B) Arrivederci', 'C) Buongiorno', 'D) Ciao'],
      answer: 'C) Buongiorno'
    },
    {
      image: '/tano_assets/trivia_pizza.png',
      question: 'Qual è il piatto più famoso del mondo nato a Napoli?',
      options: ['A) La Pasta', 'B) Il Gelato', 'C) La Pizza', 'D) Il Risotto'],
      answer: 'C) La Pizza'
    },
    {
      image: '🗣️',
      question: 'Cosa significa la parola "Grazie"?',
      options: ['A) Hola', 'B) Por favor', 'C) Adiós', 'D) Gracias'],
      answer: 'D) Gracias'
    },
    {
      image: '/tano_assets/trivia_colosseum.png',
      question: 'Come si chiama questo famoso monumento?',
      options: ['A) Il Colosseo', 'B) La Torre di Pisa', 'C) Il Duomo', 'D) Il Pantheon'],
      answer: 'A) Il Colosseo'
    },
    {
      image: '🏛️',
      question: 'Dove si trova esattamente il Colosseo?',
      options: ['A) A Venezia', 'B) A Firenze', 'C) A Milano', 'D) A Roma'],
      answer: 'D) A Roma'
    },
    {
      image: '/tano_assets/trivia_pasta.png',
      question: 'Come si chiama questo delizioso piatto tradizionale?',
      options: ['A) Gli Gnocchi', 'B) La Lasagna', 'C) Gli Spaghetti', 'D) I Ravioli'],
      answer: 'C) Gli Spaghetti'
    },
    {
      image: '🤌',
      question: 'Come si chiede "Por favor" in italiano?',
      options: ['A) Prego', 'B) Per favore', 'C) Scusa', 'D) Grazie'],
      answer: 'B) Per favore'
    },
    {
      image: '/tano_assets/trivia_scooter.png',
      question: 'Qual è il classico mezzo di trasporto italiano a 2 ruote?',
      options: ['A) La Ferrari', 'B) La Vespa', 'C) La Bicicletta', 'D) La Macchina'],
      answer: 'B) La Vespa'
    },
    {
      image: '🇮🇹',
      question: 'Quali sono i colori della bandiera italiana?',
      options: ['A) Verde, Bianco, Rosso', 'B) Rosso, Giallo, Verde', 'C) Blu, Bianco, Rosso', 'D) Nero, Giallo, Rosso'],
      answer: 'A) Verde, Bianco, Rosso'
    },
    {
      image: '/tano_assets/trivia_gelato.png',
      question: 'Il dolce freddo italiano per eccellenza è...',
      options: ['A) Il Tiramisù', 'B) La Panna Cotta', 'C) Il Gelato', 'D) Il Cannolo'],
      answer: 'C) Il Gelato'
    },
    {
      image: '🤝',
      question: 'Come si risponde educatamente a "Grazie"?',
      options: ['A) Prego', 'B) Scusa', 'C) Ciao', 'D) Bene'],
      answer: 'A) Prego'
    }
  ];

  const speakItalian = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(100, ctx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1); // C#5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2); // E5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3); // A5
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && !showResult) {
      speakItalian(questions[currentQuestion].question);
    }
  }, [currentQuestion, gameState, showResult]);

  const handleAnswer = (option) => {
    if (gameState !== 'playing') return;
    
    // Hablar la opción en italiano sin la letra "A) "
    const cleanOption = option.replace(/^[A-D]\)\s*/, '');
    speakItalian(cleanOption);
    
    setSelectedOption(option);
    setGameState('checking');
    
    setTimeout(() => {
      const correct = option === questions[currentQuestion].answer;
      setIsCorrect(correct);
      
      if (correct) playSound('correct');
      else playSound('error');
      
      
      setTimeout(() => {
        if (correct) {
          const nextQ = currentQuestion + 1;
          if (nextQ < questions.length) {
            setCurrentQuestion(nextQ);
            setSelectedOption(null);
            setIsCorrect(null);
            setGameState('playing');
          } else {
            setShowResult(true);
            setGameState('result');
            playSound('win');
          }
        } else {
          setShowResult(true);
          setGameState('result');
        }
      }, 2000);
    }, 1500);
  };

  const restartTrivia = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setGameState('playing');
  };

  const getButtonBg = (opt) => {
    if (selectedOption !== opt) return 'linear-gradient(to right, #1e3a8a, #312e81)';
    if (gameState === 'checking') return 'linear-gradient(to right, #d97706, #b45309)'; // Orange/Gold
    if (isCorrect) return 'linear-gradient(to right, #059669, #047857)'; // Green
    return 'linear-gradient(to right, #dc2626, #b91c1c)'; // Red
  };

  const isEmoji = (str) => !str.includes('/');

  return (
    <div className="tano-trivia-layout" style={{ width: '100%', height: '100%', display: 'flex', background: 'radial-gradient(circle at center, #1e3a8a 0%, #020617 100%)', borderRadius: '24px', color: 'white', overflow: 'hidden', position: 'relative' }}>
      
      {/* Sidebar Score (Money Tree) */}
      <div className="tano-trivia-sidebar" style={{ width: '250px', background: 'rgba(0,0,0,0.6)', borderRight: '2px solid rgba(59, 130, 246, 0.5)', display: 'flex', flexDirection: 'column-reverse', padding: '2rem 1rem', gap: '0.5rem', overflowY: 'auto' }}>
        {moneyTree.map((money, idx) => {
          const isActive = idx === currentQuestion && !showResult;
          const isPassed = idx < currentQuestion;
          return (
            <div key={idx} style={{ 
              display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', borderRadius: '8px',
              background: isActive ? '#d97706' : 'transparent',
              color: isActive ? 'white' : isPassed ? '#fbbf24' : '#64748b',
              fontWeight: isActive || isPassed ? 'bold' : 'normal',
              fontSize: isActive ? '1.2rem' : '1rem',
              transition: 'all 0.3s'
            }}>
              <span>{idx + 1}</span>
              <span>{money}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="tano-trivia-main" style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflowY: 'auto' }}>
        
        <h2 className="tano-trivia-title" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center', color: '#fbbf24', textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>CHI VUOL PARLARE ITALIANO?</h2>
        
        {showResult ? (
          <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.5)', padding: '4rem', borderRadius: '24px', border: '1px solid #fbbf24' }}>
            <h3 style={{ fontSize: '3rem', color: isCorrect ? '#34d399' : '#f87171', marginBottom: '1rem' }}>
              {isCorrect ? 'COMPLIMENTI!' : 'MAMMA MIA! HAI PERSO!'}
            </h3>
            <p style={{ fontSize: '1.8rem', marginBottom: '3rem', color: '#fbbf24' }}>
              Premio Vinto: {currentQuestion > 0 ? moneyTree[currentQuestion - 1] : '€ 0'}
            </p>
            <button onClick={restartTrivia} style={{ background: 'linear-gradient(to right, #d97706, #b45309)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '16px', fontWeight: '900', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(217, 119, 6, 0.4)' }}>
              GIOCA DI NUOVO
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
            
            <div className="tano-trivia-image" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              {isEmoji(questions[currentQuestion].image) ? (
                <span style={{ fontSize: '100px', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))' }}>{questions[currentQuestion].image}</span>
              ) : (
                <img src={questions[currentQuestion].image} alt="Trivia" style={{ height: '100%', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.1)' }} />
              )}
            </div>

            <div style={{ background: 'linear-gradient(to bottom, #1e40af, #1e3a8a)', width: '100%', padding: '2rem', borderRadius: '50px', border: '2px solid #60a5fa', marginBottom: '2rem', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)', textAlign: 'center', position: 'relative' }}>
              <h3 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 'bold' }}>{questions[currentQuestion].question}</h3>
            </div>

            <div className="tano-trivia-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%' }}>
              {questions[currentQuestion].options.map((opt, i) => (
                <button 
                  key={i} 
                  className="tano-trivia-option-btn"
                  onClick={() => handleAnswer(opt)}
                  disabled={gameState !== 'playing'}
                  style={{ 
                    background: getButtonBg(opt),
                    border: '2px solid #60a5fa', color: 'white', padding: '1.5rem', borderRadius: '40px', fontWeight: 'bold', fontSize: '1.3rem', cursor: gameState === 'playing' ? 'pointer' : 'default', transition: 'all 0.3s', textAlign: 'left', paddingLeft: '2rem',
                    boxShadow: selectedOption === opt && gameState === 'checking' ? '0 0 30px rgba(217, 119, 6, 0.8)' : '0 5px 15px rgba(0,0,0,0.3)'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------

const ProgressGuideModal = ({ completedIds, totalItems, progressPercent, onClose, onOpenViewer }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{ background: '#0f172a', borderRadius: '24px', width: '100%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: 'white' }}>Tu Guía de Progreso</h2>
            <p style={{ margin: '0.5rem 0 0 0', color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold' }}>{progressPercent}% Completado ({completedIds.length} de {totalItems} elementos)</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={24} />
          </button>
        </div>
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {TANO_MODULES.map(mod => (
            <div key={mod.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'white' }}>
                <mod.icon size={20} color="#10b981" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>{mod.title}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {mod.files.map(file => {
                  const isCompleted = completedIds.includes(file.id);
                  return (
                    <button 
                      key={file.id}
                      onClick={() => onOpenViewer(file)}
                      style={{ 
                        background: isCompleted ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', 
                        border: isCompleted ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)', 
                        padding: '1rem', borderRadius: '12px', textAlign: 'left', cursor: 'pointer', 
                        display: 'flex', alignItems: 'center', gap: '1rem', color: 'white',
                        opacity: isCompleted ? 0.7 : 1
                      }}
                    >
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: isCompleted ? 'none' : '2px solid rgba(255,255,255,0.3)', background: isCompleted ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {isCompleted && <CheckCircle size={16} color="white" />}
                      </div>
                      <div style={{ flex: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>{file.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function TanoPortal() {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(TANO_MODULES[0]);
  const [viewerFile, setViewerFile] = useState(null);
  const [user, setUser] = useState(null);
  const [completedIds, setCompletedIds] = useState([]); 
  const [showProgressGuide, setShowProgressGuide] = useState(false);
  const [isWrongDomain, setIsWrongDomain] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const totalItems = TANO_MODULES.flatMap(m => m.files).length;
  const progressPercent = Math.min(100, Math.floor((completedIds.length / totalItems) * 100));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Restricción de dominio
    const hostname = window.location.hostname;
    if (!hostname.includes('entrevecinas.cl') && !hostname.includes('localhost') && !hostname.includes('127.0.0.1') && !hostname.includes('pages.dev') && !hostname.includes('vecinoslaserena.cl')) {
      setIsWrongDomain(true);
    }

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
    const saved = localStorage.getItem(`tano_progress_v2_${userId}`);
    if (saved) {
      try {
        setCompletedIds(JSON.parse(saved));
      } catch (e) {
        setCompletedIds([]);
      }
    } else {
      // Intentar migrar progreso antiguo
      const oldSaved = localStorage.getItem(`tano_progress_${userId}`);
      if (oldSaved) {
        const oldPercent = parseInt(oldSaved);
        const allIds = TANO_MODULES.flatMap(m => m.files.map(f => f.id));
        const itemsToMigrate = Math.floor((oldPercent / 100) * totalItems);
        const migratedIds = allIds.slice(0, itemsToMigrate);
        setCompletedIds(migratedIds);
        localStorage.setItem(`tano_progress_v2_${userId}`, JSON.stringify(migratedIds));
      }
    }
  };

  const handleLogin = async () => {
    // Determine the correct redirect URL: always go back to /tano on this site
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const redirectBase = isLocal 
      ? window.location.origin 
      : 'https://www.entrevecinas.cl';
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: redirectBase + '/tano',
        queryParams: { prompt: 'select_account' }
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCompletedIds([]);
  };

  const handleDownloadDiploma = async () => {
    try {
      const audio = new Audio('https://www.myinstants.com/media/sounds/final-fantasy-v-victory-fanfare.mp3');
      audio.play().catch(e => console.log('Audio play failed', e));
    } catch(e) {}

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#10b981', '#ffffff', '#ef4444', '#fcd34d']
    });

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([800, 600]);
      const { width, height } = page.getSize();
      
      page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.95, 0.95, 0.93) });
      page.drawRectangle({ x: 20, y: 20, width: width - 40, height: height - 40, borderColor: rgb(0.8, 0.6, 0), borderWidth: 5 });
      page.drawRectangle({ x: 25, y: 25, width: width - 50, height: height - 50, borderColor: rgb(0.1, 0.5, 0.2), borderWidth: 2 });

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

      page.drawText('Certificazione di Completamento', { x: 140, y: 450, size: 36, font, color: rgb(0.1, 0.5, 0.2) });
      page.drawText('Italiano con Francesca', { x: 260, y: 400, size: 26, font: fontItalic, color: rgb(0.8, 0.2, 0.2) });
      
      const studentName = user?.email || 'Studente';
      page.drawText('Si certifica che:', { x: 335, y: 330, size: 18, font: fontNormal, color: rgb(0, 0, 0) });
      
      const nameWidth = font.widthOfTextAtSize(studentName, 30);
      page.drawText(studentName, { x: (width - nameWidth) / 2, y: 280, size: 30, font, color: rgb(0, 0, 0) });

      page.drawText('Ha completato con successo il corso interattivo di lingua e cultura italiana.', { x: 120, y: 220, size: 16, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });

      page.drawText('Especialista Francesca Vives Figueroa', { x: 230, y: 120, size: 18, font, color: rgb(0, 0, 0) });
      page.drawLine({ start: { x: 200, y: 110 }, end: { x: 600, y: 110 }, thickness: 1, color: rgb(0, 0, 0) });

      try {
        const fetchLogo = async (url) => {
          const res = await fetch(url);
          if (res.ok) return await res.arrayBuffer();
          return null;
        };

        const [logo1Bytes, logo2Bytes] = await Promise.all([
          fetchLogo('/media/logos/logo1.png'), // vecinoslaserena red
          fetchLogo('/media/logos/logo4.png')  // entrevecinas dark
        ]);

        const targetHeight = 50;

        if (logo1Bytes) {
          const img1 = await pdfDoc.embedPng(logo1Bytes);
          const dims1 = img1.scale(targetHeight / img1.height); 
          page.drawImage(img1, { x: 50, y: height - dims1.height - 40, width: dims1.width, height: dims1.height });
        }

        if (logo2Bytes) {
          const img2 = await pdfDoc.embedPng(logo2Bytes);
          const dims2 = img2.scale(targetHeight / img2.height); 
          page.drawImage(img2, { x: width - dims2.width - 50, y: height - dims2.height - 40, width: dims2.width, height: dims2.height });
        }
      } catch (err) {
        console.error('Error embedding logos in PDF', err);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      openViewer({ id: 'diploma', name: 'Diploma de Certificación', type: 'pdf', path: blobUrl });
    } catch (e) {
      console.error('Error generating diploma', e);
    }
  };

  const openViewer = (file) => {
    setViewerFile(file);
    setShowProgressGuide(false);
    if (user && file.id && !completedIds.includes(file.id)) {
      const nextIds = [...completedIds, file.id];
      setCompletedIds(nextIds);
      localStorage.setItem(`tano_progress_v2_${user.id}`, JSON.stringify(nextIds));
    }
  };

  if (isWrongDomain) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#020617', color: 'white', fontFamily: '"Outfit", sans-serif', padding: '2rem', textAlign: 'center' }}>
        <BookOpen size={80} color="#ef4444" style={{ marginBottom: '2rem' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ef4444' }}>Acceso Restringido</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af', maxWidth: '600px', lineHeight: 1.6, marginBottom: '2rem' }}>
          El curso de Italiano con la arquitecta Francesca Vives es una experiencia exclusiva de <strong>Entre Vecinas</strong>.
        </p>
        <button onClick={() => window.location.href = 'https://www.entrevecinas.cl/tano'} style={{ background: '#10b981', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
          Ir a www.entrevecinas.cl/tano
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #064e3b 0%, #111827 50%, #7f1d1d 100%)', color: 'white', fontFamily: '"Outfit", sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .tano-header { padding: 1.5rem 1rem !important; flex-direction: column !important; gap: 1.5rem !important; text-align: center !important; position: static !important; }
          .tano-header h1 { font-size: 2.2rem !important; }
          .tano-header p { font-size: 1rem !important; }
          .tano-header-actions { flex-direction: column !important; width: 100% !important; gap: 1rem !important; }
          .tano-header-actions > * { width: 100% !important; justify-content: center !important; }
          .tano-main { padding: 1rem !important; gap: 2rem !important; flex-direction: column !important; }
          .tano-sidebar { flex: none !important; width: 100% !important; max-height: none !important; padding-right: 0 !important; }
          .tano-content { flex: none !important; width: 100% !important; }
          .tano-content-card { padding: 1.5rem !important; border-radius: 20px !important; }
          .tano-content-header { flex-direction: column !important; text-align: center !important; gap: 1rem !important; }
          .tano-content-header h2 { font-size: 1.8rem !important; }
          .tano-viewer-header { padding: 1rem !important; flex-direction: column !important; gap: 1rem !important; text-align: center !important; }
          .tano-interactive-container { padding: 1rem !important; overflow-y: auto !important; }
          .tano-bingo-layout { flex-direction: column !important; gap: 2rem !important; }
          .tano-bingo-ball { width: 150px !important; height: 150px !important; font-size: 5rem !important; border-width: 5px !important; }
          .tano-radio-now-playing { flex-direction: column !important; text-align: center !important; gap: 1rem !important; padding: 1.5rem !important; position: static !important; }
          .tano-radio-now-playing > div:first-child { flex-direction: column !important; }
          .tano-radio-now-playing > div:first-child > div:first-child { width: 80px !important; height: 80px !important; margin: 0 auto !important; }
          .tano-karaoke-item { flex-direction: column !important; text-align: center !important; gap: 1rem !important; padding: 1.5rem !important; }
          .tano-trivia-layout { flex-direction: column !important; overflow-y: auto !important; }
          .tano-trivia-sidebar { display: none !important; }
          .tano-trivia-main { padding: 1rem !important; }
          .tano-trivia-title { font-size: 1.5rem !important; margin-bottom: 1rem !important; }
          .tano-trivia-image { height: 120px !important; margin-bottom: 1rem !important; }
          .tano-trivia-image span { font-size: 80px !important; }
          .tano-trivia-options { grid-template-columns: 1fr !important; gap: 0.5rem !important; }
          .tano-trivia-option-btn { font-size: 1rem !important; padding: 1rem !important; }
        }
      `}</style>

      {/* Viewer Overlay */}
      <AnimatePresence>
        {viewerFile && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(2, 6, 23, 0.98)', display: 'flex', flexDirection: 'column' }}
          >
            <div className="tano-viewer-header" style={{ padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Star size={24} color="#fcd34d" style={{ flexShrink: 0 }} />
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white', letterSpacing: '1px' }}>{viewerFile.name}</h3>
              </div>
              <button onClick={() => setViewerFile(null)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', width: '100%', justifyContent: 'center' }}>
                <X size={20} /> CERRAR
              </button>
            </div>
            <div style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              {viewerFile.type === 'pdf' ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <iframe src={viewerFile.id === 'diploma' ? viewerFile.path : viewerFile.path + '#toolbar=0'} style={{ width: '100%', flex: 1, border: 'none', borderRadius: '24px', background: 'white' }} title="PDF Viewer" />
                  <a href={viewerFile.path} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1rem', background: '#10b981', color: 'white', textAlign: 'center', borderRadius: '12px', fontWeight: 'bold', textDecoration: 'none' }}>
                    📥 Si el documento no carga, pulsa aquí para abrirlo directamente
                  </a>
                </div>
              ) : viewerFile.type === 'img' ? (
                <img src={viewerFile.path} alt={viewerFile.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              ) : viewerFile.type === 'interactive_ristorante' ? (
                <InteractiveRistorante />
              ) : viewerFile.type === 'interactive_bingo' ? (
                <InteractiveBingo />
              ) : viewerFile.type === 'interactive_karaoke' ? (
                <InteractiveKaraoke />
              ) : viewerFile.type === 'interactive_trivia' ? (
                <InteractiveTrivia />
              ) : viewerFile.type === 'interactive_radio' ? (
                <TanoMusicPlayer />
              ) : viewerFile.type === 'interactive_map' ? (
                <ItalyRegionsMap />
              ) : viewerFile.type === 'interactive_translator' ? (
                <TanoTranslator />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="tano-header" style={{ padding: '1rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <img src="/tano_assets/francesca_formal.png" alt="Francesca Vives" style={{ height: '160px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))', marginTop: '-20px', marginBottom: '-20px' }} onError={(e) => e.target.style.display = 'none'} />
          <div>
            <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 900, letterSpacing: '-1px' }}>
              <span style={{ color: '#10b981' }}>Italiano</span>{' '}
              <span style={{ color: '#ffffff' }}>con</span>{' '}
              <span style={{ color: '#ef4444' }}>Francesca</span>
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#9ca3af', fontSize: '1.2rem', fontWeight: 'bold' }}>Curso Básico Interactivo • Arquitecta Francesca&nbsp;Vives</p>
          </div>
        </div>
        <div className="tano-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                onClick={() => setShowProgressGuide(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(16, 185, 129, 0.2)'} 
                onMouseLeave={e => e.currentTarget.style.background='rgba(16, 185, 129, 0.1)'}
                title="Ver Guía de Progreso"
              >
                <User size={24} color="#10b981" />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '900', color: 'white' }}>{user.email}</div>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>
                    Progreso: {progressPercent}% 
                    {progressPercent >= 100 && (
                      <span 
                        onClick={(e) => { e.stopPropagation(); handleDownloadDiploma(); }}
                        style={{ marginLeft: '0.5rem', textDecoration: 'underline', cursor: 'pointer', color: '#fcd34d' }}
                      >
                        - ¡Descarga tu certificado!
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.8rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(239, 68, 68, 0.2)'} onMouseLeave={e => e.currentTarget.style.background='rgba(239, 68, 68, 0.1)'} title="Cerrar sesión">
                <LogOut size={20} />
              </button>
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

      {/* Global Music Player below header */}
      <TanoGlobalPlayer />

      <main className="tano-main" style={{ padding: '4rem', maxWidth: '1600px', margin: '0 auto', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        
        {/* Quick Interactive Banners (Mini Ads) */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '1rem' }}>
          
          {/* Karaoke Banner */}
          <div 
            onClick={() => setViewerFile({ name: 'Karaoke Entre Vecinas', type: 'interactive_karaoke', path: '' })}
            style={{ background: 'linear-gradient(135deg, #7f1d1d, #b91c1c)', borderRadius: '20px', padding: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 10px 30px rgba(185, 28, 28, 0.4)', transition: 'transform 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px' }}><Music size={32} color="white" /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'white', fontWeight: 900 }}>Karaoke Entre Vecinas</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#fca5a5', fontSize: '0.9rem', fontWeight: 'bold' }}>¡Canta los clásicos!</p>
            </div>
          </div>

          {/* Trivia Banner */}
          <div 
            onClick={() => setViewerFile({ name: 'Trivia Culturale', type: 'interactive_trivia', path: '' })}
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)', borderRadius: '20px', padding: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 10px 30px rgba(29, 78, 216, 0.4)', transition: 'transform 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px' }}><Award size={32} color="white" /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'white', fontWeight: 900 }}>Trivia Culturale</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#bfdbfe', fontSize: '0.9rem', fontWeight: 'bold' }}>Pon a prueba tu italiano</p>
            </div>
          </div>

          {/* Bingo Banner */}
          <div 
            onClick={() => setViewerFile({ name: 'Giochi: Bingo Italiano', type: 'interactive_bingo', path: '' })}
            style={{ background: 'linear-gradient(135deg, #064e3b, #047857)', borderRadius: '20px', padding: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 10px 30px rgba(4, 120, 87, 0.4)', transition: 'transform 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px' }}><Gamepad2 size={32} color="white" /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'white', fontWeight: 900 }}>Tombola (Bingo)</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#6ee7b7', fontSize: '0.9rem', fontWeight: 'bold' }}>Juega con la comunidad</p>
            </div>
          </div>

          {/* Ristorante Banner */}
          <div 
            onClick={() => setViewerFile({ name: 'Il Ristorante', type: 'interactive_ristorante', path: '' })}
            style={{ background: 'linear-gradient(135deg, #78350f, #b45309)', borderRadius: '20px', padding: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 10px 30px rgba(180, 83, 9, 0.4)', transition: 'transform 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '16px' }}><Coffee size={32} color="white" /></div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'white', fontWeight: 900 }}>Il Ristorante</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#fcd34d', fontSize: '0.9rem', fontWeight: 'bold' }}>Práctica inmersiva</p>
            </div>
          </div>
          
        </div>
        
        {/* Sidebar Nav */}
        <aside className="tano-sidebar" style={{ flex: '1 1 350px', display: isMobile && !showMobileMenu ? 'none' : 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '90vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '900', color: '#94a3b8' }}>TU PROGRESO</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#34d399' }}>{progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} style={{ height: '100%', background: '#10b981' }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>
              {progressPercent === 100 ? "¡Academia completada!" : `Continúa explorando los módulos`}
            </div>
          </div>

          <h2 style={{ fontSize: '1.2rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '3px', margin: '0 0 1rem 0', flexShrink: 0 }}>Módulos de Aprendizaje</h2>
          {TANO_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setActiveModule(mod);
                if (window.innerWidth <= 768) {
                  setShowMobileMenu(false);
                  setTimeout(() => {
                    document.querySelector('.tano-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
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
            <h3 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.8rem', fontWeight: 900 }}>Certificación Entre Vecinas</h3>
            <p style={{ fontSize: '1rem', color: '#d1d5db', marginBottom: '2rem', lineHeight: 1.5 }}>Completa todo el material interactivo de la Profesora Francesca Vives para obtener tu diploma digital.</p>
            {user ? (
              <button 
                onClick={progressPercent >= 100 ? handleDownloadDiploma : undefined}
                style={{ width: '100%', padding: '1rem', background: progressPercent >= 100 ? '#f59e0b' : 'rgba(255,255,255,0.1)', border: progressPercent >= 100 ? 'none' : '1px solid rgba(255,255,255,0.2)', color: progressPercent >= 100 ? 'black' : '#9ca3af', borderRadius: '12px', fontWeight: '900', cursor: progressPercent >= 100 ? 'pointer' : 'not-allowed', fontSize: '1.1rem' }}>
                {progressPercent >= 100 ? 'DESCARGAR DIPLOMA' : `EN PROGRESO (${progressPercent}%)`}
              </button>
            ) : (
              <button onClick={handleLogin} style={{ width: '100%', padding: '1rem', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}>
                REGÍSTRATE GRATIS AHORA
              </button>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <section className="tano-content" style={{ flex: '2 1 700px', display: isMobile && showMobileMenu ? 'none' : 'block' }}>
          <AnimatePresence mode="wait">
            <motion.div
              className="tano-content-card"
              key={activeModule.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ background: 'rgba(0,0,0,0.4)', padding: '4rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
            >
              <div className="tano-content-header" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem', position: 'relative' }}>
                {isMobile && (
                  <button onClick={() => setShowMobileMenu(true)} style={{ position: 'absolute', top: '-1rem', left: 0, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10 }}>
                    ← Volver a Módulos
                  </button>
                )}
                <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '24px', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', marginTop: isMobile ? '2rem' : 0 }}>
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

      <AnimatePresence>
        {showProgressGuide && (
          <ProgressGuideModal 
            completedIds={completedIds} 
            totalItems={totalItems} 
            progressPercent={progressPercent} 
            onClose={() => setShowProgressGuide(false)} 
            onOpenViewer={openViewer} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
