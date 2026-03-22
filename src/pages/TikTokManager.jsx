import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Globe, Play, Heart, Users, Share2, Tv, Zap, ExternalLink, Video, BarChart2, CheckCircle2, TrendingUp, MessageCircle, MoreVertical } from 'lucide-react';

const TIKTOK_VIDEOS = [
    { id: 1, title: 'El Faro La Serena', views: '166.9K', likes: '12K', thumbnail: '/faro-vls.png', type: 'pinned' },
    { id: 2, title: 'Cordillera de los Andes (ARG-CHI)', views: '795.2K', likes: '45K', thumbnail: '/cordillera.png', type: 'pinned' },
    { id: 3, title: 'Serenito en el Barrio', views: '2.4K', likes: '500', thumbnail: '/serenito-vls.png', type: 'recent' }
];

export default function TikTokManager({ onClose }) {
    const [syncing, setSyncing] = useState(false);

    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => setSyncing(false), 3000);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: '#000', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* TIKTOK HEADER VLS */}
            <div style={{ background: '#000', padding: '1.2rem 3rem', borderBottom: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'linear-gradient(45deg, #fe2c55, #25f4ee)', padding: '10px', borderRadius: '14px' }}>
                        <Video color="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '900' }}>TIKTOK VLS HUB — @vecinoslaserena2</h2>
                        <span style={{ fontSize: '0.65rem', color: '#25f4ee', fontWeight: 'bold', letterSpacing: '1px' }}>RED DE VIRALIDAD SOBERANA</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleSync} style={{ background: syncing ? '#1e293b' : '#25f4ee', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={18} /> {syncing ? "SYNCING..." : "ACTUALIZAR MÉTRICAS"}
                    </button>
                    <button onClick={onClose} style={{ background: '#fe2c55', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>X SALIR</button>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                
                {/* PROFILE STATS SIDEBAR */}
                <div style={{ width: '380px', background: 'rgba(5, 5, 5, 0.8)', borderRight: '1px solid rgba(56, 189, 248, 0.1)', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <motion.div whileHover={{ scale: 1.05 }} style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #fe2c55', margin: '0 auto', overflow: 'hidden', background: '#222' }}>
                             <img src="/vls-logo-premium.png" style={{ width: '100%' }} />
                        </motion.div>
                        <h3 style={{ marginTop: '1.5rem', fontSize: '1.8rem', fontWeight: '900' }}>VLS2</h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Vecinos La Serena 2.0</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                        {[
                            { label: 'SEGUIDORES', value: '32.5K', color: '#25f4ee', icon: Users },
                            { label: 'ME GUSTA', value: '654.2K', color: '#fe2c55', icon: Heart },
                            { label: 'SIGUIENDO', value: '2,127', color: 'white', icon: TrendingUp }
                        ].map(stat => (
                            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <stat.icon color={stat.color} size={24} />
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900', color: stat.color }}>{stat.value}</div>
                                    <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 'auto', background: 'rgba(37, 244, 238, 0.05)', padding: '1.5rem', borderRadius: '24px', border: '1px dashed #25f4ee' }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#25f4ee', marginBottom: '10px' }}>ESTRATEGIA SMART-CITY</h4>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.6' }}>Sincronice sus videos con la <strong>SEÑAL DE TV VLS</strong> para maximizar el impacto de su soberanía narrativa.</p>
                    </div>
                </div>

                {/* VIDEO FEED */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Video size={40} color="#fe2c55" /> FEED DE SOBERANÍA
                        </h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                             <button style={{ background: 'white', color: 'black', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem' }}>RECIENTES</button>
                             <button style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem' }}>POPULARES</button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {TIKTOK_VIDEOS.map(video => (
                            <motion.div whileHover={{ y: -10 }} key={video.id} style={{ background: '#111', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                <div style={{ height: '400px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Play size={60} color="rgba(255,255,255,0.2)" />
                                    {video.type === 'pinned' && <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#fe2c55', color: 'white', padding: '5px 15px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold' }}>ANCLADO</div>}
                                </div>
                                <div style={{ padding: '1.5rem', background: '#000' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>{video.title}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                         <div style={{ fontSize: '0.8rem', color: '#64748b' }}>👁️ {video.views} vistas</div>
                                         <button style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                             <Tv size={14} /> INYECTAR TV
                                         </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '0.8rem 3rem', background: '#111', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart2 size={12} color="#fe2c55" />
                    <span>ANÁLISIS DE VIRALIDAD VLS x TIKTOK — RED DE SOBERANÍA URBANA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: '#25f4ee' }}>● TOKEN SYNC ACTIVE</span>
                    <span>© 2026 — RODRIGO GODOY ALFARO — VLS OS</span>
                </div>
            </div>
        </div>
    );
}
