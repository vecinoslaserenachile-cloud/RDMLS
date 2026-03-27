import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    Play, Pause, Award, HelpCircle, FastForward, 
    CheckCircle, Shield, Globe, Award as Honor, Music, Volume2, VolumeX, ArrowRight,
    QrCode, Radio, RefreshCw, Signal
} from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Induccion26({ isRDMLS }) {
    const navigate = useNavigate();

    // ==========================================
    // VLS COURSE LOGIC (EARLY RETURN IF !isRDMLS)
    // ==========================================
    if (!isRDMLS) {
        return (
            <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #312e81 0%, #020617 100%)', color: 'white', fontFamily: 'Inter, sans-serif', padding: '1.5rem lg:padding-4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src="/logo_vls.png" onError={e => e.target.style.display='none'} alt="VLS" style={{ height: '48px', objectFit: 'contain' }}/>
                        <div>
                            <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '1.3rem', fontWeight: '900', letterSpacing: '1px' }}>CURSO CIUDADANO VLS</h2>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', fontWeight: '700' }}>CONSTRUYE TU MÓDULO WEB ESTILO SMART CITY</p>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>CERRAR</button>
                </div>
                
                <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    {[
                        { num: '01', color: '#38bdf8', title: 'Fundamentos: ¿Qué es VLS?', content: 'VecinosLaSerena (VLS) es una plataforma Smart City de código abierto construida con React + Vite + Tailwind.' },
                        { num: '02', color: '#10b981', title: 'Estructura de un Módulo VLS', content: 'Todo módulo VLS sigue el patrón de fondo oscuro con un contenedor glassmorphism superpuesto. El header debe tener botón X para cerrar la UI modal.' },
                        { num: '03', color: '#f59e0b', title: 'Diseño: Paleta Institucional Smart', content: 'Color acento primario: #38bdf8 (Azul Smart). Color secundario: #10b981 (Verde VLS).' },
                        { num: '04', color: '#8b5cf6', title: 'Integración al Dashboard (Hub)', content: 'Regístralo en src/components/, agrégalo a App.jsx e inyéctalo en HubDashboard con su respectivo identificador isEvent.' },
                        { num: '05', color: '#ec4899', title: 'Soberanía Digital', content: 'Queremos que cada junta vecinal sepa adaptar su propia solución, erradicando el miedo al desarrollo web.' }
                    ].map(section => (
                        <div key={section.num} style={{ background: `rgba(${section.color === '#38bdf8' ? '56,189,248' : section.color === '#10b981' ? '16,185,129' : section.color === '#f59e0b' ? '245,158,11' : section.color === '#8b5cf6' ? '139,92,246' : '236,72,153'},0.06)`, border: `1px solid ${section.color}30`, borderRadius: '20px', padding: '1.5rem', marginBottom: '1rem', transition: 'transform 0.2s', cursor: 'default' }}>
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div style={{ background: section.color, color: '#000', fontWeight: '900', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '30px', flexShrink: 0, marginTop: '2px' }}>UNIDAD {section.num}</div>
                                <div>
                                    <h3 style={{ margin: '0 0 8px', color: section.color, fontWeight: '900', fontSize: '1.05rem', letterSpacing: '0.5px' }}>{section.title}</h3>
                                    <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.7' }}>{section.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <button onClick={() => alert('Diploma de Constructor Web en desarrollo. ¡Gracias por participar!')} style={{ background: 'linear-gradient(90deg, #1d4ed8, #38bdf8)', color: 'white', width: '100%', border: 'none', padding: '1.2rem', borderRadius: '16px', fontWeight: '900', fontSize: '1rem', letterSpacing: '1px', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 10px 25px rgba(56,189,248,0.4)' }}>
                        VALIDAR APRENDIZAJE
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // RDMLS INDUCTION LOGIC (CORPORATIVE)
    // ==========================================
    const audioRef = useRef(null);

    const [step, setStep] = useState('intro'); // intro -> main -> trivia -> main -> ... -> diploma
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);
    
    // Auth State Form
    const [pinError, setPinError] = useState('');
    const [shake, setShake] = useState(false);
    
    // Trivia State
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [lastCorrect, setLastCorrect] = useState(false);

    // User Data State
    const [userData, setUserData] = useState({
        nombres: '', apellidos: '', area: '', calidad: 'Planta'
    });

    const RAW_PPTX = "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/94c24c55256c3fe970c5f5e91635efeccaafee92/Induccion%20IMLS%20beta26.pptx";
    const iframeSrc = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(RAW_PPTX)}`;

    const questions = [
        {
            q: "¿Cuál es el propósito principal de la Radio Digital Municipal RDMLS?",
            opts: [
                "Entretenimiento comercial para la región",
                "Informar y conectar a la comunidad con la gestión municipal de La Serena",
                "Competir con radios privadas locales"
            ],
            ans: 1,
            exp: "La RDMLS es el canal oficial de comunicación digital de la I. Municipalidad de La Serena."
        },
        {
            q: "Respeto a las vocerías y comunicados oficiales del municipio:",
            opts: [
                "Cualquier funcionario puede declarar a la prensa",
                "Se canalizan exclusivamente por Alcaldía y Comunicaciones",
                "Cada dirección comunica en forma independiente"
            ],
            ans: 1,
            exp: "Toda vocería debe ser validada por Alcaldía o Comunicaciones."
        },
        {
            q: "¿Qué protocolo rige la Ley Karin (21.643) en el ámbito laboral municipal?",
            opts: [
                "Uso correcto de computadores",
                "Tolerancia Cero a la violencia, acoso sexual o laboral en el trabajo",
                "Uso de uniformes y horarios"
            ],
            ans: 1,
            exp: "La Ley Karin establece lineamientos de Tolerancia Cero frente al acoso y violencia."
        },
        {
            q: "Ante un sismo fuerte en dependencias municipales de La Serena:",
            opts: [
                "Quedarse grabando la radio para redes",
                "Evacuar a la Cota 30 (Av. Cisternas) ante riesgo de tsunami",
                "Cerrar la oficina y salir"
            ],
            ans: 1,
            exp: "Cota 30 hacia el oriente es la vía oficial de escape ante riesgo de tsunami en sectores céntricos/costeros."
        },
        {
            q: "El asistente IA de la plataforma se llama...",
            opts: ["Serenito", "Robotito", "AlcaldeBot"],
            ans: 0,
            exp: "Serenito es la inteligencia artificial integrada en el Smart City 2026."
        }
    ];

    useEffect(() => {
        document.title = 'RDMLS · Inducción Inteligente';
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (musicPlaying) audioRef.current.pause();
            else audioRef.current.play().catch(() => {});
            setMusicPlaying(!musicPlaying);
        }
    };

    const handleIntroSubmit = (e) => {
        e.preventDefault();
        if (!userData.nombres || !userData.area) {
            setPinError('Complete sus datos');
            setShake(true); setTimeout(() => setShake(false), 1600);
            return;
        }
        if (userData.pin !== '2026') {
            setPinError('Código de inducción incorrecto');
            setShake(true); setTimeout(() => setShake(false), 1600);
            setUserData(prev => ({...prev, pin: ''}));
            return;
        }
        
        setPinError('');
        setStep('main');
        if (audioRef.current) {
            audioRef.current.play().catch(() => console.log('Auto-play blocked'));
            setMusicPlaying(true);
        }
    };

    const advanceProgress = () => {
        if (progress >= 100) return;
        setStep('trivia');
        setAnswered(false);
    };

    const handleAnswer = (idx) => {
        if (answered) return;
        setAnswered(true);
        const isCorrect = questions[currentQuestion].ans === idx;
        setLastCorrect(isCorrect);
        if (isCorrect) setScore(s => s + 100);
    };

    const nextTrivia = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setAnswered(false);
            setProgress(p => Math.min(p + 20, 100)); // Advance progress visually
            setStep('main');
        } else {
            setProgress(100);
            try {
                await addDoc(collection(db, 'induccion_certificados_2026'), {
                    ...userData, fecha: new Date().toISOString(), domain: 'RDMLS', score
                });
            } catch (e) { console.error('Error saving diploma', e); }
            setStep('diploma');
        }
    };

    // ──────────────────────────────────────────────────────────────
    // STEP: INTRO (LOGIN CERRADO ESTILO /OPCIONES)
    // ──────────────────────────────────────────────────────────────
    if (step === 'intro') {
        return (
            <div style={{
                minHeight: '100vh', background: 'radial-gradient(ellipse at center, #1a0800 0%, #050810 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem'
            }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem', filter: 'drop-shadow(0 0 24px rgba(249,115,22,0.5))' }}>📻</div>
                <img src="/escudo.png" alt="IMLS" style={{ height: '65px', marginBottom: '1rem', filter: 'drop-shadow(0 0 18px rgba(249,115,22,0.5))' }} />
                
                <h1 style={{ color: '#f97316', fontSize: '1.4rem', fontWeight: '900', letterSpacing: '3px', margin: '0 0 0.5rem', textAlign: 'center' }}>
                    PORTAL DE INDUCCIÓN RDMLS
                </h1>
                
                <p style={{ color: '#fed7aa', fontSize: '0.85rem', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
                    Solo personal acreditado · Ingrese con el código oficial de acceso a la capacitación 2026.
                </p>

                <form onSubmit={handleIntroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', maxWidth: '360px' }}>
                    
                    <div style={{
                        background: pinError ? 'rgba(239,68,68,0.07)' : 'rgba(249,115,22,0.08)',
                        border: `2px solid ${pinError ? '#ef4444' : 'rgba(249,115,22,0.3)'}`,
                        borderRadius: '20px', padding: '1.8rem',
                        animation: shake ? 'shake 0.4s ease' : 'none', display: 'flex', flexDirection: 'column', gap: '1rem',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ fontSize: '0.65rem', color: '#fb923c', fontWeight: '900', letterSpacing: '3px', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                            IDENTIFICACIÓN + PIN
                        </div>
                        
                        <input placeholder="Nombre completo para Diploma" value={userData.nombres} onChange={e => setUserData({...userData, nombres: e.target.value})}
                            style={{ background: 'rgba(0,0,0,0.4)', border: '1.5px solid rgba(249,115,22,0.25)', borderRadius: '12px', padding: '12px 14px', color: 'white', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                        
                        <select value={userData.area} onChange={e => setUserData({...userData, area: e.target.value})}
                            style={{ background: 'rgba(0,0,0,0.4)', border: '1.5px solid rgba(249,115,22,0.25)', borderRadius: '12px', padding: '12px 14px', color: 'white', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}>
                            <option style={{color:'black'}} value="">Seleccione Departamento</option>
                            <option style={{color:'black'}}>Comunicaciones</option>
                            <option style={{color:'black'}}>Alcaldía</option>
                            <option style={{color:'black'}}>Administración</option>
                            <option style={{color:'black'}}>DIDECO</option>
                            <option style={{color:'black'}}>Salud / Educación</option>
                            <option style={{color:'black'}}>Seguridad</option>
                            <option style={{color:'black'}}>Otra Dirección</option>
                        </select>

                        <select value={userData.calidad} onChange={e => setUserData({...userData, calidad: e.target.value})}
                            style={{ background: 'rgba(0,0,0,0.4)', border: '1.5px solid rgba(249,115,22,0.25)', borderRadius: '12px', padding: '12px 14px', color: 'white', fontSize: '0.9rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}>
                            <option style={{color:'black'}} value="Planta">Calidad Jurídica: Planta</option>
                            <option style={{color:'black'}} value="Contrata">Calidad Jurídica: Contrata</option>
                            <option style={{color:'black'}} value="Honorarios">Calidad Jurídica: Honorarios</option>
                            <option style={{color:'black'}} value="Código del Trabajo">Calidad Jurídica: Código del Trab.</option>
                        </select>

                        <input type="password" inputMode="numeric" maxLength={4} placeholder="CÓDIGO (PIN)" value={userData.pin || ''} onChange={e => setUserData({...userData, pin: e.target.value.replace(/\D/g, '')})}
                            style={{ background: 'rgba(0,0,0,0.6)', border: `1.5px solid ${pinError ? '#ef4444' : 'rgba(249,115,22,0.4)'}`, borderRadius: '12px', padding: '12px 14px', color: 'white', fontSize: '1.6rem', fontFamily: '"Courier New",monospace', textAlign: 'center', letterSpacing: '8px', outline: 'none', width: '100%', boxSizing: 'border-box', marginTop: '0.5rem' }} />
                        
                        {pinError && <div style={{ color: '#ef4444', fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold', marginTop: '-0.3rem' }}>{pinError}</div>}
                    </div>

                    <button type="submit" style={{ background: 'linear-gradient(135deg, #f97316, #c2410c)', border: 'none', borderRadius: '14px', padding: '15px', color: 'white', fontWeight: '900', fontSize: '0.95rem', letterSpacing: '2px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(249,115,22,0.3)', marginTop: '0.5rem' }}>
                        🔐 AUTORIZAR E INICIAR
                    </button>
                    
                    <button type="button" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline', textAlign: 'center', marginTop: '1rem' }}>
                        ← Volver a la Radio
                    </button>
                </form>
                
                <style>{`@keyframes shake {0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}}`}</style>
            </div>
        );
    }

    // ──────────────────────────────────────────────────────────────
    // STEP: MAIN / PPTX / SIDEBAR (MODERN UI AS SCREENSHOT)
    // ──────────────────────────────────────────────────────────────
    if (step === 'main') return (
        <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #1e293b, #020617)', color: 'white', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
            <audio ref={audioRef} src="https://az11.yesstreaming.net:8590/radio.mp3" />

            <header style={{
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', borderBottom: `2px solid rgba(249,115,22,0.3)`, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Shield size={32} color="#f97316" />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px', color: 'white', textTransform: 'uppercase' }}>INDUCCIÓN RDMLS 2026</h1>
                        <p style={{ margin: 0, color: '#f97316', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1.5px' }}>EXPERT LEVEL MASTERCLASS</p>
                    </div>
                </div>

                <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }} className="hidden md:block">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#f97316', fontWeight: 'bold' }}>AVANCE MÓDULO</span>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{Math.round(progress)}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.3)', padding: '0.5rem 1rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Honor size={18} color="#FFD700" />
                        <span style={{ color: '#FFD700', fontWeight: '900', fontSize: '0.9rem' }}>{score} XP</span>
                    </div>
                    <button onClick={toggleMusic} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                        {musicPlaying ? <Volume2 size={20} color="#f97316" /> : <VolumeX size={20} />}
                    </button>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}>CERRAR</button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap',  maxWidth: '1600px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                    flex: '3 1 800px', background: 'black', borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', minHeight: '600px'
                }}>
                    <iframe src={iframeSrc} width="100%" height="100%" frameBorder="0" title="Presentación Inducción IMLS" allowFullScreen style={{ flex: 1, width: '100%', height: '100%', minHeight: '500px' }} />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{
                    flex: '1 1 300px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ 
                            width: '90px', height: '90px', background: 'linear-gradient(135deg, #f97316, #C5A065)', borderRadius: '50%', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 25px rgba(249, 115, 22, 0.5)', border: '4px solid rgba(255,255,255,0.1)'
                        }}>
                            <img src={"/escudo.png"} alt="Escudo IMLS" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#f97316', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            PORTAL DE INDUCCIÓN
                        </h2>
                        <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', fontWeight: '600' }}>
                            Visualice el material informativo. Al finalizar cada sección, presione el botón inferior para validar su conocimiento.
                        </p>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ padding: '1.2rem', background: 'rgba(249,115,22,0.1)', borderRadius: '16px', borderLeft: '4px solid #f97316', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'white', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <HelpCircle size={16} color="#f97316" /> OBJETIVO DE APRENDIZAJE
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#fed7aa', fontWeight: '700', lineHeight: '1.6', textTransform: 'uppercase' }}>
                                Absorba los lineamientos de transparencia y gestión SMART CITY 2026.
                            </p>
                        </div>
                    </div>

                    <button onClick={advanceProgress} style={{ 
                        background: 'linear-gradient(90deg, #f97316, #dc2626)', color: 'white', border: 'none', padding: '1.5rem', borderRadius: '28px', fontWeight: '900', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(249,115,22,0.4)', transition: 'all 0.2s transform'
                    }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                        VALIDAR Y CONTINUAR <FastForward size={22} />
                    </button>
                    
                    <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                        <div style={{ color: '#f97316', fontWeight: '700', marginBottom: '8px', fontSize: '0.65rem', letterSpacing: '1px' }}>RODAJE DE VALIDACIONES</div>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            {questions.map((_, i) => (
                                <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', background: i < currentQuestion ? '#f97316' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '700', color: i < currentQuestion ? 'white' : '#475569' }}>
                                    {i < currentQuestion ? '✓' : i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );

    // ──────────────────────────────────────────────────────────────
    // STEP: TRIVIA / EVALUATION
    // ──────────────────────────────────────────────────────────────
    if (step === 'trivia') return (
        <div style={{ minHeight: '100vh', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', padding: '3rem', borderRadius: '30px', maxWidth: '650px', width: '100%', border: '1px solid rgba(249, 115, 22, 0.4)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', textAlign: 'center' }}>
                <div style={{ background: '#f97316', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 25px rgba(249, 115, 22, 0.6)' }}>
                    <HelpCircle size={35} color="white" />
                </div>
                
                <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '900', marginBottom: '0.5rem', letterSpacing: '1px' }}>EVALUACIÓN SMART LEVEL</h2>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.9rem' }}>Seleccione la respuesta correcta basada en lo que acaba de leer.</p>

                <div style={{ fontSize: '1.2rem', color: 'white', fontWeight: '800', marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', lineHeight: '1.5' }}>
                    {questions[currentQuestion].q}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                    {questions[currentQuestion].opts.map((opt, idx) => {
                        const isCorrect = questions[currentQuestion].ans === idx;
                        let btnBg = 'rgba(255,255,255,0.05)';
                        let btnBorder = 'rgba(255,255,255,0.1)';
                        if (answered && isCorrect) { btnBg = 'rgba(34, 197, 94, 0.2)'; btnBorder = '#22c55e'; }

                        return (
                            <button key={idx} onClick={() => handleAnswer(idx)} style={{ background: btnBg, border: `2px solid ${btnBorder}`, color: 'white', padding: '1.2rem 1.5rem', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>{opt}</span>
                                {answered && isCorrect && <CheckCircle size={24} color="#22c55e" />}
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '2rem' }}>
                        <div style={{ color: lastCorrect ? '#22c55e' : '#f87171', fontWeight: '900', fontSize: '1.2rem', marginBottom: '1rem' }}>
                            {lastCorrect ? '¡VALIDACIÓN APROBADA! +100 XP' : '¡REVISIÓN REQUERIDA! (No suma puntos)'}
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(197,160,101,0.1)', borderLeft: `4px solid #C5A065`, borderRadius: '0 12px 12px 0', marginBottom: '2rem', textAlign: 'left' }}>
                            <p style={{ margin: 0, color: '#e2e8f0', fontStyle: 'italic', fontSize: '0.9rem' }}>Retroalimentación Institucional: {questions[currentQuestion].exp}</p>
                        </div>
                        <button onClick={nextTrivia} style={{ background: '#f97316', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '30px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', letterSpacing: '1px', boxShadow: '0 10px 20px rgba(249,115,22,0.4)' }}>
                            CONTINUAR AVANCE <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '5px' }} />
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );

    // ──────────────────────────────────────────────────────────────
    // STEP: DIPLOMA
    // ──────────────────────────────────────────────────────────────
    if (step === 'diploma') return (
        <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem', overflowY: 'auto' }}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ width: '100%', maxWidth: '900px', background: 'white', borderRadius: '16px', padding: 'clamp(2rem,5vw,4rem)', border: '24px double #C5A065', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.8)', color: '#1a1a1a' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.04, pointerEvents: 'none' }}>
                    <img src="/escudo.png" alt="" style={{ height: '600px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '3px solid rgba(197,160,101,0.2)', paddingBottom: '1.5rem' }}>
                    <img src="/escudo.png" alt="IMLS" style={{ height: '70px' }} />
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#f97316', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '3px' }}>RADIO DIGITAL MUNICIPAL</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.65rem', letterSpacing: '4px', marginTop: '4px' }}>LA SERENA · CHILE · 2026</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: '900', fontFamily: 'Georgia, serif', letterSpacing: '0.1em', margin: '0 0 0.5rem', color: '#111' }}>CERTIFICADO</h1>
                    <p style={{ color: '#888', fontStyle: 'italic', fontSize: '1rem', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>De Aprobación · Inducción Corporativa RDMLS 2026</p>
                    <p style={{ fontSize: '0.7rem', color: '#aaa', letterSpacing: '3px', marginBottom: '1rem' }}>OTORGADO A:</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', fontWeight: '900', color: '#f97316', margin: '0 0 1rem', letterSpacing: '-1px', textTransform: 'uppercase' }}>
                        {userData.nombres} {userData.apellidos}
                    </h2>
                    <p style={{ fontWeight: '700', color: '#555', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '2rem', textTransform: 'uppercase' }}>
                        {userData.calidad} · {userData.area}
                    </p>
                    <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: '#444', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        "Por haber completado con éxito el proceso de inducción corporativa de la Ilustre Municipalidad de La Serena, adhiriendo a los valores, protocolos y misión de la Radio Digital Municipal RDMLS con {score} XP."
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', borderTop: '2px solid rgba(197,160,101,0.2)', paddingTop: '1.5rem', zIndex: 10, position: 'relative' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: '1.5rem', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Firma Digital RDMLS</div>
                            <div style={{ borderTop: '2px solid #ddd', paddingTop: '8px', fontSize: '0.6rem', letterSpacing: '2px', color: '#999' }}>DIRECCIÓN DE COMUNICACIONES</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: '#f97316', fontWeight: '900', fontSize: '1rem', marginBottom: '6px' }}>RDMLS-OK-2026</div>
                            <QrCode size={44} color="#ccc" style={{margin:'0 auto'}}/>
                            <div style={{ fontSize: '0.55rem', color: '#bbb', letterSpacing: '1px', marginTop: '4px' }}>rdmls.cl</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: '1.5rem', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Firma Alcaldía</div>
                            <div style={{ borderTop: '2px solid #ddd', paddingTop: '8px', fontSize: '0.6rem', letterSpacing: '2px', color: '#999' }}>ADMINISTRACIÓN MUNICIPAL</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={() => navigate('/')} style={{ background: `linear-gradient(135deg, #f97316, #c2410c)`, border: 'none', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    VOLVER A LA RADIO
                </button>
                <button onClick={() => window.print()} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>🖨️ Imprimir Diploma</button>
            </div>
        </div>
    );

    return null;
}
