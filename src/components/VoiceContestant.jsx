import React from 'react';
import { Mic } from 'lucide-react';

export const VoiceContestant = () => {
  return (
    <div className="bg-blue-900/30 p-4 rounded-xl border border-blue-500/20 flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
        <Mic size={16} />
      </div>
      <span className="text-sm font-bold text-red-100">MODO VOZ ACTIVO (Escuchando...)</span>
    </div>
  );
};
