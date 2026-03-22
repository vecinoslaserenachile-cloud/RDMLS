import React, { useState } from 'react';
import MediaUploader from './MediaUploader';
import Vls3DLab from './Vls3DLab';
import StickerManager from './StickerManager';
import { KanbanSquare, Folder, Upload, Eye, Columns, Box, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function DesignTab() {
    const [subTab, setSubTab] = useState('kanban'); // kanban, 3d, stickers
    const [kanbanTasks, setKanbanTasks] = useState([
        { id: 2, note: 'Balance de Turismo', source: 'Prensa', desc: 'Banners en resolución 1080x1080 y animado 1920x1080.', priority: 'Alta', status: 'por-hacer' },
        { id: 4, note: 'Promo Podcast Serenito', source: 'Marketing', desc: 'Video Reels 15s con modelado 3D de Serenito cantando.', priority: 'Media', status: 'en-proceso' },
        { id: 5, note: 'Infografía Seguridad', source: 'Prensa', desc: 'Resumen anual de decomisos Faro.', priority: 'Baja', status: 'terminado' }
    ]);

    const advanceTask = (taskId, currentStatus) => {
        const nextStatus = {
            'por-hacer': 'en-proceso',
            'en-proceso': 'terminado',
            'terminado': 'por-hacer'
        };
        setKanbanTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: nextStatus[currentStatus] } : t));
    };

    const getPriorityColor = (prior) => {
        if (prior === 'Alta') return '#ef4444';
        if (prior === 'Media') return '#f59e0b';
        return '#10b981';
    };

    const StatusLane = ({ title, status, color }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: `1px solid ${color}30` }}>
            <h4 style={{ color: color, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: `1px solid ${color}30`, paddingBottom: '0.5rem', marginBottom: '0.5rem', fontSize: '1rem' }}>
                <KanbanSquare size={16} /> {title}
            </h4>
            {kanbanTasks.filter(t => t.status === status).map(task => (
                <div key={task.id} onClick={() => advanceTask(task.id, task.status)} className="glass-panel" style={{ padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'} title="Clic para avanzar etapa">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: `${getPriorityColor(task.priority)}20`, color: getPriorityColor(task.priority), fontWeight: 'bold' }}>{task.priority}</span>
                        <span style={{ fontSize: '0.75rem', color: '#00e5ff' }}>#{task.id}</span>
                    </div>
                    <strong style={{ color: 'white', fontSize: '0.95rem' }}>{task.note}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{task.desc}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
                        Ref: {task.source}
                    </div>
                </div>
            ))}
        </div>
    );

    const handleMediaUpload = (files) => {
        console.log("Archivos subidos a Media Center", files);
        alert(`Media Center: ${files.length} archivo(s) listos para integrar.`);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Sub-Tabs de Herramientas Creativas */}
            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button 
                    onClick={() => setSubTab('kanban')}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', background: subTab === 'kanban' ? 'rgba(236,72,153,0.1)' : 'transparent', border: subTab === 'kanban' ? '1px solid #ec4899' : '1px solid transparent', color: subTab === 'kanban' ? 'white' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold' }}
                >
                    <Columns size={18} /> Planificación Media
                </button>
                <button 
                    onClick={() => setSubTab('3d')}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', background: subTab === '3d' ? 'rgba(192,132,252,0.1)' : 'transparent', border: subTab === '3d' ? '1px solid #c084fc' : '1px solid transparent', color: subTab === '3d' ? 'white' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold' }}
                >
                    <Box size={18} /> VLS 3D Character Lab
                </button>
                <button 
                    onClick={() => setSubTab('stickers')}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', background: subTab === 'stickers' ? 'rgba(0,229,255,0.1)' : 'transparent', border: subTab === 'stickers' ? '1px solid #00e5ff' : '1px solid transparent', color: subTab === 'stickers' ? 'white' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 'bold' }}
                >
                    <ImageIcon size={18} /> Stickers & Colecciones
                </button>
            </div>

            {/* Repositorio de Marca Rápido */}
            {subTab === 'kanban' && (
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', overflowX: 'auto', border: '1px solid #3b82f6', alignItems: 'center' }}>
                    <h4 style={{ color: '#3b82f6', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem', borderRight: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap' }}>
                        <Folder size={20} /> Marca Oficial
                    </h4>
                    {['Modelo Serenito 3D Humanizado', 'Campaña Cursos de Inglés', 'Logo VecinoSmart Vector', 'Audio RDMLS Intros'].map(folder => (
                        <button key={folder} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd', whiteSpace: 'nowrap', borderRadius: '8px', fontSize: '0.85rem' }}>
                            <Eye size={16} /> {folder}
                        </button>
                    ))}
                </div>
            )}

            {/* Contenido Dinámico según Tab */}
            <div style={{ minHeight: '500px' }}>
                {subTab === 'kanban' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 2fr)', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(0,229,255,0.3)' }}>
                            <h3 style={{ color: '#00e5ff', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                <Upload size={22} /> Media Center (Upload)
                            </h3>
                            <MediaUploader onMediaUpload={handleMediaUpload} />
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', border: '1px solid rgba(236,72,153,0.3)' }}>
                            <h3 style={{ color: '#ec4899', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                                <Columns size={22} /> Kanban de Requerimientos Media
                            </h3>
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                                <StatusLane title="Por Hacer" status="por-hacer" color="#ef4444" />
                                <StatusLane title="En Proceso" status="en-proceso" color="#f59e0b" />
                                <StatusLane title="Terminado" status="terminado" color="#10b981" />
                            </div>
                        </div>
                    </div>
                )}

                {subTab === '3d' && (
                    <div className="animate-slide-up">
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                <Sparkles color="#c084fc" /> VLS 3D Character Lab
                            </h2>
                            <span style={{ color: '#c084fc', fontSize: '0.8rem', fontWeight: 'bold' }}>POWERED BY TRIPO AI ENGINE</span>
                        </div>
                        <Vls3DLab />
                    </div>
                )}

                {subTab === 'stickers' && (
                    <div className="animate-slide-up">
                        <StickerManager />
                    </div>
                )}
            </div>

        </div>
    );
}
