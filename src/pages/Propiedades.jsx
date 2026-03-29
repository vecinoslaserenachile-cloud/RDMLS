import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, Search, MapPin, DollarSign, Filter, 
    ArrowLeft, Star, Camera, CheckCircle2, 
    TrendingUp, ShieldCheck, Key, Ruler,
    ChevronRight, Info, Heart, Plus, Zap, AlertTriangle, MessageSquare, Send, Tag, Building2, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const INITIAL_PROPERTIES = [
    {
        id: 1, title: 'Loft Premium Casco Histórico', price: '$145.000.000', location: 'Centro, La Serena',
        beds: 2, baths: 2, size: '85m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        featured: true, tag: 'INVERSIÓN', type: 'Venta'
    },
    {
        id: 2, title: 'Residencia Borde Costero', price: '$210.000.000', location: 'Av. Del Mar, La Serena',
        beds: 3, baths: 3, size: '120m²', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
        featured: false, tag: 'EXCLUSIVO', type: 'Venta'
    },
    {
        id: 3, title: 'Parcela Ecológica Pan de Azúcar', price: '$120.000.000', location: 'Pan de Azúcar',
        beds: 0, baths: 0, size: '5.000m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        featured: true, tag: 'CAMPESTRE', type: 'Venta'
    }
];

