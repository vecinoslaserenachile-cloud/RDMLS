import React, { useState, useEffect } from 'react';
import { Radio as RadioIcon, Tv, ExternalLink, Music, X, Save, Zap, Settings, FileText, Brain, Sparkles, Clock, Mic, CheckCircle } from 'lucide-react';

// --- PANELES DEL STUDIO ---
function RadioStudioContent({ activeStudio, role, title, setTitle, content, setContent, category, setCategory, handleAIGen, handleSentinelScan, isAIGenerating, isSentinelScanning, handleGenerateVoice, isPlayingVoice, handleSubir, marquees, newMarquee, setNewMarquee, handleAddMarquee, handleRemoveMarquee, pendingNotes, handleAprobar }) {
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        fetch('/radio_playlist.json')
            .then(res => res.json())
            .then(data => setPlaylist(data.tracks || []))
            .catch(err => console.error("Error cargando playlist", err));
    }, []);

    if (activeStudio === 'video') {
        return (
            <div className="animate-fade-in" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#ec4899', margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Tv size={24} /> Video Studio & Streaming Directo
                    </h3>
                    <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #ec4899', fontSize: '0.8rem', color: '#ec4899', fontWeight: 'bold' }}>
                        📡 SERVER: YESSTREAMING RTMP
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', flex: 1 }}>
                    {/* Monitor de Salida */}
                    <div style={{ background: '#000', borderRadius: '20px', border: '4px solid #334155', position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/live_stream?channel=UCvly2C2WzVvL5G_P9sA3Tig" 
                            title="Live Stream Monitor"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            style={{ position: 'absolute', inset: 0 }}
                        ></iframe>
                        <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                             <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div> MONITOR SALIDA
                        </div>
                    </div>

                    {/* Controles de Transmisión */}
                    <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>URL DEL SERVIDOR (RTMP)</div>
                            <div style={{ fontSize: '1rem', color: '#38bdf8', fontFamily: 'monospace', wordBreak: 'break-all' }}>rtmp://az11.yesstreaming.net:1935/live</div>
                        </div>
                        <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 'bold' }}>CLAVE DE TRANSMISIÓN</div>
                            <div style={{ fontSize: '1rem', color: 'white', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                 <span>***********-vls-radio</span>
                                 <button className="btn-glass" style={{ padding: '0.4rem' }}><Save size={14} /></button>
                            </div>
                        </div>
                        
                        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                             <button className="btn" style={{ background: '#ec4899', color: 'white', fontWeight: 'bold', padding: '1rem' }}>
                                 <Zap size={18} /> INICIAR LIVE
                             </button>
                             <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 'bold', padding: '1rem' }}>
                                 <Settings size={18} /> SETTINGS
                             </button>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: 0 }}>Recuerda configurar OBS con perfil 720p 30fps para optimizar el ancho de banda municipal.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (activeStudio === 'radio_console') {
        return (
            <div className="animate-fade-in" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: '#f59e0b', margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <RadioIcon size={24} /> Consola de Transmisión (Audio Engine)
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                         <a href="https://az11.yesstreaming.net/public/vls" target="_blank" rel="noreferrer" className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', padding: '0.5rem 1rem' }}>
                            <ExternalLink size={16} /> AZURA VLS
                         </a>
                         <a href="https://az11.yesstreaming.net/public/rdmls" target="_blank" rel="noreferrer" className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f97316', padding: '0.5rem 1rem' }}>
                            <ExternalLink size={16} /> AZURA RDMLS
                         </a>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '2rem', flex: 1 }}>
                    {/* Reproductor / Status */}
                    <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                         <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '8px solid #f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                             <RadioIcon size={80} color="#f59e0b" className="animate-pulse" />
                             <div style={{ position: 'absolute', inset: -15, border: '2px dashed #f59e0b', borderRadius: '50%', animation: 'spin 10s linear infinite' }}></div>
                         </div>
                         <div style={{ textAlign: 'center' }}>
                             <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white' }}>ON AIR: VLS SEÑAL PRINCIPAL</div>
                             <div style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 'bold' }}>📡 128kbps | AzuraCast Cluster Alpha</div>
                         </div>
                         <div style={{ display: 'flex', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
                              <button className="btn" style={{ flex: 1, background: '#ef4444', color: 'white', fontWeight: 'bold', padding: '1rem', borderRadius: '15px' }}>EMERGENCIA</button>
                              <button className="btn" style={{ flex: 1, background: '#10b981', color: 'black', fontWeight: 'bold', padding: '1rem', borderRadius: '15px' }}>RE-CONECTAR</button>
                         </div>
                    </div>

                    {/* Lista de reproducción corta / Marquees */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', flex: 1 }}>
                            <h4 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '1rem', fontSize: '0.9rem' }}>📻 PROGRAMACIÓN SIGUIENTE</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '400px', overflowY: 'auto' }}>
                                {playlist.length > 0 ? playlist.map((track, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#334155', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Music size={18} color="#94a3b8" />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{track.title || 'Pista Desconocida'}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{track.artist || 'Artista Desconocido'} | 03:00</div>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ padding: '1rem', color: '#64748b', fontSize: '0.85rem' }}>Cargando playlist o sin pistas...</div>
                                )}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    // DEFAULT: Redacción / Voces (original logic)
    return (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Panel Izquierdo: Creación o Revisión */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                {role === 'funcionario' ? (
                    <>
                        <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={20} /> Redacción de Nota Municipal</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={handleSentinelScan}
                                    disabled={isSentinelScanning}
                                    style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                >
                                    <Brain size={14} /> {isSentinelScanning ? 'Escaneando...' : 'Sentinel Listening'}
                                </button>
                            </div>
                        </h3>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Título de la Noticia:</label>
                            <input 
                                type="text" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Ej: Nuevo recorrido Recolección Basura Sector Pampa..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', outline: 'none', fontSize: '1rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <label style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>Contenido / Guión (Voz IA):</label>
                                <button 
                                    onClick={handleAIGen}
                                    disabled={isAIGenerating}
                                    style={{ background: 'linear-gradient(45deg, #a855f7, #ec4899)', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                >
                                    <Sparkles size={14} /> {isAIGenerating ? 'Procesando...' : 'Pulir con Gemini'}
                                </button>
                            </div>
                            <textarea 
                                rows="5"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Escribe el cuerpo de la noticia..."
                                style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', outline: 'none', resize: 'none', fontSize: '1rem' }}
                            ></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Canal Destino:</label>
                                <select 
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                                >
                                    <option value="Seguridad">Seguridad (Faro)</option>
                                    <option value="Servicios">Servicios Municipales</option>
                                    <option value="Cultura">Cultura y Patrimonio</option>
                                    <option value="Deportes">Deportes (CDLS)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Estudio de Voz AI:</label>
                                <button 
                                    onClick={handleGenerateVoice}
                                    disabled={isPlayingVoice}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: isPlayingVoice ? '#ef4444' : '#10b981', color: '#000', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                >
                                    {isPlayingVoice ? <><Clock size={18} className="animate-spin" /> ...</> : <><Mic size={18} /> Probar Voz</>}
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleSubir}
                            style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(45deg, #3b82f6, #6366f1)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
                        >
                            Subir para VB del Jefe
                        </button>
                    </>
                ) : (
                    <>
                        <h3 style={{ color: '#10b981', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={20} /> Bandeja de Visación (Jefatura)
                        </h3>
                        
                        {pendingNotes.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '3rem 1rem' }}>
                                <CheckCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>No hay notas pendientes de revisión.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pendingNotes.map(n => (
                                    <div key={n.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                        <h4 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{n.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 1rem 0' }}>{n.content}</p>
                                        <button 
                                            onClick={() => handleAprobar(n.id)}
                                            style={{ width: '100%', background: '#10b981', color: 'black', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            Aprobar y Publicar en Vivo
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Panel Derecho: AI Studio Embed Viewer */}
            <div style={{ flex: 1, backgroundColor: '#111827', position: 'relative' }}>
                <iframe 
                    src="https://ais-pre-sh54jja4gfsqxtulvbnrby-41245370989.us-east5.run.app" 
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    title="AI Studio VLS"
                ></iframe>
            </div>
        </div>
    );
}

// --- MODAL PRINCIPAL ---
export default function RadioBackofficeModal({ onClose }) {
    const [role, setRole] = useState('funcionario'); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Seguridad');
    const [isPlayingVoice, setIsPlayingVoice] = useState(false);
    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [isSentinelScanning, setIsSentinelScanning] = useState(false);
    const [activeStudio, setActiveStudio] = useState('voces_propias'); // 'voces_propias', 'video', 'radio_console'

    const [marquees, setMarquees] = useState(() => JSON.parse(localStorage.getItem('Radio VLS_marquees')) || []);
    const [newMarquee, setNewMarquee] = useState('');
    const [pendingNotes, setPendingNotes] = useState(() => JSON.parse(localStorage.getItem('Radio VLS_pending_notes')) || []);

    const handleAIGen = () => {
        if (!content) return alert("Escribe una idea base.");
        setIsAIGenerating(true);
        setTimeout(() => {
            setContent(prev => `[ Radio vecinoslaserena.cl INFORMA ]\n\n${prev}\n\nReportó: Faro IA Inteligente de comunasmart.cl.`);
            setIsAIGenerating(false);
        }, 1000);
    };

    const handleSentinelScan = () => {
        setIsSentinelScanning(true);
        setTimeout(() => {
            setTitle("SENTINEL DETECTA: Alerta de Tráfico Avenida del Mar");
            setContent("Sentinel Faro reporta alta congestión en el sector costero. Se recomienda tomar rutas alternativas. Monitoreo en vivo activado.");
            setIsSentinelScanning(false);
        }, 1500);
    };

    const handleGenerateVoice = async () => {
        if (!content) return alert("Escribe algo.");
        setIsPlayingVoice(true);
        const synth = window.speechSynthesis;
        const ut = new SpeechSynthesisUtterance(content);
        ut.lang = 'es-CL';
        ut.rate = 1.0;
        ut.pitch = 1.0;
        synth.speak(ut);
    };

    const handleSubir = () => {
        if (!title || !content) return;
        const newNote = { id: Date.now(), title, content, category, author: 'Operador Smart' };
        const updated = [newNote, ...pendingNotes];
        setPendingNotes(updated);
        localStorage.setItem('Radio VLS_pending_notes', JSON.stringify(updated));
        setTitle(''); setContent('');
    };

    const handleAprobar = (id) => {
        const approved = pendingNotes.find(n => n.id === id);
        if (!approved) return;
        
        // Simular publicación en el feed global
        const news = JSON.parse(localStorage.getItem('laserena_official_news') || '[]');
        localStorage.setItem('laserena_official_news', JSON.stringify([{
            id: approved.id, title: approved.title, body: approved.content, category: approved.category, date: 'AHORA'
        }, ...news]));
        
        setPendingNotes(prev => prev.filter(n => n.id !== id));
        localStorage.setItem('Radio VLS_pending_notes', JSON.stringify(pendingNotes.filter(n => n.id !== id)));
        
        // Notificar al sistema global (App.jsx / Hub) para que aparezca la alerta
        window.dispatchEvent(new CustomEvent('vls-show-alert', {
            detail: {
                title: '📢 NOTICIA PUBLICADA',
                message: `La nota "${approved.title}" ya está al aire en el ecosistema digital municipal.`,
                type: 'success'
            }
        }));
    };

    const handleAddMarquee = () => {
        if (!newMarquee) return;
        const updated = [...marquees, { id: Date.now(), text: newMarquee }];
        setMarquees(updated);
        localStorage.setItem('Radio VLS_marquees', JSON.stringify(updated));
        setNewMarquee('');
    };

    const handleRemoveMarquee = (id) => {
        const updated = marquees.filter(m => m.id !== id);
        setMarquees(updated);
        localStorage.setItem('Radio VLS_marquees', JSON.stringify(updated));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(5, 10, 25, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: '1200px', height: '95vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                {/* Header Superior */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Settings size={28} color="#38bdf8" /> Radio Studio Master B2B
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                            <button onClick={() => setActiveStudio('voces_propias')} style={{ background: activeStudio === 'voces_propias' ? '#38bdf8' : 'transparent', color: activeStudio === 'voces_propias' ? 'black' : 'white', border: '1px solid #38bdf8', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>🎙️ REDACCIÓN & VOZ</button>
                            <button onClick={() => setActiveStudio('video')} style={{ background: activeStudio === 'video' ? '#ec4899' : 'transparent', color: activeStudio === 'video' ? 'white' : 'white', border: '1px solid #ec4899', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>📺 VIDEO STUDIO</button>
                            <button onClick={() => setActiveStudio('radio_console')} style={{ background: activeStudio === 'radio_console' ? '#f59e0b' : 'transparent', color: activeStudio === 'radio_console' ? 'black' : 'white', border: '1px solid #f59e0b', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>📻 AUDIO CONSOLE</button>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            style={{ background: 'rgba(56, 189, 248, 0.2)', color: 'white', border: '1px solid #38bdf8', padding: '0.6rem 1rem', borderRadius: '12px', outline: 'none', fontWeight: 'bold' }}
                        >
                            <option value="funcionario">Funcionario Redactor</option>
                            <option value="jefe">Jefe de Prensa (VB)</option>
                        </select>
                        <button onClick={onClose} className="btn-glass" style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} color="white" /></button>
                    </div>
                </div>

                <RadioStudioContent 
                    activeStudio={activeStudio}
                    role={role}
                    title={title} setTitle={setTitle}
                    content={content} setContent={setContent}
                    category={category} setCategory={setCategory}
                    handleAIGen={handleAIGen}
                    handleSentinelScan={handleSentinelScan}
                    isAIGenerating={isAIGenerating}
                    isSentinelScanning={isSentinelScanning}
                    handleGenerateVoice={handleGenerateVoice}
                    isPlayingVoice={isPlayingVoice}
                    handleSubir={handleSubir}
                    marquees={marquees}
                    newMarquee={newMarquee} setNewMarquee={setNewMarquee}
                    handleAddMarquee={handleAddMarquee}
                    handleRemoveMarquee={handleRemoveMarquee}
                    pendingNotes={pendingNotes}
                    handleAprobar={handleAprobar}
                />
                
                <style>{`
                    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    );
}
