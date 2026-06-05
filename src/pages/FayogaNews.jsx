import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Heart, Wind, Flower2, Download, Music, Play, Pause, Trophy, Star, RefreshCw, HelpCircle, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

// --- GENERADOR SINTÉTICO DE CUENCO TIBETANO (Web Audio API) ---
class CuencoSynthesizer {
    constructor() {
        this.audioCtx = null;
        this.masterGain = null;
        this.oscillators = [];
        this.isPlaying = false;
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioCtx.createGain();
            this.masterGain.gain.value = 0;
            this.masterGain.connect(this.audioCtx.destination);
        }
    }

    play() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;

        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        const frequencies = [210.42, 212.5, 420.84, 631.26, 841.68]; // Fundamental + armónicos
        const gains = [0.4, 0.3, 0.15, 0.08, 0.03]; // Volumen por armónico

        const now = this.audioCtx.currentTime;
        
        // Fade in suave
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(0, now);
        this.masterGain.gain.linearRampToValueAtTime(0.5, now + 4); // 4 segundos fade in

        frequencies.forEach((freq, i) => {
            const osc = this.audioCtx.createOscillator();
            const oscGain = this.audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            // LFO para el efecto de "vibración" típica del cuenco (batimento)
            const lfo = this.audioCtx.createOscillator();
            const lfoGain = this.audioCtx.createGain();
            lfo.type = 'sine';
            lfo.frequency.value = 0.5 + (i * 0.1); // Vibración lenta
            lfoGain.gain.value = 1.5; // Profundidad de vibración de frecuencia
            
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start(now);
            
            oscGain.gain.value = gains[i];
            
            osc.connect(oscGain);
            oscGain.connect(this.masterGain);
            
            osc.start(now);
            
            this.oscillators.push({ osc, oscGain, lfo, lfoGain });
        });
    }

    stop() {
        if (!this.isPlaying || !this.audioCtx) return;
        this.isPlaying = false;
        
        const now = this.audioCtx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0, now + 3); // 3 segundos fade out

        setTimeout(() => {
            this.oscillators.forEach(({ osc, oscGain, lfo }) => {
                osc.stop();
                osc.disconnect();
                oscGain.disconnect();
                lfo.stop();
                lfo.disconnect();
            });
            this.oscillators = [];
        }, 3500);
    }
}

// --- TRIVIA COMPONENT ---
const TRIVIA_QUESTIONS = [
  {
    question: "¿Cuál es el principal objetivo que comparten la Biodanza y el Yoga según el enfoque de Fayoga Bienestar?",
    options: ["Competir físicamente con otros", "La reconexión profunda entre el cuerpo, la mente y el espíritu", "Lograr flexibilidad extrema", "Aprender coreografías complejas"],
    answer: 1,
    hint: "Ambas disciplinas buscan la unión y la sanación integral."
  },
  {
    question: "En la práctica de Biodanza, la 'vivencia' es un concepto central. ¿A qué se refiere?",
    options: ["A la experiencia intensa de estar vivo en el aquí y el ahora", "A recordar vidas pasadas", "A visualizar el futuro", "A actuar una emoción falsa"],
    answer: 0,
    hint: "Tiene que ver con la conexión directa con el momento presente."
  },
  {
    question: "Según la guía Fabiola Pastén (Fayoga.bienestar), ¿cómo ayuda el Yoga en la regulación emocional?",
    options: ["Solo mediante el cansancio físico", "A través de la respiración consciente y la meditación", "Leyendo textos antiguos sin practicar", "Ignorando las emociones negativas"],
    answer: 1,
    hint: "Involucra enfocar la mente y utilizar el prana (aire)."
  },
  {
    question: "¿Qué elemento es fundamental en la Biodanza para facilitar la conexión grupal e individual?",
    options: ["La música y el movimiento orgánico", "El silencio absoluto", "El uso de pesas y máquinas", "La memorización de pasos"],
    answer: 0,
    hint: "El sonido y el ritmo guían el fluir del cuerpo."
  },
  {
    question: "Tanto el Yoga como la Biodanza ayudan a aliviar dolencias. ¿Cuál es el enfoque curativo de Fayoga.bienestar?",
    options: ["Un cuidado mecánico de las articulaciones", "Un cuidado holístico que integra cuerpo, emociones y la relación con los demás", "El uso exclusivo de plantas medicinales", "La negación del dolor"],
    answer: 1,
    hint: "Considera al ser humano como un todo interconectado."
  }
];

