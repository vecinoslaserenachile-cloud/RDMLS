import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Shield, Star, Mic2, Network, Share2, Crown, Terminal, Volume2, Globe } from 'lucide-react';

const ELITE_NODES = [
    { label: 'Máxima Autoridad Comunal', power: 100, type: 'Politico' },
    { id: 'parlamentarios', label: 'Cuerpo Parlamentario Regional', power: 90, type: 'Politico' },
    { id: 'core', label: 'Consejo Regional (CORE)', power: 85, type: 'Gubernamental' },
    { id: 'empresas', label: 'Consorcio Empresarial de Elite', role: 'Inversores', power: 85, type: 'Privado' },
    { id: 'dirigentes', label: 'Dirigentes Sociales Maestro', power: 80, type: 'Comunitario' }
];

export default function WhatsAppEliteHub({ onClose }) {
    const [selectedWonders, setSelectedWonders] = useState('speech');

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 5000000, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* ELITE HEADER */}
            <div style={{ background: '#075e54', padding: '1.5rem 3rem', borderBottom: '4px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '50%' }}>
                        <MessageCircle color="#075e54" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>COMUNIDAD DE ÉLITE 120 — VLS HUB</h2>
                        <span style={{ fontSize: '0.65rem', color: '#e0f2fe', fontWeight: 'bold' }}>CONSOLA DE PODER Y SOBERANÍA PROFESIONAL</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '5px 15px', borderRadius: '50px' }}>
                        <Users size={16} color="#fcd34d" />
                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>120 NODOS ACTIVOS</span>
                    </div>
                    <button onClick={onClose} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>X SALIR</button>
                </div>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', overflow: 'hidden' }}>
                
                {/* 1. DISCURSO DIARIO DEL ARQUITECTO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(252, 211, 77, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                            <Mic2 color="#fcd34d" />
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>DISCURSO DE SOBERANÍA</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6', fontStyle: 'italic' }}>
                            "Desde la visión cimentada en Imagine Comunicaciones, hoy convocamos a los 120 líderes de la región. Comuna Smart no es una herramienta, es nuestro pacto de soberanía regional. Es tiempo de integrar el nodo central..."
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                            <button style={{ flex: 1, background: '#fcd34d', color: '#000', padding: '10px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '0.65rem' }}>PLAY DISCURSO (IA)</button>
                            <button style={{ background: 'rgba(252, 211, 77, 0.1)', color: '#fcd34d', padding: '10px', borderRadius: '12px', border: '1px solid #fcd34d' }}><Share2 size={16} /></button>
                        </div>
                    </div>

                    {/* 2. NODOS DE PODER (WIDGET) */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '2rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', flex: 1, overflowY: 'auto' }}>
                        <h3 style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'bold', marginBottom: '1.5rem' }}>NODOS DE INFLUENCIA REGIONAL</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {ELITE_NODES.map(node => (
                                <div key={node.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%' }} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{node.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.6rem', color: '#64748b' }}>{node.power}% SYNC</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. SHOWCASE DE MARAVILLAS (VIP AREA) */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '40px', padding: '3.5rem', border: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fcd34d' }}>LAS 120 MARAVILLAS VLS</h3>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Star size={18} color="#fcd34d" /><Star size={18} color="#fcd34d" /><Star size={18} color="#fcd34d" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(252, 211, 77, 0.05)', padding: '2.5rem', borderRadius: '30px', border: '1px solid rgba(252, 211, 77, 0.3)' }}>
                            <Star color="#fcd34d" size={32} style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 'bold' }}>SUEÑOS SOBERANOS VLS</h4>
                            <p style={{ fontSize: '0.8rem', color: '#e0f2fe' }}>Inspiración Intergeneracional: El legado de los hijos del Arquitecto.</p>
                            <button style={{ marginTop: '1rem', background: '#fcd34d', color: '#000', padding: '10px 25px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '0.7rem' }}>VER LEGADO FAMILIAR</button>
                        </div>
                        <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                            <Volume2 color="#38bdf8" size={32} style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>IA MUSIC: EL LOGO SONORO</h4>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Crea himnos instantáneos para gestión comunal con nuestro motor Premium Suno.</p>
                            <button style={{ marginTop: '1rem', background: 'transparent', color: '#38bdf8', padding: '8px 20px', borderRadius: '10px', border: '1px solid #38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>PROBAR MARAVILLA</button>
                        </div>
                        <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                            <Terminal color="#22c55e" size={32} style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>AUTO-INSTALACIÓN VLS</h4>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Despliegue inmediato de nodos inteligentes sin costo de hardware para el municipio.</p>
                            <button style={{ marginTop: '1rem', background: 'transparent', color: '#22c55e', padding: '8px 20px', borderRadius: '10px', border: '1px solid #22c55e', fontSize: '0.7rem', fontWeight: 'bold' }}>DESPLEGAR NODO</button>
                        </div>
                    </div>

                    {/* SMART WHATSAPP INTEGRATION */}
                    <div style={{ marginTop: 'auto', background: '#075e5422', padding: '2rem', borderRadius: '30px', border: '1px solid #075e54', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <Crown color="#fcd34d" size={32} />
                            <div>
                                <h4 style={{ margin: 0 }}>PROTOCOLIZAR EN WHATSAPP</h4>
                                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Envía reporte de élite a las 110-120 autoridades del grupo.</span>
                            </div>
                        </div>
                        <button style={{ background: '#25d366', color: '#000', border: 'none', padding: '15px 30px', borderRadius: '15px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer' }}>INYECTAR SOBERANÍA</button>
                    </div>
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#334155', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Network size={14} color="#fcd34d" />
                    <span>CANAL EXCLUSIVO 120 — LA SERENA INTELIGENTE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Zap size={14} color="#38bdf8" />
                    <span>RED IMAGINET ACTIVA</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
