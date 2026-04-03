import React, { useState } from 'react';
import { MessageSquare, Send, User, ShieldCheck, Flag, ThumbsUp, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommentSection({ themeColor = '#ef4444', reportTitle = "Investigación", initialComments = [] }) {
    const defaultComments = [
        { id: 1, user: "Juan Manuel Lagos", text: "He notado que los precios en Puerta del Mar han subido un 15% a pesar de la baja de ventas. ¿Cómo se explica eso?", status: 'vecino-verificado', date: 'Hace 2 horas', likes: 12 },
        { id: 2, user: "Dra. Eliana Soto", text: "Excelente análisis. Como economista regional, veo que el factor de riesgo legislativo es real. Se requiere una ley corta ahora.", status: 'experto', date: 'Hace 5 horas', likes: 45 },
        { id: 3, user: "Vecina San Joaquín", text: "Nosotros frenamos la compra de nuestro departamento en El Milagro esperando este cambio. El artículo es 100% real.", status: 'vecino', date: 'Hace 8 horas', likes: 28 }
    ];

    const [comments, setComments] = useState(initialComments.length > 0 ? initialComments : defaultComments);

    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        setIsSubmitting(true);
        setTimeout(() => {
            const comment = {
                id: Date.now(),
                user: "Ciudadano Conectado",
                text: newComment,
                status: 'comunidad',
                date: 'Recién',
                likes: 0
            };
            setComments([comment, ...comments]);
            setNewComment("");
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div style={{ 
            marginTop: '6rem', 
            padding: '4rem 0', 
            borderTop: '2px solid #e5e7eb',
            maxWidth: '900px',
            margin: '6rem auto'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '3rem' }}>
                <div style={{ 
                    background: themeColor, 
                    color: 'white', 
                    padding: '12px', 
                    borderRadius: '50%',
                    boxShadow: `0 10px 20px ${themeColor}40`
                }}>
                    <MessageSquare size={24} />
                </div>
                <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>DEBATE CIUDADANO</h3>
                    <p style={{ margin: 0, color: '#6b7280', fontWeight: '500' }}>Participa y aporta antecedentes a esta investigación</p>
                </div>
            </div>

            {/* Input Form */}
            <div style={{ 
                background: '#f9fafb', 
                padding: '2rem', 
                borderRadius: '24px', 
                border: '1px solid #e5e7eb',
                marginBottom: '4rem',
                position: 'relative'
            }}>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe tu opinión o aporta un dato verificado..."
                        style={{
                            width: '100%',
                            minHeight: '120px',
                            background: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            fontSize: '1rem',
                            outline: 'none',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = themeColor}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', alignItems: 'center' }}>
                        <button type="button" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            background: 'none', 
                            border: 'none', 
                            color: '#6b7280', 
                            fontWeight: '600', 
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}>
                            <Paperclip size={18} /> Adjuntar prueba / Foto
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || !newComment.trim()}
                            style={{ 
                                background: themeColor, 
                                color: 'white', 
                                border: 'none', 
                                padding: '0.8rem 2rem', 
                                borderRadius: '12px', 
                                fontWeight: '900', 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                opacity: (isSubmitting || !newComment.trim()) ? 0.6 : 1,
                                boxShadow: `0 4px 12px ${themeColor}40`
                            }}
                        >
                            {isSubmitting ? "ENVIANDO..." : "PUBLICAR COMENTARIO"} <Send size={18} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <AnimatePresence initial={false}>
                    {comments.map((c) => (
                        <motion.div 
                            key={c.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ display: 'flex', gap: '1.5rem' }}
                        >
                            <div style={{ 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                background: '#f3f4f6', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: '#9ca3af',
                                flexShrink: 0
                            }}>
                                <User size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '900', fontSize: '1rem' }}>{c.user}</span>
                                    {c.status === 'vecino-verificado' && (
                                        <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <ShieldCheck size={12} /> VECINO VERIFICADO
                                        </span>
                                    )}
                                    {c.status === 'experto' && (
                                        <span style={{ background: '#eff6ff', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>PANEL EXPERTO</span>
                                    )}
                                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{c.date}</span>
                                </div>
                                <p style={{ margin: 0, color: '#374151', lineHeight: '1.6', fontSize: '1.1rem' }}>{c.text}</p>
                                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                                    <button style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <ThumbsUp size={14} /> {c.likes} Útil
                                    </button>
                                    <button style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}>Responder</button>
                                    <button style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.85rem', cursor: 'pointer', marginLeft: 'auto' }}>
                                        <Flag size={14} /> Reportar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <p style={{ color: '#64748b', fontSize: '0.78rem', margin: 0, lineHeight: 1.6 }}>
                    ⚠️ <strong>Aviso editorial:</strong> Los comentarios iniciales que aparecen en esta sección son <em>ejemplos ilustrativos</em> generados por el equipo de VLS Smart City para ilustrar el debate ciudadano. No corresponden a personas reales identificables. Los comentarios enviados por usuarios registrados sí son reales y estarán sujetos a moderación automática por inteligencia artificial.
                    <br /><br />
                    Solo los usuarios registrados en <strong>VLS Smart City</strong> pueden comentar y aportar evidencias.
                </p>
            </div>
        </div>
    );
}
