import React from 'react';
import { motion } from 'framer-motion';
import { Music, Star, BookOpen, Telescope, Hammer, Wind, Disc, Mic2, Tv, Users, Heart, Share2, Zap, Play, Disc as Vinyl, Headphones, Info } from 'lucide-react';

const INSTRUMENTS = [
    { id: 'arpa', name: 'Arpa VLS', type: 'Cuerdas', icon: Music, desc: 'Instrumento maestro de madera noble.' },
    { id: 'guitarra', name: 'Guitarra Serenera', type: 'Cuerdas', icon: Music, desc: 'La compañera de las peñas regionales.' },
    { id: 'charango', name: 'Charango del Valle', type: 'Cuerdas', icon: Zap, desc: 'El pulso andino de nuestra identidad.' },
    { id: 'flauta', name: 'Flauta Trasversa', type: 'Viento', icon: Wind, desc: 'Melodía pura de la Quebrada.' }
];

export default function MusicSchoolVLS({ onClose }) {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000000, background: 'linear-gradient(135deg, #451a03, #1c1917)', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* COMPITA HEADER */}
            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '2rem 4rem', borderBottom: '6px solid #fbbf24', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <div style={{ background: '#fbbf24', padding: '15px', borderRadius: '50%', boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)' }}>
                        <Telescope color="#451a03" size={30} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '900', letterSpacing: '3px' }}>VLS ACADEMIA</h2>
                        <span style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 'bold', letterSpacing: '2px' }}>LUTHERÍA • MÚSICA • CIENCIA • ARTE (LAS COMPAÑÍAS)</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'white', color: '#451a03', border: 'none', padding: '15px 40px', borderRadius: '15px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>VOLVER AL BARRIO</button>
            </div>

            <div style={{ flex: 1, padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', overflowY: 'auto' }}>
                
                {/* 1. EL TALLER DE LUTHERÍA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
                            <Hammer color="#fbbf24" size={32} />
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>Taller del Luthier Compita</h3>
                        </div>
                        <p style={{ fontSize: '1.1rem', color: '#d6d3d1', lineHeight: '1.8', marginBottom: '2rem' }}>
                            "Cada pedazo de madera tiene una melodía oculta. Solo hay que saber escucharla y darle forma." — *Compita (Las Compañías)*
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {INSTRUMENTS.map(inst => (
                                <motion.div whileHover={{ scale: 1.05 }} key={inst.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <inst.icon color="#fbbf24" style={{ marginBottom: '10px' }} />
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{inst.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#a8a29e' }}>{inst.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ACORDES ABC */}
                    <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2.5rem', borderRadius: '40px', border: '1px solid #fbbf2433' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem' }}>DICCIONARIO DE ACORDES SOBERANOS (A-B-C)</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                            {['A (La)', 'B (Si)', 'C (Do)', 'D (Re)', 'E (Mi)', 'F (Fa)', 'G (Sol)'].map(note => (
                                <span key={note} style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '15px', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)' }}>{note}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. EL OBSERVATORIO DEL COMPITA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'linear-gradient(to bottom, #0c0a09, #451a03)', padding: '3.5rem', borderRadius: '40px', border: '4px solid #fbbf24', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                        <Star style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.3 }} />
                        <Star style={{ position: 'absolute', bottom: '20px', right: '40px', opacity: 0.3 }} />
                        
                        <div style={{ width: '120px', height: '120px', background: 'rgba(251, 191, 36, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                             <Telescope size={60} color="#fbbf24" />
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#fbbf24', marginBottom: '1.5rem' }}>OBSERVATORIO ESTELAR</h3>
                        <p style={{ color: '#d6d3d1', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                            Con el telescopio artesanal de Compita, los vecinos de La Serena pueden mirar "la luna, las estrellas y el más allá". Un viaje científico y poético desde el norte.
                        </p>
                        <button style={{ width: '100%', background: '#fbbf24', color: '#000', padding: '1.5rem', borderRadius: '25px', border: 'none', fontWeight: '900', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                            <Play fill="#000" /> MIRAR EL MÁS ALLÁ
                        </button>
                    </div>

                    {/* ESCUELAS FEED */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2.5rem', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                            <Users color="#fbbf24" />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Compita en las Escuelas</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '20px' }}>
                                <div style={{ fontWeight: 'bold', color: '#fbbf24' }}>Hoy:</div>
                                <div style={{ fontSize: '0.9rem' }}>Visita a la Escuela J. Peña Hen — Taller de Luthería.</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '20px' }}>
                                <div style={{ fontWeight: 'bold', color: '#fbbf24' }}>Mañana:</div>
                                <div style={{ fontSize: '0.9rem' }}>Observación Estelar en Colina El Pino (con Alpino).</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* STATUS FOOTER */}
            <div style={{ padding: '1.5rem 4rem', background: 'rgba(0,0,0,0.5)', color: '#a8a29e', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <BookOpen size={16} color="#fbbf24" />
                    <span>VLS ACADEMIA — LAS COMPAÑÍAS, LA SERENA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    <Heart size={16} color="#fbbf24" />
                    <span>EL COMPITA NOS ENSEÑA A MIRAR</span>
                    <span>© COMUNA SMART</span>
                </div>
            </div>
        </div>
    );
}
