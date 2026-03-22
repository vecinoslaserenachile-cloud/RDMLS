import React, { useState, useEffect } from 'react';
import { Film, Gamepad2, PlayCircle, Clock, CheckCircle, Ticket, X } from 'lucide-react';

export default function VecinosClipClub({ onClose }) {
    const [tokens, setTokens] = useState(() => {
        const saved = localStorage.getItem('vls_tokens');
        return saved ? parseInt(saved) : 5; // Empiezan con 5 fichas gratis
    });

    const [rentals, setRentals] = useState(() => {
        const saved = localStorage.getItem('vls_rentals');
        return saved ? JSON.parse(saved) : [];
    });

    const catalog = [
        { id: 'vhs-1', title: 'Sereneres 2026', type: 'vhs', cost: 1, img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop' },
        { id: 'vhs-2', title: 'Documental: El Olivar', type: 'vhs', cost: 2, img: 'https://images.unsplash.com/photo-1588693892556-3c0fde9d21dd?q=80&w=400&auto=format&fit=crop' },
        { id: 'game-1', title: 'Super Serenito Bros', type: 'game', cost: 1, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop' },
        { id: 'game-2', title: 'La Portada Kombat', type: 'game', cost: 2, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop' }
    ];

    useEffect(() => {
        localStorage.setItem('vls_tokens', tokens.toString());
        localStorage.setItem('vls_rentals', JSON.stringify(rentals));
    }, [tokens, rentals]);

    const handleRent = (item) => {
        if (tokens >= item.cost) {
            setTokens(prev => prev - item.cost);
            setRentals(prev => [...prev, { ...item, rentedAt: Date.now() }]);
            alert(`¡Alquilaste ${item.title}!\nPuedes reproducirlo ahora.`);
        } else {
            alert('No tienes suficientes Fichas VLS. Mañana te recargaremos más.');
        }
    };

    const handleReturn = (id) => {
        setRentals(prev => prev.filter(r => r.id !== id));
        alert('Gracias por devolver la cinta/juego al club. ¡Be kind, rewind!');
    };

    const playMedia = (item) => {
        if (item.type === 'vhs') {
            window.dispatchEvent(new CustomEvent('open-vhs-tv'));
        } else {
            window.dispatchEvent(new CustomEvent('open-retro-room'));
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200000, background: 'rgba(5,5,15,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ width: '100%', maxWidth: '900px', background: '#0f172a', borderRadius: '16px', border: '2px solid #3b82f6', display: 'flex', flexDirection: 'column', height: '80vh', overflow: 'hidden' }}>
                
                {/* Header */}
                <div style={{ padding: '1.5rem', background: '#1e293b', borderBottom: '2px solid #3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Film color="#3b82f6" /> VecinosClipClub
                        </h2>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>El VideoClub de tu Barrio</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Ticket color="#f59e0b" size={18} />
                            <span style={{ color: '#fcd34d', fontWeight: 'bold' }}>{tokens} Fichas</span>
                        </div>
                        <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    
                    {/* Catalog */}
                    <div style={{ flex: 2, padding: '1.5rem', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ color: '#38bdf8', marginTop: 0 }}>Catálogo Disponible</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {catalog.map(c => {
                                const isRented = rentals.find(r => r.id === c.id);
                                return (
                                    <div key={c.id} style={{ background: '#1e293b', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155', opacity: isRented ? 0.5 : 1 }}>
                                        <img src={c.img} alt={c.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                                        <div style={{ padding: '1rem' }}>
                                            <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>{c.title}</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#f59e0b', fontSize: '0.8rem', fontWeight: 'bold' }}>{c.cost} Ficha(s)</span>
                                                {isRented ? (
                                                    <span style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 'bold' }}>YA ALQUILADO</span>
                                                ) : (
                                                    <button onClick={() => handleRent(c)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Alquilar</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* My Rentals */}
                    <div style={{ flex: 1, padding: '1.5rem', background: '#0f172a', overflowY: 'auto' }}>
                        <h3 style={{ color: '#10b981', marginTop: 0 }}>Mis Películas/Juegos</h3>
                        {rentals.length === 0 ? (
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No tienes alquileres activos.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {rentals.map(r => (
                                    <div key={r.id} style={{ background: '#1e293b', borderLeft: `3px solid ${r.type === 'vhs' ? '#ef4444' : '#10b981'}`, padding: '1rem', borderRadius: '8px' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {r.type === 'vhs' ? <Film size={14}/> : <Gamepad2 size={14}/>} {r.title}
                                        </h4>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => playMedia(r)} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                                                <PlayCircle size={16} /> Ver/Jugar
                                            </button>
                                            <button onClick={() => handleReturn(r.id)} style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
                                                Devolver
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
