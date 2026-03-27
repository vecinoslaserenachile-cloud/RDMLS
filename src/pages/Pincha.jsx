import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X as CloseIcon, Send, Share2, Heart, MousePointer2, 
    ShieldAlert, Zap, Lock, MessageSquare, Search, 
    ArrowRight, Star, Clock, AlertCircle, CheckCircle2, Award,
    ArrowLeft, User, Filter, Settings
} from 'lucide-react';

/* --- CSS ANIMATIONS (Pincha Icon) --- */
const PinchaStyles = () => (
    <style>{`
        @keyframes pulse-heart {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        @keyframes move-cursor {
            0% { transform: translate(0, 0); }
            50% { transform: translate(10px, -10px); }
            100% { transform: translate(0, 0); }
        }
        .pincha-loading {
            position: relative;
            width: 60px;
            height: 60px;
        }
        .heart-icon {
            color: #ef4444;
            animation: pulse-heart 1s infinite ease-in-out;
        }
        .cursor-icon {
            position: absolute;
            bottom: 0;
            right: 0;
            color: #f97316;
            animation: move-cursor 1.5s infinite ease-in-out;
        }
        .glass-dark {
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 28px;
        }
        .premium-border {
            border: 2px solid #f97316;
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }
    `}</style>
);

/* --- COMPONENTS --- */

function PinchaLoader() {
    return (
        <div className="pincha-loading">
            <Heart size={44} className="heart-icon" fill="#ef4444" />
            <MousePointer2 size={24} className="cursor-icon" />
        </div>
    );
}

export default function Pincha() {
    const navigate = useNavigate();
    const [view, setView] = useState('dating'); // dating, chat, premium
    const [subLevel, setSubLevel] = useState('basico');
    const [isLoading, setIsLoading] = useState(false);
    
    // Mock profiles
    const PROFILES = [
        { id: 1, name: "Paula (31)", bio: "Arquitecta, amo caminar por la Av. del Mar.", level: 'premium', match: '98%' },
        { id: 2, name: "Cristian (28)", bio: "Ingeniero, busco alguien para running matutino.", level: 'basico', match: '85%' },
        { id: 3, name: "Sofía (34)", bio: "Diseñadora, buscando nuevas amistades en la ciudad.", level: 'premium', match: '92%' }
    ];

    const toggleRadioMode = () => {
        setIsLoading(true);
        setTimeout(() => {
            setRadioMode(prev => prev === 'auto' ? 'manual' : 'auto');
            setIsLoading(false);
        }, 800);
    };

    const activateKillSwitch = () => {
        setIsKillSwitchActive(true);
        // Simular conexión en vivo (RDMLS)
        setTimeout(() => setIsKillSwitchActive(false), 5000);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'system-ui', display: 'flex', flexDirection: 'column' }}>
            <PinchaStyles />
            
            {/* Header */}
            <header style={{ padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <PinchaLoader />
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '2px', color: '#f97316' }}>PINCHA</div>
                        <div style={{ fontSize: '0.65rem', color: '#94a3b8', letterSpacing: '3px' }}>DATING PREMIUM VLS 2026</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => setView('dating')} style={{ background: view === 'dating' ? '#f97316' : 'transparent', border: 'none', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>DESCUBRIR</button>
                    <button onClick={() => setView('premium')} style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid #f97316', color: '#f97316', padding: '0.6rem 1.2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Star size={18} /> GO PREMIUM
                    </button>
                    <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer' }}><ArrowLeft size={18} /></button>
                </div>
            </header>

            <main style={{ flex: 1, padding: '2.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
                <AnimatePresence mode="wait">
                    
                    {/* VIEW: DATING */}
                    {view === 'dating' && (
                        <motion.div key="dating" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Descubre en La Serena</h2>
                                    <p style={{ color: '#94a3b8' }}>Conexiones reales para vecinos autenticados por Smart City VLS.</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Search size={18} color="#94a3b8" />
                                    <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Filtro de proximidad activado</span>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                                {PROFILES.map(p => (
                                    <div key={p.id} className={`glass-dark ${p.level === 'premium' ? 'premium-border' : ''}`} style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
                                        {p.level === 'premium' && (
                                            <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#f97316', padding: '5px 12px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 900, color: 'white', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 10 }}>
                                                <Award size={14} /> PREMIUM
                                            </div>
                                        )}
                                        <div style={{ height: '240px', background: `linear-gradient(180deg, transparent 0%, #0f172a 100%), url('https://picsum.photos/seed/${p.id}/400/300')`, backgroundSize: 'cover' }}></div>
                                        <div style={{ padding: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <h3 style={{ fontSize: '1.4rem', margin: 0 }}>{p.name}</h3>
                                                <span style={{ color: '#10b981', fontWeight: 900, fontSize: '0.85rem' }}>{p.match} MATCH</span>
                                            </div>
                                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>"{p.bio}"</p>
                                            
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => setView('chat')} style={{ flex: 1, padding: '1rem', background: '#f97316', border: 'none', color: 'white', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    {subLevel === 'basico' && p.level === 'premium' ? <Lock size={18} /> : <MessageSquare size={18} />}
                                                    {subLevel === 'basico' && p.level === 'premium' ? 'DESBLOQUEAR' : 'MENSAJE'}
                                                </button>
                                                <button style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '15px', cursor: 'pointer' }} title="Reportar / Bloquear">
                                                    <ShieldAlert size={20} color="#ef4444" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW: PREMIUM */}
                    {view === 'premium' && (
                        <motion.div key="premium" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)' }}>
                                <Award size={50} color="white" />
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Sube al Nivel Premium</h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '3rem' }}>Desbloquea mensajes ilimitados, filtros de ubicación exactos y descubre quién te ha pinchado.</p>
                            <div className="glass-dark" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>$4.990 <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ mes</span></div>
                                <button style={{ width: '100%', padding: '1.2rem', borderRadius: '15px', background: '#f97316', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>CONTRATAR AHORA</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
                © 2026 Vecinos La Serena · Módulo Pincha · Ecosistema Seguro Smart City
            </footer>
        </div>
    );
}
