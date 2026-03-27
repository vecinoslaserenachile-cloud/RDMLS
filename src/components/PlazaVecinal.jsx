import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, TrendingUp, X, Search, Filter, Hash, Share2, Heart, Award, Map, Navigation, Send, Plus } from 'lucide-react';

/**
 * LA PLAZA VECINAL: El Micro Red Social Interactiva de VLS.
 * Visualización por Clusters de Opinión y Burbujas de Impacto.
 */
const PlazaVecinal = ({ onClose, currentUser }) => {
    const [activeTab, setActiveTab] = useState('bubbles'); // bubbles, list, map
    const [bubbles, setBubbles] = useState([
        { id: 1, text: '¡Excelente arreglo en la calle 2!', category: 'Vialidad', size: 120, pos: { x: 50, y: 50 }, likes: 12 },
        { id: 2, text: 'Propuesta de taller de baile regional', category: 'Cultura', size: 100, pos: { x: 200, y: 150 }, likes: 8 },
        { id: 3, text: 'Preocupación por luminarias en sector norte', category: 'Seguridad', size: 150, pos: { x: 100, y: 300 }, likes: 25 },
        { id: 4, text: '¿Donde comprar pan de papaya hoy?', category: 'Dato Vecino', size: 90, pos: { x: 300, y: 50 }, likes: 5 },
        { id: 5, text: 'Felicitaciones a los equipos de limpieza', category: 'Aseo', size: 110, pos: { x: 400, y: 200 }, likes: 15 }
    ]);

    const categories = ['Vialidad', 'Cultura', 'Seguridad', 'Dato Vecino', 'Aseo', 'Eventos'];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel gaudi-curves shadow-2xl"
            style={{
                position: 'fixed', inset: '20px', zIndex: 1000000,
                background: 'rgba(5, 10, 20, 0.98)',
                border: '2px solid #38bdf8', display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', borderBottom: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#38bdf8', padding: '12px', borderRadius: '50%', boxShadow: '0 0 20px #38bdf8' }}>
                        <Users color="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.6rem', fontWeight: 900 }}>LA PLAZA <span style={{ color: '#38bdf8' }}>VECINAL</span></h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.8rem' }}>Conversación Ciudadana en Tiempo Real</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                   <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '5px' }}>
                       <button onClick={() => setActiveTab('bubbles')} style={{ background: activeTab === 'bubbles' ? '#38bdf8' : 'none', border: 'none', color: activeTab === 'bubbles' ? '#000' : 'white', padding: '6px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Burbujas</button>
                       <button onClick={() => setActiveTab('list')} style={{ background: activeTab === 'list' ? '#38bdf8' : 'none', border: 'none', color: activeTab === 'list' ? '#000' : 'white', padding: '6px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Muro</button>
                       <button onClick={() => setActiveTab('map')} style={{ background: activeTab === 'map' ? '#38bdf8' : 'none', border: 'none', color: activeTab === 'map' ? '#000' : 'white', padding: '6px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>Mapa</button>
                   </div>
                   <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '10px' }}><X size={24} /></button>
                </div>
            </div>

            {/* Canvas/Area de Juego */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '1rem' }}>
                {activeTab === 'bubbles' && (
                    <div style={{ position: 'relative', width: '100%', height: '100%', perspective: '1000px' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        
                        {bubbles.map(bubble => (
                            <motion.div
                                key={bubble.id}
                                drag
                                dragConstraints={{ top: 0, left: 0, right: 800, bottom: 600 }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, x: bubble.pos.x, y: bubble.pos.y }}
                                whileHover={{ scale: 1.1, boxShadow: '0 0 30px #38bdf8' }}
                                style={{
                                    position: 'absolute',
                                    width: bubble.size,
                                    height: bubble.size,
                                    borderRadius: '50%',
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid #38bdf8',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '15px',
                                    cursor: 'grab',
                                    zIndex: bubble.likes,
                                    boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(56, 189, 248, 0.2)`
                                }}
                            >
                                <span style={{ color: '#38bdf8', fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '5px' }}>{bubble.category}</span>
                                <p style={{ color: 'white', fontSize: '0.75rem', textAlign: 'center', margin: 0, lineHeight: 1.2 }}>{bubble.text}</p>
                                <div style={{ background: '#38bdf8', color: '#000', borderRadius: '10px', padding: '2px 8px', fontSize: '0.65rem', fontWeight: 'bold', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Heart size={10} fill="currentColor" /> {bubble.likes}
                                </div>
                            </motion.div>
                        ))}

                        {/* Menú Lateral de Categorías */}
                        <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {categories.map(cat => (
                                <button key={cat} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px 15px', borderRadius: '15px', fontSize: '0.75rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s' }}>
                                    # {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Input Footer */}
            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #38bdf8', flexShrink: 0 }}>
                    <img src={currentUser?.photoURL || '/serenito_v3.png'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User" />
                </div>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '30px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Plus size={20} color="#38bdf8" style={{ cursor: 'pointer' }} />
                    <input 
                        type="text" 
                        placeholder="Comparte algo con tu barrio..." 
                        style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '1rem' }}
                    />
                    <button style={{ background: '#38bdf8', color: '#000', padding: '8px 20px', borderRadius: '20px', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        PUBLICAR <Send size={16} />
                    </button>
                </div>
            </div>

            {/* Borde inferior */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #38bdf8 0%, #a855f7 100%)' }} />
        </motion.div>
    );
};

export default PlazaVecinal;
