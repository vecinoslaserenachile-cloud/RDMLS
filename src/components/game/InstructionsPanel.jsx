import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X } from 'lucide-react';

export default function InstructionsPanel() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setVisible(true)}
        className="absolute top-20 md:top-24 left-4 md:left-6 pointer-events-auto bg-black/70 backdrop-blur-xl p-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors"
      >
        <Gamepad2 className="w-5 h-5 text-blue-500" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="absolute top-20 md:top-24 left-4 md:left-6 max-w-xs bg-black/80 backdrop-blur-xl p-5 rounded-2xl border border-gray-700 pointer-events-auto"
      >
        <div className="flex items-center justify-between mb-3 text-white">
          <h3 className="font-bold text-sm text-blue-500 font-inter flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Controles 2026
          </h3>
          <button
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <ul className="text-xs text-gray-400 space-y-2 font-inter">
          <li className="flex items-center gap-2 text-white">
            <span className="font-mono bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">WASD</span>{' '}
            Mover a Serenito
          </li>
          <li className="flex items-center gap-2 text-white">
            <span className="font-mono bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">SPACE</span>{' '}
            Saltar
          </li>
          <li className="text-white">
            <span className="text-blue-500 font-medium">Oreja Smart:</span>{' '}
            Di &quot;Salta&quot;, &quot;Corre&quot;, &quot;Agua&quot;
          </li>
          <li className="text-white">
            <span className="text-yellow-500 font-medium">Gravedad:</span>{' '}
            Camina por el planeta esférico
          </li>
          <li className="text-white">
            <span className="text-red-500 font-medium">Enemigos:</span>{' '}
            Sáltales encima para derrotarlos
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
