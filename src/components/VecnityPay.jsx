import React, { useState } from 'react';
import { 
    CreditCard, Globe, Ticket, CheckCircle, Shield, 
    ArrowRight, X, Zap, Star, DollarSign, AlertCircle, Loader,
    UtensilsCrossed, Gift, Info, Heart
} from 'lucide-react';

// ─── CONFIGURACIÓN DE PACKS (Editar precios aquí) ───────────────────────────
const PACKS = [
    { id: 'starter',    fichas: 50,   priceCLP: 1000,    priceUSD: 1.09,  label: 'Starter',    popular: false, color: '#64748b', desc: 'Ideal para probar el ecosistema' },
    { id: 'vecino',     fichas: 150,  priceCLP: 2490,   priceUSD: 2.75,  label: 'Vecino',     popular: true,  color: '#38bdf8', desc: '3x fichas gratis incluidas' },
    { id: 'comunidad',  fichas: 400,  priceCLP: 5990,   priceUSD: 6.60,  label: 'Comunidad',  popular: false, color: '#10b981', desc: 'Para familias y grupos' },
    { id: 'fundador',   fichas: 1200, priceCLP: 14990,  priceUSD: 16.50, label: 'Fundador VLS', popular: false, color: '#f59e0b', desc: 'Acceso completo + badge exclusivo', badge: 'MEJOR VALOR' },
];

const SUBS = [
    { id: 'pro_inmobiliaria', label: 'Perfil Destacado Inmobiliaria',  priceCLP: 25000,  priceUSD: 27.50, icon: '🏠', desc: 'Tu propiedad en el tope del buscador VLS' },
    { id: 'pro_veterinaria',  label: 'Perfil Clínica Veterinaria',     priceCLP: 19990,  priceUSD: 22.00, icon: '🐾', desc: 'Directorio prioritario + llamada directa' },
    { id: 'pro_arquitecto',   label: 'Perfil Arquitecto / Constructora', priceCLP: 30000, priceUSD: 33.00, icon: '🏗️', desc: 'Portfolio integrado en el portal urbano' },
    { id: 'pro_gastronomia',  label: 'Plan Gastro (Restoranes & Pubs)', priceCLP: 14990, priceUSD: 16.50, icon: '🍽️', desc: 'Eventos ilimitados + menú digital + 50 fichas/mes', popular: true, badge: 'NUEVO' },
];

// ─── APOYO CIUDADANO (Fichas como aporte directo, sin usar la palabra "donación") ───
const APOYO_PACKS = [
    { id: 'apoyo_cafe',     fichas: 50,   priceCLP: 1000,    priceUSD: 1.09,  label: 'Aporte "Café"',  color: '#64748b', desc: 'Un pequeño empujón para el equipo' },
    { id: 'apoyo_vecino',   fichas: 150,  priceCLP: 2490,    priceUSD: 2.75,  label: 'Vecino Activo',   popular: true,  color: '#38bdf8', desc: 'Gran espaldarazo a los creadores' },
    { id: 'apoyo_comunidad',fichas: 400,  priceCLP: 5990,    priceUSD: 6.60,  label: 'Comunidad Fuerte',color: '#10b981', desc: 'Aporte de alto impacto social' },
    { id: 'apoyo_fundador', fichas: 1200, priceCLP: 14990,   priceUSD: 16.50, label: 'Padrino Smart',   color: '#f59e0b', desc: 'Financiador VIP de VLS', badge: 'MÁXIMO PODER' },
];

// ─── MODELO FREEMIUM GASTRO (Fichas por uso extra) ───────────────────────────
const GASTRO_FICHAS = [
    { label: 'Evento adicional en Panoramas',       fichas: 3,  icon: '📅' },
    { label: 'Evento DESTACADO (tope del portal)',   fichas: 5,  icon: '⭐' },
    { label: 'Push notification a vecinos cercanos', fichas: 8,  icon: '📲' },
    { label: 'Banner en Dashboard VLS por 24h',      fichas: 10, icon: '🎯' },
    { label: 'Story/Reel en TVLS promocional',       fichas: 15, icon: '📺' },
];

