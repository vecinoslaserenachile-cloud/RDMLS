import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ShoppingBag, Coffee, Hammer, Music, Scissors, Stethoscope, Laptop, Utensils, X, ChevronRight, PlusCircle, Globe, Building2, Zap, Star, Gamepad2, Ghost, Users, MessageSquare } from 'lucide-react';

const MALL_DATA = [
    { 
        id: 'serena_oriente', 
        name: 'Serena Oriente VR', 
        description: 'El corazón comercial gamificado de La Serena.', 
        stores: [
            { id: 1, name: 'Café del Sol', type: 'coffee', status: 'REAL', category: 'GASTRONOMÍA', level: 15 },
            { id: 2, name: 'Ópticas Elqui', type: 'health', status: 'REAL', category: 'SALUD', level: 12 },
            { id: 3, name: 'Luthier Pro', type: 'music', status: 'BETA', category: 'MÚSICA', level: 8 },
            { id: 4, name: 'Hardware & Code', type: 'technical', status: 'PROYECTADO', category: 'TECNOLOGÍA', level: 1 }
        ]
    },
    { id: 'caracol_colonial', name: 'Caracol Colonial 3D', description: 'Navegación tipo tanque en el centro histórico.', stores: [] },
    { id: 'recova_global', name: 'Recova World', description: 'Exportando tradición al metaverso.', stores: [] }
];

