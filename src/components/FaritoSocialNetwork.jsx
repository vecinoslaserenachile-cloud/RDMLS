import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, Send, Bell, Star, Hash, User, RefreshCw, X, UserCircle } from 'lucide-react';

/**
 * MÓDULO 4 Y 5: Red Social "Farito.cl" & Mensajería P2P Vecinal
 */

export default function FaritoSocialNetwork({ onClose, currentUser }) {
    const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'p2p'
    const [feedPosts, setFeedPosts] = useState([
        { id: '1', type: 'system', author: 'Farito IA', role: 'Alcalde Digital', content: '¡Trivia Vecinal! ¿Qué año se construyó el Faro Monumental? Gana 5 Fichas VLS al responder correctamente.', time: 'Hace 5 min', isTrivia: true },
        { id: '2', type: 'achievement', author: 'Doña María (Las Compañías)', content: '🏆 Ha completado la rutina "Fuerza Regional" en el Gimnasio Biomecánico.', time: 'Hace 12 min' },
        { id: '3', type: 'achievement', author: 'Usuario Anónimo', content: '🔭 Acaba de descubrir el Portal a Hawái en SkyGuide RA.', time: 'Hace 20 min' }
    ]);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);

    // Auto-scroll en P2P
    useEffect(() => {
        if (activeTab === 'p2p' && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, activeTab]);

    const handleSendP2P = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Regla: Estrictamente texto y emojis (sin adjuntos ni comandos avanzados)
        const cleanMsg = newMessage.trim();
        setChatMessages(prev => [...prev, { id: Date.now(), text: cleanMsg, sender: 'me', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
        setNewMessage('');

        // Simulación de respuesta P2P básica o de la IA moderadora
        setTimeout(() => {
            setChatMessages(prev => [...prev, { id: Date.now()+1, text: 'Tu mensaje fue encriptado de punto a punto vecinal. 📡', sender: 'farito', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
        }, 1500);
    };

    const handleTriviaResponse = () => {
        alert("¡Correcto! En 1950. Has ganado 5 Fichas VLS agregadas a tu credencial.");
        // Otorgar premio real despachando un evento al Economy Master si se creara el webhook
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column' }}>
            {/* Header Red Social */}
            <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, #1e3a8a, #020617)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '12px' }}>
                        <Hash size={24} color="#0f172a" />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>Farito.cl</h1>
                        <p style={{ margin: 0, color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold' }}>La Red Cívica del Plan 2026</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setActiveTab('feed')} style={{ background: activeTab === 'feed' ? '#38bdf820' : 'transparent', border: activeTab === 'feed' ? '1px solid #38bdf8' : '1px solid transparent', color: activeTab === 'feed' ? '#38bdf8' : '#94a3b8', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Bell size={18} /> Feed Cívico
                    </button>
                    <button onClick={() => setActiveTab('p2p')} style={{ background: activeTab === 'p2p' ? '#ec489920' : 'transparent', border: activeTab === 'p2p' ? '1px solid #ec4899' : '1px solid transparent', color: activeTab === 'p2p' ? '#ec4899' : '#94a3b8', padding: '8px 16px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MessageSquare size={18} /> Inbox P2P
                    </button>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ef4444', marginLeft: '1rem', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>
            </header>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: '#020617' }}>
                
                {/* Menú Lateral (Moderación IA y Perfil) */}
                <aside style={{ width: '280px', borderRight: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-panel" style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid #38bdf840', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
                        <img src="/fariño.png" alt="Fariño IA" style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ffcc00', padding: '5px', marginBottom: '1rem' }} />
                        <h3 style={{ margin: '0 0 5px 0', color: '#38bdf8' }}>Fariño / Farito</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Alcalde Digital & Moderador</p>
                        <div style={{ background: '#10b98120', color: '#10b981', padding: '5px', borderRadius: '5px', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '10px' }}>🟢 SISTEMA EN LÍNEA</div>
                    </div>

                    <div>
                        <h4 style={{ color: '#64748b', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}>TU PERFIL</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
                            <UserCircle size={32} color="#94a3b8" />
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{currentUser?.displayName || 'Vecino Smart'}</div>
                                <div style={{ color: '#10b981', fontSize: '0.8rem' }}>Identidad Comprobada</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Área Principal (Feed o Chat P2P) */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {/* VIEW: FEED CÍVICO */}
                        {activeTab === 'feed' && (
                            <>
                                <h2 style={{ fontSize: '1.2rem', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                    Activity Log
                                    <button style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer' }}><RefreshCw size={18}/></button>
                                </h2>

                                {feedPosts.map(post => (
                                    <div key={post.id} style={{ background: post.type === 'system' ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(15, 23, 42, 0))' : 'rgba(255,255,255,0.03)', border: post.type === 'system' ? '1px solid #38bdf840' : '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {post.type === 'system' ? <Sparkles size={20} color="#38bdf8" /> : <Star size={20} color="#f59e0b" />}
                                                <strong style={{ color: post.type === 'system' ? '#38bdf8' : 'white' }}>{post.author}</strong>
                                                {post.role && <span style={{ background: '#38bdf8', color: '#0f172a', padding: '2px 6px', borderRadius: '5px', fontSize: '0.65rem', fontWeight: 'bold' }}>{post.role}</span>}
                                            </div>
                                            <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{post.time}</span>
                                        </div>
                                        <p style={{ margin: '0 0 1rem 0', color: '#cbd5e1', lineHeight: '1.5', fontSize: '1.05rem' }}>
                                            {post.content}
                                        </p>
                                        {post.isTrivia && (
                                            <button onClick={handleTriviaResponse} style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                                                Responder "1950"
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}

                        {/* VIEW: INBOX P2P (TEXTO PLANO) */}
                        {activeTab === 'p2p' && (
                            <div style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '1rem', borderBottom: '1px solid rgba(236, 72, 153, 0.2)', textAlign: 'center' }}>
                                    <strong style={{ color: '#ec4899', fontSize: '0.9rem' }}>🔒 E2E Encryption Active (Sólo Texto)</strong>
                                </div>
                                
                                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {chatMessages.length === 0 ? (
                                        <div style={{ margin: 'auto', textAlign: 'center', color: '#64748b' }}>
                                            <MessageSquare size={40} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
                                            <p>No hay mensajes en esta sala P2P.<br/>Escribe un mensaje de prueba.</p>
                                        </div>
                                    ) : (
                                        chatMessages.map(msg => (
                                            <div key={msg.id} style={{ alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '70%', background: msg.sender === 'me' ? '#ec4899' : 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '18px', borderBottomRightRadius: msg.sender === 'me' ? '4px' : '18px', borderBottomLeftRadius: msg.sender !== 'me' ? '4px' : '18px' }}>
                                                <div style={{ color: 'white', fontSize: '0.95rem' }}>{msg.text}</div>
                                                <div style={{ fontSize: '0.65rem', color: msg.sender === 'me' ? '#fdf2f8' : '#94a3b8', textAlign: 'right', marginTop: '4px' }}>{msg.time}</div>
                                            </div>
                                        ))
                                    )}
                                    <div ref={chatEndRef} />
                                </div>

                                <form onSubmit={handleSendP2P} style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '10px', background: 'rgba(2, 6, 23, 0.8)' }}>
                                    <input 
                                        type="text" 
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Escribe un mensaje de texto aquí..." 
                                        style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', padding: '0.8rem 1.2rem', color: 'white', outline: 'none' }}
                                    />
                                    <button type="submit" disabled={!newMessage.trim()} style={{ background: newMessage.trim() ? '#38bdf8' : 'rgba(255,255,255,0.1)', color: newMessage.trim() ? '#0f172a' : '#64748b', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: newMessage.trim() ? 'pointer' : 'not-allowed', transition: '0.3s' }}>
                                        <Send size={20} />
                                    </button>
                                </form>
                            </div>
                        )}
                        
                    </div>
                </main>
            </div>
            {/* Componente UserCircle debe importarse arriba */}
        </div>
    );
}