// ─── URLs de backend (Cloudflare Functions) ─────────────────────────────────
const API_BASE = '/api/vecinity-pay';

export default function VecnityPay({ onClose, currentUser }) {
    const [tab, setTab] = useState('fichas');           // 'fichas' | 'subs'
    const [engine, setEngine] = useState('national');   // 'national' (Flow) | 'global' (PayPal)
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);         // 'success' | 'error'

    let items = PACKS;
    if (tab === 'subs') items = SUBS;
    else if (tab === 'apoyo') items = APOYO_PACKS;

    const handlePay = async () => {
        if (!selected) return;
        setLoading(true);
        setError(null);

        try {
            const payload = {
                itemId: selected.id,
                engine,
                userId: currentUser?.uid || 'guest',
                email: currentUser?.email || 'guest@farito.cl',
                amountCLP: selected.priceCLP,
                amountUSD: selected.priceUSD,
                type: tab, // 'fichas' o 'subs'
                fichas: selected.fichas || 0,
            };

            const res = await fetch(`${API_BASE}/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.redirectUrl) {
                // Abrir checkout externo en ventana nueva (NO popup bloqueado)
                window.open(data.redirectUrl, '_blank', 'noopener,noreferrer');
                setStatus('pending');
            } else {
                throw new Error(data.message || 'Error al crear la orden');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ── UI: Estado de espera post-redirección ───────────────────────────────
    if (status === 'pending') {
        return (
            <div style={overlay}>
                <div style={{ ...card, maxWidth: '500px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ margin: '0 0 1rem 0', color: '#10b981' }}>¡Pago iniciado!</h2>
                    <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        Se abrió la ventana de pago segura. Una vez que confirmes, tus fichas se cargarán automáticamente en tu billetera VLS en menos de 30 segundos.
                    </p>
                    <div style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid #38bdf820', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                        <Shield size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                        Pago procesado por <strong style={{ color: 'white' }}>{engine === 'national' ? 'Flow.cl (Webpay)' : 'PayPal Checkout'}</strong>. Vecinity no almacena datos de tu tarjeta.
                    </div>
                    <button onClick={onClose} style={btnSecondary}>Cerrar y esperar notificación</button>
                </div>
            </div>
        );
    }

    return (
        <div style={overlay}>
            <div style={{ ...card, maxWidth: '920px', width: '95vw' }}>

                {/* ── Header ─────────────────────────────────────────────── */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)', padding: '12px', borderRadius: '14px' }}>
                            <CreditCard size={28} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Vecinity Pay</h2>
                            <p style={{ margin: 0, color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold' }}>Pasarela Global Certificada · PCI Compliant</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}>
                        <X size={24} />
                    </button>
                </div>

                {/* ── Selector de tipo de producto ───────────────────────── */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    {[['fichas', '🎟️ Pack de Fichas VLS'], ['subs', '🏢 Suscripciones Pro'], ['apoyo', '🤝 Apoyo Ciudadano']].map(([key, label]) => (
                        <button key={key} onClick={() => { setTab(key); setSelected(null); }} style={{ ...tabBtn, background: tab === key ? '#38bdf8' : 'rgba(255,255,255,0.05)', color: tab === key ? '#0f172a' : '#94a3b8', borderColor: tab === key ? '#38bdf8' : 'rgba(255,255,255,0.1)' }}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Banner Freemium Gastro ──────────────────────────── */}
                {tab === 'subs' && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.05))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <Gift size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            <strong style={{ color: '#f59e0b' }}>Modelo Freemium Gastro:</strong> Todos los restoranes y pubs reciben <strong style={{ color: '#10b981' }}>1 evento GRATIS al mes</strong> en el Portal de Panoramas. Eventos adicionales y funciones premium se pagan con <strong style={{ color: '#38bdf8' }}>Fichas VLS</strong> o con la suscripción mensual.
                        </div>
                    </div>
                )}

                {/* ── Banner Apoyo Ciudadano ──────────────────────────── */}
                {tab === 'apoyo' && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(56, 189, 248, 0.05))', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <Heart size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            <strong style={{ color: '#10b981', display: 'block', fontSize: '0.95rem', marginBottom: '4px' }}>¡Impulsa nuestra ciudad inteligente!</strong>
                            <em style={{ color: '#94a3b8' }}>"Oye, te queremos apoyar por lo que nos gusta lo que haces en redes sociales y en este portal, sigue creciendo, aquí va mi apoyo".</em><br/>
                            Los aportes se acreditan directamente como <strong style={{ color: '#38bdf8' }}>Fichas VLS</strong> en tu billetera.
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>

                    {/* ── Panel izquierdo: Lista de productos ────────────── */}
                    <div>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px' }}>
                            {tab === 'fichas' ? 'SELECCIONA TU PACK' : (tab === 'apoyo' ? 'SELECCIONA TU APORTE' : 'PLAN PROFESIONAL MENSUAL')}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {items.map(item => (
                                <button key={item.id} onClick={() => setSelected(item)} style={{
                                    background: selected?.id === item.id ? `${item.color}18` : 'rgba(255,255,255,0.03)',
                                    border: `2px solid ${selected?.id === item.id ? item.color : 'rgba(255,255,255,0.07)'}`,
                                    borderRadius: '16px', padding: '1.2rem 1.5rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    color: 'white', textAlign: 'left', transition: 'all 0.2s', position: 'relative'
                                }}>
                                    {(item.popular || item.badge) && (
                                        <div style={{ position: 'absolute', top: '-10px', left: '20px', background: item.color, color: '#0f172a', fontSize: '0.65rem', fontWeight: '900', padding: '2px 10px', borderRadius: '10px' }}>
                                            {item.badge || 'MÁS POPULAR'}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {tab === 'subs' ? (
                                            <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                                        ) : (
                                            <div style={{ background: `${item.color}20`, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {tab === 'apoyo' ? <Heart size={24} color={item.color} /> : <Ticket size={24} color={item.color} />}
                                            </div>
                                        )}
                                        <div>
                                            <div style={{ fontWeight: '800', fontSize: '1.05rem' }}>
                                                {item.label}
                                                {item.fichas && <span style={{ color: item.color, marginLeft: '8px' }}>{item.fichas} fichas</span>}
                                            </div>
                                            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '3px' }}>{item.desc}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.3rem', fontWeight: '900', color: item.color }}>
                                            {engine === 'national' ? `$${item.priceCLP.toLocaleString('es-CL')} CLP` : `USD ${item.priceUSD.toFixed(2)}`}
                                        </div>
                                        {tab === 'subs' && <div style={{ fontSize: '0.7rem', color: '#64748b' }}>/mes</div>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Panel derecho: Motor de pago + Resumen ─────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Selector de motor */}
                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.2rem' }}>
                            <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '1px' }}>MÉTODO DE PAGO</h4>
                            {[
                                { key: 'national', icon: '🇨🇱', label: 'Pago Nacional', sub: 'Webpay Plus · CuentaRUT · Débito', badge: 'CLP' },
                                { key: 'global',   icon: '🌍', label: 'Pago Internacional', sub: 'PayPal · Visa · Mastercard Global', badge: 'USD' },
                            ].map(eng => (
                                <button key={eng.key} onClick={() => setEngine(eng.key)} style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                    background: engine === eng.key ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${engine === eng.key ? '#38bdf8' : 'rgba(255,255,255,0.07)'}`,
                                    borderRadius: '12px', padding: '12px', cursor: 'pointer', color: 'white',
                                    marginBottom: '8px', textAlign: 'left', transition: 'all 0.2s'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>{eng.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{eng.label}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{eng.sub}</div>
                                    </div>
                                    <span style={{ background: engine === eng.key ? '#38bdf820' : '#ffffff10', color: engine === eng.key ? '#38bdf8' : '#64748b', padding: '2px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold' }}>{eng.badge}</span>
                                </button>
                            ))}
                        </div>

                        {/* Resumen del pedido */}
                        {selected && (
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.2rem' }}>
                                <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '1px' }}>RESUMEN</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#cbd5e1' }}>{selected.label}</span>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {engine === 'national' ? `$${selected.priceCLP.toLocaleString('es-CL')} CLP` : `USD ${selected.priceUSD.toFixed(2)}`}
                                    </span>
                                </div>
                                {selected.fichas && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Fichas a acreditar</span>
                                        <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{selected.fichas} 🎟️</span>
                                    </div>
                                )}
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: '800', color: 'white' }}>TOTAL</span>
                                    <span style={{ fontWeight: '900', color: '#38bdf8', fontSize: '1.1rem' }}>
                                        {engine === 'national' ? `$${selected.priceCLP.toLocaleString('es-CL')} CLP` : `USD ${selected.priceUSD.toFixed(2)}`}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Panel de fichas gastro cuando se selecciona plan gastro */}
                        {tab === 'subs' && selected?.id === 'pro_gastronomia' && (
                            <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '16px', padding: '1.2rem' }}>
                                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.75rem', color: '#f59e0b', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <UtensilsCrossed size={14} /> COSTOS POR FICHA (SIN SUSCRIPCIÓN)
                                </h4>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px' }}>
                                    Con el Plan Gastro Pro estas funciones son <strong style={{ color: '#10b981' }}>ILIMITADAS</strong>
                                </div>
                                {GASTRO_FICHAS.map((g, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < GASTRO_FICHAS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                                        <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{g.icon} {g.label}</span>
                                        <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '0.8rem' }}>{g.fichas} 🎟️</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '8px', color: '#fca5a5', fontSize: '0.85rem' }}>
                                <AlertCircle size={16} style={{ flexShrink: 0 }} /> {error}
                            </div>
                        )}

                        {/* Botón de pago */}
                        <button
                            onClick={handlePay}
                            disabled={!selected || loading}
                            style={{
                                background: selected ? 'linear-gradient(135deg, #38bdf8, #0ea5e9)' : 'rgba(255,255,255,0.05)',
                                color: selected ? '#0f172a' : '#475569',
                                border: 'none', borderRadius: '16px', padding: '1.2rem',
                                fontWeight: '900', fontSize: '1.1rem', cursor: selected ? 'pointer' : 'not-allowed',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                transition: 'all 0.2s', boxShadow: selected ? '0 10px 30px rgba(56,189,248,0.3)' : 'none'
                            }}
                        >
                            {loading ? <><Loader size={20} className="spin" /> Preparando pago...</> : <><Shield size={20} /> {selected ? `Pagar ${engine === 'national' ? `$${selected.priceCLP.toLocaleString('es-CL')} CLP` : `USD ${selected.priceUSD?.toFixed(2)}`}` : 'Selecciona un pack'}</>}
                        </button>

                        {/* Sellos de seguridad */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            {['PCI DSS', 'SSL 256-bit', 'No guarda tarjetas'].map(s => (
                                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.7rem' }}>
                                    <CheckCircle size={12} color="#10b981" /> {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; }`}</style>
            </div>
        </div>
    );
}

const overlay = { position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(2,6,23,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(8px)' };
const card = { background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '2.5rem', overflowY: 'auto', maxHeight: '95vh', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', color: 'white' };
const tabBtn = { padding: '10px 20px', borderRadius: '50px', border: '1px solid', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: 'all 0.2s' };
const btnSecondary = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', width: '100%' };
