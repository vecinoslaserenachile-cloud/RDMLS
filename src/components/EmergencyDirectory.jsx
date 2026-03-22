import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Shield, Search, Zap, AlertCircle, Waves, Heart, Instagram, Globe, MapPin } from 'lucide-react';

const EMERGENCY_NUMBERS = [
    { id: 'seguridad_ls', name: 'Seguridad Ciudadana La Serena', phone: '1457', color: '#38bdf8', icon: Shield, desc: 'Prevención, patrullajes y emergencias comunales 24/7.' },
    { id: 'carabineros', name: 'Carabineros de Chile', phone: '133', color: '#10b981', icon: Phone, desc: 'Emergencias policiales, robos y orden público.' },
    { id: 'pdi', name: 'PDI (Investigaciones)', phone: '134', color: '#1d4ed8', icon: Search, desc: 'Delitos complejos, narcotráfico y extravío de personas.' },
    { id: 'samu', name: 'Ambulancia / SAMU', phone: '131', color: '#ef4444', icon: Zap, desc: 'Urgencias médicas vitales y traslados críticos.' },
    { id: 'bomberos', name: 'Bomberos de La Serena', phone: '132', color: '#f59e0b', icon: AlertCircle, desc: 'Incendios, rescates vehiculares y emergencias HAZMAT.' },
    { id: 'armada', name: 'Armada (Borde Costero)', phone: '137', color: '#06b6d4', icon: Waves, desc: 'Seguridad en playas, rescate marítimo y Armada de Chile.' },
    { id: 'familia', name: 'Fono Familia Carabineros', phone: '149', color: '#ec4899', icon: Heart, desc: 'Violencia Intrafamiliar (VIF) y apoyo al núcleo familiar.' }
];

export default function EmergencyDirectory({ onClose }) {
    const isMobile = window.innerWidth < 768;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100095, background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="glass-panel"
                style={{ 
                    width: '100%', maxWidth: '900px', maxHeight: '90vh', background: '#0f172a', borderRadius: '32px', 
                    border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.9)'
                }}
            >
                {/* Header */}
                <div style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, #0f172a, #1e293b)' }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '1.8rem', fontWeight: '900' }}>
                            <Phone size={32} color="#38bdf8" /> TELÉFONOS DE EMERGENCIA
                        </h2>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', fontWeight: 'bold', marginTop: '5px' }}>LA SERENA & COQUIMBO - PROTOCOLO SMART 2026</p>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', borderRadius: '50%', padding: '0.8rem', cursor: 'pointer', color: '#ef4444' }}><X size={28} /></button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                    {EMERGENCY_NUMBERS.map(num => (
                        <motion.div 
                            key={num.id}
                            whileHover={{ scale: 1.02 }}
                            style={{ 
                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', 
                                borderRadius: '24px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                                borderLeft: `6px solid ${num.color}`
                            }}
                        >
                            <div style={{ background: `${num.color}20`, padding: '1rem', borderRadius: '18px', color: num.color }}>
                                <num.icon size={32} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold' }}>{num.name.toUpperCase()}</div>
                                <a href={`tel:${num.phone}`} style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', textDecoration: 'none', fontFamily: 'monospace', display: 'block', margin: '5px 0' }}>{num.phone}</a>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>{num.desc}</p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Coquimbo Special Section */}
                    <div style={{ 
                        gridColumn: isMobile ? 'span 1' : 'span 2', 
                        background: 'rgba(29, 78, 216, 0.1)', border: '1px dashed #3b82f6', 
                        borderRadius: '24px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' 
                    }}>
                        <div style={{ background: '#3b82f630', padding: '1rem', borderRadius: '18px', color: '#3b82f6' }}>
                            <MapPin size={32} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 'bold' }}>ZONA COQUIMBO</div>
                            <h3 style={{ margin: '5px 0', color: 'white', fontSize: '1.2rem' }}>2da Comisaría de Coquimbo (Principal)</h3>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Contacto directo para procedimientos de seguridad y emergencias en la comuna puerto.</p>
                        </div>
                    </div>
                </div>

                {/* Footer Social & Info */}
                <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                            onClick={() => window.open('https://www.instagram.com/vecinoslaserena2', '_blank')}
                            style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', border: 'none', borderRadius: '12px', padding: '0.8rem 1.5rem', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                        >
                            <Instagram size={20} /> INSTAGRAM VLS
                        </button>
                        <button 
                            onClick={() => window.open('https://www.chileatiende.gob.cl', '_blank')}
                            style={{ background: '#004c97', border: 'none', borderRadius: '12px', padding: '0.8rem 1.5rem', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                        >
                            <Globe size={20} /> CHILE ATIENDE
                        </button>
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.7rem', fontWeight: 'bold' }}>
                        SISTEMA VECINAL INTEGRAL - DISPONIBLE 24 HORAS LOS 365 DÍAS
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
