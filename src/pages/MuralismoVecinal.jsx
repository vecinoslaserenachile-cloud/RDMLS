import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Palette, User, MapPin, Camera, Star, 
    ArrowLeft, CheckCircle2, MessageSquare, 
    Zap, ShieldCheck, Heart, Search, Filter,
    Users, Building, Send, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ARTISTS = [
    { id: 1, name: 'Sofia Murales', style: 'Realismo / Paisaje', rating: 4.9, jobs: 12, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Marco Graff', style: 'Contemporáneo / 3D', rating: 4.8, jobs: 8, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'Elena Raíces', style: 'Cultura Diaguita', rating: 5.0, jobs: 15, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' }
];

const WALLS = [
    { id: 101, title: 'Fachada Residencial La Pampa', status: 'DISPONIBLE', size: '15m²', owner: 'Vecino Juan P.', img: 'https://images.unsplash.com/photo-1517524008436-bbdb53c57759?auto=format&fit=crop&w=800&q=80' },
    { id: 102, title: 'Muro Comercio Centro', status: 'EN PROCESO', size: '40m²', owner: 'Bazar Central', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80' }
];

export default function MuralismoVecinal() {
    const navigate = useNavigate();
    const [view, setView] = useState('artists'); // 'artists' or 'walls'

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: '2rem', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Header */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <button 
                    onClick={() => navigate('/hub')}
                    className="btn-glass"
                    style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                >
                    <ArrowLeft size={18} /> Volver al Hub
                </button>
                <div style={{ textAlign: 'right' }}>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '950', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Palette size={36} color="#f43f5e" /> MURALISMO SMART
                    </h1>
                    <span style={{ fontSize: '0.8rem', color: '#f43f5e', letterSpacing: '4px', fontWeight: 'bold' }}>ARTE URBANO & PROTECCIÓN VECINAL</span>
                </div>
            </div>

            {/* Info Panel */}
            <div style={{ maxWidth: '1200px', margin: '0 auto 3rem auto' }}>
                <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(30, 27, 75, 0.4) 100%)', border: '1px solid rgba(244, 63, 94, 0.3)', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: 900 }}>Conecta tu <span style={{ color: '#f43f5e' }}>arte</span> con la <span style={{ color: '#f43f5e' }}>comunidad</span>.</h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            El sistema Muralismo Smart integra a artistas locales con vecinos que desean proteger y embellecer sus fachadas. Un muro con arte es un muro respetado.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn-vls-action-light" style={{ background: '#f43f5e', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 'bold' }}>
                                ENROLARME COMO ARTISTA
                            </button>
                            <button className="btn-glass" style={{ border: '1px solid #f43f5e', color: '#f43f5e', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 'bold' }}>
                                OFRECER MI MURO
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <ShieldCheck color="#10b981" size={24} />
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Fachada Protegida</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Reduce ataques vandálicos en un 95%.</div>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Zap color="#38bdf8" size={24} />
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Gestión Digital</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Matching inteligente entre artistas y vecinos.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selector */}
            <div style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', display: 'flex', gap: '1rem' }}>
                <button 
                    onClick={() => setView('artists')}
                    style={{ padding: '1rem 2rem', borderRadius: '15px', background: view === 'artists' ? '#f43f5e' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    <Users size={18} style={{ marginRight: '8px' }} /> Artistas Validados
                </button>
                <button 
                    onClick={() => setView('walls')}
                    style={{ padding: '1rem 2rem', borderRadius: '15px', background: view === 'walls' ? '#f43f5e' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    <Building size={18} style={{ marginRight: '8px' }} /> Muros Disponibles
                </button>
            </div>

            {/* Content Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {view === 'artists' ? (
                    ARTISTS.map(artist => (
                        <div key={artist.id} className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', background: 'rgba(30,41,59,0.4)' }}>
                            <img src={artist.img} alt={artist.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.5rem auto', border: '3px solid #f43f5e' }} />
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{artist.name}</h3>
                            <div style={{ color: '#f43f5e', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '1rem' }}>{artist.style}</div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                <span>⭐ {artist.rating}</span>
                                <span>🛠️ {artist.jobs} Obras</span>
                            </div>
                            <button style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid #f43f5e', color: '#f43f5e', fontWeight: 'bold' }}>
                                CONTACTAR ARTISTA
                            </button>
                        </div>
                    ))
                ) : (
                    WALLS.map(wall => (
                        <div key={wall.id} className="glass-panel" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(30,41,59,0.4)' }}>
                            <div style={{ height: '200px', position: 'relative' }}>
                                <img src={wall.img} alt={wall.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <span style={{ position: 'absolute', top: '15px', right: '15px', background: wall.status === 'DISPONIBLE' ? '#10b981' : '#f59e0b', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>{wall.status}</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{wall.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                                    <span>{wall.owner}</span>
                                    <span>{wall.size}</span>
                                </div>
                                <button style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid #f43f5e', color: '#f43f5e', fontWeight: 'bold' }}>
                                    SOLICITAR MURO
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div style={{ height: '5rem' }}></div>
        </div>
    );
}
