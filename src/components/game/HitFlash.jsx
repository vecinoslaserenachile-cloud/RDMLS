import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function HitFlash({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="hit"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none z-40"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,30,30,0.55) 0%, rgba(255,0,0,0.15) 100%)' }}
        />
      )}
    </AnimatePresence>
  );
}
