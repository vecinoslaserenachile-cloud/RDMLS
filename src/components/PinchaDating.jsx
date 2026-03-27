import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Star, MessageCircle, MapPin, X, Flame, Search, Filter, Camera, User, Settings, CheckCircle } from 'lucide-react';

/**
 * PINCHA: El Módulo de Dating Premium de Vecinos La Serena.
 * Diseño Institucional, Seguro y Limpio.
 */
const PinchaDating = ({ onClose, currentUser }) => {
    const [view, setView] = useState('discovery'); // discovery, profile, matches, messages
    const [profiles, setProfiles] = useState([
        { id: 1, name: 'Valentina', age: 28, bio: 'Arquitecta, amante del Faro y los paseos por la Avenida del Mar.', img: '/avatars/pampita_v3.png', interests: ['Cultura', 'Deporte'], type: 'Premium' },
        { id: 2, name: 'Rodrigo', age: 32, bio: 'Ingeniero, fanátido de Club Deportes La Serena. Busco alguien para ir al estadio.', img: '/serenito_v3.png', interests: ['Fútbol', 'Música'], type: 'Verificado' },
        { id: 3, name: 'Camila', age: 25, bio: 'Estudiante de Periodismo. Amo la Radio Digital RDMLS.', img: '/avatars/compita.png', interests: ['Radio', 'Cine'], type: 'Básico' }
    ]);
    const [activeId, setActiveId] = useState(0);

    const handlePincha = (liked) => {
        if (liked) {
            // Animación de Match
            alert("¡ES UN PINCHA! 🎉 Has conectado con un vecino/a.");
        }
        setActiveId(prev => (prev + 1) % profiles.length);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="glass-panel gaudi-curves shadow-2xl"
            style={{
                position: 'fixed', inset: '20px', zIndex: 1000000,
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
                border: '2px solid #f43f5e', padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{ padding: '1.5rem', background: 'rgba(244, 63, 94, 0.1)', borderBottom: '1px solid rgba(244, 63, 94, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#f43f5e', padding: '10px', borderRadius: '50%', boxShadow: '0 0 15px #f43f5e' }}>
                        <Heart color="white" fill="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>PINCHA <span style={{ color: '#f43f5e' }}>VLS</span></h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.8rem' }}>Dating Ciudadano & Conexión Vecinal</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setView('discovery')} style={{ background: 'none', border: 'none', color: view === 'discovery' ? '#f43f5e' : 'white', cursor: 'pointer' }}><Search size={24} /></button>
                    <button onClick={() => setView('matches')} style={{ background: 'none', border: 'none', color: view === 'matches' ? '#f43f5e' : 'white', cursor: 'pointer' }}><Flame size={24} /></button>
                    <button onClick={() => setView('profile')} style={{ background: 'none', border: 'none', color: view === 'profile' ? '#f43f5e' : 'white', cursor: 'pointer' }}><User size={24} /></button>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={profiles[activeId].id}
                        initial={{ scale: 0.8, opacity: 0, x: 100 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{ scale: 0.8, opacity: 0, x: -100 }}
                        style={{
                            width: '100%', maxWidth: '400px', height: '100%', maxHeight: '600px',
                            background: 'rgba(255,255,255,0.05)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{ height: '70%', position: 'relative' }}>
                            <img src={profiles[activeId].img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: '20px' }}>
                                <h3 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>{profiles[activeId].name}, {profiles[activeId].age} <CheckCircle size={20} color="#38bdf8" /></h3>
                                <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                                    {profiles[activeId].interests.map(i => (
                                        <span key={i} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem' }}>{i}</span>
                                    ))}
                                </div>
                            </div>
                            {profiles[activeId].type === 'Premium' && (
                                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#fbbf24', color: '#000', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.7rem' }}>VECINO PREMIUM</div>
                            )}
                        </div>
                        <div style={{ flex: 1, padding: '20px', color: 'white' }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{profiles[activeId].bio}</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                                <button 
                                    onClick={() => handlePincha(false)}
                                    style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <X size={28} />
                                </button>
                                <button 
                                    onClick={() => handlePincha(true)}
                                    style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #f43f5e, #fb7185)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(244, 63, 94, 0.5)' }}
                                >
                                    <Heart size={40} fill="white" />
                                </button>
                                <button 
                                    style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Star size={28} color="#fbbf24" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Borde inferior premium */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #f43f5e 0%, #38bdf8 50%, #10b981 100%)' }} />
        </motion.div>
    );
};

export default PinchaDating;
