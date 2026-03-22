import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, CreditCard, Star, ShieldCheck, Zap, 
    Gift, Smartphone, MapPin, ExternalLink, Ticket
} from 'lucide-react';

export default function VLSDiscountCard({ onClose }) {
    const [flipped, setFlipped] = useState(false);
    
    // User data (mocked from VLS ecosystem)
    const userData = {
        name: "VECINO LA SERENA",
        memberId: "VLS-2026-XQ9",
        since: "MAR 2026",
        rank: "SOCIO FUNDADOR VLS PRO",
        tokens: localStorage.getItem('vls_tokens') || '50'
    };

    const categories = [
        { name: 'Salud', icon: '🩺', desc: '-15% Médicos y Veterinaria' },
        { name: 'Gastronomía', icon: '🍽️', desc: '-20% Pubs y Restaurantes' },
        { name: 'Comercio', icon: '🛍️', desc: '-10% Tiendas Locales' },
        { name: 'Cultura', icon: '🎭', desc: 'Acceso VIP Teatros' }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
                position: 'fixed', inset: 0, 
                zIndex: 2000, display: 'flex', 
                alignItems: 'center', justifyContent: 'center', 
                background: 'rgba(2, 6, 23, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '1.5rem'
            }}
        >
            <div style={{ position: 'relative', maxWidth: '450px', width: '100%' }}>
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    style={{ 
                        position: 'absolute', top: '-15px', right: '-15px', 
                        width: '40px', height: '40px', borderRadius: '50%', 
                        background: '#ef4444', border: 'none', color: 'white', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        cursor: 'pointer', zIndex: 10, boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)'
                    }}
                >
                    <X size={20} />
                </button>

                {/* THE CARD CONTAINER */}
                <div 
                    onClick={() => setFlipped(!flipped)}
                    style={{ 
                        perspective: '1000px', 
                        cursor: 'pointer',
                        height: '280px'
                    }}
                >
                    <motion.div 
                        initial={false}
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                        style={{ 
                            width: '100%', height: '100%', 
                            position: 'relative', transformStyle: 'preserve-3d' 
                        }}
                    >
                        {/* FRONT SIDE */}
                        <div style={{ 
                            position: 'absolute', inset: 0, 
                            backfaceVisibility: 'hidden',
                            background: 'linear-gradient(135deg, #1e293b 0%, #0369a1 100%)',
                            borderRadius: '24px', padding: '1.5rem',
                            display: 'flex', flexDirection: 'column',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden'
                        }}>
                            {/* Watermark */}
                            <img 
                                src="/vls-logo-3d.png" 
                                style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '200px', opacity: 0.1, pointerEvents: 'none' }} 
                                alt="" 
                            />
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontSize: '0.65rem', letterSpacing: '2px', opacity: 0.8, fontWeight: 900 }}>VECINOSMART CHILE</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>LOYALTY PASS</div>
                                </div>
                                <div style={{ width: '45px', height: '35px', background: 'linear-gradient(135deg, #f59e0b, #fcd34d)', borderRadius: '6px' }}></div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', letterSpacing: '2px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)', fontVariantNumeric: 'tabular-nums' }}>
                                    {userData.memberId}
                                </div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>ID DE MIEMBRO VLS</div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{userData.name}</div>
                                    <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>VALID DESDE: {userData.since}</div>
                                </div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 900, background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '8px' }}>
                                    PRO MEMBER
                                </div>
                            </div>
                        </div>

                        {/* BACK SIDE */}
                        <div style={{ 
                            position: 'absolute', inset: 0, 
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            background: '#0f172a',
                            borderRadius: '24px', padding: '1.5rem',
                            display: 'flex', flexDirection: 'column',
                            border: '1px solid rgba(56, 189, 248, 0.2)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}>
                            <div style={{ height: '40px', background: '#020617', margin: '0 -1.5rem 1rem -1.5rem', width: 'calc(100% + 3rem)' }}></div>
                            
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '10px', color: '#38bdf8' }}>BENEFICIOS ACTIVOS:</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    {categories.map(c => (
                                        <div key={c.name} style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ fontSize: '0.8rem' }}>{c.icon} {c.name}</div>
                                            <div style={{ fontSize: '0.55rem', opacity: 0.6 }}>{c.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', opacity: 0.4 }}>
                                <ShieldCheck size={24} style={{ margin: '0 auto 5px auto' }} />
                                <div style={{ fontSize: '0.5rem' }}>TARJETA VIRTUAL ENCRIPTADA POR VECINOSMART SECURITY</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* INFO TEXT */}
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10b981', marginBottom: '10px' }}>
                        <Zap size={18} fill="#10b981" />
                        <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>SISTEMA HABILITADO</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                        Presenta esta tarjeta en locales asociados de La Serena para obtener tus beneficios exclusivos. Haz click en la tarjeta para ver los detalles.
                    </p>
                    
                    <button 
                        onClick={() => window.location.href = '#/hub'}
                        style={{ marginTop: '1.5rem', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                        <MapPin size={16} /> VER MAPA DE COMERCIOS
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
