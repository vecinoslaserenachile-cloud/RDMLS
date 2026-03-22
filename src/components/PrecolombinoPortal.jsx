import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Landmark, Sparkles, BookOpen, Compass, Info, ChevronRight, ChevronLeft, Camera } from 'lucide-react';

const CULTURES = [
    {
        id: 'olivar',
        name: 'Santuario El Olivar',
        period: 'Cultura Diaguita/Molle',
        desc: 'El hallazgo arqueológico más importante de las últimas décadas en Chile. Un cementerio y centro ceremonial de 35 hectáreas que revela la complejidad social de nuestros antepasados.',
        details: 'Ubicado en la salida norte de La Serena, este sitio fue descubierto durante las obras de la carretera a Vallenar. Contiene más de 200 entierros humanos, ofrendas de camélidos y cerámicas de una calidad artística excepcional.',
        image: '/vls_elolivar_sanctuary_3d_1774012523251.png',
        color: '#d4af37'
    },
    {
        id: 'diaguita',
        name: 'Cultura Diaguita',
        period: '900 d.C. - 1536 d.C.',
        desc: 'Maestros de la alfarería y la agricultura de riego. Su iconografía geométrica es un pilar fundamental de la identidad visual de la Región de Coquimbo.',
        details: 'Desarrollaron una metalurgia avanzada en cobre, plata y oro. Sus "jarros pato" son mundialmente reconocidos por su simetría y delicadeza técnica.',
        image: '/vls_diaguita_ceramic_smart_ui_1774012541579.png',
        color: '#ef4444'
    },
    {
        id: 'changos',
        name: 'Cultura Chango',
        period: 'Habitantes de la Costa',
        desc: 'Pueblos nómades del mar que dominaron la costa de La Serena usando balsas de cuero de lobo marino infladas.',
        details: 'Efectuaban intercambios comerciales con los pueblos del valle. Su tecnología de navegación les permitió dominar el Pacífico con una eficiencia asombrosa para la época.',
        image: '/vls_chango_sea_lion_raft_3d_1774012557846.png',
        color: '#38bdf8'
    },
    {
        id: 'molle-animas',
        name: 'Molle y Las Ánimas',
        period: 'Comienzos de la Era Cristiana',
        desc: 'Los primeros agricultores y ceramistas del Norte Chico. Introdujeron el uso de la metalurgia y la vida aldeana en nuestros valles.',
        details: 'Se caracterizan por el uso del tembetá (adorno labial) y el desarrollo de complejos ritos funerarios en los valles transversales.',
        image: '/vls_molle_animas_3d_1774012579587.png',
        color: '#10b981'
    }
];

export default function PrecolombinoPortal({ onClose }) {
    const [selectedIdx, setSelectedIdx] = useState(0);
    const item = CULTURES[selectedIdx];

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, zIndex: 1000150,
                    background: 'rgba(2, 6, 23, 0.98)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
                    backdropFilter: 'blur(30px)'
                }}
            >
                <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '90vh' }}>
                    <motion.div 
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        className="glass-panel"
                        style={{
                            width: '100%', height: '100%',
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '40px', display: 'flex', flexDirection: 'column',
                            overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.9)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: item.color, padding: '12px', borderRadius: '15px', color: 'black' }}>
                                    <Landmark size={28} />
                                </div>
                                <div>
                                    <h2 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px' }}>PORTAL PRECOLOMBINO VLS</h2>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' }}>Raíces e Identidad de La Serena y Coquimbo</p>
                                </div>
                            </div>
                            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Split */}
                        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                            {/* Left: Interactive Info */}
                            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="fade-in">
                                    <span style={{ color: item.color, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>{item.period}</span>
                                    <h1 style={{ color: 'white', fontSize: '3rem', margin: '0.5rem 0', fontWeight: '900' }}>{item.name}</h1>
                                    <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2rem' }}>{item.desc}</p>
                                    
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', borderLeft: `4px solid ${item.color}` }}>
                                        <h4 style={{ color: 'white', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}><Info size={18} color={item.color} /> Investigación Gemini IA</h4>
                                        <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>{item.details}</p>
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                                    {CULTURES.map((c, idx) => (
                                        <button 
                                            key={c.id}
                                            onClick={() => setSelectedIdx(idx)}
                                            style={{ 
                                                width: '12px', height: '12px', borderRadius: '50%', 
                                                background: selectedIdx === idx ? c.color : 'rgba(255,255,255,0.1)',
                                                border: 'none', cursor: 'pointer', transition: '0.3s'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right: Visual 3D Representation */}
                            <div style={{ flex: 1.2, background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.image ? (
                                    <motion.img 
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.8 }}
                                        src={item.image} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                ) : (
                                    <div style={{ color: '#334155', textAlign: 'center' }}>
                                        <Camera size={60} style={{ margin: '0 auto 1rem auto' }} />
                                        <p>Generando representación 3D...</p>
                                    </div>
                                )}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0f172a 0%, transparent 20%, transparent 80%, #0f172a 100%)' }} />
                                <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setSelectedIdx(prev => (prev === 0 ? CULTURES.length - 1 : prev - 1))} className="nav-btn"><ChevronLeft /></button>
                                    <button onClick={() => setSelectedIdx(prev => (prev === CULTURES.length - 1 ? 0 : prev + 1))} className="nav-btn"><ChevronRight /></button>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Smart Tag */}
                        <div style={{ padding: '1.2rem 3rem', background: 'rgba(0,0,0,0.6)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                <Sparkles size={14} color={item.color} /> MODELADO 3D & INVESTIGACIÓN CON GEMINI IA VLS 2026
                            </div>
                            <div style={{ color: 'white', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>
                                VECINOSLASERENA.CL
                            </div>
                        </div>
                    </motion.div>
                </div>

                <style>{`
                    .nav-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; width: 50px; height: 50px; borderRadius: 50%; display: flex; alignItems: center; justifyContent: center; cursor: pointer; backdropFilter: blur(10px); transition: 0.3s; }
                    .nav-btn:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }
                    .fade-in { animation: fadeIn 0.8s ease-out; }
                    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}

