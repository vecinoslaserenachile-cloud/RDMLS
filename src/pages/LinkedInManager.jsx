// COMPONENTE DE GESTIÓN DE NETWORKING PROFESIONAL (LINKEDIN)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Send, Zap, Users, Shield, Target, Award, Rocket, Globe, Database, Cpu, MessageSquare, X } from 'lucide-react';

export default function LinkedInCampaignManager({ onClose }) {
    const [selectedProfile, setSelectedProfile] = useState('personal'); // personal | institucional
    const [campaignStatus, setCampaignStatus] = useState('idle'); // idle | drafting | deploying | active

    const profiles = {
        personal: { name: "Rodrigo Alzin Godoy Alfaro", role: "CEO & Fundador Vecinity Pay", connections: "+500" },
        institucional: { name: "Vecinos La Serena", role: "Ecosistema Smart City", followers: "Verificando..." }
    };

    const campaignTopics = [
        { id: 'tech', label: 'Innovación IA', text: 'Cómo nuestra IA está transformando la seguridad en La Serena.' },
        { id: 'finance', label: 'Finanzas 4.0', text: 'Vecinity Pay: La tokenización de la economía vecinal mediante Fichas VLS.' },
        { id: 'partnership', label: 'Alianzas Estratégicas', text: 'Propuesta de colaboración mutua para Diario El Día y Zapping TV.' },
        { id: 'impact', label: 'Impacto Social', text: 'Nuestra red de seguridad vecinal en El Milagro: Resultados reales.' }
    ];

    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* HEADER LINKEDIN STYLE */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ background: '#0077b5', padding: '15px', borderRadius: '15px' }}>
                            <Linkedin size={32} color="white" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: '900' }}>LinkedIn Campaign Center</h1>
                            <p style={{ color: '#94a3b8' }}>Operando bajo el perfil: <strong>{profiles[selectedProfile].name}</strong></p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button 
                            onClick={() => setSelectedProfile(selectedProfile === 'personal' ? 'institucional' : 'personal')}
                            style={{ background: 'transparent', border: '1px solid #0077b5', color: '#0077b5', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Cambiar Perfil
                        </button>
                        <button style={{ background: '#0077b5', border: 'none', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <Rocket size={18} /> LANZAR CAMPAÑA
                        </button>
                        <button 
                            onClick={onClose}
                            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    
                    {/* GENERADOR DE POSTS IA B2B */}
                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Cpu size={24} color="#0077b5" /> IA Copywriter para LinkedIn
                        </h2>
                        <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Selecciona el enfoque de tu post para que la IA genere un "Speech de Alta Potencialidad":</p>
                        
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {campaignTopics.map(topic => (
                                <motion.div 
                                    whileHover={{ x: 10 }}
                                    key={topic.id}
                                    style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                                >
                                    <h4 style={{ color: '#0077b5', fontWeight: 'bold', marginBottom: '5px' }}>{topic.label}</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{topic.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* NETWORKING CRM PILLAR */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ padding: '30px', background: 'linear-gradient(135deg, #0077b5 0%, #004182 100%)', borderRadius: '32px', color: 'white' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>Potencialidad de Alcance</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>12.5k</div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>ALCANCE B2B ESTIMADO</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>85%</div>
                                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>CTR PARA EL DÍA / ZAPPING</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                                Utilizando el motor de **Inbound Marketing**, el sistema conectará tu perfil con los directivos clave de la Región de Coquimbo.
                            </p>
                        </div>

                        {/* LISTA DE TARGETS ESTRATÉGICOS */}
                        <div style={{ padding: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Target size={18} color="#ef4444" /> Objetivos Estratégicos (Targets)
                            </h4>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {['Paco Puga (Diario El Día)', 'Equipo Alianzas Zapping', 'Gerencia Comercial MACH BCI', 'Consejo Municipal La Serena'].map(target => (
                                    <div key={target} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', fontSize: '0.85rem' }}>
                                        <span>{target}</span>
                                        <MessageSquare size={16} color="#0077b5" style={{ cursor: 'pointer' }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* VISIÓN ESTRATÉGICA FINAL */}
                <div style={{ marginTop: '60px', padding: '40px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '32px', border: '1px solid rgba(239, 68, 68, 0.2)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px' }}>Despliegue de Campaña "Toda la Potencialidad"</h2>
                    <p style={{ color: '#94a3b8', maxWidth: '800px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.7' }}>
                        Al presionar el botón de **LANZAR**, el sistema activará una ráfaga de integraciones: tu perfil de LinkedIn compartirá el Kiosko Virtual, el Media Center en vivo y el panel de Smart Citizens como testimonio de innovación disruptiva en Chile.
                    </p>
                </div>
            </div>
        </div>
    );
}
