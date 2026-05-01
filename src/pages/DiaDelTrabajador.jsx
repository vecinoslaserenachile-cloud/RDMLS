import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, History, Globe, Shield, Heart, 
  Mic2, Music, ArrowRight, BookOpen, 
  Info, ExternalLink, Menu, X, Play, Pause
} from 'lucide-react';

// Componente de Navegación Local (Autónomo)
const Nav = ({ activeTab, setActiveTab }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-red-900/30 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
          <History className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">1 DE MAYO</h1>
          <p className="text-red-400 text-xs font-medium tracking-widest uppercase">Día del Trabajador</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        {['HISTORIA', 'CHILE', 'MUNDO', 'FAMILIA'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-bold tracking-widest transition-all ${
              activeTab === tab ? 'text-red-500 scale-110' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

const SectionHero = () => (
  <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
    {/* Fondo Artístico Industrial/Solemne */}
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <img src="/img/dia_del_trabajador_vls.png" alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 bg-red-900/30 border border-red-800/50 rounded-full text-red-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">
          Homenaje Institucional 2026
        </span>
        <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
          DIGNIDAD Y <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">TRABAJO</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light italic">
          "A quienes con sus manos construyen el futuro de nuestra región y el mundo. Un recorrido por la memoria de la lucha obrera."
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl transition-all flex items-center gap-3 shadow-xl shadow-red-900/40">
            <BookOpen className="w-5 h-5" /> COMENZAR RECORRIDO
          </button>
          <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center gap-3 border border-slate-700">
            <Mic2 className="w-5 h-5" /> REPOSITORIO DE AUDIOS
          </button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <p className="text-red-500/50 text-[10px] font-bold tracking-[0.5em] uppercase">Deslizar</p>
      <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent"></div>
    </div>
  </div>
);

const TimelineCard = ({ year, title, desc, region }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="relative pl-12 pb-12 border-l border-slate-800"
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-red-700 rounded-full shadow-[0_0_15px_rgba(185,28,28,0.5)]"></div>
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl font-black text-red-500/20">{year}</span>
        <span className="px-3 py-1 bg-slate-800 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-widest">{region}</span>
      </div>
      <h4 className="text-white font-bold text-xl mb-2">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const HistoryChile = () => (
  <div className="max-w-4xl mx-auto px-6 py-20">
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-4">
        <div className="w-10 h-1 bg-red-600"></div> LA EXPERIENCIA CHILENA
      </h3>
      <p className="text-slate-400 leading-relaxed">
        Chile ha sido escenario de una de las luchas sociales más profundas de Latinoamérica. Desde las pampas salitreras hasta las grandes urbes, el movimiento obrero chileno ha forjado la identidad de nuestra nación.
      </p>
    </div>

    <div className="space-y-4">
      <TimelineCard 
        year="1907" 
        region="IQUIQUE, CHILE"
        title="Matanza de la Escuela Santa María" 
        desc="Más de 2.000 trabajadores del salitre son masacrados tras una huelga por condiciones mínimas. Este hecho marca un antes y un después en la conciencia social del país."
      />
      <TimelineCard 
        year="1924" 
        region="SANTIAGO, CHILE"
        title="Código del Trabajo" 
        desc="Tras el 'ruido de sables', se promulgan leyes sociales fundamentales como el contrato de trabajo, seguro obligatorio y tribunales de conciliación."
      />
      <TimelineCard 
        year="1953" 
        region="NACIONAL"
        title="Fundación de la CUT" 
        desc="Clotario Blest lidera la creación de la Central Única de Trabajadores, unificando el movimiento obrero bajo una sola voz."
      />
    </div>
  </div>
);

const HistoryGlobal = () => (
  <div className="max-w-6xl mx-auto px-6 py-20 bg-slate-900/30 rounded-3xl border border-slate-800/50">
    <h3 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest">Perspectiva Internacional</h3>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          title: "EE.UU. & Canadá", 
          desc: "Los Mártires de Chicago (1886) y la huelga de Winnipeg (1919) sentaron las bases de las 8 horas en Norteamérica.",
          icon: <Globe className="w-8 h-8 text-blue-400" />
        },
        { 
          title: "Europa & Rusia", 
          desc: "Desde la Revolución Industrial inglesa hasta el Estado de Bienestar nórdico. La URSS influyó en la globalización del 1 de Mayo.",
          icon: <Shield className="w-8 h-8 text-red-500" />
        },
        { 
          title: "Asia & Oriente", 
          desc: "Las transformaciones industriales en China y Japón, y las luchas por los derechos en el Sudeste Asiático hoy.",
          icon: <Users className="w-8 h-8 text-yellow-500" />
        }
      ].map((item, i) => (
        <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-red-900/50 transition-colors">
          <div className="mb-6">{item.icon}</div>
          <h4 className="text-white font-bold text-xl mb-4">{item.title}</h4>
          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function DiaDelTrabajador() {
  const [activeTab, setActiveTab] = useState('HISTORIA');

  useEffect(() => {
    // Scroll al inicio al cargar
    window.scrollTo(0, 0);
    // Cambiar título de la página sin afectar el head global de App
    document.title = "1 de Mayo - Día Internacional del Trabajador | Vecinos La Serena";
  }, []);

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-red-500 selection:text-white">
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <SectionHero />

      <main className="pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'HISTORIA' && (
            <motion.section 
              key="hist"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 py-20"
            >
              <div className="text-center mb-16">
                <Users className="w-12 h-12 text-red-600 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">LOS MÁRTIRES DE CHICAGO</h3>
                <p className="text-slate-400">Todo comenzó con el sueño de las 8 horas. 1 de mayo de 1886: la huelga que cambió el mundo.</p>
              </div>
              <div className="bg-red-950/10 border border-red-900/20 p-8 rounded-3xl">
                <p className="leading-relaxed italic text-lg text-slate-300">
                  "Ocho horas de trabajo, ocho horas de recreo y ocho horas de descanso". 
                  <span className="block mt-4 text-sm font-bold text-red-500">— Consigna del movimiento de 1886.</span>
                </p>
              </div>
            </motion.section>
          )}

          {activeTab === 'CHILE' && <HistoryChile />}
          
          {activeTab === 'MUNDO' && <HistoryGlobal />}

          {activeTab === 'FAMILIA' && (
            <motion.section 
              key="fam"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 py-20 text-center"
            >
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
              <h3 className="text-4xl font-black text-white mb-6">EL CORAZÓN DEL TRABAJO: LA FAMILIA</h3>
              <p className="text-slate-400 text-lg mb-12">
                Detrás de cada jornada laboral, hay un hogar que espera y un futuro que se construye. 
                Dedicamos este espacio a la resiliencia de la familia trabajadora chilena.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center p-8">
                  <p className="text-slate-500 text-sm font-medium italic">"Espacio reservado para audios y testimonios familiares"</p>
                </div>
                <div className="aspect-video bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center p-8">
                  <p className="text-slate-500 text-sm font-medium italic">"Canciones y poesías del mundo obrero"</p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Local Blindado */}
      <footer className="bg-black border-t border-red-900/20 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 font-bold tracking-widest text-xs uppercase mb-4">Especial Multimedia Autónomo</p>
          <p className="text-slate-500 text-sm">VECINOSLASERENA.CL - MEMORIA HISTÓRICA 2026</p>
        </div>
      </footer>
    </div>
  );
}
