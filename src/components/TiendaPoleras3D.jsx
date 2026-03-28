import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt, Upload, Palette, X, Camera, Zap, RotateCcw, RotateCw, ChevronDown } from 'lucide-react';

const COLORS = [
    { hex: '#ffffff', name: 'Blanco' },
    { hex: '#1a1a1a', name: 'Negro' },
    { hex: '#ef4444', name: 'Rojo VLS' },
    { hex: '#3b82f6', name: 'Azul Smart' },
    { hex: '#10b981', name: 'Verde Ciudad' },
    { hex: '#f59e0b', name: 'Naranja Activo' },
    { hex: '#8b5cf6', name: 'Morado Vecinal' },
    { hex: '#ec4899', name: 'Rosa Serena' },
    { hex: '#475569', name: 'Gris Municipal' },
];

const FONTS = ['Impact', 'Arial Black', 'Georgia', 'Courier New', 'Verdana'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// SVG Polera (T-Shirt) CSS-rendered
function TShirtSVG({ color, text, textColor, textFont, uploadedImg, logoUrl }) {
    const isDark = color === '#1a1a1a' || color === '#475569';
    const fgColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

    return (
        <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }}>
            <defs>
                <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="1"/>
                    <stop offset="100%" stopColor={color} stopOpacity="0.85"/>
                </linearGradient>
                <linearGradient id="shirtShine" x1="0%" y1="0%" x2="60%" y2="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <filter id="softShadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3"/>
                </filter>
            </defs>
            {/* Body */}
            <path d="M 60 50 L 20 120 L 60 110 L 60 290 L 240 290 L 240 110 L 280 120 L 240 50 L 195 70 C 185 90 170 100 150 100 C 130 100 115 90 105 70 Z"
                fill="url(#shirtGrad)" filter="url(#softShadow)" stroke={fgColor} strokeWidth="2"/>
            {/* Shine overlay */}
            <path d="M 60 50 L 20 120 L 60 110 L 60 290 L 180 290 L 180 50 Z"
                fill="url(#shirtShine)" opacity="0.5"/>
            {/* Collar highlight */}
            <path d="M 105 70 C 115 90 130 100 150 100 C 170 100 185 90 195 70"
                fill="none" stroke={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'} strokeWidth="3"/>

            {/* Uploaded image or logo area */}
            {uploadedImg ? (
                <image href={uploadedImg} x="100" y="110" width="100" height="100" preserveAspectRatio="xMidYMid meet" clipPath="inset(0 round 8px)"/>
            ) : logoUrl ? (
                <image href={logoUrl} x="115" y="120" width="70" height="70" preserveAspectRatio="xMidYMid meet" opacity="0.8"/>
            ) : null}

            {/* Custom text */}
            {text && (
                <text
                    x="150" y="230"
                    textAnchor="middle"
                    fontFamily={textFont || 'Impact'}
                    fontSize="22"
                    fontWeight="900"
                    fill={textColor || (isDark ? '#ffffff' : '#1a1a1a')}
                    stroke={isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)'}
                    strokeWidth="1"
                    letterSpacing="1"
                >{text}</text>
            )}
        </svg>
    );
}

