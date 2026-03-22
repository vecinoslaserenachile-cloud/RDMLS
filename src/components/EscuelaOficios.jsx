import React, { useState, useEffect } from 'react';
import { 
    BookOpen, CheckCircle, 
    Play, ArrowRight, 
    Star, Award, 
    X, Check, AlertCircle,
    Smartphone,
    MessageCircle,
    Zap,
    Navigation,
    Music,
    Volume2,
    ShieldAlert,
    ArrowDown,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EscuelaOficios({ onClose }) {
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState(() => {
        const saved = localStorage.getItem('vls_oficios_progress');
        return saved ? JSON.parse(saved) : [];
    });
    const [examMode, setExamMode] = useState(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const oficios = [
        { 
            id: 'creole-l1', title: 'Creole para Atención de Público', level: 'Básico', 
            icon: '🇭🇹', iconColor: '#ec4899', desc: 'Frases esenciales para salud y comercio.',
            content: 'Bienvenido al curso de Creole Haitiano. Aprenderás las bases para una comunicación efectiva en el comercio y servicios públicos de La Serena.',
            questions: [
                { q: '¿Qué significa "Bonswa" en Creole?', options: ['Hola', 'Buenas tardes', 'Adiós'], answer: 1, icon: <Volume2 /> },
                { q: '¿Cómo se dice "¿Puedo ayudarle?"?', options: ['Mwen kapab ede w?', 'Ki jan ou ye?', 'Mèsi anpil'], answer: 0, icon: <MessageCircle /> },
                { q: '¿Qué significa "Souple"?', options: ['Perdón', 'Por favor', 'Gracias'], answer: 1, icon: <Star /> },
                { q: 'Si un vecino dice "Mèsi", tú respondes:', options: ['Pa fwa', 'De rien', 'Anyen'], answer: 2, icon: <CheckCircle /> },
                { q: '¿Qué significa "Ki kote lopital la ye?"', options: ['¿Dónde está el baño?', '¿Dónde está el hospital?', '¿Cómo llego al mercado?'], answer: 1, icon: <AlertCircle /> },
                { q: 'Para preguntar el nombre se dice:', options: ['Ki jan ou rele?', 'Ki laj ou genyen?', 'Ki kote ou rete?'], answer: 0, icon: <Users size={20} /> },
                { q: '¿Cómo se dice "No entiendo" en Creole?', options: ['Mwen pa konprann', 'Mwen pa konnen', 'Mwen pa tande'], answer: 0, icon: <MessageCircle /> },
                { q: 'Para preguntar el precio de un producto:', options: ['Ki kote li ye?', 'Konbe sa koute?', 'Sa a se bèl'], answer: 1, icon: <Smartphone size={20} /> },
                { q: '¿Qué significa "Dwa devan"?', options: ['A la derecha', 'A la izquierda', 'Derecho hacia adelante'], answer: 2, icon: <Navigation /> },
                { q: '¿Cómo dices "Disculpe" para pasar?', options: ['Bonswa', 'Eskize m', 'Orevwa'], answer: 1, icon: <Volume2 /> }
            ]
        },
        { 
            id: 'electric-l1', title: 'Instalaciones Eléctricas D.S. N° 8', level: 'Intermedio', 
            icon: '⚡', iconColor: '#f59e0b', desc: 'Normativa SEC para empalmes certificados.',
            content: 'Norma técnica: Código de colores chileno. Es vital para la seguridad en la autoconstrucción y mantención municipal.',
            questions: [
                { q: '¿De qué color es el cable de Tierra en Chile?', options: ['Verde/Amarillo', 'Azul', 'Rojo'], answer: 0, icon: <Zap /> },
                { q: '¿Qué color identifica al Neutro?', options: ['Negro', 'Blanco', 'Verde'], answer: 1, icon: <Zap /> },
                { q: 'Un empalme certificado debe ser inspeccionado por:', options: ['El municipio', 'SEC autorizada', 'Vecino calificado'], answer: 1, icon: <CheckCircle /> },
                { q: '¿Qué significa D.S. N° 8?', options: ['Decreto Supremo', 'Documento SEC', 'Directiva Social'], answer: 0, icon: <Award /> },
                { q: '¿Qué voltaje nominal se usa en red domiciliaria?', options: ['110V', '220V', '380V'], answer: 1, icon: <Zap /> },
                { q: 'El disyuntor protege contra:', options: ['Humedad', 'Sobreconsumo', 'Polvo'], answer: 1, icon: <ShieldAlert size={20} /> },
                { q: '¿Para qué sirve el diferencial?', options: ['Ahorrar luz', 'Evitar electrocución', 'Medir voltaje'], answer: 1, icon: <Zap /> },
                { q: '¿Se puede usar cable de 1.5mm para enchufes?', options: ['Sí, siempre', 'Solo para luces', 'Depende de la carga'], answer: 1, icon: <AlertCircle /> },
                { q: 'La profundidad de una canalización enterrada debe ser:', options: ['20cm', '45cm o más', '10cm'], answer: 1, icon: <ArrowDown size={20} /> },
                { q: '¿Qué significa IP65 en una luminaria?', options: ['Potencia alta', 'Protección climática', 'Infrarrojo'], answer: 1, icon: <Zap /> }
            ]
        },
        { 
            id: 'drones-l1', title: 'Operación de Drones (DroneDrigo)', level: 'Avanzado', 
            icon: '🚁', iconColor: '#38bdf8', desc: 'Pilotaje para inspección técnica de baches.',
            content: 'Protocolo de vuelo DGAC aplicado a la fiscalización urbana en La Serena.',
            questions: [
                { q: '¿Se puede volar dron cerca del Aeródromo La Florida?', options: ['Sí', 'Solo con permiso DGAC', 'No está permitido'], answer: 1, icon: <Navigation /> },
                { q: 'Altura máxima legal de vuelo recreativo:', options: ['120 metros', '500 metros', 'Sin límite'], answer: 0, icon: <Navigation /> },
                { q: '¿Qué es el VLOS?', options: ['Vuelo con gafas', 'Línea de visión visual', 'Vuelo satelital'], answer: 1, icon: <Smartphone size={20} /> },
                { q: 'Inspección de baches requiere cámara:', options: ['Térmica', 'RGB de alta res', 'No requiere'], answer: 1, icon: <Play /> },
                { q: 'Antes de volar debo:', options: ['Cargar batería', 'Checklist e inspección local', 'Ambas'], answer: 2, icon: <Check /> },
                { q: '¿Se puede volar sobre multitudes?', options: ['Sí, con cuidado', 'Prohibido por seguridad', 'Solo en el Faro'], answer: 1, icon: <AlertCircle /> },
                { q: '¿Qué hacer ante pérdida de señal?', options: ['Esperar', 'RTH (Return to Home)', 'Apagar control'], answer: 1, icon: <Navigation /> },
                { q: 'Drones para el municipio deben estar:', options: ['Pintados de azul', 'Registrados en DAN 91/151', 'Libres de patente'], answer: 1, icon: <Award /> },
                { q: 'Cero alcohol para pilotar:', options: ['Cierto', 'Falso', 'Solo en emergencias'], answer: 0, icon: <CheckCircle /> },
                { q: 'Vuelo nocturno requiere:', options: ['Luces estroboscópicas', 'Cámara nocturna', 'No se permite'], answer: 0, icon: <Zap /> }
            ]
        }
    ];

    const handleAnswer = (idx) => {
        setSelectedAnswer(idx);
        const correct = idx === activeLesson.questions[currentQuestionIdx].answer;
        
        setTimeout(() => {
            if (correct) setScore(s => s + 1);
            
            if (currentQuestionIdx < activeLesson.questions.length - 1) {
                setCurrentQuestionIdx(c => c + 1);
                setSelectedAnswer(null);
            } else {
                setShowResult(true);
            }
        }, 800);
    };

    const handleFinalize = () => {
        if (score >= activeLesson.questions.length * 0.7) {
            if (!completedLessons.includes(activeLesson.id)) {
                const newCompleted = [...completedLessons, activeLesson.id];
                setCompletedLessons(newCompleted);
                localStorage.setItem('vls_oficios_progress', JSON.stringify(newCompleted));
            }
            alert('¡FELICITACIONES! Has aprobado con honor y ganado tu micro-certificación.');
        } else {
            alert('Puntaje: ' + score + '/' + activeLesson.questions.length + '. No has alcanzado el puntaje mínimo (70%). Te recomendamos repasar la lección.');
        }
        resetStates();
    };

    const resetStates = () => {
        setExamMode(false);
        setActiveLesson(null);
        setCurrentQuestionIdx(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100110, background: 'rgba(2, 6, 23, 0.98)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', padding: '1rem' }}>
            
            {/* Header */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} style={{ background: 'linear-gradient(45deg, #f59e0b, #d97706)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,223,0,0.4)' }}>
                        <BookOpen size={24} color="white" />
                    </motion.div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px', color: 'white' }}>ESCUELA DE OFICIOS P2P</h2>
                        <div style={{ background: '#f59e0b', color: 'black', display: 'inline-block', fontSize: '0.55rem', fontWeight: '900', padding: '1px 6px', borderRadius: '50px' }}>METODOLOGÍA LÚDICA 2026</div>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ padding: '8px', borderRadius: '50%' }}><X size={20} /></button>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                
                <AnimatePresence mode="wait">
                    {!activeLesson ? (
                        <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {oficios.map((oficio) => (
                                <div key={oficio.id} className="glass-panel" style={{ padding: '2rem', borderRadius: '30px', border: `1px solid ${oficio.iconColor}40`, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: `linear-gradient(135deg, ${oficio.iconColor}15, rgba(15, 23, 42, 0.8))` }}>
                                    {completedLessons.includes(oficio.id) && (
                                        <div style={{ position: 'absolute', top: '15px', right: '15px', color: '#10b981' }}>
                                            <Award size={24} fill="#10b981" color="#000" />
                                        </div>
                                    )}
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{oficio.icon}</div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'white' }}>{oficio.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', flex: 1, marginBottom: '2rem' }}>{oficio.desc}</p>
                                    
                                    <button 
                                        onClick={() => {
                                            setActiveLesson(oficio);
                                            setCurrentQuestionIdx(0);
                                            setScore(0);
                                            setExamMode(false);
                                        }}
                                        style={{ 
                                            width: '100%', padding: '1rem', borderRadius: '15px', border: 'none', 
                                            background: oficio.iconColor, 
                                            color: 'black', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                        }}
                                    >
                                        INGRESAR AL AULA <Play size={16} fill="black" />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    ) : showResult ? (
                        <motion.div key="result" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '3rem', background: '#0f172a', borderRadius: '40px', border: `2px solid ${score >= 7 ? '#10b981' : '#ef4444'}`, margin: 'auto' }}>
                            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>{score >= 7 ? '🎓' : '📚'}</div>
                            <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>{score >= 7 ? '¡APROBADO!' : 'REPASO NECESARIO'}</h2>
                            <p style={{ fontSize: '1.5rem', color: '#94a3b8' }}>Has acertado {score} de {activeLesson.questions.length} desafíos.</p>
                            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', margin: '2rem 0', overflow: 'hidden' }}>
                                <motion.div initial={{ width: 0 }} animate={{ width: `${(score / activeLesson.questions.length) * 100}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: score >= 7 ? '#10b981' : '#f59e0b' }} />
                            </div>
                            <button onClick={handleFinalize} style={{ padding: '1.2rem 3rem', borderRadius: '15px', background: 'white', color: 'black', fontWeight: '900', border: 'none', cursor: 'pointer' }}>CONTINUAR</button>
                        </motion.div>
                    ) : (
                        <motion.div key="lesson" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#0f172a', padding: '2rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {!examMode ? (
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                                        <div style={{ fontSize: '3rem' }}>{activeLesson.icon}</div>
                                        <div>
                                            <h3 style={{ margin: 0, color: 'white', fontSize: '1.8rem' }}>{activeLesson.title}</h3>
                                            <div style={{ color: activeLesson.iconColor, fontSize: '0.9rem', fontWeight: 'bold' }}>NIVEL: {activeLesson.level}</div>
                                        </div>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '25px', flex: 1, border: '1px solid rgba(255,255,255,0.1)', lineHeight: '1.8', fontSize: '1.2rem', color: '#cbd5e1' }}>
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{activeLesson.content}</p>
                                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.8rem 1.2rem', borderRadius: '12px', color: '#38bdf8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Music size={18} /> Narración IA Activa
                                            </div>
                                            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem 1.2rem', borderRadius: '12px', color: '#10b981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Smartphone size={18} /> Ludificación 2026
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                        <button onClick={() => setActiveLesson(null)} className="btn-glass" style={{ padding: '1rem 2rem' }}>VOLVER</button>
                                        <button onClick={() => setExamMode(true)} style={{ flex: 1, background: activeLesson.iconColor, color: 'black', fontWeight: '900', padding: '1rem', borderRadius: '15px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', boxShadow: `0 10px 20px ${activeLesson.iconColor}40` }}>
                                            COMENZAR EVALUACIÓN (10 PREGUNTAS) <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ display: 'flex', gap: '6px', marginBottom: '2rem', padding: '0 1rem' }}>
                                        {activeLesson.questions.map((_, i) => (
                                            <div key={i} style={{ flex: 1, height: '8px', borderRadius: '4px', background: i < currentQuestionIdx ? activeLesson.iconColor : i === currentQuestionIdx ? 'white' : 'rgba(255,255,255,0.1)', transition: 'all 0.3s' }} />
                                        ))}
                                    </div>
                                    
                                    <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
                                        <motion.div key={currentQuestionIdx} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                                            <div style={{ color: activeLesson.iconColor, fontSize: '3.5rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>
                                                {activeLesson.questions[currentQuestionIdx].icon}
                                            </div>
                                            <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '2.5rem', lineHeight: '1.3' }}>{activeLesson.questions[currentQuestionIdx].q}</h3>
                                            
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                                                {activeLesson.questions[currentQuestionIdx].options.map((opt, i) => (
                                                    <button 
                                                        key={i} 
                                                        onClick={() => handleAnswer(i)}
                                                        disabled={selectedAnswer !== null}
                                                        style={{ 
                                                            padding: '1.2rem 1.5rem', borderRadius: '20px', 
                                                            border: selectedAnswer === i ? `2px solid ${i === activeLesson.questions[currentQuestionIdx].answer ? '#10b981' : '#ef4444'}` : '1px solid rgba(255,255,255,0.1)',
                                                            background: selectedAnswer === i ? (i === activeLesson.questions[currentQuestionIdx].answer ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)') : 'rgba(255,255,255,0.02)',
                                                            color: 'white', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                                            display: 'flex', alignItems: 'center', gap: '15px', position: 'relative'
                                                        }}
                                                    >
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', color: activeLesson.iconColor }}>{String.fromCharCode(65 + i)}</div>
                                                        {opt}
                                                        {selectedAnswer === i && (
                                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginLeft: 'auto' }}>
                                                                {i === activeLesson.questions[currentQuestionIdx].answer ? <CheckCircle size={24} color="#10b981" /> : <X size={24} color="#ef4444" />}
                                                            </motion.div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Stats Footer */}
            {!activeLesson && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: '1000px', margin: '1rem auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <div>
                            <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '900', letterSpacing: '2px' }}>PUNTOS DE EXPERIENCIA</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#f59e0b' }}>{completedLessons.length * 500} XP</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: '900', letterSpacing: '2px' }}>MICRO-CERTIFICACIONES</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#10b981' }}>{completedLessons.length} VALIDADAS</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
