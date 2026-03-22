import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';

export default function GameOver({ show, onRestart }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="gameover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,5,20,0.97) 0%, rgba(5,3,15,0.99) 100%)' }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 18 }}
            className="flex flex-col items-center gap-6 text-center px-4 md:px-8"
          >
            {/* Broken hearts */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex gap-2"
            >
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-8 h-8 text-gray-800 fill-gray-800"
                />
              ))}
            </motion.div>

            <div className="flex flex-col gap-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black tracking-tighter font-inter"
                style={{
                  background: 'linear-gradient(135deg, #ff2244, #ff6600)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                GAME OVER
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.45 }}
                className="text-sm font-mono text-gray-400 uppercase tracking-widest"
              >
                Serenito ha caído
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg font-inter transition-all"
              style={{
                background: 'linear-gradient(135deg, hsl(195,100%,45%), hsl(220,80%,50%))',
                color: '#fff',
                boxShadow: '0 0 30px rgba(0,200,255,0.35)',
              }}
            >
              <RotateCcw className="w-5 h-5" />
              Reiniciar Nivel
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
