import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Star, MapPin, ShieldCheck, Ticket, Car, Zap, Users, AlertCircle, Calendar, Heart, Share2, Sun, Globe } from 'lucide-react';

const FESTIVAL_LINEUP = [
    { id: 1, name: 'SOPHIE ELLIS (International Node)', type: 'headliner', status: 'confirmed' },
    { id: 2, name: 'Hito: Plan Serena (Ruta 5)', type: 'urban', status: 'monumented' },
    { id: 3, name: 'Hito: San Francisco (El Flipper)', type: 'memory', status: 'monumented' },
    { id: 3, name: 'Hito: Canto del Agua (Pampita)', type: 'nature', status: 'protected' },
    { id: 4, name: 'Hito: El Faro & Surf (Fariño)', type: 'sports', status: 'active' },
    { id: 5, name: 'Hito: Colina El Pino (Alpino)', type: 'tech', status: 'monitored' },
    { id: 6, name: 'Hito: La Antena (Sra. Atena)', type: 'heritage', status: 'monumented' },
    { id: 7, name: 'Hito: La Florida (Flori)', type: 'producción', status: 'active' },
    { id: 8, name: 'Hito: Caleta San Pedro (Tío Pedro)', type: 'gastronomía', status: 'active' },
    { id: 9, name: 'Hito: Las Compañías (Compita)', type: 'ciencia-arte', status: 'active' },
    { id: 10, name: 'Hito: San Joaquín / El Milagro (Juaco & Milagros)', type: 'social-nature', status: 'monitored' },
    { id: 11, name: 'Hito: Arrayán Costero (Sra. Coral)', type: 'security', status: 'needed' },
    { id: 12, name: 'Hito: Avenida Costanera (Kevin)', type: 'security-beach', status: 'monitored' },
    { id: 13, name: 'Hito: Palacio del Billete (El Primo)', type: 'catering-elite', status: 'active' },
    { id: 14, name: 'Hito: Captación Las Rojas (Tata Rojas)', type: 'resources', status: 'critical' },
    { id: 7, name: 'Hito: Casa Clausen (Oct 16th)', type: 'memory', status: 'monumented' },
    { id: 7, name: 'Artistas Locales Soberanos', type: 'local', status: 'auditioning' },
    { id: 5, name: 'Artistas Locales Soberanos', type: 'local', status: 'auditioning' },
    { id: 3, name: 'Orquesta Filarmónica La Serena', type: 'classic', status: 'confirmed' }
];

export default function SmartEventsVLS({ onClose }) {
    const [selectedView, setSelectedView] = useState('planning');

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000000, background: 'rgba(2, 6, 23, 0.95)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* FESTIVAL HEADER */}
            <div style={{ background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #fcd34d' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: '#fcd34d', padding: '10px', borderRadius: '50%' }}>
                        <Sun color="#1e3a8a" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '2px' }}>FESTIVAL LA SERENA: VERANO 2027</h2>
                        <span style={{ fontSize: '0.65rem', color: '#e0f2fe', fontWeight: 'bold' }}>PLANIFICACIÓN SOBERANA — NODO SMART EVENTS</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR CONSOLA</button>
            </div>

            <div style={{ flex: 1, padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', overflowY: 'auto' }}>
                
                {/* 1. ARTIST MARKETPLACE */}
                <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                        <Music color="#fcd34d" size={20} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>LINEUP ESTRATÉGICO</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {FESTIVAL_LINEUP.map(artist => (
                            <div key={artist.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(252, 211, 77, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'block' }}>{artist.name}</span>
                                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{artist.type.toUpperCase()}</span>
                                </div>
                                <span style={{ fontSize: '0.6rem', color: '#22c55e', fontWeight: 'bold' }}>{artist.status.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                    <button style={{ width: '100%', marginTop: '1.5rem', padding: '15px', borderRadius: '15px', background: 'transparent', border: '1px solid #fcd34d', color: '#fcd34d', fontWeight: 'bold', fontSize: '0.8rem' }}>POSTULACIÓN TALENTO LOCAL</button>
                </div>

                {/* 2. VLS SMART PASS & BENEFITS */}
                <div className="glass-panel" style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '2rem', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                        <Ticket color="#38bdf8" size={20} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>BENEFICIOS VECINO/TURISTA</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1.5rem', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Car color="#38bdf8" />
                            <div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block' }}>PARKING SOBERANO</span>
                                <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>-50% con Fichas VLS</span>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1.5rem', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <ShieldCheck color="#22c55e" />
                            <div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block' }}>BOTÓN DE EMERGENCIA</span>
                                <span style={{ fontSize: '0.7rem', color: '#22c55e' }}>Conexión Directa Faro Centinel</span>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '1.5rem', borderRadius: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Zap color="#fcd34d" />
                            <div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block' }}>FAST-TRACK BYD</span>
                                <span style={{ fontSize: '0.7rem', color: '#fcd34d' }}>Transporte Eléctrico Gratuito</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. ROI & IMPACT MONITOR */}
                <div className="glass-panel" style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '2rem', borderRadius: '32px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                        <Users color="#10b981" size={20} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>MONITOR DE IMPACTO REAL</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: '25px', background: 'rgba(0,0,0,0.2)' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '900', color: '#10b981', display: 'block' }}>15,000</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>TURISTAS PROYECTADOS</span>
                         </div>
                         <div style={{ textAlign: 'center', padding: '1.5rem', borderRadius: '25px', background: 'rgba(0,0,0,0.2)' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '900', color: '#fcd34d', display: 'block' }}>45.5M</span>
                            <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>RECAUDACIÓN ESTIMADA FICHAS VLS</span>
                         </div>
                         <button style={{ width: '100%', padding: '15px', borderRadius: '15px', background: '#10b981', color: '#000', fontWeight: '900', border: 'none', fontSize: '0.8rem' }}>ENVIAR DOSSIER AL GORE</button>
                    </div>
                </div>

            </div>

            {/* MONITOR DE PRECEDENCIAS (REGLA DE LOS 4 PILARES) */}
            <div style={{ padding: '0 3rem 2rem 3rem' }}>
                <div className="glass-panel" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '32px', border: '2px solid #3b82f6', display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: '#3b82f6', padding: '10px', borderRadius: '50%' }}>
                            <ShieldCheck color="white" size={24} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', color: 'white' }}>MONITOR DE PRECEDENCIAS (PROTOCOLO VLS)</h3>
                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8' }}>Orden de autoridades y vocerías soberanas en tiempo real para el verano 2027.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {['1. ALCALDE', '2. GOBERNADOR', '3. VECINO ANÓNIMO', '4. SERENITO'].map((rank, i) => (
                            <div key={i} style={{ padding: '10px 20px', background: '#000', borderRadius: '15px', border: '1px solid #3b82f6', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                {rank}
                            </div>
                        ))}
                    </div>
                    <button style={{ padding: '12px 25px', borderRadius: '15px', background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', fontWeight: 'bold', fontSize: '0.8rem' }}>AUTORIZAR VOCERÍA</button>
                </div>
            </div>


            {/* STATUS FOOTER */}
            <div style={{ padding: '1rem 3rem', background: '#000', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar size={14} color="#fcd34d" />
                    <span>CUENTA REGRESIVA: FEBRERO 2027 — COORDINACIÓN INTEGRAL VLS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Heart size={14} color="#ef4444" />
                    <span>ARTISTAS LOCALES: 35 INSCRITOS</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
