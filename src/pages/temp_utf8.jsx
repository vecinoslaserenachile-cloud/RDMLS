import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Play, Pause, Award, HelpCircle, FastForward,
    CheckCircle, Shield, Globe, Radio, Volume2, VolumeX, ArrowRight,
    QrCode, RefreshCw, AlertTriangle, Mic, Signal, Clock
} from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

// ÔöÇÔöÇ PPTX Beta26 (GitHub raw) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const RAW_PPTX = "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/94c24c55256c3fe970c5f5e91635efeccaafee92/Induccion%20IMLS%20beta26.pptx";
const IFRAME_SRC = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(RAW_PPTX)}`;

// ÔöÇÔöÇ Colores RDMLS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const C = {
    orange: '#f97316',
    gold:   '#C5A065',
    dark:   '#0d0200',
    mid:    '#180800',
    card:   'rgba(249,115,22,0.07)',
    border: 'rgba(249,115,22,0.25)',
};

// ÔöÇÔöÇ Preguntas enfocadas en Radio Municipal + IMLS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const QUESTIONS = [
    {
        q: "┬┐Cu├íl es el prop├│sito principal de la Radio Digital Municipal RDMLS?",
        opts: [
            "Entretenimiento comercial para la regi├│n",
            "Informar y conectar a la comunidad con la gesti├│n municipal de La Serena",
            "Competir con radios privadas locales"
        ],
        ans: 1,
        explanation: "La RDMLS es el canal oficial de comunicaci├│n digital de la I. Municipalidad de La Serena. Su misi├│n es servir como puente de informaci├│n p├║blica, difusi├│n de servicios municipales y cultura ciudadana, sin fines comerciales."
    },
    {
        q: "┬┐Cu├íl es el mecanismo formal de instrucciones en la administraci├│n municipal de La Serena?",
        opts: [
            "Correos electr├│nicos internos",
            "Decretos Alcaldicios",
            "Mensajes de WhatsApp institucional"
        ],
        ans: 1,
        explanation: "Todo acto administrativo y decisi├│n formal del municipio se formaliza mediante Decretos Alcaldicios. Esto garantiza transparencia, legalidad y trazabilidad en todos los procesos, incluyendo los comunicacionales."
    },
    {
        q: "Respecto a las vocer├¡as p├║blicas y comunicados oficiales del municipio:",
        opts: [
            "Cualquier funcionario puede declarar a la prensa",
            "Se canalizan exclusivamente por Alcald├¡a y el Departamento de Comunicaciones",
            "Cada direcci├│n comunica de forma independiente"
        ],
        ans: 1,
        explanation: "La Radio Municipal opera bajo la coordinaci├│n directa del Departamento de Comunicaciones e Innovaci├│n Digital. Toda vocer├¡a, entrevista o comunicado debe contar con el visto bueno de esta ├írea y de Alcald├¡a."
    },
    {
        q: "┬┐Qu├® protocolo define la Ley 21.643 (Ley Karin) en el ├ímbito laboral municipal?",
        opts: [
            "El uso correcto de equipos inform├íticos",
            "La prevenci├│n y sanci├│n del acoso laboral, sexual y la violencia en el trabajo",
            "El horario de transmisi├│n de la radio"
        ],
        ans: 1,
        explanation: "La Ley Karin mandata tolerancia cero al acoso y la violencia laboral. Un solo acto grave es suficiente para denunciar. Todo funcionario RDMLS debe conocer el canal de denuncia institucional y actuar con probidad."
    },
    {
        q: "Ante un sismo de gran magnitud en La Serena, el protocolo de evacuaci├│n establece:",
        opts: [
            "Permanecer en las instalaciones de radio",
            "Evacuar al edificio municipal m├ís cercano",
            "Dirigirse a COTA 30 (Av. Cisternas) ante riesgo de tsunami"
        ],
        ans: 2,
        explanation: "La Serena es una ciudad costera con riesgo de tsunami. El protocolo municipal establece evacuar hacia la Cota 30 (Av. Cisternas) ante un sismo fuerte. La continuidad radial se retoma cuando el personal est├® en zona segura."
    }
];

// ÔöÇÔöÇ M├│dulos de contenido ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
const MODULES = [
    { icon: '­ƒÅø´©Å', label: 'Bienvenida & Misi├│n IMLS',  desc: 'Slides 1ÔÇô8 ┬À La visi├│n de la Alcaldesa y la misi├│n municipal' },
    { icon: '­ƒôí', label: 'RDMLS: La Radio Digital',    desc: 'Slides 9ÔÇô15 ┬À Historia, plataforma y objetivos de la emisora' },
    { icon: 'ÔÜû´©Å',  label: 'Marco Legal & Decretos',    desc: 'Slides 16ÔÇô22 ┬À Normativa que regula las comunicaciones municipales' },
    { icon: '­ƒøí´©Å', label: 'Ley Karin & Probidad',       desc: 'Slides 23ÔÇô28 ┬À Protocolo de convivencia y ├®tica laboral' },
    { icon: '­ƒÜ¿', label: 'Seguridad & Emergencias',    desc: 'Slides 29ÔÇô33 ┬À Planes de evacuaci├│n y n├║meros de emergencia' },
];

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
export default function Induccion26({ isRDMLS }) {
    const navigate = useNavigate();
    const audioRef = useRef(null);

    const [step, setStep]               = useState('disclaimer'); // disclaimer | main | trivia | diploma-form | diploma
    const [progress, setProgress]       = useState(0);
    const [score, setScore]             = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answered, setAnswered]       = useState(false);
    const [lastCorrect, setLastCorrect] = useState(false);
    const [userData, setUserData]       = useState({ nombres: '', apellidos: '', area: '', calidad: 'Planta' });
    const [disclaimerVisible, setDisclaimerVisible] = useState(false);

    useEffect(() => {
        document.title = 'RDMLS ┬À Inducci├│n Municipal 2026';
        setTimeout(() => setDisclaimerVisible(true), 100);
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (musicPlaying) audioRef.current.pause();
            else audioRef.current.play().catch(() => {});
            setMusicPlaying(!musicPlaying);
        }
    };

    const advanceProgress = () => {
        if (progress >= 100) return;
        const next = Math.min(progress + 33, 100);
        setProgress(next);
        setTimeout(() => {
            setCurrentQuestion(prev => {
                const q = prev < QUESTIONS.length - 1 ? prev : prev;
                return q;
            });
            setAnswered(false);
            setStep('trivia');
        }, 500);
    };

    const handleAnswer = (idx) => {
        if (answered) return;
        setAnswered(true);
        const correct = QUESTIONS[currentQuestion].ans === idx;
        setLastCorrect(correct);
        if (correct) setScore(s => s + 100);
    };

    const nextTrivia = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(c => c + 1);
            setAnswered(false);
            setStep('main');
        } else {
            setProgress(100);
            setStep('diploma-form');
        }
    };

    // ÔöÇÔöÇ DISCLAIMER ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    if (step === 'disclaimer') return (
        <div style={{
            minHeight: '100vh', background: `radial-gradient(ellipse at top, #1a0800, ${C.dark})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem', color: 'white',
            opacity: disclaimerVisible ? 1 : 0, transition: 'opacity 0.6s ease'
        }}>
            {/* Banner EN DESARROLLO */}
            <div style={{
                background: 'rgba(250,204,21,0.12)', border: '2px solid rgba(250,204,21,0.5)',
                borderRadius: '16px', padding: '1rem 2rem', display: 'flex', alignItems: 'center',
                gap: '10px', marginBottom: '2rem', maxWidth: '600px', width: '100%'
            }}>
                <AlertTriangle size={24} color="#fbbf24" style={{ flexShrink: 0 }} />
                <div>
                    <div style={{ fontWeight: '900', color: '#fbbf24', fontSize: '0.9rem', letterSpacing: '2px' }}>
                        ­ƒÜº M├ôDULO EN DESARROLLO
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#d97706', marginTop: '3px' }}>
                        Este portal de inducci├│n est├í en fase de implementaci├│n. El contenido puede cambiar sin aviso previo.
                    </div>
                </div>
            </div>

            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>­ƒô╗</div>
            <img src="/escudo.png" alt="IMLS" style={{ height: '64px', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.5))' }} />
            <h1 style={{ color: C.orange, fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: '900', letterSpacing: '2px', textAlign: 'center', margin: '0 0 0.5rem' }}>
                INDUCCI├ôN RDMLS 2026
            </h1>
            <p style={{ color: '#f97316cc', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                RADIO DIGITAL MUNICIPAL ┬À LA SERENA
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Portal de inducci├│n corporativa para nuevos funcionarios y colaboradores
                de la Radio Digital Municipal de La Serena. Acceder├ís a la presentaci├│n oficial,
                una evaluaci├│n de conocimientos y tu certificado digital personalizado.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.8rem', maxWidth: '520px', width: '100%', marginBottom: '2.5rem' }}>
                {[
                    { icon: '­ƒôä', label: 'Presentaci├│n oficial IMLS Beta26' },
                    { icon: 'ÔØô', label: '5 preguntas de validaci├│n' },
                    { icon: '­ƒÅå', label: 'Diploma digital con tu nombre' },
                    { icon: 'ÔÅ▒´©Å', label: 'Duraci├│n estimada: 20 min' },
                ].map(({ icon, label }) => (
                    <div key={label} style={{
                        background: C.card, border: `1px solid ${C.border}`,
                        borderRadius: '12px', padding: '0.9rem', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
                        {label}
                    </div>
                ))}
            </div>

            <button onClick={() => setStep('main')} style={{
                background: `linear-gradient(135deg, ${C.orange}, #c2410c)`, border: 'none',
                borderRadius: '14px', padding: '14px 48px', color: 'white',
                fontWeight: '900', fontSize: '1rem', letterSpacing: '2px', cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(249,115,22,0.35)'
            }}>
                INICIAR INDUCCI├ôN ÔåÆ
            </button>
            <button onClick={() => navigate('/')} style={{
                marginTop: '1rem', background: 'none', border: 'none',
                color: '#475569', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline'
            }}>Volver a la Radio RDMLS</button>
        </div>
    );

    // ÔöÇÔöÇ DIPLOMA FORM ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    if (step === 'diploma-form') return (
        <div style={{
            minHeight: '100vh', background: `radial-gradient(ellipse at top, #1a0800, ${C.dark})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem', color: 'white'
        }}>
            <div style={{ width: '100%', maxWidth: '540px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: '24px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>­ƒÅå</div>
                    <h2 style={{ color: C.orange, fontWeight: '900', letterSpacing: '2px', margin: 0 }}>OBT├ëN TU DIPLOMA</h2>
                    <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '6px' }}>Completa tus datos para el registro oficial</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { key: 'nombres',   label: 'Nombres',      placeholder: 'Tus nombres' },
                        { key: 'apellidos', label: 'Apellidos',     placeholder: 'Tus apellidos' },
                    ].map(({ key, label, placeholder }) => (
                        <div key={key}>
                            <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', marginBottom: '6px' }}>{label.toUpperCase()}</label>
                            <input value={userData[key]} onChange={e => setUserData({ ...userData, [key]: e.target.value })}
                                placeholder={placeholder}
                                style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(0,0,0,0.4)', border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '12px', color: 'white', fontSize: '0.9rem', outline: 'none' }} />
                        </div>
                    ))}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', marginBottom: '6px' }}>├üREA / DIRECCI├ôN</label>
                        <select value={userData.area} onChange={e => setUserData({ ...userData, area: e.target.value })}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '12px', color: 'white', fontSize: '0.9rem', outline: 'none' }}>
                            <option value="">Seleccione su ├írea</option>
                            <option>Comunicaciones / RDMLS</option>
                            <option>Alcald├¡a</option>
                            <option>Administraci├│n Municipal</option>
                            <option>DIDECO</option>
                            <option>Finanzas</option>
                            <option>Gesti├│n de Personas (RRHH)</option>
                            <option>Seguridad Ciudadana</option>
                            <option>Innovaci├│n Digital</option>
                            <option>Otra Direcci├│n</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', marginBottom: '6px' }}>CALIDAD JUR├ìDICA</label>
                        <select value={userData.calidad} onChange={e => setUserData({ ...userData, calidad: e.target.value })}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '12px', color: 'white', fontSize: '0.9rem', outline: 'none' }}>
                            <option>Planta</option>
                            <option>Contrata</option>
                            <option>Honorarios</option>
                            <option>C├│digo del Trabajo</option>
                        </select>
                    </div>
                    <button onClick={async () => {
                        if (!userData.nombres || !userData.apellidos || !userData.area) { alert('Completa todos los datos.'); return; }
                        setStep('diploma');
                        try {
                            await addDoc(collection(db, 'induccion_certificados_2026'), {
                                ...userData, fecha: new Date().toISOString(), domain: 'RDMLS', score
                            });
                        } catch (e) { console.error(e); }
                    }} style={{
                        background: `linear-gradient(135deg, ${C.orange}, #c2410c)`, border: 'none',
                        borderRadius: '12px', padding: '14px', color: 'white', fontWeight: '900',
                        fontSize: '0.9rem', letterSpacing: '2px', cursor: 'pointer', marginTop: '0.5rem'
                    }}>
                        GENERAR CERTIFICADO OFICIAL ­ƒÄô
                    </button>
                </div>
            </div>
        </div>
    );

    // ÔöÇÔöÇ DIPLOMA FINAL ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    if (step === 'diploma') return (
        <div style={{
            minHeight: '100vh', background: '#0f0f0f',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem', overflowY: 'auto'
        }}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                style={{
                    width: '100%', maxWidth: '900px', background: 'white',
                    borderRadius: '16px', padding: 'clamp(2rem,5vw,4rem)',
                    border: '24px double #C5A065', position: 'relative', overflow: 'hidden',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.8)', color: '#1a1a1a'
                }}>
                {/* Watermark */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.04, pointerEvents: 'none' }}>
                    <img src="/escudo.png" alt="" style={{ height: '600px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '3px solid rgba(197,160,101,0.2)', paddingBottom: '1.5rem' }}>
                    <img src="/escudo.png" alt="IMLS" style={{ height: '70px' }} />
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ color: C.orange, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '3px' }}>RADIO DIGITAL MUNICIPAL</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.65rem', letterSpacing: '4px', marginTop: '4px' }}>LA SERENA ┬À CHILE ┬À 2026</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: '900', fontFamily: 'Georgia, serif', letterSpacing: '0.1em', margin: '0 0 0.5rem', color: '#111' }}>CERTIFICADO</h1>
                    <p style={{ color: '#888', fontStyle: 'italic', fontSize: '1rem', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                        De Aprobaci├│n ┬À Inducci├│n Corporativa RDMLS 2026
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#aaa', letterSpacing: '3px', marginBottom: '1rem' }}>OTORGADO A:</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', fontWeight: '900', color: C.orange, margin: '0 0 1rem', letterSpacing: '-1px' }}>
                        {userData.nombres} {userData.apellidos}
                    </h2>
                    <p style={{ fontWeight: '700', color: '#555', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '2rem' }}>
                        {userData.calidad.toUpperCase()} ┬À {userData.area.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: '#444', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        "Por haber completado con ├®xito el proceso de inducci├│n corporativa de la Ilustre Municipalidad de La Serena, adhiriendo a los valores, protocolos y misi├│n de la Radio Digital Municipal RDMLS."
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', borderTop: '2px solid rgba(197,160,101,0.2)', paddingTop: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: '1.5rem', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Firma Digital RDMLS</div>
                            <div style={{ borderTop: '2px solid #ddd', paddingTop: '8px', fontSize: '0.6rem', letterSpacing: '2px', color: '#999' }}>DIRECCI├ôN DE COMUNICACIONES</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: C.orange, fontWeight: '900', fontSize: '1rem', marginBottom: '6px' }}>RDMLS-OK-2026</div>
                            <QrCode size={44} color="#ccc" />
                            <div style={{ fontSize: '0.55rem', color: '#bbb', letterSpacing: '1px', marginTop: '4px' }}>rdmls.cl/induccion</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: '1.5rem', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Firma Alcald├¡a</div>
                            <div style={{ borderTop: '2px solid #ddd', paddingTop: '8px', fontSize: '0.6rem', letterSpacing: '2px', color: '#999' }}>ADMINISTRACI├ôN MUNICIPAL</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Botones post-diploma */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button onClick={() => navigate('/')} style={{
                    background: `linear-gradient(135deg, ${C.orange}, #c2410c)`, border: 'none',
                    borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '900',
                    fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                    <Radio size={18} /> Escuchar RDMLS
                </button>
                <button onClick={() => window.print()} style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '14px', padding: '14px 32px', color: 'white', fontWeight: '700',
                    fontSize: '0.85rem', cursor: 'pointer'
                }}>­ƒû¿´©Å Imprimir Diploma</button>
            </div>
        </div>
    );

    // ÔöÇÔöÇ TRIVIA MODAL inline ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    if (step === 'trivia') return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} style={{
                background: 'linear-gradient(180deg,#1e293b,#0f172a)', padding: '2.5rem',
                borderRadius: '28px', maxWidth: '600px', width: '100%',
                border: `1px solid ${C.border}`, boxShadow: '0 30px 60px rgba(0,0,0,0.7)', textAlign: 'center',
                fontFamily: "'Segoe UI', Roboto, sans-serif"
            }}>
                <div style={{ background: C.orange, width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', boxShadow: `0 0 20px ${C.orange}66` }}>
                    <HelpCircle size={28} color="white" />
                </div>
                <div style={{ fontSize: '0.65rem', color: C.orange, letterSpacing: '3px', marginBottom: '0.5rem' }}>
                    PREGUNTA {currentQuestion + 1} DE {QUESTIONS.length}
                </div>
                <h2 style={{ color: 'white', fontSize: '1.3rem', fontWeight: '900', marginBottom: '1.5rem' }}>
                    EVALUACI├ôN SMART RDMLS
                </h2>
                <div style={{ fontSize: '1.05rem', color: 'white', fontWeight: '700', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', lineHeight: 1.5 }}>
                    {QUESTIONS[currentQuestion].q}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left' }}>
                    {QUESTIONS[currentQuestion].opts.map((opt, idx) => {
                        const isCorrect = QUESTIONS[currentQuestion].ans === idx;
                        return (
                            <button key={idx} onClick={() => handleAnswer(idx)} style={{
                                background: answered ? (isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)') : 'rgba(255,255,255,0.05)',
                                border: `2px solid ${answered && isCorrect ? '#22c55e' : 'rgba(255,255,255,0.1)'}`,
                                color: 'white', padding: '1rem 1.2rem', borderRadius: '14px',
                                fontSize: '0.95rem', fontWeight: '600', cursor: answered ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s'
                            }}>
                                {opt}
                                {answered && isCorrect && <CheckCircle size={20} color="#22c55e" />}
                            </button>
                        );
                    })}
                </div>
                {answered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1.5rem' }}>
                        <div style={{ color: lastCorrect ? '#22c55e' : '#f87171', fontWeight: '900', fontSize: '1.1rem', marginBottom: '1rem' }}>
                            {lastCorrect ? 'Ô£à ┬íVALIDACI├ôN APROBADA! +100 XP' : 'ÔÜá´©Å REVISI├ôN REQUERIDA'}
                        </div>
                        <div style={{ textAlign: 'left', background: 'rgba(197,160,101,0.1)', borderLeft: `4px solid ${C.gold}`, borderRadius: '0 12px 12px 0', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.65rem', color: C.gold, fontWeight: '900', letterSpacing: '2px', marginBottom: '6px' }}>­ƒôï NOTA DE INTEGRACI├ôN RDMLS:</div>
                            <p style={{ margin: 0, color: '#e2e8f0', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                {QUESTIONS[currentQuestion].explanation}
                            </p>
                        </div>
                        <button onClick={nextTrivia} style={{
                            background: C.orange, color: 'white', border: 'none',
                            padding: '12px 36px', borderRadius: '50px', fontWeight: '900',
                            fontSize: '0.95rem', cursor: 'pointer'
                        }}>
                            {currentQuestion < QUESTIONS.length - 1 ? 'CONTINUAR ÔåÆ' : '­ƒÅå OBTENER DIPLOMA'}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );

    // ÔöÇÔöÇ MAIN (PPTX + Sidebar) ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
    return (
        <div style={{
            minHeight: '100vh',
            background: `linear-gradient(180deg, ${C.mid} 0%, ${C.dark} 100%)`,
            color: 'white', fontFamily: "'Segoe UI', Roboto, sans-serif", display: 'flex', flexDirection: 'column'
        }}>
            <audio ref={audioRef} src="https://az11.yesstreaming.net:8590/radio.mp3" />

            {/* ÔöÇÔöÇ HEADER ÔöÇÔöÇ */}
            <header style={{
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
                borderBottom: `2px solid ${C.border}`, padding: '0.9rem 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: '0.8rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/escudo.png" alt="IMLS" style={{ height: '34px' }} />
                    <div>
                        <div style={{ fontWeight: '900', color: C.orange, fontSize: '0.95rem', letterSpacing: '1px' }}>INDUCCI├ôN RDMLS 2026</div>
                        <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '1px' }}>Radio Digital Municipal La Serena ┬À IMLS</div>
                    </div>
                </div>

                {/* Progreso */}
                <div style={{ flex: 1, maxWidth: '360px', margin: '0 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px' }}>
                        <span style={{ color: C.orange, fontWeight: '700' }}>AVANCE M├ôDULO</span>
                        <span style={{ color: 'white', fontWeight: '700' }}>{progress}%</span>
                    </div>
                    <div style={{ height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div animate={{ width: `${progress}%` }} style={{ height: '100%', background: `linear-gradient(90deg, ${C.orange}, ${C.gold})` }} />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', padding: '5px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Award size={14} color="#FFD700" />
                        <span style={{ color: '#FFD700', fontWeight: '900', fontSize: '0.8rem' }}>{score} XP</span>
                    </div>
                    <button onClick={toggleMusic} style={{ background: 'rgba(249,115,22,0.12)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        {musicPlaying ? <Volume2 size={16} color={C.orange} /> : <VolumeX size={16} color="#64748b" />}
                    </button>
                    <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.78rem' }}>
                        CERRAR
                    </button>
                </div>
            </header>

            {/* Banner EN DESARROLLO */}
            <div style={{
                background: 'rgba(250,204,21,0.1)', borderBottom: '1px solid rgba(250,204,21,0.3)',
                padding: '10px 1.5rem', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
                <AlertTriangle size={14} color="#fbbf24" />
                <span style={{ color: '#d97706', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px' }}>
                    ­ƒÜº M├ôDULO EN DESARROLLO ÔÇö El contenido puede actualizarse sin aviso previo ┬À Versi├│n Beta 2026
                </span>
            </div>

            {/* ÔöÇÔöÇ MAIN CONTENT ÔöÇÔöÇ */}
            <main style={{ flex: 1, padding: '1.5rem', display: 'flex', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

                {/* PPTX Viewer */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                    flex: 3, background: 'black', borderRadius: '20px', overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: `1px solid ${C.border}`,
                    display: 'flex', flexDirection: 'column', minHeight: '60vh'
                }}>
                    <div style={{ background: 'rgba(249,115,22,0.08)', borderBottom: `1px solid ${C.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Signal size={14} color={C.orange} />
                        <span style={{ fontSize: '0.7rem', color: C.orange, fontWeight: '700', letterSpacing: '1px' }}>PRESENTACI├ôN OFICIAL IMLS BETA26</span>
                    </div>
                    <iframe
                        src={IFRAME_SRC} width="100%" style={{ flex: 1, border: 'none', minHeight: '500px' }}
                        title="Inducci├│n IMLS 2026" allowFullScreen
                    />
                </motion.div>

                {/* Sidebar */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{
                    flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '1rem'
                }}>
                    {/* M├│dulos */}
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '1.2rem' }}>
                        <div style={{ fontSize: '0.62rem', color: C.orange, fontWeight: '800', letterSpacing: '2px', marginBottom: '0.8rem' }}>CONTENIDO DEL M├ôDULO</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {MODULES.map((m, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px' }}>
                                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{m.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: '700', color: 'white', fontSize: '0.78rem' }}>{m.label}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.68rem', marginTop: '2px' }}>{m.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instrucci├│n */}
                    <div style={{ background: 'rgba(197,160,101,0.08)', border: `1px solid ${C.gold}30`, borderLeft: `4px solid ${C.gold}`, borderRadius: '0 12px 12px 0', padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <HelpCircle size={14} color={C.gold} />
                            <span style={{ fontSize: '0.65rem', color: C.gold, fontWeight: '800', letterSpacing: '1px' }}>MISI├ôN DE INDUCCI├ôN</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                            Lee cada secci├│n de la presentaci├│n. Al completar un bloque, presiona <strong style={{ color: 'white' }}>"Validar Avance"</strong> para responder la evaluaci├│n y acumular XP.
                        </p>
                    </div>

                    {/* Bot├│n validar */}
                    <button onClick={advanceProgress} disabled={progress >= 100} style={{
                        background: progress >= 100 ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${C.orange}, #c2410c)`,
                        color: 'white', border: 'none', padding: '1.1rem', borderRadius: '14px',
                        fontWeight: '900', fontSize: '0.9rem', cursor: progress >= 100 ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        boxShadow: progress >= 100 ? 'none' : '0 8px 20px rgba(249,115,22,0.3)', transition: 'all 0.3s'
                    }}>
                        {progress >= 100 ? '┬íM├ôDULO COMPLETADO! Ô£ô' : 'VALIDAR AVANCE'} <FastForward size={18} />
                    </button>

                    {/* Progreso preguntas */}
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                        <div style={{ color: C.orange, fontWeight: '700', marginBottom: '6px', fontSize: '0.65rem', letterSpacing: '1px' }}>VALIDACIONES COMPLETADAS</div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {QUESTIONS.map((_, i) => (
                                <div key={i} style={{
                                    width: '24px', height: '24px', borderRadius: '50%',
                                    background: i < currentQuestion ? C.orange : 'rgba(255,255,255,0.08)',
                                    border: `1.5px solid ${i < currentQuestion ? C.orange : 'rgba(255,255,255,0.15)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.65rem', fontWeight: '700', color: i < currentQuestion ? 'white' : '#475569'
                                }}>
                                    {i < currentQuestion ? 'Ô£ô' : i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
