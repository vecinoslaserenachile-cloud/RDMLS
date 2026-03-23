import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Zap, ShieldCheck, Star, ArrowRight, Car, Info, ShieldAlert, ShoppingBag, Camera, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const VLSMotorsSpot = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('new'); // 'new', 'used', 'showroom'

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: '3rem auto',
                borderRadius: '32px',
                padding: '2px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.5), rgba(30, 58, 138, 0.5))',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
        >
            <div style={{
                background: '#0f172a',
                borderRadius: '30px',
                padding: '2rem',
                position: 'relative',
                zIndex: 2
            }}>
                {/* HEADER & TABS */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#38bdf820', padding: '12px', borderRadius: '15px', border: '1px solid #38bdf840' }}>
                            <Car size={32} color="#38bdf8" />
                        </div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: '900' }}>VLS MOTORS</h2>
                            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>SHOWROOM & SEMINUEVOS VLS</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {[
                            { id: 'new', label: 'Vehículos Nuevos', icon: Zap },
                            { id: 'used', label: 'Compraventa Usados', icon: ShoppingBag },
                            { id: 'showroom', label: 'Showroom 3D', icon: Camera }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '8px 16px', borderRadius: '10px', border: 'none',
                                    background: activeTab === tab.id ? '#38bdf8' : 'transparent',
                                    color: activeTab === tab.id ? '#0f172a' : '#94a3b8',
                                    cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
                                    display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s'
                                }}
                            >
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* MAIN CONTENT AREA */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{ minHeight: '400px' }}
                    >
                        {activeTab === 'new' && (
                            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 768 ? '1.2fr 1fr' : '1fr', gap: '2rem' }}>
                                <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', height: '400px' }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #0f172a, #1e3a8a)', opacity: 0.8 }}></div>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem', textAlign: 'center' }}>
                                        <Zap size={64} color="#fcd34d" style={{ marginBottom: '1rem' }} />
                                        <h3 style={{ color: 'white', fontSize: '2rem', fontWeight: '900', margin: '0 0 1rem 0' }}>FLOTA ELÉCTRICA SMART 2026</h3>
                                        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '400px' }}>La nueva era de la movilidad urbana llega a La Serena. Vehículos con IA integrada y carga solar municipal.</p>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <span style={{ background: '#38bdf820', color: '#38bdf8', border: '1px solid #38bdf840', padding: '8px 16px', borderRadius: '50px', fontWeight: 'bold' }}>Soberanía Energética</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
                                    <h4 style={{ color: 'white', fontSize: '1.5rem', margin: 0 }}>Promoción Lanzamiento</h4>
                                    <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Adquiere tu vehículo eléctrico con bono municipal y acceso gratuito a la Red de Carga Smart VLS por 2 años.</p>
                                    <ul style={{ color: 'white', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} color="#10b981" /> Garantía de por vida en baterías</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} color="#10b981" /> Mantenimiento predictivo vía App</li>
                                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} color="#10b981" /> Asistencia en ruta 24/7</li>
                                    </ul>
                                    <button style={{ background: 'white', color: '#0f172a', border: 'none', padding: '16px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        SOLICITAR TEST DRIVE VLS <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'used' && (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <ShoppingBag size={48} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold' }}>Módulo de Compraventa Garantizada</h3>
                                <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem auto' }}>Publica tu auto usado con la certificación VLS. Revisamos el historial legal y mecánico por ti para una transacción segura.</p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '1.5rem', textAlign: 'left' }}>
                                            <div style={{ height: '150px', background: '#1e293b', borderRadius: '12px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <ImageIcon size={32} color="#475569" />
                                            </div>
                                            <h4 style={{ color: 'white', margin: '0 0 5px 0' }}>SUV Familiar 2022</h4>
                                            <p style={{ color: '#38bdf8', fontWeight: 'bold', margin: '0 0 10px 0' }}>$12.500.000</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                                                <span>45.000 km</span>
                                                <span>Automático</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'showroom' && (
                            <div style={{ borderRadius: '24px', overflow: 'hidden', border: '2px solid #38bdf840', height: '450px', background: '#111', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.7)', padding: '10px 20px', borderRadius: '10px', backdropFilter: 'blur(5px)', border: '1px solid rgba(56,189,248,0.3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 'bold' }}>
                                        <div style={{ width: '8px', height: '8px', background: '#38bdf8', borderRadius: '50%', animation: 'pulse-ring 2s infinite' }}></div>
                                        VLS INTERCATIVE SHOWROOM
                                    </div>
                                </div>
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', color: '#475569' }}>
                                    <Car size={80} strokeWidth={1} />
                                    <p style={{ fontWeight: 'bold' }}>Cargando Experiencia 3D Inmersiva...</p>
                                    <button style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Explorar Ahora</button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* DISCLAIMER LEGAL */}
                <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '20px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <ShieldAlert size={28} color="#ef4444" style={{ flexShrink: 0 }} />
                    <div>
                        <h5 style={{ color: '#ef4444', margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 'bold' }}>DISCLAIMER VLS MOTORS</h5>
                        <p style={{ color: '#fca5a5', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                            VLS Motors actúa únicamente como una plataforma de enlace y certificación comunitaria. Los vehículos nuevos son provistos por concesionarios en convenio oficial con el ecosistema. En el módulo de usados, el municipio facilita el canal de contacto y verificación preliminar, pero no asume responsabilidad civil por la condición mecánica final o acuerdos privados entre particulares.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default VLSMotorsSpot;
