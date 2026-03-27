import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Ticket, Newspaper, Save, Plus, Edit3, Trash2, 
    CheckCircle, AlertTriangle, Search, Filter, 
    ArrowRight, Settings, Database, Code, Eye
} from 'lucide-react';

export default function NewsAndCodesManager({ onClose }) {
    const [activeTab, setActiveTab] = useState('codes'); // 'codes' or 'news'
    const [searchTerm, setSearchTerm] = useState('');
    
    // --- Codes Management ---
    const [promoCodes, setPromoCodes] = useState([]);
    const [editingCode, setEditingCode] = useState(null);
    
    // --- News Management ---
    const [newsItems, setNewsItems] = useState([]);
    const [editingNews, setEditingNews] = useState(null);
    
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Load Codes
        const savedCodes = localStorage.getItem('vls_promo_codes');
        if (savedCodes) {
            setPromoCodes(JSON.parse(savedCodes));
        } else {
            const defaults = [
                { id: 1, code: 'SERENITO2026', type: 'fichas', value: 1000, description: 'Bono bienvenida Serenito', active: true },
                { id: 2, code: 'PUERTASMART', type: 'discount', value: 20, description: 'Descuento 20% PuertaSmart', active: true },
                { id: 3, code: 'VECINOSMART', type: 'fichas', value: 500, description: 'Pack Vecino Smart', active: true },
                { id: 4, code: 'COQUISMART', type: 'discount', value: 15, description: 'Descuento 15% Coqui', active: true },
                { id: 5, code: 'RDMLS2026', type: 'fichas', value: 2000, description: 'Premium RDMLS', active: true },
                { id: 6, code: 'FARO_IA', type: 'discount', value: 30, description: 'Descuento Centinel Faro', active: true },
                { id: 7, code: 'MASTER_VLS', type: 'fichas', value: 5000, description: 'Admin Master Fichas', active: true },
                { id: 8, code: 'VECINOS_VIP', type: 'discount', value: 50, description: 'Beneficio VIP', active: true },
                { id: 9, code: 'SMART_LS', type: 'fichas', value: 250, description: 'Social Pack', active: true },
                { id: 10, code: 'VLS_PRIME', type: 'discount', value: 10, description: 'Descuento Prime', active: true },
            ];
            setPromoCodes(defaults);
            localStorage.setItem('vls_promo_codes', JSON.stringify(defaults));
        }

        // Load News
        const savedNews = localStorage.getItem('vls_published_news');
        if (savedNews) {
            setNewsItems(JSON.parse(savedNews));
        } else {
            const defaults = [
                { id: 'n1', title: 'La Gran Paradoja del 2026', template: 'Investigacion', impact: 'High', status: 'published', date: '2026-03-24', author: 'VLS Intelligence' },
                { id: 'n2', title: 'El Espejismo Americano de Quiroz', template: 'Bencinazo', impact: 'Medium', status: 'published', date: '2026-03-24', author: 'Economía VLS' },
                { id: 'n3', title: 'El Dilema de la Vivienda', template: 'Poduje', impact: 'Medium', status: 'published', date: '2026-03-24', author: 'Vivienda Smart' },
                { id: 'n4', title: 'Inauguración Nodo Industrial', template: 'Standard', impact: 'Low', status: 'draft', date: '2026-03-25', author: 'Cultura VLS' },
            ];
            setNewsItems(defaults);
            localStorage.setItem('vls_published_news', JSON.stringify(defaults));
        }
    }, []);

    const saveCodes = (updated) => {
        setPromoCodes(updated);
        localStorage.setItem('vls_promo_codes', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('promo-codes-updated'));
        triggerSuccess();
    };

    const saveNews = (updated) => {
        setNewsItems(updated);
        localStorage.setItem('vls_published_news', JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent('news-catalogo-updated'));
        triggerSuccess();
    };

    const triggerSuccess = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleUpdateCode = (e) => {
        e.preventDefault();
        const updated = promoCodes.map(c => c.id === editingCode.id ? editingCode : c);
        saveCodes(updated);
        setEditingCode(null);
    };

    const handleUpdateNews = (e) => {
        e.preventDefault();
        const updated = newsItems.map(n => n.id === editingNews.id ? editingNews : n);
        saveNews(updated);
        setEditingNews(null);
    };

    const handleCreateNews = () => {
        const newItem = {
            id: 'n' + Date.now(),
            title: 'Nueva Noticia',
            template: 'Standard',
            impact: 'Low',
            status: 'draft',
            date: new Date().toISOString().split('T')[0],
            author: 'Admin'
        };
        const updated = [newItem, ...newsItems];
        saveNews(updated);
        setEditingNews(newItem);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: "'Inter', system-ui, sans-serif"
        }}>
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    width: '95%',
                    maxWidth: '1200px',
                    height: '90vh',
                    background: '#0f172a',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                }}
            >
                {/* Header Container */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ 
                            background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                            padding: '0.8rem',
                            borderRadius: '12px',
                            color: '#000'
                        }}>
                            <Settings size={28} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.5px' }}>
                                Backoffice Desk <span style={{ color: '#fbbf24' }}>/ Master Admin</span>
                            </h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Gestión centralizada de beneficios y catálogo multimedia</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        color: '#ef4444',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}><X size={20} /></button>
                </div>

                {/* Tabs & Search */}
                <div style={{
                    padding: '1rem 2rem',
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                            onClick={() => setActiveTab('codes')}
                            style={{
                                padding: '0.7rem 1.5rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: activeTab === 'codes' ? '#fbbf24' : 'transparent',
                                color: activeTab === 'codes' ? '#000' : '#94a3b8',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Ticket size={18} /> Códigos Maestro
                        </button>
                        <button 
                            onClick={() => setActiveTab('news')}
                            style={{
                                padding: '0.7rem 1.5rem',
                                borderRadius: '12px',
                                border: 'none',
                                background: activeTab === 'news' ? '#fbbf24' : 'transparent',
                                color: activeTab === 'news' ? '#000' : '#94a3b8',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <Newspaper size={18} /> Catálogo Noticias
                        </button>
                    </div>

                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input 
                            type="text" 
                            placeholder="Buscar registros..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                background: '#1e293b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                {/* Main Content Scroll Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'codes' ? (
                            <motion.div 
                                key="codes"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}
                            >
                                {promoCodes.filter(c => c.code.toLowerCase().includes(searchTerm.toLowerCase())).map(code => (
                                    <div key={code.id} style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '20px',
                                        padding: '1.5rem',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div>
                                                <code style={{ fontSize: '1.2rem', color: '#fbbf24', fontWeight: '900', background: 'rgba(251,191,36,0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                                                    {code.code}
                                                </code>
                                                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                                    {code.description}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => setEditingCode(code)}
                                                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Beneficio</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                                    {code.type === 'fichas' ? `+${code.value} Fichas` : `${code.value}% Descuento`}
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Estado</div>
                                                <div style={{ color: code.active ? '#10b981' : '#ef4444', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {code.active ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                                                    {code.active ? 'Activo' : 'Pausado'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="news"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                                    <button 
                                        onClick={handleCreateNews}
                                        style={{ background: '#10b981', border: 'none', color: 'black', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <Plus size={20} /> CREAR NUEVA PUBLICACIÓN
                                    </button>
                                </div>

                                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                    <thead>
                                        <tr style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            <th style={{ textAlign: 'left', padding: '1rem' }}>Titular / Identificador</th>
                                            <th style={{ textAlign: 'center', padding: '1rem' }}>Plantilla</th>
                                            <th style={{ textAlign: 'center', padding: '1rem' }}>Impacto</th>
                                            <th style={{ textAlign: 'center', padding: '1rem' }}>Estado</th>
                                            <th style={{ textAlign: 'right', padding: '1rem' }}>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newsItems.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                                            <tr key={item.id} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px' }}>
                                                <td style={{ padding: '1.2rem', borderRadius: '15px 0 0 15px' }}>
                                                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{item.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.id} • {item.author} • {item.date}</div>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '1rem' }}>
                                                    <span style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                        {item.template}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '1rem' }}>
                                                    <span style={{ 
                                                        color: item.impact === 'High' ? '#ef4444' : item.impact === 'Medium' ? '#fbbf24' : '#94a3b8',
                                                        fontWeight: '900',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        {item.impact}
                                                    </span>
                                                </td>
                                                <td style={{ textAlign: 'center', padding: '1rem' }}>
                                                    <div style={{ 
                                                        display: 'inline-flex', 
                                                        alignItems: 'center', 
                                                        gap: '6px',
                                                        color: item.status === 'published' ? '#10b981' : '#64748b',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.status === 'published' ? '#10b981' : '#64748b' }} />
                                                        {item.status === 'published' ? 'Publicado' : 'Borrador'}
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'right', padding: '1rem', borderRadius: '0 15px 15px 0' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                        <button 
                                                            style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                                            title="Previsualizar"
                                                            onClick={() => alert('Previsualizando ' + item.template)}
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => setEditingNews(item)}
                                                            style={{ background: 'rgba(251,191,36,0.1)', border: 'none', color: '#fbbf24', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                                            title="Editar"
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status Indicator */}
                <div style={{ padding: '0.5rem 2rem', background: '#000', fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Conectado a CORE_SQL_REPLICA: LocalStorage</span>
                    <span>VLS Maestro v4.2.0</span>
                </div>
            </motion.div>

            {/* Modal: Editar Código */}
            {editingCode && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <form onSubmit={handleUpdateCode} className="glass-panel" style={{ width: '400px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #fbbf24' }}>
                        <h3 style={{ margin: 0, color: '#fbbf24' }}>Editar Código Maestro</h3>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Código (Key)</label>
                            <input 
                                type="text" 
                                className="input-base" 
                                style={{ width: '100%', textTransform: 'uppercase' }}
                                value={editingCode.code}
                                onChange={e => setEditingCode({...editingCode, code: e.target.value.toUpperCase()})}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Tipo</label>
                                <select 
                                    className="input-base" 
                                    style={{ width: '100%', appearance: 'auto' }}
                                    value={editingCode.type}
                                    onChange={e => setEditingCode({...editingCode, type: e.target.value})}
                                >
                                    <option value="fichas">Fichas VLS</option>
                                    <option value="discount">Descuento (%)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Valor</label>
                                <input 
                                    type="number" 
                                    className="input-base" 
                                    style={{ width: '100%' }}
                                    value={editingCode.value}
                                    onChange={e => setEditingCode({...editingCode, value: Number(e.target.value)})}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Descripción</label>
                            <input 
                                type="text" 
                                className="input-base" 
                                style={{ width: '100%' }}
                                value={editingCode.description}
                                onChange={e => setEditingCode({...editingCode, description: e.target.value})}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input 
                                type="checkbox" 
                                checked={editingCode.active}
                                onChange={e => setEditingCode({...editingCode, active: e.target.checked})}
                            />
                            <label>Habilitado para usuarios</label>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="button" onClick={() => setEditingCode(null)} style={{ flex: 1, padding: '0.8rem', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Cancelar</button>
                            <button type="submit" style={{ flex: 1, padding: '0.8rem', background: '#fbbf24', border: 'none', borderRadius: '8px', color: 'black', fontWeight: '900', cursor: 'pointer' }}>Guardar Cambios</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal: Editar Noticia */}
            {editingNews && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <form onSubmit={handleUpdateNews} className="glass-panel" style={{ width: '500px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #10b981' }}>
                        <h3 style={{ margin: 0, color: '#10b981' }}>Editor de Publicaciones</h3>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Titular Principal</label>
                            <input 
                                type="text" 
                                className="input-base" 
                                style={{ width: '100%' }}
                                value={editingNews.title}
                                onChange={e => setEditingNews({...editingNews, title: e.target.value})}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Plantilla Estructural</label>
                                <select 
                                    className="input-base" 
                                    style={{ width: '100%', appearance: 'auto' }}
                                    value={editingNews.template}
                                    onChange={e => setEditingNews({...editingNews, template: e.target.value})}
                                >
                                    <option value="Investigacion">Investigación (High Impact)</option>
                                    <option value="Bencinazo">Bencinazo Style (Dark)</option>
                                    <option value="Poduje">Structural (White)</option>
                                    <option value="Standard">Short / Local</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem' }}>Estado</label>
                                <select 
                                    className="input-base" 
                                    style={{ width: '100%', appearance: 'auto' }}
                                    value={editingNews.status}
                                    onChange={e => setEditingNews({...editingNews, status: e.target.value})}
                                >
                                    <option value="published">Publicado</option>
                                    <option value="draft">Borrador</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="button" onClick={() => setEditingNews(null)} style={{ flex: 1, padding: '0.8rem', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Cerrar</button>
                            <button type="submit" style={{ flex: 1, padding: '0.8rem', background: '#10b981', border: 'none', borderRadius: '8px', color: 'black', fontWeight: '900', cursor: 'pointer' }}>Guardar y Sincronizar</button>
                        </div>
                    </form>
                </div>
            )}

            {showSuccess && (
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        background: '#10b981',
                        color: 'black',
                        padding: '1rem 2rem',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        zIndex: 1000000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <CheckCircle size={20} /> Base de datos actualizada con éxito
                </motion.div>
            )}
        </div>
    );
}
