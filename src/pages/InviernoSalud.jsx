import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Heart, ShieldAlert, CheckCircle2, XCircle, Info, Stethoscope, Star, ArrowLeft, X, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

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

// Helper para sonidos UI
const playTone = (frequency, type, duration, vol=0.1) => {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    } catch(e) {
        console.error("Audio API not supported");
    }
};

const playCorrectSound = () => {
    playTone(600, 'sine', 0.1);
    setTimeout(() => playTone(800, 'sine', 0.2), 100);
};

const playIncorrectSound = () => {
    playTone(300, 'sawtooth', 0.2, 0.05);
    setTimeout(() => playTone(200, 'sawtooth', 0.3, 0.05), 150);
};

const playWinSound = () => {
    playTone(400, 'sine', 0.1);
    setTimeout(() => playTone(500, 'sine', 0.1), 100);
    setTimeout(() => playTone(600, 'sine', 0.1), 200);
    setTimeout(() => playTone(800, 'sine', 0.4), 300);
};

export default function InviernoSalud() {
    const navigate = useNavigate();
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const [ytReady, setYtReady] = useState(false);
    
    // Image Modal State
    const [selectedImage, setSelectedImage] = useState(null);

    // Trivia State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showTriviaResult, setShowTriviaResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    
    // Transcript State
    const [showTranscript, setShowTranscript] = useState(false);
    
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
        playTone(300 + (index*50), 'sine', 0.05);
        setSelectedAnswer(index);
    };
    
    const checkAnswer = () => {
        if (selectedAnswer === null) return;
        setIsAnswerChecked(true);
        if (selectedAnswer === TRIVIA_QUESTIONS[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
            playCorrectSound();
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#10b981', '#34d399']
            });
        } else {
            playIncorrectSound();
        }
    };
    
    const nextQuestion = () => {
        if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswerChecked(false);
        } else {
            setShowTriviaResult(true);
            playWinSound();
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#eab308', '#f59e0b', '#10b981', '#3b82f6']
            });
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
                            <p style={{ fontSize: '1.1rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Conoce las medidas oficiales y los protocolos de acción para enfrentar las enfermedades respiratorias de este invierno junto a las profesionales del Servicio de Salud Coquimbo.
                            </p>

                            <button 
                                onClick={() => setShowTranscript(!showTranscript)}
                                style={{
                                    background: showTranscript ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                                    border: '1px solid #3b82f6',
                                    color: '#3b82f6',
                                    padding: '8px 16px',
                                    borderRadius: '50px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '2rem',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {showTranscript ? <ArrowLeft size={16} /> : <Info size={16} />}
                                {showTranscript ? "Ocultar Transcripción" : "Leer Transcripción de la Entrevista"}
                            </button>

                            <AnimatePresence>
                                {showTranscript && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden', marginBottom: '2rem' }}
                                    >
                                        <div style={{
                                            background: '#e5ddd5',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '15px',
                                            height: '400px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                        }}>
                                            {/* WhatsApp Header */}
                                            <div style={{
                                                background: '#075e54',
                                                padding: '10px 15px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px',
                                                color: 'white'
                                            }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                                    <Stethoscope size={24} color="#075e54" />
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>Dra. Paulina Fleite</h4>
                                                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.8 }}>en línea</p>
                                                </div>
                                            </div>

                                            {/* WhatsApp Messages Area */}
                                            <div style={{
                                                flex: 1,
                                                padding: '20px',
                                                overflowY: 'auto',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '10px',
                                                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                                                backgroundSize: 'contain'
                                            }}>
                                                {[
                                                    { sender: "Francesca", text: "Hola Paulina, bienvenida. Para comenzar, ¿cuáles son las medidas de prevención más importantes para este invierno?", time: "10:00" },
                                                    { sender: "Paulina", text: "Gracias Francesca. Las medidas fundamentales son: lavado de manos frecuente, ambientes saludables, y cuidar las vías aéreas con bandana o bufanda para evitar cambios de temperatura. También evitar calefacciones tóxicas para nuestro organismo.", time: "10:01" },
                                                    { sender: "Paulina", text: "Y evitar el sobreabrigo. Es super importante porque a veces cuesta saber con qué vestirse. Con los niños, las mamás tienden a vestirlos como que fueran a cruzar el polo, pero los niños llegan al jardín y juegan, se mueven, transpiran y esa transpiración se enfría, lo que finalmente hace peor.", time: "10:02" },
                                                    { sender: "Francesca", text: "Sí, sobre todo pasa con los niños porque son más inquietos, están más activos. ¿Y con las vacaciones que se vienen y las aglomeraciones, qué podemos recomendar para evitar contagios?", time: "10:03" },
                                                    { sender: "Paulina", text: "Evitar las aglomeraciones: mall, supermercado, cine. Estos espacios cerrados favorecen el contagio. Son invitaciones a la naturaleza, ojala a lugares abiertos, con ropa cómoda.", time: "10:04" },
                                                    { sender: "Paulina", text: "Y ojo: en vacaciones las mamás dicen 'estuvo superbien', pero en realidad durante ese tiempo los niños incuban los virus, llegan al colegio en espacios cerrados con poca ventilación y se contagian entre ellos.", time: "10:05" },
                                                    { sender: "Paulina", text: "La recomendación es seguir todas las medidas preventivas: si alguien está resfriado en casa, que use mascarilla; que los niños y personas mayores eviten el contacto con personas enfermas. Y por sobre todo, ¡vacunarse a tiempo!", time: "10:06" },
                                                    { sender: "Francesca", text: "Paulina, si algún vecino o vecina tiene algún problema de salud respiratoria, ¿qué debe hacer?", time: "10:07" },
                                                    { sender: "Paulina", text: "Existen distintos niveles de acción. Me gustaría que viéramos las imágenes mientras conversamos. 🟢 PROTOCOLO VERDE - Síntomas Leves: resfrío con o sin tos, frecuencia respiratoria menos de 40 por minuto, fiebre entre 36°-38°C que dura MENOS de 3 días.", time: "10:08" },
                                                    { sender: "Paulina", text: "🟢 Para síntomas leves: siempre observar, aumentar líquidos en general, comer los mismos alimentos de siempre, mantener ropa liviana en pieza temperada (evitar corrientes de aire). Y en niños, un buen aseo nasal, sobre todo en el menor de 6 meses, ya que ellos son respiradores netamente nasales.", time: "10:09" },
                                                    { sender: "Paulina", text: "Me preocupo cuando la temperatura supera los 38°C y vemos que se asocia a dolor de oídos, dolor de garganta, diarrea o cuello rígido. En esos casos consultar a urgencias.", time: "10:10" },
                                                    { sender: "Francesca", text: "¿Y cuándo corresponde el Protocolo Amarillo?", time: "10:11" },
                                                    { sender: "Paulina", text: "🟡 PROTOCOLO AMARILLO - Síntomas Moderados: aquí sí o sí una consulta médica en CESFAM, pediatra o médico particular. El criterio es: resfrío con tos intensa por más de 3 días, aumento de frecuencia respiratoria (40 o más respiraciones por minuto en mayores de 6 meses), decaimiento, molestias al comer.", time: "10:12" },
                                                    { sender: "Paulina", text: "Pueden medir la frecuencia respiratoria poniendo la mano en la guatita de la persona y contando cuántas veces se levanta en un minuto. O también 30 segundos y multiplicar por dos. Si supera esa cantidad, es un riesgo.", time: "10:13" },
                                                    { sender: "Francesca", text: "¿Y cuándo es la situación más grave?", time: "10:14" },
                                                    { sender: "Paulina", text: "🔴 PROTOCOLO ROJO - Situación Grave, acudir a URGENCIAS: tos que dificulta la respiración o que ahogue, hundimiento de las costillas (tiraje), cambio de coloración en labios o uñas (eso es signo de falta de oxígeno), silbidos en el pecho audibles a distancia.", time: "10:15" },
                                                    { sender: "Paulina", text: "También si la persona le cuesta hablar de forma entrecortada, si los mayores están muy decaídos, duermen más de lo habitual, o si hay confusión y desorientación en personas que no tienen demencia. Eso llama mucho la atención.", time: "10:16" },
                                                    { sender: "Francesca", text: "¿Y en qué horario funcionan los servicios de urgencia?", time: "10:17" },
                                                    { sender: "Paulina", text: "Los SAPU funcionan de lunes a jueves de 17:00 a 24:00 hrs, viernes de 16:00 a 24:00 hrs, y sábados, domingos y festivos de 08:00 a 24:00 hrs. En nuestra conurbación hay SAR en CESFAM Emilio Cháfauser, CESFAM Raúl Silva Enrique y CESFAM Tierras Blancas, que funcionan en horario continuado.", time: "10:18" },
                                                    { sender: "Paulina", text: "Es importante que si los síntomas son más leves, vayan al CESFAM o SAPU y no al hospital, porque si van con síntomas leves, las horas de espera serán demasiadas.", time: "10:19" },
                                                    { sender: "Francesca", text: "Y si alguien no sabe si ir o no ir, ¿existe algún número al que llamar?", time: "10:20" },
                                                    { sender: "Paulina", text: "¡Sí! Salud Responde: 600 360 777. Funciona las 24 horas del día, los 7 días de la semana, con orientación médica. Si tienes síntomas y no sabes si ir, puedes consultar ese número. De verdad conviene tenerlo disponible.", time: "10:21" },
                                                    { sender: "Francesca", text: "¿Algo más que quieras decirle a los vecinos y vecinas de La Serena?", time: "10:22" },
                                                    { sender: "Paulina", text: "Que el mejor tratamiento siempre va a ser la prevención, desde antes del invierno. También hay otra inmunización importante: el Nirsevimab. Gracias a esta estrategia, durante 2 años no hubo fallecimientos por VRS (virus respiratorio sincicial) en menores de un año. Nuestra región está sobre el 90% de cobertura. ¡Un gran logro para la salud pública!", time: "10:23" },
                                                    { sender: "Paulina", text: "Y como somos una región que llueve poco, hay que prepararse: revisar techos, canaletas, y evitar la humedad dentro de los domicilios. Esa preparación va a hacer la diferencia.", time: "10:24" },
                                                    { sender: "Francesca", text: "Muchas gracias Paulina por tu tiempo y por venir a compartir tu experiencia en prevención respiratoria con nuestros vecinos y vecinas de La Serena.", time: "10:25" },
                                                    { sender: "Paulina", text: "¡Muchas gracias a ustedes! Un gusto. 🤝", time: "10:25" }
                                                ].map((msg, idx) => {
                                                    const isPaulina = msg.sender === "Paulina";
                                                    return (
                                                        <motion.div 
                                                            key={idx}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: idx * 0.15 }}
                                                            style={{
                                                                alignSelf: isPaulina ? 'flex-start' : 'flex-end',
                                                                background: isPaulina ? '#fff' : '#dcf8c6',
                                                                padding: '10px 15px',
                                                                borderRadius: '15px',
                                                                borderTopLeftRadius: isPaulina ? '0' : '15px',
                                                                borderTopRightRadius: isPaulina ? '15px' : '0',
                                                                maxWidth: '85%',
                                                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: isPaulina ? '#075e54' : '#128C7E', marginBottom: '4px' }}>
                                                                {msg.sender}
                                                            </div>
                                                            <div style={{ fontSize: '0.9rem', color: '#303030', lineHeight: '1.4' }}>
                                                                {msg.text}
                                                            </div>
                                                            <div style={{ fontSize: '0.65rem', color: '#999', textAlign: 'right', marginTop: '5px' }}>
                                                                {msg.time}
                                                            </div>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <img src="/invierno/invierno_protocolo_verde.jpg" alt="Verde" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', cursor: 'zoom-in' }} onClick={() => setSelectedImage("/invierno/invierno_protocolo_verde.jpg")} />
                                <img src="/invierno/invierno_protocolo_amarillo.jpg" alt="Amarillo" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', cursor: 'zoom-in' }} onClick={() => setSelectedImage("/invierno/invierno_protocolo_amarillo.jpg")} />
                                <img src="/invierno/invierno_protocolo_rojo.jpg" alt="Rojo" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', cursor: 'zoom-in' }} onClick={() => setSelectedImage("/invierno/invierno_protocolo_rojo.jpg")} />
                                <img src="/invierno/invierno_prevenir.jpg" alt="Prevenir" style={{ height: '70px', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', cursor: 'zoom-in' }} onClick={() => setSelectedImage("/invierno/invierno_prevenir.jpg")} />
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
                                { src: "/invierno/invierno_entrevista_portada.jpg", title: "Campaña Oficial", desc: "Haz clic para ampliar" },
                                { src: "/invierno/invierno_prevenir.jpg", title: "Prevención", desc: "Haz clic para ampliar" },
                                { src: "/invierno/invierno_protocolo_verde.jpg", title: "Alerta Verde", desc: "Haz clic para ampliar" },
                                { src: "/invierno/invierno_protocolo_amarillo.jpg", title: "Alerta Amarilla", desc: "Haz clic para ampliar" },
                                { src: "/invierno/invierno_protocolo_rojo.jpg", title: "Alerta Roja", desc: "Haz clic para ampliar" }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        playTone(700, 'sine', 0.1);
                                        setSelectedImage(item.src);
                                    }}
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
                                        <div style={{ marginTop: '10px', background: 'rgba(59,130,246,0.5)', width: 'fit-content', padding: '5px 15px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            Ampliar
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
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>Trivia Lúdica</h3>
                            </div>
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ background: 'rgba(0,0,0,0.5)', padding: '5px 15px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', color: '#eab308', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                            >
                                <Award size={16} />
                                {score} PTS
                            </motion.div>
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
                                    <Award size={50} color="white" />
                                </div>
                                <h4 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '1rem' }}>¡Misión Cumplida!</h4>
                                <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>
                                    Obtuviste <span style={{ color: '#eab308', fontWeight: 'bold' }}>{score}</span> de {TRIVIA_QUESTIONS.length} estrellas de aprendizaje.
                                </p>
                                <button 
                                    onClick={resetTrivia}
                                    style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 30px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
                                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                >
                                    Jugar de nuevo
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>


            {/* ===== SECCIÓN COMPARTIR EXCLUSIVA /invierno ===== */}
            <section style={{
                margin: '3rem auto',
                maxWidth: '900px',
                padding: '0 2rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(15,23,42,0.8))',
                        borderRadius: '35px',
                        padding: '2.5rem',
                        border: '1px solid rgba(16,185,129,0.25)',
                        backdropFilter: 'blur(20px)',
                        textAlign: 'center'
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>❄️</span>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: '0.5rem 0' }}>
                            ¡Comparte esta información!
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                            Ayuda a tu familia y vecinos a estar preparados este invierno.
                        </p>
                    </div>

                    {/* Tarjeta gráfica de compartir */}
                    <motion.div
                        whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(16,185,129,0.3)' }}
                        style={{
                            borderRadius: '20px',
                            overflow: 'hidden',
                            marginBottom: '2rem',
                            cursor: 'pointer',
                            border: '2px solid rgba(16,185,129,0.3)',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
                        }}
                        onClick={() => setSelectedImage('/invierno/invierno_prevenir.jpg')}
                    >
                        <img
                            src="/invierno/invierno_prevenir.jpg"
                            alt="Campaña Invierno Saludable - Prevención Respiratoria La Serena"
                            style={{ width: '100%', display: 'block' }}
                        />
                    </motion.div>

                    {/* Botones de compartir */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {/* WhatsApp */}
                        <motion.a
                            href={`https://wa.me/?text=${encodeURIComponent('❄️ Campaña Invierno Saludable 2025 🏥\n\n¿Cuál es el mejor tratamiento? ¡PREVENIR!\n\nConoce los protocolos Verde, Amarillo y Rojo del Servicio de Salud Coquimbo con la Dra. Paulina Fleite.\n\n👉 Ver entrevista completa y trivia interactiva:\nhttps://entrevecinas.cl/invierno\n\nSalud Responde 24/7: 600-360-7777')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: '#25D366',
                                color: 'white',
                                textDecoration: 'none',
                                padding: '14px 24px',
                                borderRadius: '50px',
                                fontWeight: '800',
                                fontSize: '1rem',
                                boxShadow: '0 10px 20px rgba(37,211,102,0.35)',
                                transition: 'all 0.3s'
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            WhatsApp
                        </motion.a>

                        {/* Facebook */}
                        <motion.a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://entrevecinas.cl/invierno')}&quote=${encodeURIComponent('❄️ ¿Cuál es el mejor tratamiento? ¡PREVENIR! Conoce los protocolos de salud respiratoria para este invierno con el Servicio de Salud Coquimbo.')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: '#1877F2',
                                color: 'white',
                                textDecoration: 'none',
                                padding: '14px 24px',
                                borderRadius: '50px',
                                fontWeight: '800',
                                fontSize: '1rem',
                                boxShadow: '0 10px 20px rgba(24,119,242,0.35)',
                                transition: 'all 0.3s'
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            Facebook
                        </motion.a>

                        {/* X (Twitter) */}
                        <motion.a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('❄️ ¿Cuál es el mejor tratamiento? ¡PREVENIR! Conoce los protocolos Verde, Amarillo y Rojo para enfermedades respiratorias este invierno. Salud Responde: 600-360-7777 (24/7)')}&url=${encodeURIComponent('https://entrevecinas.cl/invierno')}&hashtags=InviernoSaludable,LaSerena,Prevención`}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: '#000',
                                color: 'white',
                                textDecoration: 'none',
                                padding: '14px 24px',
                                borderRadius: '50px',
                                fontWeight: '800',
                                fontSize: '1rem',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                                transition: 'all 0.3s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
                            X (Twitter)
                        </motion.a>

                        {/* Copiar enlace */}
                        <motion.button
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                navigator.clipboard.writeText('https://entrevecinas.cl/invierno');
                                playTone(600, 'sine', 0.15);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '14px 24px',
                                borderRadius: '50px',
                                fontWeight: '800',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            Copiar enlace
                        </motion.button>
                    </div>

                    {/* Número de Salud Responde */}
                    <div style={{
                        marginTop: '2rem',
                        background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(59,130,246,0.15))',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: '20px',
                        padding: '1.2rem 2rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <span style={{ fontSize: '2rem' }}>📞</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Salud Responde · 24/7</div>
                            <div style={{ color: 'white', fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px' }}>600-360-7777</div>
                        </div>
                    </div>
                </motion.div>
            </section>

            </main>


            {/* Image Fullscreen Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.9)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            cursor: 'zoom-out'
                        }}
                    >
                        <button 
                            onClick={() => setSelectedImage(null)}
                            style={{ position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.5)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                            <X size={24} />
                        </button>
                        <motion.img 
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            src={selectedImage}
                            alt="Ampliada"
                            style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '20px', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', objectFit: 'contain' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
