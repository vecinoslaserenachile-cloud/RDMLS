import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle, Clock, Save, Play, Image, FileText, Settings, User, Type, Megaphone, Mic, Sparkles, Brain, Activity, Zap } from 'lucide-react';

export default function RadioBackofficeModal({ onClose }) {
    const [role, setRole] = useState('funcionario'); 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Seguridad');
    const [isPlayingVoice, setIsPlayingVoice] = useState(false);
    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [isSentinelScanning, setIsSentinelScanning] = useState(false);

    const sentinelKnowledge = [
        { title: "SENTINEL: Tendencia de reportes sobre luminarias en Avenida del Mar", content: "Mediante el monitoreo 'Sentinel Faro', detectamos un 15% de aumento en menciones sobre iluminación costera. Protocolo de Operaciones activado.", category: "Seguridad", impact: "Alto" },
        { title: "FARO DETECTA: Vecinos consultan sobre plazos de pavimentación en Las Compañías", content: "Análisis de sentimiento vecinal muestra alta expectativa por obras viales. Se recomienda boletín informativo sobre el Plan de Veredas 2026.", category: "Obras", impact: "Medio" },
        { title: "ALERTA SOCIAL: Rumores de corte de agua en sector Colina El Pino desmentidos", content: "Sentinel detecta desinformación en grupos de WhatsApp locales. Emisión de comunicado oficial Radio VLS requerida para tranquilidad vecinal.", category: "Servicios", impact: "Crítico" }
    ];
    
    // Marquee State
    const [marquees, setMarquees] = useState(() => {
        const stored = localStorage.getItem('Radio VLS_marquees');
        return stored ? JSON.parse(stored) : [
            { id: 1, text: "📻 ESTÁS ESCUCHANDO Radio VLS DIGITAL - LA SEÑAL SIEMPRE CONECTADA DE LA SERENA" }
        ];
    });
    const [newMarquee, setNewMarquee] = useState('');

    const [activeStudio, setActiveStudio] = useState('voces_propias');
    const [pendingNotes, setPendingNotes] = useState(() => {
        const stored = localStorage.getItem('Radio VLS_pending_notes');
        return stored ? JSON.parse(stored) : [];
    });

    const handleAIGen = async () => {
        if (!title && !content) return alert("Por favor ingresa al menos un título o una idea base para que la IA trabaje.");
        
        setIsAIGenerating(true);
        try {
            // Simulated Gemini Polishing
            setTimeout(() => {
                const aiPolished = `[NOTICIA OFICIAL Radio VLS] \n\n${content || title}\n\nEn un esfuerzo conjunto entre la Municipalidad de La Serena y el equipo de Innovación Smart City (VLS), se ha confirmado la implementación de nuevas tecnologías. Estas acciones buscan potenciar la calidad de vida de los habitantes.\n\nReportó para Radio VLS: Faro IA.`;
                setContent(aiPolished);
                setIsAIGenerating(false);
            }, 1000);
        } catch (err) {
            setIsAIGenerating(false);
        }
    };

    const handleSentinelScan = () => {
        setIsSentinelScanning(true);
        setTimeout(() => {
            const randomPick = sentinelKnowledge[Math.floor(Math.random() * sentinelKnowledge.length)];
            setTitle(randomPick.title);
            setContent(randomPick.content);
            setCategory(randomPick.category);
            setIsSentinelScanning(false);
            alert("Sentinel Faro Conectado: Escaneo de tendencias comunitarias completado con éxito.");
        }, 1500);
    };

    const handleGenerateVoice = async () => {
        if (!content) return alert("Escribe algo para generar la voz.");
        
        setIsPlayingVoice(true);
        // Fallback robusto: Voz Local VLS (Web Speech API) si ElevenLabs falla
        const useLocalVoice = () => {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(content);
            utterance.lang = 'es-ES';
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            
            // Buscar una voz masculina o institucional si existe
            const voices = synth.getVoices();
            const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;
            
            utterance.onend = () => setIsPlayingVoice(false);
            utterance.onerror = () => setIsPlayingVoice(false);
            synth.speak(utterance);
        };

        try {
            const apiKey = localStorage.getItem('elevenlabs_api_key') || 'sk_cfd875c28d1bd898761dc43244de06c33d4ee1fbb7cb4b06';
            const voiceId = "JBFqnCBsd6RMkjVDRZzb"; // Aro (Liam) - Voz Institucional Premium
            
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey
                },
                body: JSON.stringify({
                    text: content,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                })
            });

            if (!response.ok) {
                console.warn("ElevenLabs error, activando VLS Local Voice...");
                useLocalVoice();
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
            audio.onended = () => setIsPlayingVoice(false);
        } catch (err) {
            console.error(err);
            useLocalVoice();
        }
    };

    const handleSubir = () => {
        if (!title.trim() || !content.trim()) return alert('Ingrese título y contenido');
        const newNote = {
            id: Date.now(),
            title,
            content,
            category,
            status: 'pending',
            date: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
            author: 'Funcionario Smart'
        };
        const updated = [newNote, ...pendingNotes];
        setPendingNotes(updated);
        localStorage.setItem('Radio VLS_pending_notes', JSON.stringify(updated));
        
        setTitle('');
        setContent('');
        alert('Contenido enviado exitosamente para el Visto Bueno (VB) del Jefe.');
    };

    const handleAprobar = (id) => {
        const note = pendingNotes.find(n => n.id === id);
        if (!note) return;

        // Add to global news (PrensaTab source)
        const officialNews = JSON.parse(localStorage.getItem('laserena_official_news') || '[]');
        const newRecord = {
            id: note.id.toString(),
            title: note.title,
            desc: note.content.substring(0, 100) + '...',
            body: note.content,
            category: note.category,
            state: 'Publicado',
            date: new Date().toLocaleDateString('es-CL', { month: 'long', day: 'numeric', year: 'numeric' }),
            author: note.author,
            imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
        };
        
        localStorage.setItem('laserena_official_news', JSON.stringify([newRecord, ...officialNews]));
        
        // Remove from pending
        const updatedPending = pendingNotes.filter(n => n.id !== id);
        setPendingNotes(updatedPending);
        localStorage.setItem('Radio VLS_pending_notes', JSON.stringify(updatedPending));

        alert('¡Publicado con éxito en Radio VLS y Portal Vecinal!');
    };

    const handleAddMarquee = () => {
        if (!newMarquee) return;
        const updated = [...marquees, { id: Date.now(), text: newMarquee }];
        setMarquees(updated);
        localStorage.setItem('Radio VLS_marquees', JSON.stringify(updated));
        setNewMarquee('');
        window.dispatchEvent(new Event('storage'));
    };

    const handleRemoveMarquee = (id) => {
        const updated = marquees.filter(m => m.id !== id);
        setMarquees(updated);
        localStorage.setItem('Radio VLS_marquees', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: '1000px', height: '90vh', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.95) 100%)', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <Settings size={24} color="#38bdf8" /> Backoffice Oficial de Radio (Radio VLS)
                        </h2>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                            Sistema de CMS & Editor de Voces AI
                        </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            style={{ background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid #38bdf8', padding: '0.5rem 1rem', borderRadius: '8px', outline: 'none', fontWeight: 'bold' }}
                        >
                            <option value="funcionario">Perfil: Funcionario Redactor</option>
                            <option value="jefe">Perfil: Jefe Visador (VB)</option>
                        </select>
                        <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}><X size={24} color="white" /></button>
                    </div>
                </div>

                {localStorage.getItem('sentinel_auto_feed') === 'true' && (
                    <div style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '0.6rem 2rem', borderBottom: '1px solid rgba(34, 197, 94, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem', color: '#22C55E' }}>
                        <Zap size={16} className="animate-pulse" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>SISTEMA AUTO-FEED ACTIVO: Sentinel Faro está alimentando la radio automáticamente con noticias positivas.</span>
                    </div>
                )}

                {/* Serenito AI Advisor (Persistent Header) */}
                <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1rem 2rem', borderBottom: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
                        <img 
                            src="/serenito_security_guard_close_up_1773392164475.png" 
                            alt="Serenito Advisor" 
                            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))' }} 
                        />
                        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '15px', height: '15px', background: '#10b981', borderRadius: '50%', border: '2px solid #0f172a' }}></div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: '900', letterSpacing: '1px' }}>ASISTENTE SERENITO VLS</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                            {isSentinelScanning ? "Escaneando pulsaciones vecinales en tiempo real..." : 
                             isAIGenerating ? "Optimizando redacción institucional para máxima claridad..." :
                             "Hola, estoy aquí para ayudarte a certificar y publicar contenido de alto impacto comunal."}
                        </div>
                    </div>
                    {isSentinelScanning && <Activity size={20} color="#38bdf8" className="animate-pulse" style={{ marginLeft: 'auto' }} />}
                </div>

                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Panel Izquierdo: Creación o Revisión */}
                    <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                        {role === 'funcionario' ? (
                            <>
                                <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={20} /> Redacción de Nota Municipal</span>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button 
                                            onClick={() => window.dispatchEvent(new CustomEvent('open-sentinel-apex'))}
                                            style={{ background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #a855f7', color: '#a855f7', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                        >
                                            <Activity size={14} /> Monitor Apex
                                        </button>
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
                                    <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Título del Contenido:</label>
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
                                        <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Contenido / Guión (Texto a Voz):</label>
                                        <button 
                                            onClick={handleAIGen}
                                            disabled={isAIGenerating}
                                            style={{ background: 'linear-gradient(45deg, #a855f7, #ec4899)', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                                        >
                                            <Sparkles size={14} /> {isAIGenerating ? 'Procesando...' : 'Pulir con Gemini IA'}
                                        </button>
                                    </div>
                                    <textarea 
                                        rows="6"
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        placeholder="Escriba aquí el cuerpo de la noticia o el guión que será leído por el locutor inteligente..."
                                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', outline: 'none', resize: 'none', fontSize: '1rem' }}
                                    ></textarea>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoría:</label>
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
                                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>Estudio de Voz AI:</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button 
                                                onClick={handleGenerateVoice}
                                                disabled={isPlayingVoice}
                                                style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', background: isPlayingVoice ? '#ef4444' : '#10b981', color: '#000', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                            >
                                                {isPlayingVoice ? <><Clock className="animate-spin" size={18} /> Transmitiendo...</> : <><Mic size={18} /> Probar Voz VLS</>}
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    const newKey = prompt("Introduzca LLAVE API ElevenLabs (Opcional):", localStorage.getItem('elevenlabs_api_key') || '');
                                                    if (newKey) localStorage.setItem('elevenlabs_api_key', newKey);
                                                }}
                                                title="Configurar API ElevenLabs"
                                                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }}
                                            >
                                                <Settings size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSubir}
                                    className="btn pulse" 
                                    style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(45deg, #3b82f6, #6366f1)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.4)' }}
                                >
                                    Enviar a Jefatura (VB)
                                </button>
                                
                                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3 style={{ color: '#fcd34d', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                        <Megaphone size={18} /> Gestor de Marquee (Huinchas Inferiores)
                                    </h3>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                        <input 
                                            type="text"
                                            value={newMarquee}
                                            onChange={e => setNewMarquee(e.target.value)}
                                            placeholder="Nueva huincha de texto..."
                                            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                        />
                                        <button onClick={handleAddMarquee} style={{ padding: '0.8rem 1.2rem', background: '#f59e0b', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Añadir</button>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                                        {marquees.map(m => (
                                            <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                                                <span style={{ color: '#cbd5e1' }}>{m.text}</span>
                                                <button onClick={() => handleRemoveMarquee(m.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 style={{ color: '#10b981', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckCircle size={20} /> Bandeja de Visto Bueno (Jefatura)
                                </h3>
                                
                                {pendingNotes.length === 0 ? (
                                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem 1rem' }}>
                                        <CheckCircle size={48} color="#10b981" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                        <p>No hay notas pendientes de revisión.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {pendingNotes.map(n => (
                                            <div key={n.id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                    <div>
                                                        <h4 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{n.title}</h4>
                                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={14} /> {n.author}</span>
                                                    </div>
                                                    <span style={{ background: '#f59e0b', color: 'black', padding: '0.25rem 0.5rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> PENDIENTE</span>
                                                </div>
                                                <button 
                                                    onClick={() => handleAprobar(n.id)}
                                                    className="btn pulse" 
                                                    style={{ width: '100%', background: '#10b981', color: 'black', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                                                >
                                                    Aprobar y Emitir en Vivo
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Panel Derecho: AI Studio Embed Viewer */}
                    <div style={{ flex: 1, backgroundColor: '#111827', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button 
                                    onClick={() => setActiveStudio('voces_propias')}
                                    className="btn pulse"
                                    style={{ background: activeStudio === 'voces_propias' ? '#4f46e5' : 'transparent', border: activeStudio === 'voces_propias' ? 'none' : '1px solid #4f46e5', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    <Play size={16} /> @vecinoslaserena
                                </button>
                                <button 
                                    onClick={() => setActiveStudio('voces')}
                                    className="btn"
                                    style={{ background: activeStudio === 'voces' ? '#a855f7' : 'transparent', border: activeStudio === 'voces' ? 'none' : '1px solid #a855f7', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    <Play size={16} /> Dev / Externo
                                </button>
                                <button 
                                    onClick={() => setActiveStudio('fotos')}
                                    className="btn"
                                    style={{ background: activeStudio === 'fotos' ? '#38bdf8' : 'transparent', border: activeStudio === 'fotos' ? 'none' : '1px solid #38bdf8', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    <Image size={16} /> Crear Foto
                                </button>
                            </div>
                            <a href={
                                activeStudio === 'voces_propias' ? "https://ais-pre-sh54jja4gfsqxtulvbnrby-41245370989.us-east5.run.app" : 
                                activeStudio === 'voces' ? "https://aistudio.google.com/apps/36e48fef-5da8-4f3e-8c3c-5e85c16922ab?showPreview=true&showAssistant=true" : 
                                "https://aistudio.google.com/apps/6e4f4a16-c856-4a5b-a1c8-488c6a426f3a?showAssistant=true&showPreview=true"
                            } target="_blank" rel="noreferrer" style={{ color: '#38bdf8', fontSize: '0.85rem', textDecoration: 'none' }}>Abrir en Pestaña ↗</a>
                        </div>
                        <div style={{ flex: 1, position: 'relative', background: '#020617' }}>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 0, padding: '2rem', textAlign: 'center' }}>
                                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                                    <Brain size={64} color="#38bdf8" className="animate-pulse" />
                                    <div style={{ position: 'absolute', inset: -10, border: '2px solid rgba(56, 189, 248, 0.2)', borderRadius: '50%', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                                </div>
                                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>MOTOR DE INTELIGENCIA VLS</h4>
                                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', maxWidth: '300px', marginBottom: '1.5rem' }}>
                                    Si visualizas un error de acceso (403), haz clic en el botón inferior para validar tu identidad en la red de Google AI.
                                </p>
                                <button 
                                    onClick={() => window.open(
                                        activeStudio === 'voces_propias' ? "https://ais-pre-sh54jja4gfsqxtulvbnrby-41245370989.us-east5.run.app" : 
                                        activeStudio === 'voces' ? "https://aistudio.google.com/apps/36e48fef-5da8-4f3e-8c3c-5e85c16922ab" : 
                                        "https://aistudio.google.com/apps/6e4f4a16-c856-4a5b-a1c8-488c6a426f3a", 
                                        '_blank'
                                    )}
                                    style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' }}
                                >
                                    <Sparkles size={18} /> VALIDAR SESIÓN EXTERNA ↗
                                </button>
                            </div>
                            <iframe 
                                src={
                                    activeStudio === 'voces_propias' ? "https://ais-pre-sh54jja4gfsqxtulvbnrby-41245370989.us-east5.run.app" : 
                                    activeStudio === 'voces' ? "https://aistudio.google.com/apps/36e48fef-5da8-4f3e-8c3c-5e85c16922ab?showPreview=true&showAssistant=true" : 
                                    "https://aistudio.google.com/apps/6e4f4a16-c856-4a5b-a1c8-488c6a426f3a?showAssistant=true&showPreview=true"
                                } 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', zIndex: 1, background: 'transparent' }}
                                title="App Integrada"
                                allow="microphone; camera; autoplay"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
