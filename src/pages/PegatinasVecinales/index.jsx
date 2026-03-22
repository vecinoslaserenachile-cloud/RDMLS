import React, { useState } from 'react';
import { Download, Share2, Smartphone, SmilePlus, Verified, ChevronLeft, Hexagon, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { personajesSerena } from '../../data/personajes';

export default function PegatinasVecinales() {
    const navigate = useNavigate();
    const [selectedPack, setSelectedPack] = useState('todos');

    // Mapeo visual de stickers combinando con el lore base de personajesSerena
    const stickerPacks = [
        { id: 'todos', name: 'Comunidad Completa' },
        { id: 'clasicos', name: 'Los Clásicos' },
        { id: 'costa', name: 'Borde Costero' },
    ];

    const handleDownloadSticker = (personaje) => {
        alert(`Preparando pack de stickers de ${personaje.nombre} para exportar al Teclado de WhatsApp / Mercado Comunal.`);
    };

    const handleShareSticker = (personaje) => {
        if (navigator.share) {
            navigator.share({
                title: `Sticker VecinoSmart: ${personaje.nombre}`,
                text: `¡Mira a ${personaje.nombre}! El ${personaje.rol} en la app VecinoSmart. ¡Descarga sus stickers!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert(`Compartiendo enlace de ${personaje.nombre}...`);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            color: 'white',
            padding: '2rem',
            fontFamily: "'Segoe UI', Roboto, sans-serif"
        }}>
            {/* Header / Nav */}
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/')} className="btn-glass" style={{ padding: '0.8rem', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronLeft size={24} color="white" />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#10b981' }}>
                            <SmilePlus size={32} /> Pegatinas Vecinales
                        </h1>
                        <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Exporta los avatares a tus Ventas y Chats</span>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.1)', padding: '0.5rem 1rem', borderRadius: '50px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <Smartphone size={20} color="#10b981" />
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>Marketplace y WhatsApp</span>
                </div>
            </header>

            {/* Content Area */}
            <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* Intro Banner */}
                <div className="glass-panel" style={{ background: 'linear-gradient(90deg, rgba(56,189,248,0.1) 0%, rgba(139,92,246,0.1) 100%)', border: '1px solid rgba(139,92,246,0.3)', padding: '2rem', borderRadius: '24px', display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ background: 'rgba(139,92,246,0.2)', padding: '1.5rem', borderRadius: '50%' }}>
                        <Verified size={48} color="#c084fc" />
                    </div>
                    <div>
                        <h2 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.5rem' }}>Colección Oficial de Identidad</h2>
                        <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.1rem' }}>
                            Humaniza tus ventas en el Marketplace Comunal o tus eventos. Al descargar, estas pegatinas se incrustarán en tu teclado. Usa al "Tío Pedro" para promocionar caletas, o a "Fariño" para eventos costeros.
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                    {stickerPacks.map(pack => (
                        <button
                            key={pack.id}
                            onClick={() => setSelectedPack(pack.id)}
                            style={{
                                background: selectedPack === pack.id ? '#10b981' : 'rgba(255,255,255,0.05)',
                                color: selectedPack === pack.id ? '#000' : 'white',
                                border: `1px solid ${selectedPack === pack.id ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                                padding: '0.8rem 1.5rem',
                                borderRadius: '50px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {pack.name}
                        </button>
                    ))}
                </div>

                {/* Grid de Personajes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {personajesSerena.filter(p => [
                        'serenito', 'farino', 'tio_pedro', 'compita', 'milagros', 
                        'alpino', 'tata_rojas', 'flopi', 'egocentrico'
                    ].includes(p.id)).map(personaje => (
                        <div key={personaje.id} className="glass-panel hover-lift" style={{ 
                            background: 'rgba(15, 23, 42, 0.4)', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            borderRadius: '30px', 
                            overflow: 'hidden', 
                            display: 'flex', 
                            flexDirection: 'column',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            
                            {/* Sticker Preview Area (REAL IMAGE) */}
                            <div style={{ 
                                height: '280px', 
                                background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1) 0%, transparent 70%), repeating-conic-gradient(#1e293b 0% 25%, #0f172a 0% 50%) 50% / 30px 30px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                position: 'relative' 
                            }}>
                                <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Hexagon size={16} color="#38bdf8" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#e0f2fe', letterSpacing: '0.5px' }}>{personaje.sector.toUpperCase()}</span>
                                </div>
                                
                                <img 
                                    src={`/avatars/${personaje.id}.png`}
                                    alt={personaje.nombre}
                                    style={{ 
                                        width: '240px', 
                                        height: '240px', 
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))',
                                        transform: 'scale(1.1)'
                                    }}
                                />

                                <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: '#10b981', color: 'black', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '900' }}>3D HQ</div>
                            </div>

                            {/* Info Area */}
                            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <div>
                                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: '900' }}>
                                            {personaje.nombre}
                                            <Verified size={20} color="#38bdf8" fill="#38bdf8" />
                                        </h3>
                                        <p style={{ margin: 0, color: '#10b981', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{personaje.rol}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleShareSticker(personaje)}
                                        style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.6rem', borderRadius: '12px', cursor: 'pointer' }}
                                    >
                                        <Share2 size={20} />
                                    </button>
                                </div>
                                
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', flex: 1, border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', fontStyle: 'italic' }}>
                                        "{personaje.descripcion}"
                                    </p>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <a 
                                        href={`/avatars/${personaje.id}.png`}
                                        download={`Sticker_${personaje.nombre}.png`}
                                        style={{ 
                                            flex: 1, 
                                            padding: '1.2rem', 
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
                                            color: 'white', 
                                            textDecoration: 'none',
                                            borderRadius: '16px', 
                                            fontWeight: '900', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            gap: '0.8rem', 
                                            boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        <Download size={22} /> DESCARGAR PNG
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
