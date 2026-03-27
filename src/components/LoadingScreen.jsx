import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isSyncing = false }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
            <motion.div 
                animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '4px solid rgba(251,191,36,0.1)', borderTopColor: '#fbbf24' }} 
            />
            <motion.div 
                animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '4px solid rgba(56,189,248,0.1)', borderTopColor: '#38bdf8' }} 
            />
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
