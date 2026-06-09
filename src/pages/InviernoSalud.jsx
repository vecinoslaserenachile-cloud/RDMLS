import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, ShieldAlert, ArrowLeft, CheckCircle2, XCircle, Stethoscope, Syringe, Info, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TRIVIA_QUESTIONS = [
    {
        id: 1,
        question: "¿Cuál es una de las medidas principales para prevenir enfermedades respiratorias en invierno?",
        options: [
            "Evitar vacunarse",
            "Lavado frecuente de manos",
            "Mantener ventanas siempre cerradas todo el día",
            "Consumir bebidas muy heladas"
        ],
        correctAnswer: 1,
        explanation: "El lavado frecuente de manos elimina virus y bacterias que causan infecciones respiratorias."
    },
    {
        id: 2,
        question: "Según el Protocolo Rojo, ¿qué síntoma requiere acudir de inmediato a Urgencias (SAPU u Hospital)?",
        options: [
            "Tos leve ocasional",
            "Hundimiento profundo debajo de las costillas al respirar",
            "Resfrío de 1 día de evolución",
            "Dolor de cabeza leve"
        ],
        correctAnswer: 1,
        explanation: "El hundimiento de costillas (tiraje) es un signo de dificultad respiratoria grave (Riesgo Vital)."
    },
    {
        id: 3,
        question: "¿Qué nos indica el Protocolo Amarillo frente a síntomas moderados como tos intensa por más de 3 días?",
        options: [
            "Esperar en casa a que pase solo",
            "Ir inmediatamente al Hospital Regional",
            "Consulta médica necesaria a la brevedad en el CESFAM",
            "Tomar antibióticos que sobraron del año pasado"
        ],
        correctAnswer: 2,
        explanation: "Para síntomas moderados, se debe acudir al consultorio o CESFAM para evaluación y tratamiento adecuado, evitando saturar Urgencias."
    }
];

