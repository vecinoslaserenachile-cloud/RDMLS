import React, { useState, useEffect } from 'react';
import { ShoppingCart, ShoppingBag, Leaf, Star, X, Tag, Trophy, MapPin, Building2, Store, QrCode, Home, Bed, Maximize, Bath, Camera, Search, Filter } from 'lucide-react';
import { auth } from '../utils/firebase';

export default function MarketplaceVecinal({ onClose }) {
    const [activeCategory, setActiveCategory] = useState('todos');
    const [userHistory, setUserHistory] = useState({ score: 0, discounts: [] });

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('smart_history') || '{"score": 0, "discounts": []}');
        setUserHistory(history);
    }, []);

    const products = [
        { id: 1, name: "Bicicleta Vintage LS", price: "M$45.000", seller: "Juan P.", type: "usado", cat: "deportes", xp: 150, rep: 4.8 },
        { id: 2, name: "Mermeladas del Valle", price: "M$5.000", seller: "Emporio Diaguita", type: "nuevo", cat: "comida", xp: 300, rep: 5.0 },
        { id: 3, name: "Servicio de Jardinería", price: "M$15.000", seller: "EcoSerena SPA", type: "servicio", cat: "servicios", xp: 200, rep: 4.9 },
        { id: 4, name: "Cámara Réflex Semi Pro", price: "M$120.000", seller: "María G.", type: "usado", cat: "tech", xp: 500, rep: 4.5 },
        { id: 5, name: "Taller Tejido Neocolonial", price: "GRATIS", seller: "Junta Vecinal 14", type: "servicio", cat: "talleres", xp: 1000, rep: 5.0 }
    ];

    const properties = [
        { 
            id: 'h1', 
            title: "Casa Neocolonial en el Centro", 
            operation: "Venta", 
            price: "UF 5.200", 
            sector: "Centro Histórico", 
            city: "La Serena",
            beds: 4, 
            baths: 2, 
            m2: 180,
            desc: "Hermosa propiedad remodelada, ideal para oficina o vivienda familiar.",
            image: "/serenito-museo.jpg",
            verified: true
        },
        { 
            id: 'h2', 
            title: "Departamento Vista al Mar", 
            operation: "Arriendo", 
            price: "$550.000/mes", 
            sector: "Avenida del Mar", 
            city: "La Serena",
            beds: 2, 
            baths: 2, 
            m2: 65,
            desc: "Amoblado, bodega y estacionamiento incluidos. Excelente conectividad.",
            image: "/puzzle-playa.png",
            verified: true
        },
        { 
            id: 'h3', 
            title: "Parcela con Árboles Frutales", 
            operation: "Venta", 
            price: "UF 3.800", 
            sector: "Algarrobito", 
            city: "La Serena",
            beds: 0, 
            baths: 0, 
            m2: 5000,
            desc: "Terreno plano con factibilidad de luz y agua. Entorno natural.",
            image: "/vls_chile_map.jpg",
            verified: true
        }
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(5, 10, 25, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)' }}>
            <div className="picasso-fractal animate-scale-in" style={{ width: '100%', maxWidth: '1000px', height: '85vh', padding: '0', position: 'relative', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, rgba(8, 14, 44, 0.98) 0%, rgba(20, 40, 80, 0.98) 100%)', border: '1px solid rgba(245, 158, 11, 0.5)', overflow: 'hidden' }}>

                {/* Superior Header */}
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #eab308)', padding: '1rem', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}>
                            <ShoppingCart size={28} color="white" />
                        </div>
                        <div>
                            <h2 className="serena-title-glow" style={{ margin: 0, fontSize: '1.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Marketplace Vecinal <span style={{ fontSize: '0.8rem', background: '#f59e0b', padding: '0.2rem 0.5rem', borderRadius: '10px', verticalAlign: 'middle', fontWeight: 'bold' }}>SIN LUCRO</span>
                            </h2>
                            <p style={{ margin: '0.2rem 0 0 0', color: '#fcd34d', fontSize: '0.9rem' }}>Comercio Local Smart, Seguro y Conectado con la Gamificación Serenito</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="btn-glass" style={{ padding: '0.75rem', borderRadius: '50%' }}>
                        <X size={24} color="white" />
                    </button>
                </div>

                <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                    {/* Sidebar Tools Gamified */}
                    <div style={{ width: '280px', borderRight: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                        <h4 style={{ color: 'white', marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={18} color="#f59e0b" /> Filtros por Ruta
                        </h4>

                        <button onClick={() => setActiveCategory('todos')} className={`btn-glass ${activeCategory === 'todos' ? 'active-cat' : ''}`} style={{ textAlign: 'left', background: activeCategory === 'todos' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', borderLeft: activeCategory === 'todos' ? '4px solid #f59e0b' : 'none' }}>📦 Todos (Nuevos/Usados)</button>
                        <button onClick={() => setActiveCategory('tech')} className={`btn-glass ${activeCategory === 'tech' ? 'active-cat' : ''}`} style={{ textAlign: 'left', background: activeCategory === 'tech' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', borderLeft: activeCategory === 'tech' ? '4px solid #f59e0b' : 'none' }}>💻 Tecnología Barrial</button>
                        <button onClick={() => setActiveCategory('comida')} className={`btn-glass ${activeCategory === 'comida' ? 'active-cat' : ''}`} style={{ textAlign: 'left', background: activeCategory === 'comida' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', borderLeft: activeCategory === 'comida' ? '4px solid #f59e0b' : 'none' }}>🍯 Alimentos Agro LS</button>
                        <button onClick={() => setActiveCategory('inmuebles')} className={`btn-glass ${activeCategory === 'inmuebles' ? 'active-cat' : ''}`} style={{ textAlign: 'left', background: activeCategory === 'inmuebles' ? 'rgba(56, 189, 248, 0.2)' : 'transparent', borderLeft: activeCategory === 'inmuebles' ? '4px solid #38bdf8' : 'none', color: activeCategory === 'inmuebles' ? '#38bdf8' : 'white' }}>🏠 Corretaje Vecinal</button>
                        <button onClick={() => setActiveCategory('servicios')} className={`btn-glass ${activeCategory === 'servicios' ? 'active-cat' : ''}`} style={{ textAlign: 'left', background: activeCategory === 'servicios' ? 'rgba(245, 158, 11, 0.2)' : 'transparent', borderLeft: activeCategory === 'servicios' ? '4px solid #f59e0b' : 'none' }}>🛠️ Oficios y Servicios</button>
                        <button onClick={() => setActiveCategory('recompensas')} className={`btn-glass ${activeCategory === 'recompensas' ? 'active-cat' : ''}`} style={{ textAlign: 'left', background: activeCategory === 'recompensas' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', borderLeft: activeCategory === 'recompensas' ? '4px solid #10b981' : 'none', color: activeCategory === 'recompensas' ? '#10b981' : 'white', fontWeight: 'bold' }}>🏆 Mis Recompensas ({userHistory.discounts.length})</button>
                        
                        <div style={{ marginTop: 'auto', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0,0,0,0.5))', padding: '1rem', borderRadius: '12px', border: '1px dashed #10b981' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                                <Trophy size={20} color="#10b981" />
                                <b style={{ color: 'white', fontSize: '0.9rem' }}>Gamificación Smart</b>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                                ¡Comprar y vender aquí genera XP (Experiencia) para tu Salón Arcade Retro y apoya la economía circular de La Serena!
                            </p>
                        </div>
                    </div>

                    {/* Galería de Marketplace o Recompensas */}
                    <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'rgba(255,255,255,0.01)' }}>
                        {activeCategory === 'recompensas' ? (
                            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0,0,0,0.5))', padding: '2rem', borderRadius: '16px', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Trophy size={64} color="#10b981" style={{ marginBottom: '1rem' }} />
                                    <h3 style={{ color: 'white', fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>Historial y KPIs de Gamificación</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0 0 1rem 0' }}>Has acumulado <strong style={{ color: '#10b981', fontSize: '1.5rem' }}>{userHistory.score} XP</strong> aportando al ecosistema Smart.</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>Tus reportes y misiones ayudan a La Serena. Como recompensa, los comercios asociados te han otorgado los siguientes beneficios reales para potenciar la economía circular.</p>
                                </div>
                                <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Tus Descuentos Activos</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    {userHistory.discounts.length > 0 ? userHistory.discounts.map(disc => (
                                        <div key={disc.id} style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(0,0,0,0.6))', border: '1px dashed #f59e0b', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Canjeable</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <Store size={32} color="#f59e0b" />
                                                <div>
                                                    <h4 style={{ color: 'white', margin: 0 }}>{disc.store}</h4>
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Obtenido: {disc.date}</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center', padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                                <span style={{ color: '#10b981', fontSize: '2rem', fontWeight: '900', display: 'block', textShadow: '0 2px 10px rgba(16, 185, 129, 0.4)' }}>{disc.val}</span>
                                                <span style={{ color: 'white', fontSize: '1.2rem', fontFamily: 'monospace', letterSpacing: '2px', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'inline-block', marginTop: '0.5rem' }}>{disc.code}</span>
                                            </div>
                                            <button className="btn btn-primary" style={{ background: '#f59e0b', color: 'black', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <QrCode size={18} /> Mostrar QR en Tienda
                                            </button>
                                        </div>
                                    )) : (
                                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
                                            <Trophy size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                                            <p>Aún no tienes recompensas en tu historial.<br />¡Juega al "Salón Arcade" desde Panoramas para comenzar a ganar!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : activeCategory === 'inmuebles' ? (
                            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                                    <div>
                                        <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>Corretaje Vecinal La Serena</h3>
                                        <p style={{ color: '#38bdf8', margin: '0.3rem 0 0 0', fontSize: '0.9rem' }}>Busca, vende o arrienda entre vecinos de confianza sin comisiones externas.</p>
                                    </div>
                                    <button className="btn btn-primary" style={{ background: '#38bdf8', border: 'none', color: '#0f172a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Home size={18} /> Publicar Propiedad
                                    </button>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                                    {properties.map(prop => (
                                        <div key={prop.id} style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ height: '200px', position: 'relative' }}>
                                                <img src={prop.image} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                <div style={{ position: 'absolute', top: '15px', left: '15px', background: prop.operation === 'Venta' ? '#8b5cf6' : '#ec4899', color: 'white', padding: '0.4rem 1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                                    {prop.operation}
                                                </div>
                                                {prop.verified && (
                                                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#38bdf8', color: '#0f172a', padding: '0.4rem', borderRadius: '50%', boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}>
                                                        <Star size={16} fill="currentColor" />
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                                    <MapPin size={14} /> {prop.sector}, {prop.city}
                                                </div>
                                                <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{prop.title}</h3>
                                                <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#f59e0b', display: 'block', marginBottom: '1rem' }}>{prop.price}</span>
                                                
                                                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                                                    {prop.beds > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}><Bed size={16} /> {prop.beds} Dorm.</div>}
                                                    {prop.baths > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}><Bath size={16} /> {prop.baths} Baños</div>}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.9rem' }}><Maximize size={16} /> {prop.m2} m²</div>
                                                </div>

                                                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.5' }}>{prop.desc}</p>
                                                
                                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                    <button className="btn-primary" style={{ flex: 2, background: 'linear-gradient(90deg, #38bdf8, #2563eb)', color: 'white', border: 'none', fontWeight: 'bold', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }}>
                                                        Agendar Visita
                                                    </button>
                                                    <button className="btn-secondary" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '12px', cursor: 'pointer' }}>
                                                        <Camera size={20} style={{ margin: '0 auto' }} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                {products.filter(p => activeCategory === 'todos' || p.cat === activeCategory).map(item => (
                                    <div key={item.id} className="animate-fade-in" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                        <div style={{ height: '140px', background: 'linear-gradient(45deg, rgba(200,200,200,0.1), rgba(150,150,150,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                            <Store size={48} color="rgba(255,255,255,0.2)" />
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: item.type === 'nuevo' ? '#10b981' : item.type === 'servicio' ? '#38bdf8' : '#64748b', color: 'white', padding: '3px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                {item.type}
                                            </div>
                                        </div>

                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ color: 'white', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>{item.name}</h3>
                                            <span style={{ color: '#fcd34d', fontSize: '1.4rem', fontWeight: 'bold', display: 'block', marginBottom: '1rem' }}>{item.price}</span>

                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
                                                    <Building2 size={14} color="#38bdf8" /> {item.seller}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'white', fontSize: '0.85rem' }}>
                                                    <Star size={12} fill="#eab308" color="#eab308" /> {item.rep}
                                                </div>
                                            </div>
                                            <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                                <Leaf size={14} /> Otorga +{item.xp} XP Vectorial
                                            </div>
                                            <button className="btn-primary" style={{ marginTop: '1rem', background: '#f59e0b', color: 'black', fontWeight: 'bold', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', border: 'none' }}>
                                                Contactar Vecino
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
