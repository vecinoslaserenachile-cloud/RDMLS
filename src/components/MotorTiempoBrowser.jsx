import React, { useState } from 'react';
import { 
    Search, History, MapPin, Calendar, 
    Camera, Play, Layout, Grid, RefreshCw, 
    Image as ImageIcon, Share2, Download,
    ArrowRight, Clock, Map, Sparkles
} from 'lucide-react';

/**
 * 🕰️ MOTOR DEL TIEMPO VLS 2026
 * Conexión con Archivo Histórico de X (@vecinoslaserena)
 * Inyecta texturas dinámicas en el Paseo Histórico 3D.
 */
const MotorTiempoBrowser = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState({ year: '2026', sector: '', keywords: '' });
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        // Simulación de búsqueda en API de X (8.000 posts de @vecinoslaserena)
        setTimeout(() => {
            setResults([
                { id: 1, text: "Recuperación de fachada en Casa Piñera. Registro histórico @vecinoslaserena", image: "https://pbs.twimg.com/media/GH8c4w_WIAAQ9Vw?format=jpg&name=large", date: "10 de Marzo, 2026" },
                { id: 2, text: "Operativo de limpieza en Sector Puertas del Mar. #VLS #LaSerena", image: "https://pbs.twimg.com/media/GFu9M2BXwAAv9B8?format=jpg&name=large", date: "12 de Marzo, 2026" },
                { id: 3, text: "Vista satelital del humedal río Elqui. Datos monitoreados por IA Faro.", image: "https://pbs.twimg.com/media/GE8Xy_BXEAAYi6z?format=jpg&name=large", date: "15 de Marzo, 2026" },
                { id: 4, text: "Registro de baches reportados en Av. del Mar. Gestión Vecinal.", image: "https://pbs.twimg.com/media/GDUXy-BX0AA8Y9B?format=jpg&name=large", date: "16 de Marzo, 2026" }
            ]);
            setIsSearching(false);
        }, 1500);
    };

    const inyectarPaseo3D = () => {
        alert("🖼️ PROCESANDO TEXTURAS: Inyectando medios históricos rescatados de @vecinoslaserena en las columnas del Paseo Histórico 3D...");
        onClose();
        window.dispatchEvent(new CustomEvent('open-3d-walk'));
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300000, background: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '1000px', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', height: '100%', maxHeight: '800px' }}>
                
                {/* Lateral Control (Bus Temporal Frontal) */}
                <aside style={{ width: '400px', background: 'rgba(15, 23, 42, 0.8)', padding: '3rem', borderRight: '1px solid rgba(56, 189, 248, 0.1)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '10px', background: '#38bdf820', borderRadius: '12px', border: '1px solid #38bdf8' }}>
                            <History color="#38bdf8" size={32} />
                        </div>
                        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900', color: 'white', letterSpacing: '2px' }}>MOTOR DEL TIEMPO VLS</h1>
                    </div>

                    <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={labelStyle}><Calendar size={14} /> AÑO / ÉPOCA</label>
                            <input 
                                type="text" 
                                placeholder="Ej: 1980, 1950, Actual..." 
                                style={inputStyle} 
                                value={searchQuery.year}
                                onChange={(e) => setSearchQuery({ ...searchQuery, year: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}><MapPin size={14} /> CALLE / SECTOR</label>
                            <input 
                                type="text" 
                                placeholder="Ej: Balmaceda, Cuatro Esquinas..." 
                                style={inputStyle}
                                value={searchQuery.sector}
                                onChange={(e) => setSearchQuery({ ...searchQuery, sector: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}><Search size={14} /> PALABRA CLAVE</label>
                            <input 
                                type="text" 
                                placeholder="Ej: Playa, C5, Serenito..." 
                                style={inputStyle}
                                value={searchQuery.keywords}
                                onChange={(e) => setSearchQuery({ ...searchQuery, keywords: e.target.value })}
                            />
                        </div>

                        <button type="submit" disabled={isSearching} className="btn-primary" style={{ marginTop: '1rem', padding: '1.2rem', borderRadius: '16px', background: '#38bdf8', color: '#020617', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            {isSearching ? <RefreshCw className="animate-spin" /> : <><Sparkles size={18} /> CONSULTAR ARCHIVO X</>}
                        </button>
                    </form>

                    <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.4' }}>
                            * El Motor del Tiempo recupera automáticamente medios del feed histórico de <strong>@vecinoslaserena</strong> para popular el entorno 3D con datos reales.
                        </p>
                    </div>
                </aside>

                {/* Results Panel */}
                <section style={{ flex: 1, padding: '3rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8' }}>RESULTADOS DEL ARCHIVO</h2>
                        <button onClick={onClose} style={{ transform: 'none', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '10px' }}>CERRAR MOTOR</button>
                    </div>

                    {results.length === 0 ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#475569', textAlign: 'center' }}>
                            <Search size={64} style={{ marginBottom: '1.5rem', opacity: 0.3 }} />
                            <p style={{ fontSize: '1.1rem' }}>Inicia una búsqueda temporal para rescatar medios históricos.</p>
                        </div>
                    ) : (
                        <div className="fade-in">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                {results.map(res => (
                                    <div key={res.id} className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                                        <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                                            <img src={res.image} alt={res.text} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(2,6,23,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem' }}>
                                                <Clock size={10} style={{marginRight: '4px'}} /> {res.date}
                                            </div>
                                        </div>
                                        <div style={{ padding: '1rem' }}>
                                            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 'bold' }}>{res.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={inyectarPaseo3D} className="btn-primary" style={{ marginTop: '2.5rem', width: '100%', padding: '1.5rem', borderRadius: '20px', background: 'transparent', border: '2px solid #38bdf8', color: '#38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', cursor: 'pointer' }}>
                                <Layout size={24} /> INYECTAR MEDIOS RESCATADOS EN PASEO HISTÓRICO 3D
                            </button>
                        </div>
                    )}
                </section>
            </div>

            <style>{`
                .glass-panel {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .btn-primary:hover {
                    box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
                    transform: scale(1.02);
                }
                .label-style {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.75rem;
                    font-weight: 900;
                    color: #38bdf8;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.75rem',
    fontWeight: '900',
    color: '#38bdf8',
    marginBottom: '8px',
    letterSpacing: '1px'
};

const inputStyle = {
    width: '100%',
    padding: '0.9rem',
    background: 'rgba(2, 6, 23, 0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.9rem'
};

export default MotorTiempoBrowser;
