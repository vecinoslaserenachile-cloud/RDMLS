import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Gamepad2, Move } from 'lucide-react';

const SIDES = [
    { name: 'Frente', img: '/puzzle-faro.png', color: '#ef4444' },
    { name: 'Derecha', img: '/puzzle-centro.png', color: '#3b82f6' },
    { name: 'Atrás', img: '/puzzle-playa.png', color: '#0ea5e9' },
    { name: 'Izquierda', img: '/puzzle-estadio.png', color: '#10b981' },
    { name: 'Arriba', img: '/puzzle-japones.png', color: '#f43f5e' },
    { name: 'Abajo', img: '/puzzle-elqui.png', color: '#8b5cf6' },
];

export default function RetroRubik() {
    const [rotation, setRotation] = useState({ x: -30, y: 45 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastPos.x;
        const deltaY = e.clientY - lastPos.y;
        setRotation(prev => ({
            x: prev.x - deltaY * 0.5,
            y: prev.y + deltaX * 0.5
        }));
        setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, lastPos]);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #111 0%, #000 100%)', color: 'white', userSelect: 'none', perspective: '1000px', overflow: 'hidden' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#ec4899', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '4px', textShadow: '0 0 20px #ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Gamepad2 size={28} /> CUBO VLS 3D
                </h2>
                <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>Arrastra el cubo para explorar los rincones de La Serena</p>
            </div>

            <div 
                onMouseDown={handleMouseDown}
                style={{
                    position: 'relative',
                    width: '300px',
                    height: '300px',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-out',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            >
                {/* Sides */}
                {/* Front */}
                <div style={{ ...faceStyle, transform: 'translateZ(150px)', background: `url(${SIDES[0].img}) center/cover`, border: `2px solid ${SIDES[0].color}` }}></div>
                {/* Back */}
                <div style={{ ...faceStyle, transform: 'rotateY(180deg) translateZ(150px)', background: `url(${SIDES[2].img}) center/cover`, border: `2px solid ${SIDES[2].color}` }}></div>
                {/* Right */}
                <div style={{ ...faceStyle, transform: 'rotateY(90deg) translateZ(150px)', background: `url(${SIDES[1].img}) center/cover`, border: `2px solid ${SIDES[1].color}` }}></div>
                {/* Left */}
                <div style={{ ...faceStyle, transform: 'rotateY(-90deg) translateZ(150px)', background: `url(${SIDES[3].img}) center/cover`, border: `2px solid ${SIDES[3].color}` }}></div>
                {/* Top */}
                <div style={{ ...faceStyle, transform: 'rotateX(90deg) translateZ(150px)', background: `url(${SIDES[4].img}) center/cover`, border: `2px solid ${SIDES[4].color}` }}></div>
                {/* Bottom */}
                <div style={{ ...faceStyle, transform: 'rotateX(-90deg) translateZ(150px)', background: `url(${SIDES[5].img}) center/cover`, border: `2px solid ${SIDES[5].color}` }}></div>

                {/* Grid overlays to simulate Rubik tiles */}
                <div style={{ ...faceStyle, transform: 'translateZ(151px)', pointerEvents: 'none', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', background: 'transparent' }}>
                    {[...Array(9)].map((_, i) => <div key={i} style={{ border: '1px solid rgba(255,255,255,0.2)' }}></div>)}
                </div>
            </div>

            <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem' }}>
                <button onClick={() => setRotation({ x: -30, y: 45 })} style={controlStyle}>
                    <RotateCcw size={20} /> REINICIAR VISTA
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.8rem' }}>
                    <Move size={16} /> ARRASTRA PARA GIRAR
                </div>
            </div>
        </div>
    );
}

const faceStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'white',
    backfaceVisibility: 'hidden',
    boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
};

const controlStyle = {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid #333',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'all 0.3s'
};
