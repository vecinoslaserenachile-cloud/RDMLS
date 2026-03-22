import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Globe, Server, Cpu, Database, Share2, Layers, Key, Rocket, TrendingUp, Users, ShieldAlert, BookOpen, ExternalLink, Zap } from 'lucide-react';

const API_ENDPOINTS = [
    { name: 'GET /soberania/clima', desc: 'Sincronización clima regional La Serena', status: 'active' },
    { name: 'POST /soberania/reporte', desc: 'Envío georreferenciado (Baches/Luminarias)', status: 'active' },
    { name: 'GET /soberania/radio-feed', desc: 'Señal en vivo y meta-datos Suno VLS', status: 'beta' },
    { name: 'GET /soberania/roi-publico', desc: 'Métricas de impacto ciudadano', status: 'active' }
];

export default function DevPortalVLS({ onClose }) {
    const [activeTab, setActiveTab] = useState('api');

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* DEV HEADER */}
            <div style={{ background: '#0f172a', padding: '1.2rem 3rem', borderBottom: '2px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#10b981', padding: '10px', borderRadius: '12px' }}>
                        <Terminal color="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>VLS OS: DEV & CONNECTORS PORTAL</h2>
                        <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>SISTEMA DE DESARROLLO DE SOBERANÍA REGIONAL — API V2.0</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '10px 20px', borderRadius: '12px', border: '1px solid #38bdf8', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        DOCS OFICIALES
                    </button>
                    <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>X CERRAR</button>
                </div>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', overflow: 'hidden' }}>
                
                {/* SIDEBAR - MODULOS DE DESARROLLO */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { id: 'api', label: 'API & SANDBOX', icon: Code2 },
                        { id: 'investment', label: 'INVESTMENT NODE', icon: TrendingUp },
                        { id: 'connectors', label: 'CONNECTORS HUB', icon: Share2 },
                        { id: 'infrastructure', label: 'INFRAESTRUCTURA', icon: Server }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{ 
                                padding: '1.2rem', borderRadius: '20px', background: activeTab === tab.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)', 
                                border: `1px solid ${activeTab === tab.id ? '#10b981' : 'transparent'}`, color: activeTab === tab.id ? '#10b981' : '#64748b',
                                display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', transition: '0.3s' 
                            }}
                        >
                            <tab.icon size={20} /> {tab.label}
                        </button>
                    ))}
                    
                    <div style={{ marginTop: 'auto', background: 'rgba(252, 211, 77, 0.05)', padding: '1.5rem', borderRadius: '25px', border: '1px dashed #fcd34d44' }}>
                        <span style={{ fontSize: '0.6rem', color: '#fcd34d', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>TU LAVE API</span>
                        <div style={{ background: '#000', padding: '8px', borderRadius: '10px', fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
                            VLS-SOV-73e4...651
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '40px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto' }}>
                    {activeTab === 'api' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>PLAYGROUND DE LA API SOBERANA</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Utiliza nuestros nodos de datos para construir experiencias ciudadanas. La API de Comuna Smart es escalable, segura y bajo la visión de vecinoslaserena.cl.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {API_ENDPOINTS.map(endpoint => (
                                    <div key={endpoint.name} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem' }}>{endpoint.name}</span>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '5px 0 0 0' }}>{endpoint.desc}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <span style={{ fontSize: '0.6rem', background: '#10b98122', color: '#10b981', padding: '5px 10px', borderRadius: '5px', fontWeight: '900' }}>{endpoint.status.toUpperCase()}</span>
                                            <button style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer' }}><ExternalLink size={18} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'investment' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900' }}>NODO DE INVERSIÓN VLS</h3>
                                <div style={{ background: 'rgba(252, 211, 77, 0.1)', color: '#fcd34d', padding: '10px 20px', borderRadius: '15px', border: '1px solid #fcd34d', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    CONFIDENCIAL SOU-001
                                </div>
                            </div>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>Específicamente diseñado para profesionales con experiencia en fondos de inversión y desarrollo estatal. Aquí conectamos el capital con la infraestructura comunal.</p>
                            
                            <div style={{ gridTemplateColumns: 'repeat(2, 1fr)', display: 'grid', gap: '1.5rem' }}>
                                {[
                                    { label: 'Proyección ROI Regional', value: '320% Anual', icon: TrendingUp },
                                    { label: 'Capacidad de Escalado', value: '15 Comunas', icon: Globe },
                                    { label: 'Ahorro vs Tradicional', value: '85% MENOS COSTO', icon: Zap },
                                    { label: 'Soberanía Autogestionada', value: '100% PROPIA', icon: ShieldCheck }
                                ].map(card => (
                                    <div key={card.label} style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <card.icon color="#fcd34d" size={24} style={{ marginBottom: '1rem' }} />
                                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold' }}>{card.label.toUpperCase()}</span>
                                        <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{card.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <button style={{ background: '#fcd34d', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '15px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(252, 211, 77, 0.3)' }}>
                                    MOSTRAR DOSSIER PARA AUTORIDAD GUBERNAMENTAL
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#334155', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Layers size={14} color="#10b981" />
                    <span>NODO DE DESARROLLO SOBERANO — BAJO VISIÓN DE VECINOSLASERENA.CL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <ShieldAlert size={14} color="#ef4444" />
                    <span>SANDBOX ACTIVO — USO PROFESIONAL REQUERIDO</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
