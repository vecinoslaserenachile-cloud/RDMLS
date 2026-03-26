import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Radio, Map, Scissors, Users, Phone, RefreshCw, Volume2, 
    CheckCircle, Info, WifiOff, Crown, Camera, Mic, MessageSquare,
    User, Award, Gamepad2, Rocket, X, Play, Music, Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';

// --- IMÁGENES EXACTAS POR PREGUNTA ---
const IMAGENES_REALES = {
    "default": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Faro_Monumental_de_La_Serena%2C_Chile.jpg",
    "q1_aniversario": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Faro_Monumental_de_La_Serena%2C_Chile.jpg",
    "q1_fundador": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Estatua_de_Francisco_de_Aguirre.jpg", 
    "q1_iglesias": "https://upload.wikimedia.org/wikipedia/commons/8/87/Iglesia_de_Santo_Domingo%2C_La_Serena.jpg",
    "q1_faro": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Faro_Monumental_de_La_Serena%2C_Chile.jpg",
    "q2_cruz": "https://upload.wikimedia.org/wikipedia/commons/6/64/Cruz_del_Tercer_Milenio_Coquimbo.jpg",
    "q3_tololo": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cerro_Tololo_Inter-American_Observatory.jpg",
    "q3_rio": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Valle_del_Elqui.jpg",
    "q1_plan_serena": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Valle_del_Elqui.jpg",
    "q1_estilo": "https://upload.wikimedia.org/wikipedia/commons/8/87/Iglesia_de_Santo_Domingo%2C_La_Serena.jpg",
    "q1_parque": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Jard%C3%ADn_del_Coraz%C3%B3n_en_La_Serena.jpg/1280px-Jard%C3%ADn_del_Coraz%C3%B3n_en_La_Serena.jpg",
    "q1_regimiento": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Cerro_Tololo_Inter-American_Observatory.jpg",
    "q1_dulce": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Chumbeque.jpg"
};

const VLSTokenIcon = ({ size = 100 }) => (
    <motion.div 
        animate={{ rotateY: [0, 180, 360], scale: [1, 1.05, 1] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size, position: 'relative', perspective: '1000px' }}
    >
        <div style={{ 
            width: '100%', height: '100%', borderRadius: '50%', 
            background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
            border: '4px solid #8B6508',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'absolute', transformStyle: 'preserve-3d'
        }}>
            <div style={{ position: 'absolute', inset: '10%', border: '2px solid rgba(0,0,0,0.2)', borderRadius: '50%' }}></div>
            <div style={{ 
                color: '#4B3621', fontStyle: 'italic', fontWeight: '900', fontSize: size * 0.25,
                textShadow: '1px 1px 0 rgba(255,255,255,0.2)', fontFamily: 'serif' 
            }}>VLS</div>
            <div style={{ position: 'absolute', bottom: '15%', color: '#4B3621', fontSize: size * 0.1, fontWeight: 'bold' }}>2026</div>
        </div>
    </motion.div>
);

