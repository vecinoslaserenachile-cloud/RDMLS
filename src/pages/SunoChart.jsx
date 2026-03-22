import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Globe, MapPin, Star, TrendingUp, Play, Pause, Building2, Heart, Download, Share2, Filter, Info, Radio, Zap, Headphones, Languages, BarChart3, ChevronRight, Settings, Key, ShieldCheck, Database } from 'lucide-react';

const SUNO_MOCK_DATA = [
    { 
        geo: 'la_serena', 
        name: 'La Serena (Corazón)', 
        tracks: [
            { id: 1, title: 'Chiquitita ONE LOVE (Remastered)', artist: 'vecinossmart', plays: '154k', status: 'TOP 1', lyrics: '[Intro] (Yeah!) (La Serena!) (Me encanta)...' },
            { id: 2, title: 'Brisa del Elqui lofi', artist: 'Soberanía Sonora', plays: '120k', status: 'TRENDING', lyrics: 'Instrumental ambiental...' }
        ]
    },
    { 
        geo: 'global_world', 
        name: 'Mundo & Continentes', 
        tracks: [
            { id: 6, title: 'Infinite Loop (Labs Edition)', artist: 'Suno Global', plays: '5.2M', status: 'GLOBAL HIT', lyrics: 'Electronic pulses...' }
        ]
    }
];

