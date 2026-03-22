import React, { useState } from 'react';
import { X, Globe, ExternalLink, Shield, TrendingUp, Users, Landmark, Search, Sparkles } from 'lucide-react';

const COUNTRIES_DATA = [
    { 
        id: 'cl', name: "Chile", leader: "Presidencia de la República", relation: "Sede Central", 
        info: "Nuestra nación, con La Serena como nodo estratégico de Smart Comuna en la era de la IA.", 
        flag: "🇨🇱", wiki: "https://es.wikipedia.org/wiki/Chile", 
        stats: { pop: "20.3M", gdp: "355B", status: "Excelente" }
    },
    { 
        id: 'ar', name: "Argentina", leader: "Javier Milei", relation: "Socio Estratégico", 
        info: "País vecino con fuertes lazos comerciales y culturales, impulsando el Corredor Bioceánico.", 
        flag: "🇦🇷", wiki: "https://es.wikipedia.org/wiki/Argentina",
        stats: { pop: "47.4M", gdp: "645B", status: "En Proceso" }
    },
    { 
        id: 'br', name: "Brasil", leader: "Luiz Inácio Lula da Silva", relation: "Gigante Regional", 
        info: "Motor económico de Sudamérica y socio clave en exportaciones de alta tecnología.", 
        flag: "🇧🇷", wiki: "https://es.wikipedia.org/wiki/Brasil",
        stats: { pop: "218M", gdp: "2.2T", status: "Activo" }
    },
    { 
        id: 'pe', name: "Perú", leader: "Dina Boluarte", relation: "Hermandad Alianza Pacífico", 
        info: "Aliado histórico en el norte y socio fundamental en minería y astronomía regional.", 
        flag: "🇵🇪", wiki: "https://es.wikipedia.org/wiki/Per%C3%BA",
        stats: { pop: "34.8M", gdp: "260B", status: "Estable" }
    },
    { 
        id: 'uy', name: "Uruguay", leader: "Yamandú Orsi", relation: "Cooperación Democrática", 
        info: "Referente en estabilidad institucional y servicios tecnológicos avanzados.", 
        flag: "🇺🇾", wiki: "https://es.wikipedia.org/wiki/Uruguay",
        stats: { pop: "3.4M", gdp: "75B", status: "Excelente" }
    },
    { 
        id: 'bo', name: "Bolivia", leader: "Luis Arce", relation: "Relación Vecinal", 
        info: "Socio en recursos energéticos y tránsito comercial transandino por Paso Agua Negra.", 
        flag: "🇧🇴", wiki: "https://es.wikipedia.org/wiki/Bolivia",
        stats: { pop: "12.6M", gdp: "46B", status: "Pendiente" }
    },
    { 
        id: 'co', name: "Colombia", leader: "Gustavo Petro", relation: "Alianza del Pacífico", 
        info: "Socio en innovación social y desarrollo de hubs creativos digitales.", 
        flag: "🇨🇴", wiki: "https://es.wikipedia.org/wiki/Colombia",
        stats: { pop: "52.9M", gdp: "370B", status: "Activo" }
    },
    { 
        id: 've', name: "Venezuela", leader: "Nicolás Maduro", relation: "Integración Comunitaria", 
        info: "Vínculos históricos y migratorios gestionados con enfoque en regularización tecnológica VLS.", 
        flag: "🇻🇪", wiki: "https://es.wikipedia.org/wiki/Venezuela",
        stats: { pop: "29.2M", gdp: "95B", status: "Monitoreo" }
    },
    { 
        id: 'mx', name: "México", leader: "Claudia Sheinbaum", relation: "Líder Hispanoamericano", 
        info: "Aliado en cultura, industria automotriz y desarrollo de Smart Cities.", 
        flag: "🇲🇽", wiki: "https://es.wikipedia.org/wiki/M%C3%A9xico",
        stats: { pop: "131M", gdp: "1.6T", status: "Activo" }
    },
    { 
        id: 'es', name: "España", leader: "Pedro Sánchez", relation: "Madre Patria y Socio UE", 
        info: "Puerta de entrada a Europa y socio en energías renovables y patrimonio.", 
        flag: "🇪🇸", wiki: "https://es.wikipedia.org/wiki/Espa%C3%B1a",
        stats: { pop: "48.2M", gdp: "1.7T", status: "Histórico" }
    },
    { 
        id: 'cn', name: "China", leader: "Xi Jinping", relation: "Socio Estratégico Integral", 
        info: "Principal socio comercial y proveedor de hardware para la red de monitoreo Faro IA.", 
        flag: "🇨🇳", wiki: "https://es.wikipedia.org/wiki/China",
        stats: { pop: "1.4B", gdp: "20T", status: "Vital" }
    },
    { 
        id: 'jp', name: "Japón", leader: "Shigeru Ishiba", relation: "Socio en Resiliencia", 
        info: "Referente en tecnología sísmica y mayor inversionista en infraestructura minera.", 
        flag: "🇯🇵", wiki: "https://es.wikipedia.org/wiki/Jap%C3%B3n",
        stats: { pop: "123M", gdp: "4.5T", status: "Excelente" }
    }
];