// --- LA BÓVEDA ---
const STAGES = [
    { id: 1, category: "Región", name: "La Serena Histórica", imgBg: "default", qs: 10, backup: { text: "¿En qué siglo se fundó La Serena?", options: ["XV", "XVI", "XVII", "XVIII"], correctIndex: 1 }, questions: [
        { text: "¿En qué fecha se celebra tradicionalmente el aniversario de La Serena?", options: ["26 de Agosto", "4 de Septiembre", "18 de Septiembre", "15 de Agosto"], correctIndex: 0, imgKey: "q1_aniversario", explanation: "Aunque Juan Bohón fundó la ciudad un 4 de Septiembre de 1544, el hito histórico que se celebra tradicionalmente es la refundación por Francisco de Aguirre el 26 de Agosto de 1549." },
        { text: "¿Quién fue el fundador original de la ciudad?", options: ["Pedro de Valdivia", "Francisco de Aguirre", "Juan Bohón", "Diego de Almagro"], correctIndex: 2, imgKey: "q1_fundador", explanation: "Juan Bohón fundó Villanueva de La Serena en 1544 por orden de Pedro de Valdivia." },
        { text: "¿Qué temido pirata incendió La Serena en 1680?", options: ["Francis Drake", "Bartholomew Sharp", "Henry Morgan", "Edward Davis"], correctIndex: 1, imgKey: "q1_pirata", explanation: "El corsario inglés Bartholomew Sharp saqueó e incendió gran parte de la ciudad en 1680." },
        { text: "¿De qué material están hechas las iglesias más antiguas del casco histórico?", options: ["Ladrillo", "Adobe", "Piedra Caliza", "Madera nativa"], correctIndex: 2, imgKey: "q1_iglesias", explanation: "Fueron construidas con Piedra Caliza, extraída de las canteras de Peñuelas." },
        { text: "¿Bajo qué presidencia se impulsó el 'Plan Serena'?", options: ["Carlos Ibáñez del Campo", "Arturo Alessandri", "Gabriel González Videla", "Pedro Aguirre Cerda"], correctIndex: 2, imgKey: "q1_plan_serena", explanation: "El Presidente Gabriel González Videla impulsó este plan de renovación urbana (1948-1952)." },
        { text: "¿En qué año fue entregado el Faro Monumental a la ciudad?", options: ["1930", "1945", "1953", "1960"], correctIndex: 2, imgKey: "q1_faro", explanation: "Entregado el 24 de octubre de 1953, siendo hoy el símbolo indiscutido de La Serena." },
        { text: "¿Qué estilo arquitectónico predomina gracias al Plan Serena?", options: ["Gótico", "Neocolonial", "Modernista", "Barroco"], correctIndex: 1, imgKey: "q1_estilo", explanation: "Se impuso el estilo Neocolonial para preservar la herencia hispánica." },
        { text: "¿Cuál es el parque céntrico con influencias japonesas?", options: ["Parque Pedro de Valdivia", "Parque Coll", "Parque Jardín del Corazón", "Parque Gabriel Coll"], correctIndex: 2, imgKey: "q1_parque", explanation: "El Jardín Japonés fue inaugurado en 1994, cofinanciado por la minera CAP y Japón." },
        { text: "¿Cómo se llama el regimiento histórico ubicado en el Cerro Santa Lucía?", options: ["Coquimbo", "Arica", "Serena", "Cazadores"], correctIndex: 0, imgKey: "q1_regimiento", explanation: "El Regimiento de Infantería N.º 21 'Coquimbo' custodia la ciudad." },
        { text: "¿Qué tradicional dulce es el emblema de la ciudad?", options: ["Alfajores", "Papayas confitadas", "Chumbeque", "Dulces de La Ligua"], correctIndex: 1, imgKey: "q1_dulce", explanation: "Las papayas cultivadas en la zona tienen un sabor y aroma únicos." }
    ]},
    { id: 2, category: "Región", name: "Coquimbo y El Puerto", imgBg: "cruz_milenio", qs: 8, backup: { text: "¿En qué región está Coquimbo?", options: ["Atacama", "Coquimbo", "Valparaíso", "Metropolitana"], correctIndex: 1 }, questions: [
        { text: "¿Cuánto mide de alto la Cruz del Tercer Milenio?", options: ["50 metros", "83 metros", "93 metros", "110 metros"], correctIndex: 2, imgKey: "q2_cruz", explanation: "Mide 93 metros de altura, posicionándose como un hito monumental sudamericano." },
        { text: "¿Cómo se llama el barrio cívico-cultural restaurado de Coquimbo?", options: ["Barrio Histórico", "Barrio Inglés", "Barrio Francés", "Barrio Pirata"], correctIndex: 1, imgKey: "q2_barrio", explanation: "El Barrio Inglés fue el núcleo del auge portuario en el siglo XIX." }
    ]},
    { id: 3, category: "Región", name: "Astronomía y Valles", imgBg: "estrellas", qs: 7, backup: { text: "¿Qué se observa en los observatorios?", options: ["Aves", "Estrellas y Galaxias", "Clima", "Océano"], correctIndex: 1 }, questions: [
        { text: "¿Cuál fue el primer observatorio científico instalado en la región?", options: ["Mamalluca", "Tololo", "La Silla", "Gemini Sur"], correctIndex: 1, imgKey: "q3_tololo", explanation: "El Observatorio Tololo comenzó a operar en la década de 1960." },
        { text: "¿Qué río atraviesa el valle más famoso de la región?", options: ["Río Limarí", "Río Elqui", "Río Claro", "Río Hurtado"], correctIndex: 1, imgKey: "q3_rio", explanation: "El Río Elqui permite la agricultura en un entorno semiárido excepcional." }
    ]},
    { id: 9, category: "Mundo", name: "EL RETO FINAL VLS", imgBg: "default", qs: 1, backup: { text: "¿En qué año se fundó vecinoslaserena.cl?", options: ["2010", "2015", "2020", "2024"], correctIndex: 2 }, questions: [
        { text: "POR 10 FICHAS VLS: Geográficamente, La Serena se ubica en terrazas marinas. ¿Cuántas terrazas componen la fisonomía de la ciudad?", options: ["Dos", "Tres", "Cuatro", "Es totalmente plana"], correctIndex: 1, imgKey: "q_final_terrazas", explanation: "La morfología de La Serena está escalonada en tres marcadas terrazas marinas." }
    ]}
];

