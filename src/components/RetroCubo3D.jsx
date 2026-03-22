import React, { useState, useEffect } from 'react';
import { RefreshCw, Trophy, Gamepad2, Shuffle } from 'lucide-react';

const PUZZLES = [
    { id: 'p1', name: 'Avenida del Mar', bg: '#0ea5e9', textColor: '#ffffff', img: '/puzzle-vls-1-5.png' },
    { id: 'p2', name: 'Parque Japonés', bg: '#10b981', textColor: '#ffffff', img: '/puzzle-vls-1-5.png' },
    { id: 'p3', name: 'Punta Teatinos', bg: '#6366f1', textColor: '#ffffff', img: '/puzzle-vls-1-5.png' },
    { id: 'p4', name: 'Humedal Río Elqui', bg: '#14b8a6', textColor: '#ffffff', img: '/puzzle-vls-1-5.png' },
    { id: 'p5', name: 'Catedral VLS', bg: '#f59e0b', textColor: '#000000', img: '/puzzle-vls-1-5.png' },
    { id: 'p6', name: 'Plaza de Armas', bg: '#ef4444', textColor: '#ffffff', img: '/puzzle-vls-6-10.png' },
    { id: 'p7', name: 'Municipalidad', bg: '#3b82f6', textColor: '#ffffff', img: '/puzzle-vls-6-10.png' },
    { id: 'p8', name: 'Estadio Portada', bg: '#dc2626', textColor: '#ffffff', img: '/puzzle-vls-6-10.png' },
    { id: 'p9', name: 'Población Romeral', bg: '#8b5cf6', textColor: '#ffffff', img: '/puzzle-vls-6-10.png' },
    { id: 'p10', name: 'Las Rojas', bg: '#16a34a', textColor: '#ffffff', img: '/puzzle-vls-6-10.png' },
];

