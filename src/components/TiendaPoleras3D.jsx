import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Decal, useTexture, MeshReflectorMaterial, Environment, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Shirt, Upload, Palette, X, Camera, Zap, LayoutGrid } from 'lucide-react';

// Primitive T-Shirt shape (if no GLB available)
function TShirtShape({ color, textureUrl, decalPos }) {
    const decalRef = useRef();
    // Usa un texture placeholder si no hay url cargada
    const texture = useTexture(textureUrl || 'https://raw.githubusercontent.com/pmndrs/drei/master/docs/logo.png');

    return (
        <group dispose={null}>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                {/* Torso básico redondeado */}
                <boxGeometry args={[1.5, 2.5, 0.5]} />
                <meshStandardMaterial color={color} roughness={0.7} />
                
                {/* Decal interactivo */}
                <Decal
                    ref={decalRef}
                    position={decalPos} // [0, 0.5, 0.26]
                    rotation={[0, 0, 0]}
                    scale={[1, 1, 1]}
                >
                    <meshStandardMaterial
                        map={texture}
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-1}
                        roughness={0.5}
                    />
                </Decal>
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

// El Espejo Virtual (Virtual Mirror)
function VirtualMirror() {
    return (
        <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
            <planeGeometry args={[6, 8]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={80}
                roughness={0}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#a0a0a0"
                metalness={0.8}
            />
        </mesh>
    );
}

export default function TiendaPoleras3D({ onClose }) {
    const [shirtColor, setShirtColor] = useState('#ffffff');
    const [uploadedImg, setUploadedImg] = useState(null);
    const [decalPos, setDecalPos] = useState([0, 0.5, 0.26]);
    const fileRef = useRef(null);

    const COLORS = [
        '#ffffff', '#000000', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'
    ];

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUploadedImg(url);
        }
    };

    const handleTakeScreenshot = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'vls-tshirt-design.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150000, background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%)', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '15px', color: '#0f172a' }}>
                        <Shirt size={24} />
                    </div>
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px' }}>VLS TAILOR 3D</h2>
                        <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: 'bold' }}>ESPEJO VIRTUAL Y DISEÑO DE VESTUARIO</span>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                    <X size={20} />
                </button>
            </div>

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                
                {/* 3D Viewport */}
                <div style={{ flex: 1, position: 'relative' }}>
                    
                    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.8rem', display: 'flex', gap: '10px', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
                        <LayoutGrid size={16} color="#38bdf8"/> ARRASTRA PARA GIRAR. USA SCROLL PARA ZOOM.
                    </div>

                    <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
                        <Suspense fallback={null}>
                            <color attach="background" args={['#0f172a']} />
                            <ambientLight intensity={0.5} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                            
                            <PresentationControls
                                global
                                rotation={[0, 0, 0]}
                                polar={[-Math.PI / 4, Math.PI / 4]}
                                azimuth={[-Math.PI / 4, Math.PI / 4]}
                            >
                                <TShirtShape color={shirtColor} textureUrl={uploadedImg} decalPos={decalPos} />
                            </PresentationControls>

                            <VirtualMirror />
                            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                            <Environment preset="city" />
                        </Suspense>
                        <OrbitControls makeDefault minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/1.5} minDistance={3} maxDistance={10} />
                    </Canvas>
                    
                    {/* Controls Overlay */}
                    <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px' }}>
                        <button onClick={handleTakeScreenshot} className="btn-glass" style={{ background: 'rgba(56,189,248,0.2)', color: '#38bdf8', border: '1px solid #38bdf8', padding: '12px 25px', borderRadius: '50px', display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 'bold' }}>
                            <Camera size={18} /> CAPTURAR RESULTADO
                        </button>
                    </div>
                </div>

                {/* Sidebar (Herramientas) */}
                <div style={{ width: '380px', background: 'rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '2rem', overflowY: 'auto' }}>
                    <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Palette size={20} color="#f59e0b" /> MATERIALES Y DISEÑO
                    </h3>

                    {/* Color Picker */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>COLOR BASE (TELA)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                            {COLORS.map(c => (
                                <button 
                                    key={c}
                                    onClick={() => setShirtColor(c)}
                                    style={{ 
                                        width: '100%', aspectRatio: '1', borderRadius: '50%', background: c, border: shirtColor === c ? '3px solid #38bdf8' : '2px solid rgba(255,255,255,0.2)',
                                        cursor: 'pointer', boxShadow: shirtColor === c ? '0 0 15px rgba(56,189,248,0.5)' : 'none',
                                        transition: 'all 0.2s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Decal Upload */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>ESTAMPADO DIGITAL (DECAL)</label>
                        <input type="file" accept="image/png, image/jpeg" ref={fileRef} style={{ display: 'none' }} onChange={handleUpload} />
                        
                        <div 
                            onClick={() => fileRef.current?.click()}
                            style={{ 
                                background: 'rgba(56, 189, 248, 0.1)', border: '2px dashed #38bdf8', padding: '2rem', borderRadius: '20px',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px', color: '#38bdf8', cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)'}
                        >
                            <Upload size={32} />
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold' }}>SUBIR LOGO O DISEÑO</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Mejor resolución: PNG sin fondo (Transparente)</div>
                            </div>
                        </div>

                        {uploadedImg && (
                            <div style={{ marginTop: '15px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <img src={uploadedImg} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '8px' }} />
                                <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 'bold' }}>Cargado Exitosamente</span>
                                <button onClick={() => setUploadedImg(null)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={16} /></button>
                            </div>
                        )}
                    </div>

                    {/* Ajuste de Posición del Decal */}
                    {uploadedImg && (
                        <div style={{ marginBottom: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px' }}>
                            <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>POSICIÓN DEL ESTAMPADO</label>
                            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.8rem' }}>
                                    <span>Vertical:</span>
                                    <input type="range" min="0" max="1" step="0.05" value={decalPos[1]} onChange={(e) => setDecalPos([decalPos[0], parseFloat(e.target.value), decalPos[2]])} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '0.8rem' }}>
                                    <span>Horizontal:</span>
                                    <input type="range" min="-0.6" max="0.6" step="0.05" value={decalPos[0]} onChange={(e) => setDecalPos([parseFloat(e.target.value), decalPos[1], decalPos[2]])} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botón de Compra */}
                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <button className="btn-primary" style={{ width: '100%', padding: '15px', background: 'linear-gradient(90deg, #10b981, #059669)', border: 'none', borderRadius: '50px', fontSize: '1rem', fontWeight: '900', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                            <Zap size={20} /> PASAR A PRODUCCIÓN (V-PAY)
                        </button>
                        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.7rem', marginTop: '10px' }}>
                            Costo estimado de confección: 4.500 Fichas VLS
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
