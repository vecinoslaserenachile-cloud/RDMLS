import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Lock, X, ChevronRight, ChevronLeft, Tablet, Zap, CheckCircle, Flame, Waves, Map, Star, Sparkles, Megaphone, Volume2, Music, Mic2, Heart, Award, Globe, Languages, Anchor, PenTool, Share2, Rocket, FileText, Tv, Radio, Activity, AlertCircle, Clock, RefreshCcw, ClipboardList } from 'lucide-react';

const LIBRARY_DATA = [
    { id: 'memorias', title: 'Memorias de un Unicornio Técnico', author: 'vecinoslaserena.cl', type: 'bio', status: 'REAL' },
    { id: 'vls_tecnico', title: 'VLS: De 0 a 1 (Arquitectura)', author: 'vecinoslaserena.cl', type: 'technical', status: 'REAL' },
    { id: 'legado_historia', title: 'Legado de Soberanía: El Origen', author: 'vecinoslaserena.cl', type: 'bio', status: 'REAL' },
    { id: 'revancha_musica', title: 'La Revancha de la Música: Resiliencia en San Francisco', author: 'vecinoslaserena.cl', type: 'bio', status: 'REAL' },
    { id: 'serena_barcelona', title: 'De La Serena a Barcelona: El Viaje del Arquitecto', author: 'vecinoslaserena.cl', type: 'bio', status: 'REAL' },
    { id: 'legado_identidad', title: 'El Corazón de la Red: Protección y Memoria', author: 'vecinoslaserena.cl', type: 'bio', status: 'REAL' },
    { id: 'manifiesto_fa', title: 'Manifiesto ¡FA!: Sensibilidad, Hogar y Atrevimiento', author: 'Filosofía VLS', type: 'history', status: 'REAL' },
    { id: 'plan_serena', title: 'El Plan Serena: La Gran Transformación (1948-1952)', author: 'Arquitectura Regional', type: 'history', status: 'REAL' },
    { id: 'ley_maldita', title: 'La Ley Maldita y Las Rojas: Memoria Prohibida', author: 'vecinoslaserena.cl', type: 'history', status: 'REAL' },
    { id: 'bitacora_resiliencia', title: 'Bitácora de la Resiliencia: La Serena (1973-2026)', author: 'vecinoslaserena.cl', type: 'history', status: 'REAL' },
    { id: 'casas_patrimoniales', title: 'Arquitectura de las Escuelas (2, 26, Clausen, Piñera)', author: 'Arquitectura Comunal', type: 'technical', status: 'REAL' },
    { id: 'pagos_soberanos', title: 'Pasarela de Pagos VLS', author: 'Finanzas Soberanas', type: 'technical', status: 'REAL' },
    { id: 'estudio_creativo', title: 'Estudio Creativo (Versión Beta)', author: 'IA Institucional', type: 'studio', status: 'BETA' }
];

const FESTIVAL_LINEUP = [
    { id: 1, name: 'SOPHIE ELLIS (International Node)', type: 'headliner', status: 'confirmed' },
    { id: 2, name: 'Hito: San Francisco (El Flipper)', type: 'memory', status: 'monumented' },
    { id: 3, name: 'Casa Clausen & Piñera (Cero Abuso)', type: 'memory', status: 'marked' },
    { id: 4, name: 'Octubre 16: La Peor Lección', type: 'history', status: 'reflexive' },
    { id: 5, name: 'Artistas Locales Soberanos', type: 'local', status: 'auditioning' },
];

const STATUS_MAP = {
    'REAL': { label: 'REAL / OPERATIVO', color: '#22c55e', icon: CheckCircle },
    'BETA': { label: 'EN PRUEBAS (BETA)', color: '#38bdf8', icon: Activity },
    'DESARROLLO': { label: 'EN DESARROLLO', color: '#fcd34d', icon: Zap },
    'PROYECTADO': { label: 'PROYECTADO / FUTURO', color: '#8b5cf6', icon: Clock }
};

