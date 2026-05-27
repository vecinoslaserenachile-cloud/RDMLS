import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Bookmark, BookOpen, Music, Download, Heart, 
  Share2, ArrowRight, ChevronRight, HelpCircle, 
  Trophy, RefreshCw, Type, Eye, Volume2, 
  Play, Pause, SkipBack, SkipForward, Globe,
  PenTool, Star, Coffee, Mic2, FileText, Box,
  ZoomIn, Search, Home, ChevronLeft, Gamepad2, Flame
} from 'lucide-react';
import LoadingScreen from './LoadingScreen';
import StellaPinball from './StellaPinball';

const SECTIONS = [
  { id: 'intro', label: 'LA COLORINA', icon: Heart, title: 'STELLA DÍAZ VARÍN: LA PALABRA INDÓMITA' },
  { id: 'roots', label: 'RAÍCES', icon: Coffee, title: 'EL RELOJERO ANARQUISTA' },
  { id: 'musica', label: 'MÚSICA PROPIA', icon: Music, title: 'CANTO INDÓMITO: SU MÚSICA' },
  { id: 'radio', label: 'RADIO DIGITAL', icon: Mic2, title: 'RADIO DIGITAL STELLA' },
  { id: 'santiago', label: 'SANTIAGO', icon: Globe, title: 'RUPTURA DEL CANON' },
  { id: 'resistance', label: 'RESISTENCIA', icon: Star, title: 'MILITANCIA Y TRAICIÓN' },
  { id: 'word', label: 'LA PALABRA', icon: BookOpen, title: 'LA PALABRA ESCONDIDA' },
  { id: 'legacy', label: 'LEGADO', icon: PenTool, title: 'UN LEGADO INMORTAL' },
  { id: 'trivia', label: 'TRIVIA', icon: Trophy, title: 'DESAFÍO POÉTICO' }
];

const TRIVIA_QUESTIONS = [
  {
    question: "¿En qué ciudad nació Stella Díaz Varín?",
    options: ["Santiago", "La Serena", "Coquimbo", "Valparaíso"],
    answer: 1,
    hint: "Es la capital regional de la IV Región.",
    icon: Globe
  },
  {
    question: "¿Por qué apodo era conocida míticamente Stella?",
    options: ["La Poeta de Fuego", "La Colorina", "La Musa de Chile", "La Alquimista"],
    answer: 1,
    hint: "Debido a su inconfundible cabellera roja.",
    icon: Coffee
  },
  {
    question: "¿Cuál fue su primer libro publicado en 1949?",
    options: ["Tiempo, medida imaginaria", "Sinfonía del hombre fósil", "Razón de mi ser", "Los dones previsibles"],
    answer: 2,
    hint: "Fue su debut literario a los 23 años.",
    icon: BookOpen
  },
  {
    question: "¿Qué oficio tenía su padre, quien fue su mayor influencia temprana?",
    options: ["Escritor", "Relojero anarquista", "Pintor", "Minero"],
    answer: 1,
    hint: "Él le heredó la obsesión por la medida del tiempo.",
    icon: RefreshCw
  },
  {
    question: "¿Cuál es considerada su obra cumbre, publicada tras 30 años de silencio?",
    options: ["La palabra escondida", "Los dones previsibles", "Vindictas", "Obra reunida"],
    answer: 1,
    hint: "Publicada en 1992, le valió el Premio Pedro de Oña.",
    icon: Star
  }
];

