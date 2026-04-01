import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, ChevronRight, ChevronLeft, ShoppingCart, 
    Shirt, Crown, Coffee, Box, Monitor, Smartphone, Globe, Cpu,
    MapPin, Gift, Upload, Layers, Package, Check,
    ShieldCheck, Zap, Database, Lock, Code, Terminal, Server, Radio
} from 'lucide-react';

const FONTS = [
    { name: 'OUTFIT', css: "'Outfit', sans-serif" },
    { name: 'BEBAS', css: "'Bebas Neue', sans-serif" },
    { name: 'MONTSERRAT', css: "'Montserrat', sans-serif" }
];

const COLORS = [
    { name: 'Sovereign Black', hex: '#020617' },
    { name: 'Royal White', hex: '#f8fafc' },
    { name: 'Azul Marino VLS', hex: '#1e1b4b' },
    { name: 'Rojo VLS', hex: '#ef4444' },
    { name: 'Azul VLS', hex: '#0ea5e9' },
    { name: 'Verde VLS', hex: '#10b981' },
    { name: 'Dorado VLS', hex: '#fbbf24' },
    { name: 'Gris Oxford', hex: '#334155' },
    { name: 'Naranja VLS', hex: '#f97316' },
    { name: 'Rosa VLS', hex: '#db2777' },
    { name: 'Morado VLS', hex: '#7c3aed' },
    { name: 'Burdeo VLS', hex: '#7f1d1d' }
];

