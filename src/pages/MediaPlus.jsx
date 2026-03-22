import React, { useState, useEffect } from 'react';
import { 
    Play, Mic, Music, Radio, Tv, Share2, Smartphone, 
    MessageSquare, Youtube, Instagram, Twitter, Facebook,
    Terminal, Zap, Sparkles, LayoutGrid, LayoutList,
    Maximize, Settings, Filter, Search, PlusCircle,
    Volume2, Video, Globe, Palette, Headphones,
    ExternalLink, Lock, ShieldCheck, Gem
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MEDIA_TOOLS = [
    {
        id: 'broadcast',
        name: 'Broadcast Master Studio',
        desc: 'Producción de Radio y TV Digital en tiempo real con inyección de IA Sentinel.',
        icon: Mic,
        color: '#ef4444',
        category: 'Radio & TV',
        path: '/protocolo',
        component: 'SmartBroadcasterStudio'
    },
    {
        id: 'suno',
        name: 'Soberanía Sonora (Suno AI)',
        desc: 'Generación de himnos y hits vecinales mediante IA. El Labs creativo de VLS.',
        icon: Music,
        color: '#a855f7',
        category: 'Creation',
        event: 'open-music-studio'
    },
    {
        id: 'console',
        name: 'VLS Console Sound',
        desc: 'Mezcladora física virtual para control de señales y efectos de audio.',
        icon: Volume2,
        color: '#eab308',
        category: 'Engineering',
        event: 'open-vls-console'
    },
    {
        id: 'spotify',
        name: 'Spotify VLS Hub',
        desc: 'Consolidación de playlists soberanas y curaduría musical comunitaria.',
        icon: Headphones,
        color: '#1db954',
        category: 'Streaming',
        event: 'open-spotify-vls'
    },
    {
        id: 'tiktok',
        name: 'TikTok VLS Hub',
        desc: 'Gestión de contenidos verticales y viralización de la gestión comunal.',
        icon: Video,
        color: '#ff0050',
        category: 'Social Media',
        event: 'open-tiktok-hub'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp Elite Hub',
        desc: 'Centralización de comunidades y difusión masiva institucional.',
        icon: MessageSquare,
        color: '#25d366',
        category: 'Communications',
        event: 'open-whatsapp-elite'
    },
    {
        id: 'tiktok-manager',
        name: 'TikTok Manager 2.0',
        desc: 'Análisis de tendencias regionales y monitoreo de la cuenta @vecinoslaserena2.',
        icon: Share2,
        color: '#00f2ea',
        category: 'Social Media',
        event: 'open-tiktok-manager'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn Manager VLS',
        desc: 'B2B Outreach y posicionamiento institucional del Directorio en redes profesionales.',
        icon: Globe,
        color: '#0077b5',
        category: 'Social Media',
        event: 'open-linkedin-manager'
    },
    {
        id: 'suno-chart',
        name: 'VLS Suno Chart',
        desc: 'Ranking de los temas más escuchados producidos por los vecinos.',
        icon: Gem,
        color: '#facc15',
        category: 'Streaming',
        event: 'open-suno-chart'
    }
];

export default function MediaPlus() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [layout, setLayout] = useState('grid');

    const categories = ['All', ...new Set(MEDIA_TOOLS.map(t => t.category))];

    const filteredTools = MEDIA_TOOLS.filter(t => {
        const matchesFilter = filter === 'All' || t.category === filter;
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                             t.desc.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleAction = (tool) => {
        if (tool.path) navigate(tool.path);
        if (tool.event) window.dispatchEvent(new CustomEvent(tool.event));
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: '#050b14', 
            color: 'white',
            fontFamily: '"Outfit", sans-serif',
            padding: '2rem',
            paddingTop: 'calc(var(--nav-height) + 2rem)'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* Header Section */}
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ display: 'inline-flex', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '20px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                    >
                        <Zap color="#ef4444" size={32} />
                    </motion.div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px', margin: 0 }}>
                        VLS <span style={{ color: '#ef4444' }}>MEDIA+</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '0.5rem', maxWidth: '700px', marginInline: 'auto' }}>
                        Consolidado Estratégico de Herramientas Creativas y Dispositivos de Comunicación Soberana de La Serena.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="glass-panel" style={{ 
                    padding: '1rem', 
                    borderRadius: '24px', 
                    marginBottom: '2rem', 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '1rem', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                style={{
                                    padding: '0.5rem 1.2rem',
                                    borderRadius: '50px',
                                    border: 'none',
                                    background: filter === cat ? '#ef4444' : 'rgba(255,255,255,0.05)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, maxWidth: '400px' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                            <input 
                                type="text" 
                                placeholder="Buscar herramienta..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 3rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '16px',
                                    color: 'white',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px' }}>
                            <button onClick={() => setLayout('grid')} style={{ padding: '6px', background: layout === 'grid' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                                <LayoutGrid size={18} />
                            </button>
                            <button onClick={() => setLayout('list')} style={{ padding: '6px', background: layout === 'list' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                                <LayoutList size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ 
                    display: layout === 'grid' ? 'grid' : 'flex',
                    flexDirection: layout === 'grid' ? 'unset' : 'column',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <AnimatePresence>
                        {filteredTools.map((tool, idx) => (
                            <motion.div
                                key={tool.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: idx * 0.05 }}
                                className="gaudi-curves"
                                onClick={() => handleAction(tool)}
                                style={{
                                    background: `linear-gradient(135deg, ${tool.color}10 0%, rgba(15, 23, 42, 0.8) 100%)`,
                                    padding: '2rem',
                                    borderRadius: '28px',
                                    border: `1px solid ${tool.color}30`,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: layout === 'grid' ? 'column' : 'row',
                                    alignItems: layout === 'grid' ? 'flex-start' : 'center',
                                    gap: '1.5rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                }}
                                whileHover={{ scale: 1.02, border: `1px solid ${tool.color}80`, boxShadow: `0 20px 40px ${tool.color}15` }}
                            >
                                <div style={{ 
                                    padding: '1rem', 
                                    background: `${tool.color}20`, 
                                    borderRadius: '16px', 
                                    color: tool.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `1px solid ${tool.color}40`,
                                    flexShrink: 0
                                }}>
                                    <tool.icon size={32} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: tool.color, background: `${tool.color}15`, padding: '2px 8px', borderRadius: '50px', textTransform: 'uppercase' }}>{tool.category}</span>
                                        {tool.id === 'broadcast' && <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#fff', background: '#ef4444', padding: '2px 8px', borderRadius: '50px' }}>LIVE</span>}
                                    </div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', fontWeight: 'bold' }}>{tool.name}</h3>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>{tool.desc}</p>
                                </div>
                                <div style={{ 
                                    opacity: 0.5,
                                    position: layout === 'grid' ? 'static' : 'absolute',
                                    right: '2rem'
                                }}>
                                    <PlusCircle size={24} />
                                </div>
                                
                                {/* Background Decorative Icon */}
                                <tool.icon size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.03, pointerEvents: 'none' }} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Security Note */}
                <div style={{ marginTop: '5rem', padding: '3rem', borderRadius: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <ShieldCheck size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem' }}>SEGURIDAD NIVEL ALPHA</h2>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
                        El acceso a Media+ está reservado para el Directorio Institucional de Vecinos La Serena. 
                        Todas las sesiones son monitoreadas por el Protocolo Sentinel para asegurar la Soberanía Comunicacional de la Comuna.
                    </p>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>UPTIME SISTEMA</span>
                            <strong style={{ color: '#10b981' }}>99.99%</strong>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>CIFRADO</span>
                            <strong style={{ color: '#38bdf8' }}>AES-256</strong>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b' }}>IA AUDIT</span>
                            <strong style={{ color: '#facc15' }}>ACTIVO</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .gaudi-curves { border-radius: 40px 15px 50px 20px / 20px 40px 15px 50px; }
                .glass-panel { background: rgba(10, 17, 40, 0.85); backdrop-filter: blur(10px); }
            `}</style>
        </div>
    );
}
