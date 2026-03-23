import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ChevronRight, ChevronLeft, Award, 
  ChevronDown, Shield, Heart, DollarSign, 
  Printer, RefreshCw, User, Map, Briefcase, 
  Building2, Lightbulb, Clock, QrCode, Smartphone, 
  ArrowRight, Play, Radio, MessageCircle, Zap, 
  HeartHandshake, Smile, Activity, Stethoscope, AlertTriangle, Star, 
  Target, Users, Landmark, MapPin, Search, GraduationCap, Phone, 
  Eye, Info, HardHat, BookOpen, Globe, Sparkles, X, Send, Loader2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

// --- DATOS MAESTROS ---
const DEPARTAMENTOS = ["Alcaldía", "Administración Municipal", "Secretaría Municipal", "SECPLAN", "DIDECO", "Dirección de Obras (DOM)", "Gestión de Personas", "Seguridad Ciudadana", "Tránsito", "Turismo y Patrimonio", "Servicio a la Comunidad", "Salud", "Educación", "Jurídica", "Control"];

const CONCEJALES = ["Cristian Marín", "Rayen Pojomovsky", "Alejandro Astudillo", "Gladys Marín", "Francisca Barahona", "María Teresita Prouvay", "Camilo Araya", "María Marcela Damke", "Matías Espinosa", "Luisa Jinete"];

const QUESTIONS = [
  { q: "¿Quiénes componen el equipo municipal?", options: ["Solo planta", "Planta, Contrata y Honorarios", "Solo directivos"], ans: 1, explanation: "Correcto. Todos somos funcionarios públicos al servicio de La Serena." },
  { q: "¿Cuál es el foco de nuestra gestión?", options: ["La Burocracia", "El Vecino y su bienestar", "Cumplir horario"], ans: 1, explanation: "Exacto. El vecino es el centro de cada decisión." },
  { q: "¿Número de Seguridad Ciudadana?", options: ["911", "1420", "133"], ans: 1, explanation: "El 1420 es nuestro número de emergencia municipal." },
  { q: "¿Qué sanciona la Ley Karin?", options: ["Acoso y Violencia", "Llegar tarde", "Uniforme"], ans: 0, explanation: "Tolerancia Cero al acoso y violencia laboral." },
  { q: "¿Organismo de seguridad laboral?", options: ["ACHS", "Mutual de Seguridad", "ISL"], ans: 1, explanation: "Estamos adheridos a la Mutual de Seguridad CChC." },
  { q: "¿Dónde evacuar por Tsunami?", options: ["Al Faro", "Cota 30 (Av. Cisternas)", "Playa"], ans: 1, explanation: "Siempre hacia la zona de seguridad sobre la Cota 30." },
  { q: "¿Quién diseña proyectos Smart City?", options: ["SECPLAN", "DIDECO", "Tránsito"], ans: 0, explanation: "SECPLAN es el cerebro técnico de la planificación." },
  { q: "¿Qué es RDMLS?", options: ["Una oficina", "Radio Digital Municipal", "Un trámite"], ans: 1, explanation: "La Radio Digital Municipal, nuestra voz oficial." },
  { q: "¿Valor intransable?", options: ["Rapidez", "Probidad", "Simpatía"], ans: 1, explanation: "La Probidad es la base ética de nuestra función." },
  { q: "¿Qué hacer al terminar?", options: ["Irse", "Unirse a la Comunidad Digital", "Nada"], ans: 1, explanation: "¡Bienvenido! Súmate a nuestras redes y portales." },
];