export default function InviernoSalud() {
    const navigate = useNavigate();
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [ytReady, setYtReady] = useState(false);
    
    // Trivia State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showTriviaResult, setShowTriviaResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    
    useEffect(() => {
        window.scrollTo(0,0);
        
        const initYT = () => {
            if (window.YT && window.YT.Player) {
                playerRef.current = new window.YT.Player('invierno-player', {
                    videoId: 'en814QFgsFY',
                    playerVars: {
                        autoplay: 0,
                        controls: 0,
                        rel: 0,
                        modestbranding: 1,
                        fs: 0
                    },
                    events: {
                        onReady: (event) => {
                            setYtReady(true);
                        },
                        onStateChange: (event) => {
                            if (event.data === window.YT.PlayerState.PLAYING) {
                                setIsPlaying(true);
                            } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                                setIsPlaying(false);
                            }
                        }
                    }
                });
            } else {
                setTimeout(initYT, 500);
            }
        };

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = initYT;
        } else {
            initYT();
        }

        return () => {
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
            }
        };
    }, []);

    const handlePlayPause = () => {
        if (!playerRef.current || !ytReady) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleMuteToggle = () => {
        if (!playerRef.current || !ytReady) return;
        if (isMuted) {
            playerRef.current.unMute();
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (playerRef.current && ytReady) {
            playerRef.current.setVolume(newVolume);
            if (newVolume > 0 && isMuted) {
                playerRef.current.unMute();
                setIsMuted(false);
            } else if (newVolume === 0) {
                playerRef.current.mute();
                setIsMuted(true);
            }
        }
    };
    
    const handleAnswerSelect = (index) => {
        if (isAnswerChecked) return;
        setSelectedAnswer(index);
    };
    
    const checkAnswer = () => {
        if (selectedAnswer === null) return;
        setIsAnswerChecked(true);
        if (selectedAnswer === TRIVIA_QUESTIONS[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };
    
    const nextQuestion = () => {
        if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
        } else {
            setShowTriviaResult(true);
        }
    };
    
    const resetTrivia = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowTriviaResult(false);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-white pb-20">
            {/* Header / Nav */}
            <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button 
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium hidden sm:inline">Volver al Hub</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <Stethoscope className="w-6 h-6 text-emerald-400" />
                        <h1 className="font-bold text-lg tracking-tight">Campaña Invierno 2026</h1>
                    </div>
                    <img src="/escudo.png" alt="Logo" className="h-8 w-auto opacity-80" />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
                
                {/* Hero Section */}
                <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-blue-900/40 opacity-50 z-0"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-sm border border-emerald-500/30">
                                <ShieldAlert className="w-4 h-4" />
                                <span>Entrevista Oficial - Salud Coquimbo</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                ¿Cuál es el mejor tratamiento? Prevenir
                            </h2>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Conoce las medidas oficiales y los protocolos de acción para enfrentar las enfermedades respiratorias de este invierno junto a las profesionales del Servicio de Salud Coquimbo.
                            </p>
                            
                            {/* Imágenes de Apoyo (Miniaturas) */}
                            <div className="flex gap-4 pt-4 overflow-x-auto pb-2 snap-x">
                                <img src="/invierno/invierno_protocolo_rojo.jpg" className="h-20 w-auto rounded-lg border border-slate-700 shadow-lg snap-start object-cover" alt="Protocolo Rojo" />
                                <img src="/invierno/invierno_protocolo_amarillo.jpg" className="h-20 w-auto rounded-lg border border-slate-700 shadow-lg snap-start object-cover" alt="Protocolo Amarillo" />
                                <img src="/invierno/invierno_prevenir.jpg" className="h-20 w-auto rounded-lg border border-slate-700 shadow-lg snap-start object-cover" alt="Prevenir" />
                            </div>
                        </div>
                        
                        {/* Video Player Section */}
                        <div className="relative">
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative group">
                                {!ytReady && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <div id="invierno-player" className="w-full h-full pointer-events-none"></div>
                                
                                {/* Overlay Controls (Glassmorphism) */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onClick={handlePlayPause} className="text-white hover:text-emerald-400 transition-colors">
                                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                                    </button>
                                    
                                    <div className="flex items-center gap-2">
                                        <button onClick={handleMuteToggle} className="text-white hover:text-emerald-400 transition-colors">
                                            {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                        </button>
                                        <input 
                                            type="range" 
                                            min="0" max="100" 
                                            value={isMuted ? 0 : volume} 
                                            onChange={handleVolumeChange}
                                            className="w-24 accent-emerald-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Graphic Decorator */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full z-[-1]"></div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Contenidos y Protocolos */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Info className="text-blue-400" />
                                Material Oficial de la Campaña
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <img src="/invierno/invierno_entrevista_portada.jpg" className="w-full rounded-xl shadow-md border border-slate-700" alt="Entrevista Entrevecinas" />
                                    <p className="text-sm text-slate-400 font-medium">Entrevista Completa Entrevecinas</p>
                                </div>
                                <div className="space-y-3">
                                    <img src="/invierno/invierno_prevenir.jpg" className="w-full rounded-xl shadow-md border border-slate-700" alt="Fono Salud Responde" />
                                    <p className="text-sm text-slate-400 font-medium">Línea Salud Responde (600 360 7777)</p>
                                </div>
                                <div className="space-y-3">
                                    <img src="/invierno/invierno_protocolo_amarillo.jpg" className="w-full rounded-xl shadow-md border border-slate-700" alt="Protocolo Amarillo" />
                                    <p className="text-sm text-slate-400 font-medium">Protocolo Amarillo: Síntomas Moderados (CESFAM)</p>
                                </div>
                                <div className="space-y-3">
                                    <img src="/invierno/invierno_protocolo_rojo.jpg" className="w-full rounded-xl shadow-md border border-slate-700" alt="Protocolo Rojo" />
                                    <p className="text-sm text-slate-400 font-medium">Protocolo Rojo: Urgencia / Riesgo Vital (SAPU/Hospital)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trivia Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <Star className="text-yellow-400" />
                                    Trivia VLS
                                </h3>
                                <span className="bg-slate-950 text-emerald-400 font-mono text-xs px-3 py-1 rounded-full border border-emerald-900">
                                    {score} PUNTOS
                                </span>
                            </div>

                            {!showTriviaResult ? (
                                <AnimatePresence mode="wait">
                                    <motion.div 
                                        key={currentQuestion}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        <div className="text-sm text-slate-400 font-medium mb-2">
                                            Pregunta {currentQuestion + 1} de {TRIVIA_QUESTIONS.length}
                                        </div>
                                        <p className="text-lg font-medium leading-snug">
                                            {TRIVIA_QUESTIONS[currentQuestion].question}
                                        </p>
                                        
                                        <div className="space-y-2 mt-4">
                                            {TRIVIA_QUESTIONS[currentQuestion].options.map((option, idx) => {
                                                const isSelected = selectedAnswer === idx;
                                                const isCorrect = idx === TRIVIA_QUESTIONS[currentQuestion].correctAnswer;
                                                
                                                let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 ";
                                                
                                                if (!isAnswerChecked) {
                                                    btnClass += isSelected 
                                                        ? "bg-emerald-600/30 border-emerald-500 text-white" 
                                                        : "bg-slate-950/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600";
                                                } else {
                                                    if (isCorrect) {
                                                        btnClass += "bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
                                                    } else if (isSelected && !isCorrect) {
                                                        btnClass += "bg-red-900/50 border-red-500 text-red-200";
                                                    } else {
                                                        btnClass += "bg-slate-950/30 border-slate-800 text-slate-500 opacity-50";
                                                    }
                                                }

                                                return (
                                                    <button 
                                                        key={idx}
                                                        onClick={() => handleAnswerSelect(idx)}
                                                        disabled={isAnswerChecked}
                                                        className={btnClass}
                                                    >
                                                        <div className="flex items-start justify-between gap-2">
                                                            <span>{option}</span>
                                                            {isAnswerChecked && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />}
                                                            {isAnswerChecked && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {isAnswerChecked ? (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="pt-4"
                                            >
                                                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 mb-4">
                                                    <span className="font-bold text-emerald-400 block mb-1">
                                                        {selectedAnswer === TRIVIA_QUESTIONS[currentQuestion].correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                                                    </span>
                                                    {TRIVIA_QUESTIONS[currentQuestion].explanation}
                                                </div>
                                                <button 
                                                    onClick={nextQuestion}
                                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg"
                                                >
                                                    {currentQuestion === TRIVIA_QUESTIONS.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <button 
                                                onClick={checkAnswer}
                                                disabled={selectedAnswer === null}
                                                className={`w-full py-3 font-bold rounded-xl transition-all duration-300 mt-6 ${
                                                    selectedAnswer !== null 
                                                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" 
                                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                                }`}
                                            >
                                                Comprobar
                                            </button>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6 py-8"
                                >
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                        <Heart className="w-12 h-12 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-white">¡Trivia Completada!</h4>
                                        <p className="text-slate-400 mt-2">
                                            Obtuviste <span className="text-emerald-400 font-bold">{score}</span> de {TRIVIA_QUESTIONS.length} respuestas correctas.
                                        </p>
                                    </div>
                                    <p className="text-sm text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-700">
                                        Gracias por informarte. Cuidarnos en invierno es tarea de toda la comunidad.
                                    </p>
                                    <button 
                                        onClick={resetTrivia}
                                        className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
                                    >
                                        Jugar de nuevo
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
