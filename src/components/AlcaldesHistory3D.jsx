import React, { useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, OrbitControls, useGLTF, useAnimations, Float } from '@react-three/drei';
import { 
    X, Clock, Landmark, User, 
    Award, Shield, Calendar, 
    Info, Search, Share2, Volume2, VolumeX,
    Filter, Milestone, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Tunnel Component (Visual Engine)
 */
function TimeTunnel() {
    const groupRef = React.useRef();
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = clock.getElapsedTime() * 0.04;
        }
    });

    return (
        <group ref={groupRef}>
            {Array.from({ length: 90 }).map((_, i) => (
                <Ring key={i} ringIndex={i} />
            ))}
            {/* Core light line */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -100]}>
                <cylinderGeometry args={[0.08, 0.08, 400, 8]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} transparent opacity={0.4} />
            </mesh>
        </group>
    );
}

function Ring({ ringIndex }) {
    const meshRef = React.useRef();
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (meshRef.current) {
            const speed = 4;
            const totalDepth = 90 * 5;
            const offset = (elapsedTime * speed + ringIndex * 5) % totalDepth;
            meshRef.current.position.z = -ringIndex * 5 + (offset % 5);
        }
    });
    
    // Period-based coloring for the tunnel itself? Or randomized?
    const hue = (ringIndex * 4) % 360;
    return (
        <mesh ref={meshRef} position={[0, 0, -ringIndex * 5]}>
            <ringGeometry args={[5, 5.5, 64]} />
            <meshBasicMaterial 
                color={`hsl(${hue}, 80%, 60%)`} 
                transparent opacity={0.12} 
                side={2} 
            />
        </mesh>
    );
}

function MayorCrystal({ mayor, active, onClick }) {
    const meshRef = React.useRef();
    
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.y += Math.sin(clock.getElapsedTime() * 2 + mayor.id) * 0.005;
        }
    });

    return (
        <group position={mayor.pos}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh 
                    ref={meshRef} 
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; }}
                >
                    <octahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial 
                        color={mayor.color} 
                        emissive={mayor.color} 
                        emissiveIntensity={active ? 2 : 0.5}
                        transparent 
                        opacity={0.8}
                        wireframe={!active}
                    />
                </mesh>
            </Float>
            
            <Html position={[0, -2.5, 0]} center>
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                        background: active ? mayor.color : 'rgba(15, 23, 42, 0.9)', 
                        padding: '10px 20px', 
                        borderRadius: '30px', 
                        color: active ? '#000' : 'white', 
                        fontWeight: '900', 
                        fontSize: '14px', 
                        whiteSpace: 'nowrap', 
                        border: `2px solid ${mayor.color}`, 
                        cursor: 'pointer',
                        boxShadow: active ? `0 0 30px ${mayor.color}` : 'none'
                    }}
                    onClick={onClick}
                >
                    {mayor.nombre}
                </motion.div>
            </Html>
        </group>
    );
}

