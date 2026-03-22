import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, ChevronDown, CheckCheck, Loader2, Paperclip, ImageIcon, MoreVertical } from 'lucide-react';

export default function InternalChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const contacts = [
        { id: 1, name: 'Redacción Central', role: 'Canal Grupal', online: true, unread: 2, avatar: 'RC' },
        { id: 2, name: 'Juan (Editor)', role: 'Periodista', online: true, unread: 0, avatar: 'J' },
        { id: 3, name: 'María (Gráfica)', role: 'Diseñadora', online: false, unread: 0, avatar: 'M' },
        { id: 4, name: 'Director Coms', role: 'Dirección', online: true, unread: 1, avatar: 'D' }
    ];

    const initialMessages = {
        1: [
            { id: 1, senderId: 2, text: 'Equipo, la nota del nuevo faro ya está lista.', time: '10:05', isMine: false, senderName: 'Juan' },
            { id: 2, senderId: 4, text: 'Perfecto, falta que diseño suba los renders 3D.', time: '10:10', isMine: false, senderName: 'Director' }
        ],
        2: [
            { id: 1, senderId: 2, text: '¿Revisaste el borrador de seguridad?', time: '09:30', isMine: false }
        ],
        3: [],
        4: [
            { id: 1, senderId: 4, text: 'Apenas aprueben la nota, dispárala vía Push.', time: '11:00', isMine: false }
        ]
    };

    const [messages, setMessages] = useState(initialMessages);
    const [attachment, setAttachment] = useState(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, selectedContact, isOpen, minimized, isTyping, attachment]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && !attachment) || !selectedContact) return;

        const msg = {
            id: Date.now(),
            senderId: 'me',
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMine: true,
            attachmentUrl: attachment ? URL.createObjectURL(attachment) : null,
            attachmentType: attachment ? attachment.type : null,
            attachmentName: attachment ? attachment.name : null
        };

        setMessages(prev => ({
            ...prev,
            [selectedContact.id]: [...(prev[selectedContact.id] || []), msg]
        }));

        setNewMessage('');
        setAttachment(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (imageInputRef.current) imageInputRef.current.value = '';

        // Simular respuesta después de enviar un mensaje (si no es canal grupal)
        if (selectedContact.id !== 1) {
            setIsTyping(true);
            setTimeout(() => {
                const autoReply = {
                    id: Date.now() + 1,
                    senderId: selectedContact.id,
                    text: 'Recibido. Lo revisaré enseguida.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMine: false
                };
                setMessages(prev => ({
                    ...prev,
                    [selectedContact.id]: [...(prev[selectedContact.id] || []), autoReply]
                }));
                setIsTyping(false);
            }, 2500);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="btn-primary pulse"
                style={{
                    position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999,
                    width: '65px', height: '65px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,229,255,0.4)', background: 'linear-gradient(135deg, #00e5ff, #3b82f6)',
                    border: 'none', cursor: 'pointer', transition: 'transform 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <div style={{ position: 'relative' }}>
                    <MessageSquare size={30} color="white" />
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ec4899', color: 'white', border: '2px solid var(--bg-primary)', borderRadius: '50%', width: '24px', height: '24px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</span>
                </div>
            </button>
        );
    }

    return (
        <div style={{
            position: 'fixed', bottom: minimized ? '0' : '30px', right: minimized ? '30px' : '30px', zIndex: 9999,
            width: '380px', height: minimized ? '60px' : '550px',
            background: 'var(--bg-primary)',
            borderRadius: minimized ? '20px 20px 0 0' : '20px',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            boxShadow: '0 15px 50px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            {/* Cabecera del chat */}
            <div style={{
                background: 'linear-gradient(90deg, #0a1128, #1c2541)',
                padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }} onClick={() => setMinimized(!minimized)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    {selectedContact ? (
                        <button className="btn-glass" onClick={(e) => { e.stopPropagation(); setSelectedContact(null); }} style={{ padding: '0.3rem', borderRadius: '50%', border: 'none', display: 'flex' }}>
                            <ChevronDown size={20} style={{ transform: 'rotate(90deg)' }} color="#00e5ff" />
                        </button>
                    ) : (
                        <div style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                            <MessageSquare size={20} color="#00e5ff" />
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.05rem', letterSpacing: '0.5px' }}>
                            {selectedContact ? selectedContact.name : 'Mensajería Interna'}
                        </span>
                        {selectedContact && (
                            <span style={{ color: selectedContact.online ? '#10b981' : '#64748b', fontSize: '0.75rem', fontWeight: '600' }}>
                                {selectedContact.online ? '• En línea' : 'Desconectado'}
                            </span>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-glass" onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }} style={{ padding: '0.3rem', borderRadius: '12px', border: 'none', display: 'flex' }}>
                        <ChevronDown size={20} style={{ transform: minimized ? 'rotate(180deg)' : 'none', color: '#cbd5e1' }} />
                    </button>
                    <button className="btn-glass" onClick={(e) => { e.stopPropagation(); setIsOpen(false); setMinimized(false); setSelectedContact(null); }} style={{ padding: '0.3rem', borderRadius: '12px', border: 'none', display: 'flex', background: 'rgba(239, 68, 68, 0.1)' }}>
                        <X size={20} color="#ef4444" />
                    </button>
                </div>
            </div>

            {!minimized && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'url("https://www.transparenttextures.com/patterns/cubes.png"), linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))', overflow: 'hidden' }}>
                    {!selectedContact ? (
                        /* Lista de Contactos */
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {contacts.map(contact => (
                                <div
                                    key={contact.id}
                                    onClick={() => setSelectedContact(contact)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                                        background: 'rgba(255,255,255,0.03)', borderRadius: '16px', cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative', overflow: 'hidden'
                                    }}
                                    className="hover-card-chat"
                                >
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            background: contact.id === 1 ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'rgba(56, 189, 248, 0.2)',
                                            width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 'bold', color: contact.id === 1 ? 'white' : '#38bdf8', fontSize: '1.2rem',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                                        }}>
                                            {contact.avatar || <User size={24} />}
                                        </div>
                                        {contact.id !== 1 && (
                                            <div style={{ position: 'absolute', bottom: '2px', right: '0px', width: '12px', height: '12px', background: contact.online ? '#10b981' : '#64748b', borderRadius: '50%', border: '2px solid var(--bg-primary)' }}></div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>{contact.name}</span>
                                            {contact.unread > 0 && (
                                                <span className="pulse" style={{ background: '#ec4899', color: 'white', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: 'bold' }}>
                                                    {contact.unread}
                                                </span>
                                            )}
                                        </div>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{contact.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Área de Chat */
                        <>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }} className="chat-scroll">
                                {(messages[selectedContact.id] || []).length === 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', hieght: '100%', marginTop: '3rem', opacity: 0.5 }}>
                                        <MessageSquare size={40} color="white" style={{ marginBottom: '1rem' }} />
                                        <p style={{ textAlign: 'center', color: 'white', fontSize: '0.9rem' }}>Inicia la conversación con {selectedContact.name}</p>
                                    </div>
                                ) : (
                                    (messages[selectedContact.id] || []).map((msg, idx) => (
                                        <div key={idx} style={{
                                            alignSelf: msg.isMine ? 'flex-end' : 'flex-start',
                                            maxWidth: '85%',
                                            display: 'flex', flexDirection: 'column'
                                        }}>
                                            {!msg.isMine && selectedContact.id === 1 && (
                                                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', marginLeft: '10px' }}>{msg.senderName}</span>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', flexFlow: msg.isMine ? 'row-reverse' : 'row' }}>
                                                {!msg.isMine && selectedContact.id !== 1 && (
                                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0 }}>
                                                        {selectedContact.avatar}
                                                    </div>
                                                )}
                                                <div style={{
                                                    background: msg.isMine ? 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)' : 'rgba(30, 41, 59, 0.9)',
                                                    color: msg.isMine ? '#000' : 'white',
                                                    padding: '0.8rem 1.2rem',
                                                    borderRadius: msg.isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                    fontSize: '0.95rem', lineHeight: '1.5', wordBreak: 'break-word',
                                                    border: msg.isMine ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                    display: 'flex', flexDirection: 'column', gap: '8px'
                                                }}>
                                                    {msg.text && <div>{msg.text}</div>}
                                                    {msg.attachmentUrl && (
                                                        <div style={{ marginTop: msg.text ? '0.5rem' : '0' }}>
                                                            {msg.attachmentType?.startsWith('image/') ? (
                                                                <img src={msg.attachmentUrl} alt="adjunto" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', objectFit: 'cover' }} />
                                                            ) : (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 0.8rem', borderRadius: '8px' }}>
                                                                    <Paperclip size={16} />
                                                                    <span style={{ fontSize: '0.85rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.attachmentName || 'Archivo adjunto'}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: msg.isMine ? 'flex-end' : 'flex-start', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem', padding: '0 5px' }}>
                                                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '500' }}>{msg.time}</span>
                                                {msg.isMine && <CheckCheck size={14} color="#00e5ff" />}
                                            </div>
                                        </div>
                                    ))
                                )}

                                {isTyping && (
                                    <div style={{ alignSelf: 'flex-start', maxWidth: '85%', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', flexShrink: 0 }}>
                                            {selectedContact.avatar}
                                        </div>
                                        <div style={{
                                            background: 'rgba(30, 41, 59, 0.9)',
                                            padding: '0.8rem 1.2rem',
                                            borderRadius: '18px 18px 18px 4px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            display: 'flex', gap: '4px', alignItems: 'center', height: '42px'
                                        }}>
                                            <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animationDelay: '0s' }}></div>
                                            <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                                            <div className="typing-dot" style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <form onSubmit={handleSendMessage} style={{ padding: '1rem', background: 'rgba(10, 17, 40, 0.95)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {attachment && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(56, 189, 248, 0.1)', padding: '0.5rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                        {attachment.type.startsWith('image/') ? <ImageIcon size={16} color="#38bdf8" /> : <Paperclip size={16} color="#38bdf8" />}
                                        <span style={{ color: '#e2e8f0', fontSize: '0.85rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{attachment.name}</span>
                                        <button type="button" onClick={() => setAttachment(null)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}><X size={16} /></button>
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                    <input type="file" accept="image/*" capture="environment" ref={imageInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', color: attachment ? '#00e5ff' : '#94a3b8' }} title="Adjuntar archivo">
                                            <Paperclip size={20} />
                                        </button>
                                        <button type="button" onClick={() => imageInputRef.current?.click()} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', color: attachment?.type?.startsWith('image/') ? '#00e5ff' : '#94a3b8' }} title="Tomar/Enviar imagen">
                                            <ImageIcon size={20} />
                                        </button>
                                    </div>
                                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0.3rem 0.3rem 0.3rem 1rem' }}>
                                        <input
                                            type="text"
                                            placeholder="Escribe un mensaje..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '0.95rem' }}
                                        />
                                        <button type="submit" style={{
                                            padding: '0.5rem', borderRadius: '50%',
                                            background: (newMessage.trim() || attachment) ? '#00e5ff' : 'rgba(255,255,255,0.1)',
                                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: (newMessage.trim() || attachment) ? 'pointer' : 'default',
                                            transition: 'all 0.3s'
                                        }} disabled={!newMessage.trim() && !attachment}>
                                            <Send size={18} color={(newMessage.trim() || attachment) ? 'black' : '#64748b'} style={{ marginLeft: '2px' }} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            )}

            <style>{`
                .hover-card-chat:hover {
                    border-color: rgba(0, 229, 255, 0.4) !important;
                    background: rgba(0, 229, 255, 0.08) !important;
                    transform: translateY(-2px);
                }
                .chat-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .chat-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .chat-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.2);
                    border-radius: 10px;
                }
                @keyframes typing {
                    0%, 100% { transform: translateY(0); opacity: 0.5; }
                    50% { transform: translateY(-3px); opacity: 1; }
                }
                .typing-dot {
                    animation: typing 1.5s infinite;
                }
            `}</style>
        </div>
    );
}
