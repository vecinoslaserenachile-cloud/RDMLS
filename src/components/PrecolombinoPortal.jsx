import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, MapPin, Calendar, Share2, Sparkles, Landmark } from 'lucide-react';
import HolographicFigure from './HolographicFigure';

const CULTURAL_ITEMS = [
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
        period: '900 - 1536 d.C.',
        desc: 'Maestría en alfarería con patrones geométricos complejos. Sus piezas no solo eran funcionales, sino portadoras de una cosmología sofisticada.',
        details: 'Se caracteriza por el uso de colores blanco, negro y rojo. Los diseños "greca" y las figuras antropomorfas (como el jarro pato) son íconos de la identidad regional.',
        image: '/vls_diaguita_ceramic_smart_ui_1774012541579.png',
        color: '#ef4444'
    },
    {
        id: 'molle',
        name: 'Complejo El Molle',
        period: '300 a.C. - 700 d.C.',
        desc: 'Pioneros en la metalurgia y la agricultura en los valles transversales. Sentaron las bases de la vida aldeana en la región.',
        details: 'Conocidos por sus "tembetás" (adornos labiales) y su avanzada técnica en el trabajo del cobre y oro, además de una alfarería de gran elegancia.',
        image: '/vls_molle_animas_3d_1774012579587.png',
        color: '#10b981'
    },
    {
        id: 'changos',
        name: 'Cultura de los Changos',
        period: 'Recolectores del Litoral',
        desc: 'Pueblos navegantes que dominaron las costas del norte de Chile. Su balsa de cuero de lobo marino es una obra maestra de ingeniería náutica.',
        details: 'Vivían de la pesca y la recolección marina. Su intercambio comercial con los pueblos del interior (Diaguitas y Molles) fue clave para el desarrollo regional.',
        image: '/vls_chango_sea_lion_raft_3d_1774012557846.png',
        color: '#38bdf8'
    }
];

export default function PrecolombinoPortal({ onClose }) {
    const [selectedId, setSelectedId] = useState(CULTURAL_ITEMS[0].id);
    const item = CULTURAL_ITEMS.find(x => x.id === selectedId);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.98) 0%, #020617 100%)',
                zIndex: 4000000,
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "'Outfit', sans-serif",
                backdropFilter: 'blur(15px)'
            }}
        >
            {/* Header */}
            <div style={{ padding: '1.5rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#ec4899', padding: '10px', borderRadius: '12px' }}>
                        <Sparkles size={24} color="white" />
                    </div>
                    <div>
                        <h1 style={{ color: 'white', margin: 0, fontSize: '1.4rem', fontWeight: 950, letterSpacing: '2px' }}>RAÍCES PRECOLOMBINAS</h1>
                        <p style={{ color: '#ec4899', margin: 0, fontSize: '0.65rem', fontWeight: 'bold', letterSpacing: '3px' }}>ARCHIVO DIGITAL ANCESTRAL</p>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '10px', borderRadius: '50%', cursor: 'pointer', transition: '0.3s' }}>
                    <X size={24} />
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Left: Nav & Description */}
                <div style={{ flex: 0.8, padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {CULTURAL_ITEMS.map((ci) => (
                            <button
                                key={ci.id}
                                onClick={() => setSelectedId(ci.id)}
                                style={{
                                    padding: '1.2rem',
                                    borderRadius: '16px',
                                    border: '1px solid',
                                    borderColor: selectedId === ci.id ? ci.color : 'rgba(255,255,255,0.05)',
                                    background: selectedId === ci.id ? `${ci.color}15` : 'rgba(255,255,255,0.02)',
                                    color: selectedId === ci.id ? 'white' : '#64748b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ci.color }} />
                                <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>{ci.name.toUpperCase()}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: item.color }}>
                                <Calendar size={18} />
                                <span style={{ fontSize: '0.8rem', fontWeight: 900 }}>{item.period}</span>
                            </div>
                            <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 950, lineHeight: 1 }}>{item.name}</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.6 }}>{item.desc}</p>
                            
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h4 style={{ color: item.color, fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '10px' }}>DETALLES DEL HALLAZGO</h4>
                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{item.details}</p>
                            </div>

                            <button style={{ alignSelf: 'flex-start', background: item.color, color: '#000', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 950, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Info size={18} /> EXPLORAR CATÁLOGO COMPLETO
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right: Visual (Hologram Effect) */}
                <div style={{ flex: 1.2, background: 'rgba(0,0,0,0.4)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <HolographicFigure image={item.image} name={item.name} color={item.color} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Ambient Glow */}
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
                </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '1rem 3rem', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>© 2026 ARCHIVO PRECOLOMBINO VLS — MUSEO VIRTUAL DEL ELQUI</span>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={14} /> UBICACIÓN DEL MUSEO</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}><Share2 size={14} /> COMPARTIR HALLAZGO</button>
                </div>
            </div>
        </motion.div>
    );
}
