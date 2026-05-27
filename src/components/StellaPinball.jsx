import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars, PerspectiveCamera, OrbitControls, Text, Float, MeshReflectorMaterial, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X, Zap, ShieldAlert, Award, Ghost, Scissors, UserX, Gavel } from 'lucide-react';

/**
 * 🔥 STELLA PINBALL: LA PALABRA INDÓMITA v2.0
 * Optimized physics and high-fidelity interactions.
 */

const BALL_RADIUS = 0.55;
const FLIPPER_LENGTH = 3.8;
const GRAVITY = 0.055;
const TABLE_TILT = Math.PI * 0.09;

const VERSES = [
    ["LA", "PALABRA", "NO", "SE", "CALLA"],
    ["POESÍA", "Y", "FUEGO"],
    ["MEMORIA", "INDÓMITA"]
];

function Ball3D({ ball, index }) {
    const mesh = useRef();
    useFrame((state) => {
        if (!ball || !ball.active) return;
        if (mesh.current) {
            mesh.current.position.set(ball.x, ball.y, ball.z || 0);
            mesh.current.rotation.x += ball.vy * 0.15;
            mesh.current.rotation.z -= ball.vx * 0.15;
        }
    });

    if (!ball.active) return null;

    return (
        <group>
            <mesh ref={mesh} castShadow>
                <sphereGeometry args={[BALL_RADIUS, 32, 32]} />
                <meshStandardMaterial 
                    color="#ef4444" 
                    emissive="#ef4444"
                    emissiveIntensity={2}
                    metalness={0.8} 
                    roughness={0.1} 
                />
            </mesh>
            <pointLight position={[0, 0, 0.5]} intensity={1.5} color="#ef4444" />
        </group>
    );
}

function StellaBumper({ bp, index, physicsRef }) {
    const mesh = useRef();
    const [isHit, setIsHit] = useState(false);

    useFrame(() => {
        const p = physicsRef.current.bumpers[index];
        const timer = p.hitTimer;
        const currentlyHit = timer > 0;
        if (currentlyHit !== isHit) setIsHit(currentlyHit);

        if (mesh.current) {
            if (currentlyHit) p.hitTimer -= 1;
            const scale = currentlyHit ? 1.15 : 1;
            mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.2);
            
            const targetMesh = mesh.current.children[1];
            if (targetMesh && targetMesh.material) {
                const mat = targetMesh.material;
                mat.emissiveIntensity = currentlyHit ? 20 : 3;
                mat.color.set(currentlyHit ? "#ffffff" : p.color);
            }
        }
    });

    return (
        <group position={[bp.x, bp.y, 0]} ref={mesh}>
            <mesh position={[0, 0, -0.4]}>
                <cylinderGeometry args={[2.4, 2.7, 0.9, 32]} />
                <meshStandardMaterial color="#450a0a" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[2.1, 2.3, 0.5, 32]} />
                <meshStandardMaterial 
                    color={bp.color} 
                    emissive={bp.color} 
                    emissiveIntensity={3} 
                />
            </mesh>
            <Text
                position={[0, 0, 0.4]}
                fontSize={0.45}
                color="white"
                font="https://fonts.gstatic.com/s/outfit/v11/Q_3_X5nP3V6_Z-XU-H_U.woff"
                anchorX="center"
                anchorY="middle"
            >
                {bp.text}
            </Text>
            {isHit && <Sparkles count={20} scale={3} size={2} speed={3} color={bp.color} />}
        </group>
    );
}

function PatriarchyTarget({ t, index, physicsRef }) {
    const mesh = useRef();
    
    useFrame(() => {
        const isLit = physicsRef.current.targets[index].lit;
        if (mesh.current) {
            mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, isLit ? -Math.PI / 2 : 0, 0.1);
            const mat = mesh.current.children[0].material;
            mat.emissiveIntensity = isLit ? 0 : 0.5;
            // Hide the text group if lit
            if (mesh.current.children[1]) mesh.current.children[1].visible = !isLit;
        }
    });

    return (
        <group position={[t.x, t.y, 0.5]} ref={mesh}>
            <mesh castShadow>
                <boxGeometry args={[1.5, 2.2, 0.2]} />
                <meshStandardMaterial 
                    color="#450a0a" 
                    emissive="#ef4444"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            <group position={[0, 0, 0.11]}>
                    <Text
                        position={[0, -0.6, 0]}
                        fontSize={0.25}
                        color="white"
                        maxWidth={1.2}
                        textAlign="center"
                        font="https://fonts.gstatic.com/s/outfit/v11/Q_3_X5nP3V6_Z-XU-H_U.woff"
                    >
                        {t.label}
                    </Text>
                    <Float speed={3} rotationIntensity={0.8} floatIntensity={1}>
                        <mesh position={[0, 0.4, 0]}>
                            <sphereGeometry args={[0.3, 16, 16]} />
                            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={5} />
                        </mesh>
                    </Float>
                </group>
            </group>
    );
}

