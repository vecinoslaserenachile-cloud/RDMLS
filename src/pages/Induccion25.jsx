import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Play, Pause, Award, HelpCircle, FastForward,
    CheckCircle, Shield, Globe, Radio, Volume2, VolumeX, ArrowRight,
    QrCode, RefreshCw, AlertTriangle, Mic, Signal, Clock, Sparkles, X, Send, Loader2, Bot
} from 'lucide-react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import UniversalSerenito from '../components/UniversalSerenito';

// --- COMPONENTE ASISTENTE SMART ---
const SmartAssistantInduccion = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      { role: 'model', text: '¡Hola! Soy **Serenito 3D**, tu tutor virtual de inducción RDMLS. ¿Tienes dudas sobre la Radio, la Ley Karin o cómo obtener tu diploma?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages, isOpen]);
  
    const handleSend = async () => {
      if (!input.trim()) return;
  
      const userMsg = input;
      setInput('');
      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setIsLoading(true);
  
      try {
        const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs");
        const model = ai.getGenerativeModel({ 
          model: "gemini-2.0-flash-exp",
          systemInstruction: "Eres Serenito 3D, el Asistente Virtual de Inducción para la Radio Digital Municipal (RDMLS) y la I. Municipalidad de La Serena lidereada por la Alcaldesa Daniela Norambuena Borgheresi. Tu objetivo es ayudar a los funcionarios que realizan esta inducción. Usa un tono amable, profesional y humanizado."
        });
  
        const result = await model.generateContent({
          contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMsg }] }
          ]
        });
  
        const response = result.response;
        setMessages(prev => [...prev, { role: 'model', text: response.text() }]);
      } catch (error) {
        setMessages(prev => [...prev, { role: 'model', text: "Error técnico. Reintenta." }]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ position:'fixed', bottom:'20px', right:'20px', zIndex:10000, background:'#f97316', color:'white', border:'none', borderRadius:'50%', width:'60px', height:'60px', cursor:'pointer', boxShadow:'0 5px 15px rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}
        >
          <Sparkles size={30} />
        </button>
  
        {isOpen && (
          <div style={{ position:'fixed', bottom:'90px', right:'20px', zIndex:10000, width:'350px', height:'450px', background:'#0d0200', border:'1px solid rgba(249,115,22,0.3)', borderRadius:'20px', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ padding:'0.8rem 1rem', background:'#180800', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(249,115,22,0.2)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(249,115,22,0.1)', borderRadius: '50%', overflow: 'hidden', border: '2px solid #f97316' }}>
                    <Canvas camera={{ position: [0, 1.5, 3], fov: 35 }}>
                        <Suspense fallback={null}>
                            <Environment preset="city" />
                            <ambientLight intensity={0.8} />
                            <UniversalSerenito animation={isLoading ? "Thinking" : "Wave"} scale={0.06} position={[0, -1.3, 0]} />
                        </Suspense>
                    </Canvas>
                </div>
                <div>
                  <div style={{ fontWeight:'900', color:'white', fontSize:'0.85rem', letterSpacing: '1px' }}>SERENITO 3D</div>
                  <div style={{ fontSize: '0.6rem', color: '#f97316', fontWeight: 'bold' }}>TUTOR ASISTENTE</div>
                </div>
              </div>
              <button onClick={()=>setIsOpen(false)} style={{ background:'transparent', border:'none', color:'#64748b', cursor:'pointer' }}><X size={20}/></button>
            </div>
            <div style={{ flex:1, overflowY:'auto', padding:'1rem', display:'flex', flexDirection:'column', gap:'10px' }}>
              {messages.map((m,i)=>(
                <div key={i} style={{ alignSelf: m.role==='user'?'flex-end':'flex-start', background: m.role==='user'?'#f97316':'rgba(255,255,255,0.05)', padding:'0.8rem', borderRadius:'15px', maxWidth:'80%', color:'white', fontSize:'0.85rem' }}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ))}
              {isLoading && <Loader2 className="animate-spin" size={16} color="#f97316" />}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ padding:'1rem', background:'#180800', borderTop:'1px solid rgba(249,115,22,0.2)', display:'flex', gap:'10px' }}>
                <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSend()} style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(249,115,22,0.2)', borderRadius:'10px', padding:'0.5rem', color:'white', outline:'none' }} placeholder="Pregunta algo..." />
                <button onClick={handleSend} style={{ background:'#f97316', border:'none', borderRadius:'10px', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center', color:'white', cursor:'pointer' }}><Send size={18}/></button>
            </div>
          </div>
        )}
      </>
    );
};

// —— PPTX Beta26 (GitHub raw) ——————————————————————————————————————————
const RAW_PPTX = "https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/94c24c55256c3fe970c5f5e91635efeccaafee92/Induccion%20IMLS%20beta25.pptx";
const IFRAME_SRC = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(RAW_PPTX)}`;

// —— Colores RDMLS ————————————————————————————————————————————————————
const C = {
    orange: '#f97316',
    gold:   '#C5A065',
    dark:   '#0d0200',
    mid:    '#180800',
    card:   'rgba(249,115,22,0.07)',
    border: 'rgba(249,115,22,0.25)',
};

// —— Preguntas enfocadas en Radio Municipal + IMLS ————————————————————
const QUESTIONS = [
    {
        q: "¿Cuál es el propósito principal de la Radio Digital Municipal RDMLS?",
        opts: [
            "Entretenimiento comercial para la región",
            "Informar y conectar a la comunidad con la gestión municipal de La Serena",
            "Competir con radios privadas locales"
        ],
        ans: 1,
        explanation: "La RDMLS es el canal oficial de comunicación digital de la I. Municipalidad de La Serena. Su misión es servir como puente de información pública, difusión de servicios municipales y cultura ciudadana, sin fines comerciales."
    },
    {
        q: "¿Cuál es el mecanismo formal de instrucciones en la administración municipal de La Serena?",
        opts: [
            "Correos electrónicos internos",
            "Decretos Alcaldicios",
            "Mensajes de WhatsApp institucional"
        ],
        ans: 1,
        explanation: "Todo acto administrativo y decisión formal del municipio se formaliza mediante Decretos Alcaldicios. Esto garantiza transparencia, legalidad y trazabilidad en todos los procesos, incluyendo los comunicacionales."
    },
    {
        q: "Respecto a las vocerías públicas y comunicados oficiales del municipio:",
        opts: [
            "Cualquier funcionario puede declarar a la prensa",
            "Se canalizan exclusivamente por Alcaldía y el Departamento de Comunicaciones",
            "Cada dirección comunica de forma independiente"
        ],
        ans: 1,
        explanation: "La Radio Municipal opera bajo la coordinación directa del Departamento de Comunicaciones e Innovación Digital. Toda vocería, entrevista o comunicado debe contar con el visto bueno de esta área y de Alcaldía."
    },
    {
        q: "¿Qué protocolo define la Ley 21.643 (Ley Karin) en el ámbito laboral municipal?",
        opts: [
            "El uso correcto de equipos informáticos",
            "La prevención y sanción del acoso laboral, sexual y la violencia en el trabajo",
            "El horario de transmisión de la radio"
        ],
        ans: 1,
        explanation: "La Ley Karin mandata tolerancia cero al acoso y la violencia laboral. Un solo acto grave es suficiente para denunciar. Todo funcionario RDMLS debe conocer el canal de denuncia institucional y actuar con probidad."
    },
    {
        q: "Ante un sismo de gran magnitud en La Serena, el protocolo de evacuación establece:",
        opts: [
            "Permanecer en las instalaciones de radio",
            "Evacuar al edificio municipal más cercano",
            "Dirigirse a COTA 30 (Av. Cisternas) ante riesgo de tsunami"
        ],
        ans: 2,
        explanation: "La Serena es una ciudad costera con riesgo de tsunami. El protocolo municipal establece evacuar hacia la Cota 30 (Av. Cisternas) ante un sismo fuerte. La continuidad radial se retoma cuando el personal esté en zona segura."
    }
];

// —— Módulos de contenido —————————————————————————————————————————————
const MODULES = [
    { icon: '🎓', label: 'Bienvenida & Misión IMLS',  desc: 'Slides 1–8 · La visión de la Alcaldesa y la misión municipal' },
    { icon: '📻', label: 'RDMLS: La Radio Digital',    desc: 'Slides 9–15 · Historia, plataforma y objetivos de la emisora' },
    { icon: '⚖️', label: 'Marco Legal & Decretos',    desc: 'Slides 16–22 · Normativa que regula las comunicaciones municipales' },
    { icon: '🛡️', label: 'Ley Karin & Probidad',       desc: 'Slides 23–28 · Protocolo de convivencia y ética laboral' },
    { icon: '🚨', label: 'Seguridad & Emergencias',    desc: 'Slides 29–33 · Planes de evacuación y números de emergencia' },
];

// ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
export default function Induccion25({ isRDMLS }) {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [step, setStep]               = useState('registro'); 
    const [progress, setProgress]       = useState(0);
    const [score, setScore]             = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answered, setAnswered]       = useState(false);
    const [lastCorrect, setLastCorrect] = useState(false);
    const [userData, setUserData]       = useState({ nombres: '', apellidos: '', rut: '', area: 'SECPLAN', calidad: 'Planta' });
    const [disclaimerVisible, setDisclaimerVisible] = useState(false);

    useEffect(() => {
        document.title = 'RDMLS · Inducción Municipal 2025';
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

    // ── REGISTRO (PANTALLA INICIAL OBLIGATORIA) ──────────────────────────────
    if (step === 'registro') {
        const DEPARTAMENTOS = ["Alcaldía","Administración Municipal","Secretaría Municipal","SECPLAN","DIDECO","Dirección de Obras (DOM)","Gestión de Personas","Seguridad Ciudadana","Tránsito","Turismo y Patrimonio","Servicio a la Comunidad","Salud","Educación","Jurídica","Control"];
        const handleSubmit = () => {
            if (!userData.nombres.trim() || !userData.rut.trim()) {
                alert('Por favor completa Nombres y RUT para continuar.');
                return;
            }
            setStep('disclaimer');
        };
        return (
            <div style={{ minHeight:'100vh', background:`radial-gradient(ellipse at top, #1a0800, ${C.dark})`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Segoe UI', Roboto, sans-serif", padding:'2rem', color:'white' }}>
            <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '1rem' }}>
                <Canvas shadows camera={{ position: [0, 2, 5], fov: 40 }} style={{ height: '100%', width: '100%' }}>
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <UniversalSerenito 
                                animation="Talking" 
                                scale={0.05} 
                                position={[0, -1.2, 0]} 
                            />
                        </Float>
                        <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.25} far={10} color="#000" />
                    </Suspense>
                </Canvas>
                <img src="/escudo.png" alt="IMLS" style={{ height: '32px', position: 'absolute', bottom: '20px', right: '0px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
            </div>
                <h1 style={{ color:C.orange, fontSize:'clamp(1.4rem,4vw,2.2rem)', fontWeight:'900', letterSpacing:'2px', textAlign:'center', margin:'0 0 0.3rem' }}>PORTAL INDUCCIÓN RDMLS</h1>
                <p style={{ color:'#94a3b8', fontSize:'0.85rem', letterSpacing:'2px', marginBottom:'2rem', textAlign:'center' }}>RADIO DIGITAL MUNICIPAL · LA SERENA · 2025</p>
                <div style={{ background:'rgba(249,115,22,0.07)', border:`1px solid ${C.border}`, borderRadius:'24px', padding:'2.5rem', width:'100%', maxWidth:'480px', display:'flex', flexDirection:'column', gap:'1rem' }}>
                    <h3 style={{ margin:'0 0 0.5rem', color:'white', fontWeight:'900', fontSize:'1rem', letterSpacing:'1px', textTransform:'uppercase', borderBottom:`1px solid ${C.border}`, paddingBottom:'0.75rem' }}>🔐 Acceso Funcionario</h3>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                        <input style={{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'0.85rem 1rem', color:'white', fontSize:'0.9rem', outline:'none' }} placeholder="Nombres" value={userData.nombres} onChange={e=>setUserData({...userData, nombres:e.target.value})} />
                        <input style={{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'0.85rem 1rem', color:'white', fontSize:'0.9rem', outline:'none' }} placeholder="Apellidos" value={userData.apellidos} onChange={e=>setUserData({...userData, apellidos:e.target.value})} />
                    </div>
                    <input style={{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'0.85rem 1rem', color:'white', fontSize:'0.9rem', outline:'none' }} placeholder="RUT (ej: 12.345.678-9)" value={userData.rut} onChange={e=>setUserData({...userData, rut:e.target.value})} />
                    <select style={{ background:'#1a0500', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'0.85rem 1rem', color:'#cbd5e1', fontSize:'0.9rem', outline:'none' }} value={userData.area} onChange={e=>setUserData({...userData, area:e.target.value})}>
                        {DEPARTAMENTOS.map((d,i)=><option key={i} value={d}>{d}</option>)}
                    </select>
                    <select style={{ background:'#1a0500', border:`1px solid ${C.border}`, borderRadius:'12px', padding:'0.85rem 1rem', color:'#cbd5e1', fontSize:'0.9rem', outline:'none' }} value={userData.calidad} onChange={e=>setUserData({...userData, calidad:e.target.value})}>
                        <option value="Planta">Calidad Jurídica: Planta</option>
                        <option value="Contrata">Calidad Jurídica: Contrata</option>
                        <option value="Honorarios">Calidad Jurídica: Honorarios</option>
                        <option value="Código del Trabajo">Calidad Jurídica: Código del Trabajo</option>
                    </select>
                    <button onClick={handleSubmit} style={{ background:`linear-gradient(90deg, ${C.orange}, #dc2626)`, border:'none', borderRadius:'14px', padding:'1rem', color:'white', fontWeight:'900', fontSize:'1rem', cursor:'pointer', letterSpacing:'2px', textTransform:'uppercase', marginTop:'0.5rem' }}>INICIAR INDUCCIÓN →</button>
                    <button onClick={()=>navigate('/')} style={{ background:'transparent', border:'none', color:'#64748b', fontSize:'0.8rem', cursor:'pointer', fontWeight:'700', letterSpacing:'1px', textTransform:'uppercase' }}>Volver a la Radio</button>
                </div>
            </div>
        );
    }

    // ── DISCLAIMER ──────────────────────────────────────────────────────────────
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
                        🚧 MÓDULO EN DESARROLLO
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#d97706', marginTop: '3px' }}>
                        Este portal de inducción está en fase de implementación. El contenido puede cambiar sin aviso previo.
                    </div>
                </div>
            </div>

            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📺</div>
            <img src="/escudo.png" alt="IMLS" style={{ height: '64px', marginBottom: '1rem', filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.5))' }} />
            <h1 style={{ color: C.orange, fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: '900', letterSpacing: '2px', textAlign: 'center', margin: '0 0 0.5rem' }}>
                INDUCCIÓN RDMLS 2025
            </h1>
            <p style={{ color: '#f97316cc', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                RADIO DIGITAL MUNICIPAL · LA SERENA
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Portal de inducción corporativa para nuevos funcionarios y colaboradores
                de la Radio Digital Municipal de La Serena. Accederás a la presentación oficial,
                una evaluación de conocimientos y tu certificado digital personalizado.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.8rem', maxWidth: '520px', width: '100%', marginBottom: '2.5rem' }}>
                {[
                    { icon: '📄', label: 'Presentación oficial IMLS Beta26' },
                    { icon: '❓', label: '5 preguntas de validación' },
                    { icon: '🏆', label: 'Diploma digital con tu nombre' },
                    { icon: '⏱️', label: 'Duración estimada: 20 min' },
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
                INICIAR INDUCCIÓN →
            </button>
            <button onClick={() => navigate('/')} style={{
                marginTop: '1rem', background: 'none', border: 'none',
                color: '#475569', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline'
            }}>Volver a la Radio RDMLS</button>
        </div>
    );

    // —— DIPLOMA FORM ——————————————————————————————————————————————————
    if (step === 'diploma-form') return (
        <div style={{
            minHeight: '100vh', background: `radial-gradient(ellipse at top, #1a0800, ${C.dark})`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Segoe UI', Roboto, sans-serif", padding: '2rem', color: 'white'
        }}>
            <div style={{ width: '100%', maxWidth: '540px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: '24px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                    <h2 style={{ color: C.orange, fontWeight: '900', letterSpacing: '2px', margin: 0 }}>OBTÉN TU DIPLOMA</h2>
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
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', marginBottom: '6px' }}>├üREA / DIRECCIÓN</label>
                        <select value={userData.area} onChange={e => setUserData({ ...userData, area: e.target.value })}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '12px', color: 'white', fontSize: '0.9rem', outline: 'none' }}>
                            <option value="">Seleccione su área</option>
                            <option>Comunicaciones / RDMLS</option>
                            <option>Alcaldía</option>
                            <option>Administración Municipal</option>
                            <option>DIDECO</option>
                            <option>Finanzas</option>
                            <option>Gestión de Personas (RRHH)</option>
                            <option>Seguridad Ciudadana</option>
                            <option>Innovación Digital</option>
                            <option>Otra Dirección</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', letterSpacing: '2px', marginBottom: '6px' }}>CALIDAD JURÍDICA</label>
                        <select value={userData.calidad} onChange={e => setUserData({ ...userData, calidad: e.target.value })}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: `1.5px solid ${C.border}`, borderRadius: '10px', padding: '12px', color: 'white', fontSize: '0.9rem', outline: 'none' }}>
                            <option>Planta</option>
                            <option>Contrata</option>
                            <option>Honorarios</option>
                            <option>Código del Trabajo</option>
                        </select>
                    </div>
                    <button onClick={async () => {
                        if (!userData.nombres || !userData.apellidos || !userData.area) { alert('Completa todos los datos.'); return; }
                        setStep('diploma');
                        try {
                            await addDoc(collection(db, 'induccion_certificados_2025'), {
                                ...userData, fecha: new Date().toISOString(), domain: 'RDMLS', score
                            });
                        } catch (e) { console.error(e); }
                    }} style={{
                        background: `linear-gradient(135deg, ${C.orange}, #c2410c)`, border: 'none',
                        borderRadius: '12px', padding: '14px', color: 'white', fontWeight: '900',
                        fontSize: '0.9rem', letterSpacing: '2px', cursor: 'pointer', marginTop: '0.5rem'
                    }}>
                        GENERAR CERTIFICADO OFICIAL 🎓
                    </button>
                </div>
            </div>
        </div>
    );

    // —— DIPLOMA FINAL ——————————————————————————————————————————————————
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
                        <div style={{ color: '#94a3b8', fontSize: '0.65rem', letterSpacing: '4px', marginTop: '4px' }}>LA SERENA · CHILE · 2025</div>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: '900', fontFamily: 'Georgia, serif', letterSpacing: '0.1em', margin: '0 0 0.5rem', color: '#111' }}>CERTIFICADO</h1>
                    <p style={{ color: '#888', fontStyle: 'italic', fontSize: '1rem', marginBottom: '2rem', fontFamily: 'Georgia, serif' }}>
                        De Aprobación · Inducción Corporativa RDMLS 2025
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#aaa', letterSpacing: '3px', marginBottom: '1rem' }}>OTORGADO A:</p>
                    <h2 style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', fontWeight: '900', color: C.orange, margin: '0 0 1rem', letterSpacing: '-1px' }}>
                        {userData.nombres} {userData.apellidos}
                    </h2>
                    <p style={{ fontWeight: '700', color: '#555', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '2rem' }}>
                        {userData.calidad.toUpperCase()} · {userData.area.toUpperCase()}
                    </p>
                    <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: '#444', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        "Por haber completado con éxito el proceso de inducción corporativa de la Ilustre Municipalidad de La Serena, adhiriendo a los valores, protocolos y misión de la Radio Digital Municipal RDMLS."
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', borderTop: '2px solid rgba(197,160,101,0.2)', paddingTop: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: '1.5rem', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Firma Digital RDMLS</div>
                            <div style={{ borderTop: '2px solid #ddd', paddingTop: '8px', fontSize: '0.6rem', letterSpacing: '2px', color: '#999' }}>DIRECCIÓN DE COMUNICACIONES</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: C.orange, fontWeight: '900', fontSize: '1rem', marginBottom: '6px' }}>RDMLS-OK-2025</div>
                            <QrCode size={44} color="#ccc" />
                            <div style={{ fontSize: '0.55rem', color: '#bbb', letterSpacing: '1px', marginTop: '4px' }}>rdmls.cl/induccion</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontStyle: 'italic', color: '#ccc', fontSize: '1.5rem', fontFamily: 'Georgia, serif', marginBottom: '8px' }}>Firma Alcaldía</div>
                            <div style={{ borderTop: '2px solid #ddd', paddingTop: '8px', fontSize: '0.6rem', letterSpacing: '2px', color: '#999' }}>ADMINISTRACIÓN MUNICIPAL</div>
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
                }}>🖨️ Imprimir Diploma</button>
            </div>
        </div>
    );

    // —— TRIVIA MODAL inline ——————————————————————————————————————————
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
                    EVALUACIÓN SMART RDMLS
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
                            {lastCorrect ? '✅ ¡VALIDACIÓN APROBADA! +100 XP' : '⚠️ REVISIÓN REQUERIDA'}
                        </div>
                        <div style={{ textAlign: 'left', background: 'rgba(197,160,101,0.1)', borderLeft: `4px solid ${C.gold}`, borderRadius: '0 12px 12px 0', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.65rem', color: C.gold, fontWeight: '900', letterSpacing: '2px', marginBottom: '6px' }}>📝 NOTA DE INTEGRACIÓN RDMLS:</div>
                            <p style={{ margin: 0, color: '#e2e8f0', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                {QUESTIONS[currentQuestion].explanation}
                            </p>
                        </div>
                        <button onClick={nextTrivia} style={{
                            background: C.orange, color: 'white', border: 'none',
                            padding: '12px 36px', borderRadius: '50px', fontWeight: '900',
                            fontSize: '0.95rem', cursor: 'pointer'
                        }}>
                            {currentQuestion < QUESTIONS.length - 1 ? 'CONTINUAR →' : '🏆 OBTENER DIPLOMA'}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );

    // —— MAIN (PPTX + Sidebar) —————————————————————————————————————————
    return (
        <div style={{
            minHeight: '100vh',
            background: `linear-gradient(180deg, ${C.mid} 0%, ${C.dark} 100%)`,
            color: 'white', fontFamily: "'Segoe UI', Roboto, sans-serif", display: 'flex', flexDirection: 'column'
        }}>
            <audio ref={audioRef} src="https://az11.yesstreaming.net:8590/radio.mp3" />

            {/* —— HEADER —— */}
            <header style={{
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
                borderBottom: `2px solid ${C.border}`, padding: '0.9rem 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                position: 'sticky', top: 0, zIndex: 100, flexWrap: 'wrap', gap: '0.8rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/escudo.png" alt="IMLS" style={{ height: '34px' }} />
                    <div>
                        <div style={{ fontWeight: '900', color: C.orange, fontSize: '0.95rem', letterSpacing: '1px' }}>INDUCCIÓN RDMLS 2025</div>
                        <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '1px' }}>Radio Digital Municipal La Serena · IMLS</div>
                    </div>
                </div>

                {/* Progreso */}
                <div style={{ flex: 1, maxWidth: '360px', margin: '0 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px' }}>
                        <span style={{ color: C.orange, fontWeight: '700' }}>AVANCE MÓDULO</span>
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
                    🚧 MÓDULO EN DESARROLLO — El contenido puede actualizarse sin aviso previo · Versión Beta 2025
                </span>
            </div>

            {/* —— MAIN CONTENT —— */}
            <main style={{ flex: 1, padding: '1.5rem', display: 'flex', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

                {/* PPTX Viewer */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                    flex: 3, background: 'black', borderRadius: '20px', overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: `1px solid ${C.border}`,
                    display: 'flex', flexDirection: 'column', minHeight: '60vh'
                }}>
                    <div style={{ background: 'rgba(249,115,22,0.08)', borderBottom: `1px solid ${C.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Signal size={14} color={C.orange} />
                        <span style={{ fontSize: '0.7rem', color: C.orange, fontWeight: '700', letterSpacing: '1px' }}>PRESENTACIÓN OFICIAL IMLS BETA25</span>
                    </div>
                    <iframe
                        src={IFRAME_SRC} width="100%" style={{ flex: 1, border: 'none', minHeight: '500px' }}
                        title="Inducción IMLS 2025" allowFullScreen
                    />
                </motion.div>

                {/* Sidebar */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{
                    flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '1rem'
                }}>
                    {/* Módulos */}
                    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '1.2rem' }}>
                        <div style={{ fontSize: '0.62rem', color: C.orange, fontWeight: '800', letterSpacing: '2px', marginBottom: '0.8rem' }}>CONTENIDO DEL MÓDULO</div>
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

                    {/* Instrucción */}
                    <div style={{ background: 'rgba(197,160,101,0.08)', border: `1px solid ${C.gold}30`, borderLeft: `4px solid ${C.gold}`, borderRadius: '0 12px 12px 0', padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                            <HelpCircle size={14} color={C.gold} />
                            <span style={{ fontSize: '0.65rem', color: C.gold, fontWeight: '800', letterSpacing: '1px' }}>MISIÓN DE INDUCCIÓN</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                            Lee cada sección de la presentación. Al completar un bloque, presiona <strong style={{ color: 'white' }}>"Validar Avance"</strong> para responder la evaluación y acumular XP.
                        </p>
                    </div>

                    {/* Botón validar */}
                    <button onClick={advanceProgress} disabled={progress >= 100} style={{
                        background: progress >= 100 ? 'rgba(255,255,255,0.08)' : `linear-gradient(135deg, ${C.orange}, #c2410c)`,
                        color: 'white', border: 'none', padding: '1.1rem', borderRadius: '14px',
                        fontWeight: '900', fontSize: '0.9rem', cursor: progress >= 100 ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        boxShadow: progress >= 100 ? 'none' : '0 8px 20px rgba(249,115,22,0.3)', transition: 'all 0.3s'
                    }}>
                        {progress >= 100 ? '¡MÓDULO COMPLETADO! ✓' : 'VALIDAR AVANCE'} <FastForward size={18} />
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
                                    {i < currentQuestion ? '✓' : i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
            <SmartAssistantInduccion />
        </div>
    );
}

