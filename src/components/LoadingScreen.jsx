import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isSyncing = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ position: 'relative', width: '120px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Faro en Líneas - Identidad Smart */}
            <div style={{ padding: '20px', width: '100%', height: '100%', boxSizing: 'border-box', opacity: 0.8 }}>
                <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <motion.path
                        d="M 46 25 L 54 25 L 56 100 L 44 100 Z"
                        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.path
                        d="M 43 25 L 57 25 M 44 20 L 56 20 L 56 25 L 44 25 Z"
                        stroke="#fbbf24" strokeWidth="2"
                    />
                    <motion.circle cx="50" cy="18" r="8" fill="rgba(251,191,36,0.2)" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
                </svg>
            </div>
        </div>
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.2rem', fontWeight: '900', letterSpacing: '4px' }}>
                {isSyncing ? 'ECOSISTEMA PROPAGADO GLOBALMENTE' : 'INICIANDO VLS OS'}
            </h2>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginTop: '8px' }}>
                {[...Array(3)].map((_, i) => (
                    <motion.div key={i} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} style={{ width: '6px', height: '6px', background: '#fbbf24', borderRadius: '50%' }} />
                ))}
            </div>
        </div>
    </div>
);

export default LoadingScreen;
