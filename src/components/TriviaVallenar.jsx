import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, XCircle, Trophy, HelpCircle, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "¿Con qué apodo es conocida la ciudad de Vallenar?",
    options: [
      { id: 'a', text: 'La Ciudad del Oro', isCorrect: false },
      { id: 'b', text: 'La Perla del Huasco', isCorrect: true },
      { id: 'c', text: 'El Balcón del Desierto', isCorrect: false },
      { id: 'd', text: 'La Joya del Norte', isCorrect: false }
    ],
    hint: "Es el centro neurálgico del fértil Valle del Huasco."
  },
  {
    id: 2,
    question: "¿Qué fenómeno natural de renombre mundial ocurre cerca de Vallenar?",
    options: [
      { id: 'a', text: 'Aurora Desértica', isCorrect: false },
      { id: 'b', text: 'Nieve Roja', isCorrect: false },
      { id: 'c', text: 'Desierto Florido', isCorrect: true },
      { id: 'd', text: 'Géiseres del Huasco', isCorrect: false }
    ],
    hint: "Ocurre tras precipitaciones inusuales en la zona de Llanos de Challe."
  },
  {
    id: 3,
    question: "¿Cuál es el principal embalse que abastece al valle de Vallenar?",
    options: [
      { id: 'a', text: 'Embalse Puclaro', isCorrect: false },
      { id: 'b', text: 'Embalse La Paloma', isCorrect: false },
      { id: 'c', text: 'Embalse Santa Juana', isCorrect: true },
      { id: 'd', text: 'Embalse Recoleta', isCorrect: false }
    ],
    hint: "Es una obra de ingeniería vital para la agricultura local."
  }
];

export default function TriviaVallenar({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0); 
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setShowHint(false);
    } else {
      onComplete(score);
    }
  };

  const handleOptionSelect = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option.isCorrect) setScore(prev => prev + 1);
  };

  return (
    <div style={{ padding: '2rem', background: 'rgba(15, 23, 42, 0.95)', borderRadius: '24px', border: '2px solid #a855f7', color: 'white', maxWidth: '500px', margin: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
            <HelpCircle size={64} color="#a855f7" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>MISIÓN: TRIVIA VALLENAR</h2>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '2rem' }}>
              Explora la historia y geografía de la Perla del Huasco. ¡Gana tokens VLS!
            </p>
            <button 
              onClick={() => setCurrentStep(1)}
              style={{ width: '100%', background: '#a855f7', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}
            >
              INICIAR DESAFÍO
            </button>
          </motion.div>
        )}

        {currentStep > 0 && currentStep <= QUESTIONS.length && (
          <motion.div key={`q${currentStep}`} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 'bold', color: '#a855f7' }}>
              <span>PREGUNTA {currentStep} DE {QUESTIONS.length}</span>
              <span>PUNTOS: {score}</span>
            </div>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.4' }}>{QUESTIONS[currentStep-1].question}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
              {QUESTIONS[currentStep-1].options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt)}
                  style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: selectedOption === opt 
                      ? (opt.isCorrect ? 'rgba(168, 85, 247, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                      : 'rgba(255,255,255,0.05)',
                    borderColor: selectedOption === opt 
                      ? (opt.isCorrect ? '#a855f7' : '#ef4444')
                      : 'rgba(255,255,255,0.1)',
                    color: 'white',
                    textAlign: 'left',
                    cursor: selectedOption ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                    {opt.id.toUpperCase()}
                  </div>
                  {opt.text}
                  {selectedOption === opt && (
                    <div style={{ marginLeft: 'auto' }}>
                      {opt.isCorrect ? <CheckCircle2 color="#a855f7" size={20} /> : <XCircle color="#ef4444" size={20} />}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setShowHint(!showHint)}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '0.8rem', borderRadius: '12px', fontSize: '0.8rem', flex: 1, cursor: 'pointer' }}
              >
                Pista 💡
              </button>
              {selectedOption && (
                <button 
                  onClick={handleNext}
                  style={{ background: '#a855f7', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  {currentStep === QUESTIONS.length ? 'VER RESULTADOS' : 'SIGUIENTE'} <ArrowRight size={18} />
                </button>
              )}
            </div>

            {showHint && (
               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', fontSize: '0.8rem', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  {QUESTIONS[currentStep-1].hint}
               </motion.div>
            )}
          </motion.div>
        )}

        {currentStep > QUESTIONS.length && (
          <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
            <Trophy size={80} color="#fbbf24" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '0.5rem' }}>MISIÓN VALLENAR COMPLETA</h2>
            <div style={{ fontSize: '3rem', fontWeight: 950, color: '#a855f7', marginBottom: '1rem' }}>{score}/{QUESTIONS.length}</div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
              {score === QUESTIONS.length ? '¡Excelente! Conoces la historia del Huasco como un local.' : '¡Buen trabajo! Has descubierto nuevos secretos del norte.'}
            </p>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid #a855f7', padding: '1rem', borderRadius: '15px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
               <Award size={32} color="#a855f7" />
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: '900' }}>RECOMPENSA VLS</div>
                  <div style={{ fontSize: '1rem', fontWeight: '950' }}>{score * 500} TOKENS</div>
               </div>
            </div>
            <button 
              onClick={() => {
                const totalTokens = score * 500;
                const current = parseInt(localStorage.getItem('vls_tokens') || '0');
                const newTotal = current + totalTokens;
                localStorage.setItem('vls_tokens', newTotal.toString());
                window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newTotal }));
                onComplete(score);
              }}
              style={{ width: '100%', background: '#38bdf8', color: 'black', border: 'none', padding: '1.2rem', borderRadius: '15px', fontWeight: '950', cursor: 'pointer' }}
            >
              RECLAMAR RECOMPENSA Y REGRESAR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
