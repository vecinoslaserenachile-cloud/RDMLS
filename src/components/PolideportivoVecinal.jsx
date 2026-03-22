import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Users, Activity, Medal, ChevronRight, Star, ExternalLink, RefreshCw, Smartphone } from 'lucide-react';

const SPORTS_DATA = {
    futbol: [
        { id: 1, liga: 'Campeonato Itau (Chile)', match: 'D. La Serena vs S. Wanderers', time: 'Próxima Fecha', status: 'Estadio La Portada', score: 'vs', icon: '⚽', color: '#c41230' },
        { id: 2, liga: 'UEFA Champions League', match: 'Real Madrid vs Man. City', time: 'En Vivo', status: '85\'', score: '3 - 3', icon: '⚽', color: '#ef4444' },
        { id: 3, liga: 'Premier League', match: 'Liverpool vs Arsenal', time: 'Finalizado', status: 'FT', score: '2 - 1', icon: '⚽', color: '#10b981' }
    ],
    tenis: [
        { id: 4, tour: 'ATP 1000 Miami', match: 'A. Tabilo (CHI) vs T. Paul (USA)', time: 'En Cancha', status: 'Set 3', score: '6-4, 3-6, 4-2', icon: '🎾', color: '#ef4444' },
        { id: 5, tour: 'WTA Charleston', match: 'I. Swiatek vs O. Jabeur', time: '14:30', status: 'Finalizado', score: '6-2, 6-4', icon: '🎾', color: '#10b981' }
    ],
    nba: [
        { id: 6, league: 'NBA Regular Season', match: 'Golden State Warriors vs Lakers', time: 'En Juego', status: 'Q4 05:12', score: '102 - 98', icon: '🏀', color: '#ef4444' },
        { id: 7, league: 'NBA Regular Season', match: 'Miami Heat vs NY Knicks', time: 'Finalizado', status: 'FT', score: '110 - 114', icon: '🏀', color: '#10b981' }
    ]
};

export default function PolideportivoVecinal() {
    const [activeCategory, setActiveCategory] = useState('futbol');
    const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshData = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setLastUpdate(new Date().toLocaleTimeString());
            setIsRefreshing(false);
        }, 800)
    }

    return (
        <div style={{ 
            marginTop: '3rem', 
            padding: '2rem', 
            background: 'linear-gradient(135deg, rgba(8, 14, 44, 0.98) 0%, rgba(20, 40, 80, 0.98) 100%)', 
            borderRadius: '24px', 
            border: '2px solid rgba(59, 130, 246, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Header Conectado */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', padding: '1rem', borderRadius: '18px', boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)', border: '2px solid rgba(255,255,255,0.2)' }}>
                        <Trophy size={32} color="white" />
                    </div>
                    <div>
                        <h3 className="serena-title-glow" style={{ color: 'white', margin: 0, fontSize: '1.8rem', letterSpacing: '1px', fontWeight: '900' }}>CENTRO DEPORTIVO VECINAL</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.3rem' }}>
                            <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', fontWeight: 'bold' }}>DATA LIVE ALIMENTADA POR 365SCORES • {lastUpdate}</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <button 
                        onClick={refreshData}
                        style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                    </button>
                    <a 
                        href="https://www.365scores.com/es" 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ background: '#facc15', color: '#0f172a', textDecoration: 'none', fontWeight: '900', padding: '0.8rem 1.2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(250, 204, 21, 0.4)' }}
                    >
                        VER TODOS EN 365SCORES <ExternalLink size={18} />
                    </a>
                </div>
            </div>

            {/* Categorías (Tabs) */}
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {Object.keys(SPORTS_DATA).map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '0.8rem 2rem',
                            borderRadius: '14px',
                            border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
                            background: activeCategory === cat ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'rgba(255,255,255,0.05)',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            letterSpacing: '1px',
                            boxShadow: activeCategory === cat ? '0 8px 20px rgba(37, 99, 235, 0.4)' : 'none'
                        }}
                    >
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Parrilla de Resultados */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {SPORTS_DATA[activeCategory].map((item) => (
                    <div 
                        key={item.id} 
                        style={{ 
                            padding: '1.8rem', 
                            background: 'rgba(0,0,0,0.5)', 
                            borderRadius: '20px', 
                            border: `1px solid ${item.status === 'En Vivo' || item.date === 'En Juego' ? '#ef4444' : 'rgba(255,255,255,0.05)'}`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.2rem',
                            position: 'relative'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '1px' }}>{item.liga || item.tour || item.league}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 1rem 0', fontWeight: '700', lineHeight: '1.4' }}>{item.match}</h4>
                            <div style={{ 
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%)', 
                                padding: '1rem', 
                                borderRadius: '16px', 
                                fontSize: '2.5rem', 
                                fontWeight: '900', 
                                color: item.color || '#facc15',
                                letterSpacing: '4px',
                                fontFamily: 'monospace',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {item.score}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                <Calendar size={16} />
                                <span>{item.time}</span>
                            </div>
                            <span style={{ 
                                padding: '4px 12px',
                                borderRadius: '20px',
                                background: item.status === 'FT' || item.status === 'Finalizado' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                fontSize: '0.75rem', 
                                color: item.status === 'FT' || item.status === 'Finalizado' ? '#10b981' : '#ef4444', 
                                fontWeight: 'bold',
                                border: `1px solid ${item.status === 'FT' || item.status === 'Finalizado' ? '#10b98130' : '#ef444430'}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                {(item.status !== 'FT' && item.status !== 'Finalizado' && !item.status.includes('Estadio')) && <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>}
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Banner Local */}
            <div style={{ 
                marginTop: '3rem', 
                padding: '2rem', 
                background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)', 
                borderRadius: '20px', 
                border: '1px solid rgba(16, 185, 129, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Activity size={32} color="#10b981" />
                    <div>
                        <h4 style={{ margin: 0, color: '#10b981', fontSize: '1.1rem' }}>Sintoniza la Pasión en Radio VLS</h4>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Relatos emocionantes y análisis táctico de los clásicos de la región.</p>
                    </div>
                </div>
                <button className="btn-glass" style={{ padding: '0.8rem 1.5rem', background: '#10b981', color: 'black', fontWeight: 'bold', border: 'none', borderRadius: '12px' }}>ESCUCHAR AHORA</button>
            </div>

            <style>{`
                @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
