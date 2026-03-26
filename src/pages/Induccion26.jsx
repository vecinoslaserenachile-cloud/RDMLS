import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Play, Pause, Award, HelpCircle, FastForward, 
    CheckCircle, Shield, Globe, Award as Honor, Music, Volume2, VolumeX, ArrowRight,
    QrCode, Radio, RefreshCw
} from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

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
    const [showDiplomaForm, setShowDiplomaForm] = useState(false);
    const [showFinalDiploma, setShowFinalDiploma] = useState(false);
    const [userData, setUserData] = useState({
        nombres: '',
        apellidos: '',
        area: '',
        calidad: 'Planta'
    });

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
            setShowTrivia(false);
            setProgress(100);
            setTimeout(() => setShowDiplomaForm(true), 1000);
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
            {/* Audio oculto */}
            <audio 
                ref={audioRef} 
                src={isRDMLS ? "https://az11.yesstreaming.net/listen/radio-digital-municipal-la-serena/radio.mp3" : "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/audio/serenito_theme.mp3"} 
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

            {/* DIPLOMA FORM MODAL */}
            <AnimatePresence>
                {showDiplomaForm && !showFinalDiploma && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col items-center justify-center p-6 lg:p-12 overflow-y-auto font-sans">
                        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 uppercase italic">OBTÉN TU DIPLOMA</h2>
                            <p className="text-slate-400 mb-12 font-bold uppercase tracking-widest text-xs lg:text-sm">Completa tus datos para el registro oficial de inducción.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
                                <div>
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest mb-3">Nombres</label>
                                    <input type="text" value={userData.nombres} onChange={e => setUserData({...userData, nombres: e.target.value})} className="w-full bg-slate-900 text-white rounded-2xl border border-white/10 p-4 focus:border-[#C5A065] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-slate-500 text-xs font-black uppercase tracking-widest mb-3">Apellidos</label>
                                    <input type="text" value={userData.apellidos} onChange={e => setUserData({...userData, apellidos: e.target.value})} className="w-full bg-slate-900 text-white rounded-2xl border border-white/10 p-4 focus:border-[#C5A065] focus:outline-none" />
                                </div>
                            </div>

                            <div className="mb-8 text-left">
                                <label className="block text-slate-500 text-xs font-black uppercase tracking-widest mb-3">Departamento o Área</label>
                                <select value={userData.area} onChange={e => setUserData({...userData, area: e.target.value})} className="w-full bg-slate-900 text-white rounded-2xl border border-white/10 p-4 focus:border-[#C5A065] focus:outline-none scrollbar-hide">
                                    <option value="">Seleccione su Área</option>
                                    <option value="Administración Municipal">Administración Municipal</option>
                                    <option value="Alcaldía">Alcaldía</option>
                                    <option value="DIDECO">DIDECO (Desarrollo Comunitario)</option>
                                    <option value="DOM">DOM (Obras Municipales)</option>
                                    <option value="Salud">Salud (Corporación)</option>
                                    <option value="Educación">Educación (Corporación)</option>
                                    <option value="SECPLAN">SECPLAN</option>
                                    <option value="Finanzas">Finanzas</option>
                                    <option value="Seguridad Ciudadana">Seguridad Ciudadana</option>
                                    <option value="Aseo y Ornato">Aseo y Ornato</option>
                                    <option value="Tránsito">Tránsito</option>
                                    <option value="Asesoría Jurídica">Asesoría Jurídica</option>
                                    <option value="Gestión de Personas">Gestión de Personas (RRHH)</option>
                                    <option value="Comunicaciones">Comunicaciones / RRPP</option>
                                    <option value="Otro">Otra Área</option>
                                </select>
                            </div>

                            <div className="mb-12 text-left">
                                <label className="block text-slate-500 text-xs font-black uppercase tracking-widest mb-3">Calidad Jurídica</label>
                                <select value={userData.calidad} onChange={e => setUserData({...userData, calidad: e.target.value})} className="w-full bg-slate-900 text-white rounded-2xl border border-white/10 p-4 focus:border-[#C5A065] focus:outline-none">
                                    <option value="Planta">De Planta</option>
                                    <option value="Contrata">A Contrata</option>
                                    <option value="Honorarios">A Honorarios</option>
                                    <option value="Código del Trabajo">Código del Trabajo</option>
                                </select>
                            </div>

                            <button 
                                onClick={async () => {
                                    if(!userData.nombres || !userData.apellidos || !userData.area) return alert('Completa todos los datos obligatorios.');
                                    setShowFinalDiploma(true);
                                    try {
                                        await addDoc(collection(db, 'induccion_certificados_2026'), {
                                            ...userData,
                                            fecha: new Date().toISOString(),
                                            domain: isRDMLS ? 'RDMLS' : 'VLS',
                                            score: score
                                        });
                                    } catch(e) { console.error('Error saving db', e); }
                                }} 
                                className="w-full bg-gradient-to-r from-[#C5A065] to-[#D4AF37] text-slate-950 font-black p-6 rounded-2xl uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(197,160,101,0.3)] hover:scale-[1.01] transition-all"
                            >
                                GENERAR CERTIFICADO OFICIAL
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FINAL DIPLOMA MODAL */}
            <AnimatePresence>
                {showFinalDiploma && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[1000000] bg-slate-950 flex flex-col items-center overflow-y-auto font-sans p-6 lg:p-12">
                        <div className="w-full max-w-5xl mx-auto space-y-16 py-12">
                            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white p-12 lg:p-24 rounded-[1rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] text-slate-900 relative overflow-hidden border-[30px] border-double border-[#C5A065]">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                                    <img src={isRDMLS ? "/escudo.png" : "/logo_vls.png"} className="h-[800px]" alt="Watermark" />
                                </div>
                                <div className="flex justify-between items-center mb-10 border-b-4 border-[#C5A065]/20 pb-8 relative z-10">
                                    <img src={isRDMLS ? "/escudo.png" : "/logo_vls.png"} className="h-24" alt="Logo" />
                                    <div className="text-right">
                                        <p className="text-[#C5A065] font-black text-sm uppercase tracking-widest leading-none">Smart Administration</p>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em] mt-2">LA SERENA • CHILE</p>
                                    </div>
                                </div>
                                <div className="text-center relative z-10">
                                    <h1 className="text-6xl lg:text-[8rem] font-serif font-black uppercase tracking-[0.1em] mb-4 leading-none text-[#1a1a1a]">CERTIFICADO</h1>
                                    <p className="text-xl lg:text-2xl italic text-slate-500 mb-12 font-serif">De Aprobación Inducción Corporativa {isRDMLS ? 'RDMLS' : 'VLS'} 2026</p>
                                    <div className="mb-10">
                                        <p className="text-slate-400 text-xs uppercase tracking-[0.5em] mb-4 font-bold">OTORGADO A:</p>
                                        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-[#C5A065] drop-shadow-sm leading-none">{userData.nombres} {userData.apellidos}</h2>
                                    </div>
                                    <p className="text-lg font-bold text-slate-700 uppercase tracking-[0.3em] mb-12 bg-slate-50 py-3 rounded-full inline-block px-10 border border-slate-100 italic">{userData.calidad} • {userData.area}</p>
                                    <p className="text-xl lg:text-2xl text-slate-800 font-serif italic mb-16 max-w-4xl mx-auto leading-relaxed">"Por haber cumplido con éxito los requerimientos formativos, éticos y técnicos de ingreso a la Ilustre Municipalidad de La Serena, adhiriendo a los valores de nuestra gestión Smart City."</p>
                                </div>
                                <div className="flex justify-between items-end mt-16 text-[10px] font-extrabold uppercase text-slate-400 tracking-[0.3em] relative z-10 px-8">
                                    <div className="text-center w-64">
                                         <div className="h-16 flex items-center justify-center opacity-80 mb-2 italic text-slate-300 font-serif text-2xl">Firma Digital {isRDMLS ? 'RDMLS' : 'VLS'}</div>
                                        <div className="border-t-2 border-slate-200 pt-3">Dirección de Gestión de Personas</div>
                                    </div>
                                    <div className="text-center space-y-4">
                                         <p className="text-[#C5A065] font-black text-lg">{isRDMLS ? 'RDMLS' : 'VLS'}-OK-2026</p>
                                        <div className="flex justify-center"><QrCode size={50} className="text-slate-300"/></div>
                                    </div>
                                    <div className="text-center w-64">
                                        <div className="h-16 flex items-center justify-center opacity-80 mb-2 italic text-slate-300 font-serif text-2xl">Firma Alcaldía</div>
                                        <div className="border-t-2 border-slate-200 pt-3">Administración Municipal</div>
                                    </div>
                                </div>
                            </motion.div>
                            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 text-center shadow-2xl relative z-10">
                                <h2 className="text-5xl font-black text-white mb-10 uppercase italic tracking-tighter leading-none">¡BIENVENIDO A BORDO!</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
                                    <button onClick={() => window.location.href = '/'} className="bg-red-600 text-white w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-105 transition-transform shadow-xl shadow-red-900/40 text-sm">
                                        <Radio size={24}/> Escuchar Radio Digital
                                    </button>
                                    <button className="bg-blue-600 text-white w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-105 transition-transform shadow-xl shadow-blue-900/40 text-sm">
                                        <Globe size={24}/> Volver al Inicio
                                    </button>
                                </div>
                            </div>
                        </div>
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
