import React, { useState, useEffect } from 'react';
import { Search, X as CloseIcon, ShieldAlert, WifiHigh, Brain, Bot, Network, Newspaper, ExternalLink, BookOpen, Twitter, MessageCircle, Activity } from 'lucide-react';
import { TwitterSentinelService } from '../services/TwitterSentinelService';

export default function SentinelMini({ onClose }) {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('ia');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [liveTweets, setLiveTweets] = useState([]);
    const [isLoadingTweets, setIsLoadingTweets] = useState(false);
    const [errorState, setErrorState] = useState(null);

    // Cargar tweets cuando se abre el tab social
    useEffect(() => {
        if (activeTab === 'social') {
            fetchLiveTweets();
        }
    }, [activeTab]);

    const fetchLiveTweets = async () => {
        setIsLoadingTweets(true);
        setErrorState(null);
        try {
            const data = await TwitterSentinelService.searchLaSerenaIncidents();
            setLiveTweets(data);
        } catch (error) {
            console.error("Error en Radar Social:", error);
            setErrorState(error.message);
            setLiveTweets([]);
        } finally {
            setIsLoadingTweets(false);
        }
    };

    const basicInfo = [
        "Población: ~221.054 habitantes (Capital Regional).",
        "Atractivos: Faro Monumental, Avenida del Mar, Recova, Borde Costero.",
        "Fundación: 1544 (Segunda ciudad más antigua de Chile).",
        "Clima: Semiárido con nubosidad costera (Camanchaca).",
        "Seguridad S-C: +34% de cámaras operativas en 2026."
    ];

    const pressNews = [
        {
            id: 1,
            title: "Balance tras las lluvias en La Serena: obras preventivas evitaron afectaciones graves",
            source: "Hemeroteca VLS",
            date: "Sincronizado 2026",
            link: "https://vecinoslaserena.digitalpress.blog/",
            desc: "Gracias a la limpieza de sumideros y cauces, la ciudad resistió favorablemente el último sistema frontal. Se mantiene monitoreo en Avenida del Mar."
        },
        {
            id: 2,
            title: "Pavimentación de calles en Serena Oriente: Braulio Arenas y Rodolfo Wagenknecht",
            source: "Hemeroteca VLS",
            date: "Archivo Vecinal",
            link: "https://vecinoslaserena.digitalpress.blog/",
            desc: "Histórico anuncio de pavimentación para mejorar la conectividad y calidad de vida en el sector alto de La Serena tras reunión con la JJVV."
        },
        {
            id: 3,
            title: "Feria del Libro de La Serena: 38 años rescatando el patrimonio literario regional",
            source: "Hemeroteca VLS",
            date: "Archivo Cultural",
            link: "https://vecinoslaserena.digitalpress.blog/",
            desc: "La Plaza de Armas se convierte en el epicentro de la cultura y la memoria histórica con autores enfocados en la identidad serenense."
        }
    ];

    const localKnowledgeBase = [
        { keywords: ['alcaldesa', 'daniela', 'norambuena', 'alcalde'], text: 'Daniela Norambuena, Alcaldesa de la Ilustre Municipalidad de La Serena (2024-2028), enfocada en seguridad integral, innovación (Smart City) y recuperación de espacios públicos.' },
        { keywords: ['pago', 'permiso', 'circulacion', 'vehiculo', 'auto', 'patente'], text: 'El pago del Permiso de Circulación 2026 está habilitado 100% online. Puedes realizarlo en la Ventanilla Única o usando los Tótems de Autoatención en la delegación.' },
        { keywords: ['basura', 'aseo', 'recoleccion', 'camion'], text: 'Los camiones recolectores operan de Lunes a Sábado. Puedes revisar el tracking GPS en vivo de cada camión a través de la app Vecinosmart.' },
        { keywords: ['seguridad', 'camaras', 'delincuencia', 'robo', 'paz', '1457'], text: 'Seguridad Ciudadana La Serena opera 24/7 en el número 1457. Contamos con el Plan Integral de Seguridad 360: +34% de cámaras operativas bajo monitoreo IA y drones de televigilancia.' },
        { keywords: ['tramites', 'certificados', 'online', 'rut', 'clave', 'unica', 'chileatiende'], text: 'Obtén certificados de residencia, paga contribuciones y accede a ChileAtiende en la Ventanilla Única conectando tu Clave Única.' },
        { keywords: ['salud', 'cesfam', 'hora', 'medico', 'consultorio', 'samu', '131'], text: 'Para urgencias médicas vitales llama al SAMU (131). Las horas para CESFAM se agendan mediante el portal Smart Citizens.' },
        { keywords: ['emergencia', 'urgencia', 'ayuda', 'sos', 'telefonos', 'numeros'], text: 'TELÉFONOS CRÍTICOS: Seguridad Municipal (1457), Carabineros (133), PDI (134), Bomberos (132), SAMU (131) y Armada (137). Puedes abrir el Directorio Completo desde el botón de Emergencias 24/7.' },
        { keywords: ['carabineros', 'policia', '133', 'comisaria'], text: 'Carabineros de Chile: Llama al 133 para emergencias policiales. En Coquimbo, el contacto principal es la 2da Comisaría.' },
        { keywords: ['pdi', 'investigaciones', '134'], text: 'Policía de Investigaciones (PDI): Llama al 134 para denuncias de delitos complejos y narcotráfico.' },
        { keywords: ['armada', 'marina', 'playa', 'borde', 'costero', '137'], text: 'Armada de Chile (Policía Marítima): Llama al 137 para emergencias en el borde costero y rescate marítimo.' },
        { keywords: ['vif', 'familia', '149', 'violencia'], text: 'Fono Familia Carabineros (149): Orientación y ayuda en casos de Violencia Intrafamiliar.' },
        { keywords: ['turismo', 'faro', 'playa', 'hotel', 'verano', 'instagram'], text: 'La Serena es el segundo destino de Chile. Síguenos en Instagram @vecinoslaserena2 para noticias y eventos.' },
        { keywords: ['glosario', 'diccionario', 'terminos', 'definicion', 'c5', 'rae', 'dudas'], text: 'El Diccionario Institucional (Glosario VLS) resuelve dudas sobre términos como C5, SIG y GORE.' }
    ];

    const handleSearch = () => {
        if (query.trim().length <= 3) return;
        setIsSearching(true);
        setSearchResults([]);

        // Simular un pequeño retardo de procesamiento de IA
        setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            const words = lowerQuery.split(/\s+/);
            const results = localKnowledgeBase.filter(item =>
                words.some(word => item.keywords.some(kw => kw.includes(word) || word.includes(kw)))
            );

            setSearchResults(results.length > 0 ? results : [{ text: 'No se encontraron registros exactos en la Base de Datos Municipal para esa consulta. Intenta usar palabras clave como "patente", "seguridad", "salud" o "alcaldesa".' }]);
            setIsSearching(false);
        }, 800);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)' }}>
            <div className="picasso-fractal animate-scale-in" style={{ width: '100%', maxWidth: '800px', height: '80vh', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(8, 14, 44, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(56, 189, 248, 0.5)', overflow: 'hidden' }}>

                {/* Header */}
                <div className="sentinel-header" style={{ padding: '1.5rem 2rem', borderBottom: '1px dashed rgba(56, 189, 248, 0.3)', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '0.75rem', borderRadius: '50%', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                            <Network size={28} color="#38bdf8" />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h2 style={{ margin: 0, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                SENTINEL FARO <span style={{ fontSize: '0.7rem', background: '#38bdf8', color: 'black', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 'bold' }}>VERSION LITE</span>
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Inteligencia de Datos La Serena, Búsqueda Vecinal Descentralizada.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                        <CloseIcon size={24} color="white" />
                    </button>
                </div>

                {/* Estilos responsivos internos */}
                <style>{`
                    .sentinel-workspace { display: flex; flex: 1; overflow: hidden; flex-direction: row; }
                    .sentinel-sidebar { width: 220px; background: rgba(0,0,0,0.3); border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; padding: 1rem 0; overflow-y: auto; }
                    .sentinel-main { flex: 1; display: flex; flex-direction: column; padding: 1rem; overflow-y: auto; }
                    .sentinel-search-bar { flex-direction: row; }
                    .sentinel-header { flex-direction: row; }
                    
                    @media (max-width: 768px) {
                        .sentinel-workspace { flex-direction: column; overflow-y: auto; }
                        .sentinel-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); flex-direction: row; flex-wrap: wrap; padding: 0.5rem; justify-content: space-around; }
                        .sentinel-sidebar > button { flex: 1 1 30%; justify-content: center; text-align: center; border-left: none !important; border-bottom: 2px solid transparent; font-size: 0.8rem; padding: 0.75rem 0.5rem !important; flex-direction: column; gap: 0.2rem !important; }
                        .sentinel-sidebar > button.active-tab { border-bottom-color: #38bdf8 !important; }
                        .sentinel-main { overflow-y: visible; padding: 1rem 0.5rem; }
                        .sentinel-search-bar { flex-direction: column; gap: 1rem; align-items: stretch !important; padding: 1rem !important; border-radius: 15px !important; }
                        .sentinel-search-bar input { text-align: center; }
                        .sentinel-header { flex-direction: column; text-align: center; align-items: center; justify-content: center; gap: 1rem; }
                    }
                `}</style>

                <div className="sentinel-workspace">

                    {/* Sidebar */}
                    <div className="sentinel-sidebar">
                        <button className={activeTab === 'ia' ? 'active-tab' : ''} onClick={() => setActiveTab('ia')} style={{ padding: '1.2rem 1rem', background: activeTab === 'ia' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', border: 'none', color: 'white', borderLeft: activeTab === 'ia' ? '4px solid #38bdf8' : '4px solid transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Brain size={18} color={activeTab === 'ia' ? '#38bdf8' : 'var(--text-muted)'} /> <span>Búsqueda Deep-IA</span>
                        </button>
                        <button className={activeTab === 'info' ? 'active-tab' : ''} onClick={() => setActiveTab('info')} style={{ padding: '1.2rem 1rem', background: activeTab === 'info' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', border: 'none', color: 'white', borderLeft: activeTab === 'info' ? '4px solid #38bdf8' : '4px solid transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <ShieldAlert size={18} color={activeTab === 'info' ? '#38bdf8' : 'var(--text-muted)'} /> <span>Info Rápida LS</span>
                        </button>
                        <button className={activeTab === 'prensa' ? 'active-tab' : ''} onClick={() => setActiveTab('prensa')} style={{ padding: '1.2rem 1rem', background: activeTab === 'prensa' ? 'rgba(56, 189, 248, 0.1)' : 'transparent', border: 'none', color: 'white', borderLeft: activeTab === 'prensa' ? '4px solid #38bdf8' : '4px solid transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Newspaper size={18} color={activeTab === 'prensa' ? '#38bdf8' : 'var(--text-muted)'} /> <span>Radar de Prensa</span>
                        </button>
                        <button className={activeTab === 'social' ? 'active-tab' : ''} onClick={() => setActiveTab('social')} style={{ padding: '1.2rem 1rem', background: activeTab === 'social' ? 'rgba(29, 155, 240, 0.1)' : 'transparent', border: 'none', color: 'white', borderLeft: activeTab === 'social' ? '4px solid #1d9bf0' : '4px solid transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s' }}>
                            <Twitter size={18} color={activeTab === 'social' ? '#1d9bf0' : 'var(--text-muted)'} /> <span>Radar Social (X)</span>
                        </button>
                        <button onClick={() => { onClose(); window.location.href = '/glosario'; }} style={{ padding: '1.2rem 1rem', background: 'transparent', border: 'none', color: '#10b981', borderLeft: '4px solid transparent', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s', marginTop: 'auto' }}>
                            <BookOpen size={18} color="#10b981" /> <span>Abrir Glosario VLS</span>
                        </button>
                    </div>

                    {/* Contenido Principal */}
                    <div className="sentinel-main">

                        {activeTab === 'ia' && (
                            <div className="animate-fade-in" style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="sentinel-search-bar" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '30px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', border: '1px solid rgba(56, 189, 248, 0.3)', marginBottom: '1.5rem' }}>
                                    <Search size={20} color="#38bdf8" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Pregúntale a Sentinel sobre La Serena (ej. patentes, seguridad)..."
                                        style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', padding: '0.75rem', outline: 'none', fontSize: '1rem' }}
                                    />
                                    <button onClick={handleSearch} className="btn-primary pulse" style={{ background: '#38bdf8', color: 'black', borderRadius: '20px', padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>Buscar</button>
                                </div>

                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                    {isSearching ? (
                                        <div className="animate-fade-in" style={{ textAlign: 'center', margin: 'auto' }}>
                                            <Network size={40} color="#38bdf8" className="pulse-slow" style={{ margin: '0 auto 1rem' }} />
                                            <h4 style={{ color: '#38bdf8' }}>Buscando en la Malla Neuronal...</h4>
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="animate-slide-up" style={{ textAlign: 'left', width: '100%' }}>
                                            <h4 style={{ color: '#10b981', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bot size={18} /> Resultados Oficiales Encontrados:</h4>
                                            {searchResults.map((res, i) => (
                                                <div key={i} style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10b981', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                                    <p style={{ color: 'white', margin: 0, lineHeight: '1.6' }}>{res.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : query.length > 3 ? (
                                        <div style={{ textAlign: 'center', margin: 'auto' }}>
                                            <p style={{ color: 'var(--text-secondary)' }}>Presiona "Buscar" o Entrar para iniciar el barrido en la red municipal.</p>
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', margin: 'auto' }}>
                                            <Brain size={48} color="rgba(56, 189, 248, 0.2)" style={{ marginBottom: '1rem' }} />
                                            <p style={{ color: 'var(--text-muted)' }}>Ingresa al menos 4 caracteres para consultar la Base de Datos Municipal "Smart Sentinel".</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'info' && (
                            <div className="animate-fade-in" style={{ padding: '2rem', overflowY: 'auto' }}>
                                <h3 style={{ color: 'white', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <WifiHigh size={20} color="#38bdf8" /> Datos Duros: La Serena
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                                    {basicInfo.map((info, idx) => (
                                        <li key={idx} style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{'>'}</span> {info}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'rgba(29, 155, 240, 0.1)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(29, 155, 240, 0.3)' }}>
                                    <div>
                                        <h3 style={{ color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                            <Twitter size={20} color="#1d9bf0" /> Escucha Activa: Incidentes Reales
                                        </h3>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#1d9bf0' }}>Monitoreando @vecinoslaserena y hashtags regionales</p>
                                    </div>
                                    <button 
                                        onClick={fetchLiveTweets} 
                                        disabled={isLoadingTweets}
                                        style={{ background: '#1d9bf0', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                                    >
                                        <Activity size={14} className={isLoadingTweets ? 'animate-spin' : ''} /> {isLoadingTweets ? 'Actualizando...' : 'Refrescar'}
                                    </button>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gap: '1rem', paddingRight: '0.5rem' }}>
                                    {isLoadingTweets ? (
                                        <div style={{ textAlign: 'center', margin: 'auto' }}>
                                            <div className="animate-spin" style={{ width: '30px', height: '30px', border: '3px solid #1d9bf0', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 10px' }}></div>
                                            <p style={{ color: '#1d9bf0', fontSize: '0.9rem' }}>Sincronizando con X API (Datos Reales)...</p>
                                        </div>
                                    ) : errorState ? (
                                        <div style={{ textAlign: 'center', margin: 'auto', padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.05)' }}>
                                            <ShieldAlert size={40} color="#ef4444" style={{ marginBottom: '1rem' }} />
                                            <h4 style={{ color: 'white', margin: '0 0 0.5rem 0' }}>Error de Conexión Real</h4>
                                            <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>
                                                {errorState === 'ERROR_CONEXION_REAL' 
                                                    ? 'No se pudo conectar con la API de X de forma directa. Esto suele ocurrir por restricciones de seguridad (CORS) del navegador o llaves inválidas.' 
                                                    : 'Ocurrió un error inesperado al rastrear incidentes reales.'}
                                            </p>
                                            <button onClick={fetchLiveTweets} style={{ marginTop: '1rem', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer' }}>Reintentar Sincronización</button>
                                        </div>
                                    ) : liveTweets.length > 0 ? (
                                        liveTweets.map((tweet) => (
                                            <div key={tweet.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem', transition: 'all 0.2s', borderLeft: '3px solid #1d9bf0' }}>
                                                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                    <img src={tweet.avatar} alt={tweet.author} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #1d9bf0' }} onError={(e) => { e.target.src = '/favicos_vls.svg' }} />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                                            <div>
                                                                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>{tweet.author}</span>
                                                                <span style={{ color: '#1d9bf0', fontSize: '0.8rem', marginLeft: '5px' }}>{tweet.username}</span>
                                                            </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                <span style={{ color: '#64748b', fontSize: '0.7rem' }}>{tweet.time}</span>
                                                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10b981' }}></span>
                                                            </div>
                                                        </div>
                                                        <p style={{ color: '#e2e8f0', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{tweet.text}</p>
                                                        <div style={{ display: 'flex', gap: '15px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
                                                            <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                <MessageCircle size={14} /> {tweet.metrics.reply_count}
                                                            </span>
                                                            <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                <Activity size={14} /> {tweet.metrics.retweet_count}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ textAlign: 'center', margin: 'auto' }}>
                                            <Twitter size={48} color="rgba(255,255,255,0.05)" style={{ marginBottom: '1rem' }} />
                                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No se detectaron reportes reales en los últimos 30 minutos.</p>
                                            <p style={{ color: '#64748b', fontSize: '0.7rem' }}>Escaneando hashtags regionales...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
