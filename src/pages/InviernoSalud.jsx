import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, ShieldAlert, CheckCircle2, XCircle, Info, Stethoscope, Star, ArrowLeft } from 'lucide-react';
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
        <div style={{ 
            background: '#020617', 
            minHeight: '100vh', 
            color: 'white', 
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header */}
            <header style={{
                padding: '1.2rem 2rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(2, 6, 23, 0.98)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div 
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                >
                    <div style={{ 
                        width: '45px', 
                        height: '45px', 
                        background: '#10b981',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 5px 15px rgba(16, 185, 129, 0.4)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <ArrowLeft size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px' }}>
                            Campaña <span style={{ color: '#10b981' }}>Invierno</span>
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontWeight: '500' }}>Volver al Hub</p>
                    </div>
                </div>
            </header>

            <main style={{ flex: 1, padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                
                {/* Hero Video Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.8))',
                        borderRadius: '40px',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        padding: '3rem',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '3rem',
                        alignItems: 'center'
                    }}>
                        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: '#10b981', filter: 'blur(150px)', opacity: 0.15, pointerEvents: 'none' }} />
                        
                        <div style={{ flex: '1', minWidth: '300px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '5px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '900', border: '1px solid rgba(16, 185, 129, 0.3)' }}>SALUD PÚBLICA</span>
                                <Stethoscope size={20} color="#10b981" />
                            </div>
                            <h2 style={{ fontSize: '3rem', fontWeight: '950', color: 'white', marginBottom: '1.5rem', lineHeight: '1' }}>
                                Entrevista Oficial <br/> 
                                <span style={{ color: '#10b981' }}>Salud Coquimbo</span>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                Conoce las medidas oficiales y los protocolos de acción para enfrentar las enfermedades respiratorias de este invierno junto a las profesionales del Servicio de Salud Coquimbo.
                            </p>
                            
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <img src="/invierno/invierno_protocolo_rojo.jpg" alt="Rojo" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
                                <img src="/invierno/invierno_protocolo_amarillo.jpg" alt="Amarillo" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
                                <img src="/invierno/invierno_prevenir.jpg" alt="Prevenir" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
                            </div>
                        </div>

                        {/* Reproductor Smart */}
                        <div style={{ flex: '1.5', minWidth: '400px', position: 'relative' }}>
                            <div style={{ 
                                background: '#000', 
                                borderRadius: '25px', 
                                overflow: 'hidden', 
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                                position: 'relative',
                                aspectRatio: '16/9'
                            }}>
                                {!ytReady && (
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
                                        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(16,185,129,0.3)', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                    </div>
                                )}
                                <div id="invierno-player" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}></div>
                                
                                {/* Controles Overlay */}
                                <div style={{ 
                                    position: 'absolute', 
                                    bottom: '20px', 
                                    left: '50%', 
                                    transform: 'translateX(-50%)',
                                    background: 'rgba(0,0,0,0.7)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '10px 25px',
                                    borderRadius: '50px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <button onClick={handlePlayPause} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {isPlaying ? <Pause size={28} color="#10b981" /> : <Play size={28} color="#10b981" style={{ marginLeft: '4px' }} />}
                                    </button>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button onClick={handleMuteToggle} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }}>
                                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                        <input 
                                            type="range" 
                                            min="0" max="100" 
                                            value={isMuted ? 0 : volume} 
                                            onChange={handleVolumeChange}
                                            style={{ width: '100px', accentColor: '#10b981', cursor: 'pointer' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                    
                    {/* Material Section */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.4))',
                        borderRadius: '35px',
                        padding: '2.5rem',
                        border: '1px solid rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                            <div style={{ width: '50px', height: '50px', background: '#3b82f6', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}>
                                <Info size={24} color="white" />
                            </div>
                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>Material Interactivo</h3>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { src: "/invierno/invierno_entrevista_portada.jpg", title: "Campaña Oficial", desc: "Entrevista en profundidad" },
                                { src: "/invierno/invierno_prevenir.jpg", title: "Prevención", desc: "Medidas clave en casa" },
                                { src: "/invierno/invierno_protocolo_amarillo.jpg", title: "Alerta Amarilla", desc: "Cuándo ir al CESFAM" },
                                { src: "/invierno/invierno_protocolo_rojo.jpg", title: "Alerta Roja", desc: "Urgencia Inmediata" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ 
                                        position: 'relative', 
                                        borderRadius: '20px', 
                                        overflow: 'hidden', 
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.4)', 
                                        cursor: 'pointer',
                                        border: '2px solid rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <img src={item.src} alt={item.title} style={{ width: '100%', display: 'block', transition: 'transform 0.5s' }} />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        padding: '1.5rem',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease-in-out'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                                    >
                                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', fontWeight: '900', color: 'white' }}>{item.title}</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{item.desc}</p>
                                        <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.2)', width: 'fit-content', padding: '5px 15px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            Explorar
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Trivia Section */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(15, 23, 42, 0.6))',
                        borderRadius: '35px',
                        padding: '2.5rem',
                        border: '1px solid rgba(234, 179, 8, 0.2)',
                        backdropFilter: 'blur(20px)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', background: '#eab308', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(234, 179, 8, 0.3)' }}>
                                    <Star size={24} color="white" />
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>Trivia VLS</h3>
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', color: '#eab308', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                {score} PUNTOS
                            </div>
                        </div>

                        {!showTriviaResult ? (
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={currentQuestion}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                                >
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'bold' }}>
                                        Pregunta {currentQuestion + 1} de {TRIVIA_QUESTIONS.length}
                                    </p>
                                    <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '2rem', lineHeight: '1.4' }}>
                                        {TRIVIA_QUESTIONS[currentQuestion].question}
                                    </h4>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
                                        {TRIVIA_QUESTIONS[currentQuestion].options.map((option, idx) => {
                                            const isSelected = selectedAnswer === idx;
                                            const isCorrect = idx === TRIVIA_QUESTIONS[currentQuestion].correctAnswer;
                                            
                                            let bg = 'rgba(0,0,0,0.3)';
                                            let border = '1px solid rgba(255,255,255,0.1)';
                                            let color = '#cbd5e1';
                                            
                                            if (!isAnswerChecked) {
                                                if (isSelected) {
                                                    bg = 'rgba(234, 179, 8, 0.2)';
                                                    border = '1px solid #eab308';
                                                    color = 'white';
                                                }
                                            } else {
                                                if (isCorrect) {
                                                    bg = 'rgba(16, 185, 129, 0.2)';
                                                    border = '1px solid #10b981';
                                                    color = 'white';
                                                } else if (isSelected && !isCorrect) {
                                                    bg = 'rgba(239, 68, 68, 0.2)';
                                                    border = '1px solid #ef4444';
                                                    color = 'white';
                                                } else {
                                                    bg = 'rgba(0,0,0,0.1)';
                                                    color = '#64748b';
                                                }
                                            }

                                            return (
                                                <button 
                                                    key={idx}
                                                    onClick={() => handleAnswerSelect(idx)}
                                                    disabled={isAnswerChecked}
                                                    style={{
                                                        background: bg,
                                                        border: border,
                                                        color: color,
                                                        padding: '15px 20px',
                                                        borderRadius: '15px',
                                                        textAlign: 'left',
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        cursor: isAnswerChecked ? 'default' : 'pointer',
                                                        transition: 'all 0.2s',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span>{option}</span>
                                                    {isAnswerChecked && isCorrect && <CheckCircle2 size={20} color="#10b981" />}
                                                    {isAnswerChecked && isSelected && !isCorrect && <XCircle size={20} color="#ef4444" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div style={{ marginTop: 'auto' }}>
                                        {isAnswerChecked ? (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '15px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <span style={{ display: 'block', color: selectedAnswer === TRIVIA_QUESTIONS[currentQuestion].correctAnswer ? '#10b981' : '#ef4444', fontWeight: 'bold', marginBottom: '5px' }}>
                                                        {selectedAnswer === TRIVIA_QUESTIONS[currentQuestion].correctAnswer ? "¡Correcto!" : "Respuesta incorrecta"}
                                                    </span>
                                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#cbd5e1' }}>{TRIVIA_QUESTIONS[currentQuestion].explanation}</p>
                                                </div>
                                                <button 
                                                    onClick={nextQuestion}
                                                    style={{ width: '100%', background: '#eab308', color: '#422006', border: 'none', padding: '15px', borderRadius: '15px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(234, 179, 8, 0.3)' }}
                                                >
                                                    {currentQuestion === TRIVIA_QUESTIONS.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <button 
                                                onClick={checkAnswer}
                                                disabled={selectedAnswer === null}
                                                style={{ 
                                                    width: '100%', 
                                                    background: selectedAnswer !== null ? '#3b82f6' : 'rgba(255,255,255,0.1)', 
                                                    color: selectedAnswer !== null ? 'white' : '#64748b', 
                                                    border: 'none', 
                                                    padding: '15px', 
                                                    borderRadius: '15px', 
                                                    fontWeight: '900', 
                                                    fontSize: '1.1rem', 
                                                    cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                                                    transition: 'all 0.3s'
                                                }}
                                            >
                                                Comprobar
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '2rem 0' }}
                            >
                                <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}>
                                    <Heart size={50} color="white" />
                                </div>
                                <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '1rem' }}>¡Completado!</h4>
                                <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>
                                    Obtuviste <span style={{ color: '#eab308', fontWeight: 'bold' }}>{score}</span> de {TRIVIA_QUESTIONS.length} respuestas correctas.
                                </p>
                                <button 
                                    onClick={resetTrivia}
                                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 30px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
                                >
                                    Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}
