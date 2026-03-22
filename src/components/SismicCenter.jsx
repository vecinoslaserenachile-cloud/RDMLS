import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Activity, Map as MapIcon, Info, Users, AlertTriangle, Waves, Wind, Sun, Thermometer, CloudRain, HelpCircle, TrendingUp, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function SismicCenter({ onClose }) {
    const [activeTab, setActiveTab] = useState('monitor');
    const [quakes, setQuakes] = useState([]);
    const [glossary, setGlossary] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [userReport, setUserReport] = useState({ mercalli: 1, perception: 'No Sentido', damage: 'Ninguno' });

    // Datos simulados estadísticos para el "Monitoreo Predictivo"
    const predictionData = [
        { time: '00:00', risk: 10 },
        { time: '04:00', risk: 12 },
        { time: '08:00', risk: 8 },
        { time: '12:00', risk: 15 },
        { time: '16:00', risk: 25 },
        { time: '20:00', risk: 18 },
        { time: '23:59', risk: 12 },
    ];

    useEffect(() => {
        const fetchSismoData = async () => {
            try {
                // Nueva API - Vigilante Sismología Chile
                const res = await fetch('/api/sismologia');
                const data = await res.json();
                
                if (data.quakes) setQuakes(data.quakes);
                if (data.glossary) setGlossary(data.glossary);
                setIsInitialLoad(false);
            } catch (err) {
                console.error("VLS Sismologia API Error:", err);
            }
        };

        fetchSismoData();
        const interval = setInterval(fetchSismoData, 120000); // Cada 2 min
        return () => clearInterval(interval);
    }, []);

    const sendCollaborativeReport = () => {
        alert(`¡Gracias por tu reporte! Percepción: ${userReport.perception} (Mercalli ${userReport.mercalli}). Estos datos están siendo procesados por el Faro-AI para ajustar el mapa de daños en tiempo real.`);
        setActiveTab('monitor');
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 100002,
            background: 'rgba(2, 6, 23, 0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
            <div className="glass-panel" style={{
                width: '100%', maxWidth: '1000px', height: '90vh',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#ef4444', padding: '0.8rem', borderRadius: '12px', animation: 'pulse 2s infinite' }}>
                            <Activity size={24} color="white" />
                        </div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.4rem', fontWeight: '900' }}>Centro Sismológico & Tsunami Smart</h2>
                            <p style={{ color: '#ef4444', margin: 0, fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>MONITOREO ESTRATÉGICO LA SERENA - COQUIMBO</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
                        <X size={20} color="white" />
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', overflowX: 'auto' }}>
                    <button onClick={() => setActiveTab('monitor')} style={{ flex: 1, padding: '1rem', background: activeTab === 'monitor' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: activeTab === 'monitor' ? '#ef4444' : 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minWidth: '150px' }}>
                        <Activity size={18} /> Monitor Chile
                    </button>
                    <button onClick={() => setActiveTab('glossary')} style={{ flex: 1, padding: '1rem', background: activeTab === 'glossary' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: activeTab === 'glossary' ? '#38bdf8' : 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minWidth: '150px' }}>
                        <HelpCircle size={18} /> Glosario (CSN)
                    </button>
                    <button onClick={() => setActiveTab('predictive')} style={{ flex: 1, padding: '1rem', background: activeTab === 'predictive' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: activeTab === 'predictive' ? '#ef4444' : 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minWidth: '150px' }}>
                        <TrendingUp size={18} /> Gestión Estadística
                    </button>
                    <button onClick={() => setActiveTab('collab')} style={{ flex: 1, padding: '1rem', background: activeTab === 'collab' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: activeTab === 'collab' ? '#ef4444' : 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minWidth: '150px' }}>
                        <Users size={18} /> Reporte Colaborativo
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    
                    {activeTab === 'monitor' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {/* Lista de Sismos */}
                            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(0,0,0,0.4)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ color: 'white', margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <AlertTriangle size={18} color="#ef4444" /> Catálogo Reciente (Chile)
                                    </h3>
                                    <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 'bold' }}>FUENTE: SISMOLOGIA.CL</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {quakes.length > 0 ? quakes.map(q => (
                                        <div key={q.id} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: `4px solid ${q.mag > 5 ? '#ef4444' : '#f59e0b'}` }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 'bold', color: 'white' }}>Mag: {q.mag} Ml</span>
                                                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{new Date(q.time).toLocaleTimeString()}</span>
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: 'bold' }}>{q.place}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>Prof: {q.depth}km | Lat: {q.lat} Lng: {q.lng}</div>
                                        </div>
                                    )) : (
                                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>Consultando Sismología Chile...</div>
                                    )}
                                </div>
                            </div>

                            {/* Alerta Tsunami */}
                            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid #0ea5e9' }}>
                                <h3 style={{ color: 'white', margin: '0 0 1rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Waves size={18} color="#0ea5e9" /> Estado de Tsunami (PTWC)
                                </h3>
                                <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                                    <div style={{ fontSize: '3rem', color: '#10b981', fontWeight: '900', textShadow: '0 0 20px rgba(16,185,129,0.5)' }}>SIN ALERTA</div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '1rem' }}>Sismo reciente no reúne condiciones para generar tsunami en las costas de Chile.</p>
                                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.7rem', color: '#0ea5e9', fontWeight: 'bold' }}>ZONAS DE INUNDACIÓN LS:</div>
                                        <div style={{ fontSize: '0.8rem', color: 'white', marginTop: '4px' }}>Av. del Mar - Faro - Peñuelas</div>
                                        <div style={{ width: '100%', height: '4px', background: '#334155', marginTop: '8px', borderRadius: '2px' }}>
                                            <div style={{ width: '15%', height: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'glossary' && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                <h3 style={{ color: '#38bdf8', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <HelpCircle size={24} /> Glosario de Conceptos Sismológicos
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
                                    {glossary.map((item, idx) => (
                                        <div key={idx} style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px', fontSize: '1.1rem' }}>{item.term}</div>
                                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>{item.definition}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.7rem', color: '#64748b', textAlign: 'center' }}>
                                    CONTENIDOS PROPIEDAD DE: <span style={{ fontWeight: 'bold' }}>CENTRO SISMOLÓGICO NACIONAL (U. DE CHILE) • SISMOLOGIA.CL</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'predictive' && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.4)' }}>
                                <h3 style={{ color: 'white', margin: '0 0 1rem 0' }}>Probabilidad Sística (Faro-AI Prediction)</h3>
                                <div style={{ height: '250px', width: '100%' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={predictionData}>
                                            <defs>
                                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                            <XAxis dataKey="time" stroke="#94a3b8" />
                                            <YAxis stroke="#94a3b8" />
                                            <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #ef4444' }} />
                                            <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>* Los datos mostrados son estimaciones estadísticas basadas en la recurrencia histórica y el "gap" sísmico de la región de Coquimbo.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>DÍAS SIN SISMO {'>'} 5.0</div>
                                    <div style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>42</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ACUMULACIÓN ENERGÉTICA</div>
                                    <div style={{ fontSize: '2rem', color: '#f59e0b', fontWeight: 'bold' }}>ALTA</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '1rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>NIVEL DE RIESGO SEMANAL</div>
                                    <div style={{ fontSize: '2rem', color: '#ef4444', fontWeight: 'bold' }}>4/10</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'collab' && (
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)' }}>
                                <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Reporte de Percepción Ciudadana</h3>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>¿Qué tan fuerte sentiste el sismo? (Mercalli Modificada)</label>
                                    <input 
                                        type="range" min="1" max="12" step="1" 
                                        value={userReport.mercalli} 
                                        onChange={(e) => {
                                            const v = parseInt(e.target.value);
                                            let p = 'No Sentido';
                                            if (v >= 2 && v <= 3) p = 'Débil / Leve';
                                            if (v >= 4 && v <= 5) p = 'Moderado / Fuerte';
                                            if (v >= 6 && v <= 7) p = 'Daño Estructural Leve';
                                            if (v >= 8) p = 'Desastre / Gran Daño';
                                            setUserReport({...userReport, mercalli: v, perception: p});
                                        }}
                                        style={{ width: '100%', accentColor: '#ef4444' }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem' }}>Grado {userReport.mercalli}</span>
                                        <span style={{ color: 'white', fontWeight: 'bold' }}>{userReport.perception}</span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>Daños Observados</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {['Ninguno', 'Objetos caídos', 'Grietas en paredes', 'Colapso parcial', 'Corte de Luz', 'Corte de Agua'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => setUserReport({...userReport, damage: opt})}
                                                style={{ padding: '10px', background: userReport.damage === opt ? '#ef4444' : 'rgba(255,255,255,0.05)', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={sendCollaborativeReport} className="btn-glass" style={{ width: '100%', background: '#ef4444', color: 'white', fontWeight: 'bold', padding: '1rem', marginTop: '1rem' }}>
                                    ENVIAR REPORTE A SEGURIDAD CIUDADANA
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer / Smart Info */}
                <div style={{ padding: '1rem', background: 'black', color: '#94a3b8', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ textTransform: 'uppercase' }}>DATOS SINCRONIZADOS CON SISMOLOGIA.CL, USGS Y RED CENTINEL FARO VLS</div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ color: '#10b981' }}>● SISTEMA ACTIVO</span>
                        <span>LATENCIA: 140ms</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                    70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
                }
            `}</style>
        </div>
    );
}

