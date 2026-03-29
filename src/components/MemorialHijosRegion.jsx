import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Heart, Star, BookOpen, Music, Medal, MapPin, 
    Search, ArrowRight, Share2, Calendar, Award, 
    Castle, Shield, Sparkles, AlertTriangle, RefreshCw, Skull, Plus 
} from 'lucide-react';
import MasterDanielPalominos3D from './MasterDanielPalominos3D';
import HolographicFigure from './HolographicFigure';

const ImageFallback = ({ src, alt, style, className }) => {
    const [status, setStatus] = React.useState('loading');
    return (
        <div style={{ position: 'relative', width: style.width || '100%', height: style.height || '100%', flexShrink: 0, borderRadius: style.borderRadius, overflow: 'hidden', background: '#020617' }}>
            {status === 'loading' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(0,0,0,0.8)' }}>
                    <div className="pulse-fast" style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#ec4899', animation: 'spin 1s linear infinite' }}></div>
                    <span style={{ color: '#ec4899', fontSize: '0.55rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>Sincronizando IA...</span>
                </div>
            )}
            {status === 'error' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
                    <Skull size={20} color="#64748b" />
                    <span style={{ color: '#64748b', fontSize: '0.6rem', fontWeight: 'bold', marginTop: '5px' }}>OFFLINE</span>
                </div>
            )}
            <img 
                src={src} 
                alt={alt} 
                className={className} 
                style={{ ...style, opacity: status === 'success' ? (style.opacity || 1) : 0, transition: 'opacity 0.6s ease-in-out' }} 
                onLoad={() => setStatus('success')} 
                onError={(e) => {
                    setStatus('error');
                    e.target.src = '/vls-logo-3d.png';
                }} 
            />
        </div>
    );
};

