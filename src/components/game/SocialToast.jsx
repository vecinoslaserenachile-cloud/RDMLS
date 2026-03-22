import React from 'react';
import { Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SocialToast({ show, fichasAzules }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-blue-500/30 shadow-2xl flex flex-col items-center gap-4 z-50 text-white"
        >
          <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Share2 className="w-7 h-7 text-blue-500" />
          </div>
          <h2 className="text-lg md:text-xl font-bold font-inter text-white">
            ¡Logro Compartido!
          </h2>
          <pre className="text-[10px] md:text-xs font-mono bg-black/80 p-4 rounded-xl text-green-400 border border-gray-700">
{`{
  "player": "Vecino",
  "level": "El Faro",
  "fichasAzules": ${fichasAzules},
  "waterSaved": ${fichasAzules * 10}L
}`}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