const StellaRadioStation = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const playlist = [
    { title: "Podcast: Tras la Huella de la Colorina", file: "/stella/VLS_PODCAST_Stella_Leyenda.mp3", type: "PODCAST" },
    { title: "La Colorina: Poesía Original", file: "/stella/Colorina.mp3", type: "POESÍA" },
    { title: "Stella: El Canto del Fuego", file: "/stella/Stella_Colorina.mp3", type: "CANCION" },
    { title: "El Relojero Anarquista (Relato)", file: "/stella/Reloj_Anarquista.mp3", type: "HISTORIA" },
    { title: "Dragona: Resistencia Lírica", file: "/stella/Dragona.mp3", type: "RESISTENCIA" },
    { title: "La Maleta de la Memoria", file: "/stella/Maleta_Anarquista.mp3", type: "RELATO" },
    { title: "Dignidad: Stella no se vende", file: "/stella/No_se_vende.mp3", type: "VOZ" },
    { title: "La Poeta de Fuego (VLS Ed.)", file: "/stella/Poeta_de_Fuego_1.mp3", type: "POESÍA" },
    { title: "Mapocho: Arena y Clavo (Remaster)", file: "/stella/Mapocho_Arena_Clavo_Remastered.mp3", type: "MÚSICA" },
    { title: "Tempestad: La Furia del Verso", file: "/stella/Colorina_Tempestad.mp3", type: "POESÍA" }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    const handleStop = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('vls-stop-stella-radio', handleStop);
    window.addEventListener('stop-all-audio', handleStop);
    return () => {
      window.removeEventListener('vls-stop-stella-radio', handleStop);
      window.removeEventListener('stop-all-audio', handleStop);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const nextTrack = () => setCurrentTrack((currentTrack + 1) % playlist.length);
  const prevTrack = () => setCurrentTrack((currentTrack - 1 + playlist.length) % playlist.length);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div style={{
      background: 'rgba(2, 6, 23, 0.9)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '30px',
      padding: '25px',
      backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', gap: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      width: '100%',
      position: 'relative'
    }}>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={playlist[currentTrack].file} onEnded={nextTrack} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ 
          width: '50px', height: '50px', borderRadius: '15px', 
          background: 'rgba(239, 68, 68, 0.2)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center' 
        }}>
          <Mic2 size={24} color="#ef4444" />
        </div>
        <div>
          <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 950, letterSpacing: '2px', display: 'block' }}>{playlist[currentTrack].type}</span>
          <span style={{ color: 'white', fontSize: '1.1rem', fontWeight: 950 }}>{playlist[currentTrack].title}</span>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '10px' }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }} onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          audioRef.current.currentTime = percent * duration;
        }}>
          <div style={{ 
            height: '100%', background: 'linear-gradient(to right, #ef4444, #991b1b)', 
            width: duration ? `${(currentTime / duration) * 100}%` : '0%',
            transition: 'width 0.1s linear',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', right: '-4px', top: '-4px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', boxShadow: '0 0 10px #ef4444' }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px' }}>
        <button onClick={prevTrack} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          <SkipBack size={28} fill="currentColor" />
        </button>
        <button onClick={togglePlay} style={{ 
          background: '#ef4444', border: 'none', color: 'white', 
          width: '65px', height: '65px', borderRadius: '50%', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
          transition: 'transform 0.2s ease'
        }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '4px' }} />}
        </button>
        <button onClick={nextTrack} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
          <SkipForward size={28} fill="currentColor" />
        </button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 950, letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>PLAYLIST</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {playlist.map((track, i) => (
            <button key={i} onClick={() => setCurrentTrack(i)} style={{
              background: currentTrack === i ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
              border: 'none', padding: '8px 12px', borderRadius: '10px',
              color: currentTrack === i ? '#ef4444' : 'rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
              textAlign: 'left', fontSize: '0.8rem', fontWeight: 700
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentTrack === i ? '#ef4444' : 'transparent' }} />
              {track.title}
              {currentTrack === i && isPlaying && <Volume2 size={12} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StellaTrivia = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleAnswer = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const correct = idx === TRIVIA_QUESTIONS[step].answer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
    
    setTimeout(() => {
      if (step < TRIVIA_QUESTIONS.length - 1) {
        setStep(step + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 2500);
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  if (showResult) {
    const isPerfect = score === TRIVIA_QUESTIONS.length;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', border: '1px solid rgba(220, 38, 38, 0.3)', position: 'relative', overflow: 'hidden' }}
      >
        {isPerfect && (
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} 
            style={{ position: 'absolute', inset: 0, opacity: 0.05, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
          >
            <Star size={600} color="#ef4444" />
          </motion.div>
        )}
        <Trophy size={100} color="#ef4444" style={{ marginBottom: '2.5rem', filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.5))' }} />
        <h3 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
          ¡DESAFÍO COMPLETADO!
        </h3>
        <p style={{ fontSize: '1.4rem', color: '#cbd5e1', marginBottom: '2.5rem', fontWeight: 500 }}>
          Has rescatado <span style={{ color: '#ef4444', fontWeight: 900 }}>{score}</span> de <span style={{ fontWeight: 900 }}>{TRIVIA_QUESTIONS.length}</span> fragmentos de la memoria.
        </p>
        
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '2rem 3rem', borderRadius: '25px', border: '1px solid #ef4444', marginBottom: '3rem', display: 'inline-block' }}>
           <span style={{ fontSize: '0.9rem', fontWeight: 950, letterSpacing: '3px', color: '#ef4444', display: 'block', marginBottom: '0.5rem' }}>RANGO VLS_ARCHIVE</span>
           <h4 style={{ margin: 0, fontSize: '2rem', fontWeight: 950, color: 'white' }}>
             {score === TRIVIA_QUESTIONS.length ? 'ESTRELLA INDÓMITA' : score >= 3 ? 'LECTOR AVANZADO' : 'CUSTODIO DE LA PALABRA'}
           </h4>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ background: '#ef4444', color: 'white', padding: '1.2rem 3rem', borderRadius: '18px', border: 'none', fontWeight: 950, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: '0.3s' }}>
            <RefreshCw size={24} /> VOLVER A INTENTAR
          </button>
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('vls-manual-announce', { detail: { text: `Alerta ciudadana. El usuario ha completado el archivo Stella Díaz Varín con éxito. Rango alcanzado: ${score >= 4 ? 'Indómita' : 'Custodio'}.`, priority: 'high' } }));
              alert('¡Distinción sincronizada con la Red VLS!');
            }}
            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '1.2rem 3rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 950, cursor: 'pointer', transition: '0.3s' }}
          >
            NOTIFICAR RED
          </button>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', color: '#ef4444', padding: '1.2rem 3rem', borderRadius: '18px', border: '1px solid #ef4444', fontWeight: 950, cursor: 'pointer', transition: '0.3s' }}
          >
            VOLVER AL SITIO
          </button>
        </div>
      </motion.div>
    );
  }

  const q = TRIVIA_QUESTIONS[step];
  const QIcon = q.icon || HelpCircle;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
      {/* Progreso Visual Superior */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ color: '#ef4444', fontWeight: 950, letterSpacing: '4px', fontSize: '0.8rem' }}>
          FRAGMENTO {step + 1} / {TRIVIA_QUESTIONS.length}
        </span>
        <div style={{ display: 'flex', gap: '5px' }}>
          {TRIVIA_QUESTIONS.map((_, i) => (
            <div key={i} style={{ 
              width: '12px', height: '12px', borderRadius: '50%', 
              background: i < step ? '#ef4444' : i === step ? 'white' : 'rgba(255,255,255,0.1)',
              transition: '0.3s'
            }} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{ marginBottom: '3.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div style={{ 
            width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', 
            border: '2px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 2rem auto', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.2)' 
          }}>
            <QIcon size={45} color="#ef4444" />
          </div>
          <h3 style={{ fontSize: isMobile ? '1.8rem' : '2.8rem', fontWeight: 950, color: 'white', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            {q.question}
          </h3>
          {q.hint && selectedOption === null && (
            <div style={{ color: '#94a3b8', fontSize: '1rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <HelpCircle size={18} /> Pista: {q.hint}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
        {q.options.map((opt, i) => (
          <motion.button 
            key={i} 
            whileHover={selectedOption === null ? { scale: 1.03, background: 'rgba(255,255,255,0.07)' } : {}}
            whileTap={selectedOption === null ? { scale: 0.97 } : {}}
            animate={selectedOption === i && !isCorrect ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={() => handleAnswer(i)}
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '28px',
              border: '2px solid rgba(255,255,255,0.05)',
              background: selectedOption === i 
                ? (isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                : (selectedOption !== null && i === q.answer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)'),
              borderColor: selectedOption === i 
                ? (isCorrect ? '#10b981' : '#ef4444')
                : (selectedOption !== null && i === q.answer ? '#10b981' : 'rgba(255,255,255,0.05)'),
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 900,
              cursor: selectedOption === null ? 'pointer' : 'default',
              transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: selectedOption === i ? '0 15px 35px rgba(0,0,0,0.4)' : 'none'
            }}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ marginTop: '3rem', textAlign: 'center' }}
          >
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '15px', 
              padding: '1.2rem 2.5rem', borderRadius: '50px', 
              background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
              color: isCorrect ? '#10b981' : '#ef4444',
              fontWeight: 950, fontSize: '1.3rem', letterSpacing: '1px' 
            }}>
              {isCorrect ? <Star fill="#10b981" /> : <X strokeWidth={3} />}
              {isCorrect ? '¡FRAGMENTO RESCATADO!' : 'ERROR EN LA MEMORIA'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function VLSNewsStella({ onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('intro');
  const [textScale, setTextScale] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGlobalMinimized, setIsGlobalMinimized] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('vls-stop-radio'));
    return () => { 
      document.body.style.overflow = ''; 
    };
  }, []);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const handleMaximize = () => setIsGlobalMinimized(false);
    window.addEventListener('stella-force-maximize', handleMaximize);

    // SEO & Google Discover Optimization
    const title = "Stella Díaz Varín: La Palabra Indómita | Archivo Digital VLS";
    const desc = "Explora el legado poético de Stella Díaz Varín. Archivo interactivo, radio digital y trivia sobre 'La Colorina'. Un homenaje de Vecinos La Serena.";
    const imageUrl = "https://www.vecinoslaserena.cl/stella/stella_bg.png";

    document.title = title;
    
    // Meta Tags Update
    const metaTags = [
      { name: 'description', content: desc },
      { name: 'keywords', content: 'Stella Díaz Varín, La Colorina, Poesía Chilena, La Serena, Patrimonio, Cultura, Vecinos La Serena, Literatura' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: imageUrl },
      { property: 'og:url', content: 'https://www.vecinoslaserena.cl/stella' },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'author', content: 'Municipalidad de La Serena / Vecinos La Serena' }
    ];

    metaTags.forEach(tag => {
      let el = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (tag.name) el.setAttribute('name', tag.name);
        if (tag.property) el.setAttribute('property', tag.property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // Canonical Link Update
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.vecinoslaserena.cl/stella');

    // JSON-LD Structured Data for Google News/Discover
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": title,
      "image": [imageUrl],
      "datePublished": "2026-04-24T00:00:00-04:00",
      "dateModified": new Date().toISOString(),
      "author": [{
        "@type": "Organization",
        "name": "Vecinos La Serena",
        "url": "https://www.vecinoslaserena.cl"
      }],
      "publisher": {
        "@type": "Organization",
        "name": "Vecinos La Serena Chile",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.vecinoslaserena.cl/logo.png"
        }
      },
      "description": desc
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'stella-seo-jsonld';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      window.removeEventListener('stella-force-maximize', handleMaximize);
      const scriptEl = document.getElementById('stella-seo-jsonld');
      if (scriptEl) scriptEl.remove();
    };
  }, []);

  const [pdfUrl, setPdfUrl] = useState(null);
  const [showSerenito, setShowSerenito] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(null);
  const [isPinballOpen, setIsPinballOpen] = useState(false);

  const goToNextTab = () => {
    const currentIndex = SECTIONS.findIndex(s => s.id === activeTab);
    if (currentIndex < SECTIONS.length - 1) {
      setActiveTab(SECTIONS[currentIndex + 1].id);
      // Scroll content to top
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const content = {
    intro: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '1.5rem' }}>
          La historia de la literatura nacional está plagada de figuras ilustres, pero pocas poseen la fuerza telúrica y la potencia desinstaladora de Stella Díaz Varín (1926-2006).
        </p>
        <p>
          Nacida en La Serena un 11 de agosto de 1926, Stella no solo fue una de las voces más singulares de la Generación del 50, sino que se erigió como una demiurga creadora que fracturó para siempre la lírica tradicional chilena. Conocida míticamente como «La Colorina» por su inconfundible cabellera de fuego, su legado poético y vital exige hoy ser rescatado de la mera anécdota bohemia para ser comprendido en toda su abismal hondura filosófica y de resistencia.
        </p>

        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'rgba(220, 38, 38, 0.1)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
            <h4 style={{ color: '#ef4444', fontWeight: 950, marginBottom: '10px' }}>NACIMIENTO</h4>
            <p style={{ margin: 0 }}>11 de Agosto, 1926<br />La Serena, Chile</p>
          </div>
          <div style={{ background: 'rgba(220, 38, 38, 0.1)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
            <h4 style={{ color: '#ef4444', fontWeight: 950, marginBottom: '10px' }}>GENERACIÓN</h4>
            <p style={{ margin: 0 }}>Generación del 50<br />Lírica de Vanguardia</p>
          </div>
          <div style={{ background: 'rgba(220, 38, 38, 0.1)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
            <h4 style={{ color: '#ef4444', fontWeight: 950, marginBottom: '10px' }}>LEGADO</h4>
            <p style={{ margin: 0 }}>Insumisión Poética<br />Voz Cósmica y Pagana</p>
          </div>
        </div>
      </div>
    ),
    roots: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <p>
              El carácter volcánico de Stella comenzó a forjarse en las calles de La Serena. Su mayor influencia temprana fue su padre, un relojero anarquista que le heredó la obsesión por la medida del tiempo.
            </p>
            <p>
              Su muerte, cuando Stella tenía apenas siete años, puso un abrupto fin a su infancia feliz, transformando su hogar en una lúgubre "casa de mujeres" que marcaría su melancolía existencial.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '20px', borderRadius: '20px', border: '1px solid #ef4444', textAlign: 'center' }}>
              <Coffee size={32} color="#ef4444" style={{ marginBottom: '10px' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 900, display: 'block' }}>INFANCIA</span>
              <span style={{ fontSize: '0.8rem' }}>La Serena</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
              <RefreshCw size={32} color="#ef4444" style={{ marginBottom: '10px' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 900, display: 'block' }}>OFICIO PADRE</span>
              <span style={{ fontSize: '0.8rem' }}>Relojero</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-15px', left: '40px', background: '#ef4444', padding: '4px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 950 }}>EL GRAN VIAJE (1947)</div>
          <p style={{ fontStyle: 'italic', margin: 0, fontSize: '1.2rem', lineHeight: '1.6', color: 'white' }}>
            "Desafiando la férrea oposición familiar, viajó a la capital en 1947, haciendo el trayecto en la pisadera del tren Longitudinal Norte, soportando el viento y el frío, armada solo con una vieja maleta y una carpeta con sus poemas."
          </p>
        </div>
      </div>
    ),
    musica: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <div className="glass-panel" style={{ padding: isMobile ? '1.5rem' : '3rem', borderRadius: '40px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>Canto <span style={{ color: '#ef4444' }}>Indómito</span></h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '2rem' }}>
                La voz de Stella no solo se plasmó en el papel. Aquí recopilamos su música, sus lecturas y los podcast que mantienen vivo su legado sonoro en alta fidelidad.
              </p>
              <StellaRadioStation />
            </div>
            <div style={{ position: 'relative', display: isMobile ? 'none' : 'block' }}>
              <img src="/stella/stella_bg.png" alt="Stella Music" style={{ width: '100%', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'grayscale(0.2) sepia(0.2)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(239, 68, 68, 0.9)', padding: '10px 20px', borderRadius: '15px', fontWeight: 950, fontSize: '0.8rem' }}>MÚSICA Y VOZ ORIGINAL</div>
            </div>
          </div>
        </div>
      </div>
    ),
    radio: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <div className="glass-panel" style={{
          padding: '3rem', borderRadius: '40px', border: '1px solid rgba(239, 68, 68, 0.3)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 1) 100%)',
          position: 'relative', overflow: 'hidden', marginBottom: '2rem'
        }}>
          <div style={{
            position: 'absolute', top: '20px', right: '30px',
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(239, 68, 68, 0.1)', padding: '5px 15px',
            borderRadius: '20px', border: '1px solid #ef4444'
          }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444',
              boxShadow: '0 0 10px #ef4444', animation: 'pulse 1.5s infinite'
            }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#ef4444', letterSpacing: '2px' }}>ON AIR</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem', letterSpacing: '-1px' }}>
                Estudio <span style={{ color: '#ef4444' }}>Indómito</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Bienvenido a la radioemisora digital de Stella Díaz Varín. Un espacio de difusión literaria que transmite las 24 horas la palabra de «La Colorina».
              </p>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <StellaRadioStation />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img 
                src="/stella/Stella Díaz Varín.png" 
                alt="Stella Radio" 
                style={{ width: '100%', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', filter: 'grayscale(0.3) contrast(1.2)' }} 
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
             <Mic2 size={30} color="#ef4444" style={{ marginBottom: '10px' }} />
             <h4 style={{ margin: 0, fontWeight: 900 }}>ALTA FIDELIDAD</h4>
             <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Audio remasterizado VLS</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
             <Globe size={30} color="#ef4444" style={{ marginBottom: '10px' }} />
             <h4 style={{ margin: 0, fontWeight: 900 }}>GLOBAL STREAM</h4>
             <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Acceso desde todo el mundo</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
             <Volume2 size={30} color="#ef4444" style={{ marginBottom: '10px' }} />
             <h4 style={{ margin: 0, fontWeight: 900 }}>DIGITAL ARCHIVE</h4>
             <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>4 pistas en rotación</p>
          </div>
        </div>
      </div>
    ),
    santiago: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <p>
          A su llegada a Santiago, Stella debió abandonar sus estudios universitarios tras quedarse sin sustento económico por la clausura de los diarios donde trabajaba, como El Extra, La Opinión y La Hora. Sin embargo, su inmersión en la bohemia literaria fue inmediata y deslumbrante.
        </p>
        <p>
          Con apenas 23 años, publicó su deslumbrante debut literario, <strong>Razón de mi ser (1949)</strong>. Esta obra representó una ruptura violenta con la lírica femenina tradicional de la época, habituada a temáticas domésticas o románticas. Stella irrumpió reclamándose heredera de "larvas milenarias", asumiendo una voz poética insobornable que mezclaba símbolos de una feminidad mítica, cósmica y pagana.
        </p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '2rem' }}>
           <div style={{ flex: 1, padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '15px' }}>
              <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 900 }}>1953</span>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Sinfonía del hombre fósil</p>
           </div>
           <div style={{ flex: 1, padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '15px' }}>
              <span style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 900 }}>1959</span>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Tiempo, medida imaginaria</p>
           </div>
        </div>
      </div>
    ),
    resistance: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: '3rem' }}>
          <div>
            <p>
              El compromiso político de Stella fue tan visceral como su poesía. Marxista por convicción, militó en el Partido Comunista y fue parte de la Alianza de Intelectuales de Chile.
            </p>
            <p>
              Trágicamente, sufrió la persecución política originada por la «Ley Maldita» promulgada por González Videla.
            </p>
          </div>
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
             <h4 style={{ color: '#ef4444', fontWeight: 950, marginBottom: '1rem', fontSize: '0.9rem' }}>HITOS DE RESISTENCIA</h4>
             <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>Militancia en el Partido Comunista</li>
                <li>Defensa por Pablo Neruda ante acusaciones</li>
                <li>Sobreviviente a la persecución en dictadura</li>
                <li>Voz insobornable de la periferia</li>
             </ul>
          </div>
        </div>
      </div>
    ),
    word: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 950, color: 'white', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Los Dones <span style={{ color: '#ef4444' }}>Previsibles</span> (1992)</h2>
            <p>
              Tras más de tres décadas sin publicar un libro nuevo, sorprendió al medio literario con la que es considerada su obra cumbre. Este poemario laberíntico, oscuro y conmovedor le valió el Premio Pedro de Oña y el galardón a Mejores Obras Literarias del Consejo Nacional del Libro.
            </p>
            <p>
              El eje central de esta etapa madura es la búsqueda atormentada de la <strong>"palabra escondida"</strong>, un pacto secreto sellado al final de la infancia que la autora persigue para nombrar lo inefable de la existencia.
            </p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02, rotate: 1 }}
            style={{ 
              background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '30px', 
              border: '1px solid rgba(239, 68, 68, 0.4)', position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)', fontStyle: 'italic'
            }}
          >
            <div style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.1 }}><BookOpen size={60} color="#ef4444" /></div>
            <p style={{ fontSize: '1.1rem', color: 'white', position: 'relative', zIndex: 1 }}>
              "Busqué la palabra escondida,<br />
              la que me fue dictada<br />
              una tarde de lluvia<br />
              en el patio de los relojes."
            </p>
            <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 900, letterSpacing: '2px' }}>FRAGMENTO: LA PALABRA</span>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { t: '1949', d: 'Razón de mi ser', desc: 'Debut literario' },
            { t: '1953', d: 'Sinfonía del hombre fósil', desc: 'Poesía existencial' },
            { t: '1959', d: 'Tiempo, medida imaginaria', desc: 'Consagración' }
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.3)', padding: '25px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 950, letterSpacing: '2px' }}>{item.t}</span>
               <h4 style={{ margin: '5px 0', fontSize: '1.1rem', fontWeight: 900, color: 'white' }}>{item.d}</h4>
               <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    legacy: (
      <div style={{ lineHeight: '1.8', color: '#cbd5e1' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <p>
              Stella Díaz Varín falleció en junio de 2006. Aunque en vida resintió el machismo del canon literario, hoy su figura ha experimentado un vigoroso y justo renacimiento.
            </p>
            <p>
              Para la Región de Coquimbo, Stella es hoy un bastión histórico de la descentralización. Su nombre es bandera de lucha contra el exilio impuesto a las letras regionales.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
               <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={24} color="#ef4444" /></div>
               <div>
                  <span style={{ fontWeight: 900, display: 'block' }}>Obra Reunida</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Publicada en 2011</span>
               </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
               <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={24} color="#ef4444" /></div>
               <div>
                  <span style={{ fontWeight: 900, display: 'block' }}>Documental La Colorina</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Estreno en 2008</span>
               </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', padding: '3rem', background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)', color: 'white', borderRadius: '40px', textAlign: 'center', boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}><PenTool size={150} /></div>
           <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 950, lineHeight: 1.4, position: 'relative', zIndex: 1 }}>"La poesía no es solo un oficio estético, sino un acto de insurrección frente a la muerte y el olvido."</h4>
        </div>

        {/* ─── NEW INFOGRAPHIC SECTION ─── */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 950, color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Box size={24} color="#ef4444" /> INFOGRAFÍA PATRIMONIAL VLS
          </h3>
          <div 
            style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', border: '2px solid rgba(239, 68, 68, 0.3)', cursor: 'zoom-in', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            onClick={() => {
              // Custom zoom function or reuse the existing modal if we adapt it
              setIsImageZoomed({ url: '/stella/infographic_VLS.png', title: 'Infografía Stella Díaz Varín' });
            }}
          >
            <img src="/stella/infographic_VLS.png" alt="Infografía Patrimonial Stella" style={{ width: '100%', height: 'auto' }} />
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', padding: '10px 20px', borderRadius: '15px', fontWeight: 900, fontSize: '0.8rem' }}>AMPLIAR ARCHIVO</div>
          </div>
        </div>
      </div>
    ),
    pinball: (
      <div style={{ height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(2, 6, 23, 0.5)', borderRadius: '40px', border: '2px solid rgba(239, 68, 68, 0.3)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <img src="/stella/stella_bg.png" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.5)' }} />
        </div>
        <div style={{ textAlign: 'center', zIndex: 10, padding: '2rem' }}>
          <div style={{ background: '#ef4444', display: 'inline-flex', padding: '15px', borderRadius: '50%', marginBottom: '2rem', boxShadow: '0 0 30px rgba(239, 68, 68, 0.4)' }}>
            <Gamepad2 size={50} color="white" />
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1rem', lineHeight: 1 }}>PINBALL:<br />LA PALABRA INDÓMITA</h2>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
            Desafía a los que intentaron callar a Stella. Rompe las tarjetas de la censura y el machismo con la fuerza de la palabra.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setIsPinballOpen(true); }}
            style={{ 
              background: '#ef4444', color: 'white', padding: '1.2rem 3rem', borderRadius: '50px',
              border: 'none', fontWeight: 950, fontSize: '1.2rem', cursor: 'pointer',
              boxShadow: '0 15px 30px rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '15px', margin: '0 auto'
            }}
          >
            <Flame size={24} /> INICIAR JUEGO
          </motion.button>
        </div>
      </div>
    ),
    trivia: <StellaTrivia onClose={onClose} />
  };

  if (isGlobalMinimized) {
    return (
      <div style={{
        position: 'fixed', bottom: '100px', left: '30px', zIndex: 10000001,
        width: isMobile ? 'calc(100% - 60px)' : '350px',
        pointerEvents: 'auto'
      }}>
        <motion.div 
          layoutId="stella-player-box"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: 'rgba(2, 6, 23, 0.95)', border: '2px solid #ef4444',
            borderRadius: '25px', padding: '15px', backdropFilter: 'blur(15px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444', animation: 'pulse 1.5s infinite' }}></div>
              <span style={{ fontSize: '0.6rem', fontWeight: 950, color: 'white', letterSpacing: '1px' }}>STELLA RADIO</span>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={() => setIsGlobalMinimized(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 900, cursor: 'pointer' }}>MAXIMIZAR</button>
              <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '4px', borderRadius: '6px', cursor: 'pointer' }}><X size={14}/></button>
            </div>
          </div>
          <StellaRadioStation />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#020617', zIndex: 9999999,
      display: 'flex', flexDirection: 'column', color: 'white', fontFamily: '"Outfit", sans-serif', overflow: 'hidden'
    }}>
      <AnimatePresence>{!isLoaded && <LoadingScreen />}</AnimatePresence>

      <div style={{ 
          position: 'absolute', inset: 0, opacity: 0.2,
          background: 'radial-gradient(circle at 70% 30%, #ef4444 0%, transparent 50%)',
          zIndex: 0
      }} />

      {/* ─── POETRY PARTICLES (VLS INTERACTIVE) ─── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(isMobile ? 6 : 15)].map((_, i) => (
          <motion.div
            key={i}
            className="stella-particle"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0.1
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              left: 0, top: 0,
              filter: `blur(${1 + Math.random() * 3}px)`
            }}
          />
        ))}
      </div>

      <header style={{ 
        height: '80px', borderBottom: '1px solid rgba(220, 38, 38, 0.3)', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: isMobile ? '0 1rem' : '0 2.5rem', zIndex: 100, backdropFilter: 'blur(10px)' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem' }}>
          <button 
            onClick={() => setActiveTab('intro')}
            style={{ 
              padding: '8px 12px', background: 'rgba(220, 38, 38, 0.15)', 
              border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px', color: 'white', transition: '0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220, 38, 38, 0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(220, 38, 38, 0.15)'}
          >
            <Home size={16} color="#ef4444" />
            <h1 style={{ margin: 0, fontSize: isMobile ? '0.6rem' : '0.8rem', fontWeight: 950, letterSpacing: '2px' }}>VLS_ARCHIVE</h1>
          </button>
          {!isMobile && (
            <div style={{ display: 'flex', gap: '10px', marginLeft: '1rem' }}>
               <button onClick={() => setTextScale(s => Math.max(0.8, s - 0.1))} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 950 }}>T -</button>
               <button onClick={() => setTextScale(s => Math.min(1.5, s + 0.1))} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 950 }}>T +</button>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('https://www.vecinoslaserena.cl/stella');
              alert('¡Enlace copiado al portapapeles! Comparte la palabra de Stella.');
            }}
            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.6rem', borderRadius: '10px', fontWeight: '950', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Share2 size={20} />
            {!isMobile && 'COMPARTIR'}
          </button>
          <button 
            onClick={() => setIsGlobalMinimized(true)} 
            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '0.6rem', borderRadius: '10px', fontWeight: '950', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={20} />
            {!isMobile && 'MINIMIZAR RADIO'}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            style={{ 
              background: isSidebarOpen ? '#ef4444' : 'rgba(239, 68, 68, 0.2)', 
              color: 'white', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '10px', 
              fontWeight: '950', 
              cursor: 'pointer', 
              border: '1px solid #ef4444', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              boxShadow: isSidebarOpen ? '0 0 25px rgba(239, 68, 68, 0.6)' : '0 0 15px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.3s'
            }}
          >
            <Music size={20} color="white" />
            {!isMobile && (isSidebarOpen ? 'OCULTAR PANEL' : 'CONTROLES MÚSICA')}
          </button>
          <button onClick={onClose} style={{ background: '#ef4444', color: 'white', padding: isMobile ? '0.6rem 1rem' : '0.6rem 2.2rem', borderRadius: '10px', fontWeight: '950', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isMobile ? <X size={20}/> : <>CERRAR <X size={20}/></>}
          </button>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', zIndex: 5, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              layoutId="stella-sidebar"
              initial={{ x: isMobile ? '-100%' : -400 }}
              animate={{ x: 0 }}
              exit={{ x: isMobile ? '-100%' : -400 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              style={{ 
                width: isMobile ? '85%' : '400px', 
                background: 'rgba(2, 6, 23, 0.98)', 
                padding: isMobile ? '1.2rem' : '2.5rem', 
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', flexDirection: 'column',
                position: isMobile ? 'fixed' : 'relative',
                top: 0, bottom: 0, left: 0, zIndex: 20000000,
                backdropFilter: 'blur(25px)'
              }}
            >
              <div style={{ marginBottom: '2rem', position: 'relative' }}>
                 <div 
                   style={{ 
                     width: '100%', aspectRatio: '1/1', borderRadius: '30px', 
                     overflow: 'hidden', border: '2px solid rgba(220, 38, 38, 0.3)', 
                     marginBottom: '1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                     position: 'relative', cursor: 'zoom-in'
                   }}
                   onClick={() => setIsImageZoomed({ url: '/stella/stella_bg.png', title: 'Stella Díaz Varín' })}
                 >
                    <img src="/stella/stella_bg.png" alt="Stella Díaz Varín" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                       <Search size={20} />
                    </div>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                   <div style={{ background: 'linear-gradient(to right, #ef4444, #991b1b)', padding: '6px 15px', borderRadius: '10px' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 950, letterSpacing: '2px' }}>LA COLORINA</span>
                   </div>
                   {isMobile && <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white' }}><X size={24}/></button>}
                 </div>
                 <h2 style={{ fontSize: '1.8rem', fontWeight: 950, lineHeight: 1 }}>STELLA <br /> DÍAZ VARÍN</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto', paddingRight: '10px', marginBottom: '1.5rem' }}>
                {SECTIONS.map(tab => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (isMobile) setTimeout(() => setIsSidebarOpen(false), 100); }} style={{ 
                    background: activeTab === tab.id ? 'rgba(220, 38, 38, 0.15)' : 'transparent', 
                    border: activeTab === tab.id ? '1px solid #ef4444' : '1px solid transparent', 
                    color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.4)', 
                    padding: '0.8rem 1.2rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textAlign: 'left', transition: '0.2s',
                    willChange: 'background, color'
                  }}>
                    <tab.icon size={16} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>{tab.label}</span>
                    {activeTab === tab.id && <motion.div layoutId="active" style={{ marginLeft: 'auto' }}><ChevronRight size={14} /></motion.div>}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 950, letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>REPRODUCTOR STELLA</span>
                <StellaRadioStation />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main style={{ 
          flex: 1, 
          padding: isMobile ? '2rem 1.2rem' : '4rem 6%', 
          overflowY: 'auto', 
          background: 'rgba(2, 6, 23, 0.2)',
          position: 'relative',
          minWidth: 0 // CRITICAL for flex-shrink/overflow
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
             {/* BREADCRUMBS / BACK BUTTON */}
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2.5rem', opacity: 0.6 }}>
                <button onClick={() => setIsGlobalMinimized(true)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 900 }}>VLS</button>
                <ChevronRight size={12} />
                <button onClick={() => setActiveTab('intro')} style={{ background: 'transparent', border: 'none', color: activeTab === 'intro' ? '#ef4444' : 'white', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 900 }}>STELLA</button>
                {activeTab !== 'intro' && (
                  <>
                    <ChevronRight size={12} />
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#ef4444' }}>{SECTIONS.find(s => s.id === activeTab).label.toUpperCase()}</span>
                  </>
                )}
             </div>

             <h2 style={{ fontSize: isMobile ? '2rem' : `${3.5 * textScale}rem`, fontWeight: 950, marginBottom: '2rem', lineHeight: 1.1 }}>{SECTIONS.find(s => s.id === activeTab).title}</h2>
             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ duration: 0.3 }} 
                  style={{ 
                    transform: isMobile ? 'none' : `scale(${textScale})`, 
                    transformOrigin: 'top left',
                    willChange: 'transform, opacity'
                  }}
                >
                  {content[activeTab]}
                </motion.div>
             </AnimatePresence>

             {activeTab !== 'trivia' && (
               <>
               <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3rem' }}>
                  <h4 style={{ color: '#ef4444', fontWeight: 950, fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '1.5rem' }}>RECURSOS DESCARGABLES</h4>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <button onClick={() => setPdfUrl('/stella/VLS_La_Palabra_Escondida_Stella.pdf')} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'white', transition: '0.3s', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                         <div style={{ padding: '12px', background: 'rgba(220, 38, 38, 0.1)', borderRadius: '12px' }}><FileText size={24} color="#ef4444" /></div>
                         <div>
                            <span style={{ fontWeight: 900, display: 'block' }}>La Palabra Escondida</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>VISTA INTERNA · PDF</span>
                         </div>
                         <Eye size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                      </button>
                      <button onClick={() => setPdfUrl('/stella/VLS_Stella_Hidden_Word.pdf')} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'white', transition: '0.3s', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
                         <div style={{ padding: '12px', background: 'rgba(220, 38, 38, 0.1)', borderRadius: '12px' }}><Globe size={24} color="#ef4444" /></div>
                         <div>
                            <span style={{ fontWeight: 900, display: 'block' }}>Hidden Word (EN)</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>VISTA INTERNA · PDF</span>
                         </div>
                         <Eye size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                      </button>
                   </div>
                </div>

                <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={goToNextTab}
                    style={{
                      background: 'linear-gradient(to right, #ef4444, #991b1b)',
                      color: 'white', padding: '1.5rem 4rem', borderRadius: '50px',
                      border: 'none', fontWeight: 950, fontSize: '1.2rem',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px',
                      boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    CONTINUAR EXPLORANDO <ArrowRight size={24} />
                  </button>
                </div>
              </>
             )}
          </div>
        </main>
      </div>
      {/* ─── SERENITO GUIDE ─── */}
      <AnimatePresence>
        {showSerenito && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{ 
              position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000,
              display: 'flex', alignItems: 'flex-end', gap: '15px', pointerEvents: 'none'
            }}
          >
            <div style={{
              background: 'rgba(2, 6, 23, 0.9)', border: '1px solid #ef4444',
              padding: '1.2rem', borderRadius: '20px', borderBottomRightRadius: '0',
              maxWidth: '280px', backdropFilter: 'blur(10px)', pointerEvents: 'auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative'
            }}>
              <button 
                onClick={() => setShowSerenito(false)}
                style={{ 
                  position: 'absolute', top: '-10px', right: '-10px', 
                  background: '#ef4444', color: 'white', border: 'none', 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 10
                }}
              >
                <X size={14} />
              </button>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'white', lineHeight: '1.5', fontWeight: 500 }}>
                "¡Hola! Soy Serenito. Te invito a explorar la vida y obra de nuestra querida Stella Díaz Varín, la voz más potente de nuestra historia literaria."
              </p>
            </div>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              border: '2px solid #ef4444', overflow: 'hidden', pointerEvents: 'auto',
              background: 'rgba(2, 6, 23, 0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
              animation: 'float-serenito 3s ease-in-out infinite'
            }}>
              <img src="/serenito_3d_humanized_2026_1774875415876.png" alt="Serenito" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobile && !isSidebarOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            style={{
              position: 'fixed', bottom: '110px', left: '20px', zIndex: 9000,
              background: 'rgba(239, 68, 68, 0.95)', color: 'white',
              width: '56px', height: '56px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.5)', border: '2px solid rgba(255,255,255,0.2)',
              cursor: 'pointer'
            }}
          >
            <Music size={28} />
          </motion.button>
        )}
      </AnimatePresence>
        <style>{`
          @keyframes float-serenito {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes float-particle {
            0%, 100% { transform: translate(0, 0); opacity: 0.2; }
            50% { transform: translate(30px, -20px); opacity: 0.5; }
          }
          .stella-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ef4444;
            border-radius: 50%;
            filter: blur(2px);
            pointer-events: none;
          }
        `}</style>

      <AnimatePresence>
        {isPinballOpen && (
          <StellaPinball onClose={() => setIsPinballOpen(false)} />
        )}
      </AnimatePresence>

      {/* ─── PDF VIEWER MODAL ─── */}
      <AnimatePresence>
        {pdfUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100000000, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(15px)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ height: '70px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <FileText color="#ef4444" />
                <span style={{ fontWeight: 900, letterSpacing: '1px' }}>LECTOR INSTITUCIONAL VLS</span>
              </div>
              <button onClick={() => setPdfUrl(null)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '8px', fontWeight: 900, cursor: 'pointer' }}>CERRAR LECTOR</button>
            </div>
            <iframe src={pdfUrl} style={{ flex: 1, border: 'none', width: '100%' }} title="VLS PDF Viewer" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* ─── IMAGE ZOOM MODAL (MAGNIFYING GLASS) ─── */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(null)}
            style={{ 
              position: 'fixed', inset: 0, zIndex: 100000001, 
              background: 'rgba(2, 6, 23, 0.98)', backdropFilter: 'blur(20px)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem', cursor: 'zoom-out'
            }}
          >
            <motion.div 
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 5 }}
              style={{ position: 'relative', maxWidth: '90vh', width: '100%' }}
            >
              <img 
                src={isImageZoomed.url} 
                alt={isImageZoomed.title} 
                style={{ width: '100%', borderRadius: '40px', border: '4px solid #ef4444', boxShadow: '0 0 100px rgba(239, 68, 68, 0.3)' }} 
              />
              <div style={{ position: 'absolute', top: '-60px', right: '0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'white', fontWeight: 950, fontSize: '1.2rem', letterSpacing: '2px' }}>{isImageZoomed.title.toUpperCase()}</span>
                <div style={{ background: '#ef4444', padding: '10px', borderRadius: '50%' }}><X size={24} color="white" /></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
