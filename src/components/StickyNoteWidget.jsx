import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Edit2, Check, GripHorizontal, Palette, PencilLine, 
    Download, Trash2, MousePointer2, Undo2, Redo2, Eraser, 
    Circle
} from 'lucide-react';

const COLOR_VARIANTS = {
    yellow: { bg: '#fef08a', corner: '#eab308', text: '#854d0e', main: '#451a03' },
    blue: { bg: '#bfdbfe', corner: '#3b82f6', text: '#1e3a8a', main: '#172554' },
    pink: { bg: '#fecaca', corner: '#f87171', text: '#991b1b', main: '#450a0a' },
    green: { bg: '#bbf7d0', corner: '#22c55e', text: '#166534', main: '#052e16' },
    orange: { bg: '#fed7aa', corner: '#f97316', text: '#9a3412', main: '#431407' }
};

const INK_COLORS = [
    { id: 'black', color: '#000000' },
    { id: 'blue', color: '#1e3a8a' },
    { id: 'red', color: '#ef4444' },
    { id: 'green', color: '#10b981' },
    { id: 'graphite', color: '#4b5563' }
];

const PENCIL_TYPES = {
    grafito: { name: 'Grafito', weight: '500', size: '1.05rem', thickness: 1, font: "'Inter', sans-serif" },
    pasta: { name: 'Pasta', weight: '700', size: '1.1rem', thickness: 2, font: "'Outfit', sans-serif" },
    scripto: { name: 'Scripto', weight: '900', size: '1.25rem', thickness: 4, font: "'Outfit', sans-serif" },
    cera: { name: 'Cera', weight: '800', size: '1.3rem', thickness: 8, font: "'Outfit', sans-serif", letterSpacing: '0.5px' }
};

const DEFAULT_NOTE = '¡Escribe aquí tus notas o dibuja libremente! Todo se guarda automáticamente.';

