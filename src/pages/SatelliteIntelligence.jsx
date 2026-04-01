import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Radio, Globe, Cpu, Zap, Activity, ShieldCheck, 
    ArrowLeft, ExternalLink, Database, Layers, 
    CloudLightning, MapPin, Signal, Info, RefreshCcw
} from 'lucide-react';

/* --- THEME --- */
const THEME = {
    bg: '#050505',
    card: 'rgba(20, 20, 25, 0.7)',
    border: 'rgba(255, 255, 255, 0.1)',
    blue: '#38bdf8',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f97316'
};

export default function SatelliteIntelligence() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastSync, setLastSync] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // En producción, esto vendría de una API o la ruta de build
            // Aquí leemos el archivo generado por el script de Python
            const response = await fetch('/data/satellite_live.json');
            const json = await response.json();
            setData(json);
            setLastSync(json.metadata.updated);
        } catch (error) {
            console.error("Error cargando datos satelitales:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Refrescar cada minuto
        return () => clearInterval(interval);
    }, []);

    const getBranchColor = (branch) => {
        if (branch.includes("Clima")) return THEME.blue;
        if (branch.includes("Territorio")) return THEME.green;
        return THEME.purple;
    };

    return (
        <div style={{ minHeight: '100vh', background: THEME.bg, color: 'white', fontFamily: 'system-ui', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px', margin: 0 }}>Antigravity <span style={{ color: THEME.blue }}>Satellite Core</span></h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.8rem', marginTop: '5px' }}>
                            <MapPin size={14} /> LA SERENA, CHILE • {lastSync || 'Sincronizando...'}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', padding: '0.5rem 1.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} className="pulse"></div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10b981' }}>SISTEMA VIVO</span>
                    </div>
                    <button onClick={fetchData} style={{ background: 'transparent', border: '1px solid #334155', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RefreshCcw size={16} className={loading ? 'spin' : ''} />Actualizar
                    </button>
                </div>
            </header>

            <main style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {loading && !data ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
                        <div className="spin" style={{ width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: THEME.blue, borderRadius: '50%' }}></div>
                        <p style={{ marginTop: '1rem', color: '#64748b' }}>Recolectando telemetría orbital...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                        {data?.biblioteca.map((sat, idx) => (
                            <motion.div 
                                key={sat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{ background: THEME.card, border: `1px solid ${THEME.border}`, borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ position: 'relative', height: '180px', background: '#000' }}>
                                    <img src={sat.visual_url} alt="Waterfall" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '15px' }}>
                                        <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '5px 12px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Signal size={12} color={THEME.blue} />
                                            <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>LTE: {sat.satelite}</span>
                                        </div>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '15px', width: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{sat.satelite}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ID TRÁFICO: {sat.id} • {new Date(sat.tiempo_real).toLocaleString()}</div>
                                    </div>
                                </div>

                                <div style={{ padding: '2rem' }}>
                                    {/* Intel Rama */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                        <div style={{ background: `${getBranchColor(sat.inteligencia.rama_principal)}20`, border: `1px solid ${getBranchColor(sat.inteligencia.rama_principal)}`, padding: '6px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', color: getBranchColor(sat.inteligencia.rama_principal) }}>
                                            {sat.inteligencia.rama_principal.toUpperCase()}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '2rem' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1rem' }}>SÍNTESIS CONCEPTUAL</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {sat.inteligencia.conceptos_clave.map(concept => (
                                                <span key={concept} style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '50px', fontSize: '0.8rem', color: '#94a3b8' }}>{concept}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                        <a href={sat.mapa_referencia} target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none', background: 'rgba(255,255,255,0.05)', border: `1px solid ${THEME.border}`, padding: '0.8rem', borderRadius: '15px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            <Globe size={16} /> Mapa Pase
                                        </a>
                                        <button style={{ flex: 1, background: THEME.blue, border: 'none', padding: '0.8rem', borderRadius: '15px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                            <Database size={16} /> Telemetría
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 2s linear infinite; }
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
                .pulse { animation: pulse 2s infinite ease-in-out; }
            `}</style>
        </div>
    );
}
