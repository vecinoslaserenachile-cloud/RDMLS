import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Users, 
  HelpCircle, 
  RefreshCw, 
  Trophy, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  Plane, 
  Medal, 
  Clock, 
  Award, 
  Mic, 
  Camera,
  Music,
  Map,
  MapPin,
  Flag,
  Globe,
  Play,
  CheckCircle2,
  Lock,
  ChevronRight,
  CircleDollarSign,
  Sparkles,
  Zap,
  Bot,
  X
} from 'lucide-react';
import { STAGES, PRIZES, Stage } from '../../constants_game_v2';
import { soundService } from '../../services/triviaSoundService';
import confetti from 'canvas-confetti';
import { auth, db, onAuthStateChanged, FirebaseUser, handleFirestoreError, OperationType } from '../../firebase_game';
import { doc, setDoc, getDoc, collection, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { speakText } from '../../services/triviaGeminiService';
import { VoiceContestant } from './VoiceContestant';
import { GameSidebar } from './GameSidebar';

type GameState = 'start' | 'playing' | 'lifeline_phone' | 'lifeline_audience' | 'game_over' | 'won' | 'map' | 'leaderboard';

interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL: string;
  totalPoints: number;
  totalTimeSeconds: number;
  levelsCount: number;
}

interface SavedGame {
  stageId: number;
  currentQuestionIndex: number;
  lifelines: {
    fiftyFifty: boolean;
    phone: boolean;
    audience: boolean;
    change: boolean;
  };
}

const SAVE_KEY = 'vls_game_progress_v2';
const COMPLETED_STAGES_KEY = 'vls_completed_stages';

