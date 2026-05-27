import React, { useState, useEffect } from 'react';
import { Pickaxe, Flame, FlaskConical, TrendingUp, AlertTriangle, Settings, Zap, History, Info, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DomeykoLambertSimulator() {
  const [mineralType, setMineralType] = useState('sulfuros');
  const [techLevel, setTechLevel] = useState('barro');
  const [scientificAnalysis, setScientificAnalysis] = useState(false);
  const [isSmelting, setIsSmelting] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(true);

  // Lógica de simulación optimizada
  const calculateResults = () => {
    let rawCopper = mineralType === 'oxidos' ? 18 : 25; 
    let efficiency = 0;
    let cost = 1200; 
    let message = "";
    let portrait = "/domeyko/Domeyko.png";
    let author = "Ignacio Domeyko";
    let warning = null;

    if (mineralType === 'oxidos') {
      if (techLevel === 'barro') {
        efficiency = 0.45;
        message = "El mineral se funde, pero la pérdida de calor y metal es inmensa. Estamos deforestando el valle para alimentar estos hornos.";
      } else {
        efficiency = 0.92;
        message = "Incluso con óxidos, el horno de Lambert es superior. El uso de carbón mineral salva nuestros bosques nativos.";
        author = "Charles Lambert";
        portrait = "/domeyko/Charles Lambert (2).png";
      }
    } else { // Sulfuros (Piedra muerta para los chilenos de la época)
      if (techLevel === 'barro') {
        efficiency = 0.02;
        message = "¡Fracaso absoluto! Los sulfuros no reaccionan. El minero local desecha esta 'tierra debrada' al relave, creyendo que la mina murió..";
        warning = "CRÍTICO: Mineral desechado como escoria inútil.";
      } else {
        efficiency = 0.88;
        message = "¡REVOLUCIÓN! Lambert ha convertido la 'basura' en fortuna. El horno de reverbero permite extraer cobre puro de los sulfuros profundos.";
        author = "Charles Lambert";
        portrait = "/domeyko/Charles Lambert (2).png";
      }
    }

    if (scientificAnalysis) {
      cost *= 0.55;
      message += " Con mi laboratorio químico, identificamos la ley del mineral antes de gastar combustible, maximizando cada gramo de esfuerzo.";
      author = "Ignacio Domeyko";
      portrait = "/domeyko_portrait.png";
    }

    const copperExtracted = rawCopper * efficiency;
    const revenue = copperExtracted * 250;
    const profit = revenue - cost;

    return { efficiency: efficiency * 100, copperExtracted, profit, message, warning, portrait, author };
  };

  const results = calculateResults();

  const runSimulation = () => {
    setIsSmelting(true);
    setTimeout(() => setIsSmelting(false), 2000);
  };

  return (
    <div className="vls-industrial-container" style={{ 
      background: '#020617', 
      color: '#cbd5e1', 
      padding: '2rem', 
      fontFamily: '"Outfit", sans-serif',
      borderRadius: '40px',
      border: '1px solid rgba(56, 189, 248, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(30, 58, 138, 0.2) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      {/* Header Industrial */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-[rgba(255,255,255,0.05)] pb-8">
        <div className="flex items-center gap-4">
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)', padding: '1rem', borderRadius: '20px', border: '1px solid #38bdf840', boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)' }}>
            <Settings className={`w-8 h-8 text-cyan-400 ${isSmelting ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 950, color: 'white', letterSpacing: '-1px', margin: 0 }}>LABORATORIO METALÚRGICO</h1>
            <p className="text-cyan-500 font-black text-xs tracking-[0.2em] uppercase">Simulante Hiper-Realista: Domeyko & Lambert (v2.0)</p>
          </div>
        </div>
        
        <div className="flex border border-white/10 rounded-full p-1 bg-black/40 backdrop-blur-md">
          <button 
            onClick={() => setShowBlueprint(true)}
            className={`px-6 py-2 rounded-full text-xs font-black transition-all ${showBlueprint ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-slate-400 hover:text-white'}`}
          >ESQUEMÁTICO</button>
          <button 
            onClick={() => setShowBlueprint(false)}
            className={`px-6 py-2 rounded-full text-xs font-black transition-all ${!showBlueprint ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'text-slate-400 hover:text-white'}`}
          >VISTA INTERNA</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Panel Izquierdo: Controles de Maquinaria */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-[30px] border border-white/5 bg-white/5 backdrop-blur-xl">
             <h3 className="text-white font-black text-sm mb-6 flex items-center gap-2">
               <Zap className="w-4 h-4 text-cyan-400" />
               CONFIGURACIÓN DE EXPEDICIÓN
             </h3>

             {/* Selector de Mineral */}
             <div className="mb-8">
               <label className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-tighter">1. Extracción de Mena</label>
               <div className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => setMineralType('oxidos')}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${mineralType === 'oxidos' ? 'border-amber-500/50 bg-amber-500/10 text-amber-500' : 'border-white/5 bg-black/20 text-slate-500 hover:border-white/20'}`}
                 >
                   <Pickaxe size={24} />
                   <span className="text-[10px] font-black uppercase">Óxidos</span>
                 </button>
                 <button 
                  onClick={() => setMineralType('sulfuros')}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${mineralType === 'sulfuros' ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-500' : 'border-white/5 bg-black/20 text-slate-500 hover:border-white/20'}`}
                 >
                   <Activity size={24} />
                   <span className="text-[10px] font-black uppercase">Sulfuros</span>
                 </button>
               </div>
             </div>

             {/* Selector de Tecnología */}
             <div className="mb-8">
               <label className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-tighter">2. Planta de Beneficio</label>
               <div className="space-y-3">
                 <button 
                  onClick={() => setTechLevel('barro')}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between px-6 ${techLevel === 'barro' ? 'border-orange-500/50 bg-orange-500/10 text-orange-500' : 'border-white/5 bg-black/20 text-slate-500'}`}
                 >
                   <div className="flex items-center gap-3">
                     <Flame size={20} />
                     <span className="text-xs font-black uppercase">Horno de Barro (Tradicional)</span>
                   </div>
                   {techLevel === 'barro' && <ChevronRight size={16} />}
                 </button>
                 <button 
                  onClick={() => setTechLevel('reverbero')}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between px-6 ${techLevel === 'reverbero' ? 'border-red-600/50 bg-red-600/10 text-red-500' : 'border-white/5 bg-black/20 text-slate-500'}`}
                 >
                   <div className="flex items-center gap-3">
                     <TrendingUp size={20} />
                     <span className="text-xs font-black uppercase">Horno Reverbero (Lambert)</span>
                   </div>
                   {techLevel === 'reverbero' && <ChevronRight size={16} />}
                 </button>
               </div>
             </div>

             {/* Selector de Ciencia */}
             <div>
               <label className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-tighter">3. Supervisión Técnica</label>
               <button 
                onClick={() => setScientificAnalysis(!scientificAnalysis)}
                className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 ${scientificAnalysis ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500' : 'border-white/5 bg-black/20 text-slate-500'}`}
               >
                 <FlaskConical size={20} />
                 <span className="text-xs font-black uppercase">{scientificAnalysis ? "LABORATORIO DOMEYKO ACTIVO" : "MÉTODO EMPÍRICO PIRQUINERO"}</span>
               </button>
             </div>
          </div>

          <button 
            onClick={runSimulation}
            disabled={isSmelting}
            className={`w-full py-6 rounded-[30px] font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-3 ${isSmelting ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:scale-[1.02] active:scale-95 shadow-cyan-500/20'}`}
          >
            {isSmelting ? "PROCESANDO CARGA..." : "INICIAR FUNDICIÓN"}
          </button>
        </div>

        {/* Panel Central: Visualización Industrial */}
        <div className="lg:col-span-5 relative">
          <div className="h-full rounded-[40px] overflow-hidden border border-white/10 bg-black/60 shadow-inner group">
            <AnimatePresence mode="wait">
              {showBlueprint ? (
                <motion.div 
                  key="blueprint"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="w-full h-full relative p-6"
                >
                  <img src="/industrial_furnace_schematic.png" alt="Reverberatory Furnace" className="w-full h-full object-contain opacity-40 mix-blend-screen" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-transparent to-transparent">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                       <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                       <span className="text-[10px] font-black tracking-widest uppercase">Sistema Activo: {techLevel.toUpperCase()}</span>
                    </div>
                    <p className="text-slate-400 text-xs italic leading-tight">Esquemático técnico detallado para la fundición de {mineralType} mediante proceso de calor indirecto.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="render"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full p-8 flex flex-col items-center justify-center"
                >
                  <div className={`relative w-48 h-48 mb-8 ${isSmelting ? 'animate-pulse' : ''}`}>
                    <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${techLevel === 'barro' ? 'bg-orange-600' : 'bg-red-600'}`} />
                    <img src={techLevel === 'barro' ? "/domeyko/Domeyko.png" : "/domeyko/Domeyko 2.png"} 
                      alt="Mineral State" 
                      className={`w-full h-full object-contain transition-all duration-[2s] ${isSmelting ? 'scale-110 rotate-12 blur-sm grayscale' : 'scale-100 rotate-0'}`} 
                    />
                  </div>
                  <h3 className="text-white font-black text-2xl mb-4">Muestra Geológica</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400">PUREZA: {scientificAnalysis ? 'ALTA (+85%)' : 'DESCONOCIDA'}</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400">ESTADO: {isSmelting ? 'FUSIÓN' : 'SÓLIDO'}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Panel Derecho: Reporte y Biografía */}
        <div className="lg:col-span-3 space-y-6">
          {/* Reportero (Avatar dinámico) */}
          <div className="glass-panel p-6 rounded-[30px] border border-white/5 bg-gradient-to-br from-black/60 to-slate-900 overflow-hidden relative">
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `${results.profit > 0 ? '#10b981' : '#ef4444'}20`, filter: 'blur(30px)' }} />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl border border-white/10 overflow-hidden bg-black/40">
                <img src={results.portrait} alt={results.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-black text-xs leading-none mb-1 uppercase tracking-wider">{results.author}</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Reporte de Laboratorio</p>
              </div>
            </div>

            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-6">
               <p className="text-xs text-white/90 leading-relaxed italic">
                 "{results.message}"
               </p>
               {results.warning && (
                 <div className="mt-3 flex items-start gap-2 text-[10px] font-bold text-red-400 uppercase tracking-tighter">
                   <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                   {results.warning}
                 </div>
               )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Cobre Neto</p>
                <p className="text-xl font-black text-cyan-400">{results.copperExtracted.toFixed(1)}T</p>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Eficiencia</p>
                <p className={`text-xl font-black ${results.efficiency < 30 ? 'text-red-500' : 'text-emerald-400'}`}>{results.efficiency.toFixed(0)}%</p>
              </div>
            </div>
          </div>

          {/* Econometría */}
          <div className="glass-panel p-6 rounded-[30px] border border-white/5 bg-white/5">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Utilidad Estimada</p>
                <h5 className={`text-3xl font-black ${results.profit > 0 ? 'text-emerald-400' : 'text-red-500'}`}>${results.profit.toFixed(0)}</h5>
              </div>
              <TrendingUp className={`w-10 h-10 ${results.profit > 0 ? 'text-emerald-400' : 'text-red-500'} opacity-20`} />
            </div>
            
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.min(Math.max((results.profit + 1000) / 40, 0), 100)}%` }}
                 className={`h-full ${results.profit > 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}
               />
            </div>
          </div>

          {/* Cierre Sesión */}
          <div className="flex items-center justify-center p-4 border border-white/5 rounded-[30px] bg-black/20 gap-3">
            <History size={16} className="text-slate-600" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Registros históricos del año 1845</span>
          </div>
        </div>

      </div>
    </div>
  );
}
