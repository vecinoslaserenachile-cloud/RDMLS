import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Users, TrendingUp, Cpu, Map, MapPin, X, FileText, CheckCircle2 } from 'lucide-react';

const DISTANCE_BUTTONS = ["Vicuña", "Andacollo", "Punta de Choros", "Ovalle", "Illapel", "Parque Fray Jorge", "Algarrobito", "Coquimbo", "Concepción"];

export default function ExecutiveDossierVLS({ onClose }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 4000000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif", overflowY: 'auto' }}>
            
            {/* DOSSIER HEADER */}
            <div style={{ background: '#0f172a', padding: '2rem 4rem', borderBottom: '5px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Shield color="#fcd34d" size={40} />
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', letterSpacing: '2px' }}>DOSSIER DE SOBERANÍA COMUNAL</h1>
                        <span style={{ fontSize: '0.8rem', color: '#fcd34d', fontWeight: 'bold' }}>PLAN DE IMPACTO REGIONAL 2026-2030 — BAJO VISIÓN DEL ARQUITECTO</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', border: '1px solid #fcd34d', color: '#fcd34d', padding: '15px 30px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>VOLVER A LA CONSOLA</button>
            </div>

            <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                
                {/* 1. RESUMEN EJECUTIVO */}
                <section>
                    <h2 style={{ fontSize: '1.5rem', color: '#38bdf8', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}><FileText /> PROPUESTA DE VALOR: COMUNA SMART</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0' }}>EL PROBLEMA</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.8' }}>
                                Sistemas gubernamentales tradicionales son lentos, costosos e desconectados emocionalmente del vecino. Dependencia de contratos leoninos y hardware obsoleto.
                            </p>
                        </div>
                        <div style={{ background: 'rgba(34, 197, 94, 0.05)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                            <h3 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0', color: '#22c55e' }}>NUESTRA SOLUCIÓN</h3>
                            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.8' }}>
                                Infraestructura Soberana basada en <strong style={{ color: 'white' }}>IA e Innovación Low-Cost</strong>. 85% de ahorro en implementación y 100% de propiedad de los datos por parte de la comuna.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. CUADRO DE DISTANCIAS - REGLA #4 */}
                <section style={{ background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#fcd34d', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}><Map /> LOGÍSTICA DE ESCALADO REGIONAL</h2>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem' }}>El nodo de Comuna Smart La Serena está diseñado para conectarse con los puntos estratégicos de la región de Coquimbo:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {DISTANCE_BUTTONS.map(city => (
                            <button key={city} style={{ padding: '10px 25px', borderRadius: '50px', background: 'rgba(252, 211, 77, 0.1)', color: '#fcd34d', border: '1px solid #fcd34d', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                {city.toUpperCase()}
                            </button>
                        ))}
                        <button onClick={onClose} style={{ padding: '10px 25px', borderRadius: '50px', background: '#ef4444', color: 'white', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>CERRAR CUADRO</button>
                    </div>
                    <div style={{ marginTop: '2rem', height: '2px', background: 'linear-gradient(90deg, #fcd34d, transparent)' }} />
                </section>

                {/* 3. IMPACTO EN CIFRAS */}
                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    {[
                        { label: 'Costo de Implementación', value: '85% MENOR', icon: Zap, color: '#fcd34d' },
                        { label: 'Participación Vecinal', value: '78.5%', icon: Users, color: '#38bdf8' },
                        { label: 'Escalabilidad Comunal', value: '15 COMUNAS', icon: Globe, color: '#22c55e' },
                        { label: 'Soberanía Técnica', value: 'MODO PROPIO', icon: Cpu, color: '#a855f7' }
                    ].map(stat => (
                        <div key={stat.label} style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <stat.icon color={stat.color} size={32} style={{ margin: '0 auto 1.5rem auto' }} />
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold', marginBottom: '10px' }}>{stat.label.toUpperCase()}</span>
                            <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{stat.value}</span>
                        </div>
                    ))}
                </section>

                {/* 4. CIERRE FIRMADO */}
                <section style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div style={{ height: '3px', width: '100px', background: '#fcd34d', margin: '0 auto 2rem auto' }} />
                    <h3 style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: 'bold' }}>RESPALDADO POR EL ARQUITECTO VDS</h3>
                    <p style={{ fontSize: '0.8rem', color: '#334155' }}>Legado Imagine Comunicaciones | © Comuna Smart 2026</p>
                </section>

            </div>

            {/* FLOATING CTA */}
            <div style={{ position: 'sticky', bottom: '2rem', alignSelf: 'center', background: '#22c55e', color: '#000', padding: '20px 60px', borderRadius: '25px', fontWeight: '900', fontSize: '1.2rem', boxShadow: '0 20px 50px rgba(34, 197, 94, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <CheckCircle2 /> SOLICITAR REUNIÓN TÉCNICA (GORE)
            </div>
        </div>
    );
}
