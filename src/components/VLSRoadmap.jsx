import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Sparkles, Target, Users, Briefcase, Zap, Heart, PartyPopper, Radio } from 'lucide-react';

export default function VLSRoadmap({ onClose }) {
    const pillars = [
        {
            title: 'Smart Citizens (Atención)',
            icon: Users,
            color: '#ef4444',
            items: [
                { name: 'Reportes Vecinales QR', status: 'functional', desc: 'Denuncias georreferenciadas de baches, luminarias y aseo.' },
                { name: 'Radio Digital VLS', status: 'functional', desc: 'Emisión 24/7 con noticias y música de la IA.' },
                { name: 'Chat Serenito IA', status: 'functional', desc: 'Asistente virtual para dudas frecuentes y trámites.' },
                { name: 'Portal Vecinos La Serena', status: 'functional', desc: 'Dashboard unificado de servicios.' },
                { name: 'Salud Vecinal / Enfermería', status: 'development', desc: 'Agenda y monitoreo de salud domiciliaria.' },
                { name: 'Voto Digital Vinculante', status: 'projected', desc: 'Consultas ciudadanas con validez legal.' }
            ]
        },
        {
            title: 'Smart Administration (Interna)',
            icon: Briefcase,
            color: '#10b981',
            items: [
                { name: 'Inducción E-learning', status: 'development', desc: 'Capacitación digital para honorarios y contrata.' },
                { name: 'Gestión de Informes', status: 'development', desc: 'Digitalización y firma de reportes mensuales.' },
                { name: 'Monitor de Precedencias', status: 'functional', desc: 'Orden jerárquico para eventos protocolares.' },
                { name: 'Backoffice Móvil', status: 'development', desc: 'App de terreno para fiscalizadores con cámara.' }
            ]
        },
        {
            title: 'Smart Listening (Inteligencia)',
            icon: Radio,
            color: '#38bdf8',
            items: [
                { name: 'Centinel Faro (Faro IA)', status: 'development', desc: 'Social listening y análisis de sentimiento regional.' },
                { name: 'Laboratorio de Ideas', status: 'functional', desc: 'Sistema De Bono (6 sombreros) para soluciones.' },
                { name: 'Análisis de Redes VLS', status: 'projected', desc: 'Detección temprana de conflictos y tendencias.' }
            ]
        },
        {
            title: 'Smart Events & Patrimonio',
            icon: PartyPopper,
            color: '#f59e0b',
            items: [
                { name: 'Paseo Histórico 3D', status: 'functional', desc: 'Simulador 3D del casco histórico.' },
                { name: 'Bus del Tiempo', status: 'functional', desc: 'Viaje virtual por la historia de La Serena.' },
                { name: 'Galaxia Discoteque', status: 'functional', desc: 'Nostalgia local de discos y colegios.' },
                { name: 'Glosario Regional', status: 'functional', desc: 'Rescate de modismos e identidad.' },
                { name: 'CD La Serena Club', status: 'development', desc: 'Portal de beneficios para el hincha granate.' }
            ]
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'functional': return <CheckCircle2 size={16} color="#10b981" />;
            case 'development': return <Loader2 size={16} color="#f59e0b" className="animate-spin" />;
            case 'projected': return <Target size={16} color="#94a3b8" />;
            default: return null;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'functional': return 'FUNCIONANDO';
            case 'development': return 'EN DESARROLLO';
            case 'projected': return 'PROYECTADO';
            default: return '';
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                exit={{ opacity: 0 }}
                className="roadmap-overlay"
                style={{
                    position: 'fixed', inset: 0, zIndex: 1000000,
                    background: 'rgba(2, 6, 23, 0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                }}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="glass-panel"
                    style={{
                        width: '100%', maxWidth: '1100px', maxHeight: '90vh',
                        background: 'rgba(15, 23, 42, 0.95)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '32px', display: 'flex', flexDirection: 'column',
                        overflow: 'hidden', boxShadow: '0 0 100px rgba(0,0,0,0.8)'
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '2rem', background: 'linear-gradient(90deg, #1e3a8a 0%, #312e81 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ background: '#3b82f6', padding: '12px', borderRadius: '15px', color: 'white' }}>
                                <Zap size={24} />
                            </div>
                            <div>
                                <h2 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px' }}>VLS ROADMAP 2026</h2>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 'bold' }}>INVENTARIO INTEGRAL DE SERVICIOS SMART CITY</p>
                            </div>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '12px', borderRadius: '50%', cursor: 'pointer' }}>
                            <X size={28} />
                        </button>
                    </div>

                    {/* Content Scrollable */}
                    <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
                        {pillars.map(pillar => (
                            <div key={pillar.title} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: `1px solid ${pillar.color}40` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', borderBottom: `2px solid ${pillar.color}20`, paddingBottom: '10px' }}>
                                    <pillar.icon size={20} color={pillar.color} />
                                    <h3 style={{ margin: 0, color: pillar.color, fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{pillar.title}</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {pillar.items.map(item => (
                                        <div key={item.name} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>{item.name}</h4>
                                                <p style={{ margin: '2px 0 0 0', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{item.desc}</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <div style={{ textAlign: 'right' }}>
                                                    <span style={{ fontSize: '0.6rem', fontWeight: '900', color: item.status === 'functional' ? '#10b981' : (item.status === 'development' ? '#f59e0b' : '#94a3b8') }}>
                                                        {getStatusLabel(item.status)}
                                                    </span>
                                                </div>
                                                {getStatusIcon(item.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer / Disclaimer */}
                    <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                            Nota: Los servicios proyectados están sujetos a factibilidad técnica y voluntad política regional. 
                            La versión Beta actual incluye monitoreo preventivo de logs para aseguramiento de calidad.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
