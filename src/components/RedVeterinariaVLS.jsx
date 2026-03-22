import React, { useState } from 'react';
import { Dog, Search, Phone, Stethoscope, AlertCircle, MapPin, X, HeartPulse } from 'lucide-react';

export default function RedVeterinariaVLS({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('ALL'); // 'ALL', 'URGENCIAS', 'PREVENTIVA', 'ESPECIALISTAS'

    const clinicas = [
        {
            id: 1,
            name: 'Hospital Veterinario Coquimbo',
            city: 'Coquimbo',
            category: 'URGENCIAS',
            address: 'Av. Videla 445',
            phone: '+56900000001',
            description: 'Atención crítica 24/7 y cirugías complejas. Rayos X de emergencia.'
        },
        {
            id: 2,
            name: 'Clínica Preventiva San Roque',
            city: 'La Serena',
            category: 'PREVENTIVA',
            address: 'Balmaceda 1200',
            phone: '+56900000002',
            description: 'Vacunación, controles sanos, chips y desparasitación comunitaria.'
        },
        {
            id: 3,
            name: 'Centro Integral Ovalle',
            city: 'Ovalle',
            category: 'ESPECIALISTAS',
            address: 'Libertad 300',
            phone: '+56900000003',
            description: 'Dermatología, Neurología y Traumatología avanzada de animales mayores/menores.'
        },
        {
            id: 4,
            name: 'Veterinaria Las Compañías 24 Hrs',
            city: 'La Serena',
            category: 'URGENCIAS',
            address: 'Av. Argentina 800',
            phone: '+56900000004',
            description: 'Recepción rápida de traumatismos y urgencias nocturnas.'
        }
    ];

    const results = clinicas.filter(cl => {
        const matchesTerm = cl.name.toLowerCase().includes(searchTerm.toLowerCase()) || cl.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = filterCategory === 'ALL' || cl.category === filterCategory;
        return matchesTerm && matchesCat;
    });

    const categories = [
        { id: 'ALL', label: 'Ver Todo', icon: <Search size={16} /> },
        { id: 'URGENCIAS', label: 'Urgencias 24h', icon: <HeartPulse size={16} /> },
        { id: 'PREVENTIVA', label: 'Preventiva Básica', icon: <Stethoscope size={16} /> },
        { id: 'ESPECIALISTAS', label: 'Especialistas', icon: <AlertCircle size={16} /> }
    ];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column' }}>
            {/* Encabezado Institucional */}
            <div style={{ padding: '2rem 3rem', background: 'linear-gradient(90deg, #b91c1c, #020617)', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ background: 'white', color: '#b91c1c', padding: '15px', borderRadius: '50%', boxShadow: '0 0 20px rgba(185, 28, 28, 0.5)' }}>
                        <Dog size={32} />
                    </div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2rem', fontFamily: 'sans-serif' }}>Directorio "Amigos 360"</h1>
                        <p style={{ margin: 0, color: '#fca5a5', fontWeight: 'bold' }}>Red Veterinaria Primaria de la Región (La Serena, Coquimbo, Ovalle)</p>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '10px' }}>
                    <X size={30} />
                </button>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Panel de Filtros Laterales */}
                <div style={{ width: '300px', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '2rem', background: '#0f172a' }}>
                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                        <input 
                            type="text" 
                            placeholder="Buscar sector o centro..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px 12px 12px 40px', borderRadius: '30px', outline: 'none' }}
                        />
                    </div>

                    <h3 style={{ color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}>SISTEMA DE TRIAGE (Red VLS)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilterCategory(cat.id)}
                                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: filterCategory === cat.id ? '#b91c1c' : 'rgba(255,255,255,0.05)', border: filterCategory === cat.id ? '1px solid #fca5a5' : '1px solid transparent', color: 'white', padding: '15px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: '0.2s' }}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ background: '#f59e0b20', border: '1px solid #f59e0b', color: '#fcd34d', padding: '15px', borderRadius: '12px', marginTop: '2rem', fontSize: '0.8rem', lineHeight: '1.5' }}>
                        <strong>Responsabilidad Cívica:</strong> Utilice el servicio de <em>Urgencias 24h</em> exclusivamente ante riesgo inminente de vida animal para no saturar la red regional.
                    </div>
                </div>

                {/* Directorio Resultados */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ margin: 0, color: 'white' }}>Centros Disponibles ({results.length})</h2>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Conexión Telefónica Inmediata Activada</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                        {results.map(cl => (
                            <div key={cl.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                                {/* Cinta Categoría */}
                                <div style={{ position: 'absolute', top: 0, right: 0, padding: '5px 15px', background: cl.category === 'URGENCIAS' ? '#b91c1c' : cl.category === 'PREVENTIVA' ? '#10b981' : '#38bdf8', color: cl.category === 'PREVENTIVA' ? '#0f172a' : 'white', fontSize: '0.7rem', fontWeight: '900', borderBottomLeftRadius: '15px' }}>
                                    {cl.category}
                                </div>

                                <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem', color: 'white', paddingRight: '100px' }}>{cl.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                                    <MapPin size={14} /> {cl.address}, {cl.city}
                                </div>

                                <p style={{ color: '#cbd5e1', lineHeight: '1.5', flex: 1, marginBottom: '2rem' }}>
                                    {cl.description}
                                </p>

                                <a 
                                    href={`tel:${cl.phone}`} 
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', textDecoration: 'none', padding: '1rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '1.1rem', transition: '0.2s', cursor: 'pointer' }}
                                    className="hover-call"
                                >
                                    <Phone size={20} /> Llamar a Clínica (P2P)
                                </a>
                            </div>
                        ))}

                        {results.length === 0 && (
                            <div style={{ color: '#64748b', textAlign: 'center', gridColumn: '1 / -1', padding: '4rem 0' }}>
                                <AlertCircle size={50} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <h3>No hay centros bajo este criterio</h3>
                                <p>Intente modificar su región o nivel de urgencia.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .hover-call:hover { background: #10b981 !important; color: #020617 !important; }
            `}</style>
        </div>
    );
}