export default function VlsSmartBillionaire({ onClose }) {
    const SAVE_KEY = 'vls_game_save_v2026_final';
    
    const [gameState, setGameState] = useState(() => {
        const saved = localStorage.getItem(SAVE_KEY);
        return saved ? 'map' : 'start';
    }); 
    const [currentStageIdx, setCurrentStageIdx] = useState(() => {
        const saved = localStorage.getItem(SAVE_KEY);
        return saved ? JSON.parse(saved).stage : 0;
    });
    const [globalQuestionCounter, setGlobalQuestionCounter] = useState(() => {
        const saved = localStorage.getItem(SAVE_KEY);
        return saved ? JSON.parse(saved).question : 1;
    });
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(() => {
        const saved = localStorage.getItem(SAVE_KEY);
        return saved ? JSON.parse(saved).qIdx : 0;
    });
    
    const [lifelines, setLifelines] = useState({ fifty: true, phone: true, audience: true, change: true });
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [activeJokerMsg, setActiveJokerMsg] = useState("");
    const [chatMsgs, setChatMsgs] = useState([{usr: "VLS_Admin", msg: "Señal establecida. Modo Broadcast activado."}]);
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [isCoinInserted, setIsCoinInserted] = useState(false);
    
    const videoRef = useRef(null);
    const audioCtxRef = useRef(null);
    const droneOscRef = useRef(null);
    const midiPlayerRef = useRef(null);
    const instrumentRef = useRef(null);
    
    const activeStage = STAGES[currentStageIdx];
    const currentQuestion = activeStage?.questions[currentQuestionIdx];
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [correctIdxForUI, setCorrectIdxForUI] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Fisher-Yates Shuffle
    const shuffleArray = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    useEffect(() => {
        if (currentQuestion) {
            const optsWithFlags = currentQuestion.options.map((opt, i) => ({ text: opt, isCorrect: i === currentQuestion.correctIndex }));
            const shuffled = shuffleArray(optsWithFlags);
            setShuffledOptions(shuffled.map(o => o.text));
            setCorrectIdxForUI(shuffled.findIndex(o => o.isCorrect));
            setSelectedOpt(null);
            setIsAnswered(false);
            setHiddenOptions([]);
        }
    }, [currentQuestionIdx, currentStageIdx]);

    const getBgImage = () => IMAGENES_REALES[activeStage?.imgBg] || IMAGENES_REALES["default"];
    const getInterstitialImage = () => currentQuestion && currentQuestion.imgKey ? (IMAGENES_REALES[currentQuestion.imgKey] || IMAGENES_REALES["default"]) : IMAGENES_REALES["default"];

    const initAudio = async () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (!instrumentRef.current) {
            instrumentRef.current = await Soundfont.instrument(audioCtxRef.current, 'acoustic_grand_piano');
        }
    };

    const playAnthem = async () => {
        try {
            await initAudio();
            if (audioCtxRef.current.state === 'suspended') await audioCtxRef.current.resume();
            
            if (!midiPlayerRef.current) {
                midiPlayerRef.current = new MidiPlayer.Player((evt) => { 
                    if (evt.name === 'Note on' && evt.velocity > 0) {
                        instrumentRef.current.play(evt.noteName, audioCtxRef.current.currentTime, { gain: evt.velocity / 127 }); 
                    }
                });
                const res = await fetch('https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/0bfd480e7c9a2ef87c1b9101276a1a10b0c84c9b/Himno.mid');
                const buffer = await res.arrayBuffer();
                midiPlayerRef.current.loadArrayBuffer(buffer);
            }
            midiPlayerRef.current.play();
        } catch(e) { console.error("Error Audio MIDI:", e); }
    };

    const stopAnthem = () => { if(midiPlayerRef.current) midiPlayerRef.current.stop(); };

    const playSuspense = () => {
        if(!audioCtxRef.current || droneOscRef.current) return;
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sawtooth'; osc.frequency.value = 41.20;
        gain.gain.value = 0.04; osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); droneOscRef.current = osc;
    };

    const stopSuspense = () => {
        if(droneOscRef.current){
            droneOscRef.current.stop();
            droneOscRef.current = null;
        }
    };

    const playSfx = (f1, f2, type, dur) => {
        if(!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = type; osc.frequency.setValueAtTime(f1, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(f2, ctx.currentTime + dur);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + dur);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + dur);
    };

    const handleInsertCoin = async () => {
        if (isCoinInserted) return;
        
        // Dispatch event to deduct a real VLS token from the global bank
        window.dispatchEvent(new CustomEvent('charge-vls-token', { 
            detail: { 
                cost: 1,
                onSuccess: () => {
                    setIsCoinInserted(true);
                    playSfx(400, 1200, 'sine', 0.1);
                    setTimeout(() => {
                        handleStart();
                    }, 800);
                },
                onFail: () => {
                    alert("⚠️ ERROR DE SALDO: Se requiere 1 Ficha VLS en tu Vecinity Bank para jugar.");
                }
            } 
        }));
    };

    const handleStart = async () => {
        setIsLoadingAudio(true);
        await initAudio();
        await playAnthem();
        playSfx(150, 600, 'square', 0.15);
        setIsLoadingAudio(false);
        setGameState('map');
    };

    useEffect(() => {
        if (isCameraActive && videoRef.current) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(s => { videoRef.current.srcObject = s; }).catch(() => setIsCameraActive(false));
        } else if (!isCameraActive && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
    }, [isCameraActive]);

    const handleAnswer = (idx) => {
        if (isAnswered || hiddenOptions.includes(idx)) return;
        setSelectedOpt(idx); setIsAnswered(true); stopSuspense(); setActiveJokerMsg("");
        
        if (idx === correctIdxForUI) {
            playSfx(987.77, 1318.51, 'square', 0.3);
            setTimeout(() => {
                if (globalQuestionCounter === 50) {
                    confetti({ particleCount: 400, spread: 180, origin: { y: 0.6 }, colors: ['#FFD700', '#FFFFFF', '#0f172a'] });
                    setGameState('win_vls');
                    localStorage.removeItem(SAVE_KEY);
                } else {
                    setGameState('interstitial');
                }
            }, 1200);
        } else { 
            stopAnthem();
            setGameState('lost'); 
            localStorage.removeItem(SAVE_KEY);
        }
    };

    const proceedToNextQuestion = () => {
        if (currentQuestionIdx < activeStage.questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1); setGlobalQuestionCounter(prev => prev + 1);
            setSelectedOpt(null); setIsAnswered(false); setHiddenOptions([]);
            setGameState('playing'); playSuspense();
        } else if (currentStageIdx < STAGES.length - 1) {
            setGlobalQuestionCounter(prev => prev + 1); setCurrentStageIdx(prev => prev + 1);
            setCurrentQuestionIdx(0);
            setGameState('map');
        } else {
            setGameState('win_vls');
        }
    };

    return (
        <div id="vls-game-broadcast-2026" className="fixed inset-0 z-[1000001] flex flex-col items-center justify-center bg-[#020617] text-white overflow-hidden">
            <style>{`
                #vls-game-broadcast-2026 { font-family: 'Inter', sans-serif; }
                .vls-glass-panel { 
                    background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(20px); 
                    border: 1px solid rgba(255, 255, 255, 0.08); border-top: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); 
                }
                .vls-ticker-wrap { width: 100%; overflow: hidden; background-color: #0f172a; border-top: 3px solid #FFD700; border-bottom: 3px solid #FFD700; display: flex; align-items: center; height: 45px; position: absolute; bottom: 0; z-index: 100; }
                .vls-ticker { display: inline-block; white-space: nowrap; padding-right: 100%; animation: vls-ticker-anim 30s linear infinite; font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 900; color: #FFD700; }
                @keyframes vls-ticker-anim { 0% { transform: translate3d(100%, 0, 0); } 100% { transform: translate3d(-100%, 0, 0); } }
                .vls-lifeline-active { border-color: #FFD700; color: #FFD700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); background: rgba(255,215,0,0.05); }
                .vls-lifeline-used { border-color: rgba(239, 68, 68, 0.4); color: rgba(239, 68, 68, 0.4); opacity: 0.4; pointer-events: none; background: rgba(0,0,0,0.5); }
                .coin-slot { 
                    width: 70px; height: 110px; background: #0f172a; border: 3px solid #FFD700; 
                    border-radius: 8px; position: relative; cursor: pointer; transition: all 0.3s;
                    box-shadow: inset 0 0 20px #000, 0 5px 15px rgba(255,215,0,0.2);
                }
                .coin-slot:hover { border-color: #FFF; box-shadow: inset 0 0 20px #000, 0 10px 25px rgba(255,255,255,0.4); }
                .coin-slot-opening { width: 12px; height: 70px; background: #000; border: 2px solid #334155; border-radius: 6px; position: absolute; top: 15px; left: 50%; transform: translateX(-50%); box-shadow: inset 0 0 10px #FFD70030; }
                .insert-coin-label { margin-top: 10px; font-weight: 900; color: #FFD700; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; }
            `}</style>

            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" style={{ backgroundImage: `url(${getBgImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

            <button onClick={() => { stopAnthem(); stopSuspense(); onClose(); }} className="absolute top-6 right-6 z-[1002] p-3 rounded-full bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white transition-all">
                <X size={24} />
            </button>

            <div className="flex-1 flex w-full relative z-10 p-4 gap-6 pb-[50px] h-full box-border">
                <div className="flex-1 flex flex-col justify-center items-center h-full">
                    <AnimatePresence mode="wait">
                        {gameState === 'start' && (
                            <motion.div key="start" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center vls-glass-panel p-16 rounded-[2.5rem] relative max-w-4xl w-full mx-auto overflow-hidden bg-yellow-400 container-arcade">
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#0f172a', letterSpacing: '4px', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>VLS NETWORK BROADCAST</div>
                                
                                <div className="mt-16 mb-8">
                                    <VLSTokenIcon size={120} />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-[#0f172a] drop-shadow-sm">¿Quién quiere estar informado?</h1>
                                <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-12 uppercase tracking-[0.3em] bg-white/30 inline-block px-4 py-1 rounded-lg">Master Edition 2026</h2>
                                
                                <div className="flex flex-col items-center">
                                    <motion.div 
                                        className="coin-slot"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleInsertCoin}
                                    >
                                        <div className="coin-slot-opening"></div>
                                        <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, textAlign: 'center' }}>
                                            <div className="insert-coin-label">Insert<br/>Coin</div>
                                        </div>
                                        {isCoinInserted && (
                                            <motion.div 
                                                initial={{ y: -50, opacity: 0 }} 
                                                animate={{ y: 0, opacity: 1 }} 
                                                style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}
                                            >
                                                <VLSTokenIcon size={30} />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                    <div className="mt-4 font-black text-[#0f172a] animate-pulse">1 TOKEN VLS = 50 PREGUNTAS</div>
                                </div>

                                {isLoadingAudio && <div className="mt-8 text-black font-black uppercase tracking-widest bg-white/50 px-6 py-2 rounded-full">Validando Ficha en Vecinity Bank...</div>}
                            </motion.div>
                        )}

                        {gameState === 'map' && (
                            <motion.div key="map" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, y:-20 }} className="w-full max-w-5xl vls-glass-panel p-10 rounded-[2.5rem] mx-auto flex flex-col items-center">
                                <h2 className="text-3xl font-black text-[#FFD700] mb-10 uppercase tracking-widest flex items-center gap-4"><Map size={32}/> Panel de Transmisión</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10 w-full">
                                    {STAGES.map((stage, idx) => (
                                        <div key={stage.id} className={`p-5 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${idx === currentStageIdx ? 'border-[#FFD700] bg-[#FFD700]/15 shadow-[0_0_20px_rgba(255,215,0,0.25)] scale-105' : idx < currentStageIdx ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/10 opacity-40'}`}>
                                            <span className="text-[10px] text-white/60 uppercase mb-2">Nivel {stage.id}</span>
                                            <span className="text-sm font-bold leading-tight">{stage.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => { setGameState('playing'); playSuspense(); }} className="px-16 py-5 bg-white text-[#0f172a] font-black text-xl rounded-full hover:bg-[#FFD700] transition-all shadow-xl">
                                    COMENZAR NIVEL {STAGES[currentStageIdx].id}
                                </button>
                            </motion.div>
                        )}

                        {gameState === 'playing' && (
                            <motion.div key="playing" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-5xl mx-auto flex flex-col h-full justify-center">
                                <div className="vls-glass-panel p-5 rounded-3xl mb-6 flex justify-between items-center shadow-lg">
                                    <div className="flex flex-col">
                                        <span className="text-[#FFD700] text-[11px] font-bold uppercase tracking-widest">Pregunta {globalQuestionCounter} de 50</span>
                                        <span className="font-black text-xl">{activeStage.name}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button disabled={!lifelines.fifty || isAnswered} onClick={() => { setLifelines(p => ({...p, fifty: false})); setHiddenOptions([0,1,2,3].filter(i=>i!==correctIdxForUI).sort(()=>Math.random()-0.5).slice(0,2)); }} className={`p-4 rounded-xl border-2 transition-all ${lifelines.fifty ? 'vls-lifeline-active' : 'vls-lifeline-used'}`} title="50/50"><Scissors size={22}/></button>
                                        <button disabled={!lifelines.audience || isAnswered} onClick={() => { setLifelines(p => ({...p, audience: false})); setActiveJokerMsg(`📊 Público: ¡Sugerimos "${shuffledOptions[correctIdxForUI]}"!`); }} className={`p-4 rounded-xl border-2 transition-all ${lifelines.audience ? 'vls-lifeline-active' : 'vls-lifeline-used'}`} title="Público"><Users size={22}/></button>
                                        <button disabled={!lifelines.phone || isAnswered} onClick={() => { setLifelines(p => ({...p, phone: false})); setActiveJokerMsg(`📞 Serenito: "Correcto es '${shuffledOptions[correctIdxForUI]}'."`); }} className={`p-4 rounded-xl border-2 transition-all ${lifelines.phone ? 'vls-lifeline-active' : 'vls-lifeline-used'}`} title="Llamada"><Phone size={22}/></button>
                                    </div>
                                </div>

                                <div className="vls-glass-panel p-6 md:p-12 rounded-[2.5rem] relative shadow-2xl flex-1 flex flex-col min-h-0">
                                    {activeJokerMsg && <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#0f172a] px-8 py-3 rounded-full font-black shadow-xl animate-bounce z-50 text-lg whitespace-nowrap">{activeJokerMsg}</div>}
                                    
                                    {/* Zona de pregunta scrolleable */}
                                    <div className="flex-1 overflow-y-auto w-full flex items-center justify-center mb-6 vls-scrollbar pr-2 min-h-[120px] max-h-[40vh] md:max-h-none">
                                        <h2 className="text-2xl md:text-5xl font-black text-center text-white pb-4 leading-tight">{currentQuestion?.text}</h2>
                                    </div>

                                    {/* Zona de botones fija */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
                                        {shuffledOptions.map((opt, i) => (
                                            <button key={i} disabled={hiddenOptions.includes(i) || isAnswered} onClick={() => handleAnswer(i)}
                                                className={`p-4 md:p-7 text-left rounded-2xl border-2 transition-all font-bold text-lg md:text-2xl flex items-center ${
                                                    hiddenOptions.includes(i) ? 'opacity-0 pointer-events-none' :
                                                    selectedOpt === i ? (i === correctIdxForUI ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'border-red-500 bg-red-500/20') : 
                                                    'border-white/10 hover:border-[#FFD700]/60 bg-black/50 hover:bg-white/5'
                                                }`}
                                            >
                                                <div className="w-full text-center md:text-left">{opt}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {gameState === 'interstitial' && (
                            <motion.div key="interstitial" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full max-w-5xl vls-glass-panel p-12 rounded-[3rem] flex flex-col items-center mx-auto">
                                <div className="flex items-center gap-4 mb-8 text-emerald-400">
                                    <CheckCircle size={50} />
                                    <h2 className="text-4xl font-black tracking-tight">¡Correcto!</h2>
                                </div>
                                <div className="relative aspect-[21/9] w-full bg-[#020617] rounded-[2rem] overflow-hidden border-[3px] border-[#FFD700]/50 mb-10 shadow-2xl">
                                    <img src={getInterstitialImage()} className="w-full h-full object-cover" alt="Info" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-10 text-left">
                                        <p className="text-sm text-[#FFD700] uppercase font-bold flex items-center gap-2 mb-2"><Info size={16}/> Sintonía con el Patrimonio:</p>
                                        <p className="text-2xl md:text-3xl font-bold text-white/95">{currentQuestion.explanation}</p>
                                    </div>
                                </div>
                                <button onClick={proceedToNextQuestion} className="px-14 py-5 bg-white text-[#0f172a] font-black text-2xl rounded-full hover:bg-[#FFD700] transition-all">AVANZAR TRANSMISIÓN</button>
                            </motion.div>
                        )}

                        {gameState === 'lost' && (
                            <motion.div className="text-center vls-glass-panel p-20 rounded-[3rem] mx-auto flex flex-col items-center">
                                <WifiOff size={100} className="text-red-500 mb-8 animate-pulse" />
                                <h2 className="text-6xl font-black text-red-500 mb-6 uppercase">Señal Perdida</h2>
                                <p className="text-2xl mb-10 text-white/80">Alcanzaste la pregunta {globalQuestionCounter}.</p>
                                <button onClick={() => setGameState('start')} className="px-12 py-5 bg-white text-[#0f172a] font-black text-xl rounded-full">REINTENTAR</button>
                            </motion.div>
                        )}

                        {gameState === 'win_vls' && (
                            <motion.div className="text-center vls-glass-panel p-20 rounded-[3rem] border-4 border-[#FFD700] shadow-[0_0_100px_rgba(255,215,0,0.5)] flex flex-col items-center mx-auto max-w-4xl">
                                <Crown size={120} className="text-[#FFD700] mb-8 animate-bounce" />
                                <h2 className="text-7xl font-black text-[#FFD700] mb-6 drop-shadow-md">MAESTRO VLS</h2>
                                <p className="text-3xl mb-12 font-bold text-white">Has dominado las 50 preguntas del patrimonio.</p>
                                <div className="bg-[#0f172a] border-2 border-[#FFD700] px-10 py-6 rounded-2xl">
                                    <span className="block text-[#FFD700] font-bold mb-3 tracking-widest text-sm">RECOMPENSA FINAL</span>
                                    <span className="text-5xl font-black text-white">+ 10 FICHAS VLS</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="w-[340px] flex flex-col gap-6 relative z-10 h-full shrink-0">
                    <div className="vls-glass-panel p-5 rounded-3xl flex flex-col items-center border-t-4 border-t-blue-500 shadow-xl">
                        <div className="flex justify-between w-full mb-4 items-center">
                            <span className="text-xs font-bold text-blue-400 flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div> BROADCAST CAM</span>
                            <div className="flex gap-2">
                                <button onClick={() => setIsCameraActive(!isCameraActive)} className={`p-2.5 rounded-xl border-2 ${isCameraActive ? 'bg-blue-500/20 text-blue-300' : 'text-white/50'}`}><Camera size={18}/></button>
                                <button onClick={() => setIsVoiceActive(!isVoiceActive)} className={`p-2.5 rounded-xl border-2 ${isVoiceActive ? 'bg-red-500/20 text-red-300' : 'text-white/50'}`}><Mic size={18}/></button>
                            </div>
                        </div>
                        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative">
                            {isCameraActive ? <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video> : <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20"><User size={50}/><span className="text-[10px] mt-2 uppercase font-bold tracking-widest">Offline</span></div>}
                        </div>
                    </div>
                    <div className="vls-glass-panel p-5 rounded-3xl flex-1 flex flex-col border-t-4 border-t-[#FFD700] shadow-xl overflow-hidden">
                        <span className="text-xs font-bold text-[#FFD700] mb-5 flex items-center gap-2 tracking-widest uppercase"><MessageSquare size={16}/> Comentarios en Vivo</span>
                        <div className="flex-1 overflow-y-auto space-y-3 text-[11px] pr-2">
                            {chatMsgs.map((c, i) => (
                                <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <span className="text-blue-400 font-bold">{c.usr}:</span> <span className="text-white/80">{c.msg}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="vls-ticker-wrap bg-[#FFD700]">
                <div className="vls-ticker text-[#0f172a] uppercase">
                    +++ VLS NETWORK BROADCAST +++ GANA 10 FICHAS VLS COMPLETANDO EL RETO +++ TRANSMISIÓN EN VIVO DESDE LA REGIÓN DE COQUIMBO +++ PATRIMONIO E HISTORIA +++ BY VECINOSLASERENA.CL +++
                </div>
            </div>
        </div>
    );
}
