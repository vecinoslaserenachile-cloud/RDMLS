import React, { useState, useEffect } from 'react';
import { X, Globe, MapPin, ExternalLink, Clock, Newspaper, RefreshCcw, Maximize2, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SmartWorldNews({ onClose }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeNews, setActiveNews] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    // Simulated news markers from different parts of the world and local
    const newsData = [
        {
            id: 'n1',
            type: 'local',
            name: 'Diario El Día',
            headline: 'Más de cien detenidos tras megaoperativo policial en la Región',
            location: { top: '78%', left: '28%' }, // Approximate for Chile in Gall-Peters
            country: 'Chile (Coquimbo)',
            color: '#38bdf8'
        },
        {
            id: 'n2',
            type: 'local',
            name: 'Diario La Región',
            headline: 'Siete detenidos en Coquimbo tras intenso operativo policial',
            location: { top: '79%', left: '29%' },
            country: 'Chile (Coquimbo)',
            color: '#10b981'
        },
        {
            id: 'n3',
            type: 'national',
            name: 'El Mercurio',
            headline: 'Dólar repunta con fuerza y sube alrededor de $18',
            location: { top: '82%', left: '30%' }, // Santiago
            country: 'Chile',
            color: '#f59e0b'
        },
        {
            id: 'n4',
            type: 'international',
            name: 'The New York Times',
            headline: 'Global Markets Rally Amid Positive Economic Data',
            location: { top: '35%', left: '22%' }, // NYC
            country: 'EE.UU.',
            color: '#ef4444'
        },
        {
            id: 'n5',
            type: 'international',
            name: 'Le Monde',
            headline: 'Les avancées sur l\'accord climatique européen',
            location: { top: '30%', left: '48%' }, // Paris
            country: 'Francia',
            color: '#a855f7'
        },
        {
            id: 'n6',
            type: 'international',
            name: 'The Guardian',
            headline: 'Tech giants face new regulations in the UK',
            location: { top: '25%', left: '46%' }, // London
            country: 'Reino Unido',
            color: '#f97316'
        },
        {
            id: 'n7',
            type: 'international',
            name: 'Xinhua',
            headline: 'New technological breakthrough announced in Beijing',
            location: { top: '38%', left: '80%' }, // Beijing
            country: 'China',
            color: '#eab308'
        }
    ];

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: '#020617',
            zIndex: 150000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Header */}
            <header style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem 3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                        padding: '1rem',
                        borderRadius: '12px',
                        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                    }}>
                        <Globe size={38} color="white" />
                    </div>
                    <div>
                        <h2 style={{
                            margin: 0,
                            color: 'white',
                            fontSize: '2.4rem',
                            fontWeight: '900',
                            letterSpacing: '-1px'
                        }}>FEED NEWS VLS</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>MAPA GLOBAL DE PROPORCIÓN REAL (EQUAL EARTH)</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        color: 'white',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Clock size={14} color="#38bdf8" />
                        Próxima síncro: {60 - currentTime.getMinutes()} min
                    </div>
                    <button 
                        onClick={handleRefresh}
                        style={{
                            background: '#1e293b',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <RefreshCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                    </button>
                    <button 
                        onClick={onClose} 
                        style={{ background: '#ef4444', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <X size={20} />
                    </button>
                </div>
            </header>

            {/* Map Area */}
            <div style={{ flex: 1, position: 'relative', background: '#09152b', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
                    <div style={{ background: 'rgba(15,23,42,0.8)', padding: '0.5rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        <Radio size={14} color="#10b981" /> ALERTA MUNDIAL: Monitoreando {newsData.length} nodos en tiempo real
                    </div>
                </div>

                {/* Map Container - using an Equal Earth projection map from Wikimedia */}
                <div style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/e8/Equal_Earth_projection_SW.jpg")',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    filter: 'contrast(1.2) sepia(0.2) hue-rotate(180deg) brightness(0.6) saturate(1.5)',
                    opacity: 0.8
                }}>
                    
                    {/* Grid Overlay for aesthetic */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '4% 4%',
                        pointerEvents: 'none'
                    }}></div>

                    {/* News Markers */}
                    {newsData.map(node => (
                        <div 
                            key={node.id}
                            onMouseEnter={() => setActiveNews(node)}
                            onMouseLeave={() => setActiveNews(null)}
                            style={{
                                position: 'absolute',
                                top: node.location.top,
                                left: node.location.left,
                                transform: 'translate(-50%, -50%)',
                                cursor: 'pointer',
                                zIndex: activeNews?.id === node.id ? 100 : 10
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        position: 'absolute',
                                        inset: -10,
                                        background: node.color,
                                        borderRadius: '50%',
                                        zIndex: 1
                                    }}
                                />
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    background: node.color,
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    position: 'relative',
                                    zIndex: 2,
                                    boxShadow: `0 0 10px ${node.color}`
                                }}></div>
                            </div>
                            
                            {/* Persistent Label */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'rgba(0,0,0,0.6)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                color: 'white',
                                fontSize: '0.6rem',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                opacity: activeNews?.id === node.id ? 0 : 1
                            }}>{node.name}</div>
                            
                            {/* Hover Card */}
                            <AnimatePresence>
                                {activeNews?.id === node.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        style={{
                                            position: 'absolute',
                                            bottom: '25px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '240px',
                                            background: 'rgba(15, 23, 42, 0.95)',
                                            border: `1px solid ${node.color}`,
                                            borderRadius: '8px',
                                            padding: '1rem',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                            backdropFilter: 'blur(10px)',
                                            zIndex: 200,
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: node.color, textTransform: 'uppercase' }}>
                                                {node.country}
                                            </span>
                                            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{currentTime.toLocaleTimeString()}</span>
                                        </div>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '0.9rem', lineHeight: '1.2' }}>{node.headline}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Newspaper size={12} color="#94a3b8" />
                                            <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Fuente: {node.name}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                background: '#0f172a',
                padding: '1rem 3rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                    Visualización cartográfica basada en proyección de <strong style={{color: 'white'}}>Proporciones Reales</strong> (Equal Earth), mostrando el mundo como verdaderamente es sin distorsión polar.
                </div>
                <button
                    style={{
                        background: 'transparent',
                        border: '1px solid #10b981',
                        color: '#10b981',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    LEER EDICIONES COMPLETAS VLS
                </button>
            </div>
        </div>
    );
}
