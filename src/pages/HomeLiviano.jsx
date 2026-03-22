import React, { useState, useEffect } from 'react';
import { 
    PlayCircle, Tv, Gamepad2, Radio, Cloud, Video, History, 
    Zap, Star, Radar, Pill, Dog, Rocket, Compass, 
    Newspaper, Activity, Hash, ExternalLink, Ticket
} from 'lucide-react';
import VecinosClipClub from '../components/VecinosClipClub';
import VLSDiscountCard from '../components/VLSDiscountCard';

const dispatch = (eventName, detail) =>
    window.dispatchEvent(new CustomEvent(eventName, { detail }));

export default function HomeLiviano() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showClipClub, setShowClipClub] = useState(false);
    const [showDiscountCard, setShowDiscountCard] = useState(false);
    const [tokens, setTokens] = useState(() => parseInt(localStorage.getItem('vls_tokens') || '0'));

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        const onTokens = (e) => setTokens(e.detail ?? parseInt(localStorage.getItem('vls_tokens') || '0'));
        window.addEventListener('tokens-updated', onTokens);
        return () => { clearInterval(timer); window.removeEventListener('tokens-updated', onTokens); };
    }, []);

    // Search for payment status
    const [showSuccess, setShowSuccess] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('pay_status') === 'success') {
            setShowSuccess(true);
            // Clear params to avoid re-triggering on reload
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const secciones = [
        {
            titulo: '🎮 Entretenimiento Vecinal',
            color: '#f59e0b',
            modulos: [
                { title: 'Tarjeta Descuento VLS', subtitle: 'Beneficios en Comercio Local', icon: Star, color: '#fcd34d', action: () => setShowDiscountCard(true), badge: '🎟️', featured: true },
                { title: 'Vecinos ClipClub', subtitle: 'Alquiler VHS y Juegos · Fichas VLS', icon: Video, color: '#f59e0b', action: () => setShowClipClub(true), badge: '🎬' },
                { title: 'Retro TV 80s', subtitle: 'Televisor antiguo 14"', icon: Tv, color: '#38bdf8', action: () => dispatch('open-retro-tv'), badge: '📺' },
                { title: 'Salón Arcade', subtitle: 'Pac-Man, Tetris, Pooyan...', icon: Gamepad2, color: '#ef4444', action: () => dispatch('open-game'), badge: '🕹️' },
                { title: 'Personal Stereo', subtitle: 'Música como en el colegio', icon: Radio, color: '#fcd34d', action: () => dispatch('open-personal-stereo'), badge: '🎧' },
                { title: 'Cine VHS', subtitle: 'TV Cassette de los 80', icon: PlayCircle, color: '#a78bfa', action: () => dispatch('open-vhs-tv'), badge: '📼' },
                { title: 'Super Serenito Bros', subtitle: 'Plataformas 3D · Gravedad Esférica', icon: Rocket, color: '#10b981', action: () => dispatch('open-super-serenito'), badge: '🍄', ficha: true },
            ]
        },
        {
            titulo: '🌌 Exploración e IA',
            color: '#38bdf8',
            modulos: [
                { title: 'SkyGuide RA', subtitle: 'Observatorio Girosc\u00f3pico · Portal Hawái', icon: Compass, color: '#e879f9', action: () => dispatch('open-sky-guide'), badge: '🔭', ficha: true },
                { title: 'Bus del Tiempo 3D', subtitle: 'La Serena antigua en 3D', icon: History, color: '#10b981', action: () => dispatch('open-time-bus'), badge: '⏱' },
                { title: 'Red Social Farito', subtitle: 'Feed Cívico + Inbox P2P', icon: Hash, color: '#38bdf8', action: () => dispatch('open-farito-social'), badge: '📡' },
                { title: 'Dron Drigo', subtitle: 'Patrulla C5 · Sky View', icon: Cloud, color: '#6366f1', action: () => dispatch('open-dron-drigo'), badge: '🚁' },
            ]
        },
        {
            titulo: '🏙️ Ciudad y Comunidad',
            color: '#10b981',
            modulos: [
                { title: 'Faro Centinel', subtitle: 'Encuestas Vecinales · +10 Fichas VLS', icon: Radar, color: '#ec4899', action: () => dispatch('open-faro-centinel'), badge: '📊' },
                { title: 'Gimnasio Biomecánico', subtitle: 'Pausas activas con Serenito', icon: Zap, color: '#ec4899', action: () => dispatch('open-gym-3d'), badge: '💪' },
                { title: 'La Botica Vecinal', subtitle: 'Triángulo del Alivio \u00b3 Saberes', icon: Pill, color: '#22c55e', action: () => dispatch('open-botica'), badge: '🌿' },
                { title: 'Directorio Veterinario', subtitle: 'Amigos 360 · Triage Urgencias', icon: Dog, color: '#ef4444', action: () => dispatch('open-veterinaria'), badge: '🐾' },
                { title: 'Noticias y Kiosko', subtitle: 'Diarios del día en tiempo real', icon: Newspaper, color: '#94a3b8', action: () => dispatch('open-kiosko-diarios'), badge: '📰' },
                { title: 'Distancias a la Serena', subtitle: 'Trazado en mapa desde tu ciudad', icon: Activity, color: '#f59e0b', action: () => dispatch('open-distances'), badge: '🗺️' },
            ]
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: 'white' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* ── HEADER ── */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/vls-logo-3d.png" alt="VLS" style={{ width: '56px', height: '56px', filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.5))' }} />
                        <div>
                            <h1 style={{ margin: '0 0 3px 0', fontSize: '1.6rem', fontWeight: '900', letterSpacing: '1px' }}>vecinoslaserena<span style={{ color: '#38bdf8' }}>.cl</span><span style={{ fontSize: '0.7rem', background: '#10b981', color: '#0f172a', fontWeight: 'bold', padding: '2px 7px', borderRadius: '8px', marginLeft: '8px', verticalAlign: 'middle' }}>/rapido</span></h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>Entretenimiento · Cultura · Clima · Comunidad</p>
                                <span style={{ fontSize: '0.6rem', color: '#38bdf8', border: '1px solid #38bdf840', padding: '1px 6px', borderRadius: '4px', fontWeight: 900, letterSpacing: '1px' }}>HECHO EN LA SERENA</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Billetera de Fichas */}
                        <div style={{ background: 'linear-gradient(135deg, #f59e0b20, rgba(0,0,0,0.3))', border: '1px solid #f59e0b40', padding: '0.8rem 1.2rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Ticket size={18} color="#f59e0b" />
                            <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fcd34d', fontFamily: 'monospace' }}>{tokens}</div>
                                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>FICHAS VLS</div>
                            </div>
                        </div>
                        {/* Reloj */}
                        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.8rem 1.2rem', borderRadius: '14px', textAlign: 'right' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#38bdf8', fontVariantNumeric: 'tabular-nums' }}>{currentTime.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{currentTime.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' })}</div>
                        </div>
                    </div>
                </header>

                {/* ── SECCIONES DE MÓDULOS ── */}
                {secciones.map(sec => (
                    <section key={sec.titulo} style={{ marginBottom: '3rem' }}>
                        <h2 style={{ margin: '0 0 1.2rem 0', fontSize: '1.1rem', color: sec.color, display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `2px solid ${sec.color}30`, paddingBottom: '0.8rem' }}>
                            {sec.titulo}
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                            {sec.modulos.map((m, idx) => (
                                <button
                                    key={idx}
                                    onClick={m.action}
                                    style={{
                                        background: `linear-gradient(135deg, ${m.color}12 0%, rgba(2,6,23,0.8) 100%)`,
                                        border: `1px solid ${m.color}30`,
                                        borderRadius: '16px',
                                        padding: '1.3rem 1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        color: 'white',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 10px 30px ${m.color}20`; e.currentTarget.style.borderColor = `${m.color}70`; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${m.color}30`; }}
                                >
                                    {/* Badge */}
                                    <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.1rem', opacity: 0.5 }}>{m.badge}</span>

                                    {/* Icono */}
                                    <div style={{ background: `${m.color}20`, padding: '0.9rem', borderRadius: '12px', flexShrink: 0 }}>
                                        <m.icon size={26} color={m.color} />
                                    </div>

                                    {/* Texto */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            {m.title}
                                            {m.ficha && <Ticket size={12} color="#f59e0b" />}
                                        </div>
                                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subtitle}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}

                {/* ── BANNER ENLACE AL HUB ── */}
                <section style={{ background: 'linear-gradient(90deg, #1e3a8a, #312e81)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid #3b82f660', marginTop: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1.3rem' }}>¿Buscas trámites, reportes o el SGAAC?</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#bae6fd', fontSize: '0.95rem' }}>Más de 42 módulos institucionales te esperan en el Hub Principal del Plan 2026.</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{ background: 'linear-gradient(90deg, #3b82f6, #6366f1)', color: 'white', border: 'none', padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}
                    >
                        <ExternalLink size={18} /> Ir al Hub Completo →
                    </button>
                </section>
            </div>

            {/* ── COMPONENTES FLOTANTES ── */}
            {showClipClub && <VecinosClipClub onClose={() => setShowClipClub(false)} />}
            {showSuccess && <SuccessOverlay onClose={() => setShowSuccess(false)} onOpenCard={() => { setShowSuccess(false); setShowDiscountCard(true); }} />}
            {showDiscountCard && <VLSDiscountCard onClose={() => setShowDiscountCard(false)} />}

            <style>{`
                @media (max-width: 640px) {
                    header { flex-direction: column !important; align-items: flex-start !important; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

function SuccessOverlay({ onClose, onOpenCard }) {
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.9)', backdropFilter: 'blur(15px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #38bdf840', borderRadius: '32px', padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center', animation: 'scaleIn 0.5s cubic-bezier(0.19, 1, 0.22, 1)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ width: '80px', height: '80px', background: '#10b98120', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', border: '2px solid #10b981' }}>
                    <Star size={40} color="#10b981" fill="#10b981" />
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>¡PAGO PROCESADO!</h2>
                <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    Gracias por suscitarte a **VecinoSmart Pro**. Tu cuenta ya está habilitada con todos los beneficios y fichas mensuales.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Ticket size={24} color="#f59e0b" style={{ marginBottom: '8px' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Fichas Activas</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Ya puedes jugar</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Star size={24} color="#fcd34d" style={{ marginBottom: '8px' }} />
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Benefits Pass</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Descuentos VIP</div>
                    </div>
                </div>

                <button 
                    onClick={onOpenCard}
                    style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', color: 'white', border: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)', width: '100%' }}
                >
                    COMENZAR EXPERIENCIA VLS
                </button>
            </div>
        </div>
    );
}
