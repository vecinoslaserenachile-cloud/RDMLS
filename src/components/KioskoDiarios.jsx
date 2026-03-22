import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Newspaper, Search, ArrowRight, Star, Heart, Share2, ZoomIn, Download, BookOpen, Clock, Smartphone, Globe, Maximize2 } from 'lucide-react';
import SmartVerticalReel from './SmartVerticalReel';
import Kiosko3DModal from './Kiosko3DModal';

// Component for the CSS-generated fallback newspaper cover
const FallbackNewspaperCover = ({ name, headline, color }) => (
    <div style={{
        width: '100%',
        height: '100%',
        background: '#f8f8f8',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem',
        boxSizing: 'border-box',
        fontFamily: 'serif',
        position: 'relative',
        overflow: 'hidden',
        color: '#333'
    }}>
        <div style={{
            position: 'absolute',
            inset: 0,
            background: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
            opacity: 0.2,
            pointerEvents: 'none'
        }}></div>
        <div style={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '0.2rem', marginBottom: '0.3rem' }}>
            EDICIÓN ESPECIAL
        </div>
        <h4 style={{
            margin: 0,
            fontSize: '1.2rem',
            fontWeight: '900',
            textAlign: 'center',
            lineHeight: '1.1',
            color: color || '#333'
        }}>
            {name.toUpperCase()}
        </h4>
        <div style={{ fontSize: '0.5rem', textAlign: 'center', marginBottom: '0.5rem' }}>
            La Voz de la Región
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '0.3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', color: color || '#333', marginBottom: '0.2rem' }}>TITULAR DEL DÍA</div>
            <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 'bold', lineHeight: '1.2', textAlign: 'center' }}>
                {headline || 'Noticia destacada de última hora en la región.'}
            </p>
            <div style={{ width: '80%', height: '2px', background: '#ccc', margin: '0.5rem 0' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', width: '100%' }}>
                <div style={{ fontSize: '0.5rem', borderRight: '1px solid #eee', paddingRight: '0.2rem' }}>
                    <div style={{ fontWeight: 'bold' }}>Política</div>
                    <div>Acuerdo histórico...</div>
                </div>
                <div style={{ fontSize: '0.5rem' }}>
                    <div style={{ fontWeight: 'bold' }}>Deportes</div>
                    <div>Equipo local gana...</div>
                </div>
            </div>
        </div>
        <div style={{ fontSize: '0.5rem', textAlign: 'right', marginTop: '0.3rem', color: '#666' }}>
            {new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
    </div>
);


export default function KioskoDiarios({ onClose }) {
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [filter, setFilter] = useState('todos');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showStoryMode, setShowStoryMode] = useState(false);
    const [show3DMode, setShow3DMode] = useState(false);
    const [imageError, setImageError] = useState({}); // State to track image loading errors

    const [headlines, setHeadlines] = useState({});

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        
        // Refresh headlines every hour
        const headlinesTimer = setInterval(() => {
            console.log("Refreshing headlines...");
            // Simulate headline update logic here
            const newHeadlines = {};
            diarios.forEach(d => {
                const variations = [
                    "Última Hora: Avances en infraestructura regional.",
                    "Reporte VLS: Nuevas medidas de seguridad ciudadana.",
                    "Economía local: Crecimiento sostenido este trimestre.",
                    "Cultura: Festival de las artes anuncia fechas."
                ];
                newHeadlines[d.id] = variations[Math.floor(Math.random() * variations.length)];
            });
            setHeadlines(newHeadlines);
        }, 3600000); // 1 hour

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearInterval(timer);
            clearInterval(headlinesTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getLaRegionUrl = (date) => {
        const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        const dayName = days[date.getDay()];
        const dayNum = date.getDate();
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();
        // Nota: Algunos días omiten el "de" o tienen variaciones, pero este es el patrón estándar detectado
        return `https://www.diariolaregion.cl/edicion-${dayName}-${dayNum}-de-${monthName}-${year}/`;
    };

    const diarios = [
        { 
            id: 'eldia', 
            name: 'Diario El Día', 
            region: 'La Serena / Coquimbo', 
            type: 'Tradicional', 
            color: '#1e3a8a', 
            url: 'https://papeldigital.eldia.la/',
            headline: 'Más de cien detenidos tras megaoperativo policial en la Región de Coquimbo', 
            cover: 'https://www.diarioeldia.cl/social/diario_el_dia/portadas/portada_dia.jpg', 
            legacyTag: 'DIARIO DE LA CUARTA REGIÓN',
            price: '$600',
            isSpecial: true
        },
        { 
            id: 'laregion', 
            name: 'Diario La Región', 
            region: 'Coquimbo', 
            type: 'Tradicional', 
            color: '#b91c1c', 
            url: getLaRegionUrl(currentTime),
            headline: 'Siete detenidos en Coquimbo tras intenso operativo policial en Punta Mira',
            cover: 'https://www.diariolaregion.cl/wp-content/uploads/2024/01/PORTADA-REGIONAL.jpg',
            legacyTag: 'LA VOZ DE COQUIMBO',
            price: '$500'
        },
        { 
            id: 'tiempo', 
            name: 'Semanario Tiempo', 
            region: 'La Serena', 
            type: 'Tradicional', 
            color: '#065f46', 
            url: 'https://semanariotiempo.cl/',
            headline: 'Lluvias se pronostican para este fin de semana en la región previo al otoño',
            cover: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop',
            legacyTag: 'EDICIÓN SEMANAL',
            price: '$800'
        },
        { 
            id: 'elmercurio', 
            name: 'El Mercurio', 
            region: 'Nacional', 
            type: 'Tradicional', 
            color: '#0f172a', 
            url: 'https://www.emol.com/',
            headline: 'Dólar repunta con fuerza y sube alrededor de $18 ante caída del cobre',
            cover: 'https://images.unsplash.com/photo-1566378246598-5b11a0ff7f97?q=80&w=600&auto=format&fit=crop',
            legacyTag: 'DECANO DE LA PRENSA',
            price: '$1.000'
        },
        { 
            id: 'latercera', 
            name: 'La Tercera', 
            region: 'Nacional', 
            type: 'Tradicional', 
            color: '#ef4444', 
            url: 'https://www.latercera.com/',
            headline: 'Lollapalooza Chile 2026: Los Bunkers y Lorde marcan el inicio del festival',
            cover: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=600&auto=format&fit=crop',
            legacyTag: 'EDICIÓN PAPER DIGITAL',
            price: '$900'
        },
        { 
            id: 'lun', 
            name: 'LUN', 
            region: 'Nacional', 
            type: 'Tradicional', 
            color: '#f59e0b', 
            url: 'https://www.lun.com/',
            headline: '31 Minutos colapsa el Kidzapalooza con emotivo espectáculo masivo',
            cover: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
            legacyTag: 'HISTORIAS DEL DÍA',
            price: '$500'
        },
        { 
            id: 'entre_vecinas', 
            name: 'Revista Entre Vecinas', 
            region: 'Comunidad', 
            type: 'Magazine', 
            color: '#ec4899', 
            url: 'https://entrevecinas.cl',
            headline: 'Emprendimiento Femenino: El motor de la innovación en La Serena',
            cover: '/revista_entre_vecinas_cover_1773625657231.png',
            legacyTag: '100% COLABORATIVA',
            price: 'GRATIS'
        }
    ];

    const filteredDiarios = filter === 'todos' ? diarios : diarios.filter(d => d.region.includes(filter) || d.type === filter);

    const handleImageError = (id) => {
        setImageError(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 100000, 
            background: '#020617', 
            display: 'flex', 
            flexDirection: 'column', 
            overflow: 'hidden',
            height: '100dvh',
            paddingBottom: 'env(safe-area-inset-bottom)'
        }}>
            
            {/* Kiosk Ceiling (Roof Style) */}
            <div style={{ 
                height: '60px', 
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', 
                width: '100%', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)', 
                zIndex: 10,
                position: 'relative',
                borderBottom: '4px solid #fcd34d'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)' }}></div>
            </div>
            
            <header style={{ 
                background: 'rgba(15, 23, 42, 0.95)', 
                backdropFilter: 'blur(20px)',
                padding: isMobile ? '1rem' : '1.5rem 3rem', 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                gap: '1rem',
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '1rem' : '2rem' }}>
                    <div style={{ 
                        background: 'linear-gradient(135deg, #38bdf8 0%, #1e40af 100%)', 
                        padding: isMobile ? '0.6rem' : '1rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
                        transform: 'rotate(-5deg)'
                    }}>
                        <Newspaper size={isMobile ? 24 : 38} color="white" />
                    </div>
                    <div>
                        <h2 style={{ 
                            margin: 0, 
                            color: 'white', 
                            fontSize: isMobile ? '1.4rem' : '2.4rem', 
                            fontWeight: '900', 
                            letterSpacing: '-1px',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(to bottom, #white 0%, #cbd5e1 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>KIOSKO VLS</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.1rem' }}>
                            <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Clock size={12} /> {currentTime.toLocaleTimeString('es-CL')}
                            </span>
                            {!isMobile && (
                                <>
                                    <span style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%' }}></span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Prensa regional y nacional</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: isMobile ? '100%' : 'auto' }}>
                    {isMobile && (
                        <button 
                            onClick={() => setShowStoryMode(true)}
                            className="btn-glass animate-pulse-slow"
                            style={{ background: 'linear-gradient(45deg, #ec4899, #8b5cf6)', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '900' }}
                        >
                            HISTORIAS VLS
                        </button>
                    )}
                    <button 
                        onClick={() => setShow3DMode(true)}
                        className="btn-glass animate-pulse-slow"
                        style={{ 
                            background: 'linear-gradient(45deg, #10b981, #3b82f6)', 
                            border: '1px solid rgba(255,255,255,0.3)', 
                            color: 'white', 
                            padding: isMobile ? '0.4rem 0.8rem' : '0.6rem 1.2rem', 
                            borderRadius: '50px', 
                            fontSize: isMobile ? '0.7rem' : '0.85rem', 
                            fontWeight: '900',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Maximize2 size={isMobile ? 14 : 18} /> KIOSKO 3D
                    </button>
                    <div className="filter-scroll" style={{ 
                        background: 'rgba(0,0,0,0.4)', 
                        padding: '0.4rem', 
                        borderRadius: '50px', 
                        display: 'flex', 
                        gap: '0.4rem', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        overflowX: 'auto',
                        width: isMobile ? 'calc(100% - 60px)' : 'auto',
                        whiteSpace: 'nowrap'
                    }}>
                        {['todos', 'La Serena', 'Coquimbo', 'Nacional', 'Magazine'].map(opt => (
                            <button 
                                key={opt}
                                onClick={() => setFilter(opt)}
                                style={{ 
                                    background: filter === opt ? '#38bdf8' : 'transparent', 
                                    border: 'none', 
                                    color: filter === opt ? '#000' : 'white', 
                                    padding: '0.4rem 0.8rem', 
                                    borderRadius: '50px', 
                                    cursor: 'pointer',
                                    fontSize: '0.7rem',
                                    fontWeight: '900',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {opt === 'todos' ? 'Todo' : opt}
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose} style={{ 
                        background: '#ef4444', 
                        border: 'none', 
                        color: 'white', 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        flexShrink: 0
                    }}>
                        <X size={20} />
                    </button>
                </div>
            </header>

            {/* Main Kiosk Area */}
            <div style={{ 
                flex: 1, 
                position: 'relative', 
                overflowY: 'auto', 
                padding: isMobile ? '2rem 1rem 12rem 1rem' : '4rem 2rem 10rem 2rem', 
                background: '#0f172a',
                backgroundImage: `url('/nostalgia/kiosko_verde.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.95))', zIndex: 1 }}></div>

                {/* Hanging Racks Simulation */}
                <div className="diarios-grid" style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: isMobile ? '2rem' : '4rem', 
                    maxWidth: '1400px', 
                    margin: '0 auto', 
                    position: 'relative', 
                    zIndex: 2 
                }}>
                    
                    {filteredDiarios.map(diario => (
                        <div 
                            key={diario.id}
                            className="newspaper-card"
                            style={{ 
                                background: 'white', 
                                borderRadius: '4px', 
                                boxShadow: '0 15px 40px rgba(0,0,0,0.5)', 
                                padding: '1rem',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                borderTop: `8px solid ${diario.color}`,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: isMobile ? '400px' : '480px'
                            }}
                            onClick={() => window.open(diario.url, '_blank')}
                        >
                            {/* Paper Clip Visual */}
                            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '15px', background: 'linear-gradient(to bottom, #cbd5e1, #64748b)', borderRadius: '4px', border: '1px solid #475569', zIndex: 3 }}></div>
                            
                            <div style={{ borderBottom: '2px double #e2e8f0', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                    <span style={{ fontSize: '0.65rem', fontWeight: '900', color: diario.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{diario.region}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>{diario.price}</span>
                                </div>
                                <h3 style={{ 
                                    margin: 0, 
                                    fontFamily: "'Old Standard TT', serif", 
                                    fontSize: '1.6rem', 
                                    color: '#111', 
                                    fontWeight: '900', 
                                    textAlign: 'center',
                                    lineHeight: '1.1'
                                }}>
                                    {diario.name}
                                </h3>
                                <p style={{ fontSize: '0.6rem', color: '#64748b', textAlign: 'center', marginTop: '0.3rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                                    {diario.legacyTag}
                                </p>
                            </div>

                            <div style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
                                {/* Main Image Placeholder or Visual */}
                                <div style={{ height: '120px', background: `${diario.color}20`, borderBottom: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
                                    {imageError[diario.id] ? (
                                        <FallbackNewspaperCover name={diario.name} headline={diario.headline} color={diario.color} />
                                    ) : (
                                        <img 
                                            src={diario.cover} 
                                            alt={diario.name} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(30%)' }} 
                                            onError={() => handleImageError(diario.id)}
                                        />
                                    )}
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.4rem', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.5rem', fontWeight: 'bold' }}>
                                        FOTO EXCLUSIVA VLS NEWS
                                    </div>
                                </div>

                                <div style={{ padding: '0.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.6rem', color: diario.color, fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.2rem', borderBottom: `1px solid ${diario.color}40`, paddingBottom: '2px' }}>Titular del Día</div>
                                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: '900', color: '#0f172a', lineHeight: '1.1', margin: '0.4rem 0' }}>
                                        {headlines[diario.id] || diario.headline}
                                    </p>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.8rem', borderTop: '1px dashed #cbd5e1', paddingTop: '0.8rem' }}>
                                        <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '0.5rem' }}>
                                            <div style={{ fontSize: '0.5rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Región</div>
                                            <p style={{ fontSize: '0.7rem', color: '#334155', margin: '0.2rem 0', fontWeight: 'bold' }}>Nuevos proyectos en borde costero</p>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.5rem', fontWeight: '900', color: '#64748b', textTransform: 'uppercase' }}>Economía</div>
                                            <p style={{ fontSize: '0.7rem', color: '#334155', margin: '0.2rem 0', fontWeight: 'bold' }}>Turismo rompe récords este mes</p>
                                        </div>
                                    </div>

                                    {!isMobile && (
                                        <p style={{ fontSize: '0.7rem', color: '#475569', marginTop: '1rem', lineHeight: '1.4', textAlign: 'justify', fontStyle: 'italic' }}>
                                            "Estamos construyendo la ciudad que soñamos", señaló la autoridad municipal durante la entrega de nuevas patrullas...
                                        </p>
                                    )}
                                </div>
                                <div style={{ position: 'absolute', inset: 0, background: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")', opacity: 0.1, pointerEvents: 'none' }}></div>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button style={{ 
                                    background: diario.color, 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '0.8rem', 
                                    borderRadius: '10px', 
                                    fontWeight: '900', 
                                    fontSize: '0.8rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {diario.type === 'Magazine' ? 'ABRIR REVISTA' : 'LEER EDICIÓN'} <BookOpen size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* The Kioskere (Serenito) - Responsive version */}
                <div style={{ 
                    position: 'fixed', 
                    bottom: isMobile ? '10px' : '30px', 
                    left: isMobile ? '10px' : '40px', 
                    right: isMobile ? '10px' : 'auto',
                    zIndex: 100, 
                    display: 'flex', 
                    alignItems: 'flex-end', 
                    gap: '1rem',
                    pointerEvents: 'none'
                }}>
                    <div className="worker-overlay" style={{ 
                        position: 'absolute', 
                        bottom: '0', 
                        left: '0', 
                        width: '100px', 
                        height: '100px', 
                        backgroundImage: 'url(/nostalgia/kiosko_verde.jpg)',
                        backgroundPosition: '20% 60%',
                        backgroundSize: '500%',
                        borderRadius: '10px',
                        border: '2px solid #065f46',
                        zIndex: 10,
                        opacity: 0.8,
                        boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
                        <div style={{ position: 'absolute', bottom: '5px', left: '5px', color: 'white', fontSize: '0.6rem', fontWeight: 'bold' }}>SUPLEMENTERO</div>
                    </div>
                    <div className="speech-bubble" style={{ 
                        background: 'rgba(255, 255, 255, 0.98)', 
                        padding: '1rem', 
                        borderRadius: '20px 20px 20px 4px', 
                        border: '2px solid #38bdf8', 
                        maxWidth: isMobile ? '100%' : '250px', 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        pointerEvents: 'auto',
                        display: 'block'
                    }}>
                        <p style={{ margin: 0, color: '#0f172a', fontWeight: 'bold', fontSize: '0.85rem', lineHeight: '1.3' }}>
                            ¡Hola vecino! Aquí el suplementero. Tenemos el diario fresco, dulces, cigarros y chicles. ¿Qué le damos?
                        </p>
                    </div>
                </div>

                {/* Dulcería / Sweets Section */}
                <div style={{ 
                    position: 'fixed', 
                    bottom: '80px', // Raised to avoid being covered by radio or other bars
                    right: '25px', 
                    zIndex: 200001, // Very high z-index
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '3px solid #fcd34d',
                    padding: '1.2rem',
                    borderRadius: '20px',
                    display: isMobile ? 'none' : 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h4 style={{ margin: 0, color: '#fcd34d', fontSize: '0.8rem', textAlign: 'center' }}>🍬 DULCES Y VARIOS</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.6rem 1rem' }}>
                        <div style={{ fontSize: '0.75rem', color: '#fff', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🍬</span> Menta-Menta
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fcd34d', textAlign: 'right', fontWeight: '900' }}>$100</div>
                        
                        <div style={{ fontSize: '0.75rem', color: '#fff', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🫐</span> Miti-Smart
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fcd34d', textAlign: 'right', fontWeight: '900' }}>$200</div>
                        
                        <div style={{ fontSize: '0.75rem', color: '#fff', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🍭</span> Chupetín Koyak
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fcd34d', textAlign: 'right', fontWeight: '900' }}>$300</div>
                        
                        <div style={{ fontSize: '0.75rem', color: '#fff', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🧇</span> Banderita
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fcd34d', textAlign: 'right', fontWeight: '900' }}>$400</div>
                        
                        <div style={{ fontSize: '0.75rem', color: '#fff', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>🍫</span> VLS Choco
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fcd34d', textAlign: 'right', fontWeight: '900' }}>$500</div>
                    </div>
                </div>
            </div>

            {showStoryMode && (
                <SmartVerticalReel 
                    onClose={() => setShowStoryMode(false)}
                    title="NEWS STORIES VLS"
                    accentColor="#ec4899"
                    items={diarios.map(d => ({
                        title: d.name,
                        desc: d.headline,
                        tag: d.region,
                        image: d.cover,
                        bg: d.color,
                        actionText: 'LEER DIARIO COMPLETO'
                    }))}
                />
            )}

            {show3DMode && (
                <Kiosko3DModal 
                    onClose={() => setShow3DMode(false)} 
                    diarios={diarios} 
                />
            )}

            
            <style>{`
                .newspaper-card:hover { transform: translateY(-5px); }
                .filter-scroll::-webkit-scrollbar { display: none; }
                .filter-scroll { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Old Standard TT';
                    src: url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap');
                }
                @font-face {
                    font-family: 'Playfair Display';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
                }
                .diarios-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
                @media (max-width: 600px) {
                    .diarios-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