export default function RetroCubo3D() {
    const [board, setBoard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    const [isWon, setIsWon] = useState(false);
    const [moves, setMoves] = useState(0);
    const [activeTheme, setActiveTheme] = useState(PUZZLES[0]);

    // To ensure solvable shuffle:
    const shuffleBoard = () => {
        let newBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        // We do random valid moves to shuffle it so it's always solvable
        let emptyIdx = 8;
        for (let i = 0; i < 150; i++) {
            const validMoves = [];
            if (emptyIdx % 3 !== 0) validMoves.push(emptyIdx - 1); // left
            if (emptyIdx % 3 !== 2) validMoves.push(emptyIdx + 1); // right
            if (emptyIdx > 2) validMoves.push(emptyIdx - 3); // up
            if (emptyIdx < 6) validMoves.push(emptyIdx + 3); // down

            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            // swap
            newBoard[emptyIdx] = newBoard[randomMove];
            newBoard[randomMove] = 0;
            emptyIdx = randomMove;
        }
        setBoard(newBoard);
        setMoves(0);
        setIsWon(false);
    };

    useEffect(() => {
        shuffleBoard();
    }, []);

    const handleTileClick = (index) => {
        if (isWon) return;
        const emptyIndex = board.indexOf(0);
        const isMovable =
            (index === emptyIndex - 1 && emptyIndex % 3 !== 0) || // left
            (index === emptyIndex + 1 && emptyIndex % 3 !== 2) || // right
            (index === emptyIndex - 3) || // top
            (index === emptyIndex + 3);   // bottom

        if (isMovable) {
            const newBoard = [...board];
            newBoard[emptyIndex] = newBoard[index];
            newBoard[index] = 0;
            setBoard(newBoard);
            setMoves(m => m + 1);
            checkWin(newBoard);
        }
    };

    const checkWin = (currentBoard) => {
        const winState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        if (currentBoard.every((val, i) => val === winState[i])) {
            setIsWon(true);
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)', color: 'white', userSelect: 'none', position: 'relative' }}>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '-2rem' }}>
                <h2 style={{ color: activeTheme.bg, margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '2px', textShadow: `0 0 20px ${activeTheme.bg}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <Gamepad2 size={28} /> PIEZAS MÁGICAS (Estilo 80s)
                </h2>
                <p style={{ color: '#94a3b8', margin: 0, fontStyle: 'italic' }}>El clásico puzzle plástico coleccionable de tu infancia.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', maxWidth: '100%', overflowX: 'auto', padding: '1rem', scrollbarWidth: 'none' }}>
                {PUZZLES.map(p => (
                    <button
                        key={p.id}
                        onClick={() => { setActiveTheme(p); shuffleBoard(); }}
                        className="btn gaudi-curves hover-lift"
                        style={{ background: activeTheme.id === p.id ? p.bg : 'transparent', border: `2px solid ${p.bg}`, color: activeTheme.id === p.id ? p.textColor : p.bg, padding: '0.4rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', whiteSpace: 'nowrap', borderRadius: '30px', flexShrink: 0 }}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <div style={{
                width: 'min(320px, 85vw)', height: 'min(320px, 85vw)', background: '#0a0a0a', border: `4px solid ${activeTheme.bg}`,
                borderRadius: '8px', padding: '6px', boxShadow: `0 0 40px ${activeTheme.bg}40, inset 0 0 20px black`,
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', position: 'relative'
            }}>
                {isWon && (
                    <div className="animate-fade-in" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', backdropFilter: 'blur(5px)' }}>
                        <Trophy size={60} color="#facc15" className="pulse-fast" style={{ marginBottom: '1rem', filter: 'drop-shadow(0 0 20px #facc15)' }} />
                        <h2 style={{ color: '#fcd34d', fontSize: '2rem', margin: '0 0 0.5rem 0', textShadow: '0 2px 10px black' }}>¡ARMADO COMPLETO!</h2>
                        <p style={{ color: 'white', fontSize: '1.2rem', margin: '0 0 1.5rem 0' }}>En {moves} movimientos</p>
                        <button onClick={shuffleBoard} className="btn-primary pulse" style={{ background: activeTheme.bg, color: activeTheme.textColor, border: 'none', padding: '0.8rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '30px' }}>
                            Jugar de Nuevo
                        </button>
                    </div>
                )}

                {board.map((tile, i) => {
                    if (tile === 0) {
                        return <div key={`empty-${i}`} style={{ background: 'transparent' }}></div>;
                    }

                    // For background-position: values from 0% to 100%
                    // The 3x3 background means left/center/right is 0% / 50% / 100%
                    const xPositions = ['0%', '50%', '100%'];
                    const originalX = xPositions[(tile - 1) % 3];
                    const originalY = xPositions[Math.floor((tile - 1) / 3)];

                    return (
                        <div
                            key={tile}
                            onClick={() => handleTileClick(i)}
                            style={{
                                background: `url(${activeTheme.img})`,
                                backgroundSize: '300% 300%',
                                backgroundPosition: `${originalX} ${originalY}`,
                                borderRadius: '4px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.9)',
                                textShadow: '2px 2px 5px black', cursor: 'pointer',
                                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6), inset 2px 2px 4px rgba(255,255,255,0.3)',
                                position: 'relative', overflow: 'hidden',
                                transition: 'all 0.1s ease-out',
                                border: '1px solid rgba(0,0,0,0.8)'
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, background: `${activeTheme.bg}50`, mixBlendMode: 'color' }}></div>
                            <span style={{ position: 'relative', zIndex: 2, background: 'rgba(0,0,0,0.6)', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', fontSize: '1.2rem' }}>{tile}</span>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Movimientos</span>
                    <span style={{ color: activeTheme.bg, fontSize: '2.5rem', fontWeight: 'bold', textShadow: `0 2px 10px ${activeTheme.bg}40`, lineHeight: '1' }}>{moves}</span>
                </div>
                <button
                    onClick={shuffleBoard}
                    className="btn-glass hover-lift"
                    style={{ border: `1px solid ${activeTheme.bg}50`, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 'bold', color: 'white', background: 'rgba(255,255,255,0.1)' }}
                >
                    <Shuffle size={18} /> MEZCLAR PIEZAS
                </button>
            </div>
        </div>
    );
}
