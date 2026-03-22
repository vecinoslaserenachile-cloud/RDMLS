import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchGameEntities } from '../services/base44Service';

// IMPORTANTE: Cambia 'Scores' o 'Users' por el nombre real de tu Entidad en Base44
// Puedes verlo en: https://app.base44.com/apps/69c03ca5b06c1989ecbe308a/editor/workspace/overview
const GAME_ENTITY_NAME = 'Scores'; 

export default function SmartGamification() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadGameData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Llamamos al servicio que conecta con Base44
            const data = await fetchGameEntities(GAME_ENTITY_NAME);
            
            // Suponiendo que Base44 devuelve un arreglo de registros. 
            // Si devuelve { data: [...] }, ajustar a "data.data"
            const records = Array.isArray(data) ? data : (data.records || data.items || []);
            
            // Ordenamos por puntaje de mayor a menor (ajusta 'score' si tu columna se llama diferente)
            const sorted = records.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 5);
            
            setPlayers(sorted.length > 0 ? sorted : getMockData()); // Usamos mock si está vacío o falla la conexión
        } catch (err) {
            console.error("No se pudo cargar la data del juego:", err);
            setError(err.message);
            setPlayers(getMockData()); // Fallback visual
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGameData();
        // Recarga automática cada 30 segundos para ver cambios en vivo
        const interval = setInterval(loadGameData, 30000);
        return () => clearInterval(interval);
    }, []);

    const getMockData = () => [
        { id: 1, name: 'Vecino Proactivo', score: 2500, avatar: '👤' },
        { id: 2, name: 'Comité El Milagro', score: 1840, avatar: '👤' },
        { id: 3, name: 'Junta Vecinal #3', score: 1200, avatar: '👤' }
    ];

    return (
        <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'rgba(245,158,11,0.2)', padding: '10px', borderRadius: '12px' }}>
                        <Trophy size={20} color="#f59e0b" />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', color: 'white' }}>Líderes Ciudadanos</h3>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>MOTOR BASE44 INTEGRADO</span>
                    </div>
                </div>
                <button onClick={loadGameData} disabled={loading} style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', padding: '10px', borderRadius: '10px', marginBottom: '15px', fontSize: '0.8rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} /> Mostrando Simulación (Corrige el nombre de entidad en el código)
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {players.map((player, idx) => (
                    <div key={player.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '12px 15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '30px', textAlign: 'center', fontWeight: '900', color: idx === 0 ? '#fcd34d' : idx === 1 ? '#e2e8f0' : idx === 2 ? '#b45309' : '#64748b' }}>
                                #{idx + 1}
                            </div>
                            <div style={{ width: '35px', height: '35px', background: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                {player.avatar || '👤'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'white' }}>{player.name || player.username || `Vecino ${idx+1}`}</div>
                                <div style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={10} /> Sube de nivel</div>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(245,158,11,0.1)', color: '#fcd34d', fontWeight: '900', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {player.score || player.puntos || 0} <Star size={12} fill="#fcd34d" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