const FaroIcon = ({ size = 120, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10 2h4v3h-4z" />
    <path d="M9 5h6v13H9z" />
    <path d="M4 18h16v4H4z" />
    <path d="M4 15h3v3H4zM17 15h3v3h-3z" />
    <path d="M11 8h2M11 12h2" />
  </svg>
);

export default function VLSTriviaMain({ onClose }: { onClose?: () => void }) {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentStageId, setCurrentStageId] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    phone: true,
    audience: true,
    change: true
  });
  const [hiddenOptions, setHiddenOptions] = useState<number[]>([]);
  const [lifelineResult, setLifelineResult] = useState<string | null>(null);
  const [audienceData, setAudienceData] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isAnthemPlaying, setIsAnthemPlaying] = useState(false);
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [completedStageIds, setCompletedStageIds] = useState<number[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [totalTimeSeconds, setTotalTimeSeconds] = useState(0);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [timer, setTimer] = useState(60);
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [mapCategory, setMapCategory] = useState<'region' | 'chile' | 'world'>('region');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStage = STAGES.find(s => s.id === currentStageId) || STAGES[0];
  const currentQuestions = currentStage.questions;
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing' && !isAnswered && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'playing') {
      if (!isMuted) soundService.playWrong();
      setGameState('game_over');
      localStorage.removeItem(SAVE_KEY);
    }
    return () => clearInterval(interval);
  }, [gameState, isAnswered, timer, isMuted]);

  useEffect(() => {
    if (gameState === 'playing' && currentQuestion) {
      setIsGeneratingImage(true);
      // Simulating IA API for dynamic context images
      const topics = currentQuestion.text.split(' ').filter(w => w.length > 4).slice(0, 3).join(',');
      const seed = currentQuestion.imageSeed || currentStage.imageSeed || topics || 'serena';
      setQuestionImage(`https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop`); 
      // En una implementación real usaríamos una API Gemini / DALL-E aquí.
       setTimeout(() => setIsGeneratingImage(false), 1000);
    }
  }, [currentQuestion, gameState, currentStage]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const q = query(collection(db, 'leaderboard'), orderBy('totalPoints', 'desc'), orderBy('totalTimeSeconds', 'asc'), limit(20));
    const unsubscribeLeaderboard = onSnapshot(q, (snapshot) => {
      const entries: LeaderboardEntry[] = [];
      snapshot.forEach((doc) => {
        entries.push(doc.data() as LeaderboardEntry);
      });
      setLeaderboard(entries);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'leaderboard');
    });

    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) setHasSavedGame(true);
    
    const completed = localStorage.getItem(COMPLETED_STAGES_KEY);
    if (completed) {
      setCompletedStageIds(JSON.parse(completed));
    }

    return () => {
      unsubscribeAuth();
      unsubscribeLeaderboard();
    };
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      const progress: SavedGame = {
        stageId: currentStageId,
        currentQuestionIndex,
        lifelines
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
    }
  }, [currentQuestionIndex, lifelines, gameState, currentStageId]);

  useEffect(() => {
    if (gameState === 'playing' && !isMuted) {
      soundService.playSuspense();
      soundService.playBackgroundMusic();
    } else {
      soundService.stopSuspense();
      soundService.stopBackgroundMusic();
    }
  }, [gameState, isMuted]);

  useEffect(() => {
    if (gameState === 'playing' && isVoiceMode && currentQuestion && !isAnswered) {
      if (currentAudio) {
        currentAudio.pause();
      }
      speakText(currentQuestion.text).then(audio => {
        if (audio) setCurrentAudio(audio);
      });
    }
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentQuestion, gameState, isVoiceMode]);

  const triggerFireworks = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  const startGame = (continueGame = false, stageId?: number) => {
    if (!isMuted) soundService.playJump();
    setGameStartTime(Date.now());
    if (continueGame) {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const progress: SavedGame = JSON.parse(saved);
        setCurrentStageId(progress.stageId);
        setCurrentQuestionIndex(progress.currentQuestionIndex);
        setLifelines(progress.lifelines);
      }
    } else {
      setCurrentStageId(stageId || 1);
      setCurrentQuestionIndex(0);
      setLifelines({ fiftyFifty: true, phone: true, audience: true, change: true });
      localStorage.removeItem(SAVE_KEY);
    }
    if (!isAnthemPlaying && !isMuted) {
      soundService.playAnthem().then(() => setIsAnthemPlaying(true)).catch(console.error);
    }
    setGameState('playing');
    setTimer(60);
    setHiddenOptions([]);
    setSelectedOption(null);
    setIsAnswered(false);
    setLifelineResult(null);
    setHasSavedGame(false);
  };

  const updateLeaderboard = async (newCompletedIds: number[], additionalTime: number) => {
    if (!currentUser) return;
    try {
      const leaderboardRef = doc(db, 'leaderboard', currentUser.uid);
      const docSnap = await getDoc(leaderboardRef);
      let totalTime = additionalTime;
      if (docSnap.exists()) {
        const data = docSnap.data();
        totalTime = (data.totalTimeSeconds || 0) + additionalTime;
      }
      await setDoc(leaderboardRef, {
        userId: currentUser.uid,
        displayName: currentUser.displayName || 'Anónimo',
        photoURL: currentUser.photoURL || '',
        totalPoints: newCompletedIds.length,
        totalTimeSeconds: totalTime,
        levelsCount: newCompletedIds.length,
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'leaderboard');
    }
  };

  const handleOptionClick = useCallback((index: number) => {
    if (isAnswered || hiddenOptions.includes(index)) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (!isMuted) soundService.playSelect();

    setTimeout(() => {
      if (index === currentQuestion.correctIndex) {
        if (!isMuted) {
          if (currentQuestionIndex === currentQuestions.length - 1) soundService.playPrize();
          else soundService.playCoin();
        }
        if (currentQuestionIndex === currentQuestions.length - 1) {
          const endTime = Date.now();
          const timeSpent = gameStartTime ? (endTime - gameStartTime) / 1000 : 0;
          setGameState('won');
          const newCompleted = [...new Set([...completedStageIds, currentStageId])];
          setCompletedStageIds(newCompleted);
          localStorage.setItem(COMPLETED_STAGES_KEY, JSON.stringify(newCompleted));
          localStorage.removeItem(SAVE_KEY);
          if (currentUser) updateLeaderboard(newCompleted, timeSpent);
          if (!isMuted) { soundService.playAnthemSting(); soundService.playPrize(); }
          triggerFireworks();
        } else {
          setTimeout(() => {
            setCurrentQuestionIndex(prev => prev + 1);
            setTimer(60);
            setSelectedOption(null);
            setIsAnswered(false);
            setHiddenOptions([]);
            setLifelineResult(null);
          }, 1500);
        }
      } else {
        if (!isMuted) soundService.playWrong();
        setGameState('game_over');
        localStorage.removeItem(SAVE_KEY);
      }
    }, 1500);
  }, [isAnswered, hiddenOptions, isMuted, currentQuestion, currentQuestionIndex, currentQuestions.length, gameStartTime, currentStageId, completedStageIds, currentUser, triggerFireworks]);

  const handleVoiceCommand = useCallback((command: string) => {
    if (gameState !== 'playing' || isAnswered) return;
    const normalized = command.toLowerCase();
    if (normalized.includes('opción a') || normalized === 'a' || normalized === 'la a') handleOptionClick(0);
    else if (normalized.includes('opción b') || normalized === 'b' || normalized === 'la b') handleOptionClick(1);
    else if (normalized.includes('opción c') || normalized === 'c' || normalized === 'la c') handleOptionClick(2);
    else if (normalized.includes('opción d') || normalized === 'd' || normalized === 'la d') handleOptionClick(3);
  }, [gameState, isAnswered, handleOptionClick]);

  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty || isAnswered) return;
    const incorrectIndices = currentQuestion.options.map((_, i) => i).filter(i => i !== currentQuestion.correctIndex);
    const toHide = incorrectIndices.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const usePhone = () => {
    if (!lifelines.phone || isAnswered) return;
    if (!isMuted) soundService.playPhone();
    setGameState('lifeline_phone');
    const isExpertCorrect = Math.random() > 0.2;
    const expertChoice = isExpertCorrect ? currentQuestion.options[currentQuestion.correctIndex] : currentQuestion.options[Math.floor(Math.random() * 4)];
    setLifelineResult(`Tu amigo especialista dice: "Mmm, estoy casi seguro de que la respuesta es ${expertChoice}."`);
    setLifelines(prev => ({ ...prev, phone: false }));
  };

  const useAudience = () => {
    if (!lifelines.audience || isAnswered) return;
    if (!isMuted) soundService.playAudience();
    setGameState('lifeline_audience');
    const data = [0, 0, 0, 0];
    const correctIdx = currentQuestion.correctIndex;
    let remaining = 100;
    data[correctIdx] = Math.floor(Math.random() * 30) + 40;
    remaining -= data[correctIdx];
    for (let i = 0; i < 3; i++) {
      const idx = (correctIdx + i + 1) % 4;
      if (i === 2) data[idx] = remaining;
      else {
        const val = Math.floor(Math.random() * remaining);
        data[idx] = val;
        remaining -= val;
      }
    }
    setAudienceData(data);
    setLifelines(prev => ({ ...prev, audience: false }));
  };

  const useChange = () => {
    if (!lifelines.change || isAnswered) return;
    setLifelines(prev => ({ ...prev, change: false }));
    setLifelineResult("¡Pregunta cambiada! (Bueno, en esta versión demo te dejamos la misma pero gastaste el comodín 😉)");
  };

  const toggleAnthem = async () => {
    if (isAnthemPlaying) {
      soundService.stopAnthem();
      setIsAnthemPlaying(false);
    } else if (!isMuted) {
      try {
        setIsAnthemPlaying(true);
        await soundService.playAnthem();
        setTimeout(() => setIsAnthemPlaying(false), 60000);
      } catch (error) {
        setIsAnthemPlaying(false);
      }
    }
  };

  // ─── LÓGICA DE RENDERIZADO MAESTRO (MASTER CEO EDITION) ───
  if (gameState === 'playing' && currentQuestion) {
    return (
      <div className="fixed inset-0 z-[100000] bg-[#020617] overflow-hidden flex flex-col font-sans">
        <AnimatePresence mode="wait">
          <motion.div key={questionImage} initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 0.5, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0 z-0">
            <img src={questionImage || `https://source.unsplash.com/featured/1920x1080?la-serena,city`} className="w-full h-full object-cover" alt="Contexto IA" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full p-8 lg:p-12 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
               <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-red-600 text-white px-8 py-2.5 rounded-2xl border border-white/20 shadow-2xl font-black italic tracking-widest text-sm lg:text-lg">NIVEL {currentStageId}</motion.div>
               <div className="bg-slate-900/80 backdrop-blur-xl text-blue-400 px-6 py-2.5 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> PREGUNTA {currentQuestionIndex + 1} DE 10
               </div>
            </div>
            {currentUser && (
               <div className="flex items-center gap-4 bg-black/40 backdrop-blur-2xl p-2.5 pl-4 pr-6 rounded-full border border-white/5 w-fit">
                 <img src={currentUser.photoURL || ''} className="w-10 h-10 rounded-full border-2 border-game-gold shadow-2xl" />
                 <span className="text-game-gold font-black uppercase text-[10px] tracking-widest">{currentUser.displayName}</span>
               </div>
            )}
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.div animate={timer < 11 ? { scale: [1, 1.1, 1] } : {}} className={`w-28 h-28 lg:w-36 lg:h-36 rounded-full border-[8px] flex items-center justify-center text-5xl lg:text-7xl font-black shadow-3xl backdrop-blur-2xl ${timer < 11 ? 'border-red-600 text-red-500 bg-red-950/20' : 'border-game-gold text-game-gold bg-black/40'}`}>{timer}</motion.div>
          </div>

          <div className="flex flex-col items-end gap-4 pointer-events-auto">
             <div className="bg-game-gold text-slate-950 px-12 py-5 rounded-[2rem] font-black text-2xl lg:text-4xl italic shadow-2xl border-b-[6px] border-yellow-700/50">{PRIZES[currentStageId - 1]}</div>
             <button onClick={() => setIsMuted(!isMuted)} className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all flex items-center justify-center text-white/50"><Volume2 size={24} /></button>
          </div>
        </div>

        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-7xl mx-auto w-full mb-32 lg:mb-40">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full bg-[#0f172a]/70 backdrop-blur-3xl border border-white/10 p-12 lg:p-20 rounded-[4rem] shadow-3xl text-center">
            <h2 className="text-3xl lg:text-6xl font-black text-white leading-tight uppercase italic drop-shadow-2xl">"{currentQuestion.text}"</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 w-full max-w-6xl">
            {currentQuestion.options.map((option, idx) => (
              <motion.button key={idx} onClick={() => handleOptionClick(idx)} disabled={isAnswered || hiddenOptions.includes(idx)} className={`relative h-28 lg:h-36 rounded-[2.5rem] border-2 p-10 font-black text-2xl lg:text-3xl transition-all flex items-center group overflow-hidden ${isAnswered && idx === currentQuestion.correctIndex ? 'bg-emerald-600 border-emerald-400 text-white shadow-2xl scale-105 z-20' : isAnswered && selectedOption === idx ? 'bg-red-600 border-red-500 text-white' : 'bg-[#1e293b]/50 backdrop-blur-2xl border-white/10 hover:border-game-gold hover:bg-white/10 text-slate-300'} ${hiddenOptions.includes(idx) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 mr-8 text-game-gold font-black group-hover:bg-game-gold group-hover:text-slate-900`}>{String.fromCharCode(65 + idx)}</div>
                <span className="flex-1 text-left tracking-tight">{option}</span>
              </motion.button>
            ))}
          </div>
        </main>

        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100001] flex items-center gap-10 bg-black/60 backdrop-blur-3xl px-10 py-6 rounded-[3.5rem] border border-white/10 shadow-3xl">
          <LifelineButton icon={<CircleDollarSign />} label="50/50" active={lifelines.fiftyFifty} onClick={useFiftyFifty} />
          <LifelineButton icon={<Phone />} label="Amigo" active={lifelines.phone} onClick={usePhone} />
          <LifelineButton icon={<Users />} label="Público" active={lifelines.audience} onClick={useAudience} />
          <LifelineButton icon={<RefreshCw />} label="Cambiar" active={lifelines.change} onClick={useChange} />
          <div className="h-12 w-px bg-white/10 mx-2" />
          <button onClick={() => setIsVoiceMode(!isVoiceMode)} className={`w-18 h-18 rounded-3xl flex items-center justify-center transition-all border-2 ${isVoiceMode ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-lg' : 'bg-slate-800/40 border-white/10 text-slate-500'}`}><Mic size={32} /></button>
          <button onClick={() => setGameState('start')} className="w-16 h-16 rounded-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white transition-all border border-red-600/30 flex items-center justify-center"><X size={32} /></button>
        </div>

        <AnimatePresence>
          {gameState === 'lifeline_phone' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000002] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-8"><motion.div className="bg-[#020617] border-2 border-game-gold p-16 rounded-[4rem] max-w-3xl text-center shadow-2xl relative"><Phone size={100} className="mx-auto text-game-gold mb-12 animate-bounce" /><p className="text-4xl font-black italic text-white mb-12">"{lifelineResult}"</p><button onClick={() => setGameState('playing')} className="w-full bg-game-gold text-[#020617] py-6 rounded-3xl font-black text-xl uppercase tracking-widest transition-all">Regresar</button></motion.div></motion.div>
          )}
          {gameState === 'lifeline_audience' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000002] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-8"><motion.div className="bg-[#020617] border-2 border-game-gold p-16 rounded-[5rem] w-full max-w-4xl shadow-2xl"><h3 className="text-5xl font-black text-game-gold uppercase italic mb-16 flex items-center justify-center gap-6"><Users size={48}/> VOTO DE LA COMUNIDAD</h3><div className="flex items-end justify-between h-80 gap-10 px-12 mb-16">{audienceData.map((val, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-6 h-full justify-end"><span className="text-game-gold font-black text-3xl">{val}%</span><motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} className={`w-full rounded-t-2xl shadow-2xl border-x border-t border-white/10 ${i === currentQuestion.correctIndex ? 'bg-gradient-to-t from-emerald-700 to-emerald-400' : 'bg-gradient-to-t from-slate-800 to-slate-600'}`} /><span className="font-black text-white text-2xl bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl">{String.fromCharCode(65 + i)}</span></div>))}</div><button onClick={() => setGameState('playing')} className="w-full bg-game-gold text-[#020617] py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-widest transition-all">Regresar</button></motion.div></motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div id="vls-trivia-main-container" className="min-h-screen py-16 px-8 bg-[#020617] text-white relative flex flex-col items-center overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="/portada_vls_trivia.jpg" className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-40 grayscale-[40%]" alt="Faro" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/70 to-[#020617]" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl w-full z-10 flex flex-col items-center text-center mt-20">
        <div className="relative mb-16"><FaroIcon size={200} className="text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]" /></div>
        <h1 className="text-6xl lg:text-[8rem] font-black leading-[0.85] italic uppercase tracking-tighter mb-6 text-white drop-shadow-3xl">¿QUIÉN QUIERE ESTAR<br/><span className="text-red-600 not-italic">INFORMADO?</span></h1>
        <p className="text-xl lg:text-3xl font-light text-slate-400 max-w-4xl mb-24 uppercase tracking-[0.5em] leading-relaxed italic">EDICIÓN REGIONAL VLS SMART CITY 2026</p>
        <div className="flex flex-col sm:flex-row gap-10 w-full max-w-5xl justify-center">
            {hasSavedGame && (
                <button onClick={() => startGame(true)} className="flex-1 bg-white/5 hover:bg-white/10 p-12 rounded-[4rem] border border-white/10 transition-all flex flex-col items-center gap-6"><RefreshCw size={50} className="text-blue-500" /><span className="text-2xl font-black uppercase italic">Reanudar</span></button>
            )}
            <button onClick={() => startGame(false)} className="flex-1 bg-red-600 p-12 rounded-[4rem] shadow-3xl hover:bg-red-500 transition-all flex flex-col items-center gap-6"><Play size={50} fill="white" /><span className="text-2xl font-black uppercase italic">Nuevo Legado</span></button>
        </div>
      </motion.div>

      <style>{`
        .text-game-gold { color: #FFD700; }
        .bg-game-gold { background-color: #FFD700; }
        .border-game-gold { border-color: #FFD700; }
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 30s linear infinite alternate; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
      `}</style>
    </div>
  );
}

const LifelineButton = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} disabled={!active} className={`group relative flex flex-col items-center justify-center w-20 h-20 rounded-[2rem] transition-all border-2 ${active ? 'bg-slate-900 border-game-gold text-game-gold hover:bg-game-gold hover:text-slate-900' : 'bg-black/20 border-white/5 text-white/10 opacity-30 cursor-not-allowed'}`}>
    <div className="transition-transform group-hover:scale-125">{React.cloneElement(icon as any, { size: 32 })}</div>
    <span className="absolute -top-12 bg-slate-900 border border-game-gold/30 text-game-gold text-[10px] font-black px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all">{label}</span>
    {!active && <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-1 bg-red-600/40 rotate-45" /></div>}
  </button>
);
