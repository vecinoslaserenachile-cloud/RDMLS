import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Award, RotateCcw, Download } from 'lucide-react';
import DiplomaGenerator from './DiplomaGenerator';

const QUESTIONS = [
  { id: 1, text: "¿Qué unidad se encarga de la gestión directa en barrios y bienestar social?", ans: "DIDECO", options: ["DOM", "DIDECO", "SECPLAN", "DAF"] },
  { id: 2, text: "¿Cuál es el macrosector de mayor población y servicios de salud primaria?", ans: "Las Compañías", options: ["Avenida del Mar", "La Antena", "Las Compañías", "Sector Rural"] },
  { id: 3, text: "¿En qué área del ecosistema se concentra el nivel estratégico y deliberativo?", ans: "Cúpula Central", options: ["Tuberías Doradas", "Cúpula Central", "Nodos Laterales", "Base Map"] }
];

export default function ExamenModulo({ timeSpent }) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  
  const SFX_CORRECT = "https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3";
  const SFX_ERROR = "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3";
  const SFX_FANFARE = "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3";

  const playSfx = (url) => {
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(e => console.log("SFX block:", e));
  };
  const [complete, setComplete] = useState(false);
  const [userName, setUserName] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (opt) => {
    if (opt === QUESTIONS[qIdx].ans) {
        playSfx(SFX_CORRECT);
        setScore(prev => prev + 1);
    } else {
        playSfx(SFX_ERROR);
    }

    if (qIdx < QUESTIONS.length - 1) {
      setQIdx(prev => prev + 1);
    } else {
      setTimeout(() => {
        if (score + (opt === QUESTIONS[qIdx].ans ? 1 : 0) === QUESTIONS.length) {
            playSfx(SFX_FANFARE);
        }
      }, 500);
      setComplete(true);
    }
  };

  if (!complete) {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="exam-wrapper">
        <div className="exam-card">
          <div className="exam-header">
            <span className="step">EVALUACIÓN MUNICIPAL - PREGUNTA {qIdx + 1}/{QUESTIONS.length}</span>
            <div className="line-progress">
               <motion.div className="line-fill" animate={{ width: `${((qIdx+1)/QUESTIONS.length)*100}%` }} />
            </div>
          </div>
          <h2>{QUESTIONS[qIdx].text}</h2>
          <div className="options-container">
            {QUESTIONS[qIdx].options.map(opt => (
              <button key={opt} onClick={() => handleAnswer(opt)} className="opt-btn">
                {opt}
              </button>
            ))}
          </div>
        </div>
        <style>{`
          .exam-wrapper { display: flex; align-items: center; justify-content: center; width: 100%; height: 100vh; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); }
          .exam-card { width: 90%; max-width: 600px; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 32px; padding: 3rem; box-shadow: 0 40px 100px rgba(0,0,0,0.8); }
          .exam-header { margin-bottom: 2rem; }
          .step { font-size: 0.7rem; font-weight: 900; color: #fbbf24; letter-spacing: 2px; }
          .line-progress { width: 100%; height: 2px; background: rgba(255,255,255,0.1); margin-top: 10px; border-radius: 10px; overflow: hidden; }
          .line-fill { height: 100%; background: #fbbf24; }
          h2 { font-size: 1.8rem; margin-bottom: 2.5rem; line-height: 1.2; font-weight: 900; color: #fff; }
          .options-container { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          .opt-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 1.2rem; border-radius: 16px; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 1rem; }
          .opt-btn:hover { background: #fbbf24; color: black; border-color: #fbbf24; transform: translateY(-3px); }
        `}</style>
      </motion.div>
    );
  }

  const passed = score === QUESTIONS.length;

  return (
    <div className="result-container">
      <AnimatePresence mode="wait">
        {!passed ? (
           <motion.div key="fail" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="result-card fail">
              <XCircle size={60} color="#ef4444" />
              <h2>Certificación Fallida</h2>
              <p>Has obtenido {score} de {QUESTIONS.length} aciertos. El estándar institucional requiere un 100% de precisión.</p>
              <button onClick={() => window.location.reload()} className="btn-retry"><RotateCcw size={18} /> Reintentar Inducción</button>
           </motion.div>
        ) : (
           <div className="success-area">
              {!isFinished ? (
                 <motion.div key="success" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="result-card success">
                    <Award size={64} color="#fbbf24" />
                    <h2>¡Excelencia Municipal!</h2>
                    <p>Has aprobado con {score}/{QUESTIONS.length} aciertos en un tiempo récord de {Math.floor(timeSpent/60)}m {timeSpent%60}s.</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '-1rem' }}>Ingresa tu nombre completo para emitir el certificado oficial.</p>
                    <input 
                      type="text" 
                      className="name-input"
                      placeholder="Nombre y Apellidos" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)} 
                    />
                    <button 
                      disabled={userName.length < 5}
                      onClick={() => setIsFinished(true)} 
                      className="btn-cert"
                    >
                      Generar Diploma Oficial
                    </button>
                 </motion.div>
              ) : (
                 <DiplomaGenerator name={userName} />
              )}
           </div>
        )}
      </AnimatePresence>
      <style>{`
        .result-container { width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(20px); }
        .result-card { width: 90%; max-width: 500px; text-align: center; padding: 3rem; background: rgba(255,255,255,0.02); border-radius: 40px; border: 1px solid rgba(255,255,255,0.1); }
        .success-area { width: 100%; display: flex; justify-content: center; }
        h2 { font-size: 2rem; margin: 1.5rem 0 1rem 0; font-weight: 900; color: white; }
        p { color: #94a3b8; font-size: 1.1rem; line-height: 1.5; margin-bottom: 2rem; }
        .name-input { width: 100%; background: #000; border: 1px solid #334155; color: white; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: center; font-size: 1.2rem; }
        .btn-retry { background: #ef4444; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; margin: 0 auto; }
        .btn-cert { width: 100%; background: #fbbf24; color: black; border: none; padding: 1.2rem; border-radius: 12px; font-weight: 900; cursor: pointer; font-size: 1.1rem; transition: all 0.3s; }
        .btn-cert:disabled { opacity: 0.3; cursor: not-allowed; }
        .btn-cert:not(:disabled):hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(251, 191, 36, 0.4); }
      `}</style>
    </div>
  );
}
