import React from 'react';
import { motion } from 'framer-motion';
import { Music, Star, Mic2, Tv, Users, Heart, Share2, Zap, Play, Disc, Headphones, Sparkles } from 'lucide-react';

const FA_SESSIONS = [
    { id: 'l6hqXu-5-5w', title: 'Fiesta ¡FA! - Session 01', guest: 'Resiliencia Reggae' },
    { id: 'EazNLUhXXdA', title: 'Fiesta ¡FA! - Master Jam', guest: 'Calamaro & Friends' },
    { id: 'acusticos', title: 'Acústicos El Mañana', guest: 'Talento Local VLS' }
];

export default function FiestaFAVLS({ onClose }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000000, background: 'linear-gradient(135deg, #4c1d95, #1e1b4b)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* FA HEADER */}
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem 4rem', borderBottom: '6px solid #facc15', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <div style={{ background: '#facc15', padding: '15px', borderRadius: '50%', boxShadow: '0 0 30px rgba(250, 204, 21, 0.4)' }}>
                        <Music color="#4c1d95" size={30} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', letterSpacing: '3px' }}>FIESTA ¡FA! VLS</h2>
                        <span style={{ fontSize: '0.9rem', color: '#facc15', fontWeight: 'bold', letterSpacing: '2px' }}>MÚSICA • TERTULIA • SOBERANÍA • AMIGOS</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'white', color: '#4c1d95', border: 'none', padding: '15px 40px', borderRadius: '15px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>SALIR DE LA FIESTA</button>
            </div>

            <div style={{ flex: 1, padding: '4rem', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', overflow: 'hidden' }}>
                
                {/* 1. MAIN SCREEN ( Mex Style ) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '4px solid rgba(255,255,255,0.1)' }}>
                         <iframe 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            src="https://www.youtube.com/embed/l6hqXu-5-5w?autoplay=1" 
                            title="Fiesta ¡FA! Soberana"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                            <Sparkles color="#facc15" />
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>PRESENTADO POR: VECINOSLASERENA.CL</h3>
                        </div>
                        <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: '1.8', fontStyle: 'italic' }}>
                            "Porque la verdadera inteligencia de una comuna se mide por su capacidad de crear belleza juntos. Bienvenidos a la tertulia que La Serena merecía."
                        </p>
                    </div>
                </div>

                {/* 2. SESSIONS LIST ( Grid de Joyas ) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                    
                    {/* ABOUT PANEL (Style like the screenshot) */}
                    <div style={{ background: 'rgba(255,255,255,0.08)', padding: '2rem', borderRadius: '35px', border: '1px solid rgba(250, 204, 21, 0.3)', marginBottom: '1rem' }}>
                        <h4 style={{ color: '#facc15', margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>Acerca de Comuna Smart</h4>
                        <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Canal oficial de la "Soberanía VLS" con un vecino anónimo. Música, charlas, identidad vecinal y mucha tertulia inteligente. 100% Autogestión Regional.
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem' }}>
                                 <Users size={16} color="#facc15" /> <strong>120 Líderes de Élite</strong>
                             </div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem' }}>
                                 <Share2 size={16} color="#facc15" /> <strong>Red Regional Activa</strong>
                             </div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem' }}>
                                 <Globe size={16} color="#facc15" /> <strong>Jurisdicción: La Serena, Chile</strong>
                             </div>
                        </div>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#facc15', letterSpacing: '1px', marginBottom: '1rem' }}>PROXIMAS SESIONES VLS</h4>
                    {FA_SESSIONS.map(session => (
                        <motion.div whileHover={{ x: 20 }} key={session.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                             <div style={{ width: '60px', height: '60px', background: '#facc1533', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 <Play color="#facc15" fill="#facc15" />
                             </div>
                             <div>
                                 <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{session.title}</div>
                                 <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>INVITADO: {session.guest}</div>
                             </div>
                        </motion.div>
                    ))}

                    {/* MASHUP BUTTON */}
                    <button style={{ marginTop: 'auto', background: 'linear-gradient(45deg, #facc15, #fbbf24)', color: '#4c1d95', padding: '2rem', borderRadius: '30px', border: 'none', fontWeight: '900', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', boxShadow: '0 20px 40px rgba(250, 204, 21, 0.2)' }}>
                        <Zap /> INICIAR JAM SOBERANA (FREE STYLE)
                    </button>
                </div>

            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1.5rem 4rem', background: 'rgba(0,0,0,0.5)', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Tv size={16} color="#facc15" />
                    <span>CANAL "¡FA! VLS" — SEÑAL DE ELEVADA FRECUENCIA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <Users size={16} color="#facc15" />
                    <span>120 VECINOS EN SINTONÍA</span>
                    <span>© COMUNA SMART • INSPIRACIÓN CALAMARO</span>
                </div>
            </div>
        </div>
    );
}
