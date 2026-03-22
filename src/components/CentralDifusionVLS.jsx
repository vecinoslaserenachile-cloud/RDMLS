import React, { useState, useEffect } from 'react';
import { Share2, Clock, CheckCircle2, AlertCircle, RefreshCw, Send, Facebook, Instagram, Twitter, Calendar, Cpu } from 'lucide-react';

export default function CentralDifusionVLS({ onClose }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Visite nuestro Kiosko Virtual en la Avenida del Mar", status: "SCHEDULED", time: "10:00", network: "Facebook" },
        { id: 2, text: "Sesión Mañanera de Colapso ya disponible en Radio VLS", status: "SENT", time: "08:30", network: "Instagram" },
        { id: 3, text: "Entrena con Serenito Abuelo en el nuevo Gimnasio 3D", status: "SCHEDULED", time: "18:00", network: "TikTok" }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [aiSuggestions, setAiSuggestions] = useState([
        "¡Atención La Serena! Disfruta del clima con nuestro Kiosko Virtual.",
        "Descubre la historia del Valle del Elqui en VLS."
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSend = () => {
        if (!newMessage) return;
        const msg = {
            id: Date.now(),
            text: newMessage,
            status: "SCHEDULED",
            time: new Date().toLocaleTimeString().substring(0, 5),
            network: "Todas"
        };
        setMessages([msg, ...messages]);
        setNewMessage("");
    };

    const generateAI = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setNewMessage(aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]);
            setIsGenerating(false);
        }, 1200);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,15,0.95)', zIndex: 150000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '90%', maxWidth: '1000px', background: '#0f172a', borderRadius: '16px', border: '2px solid #3b82f6', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '1.5rem', background: '#1e293b', borderBottom: '1px solid #3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Share2 color="#3b82f6" size={32} />
                        <div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>Central de Difusión VLS (Workers IA)</h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>140.000+ Usuarios (Facebook, Instagram, TikTok, Twitter)</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar Sistema</button>
                </div>
                
                <div style={{ display: 'flex', padding: '1.5rem', gap: '2rem', height: '600px' }}>
                    
                    {/* Panel Izquierdo: Redacción e IA */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155' }}>
                            <h3 style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Cpu size={18} color="#3b82f6" /> Redactor Inteligente (Google AI Studio)
                            </h3>
                            <textarea 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Escribe tu mensaje para las redes de VLS..."
                                style={{ width: '100%', height: '120px', background: '#0f172a', border: '1px solid #3b82f6', borderRadius: '8px', color: 'white', padding: '1rem', boxSizing: 'border-box', resize: 'none' }}
                            />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button onClick={generateAI} disabled={isGenerating} style={{ flex: 1, background: '#1d4ed8', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Cpu size={18} />}
                                    Analizar y Sugerir
                                </button>
                                <button onClick={handleSend} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    <Send size={18} /> Agendar Publicación
                                </button>
                            </div>
                        </div>

                        {/* Redes Conectadas */}
                        <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '12px', border: '1px solid #334155', flex: 1 }}>
                            <h3 style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontSize: '1rem' }}>Estado de Nodos (API)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '0.8rem', borderRadius: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa' }}><Facebook size={18} /> Facebook VLS</span>
                                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ LINCADO (65K)</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '0.8rem', borderRadius: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899' }}><Instagram size={18} /> Instagram</span>
                                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ LINCADO (25K)</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '0.8rem', borderRadius: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>TikTok </span>
                                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ LINCADO (33K)</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '0.8rem', borderRadius: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}><Twitter size={18} /> X (Twitter)</span>
                                    <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>✓ LINCADO (9K)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel Derecho: Cronograma y Workers */}
                    <div style={{ flex: 1, background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', padding: '1.2rem', overflowY: 'auto' }}>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} color="#10b981" /> Histórico y Cronograma
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map(m => (
                                <div key={m.id} style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${m.status === 'SENT' ? '#10b981' : '#f59e0b'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                            <Clock size={12} /> {m.time} | {m.network}
                                        </span>
                                        <span style={{ color: m.status === 'SENT' ? '#10b981' : '#f59e0b', fontSize: '0.7rem', fontWeight: 'bold', border: `1px solid ${m.status === 'SENT' ? '#10b981' : '#f59e0b'}`, padding: '2px 6px', borderRadius: '4px' }}>
                                            {m.status}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>{m.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
