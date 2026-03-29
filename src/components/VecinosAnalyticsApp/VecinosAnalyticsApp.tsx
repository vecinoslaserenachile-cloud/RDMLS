import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, MessageSquare, BarChart3, X, Activity, Sparkles } from 'lucide-react';
import BubbleMap from './BubbleMap';
import VisualConceptMap from './VisualConceptMap';
import Chat from './Chat';

type ViewMode = 'analytics' | 'concepts' | 'live';

export default function VecinosAnalyticsApp({ onClose }: { onClose: () => void }) {
  const [activeView, setActiveView] = useState<ViewMode>('analytics');

  return (
    <div className="fixed inset-0 z-[100000] bg-slate-950/95 backdrop-blur-xl flex flex-col font-sans text-slate-200 overflow-hidden">
      {/* HEADER INSTITUCIONAL */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              PLAZA VECINAL <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/20">AI CORE</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Smart City Analytics · vecinoslaserena.cl</p>
          </div>
        </div>

        {/* NAVEGACIÓN DE VISTAS */}
        <nav className="flex items-center bg-slate-800/50 p-1 rounded-2xl border border-slate-700/50">
          <button 
            onClick={() => setActiveView('analytics')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeView === 'analytics' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'hover:bg-slate-700/50 text-slate-400'}`}
          >
            <BarChart3 size={16} /> TERMÓMETRO
          </button>
          <button 
            onClick={() => setActiveView('concepts')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeView === 'concepts' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'hover:bg-slate-700/50 text-slate-400'}`}
          >
            <Network size={16} /> ESQUEMA
          </button>
          <button 
            onClick={() => setActiveView('live')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-black transition-all ${activeView === 'live' ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'hover:bg-slate-700/50 text-slate-400'}`}
          >
            <MessageSquare size={16} /> PLAZA VIVO
          </button>
        </nav>

        <button 
          onClick={onClose}
          className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-red-500/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all"
        >
          <X size={20} />
        </button>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.3, ease: 'circOut' }}
            className="absolute inset-0 p-6"
          >
            {activeView === 'analytics' && <BubbleMap />}
            {activeView === 'concepts' && <VisualConceptMap />}
            {activeView === 'live' && <Chat />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER DE ESTADO */}
      <footer className="px-6 py-3 border-t border-slate-800/50 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> NODO LA SERENA ACTIVO</div>
          <div className="flex items-center gap-2 hover:text-sky-400 transition-colors cursor-help"><Sparkles size={12} /> GEMINI 1.5 FLASH (PRECISE)</div>
          <div className="flex items-center gap-2 hover:text-sky-400 transition-colors cursor-help"><Activity size={12} /> D3.js V7 ENGINE</div>
        </div>
        <div className="text-[10px] text-slate-600 font-medium tracking-tighter">Powered by Vecinos La Serena & Farito IA · (c) 2026 Innovation Hub</div>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>
    </div>
  );
}
