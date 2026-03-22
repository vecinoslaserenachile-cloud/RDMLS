import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, PartyPopper, Users, Footprints, Car, Star, History, Camera, Play, Volume2 } from 'lucide-react';

export default function GalaxiaDiscoteque({ onClose }) {
    const [activeTab, setActiveTab] = useState('discos');

    const discos = [
        { id: 'galaxia', name: 'Galaxia', desc: 'La leyenda de calle Balmaceda. El epicentro del baile.', sound: 'Disco Beats' },
        { id: 'burbuja', name: 'Burbuja', desc: 'Espuma, luces y los mejores hits de los 80.', sound: 'Classic Pop' },
        { id: 'sundance', name: 'Sundance', desc: 'Vibras veraniegas y noches inolvidables.', sound: 'Summer Hits' },
        { id: 'bcool', name: 'BCool', desc: 'El refugio de la mejor música alternativa y pop.', sound: '90s Mix' }
    ];

    const colegios = [
        { name: 'Sagrados Corazones', year: 'Años 80/90', theme: 'Kermesse & Fiesta de Gala' },
        { name: 'Gerónimo Rendic', year: 'Años 90', theme: 'Interescolares & Alianzas' },
        { name: 'Liceo Gregorio Cordovez', year: 'Tradición Histórica', theme: 'Fiestas de la Primavera' },
        { name: 'San Antonio', year: 'Mística Familiar', theme: 'Eventos Benéficos' },
        { name: 'GIN (Gerónimo de Alderete)', year: 'Espíritu Juvenil', theme: 'Tocatas y Bailes' },
        { name: 'El Castillo', year: 'Exclusividad', theme: 'Graduaciones Míticas' }
    ];

    const rutas = [
        { id: 'caminata', name: 'Caminata al Centro', icon: Footprints, desc: 'Bajar por la Avenida desde el Milagro hasta Balmaceda. Risas y planes.', color: '#10b981' },
        { id: 'colectivo', name: 'Colectivo Vista Hermosa', icon: Car, desc: 'El viaje legendario desde la colina hasta La Cantera. Todos apretados pero felices.', color: '#38bdf8' }
    ];

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                className="glass-panel"
                style={{
                    position: 'fixed',
                    inset: window.innerWidth < 768 ? '0' : '5%',
                    zIndex: 250000,
                    background: 'rgba(2, 6, 23, 0.98)',
                    border: '1px solid rgba(236, 72, 153, 0.4)',
                    boxShadow: '0 0 100px rgba(236, 72, 153, 0.2)',
                    display: 'flex', flexDirection: 'column',
                    borderRadius: window.innerWidth < 768 ? '0' : '24px',
                    overflow: 'hidden',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {/* Header Neon */}
                <div style={{ padding: '1.5rem', background: 'rgba(236, 72, 153, 0.1)', borderBottom: '1px solid rgba(236, 72, 153, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div className="pulse" style={{ background: '#ec4899', padding: '10px', borderRadius: '12px' }}>
                            <PartyPopper color="white" size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.5rem', letterSpacing: '2px', fontWeight: '900', textTransform: 'uppercase' }}>Galaxia Discoteque</h2>
                            <p style={{ margin: 0, color: '#ec4899', fontSize: '0.8rem', fontWeight: 'bold' }}>LOS RECUERDOS DE LA CANTERA & EL CENTRO</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '5px', padding: '1rem', background: 'rgba(0,0,0,0.3)' }}>
                    {['discos', 'colegios', 'rutas'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1, padding: '0.8rem', borderRadius: '12px', border: 'none',
                                background: activeTab === tab ? '#ec4899' : 'rgba(255,255,255,0.05)',
                                color: activeTab === tab ? 'white' : 'rgba(255,255,255,0.6)',
                                fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', transition: '0.3s'
                            }}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignContent: 'start' }}>
                    {activeTab === 'discos' && discos.map(disco => (
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            key={disco.id} 
                            style={{ 
                                padding: '1.5rem', borderRadius: '20px', 
                                background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(0,0,0,0.6) 100%)',
                                border: '1px solid rgba(236,72,153,0.3)',
                                display: 'flex', flexDirection: 'column', gap: '10px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, color: 'white', fontSize: '1.4rem' }}>{disco.name}</h3>
                                <Music size={20} color="#ec4899" />
                            </div>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{disco.desc}</p>
                            <button style={{ marginTop: '10px', background: 'rgba(236,72,153,0.2)', border: '1px solid #ec4899', color: '#ec4899', padding: '8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Play size={14} fill="currentColor" /> ACTIVAR SONIDO ({disco.sound})
                            </button>
                        </motion.div>
                    ))}

                    {activeTab === 'colegios' && colegios.map(col => (
                        <div key={col.name} style={{ padding: '1.2rem', borderRadius: '15px', background: 'rgba(255,191,36,0.05)', border: '1px solid rgba(255,191,36,0.3)', display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div style={{ background: '#fbbf24', padding: '10px', borderRadius: '10px' }}>
                                <Users color="black" size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, color: '#fbbf24', fontSize: '1.1rem' }}>{col.name}</h4>
                                <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{col.theme} • {col.year}</p>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'rutas' && rutas.map(ruta => (
                        <div key={ruta.id} style={{ padding: '1.5rem', borderRadius: '20px', background: `${ruta.color}10`, border: `1px solid ${ruta.color}40`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ruta.icon size={24} color={ruta.color} />
                                <h3 style={{ margin: 0, color: 'white' }}>{ruta.name}</h3>
                            </div>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{ruta.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Footer Visual */}
                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', textAlign: 'center', borderTop: '1px solid rgba(236, 72, 153, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                            <Camera size={14} /> FOTOS DE LA ÉPOCA
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                            <History size={14} /> CRÓNICAS NOCTURNAS
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
                            <Volume2 size={14} /> AUDIO ORIGINAL VLS
                        </div>
                    </div>
                </div>

                <style>{`
                    .pulse { animation: pulse_pink 2s infinite ease-in-out; }
                    @keyframes pulse_pink { 0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(236, 72, 153, 0); } 100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); } }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