export default function SunoChartsPortal({ onClose }) {
    const [geoFilter, setGeoFilter] = useState('la_serena');
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [showApiConfig, setShowApiConfig] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [userToken, setUserToken] = useState("eyJhbGciOiJSUzI1NiIsImtpZCI6InN1bm8tYXBpLXJzMjU2LWtleS0xIiwidHlwIjoiSldUIn0...");
    const [connectedUser, setConnectedUser] = useState("vecinossmart@gmail.com");
    const [authorName, setAuthorName] = useState("vecinoslaserena.cl");
    const [isPlayingVinyl, setIsPlayingVinyl] = useState(false);

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            alert("¡Ranking sincronizado con tu cuenta Suno!");
        }, 3000);
    };

    const activeGeo = SUNO_MOCK_DATA.find(d => d.geo === geoFilter) || SUNO_MOCK_DATA[0];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER SUNO VLS */}
            <div style={{ background: 'rgba(5, 10, 25, 0.98)', padding: '1.2rem 3rem', borderBottom: '2px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'linear-gradient(45deg, #fcd34d, #f97316)', padding: '8px', borderRadius: '12px' }}>
                        <Music color="white" size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>VLS SUNO CHARTS — API GATEWAY</h2>
                        <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>USER MODE: @vecinossmart — SOBERANÍA SONORA ACTIVA</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '10px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #22c55e44' }}>
                        <ShieldCheck size={18} /> API USER CONNECTED
                    </div>
                    <button onClick={() => setShowApiConfig(!showApiConfig)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer' }}>
                        <Settings size={20} />
                    </button>
                    <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>SALIR</button>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                
                {/* GEO SELECTOR */}
                <div style={{ width: '350px', background: 'rgba(10, 15, 30, 0.5)', borderRight: '1px solid rgba(56, 189, 248, 0.1)', padding: '2rem', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem', letterSpacing: '2px' }}>FILTROS DE SOBERANÍA</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { id: 'la_serena', label: 'LA SERENA', icon: MapPin },
                            { id: 'coquimbo_regio', label: 'REG. COQUIMBO', icon: Building2 },
                            { id: 'chile_global', label: 'CHILE', icon: Star },
                            { id: 'global_world', label: 'GLOBAL', icon: Globe }
                        ].map(f => (
                            <button key={f.id} onClick={() => setGeoFilter(f.id)} style={{ background: geoFilter === f.id ? 'rgba(56, 189, 248, 0.1)' : 'transparent', border: `1px solid ${geoFilter === f.id ? '#38bdf8' : 'rgba(255,255,255,0.05)'}`, padding: '1.2rem', borderRadius: '20px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <f.icon size={20} color={geoFilter === f.id ? '#38bdf8' : '#64748b'} />
                                <span style={{ fontWeight: 'bold', color: geoFilter === f.id ? 'white' : '#64748b', fontSize: '0.85rem' }}>{f.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* API CONFIG PANEL */}
                    <AnimatePresence>
                        {showApiConfig && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ marginTop: '2rem', background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '24px', border: '1px solid #38bdf8' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                    <Key size={18} color="#38bdf8" />
                                    <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>SUNO API TOKEN (USER)</span>
                                </div>
                                <input 
                                    type="password" 
                                    value={userToken}
                                    className="bg-transparent border border-gray-700 w-full p-2 text-xs rounded mb-3 text-cyan-400"
                                    onChange={(e) => setUserToken(e.target.value)}
                                />
                                <button onClick={handleSync} style={{ width: '100%', padding: '10px', background: '#38bdf8', color: '#0f172a', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}>
                                    {isSyncing ? "SYNCING..." : "ACTUALIZAR DATOS"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* MAIN CONTENT */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: 'radial-gradient(circle at 50% 50%, #0c4a6e 0%, #020617 100%)' }}>
                    
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '32px', marginBottom: '3rem', border: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                             <Database color="#38bdf8" size={32} />
                             <div>
                                 <h3 style={{ color: 'white', margin: 0 }}>VLS SONYX CLOUD</h3>
                                 <p style={{ color: '#64748b', margin: 0, fontSize: '0.8rem' }}>Sincronización directa con el Labs de @vecinossmart.</p>
                             </div>
                         </div>
                         <div style={{ textAlign: 'right' }}>
                             <div style={{ fontSize: '1.1rem', color: '#fcd34d', fontWeight: '900' }}>2,500 CRÉDITOS</div>
                             <div style={{ fontSize: '0.6rem', color: '#64748b' }}>DISPONIBLES EN SUNO</div>
                         </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                        {activeGeo.tracks.map((track, idx) => (
                            <motion.div 
                                whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                                key={track.id}
                                style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                            >
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', width: '30px' }}>{idx + 1}</span>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 5px 0' }}>{track.title}</h4>
                                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>por <strong>@{track.artist}</strong></span>
                                </div>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '5px 15px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: '900' }}>
                                    {track.status}
                                </div>
                                <button 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setSelectedTrack(track);
                                        setIsPlayingVinyl(true);
                                    }}
                                    style={{ background: selectedTrack?.id === track.id ? '#10b981' : '#fcd34d', color: '#0f172a', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '900' }}
                                >
                                    {selectedTrack?.id === track.id ? 'PLAYING...' : 'REPRODUCIR (VLS)'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* EL TORNAMESA (VINYL PLAYER) PANEL */}
                <div style={{ width: '400px', background: '#0f172a', borderLeft: '1px solid rgba(56, 189, 248, 0.1)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '20px', right: '20px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        EL TORNAMESA VLS
                    </div>
                    
                    {/* Vinyl Record */}
                    <div style={{
                        width: '250px', height: '250px',
                        background: 'linear-gradient(45deg, #111, #222, #000, #111)',
                        borderRadius: '50%',
                        position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
                        border: '2px solid #333',
                        animation: isPlayingVinyl ? 'spin 3s linear infinite' : 'none',
                        transition: 'all 0.5s'
                    }}>
                        {/* Grooves */}
                        <div style={{ position: 'absolute', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid #222' }}></div>
                        <div style={{ position: 'absolute', width: '190px', height: '190px', borderRadius: '50%', border: '1px solid #1a1a1a' }}></div>
                        <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', border: '1px solid #222' }}></div>
                        
                        {/* Center Label */}
                        <div style={{
                            width: '80px', height: '80px',
                            background: selectedTrack ? 'linear-gradient(135deg, #38bdf8, #3b82f6)' : '#334155',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                            color: 'white', fontWeight: 'bold', fontSize: '0.5rem', textAlign: 'center', lineHeight: '1.2'
                        }}>
                            <div>
                                <Star size={10} color="#fcd34d" style={{ margin: '0 auto 2px auto' }} />
                                VLS<br/>RECORDS
                            </div>
                        </div>
                        {/* Spindle hole */}
                        <div style={{ position: 'absolute', width: '10px', height: '10px', background: 'silver', borderRadius: '50%', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)' }}></div>
                    </div>

                    {/* Tonearm */}
                    <div style={{
                        position: 'absolute', top: '25%', right: '40px',
                        width: '15px', height: '180px',
                        background: 'linear-gradient(90deg, #d4d4d4, #f5f5f5, #a3a3a3)',
                        borderRadius: '10px',
                        transformOrigin: 'top center',
                        transform: isPlayingVinyl ? 'rotate(25deg)' : 'rotate(0deg)',
                        transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '-5px 10px 15px rgba(0,0,0,0.5)',
                        zIndex: 10
                    }}>
                        {/* Pivot */}
                        <div style={{ position: 'absolute', top: '-15px', left: '-12px', width: '40px', height: '40px', background: 'radial-gradient(circle, #333, #000)', borderRadius: '50%', border: '2px solid #555' }}></div>
                        {/* Headshell */}
                        <div style={{ position: 'absolute', bottom: '-20px', left: '-5px', width: '25px', height: '40px', background: '#222', borderRadius: '4px', transform: 'rotate(-15deg)' }}>
                            <div style={{ position: 'absolute', bottom: '5px', left: '10px', width: '2px', height: '5px', background: 'silver' }}></div>
                        </div>
                    </div>

                    {/* Track Info */}
                    <div style={{ marginTop: '3rem', textAlign: 'center', width: '100%', padding: '0 1rem' }}>
                        {selectedTrack ? (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div style={{ color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px' }}>NOW PLAYING</div>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: 'white' }}>{selectedTrack.title}</h3>
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>@{selectedTrack.artist}</div>
                                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                                    <button onClick={() => setIsPlayingVinyl(!isPlayingVinyl)} style={{ background: isPlayingVinyl ? '#ef4444' : '#10b981', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {isPlayingVinyl ? <Pause size={16} /> : <Play size={16} />} 
                                        {isPlayingVinyl ? 'PAUSA' : 'REANUDAR'}
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div style={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.9rem' }}>
                                Selecciona una pista del ranking para iniciar el tornamesa VLS.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '0.8rem 3rem', background: '#000', color: '#64748b', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart3 size={12} color="#38bdf8" />
                    <span>ANÁLISIS DE DATOS VLS x SUNO — GATEWAY MODE</span>
                </div>
            </div>
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
