import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Zap, Shield, Search, Mic2, Youtube, FileText, Share2, Layers, Cpu, CheckCircle, AlertTriangle, TrendingUp, Lightbulb, Users, MessageSquare, Heart, Sparkles } from 'lucide-react';

const HATS_CONFIG = [
    { id: 'white', label: 'Datos & Vivienda', color: '#fff', icon: FileText, desc: 'Hechos objetivos, deuda habitacional y realidades del suelo.' },
    { id: 'red', label: 'Sensibilidad ¡FA!', color: '#ef4444', icon: Heart, desc: 'Emociones, autenticidad y el "error humano" irreemplazable.' },
    { id: 'black', label: 'Riesgo & Atrevimiento', color: '#000', icon: AlertTriangle, desc: 'Crítica constructiva vs. el salto al vacío del deseo.' },
    { id: 'yellow', label: 'Hospitalidad Comunal', color: '#fcd34d', icon: TrendingUp, desc: 'La casa como célula social de memoria y orden.' },
    { id: 'green', label: 'Tradición Dinámica', color: '#22c55e', icon: Lightbulb, desc: 'Folklore en movimiento, innovación y nuevos eslabones.' },
    { id: 'blue', label: 'Gobernanza del Deseo', color: '#3b82f6', icon: Shield, desc: 'Gestión ética del Arquitecto orquestando la inspiración.' }
];

export default function DeBonoThinkingHatsVLS({ onClose }) {
    const [activeInput, setActiveInput] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const isFable = activeInput.toLowerCase().includes('historia') || activeInput.toLowerCase().includes('musica') || activeInput.toLowerCase().includes('fa');
            setAnalysisResult({
                topic: isFable ? 'Interpretación Creativa (Sofia & Lucas)' : 'Dossier Real (Arquitecto Invisible)',
                summary: isFable 
                    ? 'Sofia y Lucas han mashupeado este material para encontrar la chispa de inspiración que nos une como hijos de la región.' 
                    : 'Reporte de Perspectivas: Análisis técnico del suelo y la sensibilidad habitacional para la toma de decisiones ejecutivas.',
                type: isFable ? 'fable' : 'real'
            });
            setIsAnalyzing(false);
        }, 2500);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000000, background: 'rgba(2, 6, 23, 0.99)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* DE BONO HEADER */}
            <div style={{ background: '#0f172a', padding: '1.5rem 3rem', borderBottom: '4px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#fcd34d', padding: '10px', borderRadius: '15px' }}>
                        <Cpu color="#0f172a" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>VLS DEBONO: MOTOR DE ANÁLISIS SOBERANO</h2>
                        <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>LOS 6 SOMBREROS DE LA SERENA INTELIGENTE — INTERPRETACIÓN MULTIMEDIA</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR MOTOR</button>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr', gap: '2rem', overflow: 'hidden' }}>
                
                {/* 1. INPUT AREA (Youtube, Voice, Text) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>INGRESO DE MATERIAL SOBERANO</h3>
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <Youtube style={{ position: 'absolute', left: '15px', top: '15px', color: '#ff0000' }} size={20} />
                            <input 
                                placeholder="Pegue link de YouTube, MP3 o Texto..."
                                value={activeInput}
                                onChange={(e) => setActiveInput(e.target.value)}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid #334155', borderRadius: '16px', padding: '15px 15px 15px 50px', color: 'white', fontSize: '0.9rem' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ flex: 1, background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '12px', borderRadius: '12px', border: '1px solid #38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <Mic2 size={16} /> GRABAR VOZ
                            </button>
                            <button 
                                onClick={startAnalysis}
                                disabled={!activeInput || isAnalyzing}
                                style={{ flex: 1, background: '#fcd34d', color: '#000', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: '900', cursor: 'pointer', opacity: (!activeInput || isAnalyzing) ? 0.5 : 1 }}
                            >
                                {isAnalyzing ? 'PROCESANDO...' : 'RE-MASHUP & ANÁLISIS'}
                            </button>
                        </div>
                    </div>

                    {/* INTERPRETATION LEGEND */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', flex: 1, overflowY: 'auto' }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', marginBottom: '1.5rem' }}>DISPOSICIÓN DE LOS 6 SOMBREROS</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                            {HATS_CONFIG.map(hat => (
                                <div key={hat.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '15px', border: `1px solid ${hat.color}22` }}>
                                    <div style={{ width: '30px', height: '30px', background: hat.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                         <span style={{ fontSize: '1.2rem' }}>🎩</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: hat.color }}>{hat.label}</div>
                                        <div style={{ fontSize: '0.6rem', color: '#64748b' }}>{hat.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. RESULTS AREA */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '40px', padding: '3.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
                    <AnimatePresence>
                        {analysisResult ? (
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: analysisResult.type === 'fable' ? '#fcd34d' : '#38bdf8' }}>{analysisResult.topic}</h3>
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '10px 20px', borderRadius: '15px', border: '1px solid #10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>{analysisResult.type === 'fable' ? 'FÁBULA VECINAL' : 'INFORME REAL'}</div>
                                </div>
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', overflowY: 'auto', paddingRight: '10px' }}>
                                    {HATS_CONFIG.map(hat => (
                                        <div key={hat.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '25px', border: `1px solid ${hat.color}55` }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                                <span style={{ fontSize: '1.5rem' }}>🎩</span>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: hat.color }}>{hat.label}</span>
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.6' }}>
                                                {analysisResult.type === 'fable' 
                                                    ? `Sofia y Lucas interpretan este sombrero como una invitación a soñar con ${hat.label.toLowerCase()} para La Serena.`
                                                    : `El Arquitecto Invisible valida este punto bajo la óptica de ${hat.label.toLowerCase()} estratégica.`
                                                }
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                    <button style={{ flex: 1, background: '#10b981', color: '#000', padding: '15px', borderRadius: '15px', border: 'none', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                                        <Share2 size={20} /> INYECTAR EN ELITE 120
                                    </button>
                                    <button onClick={() => setAnalysisResult(null)} style={{ background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '15px', borderRadius: '15px', fontWeight: 'bold' }}>NUEVO ANÁLISIS</button>
                                </div>
                            </motion.div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#334155' }}>
                                <Layers size={80} style={{ marginBottom: '2rem', opacity: 0.2 }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ESPERANDO MATERIAL SOBERANO</h3>
                                <p style={{ fontSize: '0.9rem', maxWidth: '400px', marginTop: '1rem' }}>Súmanos un link de YouTube, un pensamiento o la voz de un vecino incómodo para realizar el mashup analítico de Comuna Smart.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#334155', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Shield size={14} color="#fcd34d" />
                    <span>IMPARCIALIDAD SOBERANA ACTIVA — METODOLOGÍA DE BONO V2.0</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Users size={14} color="#38bdf8" />
                    <span>NODO DE INTELIGENCIA VLS</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
