import React from 'react';
import { Mic, MicOff, Zap, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GameControls({
  isListening,
  lastCommand,
  onToggleVoice,
  onAddEnergy,
  onShare,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end gap-4 pointer-events-none">
      {/* Left: Voice control */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleVoice}
          className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base transition-all font-inter ${
            isListening
              ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
              : 'bg-black/80 backdrop-blur-xl border border-gray-700 text-white hover:bg-gray-800'
          }`}
        >
          {isListening ? (
            <Mic className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <MicOff className="w-5 h-5 md:w-6 md:h-6" />
          )}
          <span className="hidden md:inline">
            {isListening ? 'Oreja Smart Activa' : 'Activar Oreja Smart'}
          </span>
          <span className="md:hidden">
            {isListening ? 'Activa' : 'Oreja'}
          </span>
        </motion.button>

        {lastCommand && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700 font-mono text-xs md:text-sm text-green-400"
          >
            &gt; Comando: &quot;{lastCommand}&quot;
          </motion.div>
        )}
      </div>

      {/* Right: Action buttons */}
      <div className="flex gap-2 md:gap-3 pointer-events-auto">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddEnergy}
          className="flex items-center gap-2 bg-yellow-500 text-black px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base transition-all shadow-lg hover:opacity-90 font-inter"
        >
          <Zap className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline">Recarga Rápida</span>
          <span className="md:hidden">Recarga</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onShare}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base transition-all shadow-lg hover:opacity-90 font-inter"
        >
          <Share2 className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline">Muro Farito</span>
          <span className="md:hidden">Compartir</span>
        </motion.button>
      </div>
    </div>
  );
}
