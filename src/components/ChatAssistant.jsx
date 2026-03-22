import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Leaf, Mic, Sliders, Mail, Minimize2, Maximize2, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatAssistant({ onClose, isOpenDefault = false }) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: '¡Hola! Soy **Faro IA**, tu asistente inteligente de ComunaSmart La Serena.<br/><br/>Estoy aquí para ayudarte a cuidar nuestra hermosa ciudad, resolver tus dudas y mantener la armonía de nuestros barrios históricos. ¿En qué te puedo orientar hoy?' }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState(localStorage.getItem('vls_elevenlabs_key') || '');
    const [tempResendKey, setTempResendKey] = useState(localStorage.getItem('vls_resend_key') || '');
    const [tempDeepgramKey, setTempDeepgramKey] = useState(localStorage.getItem('vls_deepgram_key') || '0c3c3298f4c642a77f5d7957de206b14b13ab38e');
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        const handleOpen = () => { setIsOpen(true); setIsMinimized(false); };
        window.addEventListener('open-faro', handleOpen);
        const handleMinimize = () => setIsMinimized(true);
        window.addEventListener('minimize-all', handleMinimize);
        const handleCloseAll = () => setIsOpen(false);
        window.addEventListener('close-all-floating', handleCloseAll);

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'es-CL';
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText(prev => (prev + ' ' + transcript).trim());
                setIsListening(false);
            };
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('open-faro', handleOpen);
            window.removeEventListener('minimize-all', handleMinimize);
            window.removeEventListener('close-all-floating', handleCloseAll);
        };
    }, []);

    useEffect(() => {
        if (isOpen && !isMinimized) scrollToBottom();
    }, [messages, isOpen, isMinimized]);

    const toggleListening = async (e) => {
        e.preventDefault();
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }
        const DG_KEY = localStorage.getItem('vls_deepgram_key') || "0c3c3298f4c642a77f5d7957de206b14b13ab38e";
        if (DG_KEY && navigator.mediaDevices?.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                const socket = new WebSocket('wss://api.deepgram.com/v1/listen?language=es-CL&smart_format=true', ['token', DG_KEY]);
                socket.onopen = () => {
                    setIsListening(true);
                    mediaRecorder.addEventListener('dataavailable', (event) => {
                        if (event.data.size > 0 && socket.readyState === 1) socket.send(event.data);
                    });
                    mediaRecorder.start(250);
                };
                socket.onmessage = (message) => {
                    const received = JSON.parse(message.data);
                    const transcript = received.channel.alternatives[0].transcript;
                    if (transcript && received.is_final) setInputText(prev => (prev + ' ' + transcript).trim());
                };
                socket.onclose = () => {
                    mediaRecorder.stop();
                    stream.getTracks().forEach(t => t.stop());
                    setIsListening(false);
                };
                recognitionRef.current = { stop: () => socket.close() };
            } catch (err) {
                recognitionRef.current?.start();
                setIsListening(true);
            }
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const saveSettings = () => {
        localStorage.setItem('vls_elevenlabs_key', tempKey);
        localStorage.setItem('vls_resend_key', tempResendKey);
        localStorage.setItem('vls_deepgram_key', tempDeepgramKey);
        setShowSettings(false);
    };

    const sendEmailSummary = async () => {
        const RESEND_KEY = localStorage.getItem('vls_resend_key') || "re_BxWBivzx_3CpokEvr9UbCKFzFXyfT3VYn";
        if (!RESEND_KEY) return;
        setIsSendingEmail(true);
        const chatContent = messages.map(m => `<p><strong>${m.sender === 'user' ? 'Vecino' : 'Faro IA'}:</strong> ${m.text}</p>`).join('');
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
                body: JSON.stringify({
                    from: 'Faro IA <onboarding@resend.dev>',
                    to: 'vecinoslaserenachile@gmail.com',
                    subject: `Resumen de Atención Ciudadana - ${new Date().toLocaleDateString()}`,
                    html: `<div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">${chatContent}</div>`
                })
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsSendingEmail(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        const newMsg = { id: Date.now(), sender: 'user', text: inputText };
        setMessages(prev => [...prev, newMsg]);
        setInputText('');
        const loadingId = Date.now() + 1;
        setMessages(prev => [...prev, { id: loadingId, sender: 'operator', text: '...', isLoading: true }]);
        try {
            const GEMINI_KEY = "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs";
            const historyText = messages.slice(-10).map(m => `${m.sender === 'user' ? 'Vecino' : 'Faro'}: ${m.text}`).join('\n');
            const prompt = `ERES "FARO IA", asistente de ComunaSmart VLS. Responde concisamente. Historial:\n${historyText}\nMensaje: "${inputText}"`;
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Disculpa vecino...";
            setMessages(prev => prev.map(msg => msg.id === loadingId ? { id: Date.now(), sender: 'operator', text: reply } : msg));
            // TTS handling...
            const ELEVEN_LABS_KEY = localStorage.getItem('vls_elevenlabs_key') || "sk_cfd875c28d1bd898761dc43244de06c33d4ee1fbb7cb4b06";
            if (ELEVEN_LABS_KEY) {
                fetch(`https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVEN_LABS_KEY },
                    body: JSON.stringify({ text: reply.substring(0, 500), model_id: "eleven_multilingual_v2" })
                }).then(res => res.blob()).then(blob => {
                    const audio = new Audio(URL.createObjectURL(blob));
                    audio.play();
                }).catch(() => {});
            }
        } catch (error) {
            setMessages(prev => prev.map(msg => msg.id === loadingId ? { id: Date.now(), sender: 'operator', text: 'Error.' } : msg));
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    drag={!isMobile}
                    dragMomentum={false}
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        width: isMinimized ? (isMobile ? '60px' : '80px') : (isMobile ? 'calc(100vw - 40px)' : '380px'),
                        height: isMinimized ? (isMobile ? '60px' : '80px') : '500px'
                    }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    style={{
                        position: 'fixed', 
                        bottom: isMobile ? '85px' : '100px', 
                        right: isMobile ? '20px' : '30px', 
                        zIndex: 100000, 
                        overflow: 'hidden',
                        background: 'rgba(15, 23, 42, 0.95)', 
                        backdropFilter: 'blur(20px)',
                        borderRadius: isMinimized ? '50%' : '24px',
                        border: '2px solid #10b981',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        display: 'flex', flexDirection: 'column'
                    }}
                >
                    {isMinimized ? (
                        <button 
                            onClick={() => setIsMinimized(false)}
                            style={{ width: '100%', height: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', cursor: 'pointer' }}
                        >
                            <Bot size={isMobile ? 30 : 40} className="pulse" />
                        </button>
                    ) : (
                        <>
                            <div style={{ padding: '1rem', background: 'linear-gradient(90deg, #0f172a, #065f46)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'grab' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Bot size={20} color="#10b981" />
                                    <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900 }}>FARO IA</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {!isMobile && <Move size={16} color="#94a3b8" />}
                                    <button onClick={() => setIsMinimized(true)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><Minimize2 size={18} /></button>
                                    <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={18} /></button>
                                </div>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {messages.map(msg => (
                                    <div key={msg.id} style={{
                                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%', padding: '0.8rem 1rem',
                                        background: msg.sender === 'user' ? '#10b981' : 'rgba(255,255,255,0.05)',
                                        borderRadius: '18px', fontSize: '0.9rem', color: msg.sender === 'user' ? 'white' : '#cbd5e1',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                                    }}>
                                        <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', gap: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={toggleListening} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <Mic size={20} color={isListening ? "#ef4444" : "#94a3b8"} className={isListening ? "pulse" : ""} />
                                    </button>
                                    <input
                                        type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                                        placeholder={isListening ? "Escuchando..." : "Consulta a Faro..."}
                                        style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.9rem' }}
                                    />
                                </div>
                                <button type="submit" style={{ padding: '0.7rem', borderRadius: '50%', background: '#10b981', border: 'none', color: 'white', cursor: 'pointer' }}>
                                    <Send size={20} />
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
