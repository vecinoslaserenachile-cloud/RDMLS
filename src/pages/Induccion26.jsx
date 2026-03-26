import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Play, Pause, Award, HelpCircle, FastForward, 
    CheckCircle, Shield, Globe, Award as Honor, Music, Volume2, VolumeX, ArrowRight
} from 'lucide-react';

export default function Induccion26({ isRDMLS }) {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [showTrivia, setShowTrivia] = useState(false);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const audioRef = useRef(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

    // PPTX Viewer logic
    const RAW_PPTX = "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/94c24c55256c3fe970c5f5e91635efeccaafee92/Induccion%20IMLS%20beta26.pptx";
    const iframeSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(RAW_PPTX)}`;

    const questions = isRDMLS ? [
        {
            q: "Según la visión Smart City IMLS 2026, ¿cuál es el primer pilar de la gestión?",
            opts: ["Burocracia Tradicional", "Probidad y Cercanía Digital", "Privatización de Servicios"],
            ans: 1
        },
        {
            q: "El asistente IA de la plataforma se llama...",
            opts: ["Serenito", "Robotito", "AlcaldeBot"],
            ans: 0
        },
        {
            q: "RDMLS corresponde a...",
            opts: ["Red de Medios", "Radio Digital Municipal La Serena", "Región de La Serena"],
            ans: 1
        }
    ] : [
        {
            q: "Según la visión Smart City VLS 2026, ¿cuál es el pilar de desarrollo ciudadano?",
            opts: ["Burocracia Tradicional", "Soberanía Digital Vecinal", "Privatización de Servicios"],
            ans: 1
        },
        {
            q: "El asistente IA de la plataforma se llama...",
            opts: ["Serenito", "Robotito", "AlcaldeBot"],
            ans: 0
        },
        {
            q: "El concepto VLS significa...",
            opts: ["Visión La Serena", "Vecinos La Serena", "Valle La Serena"],
            ans: 1
        }
    ];

    const handleAnswer = (idx) => {
        if (answered) return;
        setAnswered(true);
        const correct = questions[currentQuestion].ans === idx;
        setLastAnswerCorrect(correct);
        
        if (correct) {
            setScore(s => s + 100);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    };

    const nextTrivia = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setAnswered(false);
            setShowTrivia(false);
        } else {
            // Finished
            setShowTrivia(false);
            setProgress(100);
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (musicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log(e));
            }
            setMusicPlaying(!musicPlaying);
        }
    };

    const advanceProgress = () => {
        if (progress >= 100) return;
        const nextProg = progress + 33;
        setProgress(nextProg > 100 ? 100 : nextProg);
        if (nextProg === 33 || nextProg === 66 || nextProg >= 99) {
            setTimeout(() => {
                setShowTrivia(true);
                setAnswered(false);
            }, 600);
        }
    };

    useEffect(() => {
        // Auto-play ambient on load if unmuted by user action prior, logic simplified
    }, []);

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'radial-gradient(circle at 50% 0%, #312e81 0%, #0f172a 100%)', 
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Audio oculto: Una pista épica estilo synthwave/institucional. Usaremos un audio público de VLS o genérico libre */}
            <audio 
                ref={audioRef} 
                src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/audio/serenito_theme.mp3" 
                loop 
            />

            {/* HEADER INTERACTIVO */}
            <header style={{
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(20px)',
                borderBottom: '2px solid rgba(56, 189, 248, 0.3)',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Shield size={32} color="#38bdf8" />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>INDUCCIÓN {isRDMLS ? 'RDMLS' : 'VLS'} 2026</h1>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' }}>EXPERT LEVEL MASTERCLASS</p>
                    </div>
                </div>

                {/* BARRA DE PROGRESO GLOBAL */}
                <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>AVANCE MÓDULO</span>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{Math.round(progress)}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            style={{ height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Honor size={18} color="#FFD700" />
                        <span style={{ color: '#FFD700', fontWeight: '900', fontSize: '0.9rem' }}>{score} XP</span>
                    </div>
                    <button 
                        onClick={toggleMusic}
                        style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
                        title="Música Ambiental"
                    >
                        {musicPlaying ? <Volume2 size={20} color="#38bdf8" /> : <VolumeX size={20} />}
                    </button>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>
                        CERRAR
                    </button>
                </div>
            </header>

            {/* CONTENEDOR PRINCIPAL */}
            <main style={{ flex: 1, padding: '2rem', display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                
                {/* Visualizador PPTX Embebido */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                        flex: 3, 
                        background: 'black', 
                        borderRadius: '24px', 
                        overflow: 'hidden',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <iframe 
                        src={iframeSrc}
                        width="100%" 
                        height="100%" 
                        frameBorder="0"
                        title="Presentación Inducción IMLS"
                        allowFullScreen
                        style={{ flex: 1 }}
                    />
                </motion.div>

                {/* Sidebar Interactivo */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ 
                        flex: 1, 
                        background: 'rgba(255,255,255,0.03)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '80px', height: '80px', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', 
                            borderRadius: '50%', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
                        }}>
                            <img src="/serenito.png" alt="Serenito" style={{ width: '60px', height: '60px', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
                            <Globe size={40} color="white" style={{ position: 'absolute', opacity: 0.2 }} />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8' }}>Guía Serenito</h2>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5' }}>
                            Avanza en las diapositivas del visor. Cuando completes un bloque, haz clic en "Validar Avance" para responder la trivia.
                        </p>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', borderLeft: '4px solid #38bdf8', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <HelpCircle size={16} color="#38bdf8" /> MISIÓN ACTUAL
                            </h3>
                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#cbd5e1' }}>Lee las diapositivas 1 a 10 y absorbe la visión Smart City.</p>
                        </div>
                    </div>

                    <button 
                        onClick={advanceProgress}
                        disabled={progress >= 100}
                        className="hover-lift"
                        style={{ 
                            background: progress >= 100 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #38bdf8, #2563eb)', 
                            color: 'white', border: 'none', padding: '1.2rem', borderRadius: '16px', 
                            fontWeight: '900', fontSize: '1rem', cursor: progress >= 100 ? 'default' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                            boxShadow: progress >= 100 ? 'none' : '0 10px 20px rgba(37, 99, 235, 0.4)',
                            transition: 'all 0.3s'
                        }}
                    >
                        {progress >= 100 ? '¡INDUCCIÓN COMPLETADA!' : 'VALIDAR AVANCE MÓDULO'} <FastForward size={20} />
                    </button>
                </motion.div>
            </main>

            {/* MODAL TRIVIA */}
            <AnimatePresence>
                {showTrivia && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            style={{ 
                                background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', 
                                padding: '3rem', borderRadius: '30px', maxWidth: '600px', width: '90%',
                                border: '1px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ background: '#38bdf8', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)' }}>
                                <HelpCircle size={30} color="white" />
                            </div>
                            
                            <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.5rem' }}>EVALUACIÓN SMART</h2>
                            <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Selecciona la respuesta correcta basada en lo que acabas de leer.</p>

                            <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                {questions[currentQuestion].q}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {questions[currentQuestion].opts.map((opt, idx) => {
                                    const isCorrect = questions[currentQuestion].ans === idx;
                                    const isSelected = answered; // Any selection freezes it
                                    let btnBg = 'rgba(255,255,255,0.05)';
                                    let btnBorder = 'rgba(255,255,255,0.1)';
                                    
                                    if (answered) {
                                        if (isCorrect) {
                                            btnBg = 'rgba(34, 197, 94, 0.2)';
                                            btnBorder = '#22c55e';
                                        }
                                    }

                                    return (
                                        <button 
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            style={{ 
                                                background: btnBg, border: `2px solid ${btnBorder}`, 
                                                color: 'white', padding: '1.2rem', borderRadius: '16px', fontSize: '1rem', fontWeight: 'bold',
                                                cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                            }}
                                            onMouseEnter={e => { if(!answered) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                                            onMouseLeave={e => { if(!answered) e.currentTarget.style.background = btnBg }}
                                        >
                                            {opt}
                                            {answered && isCorrect && <CheckCircle size={24} color="#22c55e" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {answered && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2rem' }}>
                                    {lastAnswerCorrect ? (
                                        <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>¡CORRECTO! +100 XP</div>
                                    ) : (
                                        <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>¡INCORRECTO! (Sigue intentando sumar XP).</div>
                                    )}
                                    <button 
                                        onClick={nextTrivia}
                                        style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '1rem 3rem', borderRadius: '30px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer' }}
                                    >
                                        CONTINUAR <ArrowRight size={18} style={{ verticalAlign: 'middle' }} />
                                    </button>
                                </motion.div>
                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <style>{`
                .hover-lift:hover { transform: translateY(-3px); }
                .hover-lift:active { transform: translateY(0); }
            `}</style>
        </div>
    );
}
