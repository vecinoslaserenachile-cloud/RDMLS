import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, Send, Play, Square, Volume2, Radio, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * RadioIntercom: El Intercomunicador de RDMLS.
 * Permite a los vecinos grabar mensajes de voz y enviarlos a la cabina de radio.
 */
const RadioIntercom = ({ onClose }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            };

            // Audio Visualizer Setup
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 256;
            
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            mediaRecorder.start();
            setIsRecording(true);
            setAudioUrl(null);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

            drawVisualizer();
        } catch (err) {
            console.error("No se pudo acceder al micrófono:", err);
            alert("Necesitas permitir el acceso al micrófono para usar el intercomunicador.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            clearInterval(timerRef.current);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        }
    };

    const drawVisualizer = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            animationFrameRef.current = requestAnimationFrame(renderFrame);
            analyserRef.current.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                ctx.fillStyle = `rgb(248, 113, 113)`; // red-400
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };

        renderFrame();
    };

    const handleSend = () => {
        setIsSending(true);
        // Simular envío a la radio RDMLS
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);
            setTimeout(() => onClose(), 2000);
        }, 2000);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[110000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-md bg-[#0f172a] border border-red-500/30 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header Estilo Radio */}
                <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Radio size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-xl tracking-tighter uppercase italic">RDMLS INTERCOM</h3>
                            <p className="text-red-100 text-[10px] font-bold tracking-widest uppercase opacity-70">Cabina de Transmisión Directa</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8">
                    {!isSent ? (
                        <div className="flex flex-col items-center gap-8">
                            {/* Pantalla del Record/Visualizer */}
                            <div className="w-full aspect-video bg-black/40 rounded-2xl border border-white/5 p-4 relative overflow-hidden flex flex-col items-center justify-center">
                                {isRecording ? (
                                    <>
                                        <canvas ref={canvasRef} className="w-full h-24" />
                                        <div className="mt-4 flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-2xl font-mono text-red-400 font-bold">{formatTime(recordingTime)}</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2">Grabando Mensaje para el Aire</p>
                                    </>
                                ) : audioUrl ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                                            <Play size={32} className="text-green-400 ml-1" />
                                        </div>
                                        <audio src={audioUrl} controls className="w-full h-10 opacity-70" />
                                        <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Mensaje Listo para Enviar</p>
                                    </div>
                                ) : (
                                    <div className="text-center opacity-40">
                                        <Mic size={48} className="mx-auto mb-4 text-gray-500" />
                                        <p className="text-sm font-bold text-gray-400">Pulsa el botón para grabar</p>
                                    </div>
                                )}
                            </div>

                            {/* Controles */}
                            <div className="flex items-center gap-6">
                                {!isRecording && !audioUrl && (
                                    <button 
                                        onClick={startRecording}
                                        className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-lg shadow-red-600/20 transition-all border-4 border-white/10 group active:scale-95"
                                    >
                                        <Mic size={32} className="text-white group-hover:scale-110 transition-transform" />
                                    </button>
                                )}

                                {isRecording && (
                                    <button 
                                        onClick={stopRecording}
                                        className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center shadow-lg transition-all border-4 border-red-600 active:scale-95"
                                    >
                                        <Square size={32} className="text-red-600" />
                                    </button>
                                )}

                                {audioUrl && !isRecording && (
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => { setAudioUrl(null); setRecordingTime(0); }}
                                            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-sm border border-white/10 transition-all"
                                        >
                                            BORRAR
                                        </button>
                                        <button 
                                            onClick={handleSend}
                                            disabled={isSending}
                                            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-xl shadow-red-600/20 transition-all flex items-center gap-2 border border-white/10"
                                        >
                                            {isSending ? (
                                                <>ENVIANDO...</>
                                            ) : (
                                                <><Send size={18} /> ENVIAR A CABINA</>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <p className="text-[11px] text-gray-500 text-center leading-relaxed max-w-[280px]">
                                Los mensajes pasan por moderación automática antes de salir al aire en <span className="text-red-400 font-bold">RDMLS.cl</span>
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 rounded-full bg-green-600/20 flex items-center justify-center border-2 border-green-500 mb-6">
                                <Send size={48} className="text-green-500 animate-bounce" />
                            </div>
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">¡MENSAJE EN CABINA!</h4>
                            <p className="text-gray-400 text-sm">Tu audio está en la cola de reproducción de RDMLS.<br/>¡Atento a la señal en vivo!</p>
                        </div>
                    )}
                </div>

                {/* Footer Decorativo */}
                <div className="bg-black/40 p-4 border-t border-white/5 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 opacity-30">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">LIVE SIGNAL 95.9 FM / WEB</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RadioIntercom;
