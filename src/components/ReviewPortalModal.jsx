import React, { useState } from 'react';
import { X, Star, MessageSquare, Code, Music, Send, ShieldCheck } from 'lucide-react';
import { auth } from '../utils/firebase';

export default function ReviewPortalModal({ onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const currentUser = auth.currentUser;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) return;

        // Simulate sending data to backend/Firebase
        setTimeout(() => {
            setSubmitted(true);
        }, 800);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)' }}>
            <div className="glass-panel gaudi-curves animate-scale-in" style={{ width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)', border: '1px solid rgba(56, 189, 248, 0.4)' }}>

                <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 className="serena-title-glow" style={{ margin: 0, fontSize: '2rem', letterSpacing: '2px' }}>Voz Ciudadana</h2>
                        <p style={{ margin: '0.5rem 0 0 0', color: 'var(--brand-secondary)' }}>Evaluación Abierta & Aportes al Ecosistema</p>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ padding: '0.75rem', borderRadius: '50%' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {!currentUser ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <ShieldCheck size={64} color="var(--brand-primary)" style={{ margin: '0 auto 1.5rem auto' }} />
                            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Identidad Requerida</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>Para mantener la integridad y transparencia del sistema Smart Comuna, necesitamos que te identifiques antes de enviar tu evaluación oficial o inyectar código/mejoras.</p>
                            <button onClick={onClose} className="btn btn-primary" style={{ padding: '1rem 2rem', fontWeight: 'bold' }}>Cerrar y Loguearse</button>
                        </div>
                    ) : submitted ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }} className="animate-slide-up">
                            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
                                <Send size={48} color="#10b981" />
                            </div>
                            <h3 style={{ color: '#10b981', marginBottom: '1rem', fontSize: '1.8rem' }}>¡Aporte Recibido!</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>Tus calificaciones y aportes han sido encriptados y enviados directamente a la base matriz del proyecto. Muchas gracias por co-crear el futuro de La Serena.</p>
                            <button onClick={onClose} className="btn btn-primary" style={{ padding: '1rem 2rem', fontWeight: 'bold' }}>Finalizar</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <label style={{ display: 'block', color: 'white', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>1. Calidad del Servicio e Interfaz</label>
                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '0.5rem',
                                                transition: 'transform 0.2s'
                                            }}
                                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            <Star
                                                size={40}
                                                color={(hoverRating || rating) >= star ? '#d4af37' : 'rgba(255,255,255,0.2)'}
                                                fill={(hoverRating || rating) >= star ? '#d4af37' : 'none'}
                                                style={{ filter: (hoverRating || rating) >= star ? 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))' : 'none' }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                    <MessageSquare size={20} color="#38bdf8" /> 2. Aportes Comunitarios
                                </label>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>¿Tienes sugerencias, líneas de código <Code size={14} style={{ display: 'inline' }} />, o un mensaje inspirador <Music size={14} style={{ display: 'inline' }} /> para sumar al portal?</p>
                                <textarea
                                    required
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Escribe tus ideas, propuestas de código, o sugerencias estéticas aquí..."
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(56, 189, 248, 0.3)',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        color: 'white',
                                        fontFamily: 'monospace',
                                        fontSize: '1rem',
                                        resize: 'vertical'
                                    }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={rating === 0 || !comment.trim()}
                                className="btn btn-primary"
                                style={{
                                    padding: '1.25rem',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    borderRadius: '30px',
                                    background: (rating === 0 || !comment.trim()) ? 'rgba(255,255,255,0.1)' : 'linear-gradient(90deg, #38bdf8, #8b5cf6)',
                                    color: (rating === 0 || !comment.trim()) ? 'rgba(255,255,255,0.3)' : 'white',
                                    cursor: (rating === 0 || !comment.trim()) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Inyectar Aporte al Proyecto
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
