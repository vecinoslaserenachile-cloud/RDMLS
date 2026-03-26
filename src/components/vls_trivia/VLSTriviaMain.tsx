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
  Share2,
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
  const [showCredits, setShowCredits] = useState(false);

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
      // Logic for question-specific images OR stage-specific seeds
      const topics = currentQuestion.text.split(' ').filter(w => w.length > 4).slice(0, 3).join(',');
      const seed = currentQuestion.image || currentQuestion.imageSeed || currentStage.imageSeed || topics || 'serena';
      
      // Si viene forzado desde la base de datos local
      if (typeof seed === 'string' && seed.startsWith('/')) {
        setQuestionImage(seed); 
      } else {
        // Apuntamos automáticamente a la ruta local donde el usuario soltará las imágenes de Grok
        setQuestionImage(`/img_trivia/stage_${currentStageId}_q${currentQuestion.id}.jpg`);
      }
      setTimeout(() => setIsGeneratingImage(false), 500);
    }
  }, [currentQuestion, gameState, currentStageId]);

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
      soundService.stopAll();
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
      // Intensity scale: 0-9 = low, 10-19 = medium, 20-29 = high, 30-39 = very high, 40-50 = max
      const intensity = Math.min(4, Math.floor((currentStageId - 1) / 10));
      soundService.playSuspense(intensity);
      soundService.playBackgroundMusic(intensity);
    } else {
      soundService.stopSuspense();
      soundService.stopBackgroundMusic();
    }
  }, [gameState, isMuted, currentStageId]);

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
  if (['playing', 'lifeline_phone', 'lifeline_audience'].includes(gameState) && currentQuestion) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#0a0f1a', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }}>
            <div style={{ border: '2px solid #FFD700', borderRadius: '12px', width: '40px', height: '40px', minWidth: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700', fontSize: '1.2rem', fontWeight: '900', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
              {currentStageId}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
              <span style={{ color: 'white', fontWeight: '900', fontSize: 'clamp(0.8rem, 3vw, 1.2rem)', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {(window.location.host.toLowerCase().includes('rdmls') || (window.location.host.toLowerCase().includes('laserena.cl') && !window.location.host.toLowerCase().includes('vecinos'))) ? 'SABERES' : 'VLSABES'} :: {currentStage.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', height: '4px', width: '100%', maxWidth: '100px', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ background: '#FFD700', height: '100%', width: `${((currentQuestionIndex + 1)/currentQuestions.length)*100}%`, borderRadius: '2px', transition: 'width 0.3s ease' }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', fontWeight: 'bold' }}>{currentQuestionIndex + 1}/{currentQuestions.length}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', fontWeight: '900', letterSpacing: '1px' }}>TIEMPO</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: timer < 11 ? '#ef4444' : '#FFD700' }}>
                <Clock size={16} />
                <span style={{ fontSize: '1.2rem', fontWeight: '900' }}>{formatTime(timer)}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                soundService.stopAll();
                setGameState('start');
              }} 
              style={{ 
                background: 'rgba(239, 68, 68, 0.2)', 
                border: '2px solid #ef4444', 
                color: 'white', 
                padding: '0.6rem 1.2rem', 
                borderRadius: '12px', 
                fontWeight: '900', 
                cursor: 'pointer', 
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)',
                fontSize: '0.8rem',
                zIndex: 50
              }}
            >
                SALIR
            </button>
          </div>
        </div>

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4rem' }}>
             {/* Base CRT global mesh background */}
             <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, #1e3a8a 0%, #020617 100%)' }} />
             <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1z\' fill=\'rgba(0,0,0,0.4)\'/%3E%3C/svg%3E")', opacity: 0.8, pointerEvents: 'none' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.15) 51%)', backgroundSize: '100% 4px', pointerEvents: 'none' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,15,26,0.1) 0%, rgba(10,15,26,0.6) 80%, #0a0f1a 100%)' }} />

             <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-[1400px] items-center gap-8 lg:gap-24 px-4 lg:px-0">
                {/* TEXT ON THE LEFT (Top on Mobile) */}
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full mt-8 lg:mt-0">
                   <h2 className="text-white font-black leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-[clamp(1.5rem,5vw,4rem)]">
                       ¿{currentQuestion.text.replace(/^\¿/, '').replace(/\?$/, '')}?
                   </h2>
                </div>
                
                {/* IMAGE ON THE RIGHT IN A TV MONITOR (MODERN 16:9 RATIO) */}
                <div className="w-full sm:w-[95%] lg:w-[700px] flex-shrink-0 h-[220px] sm:h-[320px] lg:h-[394px] bg-black rounded-2xl border-2 border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden relative flex justify-center items-center">
                   {questionImage && (
                      <img 
                        src={questionImage} 
                        onError={(e) => {
                           e.currentTarget.onerror = null;
                           e.currentTarget.src = `https://picsum.photos/seed/vls-trivia-${currentStageId}-${currentQuestion?.id}/1920/1080`;
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#000', filter: 'blur(0.5px) contrast(1.15) brightness(1.1)' }} 
                        alt="Monitor de Trivia" 
                      />
                   )}
                   {/* Malla CRT / Pixel-Art aplicada SOLO a la TV para tapar baja resolución de las fotitos miniatura */}
                   <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1h2v2H1z\' fill=\'rgba(0,0,0,0.6)\'/%3E%3C/svg%3E")', opacity: 0.8, pointerEvents: 'none' }} />
                   
                   {/* Inner soft TV bezel reflection and vignette */}
                   <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(0,0,0,1)', pointerEvents: 'none' }} />
                   <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)', pointerEvents: 'none' }} />

                   {/* LIVE Pilot light */}
                   <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_15px_rgba(239,68,68,1)]" />
                      <span className="text-[10px] sm:text-xs font-black text-white uppercase tracking-widest opacity-90">LIVE</span>
                   </div>
                </div>
             </div>
          </div>

          <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0.75rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', paddingBottom: '9rem', boxSizing: 'border-box' }}>
             {/* Lifelines will hover safely above this 9rem padding */}
            {currentQuestion.options.map((option, idx) => {
              const isHidden = hiddenOptions.includes(idx);
              const isSelected = selectedOption === idx;
              const isCorrect = isAnswered && idx === currentQuestion.correctIndex;
              const isWrong = isAnswered && isSelected && idx !== currentQuestion.correctIndex;

              const getBgColor = () => {
                  if (isHidden) return 'transparent';
                  if (isCorrect) return '#16a34a';
                  if (isWrong) return '#dc2626';
                  if (isSelected && !isAnswered) return 'rgba(255, 215, 0, 0.2)';
                  return '#121928';
              };
              
              const getBorderColor = () => {
                  if (isHidden) return 'transparent';
                  if (isCorrect) return '#4ade80';
                  if (isWrong) return '#f87171';
                  if (isSelected && !isAnswered) return '#FFD700';
                  return 'rgba(255,255,255,0.1)';
              };

              return (
                <button
                  key={idx}
                  disabled={isAnswered || isHidden}
                  onClick={() => handleOptionClick(idx)}
                  style={{
                      background: getBgColor(),
                      border: `1px solid ${getBorderColor()}`,
                      borderRadius: '16px',
                      padding: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem',
                      cursor: (isAnswered || isHidden) ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: isHidden ? 0 : 1,
                      pointerEvents: isHidden ? 'none' : 'auto',
                      outline: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: isSelected ? '0 0 20px rgba(255,215,0,0.3)' : '0 4px 10px rgba(0,0,0,0.5)'
                  }}
                  onMouseEnter={e => { if (!isAnswered && !isHidden && !isSelected) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(255,215,0,0.5)'; } }}
                  onMouseLeave={e => { if (!isAnswered && !isHidden && !isSelected) { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; } }}
                >
                  {(isSelected || isCorrect) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                  )}
                  <div style={{ background: (isCorrect || isWrong || isSelected) ? 'white' : '#2a3045', borderRadius: '12px', width: 'clamp(40px, 8vw, 60px)', height: 'clamp(40px, 8vw, 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: (isCorrect || isWrong || isSelected) ? '#000' : '#FFD700', fontSize: '1.2rem', fontWeight: '900', flexShrink: 0, transition: 'all 0.2s' }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span style={{ 
                    color: (isCorrect || isWrong || isSelected) ? 'white' : 'rgba(255,255,255,0.9)', 
                    fontSize: option.length > 70 ? 'clamp(0.55rem, 2.5vw, 0.75rem)' : option.length > 50 ? 'clamp(0.65rem, 3vw, 0.9rem)' : 'clamp(0.75rem, 3.5vw, 1.1rem)', 
                    fontWeight: 'bold', 
                    textAlign: 'left', 
                    lineHeight: '1.2', 
                    flex: 1, 
                    minWidth: 0, 
                    wordBreak: 'break-word', 
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        </main>

        <div style={{ position: 'fixed', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 100001, display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', padding: '0.8rem 1.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'nowrap', maxWidth: '95vw', overflowX: 'auto' }}>
          <LifelineButton icon={<CircleDollarSign size={22} />} label="50:50" active={lifelines.fiftyFifty} onClick={useFiftyFifty} />
          <LifelineButton icon={<Phone size={22} />} label="Amigo" active={lifelines.phone} onClick={usePhone} />
          <LifelineButton icon={<Users size={22} />} label="Público" active={lifelines.audience} onClick={useAudience} />
          <LifelineButton icon={<RefreshCw size={22} />} label="Cambiar" active={lifelines.change} onClick={useChange} />
          <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
          
          {/* Botón Compartir */}
          <button
            onClick={() => {
              const isRDMLS = window.location.host.toLowerCase().includes('rdmls') || (window.location.host.toLowerCase().includes('laserena.cl') && !window.location.host.toLowerCase().includes('vecinos'));
              const domain = isRDMLS ? 'rdmls.cl' : 'vecinoslaserena.cl';
              const gameName = isRDMLS ? 'SABERES' : 'VLSABES';
              const text = `¡Juega a ${gameName}! El conocimiento sobre La Serena y la región ahora es un juego. ${domain} invita a mejorar y ampliar el juego sumando hitos, fechas y talentos locales que quieran desplegar su arte. ¡Atrévete!`;
              const url = `https://${domain}/vlsabes`;
              if (navigator.share) {
                navigator.share({ title: `${gameName} Trivia`, text, url });
              } else {
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
              }
            }}
            style={{ width: '50px', height: '50px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.1)', color: '#FFD700', cursor: 'pointer', flexShrink: 0 }}
            title="Compartir Juego"
          >
            <Share2 size={22} />
          </button>

          <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
          {/* Botón Himno de La Serena */}
          <button
            onClick={() => {
              if (isAnthemPlaying) {
                soundService.stopAnthem();
                setIsAnthemPlaying(false);
              } else if (!isMuted) {
                setIsAnthemPlaying(true);
                soundService.playAnthem().catch(() => setIsAnthemPlaying(false));
              }
            }}
            title="Himno de La Serena"
            style={{ width: '50px', height: '50px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', border: `2px solid ${isAnthemPlaying ? '#FFD700' : 'rgba(255,255,255,0.15)'}`, background: isAnthemPlaying ? 'rgba(255,215,0,0.2)' : 'rgba(30,41,59,0.5)', color: isAnthemPlaying ? '#FFD700' : '#94a3b8', cursor: 'pointer', flexShrink: 0 }}
          >
            <Music size={22} />
          </button>
          <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
          <button onClick={() => setIsVoiceMode(!isVoiceMode)} style={{ width: '50px', height: '50px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', border: `2px solid ${isVoiceMode ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, background: isVoiceMode ? '#dc2626' : 'rgba(30,41,59,0.4)', color: isVoiceMode ? 'white' : '#94a3b8', cursor: 'pointer', flexShrink: 0 }}><Mic size={22} /></button>
          
          <div style={{ width: '1px', height: '2rem', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
          
          {/* Botón de Créditos (Misterioso/Animado) */}
          <motion.button
            animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                    "0 0 0px rgba(56, 189, 248, 0)",
                    "0 0 15px rgba(56, 189, 248, 0.4)",
                    "0 0 0px rgba(56, 189, 248, 0)"
                ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => setShowCredits(true)}
            style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'rgba(56, 189, 248, 0.2)', 
                border: '1px solid #38bdf8', 
                color: '#38bdf8', 
                cursor: 'help', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
            title="¿Quiénes somos?"
          >
            <HelpCircle size={18} />
          </motion.button>
        </div>

        <AnimatePresence>
          {showCredits && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }} 
               style={{ 
                 position: 'fixed', inset: 0, zIndex: 1000005, 
                 background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(15px)',
                 display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
               }}
             >
                <motion.div 
                   initial={{ scale: 0.9, y: 20 }}
                   animate={{ scale: 1, y: 0 }}
                   style={{ 
                     background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                     border: '1px solid rgba(56, 189, 248, 0.3)',
                     padding: '3rem', borderRadius: '32px', maxWidth: '600px', width: '100%',
                     boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', textAlign: 'center'
                   }}
                >
                   <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '15px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1.5rem auto' }}>
                      <HelpCircle size={40} color="#38bdf8" />
                   </div>
                   
                   <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Legado Digital</h3>
                   
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
                      <p>Desarrollo íntegro de <strong style={{ color: 'white' }}>vecinoslaserena.cl</strong> y su equipo de colaboradores.</p>
                      <p>Basado en las trivias universales y otras inspiraciones maravillosas.</p>
                      <p style={{ fontStyle: 'italic', color: '#38bdf8' }}>"Muchas gracias a todos, puede seguir creciendo siempre."</p>
                      
                      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                         <span style={{ fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>Contacto & Sugerencias:</span>
                         <a href="mailto:contacto@vecinosmart.cl" style={{ color: '#FFD700', fontWeight: 'bold', textDecoration: 'none' }}>contacto@vecinosmart.cl</a>
                      </div>
                   </div>

                   <button 
                     onClick={() => setShowCredits(false)} 
                     style={{ 
                       marginTop: '2rem', width: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', 
                       color: 'white', padding: '1.2rem', borderRadius: '16px', 
                       fontWeight: '900', fontSize: '1rem', cursor: 'pointer', border: 'none' 
                     }}
                   >
                     CERRAR
                   </button>
                </motion.div>
             </motion.div>
          )}
          {gameState === 'lifeline_phone' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1000002, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ background: '#0a0f1a', border: '2px solid #FFD700', padding: '4rem', borderRadius: '40px', maxWidth: '800px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                  <Phone size={80} color="#FFD700" style={{ margin: '0 auto 2rem' }} />
                  <p style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '3rem', fontStyle: 'italic' }}>"{lifelineResult}"</p>
                  <button onClick={() => setGameState('playing')} style={{ width: '100%', background: '#FFD700', color: 'black', padding: '1.5rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer' }}>CERRAR LLAMADA</button>
                </div>
             </motion.div>
          )}
          {gameState === 'lifeline_audience' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 1000002, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
               <div style={{ background: '#0a0f1a', border: '2px solid #FFD700', padding: '4rem', borderRadius: '40px', maxWidth: '800px', width: '100%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#FFD700', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', textTransform: 'uppercase' }}><Users size={40}/> Voto de la Comunidad</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '250px', gap: '2rem', marginBottom: '3rem' }}>
                    {audienceData.map((val, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', height: '100%', justifyContent: 'flex-end', flex: 1 }}>
                        <span style={{ color: '#FFD700', fontWeight: '900', fontSize: '1.5rem' }}>{val}%</span>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${val}%` }} style={{ width: '100%', minHeight: '10px', background: i === currentQuestion.correctIndex ? 'linear-gradient(to top, #047857, #34d399)' : 'linear-gradient(to top, #1e293b, #475569)', borderRadius: '12px 12px 0 0', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <span style={{ color: 'white', fontWeight: '900', fontSize: '1.2rem', background: 'rgba(255,255,255,0.1)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>{String.fromCharCode(65 + i)}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setGameState('playing')} style={{ width: '100%', background: '#FFD700', color: 'black', padding: '1.5rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer' }}>CERRAR RESULTADOS</button>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── PANTALLA DE FRACASO (GAME OVER) ───
  if (gameState === 'game_over') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#0a0f1a', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ color: '#ef4444', fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: '900', textTransform: 'uppercase', marginBottom: '2rem', textShadow: '0 0 50px rgba(239,68,68,0.5)', textAlign: 'center' }}>
          ¡INCORRECTO!
        </h1>
        {currentQuestion && (
           <p style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
              La respuesta correcta era: <strong style={{ color: '#4ade80' }}>{currentQuestion.options[currentQuestion.correctIndex]}</strong>
           </p>
        )}
        {currentQuestion?.explanation && (
           <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', marginBottom: '4rem', fontStyle: 'italic', textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
              "{currentQuestion.explanation}"
           </p>
        )}
        <button onClick={() => setGameState('start')} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '2px solid #ef4444', padding: '1.5rem 4rem', borderRadius: '30px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '2px' }} onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'scale(1.05)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.transform = 'scale(1)'; }}>
            Volver a Intentarlo
        </button>
      </div>
    );
  }

  // ─── PANTALLA DE VICTORIA ÉPICA (WON) ───
  if (gameState === 'won') {
    const playerName = currentUser?.displayName || 'Maestro Ciudadano';
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'radial-gradient(ellipse at 50% 30%, #1a0a3d 0%, #000 70%)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        {/* Stars background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(2px 2px at var(--x) var(--y), rgba(255,255,255,0.8), transparent)', pointerEvents: 'none' }} />
        {/* Gold rays */}
        <div style={{ position: 'absolute', inset: 0, background: 'conic-gradient(from 0deg at 50% 60%, transparent 0deg, rgba(255,215,0,0.04) 30deg, transparent 60deg, rgba(255,215,0,0.04) 90deg, transparent 120deg, rgba(255,215,0,0.04) 150deg, transparent 180deg, rgba(255,215,0,0.04) 210deg, transparent 240deg, rgba(255,215,0,0.04) 270deg, transparent 300deg, rgba(255,215,0,0.04) 330deg, transparent 360deg)', pointerEvents: 'none' }} />
        
        {/* Glowing circle */}
        <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Trophy */}
        <motion.div initial={{ scale: 0, rotate: -180, y: 100 }} animate={{ scale: 1, rotate: 0, y: 0 }} transition={{ type: 'spring', bounce: 0.5, duration: 1 }} style={{ marginBottom: '1.5rem' }}>
          <Trophy size={120} color="#FFD700" style={{ filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.8))' }} />
        </motion.div>

        {/* Medal de etapa completada */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ fontSize: '0.8rem', fontWeight: '900', letterSpacing: '4px', color: '#FFD700', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.7 }}
        >
          {['MISIÓN CUMPLIDA', 'LOGRO DESBLOQUEADO', 'MAESTRÍA ALCANZADA', 'OBJETIVO COMPLETADO', 'NIVEL SUPERADO'][currentStageId % 5]} — NIVEL {currentStageId}
        </motion.div>

        {/* Player name BIG */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', bounce: 0.3 }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: '900', color: 'white', textAlign: 'center', textShadow: '0 0 60px rgba(255,215,0,0.5)', margin: '0 1rem 0.5rem', lineHeight: 1.1 }}
        >
          ¡{playerName}!
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 3vw, 1.5rem)', marginBottom: '1rem', textAlign: 'center', padding: '0 2rem' }}
        >
          Dominaste: <strong style={{ color: '#FFD700' }}>{currentStage?.name}</strong>
        </motion.p>

        {/* Stars display */}
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}
          style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 + i * 0.1 }}
              style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))' }}
            >⭐</motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0 2rem' }}
        >
          <button onClick={() => setGameState('start')} style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '2px solid rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '30px', fontSize: '1rem', fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '1px' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
          >
            MENÚ PRINCIPAL
          </button>
          <button onClick={() => startGame(false, currentStageId < STAGES.length ? currentStageId + 1 : 1)}
            style={{ background: 'linear-gradient(135deg, #FFD700, #f59e0b)', color: 'black', padding: '1rem 3rem', borderRadius: '30px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', outline: 'none', border: 'none', boxShadow: '0 10px 40px rgba(255,215,0,0.5)', transition: 'all 0.2s', letterSpacing: '1px' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            PRÓXIMO DESAFÍO {currentStageId < STAGES.length ? `→ NIVEL ${currentStageId + 1}` : '→ INICIO'}
          </button>
        </motion.div>

        <style>{`
          @keyframes float-star { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-120vh) rotate(720deg); opacity: 0; } }
        `}</style>
      </div>
    );
  }

  // ─── PANTALLA DE INICIO (MENÚ PRINCIPAL) ───
  return (
    <div id="vls-trivia-main-container" className="min-h-screen py-16 px-8 bg-[#020617] text-white relative flex flex-col items-center overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img src="/portada_vls_trivia.jpg" className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-40 grayscale-[40%]" alt="Faro" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/70 to-[#020617]" />
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl w-full z-10 flex flex-col items-center text-center mt-20">
          <div className="absolute top-12 right-12 flex gap-6 p-4 bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <button 
                  onClick={() => setIsVoiceMode(!isVoiceMode)} 
                  className={`w-20 h-20 rounded-[1.5rem] border transition-all flex flex-col items-center justify-center gap-1 ${isVoiceMode ? 'bg-red-600 border-red-500 text-white shadow-lg animate-pulse' : 'bg-white/5 border-white/10 text-slate-400'}`}
                  title="Modo Voz"
              >
                  <Mic size={32} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">VOZ</span>
              </button>
              <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-1"
                  title="Silenciar"
              >
                  {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
                  <span className="text-[9px] font-bold uppercase tracking-widest">AUDIO</span>
              </button>
              <button 
                  onClick={() => setGameState('start')} 
                  className="w-20 h-20 rounded-[1.5rem] bg-red-600/10 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white transition-all flex flex-col items-center justify-center gap-1"
                  title="Abandonar"
              >
                  <X size={32} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">SALIR</span>
              </button>
          </div>

          <div className="max-w-6xl w-full flex flex-col items-center">
        <div className="relative mb-16"><FaroIcon size={200} className="text-red-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.6)]" /></div>
        <h1 className="text-6xl lg:text-[8rem] font-black leading-[0.85] italic uppercase tracking-tighter mb-6 text-white drop-shadow-3xl">
          {(window.location.host.toLowerCase().includes('rdmls') || (window.location.host.toLowerCase().includes('laserena.cl') && !window.location.host.toLowerCase().includes('vecinos'))) ? 'QUIÉN QUIERE SABER' : 'QUIÉN QUIERE ESTAR'}<br/>
          <span className="text-red-600 not-italic">{(window.location.host.toLowerCase().includes('rdmls') || (window.location.host.toLowerCase().includes('laserena.cl') && !window.location.host.toLowerCase().includes('vecinos'))) ? 'MÁS?' : 'INFORMADO?'}</span>
        </h1>
        <p className="text-xl lg:text-3xl font-light text-slate-400 max-w-4xl mb-24 uppercase tracking-[0.5em] leading-relaxed italic">
          {(window.location.host.toLowerCase().includes('rdmls') || (window.location.host.toLowerCase().includes('laserena.cl') && !window.location.host.toLowerCase().includes('vecinos'))) ? 'EDICIÓN INSTITUCIONAL RDMLS 2026' : 'EDICIÓN REGIONAL VLS SMART CITY 2026'}
        </p>
        <div className="flex flex-col sm:flex-row gap-10 w-full max-w-5xl justify-center">
            {hasSavedGame && (
                <button onClick={() => startGame(true)} className="flex-1 bg-white/5 hover:bg-white/10 p-12 rounded-[4rem] border border-white/10 transition-all flex flex-col items-center gap-6"><RefreshCw size={50} className="text-blue-500" /><span className="text-2xl font-black uppercase italic">Reanudar</span></button>
            )}
            <button onClick={() => startGame(false)} className="flex-1 bg-red-600 p-12 rounded-[4rem] shadow-3xl hover:bg-red-500 transition-all flex flex-col items-center gap-6"><Play size={50} fill="white" /><span className="text-2xl font-black uppercase italic">Nuevo Legado</span></button>
          </div>
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
