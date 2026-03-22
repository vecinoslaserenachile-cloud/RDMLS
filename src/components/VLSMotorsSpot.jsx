import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap, ShieldCheck, Star, ArrowRight, Car } from 'lucide-react';

const VLSMotorsSpot = ({ onClose }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: '2rem auto',
                borderRadius: '32px',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.5), rgba(30, 58, 138, 0.5))',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(56, 189, 248, 0.2)'
            }}
        >
            <div style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderRadius: '31px',
                display: 'flex',
                flexDirection: 'column',
                md: { flexDirection: 'row' }, // responsive layout
                gap: '2rem',
                padding: '2rem',
                position: 'relative',
                zIndex: 2
            }}>
                {/* Banner Image Container */}
                <div style={{
                    flex: '1.2',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '400px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <img 
                        src="/vls_motors_spot_premium_1774121270221.png" 
                        alt="VLS MOTORS Premium Spot" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '2rem'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ background: '#38bdf8', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>LUJO SMART</span>
                            <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', backdropFilter: 'blur(5px)' }}>MOVILIDAD ELÉCTRICA</span>
                        </div>
                        <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: '900', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>VLS MOTORS</h2>
                    </div>
                </div>

                {/* Content Side */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38bdf8' }}>
                        <Car size={24} />
                        <span style={{ fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem' }}>EXPERIENCIA PREMIUM AUTOMOTRIZ</span>
                    </div>
                    
                    <h3 style={{ color: 'white', fontSize: '1.8rem', margin: 0, lineHeight: '1.2' }}>
                        Transformando el camino hacia una <span style={{ color: '#38bdf8' }}>Smart City</span> más conectada.
                    </h3>
                    
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                        Descubre la nueva flota estratégica con mantenimiento predictivo integrado a la Red VLS. Seguridad total y tecnología de vanguardia para los vecinos de La Serena.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <ShieldCheck size={20} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
                            <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Blindaje VLS</strong>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Seguridad de nivel municipal integrada.</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Zap size={20} color="#fcd34d" style={{ marginBottom: '0.5rem' }} />
                            <strong style={{ display: 'block', color: 'white', fontSize: '0.9rem' }}>Carga Rápida</strong>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Puntos de carga Smart VLS 24/7.</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button 
                            className="btn btn-primary"
                            style={{ 
                                flex: 1, 
                                padding: '1.2rem', 
                                borderRadius: '16px', 
                                background: 'linear-gradient(90deg, #38bdf8, #1e3a8a)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '10px',
                                border: 'none',
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        >
                            Ver Catálogo VLS <ArrowRight size={18} />
                        </button>
                        <button 
                            className="btn-glass"
                            style={{ 
                                padding: '1.2rem', 
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ExternalLink size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Background Decorative Blur */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '300px',
                height: '300px',
                background: 'rgba(56, 189, 248, 0.1)',
                filter: 'blur(100px)',
                borderRadius: '50%',
                zIndex: 1
            }}></div>
        </motion.div>
    );
};

export default VLSMotorsSpot;
