import React, { useState, useRef } from 'react';
import { Image, Download, Smartphone, LayoutGrid, Plus, Trash2, CheckCircle2, Share2, Palette, X, Sparkles, Upload } from 'lucide-react';

export default function StickerManager() {
    const [collections, setCollections] = useState([
        { 
            id: 1, 
            name: 'Serenito & Vecinos (WhatsApp)', 
            stickers: [
                { id: 101, url: '/avatars/serenito.png', label: 'Hola Vecino' },
                { id: 102, url: '/avatars/farino.png', label: 'Todo Ok' },
                { id: 103, url: '/avatars/compita.png', label: 'Música Maestro' }
            ],
            downloads: 1240
        },
        { 
            id: 2, 
            name: 'Patrimonio de La Serena', 
            stickers: [
                { id: 201, url: '/avatars/alpino.png', label: 'Hito Histórico' },
                { id: 202, url: '/avatars/kevin_costanera.png', label: 'Bahía Limpia' }
            ],
            downloads: 850
        }
    ]);

    const [activeColl, setActiveColl] = useState(collections[0]);
    const [isAdding, setIsAdding] = useState(false);
    const fileInputRef = useRef(null);

    const handleAddSticker = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const newSticker = {
                id: Date.now(),
                url: event.target.result,
                label: 'Nuevo Sticker'
            };

            const updatedCollections = collections.map(coll => 
                coll.id === activeColl.id 
                ? { ...coll, stickers: [...coll.stickers, newSticker] }
                : coll
            );

            setCollections(updatedCollections);
            setActiveColl(updatedCollections.find(c => c.id === activeColl.id));
        };
        reader.readAsDataURL(file);
    };

    const removeSticker = (id) => {
        const updatedCollections = collections.map(coll => 
            coll.id === activeColl.id 
            ? { ...coll, stickers: coll.stickers.filter(s => s.id !== id) }
            : coll
        );
        setCollections(updatedCollections);
        setActiveColl(updatedCollections.find(c => c.id === activeColl.id));
    };

    const createNewCollection = () => {
        const name = prompt("Nombre de la nueva colección:");
        if (!name) return;
        const newColl = {
            id: Date.now(),
            name: name,
            stickers: [],
            downloads: 0
        };
        setCollections([...collections, newColl]);
        setActiveColl(newColl);
    };

    return (
        <div className="sticker-manager animate-fade-in" style={{ display: 'grid', gridTemplateColumns: window.innerWidth > 900 ? 'minmax(300px, 1fr) 2.5fr' : '1fr', gap: '2rem' }}>
            
            {/* Listado de Colecciones */}
            <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.6)' }}>
                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '900' }}>
                    <LayoutGrid size={22} color="#00e5ff" /> TUS STICKERS
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {collections.map(coll => (
                        <div 
                            key={coll.id}
                            onClick={() => setActiveColl(coll)}
                            style={{ 
                                background: activeColl?.id === coll.id ? 'rgba(0, 229, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                                border: activeColl?.id === coll.id ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.05)',
                                padding: '1rem',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {activeColl?.id === coll.id && (
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#00e5ff' }}></div>
                            )}
                            <h4 style={{ color: 'white', margin: '0 0 0.4rem 0', fontSize: '1rem', fontWeight: 'bold' }}>{coll.name}</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                                <span>{coll.stickers.length} Stickers</span>
                                <span>{coll.downloads} Descargas</span>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        onClick={createNewCollection}
                        className="btn-glass" 
                        style={{ width: '100%', marginTop: '1rem', border: '2px dashed rgba(0,229,255,0.3)', padding: '1rem', justifyContent: 'center', background: 'rgba(0,229,255,0.03)', color: '#00e5ff' }}
                    >
                        <Plus size={18} /> Nueva Colección
                    </button>
                </div>
            </div>

            {/* Espacio de Edición / Vista Previa */}
            <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid rgba(0,229,255,0.3)', minHeight: '600px', display: 'flex', flexDirection: 'column', background: 'rgba(5, 10, 20, 0.8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: '900', letterSpacing: '-1px' }}>{activeColl?.name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.5rem' }}>
                            <span style={{ color: '#00e5ff', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,229,255,0.1)', padding: '2px 10px', borderRadius: '4px' }}>VLS STICKER ENGINE v2.0</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn-primary" style={{ background: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold' }}>
                            <Smartphone size={20} /> Exportar a WhatsApp
                        </button>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '2rem' }}>
                    {activeColl?.stickers.map(sticker => (
                        <div key={sticker.id} className="sticker-container" style={{ 
                            padding: '1.2rem', 
                            textAlign: 'center', 
                            background: 'rgba(255,255,255,0.03)', 
                            border: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative',
                            borderRadius: '20px',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        >
                            {/* Sticker Effect Overlay (Simulated) */}
                            <div className="sticker-effect" style={{ 
                                position: 'relative', 
                                padding: '10px',
                                filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))'
                            }}>
                                <img src={sticker.url} alt={sticker.label} style={{ 
                                    width: '100%', 
                                    aspectRatio: '1/1', 
                                    objectFit: 'contain',
                                    filter: 'contrast(1.1) saturate(1.2)',
                                    borderRadius: '10px',
                                    border: '4px solid white', // El clásico borde blanco del sticker
                                    background: 'white'
                                }} />
                            </div>

                            <input 
                                style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: 'white', 
                                    fontSize: '0.85rem', 
                                    fontWeight: 'bold', 
                                    textAlign: 'center', 
                                    marginTop: '1rem', 
                                    width: '100%',
                                    outline: 'none'
                                }}
                                value={sticker.label}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setCollections(prev => prev.map(c => c.id === activeColl.id ? { ...c, stickers: c.stickers.map(s => s.id === sticker.id ? { ...s, label: val } : s) } : c));
                                    setActiveColl(prev => ({ ...prev, stickers: prev.stickers.map(s => s.id === sticker.id ? { ...s, label: val } : s) }));
                                }}
                            />
                            
                            <div className="sticker-actions" style={{ position: 'absolute', top: '-10px', right: '-10px', display: 'flex', gap: '5px', opacity: 0, transition: 'opacity 0.3s' }}>
                                <button onClick={() => removeSticker(sticker.id)} style={{ background: '#ef4444', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(239, 68, 68, 0.4)' }}>
                                    <Trash2 size={14} color="white" />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {/* Botón Añadir Real */}
                    <div 
                        onClick={() => fileInputRef.current.click()}
                        style={{ 
                            border: '3px dashed rgba(0,229,255,0.3)', 
                            borderRadius: '24px', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: '#00e5ff',
                            padding: '2rem',
                            cursor: 'pointer',
                            background: 'rgba(0,229,255,0.05)',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.1)'; e.currentTarget.style.borderColor = '#00e5ff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; }}
                    >
                        <Plus size={40} />
                        <span style={{ fontSize: '0.9rem', fontWeight: '900', marginTop: '1rem', textTransform: 'uppercase' }}>Subir Imagen</span>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleAddSticker} />
                    </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '10px' }}>
                            <CheckCircle2 size={24} color="#10b981" />
                        </div>
                        <div>
                            <div style={{ color: 'white', fontWeight: 'bold' }}>Optimización Inteligente</div>
                            Auto-conversión a .webp transparente con borde de seguridad.
                        </div>
                    </div>
                    <button className="btn-glass" style={{ color: '#00e5ff', display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.8rem 1.5rem', borderRadius: '12px' }}>
                        <Share2 size={20} /> Generar Link Público
                    </button>
                </div>
            </div>

            <style>{`
                .sticker-container:hover { transform: scale(1.05) rotate(2deg); background: rgba(255,255,255,0.07) !important; z-index: 10; }
                .sticker-container:hover .sticker-actions { opacity: 1; }
                .animate-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
