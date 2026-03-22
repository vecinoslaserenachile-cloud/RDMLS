import React, { useState, useEffect } from 'react';
import { PenTool, Mic, Send, Archive, PlusCircle, AlertCircle, RefreshCw, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function PrensaTab() {
    const [editorData, setEditorData] = useState({ title: '', subtitle: '', category: '', tags: '', body: '', sourceLink: '', audioFile: null });
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('laserena_official_news');
        if (stored) {
            try {
                setNotes(JSON.parse(stored));
            } catch (e) { console.error('Error parseando noticias:', e); }
        } else {
            // Default mock data if nothing exists
            const defaultNotes = [
                { id: "1", title: 'Campaña de Limpieza Histórica en Casco Central', state: 'Publicado', date: '10 de Marzo, 2026', author: 'Equipo Prensa', category: 'Patrimonio', desc: 'La Dirección de Aseo y Ornato despliega un operativo masivo para restaurar fachadas de monumentos y calles emblemáticas.', iconStr: 'Building', color: '#f59e0b' },
                { id: "2", title: 'Licitación para Nuevos CESFAM Inteligentes Aprobada', state: 'Publicado', date: '09 de Marzo, 2026', author: 'Equipo Prensa', category: 'Salud Comunal', desc: 'El concejo aprueba fondos extraordinarios para equipamiento de telemedicina en periféricos de la ciudad.', iconStr: 'Stethoscope', color: '#10b981' },
                { id: "3", title: 'Despliegue de Seguridad Preventiva Fin de Semana', state: 'Publicado', date: '08 de Marzo, 2026', author: 'Equipo Prensa', category: 'Puerta Serena', desc: 'Más de 40 inspectores y drones apoyarán el circuito gastronómico y borde costero para brindar seguridad integral.', iconStr: 'ShieldAlert', color: '#38bdf8' }
            ];
            setNotes(defaultNotes);
            localStorage.setItem('laserena_official_news', JSON.stringify(defaultNotes));
        }
    }, []);

    const getStateColor = (state) => {
        switch (state) {
            case 'Borrador': return '#fcd34d'; // amarillo
            case 'Esperando Gráfica': return '#38bdf8'; // cyan
            case 'En Revisión': return '#f59e0b'; // naranjo
            case 'Aprobado': return '#10b981'; // verde
            default: return 'white';
        }
    };

    const handleDesignRequest = (noteId) => {
        alert(`Alerta enviada a DISEÑO para la nota #${noteId}`);
    };

    const handlePublish = () => {
        if (!editorData.title || !editorData.subtitle) {
            alert('Por favor completa al menos el título y el resumen.');
            return;
        }

        const iconMap = {
            'Comunidad': { icon: 'Users', color: '#a855f7' },
            'Turismo': { icon: 'Globe', color: '#f59e0b' },
            'Seguridad': { icon: 'ShieldAlert', color: '#38bdf8' },
            'Deportes': { icon: 'Activity', color: '#10b981' },
            'Patrimonio': { icon: 'Building', color: '#f59e0b' },
            'Salud Comunal': { icon: 'Stethoscope', color: '#10b981' },
            'Puerta Serena': { icon: 'ShieldAlert', color: '#38bdf8' }
        };

        const config = iconMap[editorData.category] || { icon: 'Newspaper', color: '#ec4899' };

        const newNote = {
            id: Date.now().toString(),
            title: editorData.title,
            desc: editorData.subtitle,
            category: editorData.category || 'Noticia',
            state: 'Publicado',
            date: new Date().toLocaleDateString('es-CL', { month: 'long', day: 'numeric', year: 'numeric' }),
            author: 'Editor IMLS',
            iconStr: config.icon,
            color: config.color,
            body: editorData.body,
            sourceLink: editorData.sourceLink,
            audioFile: editorData.audioFile
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem('laserena_official_news', JSON.stringify(updatedNotes));

        alert('¡Noticia Publicada Oficialmente en la Portada (laserena.cl)!');
        setEditorData({ title: '', subtitle: '', category: '', tags: '', body: '', sourceLink: '', audioFile: null });
        window.dispatchEvent(new Event('storage')); // Trigger update for listeners just in case
    };

    // Auto-save logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (editorData.title || editorData.body) {
                setIsSaving(true);
                // Simulate save
                setTimeout(() => {
                    setLastSaved(new Date().toLocaleTimeString());
                    setIsSaving(false);
                }, 800);
            }
        }, 2000); // 2 seconds delay
        return () => clearTimeout(timer);
    }, [editorData]);

    const handleAttachAudio = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEditorData({ ...editorData, audioFile: e.target.files[0].name });
            alert("Cuña de audio enlazada exitosamente para RDMLS.");
        }
    };

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Editor WYSIWYG */}
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', border: '1px solid rgba(0,229,255,0.3)' }}>
                <h3 style={{ color: '#00e5ff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <PenTool size={22} /> Editor Enriquecido (Prensa)
                </h3>

                <input type="text" className="input-base" placeholder="Título de la Nota" value={editorData.title} onChange={e => setEditorData({ ...editorData, title: e.target.value })} style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                <input type="text" className="input-base" placeholder="Bajada / Resumen" value={editorData.subtitle} onChange={e => setEditorData({ ...editorData, subtitle: e.target.value })} style={{ border: '1px solid rgba(255,255,255,0.1)' }} />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select className="input-base" value={editorData.category} onChange={e => setEditorData({ ...editorData, category: e.target.value })} style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}>
                        <option value="">Categoría...</option>
                        <option value="Comunidad">Comunidad</option>
                        <option value="Turismo">Turismo</option>
                        <option value="Seguridad">Seguridad (Faro)</option>
                        <option value="Deportes">Deportes (CDLS)</option>
                    </select>
                    <input type="text" className="input-base" placeholder="Etiquetas (,)" value={editorData.tags} onChange={e => setEditorData({ ...editorData, tags: e.target.value })} style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>

                <textarea className="input-base" placeholder="Escribir cuerpo de la noticia (soporte futuro para tags HTML en WYSIWYG real)..." value={editorData.body} onChange={e => setEditorData({ ...editorData, body: e.target.value })} style={{ minHeight: '300px', resize: 'vertical', border: '1px solid rgba(255,255,255,0.1)' }}></textarea>

                {/* Gestor Audio y Links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <LinkIcon size={20} color="#38bdf8" />
                        <input type="text" placeholder="Enlazar Fuente / URL (Ej: BioBio)..." className="input-base" style={{ background: 'transparent', border: 'none', padding: 0, flex: 1 }} value={editorData.sourceLink} onChange={e => setEditorData({ ...editorData, sourceLink: e.target.value })} />
                    </div>

                    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed #ec4899', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '50%' }}>
                                <Mic size={20} color="#ec4899" />
                            </div>
                            <div>
                                <span style={{ display: 'block', color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{editorData.audioFile ? editorData.audioFile : 'Adjuntar Cuña Audio'}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Preparado para RDMLS (.mp3, .wav)</span>
                            </div>
                        </div>
                        <input type="file" id="audio-upload" style={{ display: 'none' }} accept="audio/mp3, audio/wav" onChange={handleAttachAudio} />
                        <button className="btn-glass" style={{ fontSize: '0.8rem' }} onClick={() => document.getElementById('audio-upload').click()}>Examinar...</button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {isSaving ? (
                            <span className="pulse">Guardando borrador...</span>
                        ) : lastSaved ? (
                            <> <CheckCircle2 size={14} color="#10b981" /> Auto-guardado: {lastSaved}</>
                        ) : null}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setEditorData({ title: '', subtitle: '', category: '', tags: '', body: '', sourceLink: '', audioFile: null })} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Archive size={16} /> Limpiar</button>
                        <button className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: '#3b82f6', color: '#3b82f6' }}><Send size={16} /> Borrador</button>
                        <button onClick={handlePublish} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(90deg, #ec4899, #f59e0b)', border: 'none', boxShadow: '0 4px 15px rgba(236,72,153,0.4)' }}><CheckCircle2 size={16} /> Publicar Portada</button>
                    </div>
                </div>
            </div>

            {/* Gestor / Tabla de Notas */}
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <AlertCircle size={22} color="#10b981" /> Notas Recientes
                    </h3>
                    <button className="btn-glass" style={{ padding: '0.4rem', borderRadius: '50%' }}><RefreshCw size={16} /></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {notes.map(note => (
                        <div key={note.id} style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h4 style={{ color: 'white', margin: '0 0 0.3rem 0', fontSize: '1.1rem' }}>{note.title}</h4>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <span>{note.date}</span>
                                        <span>{note.author}</span>
                                    </div>
                                </div>
                                <span style={{ padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', background: `${getStateColor(note.state)}20`, color: getStateColor(note.state), border: `1px solid ${getStateColor(note.state)}50` }}>
                                    {note.state}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.8rem' }}>
                                <button className="btn-glass" style={{ fontSize: '0.8rem', flex: 1 }}>Editar / Bajar</button>
                                <button onClick={() => handleDesignRequest(note.id)} className="btn-primary" style={{ fontSize: '0.8rem', flex: 1, background: 'rgba(236,72,153,0.2)', color: '#ec4899', border: '1px solid #ec4899', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
                                    <PlusCircle size={14} /> Solicitar Media
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
