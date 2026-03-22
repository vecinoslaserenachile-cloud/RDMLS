import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Copy, CheckCircle, AlertTriangle, Radio, Music, Shield, Info, Link as LinkIcon, Facebook, Instagram, Twitter, Youtube, Trash2 } from 'lucide-react';

export default function AzuraCastSync({ onClose }) {
    const [apiKey, setApiKey] = useState(localStorage.getItem('azuracast_api_key') || '');
    const [baseUrl] = useState('https://az11.yesstreaming.net/api');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [log, setLog] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const addLog = (msg, type = 'info') => {
        setLog(prev => [{ msg, type, time: new Date().toLocaleTimeString() }, ...prev]);
    };

    const saveKey = () => {
        localStorage.setItem('azuracast_api_key', apiKey);
        addLog('Llave API guardada localmente.', 'success');
    };

    // Paso 2: Extracción del ADN
    const fetchSourcePlaylists = async () => {
        if (!apiKey) return alert('Por favor, ingresa la X-API-Key primero.');
        setStatus('loading');
        addLog('Iniciando extracción de ADN desde RDMLS (Estación 1)...');
        
    try {
            const response = await fetch(`${baseUrl}/station/1/playlists`, {
                headers: { 'X-API-Key': apiKey }
            });
            if (!response.ok) throw new Error('Error al conectar con AzuraCast');
            const data = await response.json();
            setPlaylists(data);
            
            // Auto-detectar menciones horarias
            const signals = data.filter(p => 
                p.name.toLowerCase().includes('mencion') || 
                p.name.toLowerCase().includes('horaria') || 
                p.name.toLowerCase().includes('señal') ||
                p.name.toLowerCase().includes('hora')
            );
            addLog(`Se encontraron ${data.length} listas en total. ${signals.length} parecen ser Señales Horarias.`, 'success');
            setStatus('idle');
        } catch (err) {
            addLog(`Error: ${err.message}`, 'error');
            setStatus('error');
        }
    };

    const syncAllHourly = async () => {
        const signals = playlists.filter(p => 
            p.name.toLowerCase().includes('mencion') || 
            p.name.toLowerCase().includes('horaria') || 
            p.name.toLowerCase().includes('señal') ||
            p.name.toLowerCase().includes('hora')
        );
        
        if (signals.length === 0) return addLog('No se detectaron señales horarias para sincronizar.', 'warning');
        
        addLog(`Iniciando sincronización por lotes de ${signals.length} señales...`);
        for (const s of signals) {
            await clonePlaylist(s);
        }
        addLog('Sincronización de señales horarias completada.', 'success');
    };

    // Paso 3 & 4: Clonación (Limpieza e Inyección)
    const clonePlaylist = async (playlist) => {
        if (!apiKey) return;
        setStatus('loading');
        addLog(`Clonando lista: ${playlist.name}...`);

        try {
            // Paso 3: Limpieza de datos
            // Eliminamos IDs para que AzuraCast cree uno nuevo en la estación destino
            const cleanData = { ...playlist };
            delete cleanData.id;
            delete cleanData.station_id;
            // Quitamos también relaciones externas si existieran
            
            addLog('ADN limpiado. Eliminado ID de estación y lista.');

            // Paso 4: Inyección en Radio Vecinos La Serena (Estación 2)
            const response = await fetch(`${baseUrl}/station/2/playlists`, {
                method: 'POST',
                headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cleanData)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error al inyectar lista');
            }

            const newPlaylist = await response.json();
            addLog(`¡Éxito! Lista "${playlist.name}" clonada en Estación 2. ID Nuevo: ${newPlaylist.id}`, 'success');
            setStatus('idle');
        } catch (err) {
            addLog(`Error en clonación: ${err.message}`, 'error');
            setStatus('error');
        }
    };

    // Paso 5: Gestión de Archivos (Lógica Base)
    const uploadBaseFiles = async () => {
        addLog('Preparando carga de archivos MP3 de base horaria...', 'info');
        addLog('Nota: Esta operación requiere los archivos físicos seleccionados.', 'warning');
        // Aquí se implementaría el input file y el POST a /station/2/files con FormData
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '900px', height: '85vh', background: '#0a0f1e', borderRadius: '24px', border: '2px solid #3b82f6', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 50px rgba(59, 130, 246, 0.4)' }}>
                {/* Header */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.1)' }}>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <RefreshCw size={24} className={status === 'loading' ? 'animate-spin' : ''} /> SMART RADIO SYNC (AzuraCloner)
                        </h2>
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Sincronización RDMLS (1) → RADIO VLS (2)</span>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Configuracion */}
                    <div style={{ width: '350px', padding: '2rem', borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Shield size={14} /> AZURACAST X-API-KEY:
                            </label>
                            <input 
                                type="password" 
                                value={apiKey} 
                                onChange={e => setApiKey(e.target.value)}
                                style={{ width: '100%', background: '#000', border: '1px solid #333', borderRadius: '8px', padding: '0.8rem', color: '#0f0', fontFamily: 'monospace', marginTop: '0.5rem' }}
                            />
                            <button onClick={saveKey} style={{ width: '100%', marginTop: '0.5rem', background: '#3b82f6', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Guardar Llave</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button onClick={fetchSourcePlaylists} className="btn-glass" style={{ padding: '1rem', background: 'rgba(255,165,0,0.1)', border: '1px solid orange', color: 'orange', borderRadius: '12px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>
                                1. Extraer ADN (RDMLS)
                            </button>
                            <button onClick={syncAllHourly} className="btn-glass" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '12px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>
                                2. Sumar Menciones Horarias
                            </button>
                            <button onClick={uploadBaseFiles} className="btn-glass" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', borderRadius: '12px', textAlign: 'left', fontWeight: 'bold', cursor: 'pointer' }}>
                                3. Inyectar Audios Base
                            </button>
                            <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', fontSize: '0.75rem', color: '#64748b', border: '1px dashed #333' }}>
                                <Info size={14} style={{ marginBottom: '5px' }} />
                                 Tip: "Sumar" agrega la programación horaria de RDMLS a la radio VLS sin tocar la música existente.
                            </div>
                        </div>
                    </div>

                    {/* Contenido / Log */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }}>
                        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                            {playlists.length > 0 && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <h4 style={{ color: 'white', marginTop: 0 }}>Listas Detectadas en RDMLS:</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {playlists.map(p => (
                                            <div key={p.id} style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 'bold' }}>{p.name}</div>
                                                    <div style={{ color: '#666', fontSize: '0.7rem' }}>Tipo: {p.type}</div>
                                                </div>
                                                <button onClick={() => clonePlaylist(p)} style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer' }}>Clonar</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <h4 style={{ color: '#3b82f6', borderBottom: '1px solid #3b82f620', paddingBottom: '5px' }}>TERMINAL DE OPERACIONES:</h4>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                {log.map((entry, i) => (
                                    <div key={i} style={{ marginBottom: '4px', color: entry.type === 'error' ? '#ef4444' : entry.type === 'success' ? '#10b981' : entry.type === 'warning' ? '#f59e0b' : '#94a3b8' }}>
                                        <span style={{ color: '#444', marginRight: '8px' }}>[{entry.time}]</span>
                                        {entry.msg}
                                    </div>
                                ))}
                                {log.length === 0 && <span style={{ color: '#333' }}>Inicia una operación para ver el log...</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