export default function TiendaPoleras3D({ onClose, currentUser }) {
    const [shirtColor, setShirtColor] = useState('#ffffff');
    const [customText, setCustomText] = useState('LA ❤️ SERENA');
    const [textColor, setTextColor] = useState('#1a1a1a');
    const [fontFamily, setFontFamily] = useState('Impact');
    const [selectedSize, setSelectedSize] = useState('M');
    const [uploadedImgUrl, setUploadedImgUrl] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [activeTab, setActiveTab] = useState('color');
    const fileRef = useRef(null);

    const host = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';
    const isRDMLS = host.includes('rdmls');

    const suggestedTexts = [
        'LA ❤️ SERENA',
        'VECINO SMART',
        'VIVE LA SERENA 2026',
        currentUser?.displayName ? `${(currentUser.displayName).toUpperCase().split(' ')[0]} VLS` : 'SOBERANO VLS',
        '#SMARTCITY',
        'CIUDAD INTELIGENTE',
    ];

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadedImgUrl(url);
        }
    };

    const handleCapture = () => {
        const svg = document.getElementById('vls-shirt-preview');
        if (!svg) return;
        const data = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([data], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `VLS-polera-${shirtColor.replace('#','')}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    const isDark = shirtColor === '#1a1a1a' || shirtColor === '#475569';
    const currentColorName = COLORS.find(c => c.hex === shirtColor)?.name || '';

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 150000,
            background: 'radial-gradient(ellipse at 20% 50%, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
            display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif', color: 'white'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.2rem 2rem',
                background: 'rgba(15,23,42,0.9)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexShrink: 0
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', padding: '10px', borderRadius: '14px', color: 'white', display: 'flex' }}>
                        <Shirt size={22} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '900', letterSpacing: '1px' }}>
                            {isRDMLS ? 'RDMLS TAILOR' : 'VLS TAILOR'} <span style={{ color: '#38bdf8' }}>® Studio</span>
                        </h2>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', fontWeight: '600' }}>ESPEJO VIRTUAL · DISEÑO DE VESTUARIO SOBERANO</p>
                    </div>
                </div>
                <button onClick={onClose} style={{
                    background: 'rgba(239,68,68,0.15)', color: '#ef4444',
                    border: '1px solid rgba(239,68,68,0.3)', width: '40px', height: '40px',
                    borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <X size={18} />
                </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                {/* --- PREVIEW AREA --- */}
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    position: 'relative', padding: '2rem', gap: '1.5rem'
                }}>
                    {/* Color label */}
                    <div style={{
                        position: 'absolute', top: 20, left: 20,
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '8px 16px', borderRadius: '30px',
                        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: '700'
                    }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: shirtColor, border: '2px solid rgba(255,255,255,0.3)' }} />
                        {currentColorName} · Talla {selectedSize}
                    </div>

                    {/* Shirt preview */}
                    <motion.div
                        animate={{ rotateY: rotation }}
                        transition={{ type: 'spring', stiffness: 80 }}
                        style={{ width: '280px', maxWidth: '100%' }}
                    >
                        <div id="vls-shirt-preview" style={{ width: '100%', aspectRatio: '300/320' }}>
                            <TShirtSVG
                                color={shirtColor}
                                text={customText}
                                textColor={isDark ? '#ffffff' : textColor}
                                textFont={fontFamily}
                                uploadedImg={uploadedImgUrl}
                                logoUrl={isRDMLS ? '/escudo.png' : '/vls-logo-3d.png'}
                            />
                        </div>
                    </motion.div>

                    {/* Rotation controls */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button
                            onClick={() => setRotation(r => r - 30)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        ><RotateCcw size={18}/></button>
                        <button
                            onClick={handleCapture}
                            style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.4)', color: '#38bdf8', padding: '10px 22px', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', display: 'flex', gap: '8px', alignItems: 'center' }}
                        ><Camera size={16}/> GUARDAR</button>
                        <button
                            onClick={() => setRotation(r => r + 30)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        ><RotateCw size={18}/></button>
                    </div>
                </div>

                {/* --- CONTROL PANEL --- */}
                <div style={{
                    width: '380px', flexShrink: 0,
                    background: 'rgba(0,0,0,0.45)',
                    borderLeft: '1px solid rgba(255,255,255,0.07)',
                    overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                        {[
                            { id: 'color', label: '🎨 Color' },
                            { id: 'text', label: '✍️ Texto' },
                            { id: 'logo', label: '📸 Logo' },
                            { id: 'talla', label: '📏 Talla' },
                        ].map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                flex: 1, padding: '14px 0', background: activeTab === tab.id ? 'rgba(56,189,248,0.1)' : 'transparent',
                                border: 'none', borderBottom: activeTab === tab.id ? '2px solid #38bdf8' : '2px solid transparent',
                                color: activeTab === tab.id ? '#38bdf8' : '#64748b',
                                cursor: 'pointer', fontSize: '0.72rem', fontWeight: '800', letterSpacing: '0.5px'
                            }}>{tab.label}</button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', WebkitOverflowScrolling: 'touch' }}>
                        <AnimatePresence mode="wait">
                            {activeTab === 'color' && (
                                <motion.div key="color" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1.2rem', letterSpacing: '2px' }}>COLOR BASE (TELA)</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '2rem' }}>
                                        {COLORS.map(c => (
                                            <button key={c.hex} onClick={() => setShirtColor(c.hex)} style={{
                                                padding: '12px 8px', borderRadius: '14px',
                                                background: shirtColor === c.hex ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.03)',
                                                border: shirtColor === c.hex ? '2px solid #38bdf8' : '2px solid rgba(255,255,255,0.07)',
                                                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                                            }}>
                                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.hex, border: '2px solid rgba(255,255,255,0.2)', boxShadow: shirtColor === c.hex ? `0 0 16px ${c.hex}66` : 'none' }} />
                                                <span style={{ color: 'white', fontSize: '0.65rem', fontWeight: '700' }}>{c.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '2px' }}>COLOR DEL TEXTO</p>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                                        <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} style={{ width: '50px', height: '50px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '8px' }} />
                                        <div>
                                            <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>Seleccionar color</div>
                                            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{textColor}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'text' && (
                                <motion.div key="text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '2px' }}>MENSAJE PERSONALIZADO</p>
                                    <textarea
                                        value={customText}
                                        onChange={e => setCustomText(e.target.value)}
                                        placeholder="Escribe tu mensaje..."
                                        style={{
                                            width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '14px', padding: '14px', color: 'white', fontSize: '1rem',
                                            fontWeight: '700', resize: 'none', height: '80px', boxSizing: 'border-box'
                                        }}
                                    />
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', margin: '1rem 0 1.5rem' }}>
                                        {suggestedTexts.map(ph => (
                                            <button key={ph} onClick={() => setCustomText(ph)} style={{
                                                background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)',
                                                color: '#7dd3fc', fontSize: '0.65rem', padding: '6px 12px',
                                                borderRadius: '30px', fontWeight: '700', cursor: 'pointer'
                                            }}>{ph}</button>
                                        ))}
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '2px' }}>TIPOGRAFÍA</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        {FONTS.map(f => (
                                            <button key={f} onClick={() => setFontFamily(f)} style={{
                                                padding: '10px', borderRadius: '12px',
                                                background: fontFamily === f ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.03)',
                                                border: fontFamily === f ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.07)',
                                                color: fontFamily === f ? '#38bdf8' : '#94a3b8',
                                                cursor: 'pointer', fontFamily: f, fontSize: '0.8rem', fontWeight: '700'
                                            }}>{f}</button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'logo' && (
                                <motion.div key="logo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '2px' }}>LOGO CORPORATIVO</p>
                                    <input type="file" accept="image/*" ref={fileRef} style={{ display: 'none' }} onChange={handleUpload} capture="environment" />
                                    <div onClick={() => fileRef.current?.click()} style={{
                                        background: 'rgba(56, 189, 248, 0.05)', border: '2px dashed rgba(56,189,248,0.3)',
                                        padding: '2.5rem', borderRadius: '20px', textAlign: 'center',
                                        cursor: 'pointer', transition: 'all 0.3s', marginBottom: '1.5rem'
                                    }}>
                                        <Upload size={32} color="#38bdf8" style={{ marginBottom: '12px' }} />
                                        <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#38bdf8' }}>SUBIR LOGO / FOTO</div>
                                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>PNG, JPG — También puedes usar la cámara</div>
                                    </div>
                                    {uploadedImgUrl && (
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px', borderRadius: '14px' }}>
                                            <img src={uploadedImgUrl} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#10b981' }}>✓ Logo cargado</div>
                                                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Aparece en el pecho del diseño</div>
                                            </div>
                                            <button onClick={() => setUploadedImgUrl(null)} style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: '#ef4444', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <X size={14}/>
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === 'talla' && (
                                <motion.div key="talla" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1.2rem', letterSpacing: '2px' }}>TALLA</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '2rem' }}>
                                        {SIZES.map(s => (
                                            <button key={s} onClick={() => setSelectedSize(s)} style={{
                                                padding: '14px', borderRadius: '14px',
                                                background: selectedSize === s ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.03)',
                                                border: selectedSize === s ? '2px solid #38bdf8' : '2px solid rgba(255,255,255,0.07)',
                                                color: selectedSize === s ? '#38bdf8' : '#94a3b8',
                                                cursor: 'pointer', fontSize: '1rem', fontWeight: '900'
                                            }}>{s}</button>
                                        ))}
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1rem', letterSpacing: '2px' }}>CANTIDAD</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: '12px 20px', borderRadius: '14px', width: 'fit-content' }}>
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '900' }}>−</button>
                                        <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: '900', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)} style={{ background: 'rgba(56,189,248,0.2)', border: 'none', color: '#38bdf8', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: '900' }}>+</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA */}
                    <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                        <AnimatePresence mode="wait">
                            {addedToCart ? (
                                <motion.div key="added" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} style={{
                                    background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981',
                                    borderRadius: '20px', padding: '16px', textAlign: 'center',
                                    color: '#10b981', fontWeight: '900', fontSize: '1rem'
                                }}>
                                    ✓ ¡Polera agregada al pedido!
                                </motion.div>
                            ) : (
                                <motion.button key="buy" onClick={handleAddToCart} style={{
                                    width: '100%', padding: '16px',
                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                    border: 'none', borderRadius: '20px', color: 'white',
                                    fontSize: '0.95rem', fontWeight: '900', cursor: 'pointer',
                                    display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                                    letterSpacing: '1px'
                                }}>
                                    <Zap size={20}/> SOLICITAR DISEÑO · {quantity} UN.
                                </motion.button>
                            )}
                        </AnimatePresence>
                        <p style={{ margin: '10px 0 0', textAlign: 'center', color: '#475569', fontSize: '0.68rem', fontWeight: '600' }}>
                            Comunícate con el equipo VLS para cotización y producción oficial
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
