import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Send, Users, Briefcase, Zap, CheckCircle, Clock, ShieldCheck, Mail, Globe, Award, Target, MessageSquare } from 'lucide-react';

const STRATEGIC_ALLIES = [
    { id: 1, name: 'Director del Decano Regional', role: 'Liderazgo en Medios', sector: 'Medios', status: 'pending', goal: 'Alianza Prensa AI + Kiosko Virtual' },
    { id: 2, name: 'Gerencia Consorcio Minero', role: 'Sostenibilidad Estratégica', sector: 'Minería', status: 'invitation_sent', goal: 'Sponsorship Dividendo Vecinal' },
    { id: 3, name: 'Ceo Inmobiliaria de Elite', role: 'Inversión Urbana', sector: 'Inmobiliaria', status: 'contacted', goal: 'Merchants Premium en Virtual Mall' },
    { id: 4, name: 'Estratega Senior Sostenibilidad', role: 'Arquitectura Social', sector: 'Sostenibilidad', status: 'connected', goal: 'Validación de Impacto / Dividendo' },
    { id: 5, name: 'Gerencia BYD Chile', role: 'Movilidad Eléctrica', sector: 'Automotriz', status: 'targeting', goal: 'Alianza Flota de Movilidad Soberana' },
    { id: 6, name: 'Estratega de Marca Tecnológica', role: 'Global Branding', sector: 'Tecnología', status: 'pending', goal: 'Integración en Ecosistema 3D VLS' },
    { id: 7, name: 'NODO GORE COQUIMBO', role: 'Gobernación Regional', sector: 'Gubernamental', status: 'targeting', goal: 'Infraestructura de Datos Pública' }
];

export default function LinkedInHubVLS({ onClose }) {
    const [selectedAlly, setSelectedAlly] = useState(STRATEGIC_ALLIES[0]);
    const [messageDraft, setMessageDraft] = useState("");

    const generateScript = (ally) => {
        const script = `Estimado ${ally.name}, te contacto desde Vecinos La Serena. Basado en mi trayectoria con Imagine Comunicaciones y nuestra red imaginet.cl, hemos desarrollado Comuna Smart, un ecosistema de soberanía digital con ROI real para ${ally.sector}. Me gustaría presentarte el plan de impacto para ${ally.goal}. vecinoslaserena.cl.`;
        setMessageDraft(script);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(2, 6, 23, 0.98)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER HUB */}
            <div style={{ background: '#0077b5', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
                        <Linkedin color="#0077b5" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>LINKEDIN HUB: SOBERANÍA PROFESIONAL</h2>
                        <span style={{ fontSize: '0.65rem', color: '#e0f2fe', fontWeight: 'bold' }}>GESTOR DE ALIANZAS ESTRATÉGICAS — LEGADO IMAGINE COMUNICACIONES</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>X CERRAR</button>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', overflow: 'hidden' }}>
                
                {/* LEFT LIST - ALIADOS */}
                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '30px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#0077b5', fontWeight: 'bold', marginBottom: '1rem' }}>CONTACTOS ESTRATÉGICOS</h3>
                    {STRATEGIC_ALLIES.map(ally => (
                        <motion.div 
                            whileHover={{ x: 10 }}
                            key={ally.id}
                            onClick={() => { setSelectedAlly(ally); generateScript(ally); }}
                            style={{ 
                                padding: '1.2rem', borderRadius: '20px', background: selectedAlly.id === ally.id ? 'rgba(0,119,181,0.1)' : 'rgba(255,255,255,0.03)', 
                                border: `1px solid ${selectedAlly.id === ally.id ? '#0077b5' : 'transparent'}`, cursor: 'pointer', transition: '0.3s' 
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{ally.name}</span>
                                {ally.status === 'invitation_sent' ? <Clock size={14} color="#fcd34d" /> : <Target size={14} color="#64748b" />}
                            </div>
                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{ally.role} | {ally.sector}</span>
                        </motion.div>
                    ))}
                </div>

                {/* CONTENT - GESTOR DE MENSAJE */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '40px', padding: '3rem', border: '1px solid rgba(0,119,181,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ width: '50px', height: '50px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>{selectedAlly.name}</h3>
                                    <span style={{ color: '#0077b5', fontSize: '0.8rem', fontWeight: 'bold' }}>{selectedAlly.goal}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{ fontSize: '0.7rem', background: '#0077b522', color: '#0077b5', padding: '5px 15px', borderRadius: '5px' }}>META: CONECTADO</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', marginBottom: '10px', fontWeight: 'bold' }}>GUIÓN DE SOBERANÍA (IA GENERADA)</label>
                            <textarea 
                                value={messageDraft}
                                onChange={(e) => setMessageDraft(e.target.value)}
                                style={{ width: '100%', height: '180px', background: 'rgba(0,0,0,0.3)', border: '1px solid #334155', borderRadius: '20px', padding: '1.5rem', color: '#e0f2fe', fontSize: '0.9rem', lineHeight: '1.5', resize: 'none' }}
                            />
                        </div>

                        <button 
                            style={{ background: '#0077b5', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '15px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,119,181,0.3)' }}
                        >
                            <Send size={20} /> ENVIAR POR LINKEDIN
                        </button>
                    </div>

                    {/* STATS CONEXIÓN */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {[
                            { label: 'Relación Imagine', value: 'ALTA', color: '#38bdf8' },
                            { label: 'Interés Día D AI', value: 'MUY ALTO', color: '#22c55e' },
                            { label: 'Puntaje de Soberanía', value: '450 pts', color: '#fcd34d' }
                        ].map(stat => (
                            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.6rem', color: '#334155', display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{stat.label.toUpperCase()}</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: stat.color }}>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STATUS BAR */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#334155', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={14} color="#0077b5" />
                    <span>MODO VETERANO ACTIVADO — RESPALDO: IMAGINE COMUNICACIONES</span>
                </div>
                <span>© COMUNA SMART — LINKEDIN STRATEGY UNIT</span>
            </div>
        </div>
    );
}
