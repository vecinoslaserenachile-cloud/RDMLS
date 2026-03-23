import React from 'react';
import { User } from 'lucide-react';
import { PRIZES, QUESTION_PRIZES } from '../constants_game';

export const GameSidebar = ({
  currentQuestionIndex,
  gameState,
  isAnswered,
  selectedOption,
  currentStage,
  currentQuestion,
  currentStageId
}) => {
  const stagePrize = PRIZES[currentStageId - 1] || PRIZES[0];

  return (
    <div className="hidden lg:flex flex-col gap-4 h-full max-h-[85vh]">
      {/* Panel de Comentarios */}
      <div className="bg-blue-950/80 rounded-2xl border-2 border-blue-500/30 p-4 shadow-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center">
            <User size={20} className="text-[#FFD700]" />
          </div>
          <div className="flex-1">
            <span className="text-[9px] font-bold text-[#FFD700] uppercase">Anfitrión Virtual</span>
            <p className="text-[10px] text-blue-100 italic">"¡Bienvenidos a Vecinos La Serena!"</p>
          </div>
        </div>
      </div>

      {/* Escalafón de Premios */}
      <div className="flex-1 bg-blue-950/50 rounded-2xl border border-blue-800/50 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-widest">Escalafón</span>
          <div className="text-[10px] font-black text-[#FFD700] uppercase bg-[#FFD700]/10 px-2 py-1 rounded">
            {stagePrize.title}
          </div>
        </div>

        <div className="space-y-1">
          {[...QUESTION_PRIZES].reverse().map((prize, idx) => {
            const actualIdx = 9 - idx;
            const isCurrent = actualIdx === currentQuestionIndex;
            const isPast = actualIdx < currentQuestionIndex;
            
            return (
              <div 
                key={idx} 
                className={`flex justify-between items-center px-3 py-2 rounded-xl ${
                  isCurrent ? 'bg-[#FFD700] text-[#0f172a] font-bold' : 'text-blue-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] opacity-50">{actualIdx + 1}</span>
                  <span className="text-xs">{actualIdx === 9 ? stagePrize.title : `Pregunta ${actualIdx + 1}`}</span>
                </div>
                <span className="text-[10px] font-mono">{prize.reward}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