export default function VirtualMall({ onClose }) {
    const [selectedMall, setSelectedMall] = useState(MALL_DATA[0]);
    const [showRegister, setShowRegister] = useState(false);
    const [isExplaining, setIsExplaining] = useState(true);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER ROBLOX STYLE */}
            <div style={{ background: 'rgba(5, 10, 25, 0.95)', padding: '1rem 3rem', borderBottom: '3px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <Gamepad2 color="#fcd34d" size={40} className="animate-bounce" />
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} style={{ position: 'absolute', inset: -5, border: '2px dashed #38bdf8', borderRadius: '50%' }} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '2px', textShadow: '0 0 10px #38bdf8' }}>COMUNA SMART — ROBLOX WORLD</h2>
                        <span style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 'bold' }}>● MODO MULTIJUGADOR VIRTUAL ACTIVO</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(252, 211, 77, 0.1)', border: '1px solid #fcd34d', padding: '10px 20px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Zap size={18} color="#fcd34d" />
                        <span style={{ fontWeight: '900', color: '#fcd34d', fontSize: '0.9rem' }}>45,280 V-FICHAS</span>
                    </div>
                    <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '15px', cursor: 'pointer', fontWeight: '900', boxShadow: '0 5px 0px #991b1b' }}>EXIT GAME</button>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                
                {/* LEFT NAV - GAME SERVERS */}
                <div style={{ width: '350px', background: 'rgba(10, 15, 30, 0.8)', borderRight: '1px solid rgba(56, 189, 248, 0.2)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '2px', fontWeight: 'bold' }}>SERVIDORES COMUNA SMART</h3>
                    {MALL_DATA.map(mall => (
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            key={mall.id}
                            onClick={() => setSelectedMall(mall)}
                            style={{ 
                                padding: '1.5rem', 
                                borderRadius: '25px', 
                                cursor: 'pointer', 
                                background: selectedMall.id === mall.id ? 'linear-gradient(135deg, #1e3a8a, #1e40af)' : 'rgba(255,255,255,0.03)',
                                border: `2px solid ${selectedMall.id === mall.id ? '#38bdf8' : 'rgba(255,255,255,0.05)'}`,
                                boxShadow: selectedMall.id === mall.id ? '0 10px 20px rgba(56,189,248,0.2)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <Store color={selectedMall.id === mall.id ? 'white' : '#64748b'} />
                                <span style={{ fontSize: '0.6rem', color: '#22c55e', fontWeight: 'bold' }}>{Math.floor(Math.random()*100)} PLAYERS</span>
                            </div>
                            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{mall.name}</h4>
                            <p style={{ fontSize: '0.7rem', color: selectedMall.id === mall.id ? '#bae6fd' : '#475569', margin: '5px 0 0' }}>{mall.description}</p>
                        </motion.div>
                    ))}

                    <div style={{ marginTop: 'auto', background: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '25px', border: '1px dashed #38bdf8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <MessageSquare color="#38bdf8" size={20} />
                            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>CHAT GLOBAL</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.5' }}>
                            <div style={{ marginBottom: '5px' }}><strong>[Vecino_45]:</strong> ¿Alguien para ir al Café del Sol?</div>
                            <div style={{ marginBottom: '5px' }}><strong>[Serenito_Bot]:</strong> ¡Bienvenidos al Metaverso!</div>
                            <div><strong>[Paco_Puga]:</strong> Excelente arquitectura digital.</div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT - THE GAME GRID */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: 'radial-gradient(circle at 50% 50%, #172554 0%, #020617 100%)', position: 'relative' }}>
                    
                    {/* FLOATING AVATAR SERENITO */}
                    <motion.div 
                        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        style={{ position: 'absolute', top: '10%', right: '10%', zIndex: 10, pointerEvents: 'none' }}
                    >
                        <img src="/serenito_security_guard_close_up_1773392164475.png" style={{ height: '300px', filter: 'drop-shadow(0 0 30px rgba(56,189,248,0.5))' }} alt="Avatar" />
                        <div style={{ background: 'white', color: 'black', padding: '5px 15px', borderRadius: '50px', position: 'absolute', top: -40, left: 50, fontWeight: 'bold', fontSize: '0.8rem' }}>
                            ¡Hola Rodrigo! Bienvenido al Mall Virtual.
                        </div>
                    </motion.div>

                    <div style={{ marginBottom: '4rem' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', textShadow: '0 0 20px rgba(56,189,248,0.5)' }}>{selectedMall.name}</h1>
                        <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fcd34d' }}>
                                <Users size={20} /> <strong>1,245 VISITANTES EN VIVO</strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e' }}>
                                <Zap size={20} /> <strong>SISTEMA DE PAGOS ROBLOX-VLS ACTIVO</strong>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {selectedMall.stores.map(store => (
                            <motion.div 
                                whileHover={{ scale: 1.05, y: -10, boxShadow: '0 20px 50px rgba(56,189,248,0.4)' }}
                                key={store.id} 
                                style={{ 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '3rem', 
                                    borderRadius: '40px', 
                                    border: '2px solid rgba(56, 189, 248, 0.2)', 
                                    textAlign: 'center',
                                    position: 'relative'
                                }}
                            >
                                <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#38bdf8', color: '#0f172a', padding: '5px 15px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900' }}>
                                    LVL {store.level}
                                </div>
                                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px #38bdf8)' }}>
                                    {store.type === 'coffee' ? '☕' : store.type === 'health' ? '🏥' : store.type === 'music' ? '🎸' : '💻'}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white', marginBottom: '0.5rem' }}>{store.name}</h3>
                                <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>{store.category}</div>
                                
                                <button style={{ marginTop: '2.5rem', width: '100%', padding: '15px', background: '#38bdf8', color: '#0f172a', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: '900', boxShadow: '0 6px 0px #1e40af' }}>
                                    SPAWN IN SHOP
                                </button>
                            </motion.div>
                        ))}

                        {/* RENTABLE SLOT */}
                        <motion.div 
                            whileHover={{ scale: 0.98 }}
                            onClick={() => setShowRegister(true)}
                            style={{ background: 'rgba(56, 189, 248, 0.05)', borderRadius: '40px', border: '3px dashed rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', cursor: 'pointer' }}
                        >
                            <PlusCircle size={50} color="#38bdf8" />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: '900', color: 'white' }}>¡TU TIENDA AQUÍ!</div>
                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>CANJEAR MÓDULO POR 500 FICHAS</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* REGISTER MODAL */}
            <AnimatePresence>
                {showRegister && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ scale: 0.8, rotate: -2 }} animate={{ scale: 1, rotate: 0 }} style={{ background: '#0f172a', padding: '4rem', borderRadius: '50px', maxWidth: '650px', width: '100%', border: '4px solid #38bdf8', boxShadow: '0 0 50px #38bdf8' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <Gamepad2 color="#fcd34d" size={60} />
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginTop: '1rem' }}>SISTEMA DE SKIN COMERCIAL</h2>
                                <p style={{ color: '#94a3b8' }}>Personaliza tu local en el Metaverso VLS y empieza a facturar Tokens.</p>
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
                                <input type="text" placeholder="Nombre de Usuario / Local" style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(56, 189, 248, 0.3)', padding: '1.5rem', borderRadius: '20px', color: 'white', fontWeight: 'bold' }} />
                                <select style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(56, 189, 248, 0.3)', padding: '1.5rem', borderRadius: '20px', color: '#38bdf8', fontWeight: 'bold' }}>
                                    <option>ELEGIR TIPO DE SKIN...</option>
                                    <option>CAFÉ MODERNO</option>
                                    <option>ESTUDIO DE MÚSICA</option>
                                    <option>CLÍNICA VIRTUAL</option>
                                    <option>TIENDA DE SKATE / MODA</option>
                                </select>
                            </div>

                            <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                                <button onClick={() => setShowRegister(false)} style={{ flex: 1, padding: '1.5rem', borderRadius: '20px', background: 'transparent', border: '2px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>VOLVER</button>
                                <button style={{ flex: 2, padding: '1.5rem', borderRadius: '20px', background: '#38bdf8', color: '#0f172a', border: 'none', cursor: 'pointer', fontWeight: '900', boxShadow: '0 6px 0px #1e40af' }}>COMPRAR SKIN (FREE)</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