export default function LibraryPortal({ onClose }) {
    const [selectedBook, setSelectedBook] = useState(null);
    const [tab, setTab] = useState('all'); 
    const [isWriting, setIsWriting] = useState(false);
    const [showRefund, setShowRefund] = useState(false);

    const filteredBooks = tab === 'all' ? LIBRARY_DATA : LIBRARY_DATA.filter(b => b.type === tab);

    if (showRefund) {
        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: '#020617', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.98)', padding: '1rem 3rem', borderBottom: '1px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <RefreshCcw color="#38bdf8" size={30} />
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>CENTRO DE GARANTÍA VLS — SATISFACCIÓN 30 DÍAS</h2>
                    </div>
                    <button onClick={() => setShowRefund(false)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR</button>
                </div>
                
                <div style={{ flex: 1, padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.3)', background: 'linear-gradient(135deg, #0f172a, #161e31)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <Shield size={60} color="#38bdf8" />
                            <h2 style={{ color: 'white', marginTop: '1.5rem', fontSize: '2rem' }}>SOLICITUD DE DEVOLUCIÓN</h2>
                            <p style={{ color: '#64748b' }}>Protocolo de Transparencia VLS: Explique y fundamente su caso técnico o humano.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                            <input type="text" placeholder="ID de Transacción / Ficha VLS" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '16px', fontSize: '1rem' }} />
                            <textarea placeholder="Explique detalladamente por qué solicita la devolución (Mínimo 100 caracteres)..." style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '16px', fontSize: '1rem', minHeight: '200px' }}></textarea>
                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(252, 211, 77, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(252, 211, 77, 0.2)' }}>
                            <Star color="#fcd34d" size={32} style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>SUEÑOS SOBERANOS</h4>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Hacia el futuro: Ingeniería, Veterinaria y el mañana de nuestros hijos.</p>
                            <button style={{ marginTop: '1rem', background: 'transparent', color: '#fcd34d', padding: '8px 20px', borderRadius: '10px', border: '1px solid #fcd34d', fontSize: '0.7rem', fontWeight: 'bold' }}>VER VISIÓN 2027</button>
                        </div>
                        <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '2rem', borderRadius: '30px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                            <Volume2 color="#38bdf8" size={32} style={{ marginBottom: '1.5rem' }} />
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>WHATSAPP ELITE HUB</h4>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Acceso exclusivo a la comunidad VLS para soporte y networking.</p>
                            <button style={{ marginTop: '1rem', background: 'transparent', color: '#38bdf8', padding: '8px 20px', borderRadius: '10px', border: '1px solid #38bdf8', fontSize: '0.7rem', fontWeight: 'bold' }}>ACCEDER AL HUB</button>
                        </div>
                       </div>
                            <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid #38bdf8', color: '#38bdf8', fontSize: '0.8rem', display: 'flex', gap: '10px' }}>
                                <AlertCircle size={30} />
                                <span>Su solicitud será revisada por el Panel VLS Admin en un plazo de 48h. El sistema de pagos notificará automáticamente una vez aprobado el filtro de fundamento.</span>
                            </div>

                            <button style={{ background: '#38bdf8', color: '#0f172a', fontWeight: '900', padding: '1.5rem', borderRadius: '16px', border: 'none', cursor: 'pointer', letterSpacing: '1px' }}>ENVIAR SOLICITUD DE GARANTÍA</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedBook) {
        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: '#020617', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.98)', padding: '1.2rem 3rem', borderBottom: '1px solid #38bdf8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Anchor color="#38bdf8" size={30} />
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>COMUNA SMART — BIBLIOTECA REAL</h2>
                    </div>
                    <button onClick={onClose} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>CERRAR</button>
                </div>

                <div style={{ flex: 1, padding: '3rem', maxWidth: '1400px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
                    
                    {/* TOP STATS & REFUND LINK */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                        {Object.entries(STATUS_MAP).map(([key, value]) => (
                            <div key={key} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '20px', border: `1px solid ${value.color}44`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <value.icon size={24} color={value.color} />
                                <span style={{ fontSize: '0.8rem', color: value.color, fontWeight: '900' }}>{value.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* REFUND PROMO */}
                    <div onClick={() => setShowRefund(true)} style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1.5rem 2.5rem', borderRadius: '24px', border: '1px dashed #38bdf8', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                             <RefreshCcw color="#38bdf8" />
                             <span style={{ color: 'white', fontWeight: 'bold' }}>Nuestra Garantía: 30 días de satisfacción total o devolución fundamentada.</span>
                         </div>
                         <button style={{ color: '#38bdf8', fontWeight: '900', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>ACCEDER AL CENTRO DE GARANTÍA</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                        {filteredBooks.map(book => {
                            const StatusIcon = STATUS_MAP[book.status].icon;
                            return (
                                <motion.div whileHover={{ y: -15, scale: 1.02 }} key={book.id} onClick={() => setSelectedBook(book)} style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(56, 189, 248, 0.2)', cursor: 'pointer', textAlign: 'center', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <StatusIcon size={14} color={STATUS_MAP[book.status].color} />
                                        <span style={{ fontSize: '0.6rem', color: STATUS_MAP[book.status].color, fontWeight: 'bold' }}>{book.status}</span>
                                    </div>
                                    {/* The button from the instruction is placed here, assuming it's a new element */}
                                    {book.id === 'revancha_musica' && ( // Example condition, adjust as needed
                                        <button onClick={(e) => { e.stopPropagation(); setShowPropuestaElDia(true); }} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '1rem', borderLeft: '4px solid #ef4444', position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            🚨 Alianza Estratégica Regional - Diario El Día
                                        </button>
                                    )}
                                    <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                       <Book size={60} color={book.status === 'REAL' ? '#38bdf8' : '#64748b'} />
                                    </div>
                                    <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{book.title}</h3>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{book.author}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000000, background: '#fdfdfd', color: '#111', display: 'flex', flexDirection: 'column', userSelect: 'none', fontFamily: "'Georgia', serif" }}>
            <div style={{ background: 'white', padding: '1.5rem 3rem', borderBottom: '3px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Tablet size={24} />
                    <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#666' }}>COMUNA SMART VLS — READING CONSOLE</div>
                </div>
                <div style={{ fontWeight: '900', fontSize: '0.85rem' }}>{selectedBook.title.toUpperCase()}</div>
                <button onClick={() => setSelectedBook(null)} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>SALIR</button>
            </div>
            {/* HERO SECTION */}
            <section style={{ 
                padding: '120px 20px 60px', 
                textAlign: 'center', 
                background: 'linear-gradient(to bottom, #0ea5e911, transparent)',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '2px', marginBottom: '1rem', color: 'white' }}>COMUNA SMART</h1>
                    <h2 style={{ fontSize: '1.2rem', color: '#0ea5e9', fontWeight: 'bold', marginBottom: '3rem' }}>BIBLIOTECA DE SOBERANÍA REAL</h2>
                </motion.div>

                {/* DEDICATORIAS SOBERANAS */}
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '30px', background: 'rgba(255,255,255,0.01)' }}
                >
                    <p style={{ fontStyle: 'italic', color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        "A mis hijos, porque ustedes son la única actualización de software que realmente importa."
                    </p>
                    <div style={{ height: '1px', width: '50px', background: '#0ea5e9', margin: '1rem auto' }} />
                    <p style={{ fontStyle: 'italic', color: '#64748b', fontSize: '0.9rem' }}>
                        "A Alma Fabiola."
                    </p>
                </motion.div>
            </section>
            <div style={{ flex: 1, padding: '5rem 2rem', display: 'flex', justifyContent: 'center', background: '#f0f0f0' }}>
               <div style={{ background: 'white', border: '1px solid #ddd', padding: '5rem', maxWidth: '850px', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ borderBottom: '3px solid #000', paddingBottom: '1.2rem', marginBottom: '3rem', fontSize: '2.2rem' }}>CONTENIDO PROTEGIDO</h2>
                    <p style={{ fontSize: '1.4rem', lineHeight: '2.4' }}>Soberanía Digital Rodrigo Godoy Alfaro.</p>
               </div>
            </div>
        </div>
    );
}
