import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Car, Zap, ShieldCheck, BatteryCharging, Gauge, MapPin, Calendar, Tag, Search, Phone, ExternalLink, MessageSquare, Info } from 'lucide-react';

const MOCK_USADOS = [
    { id: 1, marca: 'Toyota', modelo: 'RAV4', año: 2021, km: '45.000', precio: '$15.990.000', img: '/vls_used_suv.png', estado: 'Excelente' },
    { id: 2, marca: 'Hyundai', modelo: 'Tucson', año: 2019, km: '68.000', precio: '$13.490.000', img: '/vls_used_suv.png', estado: 'Muy Bueno' },
    { id: 3, marca: 'Nissan', modelo: 'Kicks', año: 2022, km: '22.000', precio: '$16.500.000', img: '/vls_used_suv.png', estado: 'Como Nuevo' },
    { id: 4, marca: 'KIA', modelo: 'Sportage', año: 2020, km: '55.000', precio: '$14.200.000', img: '/vls_used_suv.png', estado: 'Excelente' },
    { id: 5, marca: 'Mazda', modelo: 'CX-5', año: 2021, km: '41.000', precio: '$15.800.000', img: '/vls_used_suv.png', estado: 'Excelente' },
    { id: 6, marca: 'Chevrolet', modelo: 'Tracker', año: 2018, km: '89.000', precio: '$11.900.000', img: '/vls_used_suv.png', estado: 'Bueno' }
];

export default function VLSMotorsShowroom() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('nuevos'); // 'nuevos' o 'usados'
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsados = MOCK_USADOS.filter(auto => 
        auto.marca.toLowerCase().includes(searchQuery.toLowerCase()) || 
        auto.modelo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
            {/* Nav Header */}
            <div style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/hub')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.8rem', borderRadius: '50%', color: 'white', cursor: 'pointer' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Car color="#38bdf8" size={24} /> VLS MOTORS
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Red Automotriz Smart City</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: '30px' }}>
                    <button 
                        onClick={() => setActiveTab('nuevos')}
                        style={{ padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s',
                                 background: activeTab === 'nuevos' ? '#38bdf8' : 'transparent', color: activeTab === 'nuevos' ? '#0f172a' : 'white' }}
                    >
                        Showroom 0KM
                    </button>
                    <button 
                        onClick={() => setActiveTab('usados')}
                        style={{ padding: '0.5rem 1.5rem', borderRadius: '20px', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s',
                                 background: activeTab === 'usados' ? '#38bdf8' : 'transparent', color: activeTab === 'usados' ? '#0f172a' : 'white' }}
                    >
                        Compraventa Usados
                    </button>
                </div>
            </div>

            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'nuevos' ? (
                        <motion.div key="nuevos" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            {/* Hero Section Nuevos */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'center', marginBottom: '4rem' }}>
                                {/* Avatar y Bienvenida */}
                                <div style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(56, 189, 248, 0.05))', borderRadius: '32px', padding: '2rem', border: '1px solid rgba(56,189,248,0.2)', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: '#38bdf8', filter: 'blur(100px)', opacity: 0.2 }}></div>
                                    <img src="/avatars/vls_asesor_mechanic.png" alt="Mecánico Serenito" style={{ width: '100%', height: '250px', objectFit: 'contain', zIndex: 2, position: 'relative', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} />
                                    
                                    <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: '1rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', color: '#38bdf8' }}>¡Hola! Soy tu Asesor Inteligente</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>Descubre el futuro de la movilidad eléctrica en La Serena. Cero emisiones, máxima eficiencia.</p>
                                    </div>
                                </div>

                                {/* Auto Principal */}
                                <div style={{ borderRadius: '32px', position: 'relative', height: '500px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
                                    <img src="/vls_ev_hero.png" alt="VLS Smart EV" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617 0%, transparent 60%)' }}></div>
                                    
                                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div>
                                                <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(56,189,248,0.5)', color: '#38bdf8', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '1rem' }}>FLAGSHIP VLS / SIMULACIÓN</div>
                                                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 1rem 0', letterSpacing: '-2px', textShadow: '0 10px 20px rgba(0,0,0,0.8)' }}>TITAN EV CONCEPT</h2>
                                            </div>
                                            
                                            {/* CALL TO ACTION PARA SPONSORS / MARCAS */}
                                            <div style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(15px)', border: '1px solid rgba(245, 158, 11, 0.5)', borderRadius: '20px', padding: '1.5rem', maxWidth: '350px', textAlign: 'right', boxShadow: '0 15px 30px rgba(0,0,0,0.5)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem', color: '#f59e0b' }}><Info size={24} /></div>
                                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.1rem' }}>¿Y por qué no exhibes aquí tu marca?</h4>
                                                <p style={{ margin: '0 0 1rem 0', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.4' }}>Muestra tu última versión 2026/2027, tu híbrido estrella o tu clásico en el showroom más innovador de La Serena.</p>
                                                <button style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: '900', cursor: 'pointer', width: '100%', transition: '0.3s' }}>Convertirse en Sponsor</button>
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                            <MetricCard icon={<BatteryCharging />} label="Autonomía" value="520 km" />
                                            <MetricCard icon={<Gauge />} label="Aceleración" value="0-100 en 3.2s" />
                                            <MetricCard icon={<Zap />} label="Potencia" value="480 HP" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="usados" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            {/* Cabecera Mercado Usados */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 0.5rem 0' }}>Mercado de Usados VLS</h2>
                                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '1.1rem' }}>Compraventa segura, validada por la red vecinal.</p>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ position: 'relative', width: '300px' }}>
                                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                        <input 
                                            type="text" 
                                            placeholder="Buscar marca o modelo..." 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ width: '100%', background: 'transparent', border: 'none', padding: '0.8rem 1rem 0.8rem 2.5rem', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <button style={{ background: '#f59e0b', color: 'black', border: 'none', padding: '0 1.5rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                                        Publicar Vehículo
                                    </button>
                                </div>
                            </div>

                            {/* Grilla Usados */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                                {filteredUsados.map(auto => (
                                    <motion.div whileHover={{ y: -5 }} key={auto.id} style={{ background: '#0f172a', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                                        <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                            <img src="/vls_used_suv.png" alt={auto.modelo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(5px)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                {auto.estado}
                                            </div>
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.4rem' }}>{auto.marca} {auto.modelo}</h3>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.9rem' }}>
                                                    <Calendar size={16} color="#38bdf8" /> {auto.año}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.9rem' }}>
                                                    <Gauge size={16} color="#38bdf8" /> {auto.km} km
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.9rem' }}>
                                                    <MapPin size={16} color="#38bdf8" /> La Serena
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{auto.precio}</div>
                                                <button style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)', padding: '0.6rem 1.2rem', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: '0.3s', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                                    <MessageSquare size={16} /> Contactar
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

function MetricCard({ icon, label, value }) {
    return (
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '20px', flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.2)', padding: '10px', borderRadius: '12px', color: '#38bdf8' }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: 'white' }}>{value}</div>
            </div>
        </div>
    );
}
