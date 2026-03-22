import React from 'react';
import { Droplets, Coins, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_HP = 5;

export default function GameHUD({ fichas, fichasAzules, hp }) {
  return (
    <div className="flex justify-between items-start pointer-events-none">
      {/* Left: Title + Hearts */}
      <div className="flex flex-col gap-2">
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-2xl font-black tracking-tighter font-inter"
          style={{
            background: 'linear-gradient(135deg, hsl(195, 100%, 50%), hsl(220, 80%, 55%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          VECINITY ENGINE 2026
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3 }}
          className="text-[10px] md:text-xs font-mono text-blue-400 uppercase tracking-[0.2em]"
        >
          Super Serenito Bros: Antigravity
        </motion.p>

        {/* Hearts / HP */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-1 md:gap-1.5 mt-1"
        >
          {[...Array(MAX_HP)].map((_, i) => (
            <AnimatePresence key={i}>
              <motion.div
                animate={i === hp ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                    i < hp
                      ? 'text-red-500 fill-red-500 drop-shadow-[0_0_4px_rgba(255,50,50,0.8)]'
                      : 'text-gray-600 fill-gray-600 opacity-40'
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      </div>

      {/* Right: Stats */}
      <div className="flex gap-2 md:gap-3 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 bg-black/80 backdrop-blur-xl px-3 md:px-4 py-2 rounded-full border border-gray-700"
        >
          <Droplets className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          <span className="font-mono font-bold text-blue-500 text-sm md:text-base">{fichasAzules}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 bg-black/80 backdrop-blur-xl px-3 md:px-4 py-2 rounded-full border border-gray-700"
        >
          <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
          <span className="font-mono font-bold text-yellow-500 text-sm md:text-base">{fichas}</span>
        </motion.div>
      </div>
    </div>
  );
}
