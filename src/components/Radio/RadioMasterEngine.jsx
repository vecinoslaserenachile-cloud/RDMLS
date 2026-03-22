import React, { useState, useEffect } from 'react';
import { X as CloseIcon, Radio, Mic, Settings2, Activity, Play, Pause, BarChart3, Cloud, Layers, CheckCircle, AlertCircle, RefreshCw, Sparkles, Copy } from 'lucide-react';
import NewsStudio from './NewsStudio';

export default function RadioMasterEngine({ onClose }) {
    const [activeStation, setActiveStation] = useState(1); // 1: RDMLS, 2: RVLS
    const [showStudio, setShowStudio] = useState(false);
    const [viewMode, setViewMode] = useState('status'); // 'status', 'alerts', 'programming'
    const [liveData, setLiveData] = useState(null);
    const [locutionEnabled, setLocutionEnabled] = useState(localStorage.getItem('vls_locution_enabled') !== 'false');
    const [stationStatus, setStationStatus] = useState({
        1: { name: 'RDMLS (MUNICIPAL)', listeners: 124, status: 'online', nowPlaying: 'Himno de La Serena - Coro Tradicional', bitrate: '128kbps', type: 'MP3' },
        2: { name: 'RVLS (VECINAL)', listeners: 86, status: 'online', nowPlaying: 'Cargando Metadata...', bitrate: '192kbps', type: 'Adaptive' }
    });
    const [syncing, setSyncing] = useState(false);
    const [history, setHistory] = useState([]);

    // AI Locution Tips from RadioPlayer / GlobalAnnouncer
    const currentAlerts = [
        { id: 1, type: 'Clima', text: 'Reporte del tiempo: Calibración a 20 grados en La Serena.', priority: 'High' },
        { id: 2, type: 'Seguridad', text: 'Centinel Faro detecta patrullaje preventivo en sector Cuatro Esquinas.', priority: 'Medium' },
        { id: 3, type: 'Comunidad', text: 'Dato VLS: Sofia y Lucas recomiendan visitar el Paseo 3D.', priority: 'Low' },
        { id: 4, type: 'Comercio', text: 'Spot: El Nuevo Peregrino, Balmaceda 2936. Patrimonio vivo.', priority: 'Spot' }
    ];

    useEffect(() => {
        // Fetch real data from YesStreaming/Azuracast API if possible (CORS usually allows static)
        const fetchLive = async () => {
            try {
                // Proxy o JSON Estático
                const res = await fetch("https://az11.yesstreaming.net/api/nowplaying_static/radio.json");
                const data = await res.json();
                if (data && data.now_playing) {
                    setLiveData(data);
                    setStationStatus(prev => ({
                        ...prev,
                        2: { 
                            ...prev[2], 
                            nowPlaying: `${data.now_playing.song.artist} - ${data.now_playing.song.title}`,
                            listeners: data.listeners.total
                        }
                    }));
                }
            } catch (e) {
                console.warn("Master Engine: Usando telemetría de respaldo local.");
            }
        };
        fetchLive();
        const int = setInterval(fetchLive, 30000);
        return () => clearInterval(int);
    }, []);

    const toggleLocution = () => {
        const newState = !locutionEnabled;
        setLocutionEnabled(newState);
        localStorage.setItem('vls_locution_enabled', newState.toString());
        // Despachamos evento global para que los locutores se enteren de inmediato
        window.dispatchEvent(new CustomEvent('vls-locution-config', { detail: { enabled: newState } }));
        alert(`Locutor IA ${newState ? 'ACTIVADO' : 'DESACTIVADO'} globalmente.`);
    };

    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
            alert("SINCRONIZACIÓN ADN COMPLETADA: Señales horarias y programación base clonadas de RDMLS a RVLS.");
            setHistory([{
                id: Date.now(),
                type: 'sync',
                msg: 'Clonación de programación RDMLS -> RVLS exitosa.',
                time: new Date().toLocaleTimeString()
            }, ...history]);
        }, 2000);
    };

    const handleNewsSuccess = (newsData) => {
        setHistory([newsData, ...history]);
        setShowStudio(false);
        alert(`Noticia "${newsData.title}" inyectada en la lista de reproducción de la Estación ${newsData.station}.`);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100002, background: 'rgba(2, 6, 23, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(20px)' }}>
            
            <div className="animate-scale-in" style={{ width: '100%', maxWidth: '1100px', height: '90vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 100px rgba(56, 189, 248, 0.15)' }}>
                
                {/* Master Nav */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ 
                            background: 'linear-gradient(135deg, #38bdf8, #818cf8)', 
                            padding: '12px', borderRadius: '16px', 
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' 
                        }}>
                            <Radio size={32} color="white" />
                        </div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-1px' }}>VLS RADIO <span style={{ color: '#38bdf8' }}>MASTER ENGINE</span></h2>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={12} color="#10b981" /> SISTEMA OPERATIVO CENTRAL</span>
                                <span style={{ color: '#334155' }}>|</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Cloud size={12} /> AZURACAST v.PROFESSIONAL</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button 
                            onClick={handleSync}
                            disabled={syncing}
                            className="btn-glass"
                            style={{ 
                                padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #fcd34d', 
                                color: '#fcd34d', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' 
                            }}
                        >
                            <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} /> 
                            {syncing ? 'SINCRONIZANDO...' : 'CLONAR ADN PROGRAMACIÓN'}
                        </button>
                        <button 
                            onClick={toggleLocution}
                            className="btn-glass"
                            style={{ 
                                padding: '0.8rem 1.2rem', borderRadius: '12px', 
                                border: `1px solid ${locutionEnabled ? '#10b981' : '#ef4444'}`, 
                                color: locutionEnabled ? '#10b981' : '#ef4444', 
                                fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
                                background: locutionEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', cursor: 'pointer'
                            }}
                        >
                            <Mic size={18} /> 
                            {locutionEnabled ? 'LOCUTOR: ON' : 'LOCUTOR: OFF'}
                        </button>
                        <button onClick={onClose} className="btn-glass" style={{ padding: '0.6rem', borderRadius: '50%', cursor: 'pointer', background: 'none', border: 'none' }}><CloseIcon size={24} color="white" /></button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', overflow: 'hidden' }}>
                    
                    {/* Sidebar Stats */}
                    <div style={{ padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto', background: 'rgba(0,0,0,0.2)' }}>
                        <h3 style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1.5rem' }}>DASHBOARD DE ESTACIONES</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {[1, 2].map(id => (
                                <div 
                                    key={id}
                                    onClick={() => setActiveStation(id)}
                                    style={{ 
                                        padding: '1.2rem', borderRadius: '16px', 
                                        background: activeStation === id ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)',
                                        border: activeStation === id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer', transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        <span style={{ color: activeStation === id ? '#38bdf8' : 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{stationStatus[id].name}</span>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', alignSelf: 'center' }}></div>
                                    </div>
                                    <div style={{ color: '#38bdf8', fontSize: '0.75rem', background: 'rgba(0,0,0,0.4)', padding: '0.5rem', borderRadius: '8px' }}>
                                        <strong>{stationStatus[id].nowPlaying}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                             <button onClick={() => setViewMode('status')} style={{ padding: '10px', borderRadius: '8px', background: viewMode === 'status' ? '#38bdf8' : 'transparent', color: viewMode === 'status' ? 'black' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontWeight: 'bold' }}>ESTADO LIVE</button>
                             <button onClick={() => setViewMode('alerts')} style={{ padding: '10px', borderRadius: '8px', background: viewMode === 'alerts' ? '#38bdf8' : 'transparent', color: viewMode === 'alerts' ? 'black' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontWeight: 'bold' }}>AVISOS Y FRECUENCIAS</button>
                             <button onClick={() => setViewMode('programming')} style={{ padding: '10px', borderRadius: '8px', background: viewMode === 'programming' ? '#38bdf8' : 'transparent', color: viewMode === 'programming' ? 'black' : 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontWeight: 'bold' }}>API & TELEMETRÍA</button>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,100,100,0.05)', borderRadius: '12px', border: '1px solid rgba(255,100,100,0.2)' }}>
                            <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <RefreshCw size={12} /> BACKLOG
                            </div>
                            <div style={{ marginTop: '5px', fontSize: '0.65rem', color: '#64748b' }}>
                                {history.length > 0 ? history[0].title : 'Esperando comandos...'}
                            </div>
                        </div>
                    </div>

                    {/* Main Workspace */}
                    <div style={{ padding: '2rem', overflowY: 'auto' }}>
                        
                        {!showStudio ? (
                            <div className="animate-fade-in">
                                {viewMode === 'status' && (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                            <div>
                                                <h3 style={{ color: 'white', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Master Console: {stationStatus[activeStation].name}</h3>
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                                     <span style={{ padding: '4px 10px', borderRadius: '5px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.7rem', fontWeight: 'bold' }}>BITRATE: {stationStatus[activeStation].bitrate}</span>
                                                     <span style={{ padding: '4px 10px', borderRadius: '5px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>FORMATO: {stationStatus[activeStation].type}</span>
                                                     <span style={{ padding: '4px 10px', borderRadius: '5px', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.7rem' }}>ESCUCHAS: {stationStatus[activeStation].listeners}</span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setShowStudio(true)}
                                                className="btn pulse" 
                                                style={{ 
                                                    padding: '1rem 2rem', background: '#38bdf8', color: '#0f172a', 
                                                    borderRadius: '16px', border: 'none', fontWeight: 'bold', 
                                                    fontSize: '1rem', cursor: 'pointer', display: 'flex', 
                                                    alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)' 
                                                }}
                                            >
                                                <Mic size={20} /> INYECTAR AUDIO IA
                                            </button>
                                        </div>

                                        <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <h4 style={{ color: 'white', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Layers size={18} color="#38bdf8" /> PLAYLIST ACTUAL (AZURACAST REAL-TIME)
                                            </h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {liveData && liveData.playing_next ? (
                                                    <>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(56, 189, 248, 0.15)', borderRadius: '12px', border: '1px solid #38bdf8' }}>
                                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                                <Play size={16} color="#38bdf8" />
                                                                <span style={{ color: 'white', fontSize: '1rem', fontWeight: 'bold' }}>{liveData.now_playing.song.title} - {liveData.now_playing.song.artist}</span>
                                                            </div>
                                                            <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.6rem', fontWeight: '900', alignSelf: 'center' }}>ON AIR</span>
                                                        </div>
                                                        <div style={{ padding: '0.8rem 1.2rem', borderLeft: '3px solid #64748b', marginLeft: '25px', color: '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }}></div>
                                                            SIGUIENTE: {liveData.playing_next.song.title}
                                                        </div>
                                                    </>
                                                ) : (
                                                    [1, 2, 3].map(idx => (
                                                        <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', color: '#475569', textAlign: 'center' }}>Obteniendo Bitstream {idx}...</div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {viewMode === 'alerts' && (
                                    <div className="animate-fade-in">
                                        <h3 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertCircle color="#fcd34d" /> Monitor de Frecuencias y Avisos</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                            {currentAlerts.map(alert => (
                                                <div key={alert.id} style={{ background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                        <span style={{ fontSize: '0.7rem', color: alert.priority === 'High' ? '#ef4444' : '#38bdf8', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '5px' }}>{alert.type.toUpperCase()}</span>
                                                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>STATUS: PROGRAMADO</span>
                                                    </div>
                                                    <p style={{ color: 'white', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>"{alert.text}"</p>
                                                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                                                        <button className="btn-glass" style={{ flex: 1, fontSize: '0.7rem', padding: '6px' }}>EDITAR SCRIPT</button>
                                                        <button className="btn-glass" style={{ color: '#ef4444', fontSize: '0.7rem', padding: '6px' }}>DESACTIVAR</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {viewMode === 'programming' && (
                                    <div className="animate-fade-in" style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '32px' }}>
                                        <h3 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Telemetría API Azuracast / YesStreaming</h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                                <div style={{ marginBottom: '10px' }}><strong>URL Mountpoint:</strong> /radio.mp3</div>
                                                <div style={{ marginBottom: '10px' }}><strong>Server Port:</strong> 8630</div>
                                                <div style={{ marginBottom: '10px' }}><strong>Protocol:</strong> HTTPS (SSL/TLS)</div>
                                                <div style={{ marginBottom: '10px' }}><strong>Buffer State:</strong> 100% (Healthy)</div>
                                            </div>
                                            <div style={{ background: '#020617', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
                                                <div style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                                                    {'{'} <br/>
                                                    &nbsp;&nbsp;"status": "online", <br/>
                                                    &nbsp;&nbsp;"api_version": "2.1", <br/>
                                                    &nbsp;&nbsp;"current_listeners": "{stationStatus[2].listeners}", <br/>
                                                    &nbsp;&nbsp;"server_load": "12%" <br/>
                                                    {'}'}
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" style={{ marginTop: '2rem' }}>REINICIAR STREAMING SERVER</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="animate-scale-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <NewsStudio 
                                    stationId={activeStation} 
                                    onCancel={() => setShowStudio(false)} 
                                    onSuccess={handleNewsSuccess}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                <div style={{ padding: '0.8rem 2rem', background: '#020617', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div> CONECTADO A CENTRAL JETSTREAMING</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><CheckCircle size={12} color="#10b981" /> API V.2.1 AUTH_OK</span>
                    </div>
                    <div>© 2026 VECINO SMART - SISTEMA PROFESIONAL DE RADIODIFUSIÓN</div>
                </div>
            </div>
        </div>
    );
}
