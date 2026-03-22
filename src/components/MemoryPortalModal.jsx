import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Video, FileText, Heart, Camera } from 'lucide-react';

export default function MemoryPortalModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('galeria');
    const [isUploading, setIsUploading] = useState(false);
    const [memories, setMemories] = useState([
        { id: 1, type: 'galeria', url: '/serenito-museo.jpg', title: 'Visita Antiguo Museo. 1999.', from: 'María J. - Sector La Florida' },
        { id: 2, type: 'galeria', url: '/serenito-bus.jpg', title: 'Paseo microbuses', from: 'Raúl G. - Las Compañías' },
        { id: 3, type: 'galeria', url: '/comic-playa.jpg', title: 'Día de Playa Av. del Mar', from: 'Familia Torres - Cuatro Esquinas' }
    ]);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = (event) => {
            setTimeout(() => {
                const newMemory = {
                    id: Date.now(),
                    type: activeTab, // Usa el tab actual o por defecto galeria
                    url: event.target.result,
                    title: file.name,
                    from: 'Yo - Vecino Smart'
                };
                setMemories([newMemory, ...memories]);
                setIsUploading(false);
                alert('¡Recuerdo subido exitosamente a la Red Smart de La Serena!');
            }, 1500);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60000, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{ padding: '1rem 2rem', background: '#0f172a', borderBottom: '2px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Heart size={36} color="#38bdf8" />
                    <div>
                        <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '1.8rem', letterSpacing: '1px' }}>Momentos del Recuerdo únicos</h2>
                        <p style={{ margin: '0.2rem 0 0 0', color: '#bae6fd' }}>Sube fotos, videos y portadas de diarios o revistas.</p>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                    <X size={20} /> CERRAR PORTAL
                </button>
            </header>

            {/* Content */}
            <div style={{ flex: 1, padding: '2rem', display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%', overflowY: 'auto', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>

                {/* Upload Section */}
                <div style={{ width: window.innerWidth < 768 ? '100%' : '350px', background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'max-content' }}>
                    <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Upload size={24} color="#38bdf8" /> Inmortalizar Recuerdo
                    </h3>

                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*,video/*" onChange={handleFileUpload} />

                    <button style={{ background: 'rgba(56, 189, 248, 0.1)', border: '2px dashed #0ea5e9', padding: '2.5rem 1rem', borderRadius: '12px', color: '#7dd3fc', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}
                        onClick={() => fileInputRef.current?.click()}>
                        {isUploading ? (
                            <div style={{ animation: 'pulse 1.5s infinite' }}>Subiendo a la Nube Segura...</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <Camera size={48} color="#0ea5e9" style={{ marginBottom: '1rem' }} />
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Sube tu Archivo Aquí</span>
                                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Soporta .jpg, .png, .mp4, .pdf</span>
                            </div>
                        )}
                    </button>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button className="btn-glass" style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #334155', background: 'rgba(0,0,0,0.4)', color: '#ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <ImageIcon size={18} /> Fotos
                        </button>
                        <button className="btn-glass" style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #334155', background: 'rgba(0,0,0,0.4)', color: '#ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Video size={18} /> Videos
                        </button>
                        <button className="btn-glass" style={{ flex: '1 1 100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #334155', background: 'rgba(0,0,0,0.4)', color: '#ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <FileText size={18} /> Portadas Historicas
                        </button>
                    </div>
                </div>

                {/* Feed Section */}
                <div style={{ flex: 1, background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h3 style={{ margin: 0, color: 'white', fontSize: '1.5rem' }}>Línea de Tiempo Vecinal</h3>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => setActiveTab('galeria')} style={{ padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', background: activeTab === 'galeria' ? '#0ea5e9' : 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Galería Local</button>
                            <button onClick={() => setActiveTab('prensa')} style={{ padding: '0.5rem 1rem', borderRadius: '50px', border: 'none', background: activeTab === 'prensa' ? '#0ea5e9' : 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Portadas</button>
                        </div>
                    </div>

                    {activeTab === 'galeria' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            {memories.filter(m => m.type === 'galeria').map(m => (
                                <div key={m.id} style={{ background: '#0f172a', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', padding: '1rem' }}>
                                    <div style={{ height: '180px', background: `url(${m.url}) center/cover`, borderRadius: '8px', marginBottom: '1rem' }}></div>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>{m.title}</h4>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Compartido por {m.from}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'prensa' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ width: '150px', height: '200px', background: '#cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>
                                    [PORTADA EL DÍA 1980]
                                </div>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', fontSize: '1.3rem' }}>Diario El Día - Inauguración La Recova</h4>
                                    <p style={{ margin: '0 0 1rem 0', color: '#cbd5e1', lineHeight: '1.5' }}>Un día histórico para el turismo y comercio de la zona. Se inaugura la nueva infraestructura de La Recova. Un patrimonio arquitectónico inigualable.</p>
                                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Aportado por: Archivo Municipal</span>
                                </div>
                            </div>

                            {memories.filter(m => m.type === 'prensa').map(m => (
                                <div key={m.id} style={{ display: 'flex', gap: '1.5rem', background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <div style={{ width: '150px', height: '200px', background: `url(${m.url}) center/cover`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 'bold', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>
                                    </div>
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', fontSize: '1.3rem' }}>{m.title}</h4>
                                        <p style={{ margin: '0 0 1rem 0', color: '#cbd5e1', lineHeight: '1.5' }}>Recuerdo aportado en esta pestaña.</p>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Aportado por: {m.from}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