// --- COMPONENTE ASISTENTE SMART ---
const SmartAssistantInduccion = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      { role: 'model', text: '¡Hola! Soy **Serenito 3D**, tu tutor virtual de inducción. ¿Tienes dudas sobre la Ley Karin, el 1420 o cómo obtener tu diploma?' }
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
        const ai = new GoogleGenAI({ apiKey: "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs" });
        const model = ai.getGenerativeModel({ 
          model: "gemini-1.5-flash",
          systemInstruction: "Eres Serenito 3D, el Asistente Virtual de Inducción para la I. Municipalidad de La Serena. Tu objetivo es ayudar a los nuevos funcionarios con dudas sobre: Ley Karin, Remuneraciones, Seguridad, el Concejo Municipal, etc. Sé amable, breve, profesional y usa un tono motivador. Eres un avatar 3D que representa la innovación de la ciudad."
        });
  
        const result = await model.generateContent({
          contents: [
            ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
            { role: 'user', parts: [{ text: userMsg }] }
          ]
        });
  
        const response = result.response;
        let text = response.text() || "Lo siento, vecino, tuve un problema al procesar eso.";
        setMessages(prev => [...prev, { role: 'model', text }]);
  
      } catch (error) {
        console.error("Error calling Gemini:", error);
        setMessages(prev => [...prev, { role: 'model', text: "Tuve un pequeño problema técnico. ¿Podrías repetir la pregunta?" }]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-24 right-8 z-[2000] bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2 group border-2 border-white/20"
        >
          <Sparkles size={24} className="animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-black uppercase text-xs tracking-widest">Pregunta a Serenito 3D</span>
        </button>
  
        {isOpen && (
          <div className="fixed bottom-44 right-8 z-[2000] w-80 md:w-96 h-[500px] bg-slate-900 rounded-[2rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="bg-slate-950 p-5 flex justify-between items-center text-white border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-xl">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tighter">Serenito Virtual</h3>
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Tutor IA Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
  
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-red-600 text-white rounded-br-none shadow-lg' 
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-bl-none shadow-sm'
                  }`}>
                    <ReactMarkdown className="markdown-content">{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/10 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-red-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
  
            <div className="p-4 bg-slate-950 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-red-600 transition-all border border-white/5">
                <input 
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder:text-slate-500"
                  placeholder="Escribe tu duda aquí..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="text-red-500 hover:text-red-400 disabled:text-slate-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

// --- APP PRINCIPAL INDUCCIÓN ---
export default function VLSInduccion({ onClose }) {
  const [step, setStep] = useState(0); 
  const [userData, setUserData] = useState({ 
    nombres: '', apellidos: '', rut: '', 
    dept: 'SECPLAN', cargo: '', email: '' 
  });
  const [canAdvance, setCanAdvance] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  // Quiz
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizState, setQuizState] = useState('waiting'); // waiting, correct, wrong
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const scrollRef = useRef(null);

  // Scroll Handler
  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 150) {
      setCanAdvance(true);
    }
  };

  useEffect(() => {
    // Pasos libres de bloqueo (Login, Fotos, Finales)
    if ([0, 1, 2, 12, 13].includes(step)) {
      setCanAdvance(true);
    } else {
      setCanAdvance(false);
      setTimeout(() => {
        if (scrollRef.current && scrollRef.current.scrollHeight <= scrollRef.current.clientHeight + 50) {
          setCanAdvance(true);
        }
      }, 1500);
    }
    // Reset scroll
    if(scrollRef.current) scrollRef.current.scrollTop = 0;
    setShowVideo(false); 
  }, [step]);

  const goNext = () => canAdvance && setStep(s => Math.min(s + 1, 13));
  const goBack = () => setStep(s => Math.max(0, s - 1));

  const handleAnswer = (idx) => {
    if (quizState !== 'waiting') return;
    if (idx === QUESTIONS[quizIndex].ans) {
      setQuizState('correct');
      setScore(s => s + 1);
    } else {
      setQuizState('wrong');
    }
  };

  // --- LAYOUT ---
  const ChapterLayout = ({ title, subtitle, content, visual }) => (
    <div className="fixed inset-0 z-[1000000] flex flex-col h-[100dvh] w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-800 z-[1002]">
        <div className="h-full bg-gradient-to-r from-red-600 to-orange-500 shadow-[0_0_20px_red] transition-all duration-700" style={{ width: `${(step / 13) * 100}%` }}></div>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-full bg-slate-900 flex items-center justify-center p-0 lg:p-12 relative border-b lg:border-b-0 lg:border-r border-white/5 z-10">
           <div className="w-full h-full lg:rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center relative">
             {visual}
           </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col h-[60vh] lg:h-full bg-slate-950 overflow-hidden relative z-20">
          <div className="px-8 lg:px-16 pt-8 pb-4 shrink-0 border-b border-white/5 bg-slate-950/95 backdrop-blur-md">
             <div className="flex items-center gap-3 mb-2">
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">PASO {step}</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest pl-2 border-l border-white/20">INDUCCIÓN 2026</span>
             </div>
             <h2 className="text-2xl lg:text-5xl font-black text-white leading-none tracking-tighter uppercase italic mb-1">{title}</h2>
             <h3 className="text-lg lg:text-2xl text-slate-400 font-serif italic">{subtitle}</h3>
          </div>

          <div onScroll={handleScroll} ref={scrollRef} className="flex-1 overflow-y-auto px-8 lg:px-16 py-8 scroll-smooth">
            <div className="space-y-10 text-xl lg:text-2xl text-slate-300 font-light leading-relaxed text-justify pb-32">
              {content}
            </div>
          </div>
        </div>
      </div>

      <div className="h-24 lg:h-28 shrink-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-8 lg:px-20 flex items-center justify-between z-[1001] absolute bottom-0 w-full shadow-2xl">
          <button onClick={step === 0 ? onClose : goBack} className="text-slate-500 hover:text-white font-black text-xs uppercase flex items-center gap-2 p-4 transition-colors">
            <ChevronLeft size={20}/> {step === 0 ? 'SALIR' : 'ATRÁS'}
          </button>
          
          <div className="flex items-center gap-6">
            {!canAdvance && (
               <div className="hidden sm:flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                 <ChevronDown size={20}/> Desliza para leer todo
               </div>
            )}
            <button 
              onClick={goNext} 
              disabled={!canAdvance}
              className={`px-10 py-4 lg:px-14 lg:py-5 rounded-2xl font-black shadow-2xl transition-all flex items-center gap-3 text-xs lg:text-sm uppercase tracking-[0.2em] transform 
                ${canAdvance ? 'bg-red-600 text-white hover:bg-red-500 hover:-translate-y-1 shadow-red-900/50' : 'bg-white/10 text-slate-600 cursor-not-allowed'}
              `}
            >
              {canAdvance && <CheckCircle size={18} className="text-white animate-bounce"/>}
              SIGUIENTE <ArrowRight size={18} />
            </button>
          </div>
      </div>
    </div>
  );

  // --- PASO 0: LOGIN ---
  if (step === 0) return (
    <div className="fixed inset-0 z-[1000000] h-[100dvh] w-full flex items-center justify-center bg-slate-950 font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[url('/mapa.jpg')] bg-cover opacity-20 blur-sm scale-110"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/90 to-transparent"></div>
      
      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center p-8 gap-16">
        <div className="text-center md:text-left space-y-8 flex-1">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src="/escudo.png" className="h-32 lg:h-48 mx-auto md:mx-0 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
          />
          <h1 className="text-6xl lg:text-[7rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
            PORTAL <br/><span className="text-red-600 font-normal italic">INDUCCIÓN 2026</span>
          </h1>
          <p className="text-slate-400 font-extrabold uppercase tracking-[0.5em] text-xs pl-4 border-l-4 border-red-600 mt-6 mt-12 bg-slate-900/50 py-3 rounded-r-lg">
            Smart Administration • Patrimonio • Capital Humano
          </p>
        </div>
        
        <div className="w-full max-w-md bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-2xl flex-1 animate-in zoom-in duration-500">
          <div className="space-y-4">
            <h3 className="text-white font-black text-2xl mb-6 flex items-center gap-4 uppercase tracking-tighter border-b border-white/5 pb-4"><User className="text-red-600" size={32}/> Acceso Funcionario</h3>
            <div className="grid grid-cols-2 gap-3">
              <input className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-red-600 outline-none transition-all" placeholder="Nombres" value={userData.nombres} onChange={e => setUserData({...userData, nombres: e.target.value})}/>
              <input className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-red-600 outline-none transition-all" placeholder="Apellidos" value={userData.apellidos} onChange={e => setUserData({...userData, apellidos: e.target.value})}/>
            </div>
            <input className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-red-600 outline-none transition-all" placeholder="RUT (con guion)" value={userData.rut} onChange={e => setUserData({...userData, rut: e.target.value})}/>
            <select className="w-full p-4 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-sm outline-none focus:border-red-600" value={userData.dept} onChange={e => setUserData({...userData, dept: e.target.value})}>
                {DEPARTAMENTOS.map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
            <button 
              onClick={() => { if(userData.nombres && userData.rut) setStep(1); else alert("Por favor, completa tus datos para iniciar."); }} 
              className="w-full bg-red-600 text-white py-6 rounded-2xl font-black tracking-widest hover:bg-red-500 shadow-xl shadow-red-900/40 transition-all uppercase text-lg mt-6 flex items-center justify-center gap-3 active:scale-95"
            >
              INICIAR FORMACIÓN <ArrowRight size={20}/>
            </button>
            <button onClick={onClose} className="w-full text-slate-500 text-[10px] font-black uppercase tracking-widest mt-4 hover:text-white transition-colors">Volver al Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 1: return <ChapterLayout title="Somos IMLS" subtitle="La Gran Familia Municipal" 
        visual={
          <div className="relative w-full h-full">
            <img src="/serenito.png" className="absolute bottom-0 right-0 h-[90%] object-contain z-10 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent"></div>
            <div className="p-12 h-full flex flex-col justify-start">
              <span className="text-white font-black text-6xl italic leading-none opacity-10">VLS<br/>2026</span>
            </div>
          </div>
        }
        content={<><p className="font-black text-5xl text-white mb-8 italic tracking-tighter">¡Hola, {userData.nombres}!</p><p className="text-2xl">Bienvenido a la **Ilustre Municipalidad de La Serena**. Hoy te integras a un equipo de más de 1.800 funcionarios comprometidos con el servicio público y la innovación.</p><div className="bg-blue-600/20 p-8 rounded-3xl border-l-4 border-blue-500 italic text-xl text-blue-100">"Somos el rostro del Estado ante la comunidad. Cada uno de nosotros es vital para el funcionamiento de la ciudad."</div></>} 
      />;

      case 2: return <ChapterLayout title="Liderazgo" subtitle="Mensaje de la Alcaldía" 
        visual={
          <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 relative">
            {!showVideo ? (
               <div className="w-full h-full relative group cursor-pointer" onClick={() => setShowVideo(true)}>
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950"></div>
                  <img src="/serenito_security_guard_close_up_1773392164475.png" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.8)] animate-pulse">
                        <Play size={40} fill="white" className="ml-2 text-white"/>
                     </div>
                  </div>
                  <p className="absolute bottom-10 left-0 w-full text-center text-white font-black tracking-widest uppercase text-sm">Clic para ver saludo institucional</p>
               </div>
            ) : (
               <iframe className="w-full h-full" src="https://www.youtube.com/embed/EQUdyb-YVxM?autoplay=1" title="Mensaje" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            )}
          </div>
        }
        content={<><p className="font-black text-4xl text-white mb-6 italic tracking-tighter">Gobernanza Soberana</p><p className="text-2xl font-light leading-relaxed">"Te invitamos a trabajar con pasión y compromiso. Nuestra gestión pone al vecino en el centro de todas las decisiones. Buscamos funcionarios proactivos, empáticos y modernos que entiendan el valor de una ciudad inteligente."</p><div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 text-justify"><p className="italic text-sm text-slate-400">La Serena se proyecta al futuro con tecnología, pero manteniendo siempre nuestra identidad colonial y patrimonio vivo.</p></div></>} 
      />;

      case 3: return <ChapterLayout title="Estrategia" subtitle="Misión y Visión" 
        visual={<div className="flex flex-col gap-10 items-center p-12 text-center"><Target size={140} className="text-red-600 animate-pulse"/><h4 className="font-black text-6xl uppercase tracking-tighter text-white leading-none italic">RUMBO<br/>2026</h4></div>}
        content={<><section className="space-y-4"><h4 className="text-red-500 font-black text-3xl uppercase tracking-widest flex items-center gap-3 border-b border-white/10 pb-4"><Star/> Nuestra Misión</h4><p className="font-light text-2xl">Administrar la comuna asegurando la participación de la comunidad en su progreso. Entregar servicios de alta calidad, con eficiencia, transparencia y calidez humana.</p></section><section className="space-y-4 pt-10"><h4 className="text-orange-500 font-black text-3xl uppercase tracking-widest flex items-center gap-3 border-b border-white/10 pb-4"><Landmark/> Nuestra Visión</h4><p className="font-light text-2xl">Ser una comuna líder en desarrollo sostenible y Smart City, reconocida por su respeto al patrimonio y por brindar máxima calidad de vida.</p></section></>} 
      />;

      case 4: return <ChapterLayout title="Concejo" subtitle="Fiscalización y Democracia" 
        visual={<div className="grid grid-cols-2 gap-4 p-8 w-full h-full overflow-y-auto bg-slate-900/50">{CONCEJALES.map(c => <div key={c} className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center text-[10px] font-black uppercase flex flex-col items-center justify-center hover:bg-red-600 transition-all group active:scale-95 shadow-lg"><User size={24} className="mb-2 text-red-500 group-hover:text-white"/><span className="text-white">{c}</span></div>)}</div>}
        content={<><p className="text-2xl">El **Concejo Municipal** es el órgano encargado de fiscalizar la gestión y aprueba normas locales. Está compuesto por 10 concejales electos democráticamente.</p><div className="bg-yellow-500/10 p-10 rounded-[2.5rem] border border-yellow-500/20 space-y-6 mt-8 shadow-xl"><h4 className="text-yellow-500 font-black text-3xl uppercase flex items-center gap-4 italic"><Shield/> Funciones Críticas</h4><ul className="space-y-6 font-light text-xl"><li>• Fiscalizar planes, programas y el actuar de la alcaldía.</li><li>• Aprobar el presupuesto anual del municipio.</li><li>• Dictar ordenanzas y normas de convivencia comunal.</li></ul></div></>} 
      />;

      case 5: return <ChapterLayout title="Estructura" subtitle="Direcciones Municipales" 
        visual={<div className="flex items-center justify-center p-8 h-full bg-slate-900"><div className="w-full text-center space-y-4"><Building2 size={120} className="mx-auto text-red-600"/><h2 className="text-white font-black text-4xl uppercase tracking-tighter">CENTRO DE GESTIÓN</h2></div></div>}
        content={<><p className="text-3xl font-black text-white italic border-l-4 border-red-600 pl-4 uppercase tracking-tighter mb-8">Red de Servicio Municipal:</p><div className="grid gap-4 mt-6">{DEPARTAMENTOS.map((d, i) => (<div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default"><h4 className="font-black text-white uppercase text-lg flex items-center gap-3"><ChevronRight size={16} className="text-red-500"/> {d}</h4></div>))}</div></>} 
      />;

      case 6: return <ChapterLayout title="Smart City" subtitle="Ecosistema Digital" 
        visual={
            <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-gradient-to-br from-indigo-950 to-slate-950">
                <div className="bg-white text-slate-950 font-black p-12 rounded-full mb-12 text-5xl shadow-[0_0_60px_rgba(255,255,255,0.3)]">IMLS</div>
                <div className="flex gap-8 w-full justify-center">
                    <div className="bg-blue-600/30 p-8 rounded-[2rem] border border-blue-500/50 flex flex-col items-center gap-4 w-1/2 backdrop-blur-md">
                        <Users size={40} className="text-blue-400"/>
                        <span className="font-black uppercase text-xs tracking-widest text-center">VECINOS<br/>PARTICIPATIVOS</span>
                    </div>
                    <div className="bg-green-600/30 p-8 rounded-[2rem] border border-green-500/50 flex flex-col items-center gap-4 w-1/2 backdrop-blur-md">
                        <Landmark size={40} className="text-green-400"/>
                        <span className="font-black uppercase text-xs tracking-widest text-center">ESTADO<br/>EFICIENTE</span>
                    </div>
                </div>
            </div>
        }
        content={<><p className="text-3xl font-bold text-white uppercase italic tracking-tighter mb-6">Tecnología al Servicio de la Gente.</p><p className="text-xl">En La Serena, entendemos la **Smart City** no solo como sensores y apps, sino como una herramienta para mejorar la vida del ciudadano. La IMLS interactúa con un ecosistema donde el Vecino es el motor de cada proceso digital.</p><div className="mt-8 p-8 bg-blue-900/30 rounded-3xl border border-blue-500/30 shadow-2xl"><p className="italic text-xl text-blue-100">"Nuestra meta es una ciudad conectada, segura, resiliente y 100% transparente gracias al uso ético de la IA."</p></div></>} 
      />;

      case 7: return <ChapterLayout title="Seguridad" subtitle="Línea 1420" 
        visual={<div className="p-12 text-center animate-pulse"><Phone size={140} className="text-red-600 mx-auto drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"/><h4 className="text-white font-black text-[8rem] mt-6 tracking-tighter italic leading-none">1420</h4></div>}
        content={
          <>
            <p className="text-3xl font-black text-white mb-8 uppercase italic tracking-tighter">Tu tranquilidad es nuestra prioridad.</p>
            <p className="text-2xl font-light mb-8 italic">La Dirección de Seguridad Ciudadana despliega patrullajes preventivos y monitorea más de 500 cámaras con IA las 24 horas del día.</p>
            <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 shadow-2xl space-y-8">
                <div className="flex gap-8 items-center group">
                    <div className="bg-red-600 p-6 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform"><Phone size={40}/></div>
                    <div><h4 className="font-black text-white text-4xl italic">1420</h4><p className="text-xs text-slate-400 uppercase font-black tracking-[0.3em]">Emergencias Municipales</p></div>
                </div>
                <div className="flex gap-8 items-center group">
                    <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform"><Eye size={40}/></div>
                    <div><h4 className="font-black text-white text-3xl uppercase italic leading-none">Cámaras IA</h4><p className="text-xs text-slate-400 uppercase font-black tracking-[0.3em]">Monitoreo Inteligente 24/7</p></div>
                </div>
            </div>
          </>
        } 
      />;

      case 8: return <ChapterLayout title="Bienestar" subtitle="Calidad de Vida" 
        visual={<div className="p-12 text-center"><HeartHandshake size={150} className="text-red-600 mx-auto drop-shadow-2xl"/><h4 className="text-white font-black text-4xl mt-8 uppercase italic tracking-tighter">PERSONAS<br/>PRIMERO</h4></div>}
        content={<><p className="text-3xl font-black text-white mb-8 uppercase italic">Red de apoyo para ti:</p><div className="space-y-6"><div className="p-8 border-2 border-green-500/30 bg-green-500/10 rounded-[2rem] flex gap-8 items-center backdrop-blur-sm transition-all hover:bg-green-500/20"><Stethoscope size={50} className="text-green-500 shrink-0"/><div className="space-y-1"><h4 className="font-black text-white text-2xl uppercase">Salud & Psicología</h4><p className="text-slate-400 text-lg">Convenios dentales, seguros médicos y programa de apoyo psicológico para funcionarios.</p></div></div><div className="p-8 border-2 border-blue-500/30 bg-blue-500/10 rounded-[2rem] flex gap-8 items-center backdrop-blur-sm transition-all hover:bg-blue-500/20"><Activity size={50} className="text-blue-500 shrink-0"/><div className="space-y-1"><h4 className="font-black text-white text-2xl uppercase">Deportes & Vida Sana</h4><p className="text-slate-400 text-lg">Acceso gratuito a recintos deportivos municipales y pausas activas diarias.</p></div></div></div></>} 
      />;

      case 9: return <ChapterLayout title="Ley Karin" subtitle="Respeto (21.643)" 
        visual={<div className="p-12 text-center"><Shield size={160} className="text-pink-600 mx-auto drop-shadow-[0_0_40px_rgba(219,39,119,0.3)]"/><h4 className="font-bold text-pink-100 mt-8 text-4xl uppercase tracking-widest">Ley 21.643</h4></div>}
        content={<><p className="text-4xl font-black text-white mb-8 italic uppercase leading-none border-b-2 border-pink-600/30 pb-4">Tolerancia Cero.</p><p className="text-2xl mb-8">La **Ley Karin** es un pilar fundamental en nuestra cultura. Mandata la prevención y sanción del acoso laboral, sexual y la violencia en el trabajo.</p><div className="grid gap-6 mt-8"><div className="bg-pink-600/10 p-8 rounded-[2rem] border border-pink-500/30 flex items-center gap-8 backdrop-blur-md"><AlertTriangle className="text-pink-500" size={40}/><div><h5 className="text-white font-black text-xl uppercase italic">Acoso Laboral</h5><p className="text-sm text-slate-400 mt-1">Cualquier conducta que constituya agresión u hostigamiento reiterado contra la dignidad.</p></div></div><div className="bg-pink-600/10 p-8 rounded-[2rem] border border-pink-500/30 flex items-center gap-8 backdrop-blur-md"><MessageCircle className="text-pink-500" size={40}/><div><h5 className="text-white font-black text-xl uppercase italic">Violencia Externa</h5><p className="text-sm text-slate-400 mt-1">Actos violentos ejercidos por terceros (usuarios o vecinos) hacia el funcionario.</p></div></div></div><p className="mt-10 text-xs bg-white/5 p-6 rounded-2xl text-center italic text-pink-200">"Para la Ley Karin, un solo acto grave es suficiente para constituir denuncia."</p></>} 
      />;

      case 10: return <ChapterLayout title="Protección" subtitle="Mutualidad y Emergencias" 
        visual={<div className="p-12 text-center"><HardHat size={160} className="text-yellow-500 mx-auto animate-bounce"/><h4 className="text-white font-black text-3xl mt-8">SEGURIDAD LABORAL</h4></div>}
        content={<><h4 className="text-yellow-500 font-black text-4xl uppercase tracking-tighter mb-8 border-b border-yellow-500/20 pb-4 italic">Mutual de Seguridad CChC</h4><p className="mb-8 font-bold text-2xl text-white">Protocolo ante Accidentes (Ley 16.744):</p><div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden"><div className="absolute top-0 right-0 p-4 opacity-5"><Shield size={100}/></div><div className="flex gap-8 items-start"><div className="bg-yellow-500 text-slate-950 w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl shrink-0 shadow-lg">1</div><div><h5 className="font-black text-white text-2xl uppercase italic">Avisa a tu Jefatura</h5><p className="text-lg mt-1 text-slate-400">Debe informarse de inmediato, por leve que parezca el incidente dentro de la jornada.</p></div></div><div className="flex gap-8 items-start"><div className="bg-yellow-500 text-slate-950 w-12 h-12 rounded-full flex items-center justify-center font-black text-2xl shrink-0 shadow-lg">2</div><div><h5 className="font-black text-white text-2xl uppercase italic">Asiste a la Mutual</h5><p className="text-lg mt-1 text-slate-400">Exige el registro médico oficial (DIAT) para activar todas las protecciones legales.</p></div></div></div><div className="mt-12 bg-blue-600/20 p-8 rounded-[2.5rem] border border-blue-500/30 shadow-xl"><h4 className="text-blue-400 font-black text-2xl uppercase flex items-center gap-4 mb-3 italic"><Radio size={36}/> Protocolo Tsunami</h4><p className="text-xl">Ante un sismo que impida mantenerse en pie: **EVACUAR DE INMEDIATO A LA COTA 30** (Av. Cisternas o superior).</p></div></>} 
      />;

      case 11: return <ChapterLayout title="Educación" subtitle="Capacitación Continua" 
        visual={<div className="p-12 animate-in zoom-in duration-1000"><GraduationCap size={160} className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.5)] animate-pulse"/></div>}
        content={<><p className="text-4xl font-black text-white mb-8 uppercase italic leading-none border-l-8 border-red-600 pl-6">Impulsamos tu Crecimiento.</p><p className="text-2xl font-light leading-snug">En la IMLS no solo trabajas, también creces. Nuestro programa de capacitación continua busca que seas un líder en la gestión pública moderna:</p><div className="grid gap-8 mt-10"><div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center gap-8 hover:bg-white/10 transition-all group cursor-default"><div className="p-5 bg-red-600/20 rounded-2xl group-hover:bg-red-600 transition-colors"><BookOpen className="text-red-500 group-hover:text-white" size={50}/></div><div><h4 className="text-white font-black text-3xl uppercase italic leading-none">Academia VLS</h4><p className="text-slate-400 text-sm mt-2 tracking-widest uppercase font-bold">Cursos Certificados de Alto Nivel</p></div></div><div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center gap-8 hover:bg-white/10 transition-all group cursor-default"><div className="p-5 bg-orange-600/20 rounded-2xl group-hover:bg-orange-600 transition-colors"><Zap className="text-orange-500 group-hover:text-white" size={50}/></div><div><h4 className="text-white font-black text-3xl uppercase italic leading-none">Smart Skills</h4><p className="text-slate-400 text-sm mt-2 tracking-widest uppercase font-bold">Innovación y Herramientas Digitales</p></div></div></div></>} 
      />;

      case 12: return (
        <div className="fixed inset-0 z-[1000000] h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-6 font-sans">
          <div className="bg-slate-900 w-full max-w-5xl rounded-[4rem] border border-white/10 flex flex-col h-[85vh] shadow-[0_40px_100px_rgba(0,0,0,1)] relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-3 bg-white/5 italic"><div className="h-full bg-red-600 transition-all duration-700 shadow-[0_0_20px_rgba(220,38,38,0.8)]" style={{width: `${((quizIndex+1)/10)*100}%`}}></div></div>
             
             {!quizFinished ? (
               <div className="flex-1 flex flex-col p-12 lg:p-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
                 <div className="flex justify-between items-center mb-10">
                    <span className="text-[12px] font-black text-red-500 bg-red-600/10 px-6 py-2 rounded-full uppercase tracking-[0.4em]">EVALUACIÓN ÉTICA</span>
                    <span className="text-slate-500 font-black text-lg">{quizIndex + 1} / 10</span>
                 </div>
                 <h3 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] mb-12 tracking-tighter italic uppercase">{QUESTIONS[quizIndex].q}</h3>
                 
                 <div className="flex-1 overflow-y-auto space-y-4 pr-4">
                   {QUESTIONS[quizIndex].options.map((opt, i) => (
                     <button 
                        key={i} 
                        onClick={() => handleAnswer(i)} 
                        disabled={quizState !== 'waiting'} 
                        className={`w-full text-left p-6 lg:p-8 rounded-3xl border-2 font-black text-lg lg:text-2xl transition-all flex justify-between items-center group
                            ${quizState === 'waiting' ? 'border-white/10 hover:border-red-600/50 hover:bg-white/5 text-slate-300' : 
                              i === QUESTIONS[quizIndex].ans ? 'bg-green-600/20 border-green-600 text-green-400' : 'opacity-20 grayscale text-slate-500 border-white/5'}
                        `}
                    >
                        {opt}
                        {quizState !== 'waiting' && i === QUESTIONS[quizIndex].ans && <CheckCircle size={32}/>}
                    </button>
                   ))}
                 </div>
  
                 {quizState !== 'waiting' && (
                   <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-10 p-8 rounded-3xl bg-slate-950/80 border-l-8 border-red-600 shadow-2xl shrink-0"
                   >
                      <p className="text-white text-xl lg:text-2xl font-light italic leading-snug">{QUESTIONS[quizIndex].explanation}</p>
                      <button 
                        onClick={() => { setQuizState('waiting'); if(quizIndex < 9) setQuizIndex(quizIndex+1); else setQuizFinished(true); }} 
                        className="w-full mt-8 bg-white text-slate-950 p-6 rounded-2xl font-black uppercase text-sm tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
                      >
                        {quizIndex < 9 ? 'SIGUIENTE PREGUNTA' : 'FINALIZAR EXAMEN'}
                      </button>
                   </motion.div>
                 )}
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-950 overflow-hidden relative">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent opacity-50"></div>
                 <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                 >
                    <Award size={180} className="text-yellow-500 mb-10 drop-shadow-[0_0_50px_rgba(234,179,8,0.4)]" />
                 </motion.div>
                 <h2 className="text-6xl lg:text-8xl font-black text-white mb-8 uppercase italic tracking-tighter">¡FELICITACIONES!</h2>
                 <p className="text-2xl text-slate-400 mb-12 max-w-2xl font-light uppercase tracking-widest">HAS COMPLETADO CON ÉXITO LA FORMACIÓN INICIAL DE SMART ADMINISTRATION.</p>
                 <button 
                    onClick={() => setStep(13)} 
                    className="bg-red-600 text-white py-8 px-16 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-xl shadow-[0_20px_60px_rgba(220,38,38,0.5)] hover:scale-105 transition-transform active:scale-95 z-10"
                >
                    OBTENER MI DIPLOMA
                </button>
               </div>
             )}
          </div>
        </div>
      );

      case 13: return (
        <div className="fixed inset-0 z-[1000000] h-[100dvh] bg-slate-950 flex flex-col overflow-y-auto font-sans p-6 lg:p-12">
            <div className="w-full max-w-6xl mx-auto space-y-16 py-12">
                {/* DIPLOMA */}
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-12 lg:p-24 rounded-[1rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] text-slate-900 relative overflow-hidden border-[30px] border-double border-[#C5A065]"
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                        <img src="/escudo.png" className="h-[800px]" />
                    </div>
    
                    <div className="flex justify-between items-center mb-16 border-b-4 border-[#C5A065]/20 pb-10 relative z-10">
                        <img src="/escudo.png" className="h-28" />
                        <div className="text-right">
                            <p className="text-[#C5A065] font-black text-sm uppercase tracking-widest leading-none">Smart Administration</p>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em] mt-2">LA SERENA • CHILE</p>
                        </div>
                    </div>
                    
                    <div className="text-center relative z-10">
                        <h1 className="text-7xl lg:text-[9rem] font-serif font-black uppercase tracking-[0.1em] mb-4 leading-none text-[#1a1a1a]">CERTIFICADO</h1>
                        <p className="text-2xl lg:text-3xl italic text-slate-500 mb-16 font-serif">De Aprobación Inducción Corporativa VLS 2026</p>
                        
                        <div className="mb-14">
                            <p className="text-slate-400 text-sm uppercase tracking-[0.5em] mb-4 font-bold">OTORGADO A:</p>
                            <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter text-[#C5A065] drop-shadow-sm leading-none">{userData.nombres} {userData.apellidos}</h2>
                        </div>
                        
                        <p className="text-xl font-bold text-slate-700 uppercase tracking-[0.4em] mb-16 bg-slate-50 py-3 rounded-full inline-block px-12 border border-slate-100 italic">RUT: {userData.rut} • {userData.dept}</p>
                        <p className="text-2xl lg:text-3xl text-slate-800 font-serif italic mb-20 max-w-4xl mx-auto leading-relaxed">"Por haber cumplido con éxito los requerimientos formativos, éticos y técnicos de ingreso a la Ilustre Municipalidad de La Serena, adhiriendo a los valores de nuestra gestión Smart City."</p>
                    </div>
    
                    <div className="flex justify-between items-end mt-24 text-[11px] font-extrabold uppercase text-slate-400 tracking-[0.3em] relative z-10 px-12">
                        <div className="text-center w-64">
                            <div className="h-20 flex items-center justify-center opacity-80 mb-4 italic text-slate-300 font-serif text-3xl">Firma Digital VLS</div>
                            <div className="border-t-2 border-slate-200 pt-4">Dirección de Gestión de Personas</div>
                        </div>
                        <div className="text-center space-y-4">
                            <p className="text-[#C5A065] font-black text-lg">VLS-OK-2026</p>
                            <div className="flex justify-center"><QrCode size={60} className="text-slate-300"/></div>
                        </div>
                        <div className="text-center w-64">
                            <div className="h-20 flex items-center justify-center opacity-80 mb-4 italic text-slate-300 font-serif text-3xl">Firma Alcaldía</div>
                            <div className="border-t-2 border-slate-200 pt-4">Alcaldía Municipalidad de La Serena</div>
                        </div>
                    </div>
                </motion.div>
    
                {/* REDES */}
                <div className="bg-white/5 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/10 text-center shadow-2xl">
                    <h2 className="text-6xl font-black text-white mb-12 uppercase italic tracking-tighter leading-none">¡BIENVENIDO A BORDO!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <button className="bg-red-600 text-white w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-6 hover:scale-105 transition-transform shadow-xl shadow-red-900/40 text-lg">
                            <Radio size={30}/> Escuchar Radio Digital
                        </button>
                        <button className="bg-blue-600 text-white w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-6 hover:scale-105 transition-transform shadow-xl shadow-blue-900/40 text-lg">
                            <Globe size={30}/> Visitar Portal Municipal
                        </button>
                    </div>
                    <button onClick={onClose} className="mt-20 text-slate-500 hover:text-red-500 text-xs font-black uppercase tracking-[0.8em] flex items-center justify-center gap-4 transition-all hover:gap-8">
                        <RefreshCw size={16} className="animate-spin-slow"/> FINALIZAR Y CERRAR SESIÓN
                    </button>
                </div>
            </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[1000000] bg-slate-950 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        <SmartAssistantInduccion />
      </div>
      <style>{`
        .markdown-content p { margin-bottom: 0.75rem; }
        .markdown-content strong { color: #ef4444; font-weight: 900; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
