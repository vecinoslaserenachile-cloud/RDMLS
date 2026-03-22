import React, { useState } from 'react';
import { 
    FileText, Layout, Table as TableIcon, Download, Upload, 
    Sparkles, Save, FileType, Plus, Trash2, Maximize2, 
    Share2, Presentation, Wand2, Monitor
} from 'lucide-react';

export default function VecinofficeTab() {
    const [officeTab, setOfficeTab] = useState('docs'); // docs, sheets, slides
    const [docContent, setDocContent] = useState('');
    const [rows, setRows] = useState([
        ['ID', 'Nombre', 'Departamento', 'Estado'],
        ['101', 'Juan Pérez', 'Comunicaciones', 'Activo'],
        ['102', 'Ma. Soto', 'Prensa', 'En Proceso'],
        ['103', 'R. Galdames', 'C5', 'Validado']
    ]);
    const [slides, setSlides] = useState([
        { id: 1, title: 'Presentación Smart City 2026', content: 'Introducción a los pilares estratégicos.', layout: 'Title' },
        { id: 2, title: 'Smart Citizens', content: 'Despliegue de red vecinal y C5.', layout: 'Content' }
    ]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleImport = () => {
        alert("Vecinoffice: Importador Inteligente Activado. Analizando archivos locales...");
    };

    const handleExport = (format) => {
        alert(`Vecinoffice: Exportando archivo en formato .${format}. Generando firma digital VLS...`);
    };

    const handleAIDecision = () => {
        alert("Sentinel Design: Optimizando estructura y paleta de colores mediante IA...");
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Header Vecinoffice */}
            <div className="glass-panel" style={{ padding: '1.5rem 2rem', border: '1px solid rgba(16, 185, 129, 0.4)', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(0,0,0,0.5) 100%)', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: '#10b981', padding: '0.8rem', borderRadius: '15px' }}>
                        <Monitor size={30} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, color: 'white', fontSize: '1.6rem', fontWeight: 'bold' }}>Vecinoffice Suite</h2>
                        <p style={{ margin: 0, color: '#10b981', fontSize: '0.9rem', fontWeight: 'bold' }}>Productividad Institucional • Beta 2026</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                    <button onClick={handleImport} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
                        <Upload size={18} /> Importar
                    </button>
                    <button onClick={() => handleExport('pdf')} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b' }}>
                        <Download size={18} /> Exportar PDF
                    </button>
                    <button className="btn-primary" style={{ background: '#10b981', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Save size={18} /> Guardar en Nube VLS
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.4)', padding: '0.6rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <button 
                    onClick={() => setOfficeTab('docs')}
                    style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: officeTab === 'docs' ? 'rgba(56, 189, 248, 0.15)' : 'transparent', border: officeTab === 'docs' ? '1px solid #38bdf8' : '1px solid transparent', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', fontWeight: 'bold', transition: '0.3s' }}
                >
                    <FileText size={20} color={officeTab === 'docs' ? '#38bdf8' : '#94a3b8'} /> Smart Docs
                </button>
                <button 
                    onClick={() => setOfficeTab('sheets')}
                    style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: officeTab === 'sheets' ? 'rgba(16, 185, 129, 0.15)' : 'transparent', border: officeTab === 'sheets' ? '1px solid #10b981' : '1px solid transparent', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', fontWeight: 'bold', transition: '0.3s' }}
                >
                    <TableIcon size={20} color={officeTab === 'sheets' ? '#10b981' : '#94a3b8'} /> VLS Sheets
                </button>
                <button 
                    onClick={() => setOfficeTab('slides')}
                    style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: officeTab === 'slides' ? 'rgba(245, 158, 11, 0.15)' : 'transparent', border: officeTab === 'slides' ? '1px solid #f59e0b' : '1px solid transparent', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', fontWeight: 'bold', transition: '0.3s' }}
                >
                    <Presentation size={20} color={officeTab === 'slides' ? '#f59e0b' : '#94a3b8'} /> Slide Builder
                </button>
            </div>

            {/* Main Content Area */}
            <div className="glass-panel" style={{ minHeight: '600px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', background: 'rgba(0,0,0,0.3)', position: 'relative' }}>
                
                {/* DOCS EDITOR */}
                {officeTab === 'docs' && (
                    <div className="animate-slide-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: '#38bdf8', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FileText size={22} /> Editor de Documentos Institucionales
                            </h3>
                            <button onClick={() => setDocContent('Borrador generado por IA: La Serena se posiciona como referente nacional en gestión 100% digital...')} className="btn-glass" style={{ color: '#ec4899', borderColor: '#ec4899' }}>
                                <Sparkles size={16} /> Redactar con Sentinel IA
                            </button>
                        </div>
                        <div style={{ background: '#fff', borderRadius: '12px', padding: '3rem', minHeight: '500px', color: '#333', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
                             <textarea 
                                value={docContent}
                                onChange={e => setDocContent(e.target.value)}
                                placeholder="Escribe aquí tu informe, carta o minuta..."
                                style={{ width: '100%', height: '100%', minHeight: '400px', border: 'none', outline: 'none', fontSize: '1.1rem', fontFamily: 'serif', lineHeight: '1.6', background: 'transparent' }}
                             />
                        </div>
                    </div>
                )}

                {/* SHEETS GRID */}
                {officeTab === 'sheets' && (
                    <div className="animate-slide-up" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: '#10b981', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <TableIcon size={22} /> Planilla de Gestión de Datos
                            </h3>
                            <button onClick={handleAIDecision} className="btn-glass" style={{ color: '#10b981', borderColor: '#10b981' }}>
                                <Wand2 size={16} /> Analizar Tendencias (Sentinel)
                            </button>
                        </div>
                        <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                <thead>
                                    <tr>
                                        {rows[0].map((col, idx) => (
                                            <th key={idx} style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.1)' }}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.slice(1).map((row, rIdx) => (
                                        <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} style={{ padding: '0.8rem 1rem' }}>
                                                    <input 
                                                        defaultValue={cell} 
                                                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }} 
                                                        onBlur={(e) => {
                                                            const newRows = [...rows];
                                                            newRows[rIdx+1][cIdx] = e.target.value;
                                                            setRows(newRows);
                                                        }}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={() => setRows([...rows, ['', '', '', '']])} className="btn-glass" style={{ margin: '1rem', width: 'calc(100% - 2rem)', borderStyle: 'dashed' }}>
                                <Plus size={16} /> Agregar Fila
                            </button>
                        </div>
                    </div>
                )}

                {/* SLIDES BUILDER */}
                {officeTab === 'slides' && (
                    <div className="animate-slide-up" style={{ height: '100%', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                        {/* Sidebar Slides */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '1rem' }}>
                            {slides.map((slide, idx) => (
                                <div 
                                    key={slide.id} 
                                    onClick={() => setCurrentSlide(idx)}
                                    style={{ 
                                        padding: '1rem', borderRadius: '12px', background: currentSlide === idx ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.05)', 
                                        border: currentSlide === idx ? '1px solid #f59e0b' : '1px solid transparent', cursor: 'pointer', transition: '0.3s' 
                                    }}
                                >
                                    <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 'bold' }}>SLIDE {idx + 1}</span>
                                    <strong style={{ display: 'block', color: 'white', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{slide.title}</strong>
                                </div>
                            ))}
                            <button onClick={() => setSlides([...slides, { id: Date.now(), title: 'Nueva Lámina', content: 'Contenido...', layout: 'Content' }])} className="btn-glass" style={{ padding: '1rem', borderStyle: 'dashed' }}>
                                <PlusCircle size={18} /> Nueva Diapositiva
                            </button>
                        </div>

                        {/* Slide Viewport */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ color: '#f59e0b', margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Presentation size={22} /> Presentación Estratégica
                                </h3>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={handleAIDecision} className="btn-glass" style={{ color: '#f59e0b', borderColor: '#f59e0b' }}><Wand2 size={16} /> Estilo IA</button>
                                    <button className="btn-glass" style={{ color: '#ec4899', borderColor: '#ec4899' }}><Maximize2 size={16} /> Iniciar Presentación</button>
                                </div>
                            </div>
                            
                            <div style={{ flex: 1, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '16px', border: '4px solid #f59e0b', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'linear-gradient(90deg, #f59e0b, #ec4899)' }}></div>
                                <input 
                                    value={slides[currentSlide].title} 
                                    onChange={(e) => {
                                        const newSlides = [...slides];
                                        newSlides[currentSlide].title = e.target.value;
                                        setSlides(newSlides);
                                    }}
                                    style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '3rem', fontWeight: '900', textAlign: 'center', outline: 'none', marginBottom: '2rem' }} 
                                />
                                <textarea 
                                    value={slides[currentSlide].content} 
                                    onChange={(e) => {
                                        const newSlides = [...slides];
                                        newSlides[currentSlide].content = e.target.value;
                                        setSlides(newSlides);
                                    }}
                                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.5rem', textAlign: 'center', outline: 'none', resize: 'none' }} 
                                />
                                <div style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.3 }}>
                                    <img src="/logo-smartls-v3.png" style={{ height: '30px' }} alt="VLS" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Designer Footer */}
            <div className="glass-panel" style={{ padding: '1rem 2rem', border: '1px solid rgba(168, 85, 247, 0.3)', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Sparkles size={20} color="#a855f7" className="pulse-slow" />
                    <span style={{ color: '#a855f7', fontWeight: 'bold', fontSize: '0.9rem' }}>Sentinel Designer API v4.2 Activa: Entorno de trabajo optimizado para reducir fatiga visual.</span>
                </div>
                <button className="btn-glass" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem' }}><Share2 size={14} /> Colaborar en VLS Teams</button>
            </div>

        </div>
    );
}