export default function Propiedades() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProp, setSelectedProp] = useState(null);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [properties, setProperties] = useState(INITIAL_PROPERTIES);
    const [tokens, setTokens] = useState(() => parseInt(localStorage.getItem('vls_tokens') || '0'));
    
    // Form State
    const [formData, setFormData] = useState({
        title: '', price: '', location: '', beds: '', baths: '', size: '', type: 'Venta', desc: ''
    });

    const handlePublish = (e) => {
        e.preventDefault();
        
        // Logic check: First publication is free (check a local flag), otherwise 1 token per publication/hour
        const hasPublishedBefore = localStorage.getItem('vls_has_published_prop') === 'true';
        
        if (hasPublishedBefore && tokens < 1) {
            return alert("Insuficiente saldo de Fichas VLS. Recarga en el Hub para continuar publicando.");
        }

        const newProp = {
            id: Date.now(),
            ...formData,
            img: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80', // Mock image
            featured: false,
            tag: formData.type === 'Venta' ? 'PARTICULAR' : 'ARRIENDO'
        };

        if (hasPublishedBefore) {
            const newBalance = tokens - 1;
            setTokens(newBalance);
            localStorage.setItem('vls_tokens', newBalance.toString());
            window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newBalance }));
        } else {
            localStorage.setItem('vls_has_published_prop', 'true');
        }

        setProperties([newProp, ...properties]);
        setShowPublishModal(false);
        setFormData({ title: '', price: '', location: '', beds: '', baths: '', size: '', type: 'Venta', desc: '' });
        
        // Mock Match system
        setTimeout(() => {
            alert(`¡SISTEMA MATCH VLS!: Hemos detectado 3 vecinos interesados en tu publicación de "${formData.title}". Revisa tu mensajería interna.`);
        }, 3000);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: '2rem', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Background Effects */}
            <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: '500px', height: '500px', background: 'rgba(56, 189, 248, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
            </div>

            {/* Header */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button 
                        onClick={() => navigate('/hub')}
                        className="btn-glass hover-lift"
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                    >
                        <ArrowLeft size={18} /> Volver al Hub
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(56, 189, 248, 0.1)', padding: '0.6rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                        <Zap size={18} color="#38bdf8" fill="#38bdf8" />
                        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>{tokens} FICHAS VLS</span>
                    </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-1px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Building2 size={32} color="#38bdf8" /> VLS PROPERTIES
                    </h1>
                    <span style={{ fontSize: '0.8rem', color: '#38bdf8', letterSpacing: '4px', fontWeight: 'bold' }}>CORRETAJE SMART & EXCLUSIVO</span>
                </div>
            </div>

            {/* Hero / Search */}
            <div style={{ maxWidth: '1200px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10 }}>
                <div className="glass-panel" style={{ padding: '4rem 3rem', borderRadius: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 58, 138, 0.3) 100%)', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 900, lineHeight: 1.1 }}>Encuentra tu lugar en la <span style={{ color: '#38bdf8' }}>Smart City</span>.</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>Buscador inmobiliario hiperlocal con trazabilidad y seguridad VLS. Haz match directo con otros vecinos.</p>
                    
                    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={24} />
                            <input 
                                type="text"
                                placeholder="Buscar departamentos, parcelas o casas en La Serena..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '1.5rem 1.5rem 1.5rem 4rem', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '1.1rem', outline: 'none', transition: '0.3s' }}
                            />
                        </div>
                        <button 
                            onClick={() => setShowPublishModal(true)}
                            className="btn-primary hover-lift"
                            style={{ background: '#38bdf8', color: '#0f172a', padding: '0 2.5rem', borderRadius: '20px', border: 'none', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}
                        >
                            <Plus size={24} /> PUBLICAR PROPIEDAD
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#10b981" /> 1ra Publicación Gratis</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={16} color="#fbbf24" /> 1 Ficha / Publicación</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} color="#38bdf8" /> Trazabilidad VLS</div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem', position: 'relative', zIndex: 10 }}>
                {properties.map(prop => (
                    <motion.div 
                        key={prop.id}
                        layout
                        whileHover={{ y: -10 }}
                        className="glass-panel"
                        style={{ borderRadius: '28px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(15, 23, 42, 0.4)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                    >
                        <div style={{ height: '260px', position: 'relative' }}>
                            <img src={prop.img} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px' }}>
                                <span style={{ background: '#38bdf8', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>{prop.tag}</span>
                                {prop.featured && <span style={{ background: '#f59e0b', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '950', display: 'flex', alignItems: 'center', gap: '5px' }}><Star size={12} fill="currentColor" /> DESTACADO</span>}
                            </div>
                            <button style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '50%', color: 'white', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <Heart size={20} />
                            </button>
                        </div>
                        <div style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{prop.title}</h3>
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                                        <MapPin size={16} color="#38bdf8" /> {prop.location}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ color: '#38bdf8', fontSize: '1.4rem', fontWeight: '950', letterSpacing: '-0.5px' }}>{prop.price}</span>
                                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold' }}>{prop.type.toUpperCase()}</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', color: '#cbd5e1', fontSize: '0.9rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Key size={18} color="#38bdf8" /> <strong>{prop.beds}</strong> Dorm.</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} color="#38bdf8" /> <strong>{prop.baths}</strong> Baños</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Ruler size={18} color="#38bdf8" /> <strong>{prop.size}</strong></div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button 
                                    onClick={() => setSelectedProp(prop)}
                                    style={{ flex: 1, padding: '1.2rem', borderRadius: '18px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.95rem' }}
                                >
                                    VER DETALLES
                                </button>
                                <button 
                                    className="hover-lift"
                                    style={{ padding: '1.2rem', borderRadius: '18px', background: '#10b981', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <MessageSquare size={22} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modals section */}
            <AnimatePresence>
                {showPublishModal && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)' }}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 50 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="glass-panel" 
                            style={{ maxWidth: '900px', width: '100%', background: '#0f172a', borderRadius: '40px', border: '1px solid rgba(56, 189, 248, 0.3)', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '2rem 3rem', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Tag color="#38bdf8" /> PUBLICAR PROPIEDAD
                                    </h2>
                                    <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>Tu aviso llegará directamente a los vecinos verificados.</p>
                                </div>
                                <button onClick={() => setShowPublishModal(false)} className="btn-glass" style={{ padding: '10px', borderRadius: '50%', color: 'white', border: 'none', background: 'rgba(239, 68, 68, 0.1)' }}>
                                    <Plus style={{ transform: 'rotate(45deg)' }} />
                                </button>
                            </div>

                            <form onSubmit={handlePublish} style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Título del Aviso</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ej: Departamento Penthouse en Av. del Mar" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px', color: 'white', fontSize: '1rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Precio (CLP / UF)</label>
                                    <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="$ 140.000.000" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px', color: 'white', fontSize: '1rem' }} />
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Ubicación / Sector</label>
                                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Sector La Pampa, La Serena" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px', color: 'white', fontSize: '1rem' }} />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', gridColumn: 'span 2' }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dormitorios</label>
                                        <input type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Baños</label>
                                        <input type="number" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>m² / Superificie</label>
                                        <input type="text" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} placeholder="120m²" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '0.8rem', borderRadius: '12px', color: 'white' }} />
                                    </div>
                                </div>

                                <div style={{ gridColumn: 'span 2' }}>
                                    <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px dashed #38bdf8', padding: '2rem', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', color: '#38bdf8' }}>
                                        <Upload size={32} style={{ marginBottom: '10px' }} />
                                        <div style={{ fontWeight: 'bold' }}>Sube Fotos de tu Propiedad</div>
                                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Máximo 5 fotos de alta calidad</div>
                                    </div>
                                </div>

                                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: 0, color: '#10b981' }}>Publicación Certificada VLS</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>Al publicar aquí, los vecinos saben que es un trato directo y seguro.</p>
                                    </div>
                                    <button type="submit" className="btn-primary-vls" style={{ padding: '1rem 3rem', background: '#10b981', color: 'white', borderRadius: '14px', border: 'none', fontWeight: '900', fontSize: '1rem', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)' }}>
                                        PUBLICAR AHORA
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Trust Badges */}
            <div style={{ maxWidth: '1200px', margin: '6rem auto 0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                        <TrendingUp size={40} color="#38bdf8" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Plusvalía Smart</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Análisis predictivo de crecimiento urbano sectorial mediante IA Faro.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <ShieldCheck size={40} color="#10b981" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Trazabilidad Total</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Operaciones verificadas y seguras. Sin intermediarios abusivos.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <MessageSquare size={40} color="#f59e0b" />
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Match Directo</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6 }}>Conexión inmediata entre oferentes y demandantes del mismo sector.</p>
                </div>
            </div>

            <div style={{ height: '5rem' }}></div>
        </div>
    );
}