const FlagSticker = ({ flag }) => (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        padding: '0.4rem',
        borderRadius: '8px',
        boxShadow: '0 4px 0 rgba(0,0,0,0.2), 0 0 10px rgba(0,0,0,0.1)',
        border: '2px solid #ddd',
        transform: 'rotate(-1deg)',
        fontSize: '3.5rem',
        lineHeight: 1,
        marginBottom: '1rem'
    }}>
        {flag}
    </div>
);

export default function EmbajadasConsulados({ onClose }) {
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);

    const filtered = COUNTRIES_DATA.filter(c => 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.leader.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(2, 6, 23, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            color: 'white', fontFamily: 'Outfit, sans-serif'
        }}>
            {/* Header */}
            <div style={{ 
                padding: '1.5rem 2rem', 
                background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.9), transparent)', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'linear-gradient(45deg, #3b82f6, #60a5fa)', padding: '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                        <Globe size={30} color="white" />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.5px', color: '#fcd34d' }}>VECINOS DEL MUNDO</h2>
                        <span style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={14} /> MARZO 2026: ACTUALIZACIÓN GLOBAL 
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input 
                            type="text" 
                            placeholder="Buscar nación..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ 
                                background: 'rgba(255,255,255,0.05)', 
                                border: '1px solid rgba(255,255,255,0.1)', 
                                borderRadius: '50px', 
                                padding: '0.6rem 1rem 0.6rem 2.5rem',
                                color: 'white', width: '280px'
                            }}
                        />
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>
            </div>

            {/* Content Container */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* List of Countries */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filtered.map(country => (
                        <div 
                            key={country.id}
                            onClick={() => setSelectedCountry(country)}
                            className="glass-panel"
                            style={{ 
                                padding: '2rem', 
                                borderRadius: '30px', 
                                border: selectedCountry?.id === country.id ? '2px solid #fcd34d' : '1px solid rgba(255,255,255,0.08)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                position: 'relative',
                                background: selectedCountry?.id === country.id ? 'rgba(252, 211, 77, 0.05)' : 'rgba(15, 23, 42, 0.4)',
                                transform: selectedCountry?.id === country.id ? 'translateY(-10px) scale(1.02)' : 'none',
                                textAlign: 'center'
                            }}
                        >
                            <FlagSticker flag={country.flag} />
                            <h3 style={{ margin: '0.5rem 0 0 0', fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{country.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 'bold', marginTop: '0.25rem' }}>{country.leader}</p>
                            <div style={{ 
                                marginTop: '1.5rem', 
                                padding: '0.4rem 1.2rem', 
                                background: 'rgba(255,255,255,0.05)', 
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                fontWeight: '900',
                                color: '#fcd34d',
                                display: 'inline-block',
                                border: '1px solid rgba(252, 211, 77, 0.2)'
                            }}>
                                {country.relation}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Side Panel */}
                <div style={{ 
                    width: selectedCountry ? '500px' : '0', 
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden',
                    background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), #020617)',
                    borderLeft: selectedCountry ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    display: 'flex', flexDirection: 'column',
                    position: 'relative'
                }}>
                    {selectedCountry && (
                        <div style={{ padding: '3.5rem', height: '100%', overflowY: 'auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <FlagSticker flag={selectedCountry.flag} />
                                <h2 style={{ fontSize: '3rem', margin: '1rem 0 0 0', fontWeight: '900', letterSpacing: '-1px' }}>{selectedCountry.name.toUpperCase()}</h2>
                                <span style={{ color: '#fcd34d', fontWeight: 'black', fontSize: '1.2rem', textTransform: 'uppercase' }}>{selectedCountry.leader}</span>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '25px', background: 'rgba(255,255,255,0.03)', marginBottom: '2rem', border: '1px solid rgba(96, 165, 250, 0.2)' }}>
                                <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontWeight: '900' }}>
                                    <Shield size={20} /> ALIANZA ESTRATÉGICA VLS
                                </h4>
                                <p style={{ margin: 0, lineHeight: '1.8', fontSize: '1.1rem', color: '#cbd5e1' }}>{selectedCountry.info}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <Users size={24} color="#10b981" style={{ marginBottom: '8px' }} />
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>{selectedCountry.stats.pop}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' }}>POBLACIÓN ACT. 2026</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', textAlign: 'center', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                    <TrendingUp size={24} color="#f59e0b" style={{ marginBottom: '8px' }} />
                                    <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>{selectedCountry.stats.gdp}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' }}>PIB PROY. 2026</div>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', textAlign: 'center', gridColumn: 'span 2', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                    <Landmark size={24} color="#3b82f6" style={{ marginBottom: '8px' }} />
                                    <div style={{ fontSize: '1.3rem', fontWeight: '900' }}>{selectedCountry.stats.status}</div>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' }}>ESTADO DE RELACIÓN BILATERAL</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a 
                                    href={selectedCountry.wiki} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-primary"
                                    style={{ flex: 1, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '1.2rem', background: '#3b82f6', color: 'white', borderRadius: '15px', fontWeight: '900', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}
                                >
                                    <Globe size={18} /> Wikipedia
                                </a>
                                <button
                                    onClick={() => setSelectedCountry(null)}
                                    style={{ flex: 1, padding: '1.2rem', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontWeight: '900' }}
                                >
                                    Cerrar Detalle
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .glass-panel { backdrop-filter: blur(10px); }
                .btn-glass:hover { background: rgba(255, 255, 255, 0.2); transform: scale(1.05); }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}
