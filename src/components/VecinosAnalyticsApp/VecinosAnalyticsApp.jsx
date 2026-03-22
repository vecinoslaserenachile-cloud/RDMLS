import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Thermometer, 
    Network, 
    MessageSquareText, 
    ChevronLeft, 
    X,
    Filter,
    BarChart3
} from 'lucide-react';
import BubbleMap from './BubbleMap';
import VisualConceptMap from './VisualConceptMap';
import FaritoChat from './FaritoChat';

export default function VecinosAnalyticsApp({ onClose }) {
  const [activeTab, setActiveTab] = useState('termometro');
  const [filterTopic, setFilterTopic] = useState(null);

  const tabs = [
    { id: 'termometro', label: 'Termómetro Social', icon: Thermometer },
    { id: 'conceptos', label: 'Esquema de Conceptos', icon: Network },
    { id: 'farito', label: 'Asistente Farito', icon: MessageSquareText },
  ];

  return (
    <div className="fixed inset-0 z-[100200] bg-slate-950 flex flex-col p-2 md:p-6 overflow-hidden">
      
      {/* Header Premium */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto w-full px-4 border-b border-brand-neon/20 pb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="p-2 bg-brand-neon/10 rounded-xl"
          >
            <BarChart3 className="text-brand-neon" size={28} />
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">ANALÍTICA CIUDADANA VLS</h1>
            <p className="text-[10px] text-brand-neon font-bold uppercase tracking-widest">Inteligencia Farito AI • La Serena 2026</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button 
             onClick={onClose}
             className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-all hover:text-white border border-slate-700 hover:border-brand-neon/40"
           >
             <X size={24} />
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Navigation / Sidebar */}
        <div className="md:w-64 flex flex-row md:flex-col gap-2 p-1 overflow-x-auto md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 p-3 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-brand-neon text-slate-950 font-black shadow-lg shadow-brand-neon/20' 
                  : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-sm hidden md:inline">{tab.label}</span>
            </button>
          ))}

          {filterTopic && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl hidden md:block"
            >
              <div className="text-[10px] text-emerald-400 font-bold uppercase mb-2">Filtro Activo</div>
              <div className="flex justify-between items-center text-emerald-100 font-bold">
                <span>{filterTopic}</span>
                <button onClick={() => setFilterTopic(null)} className="hover:text-emerald-400"><X size={14}/></button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Dynamic Canvas Container */}
        <div className="flex-1 bg-slate-900/40 rounded-[40px] border border-slate-800 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
           <AnimatePresence mode="wait">
             <motion.div 
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="h-full w-full"
             >
               {activeTab === 'termometro' && (
                 <BubbleMap onTopicSelect={(topic) => { setFilterTopic(topic); setActiveTab('conceptos'); }} />
               )}
               {activeTab === 'conceptos' && (
                 <VisualConceptMap filteredTopic={filterTopic} />
               )}
               {activeTab === 'farito' && (
                 <FaritoChat />
               )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto w-full mt-4 text-center px-4">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Dato Ciudadano Procesado por <b>GEMINI 1.5 FLASH</b> • Nodo Central: Farito.cl
        </p>
      </div>
    </div>
  );
}
