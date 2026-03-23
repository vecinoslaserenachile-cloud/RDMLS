import React, { useState, useEffect, useRef } from 'react';
import { 
    X as CloseIcon, Radio, MessageSquare, 
    Lightbulb, Scale, Mic, Settings,
    ChevronUp, ChevronDown, Eraser,
    Search, Map, Bell, Wifi, Activity,
    Music, Share2, ShieldCheck,
    Twitter, Facebook, Instagram,
    Calendar, Rocket,
    Brain, Volume2, VolumeX, Sparkles, Send, Loader2, Play, Pause, SkipForward, SkipBack, Minimize2, Move, Download, Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SONGS = [
    { title: "Tecno 6 sombreros", url: "https://cdn1.suno.ai/af1b2a23-ba3a-4567-8ea8-39610eae5687.mp3", hat: "Blanco", duration: "03:45" },
    { title: "La cumbia de los seis sombreros", url: "https://cdn1.suno.ai/11f63327-2259-47d3-a7b0-3e297506cda2.mp3", hat: "Rojo", duration: "04:12" },
    { title: "6 sombreros de Martin", url: "https://cdn1.suno.ai/641895c9-d926-44f9-bfc0-3e1a51b4ce79.mp3", hat: "Negro", duration: "02:58" },
    { title: "Sombrero regalón", url: "https://cdn1.suno.ai/89aeafca-fe78-458d-8158-ebbea176e03d.mp3", hat: "Amarillo", duration: "03:20" },
    { title: "Blusero del jazz con sombreros", url: "https://cdn1.suno.ai/4e422386-bff5-49b3-93fb-6d1287fe7376.mp3", hat: "Verde", duration: "04:05" },
    { title: "Todos podemos pensar con 6 sombreros", url: "https://cdn1.suno.ai/6e6d5622-927d-4b3a-a103-9d10804a276b.mp3", hat: "Azul", duration: "03:50" },
    { title: "Cámbiate el sombrero (Mashup)", url: "https://cdn1.suno.ai/9f6d7f2a-f8c4-41d2-b1f9-6ec3541bc4ad.mp3", hat: "Multi", duration: "03:15" },
    { title: "Piensa lateral sombreros blues", url: "https://cdn1.suno.ai/9948997f-f3cb-4e62-9ee0-ec37d683059b.mp3", hat: "Multi", duration: "02:45" }
];

const HATS = [
    { id: 'white', color: '#ffffff', accent: '#38bdf8', title: 'BLANCO', sub: 'Datos y Objetividad', script: 'Soy el Sombrero Blanco. Solo veo datos y hechos. ¿Cuántos vecinos somos? ¿Cuál es el presupuesto? Sin emociones, solo la verdad técnica.', songIdx: 0 },
    { id: 'red', color: '#ef4444', accent: '#f87171', title: 'ROJO', sub: 'Emociones e Intuición', script: '¡Hola! Soy el Sombrero Rojo. Aquí valen las corazonadas. Lo que sientes es lo más importante para nuestra comunidad hoy.', songIdx: 1 },
    { id: 'black', color: '#1e293b', accent: '#64748b', title: 'NEGRO', sub: 'Juicio Crítico y Riesgos', script: 'Atención. Soy el Sombrero Negro. ¿Qué podría salir mal? Protejo a La Serena identificando peligros antes de actuar.', songIdx: 2 },
    { id: 'yellow', color: '#facc15', accent: '#fbbf24', title: 'AMARILLO', sub: 'Optimismo y Beneficios', script: '¡Todo es posible! Soy el Sombrero Amarillo. Busco los beneficios y el valor positivo de cada idea vecinal.', songIdx: 3 },
    { id: 'green', color: '#22c55e', accent: '#4ade80', title: 'VERDE', sub: 'Creatividad y Alternativas', script: '¡Imagina! Soy el Sombrero Verde. Busco nuevas ideas y soluciones creativas que transformen La Serena.', songIdx: 4 },
    { id: 'blue', color: '#3b82f6', accent: '#60a5fa', title: 'AZUL', sub: 'Control y Dirección', script: 'Soy el Sombrero Azul, el director. Organizo el pensamiento y defino los pasos a seguir para que todo funcione.', songIdx: 5 }
];

export default function DeBonoThinkingHats({ onClose = () => window.history.back() }) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [idea, setIdea] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [customScripts, setCustomScripts] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [audioProgress, setAudioProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");

    const musicRef = useRef(new Audio());

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        const handleStop = () => {
            musicRef.current.pause();
            setIsPlaying(false);
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        };

        window.addEventListener('vls-stop-hats', handleStop);
        window.addEventListener('stop-all-audio', handleStop);
        window.addEventListener('minimize-all', () => setIsMinimized(true));
        window.addEventListener('close-all-floating', onClose);

        window.dispatchEvent(new CustomEvent('radio-pause'));
        
        const audio = musicRef.current;
        const updateProgress = () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            setAudioProgress(progress || 0);
            
            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60);
            setCurrentTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        };

        audio.addEventListener('timeupdate', updateProgress);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('vls-stop-hats', handleStop);
            window.removeEventListener('stop-all-audio', handleStop);
            window.dispatchEvent(new CustomEvent('radio-resume'));
            audio.removeEventListener('timeupdate', updateProgress);
            audio.pause();
            window.speechSynthesis.cancel();
        };
    }, [onClose]);

    const hat = HATS[activeIdx];
    const script = customScripts && customScripts[hat.id] ? customScripts[hat.id] : hat.script;

    const playPromiseRef = useRef(null);

    const toggleMusic = async (idx) => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') await ctx.resume();

            if (idx === activeIdx && isPlaying) {
                // Esperar promise activo antes de pausar
                if (playPromiseRef.current) {
                    await playPromiseRef.current.catch(() => {});
                }
                musicRef.current.pause();
                setIsPlaying(false);
            } else {
                // Pausar limpiamente antes de cambiar track
                if (playPromiseRef.current) {
                    await playPromiseRef.current.catch(() => {});
                }
                musicRef.current.pause();
                setActiveIdx(idx);
                setIsPlaying(false);
                const directUrl = SONGS[idx].url;
                musicRef.current.src = directUrl;
                musicRef.current.load();
                playPromiseRef.current = musicRef.current.play();
                await playPromiseRef.current;
                setIsPlaying(true);
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.warn("Lab audio:", err.message);
            }
            setIsPlaying(false);
        }
    };

    const speak = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }
        setIsSpeaking(true);
        const utter = new SpeechSynthesisUtterance(script);
        utter.lang = 'es-CL';
        utter.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utter);
    };

    const analyze = async () => {
        if (!idea.trim()) return;
        setIsAnalyzing(true);
        try {
            const key = "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs";
            const prompt = `Analiza esta propuesta vecinal usando la técnica de los 6 Sombreros de De Bono: "${idea}". Responde con un objeto JSON con las llaves: white, red, black, yellow, green, blue.`;
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { response_mime_type: "application/json" } })
            });
            const data = await res.json();
            const rawText = data.candidates[0].content.parts[0].text;
            setCustomScripts(JSON.parse(rawText));
            setActiveIdx(0);
        } catch (e) {
            console.error(e);
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const downloadAnalysis = () => {
        if (!customScripts) return alert("Primero debes analizar tu propuesta.");
        const content = `
VLS SMART CITY - ANÁLISIS 6 SOMBREROS (DE BONO)
-----------------------------------------------
PROPUESTA: ${idea}
FECHA: ${new Date().toLocaleString()}

${HATS.map(h => `${h.title} (${h.sub}):\n${customScripts[h.id] || h.script}\n`).join('\n')}
-----------------------------------------------
ComunaSmart 2026 - Innovación Regional
        `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vls_analisis_${new Date().getTime()}.txt`;
        a.click();
    };

    const openContribution = () => {
        setIsMinimized(true);
        window.dispatchEvent(new CustomEvent('open-review-portal'));
    };

    const [showCanvas, setShowCanvas] = useState(false);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushColor, setBrushColor] = useState('#38bdf8');

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');
        const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
        const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const downloadCanvas = () => {
        const link = document.createElement('a');
        link.download = `vls_diseño_${new Date().getTime()}.png`;
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    return (
        <AnimatePresence>
            <motion.div 
                drag={isMinimized && !isMobile}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    inset: isMinimized ? 'auto' : 0,
                    bottom: isMinimized ? (isMobile ? '160px' : '180px') : 0,
                    right: isMinimized ? (isMobile ? '20px' : '30px') : 0,
                    width: isMinimized ? (isMobile ? '60px' : '80px') : '100%',
                    height: isMinimized ? (isMobile ? '60px' : '80px') : '100%',
                    borderRadius: isMinimized ? '50%' : '0'
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                    position: 'fixed', zIndex: 100080, background: '#020617', 
                    display: 'flex', flexDirection: 'column', color: 'white', 
                    fontFamily: "'Outfit', sans-serif", overflow: 'hidden',
                    boxShadow: isMinimized ? '0 0 30px rgba(56, 189, 248, 0.5)' : 'none',
                    border: isMinimized ? '2px solid #38bdf8' : 'none'
                }}
            >
                {isMinimized ? (
                    <button 
                        onClick={() => setIsMinimized(false)}
                        style={{ width: '100%', height: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', cursor: 'pointer' }}
                    >
                        <Brain size={isMobile ? 30 : 40} className="pulse" />
                    </button>
                ) : (
                    <>
                        <header style={{ 
                            padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)' 
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Brain size={24} color={hat.accent} />
                                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>VLS: LABORATORIO DE IDEAS</h3>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setIsMinimized(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }} title="Minimizar"><Minimize2 size={20} /></button>
                                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Cerrar"><CloseIcon size={20} /></button>
                            </div>
                        </header>

                        <main style={{ 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: isMobile ? 'column' : 'row', 
                            gap: '2rem', 
                            padding: isMobile ? '1rem' : '2.5rem', 
                            overflowY: 'auto',
                            maxHeight: isMobile ? 'none' : 'calc(100vh - 80px)',
                            background: `radial-gradient(circle at 70% 30%, ${hat.accent}15 0%, transparent 70%)`
                        }}>
                            {/* Left Column: Media & Selection */}
                            <div style={{ flex: isMobile ? 'none' : '1.5', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ 
                                    width: '100%',
                                    aspectRatio: '3 / 2',
                                    borderRadius: '32px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    background: '#000',
                                    boxShadow: `0 30px 60px -15px ${hat.accent}44`,
                                    border: `2px solid ${hat.accent}33`,
                                    zIndex: 1
                                }}>
                                    {showCanvas ? (
                                        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff' }}>
                                            <canvas 
                                                ref={canvasRef} 
                                                width={1200} height={675} 
                                                onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                                                onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                                                style={{ width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }} 
                                            />
                                            <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
                                                {HATS.map(h => (
                                                    <button key={h.id} onClick={() => setBrushColor(h.color === '#ffffff' ? '#000' : h.color)} style={{ width: '35px', height: '35px', borderRadius: '50%', background: h.color, border: brushColor === (h.color === '#ffffff' ? '#000' : h.color) ? '3px solid #38bdf8' : '1px solid #ccc', cursor: 'pointer', transition: '0.2s' }} />
                                                ))}
                                                <button onClick={clearCanvas} style={{ background: '#ef4444', border: 'none', color: 'white', padding: '10px', borderRadius: '12px', cursor: 'pointer', marginTop: '10px' }}><Eraser size={20} /></button>
                                            </div>
                                            <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                                                <button onClick={downloadCanvas} className="btn btn-primary" style={{ background: '#38bdf8', color: '#000', borderRadius: '12px', padding: '12px 24px', fontWeight: '900', fontSize: '0.9rem' }}>DESCARGAR BOCETO VLS</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <video 
                                                src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/RDMLS/main/assets/models/seis_sombreros_para_prensar_serenito.mp4" 
                                                autoPlay muted loop playsInline 
                                                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'contrast(1.1)' }} 
                                                onLoadedData={() => console.log("Video VLS cargado correctamente")}
                                                onError={(e) => console.error("Fallo carga video VLS", e)}
                                            />
                                            {/* Sombrero Overlay para que se note el color */}
                                            <div style={{ position: 'absolute', top: '20px', left: '20px', background: hat.accent, color: hat.id === 'white' ? '#000' : '#fff', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '900', fontSize: '1.2rem', boxShadow: `0 10px 30px ${hat.accent}88`, border: '2px solid white', zIndex: 10 }}>
                                                SOMBRERO {hat.title}
                                            </div>
                                            {/* 3D Hat Visualization Reference */}
                                            <div style={{ 
                                                position: 'absolute', top: '20px', right: '20px', 
                                                width: '100px', height: '100px', 
                                                borderRadius: '20px', overflow: 'hidden', 
                                                border: '2px solid rgba(255,255,255,0.2)',
                                                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)',
                                                zIndex: 10
                                            }}>
                                                <img 
                                                    src="file:///C:/Users/estud/.gemini/antigravity/brain/642dc90b-b3aa-4982-97e1-679134a8ef55/six_3d_thinking_hats_vls_1774126847642.png" 
                                                    alt="Thinking Hat 3D"
                                                    style={{ width: '200%', height: '200%', objectFit: 'cover', transform: 'translate(-25%, -25%)' }}
                                                />
                                            </div>

                                                <div style={{ 
                                                    position: 'absolute', 
                                                    bottom: '0', left: '0', right: '0', 
                                                    padding: isMobile ? '1.5rem' : '2.5rem', 
                                                    background: 'linear-gradient(to top, rgba(2, 6, 23, 0.98), transparent)', 
                                                    zIndex: 2
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', color: hat.accent, fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '2px' }}>MODO DE PENSAMIENTO: {hat.title}</div>
                                                    <h4 style={{ fontSize: isMobile ? '1.5rem' : '2.2rem', margin: '0 0 1rem 0', color: 'white', fontWeight: 900 }}>{hat.sub}</h4>
                                                    
                                                    {/* REPRODUCTOR PROPIO VLS */}
                                                    <div style={{ 
                                                        background: 'rgba(255,255,255,0.05)', 
                                                        borderRadius: '24px', 
                                                        padding: '1rem', 
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        marginBottom: '1rem',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '10px'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <Music size={16} color="#fbbf24" />
                                                                <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{SONGS[activeIdx].title}</div>
                                                            </div>
                                                            <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{currentTime} / {SONGS[activeIdx].duration}</div>
                                                        </div>
                                                        <div style={{ h: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                            <div style={{ width: `${audioProgress}%`, height: '100%', background: '#fbbf24', transition: '0.1s' }} />
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                        <button 
                                                            onClick={speak} 
                                                            className="btn-primary" 
                                                            style={{ 
                                                                flex: 1, 
                                                                background: hat.id === 'green' ? '#22c55e' : (hat.id === 'white' ? '#fff' : hat.accent), 
                                                                color: hat.id === 'white' ? '#000' : '#fff', 
                                                                borderRadius: '16px', 
                                                                padding: isMobile ? '0.8rem' : '1.2rem', 
                                                                fontWeight: 'bold', 
                                                                fontSize: isMobile ? '0.8rem' : '1.1rem', 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                justifyContent: 'center', 
                                                                gap: '10px', 
                                                                border: 'none', 
                                                                cursor: 'pointer' 
                                                            }}
                                                        >
                                                            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                                            {isSpeaking ? 'DETENER RELATO' : 'ESCUCHAR SOMBRERO'}
                                                        </button>
                                                        <button 
                                                            onClick={() => toggleMusic(activeIdx)}
                                                            style={{ 
                                                                width: isMobile ? '48px' : '64px', height: isMobile ? '48px' : '64px', borderRadius: '18px', background: '#fbbf24', 
                                                                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                                cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                                            }}
                                                        >
                                                            {isPlaying ? <Pause size={isMobile ? 24 : 30} color="black" /> : <Play size={isMobile ? 24 : 30} color="black" style={{ marginLeft: '4px' }} />}
                                                        </button>
                                                        <button 
                                                            onClick={() => toggleMusic((activeIdx + 1) % SONGS.length)}
                                                            style={{ 
                                                                width: isMobile ? '48px' : '48px', height: isMobile ? '48px' : '48px', borderRadius: '18px', background: 'rgba(255,255,255,0.1)', 
                                                                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                                                cursor: 'pointer'
                                                            }}
                                                            title="Siguiente Canción"
                                                        >
                                                            <SkipForward size={20} color="white" />
                                                        </button>
                                                    </div>
                                                </div>
                                        </>
                                    )}
                                </div>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' }}>
                                    {HATS.map((h, i) => (
                                        <button 
                                            key={h.id} 
                                            onClick={() => toggleMusic(i)}
                                            style={{ 
                                                height: '80px', borderRadius: '20px', background: activeIdx === i ? h.accent : 'rgba(255,255,255,0.05)',
                                                border: `2px solid ${activeIdx === i ? h.accent : 'rgba(255,255,255,0.1)'}`, color: activeIdx === i ? (h.id === 'white' ? '#000' : '#fff') : '#94a3b8',
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                                cursor: 'pointer', transition: '0.3s',
                                                boxShadow: activeIdx === i ? `0 15px 30px ${h.accent}33` : 'none'
                                            }}
                                        >
                                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: h.color, border: '1px solid rgba(255,255,255,0.2)' }} />
                                            <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>{h.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Analysis & Logic */}
                            <div style={{ flex: isMobile ? 'none' : '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '20px' }}>
                                    <button 
                                        onClick={() => setShowCanvas(false)} 
                                        style={{ flex: 1, padding: '12px', borderRadius: '15px', background: !showCanvas ? '#38bdf8' : 'transparent', color: !showCanvas ? '#000' : '#94a3b8', border: 'none', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', transition: '0.3s' }}
                                    >
                                        PENSAMIENTO IA
                                    </button>
                                    <button 
                                        onClick={() => setShowCanvas(true)} 
                                        style={{ flex: 1, padding: '12px', borderRadius: '15px', background: showCanvas ? '#ec4899' : 'transparent', color: showCanvas ? '#fff' : '#94a3b8', border: 'none', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', transition: '0.3s' }}
                                    >
                                        BOCETO ESTRATÉGICO
                                    </button>
                                </div>

                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                                    {!showCanvas ? (
                                        <>
                                            <div style={{ padding: '25px', borderRadius: '32px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                                    <Sparkles size={18} color="#38bdf8" />
                                                    <label style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Entrada de la Propuesta</label>
                                                </div>
                                                <textarea value={idea} onChange={(e)=>setIdea(e.target.value)} placeholder="Ej: Nueva ciclovía sobre la Avenida del Mar..." style={{ width: '100%', height: '120px', background: 'rgba(2, 6, 23, 0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '18px', color: 'white', resize: 'none', fontSize: '1.1rem', outline: 'none', lineHeight: '1.5' }} />
                                                <button onClick={analyze} disabled={isAnalyzing} style={{ width: '100%', marginTop: '15px', padding: '1.2rem', borderRadius: '18px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', color: 'white', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', border: 'none', boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)' }}>
                                                    {isAnalyzing ? (
                                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                            <Loader2 className="animate-spin" size={20} /> ANALIZANDO ESCENARIO...
                                                        </span>
                                                    ) : 'RECALCULAR ANÁLISIS VLS'}
                                                </button>
                                            </div>

                                            <div style={{ flex: 1, padding: '30px', borderRadius: '32px', background: `linear-gradient(135deg, ${hat.accent}11, rgba(2, 6, 23, 0.8))`, border: `1px solid ${hat.accent}33`, position: 'relative', overflowY: 'auto' }}>
                                                <div style={{ position: 'absolute', top: '20px', right: '25px' }}><Radio size={24} color={hat.accent} className="pulse" /></div>
                                                <p style={{ margin: 0, fontSize: '1.25rem', lineHeight: '1.8', color: '#f8fafc', fontWeight: '500' }}>
                                                    "{script}"
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div style={{ flex: 1, padding: '30px', borderRadius: '32px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                                <Edit3 size={40} color="#ec4899" />
                                            </div>
                                            <h4 style={{ margin: 0, color: '#ec4899', fontSize: '1.6rem', fontWeight: 900 }}>Boceto de Visión</h4>
                                            <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6' }}>
                                                Use el espacio de dibujo para plasmar gráficamente cómo se ve su idea. Los colores de los sombreros le ayudan a organizar capas de información.
                                            </p>
                                            <div style={{ marginTop: 'auto', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', fontSize: '0.9rem', color: '#fcd34d' }}>
                                                TIP: El sombrero VERDE para la base creativa, el AZUL para los límites de gestión.
                                            </div>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button 
                                            onClick={downloadAnalysis}
                                            disabled={!customScripts}
                                            style={{ flex: 1, padding: '1.2rem', borderRadius: '18px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: !customScripts ? 'not-allowed' : 'pointer', transition: '0.3s' }}
                                        >
                                            <Download size={20} /> INFORME TXT
                                        </button>
                                        <button 
                                            onClick={openContribution}
                                            style={{ flex: 1, padding: '1.2rem', borderRadius: '18px', background: '#38bdf8', border: 'none', color: '#000', fontSize: '0.9rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(56,189,248,0.3)' }}
                                        >
                                            <Sparkles size={20} /> ENVIAR A REVISIÓN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </>
                )}
            </motion.div>
            <style>{`
                .pulse { animation: pulse_k 1s infinite alternate; }
                @keyframes pulse_k { from { opacity: 0.5; transform: scale(0.95); } to { opacity: 1; transform: scale(1.05); } }
            `}</style>
        </AnimatePresence>
    );
}
