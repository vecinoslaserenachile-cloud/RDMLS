import React, { useState } from 'react';
import { Pill, Leaf, CircleDot, Activity, X, Info, Search } from 'lucide-react';

export default function BoticaVecinal({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAilment, setSelectedAilment] = useState(null);

    // Base de Datos Estática "Triángulo del Alivio"
    const ailments = [
        {
            id: 'dolor_cabeza',
            name: 'Dolor de Cabeza (Cefalea Leve)',
            tags: ['migraña', 'pesadez', 'estrés'],
            popular: 'Infusión de manzanilla o tilo con gotas de limón. Paños fríos en la frente durante 15 minutos en oscuridad total.',
            formal: 'Paracetamol (500mg) o Ibuprofeno (400mg) - Solo medicamentos de Venta Libre (OTC) según prospecto.',
            oriental: 'Acupresión en el punto LI-4 (Hegu): entre la base del dedo pulgar y el índice. Presionar firmemente por 2 minutos. No usar en embarazadas.'
        },
        {
            id: 'malestar_estomacal',
            name: 'Malestar Estomacal / Indigestión',
            tags: ['acidez', 'pesadez', 'nausea'],
            popular: 'Agüita de menta piperita, bailahuén o manzanilla. Evitar comer por un par de horas.',
            formal: 'Sales de fruta (Bicarbonato), Omeprazol (20mg OTC), o Antiespasmódicos comunes de farmacia.',
            oriental: 'Punto PC-6 (Neiguan): en la cara interna del antebrazo, a tres dedos de la muñeca. Presionar para aliviar nauseas.'
        },
        {
            id: 'estres_ansiedad',
            name: 'Estrés y Tensión Muscular',
            tags: ['nervios', 'cuello', 'ansiedad'],
            popular: 'Agüita de Melisa (Toronjil) o Lavanda antes de dormir. Baño de pies caliente con sal gruesa.',
            formal: 'Relajantes musculares OTC de baja dosis. Suplementos de Magnesio.',
            oriental: 'Punto GB-21 (Jianjing): ubicado a mitad de camino entre el inicio del cuello y el hombro. Masajear en círculos.'
        }
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setSelectedAilment(null); // Reset detail view
    };

    const results = ailments.filter(a => 
        a.name.toLowerCase().includes(searchTerm) || 
        a.tags.some(t => t.toLowerCase().includes(searchTerm))
    );

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100000, background: '#020617', color: 'white', display: 'flex', flexDirection: 'column' }}>
            {/* Header Botica */}
            <div style={{ background: '#0f172a', padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '10px', borderRadius: '12px' }}>
                        <Activity size={30} color="#10b981" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', margin: '0' }}>La Botica Vecinal</h1>
                        <p style={{ margin: '0', color: '#10b981', fontWeight: 'bold' }}>El Triángulo del Alivio</p>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '10px', borderRadius: '50%' }}>
                    <X size={24} />
                </button>
            </div>

            {/* Aviso Legal Obligatorio */}
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', borderBottom: '1px solid #f59e0b', padding: '1rem', color: '#fcd34d', fontSize: '0.9rem', display: 'flex', justifyContent: 'center', gap: '10px', textAlign: 'center' }}>
                <Info size={18} style={{ flexShrink: 0 }} />
                <span>
                    <strong>SISTEMA NO MÉDICO:</strong> Esta guía solo recopila saberes populares y prácticas preventivas de baja complejidad validadas. No reemplaza el diagnóstico de un profesional ni un tratamiento médico calificado.
                </span>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Panel de Búsqueda */}
                <div style={{ width: '350px', borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>
                    <div style={{ padding: '2rem 1.5rem' }}>
                        <div style={{ position: 'relative', marginBottom: '2rem' }}>
                            <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '15px', top: '15px' }} />
                            <input 
                                type="text"
                                placeholder="Ej: Dolor, Acidez, Estrés..."
                                value={searchTerm}
                                onChange={handleSearch}
                                style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.5)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '1rem', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <h3 style={{ fontSize: '0.8rem', color: '#64748b', letterSpacing: '1px', marginBottom: '10px' }}>DOLENCIAS FRECUENTES</h3>
                            {results.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedAilment(item)}
                                    style={{ textAlign: 'left', background: selectedAilment?.id === item.id ? 'rgba(16, 185, 129, 0.2)' : 'transparent', border: selectedAilment?.id === item.id ? '1px solid #10b981' : '1px solid transparent', padding: '1rem', borderRadius: '12px', cursor: 'pointer', transition: '0.2s', borderBottom: selectedAilment?.id !== item.id ? '1px solid rgba(255,255,255,0.05)' : '' }}
                                    className="hover-bg"
                                >
                                    <strong style={{ display: 'block', color: 'white', fontSize: '1.05rem', marginBottom: '4px' }}>{item.name}</strong>
                                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Menciones: {item.tags.join(', ')}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Área de Visualización (El Triángulo) */}
                <div style={{ flex: 1, padding: '3rem', overflowY: 'auto', background: 'radial-gradient(circle at bottom right, #064e3b, #020617)' }}>
                    {!selectedAilment ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.5, textAlign: 'center' }}>
                            <Activity size={80} style={{ marginBottom: '1rem' }} />
                            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Selecciona un síntoma leve en el buscador</h2>
                            <p>El sistema cruzará datos de las tres ciencias de alivio.</p>
                        </div>
                    ) : (
                        <div className="scale-in">
                            <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: 'white' }}>{selectedAilment.name}</h2>
                            <p style={{ color: '#10b981', fontSize: '1.2rem', marginBottom: '3rem' }}>Protocolo de Acción Preventiva (Triángulo de Resiliencia)</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                {/* Pilar 1: Popular */}
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '24px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', background: '#eab308', padding: '12px', borderRadius: '50%' }}>
                                        <Leaf size={28} color="#0f172a" />
                                    </div>
                                    <h3 style={{ textAlign: 'center', color: '#fde047', marginTop: '30px', marginBottom: '1.5rem' }}>CIENCIA POPULAR</h3>
                                    <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem' }}>
                                        {selectedAilment.popular}
                                    </p>
                                    <span style={{ display: 'block', marginTop: '20px', fontSize: '0.75rem', color: '#64748b' }}>Trasmisión Oral Regional / Remedios de Campo</span>
                                </div>

                                {/* Pilar 2: Formal (OTC) */}
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '24px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', background: '#38bdf8', padding: '12px', borderRadius: '50%' }}>
                                        <Pill size={28} color="#0f172a" />
                                    </div>
                                    <h3 style={{ textAlign: 'center', color: '#bae6fd', marginTop: '30px', marginBottom: '1.5rem' }}>CIENCIA FORMAL</h3>
                                    <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem' }}>
                                        {selectedAilment.formal}
                                    </p>
                                    <span style={{ display: 'block', marginTop: '20px', fontSize: '0.75rem', color: '#64748b' }}>Medicamentos de Venta Libre (Sin Receta Estricta)</span>
                                </div>

                                {/* Pilar 3: Oriental */}
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '24px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', background: '#ec4899', padding: '12px', borderRadius: '50%' }}>
                                        <CircleDot size={28} color="#0f172a" />
                                    </div>
                                    <h3 style={{ textAlign: 'center', color: '#fbcfe8', marginTop: '30px', marginBottom: '1.5rem' }}>CIENCIA ORIENTAL</h3>
                                    <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem' }}>
                                        {selectedAilment.oriental}
                                    </p>
                                    <span style={{ display: 'block', marginTop: '20px', fontSize: '0.75rem', color: '#64748b' }}>Digitopuntura y Meridianos Básicos</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .hover-bg:hover { background: rgba(255,255,255,0.05) !important; }
                .scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
}