const StellaFlipper = React.forwardRef(({ position, isLeft }, ref) => {
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        const len = FLIPPER_LENGTH;
        const r1 = 0.6;
        const r2 = 0.35;
        s.moveTo(0, r1);
        s.lineTo(len, r2);
        s.absarc(len, 0, r2, Math.PI/2, -Math.PI/2, true);
        s.lineTo(0, -r1);
        s.absarc(0, 0, r1, -Math.PI/2, Math.PI/2, true);
        return s;
    }, []);

    return (
        <group position={[position.x, position.y, position.z]}>
            <mesh ref={ref} castShadow>
                <extrudeGeometry args={[shape, { depth: 0.7, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.1 }]} />
                <meshStandardMaterial 
                    color={isLeft ? "#7f1d1d" : "#ef4444"} 
                    emissive={isLeft ? "#ef4444" : "#f87171"}
                    emissiveIntensity={0.3}
                />
            </mesh>
        </group>
    );
});

export default function StellaPinball({ onClose }) {
    const [gameState, setGameState] = useState({ 
        score: 0, ballsLeft: 3, highscore: localStorage.getItem('vls_stella_pinball_high') || 0,
        dmd: "STELLA INDÓMITA", combo: 1,
        collectedWords: [], currentVerse: 0
    });

    const isMobile = window.innerWidth < 768;

    const physicsRef = useRef({
        balls: [
            { x: 8.5, y: -16, vx: 0, vy: 0, active: false, id: 0 },
            { x: 8.5, y: -16, vx: 0, vy: 0, active: false, id: 1 },
            { x: 8.5, y: -16, vx: 0, vy: 0, active: false, id: 2 }
        ],
        flippers: {
            left: { angle: 0.4, target: 0.4, active: false, x: -5, y: -14 },
            right: { angle: -0.4, target: -0.4, active: false, x: 5, y: -14 }
        },
        bumpers: [
            { x: -4, y: 10, r: 2.1, color: '#ef4444', text: 'POESÍA', hitTimer: 0 },
            { x: 4, y: 10, r: 2.1, color: '#f59e0b', text: 'FUEGO', hitTimer: 0 },
            { x: 0, y: 15, r: 2.1, color: '#dc2626', text: 'LIBERTAD', hitTimer: 0 },
        ],
        targets: [
            { x: -7.5, y: 18, lit: false, id: 'M', label: 'MACHISMO' },
            { x: -7.5, y: 15, lit: false, id: 'C', label: 'CENSURA' },
            { x: -7.5, y: 12, lit: false, id: 'D', label: 'DICTADURA' },
            { x: 7.5, y: 18, lit: false, id: 'O', label: 'OLVIDO' },
            { x: 7.5, y: 15, lit: false, id: 'P', label: 'PREJUICIO' },
        ],
        collectedWords: [],
        currentVerse: 0,
        pendingWord: null,
        pendingMultiball: false,
        shake: 0
    });

    const playSound = (name, volume = 0.5) => {
        try {
            const audio = new Audio(`/stella/${name}.mp3`);
            audio.volume = volume;
            audio.play().catch(() => {});
        } catch (e) {}
    };

    const launchBall = (idx = 0) => {
        const p = physicsRef.current;
        if (!p.balls[idx].active && (idx > 0 || gameState.ballsLeft > 0)) {
            p.balls[idx] = { x: 8.5, y: -16, vx: -0.15 - (idx * 0.05), vy: 1.9, active: true, id: idx };
            if (idx === 0) {
                p.pendingDmd = "¡ROMPE LAS CADENAS!";
                playSound('Colorina', 0.6);
            }
            setGameState(prev => ({ ...prev, dmd: idx === 0 ? "¡ROMPE LAS CADENAS!" : "¡MAREA DE POESÍA!", combo: prev.combo }));
        }
    };

    const setFlipperState = (side, active) => {
        const f = physicsRef.current.flippers[side];
        if (active && !f.active) playSound('Reloj Anarquista', 0.2);
        f.active = active;
        f.target = side === 'left' ? (active ? -0.75 : 0.4) : (active ? 0.75 : -0.4);
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleKey = (e) => {
            if (!physicsRef.current) return;
            if (e.key === 'a' || e.key === 'ArrowLeft') setFlipperState('left', e.type === 'keydown');
            if (e.key === 'd' || e.key === 'ArrowRight') setFlipperState('right', e.type === 'keydown');
            if (e.key === ' ' && e.type === 'keydown') launchBall();
        };
        window.addEventListener('keydown', handleKey);
        window.addEventListener('keyup', handleKey);
        return () => { 
            window.removeEventListener('keydown', handleKey); 
            window.removeEventListener('keyup', handleKey); 
        };
    }, [gameState.ballsLeft]);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 20000000, background: '#000', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif" }}>
            
            {/* Header / HUD */}
            <div style={{ padding: '1.5rem', background: '#450a0a', borderBottom: '3px solid #ef4444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Flame color="#ef4444" fill="#ef4444" className="animate-pulse" />
                    <div>
                        <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: 950, letterSpacing: '2px' }}>STELLA PINBALL</h2>
                        <p style={{ color: '#ef4444', margin: 0, fontSize: '0.6rem', fontWeight: 'bold' }}>LA PALABRA NO SE CALLA</p>
                    </div>
                </div>
                
                <div style={{ background: '#000', padding: '0.5rem 2rem', borderRadius: '10px', border: '2px solid #ef4444', textAlign: 'center', minWidth: '250px' }}>
                    <div style={{ color: '#ef4444', fontSize: '1.5rem', fontWeight: 950, textShadow: '0 0 10px #ef4444' }}>{gameState.dmd}</div>
                </div>

                <button onClick={onClose} style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#ef4444', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                    <X size={24} />
                </button>
            </div>

            {/* Game Canvas */}
            <div style={{ flex: 1, position: 'relative' }}>
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, -32, 35]} fov={40} rotation={[Math.PI / 4, 0, 0]} />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[0, -10, 30]} angle={0.5} penumbra={1} intensity={2} castShadow color="#ef4444" />
                                 <group rotation={[-TABLE_TILT, 0, 0]}>
                        <mesh receiveShadow position={[0, 0, -0.6]}>
                            <boxGeometry args={[20, 46, 1]} />
                            <MeshReflectorMaterial
                                blur={[100, 100]} resolution={512} mixBlur={1} mixStrength={40}
                                roughness={1} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
                                color="#1a0505" metalness={0.5}
                            />
                        </mesh>
                        
                        {/* ─── VERTICAL PERSONALIZED ART ─── */}
                        <Suspense fallback={null}>
                           <TableArt />
                        </Suspense>
 
                        <PhysicsLoop physicsRef={physicsRef} setGameState={setGameState} isMobile={isMobile} playSound={playSound} launchBall={launchBall} />
                        {physicsRef.current.balls.map((b, i) => (
                            <Ball3D key={i} ball={b} index={i} />
                        ))}
                        {physicsRef.current.bumpers.map((b, i) => (
                            <StellaBumper key={i} bp={b} index={i} physicsRef={physicsRef} />
                        ))}
                        {physicsRef.current.targets.map((t, i) => (
                            <PatriarchyTarget key={i} t={t} index={i} physicsRef={physicsRef} />
                        ))}
                        <FlipperGroup physicsRef={physicsRef} />
                    </group>
                    {/* Simplified Lighting for faster load */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
                </Canvas>

                {/* Score & Controls Overlay */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', pointerEvents: 'none' }}>
                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1.5rem', borderRadius: '20px', border: '2px solid #ef4444' }}>
                        <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 900 }}>PUNTAJE</div>
                        <div style={{ color: 'white', fontSize: '2.5rem', fontWeight: 950 }}>{gameState.score.toLocaleString()}</div>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} style={{ width: 15, height: 15, borderRadius: '50%', background: i < gameState.ballsLeft ? '#ef4444' : '#333' }} />
                            ))}
                        </div>
                        {/* Word Progress HUD */}
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '5px', flexWrap: 'wrap', maxWidth: '200px' }}>
                            {VERSES[gameState.currentVerse % VERSES.length].map((word, idx) => (
                                <span key={idx} style={{ 
                                    fontSize: '0.7rem', 
                                    padding: '2px 6px', 
                                    borderRadius: '4px',
                                    background: gameState.collectedWords.includes(word) ? '#ef4444' : 'rgba(255,255,255,0.1)',
                                    color: gameState.collectedWords.includes(word) ? 'white' : '#666',
                                    fontWeight: 900,
                                    border: '1px solid rgba(239, 68, 68, 0.3)'
                                }}>
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '1.5rem', borderRadius: '20px', border: '2px solid #fbbf24', color: 'white', textAlign: 'right' }}>
                        <div style={{ color: '#fbbf24', fontSize: '0.8rem', fontWeight: 900 }}>MULTIPLICADOR</div>
                        <div style={{ fontSize: '2rem', fontWeight: 950 }}>x{gameState.combo.toFixed(1)}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '5px' }}>RÉCORD: {parseInt(gameState.highscore).toLocaleString()}</div>
                    </div>
                </div>

                {!physicsRef.current.balls.some(b => b.active) && gameState.ballsLeft > 0 && (
                    <motion.button 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        onClick={() => launchBall(0)}
                        style={{ 
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            padding: '2rem 4rem', background: '#ef4444', color: 'white', borderRadius: '50px',
                            border: 'none', fontWeight: 950, fontSize: '1.5rem', cursor: 'pointer',
                            boxShadow: '0 0 50px rgba(239, 68, 68, 0.5)', zIndex: 10
                        }}
                    >
                        LANZAR PALABRA
                    </motion.button>
                )}
            </div>

            <div style={{ padding: '1rem', background: '#1a0505', color: '#ef4444', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                USA LAS FLECHAS O [A] y [D] PARA LOS FLIPPERS • [ESPACIO] PARA LANZAR
            </div>
        </div>
    );
}

