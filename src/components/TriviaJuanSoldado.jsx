import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Trophy, ArrowRight, RefreshCcw, Star, Coins } from 'lucide-react';

const QUESTIONS = [
  {
    category: 'Historia',
    question: "¿Quién era Juan Díaz según la versión histórica de la leyenda?",
    options: [
      "Un rico hacendado de La Serena",
      "Un humilde soldado proscrito que huyó al cerro",
      "Un pirata que escondió su tesoro",
      "Un monje de la Iglesia de la Bruma"
    ],
    correct: 1,
    hint: "Búscalo en el Capítulo I: El Camino de la Expiación."
  },
  {
    category: 'Misterio',
    question: "¿Qué fenómeno místico se dice que ocurre cada Viernes Santo en la cima?",
    options: [
      "Se escuchan voces en mapudungun",
      "Aparece una ciudad invisible con luces parpadeantes",
      "El cerro cambia de color a rojo",
      "Se abre una mina de oro puro"
    ],
    correct: 1,
    hint: "Revisa el Capítulo II sobre la Ciudad Perdida."
  },
  {
    category: 'Geografía',
    question: "¿Cuál era el nombre original del cerro antes de ser conocido como Juan Soldado?",
    options: [
      "Cerro Grande",
      "Cerro de los Vizcaínos",
      "Cumbre del Elqui",
      "Peñón del Faro"
    ],
    correct: 1,
    hint: "El nombre cambió tras la muerte de Juan Díaz."
  },
  {
    category: 'Folclore',
    question: "¿Qué representa Juan Soldado para la tradición oral de La Serena?",
    options: [
      "Un símbolo de la conquista española",
      "Un protector de humildes y símbolo de resistencia",
      "Una advertencia contra la pereza",
      "Un guía para encontrar tesoros piratas"
    ],
    correct: 1,
    hint: "Es el pilar de la 'Escucha Vecinal' en esta zona."
  }
];

export default function TriviaJuanSoldado({ onComplete }) {
  const [step, setStep] = useState('intro'); // 'intro', 'quiz', 'result'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const startQuiz = () => setStep('quiz');

  const handleOptionSelect = (idx) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    const correct = idx === QUESTIONS[currentQuestion].correct;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setStep('result');
      }
    }, 2000);
  };

  const handleFinish = () => {
    if (score >= 3) {
      // Dispatch event to reward tokens
      const event = new CustomEvent('tokens-updated', { detail: window.vlsTokens + 250 });
      window.dispatchEvent(event);
    }
    if (onComplete) onComplete();
  };

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '35px',
      padding: '2.5rem',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      color: 'white',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(245, 158, 11, 0.1)'
    }}>
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <HelpCircle size={40} color="#f59e0b" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '1rem', letterSpacing: '-1px' }}>DESAFÍO: LEYENDA VLS</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '2rem' }}>
              ¿Cuánto sabes realmente sobre la mística de Juan Soldado? Responde correctamente y gana <span style={{ color: '#f59e0b', fontWeight: 900 }}>250 TOKENS VLS</span> para tu billetera ciudadana.
            </p>
            <button
              onClick={startQuiz}
              style={{
                width: '100%', background: '#f59e0b', color: 'black', border: 'none',
                padding: '1.2rem', borderRadius: '18px', fontWeight: 950, fontSize: '1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
              }}
            >
              INICIAR DESAFÍO <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#f59e0b', letterSpacing: '2px' }}>PREGUNTA {currentQuestion + 1} / {QUESTIONS.length}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={{ width: '20px', height: '4px', background: i <= currentQuestion ? '#f59e0b' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.3 }}>{QUESTIONS[currentQuestion].question}</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {QUESTIONS[currentQuestion].options.map((opt, i) => {
                let bg = 'rgba(255,255,255,0.05)';
                let border = '1px solid rgba(255,255,255,0.1)';
                let icon = null;

                if (selectedOption === i) {
                  if (i === QUESTIONS[currentQuestion].correct) {
                    bg = 'rgba(34, 197, 94, 0.2)';
                    border = '1px solid #22c55e';
                    icon = <CheckCircle2 size={20} color="#22c55e" />;
                  } else {
                    bg = 'rgba(239, 68, 68, 0.2)';
                    border = '1px solid #ef4444';
                    icon = <XCircle size={20} color="#ef4444" />;
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(i)}
                    style={{
                      background: bg, border: border, padding: '1.2rem', borderRadius: '15px',
                      color: 'white', textAlign: 'left', fontSize: '0.95rem', fontWeight: 'bold',
                      cursor: selectedOption === null ? 'pointer' : 'default',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.3s'
                    }}
                  >
                    {opt}
                    {icon}
                  </button>
                );
              })}
            </div>
            
            {selectedOption !== null && !isCorrect && (
               <p style={{ marginTop: '1.5rem', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center' }}>
                 💡 PISTA: {QUESTIONS[currentQuestion].hint}
               </p>
            )}
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
            <div style={{ background: score >= 3 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              {score >= 3 ? <Trophy size={50} color="#22c55e" /> : <RefreshCcw size={50} color="#ef4444" />}
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 950, marginBottom: '0.5rem' }}>{score >= 3 ? '¡MAGNÍFICO!' : 'SIGUE ESTUDIANDO'}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Has acertado <span style={{ color: '#f59e0b', fontWeight: 900 }}>{score} de {QUESTIONS.length}</span> puntos de soberanía histórica.
            </p>

            {score >= 3 ? (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  <Coins size={24} />
                  <span style={{ fontWeight: 950, fontSize: '1.2rem' }}>+250 TOKENS VLS</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>RECOMPENSA DE CIUDADANÍA APLICADA</p>
              </div>
            ) : (
              <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '2rem' }}>Necesitas al menos 3 aciertos para reclamar la recompensa.</p>
            )}

            <button
              onClick={handleFinish}
              style={{
                width: '100%', background: 'white', color: 'black', border: 'none',
                padding: '1.2rem', borderRadius: '18px', fontWeight: 950, fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {score >= 3 ? 'FINALIZAR INVESTIGACIÓN' : 'REINTENTAR DESAFÍO'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
