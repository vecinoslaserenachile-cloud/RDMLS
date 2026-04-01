import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

const GlobalOmniSyncOverlay = () => {
    const [active, setActive] = useState(true);
    const host = (window.location.hostname || window.location.host || '').toLowerCase();
    const isRDMLS = host.includes('rdmls') || host.includes('imls') || host.includes('rds') || (host.includes('laserena.cl') && !host.includes('vecinos'));

    useEffect(() => {
        // Reducido a 5.5s para balancear entre cache-busting y UX
        const stopTimer = setTimeout(() => setActive(false), 5500);
        return () => clearTimeout(stopTimer);
    }, []);

    if (!active || isRDMLS) return null;

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999999,
                        background: '#020617',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <LoadingScreen isSyncing={true} />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalOmniSyncOverlay;
