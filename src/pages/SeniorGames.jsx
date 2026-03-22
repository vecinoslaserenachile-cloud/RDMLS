import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Images, Fingerprint, RefreshCcw, Trophy } from 'lucide-react';

export default function SeniorGames() {
    const navigate = useNavigate();
    const [activeGame, setActiveGame] = useState(null); // 'puzzle', 'memory', 'simon'

    // Simon Says State
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [simonLevel, setSimonLevel] = useState(0);
    const [isShowingSequence, setIsShowingSequence] = useState(false);

    // Memory State
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);

    const simonColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b']; // Red, Blue, Green, Yellow

    const startSimonGame = () => {
        setSequence([Math.floor(Math.random() * 4)]);
        setPlayerSequence([]);
        setSimonLevel(1);
        playSequence([Math.floor(Math.random() * 4)]);
    };

    const playSequence = (seq) => {
        setIsShowingSequence(true);
        let i = 0;
        const interval = setInterval(() => {
            const el = document.getElementById(`simon-btn-${seq[i]}`);
            if (el) {
                el.style.filter = 'brightness(2) drop-shadow(0 0 20px white)';
                setTimeout(() => {
                    if (el) el.style.filter = 'none';
                }, 400);
            }
            i++;
            if (i >= seq.length) {
                clearInterval(interval);
                setIsShowingSequence(false);
            }
        }, 800);
    };

    const handleSimonClick = (index) => {
        if (isShowingSequence) return;
        const newPlayerSeq = [...playerSequence, index];
        setPlayerSequence(newPlayerSeq);

        const el = document.getElementById(`simon-btn-${index}`);
        if (el) {
            el.style.filter = 'brightness(2)';
            setTimeout(() => { if (el) el.style.filter = 'none'; }, 200);
        }

        if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
            alert(`¡Juego terminado! Llegaste al nivel ${simonLevel}`);
            setSequence([]);
            return;
        }

        if (newPlayerSeq.length === sequence.length) {
            const nextSeq = [...sequence, Math.floor(Math.random() * 4)];
            setTimeout(() => {
                setSequence(nextSeq);
                setPlayerSequence([]);
                setSimonLevel(simonLevel + 1);
                playSequence(nextSeq);
            }, 1000);
        }
    };

    const startMemoryGame = () => {
        const heritageItems = ['🏺', '🏛️', '🎭', '🌊', '🌅', '🌵', '🔭', '⛪'];
        const deck = [...heritageItems, ...heritageItems]
            .sort(() => Math.random() - 0.5)
            .map((item, id) => ({ id, char: item }));
        setCards(deck);
        setFlipped([]);
        setSolved([]);
    };

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].char === cards[second].char) {
                setSolved([...solved, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="page-container" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '120px', position: 'relative', zIndex: 1 }}>
            <div className="container">
                <button onClick={() => activeGame ? setActiveGame(null) : navigate('/')} className="btn-glass animate-fade-in" style={{ padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '2rem', display: 'inline-flex' }}>
                    <ArrowLeft size={18} /> {activeGame ? 'Volver a Minijuegos' : 'Volver al Inicio'}
                </button>

                {!activeGame && (
                    <div className="animate-slide-up">
                        <div className="neocolonial-frame" style={{ textAlign: 'center', marginBottom: '3rem', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.2, pointerEvents: 'none' }}>
                                <img src="/characters/joaco.png" alt="Joaco" style={{ height: '250px' }} />
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <img src="/characters/joaco.png" alt="Joaco Mentor" className="pulse" style={{ height: '120px', filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.4))' }} />
                                <div style={{ textAlign: 'left' }}>
                                    <h1 className="serena-title-glow" style={{ fontSize: '2.5rem', margin: 0 }}>La Serena Senior</h1>
                                    <p style={{ color: '#00e5ff', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.2rem 0' }}>Hola, soy Joaco. ¡Mantengamos la mente joven!</p>
                                </div>
                            </div>
                            <p className="text-muted">Minijuegos desarrollados con base científica orientados a mantener la agilidad mental y memoria activa.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <button className="glass-panel gaudi-curves" onClick={() => { setActiveGame('memory'); startMemoryGame(); }} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #00e5ff', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <Brain size={64} color="#00e5ff" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Memorice Patrimonial</h3>
                                <p className="text-secondary" style={{ textAlign: 'center' }}>Cartas mágicas con iconos, lugares e historia de La Serena.</p>
                            </button>

                            <button className="glass-panel gaudi-curves" onClick={() => { setActiveGame('simon'); startSimonGame(); }} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #ec4899', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <Fingerprint size={64} color="#ec4899" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Secuencias: Simón Dice</h3>
                                <p className="text-secondary" style={{ textAlign: 'center' }}>Sigue el orden de luces y colores para entrenar tus reflejos.</p>
                            </button>

                            <button className="glass-panel gaudi-curves" onClick={() => setActiveGame('puzzle')} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #f59e0b', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <Images size={64} color="#f59e0b" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Mapas de Calor</h3>
                                <p className="text-secondary" style={{ textAlign: 'center' }}>Rompecabezas espacial enfocado en agudeza visual.</p>
                            </button>

                            <button className="glass-panel gaudi-curves" onClick={() => setActiveGame('checkers')} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #10b981', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔴⚫</div>
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Damas Clásicas</h3>
                                <p className="text-secondary" style={{ textAlign: 'center' }}>Estrategia y razonamiento lógico tradicional.</p>
                            </button>

                            <button className="glass-panel gaudi-curves" onClick={() => setActiveGame('chess')} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #8b5cf6', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>♟️</div>
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Ajedrez Serenense</h3>
                                <p className="text-secondary" style={{ textAlign: 'center' }}>Desarrolla tácticas y mejora el pensamiento crítico.</p>
                            </button>

                            <button className="glass-panel gaudi-curves" onClick={() => setActiveGame('sudoku')} style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', border: '1px solid #38bdf8', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔢</div>
                                <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Sudoku Matemático</h3>
                                <p className="text-secondary" style={{ textAlign: 'center' }}>Agilidad numérica para mantener la mente joven.</p>
                            </button>
                        </div>
                    </div>
                )}

                {activeGame === 'simon' && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#00e5ff', textTransform: 'uppercase' }}>Secuencias: Simón Dice</h2>
                        <div style={{ margin: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '300px', marginInline: 'auto' }}>
                            {simonColors.map((color, index) => (
                                <button
                                    key={index}
                                    id={`simon-btn-${index}`}
                                    onClick={() => handleSimonClick(index)}
                                    style={{
                                        width: '140px', height: '140px', borderRadius: '20px',
                                        background: color, border: '4px solid rgba(255,255,255,0.2)',
                                        cursor: 'pointer', transition: 'filter 0.1s',
                                        boxShadow: `0 0 20px ${color}80`
                                    }}
                                ></button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '1rem 2rem', border: '1px solid #ec4899' }}>
                                <span className="text-muted">Nivel Actual</span>
                                <h3 style={{ margin: 0, color: '#ec4899', fontSize: '2rem' }}>{simonLevel}</h3>
                            </div>
                            <button onClick={startSimonGame} className="btn-primary" style={{ height: 'fit-content', alignSelf: 'center', padding: '1rem 2rem', borderRadius: '50px' }}>
                                <RefreshCcw size={18} /> Reiniciar
                            </button>
                        </div>
                    </div>
                )}

                {activeGame === 'memory' && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#00e5ff', textTransform: 'uppercase' }}>Memorice Patrimonial</h2>
                        <p className="text-muted">Encuentra todos los pares de nuestra rica cultura regional.</p>

                        {solved.length === cards.length && cards.length > 0 && (
                            <div style={{ margin: '2rem 0', padding: '2rem', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '20px', border: '1px solid #10b981' }}>
                                <Trophy size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: '#10b981' }}>¡Felicidades! Completaste el memorice.</h3>
                                <button onClick={startMemoryGame} className="btn-primary" style={{ marginTop: '1rem' }}>Jugar de Nuevo</button>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                            {cards.map((card, index) => {
                                const isFlipped = flipped.includes(index) || solved.includes(index);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleCardClick(index)}
                                        className="glass-panel"
                                        style={{
                                            aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '3rem', cursor: 'pointer',
                                            background: isFlipped ? 'var(--bg-secondary)' : 'linear-gradient(135deg, #00e5ff, #3b82f6)',
                                            border: isFlipped ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.4)',
                                            transform: isFlipped ? 'rotateY(0)' : 'rotateY(180deg)',
                                            transition: 'all 0.5s',
                                            zIndex: 10,
                                            position: 'relative'
                                        }}
                                    >
                                        <span style={{ transform: isFlipped ? 'none' : 'rotateY(180deg)', opacity: isFlipped ? 1 : 0 }}>
                                            {card.char}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeGame === 'puzzle' && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#00e5ff', textTransform: 'uppercase' }}>Mapas de Calor Visuales</h2>
                        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Esta área de estimulación visual requiere análisis de colores y formas para armar la imagen.</p>

                        <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(45deg, #ef4444, #f59e0b, #10b981)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'blur(5px)', border: '2px solid #f59e0b' }}>
                            <h3 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', filter: 'none' }}>Nivel de Demostración - Próximamente</h3>
                        </div>
                    </div>
                )}

                {activeGame === 'checkers' && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#10b981', textTransform: 'uppercase' }}>Damas Clásicas</h2>
                        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Tablero de 64 casillas. Mueve tus fichas en diagonal y captura al oponente.</p>

                        <div style={{ width: '100%', aspectRatio: '16/9', background: 'repeating-conic-gradient(#1e293b 0% 25%, transparent 0% 50%) 50% / 100px 100px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'blur(3px)', border: '2px solid #10b981' }}>
                            <h3 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', filter: 'none' }}>Motor de Inteligencia Artificial - Próximamente</h3>
                        </div>
                    </div>
                )}

                {activeGame === 'chess' && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#8b5cf6', textTransform: 'uppercase' }}>Ajedrez Serenense</h2>
                        <p className="text-secondary" style={{ marginBottom: '2rem' }}>El juego de mesa estratégico por excelencia. Protege al Rey a toda costa.</p>

                        <div style={{ width: '100%', aspectRatio: '16/9', background: 'repeating-conic-gradient(#334155 0% 25%, #0f172a 0% 50%) 50% / 80px 80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'blur(3px)', border: '2px solid #8b5cf6' }}>
                            <h3 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', filter: 'none' }}>Tablero Lógico - Próximamente</h3>
                        </div>
                    </div>
                )}

                {activeGame === 'sudoku' && (
                    <div className="glass-panel animate-scale-in" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ color: '#38bdf8', textTransform: 'uppercase' }}>Sudoku Matemático</h2>
                        <p className="text-secondary" style={{ marginBottom: '2rem' }}>Rellena el tablero de 9x9 con números del 1 al 9 sin repetirlos en filas, columnas ni cuadrículas.</p>

                        <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg, #0ea5e9, #1e3a8a)', borderRadius: '20px', alignItems: 'center', justifyContent: 'center', filter: 'blur(3px)', border: '2px solid #38bdf8', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '2px' }}>
                            <h3 style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', filter: 'none', position: 'absolute' }}>Generador Estocástico - Próximamente</h3>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