const FayogaTrivia = () => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
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
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '3rem 2rem', background: '#f8fafc', borderRadius: '30px', border: '1px solid #e2e8f0', marginTop: '2rem' }}
        >
          <Trophy size={80} color="#10b981" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))' }} />
          <h3 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, marginBottom: '1rem', color: '#0f172a' }}>
            ¡VIAJE INTERIOR COMPLETADO!
          </h3>
          <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '2rem', fontWeight: 500 }}>
            Has integrado <span style={{ color: '#10b981', fontWeight: 900 }}>{score}</span> de <span style={{ fontWeight: 900 }}>{TRIVIA_QUESTIONS.length}</span> conceptos de consciencia plena.
          </p>
          
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem 2rem', borderRadius: '20px', border: '1px solid #10b981', marginBottom: '2rem', display: 'inline-block' }}>
             <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', color: '#10b981', display: 'block', marginBottom: '0.5rem' }}>NIVEL DE RECONEXIÓN</span>
             <h4 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
               {score === TRIVIA_QUESTIONS.length ? 'ALMA ILUMINADA' : score >= 3 ? 'CUERPO CONSCIENTE' : 'SEMBRADOR DE PAZ'}
             </h4>
          </div>
  
          <button onClick={reset} style={{ background: '#10b981', color: 'white', padding: '1rem 2.5rem', borderRadius: '50px', border: 'none', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: '0.3s' }}>
            <RefreshCw size={20} /> REINICIAR EXPERIENCIA
          </button>
        </motion.div>
      );
    }
  
    const q = TRIVIA_QUESTIONS[step];
  
    return (
      <div style={{ background: 'white', padding: isMobile ? '2rem 1.5rem' : '4rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginTop: '4rem', border: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '8px 20px', borderRadius: '50px', fontWeight: 900, fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '1px' }}>
                <Flower2 size={18} /> TRIVIA FABULOSA DE RECONEXIÓN
            </div>
            <h2 style={{ color: '#0f172a', fontSize: '2rem', fontWeight: 900, margin: 0 }}>Biodanza y Yoga con Fayoga.bienestar</h2>
            <p style={{ color: '#64748b', marginTop: '1rem' }}>Pon a prueba tus conocimientos sobre la integración de estas maravillosas disciplinas.</p>
        </div>

        {/* Progreso Visual */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span style={{ color: '#10b981', fontWeight: 900, letterSpacing: '2px', fontSize: '0.8rem' }}>
            PREGUNTA {step + 1} / {TRIVIA_QUESTIONS.length}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {TRIVIA_QUESTIONS.map((_, i) => (
              <div key={i} style={{ 
                width: '10px', height: '10px', borderRadius: '50%', 
                background: i < step ? '#10b981' : i === step ? '#94a3b8' : '#e2e8f0',
                transition: '0.3s'
              }} />
            ))}
          </div>
        </div>
  
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ marginBottom: '2rem', background: '#f8fafc', padding: '2rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', lineHeight: '1.4', margin: '0 0 1rem 0' }}>
              {q.question}
            </h3>
            {q.hint && selectedOption === null && (
              <div style={{ color: '#64748b', fontSize: '0.95rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={16} /> Pista: {q.hint}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
  
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>
          {q.options.map((opt, i) => (
            <motion.button 
              key={i} 
              whileHover={selectedOption === null ? { scale: 1.02 } : {}}
              whileTap={selectedOption === null ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(i)}
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '2px solid',
                background: selectedOption === i 
                  ? (isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                  : (selectedOption !== null && i === q.answer ? 'rgba(16, 185, 129, 0.1)' : 'white'),
                borderColor: selectedOption === i 
                  ? (isCorrect ? '#10b981' : '#ef4444')
                  : (selectedOption !== null && i === q.answer ? '#10b981' : '#e2e8f0'),
                color: '#334155',
                fontSize: '1.05rem',
                fontWeight: 600,
                cursor: selectedOption === null ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                boxShadow: selectedOption === i ? '0 10px 20px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', flexShrink: 0, fontWeight: 900, color: '#94a3b8' }}>
                {String.fromCharCode(65 + i)}
              </div>
              {opt}
            </motion.button>
          ))}
        </div>
  
        <AnimatePresence>
          {selectedOption !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '2rem', textAlign: 'center' }}
            >
              <div style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '10px', 
                padding: '1rem 2rem', borderRadius: '50px', 
                background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: isCorrect ? '#10b981' : '#ef4444',
                fontWeight: 900, fontSize: '1.1rem' 
              }}>
                {isCorrect ? <Star fill="#10b981" /> : <X strokeWidth={3} />}
                {isCorrect ? '¡RESPUESTA CORRECTA!' : 'CONCEPTO ERRÓNEO'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
};


export default function FayogaNews() {
    const navigate = useNavigate();
    const synthRef = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        synthRef.current = new CuencoSynthesizer();
        return () => {
            if (synthRef.current) synthRef.current.stop();
        };
    }, []);

    const toggleAudio = () => {
        if (!synthRef.current) return;
        if (isAudioPlaying) {
            synthRef.current.stop();
            setIsAudioPlaying(false);
        } else {
            synthRef.current.play();
            setIsAudioPlaying(true);
        }
    };

    return (
        <>
            <SEO
                title="Día Internacional del Yoga - La Serena"
                description="La Serena celebra el Día Internacional del Yoga con un encuentro abierto en el Coliseo Municipal."
                image="https://vecinoslaserena.cl/fayoga_coliseo.png"
            />
            <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
                {/* Navbar Simple */}
                <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#64748b', fontWeight: 'bold' }}>
                        <ArrowLeft size={20} /> Volver a Portada
                    </button>
                    
                    {/* Reproductor Sintetizado */}
                    <button 
                        onClick={toggleAudio}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '10px', 
                            background: isAudioPlaying ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                            border: `1px solid ${isAudioPlaying ? '#10b981' : '#e2e8f0'}`,
                            padding: '8px 16px', borderRadius: '50px', cursor: 'pointer',
                            color: isAudioPlaying ? '#10b981' : '#64748b', fontWeight: 'bold',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {isAudioPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        <Music size={16} />
                        <span className="hidden md:inline">{isAudioPlaying ? 'Cuenco Tibetano (Sonando)' : 'Activar Sonido Relajante'}</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="hidden sm:flex">
                        <Heart color="#10b981" />
                        <span style={{ fontWeight: 'bold', color: '#10b981' }}>BIENESTAR VLS</span>
                    </div>
                </nav>

                {/* Hero Header */}
                <header style={{ position: 'relative', height: '60vh', minHeight: '450px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <img src="/fayoga_coliseo.png" alt="Yoga Coliseo La Serena" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.3))' }} />
                    
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#10b981', color: 'white', padding: '6px 16px', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>
                            <Flower2 size={16} /> EVENTO COMUNITARIO
                        </div>
                        <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                            La Serena celebra el Día Internacional del Yoga con encuentro abierto
                        </h1>
                        <p style={{ color: '#bae6fd', fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300, maxWidth: '700px', margin: '0 auto' }}>
                            Escuelas y centros de bienestar de la región se unen en el Coliseo Municipal para una jornada gratuita de reconexión y salud integral.
                        </p>
                    </div>
                </header>

                <main style={{ maxWidth: '900px', margin: '-50px auto 4rem auto', position: 'relative', zIndex: 20, padding: '0 1rem' }}>
                    <div style={{ background: 'white', borderRadius: '30px', padding: window.innerWidth < 768 ? '2rem 1.5rem' : '4rem', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
                        
                        {/* Info rápida */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}><Calendar size={24} color="#10b981" /></div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px' }}>FECHA</div>
                                    <div style={{ fontWeight: 900, color: '#0f172a' }}>Viernes, 19 de Junio</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}><Clock size={24} color="#10b981" /></div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px' }}>HORARIO</div>
                                    <div style={{ fontWeight: 900, color: '#0f172a' }}>09:30 a 19:00 hrs</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}><MapPin size={24} color="#10b981" /></div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px' }}>LUGAR</div>
                                    <div style={{ fontWeight: 900, color: '#0f172a' }}>Coliseo Monumental</div>
                                </div>
                            </div>
                        </div>

                        {/* Eliminado el botón de descarga de PDF */}

                        {/* Contenido de la Nota */}
                        <article style={{ lineHeight: 1.8, fontSize: '1.15rem', color: '#0f172a' }}>
                            <p style={{ fontSize: '1.3rem', fontWeight: 500, color: '#0f172a', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Con el propósito de conmemorar el Día Internacional del Yoga desde su sentido original —la unión entre el cuerpo, la mente y el espíritu—, una red de escuelas y centros de bienestar locales se reunirá el próximo viernes 19 de junio en el Coliseo de La Serena. El encuentro se desarrollará de 9:30 a 19:00 horas y la entrada será liberada para toda la comunidad.
                            </p>

                            <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
                                <img src="/fayoga_poster_new_1.png" alt="Programa Yoga en La Serena" style={{ width: '100%', display: 'block', filter: 'brightness(0.9) contrast(1.2) saturate(1.1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 2, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                    <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>DÍA INTERNACIONAL DEL YOGA</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '1rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                        <span>VIERNES 19 JUNIO</span>
                                        <span style={{ color: 'white' }}>•</span>
                                        <span>09:30 A 19:00 HRS</span>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', letterSpacing: '2px', fontWeight: 800 }}>LUGAR</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Coliseo Monumental de La Serena</div>
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', letterSpacing: '2px', fontWeight: 800 }}>ORGANIZA</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Escuela Adhyatma & Centros Locales</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
                                <img src="/fayoga_poster_new_2.png" alt="Yoga Masivo en La Serena" style={{ width: '100%', display: 'block', filter: 'brightness(0.9) contrast(1.2) saturate(1.1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', zIndex: 2, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                    <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>RECONEXIÓN Y SALUD INTEGRAL</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '1rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                        <span>ENTRADA LIBERADA</span>
                                        <span style={{ color: 'white' }}>•</span>
                                        <span>PARA TODA LA COMUNIDAD</span>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', letterSpacing: '2px', fontWeight: 800 }}>PARTICIPAN</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>Arteyoga, Madhurya, Sananda y Fayoga.bienestar</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={{ color: '#0f172a', marginBottom: '1.5rem' }}>
                                La organización del evento está a cargo de la Escuela Adhyatma yoga, en una labor conjunta con los centros colaboradores, Arteyoga Escuela, Madhurya yoga, Espacio centro sanador Sananda y Espacio Fayoga.bienestar. El objetivo de esta unión es abrir un espacio a la comunidad donde puedan experimentar las distintas disciplinas y vertientes del yoga, entendiéndolo no solo como una práctica física, sino como un camino interior hacia la paz y el autoconocimiento.
                            </p>

                            <h3 style={{ color: '#0f172a', fontSize: '1.6rem', fontWeight: 900, marginTop: '3.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Wind color="#10b981" /> Un programa diverso para todas las edades
                            </h3>
                            <p style={{ color: '#0f172a', marginBottom: '1.5rem' }}>
                                La jornada contará con una amplia variedad de disciplinas diseñadas para que tanto principiantes como practicantes avanzados, niños y adultos mayores encuentren un espacio de bienestar. El programa incluye clases y estilos como:
                            </p>

                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '2rem', marginBottom: '2.5rem' }}>
                                {[
                                    { t: 'Yoga en Silla y Yoga Terapéutico', d: 'Alternativas suaves y adaptadas para el cuidado de la salud física.' },
                                    { t: 'Yogaterapia para la Columna Vertebral', d: 'Prácticas enfocadas en el alivio y fortalecimiento corporal.' },
                                    { t: 'Clases tradicionales y dinámicas', d: 'Sesiones de Hatha Yoga, Ashtanga Yoga, Hatha Yoga Iyengar y Kundalini Yoga.' },
                                    { t: 'Prácticas contemporáneas', d: 'Bloques dedicados a la exploración y el movimiento a través del Acroyoga y el Aeroyoga.' },
                                    { t: 'Yoga Niños', d: 'Un espacio especial por la tarde dedicado exclusivamente a introducir a los más pequeños en esta disciplina de manera lúdica.' }
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                        <CheckCircle size={24} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <div>
                                            <strong style={{ color: '#0f172a', display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>{item.t}</strong>
                                            <span style={{ fontSize: '1rem', color: '#334155' }}>{item.d}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p style={{ color: '#0f172a', marginBottom: '1.5rem' }}>
                                Además de las prácticas físicas, el encuentro tendrá un profundo sentido de conexión cultural y espiritual a través del arte, ofreciendo una ceremonia auspiciosa de bienvenida, presentaciones y danzas tradicionales de la India, para finalizar la jornada con un espacio de meditación cantada y música devocional (Kirtan).
                            </p>

                            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white', padding: '2rem', borderRadius: '20px', margin: '3rem 0', textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 15px 30px rgba(16, 185, 129, 0.3)' }}>
                                Para participar de las actividades en el recinto, la organización solicita como único requisito que cada persona lleve su propio mat de yoga.
                            </div>

                            <h3 style={{ color: '#0f172a', fontSize: '1.6rem', fontWeight: 900, marginTop: '3.5rem', marginBottom: '1.5rem' }}>
                                Espacio de bioferia consciente
                            </h3>
                            <p style={{ color: '#0f172a', marginBottom: '1.5rem' }}>
                                De forma paralela a las prácticas, el Coliseo albergará una Bioferia Saludable, concebida como una extensión del cuidado hacia uno mismo y el entorno. Este espacio contará con alimentación consciente (opciones veganas, vegetarianas y libres de gluten) y elementos para la práctica (venta de vestuario cómodo, productos saludables y artículos orientados a la meditación).
                            </p>
                            
                        </article>

                        {/* Trivia Interactiva */}
                        <FayogaTrivia />

                        <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4rem 0' }} />

                        {/* Contacto */}
                        <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ margin: '0 0 1.5rem 0', color: '#0f172a', fontSize: '1.4rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Heart color="#10b981" /> Contacto Coordinación
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', fontSize: '1.05rem', lineHeight: 1.8, wordBreak: 'break-word' }}>
                                <div>
                                    <strong style={{ color: '#0f172a' }}>Nombre:</strong> Fabiola Pastén (Equipo coordinador)<br/>
                                    <strong style={{ color: '#0f172a' }}>Teléfono / WhatsApp:</strong> +569 8480 8556<br/>
                                    <strong style={{ color: '#0f172a' }}>Correo:</strong> fayoga.bienestar@gmail.com
                                </div>
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', wordBreak: 'break-word' }}>
                                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '10px' }}>Redes Sociales:</strong>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <a href="https://www.instagram.com/fayoga.bienestar" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>@fayoga.bienestar</a>
                                        <a href="#" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>@adhyatmayoga</a>
                                        <a href="#" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>@arteyogaescuela</a>
                                        <a href="#" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>@madhuryayoga</a>
                                        <a href="#" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>@centrosananda</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', color: '#047857', fontSize: '1rem', fontStyle: 'italic', borderLeft: '4px solid #10b981' }}>
                                "Guío a personas a regular sus emociones y aliviar dolencias. Instructora de Yoga, Chi Kung, Meditación y Relajación. Facilitadora de Biodanza y Círculo de Mujeres. Namaste."<br/>
                                <strong style={{ display: 'block', marginTop: '10px' }}>— Fayoga Bienestar</strong>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
