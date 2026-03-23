import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Phone, RefreshCw, HelpCircle, Timer, 
  Map, Medal, Play, ChevronRight, Volume2, VolumeX, 
  Music, Camera, Mic, Coins, AlertCircle, CheckCircle2,
  Zap, Radio, Tv, Signal, User, Info, Plane
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STAGES, PRIZES, QUESTION_PRIZES } from '../constants_game';
import { soundService } from '../services/soundService';
import { GameSidebar } from './GameSidebar';
import { VoiceContestant } from './VoiceContestant';

const SAVE_KEY = 'vls_game_save';

export default function VLSGameMain({ onClose }) {
  const [gameState, setGameState] = useState('start');
  const [currentStageId, setCurrentStageId] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [isAnthemPlaying, setIsAnthemPlaying] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [lifelines, setLifelines] = useState({ fiftyFifty: true, phone: true, audience: true, change: true });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lifelineResult, setLifelineResult] = useState(null);
  const [audienceData, setAudienceData] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null);

  const currentStage = useMemo(() => STAGES.find(s => s.id === currentStageId) || STAGES[0], [currentStageId]);
  const currentQuestion = currentStage.questions[currentQuestionIndex];

  // Lógica de inicio de juego
  const startGame = (continueGame = false, stageId) => {
    if (!isMuted) soundService.playJump();
    setGameStartTime(Date.now());
    
    if (continueGame) {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const progress = JSON.parse(saved);
        setCurrentStageId(progress.stageId);
        setCurrentQuestionIndex(progress.currentQuestionIndex);
        setLifelines(progress.lifelines);
      }
    } else {
      setCurrentStageId(stageId || 1);
      setCurrentQuestionIndex(0);
      setLifelines({ fiftyFifty: true, phone: true, audience: true, change: true });
    }
    
    if (!isAnthemPlaying && !isMuted) {
      soundService.playAnthem().then(() => setIsAnthemPlaying(true)).catch(console.error);
    }

    setGameState('playing');
    setTimer(60);
    setHiddenOptions([]);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="fixed inset-0 z-[1000000] bg-slate-950 text-white font-sans overflow-hidden">
      {/* Fondo con imagen del Faro */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589909634237-717750005933?auto=format&fit=crop&q=80&w=1920" 
          alt="Faro Monumental" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header con botón cerrar */}
        <div className="flex justify-end p-2">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Medal className="text-game-gold" size={32} />
            </button>
        </div>

        {gameState === 'start' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-8xl font-black mb-4 tracking-tighter"
            >
              VECINOS <span className="text-[#FFD700]">LA SERENA</span>
            </motion.h1>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl font-bold">
              El concurso de conocimientos más grande de la Región de Coquimbo.
              <span className="block text-[#FFD700] font-mono mt-2 uppercase tracking-widest bg-[#FFD700]/10 px-4 py-2 rounded-xl">vecinoslaserena.cl</span>
            </p>
            
            <button 
              onClick={() => startGame()}
              className="px-12 py-6 bg-[#FFD700] text-[#0f172a] font-black text-3xl rounded-2xl hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,215,0,0.3)] flex items-center gap-4"
            >
              <Play fill="currentColor" /> JUGAR AHORA
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* Pregunta y Opciones */}
              <div className="bg-blue-900/40 p-8 rounded-3xl border-2 border-blue-500/30 backdrop-blur-md shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <span className="bg-blue-600/50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-blue-200">
                        {currentStage.name} - Pregunta {currentQuestionIndex + 1}
                    </span>
                    <div className="flex items-center gap-2 text-game-gold">
                        <Timer size={20} />
                        <span className="font-mono text-xl font-black">{timer}s</span>
                    </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                  {currentQuestion.text}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      disabled={hiddenOptions.includes(i)}
                      onClick={() => !isAnswered && setSelectedOption(i)}
                      className={`p-6 text-left rounded-xl border-2 transition-all ${
                        hiddenOptions.includes(i) ? 'opacity-0 cursor-default' :
                        selectedOption === i ? 'border-[#FFD700] bg-[#FFD700]/20 shadow-[0_0_20px_rgba(255,215,0,0.2)]' : 
                        'border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-[#FFD700] font-bold mr-4">{String.fromCharCode(65 + i)}:</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <GameSidebar 
              currentQuestionIndex={currentQuestionIndex}
              gameState={gameState}
              isAnswered={isAnswered}
              selectedOption={selectedOption}
              currentStage={currentStage}
              currentQuestion={currentQuestion}
              currentStageId={currentStageId}
            />
          </div>
        )}
      </main>
    </div>
  );
}