const PRODUCTS = [
    // PRODUCTOS FÍSICOS Y MERCHANDISING VLS
    { 
        id: 'shirt', category: 'fisico', name: 'Polera Institucional VLS', price: 18990, 
        desc: 'Algodón 200g Premium. Estampado 2D resistente HD.', icon: Shirt, bgImg: '/polera_base_real.png',
        techSpecs: ['Tejido: 100% Algodón Peinado', 'Gramaje: 200 GSM Heavyweight', 'Corte: Athletic Fit 2026', 'Impresión: DTF Industrial'],
        benefits: ['Larga durabilidad', 'Resistente a lavados intensos', 'Diseño exclusivo VLS']
    },
    { 
        id: 'mug', category: 'fisico', name: 'Tazón Corporativo VLS', price: 8990, 
        desc: 'Cerámica Triple Capa de Alta Durabilidad.', icon: Coffee, bgImg: null,
        techSpecs: ['Material: Cerámica Grado A', 'Capacidad: 11 oz / 325 ml', 'Resistencia: Microondas y Lavavajillas', 'Acabado: Glossy Premium'],
        benefits: ['Retención térmica superior', 'Ergonomía Smart', 'Uso Institucional']
    },
    { 
        id: 'cap', category: 'fisico', name: 'Gorra Trucker Smart', price: 12900, 
        desc: 'Malla transpirable, escudo frontal estampado.', icon: Crown, bgImg: null,
        techSpecs: ['Frontal: Poliéster Acolchado', 'Malla: Nylon Ventilación Pro', 'Cierre: Ajustable Snapback', 'Visera: Curva Pre-moldeada'],
        benefits: ['Ligereza extrema', 'Ideal para terreno', 'Estética Urbana VLS']
    },
    { 
        id: 'box', category: 'fisico', name: 'Merch Box de Bienvenida', price: 29900, 
        desc: 'Kit de inicio cívico para vecinos destacados.', icon: Box, bgImg: null,
        techSpecs: ['Contenido: Polera + Tazón + Stickers + ID Card', 'Packaging: Cartón Corrugado Sostenible', 'Edición: Limitada Fundadores'],
        benefits: ['Pack Ahorro (-15%)', 'Identidad Territorial', 'Regalo Institucional']
    },
    
    // ECOSISTEMA DIGITAL VLS (SAAS & SOLUCIONES 2026)
    { 
        id: 'puertasmart', category: 'digital', name: 'Sistema PuertaSmart 2026', price: 850000, 
        desc: 'Control de acceso residencial y municipal con bitácora en la nube.', icon: Lock, hex: '#3b82f6',
        techSpecs: ['Autenticación: QR dinámico y Biometría', 'Base de Datos: Cloudflare D1 SQL', 'Seguridad: Encriptación E2E', 'Métricas: Dashboard en Tiempo Real'],
        methodology: 'VLS Security Zero-Trust',
        benefits: ['Registro infalsificable de visitas', 'Apertura remota', 'Integración vecinal']
    },
    { 
        id: 'radiodigital', category: 'digital', name: 'Radio Digital (Estación Web)', price: 450000, 
        desc: 'Tu propia señal de transmisión streaming 24/7 sin cortes.', icon: Radio, hex: '#ef4444',
        techSpecs: ['Protocolo: Icecast / HLS Streaming', 'Latencia: Ultra-Baja (<3s)', 'Interfaz: Reproductor Flotante VLS', 'Capacidad: 10k Oyentes Simultáneos'],
        methodology: 'VLS Broadcaster Engine',
        benefits: ['Independencia mediática total', 'Podcasting y archivo D1', 'Monetización directa en app']
    },
    { 
        id: 'cvvirtual', category: 'digital', name: 'CV Virtual Soberano', price: 65000, 
        desc: 'Portafolio profesional interactivo con verificación de identidad VLS.', icon: Layers, hex: '#10b981',
        techSpecs: ['Hosting: Immutable global CDN', 'Formato: PWA One-Page Interactiva', 'SEO: Metadatos estructurados JSON-LD', 'Contacto: WhatsApp directo'],
        methodology: 'VLS Personal Branding v4',
        benefits: ['Destaque absoluto en RRHH', 'Sin intermediarios de empleo', 'Diseño de grado directivo 2026']
    },
    { 
        id: 'ecommerce', category: 'digital', name: 'Tienda Web + VecnityPay', price: 350000, 
        desc: 'Plataforma e-commerce autónoma sin comisión por venta para pymes.', icon: ShoppingCart, hex: '#fbbf24',
        techSpecs: ['Liquidación: Pasarela Transbank/Stripe', 'Inventario: Sincronización Real-time', 'Performance: <1.2s Load Time (LCP)', 'Módulo: Catálogo 3D Opcional'],
        methodology: 'VLS Commerce Standard',
        benefits: ['Soberanía financiera total', 'Tu propio dominio web (.cl)', 'Escalabilidad sin límite de SKU']
    },
    { 
        id: 'appvecinal', category: 'digital', name: 'Aplicación Móvil Local (PWA)', price: 950000, 
        desc: 'App personalizada instalable para comités, clubes o condominios.', icon: Smartphone, hex: '#8b5cf6',
        techSpecs: ['Framework: React 18 / Vite PWA', 'Notificaciones: Push API Service', 'Offline: IndexedDB Sync Local', 'Distribución: Directa sin AppStore'],
        methodology: 'VLS Citizen-Mobile Native',
        benefits: ['Comunicación sin censura algorítmica', 'Funcionalidad sin internet', 'Cobro de gastos comunes/cuotas']
    }
];

