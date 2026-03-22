import React, { useState, useRef } from 'react';
import { Radio, Smartphone, Monitor, CheckSquare, CalendarClock, LayoutTemplate, Share2, PlusCircle, Trash2 } from 'lucide-react';

export default function MarketingTab() {
    const [publishData, setPublishData] = useState({
        web: true,
        intranet: false,
        appPush: true,
        radio: false,
        date: '',
        time: ''
    });

    const [pendingApprovals] = useState([
        { id: 1, title: 'Inauguración Smart Center', author: 'Periodista 1', hasMedia: true }
    ]);

    const [activeCampaigns, setActiveCampaigns] = useState([
        { id: 101, title: 'Campaña Invierno Seguro', bannerUrl: 'https://via.placeholder.com/800x400/1a202c/00e5ff?text=Invierno+Seguro', reach: '45k' },
        { id: 102, title: 'Cursos de Inglés E-Learning', bannerUrl: 'https://via.placeholder.com/800x400/1a202c/ec4899?text=Cursos+Ingles', reach: '12k' }
    ]);

    const fileInputRef = useRef(null);

    const handlePublish = (id) => {
        const payload = {
            id,
            web: publishData.web,
            intranet: publishData.intranet,
            appPush: publishData.appPush,
            radio: publishData.radio
        };
        console.log("Payload enviado a distribución:", payload);

        if (publishData.appPush) {
            // Generar Pin en el Mapa de C5 Puerta Serena
            const newIncident = {
                id: Date.now(),
                title: "Notificación Vecinal",
                desc: "Difusión Smart Comuna",
                type: 'info',
                lat: -29.9045 + (Math.random() - 0.5) * 0.02,
                lng: -71.2489 + (Math.random() - 0.5) * 0.02
            };
            window.dispatchEvent(new CustomEvent('c5-new-incident', { detail: newIncident }));
        }

        alert(`Payload publicado exitosamente.\n\nWeb Externa: ${publishData.web ? 'SÍ' : 'NO'}\nIntranet: ${publishData.intranet ? 'SÍ' : 'NO'}\nApp Push C5: ${publishData.appPush ? 'SÍ (Pin Creado)' : 'NO'}\nRadio: ${publishData.radio ? 'AUDIO EN COLA' : 'NO'}`);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newCampaign = {
                    id: Date.now(),
                    title: file.name.split('.')[0] || 'Nueva Campaña Subida',
                    bannerUrl: reader.result,
                    reach: 'Evaluando...'
                };
                setActiveCampaigns(prev => [...prev, newCampaign]);
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteCampaign = (id) => {
        setActiveCampaigns(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) minmax(300px, 1fr)', gap: '2rem' }}>

            {/* Motor de Distribución Omnicanal */}
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(16,185,129,0.3)' }}>
                <h3 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <Share2 size={22} /> Motor de Distribución & Aprobación
                </h3>

                <h4 style={{ color: 'white', marginBottom: '1rem' }}>Contenido Esperando Aprobación Final</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    {pendingApprovals.map(nota => (
                        <div key={nota.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ color: 'white', margin: '0 0 0.3rem 0', fontSize: '1.2rem' }}>{nota.title}</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Autor: {nota.author} | Contiene Media: {nota.hasMedia ? 'Sí (1)' : 'No'}</span>
                                </div>
                                <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>Esperando Publicar</span>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <h5 style={{ color: '#00e5ff', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckSquare size={16} /> Destinos de Publicación
                                </h5>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>

                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: publishData.web ? 'rgba(0,229,255,0.1)' : 'transparent', padding: '0.8rem', borderRadius: '8px', border: publishData.web ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s' }}>
                                        <input type="checkbox" checked={publishData.web} onChange={e => setPublishData({ ...publishData, web: e.target.checked })} style={{ accentColor: '#00e5ff' }} />
                                        <Monitor size={18} color={publishData.web ? '#00e5ff' : 'var(--text-muted)'} />
                                        <span style={{ color: publishData.web ? 'white' : 'var(--text-muted)', fontSize: '0.9rem' }}>Web Externa B2C</span>
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: publishData.intranet ? 'rgba(16,185,129,0.1)' : 'transparent', padding: '0.8rem', borderRadius: '8px', border: publishData.intranet ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s' }}>
                                        <input type="checkbox" checked={publishData.intranet} onChange={e => setPublishData({ ...publishData, intranet: e.target.checked })} style={{ accentColor: '#10b981' }} />
                                        <LayoutTemplate size={18} color={publishData.intranet ? '#10b981' : 'var(--text-muted)'} />
                                        <span style={{ color: publishData.intranet ? 'white' : 'var(--text-muted)', fontSize: '0.9rem' }}>Intranet B2G</span>
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: publishData.appPush ? 'rgba(236,72,153,0.1)' : 'transparent', padding: '0.8rem', borderRadius: '8px', border: publishData.appPush ? '1px solid #ec4899' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s' }}>
                                        <input type="checkbox" checked={publishData.appPush} onChange={e => setPublishData({ ...publishData, appPush: e.target.checked })} style={{ accentColor: '#ec4899' }} />
                                        <Smartphone size={18} color={publishData.appPush ? '#ec4899' : 'var(--text-muted)'} />
                                        <span style={{ color: publishData.appPush ? 'white' : 'var(--text-muted)', fontSize: '0.9rem' }}>App Push (Vecinos)</span>
                                    </label>

                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: publishData.radio ? 'rgba(245,158,11,0.1)' : 'transparent', padding: '0.8rem', borderRadius: '8px', border: publishData.radio ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s' }}>
                                        <input type="checkbox" checked={publishData.radio} onChange={e => setPublishData({ ...publishData, radio: e.target.checked })} style={{ accentColor: '#f59e0b' }} />
                                        <Radio size={18} color={publishData.radio ? '#f59e0b' : 'var(--text-muted)'} />
                                        <span style={{ color: publishData.radio ? 'white' : 'var(--text-muted)', fontSize: '0.9rem' }}>RDMLS (Digital Radio)</span>
                                    </label>

                                </div>

                                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', alignItems: 'flex-end' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}><CalendarClock size={14} /> Programador (Opcional)</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <input type="date" className="input-base" style={{ border: '1px solid rgba(255,255,255,0.1)', flex: 1 }} value={publishData.date} onChange={e => setPublishData({ ...publishData, date: e.target.value })} />
                                            <input type="time" className="input-base" style={{ border: '1px solid rgba(255,255,255,0.1)', flex: 1 }} value={publishData.time} onChange={e => setPublishData({ ...publishData, time: e.target.value })} />
                                        </div>
                                    </div>
                                    <button onClick={() => handlePublish(nota.id)} className="btn-primary" style={{ padding: '0.8rem 2rem', background: '#10b981', border: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>Aprobar y Distribuir</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gestor de Campañas & Banners */}
            <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: '#f59e0b', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LayoutTemplate size={22} /> Gestor de Campañas (Carrusel)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                    {activeCampaigns.map(camp => (
                        <div key={camp.id} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                            <div style={{ height: '120px', backgroundImage: `url(${camp.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                                <span style={{ position: 'absolute', bottom: '10px', left: '15px', color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>{camp.title}</span>
                                <span style={{ position: 'absolute', top: '10px', right: '15px', background: 'rgba(16,185,129,0.8)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>Impacto: {camp.reach}</span>
                            </div>
                            <div style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => deleteCampaign(camp.id)} className="btn-danger" style={{ flex: 1, fontSize: '0.85rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem' }}><Trash2 size={16} /> Suprimir</button>
                            </div>
                        </div>
                    ))}

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileUpload}
                    />

                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="glass-panel"
                        style={{ border: '2px dashed #f59e0b', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.05)', cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.05)'}
                    >
                        <PlusCircle size={32} color="#f59e0b" />
                        <span style={{ color: 'white', fontWeight: 'bold' }}>Subir Nueva Gráfica PNG/JPG</span>
                    </button>
                </div>
            </div>

        </div>
    );
}
