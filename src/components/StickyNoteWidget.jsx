import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Check, GripHorizontal } from 'lucide-react';

export default function StickyNoteWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [noteText, setNoteText] = useState(() => {
        return localStorage.getItem('vls_sticky_note') || 'Escribe tu recordatorio aquí...';
    });
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        // Toggle from window event or something similar if needed
        const handleOpen = () => setIsVisible(true);
        window.addEventListener('open-sticky-note', handleOpen);
        
        // Auto-show if there's saved text that's not the default
        const saved = localStorage.getItem('vls_sticky_note');
        if (saved && saved !== 'Escribe tu recordatorio aquí...') {
            setIsVisible(true);
        }
        
        return () => window.removeEventListener('open-sticky-note', handleOpen);
    }, []);

    const saveNote = () => {
        localStorage.setItem('vls_sticky_note', noteText);
        setIsEditing(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    drag
                    dragMomentum={false}
                    initial={{ opacity: 0, y: 20, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: -1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ rotate: 0, scale: 1.02 }}
                    style={{
                        position: 'fixed',
                        top: '140px',
                        right: '40px',
                        width: '280px',
                        minHeight: '260px',
                        background: '#fef08a',
                        boxShadow: '10px 15px 30px rgba(0,0,0,0.2), inset 0 0 40px rgba(0,0,0,0.05)',
                        borderRadius: '2px',
                        zIndex: 100050,
                        padding: '25px 15px 15px',
                        display: 'flex',
                        flexDirection: 'column',
                        fontFamily: "'Outfit', sans-serif",
                        borderBottomRightRadius: '30px',
                        cursor: 'grab'
                    }}
                >
                    {/* Efecto de cinta adhesiva (Tape) */}
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%) rotate(-1deg)',
                        width: '100px',
                        height: '35px',
                        background: 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(2px)',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }} />

                    <div className="drag-handle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <GripHorizontal size={14} color="#854d0e" style={{ opacity: 0.5 }} />
                            <span style={{ fontSize: '0.75rem', color: '#854d0e', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '900' }}>MEMORÁNDUM VLS</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => { isEditing ? saveNote() : setIsEditing(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#854d0e', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                            </button>
                            <button onClick={() => setIsVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {isEditing ? (
                            <textarea 
                                autoFocus
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                style={{ 
                                    flex: 1, 
                                    background: 'transparent', 
                                    border: 'none', 
                                    outline: 'none', 
                                    resize: 'none', 
                                    color: '#451a03', 
                                    fontSize: '1.1rem',
                                    lineHeight: '1.5',
                                    padding: '5px',
                                    fontWeight: '600',
                                    fontFamily: "'Outfit', sans-serif"
                                }}
                                placeholder="Anota algo pendiente..."
                            />
                        ) : (
                            <div 
                                onClick={() => setIsEditing(true)}
                                style={{ 
                                    flex: 1, 
                                    color: '#451a03', 
                                    fontSize: '1.1rem', 
                                    lineHeight: '1.5', 
                                    whiteSpace: 'pre-wrap', 
                                    cursor: 'text',
                                    padding: '5px',
                                    fontWeight: '600'
                                }}
                            >
                                {noteText}
                            </div>
                        )}
                    </div>
                    
                    {/* Sombra de la esquina doblada */}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '0', 
                        right: '0', 
                        width: '0', 
                        height: '0', 
                        borderStyle: 'solid', 
                        borderWidth: '0 0 30px 30px', 
                        borderColor: 'transparent transparent #eab308 transparent',
                        filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.1))',
                        pointerEvents: 'none'
                    }} />
                </motion.div>
            )}
            
            {!isVisible && (
                 <motion.button 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setIsVisible(true)}
                    style={{ 
                        position: 'fixed', 
                        bottom: '160px', 
                        right: '25px', 
                        background: '#fef08a', 
                        color: '#854d0e', 
                        border: '2px solid #854d0e', 
                        borderRadius: '8px', 
                        width: '45px', 
                        height: '45px', 
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)', 
                        cursor: 'pointer', 
                        zIndex: 90000, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        transform: 'rotate(-5deg)'
                    }}
                    title="Ver Notas"
                 >
                    <Edit2 size={18} />
                 </motion.button>
            )}
        </AnimatePresence>
    );
}

StickyNoteWidget.displayName = 'StickyNoteWidget';

