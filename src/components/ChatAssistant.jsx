import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Leaf, Mic, Sliders, Mail, Minimize2, Maximize2, Move, Download, FileText, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatAssistant({ onClose, isOpenDefault = false }) {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const host = window.location.hostname.toLowerCase();
    const isRDMLS = host.includes('rdmls');
    
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('vls_chat_history');
        if (saved) return JSON.parse(saved);
        return [
            { 
                id: Date.now(), 
                sender: 'bot', 
                text: isRDMLS 
                    ? '¡Hola! Soy **Faro IA**, tu asistente inteligente del **Portal RDMLS.cl**.<br/><br/>Estoy aquí para apoyarte en la gestión municipal, consultas técnicas y soporte de plataforma regional. ¿En qué puedo asistirte hoy?'
                    : '¡Hola! Soy **Faro IA**, tu asistente inteligente de **ComunaSmart La Serena**.<br/><br/>Estoy aquí para ayudarte a cuidar nuestra hermosa ciudad, resolver tus dudas y mantener la armonía de nuestros barrios históricos. ¿En qué te puedo orientar hoy?' 
            }
        ];
    });

    // Guardar historial en localStorage cada vez que cambien los mensajes
    useEffect(() => {
        localStorage.setItem('vls_chat_history', JSON.stringify(messages));
    }, [messages]);
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

        // ESCUCHA DE NOTIFICACIONES PUSH PARA EL CHAT (Dato Real solicitado por el usuario)
        const handlePushNotification = (e) => {
            if (e.detail && e.detail.text) {
                const newMessage = {
                    id: Date.now(),
                    sender: 'bot',
                    text: `📢 **NOTIFICACIÓN VECINAL:**<br/>${e.detail.text}`,
                    isPush: true
                };
                setMessages(prev => [...prev, newMessage]);
                setIsOpen(true); // Abrimos el chat para que el vecino lo vea
                setIsMinimized(false);
            }
        };
        window.addEventListener('vls-push-notification', handlePushNotification);

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

    const handleQuickAction = async (type) => {
        const text = type === 'song' ? "¿Cómo puedo pedir una canción?" : "¿Cómo puedo enviar un aviso a la radio?";
        const userMsg = { id: Date.now(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        
        setIsSendingEmail(true);
        const RESEND_KEY = localStorage.getItem('vls_resend_key') || "re_BxWBivzx_3CpokEvr9UbCKFzFXyfT3VYn";
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_KEY}` },
                body: JSON.stringify({
                    from: 'Faro IA <onboarding@resend.dev>',
                    to: ['vecinoslaserenachile@gmail.com', 'contacto@vecinosmart.cl'],
                    subject: `[VLS] ${type === 'song' ? 'Pedido Musical' : 'Aviso Ciudadano'} - ${new Date().toLocaleTimeString()}`,
                    html: `<h3>${type === 'song' ? 'Solicitud de Canción' : 'Aviso Ciudadano'}</h3><p>Un vecino ha solicitado información sobre ${type === 'song' ? 'pedidos musicales' : 'envío de avisos'} desde el Chat Assistant.</p>`
                })
            });
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: `¡Perfecto! He enviado tu ${type === 'song' ? 'solicitud musical' : 'aviso'} a la central de **RDMLS**. También puedes escribirnos directamente a **contacto@vecinosmart.cl**. ¿Necesitas algo más?` };
            setMessages(prev => [...prev, botMsg]);
        } catch (e) {
            setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: "Lo siento, tuve un problema enviando el aviso." }]);
        } finally {
            setIsSendingEmail(false);
        }
    };

    const exportToPDF = () => {
        const printWindow = window.open('', '_blank');
        const historyHtml = messages.map(m => {
            const formattedText = m.text
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                .replace(/<br\/>/g, '<br/>')
                .replace(/\n/g, '<br/>');
            
            return `
                <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <div style="font-weight: bold; color: ${m.sender === 'bot' ? '#1e3a8a' : '#333'}; font-size: 12px; margin-bottom: 5px;">
                        ${m.sender === 'bot' ? 'FARO IA (OFICIAL)' : 'VECINO IDENTIFICADO'} - ${new Date(m.id).toLocaleString('es-CL')}
                    </div>
                    <div style="font-size: 14px; line-height: 1.5;">${formattedText}</div>
                </div>
            `;
        }).join('');

        printWindow.document.write(`
            <html>
                <head>
                    <title>Bitácora Institucional - Vecinos La Serena</title>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: auto; }
                        .header { text-align: center; border-bottom: 4px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 40px; }
                        .logo { width: 100px; margin-bottom: 15px; }
                        h1 { color: #1e3a8a; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
                        .subtitle { color: #64748b; font-size: 12px; margin-top: 5px; }
                        .footer { margin-top: 60px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #eee; padding-top: 20px; }
                        .seal { margin-top: 30px; opacity: 0.1; position: fixed; top: 40%; left: 30%; width: 300px; pointer-events: none; z-index: -1; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <img src="/escudo.png" class="logo" />
                        <h1>Certificado de Bitácora Ciudadana</h1>
                        <p class="subtitle">Plataforma ComunaSmart - Vecinos La Serena OS v1.0.1</p>
                    </div>
                    <img src="/escudo.png" class="seal" />
                    <div class="content">
                        ${historyHtml}
                    </div>
                    <div class="footer">
                        Este documento es un registro oficial de interacción ciudadana generado por el ecosistema de inteligencia artificial de VecinosLaSerena.cl.<br/>
                        Generado el: ${new Date().toLocaleString('es-CL')} | ID Transacción: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>
                    <script>
                        window.onload = function() {
                            window.print();
                            setTimeout(() => { window.close(); }, 500);
                        }
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
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
            const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBK4-Rf1QLNBKwhJ3BtpxRsn25e7Zlq3Rs";
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
                            <div style={{ padding: '1rem', background: isRDMLS ? 'var(--rdmls-red)' : 'linear-gradient(90deg, #1e3a8a, #020617)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'grab', borderRadius: '20px 20px 0 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Bot size={20} color="#10b981" />
                                    <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 900 }}>{isRDMLS ? 'ASISTENTE RDMLS' : 'FARO IA'}</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {/* BOTÓN DE EXPORTACIÓN (Soberanía Vecinal) */}
                                    <button 
                                       onClick={exportToPDF}
                                       title="Exportar Bitácora Institucional"
                                       style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                        <Download size={16} />
                                    </button>
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
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <button onClick={() => handleQuickAction('song')} style={{ flex: 1, padding: '0.6rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                        PEDIR CANCIÓN 🎵
                                    </button>
                                    <button onClick={() => handleQuickAction('notice')} style={{ flex: 1, padding: '0.6rem', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                        ENVIAR AVISO 📢
                                    </button>
                                </div>
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