function TableArt() {
    const texture = useTexture("/stella/stella_bg.png");
    return (
        <group>
            <mesh position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
                <planeGeometry args={[18, 42]} />
                <meshBasicMaterial map={texture} transparent opacity={0.7} />
            </mesh>
            {/* Border frame for the art */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[18.5, 42.5]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

function FlipperGroup({ physicsRef }) {
    const leftRef = useRef();
    const rightRef = useRef();
    
    useFrame(() => {
        if (leftRef.current) leftRef.current.rotation.z = physicsRef.current.flippers.left.angle;
        if (rightRef.current) rightRef.current.rotation.z = physicsRef.current.flippers.right.angle;
    });

    return (
        <>
            <StellaFlipper ref={leftRef} position={{x: -5, y: -14, z: 0.5}} isLeft={true} />
            <StellaFlipper ref={rightRef} position={{x: 5, y: -14, z: 0.5}} isLeft={false} />
        </>
    );
}

function PhysicsLoop({ physicsRef, setGameState, isMobile, playSound, launchBall }) {
    const { camera } = useThree();
    
    const updatePhysics = () => {
        const p = physicsRef.current;
        p.balls.forEach(b => {
            if (!b.active) return;

            b.vy -= GRAVITY;
            b.vx *= 0.998;
            b.vy *= 0.998;
            b.x += b.vx;
            b.y += b.vy;

            // Wall collisions
            const limitW = 8.8;
            const limitH = 21;
            if (b.x < -limitW) { b.x = -limitW; b.vx *= -0.7; }
            if (b.x > limitW) { b.x = limitW; b.vx *= -0.7; }
            if (b.y > limitH) { b.y = limitH; b.vy *= -0.7; }

            // Drain
            if (b.y < -20) {
                b.active = false;
                // Only reduce ballsLeft if it was the last active ball
                if (!p.balls.some(other => other.active)) {
                    setGameState(prev => {
                        const nextBalls = prev.ballsLeft - 1;
                        if (nextBalls === 0 && prev.score > prev.highscore) {
                            localStorage.setItem('vls_stella_pinball_high', prev.score);
                        }
                        return { ...prev, ballsLeft: nextBalls, dmd: nextBalls > 0 ? "OTRA OPORTUNIDAD" : "MEMORIA ETERNA" };
                    });
                }
            }

            // Bumper collisions
            p.bumpers.forEach(bp => {
                const dx = b.x - bp.x;
                const dy = b.y - bp.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < BALL_RADIUS + 2.1) {
                    const angle = Math.atan2(dy, dx);
                    const power = 1.4;
                    b.vx = Math.cos(angle) * power;
                    b.vy = Math.sin(angle) * power;
                    bp.hitTimer = 15;
                    p.shake = 0.45;
                    p.pendingScore += 1000;
                    p.pendingDmd = bp.text;
                    p.pendingComboBoost = 0.2;
                    playSound('Poeta de Fuego (1)', 0.3);

                    // Word collection logic
                    const verse = VERSES[p.currentVerse % VERSES.length];
                    const uncollected = verse.filter(w => !p.collectedWords.includes(w));
                    if (uncollected.length > 0) {
                        const newWord = uncollected[0];
                        p.collectedWords.push(newWord);
                        p.pendingWord = newWord;
                    } else {
                        // Verse complete!
                        p.currentVerse += 1;
                        p.collectedWords = [];
                        p.pendingDmd = "¡VERSO COMPLETADO!";
                        p.pendingScore += 50000;
                        p.pendingMultiball = true;
                        playSound('Dragona', 0.7);
                    }
                }
            });

            // Target collisions
            p.targets.forEach(t => {
                if (!t.lit && Math.abs(b.x - t.x) < 1.4 && Math.abs(b.y - t.y) < 1.4) {
                    t.lit = true;
                    b.vx *= -1.3;
                    p.shake = 0.6;
                    p.pendingScore += 10000;
                    p.pendingDmd = `¡ADIÓS ${t.label}!`;
                    p.pendingComboBoost = 2.0;
                    playSound('No se vende', 0.4);
                    window.dispatchEvent(new CustomEvent('vls-manual-announce', { 
                        detail: { text: `Stella ha destruido el ${t.label}.`, priority: 'high' } 
                    }));
                }
            });

            // Flipper collisions
            const checkFlip = (side) => {
                const f = p.flippers[side];
                const isLeft = side === 'left';
                const fx = f.x; const fy = f.y;
                const rad = f.angle;
                
                const ex = isLeft ? fx + Math.cos(rad) * FLIPPER_LENGTH : fx - Math.cos(rad) * FLIPPER_LENGTH;
                const ey = fy + Math.sin(rad) * FLIPPER_LENGTH;
                
                const dx = ex - fx; const dy = ey - fy;
                const lenSq = dx*dx + dy*dy;
                const t = Math.max(0, Math.min(1, ((b.x - fx) * dx + (b.y - fy) * dy) / lenSq));
                const cx = fx + t * dx; const cy = fy + t * dy;
                
                const dist = Math.sqrt((b.x - cx)**2 + (b.y - cy)**2);
                if (dist < BALL_RADIUS + 0.5) {
                    const normX = (b.x - cx) / dist;
                    const normY = (b.y - cy) / dist;
                    const dot = b.vx * normX + b.vy * normY;
                    
                    if (dot < 0) {
                        const kick = f.active ? 2.5 : 1.1;
                        b.vx = (b.vx - 2 * dot * normX) * kick;
                        b.vy = (b.vy - 2 * dot * normY) * kick;
                        if (f.active) {
                            b.vy += 0.7;
                            p.shake = 0.5;
                            p.pendingDmd = "¡FUERZA INDÓMITA!";
                        }
                    }
                }
            };
            checkFlip('left');
            checkFlip('right');
        });
    };

    useFrame(() => {
        const p = physicsRef.current;
        
        // Initialize frame state if needed
        if (p.pendingScore === undefined) {
            p.pendingScore = 0;
            p.pendingComboBoost = 0;
            p.pendingDmd = null;
        }

        // Sub-stepping for stability
        const steps = isMobile ? 6 : 10;
        for (let i = 0; i < steps; i++) updatePhysics();

        // Multiball trigger check
        if (p.pendingMultiball) {
            launchBall(1);
            launchBall(2);
            p.pendingMultiball = false;
        }

        // Apply batched state updates once per frame
        if (p.pendingScore > 0 || p.pendingComboBoost > 0 || p.pendingDmd || p.pendingWord) {
            setGameState(prev => ({
                ...prev,
                score: prev.score + (p.pendingScore * prev.combo),
                combo: Math.min(prev.combo + p.pendingComboBoost, 10),
                dmd: p.pendingDmd || (p.pendingWord ? `PALABRA: ${p.pendingWord}` : prev.dmd),
                collectedWords: [...p.collectedWords],
                currentVerse: p.currentVerse
            }));
            p.pendingScore = 0;
            p.pendingComboBoost = 0;
            p.pendingDmd = null;
            p.pendingWord = null;
        }

        // Update flipper visual angles
        p.flippers.left.angle = THREE.MathUtils.lerp(p.flippers.left.angle, p.flippers.left.target, 0.6);
        p.flippers.right.angle = THREE.MathUtils.lerp(p.flippers.right.angle, p.flippers.right.target, 0.6);

        // Shake effect
        if (p.shake > 0) {
            camera.position.x += (Math.random() - 0.5) * p.shake;
            camera.position.y += (Math.random() - 0.5) * p.shake;
            p.shake *= 0.85;
        }
    });

    return null;
}
