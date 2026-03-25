import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Zap } from 'lucide-react';
import SVGBackground from './SVGBackground';
import ModalTerritorio from './ModalTerritorio';
import ExamenModulo from './ExamenModulo';

const SCENES = [
  { id: 1, name: 'Introducción', description: 'Carga del ecosistema municipal.' },
  { id: 2, name: 'Centro de Mando', description: 'Nivel Directorio y Ciudadano.' },
  { id: 3, name: 'Motores Técnicos', description: 'Asesoría y Finanzas (DAF/SECPLAN).' },
  { id: 4, name: 'Guardianes', description: 'Gestión de Territorio (DOM/DIDECO).' },
  { id: 5, name: 'Descentralización', description: 'Macrosectores y Barrios.' },
  { id: 6, name: 'Cierre', description: 'Identidad Institucional.' }
];

export default function EcosistemaDashboard() {
  const [currentScene, setCurrentScene] = useState(1);
  const [selectedSector, setSelectedSector] = useState(null);
  const [showExam, setShowExam] = useState(false);

  const viewVariants = {
    1: { scale: 1, y: 0, x: 0 },
    2: { scale: 2.2, y: 350, x: 0 },
    3: { scale: 1.8, y: 150, x: 0 },
    4: { scale: 1.5, y: -200, x: 0 },
    5: { scale: 1.8, y: -100, x: -300 },
    6: { scale: 1, y: 0, x: 0 }
  };

  if (showExam) return <ExamenModulo />;

  return (
    <div className="induccion-app">
      <div className="viewport-container">
        <motion.div 
          animate={viewVariants[currentScene]}
          transition={{ type: 'spring', damping: 20, stiffness: 60 }}
          className="ecosystem-view"
        >
          <SVGBackground 
            scene={currentScene} 
            onSectorClick={(sec) => setSelectedSector(sec)} 
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedSector && (
          <ModalTerritorio 
            sectorId={selectedSector.id} 
            onClose={() => setSelectedSector(null)} 
          />
        )}
      </AnimatePresence>

      <div className="scene-ui">
        <div className="glass-nav">
          <div className="progress">
            <motion.div 
                className="progress-bar" 
                animate={{ width: `${(currentScene / 6) * 100}%` }} 
            />
          </div>
          <div className="nav-bottom">
            <div className="info">
               <span className="label">ESCENA 0{currentScene}</span>
               <h2>{SCENES[currentScene-1].name}</h2>
            </div>
            <div className="actions">
               <button onClick={() => setCurrentScene(prev => Math.max(1, prev - 1))} className="btn-prev">
                  <ChevronLeft size={20} />
               </button>
               <button 
                  onClick={() => {
                    if (currentScene < 6) setCurrentScene(prev => prev + 1);
                    else setShowExam(true);
                  }} 
                  className="btn-next"
               >
                  {currentScene === 6 ? 'Finalizar e Iniciar Evaluación' : 'Continuar'} <ChevronRight size={20} />
               </button>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        .induccion-app { width: 100vw; height: 100vh; background: #000; overflow: hidden; position: relative; color: white; display: flex; flex-direction: column; }
        .viewport-container { flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .ecosystem-view { width: 1200px; height: 800px; position: relative; }
        .scene-ui { position: absolute; bottom: 2rem; left: 0; right: 0; display: flex; justify-content: center; pointer-events: none; }
        .glass-nav { 
            width: 90%; max-width: 800px; background: rgba(15, 23, 42, 0.85); 
            backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); 
            border-radius: 24px; padding: 1.5rem; pointer-events: auto;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .progress { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 1rem; overflow: hidden; }
        .progress-bar { height: 100%; background: #fbbf24; }
        .nav-bottom { display: flex; justify-content: space-between; align-items: center; }
        .label { font-size: 0.7rem; font-weight: 900; color: #fbbf24; letter-spacing: 2px; }
        .info h2 { margin: 0; font-size: 1.4rem; font-weight: 900; }
        .actions { display: flex; gap: 1rem; }
        .btn-prev, .btn-next { border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
        .btn-prev { background: rgba(255,255,255,0.05); color: white; padding: 10px; }
        .btn-next { background: #fbbf24; color: black; padding: 0.6rem 2rem; font-weight: 900; gap: 8px; }
        .btn-next:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3); }
      `}</style>
    </div>
  );
}