export default function MemorialHijosRegion({ onClose }) {
    const [selectedFigure, setSelectedFigure] = useState(null);
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [is3DOpen, setIs3DOpen] = useState(false);
    const [flowers, setFlowers] = useState(() => {
        const saved = localStorage.getItem('vls_memorial_flowers');
        return saved ? JSON.parse(saved) : {};
    });
    const [animatedFlowers, setAnimatedFlowers] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const figuras = [
        {
            id: 'mistral',
            name: 'Gabriela Mistral',
            pseudonym: 'Lucila Godoy Alcayaga',
            title: 'Premio Nobel de Literatura',
            birth: '7 de abril de 1889, Vicuña',
            death: '10 de enero de 1957',
            legacy: 'Poetisa, diplomática y pedagoga. Primera mujer iberoamericana en recibir el Nobel de Literatura.',
            image: '/memorial-mistral.png',
            category: 'Letras',
            location: 'Vicuña / La Serena',
            icon: BookOpen,
            color: '#7c3aed'
        },
        {
            id: 'videla',
            name: 'Gabriel González Videla',
            title: 'Presidente de Chile (1946-1952)',
            birth: '23 de noviembre de 1898, La Serena',
            death: '22 de agosto de 1980',
            legacy: 'Impulsor del "Plan Serena", transformó la arquitectura de la ciudad al estilo neo-colonial. Estableció la presencia de Chile en la Antártida.',
            image: '/memorial-videla.png',
            category: 'Política / Historia',
            location: 'La Serena',
            icon: Star,
            color: '#2563eb'
        },
        {
            id: 'sulantay',
            name: 'José Sulantay',
            title: 'Arquitecto de la "Generación Dorada"',
            birth: '3 de abril de 1940, Coquimbo',
            death: '20 de julio de 2023',
            legacy: 'Legendario DT de Coquimbo Unido y creador de la base del éxito del fútbol chileno moderno. Un maestro de disciplina y visión.',
            image: '/memorial-sulantay.png',
            category: 'Deportes',
            location: 'Coquimbo',
            icon: Medal,
            color: '#ca8a04'
        },
        {
            id: 'pena',
            name: 'Jorge Peña Hen',
            title: 'Director y Compositor',
            birth: '16 de enero de 1928',
            death: '16 de octubre de 1973',
            legacy: 'Fundador de la primera Orquesta Sinfónica Infantil en Latinoamérica. Su legado vive en cada niño que toma un instrumento en la región.',
            image: '/memorial-pena.png',
            category: 'Música',
            location: 'La Serena',
            icon: Music,
            color: '#db2777'
        },
        {
            id: 'vdsilva',
            name: 'Víctor Domingo Silva',
            title: 'El Poeta de la Bandera',
            birth: '12 de mayo de 1882, Tongoy',
            death: '20 de agosto de 1960',
            legacy: 'Poeta, diplomático y dramaturgo chileno. Premio Nacional de Literatura y de Teatro. Autor de "Al pie de la bandera".',
            image: '/memorial_victor_domingo_silva_1774821509621.png',
            category: 'Letras',
            location: 'Tongoy / La Serena',
            icon: BookOpen,
            color: '#10b981'
        },
        {
            id: 'bohon',
            name: 'Juan Bohón',
            title: 'Fundador de La Serena',
            birth: 'Siglo XVI, Países Bajos',
            death: '1548, Chile',
            legacy: 'Capitán español que fundó la ciudad de San Bartolomé de La Serena en 1544 por orden de Pedro de Valdivia.',
            image: '/memorial_juan_bohon_1774821523329.png',
            category: 'Historia',
            location: 'La Serena',
            icon: Castle,
            color: '#f59e0b'
        },
        {
            id: 'ppmunoz',
            name: 'Pedro Pablo Muñoz',
            title: 'Revolucionario Constituyente',
            birth: '1828, La Serena',
            death: '1882, La Serena',
            legacy: 'Líder de la Revolución de 1851 y 1859. Defensor de la descentralización y la soberanía de las regiones del norte.',
            image: '/memorial_pedro_pablo_muñoz_1774821539283.png',
            category: 'Política',
            location: 'La Serena',
            icon: Shield,
            color: '#ef4444'
        },
        {
            id: 'palominos',
            name: 'Maestro Daniel Palominos',
            title: 'Artista Ceramista y Defensor DD.HH.',
            birth: '1953',
            death: '5 de junio de 2024',
            legacy: 'Eximio ceramista de la ULS, profesor y ex concejal. Defensor infatigable de los Derechos Humanos. Su arte en arcilla es un testimonio eterno de la memoria y la cultura regional.',
            image: '/homenaje/palominos_mural_humanity_1773806652665.png',
            category: 'Arte / Social',
            location: 'La Serena / Región de Coquimbo',
            icon: Award,
            color: '#92400e',
            has3D: true
        }
    ];

    const filteredFiguras = figuras.filter(f => {
        const matchesFilter = filter === 'Todos' || f.category === filter;
        const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             f.legacy.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleLeaveFlower = (id) => {
        const newCount = (flowers[id] || 0) + 1;
        const updated = { ...flowers, [id]: newCount };
        setFlowers(updated);
        localStorage.setItem('vls_memorial_flowers', JSON.stringify(updated));

        const newAnim = {
            idx: Date.now(),
            left: Math.random() * 80 + 10 + '%',
            delay: Math.random() * 0.5
        };
        setAnimatedFlowers(prev => [...prev, newAnim]);
        setTimeout(() => {
            setAnimatedFlowers(prev => prev.filter(f => f.idx !== newAnim.idx));
        }, 3000);
    };

    const handleShareFigure = (figura) => {
        const shareData = {
            title: `Homenaje: ${figura.name} - ComunaSmart`,
            text: `VLS rinde tributo a ${figura.name}. ${figura.legacy.substring(0, 120)}... Conoce su historia en:`,
            url: window.location.href,
            image: window.location.origin + figura.image 
        };
        window.dispatchEvent(new CustomEvent('open-smart-share', { detail: shareData }));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* HEADER INSTITUCIONAL */}
            <div style={{ padding: '1.5rem 2rem', background: '#0f172a', borderBottom: '2px solid #ec4899', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#ec4899', padding: '10px', borderRadius: '15px', boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}>
                        <Heart size={28} color="white" fill="white" />
                    </div>
                    <div>
                        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 950, letterSpacing: '2px' }}>ALTARES DE LA REGIÓN</h1>
                        <p style={{ color: '#ec4899', margin: 0, fontSize: '0.7rem', fontWeight: 'bold' }}>PORTAL DE LA MEMORIA COQUIMBO</p>
                    </div>
                </div>

                <div style={{ flex: 1, maxWidth: '500px', margin: '0 2rem', position: 'relative' }} className="hide-on-mobile">
                    <Search size={18} color="#ec4899" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o biografía..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(236,72,153,0.3)', color: 'white', outline: 'none' }}
                        aria-label="Buscar homenajeado"
                    />
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '12px', borderRadius: '50%', cursor: 'pointer' }} aria-label="Cerrar portal">
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '3rem 2rem', background: 'radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)' }}>
                
                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {['Todos', 'Letras', 'Política / Historia', 'Deportes', 'Música', 'Arte / Social', 'Historia'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.6rem 1.2rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)',
                                backgroundColor: filter === cat ? '#ec4899' : 'rgba(255,255,255,0.05)',
                                color: 'white', cursor: 'pointer', fontWeight: '900', fontSize: '0.7rem', transition: '0.3s'
                            }}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                {filteredFiguras.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <Skull size={80} color="#64748b" style={{ opacity: 0.3 }} />
                        <h3 style={{ color: '#64748b', marginTop: '1.5rem' }}>No se encontraron registros para "{searchTerm}"</h3>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem', maxWidth: '1400px', margin: '0 auto' }}>
                        {filteredFiguras.map((figura) => (
                            <motion.div 
                                key={figura.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="memorial-card"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(30,27,75,0.8) 0%, rgba(15,23,42,0.9) 100%)',
                                    borderRadius: '30px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative'
                                }}
                            >
                                <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                                    <ImageFallback 
                                        src={figura.image} 
                                        alt={figura.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} 
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, transparent 100%)' }} />
                                    
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                                        <button onClick={(e) => { e.stopPropagation(); handleShareFigure(figura); }} className="btn-tribute" title="Compartir Recuerdo"><Share2 size={18} /></button>
                                    </div>

                                    <div style={{ position: 'absolute', bottom: '20px', left: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '8px', height: '8px', background: figura.color, borderRadius: '50%', boxShadow: `0 0 10px ${figura.color}` }} />
                                        <span style={{ color: figura.color, fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1px' }}>{figura.category.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.6rem', fontWeight: 950 }}>{figura.name.toUpperCase()}</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem' }}>{figura.title}</p>
                                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem 0', height: '80px', overflow: 'hidden' }}>
                                        {figura.legacy}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <motion.button 
                                                whileTap={{ scale: 0.8 }}
                                                onClick={() => handleLeaveFlower(figura.id)}
                                                style={{ background: 'rgba(236,72,153,0.15)', border: 'none', color: '#ec4899', padding: '10px 15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                <Heart size={16} fill={flowers[figura.id] > 0 ? '#ec4899' : 'none'} />
                                                DEJAR FLOR
                                            </motion.button>
                                            <span style={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>{flowers[figura.id] || 0}</span>
                                        </div>
                                        <button 
                                            onClick={() => figura.has3D ? setIs3DOpen(true) : setSelectedFigure(figura)}
                                            style={{ background: 'transparent', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', padding: '10px 15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer' }}
                                        >
                                            {figura.has3D ? 'HOMENAJE 3D' : 'VER DETALLE'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* BARRA INFERIOR */}
            <div style={{ padding: '1rem 2rem', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold' }}>
                    © 2026 ARCHIVO DE LA MEMORIA PROVINCIA DE ELQUI — VLS SOBERANO
                </span>
                <button className="btn-vls-action-light" style={{ background: '#ec4899', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={16} /> SUBIR RECUERDO
                </button>
            </div>

            {/* Modal Detalle (Holograma) */}
            <AnimatePresence>
                {selectedFigure && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 100010, background: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
                    >
                        <div style={{ maxWidth: '900px', width: '100%', background: '#0f172a', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', height: '600px' }}>
                            <div style={{ flex: 1, background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <HolographicFigure image={selectedFigure.image} name={selectedFigure.name} color={selectedFigure.color} />
                            </div>
                            <div style={{ flex: 1.2, padding: '3rem', overflowY: 'auto', position: 'relative' }}>
                                <button onClick={() => setSelectedFigure(null)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={24} /></button>
                                <h4 style={{ color: selectedFigure.color, fontWeight: 900, fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1rem' }}>{selectedFigure.category.toUpperCase()}</h4>
                                <h2 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.5rem' }}>{selectedFigure.name}</h2>
                                <p style={{ color: '#94a3b8', fontStyle: 'italic', marginBottom: '2rem' }}>{selectedFigure.title}</p>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{selectedFigure.legacy}</p>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>NACIMIENTO</p><p style={{ color: 'white', fontWeight: 'bold' }}>{selectedFigure.birth}</p></div>
                                        <div><p style={{ color: '#64748b', fontSize: '0.7rem', margin: 0 }}>FALLECIMIENTO</p><p style={{ color: 'white', fontWeight: 'bold' }}>{selectedFigure.death}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Component */}
            {is3DOpen && (
                <MasterDanielPalominos3D 
                    onClose={() => setIs3DOpen(false)} 
                    muralImages={[
                        '/homenaje/palominos_mural_humanity_1773806652665.png',
                        'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/mural_palominos_2.jpg',
                        'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/mural_palominos_3.jpg',
                        'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/mural_palominos_4.jpg'
                    ]}
                />
            )}

            {/* Flower Animations Layer */}
            {animatedFlowers.map(f => (
                <div key={f.idx} style={{ position: 'fixed', bottom: '-100px', left: f.left, zIndex: 200000, pointerEvents: 'none', animation: `floatFlower 3s ease-out forwards`, animationDelay: `${f.delay}s` }}>
                    <ImageFallback src="/ananuca_flower_3d_icon_1773625751027.png" alt="Flower" style={{ height: '60px', width: '60px' }} />
                </div>
            ))}

            <style>{`
                .memorial-card:hover { transform: translateY(-10px); transition: 0.4s; border-color: #ec4899; }
                .btn-tribute { background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
                .btn-tribute:hover { background: #ec4899; transform: scale(1.1); }
                @keyframes floatFlower { 0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; } 20% { opacity: 1; transform: translateY(-20vh) rotate(10deg) scale(1.2); } 100% { transform: translateY(-110vh) rotate(-20deg) scale(1); opacity: 0; } }
                @keyframes spin { to { transform: rotate(360deg); } }
                @media (max-width: 768px) { .hide-on-mobile { display: none; } }
            `}</style>
        </div>
    );
}
