import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, ArrowRight, RefreshCw, X, ShieldCheck, Award } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es el color principal que identifica la fe y el manto de la Virgen de Andacollo?",
    options: ["Azul y Dorado", "Rojo y Blanco", "Verde y Plata"],
    correct: 0
  },
  {
    id: 2,
    question: "¿Qué agrupación tradicional es el alma de la fiesta de Andacollo?",
    options: ["Los Lanceros", "Los Bailes Chinos", "Los Diablitos"],
    correct: 1
  },
  {
    id: 3,
    question: "¿En qué año se coronó canónicamente a la Virgen de Andacollo?",
    options: ["1894", "1950", "1910"],
    correct: 0
  }
];

export default function TriviaAndacollo({ onComplete }) {
  const [step, setStep] = useState('intro'); // 'intro', 'quiz', 'result'
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (idx) => {
    if (idx === QUESTIONS[currentQ].correct) setScore(score + 1);
    
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('result');
    }
  };

  const handleFinish = () => {
    // Premiar con tokens virtuales VLS
    const tokens = score * 50;
    const currentTokens = parseInt(localStorage.getItem('vls_tokens') || '0');
    localStorage.setItem('vls_tokens', (currentTokens + tokens).toString());
    window.dispatchEvent(new CustomEvent('tokens-updated', { detail: currentTokens + tokens }));
    onComplete(score);
  };

  return (
    <div style={{ width: '100%', maxWidth: '500px', background: '#0f172a', borderRadius: '32px', border: '2px solid #10b981', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <Target size={40} color="black" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 950, color: 'white', marginBottom: '1rem' }}>MISIÓN: FE DE MONTAÑA</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Demuestra tu conocimiento sobre Andacollo y gana Tokens VLS para la comunidad.
            </p>
            <button 
              onClick={() => setStep('quiz')}
              style={{ width: '100%', background: '#10b981', color: 'black', padding: '1.2rem', borderRadius: '15px', fontWeight: 950, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              COMENZAR DESAFÍO <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.7rem' }}>PREGUNTA {currentQ + 1}/3</span>
               <div style={{ display: 'flex', gap: '4px' }}>
                  {QUESTIONS.map((_, i) => (
                    <div key={i} style={{ width: '20px', height: '4px', background: i <= currentQ ? '#10b981' : '#334155', borderRadius: '2px' }} />
                  ))}
               </div>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: 'white', fontWeight: 800, marginBottom: '2rem', lineHeight: '1.4' }}>
              {QUESTIONS[currentQ].question}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {QUESTIONS[currentQ].options.map((opt, i) => (
                 <button 
                   key={i} 
                   onClick={() => handleAnswer(i)}
                   style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '1rem 1.5rem', borderRadius: '12px', textAlign: 'left', fontWeight: 700, cursor: 'pointer', transition: '0.2s' }}
                   className="hover:bg-emerald-900/40"
                 >
                   {opt}
                 </button>
               ))}
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '3rem', textAlign: 'center' }}>
            <Trophy size={60} color="#fbbf24" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', marginBottom: '0.5rem' }}>¡MISIÓN CUMPLIDA!</h2>
            <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#10b981', marginBottom: '1rem' }}>{score}/3</div>
            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
              Has ganado <strong>{score * 50} Tokens VLS</strong> por tu compromiso patrimonial.
            </p>
            <button 
              onClick={handleFinish}
              style={{ width: '100%', background: '#10b981', color: 'black', padding: '1.2rem', borderRadius: '15px', fontWeight: 950, border: 'none', cursor: 'pointer' }}
            >
              RECLAMAR RECOMPENSA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