export default function StickyNoteWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [noteText, setNoteText] = useState(() => localStorage.getItem('vls_sticky_note') || DEFAULT_NOTE);
    const [noteColor, setNoteColor] = useState(() => localStorage.getItem('vls_sticky_color') || 'yellow');
    const [pencilType, setPencilType] = useState(() => localStorage.getItem('vls_sticky_pencil') || 'pasta');
    const [inkColor, setInkColor] = useState(() => localStorage.getItem('vls_sticky_ink') || '#000000');
    
    const [isEditing, setIsEditing] = useState(false);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [isEraser, setIsEraser] = useState(false);
    const [isOnboarding, setIsOnboarding] = useState(true);
    
    const [showColors, setShowColors] = useState(false);
    const [showPencils, setShowPencils] = useState(false);
    const [showInks, setShowInks] = useState(false);
    
    // Canvas & History
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const [history, setHistory] = useState([]);
    const [historyStep, setHistoryStep] = useState(-1);

    const colors = COLOR_VARIANTS[noteColor] || COLOR_VARIANTS.yellow;
    const pen = PENCIL_TYPES[pencilType] || PENCIL_TYPES.pasta;

    useEffect(() => {
        const handleOpen = () => {
            setIsVisible(true);
            setIsOnboarding(true);
        };
        window.addEventListener('open-sticky-note', handleOpen);
        const savedNote = localStorage.getItem('vls_sticky_note');
        const savedDrawing = localStorage.getItem('vls_sticky_drawing');
        if ((savedNote && savedNote !== DEFAULT_NOTE) || savedDrawing) {
            setIsVisible(true);
            setIsOnboarding(false);
        }
        return () => window.removeEventListener('open-sticky-note', handleOpen);
    }, []);

    // Restore Drawing and Initial History
    useEffect(() => {
        if (isVisible && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const saved = localStorage.getItem('vls_sticky_drawing');
            if (saved) {
                const img = new Image();
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    pushToHistory();
                };
                img.src = saved;
            } else {
                pushToHistory(); // Initial blank state
            }
        }
    }, [isVisible]);

    const pushToHistory = () => {
        if (!canvasRef.current) return;
        const data = canvasRef.current.toDataURL();
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(data);
        if (newHistory.length > 20) newHistory.shift(); // Limit history
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
        localStorage.setItem('vls_sticky_drawing', data);
    };

    const undo = () => {
        if (historyStep <= 0) return;
        const prevStep = historyStep - 1;
        loadHistoryStep(prevStep);
    };

    const redo = () => {
        if (historyStep >= history.length - 1) return;
        const nextStep = historyStep + 1;
        loadHistoryStep(nextStep);
    };

    const loadHistoryStep = (step) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            setHistoryStep(step);
            localStorage.setItem('vls_sticky_drawing', img.src);
        };
        img.src = history[step];
    };

    const startDrawing = (e) => {
        if (!isDrawingMode) return;
        setIsOnboarding(false);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
        lastPos.current = { x: clientX - rect.left, y: clientY - rect.top };
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing || !isDrawingMode) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
        const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
        const pos = { x: clientX - rect.left, y: clientY - rect.top };

        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        
        if (isEraser) {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 25;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = inkColor;
            ctx.lineWidth = pen.thickness;
        }
        
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        lastPos.current = pos;
    };

    const stopDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            pushToHistory();
        }
    };

    const downloadNote = () => {
        const composite = document.createElement('canvas');
        composite.width = 600; composite.height = 600;
        const ctx = composite.getContext('2d');
        ctx.fillStyle = colors.bg; ctx.fillRect(0, 0, 600, 600);
        ctx.fillStyle = colors.corner; ctx.beginPath(); ctx.moveTo(600, 540); ctx.lineTo(600, 600); ctx.lineTo(540, 600); ctx.fill();
        
        ctx.fillStyle = inkColor;
        ctx.font = `${pen.weight} 28px ${pen.font}`;
        const words = noteText.split(' ');
        let line = '', y = 60;
        for(let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            if (ctx.measureText(testLine).width > 540 && n > 0) {
              ctx.fillText(line, 30, y); line = words[n] + ' '; y += 40;
            } else line = testLine;
        }
        ctx.fillText(line, 30, y);
        if (canvasRef.current) ctx.drawImage(canvasRef.current, 0, 0, 600, 600);
        
        const link = document.createElement('a');
        link.download = `vls_nota_${Date.now()}.png`;
        link.href = composite.toDataURL('image/png'); link.click();
    };

    const noteStyle = {
        flex: 1, background: 'transparent', border: 'none', outline: 'none', resize: 'none', 
        color: inkColor, fontSize: pen.size, fontWeight: pen.weight, fontFamily: pen.font,
        lineHeight: '1.4', padding: '10px', letterSpacing: pen.letterSpacing || 'normal',
        transition: 'all 0.3s ease', zIndex: isDrawingMode ? 1 : 15
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    drag={!isDrawingMode} dragMomentum={false}
                    initial={{ opacity: 0, y: 30, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: -1 }}
                    exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }} 
                    whileHover={!isDrawingMode ? { rotate: 0, scale: 1.01 } : {}}
                    style={{
                        position: 'fixed', top: '160px', right: '40px', width: '380px', minHeight: '380px',
                        background: colors.bg, boxShadow: '20px 25px 50px rgba(0,0,0,0.3)',
                        zIndex: 100050, padding: '25px 20px 20px', display: 'flex', flexDirection: 'column',
                        fontFamily: "'Outfit', sans-serif", borderBottomRightRadius: '40px', transition: 'background 0.3s ease',
                        cursor: isDrawingMode ? (isEraser ? 'cell' : 'crosshair') : 'grab'
                    }}
                >
                    <div className="drag-handle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <GripHorizontal size={18} color={colors.text} style={{ opacity: 0.4 }} />
                            <span style={{ fontSize: '0.75rem', color: colors.text, fontWeight: '900', letterSpacing: '1.5px' }}>VLS MEMO</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {/* Paper Color */}
                            <div style={{ position: 'relative' }}>
                                <button onClick={() => { setShowColors(!showColors); setShowPencils(false); setShowInks(false); }} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: colors.text }}><Palette size={20} /></button>
                                {showColors && (
                                    <div style={{ position: 'absolute', top: '30px', right: '-40px', background: 'white', padding: '10px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', gap: '8px', zIndex: 100 }}>
                                        {Object.keys(COLOR_VARIANTS).map(c => <button key={c} onClick={() => { setNoteColor(c); localStorage.setItem('vls_sticky_color', c); setShowColors(false); }} style={{ width: '24px', height: '24px', borderRadius: '50%', background: COLOR_VARIANTS[c].bg, border: '1px solid rgba(0,0,0,0.1)' }} />)}
                                    </div>
                                )}
                            </div>

                            {/* Ink Color */}
                            <div style={{ position: 'relative' }}>
                                <button onClick={() => { setShowInks(!showInks); setShowColors(false); setShowPencils(false); }} title="Color de Tinta" className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: inkColor }}><Circle size={20} fill={inkColor} /></button>
                                {showInks && (
                                    <div style={{ position: 'absolute', top: '30px', right: '-20px', background: 'white', padding: '10px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', zIndex: 100 }}>
                                        {INK_COLORS.map(ic => <button key={ic.id} onClick={() => { setInkColor(ic.color); localStorage.setItem('vls_sticky_ink', ic.color); setShowInks(false); setIsEraser(false); }} style={{ width: '24px', height: '24px', borderRadius: '50%', background: ic.color, border: '1px solid rgba(0,0,0,0.1)' }} />)}
                                    </div>
                                )}
                            </div>

                            <div style={{ position: 'relative' }}>
                                <button onClick={() => { setShowPencils(!showPencils); setShowColors(false); setShowInks(false); }} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: colors.text }}><PencilLine size={20} /></button>
                                {showPencils && (
                                    <div style={{ position: 'absolute', top: '30px', right: '-30px', background: 'white', padding: '10px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 100, width: '120px' }}>
                                        {Object.keys(PENCIL_TYPES).map(pt => (
                                            <button key={pt} onClick={() => { setPencilType(pt); localStorage.setItem('vls_sticky_pencil', pt); setShowPencils(false); }} style={{ padding: '5px 10px', borderRadius: '8px', background: pencilType === pt ? 'rgba(0,0,0,0.05)' : 'none', border: 'none', textAlign: 'left', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: inkColor, opacity: (PENCIL_TYPES[pt].thickness / 8) }} />
                                                {PENCIL_TYPES[pt].name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button onClick={() => { setIsDrawingMode(!isDrawingMode); setIsEditing(false); setIsOnboarding(false); setShowPencils(false); }} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: isDrawingMode ? '#ef4444' : colors.text }}>{isDrawingMode ? <MousePointer2 size={20} /> : <Edit2 size={20} />}</button>
                            
                            {isDrawingMode && (
                                <>
                                    <button onClick={() => setIsEraser(!isEraser)} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: isEraser ? '#2563eb' : colors.text }}><Eraser size={20} /></button>
                                    <button onClick={undo} disabled={historyStep <= 0} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: historyStep <= 0 ? '#cbd5e1' : colors.text }}><Undo2 size={20} /></button>
                                    <button onClick={redo} disabled={historyStep >= history.length - 1} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: historyStep >= history.length - 1 ? '#cbd5e1' : colors.text }}><Redo2 size={20} /></button>
                                    <button onClick={() => { if(confirm('¿Deseas limpiar el lienzo?')) { const c=canvasRef.current; c.getContext('2d').clearRect(0,0,c.width,c.height); pushToHistory(); } }} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: '#ef4444' }}><Trash2 size={20} /></button>
                                </>
                            )}

                            <button onClick={downloadNote} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: colors.text }}><Download size={20} /></button>
                            <button onClick={() => setIsVisible(false)} className="hover:scale-120 trans" style={{ background: 'none', border: 'none', color: '#dc2626' }}><X size={20} /></button>
                        </div>
                    </div>
                    
                    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                        {isEditing ? (
                            <textarea autoFocus value={noteText} onChange={(e) => setNoteText(e.target.value)} onBlur={() => { localStorage.setItem('vls_sticky_note', noteText); setIsEditing(false); }} style={{ ...noteStyle, zIndex: 30 }} />
                        ) : (
                            <div onClick={() => { if(!isDrawingMode) { setIsEditing(true); setIsOnboarding(false); } }} style={{ ...noteStyle, whiteSpace: 'pre-wrap', opacity: noteText === DEFAULT_NOTE ? 0.3 : 1, zIndex: 15, cursor: isDrawingMode ? 'inherit' : 'text' }}>{noteText}</div>
                        )}
                        <canvas 
                            ref={canvasRef} width={380} height={380}
                            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: isDrawingMode ? 20 : 5, pointerEvents: isDrawingMode ? 'auto' : 'none', touchAction: 'none' }}
                        />

                        {/* Onboarding Overlay */}
                        <AnimatePresence>
                            {isOnboarding && (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', borderRadius: '15px', pointerEvents: 'none' }}
                                >
                                    <div style={{ marginBottom: '15px', color: colors.main }}>
                                        <Sparkles size={40} className="animate-pulse" />
                                    </div>
                                    <h4 style={{ margin: '0 0 10px', fontWeight: '900', color: colors.main }}>¡BIENVENIDO!</h4>
                                    <p style={{ fontSize: '0.85rem', color: colors.text, margin: 0, lineHeight: '1.4' }}>
                                        <b>Dibuja</b> con el lápiz ✎<br/>
                                        <b>Escribe</b> haciendo clic en el papel<br/>
                                        <b>Cambia colores</b> arriba en el menú
                                    </p>
                                    <motion.div 
                                        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                                        style={{ marginTop: '20px', fontSize: '0.7rem', fontWeight: 'bold', color: colors.main, opacity: 0.6 }}
                                    >
                                        HAZ CLIC PARA EMPEZAR
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div style={{ position: 'absolute', bottom: '0', right: '0', width: '40px', height: '40px', background: `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%, ${colors.corner} 100%)`, borderBottomRightRadius: '40px', pointerEvents: 'none' }} />
                </motion.div>
            )}
            {!isVisible && (
                 <motion.button 
                    drag dragMomentum={false}
                    whileHover={{ scale: 1.15, rotate: 5 }} 
                    whileDrag={{ scale: 0.9, opacity: 0.8 }}
                    initial={{ opacity: 0, x: 100 }} 
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setIsVisible(true)}
                    style={{ 
                        position: 'fixed', bottom: '160px', right: '25px', 
                        background: colors.bg, color: colors.text, 
                        border: `3px solid ${colors.corner}`, borderRadius: '12px', 
                        width: '55px', height: '55px', 
                        boxShadow: '0 15px 35px rgba(0,0,0,0.3)', 
                        cursor: 'grab', zIndex: 90000, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: 'rotate(-5deg)'
                    }}
                 >
                    <Edit2 size={24} />
                 </motion.button>
            )}
        </AnimatePresence>
    );
}

const Sparkles = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
    </svg>
);

