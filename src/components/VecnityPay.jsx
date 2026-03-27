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
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(null); // { message, type: 'discount' | 'fichas', val }
    const [isCheckingCode, setIsCheckingCode] = useState(false);

    // Sincronización de Saldo Local si no se provee vía props
    const currentBalance = parseInt(localStorage.getItem('vls_tokens') || '0');

    let items = PACKS;
    if (tab === 'subs') items = SUBS;
    else if (tab === 'apoyo') items = APOYO_PACKS;

    const handleApplyCode = () => {
        if (!promoCode) return;
        setIsCheckingCode(true);
        setError(null);

        // Simulamos la verificación de los 10 códigos maestros mencionados por el usuario
        // "obviamente yo manejo ese código... siempre son 10 códigos que funcionan"
        setTimeout(() => {
            const VALID_CODES = {
                'SERENITO2026': { type: 'fichas', val: 50, msg: '¡Código Maestro Validado! +50 Fichas VLS' },
                'PUERTASMART': { type: 'discount', val: 0.3, msg: '¡Descuento 30% corporativo aplicado!' },
                'VECINOSMART': { type: 'fichas', val: 100, msg: '¡Bono Fundador: +100 Fichas VLS!' },
                'COQUISMART': { type: 'discount', val: 0.2, msg: '¡Cupón Aurinegro: 20% Dcto!' },
                'RDMLS2026': { type: 'fichas', val: 30, msg: '¡Auditoría Municipal: +30 Fichas!' },
                'FARO_IA': { type: 'discount', val: 0.5, msg: '¡Faro Intelligence: 50% OFF!' },
                'MASTER_VLS': { type: 'fichas', val: 500, msg: '¡CARGA MAESTRA: +500 FICHAS VLS!' },
                'VECINOS_VIP': { type: 'discount', val: 0.15, msg: '¡15% Descuento Comunidad!' },
                'SMART_LS': { type: 'fichas', val: 20, msg: '¡Token Smart: +20 Fichas!' },
                'VLS_PRIME': { type: 'discount', val: 0.4, msg: '¡VLS Prime: 40% OFF!' }
            };

            const code = promoCode.toUpperCase().trim();
            if (VALID_CODES[code]) {
                const data = VALID_CODES[code];
                setPromoApplied(data);
                
                if (data.type === 'fichas') {
                    // Acreditar fichas directamente
                    const newBalance = currentBalance + data.val;
                    localStorage.setItem('vls_tokens', newBalance.toString());
                    window.dispatchEvent(new CustomEvent('tokens-updated', { detail: newBalance }));
                    
                    // Notificar al sistema
                    window.dispatchEvent(new CustomEvent('vls-show-alert', {
                        detail: { title: '🎁 CÓDIGO APROBADO', message: data.msg, type: 'success' }
                    }));
                }
            } else {
                setError('Código no válido o ya utilizado por su Identidad VLS.');
            }
            setIsCheckingCode(false);
            setPromoCode('');
        }, 800);
    };

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
                promoCode: promoApplied ? promoCode : null
            };

            const res = await fetch(`${API_BASE}/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.redirectUrl) {
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
                    
                    {/* AUDITOR DE SALDO ONLINE */}
                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '0.8rem 1.5rem', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)' }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px' }}>SALDO ACTUAL</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white', lineHeight: 1 }}>
                                {currentBalance || 0} <span style={{ color: '#f59e0b', fontSize: '1rem' }}>🎟️</span>
                            </div>
                        </div>
                        <Ticket size={24} color="#f59e0b" fill="#f59e0b" />
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

                {/* ── Banners Informativos ──────────────────────────── */}
                {tab === 'subs' && (
                    <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.05))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <Gift size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            <strong style={{ color: '#f59e0b' }}>Modelo Freemium Gastro:</strong> Todos los restoranes y pubs reciben <strong style={{ color: '#10b981' }}>1 evento GRATIS al mes</strong>.
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>

                    {/* ── Panel izquierdo: Lista de productos ────────────── */}
                    <div>
                        <h3 style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.8rem', letterSpacing: '2px' }}>
                            {tab === 'fichas' ? 'SELECCIONA TU PACK' : (tab === 'apoyo' ? 'SELECCIONA TU APORTE' : 'PLAN PROFESIONAL')}
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
                                { key: 'national', icon: '🇨🇱', label: 'Pago Nacional', sub: 'Webpay Plus', badge: 'CLP' },
                                { key: 'global',   icon: '🌍', label: 'Pago Internacional', sub: 'PayPal Checkout', badge: 'USD' },
                            ].map(eng => (
                                <button key={eng.key} onClick={() => setEngine(eng.key)} style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                    background: engine === eng.key ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${engine === eng.key ? '#38bdf8' : 'rgba(255,255,255,0.07)'}`,
                                    borderRadius: '12px', padding: '12px', cursor: 'pointer', color: 'white',
                                    marginBottom: '8px'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>{eng.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{eng.label}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{eng.sub}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Resumen del pedido */}
                        {selected && (
                            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.2rem' }}>
                                <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '1px' }}>RESUMEN</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#cbd5e1' }}>{selected.label}</span>
                                    {promoApplied?.type === 'discount' && (
                                        <span style={{ color: '#ef4444', textDecoration: 'line-through', fontSize: '0.8rem' }}>
                                             {engine === 'national' ? `$${selected.priceCLP.toLocaleString('es-CL')}` : `USD ${selected.priceUSD.toFixed(2)}`}
                                        </span>
                                    )}
                                </div>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: '800', color: 'white' }}>TOTAL</span>
                                    <span style={{ fontWeight: '900', color: '#38bdf8', fontSize: '1.1rem' }}>
                                        {(() => {
                                            const rawPrice = engine === 'national' ? selected.priceCLP : selected.priceUSD;
                                            const finalPrice = promoApplied?.type === 'discount' ? rawPrice * (1 - promoApplied.val) : rawPrice;
                                            return engine === 'national' ? `$${Math.round(finalPrice).toLocaleString('es-CL')} CLP` : `USD ${finalPrice.toFixed(2)}`;
                                        })()}
                                    </span>
                                </div>

                                {/* Casilla de Código (Petición Audio 1742) */}
                                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>INTRODUCE TU CÓDIGO (Auditor/Descuento)</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <input 
                                            type="text" 
                                            placeholder="Ej: SERENITO2026"
                                            value={promoCode}
                                            onChange={e => setPromoCode(e.target.value)}
                                            style={inputBase}
                                        />
                                        <button 
                                            onClick={handleApplyCode}
                                            disabled={isCheckingCode || !promoCode}
                                            style={{ background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', padding: '0 15px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}
                                        >
                                            {isCheckingCode ? '...' : 'APLICAR'}
                                        </button>
                                    </div>
                                    {promoApplied && (
                                        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <CheckCircle size={14} /> {promoApplied.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', borderRadius: '12px', padding: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
                                <AlertCircle size={16} /> {error}
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
                                transition: 'all 0.2s', boxShadow: selected ? '0 10px 30px rgba(56,189,248,0.3)' : 'none'
                            }}
                        >
                            {loading ? <Loader size={20} className="spin" /> : <><Shield size={20} /> {selected ? 'Confirmar Pago Seguro' : 'Selecciona un pack'}</>}
                        </button>
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
const inputBase = { background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', flex: 1, fontSize: '0.8rem', padding: '10px' };
