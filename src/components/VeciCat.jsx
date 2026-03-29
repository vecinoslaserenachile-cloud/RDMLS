import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cat, Mic, MicOff, Volume2, 
    ShieldAlert, X, Share2, 
    History, Trash2, Ghost,
    Sparkles, Heart, Zap, Info, ArrowRight
} from 'lucide-react';

/**
 * VeciCat: Traductor de Maullidos con IA
 * Pilar #1: Smart Citizens (Atención Ciudadana)
 * Integra Cloudflare Workers AI, R2 y D1.
 */
const VeciCat = ({ onClose, userData }) => {
    const [recording, setRecording] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [logs, setLogs] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    // Serenito 3D Persona reactions based on mood
    const MOOD_EMOJIS = {
        hungry: '🥑',
        curious: '🔭',
        affectionate: '🧡',
        alert: '🚨',
        happy: '🎉',
        energetic: '🏃'
    };

    const startRecording = async () => {
        setError(null);
        setResult(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunks.current.push(e.data);
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                await sendToAI(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.current.start();
            setRecording(true);
        } catch (err) {
            setError('Acceso al micrófono denegado o no disponible.');
            console.error('Audio capture error:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && recording) {
            mediaRecorder.current.stop();
            setRecording(false);
        }
    };

    const sendToAI = async (blob) => {
        setIsProcessing(true);
        const formData = new FormData();
        formData.append('audio', blob, 'meow.wav');
        formData.append('catName', userData?.catName || 'Michi Vecino');
        formData.append('coords', userData?.location || '-29.9027,-71.2520'); // La Serena Center

        try {
            const response = await fetch('/api/translate', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Error en el servidor de IA.');

            const data = await response.json();
            setResult(data);
            
            // Add to local history
            setLogs(prev => [{
                id: Date.now(),
                translation: data.translation,
                mood: data.mood,
                time: new Date().toLocaleTimeString()
            }, ...prev]);

        } catch (err) {
            setError('No pudimos conectar con el motor de IA de Cloudflare.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
                <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/50 rounded-[2.5rem] shadow-2xl shadow-orange-500/10 overflow-hidden flex flex-col md:flex-row">
                    
                    {/* LEFT PANEL: 3D CHARACTER & RECORDING */}
                    <div className="w-full md:w-[45%] bg-gradient-to-b from-orange-500/20 to-slate-900 p-8 flex flex-col items-center justify-between min-h-[400px]">
                        <div className="w-full flex justify-between items-center text-orange-500">
                            <Cat size={24} className="animate-bounce" />
                            <span className="text-[10px] font-black uppercase tracking-[3px] opacity-70">Antigravity V2</span>
                        </div>

                        {/* 3D AVATAR REPRESENTATION */}
                        <div className="relative group">
                            <motion.div 
                                animate={recording ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className={`w-48 h-48 rounded-full flex items-center justify-center border-4 ${recording ? 'border-red-500 shadow-lg shadow-red-500/30' : 'border-orange-500 shadow-lg shadow-orange-500/20'} bg-slate-800 transition-all`}
                            >
                                <span className="text-8xl select-none group-hover:scale-110 transition-transform cursor-pointer">
                                    {result ? MOOD_EMOJIS[result.mood] || '🐱' : (recording ? '🎙️' : '🐱')}
                                </span>
                            </motion.div>
                            {recording && (
                                <div className="absolute -inset-4 rounded-full border border-red-500 animate-ping opacity-30 pointer-events-none" />
                            )}
                        </div>

                        <button 
                            onClick={recording ? stopRecording : startRecording}
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 ${
                                recording 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'bg-orange-500 hover:bg-orange-600 text-slate-950 hover:shadow-xl hover:shadow-orange-500/20'
                            }`}
                        >
                            {recording ? (
                                <> <MicOff size={18} /> Detener </>
                            ) : (
                                <> <Mic size={18} /> Grabar Miau </>
                            )}
                        </button>
                    </div>

                    {/* RIGHT PANEL: RESULTS & INFO */}
                    <div className="flex-1 p-8 bg-slate-900 flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-white italic">Veci<span className="text-orange-500">Cat</span></h2>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Traductor Smart Citizens VLS</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col gap-6">
                            {isProcessing ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                                    <p className="text-sm font-bold text-orange-500 uppercase animate-pulse">Consultando Red de IA Cloudflare...</p>
                                </div>
                            ) : result ? (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex-1 space-y-6"
                                >
                                    <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-3xl relative overflow-hidden">
                                        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Sparkles size={12} /> Traducción Detectada
                                        </div>
                                        <p className="text-2xl font-black text-white leading-tight">
                                            "{result.translation}"
                                        </p>
                                        <Cat className="absolute -right-4 -bottom-4 text-orange-500/10 w-24 h-24 rotate-12" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 font-bold uppercase text-[10px]">
                                        <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5 flex flex-col gap-1">
                                            <span className="text-slate-500">Sentimiento</span>
                                            <span className="text-orange-400">{result.mood}</span>
                                        </div>
                                        <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5 flex flex-col gap-1 text-right">
                                            <span className="text-slate-500">Barrio</span>
                                            <span className="text-white">La Serena</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => setShowHistory(!showHistory)}
                                        className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-[10px] font-black uppercase flex items-center justify-center gap-2 text-slate-400"
                                    >
                                        <History size={14} /> {showHistory ? 'Ocultar' : 'Ver'} Historial de maullidos
                                    </button>
                                </motion.div>
                            ) : error ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-red-500/10 border border-red-500/20 rounded-3xl">
                                    <ShieldAlert size={40} className="text-red-500 mb-2" />
                                    <p className="text-red-400 font-bold text-sm leading-relaxed">{error}</p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/10 rounded-3xl text-slate-500">
                                    <Volume2 size={40} className="mb-4 opacity-20" />
                                    <p className="text-sm font-medium leading-relaxed max-w-[200px]">
                                        Presiona el botón naranja para capturar el maullido de tu gato.
                                    </p>
                                </div>
                            )}

                            {showHistory && logs.length > 0 && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    className="pt-4 border-t border-white/10 space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar"
                                >
                                    {logs.map(log => (
                                        <div key={log.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg text-[10px]">
                                            <span className="font-bold text-slate-300">"{log.translation.substring(0, 25)}..."</span>
                                            <span className="text-slate-600 font-mono tracking-tighter">{log.time}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Cloudflare Edge Node Online</span>
                            </div>
                            <Info size={14} className="text-slate-700 cursor-help" />
                        </div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VeciCat;
