import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Share2, Smartphone, FileText, ShoppingBag, Music, Users, MessageSquare, CheckCircle2, ChevronRight, Star, Award, ShieldCheck, Trophy } from 'lucide-react';

const CHALLENGES = [
    { id: 1, title: 'Comparte un Himno', task: 'Comparte una canción de Suno VLS', reward: 50, icon: Share2, status: 'pending' },
    { id: 2, title: 'Primer Reporte', task: 'Envía un reporte de Smart City', reward: 50, icon: FileText, status: 'pending' },
    { id: 3, title: 'Vecino Digital', task: 'Registra tu local en el Mall', reward: 100, icon: ShoppingBag, status: 'completed' },
    { id: 4, title: 'Oído Soberano', task: 'Escucha Radio VLS por 1 h', reward: 30, icon: Music, status: 'pending' },
    { id: 5, title: 'Círculo de Confianza', task: 'Sigue a 3 vecinos destacados', reward: 50, icon: Users, status: 'pending' },
    { id: 6, title: 'Comenta y Mejora', task: 'Deja un feedback en el portal', reward: 20, icon: MessageSquare, status: 'pending' }
];

export default function VLSChallenges({ onClose }) {
    const [challenges, setChallenges] = useState(CHALLENGES);
    const completedCount = challenges.filter(c => c.status === 'completed').length;
    const progress = (completedCount / challenges.length) * 100;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER CHALLENGES */}
            <div style={{ background: '#0f172a', padding: '1.2rem 3rem', borderBottom: '2px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="3" />
                            <motion.path 
                                initial={{ strokeDasharray: "0, 100" }} 
                                animate={{ strokeDasharray: `${progress}, 100` }}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                fill="none" stroke="#fcd34d" strokeWidth="3" 
                            />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', color: '#fcd34d' }}>
                            {completedCount}/{challenges.length}
                        </div>
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>MISIONES DE COMUNA SMART</h2>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold' }}>GANA +50 FICHAS VLS POR CADA DESAFÍO COMPLETADO</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(252, 211, 77, 0.1)', color: '#fcd34d', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #fcd34d44' }}>
                        <Award size={18} /> VECINO DISTINGUIDO
                    </div>
                    <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>X CERRAR</button>
                </div>
            </div>

            <div style={{ flex: 1, padding: '3rem', overflowX: 'auto', display: 'flex', alignItems: 'center', gap: '2rem', background: 'radial-gradient(circle at 10% 20%, #0c4a6e 0%, #020617 100%)' }}>
                {challenges.map(challenge => (
                    <motion.div 
                        whileHover={{ y: -10, scale: 1.05 }}
                        key={challenge.id} 
                        style={{ 
                            minWidth: '220px', 
                            height: '350px', 
                            background: challenge.status === 'completed' ? 'rgba(252, 211, 77, 0.05)' : 'rgba(252, 211, 77, 0.02)', 
                            borderRadius: '32px', 
                            border: `2px solid ${challenge.status === 'completed' ? '#fcd34d' : 'rgba(255,255,255,0.05)'}`, 
                            padding: '2rem', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between', 
                            textAlign: 'center',
                            position: 'relative'
                        }}
                    >
                        {challenge.status === 'completed' && <CheckCircle2 size={30} color="#fcd34d" style={{ position: 'absolute', top: -15, right: -15, background: '#020617', borderRadius: '50%' }} />}
                        
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>{challenge.title}</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{challenge.task}</p>
                            <div style={{ marginTop: '1.5rem', background: 'rgba(252, 211, 77, 0.1)', color: '#fcd34d', padding: '5px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900', display: 'inline-block' }}>
                                +{challenge.reward} FICHAS
                            </div>
                        </div>

                        <div style={{ fontSize: '4rem', color: challenge.status === 'completed' ? '#fcd34d' : 'rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(252, 211, 77, 0.2))' }}>
                            <challenge.icon size={60} strokeWidth={1} />
                        </div>

                        <button 
                            disabled={challenge.status === 'completed'}
                            style={{ 
                                width: '100%', padding: '12px', border: 'none', borderRadius: '16px', 
                                background: challenge.status === 'completed' ? 'transparent' : '#fcd34d', 
                                color: challenge.status === 'completed' ? '#fcd34d' : '#0f172a', 
                                fontWeight: '900', fontSize: '0.8rem', cursor: challenge.status === 'completed' ? 'default' : 'pointer',
                                border: challenge.status === 'completed' ? '1px solid #fcd34d' : 'none'
                            }}
                        >
                            {challenge.status === 'completed' ? 'FINALIZADO' : 'ACEPTAR'}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* FOOTER GAMIFICATION */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={14} color="#fcd34d" />
                    <span>SISTEMA DE GAMIFICACIÓN SOBERANA — POR VECINOSLASERENA.CL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Trophy size={14} color="#fcd34d" />
                    <span>CLASIFICATORIAS MUNICIPALES 2026</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
