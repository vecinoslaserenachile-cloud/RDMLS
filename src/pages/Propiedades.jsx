import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, Search, MapPin, DollarSign, Filter, 
    ArrowLeft, Star, Camera, CheckCircle2, 
    TrendingUp, ShieldCheck, Key, Ruler,
    ChevronRight, Info, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PROPERTIES = [
    {
        id: 1, title: 'Loft Premium Casco Histórico', price: '$145.000.000', location: 'Centro, La Serena',
        beds: 2, baths: 2, size: '85m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        featured: true, tag: 'INVERSIÓN'
    },
    {
        id: 2, title: 'Residencia Borde Costero', price: '$210.000.000', location: 'Av. Del Mar, La Serena',
        beds: 3, baths: 3, size: '120m²', img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
        featured: false, tag: 'EXCLUSIVO'
    },
    {
        id: 3, title: 'Parcela Ecológica Pan de Azúcar', price: '$120.000.000', location: 'Pan de Azúcar',
        beds: 0, baths: 0, size: '5.000m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        featured: true, tag: 'CAMPESTRE'
    }
];

export default function Propiedades() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProp, setSelectedProp] = useState(null);

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '2rem' }}>
            {/* Header */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <button 
                    onClick={() => navigate('/hub')}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1.5rem', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                    <ArrowLeft size={18} /> Volver al Hub
                </button>
                <div style={{ textAlign: 'right' }}>
                    <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '900', letterSpacing: '2px', color: '#38bdf8' }}>VLS PROPERTIES</h1>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '4px' }}>CORRETAJE SMART & EXCLUSIVO</span>
                </div>
            </div>

            {/* Hero / Search */}
            <div style={{ maxWidth: '1200px', margin: '0 auto 4rem auto', position: 'relative' }}>
                <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(30,58,138,0.2) 100%)', border: '1px solid rgba(56,189,248,0.2)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Encuentra tu lugar en la <span style={{ color: '#38bdf8' }}>Smart City</span>.</h2>
                    <p style={{ color: '#94a3b8', marginBottom: '2.5rem' }}>Buscador inmobiliario hiperlocal con trazabilidad y seguridad VLS.</p>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
                            <input 
                                type="text"
                                placeholder="Buscar departamentos, parcelas o casas en La Serena..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', color: 'white', fontSize: '1rem' }}
                            />
                        </div>
                        <button style={{ background: '#38bdf8', color: '#0f172a', padding: '1rem 2rem', borderRadius: '16px', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Filter size={20} /> Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {PROPERTIES.map(prop => (
                    <motion.div 
                        key={prop.id}
                        whileHover={{ y: -10 }}
                        className="glass-panel"
                        style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(30,41,59,0.5)' }}
                    >
                        <div style={{ height: '240px', position: 'relative' }}>
                            <img src={prop.img} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex', gap: '8px' }}>
                                <span style={{ background: '#38bdf8', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>{prop.tag}</span>
                                {prop.featured && <span style={{ background: '#f59e0b', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold' }}>DESTACADO</span>}
                            </div>
                            <button style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.4)', border: 'none', padding: '8px', borderRadius: '50%', color: 'white', backdropFilter: 'blur(5px)' }}>
                                <Heart size={18} />
                            </button>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{prop.title}</h3>
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <MapPin size={14} /> {prop.location}
                                    </span>
                                </div>
                                <span style={{ color: '#38bdf8', fontSize: '1.25rem', fontWeight: 'bold' }}>{prop.price}</span>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Key size={14} /> {prop.beds} Dorm.</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ShieldCheck size={14} /> {prop.baths} Baños</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Ruler size={14} /> {prop.size}</div>
                            </div>

                            <button 
                                onClick={() => setSelectedProp(prop)}
                                style={{ width: '100%', padding: '1rem', borderRadius: '14px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                Ver Detalles <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Trust Badges */}
            <div style={{ maxWidth: '1200px', margin: '4rem auto 0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                <div style={{ padding: '2rem' }}>
                    <TrendingUp size={32} color="#38bdf8" style={{ marginBottom: '1rem' }} />
                    <h4>Plusvalía Smart</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Análisis predictivo de crecimiento urbano sectorial.</p>
                </div>
                <div style={{ padding: '2rem' }}>
                    <ShieldCheck size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
                    <h4>Trazabilidad Total</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Operaciones verificadas bajo el estamento VLS.</p>
                </div>
                <div style={{ padding: '2rem' }}>
                    <Star size={32} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                    <h4>Atención Premium</h4>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Corredores expertos en el mercado de La Serena.</p>
                </div>
            </div>

            {/* Modal Detail Placeholder */}
            {selectedProp && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel" style={{ maxWidth: '800px', width: '100%', padding: '2rem', borderRadius: '32px', position: 'relative' }}>
                        <button onClick={() => setSelectedProp(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white' }}>
                            <ArrowLeft size={24} />
                        </button>
                        <h2 style={{ color: '#38bdf8' }}>{selectedProp.title}</h2>
                        {/* More detail here... */}
                    </motion.div>
                </div>
            )}
        </div>
    );
}
