import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, ChevronRight, Zap, Target, Star } from 'lucide-react';

const MOCK_SCORES = [
    { team1: "CD La Serena", score1: 2, team2: "Coquimbo U.", score2: 1, status: "FINAL", league: "Primera B", sport: "Fútbol" },
    { team1: "VLS Basket", score1: 88, team2: "Antofagasta B.", score2: 82, status: "Q4 02:24", league: "Libcentro", sport: "Básquetbol" },
    { team1: "Academia VLS", score1: 3, team2: "Liceo LS", score2: 0, status: "SET 3", league: "Vóley Regional", sport: "Voleibol" },
    { team1: "Tenis LS", score1: "6-4 / 6-2", team2: "P. Monito", status: "FINAL", league: "Torneo Verano", sport: "Tenis" }
];

const SportsDataStrip = ({ onOpenFull }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % MOCK_SCORES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const score = MOCK_SCORES[currentIndex];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onOpenFull}
            style={{
                width: '100%',
                background: 'linear-gradient(90deg, #0f172a, #1e293b)',
                borderTop: '1px solid rgba(56, 189, 248, 0.2)',
                borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
                padding: '0.8rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#38bdf8', flexShrink: 0 }}>
                <Trophy size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' }}>VLS SPORTS LIVE</span>
                <div style={{ width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }} />
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
                <motion.div 
                    key={currentIndex}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
                >
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{score.league}</div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{score.team1}</span>
                        <div style={{ background: '#000', padding: '4px 12px', borderRadius: '8px', fontSize: '1rem', fontWeight: '900', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                            {score.score1} - {score.score2}
                        </div>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>{score.team2}</span>
                    </div>

                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                        {score.status}
                    </div>
                </motion.div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#475569', fontSize: '0.7rem', fontWeight: 'bold' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Activity size={14} /> 2.4k viendo
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '20px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Más Detalles <ChevronRight size={14} />
                </div>
            </div>

            {/* Micro-animations Background */}
            <div style={{ position: 'absolute', right: '10rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }}>
                <Target size={120} color="#38bdf8" />
            </div>
        </motion.div>
    );
};

export default SportsDataStrip;
