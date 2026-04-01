import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

const GlobalOmniSyncOverlay = () => {
  const [active, setActive] = useState(true);
  const [fadeStarted, setFadeStarted] = useState(false);

  useEffect(() => {
    // 4.5s majestic sequence + 1.0s total fade = 5.5s institutional Brand Experience (Optimized)
    const fadeTimer = setTimeout(() => setFadeStarted(true), 4500);
    const stopTimer = setTimeout(() => setActive(false), 5500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, delay: 4.5 }}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 1000000, 
            background: '#020617', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            pointerEvents: (active && !fadeStarted) ? 'auto' : 'none' 
          }}
        >
          <LoadingScreen isSyncing={true} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalOmniSyncOverlay;
