// VLS TAILOR Studio - Version 4.4.0 (Elite Compact Edition 2026)
// + Typography Engine, Spatial Controllers, and Delivery Logistics

import React, { useState, Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    OrbitControls, Center, Text, Float, ContactShadows, 
    Environment, Decal, useTexture, AccumulativeShadows, RandomizedLight,
    PerspectiveCamera, Sparkles, Stage, PresentationControls,
    MeshReflectorMaterial, RoundedBox, Html, useGLTF
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, ChevronRight, ChevronLeft, ShoppingCart, 
    Shirt, Crown, Package, TowerControl, Coffee, 
    GlassWater, Camera, Info, RotateCcw, Box, 
    Palette, Type, Sliders, Check, User, Monitor,
    Upload, MapPin, Gift, Ticket, Newspaper
} from 'lucide-react';
import * as THREE from 'three';

// ── CONFIGURACIÓN Y CONSTANTES ELITE ─────────────────────────────────────

const FONTS = [
    { name: 'OUTFIT', url: 'https://fonts.gstatic.com/s/outfit/v11/Q_3_9nx9Ff9q08H0.woff' },
    { name: 'BEBAS', url: 'https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9WlhyyTh89Y.woff' },
    { name: 'MONTSERRAT', url: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QvOT.woff' },
    { name: 'ROBOTO', url: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZlczYlKw.woff' },
    { name: 'IMPACT', url: 'https://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm3Kz-C8.woff' }
];

const COLORS = [
    { name: 'Sovereign Black', hex: '#020617', desc: 'Negro Profundo' },
    { name: 'Royal White', hex: '#f8fafc', desc: 'Blanco Sedoso' },
    { name: 'Rojo VLS', hex: '#ef4444', desc: 'Rojo Institucional' },
    { name: 'Azul VLS', hex: '#0ea5e9', desc: 'Azul Tecnológico' },
    { name: 'Verde VLS', hex: '#10b981', desc: 'Crecimiento' },
    { name: 'Dorado VLS', hex: '#fbbf24', desc: 'Dorado Atardecer' },
];

const PRODUCTS = [
    { id: 'shirt', name: 'Polera VLS Premium', price: 18990, desc: 'Algodón 200g Soft Touch', icon: Shirt, geo: 'shirt', mascot: '/models/Serenito_polera_blancacuerpo_entero.glb' },
    { id: 'mug', name: 'Tazón Regional 4K', price: 8990, desc: 'Cerámica Triple Capa', icon: Coffee, geo: 'cylinder', mascot: '/models/tata_rojas_3d.glb' },
    { id: 'cap', name: 'Gorra Comuna Smart', price: 11990, desc: 'Modelo Trucker Blanca', icon: Crown, geo: 'tripo', modelPath: '/models/gorro_blanco.glb', mascot: '/models/Serenito_polera_blancacuerpo_entero.glb' },
    { id: 'glass', name: 'Vaso Vecinal Pro', price: 6500, desc: 'Vidrio Templado 16oz', icon: GlassWater, geo: 'cylinder', mascot: '/models/tata_rojas_3d.glb' },
    { id: 'faro', name: 'Miniatura Faro VLS', price: 24900, desc: 'Réplica Escala Coleccionable', icon: TowerControl, geo: 'tripo', modelPath: '/models/faro_3d_modelo.glb', mascot: '/models/alpino3d.glb' },
    { id: 'tata', name: 'Miniatura Tata Rojas', price: 25900, desc: 'Gran Patriarca del Valle', icon: User, geo: 'tripo', modelPath: '/models/tata_rojas_3d.glb' },
    { id: 'alpino', name: 'Alpino 3D Tech', price: 27500, desc: 'Informática & Cerro: Figura de Élite', icon: Monitor, geo: 'tripo', modelPath: '/models/alpino3d.glb' },
    { id: 'boleta_playcenter', name: 'Boleta Playcenter 3D', price: 1500, desc: 'Ticket Nostálgico Coleccionable', icon: Ticket, geo: 'tripo', modelPath: '/models/boleta_PLAYCENTER_3d.glb' },
    { id: 'kiosko_periodicos', name: 'Kiosko Diarios 3D', price: 35000, desc: 'Icono Urbano a Escala', icon: Newspaper, geo: 'tripo', modelPath: '/models/kiosko_periodicos_3d.glb' },
    { id: 'papaya', name: 'Papayas Regionales', price: 7990, desc: 'Tradición en Frasco VLS', icon: Package, geo: 'box' }
];

// Configuración Global Draco para descompresión de mallas
try {
    useGLTF.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
} catch (e) {
    console.warn("VLS 3D: Draco decoder path configuration error.");
}

// ── COMPONENTES 3D ───────────────────────────────────────────────────────

function PoleraMaterial({ url, decalPos, decalScale }) {
    const texture = useTexture(url);
    return (
        <Decal position={decalPos || [0, 0.4, 0.26]} rotation={[0, 0, 0]} scale={decalScale || [0.8, 0.8, 0.8]}>
            <meshStandardMaterial map={texture} transparent depthTest={true} depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
        </Decal>
    );
}

function TripoAvatar({ url, config, isMascot, position }) {
    const { scene } = useGLTF(url);

    const mainMesh = useMemo(() => {
        let biggestMesh = null;
        let maxVerts = 0;
        scene.traverse(node => {
            if (node.isMesh && node.geometry.attributes.position && node.geometry.attributes.position.count > maxVerts) {
                biggestMesh = node;
                maxVerts = node.geometry.attributes.position.count;
            }
        });
        return biggestMesh;
    }, [scene]);

    const clonedMat = useMemo(() => {
        if (!mainMesh) return null;
        let mat = mainMesh.material;
        if (Array.isArray(mat)) mat = mat[0];
        const newMat = mat.clone();
        if (!isMascot && config.color) {
            newMat.color = new THREE.Color(config.color);
        }
        return newMat;
    }, [mainMesh, config.color, isMascot]);

    if (!mainMesh) {
        return (
            <Html center>
                <div style={{ color: '#10b981', fontWeight: 900, fontSize: '0.8rem', background: 'rgba(2,6,23,0.9)', padding: '10px 20px', borderRadius: '10px', whiteSpace: 'nowrap', border: '1px solid #10b981' }}>
                    PROCESANDO MALLA...
                </div>
            </Html>
        );
    }

    return (
        <mesh 
            geometry={mainMesh.geometry} 
            material={clonedMat} 
            position={position || [0, -1, 0]} 
            scale={isMascot ? 1.5 : 2} 
            rotation={isMascot ? [0, Math.PI / 8, 0] : [0, 0, 0]}
        >
            {!isMascot && config.uploadedImg && (
                <PoleraMaterial url={config.uploadedImg} decalPos={[0, config.logoY, 0.5]} decalScale={[config.logoScale, config.logoScale, config.logoScale]} />
            )}
            {!isMascot && config.text && (
                <Text 
                    position={[0, config.textY, 0.55]} 
                    fontSize={config.textScale} 
                    color={config.textColor || '#ffffff'} 
                    anchorX="center" 
                    anchorY="middle"
                    font={config.textFont}
                >
                    {config.text}
                </Text>
            )}
        </mesh>
    );
}

function Polera({ config }) {
    const { color, uploadedImg, logoY, logoScale, text, textColor, textY, textScale, textFont } = config;
    return (
        <group dispose={null} position={[0, -0.5, 0]} scale={0.8}>
            {/* Torso */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.5, 2.5, 0.5]} />
                <meshStandardMaterial color={color} roughness={0.7} />
                {uploadedImg && <PoleraMaterial url={uploadedImg} decalPos={[0, logoY, 0.26]} decalScale={[logoScale, logoScale, logoScale]} />}
                {text && (
                    <Text 
                        position={[0, textY, 0.26]} 
                        fontSize={textScale} 
                        color={textColor || '#ffffff'} 
                        anchorX="center" 
                        anchorY="middle"
                        font={textFont}
                    >
                        {text}
                    </Text>
                )}
            </mesh>
            {/* Left Sleeve */}
            <mesh castShadow receiveShadow position={[-1, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.3, 0.25, 1, 16]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {/* Right Sleeve */}
            <mesh castShadow receiveShadow position={[1, 0.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <cylinderGeometry args={[0.3, 0.25, 1, 16]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            {/* Cuello */}
            <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
                <cylinderGeometry args={[0.35, 0.4, 0.2, 32]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
        </group>
    );
}

function GenericProduct({ config, geo }) {
    const isCyl = geo === 'cylinder';
    const isSph = geo === 'sphere';
    const zOffset = isCyl ? 0.51 : (isSph ? 0.71 : 0.51);
    const { color, uploadedImg, logoY, logoScale, text, textColor, textY, textScale, textFont } = config;

    return (
        <mesh position={[0, isCyl ? 0 : -0.2, 0]} scale={1.2}>
            {isCyl ? <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} /> : isSph ? <sphereGeometry args={[0.7, 32, 32]} /> : <boxGeometry args={[1, 1, 1]} />}
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
            {uploadedImg && (
                <PoleraMaterial url={uploadedImg} decalPos={[0, logoY, zOffset]} decalScale={[logoScale, logoScale, logoScale]} />
            )}
            {text && (
                <Text 
                    position={[0, textY, zOffset]} 
                    fontSize={textScale} 
                    color={textColor || '#ffffff'} 
                    anchorX="center" 
                    anchorY="middle"
                    font={textFont}
                >
                    {text}
                </Text>
            )}
        </mesh>
    );
}

function Scene3D({ config }) {
    const prod = PRODUCTS.find(p => p.id === config.productType);
    return (
        <Suspense fallback={<Html center><div style={{ background: 'rgba(2,6,23,0.8)', border: '1px solid #10b981', padding: '10px 20px', borderRadius: '10px', color: '#10b981', fontWeight: 800, whiteSpace: 'nowrap' }}>SINCRO 3D...</div></Html>}>
            <Center bottom>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
                    {/* El anfitrión estrella (Serenito) */}
                    {prod?.mascot && <TripoAvatar url={prod.mascot} config={config} isMascot={true} position={[-2.2, -0.4, -0.5]} />}
                    {/* El producto comercial */}
                    {prod?.geo === 'tripo' ? <TripoAvatar url={prod.modelPath} config={config} position={[0, -0.5, 0]} /> : (prod?.geo === 'shirt' ? <Polera config={config} /> : <GenericProduct config={config} geo={prod?.geo} />)}
                </Float>
                <ContactShadows 
                    position={[0, -1.2, 0]} 
                    opacity={0.4} 
                    scale={12} 
                    blur={2} 
                    far={4.5} 
                />
                <Environment preset="studio" />
                <OrbitControls 
                    makeDefault 
                    minPolarAngle={Math.PI / 4} 
                    maxPolarAngle={Math.PI / 1.5} 
                    enableZoom={true}
                />
            </Center>
        </Suspense>
    );
}

// Inicializamos la precarga asíncrona de cachés para evitar congelamientos durante el switch
useGLTF.preload('/models/Serenito_polera_blancacuerpo_entero.glb');
useGLTF.preload('/models/figura_farol_3d.glb');
useGLTF.preload('/models/faro_3d_modelo.glb');
useGLTF.preload('/models/gorro_blanco.glb');
useGLTF.preload('/models/tata_rojas_3d.glb');
useGLTF.preload('/models/alpino3d.glb');

export default function TiendaPoleras3D({ onClose }) {
    const [step, setStep] = useState('selection'); 
    const [activeTab, setActiveTab] = useState('apariencia'); // 'apariencia', 'diseno', 'pago'
    const [currentProd, setCurrentProd] = useState(null);
    const [config, setConfig] = useState({
        productType: 'shirt',
        color: COLORS[0].hex,
        quantity: 1,
        text: '',
        textColor: '#ffffff',
        textFont: FONTS[0].url,
        textScale: 0.15,
        textY: -0.2,
        uploadedImg: null,
        logoScale: 0.8,
        logoY: 0.4,
        shipping: { name: 'Retiro Local VLS', price: 0 }
    });
    
    // Delivery Logistics State
    const [shippingData, setShippingData] = useState({
        isGift: false,
        recipientName: '',
        method: 'retiro',
        address: '',
    });

    const fileRef = useRef(null);
    const isMobile = window.innerWidth < 1024;

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setConfig({...config, uploadedImg: url});
        }
    };

    const handleCheckout = () => {
        let subtotal = currentProd.price;
        if (config.uploadedImg) subtotal += 2500;
        if (config.text && config.text.trim() !== '') subtotal += 1500;
        
        const subtotalUnits = subtotal * config.quantity;
        const discount = config.quantity >= 2 ? subtotalUnits * 0.1 : 0;
        const deliveryFee = shippingData.method === 'despacho' ? 3000 : 0;
        const total = (subtotalUnits - discount) + deliveryFee;
        
        window.dispatchEvent(new CustomEvent('open-vecinity-pay', { 
            detail: { 
                amount: total, 
                items: [{ 
                    name: currentProd.name + (config.uploadedImg ? ' + Logo' : '') + (config.text ? ' + Texto' : ''), 
                    quantity: config.quantity, 
                    price: subtotal,
                }],
                shipping: { 
                    name: shippingData.method === 'despacho' ? 'Envío VLS a Domicilio' : 'Retiro Local', 
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
        if (config.uploadedImg) p += 2500;
        if (config.text && config.text.trim() !== '') p += 1500;
        const deliveryFee = shippingData.method === 'despacho' ? 3000 : 0;
        return ((p * config.quantity) * (config.quantity >= 2 ? 0.9 : 1)) + deliveryFee;
    };

    const renderMainContent = () => {
        if (step === 'selection' || !currentProd) {
            return (
                <div style={{ padding: isMobile ? '1.5rem' : '2.5rem', height: '100%', overflowY: 'auto', background: '#020617' }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '3.5rem' }}>
                        <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 950, color: 'white', letterSpacing: '1px' }}>
                            SELECCIÓN DE <span style={{ color: '#10b981' }}>POTENCIA</span>
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.5rem' }}>Elige la base de tu producción ciudadana v2026</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                        {PRODUCTS.map(p => (
                            <motion.div 
                                key={p.id}
                                whileHover={{ scale: 1.03, y: -5 }}
                                onClick={() => { setCurrentProd(p); setConfig({...config, productType: p.id}); setActiveTab('apariencia'); setStep('customize'); }}
                                style={{ 
                                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '1.5rem', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                                }}
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
                </div>
            );
        }

        return (
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100%', overflow: 'hidden' }}>
                <div style={{ flex: 1.4, position: 'relative', background: '#020617', minHeight: isMobile ? '350px' : 'auto' }}>
                    <button onClick={() => setStep('selection')} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 18px', borderRadius: '50px', cursor: 'pointer', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ChevronLeft size={16} /> VOLVER
                    </button>
                    <Canvas shadows dpr={[1, 2]}>
                        <Scene3D config={config} />
                    </Canvas>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(16,185,129,0.2)' }}>
                        MODELO: {currentProd.name.toUpperCase()}
                    </div>
                </div>
                
                {/* ── MOTOR INTERMEDIO: SIDEBAR ── */}
                <div style={{ width: isMobile ? '100%' : '380px', background: '#0f172a', borderLeft: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* TABS SUPERIORES */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <button onClick={() => setActiveTab('apariencia')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'apariencia' ? '3px solid #10b981' : '3px solid transparent', color: activeTab === 'apariencia' ? '#10b981' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>APARIENCIA</button>
                        <button onClick={() => setActiveTab('diseno')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'diseno' ? '3px solid #38bdf8' : '3px solid transparent', color: activeTab === 'diseno' ? '#38bdf8' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>PERSONALIZAR</button>
                        <button onClick={() => setActiveTab('pago')} style={{ flex: 1, padding: '1rem 0', background: 'none', border: 'none', borderBottom: activeTab === 'pago' ? '3px solid #f59e0b' : '3px solid transparent', color: activeTab === 'pago' ? '#f59e0b' : '#64748b', fontWeight: 900, cursor: 'pointer', fontSize: '0.8rem' }}>RESUMEN</button>
                    </div>

                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                        
                        {/* TAB: APARIENCIA */}
                        {activeTab === 'apariencia' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1.5px', display: 'block', marginBottom: '0.8rem' }}>COLOR BASE</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                                        {COLORS.map(c => (
                                            <button key={c.hex} onClick={() => setConfig({...config, color: c.hex})} style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: c.hex, border: config.color === c.hex ? '3px solid #10b981' : '2px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1.5px', display: 'block', marginBottom: '0.8rem' }}>COLOR DEL TEXTO</label>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <input type="color" value={config.textColor} onChange={(e) => setConfig({...config, textColor: e.target.value})} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }} />
                                        <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Seleccionar contraste</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: DISEÑO / PERSONALIZACIÓN */}
                        {activeTab === 'diseno' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1.5px', display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        TEXTO (+ $1.500)
                                    </label>
                                    <input type="text" value={config.text} onChange={(e) => setConfig({...config, text: e.target.value})} placeholder="Mensaje personalizado..." style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', color: 'white', fontWeight: 'bold' }} />
                                    
                                    {config.text && (
                                        <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <div>
                                                <label style={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>TIPOGRAFÍA</label>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                                                    {FONTS.map(f => (
                                                        <button 
                                                            key={f.name} 
                                                            onClick={() => setConfig({...config, textFont: f.url})}
                                                            style={{ 
                                                                padding: '8px 4px', 
                                                                background: config.textFont === f.url ? '#10b981' : 'rgba(255,255,255,0.05)',
                                                                border: 'none',
                                                                borderRadius: '6px',
                                                                color: 'white',
                                                                fontSize: '0.6rem',
                                                                fontWeight: 900,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            {f.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>TAMAÑO FONT</span><span>{Math.round(config.textScale * 100)}%</span>
                                                </div>
                                                <input type="range" min="0.05" max="0.6" step="0.01" value={config.textScale} onChange={(e) => setConfig({...config, textScale: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>POSICIÓN VERTICAL (Y)</span><span>{config.textY}</span>
                                                </div>
                                                <input type="range" min="-1.5" max="1.5" step="0.05" value={config.textY} onChange={(e) => setConfig({...config, textY: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1.5px', display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                        LOGO / IMAGEN (+ $2.500)
                                    </label>
                                    <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={handleUpload} accept="image/*" />
                                    <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #38bdf8', padding: '1.5rem', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', background: 'rgba(56,189,248,0.05)' }}>
                                        <Upload size={24} color="#38bdf8" style={{ marginBottom: '8px' }} />
                                        <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 900 }}>SUBIR FOTO, LOGO O MARCA</div>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '5px' }}>Formato Recomendado: PNG sin fondo</div>
                                    </div>
                                    
                                    {config.uploadedImg && (
                                        <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <img src={config.uploadedImg} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '5px' }} alt="Uploaded Logo" />
                                                    <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800 }}>Logo Aplicado</span>
                                                </div>
                                                <button onClick={() => setConfig({...config, uploadedImg: null})} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16}/></button>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>ESCALA LOGO</span><span>{Math.round(config.logoScale * 100)}%</span>
                                                </div>
                                                <input type="range" min="0.2" max="2.5" step="0.1" value={config.logoScale} onChange={(e) => setConfig({...config, logoScale: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>POSICIÓN (Y)</span><span>{config.logoY}</span>
                                                </div>
                                                <input type="range" min="-1.5" max="1.5" step="0.05" value={config.logoY} onChange={(e) => setConfig({...config, logoY: parseFloat(e.target.value)})} style={{ width: '100%' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* TAB: PAGO / RESUMEN */}
                        {activeTab === 'pago' && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ color: '#64748b', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1.5px', display: 'block', marginBottom: '0.8rem' }}>CANTIDAD</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <button onClick={() => setConfig({...config, quantity: Math.max(1, config.quantity - 1)})} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', width: '35px', height: '35px', borderRadius: '10px', cursor: 'pointer', fontWeight: 900 }}>-</button>
                                        <span style={{ fontSize: '1.4rem', fontWeight: 950, color: '#f59e0b', minWidth: '30px', textAlign: 'center' }}>{config.quantity}</span>
                                        <button onClick={() => setConfig({...config, quantity: config.quantity + 1})} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', width: '35px', height: '35px', borderRadius: '10px', cursor: 'pointer', fontWeight: 900 }}>+</button>
                                    </div>
                                    {config.quantity >= 2 && <div style={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 900, marginTop: '8px' }}>✨ 10% OFF POR MAYOR APLICADO</div>}
                                </div>

                                {/* Formulario Logístico de Despacho */}
                                <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1.2rem', borderRadius: '18px', marginBottom: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                    <h4 style={{ margin: '0 0 12px 0', fontSize: '0.8rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <MapPin size={16}/> DATOS DE ENTREGA
                                    </h4>
                                    
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '12px', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={shippingData.isGift} onChange={e => setShippingData({...shippingData, isGift: e.target.checked})} />
                                        Es un regalo / Compra para un tercero <Gift size={14} color="#f59e0b"/>
                                    </label>

                                    {shippingData.isGift && (
                                        <div style={{ marginBottom: '12px' }}>
                                            <input type="text" placeholder="Nombre de quien recibe..." value={shippingData.recipientName} onChange={e => setShippingData({...shippingData, recipientName: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', fontSize: '0.85rem' }} />
                                        </div>
                                    )}

                                    <div style={{ marginBottom: '12px' }}>
                                        <select value={shippingData.method} onChange={e => setShippingData({...shippingData, method: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                                            <option value="retiro">Retiro Módulo Presencial VLS (Gratis)</option>
                                            <option value="despacho">Despacho a Domicilio (+$3.000)</option>
                                        </select>
                                    </div>

                                    {shippingData.method === 'despacho' && (
                                        <div>
                                            <input type="text" placeholder="Ej: Las Higueras 1234, Depto 45, La Serena..." value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid #38bdf8', color: 'white', borderRadius: '8px', fontSize: '0.85rem' }} />
                                        </div>
                                    )}
                                </div>

                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '18px', marginBottom: '2rem' }}>
                                    <h4 style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>Desglose:</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#94a3b8' }}>
                                        <span>Costo Base ({currentProd.name}):</span>
                                        <span>${currentProd.price.toLocaleString()}</span>
                                    </div>
                                    {config.text && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#94a3b8' }}>
                                            <span>Grabado de Texto:</span>
                                            <span>+$1.500</span>
                                        </div>
                                    )}
                                    {config.uploadedImg && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#94a3b8' }}>
                                            <span>Estampado de Logo:</span>
                                            <span>+$2.500</span>
                                        </div>
                                    )}
                                    {shippingData.method === 'despacho' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', color: '#38bdf8' }}>
                                            <span>Despacho a Domicilio:</span>
                                            <span>+$3.000</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                                         <span style={{ fontWeight: 900, color: 'white' }}>TOTAL A PAGAR:</span>
                                         <span style={{ fontWeight: 950, color: '#f59e0b' }}>${getCalculatedTotal().toLocaleString()}</span>
                                    </div>
                                </div>

                                <button onClick={handleCheckout} style={{ width: '100%', background: 'linear-gradient(45deg, #f59e0b, #d97706)', color: 'white', padding: '1rem', borderRadius: '15px', border: 'none', fontWeight: 950, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 15px 30px rgba(245,158,11,0.2)' }}>
                                    IR A CAJA / VECNITY PAY <ChevronRight size={18} />
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000000, background: '#020617', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: "'Outfit', sans-serif" }}>
            <div style={{ height: '60px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1.5rem', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#10b981', padding: '6px', borderRadius: '10px' }}>
                        <ShoppingCart size={20} color="#020617" />
                    </div>
                    <span style={{ fontWeight: 950, fontSize: '1rem', letterSpacing: '1.5px' }}>VLS <span style={{color: '#10b981'}}>TAILOR</span></span>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                    <X size={20} />
                </button>
            </div>
            
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {renderMainContent()}
            </div>
        </div>
    );
}
