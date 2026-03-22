import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, Handshake, TrendingUp, FileCheck, Landmark, Globe, Hammer, CheckCircle, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RightsGovernanceVLS({ onClose }) {
    const [governanceTab, setGovernanceTab] = useState('rights');

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 7000000, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* GOVERNANCE HEADER */}
            <div style={{ background: '#1e293b', padding: '1.5rem 3rem', borderBottom: '4px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '15px' }}>
                        <Scale color="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>GOBERNANZA Y DERECHOS SOBERANOS VLS</h2>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold' }}>CONFORMIDAD LEGAL CHILE & INTERNACIONAL — PROTECCIÓN TOTAL</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR CONSOLA</button>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', overflow: 'hidden' }}>
                
                {/* SIDEBAR - GOBERNANZA MODULOS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { id: 'rights', label: 'MIS DERECHOS DIGITALES', icon: ShieldCheck },
                        { id: 'profits', label: 'DIVIDENDO VECINAL', icon: TrendingUp },
                        { id: 'disputes', label: 'CÁMARA DE ACUERDOS', icon: Handshake },
                        { id: 'legal', label: 'CUMPLIMIENTO NORMATIVO', icon: Landmark }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setGovernanceTab(tab.id)}
                            style={{ 
                                padding: '1.2rem', borderRadius: '20px', background: governanceTab === tab.id ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)', 
                                border: `1px solid ${governanceTab === tab.id ? '#38bdf8' : 'transparent'}`, color: governanceTab === tab.id ? '#38bdf8' : '#64748b',
                                display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', transition: '0.3s' 
                            }}
                        >
                            <tab.icon size={20} /> {tab.label}
                        </button>
                    ))}
                    
                    <div style={{ marginTop: 'auto', background: 'rgba(34, 197, 94, 0.05)', padding: '1.5rem', borderRadius: '25px', border: '1px dashed #22c55e44' }}>
                        <span style={{ fontSize: '0.6rem', color: '#22c55e', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>ESTATUS LEGAL VLS</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileCheck size={18} color="#22c55e" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>EN CONFORMIDAD (Leyes Chile)</span>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '40px', padding: '3.5rem', border: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto' }}>
                    {governanceTab === 'rights' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>DECLARACIÓN DE DERECHOS DEL VECINO DIGITAL</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2.5rem' }}>En Comuna Smart, tú eres el dueño de tu soberanía. Aquí puedes gestionar lo que compartes y lo que recibes.</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>DERECHO A RECLAMO</h4>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Acceso directo a la defensa Sernac 2.0 y mediación municipal inmediata.</p>
                                    <button style={{ marginTop: '1rem', background: '#38bdf8', color: '#000', padding: '10px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '0.7rem' }}>INICIAR RECLAMO</button>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>DERECHO A GANANCIAS</h4>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Súmate a los beneficios económicos generados por la red B2B de Comuna Smart.</p>
                                    <button style={{ marginTop: '1rem', background: '#10b981', color: '#000', padding: '10px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '0.7rem' }}>COBRAR DIVIDENDO</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {governanceTab === 'disputes' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>CÁMARA DE ACUERDOS (MEDIACIÓN SMART)</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>"Todo tiene arreglo bajo las normas internacionales y nacionales de Chile". Resolvemos conflictos de forma profesional y elocuente.</p>
                            
                            <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid #22c55e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <Handshake color="#22c55e" size={32} />
                                    <div>
                                        <h4 style={{ margin: 0 }}>CASOS ACTIVOS: 0</h4>
                                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Ambiente Soberano Estable. Ningún conflicto pendiente.</span>
                                    </div>
                                </div>
                                <button style={{ background: 'transparent', border: '1px solid #22c55e', color: '#22c55e', padding: '10px 25px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem' }}>NUEVA MEDIACIÓN</button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#334155', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Globe size={14} color="#38bdf8" />
                    <span>CONCORDANCIA NORMATIVA INTERNACIONAL — JURISDICCIÓN CHILE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <ShieldCheck size={14} color="#10b981" />
                    <span>VLS GOVERNANCE ENGINE ACTIVO</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
