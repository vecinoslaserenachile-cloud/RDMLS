import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Send, Zap, Shield, BarChart3, Users, Globe, BookOpen, Layers, Target, Terminal, Cpu, Mail, Rocket, X } from 'lucide-react';

const clientData = {
    "el-dia": {
        name: "Diario El Día",
        lead: "Paco Puga",
        brandColor: "#ef4444",
        concept: "Día D + IA",
        speech: "El futuro del periodismo regional no es solo generar contenido, sino validarlo y monetizarlo mediante IA y participación vecinal activa.",
        features: ["Kiosko 3D", "Blindaje Reputacional", "Monetización con Fichas"],
        icon: Newspaper
    },
    "zapping": {
        name: "Zapping TV Chile",
        lead: "Equipo de Alianzas",
        brandColor: "#22c55e",
        concept: "Streaming Vecinal",
        speech: "Buscamos integrar los canales FAST y Premium de Zapping en el corazón de la Smart City, permitiendo micro-pagos por uso.",
        features: ["Embed Premium", "Auth Bridging", "Cross-Promotion"],
        icon: Globe
    },
    "mach": {
        name: "MACH BCI",
        lead: "Gerencia Nacional de Alianzas",
        brandColor: "#3b82f6",
        concept: "Ecosistema Financiero VLS",
        speech: "Vecinity Pay es el brazo territorial de MACH en La Serena. Queremos que cada terminal de pago en el barrio sea un punto de contacto MACH.",
        features: ["Cash-In/Out en Barrios", "Beneficios Exclusivos", "Tokenización BCI"],
        icon: Zap
    }
};

export default function PropuestaEstrategica({ onClose }) {
    const [clientKey, setClientKey] = useState("el-dia");
    const [activeHat, setActiveHat] = useState(null);
    const client = clientData[clientKey];

    const deBonoHats = [
        { color: 'white', label: 'DATOS (Blanco)', text: `Impacto real: +200k contactos. El aliado ${client.name} obtiene métricas de Meltwater en tiempo real sobre su marca.` },
        { color: '#ef4444', label: 'EMOCIÓN (Rojo)', text: `Fomentamos el orgullo regional vinculando a ${client.name} con el bienestar directo de los vecinos.` },
        { color: '#000', label: 'CAUTELA (Negro)', text: `Mitigación de riesgos: Blindaje de marca mediante validación social y seguridad digital de punta.` },
        { color: '#fbbf24', label: 'VALOR (Amarillo)', text: `Retorno de Inversión (ROI): Nuevos canales de venta mediante Fichas VLS y Vecinity Pay.` },
        { color: '#22c55e', label: 'CREATIVIDAD (Verde)', text: `Innovación disruptiva: El Kiosko Virtual 3D y APIs cruzadas que no existen en el mercado actual.` },
        { color: '#3b82f6', label: 'CONTROL (Azul)', text: 'Plan de despliegue a 24 meses con hitos claros y gobierno de datos compartido.' }
    ];

    return (
        <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ background: '#0f172a', padding: '10px 40px', borderBottom: '1px solid #1e293b', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold' }}>ADMIN PITCH GENERATOR:</span>
                {Object.keys(clientData).map(key => (
                    <button 
                        key={key} 
                        onClick={() => setClientKey(key)}
                        style={{ background: clientKey === key ? '#ef4444' : 'transparent', border: '1px solid #1e293b', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                        {clientData[key].name}
                    </button>
                ))}
            </div>

            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: client.brandColor, padding: '10px', borderRadius: '12px', transition: 'all 0.4s' }}>
                        <client.icon size={24} color="white" />
                    </div>
                    <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>VECINITY x {client.name.toUpperCase()}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <button style={{ background: client.brandColor, border: 'none', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Mail size={16} /> ENVIAR PROPUESTA
                    </button>
                    <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div style={{ padding: '60px 20px' }}>
                <motion.div 
                    key={clientKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <div style={{ display: 'inline-block', padding: '10px 24px', background: `${client.brandColor}20`, borderRadius: '50px', border: `1px solid ${client.brandColor}`, marginBottom: '30px' }}>
                        <span style={{ color: client.brandColor, fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '3px' }}>SESIÓN ESTRATÉGICA DIRECCIÓN</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '20px' }}>
                        Unificando fuerzas por <br/> la <span style={{ color: client.brandColor }}>{client.concept}</span>.
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '800px', margin: '0 auto' }}>
                        Propuesta estratégica personalizada para <strong>{client.lead}</strong>. Integración de ecosistemas digitales, monetización territorial y blindaje de marca.
                    </p>
                </motion.div>

                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                    <motion.div key={client.name}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px', borderBottom: `2px solid ${client.brandColor}`, display: 'inline-block' }}>Vision Meltwater</h2>
                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                            <p style={{ marginBottom: '25px' }}>
                                Basado en el análisis de media intelligence de <strong>Meltwater</strong>, hemos identificado que {client.name} requiere una conexión visceral con el territorio para escalar su propuesta digital. 
                            </p>
                            <p style={{ marginBottom: '25px' }}>{client.speech}</p>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Hitos Tecnológicos:</h4>
                                {client.features.map(f => (
                                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <Zap size={14} color={client.brandColor} />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {deBonoHats.map((hat) => (
                                <motion.div 
                                    key={hat.color}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setActiveHat(hat)}
                                    style={{ 
                                        padding: '20px', 
                                        background: activeHat?.color === hat.color ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)', 
                                        borderRadius: '20px', 
                                        border: activeHat?.color === hat.color ? `2px solid ${hat.color === '#000' ? client.brandColor : hat.color}` : '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ width: '12px', height: '12px', background: hat.color, borderRadius: '50%', marginBottom: '10px' }} />
                                    <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '8px' }}>{hat.label}</h4>
                                    <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{hat.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