export default function TiendaPoleras3D({ onClose }) {
    const [step, setStep] = useState('selection'); 
    const [activeTab, setActiveTab] = useState('apariencia'); // 'apariencia', 'diseno', 'pago'
    const [currentProd, setCurrentProd] = useState(null);
    
    const [config, setConfig] = useState({
        color: COLORS[0].hex,
        quantity: 1,
        text: '',
        textColor: '#ffffff',
        textFont: FONTS[0].css,
        textScale: 1.2,
        textY: 45,
        uploadedImg: null,
        logoScale: 100,
        logoY: 25,
    });
    
    const [shippingData, setShippingData] = useState({
        isGift: false,
        recipientName: '',
        method: 'retiro',
        address: '',
    });

    const fileRef = useRef(null);
    const isMobile = window.innerWidth < 1024;

    const getColorFilter = (hex) => {
        // Base es polera negra/oscura (sepia(1) la vuelve amarilla/café base para teñir)
        switch(hex.toLowerCase()) {
            case '#020617': return 'brightness(0.5) contrast(1.2)'; // Sovereign Black
            case '#f8fafc': return 'brightness(1.8) grayscale(1) contrast(1.2)'; // Royal White
            case '#ef4444': return 'sepia(1) saturate(20) hue-rotate(-50deg) brightness(0.6) contrast(1.2)'; // Rojo VLS
            case '#0ea5e9': return 'sepia(1) saturate(20) hue-rotate(160deg) brightness(0.6) contrast(1.2)'; // Azul VLS
            case '#10b981': return 'sepia(1) saturate(20) hue-rotate(100deg) brightness(0.6) contrast(1.2)'; // Verde VLS
            case '#fbbf24': return 'sepia(1) saturate(20) hue-rotate(5deg) brightness(1) contrast(1.2)'; // Dorado VLS
            default: return '';
        }
    };

    // MOTOR DE MOCKUPS VECTORIALES VLS 2026
    const VLSProductMockup = ({ product, config, size }) => {
        const { color, text, textColor, textFont, textScale, textY, uploadedImg, logoScale, logoY } = config;

        // Gradient Definitions para realismo
        const gradients = (
            <defs>
                <linearGradient id="lighting" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                    <stop offset="30%" stopColor="white" stopOpacity="0.05" />
                    <stop offset="60%" stopColor="black" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="shadow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="black" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="black" stopOpacity="0" />
                </radialGradient>
            </defs>
        );

        if (product.id === 'shirt') {
            return (
                <svg width={size} height={size} viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
                    {gradients}
                    {/* Cuerpo de la Polera */}
                    <path d="M100 80 Q200 60 300 80 L380 140 L340 180 L300 160 L300 350 Q200 370 100 350 L100 160 L60 180 L20 140 Z" fill={color} stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    {/* Sombreado Realista */}
                    <path d="M100 80 Q200 60 300 80 L380 140 L340 180 L300 160 L300 350 Q200 370 100 350 L100 160 L60 180 L20 140 Z" fill="url(#lighting)" />
                    {/* Cuello */}
                    <path d="M140 85 Q200 110 260 85 Q200 95 140 85" fill="rgba(0,0,0,0.3)" />
                    
                    {/* Área de Personalización (Logo y Texto) */}
                    <g transform="translate(200, 180)">
                        {uploadedImg && (
                            <image href={uploadedImg} x={-logoScale/2} y={-100 + (logoY * 2)} width={logoScale} height={logoScale} style={{ filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))' }} />
                        )}
                        {text && (
                            <text x="0" y={-120 + (textY * 2.5)} textAnchor="middle" fill={textColor} style={{ fontFamily: textFont, fontSize: `${textScale * 25}px`, fontWeight: 950, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                                {text}
                            </text>
                        )}
                    </g>
                </svg>
            );
        }

        if (product.id === 'mug') {
            return (
                <svg width={size} height={size} viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
                    {gradients}
                    {/* Asa del Tazón */}
                    <path d="M280 140 Q360 140 360 220 Q360 300 280 300" fill="none" stroke={color} strokeWidth="35" strokeLinecap="round" />
                    <path d="M280 140 Q360 140 360 220 Q360 300 280 300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="35" strokeLinecap="round" style={{ filter: 'blur(2px)' }} />
                    {/* Cuerpo Cilíndrico */}
                    <rect x="100" y="100" width="180" height="220" rx="15" fill={color} />
                    <rect x="100" y="100" width="180" height="220" rx="15" fill="url(#lighting)" />
                    {/* Borde Superior */}
                    <ellipse cx="190" cy="100" rx="90" ry="20" fill="rgba(0,0,0,0.2)" />
                    
                    <g transform="translate(190, 210)">
                        {uploadedImg && (
                            <image href={uploadedImg} x={-logoScale/4} y={-50 + (logoY)} width={logoScale/2} height={logoScale/2} />
                        )}
                        {text && (
                            <text x="0" y={-60 + (textY * 1.2)} textAnchor="middle" fill={textColor} style={{ fontFamily: textFont, fontSize: `${textScale * 18}px`, fontWeight: 950 }}>
                                {text}
                            </text>
                        )}
                    </g>
                </svg>
            );
        }

        if (product.id === 'cap') {
            return (
                <svg width={size} height={size} viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
                    {gradients}
                    {/* Copa de la Gorra */}
                    <path d="M100 240 Q100 100 200 100 Q300 100 300 240 Z" fill={color} />
                    <path d="M100 240 Q100 100 200 100 Q300 100 300 240 Z" fill="url(#lighting)" />
                    {/* Visera */}
                    <path d="M100 240 Q200 290 300 240 Q350 260 200 320 Q50 260 100 240" fill={color} filter="brightness(0.8)" />
                    <path d="M100 240 Q200 290 300 240 Q350 260 200 320 Q50 260 100 240" fill="url(#lighting)" opacity="0.3" />
                    
                    <g transform="translate(200, 180)">
                        {uploadedImg && (
                            <image href={uploadedImg} x={-logoScale/4} y={-50 + (logoY)} width={logoScale/2} height={logoScale/2} />
                        )}
                        {text && (
                            <text x="0" y={-60 + (textY * 1.2)} textAnchor="middle" fill={textColor} style={{ fontFamily: textFont, fontSize: `${textScale * 15}px`, fontWeight: 950 }}>
                                {text}
                            </text>
                        )}
                    </g>
                </svg>
            );
        }

        // Default (Box)
        return (
            <svg width={size} height={size} viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
                {gradients}
                <rect x="100" y="140" width="200" height="150" fill={color} />
                <path d="M100 140 L150 100 L350 100 L300 140 Z" fill={color} filter="brightness(1.2)" />
                <path d="M300 140 L350 100 L350 250 L300 290 Z" fill={color} filter="brightness(0.8)" />
                <rect x="100" y="140" width="200" height="150" fill="url(#lighting)" opacity="0.2" />
            </svg>
        );
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setConfig({...config, uploadedImg: url});
        }
    };

    const handleCheckout = () => {
        let subtotal = currentProd.price;
        if (config.uploadedImg && currentProd.category === 'fisico') subtotal += 2500;
        if (config.text && config.text.trim() !== '' && currentProd.category === 'fisico') subtotal += 1500;
        
        const subtotalUnits = subtotal * config.quantity;
        const discount = config.quantity >= 2 ? subtotalUnits * 0.1 : 0;
        const deliveryFee = shippingData.method === 'despacho' && currentProd.category === 'fisico' ? 3000 : 0;
        const total = (subtotalUnits - discount) + deliveryFee;
        
        window.dispatchEvent(new CustomEvent('open-vecinity-pay', { 
            detail: { 
                amount: total, 
                items: [{ 
                    name: currentProd.name + (config.uploadedImg && currentProd.category === 'fisico' ? ' (+ Diseño)' : ''), 
                    quantity: config.quantity, 
                    price: subtotal,
                }],
                shipping: { 
                    name: shippingData.method === 'despacho' && currentProd.category === 'fisico' ? 'Envío VLS a Domicilio' : 'Retiro / Entrega Digital', 
                    price: deliveryFee,
                    details: shippingData
                },
                orderId: 'VLS-SHOP-' + Math.random().toString(36).substr(2, 6).toUpperCase()
            } 
        }));
        onClose();
    };

    const getCalculatedTotal = () => {
        if (!currentProd) return 0;
        let p = currentProd.price;
        if (config.uploadedImg && currentProd.category === 'fisico') p += 2500;
        if (config.text && config.text.trim() !== '' && currentProd.category === 'fisico') p += 1500;
        const deliveryFee = shippingData.method === 'despacho' && currentProd.category === 'fisico' ? 3000 : 0;
        return ((p * config.quantity) * (config.quantity >= 2 ? 0.9 : 1)) + deliveryFee;
    };

    // PANTALLA 1: SELECCIÓN DE PRODUCTOS (Físicos y Digitales)
    if (step === 'selection' || !currentProd) {
        return (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
                <div style={{ height: '60px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#10b981', padding: '6px', borderRadius: '10px' }}><ShoppingCart size={20} color="#020617" /></div>
                        <span style={{ fontWeight: 950, fontSize: '1rem', letterSpacing: '1.5px' }}>VLS <span style={{color: '#10b981'}}>STORE PRO</span></span>
                    </div>
                    <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}><X size={20} /></button>
                </div>
                
                <div style={{ padding: isMobile ? '1.5rem' : '2.5rem', flex: 1, overflowY: 'auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 950, color: 'white', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            MERCADO <span style={{ color: '#10b981' }}>CIUDADANO</span>
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Productos Institucionales y Soluciones Digitales</p>
                    </div>

                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Package size={20}/> MERCHANDISING INSTITUCIONAL
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {PRODUCTS.filter(p => p.category === 'fisico').map(p => (
                            <motion.div 
                                key={p.id} whileHover={{ scale: 1.03, y: -5 }}
                                onClick={() => { setCurrentProd(p); setConfig({...config, color: COLORS[0].hex, uploadedImg: null, text: ''}); setActiveTab('apariencia'); setStep('customize'); }}
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}
                            >
                                <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(56,189,248,0.05))', padding: '1.5rem', borderRadius: '18px', marginBottom: '1.2rem' }}>
                                    <p.icon size={48} color="#10b981" />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>{p.name}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1rem' }}>{p.desc}</p>
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>${p.price.toLocaleString()}</div>
                            </motion.div>
                        ))}
                    </div>

                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Cpu size={20}/> DESARROLLO DIGITAL & SOFTWARE
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {PRODUCTS.filter(p => p.category === 'digital').map(p => (
                            <motion.div 
                                key={p.id} whileHover={{ scale: 1.03, y: -5 }}
                                onClick={() => { setCurrentProd(p); setActiveTab('pago'); setStep('customize'); }}
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}
                            >
                                <div style={{ background: `linear-gradient(135deg, ${p.hex}20, ${p.hex}05)`, padding: '1.5rem', borderRadius: '18px', marginBottom: '1.2rem' }}>
                                    <p.icon size={48} color={p.hex} />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>{p.name}</h3>
                                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1rem' }}>{p.desc}</p>
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: p.hex }}>${p.price.toLocaleString()}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // PANTALLA 2: CUSTOMIZACIÓN / PREVIEW 2D HIPERREALISTA
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
            <div style={{ height: '60px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#10b981', padding: '6px', borderRadius: '10px' }}><ShoppingCart size={20} color="#020617" /></div>
                    <span style={{ fontWeight: 950, fontSize: '1rem', letterSpacing: '1.5px' }}>VLS <span style={{color: '#10b981'}}>STORE PRO</span></span>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flex: 1, overflow: 'hidden' }}>
                
                {/* ── VIEWER 2D: REEMPLAZA EL 3D ── */}
                <div style={{ flex: 1.4, position: 'relative', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', minHeight: isMobile ? '350px' : 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <button onClick={() => setStep('selection')} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '10px 18px', borderRadius: '50px', cursor: 'pointer', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ChevronLeft size={16} /> CATÁLOGO
                    </button>

                    {currentProd.category === 'fisico' ? (
                        <div style={{ position: 'relative', width: isMobile ? '300px' : '450px', height: isMobile ? '300px' : '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* VLS PREMIUM MOCKUP ENGINE v1.0 */}
                            <VLSProductMockup 
                                product={currentProd} 
                                config={config} 
                                size={isMobile ? 300 : 450} 
                            />
                        </div>
                    ) : (
                        // PREVIEW PRODUCTOS DIGITALES (Mockup Software Operativo)
                        <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
                            <div style={{ background: 'rgba(15,23,42,0.9)', padding: '2.5rem', borderRadius: '30px', border: `2px solid ${currentProd.hex}70`, boxShadow: `0 30px 60px ${currentProd.hex}30`, textAlign: 'center', backdropFilter: 'blur(10px)' }}>
                                <div style={{ position: 'absolute', top: '-15px', right: '30px', background: currentProd.hex, color: '#020617', padding: '4px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Terminal size={14} /> LIVE_PROD_v2.6
                                </div>
                                <div style={{ width: '100px', height: '100px', borderRadius: '25px', background: `linear-gradient(135deg, ${currentProd.hex}40, ${currentProd.hex}10)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: `0 10px 25px ${currentProd.hex}40` }}>
                                    <currentProd.icon size={50} color={currentProd.hex} className="animate-pulse" />
                                </div>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 950, margin: '0 0 1rem 0', color: 'white', letterSpacing: '-1px' }}>{currentProd.name}</h2>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>{currentProd.desc}</p>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', background: 'rgba(0,0,0,0.4)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 900, marginBottom: '4px' }}>ESTADO</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} className="animate-pulse" /> OPERATIVO
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 900, marginBottom: '4px' }}>LATENCIA</div>
                                        <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 'bold' }}>24ms avg.</div>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 900, marginBottom: '4px' }}>SEGURIDAD</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                            <Lock size={14} /> WAF_ACTIVE
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 900, marginBottom: '4px' }}>STACK VLS</div>
                                        <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 'bold' }}>Full Cloud</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Lineas de Red Abstractas */}
                            <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', zIndex: -1, opacity: 0.2 }} viewBox="0 0 400 400">
                                <circle cx="200" cy="200" r="150" stroke={currentProd.hex} strokeWidth="1" fill="none" strokeDasharray="10 10" />
                                <circle cx="200" cy="200" r="100" stroke={currentProd.hex} strokeWidth="1" fill="none" strokeDasharray="5 5" />
                                <line x1="200" y1="50" x2="200" y2="350" stroke={currentProd.hex} strokeWidth="0.5" />
                                <line x1="50" y1="200" x2="350" y2="200" stroke={currentProd.hex} strokeWidth="0.5" />
                            </svg>
                        </div>
                    )}
                </div>
                
                {/* ── MENÚ DE CONFIGURACIÓN LATERAL ── */}
                <div style={{ width: isMobile ? '100%' : '420px', background: '#0f172a', borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* TABS SUPERIORES */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        {currentProd.category === 'fisico' && (
                            <>
                                <button onClick={() => setActiveTab('apariencia')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'apariencia' ? '3px solid #10b981' : '3px solid transparent', color: activeTab === 'apariencia' ? '#10b981' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>APARIENCIA</button>
                                <button onClick={() => setActiveTab('diseno')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'diseno' ? '3px solid #38bdf8' : '3px solid transparent', color: activeTab === 'diseno' ? '#38bdf8' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>DISEÑO</button>
                            </>
                        )}
                        <button onClick={() => setActiveTab('pago')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'pago' ? '3px solid #f59e0b' : '3px solid transparent', color: activeTab === 'pago' ? '#f59e0b' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>RESUMEN</button>
                        <button onClick={() => setActiveTab('fundamentos')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'fundamentos' ? '3px solid #38bdf8' : '3px solid transparent', color: activeTab === 'fundamentos' ? '#38bdf8' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>FUNDAMENTOS</button>
                    </div>

                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                        
                        {/* TAB: FUNDAMENTACIÓN TÉCNICA (NUEVO) */}
                        {activeTab === 'fundamentos' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1.2rem', borderRadius: '15px' }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                                        <Server size={18} /> ESPECIFICACIONES TÉCNICAS
                                    </h4>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {currentProd.techSpecs?.map((spec, i) => (
                                            <li key={i} style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#38bdf8' }} />
                                                {spec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {currentProd.methodology && (
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.2rem', borderRadius: '15px' }}>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                                            <ShieldCheck size={18} /> ESTÁNDAR VLS METHOD
                                        </h4>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>{currentProd.methodology}</p>
                                    </div>
                                )}

                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1.2rem', borderRadius: '15px' }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                                        <Zap size={18} color="#fbbf24" /> BENEFICIOS ASOCIADOS
                                    </h4>
                                    <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {currentProd.benefits?.map((b, i) => (
                                            <li key={i} style={{ fontSize: '0.85rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <Check size={14} color="#10b981" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                        {/* TAB: APARIENCIA (Solo Físicos) */}
                        {activeTab === 'apariencia' && currentProd.category === 'fisico' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px', display: 'block', marginBottom: '1rem' }}>EL COLOR BASE</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
                                        {COLORS.map(c => (
                                            <button key={c.hex} onClick={() => setConfig({...config, color: c.hex})} style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: c.hex, border: config.color === c.hex ? '3px solid #10b981' : '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', boxShadow: config.color === c.hex ? '0 0 15px rgba(16,185,129,0.3)' : 'none' }} title={c.name} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px', display: 'block', marginBottom: '1rem' }}>COLOR DE TEXTO (IMPRESIÓN)</label>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '15px' }}>
                                        <input type="color" value={config.textColor} onChange={(e) => setConfig({...config, textColor: e.target.value})} style={{ width: '45px', height: '45px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }} />
                                        <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 'bold' }}>Selecciona contraste ({config.textColor})</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: DISEÑO / LOGO (Solo Físicos) */}
                        {activeTab === 'diseno' && currentProd.category === 'fisico' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                
                                {/* TEXTO */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px', display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        TEXTO (+ $1.500)
                                    </label>
                                    <input type="text" value={config.text} onChange={(e) => setConfig({...config, text: e.target.value})} placeholder="Ingresa texto personalizado..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '15px', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '1rem', outline: 'none' }} />
                                    
                                    {config.text && (
                                        <div style={{ marginTop: '15px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div>
                                                <label style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>TIPOGRAFÍA</label>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                                    {FONTS.map(f => (
                                                        <button 
                                                            key={f.name} 
                                                            onClick={() => setConfig({...config, textFont: f.css})}
                                                            style={{ padding: '8px', background: config.textFont === f.css ? '#10b981' : 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.7rem', fontWeight: 900, cursor: 'pointer' }}
                                                        >
                                                            {f.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>TAMAÑO FONT</span><span>{config.textScale}x</span>
                                                </div>
                                                <input type="range" min="0.5" max="4" step="0.1" value={config.textScale} onChange={(e) => setConfig({...config, textScale: parseFloat(e.target.value)})} style={{ width: '100%', accentColor: '#10b981' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>EJE VERTICAL (Y)</span><span>{config.textY}%</span>
                                                </div>
                                                <input type="range" min="10" max="90" step="1" value={config.textY} onChange={(e) => setConfig({...config, textY: parseFloat(e.target.value)})} style={{ width: '100%', accentColor: '#10b981' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* IMAGEN / LOGO */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px', display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        LOGO / IMAGEN (+ $2.500)
                                    </label>
                                    <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleUpload} accept="image/*" />
                                    <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #38bdf8', padding: '1.5rem', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', background: 'rgba(56,189,248,0.05)', transition: '0.2s' }}>
                                        <Upload size={28} color="#38bdf8" style={{ marginBottom: '10px' }} />
                                        <div style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 900 }}>SUBIR FOTO O DISEÑO</div>
                                        <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '5px' }}>Formato recomendado: PNG sin fondo</div>
                                    </div>
                                    
                                    {config.uploadedImg && (
                                        <div style={{ marginTop: '15px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <img src={config.uploadedImg} style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #38bdf8' }} alt="Logo" />
                                                    <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 800 }}>Arte Aplicado</span>
                                                </div>
                                                <button onClick={() => setConfig({...config, uploadedImg: null})} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}><X size={16}/></button>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>ESCALA LOGO</span><span>{config.logoScale}px</span>
                                                </div>
                                                <input type="range" min="40" max="300" step="5" value={config.logoScale} onChange={(e) => setConfig({...config, logoScale: parseFloat(e.target.value)})} style={{ width: '100%', accentColor: '#38bdf8' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>EJE VERTICAL (Y)</span><span>{config.logoY}%</span>
                                                </div>
                                                <input type="range" min="10" max="90" step="1" value={config.logoY} onChange={(e) => setConfig({...config, logoY: parseFloat(e.target.value)})} style={{ width: '100%', accentColor: '#38bdf8' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: PAGO / RESUMEN */}
                        {activeTab === 'pago' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                
                                <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '1.5px', display: 'block', marginBottom: '1rem' }}>CANTIDAD</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <button onClick={() => setConfig({...config, quantity: Math.max(1, config.quantity - 1)})} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', fontWeight: 900, fontSize: '1.2rem' }}>-</button>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 950, color: '#f59e0b', minWidth: '40px', textAlign: 'center' }}>{config.quantity}</span>
                                        <button onClick={() => setConfig({...config, quantity: config.quantity + 1})} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer', fontWeight: 900, fontSize: '1.2rem' }}>+</button>
                                    </div>
                                    {config.quantity >= 2 && <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 900, marginTop: '10px' }}>✨ 10% OFF POR MAYOR APLICADO</div>}
                                </div>

                                {/* Formulario Logístico */}
                                <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '15px', marginBottom: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 15px 0', fontSize: '0.85rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin size={18}/> DATOS DE ENTREGA
                                    </h4>
                                    
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '15px', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={shippingData.isGift} onChange={e => setShippingData({...shippingData, isGift: e.target.checked})} />
                                        Comprando para un tercero / Empresa <Gift size={16} color="#f59e0b"/>
                                    </label>

                                    {shippingData.isGift && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <input type="text" placeholder="Nombre Destinatario o Empresa..." value={shippingData.recipientName} onChange={e => setShippingData({...shippingData, recipientName: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }} />
                                        </div>
                                    )}

                                    {currentProd.category === 'fisico' ? (
                                        <div style={{ marginBottom: '15px' }}>
                                            <select value={shippingData.method} onChange={e => setShippingData({...shippingData, method: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}>
                                                <option value="retiro">Retiro Local (Gratis)</option>
                                                <option value="despacho">Despacho Domicilio (+$3.000)</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div style={{ marginBottom: '15px', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                            ✓ Entrega Digital / Setup Inmediato
                                        </div>
                                    )}

                                    {shippingData.method === 'despacho' && currentProd.category === 'fisico' && (
                                        <div>
                                            <input type="text" placeholder="Dirección completa..." value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #38bdf8', color: 'white', borderRadius: '10px', fontSize: '0.9rem', outline: 'none' }} />
                                        </div>
                                    )}
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem' }}>
                                    <h4 style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>DESGLOSE FINAL:</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#94a3b8' }}>
                                        <span>Costo Base ({currentProd.name}):</span>
                                        <span>${currentProd.price.toLocaleString()}</span>
                                    </div>
                                    {config.text && currentProd.category === 'fisico' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#94a3b8' }}>
                                            <span>Grabado de Texto:</span>
                                            <span>+$1.500</span>
                                        </div>
                                    )}
                                    {config.uploadedImg && currentProd.category === 'fisico' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#94a3b8' }}>
                                            <span>Implementación de Diseño:</span>
                                            <span>+$2.500</span>
                                        </div>
                                    )}
                                    {shippingData.method === 'despacho' && currentProd.category === 'fisico' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px', color: '#38bdf8' }}>
                                            <span>Cargo de Logística:</span>
                                            <span>+$3.000</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                         <span style={{ fontWeight: 900, color: 'white' }}>TOTAL:</span>
                                         <span style={{ fontWeight: 950, color: '#10b981' }}>${getCalculatedTotal().toLocaleString()}</span>
                                    </div>
                                </div>

                                <button onClick={handleCheckout} style={{ width: '100%', background: 'linear-gradient(45deg, #10b981, #059669)', color: 'white', padding: '1.2rem', borderRadius: '15px', border: 'none', fontWeight: 950, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 15px 30px rgba(16,185,129,0.3)', transition: '0.2s', letterSpacing: '1px' }}>
                                    REALIZAR PAGO <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