function GuidesModel() {
    const groupRef = React.useRef();
    // Reusing Serenito model if available
    const { scene } = useGLTF('/serenito_draco.glb', 'https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    
    return (
        <group ref={groupRef} position={[-8, 0, -10]} rotation={[0, Math.PI / 4, 0]}>
            <primitive object={scene} scale={2.5} />
            <Html position={[0, 4, 0]} center>
                <div className="p-3 bg-blue-500 rounded-2xl text-black font-black text-xs uppercase border-2 border-white shadow-xl">
                    ¡Viajemos por la historia municipal! 🏛️
                </div>
            </Html>
        </group>
    );
}

/**
 * Main Component: AlcaldesHistory3D
 */
const AlcaldesHistory3D = ({ onClose }) => {
    const [selectedMayor, setSelectedMayor] = useState(null);
    const [filterEra, setFilterEra] = useState('all'); // all, pre, during, post
    
    const alcaldesData = [
        // Era Democrática Antigua (Before Dictatorship)
        { id: 1, periodo: "2024 - 2028", nombre: "Daniela Norambuena", partido: "RN", era: "post", hito: "Primera alcaldesa RN electa en democracia.", legado: "Modernización digital y seguridad vecinal.", color: "#1e40af", pos: [12, 0, -5] },
        { id: 2, periodo: "2012 - 2024", nombre: "Roberto Jacob Jure", partido: "PR", era: "post", hito: "Tres periodos de gestión radical.", legado: "Patrimonio cultural y grandes eventos.", color: "#dc2626", pos: [-15, 3, -20] },
        { id: 3, periodo: "2004 - 2012", nombre: "Raúl Saldívar Auger", partido: "PS", era: "post", hito: "Consolidación del borde costero.", legado: "Modernización urbana y plazas.", color: "#ef4444", pos: [15, -2, -35] },
        { id: 4, periodo: "1992 - 2004", nombre: "Adriana Peñafiel V.", partido: "RN", era: "post", hito: "Transición democrática local (Electa).", legado: "Turismo y casco histórico.", color: "#1e3a8a", pos: [-12, -4, -50] },
        
        // Dictadura / Interrupción (During Dictatorship)
        { id: 5, periodo: "1989 - 1992", nombre: "Lowell Wigodski B.", partido: "Indep.", era: "during", hito: "Último alcalde designado.", legado: "Transición administrativa.", color: "#64748b", pos: [18, 5, -65] },
        { id: 6, periodo: "1986 - 1989", nombre: "Adriana Peñafiel V.", partido: "Designada", era: "during", hito: "Alcaldesa designada (Periodo Militar).", legado: "Servicios municipales.", color: "#64748b", pos: [-15, 6, -80] },
        { id: 7, periodo: "1978 - 1986", nombre: "Eugenio Munizaga R.", partido: "Designado", era: "during", hito: "Larga gestión militar.", legado: "Obras públicas provinciales.", color: "#64748b", pos: [10, -6, -95] },
        { id: 8, periodo: "1973 - 1978", nombre: "Jorge Morales A.", partido: "Designado", era: "during", hito: "Inicio del régimen militar local.", legado: "Intervención institucional.", color: "#64748b", pos: [-10, -7, -110] },
        
        // Era Democrática Fundacional (Before 1973)
        { id: 9, periodo: "1967 - 1973", nombre: "Carlos Galleguillos B.", partido: "PR", era: "pre", hito: "Último electo antes de 1973.", legado: "Apoyo a movimientos sociales.", color: "#dc2626", pos: [15, 2, -125] },
        { id: 10, periodo: "1960 - 1967", nombre: "Jorge Morales A.", partido: "PR", era: "pre", hito: "Hegemonía radical de los 60.", legado: "Desarrollo habitacional.", color: "#dc2626", pos: [-15, 0, -140] },
        { id: 11, periodo: "1956 - 1960", nombre: "Victoria Pinto Durán", partido: "PCU", era: "pre", hito: "Primera alcaldesa en la historia de Chile.", legado: "Hito pionero de género.", color: "#f59e0b", pos: [12, -4, -155] },
        { id: 12, periodo: "1944 - 1950", nombre: "Ernesto Aguirre Valín", partido: "PR", era: "pre", hito: "Ejecución del Plan Serena.", legado: "Transformación urbana total.", color: "#dc2626", pos: [-12, 5, -170] }
    ];

    const filteredData = filterEra === 'all' 
        ? alcaldesData 
        : alcaldesData.filter(m => m.era === filterEra);

    return (
        <div className="fixed inset-0 z-[100000] bg-slate-950 overflow-hidden font-['Inter']">
            {/* HUD Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="p-8 flex justify-between items-start pointer-events-auto">
                    <div className="bg-slate-900/80 backdrop-blur-xl p-6 border border-slate-700/50 rounded-3xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Clock className="text-blue-400" size={24} />
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                Archivo <span className="text-blue-500">Cronológico</span>
                            </h2>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Alcaldes de La Serena · 1944 - 2028</p>
                        
                        {/* Period Filter */}
                        <div className="flex gap-2 mt-6">
                            {[
                                { id: 'all', label: 'Todo', color: '#fff' },
                                { id: 'pre', label: 'Pre-73', color: '#dc2626' },
                                { id: 'during', label: 'Dictadura', color: '#64748b' },
                                { id: 'post', label: 'Democracia', color: '#1e40af' }
                            ].map(filter => (
                                <button 
                                    key={filter.id}
                                    onClick={() => setFilterEra(filter.id)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                                        filterEra === filter.id 
                                        ? 'bg-blue-500 border-blue-500 text-black' 
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={onClose} 
                            className="bg-red-500 hover:bg-red-600 text-black p-3 rounded-full transition-all shadow-xl shadow-red-500/20"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Legend Panel (Glassmorphism) */}
                <AnimatePresence>
                    {selectedMayor && (
                        <motion.div 
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="absolute right-8 top-1/2 -translate-y-1/2 w-[400px] pointer-events-auto"
                        >
                            <div className="bg-slate-900/90 backdrop-blur-3xl border-l-4 border border-slate-700/50 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                                 style={{ borderLeftColor: selectedMayor.color }}
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Landmark size={200} color={selectedMayor.color} />
                                </div>

                                <h3 className="text-4xl font-black text-white leading-none uppercase tracking-tighter mb-2 italic">
                                    {selectedMayor.nombre}
                                </h3>
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full text-slate-400">
                                        {selectedMayor.partido}
                                    </span>
                                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest">
                                        {selectedMayor.periodo}
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                                        <Award className="text-blue-500 shrink-0" size={20} />
                                        <div>
                                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Hito de Gestión</div>
                                            <p className="text-xs font-medium text-white/80 leading-relaxed uppercase">{selectedMayor.hito}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                                        <Shield className="text-blue-500 shrink-0" size={20} />
                                        <div>
                                            <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Legado Institucional</div>
                                            <p className="text-xs font-medium text-white/80 leading-relaxed uppercase">{selectedMayor.legado}</p>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setSelectedMayor(null)}
                                    className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5"
                                >
                                    Cerrar Expediente
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Tip */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] animate-pulse">
                        ⟵ Navega con el Mouse y selecciona los cristales ⟶
                    </div>
                </div>
            </div>

            <Canvas camera={{ fov: 75, position: [0, 2, 25] }}>
                <OrbitControls 
                    enableDamping 
                    dampingFactor={0.05}
                    maxDistance={300}
                    minDistance={5}
                    target={[0, 0, -50]}
                />
                <Stars radius={200} count={8000} factor={8} fade speed={1.5} />
                <ambientLight intensity={0.5} />
                <pointLight position={[20, 20, 20]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={2} />

                <TimeTunnel />
                
                {filteredData.map(mayor => (
                    <MayorCrystal 
                        key={mayor.id} 
                        mayor={mayor} 
                        active={selectedMayor?.id === mayor.id}
                        onClick={() => setSelectedMayor(mayor)}
                    />
                ))}

                <GuidesModel />
            </Canvas>
        </div>
    );
};

export default AlcaldesHistory3D;
