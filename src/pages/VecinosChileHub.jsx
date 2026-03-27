import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Flag, Map, Globe, History, Radio, 
    ShieldCheck, ChevronRight, Zap, Target,
    UserCircle, Landmark, Award, Settings,
    Search, Volume2, Mic2, Activity
} from 'lucide-react';

// National Timeline Data
const PRESIDENTES_CHILE = [
    { year: 2026, name: "Era de la Red Ciudadana", hito: "Despliegue de Antigravity Chile Core.", color: "#38bdf8" },
    { year: 2022, name: "Gabriel Boric", hito: "Transición generacional política.", color: "#ef4444" },
    { year: 2018, name: "Sebastián Piñera II", hito: "Gestión de crisis sanitaria y social.", color: "#3b82f6" },
    { year: 2014, name: "Michelle Bachelet II", hito: "Reformas estructurales educativas.", color: "#ef4444" },
    { year: 2006, name: "Michelle Bachelet I", hito: "Primera mujer presidenta de la República.", color: "#ef4444" },
    { year: 1990, name: "Patricio Aylwin", hito: "Retorno a la democracia moderna.", color: "#3b82f6" },
    { year: 1920, name: "Arturo Alessandri", hito: "Constitución de 1925 y derechos sociales.", color: "#dc2626" },
    { year: 1879, name: "Guerra del Pacífico", hito: "Expansión territorial del norte grande.", color: "#fbc02d" },
    { year: 1826, name: "Manuel Blanco Encalada", hito: "Primer Presidente de la República.", color: "#1e40af" }
];

const NewsItem = ({ title, category }) => (
    <div className="flex flex-col gap-1 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
        <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">{category}</span>
        <h4 className="text-xs font-bold text-white uppercase tracking-tighter">{title}</h4>
    </div>
);

export default function VecinosChileHub({ onClose }) {
    const [activeYear, setActiveYear] = useState(2026);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const activePresidente = PRESIDENTES_CHILE.find(p => p.year <= activeYear) || PRESIDENTES_CHILE[PRESIDENTES_CHILE.length - 1];

    useEffect(() => {
        console.log("ANTIGRAVITY_CHILE_CORE: Safety Protocol Internalized. VLS Isopropyl Isolation Active.");
    }, []);

    return (
        <div className="fixed inset-0 z-[1000000] bg-[#020617] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* National Header */}
            <header className="h-20 bg-white/5 border-b border-white/10 px-8 flex items-center justify-between backdrop-blur-3xl z-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-lg shadow-lg shadow-red-600/20">
                            <Flag size={18} className="text-white" />
                        </div>
                        <h1 className="text-xl font-black tracking-tighter uppercase">Vecinos<span className="text-blue-500">Chile</span></h1>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <nav className="hidden md:flex gap-8">
                        {['REPUBLICA', 'TERRITORIO', 'CIUDADANÍA', 'INTELIGENCIA'].map(m => (
                            <button key={m} className="text-[10px] font-black text-white/40 hover:text-white transition-all tracking-[0.2em]">{m}</button>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Antigravity Core V3.0</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Federación Nacional Activa</span>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                        <Zap size={20} />
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                {/* Left Panel: Historical Timeline (SVG Dynamic Engine Mock) */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden relative group">
                    <div className="p-8 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <History className="text-blue-500" size={20} />
                            <h2 className="text-xs font-black uppercase tracking-widest text-white/60">Línea de Tiempo Republicana (1826 - 2026)</h2>
                        </div>
                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase text-blue-400 tracking-widest">
                            SVG_DYNAMIC_ENGINE_v4.2
                        </div>
                    </div>
                    
                    <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
                        {/* Fake SVG Visualization */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 300 Q 200 100 400 300 T 750 300" stroke="white" strokeWidth="2" strokeDasharray="10 10" />
                                <circle cx="50" cy="300" r="10" fill="white" />
                                <circle cx="400" cy="300" r="10" fill="white" />
                                <circle cx="750" cy="300" r="10" fill="white" />
                            </svg>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activePresidente.year}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="z-10 text-center max-w-lg"
                            >
                                <div className="text-8xl font-black text-white/5 mb-4 select-none tracking-tighter">{activePresidente.year}</div>
                                <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">{activePresidente.name}</h3>
                                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
                                    <p className="text-sm font-medium text-white/70 uppercase leading-relaxed tracking-wider">{activePresidente.hito}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Interactive Axis */}
                        <div className="absolute bottom-10 left-10 right-10 flex justify-between">
                            {PRESIDENTES_CHILE.map((p, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveYear(p.year)}
                                    className={`w-3 h-3 rounded-full transition-all duration-500 ${activeYear === p.year ? 'bg-red-500 scale-150 ring-4 ring-red-500/20' : 'bg-white/20 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Geopolitical & Audio */}
                <div className="w-full md:w-[400px] flex flex-col gap-6">
                    {/* Geopolitics Widget (3D Globe Mock) */}
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 pointer-events-none grayscale">
                             {/* Map background filler */}
                             <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-70.6483, -33.4569,2,0,0/400x300?access_token=pk.eyJ1IjoiZ2VtaW5pLWFpIiwiYSI6ImNsOXdseTJ4eTBidjIzdW9qZGxtZDNnZWwifQ.fake')] bg-cover bg-center" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-8">
                                <Globe className="text-red-500" size={20} />
                                <h2 className="text-xs font-black uppercase tracking-widest text-white/60">Cartografía Nacional 2026</h2>
                            </div>

                            <div className="flex-1 flex items-center justify-center">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    className="w-48 h-48 rounded-full border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)] flex items-center justify-center relative shadow-inner"
                                >
                                    <Globe size={100} className="text-red-500/30" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                        <span className="text-[8px] font-black text-red-500 tracking-[0.2em] uppercase">Soberanía Total</span>
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Tratado 1881</span>
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Vigente</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Fallo La Haya (2014)</span>
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Integrado</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Audio Orchestrator Widget */}
                    <div className="h-[200px] bg-white/5 border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-center gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Radio className="text-blue-500" size={20} />
                                <h3 className="text-xs font-black uppercase tracking-widest text-white/60">Audio Orchestrator V3</h3>
                            </div>
                            <Activity size={16} className="text-blue-500 animate-pulse" />
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isPlaying ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-white/10'}`}
                            >
                                <Volume2 size={24} className={isPlaying ? 'text-white' : 'text-white/40'} />
                            </button>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Federación RDMLS ACTIVE</span>
                                <span className="text-xs font-bold text-white/80 uppercase tracking-tighter">Locución: Red Nacional Vecinos Chile</span>
                            </div>
                        </div>

                        {/* Spectrum Mock */}
                        <div className="flex items-end gap-[2px] h-8 opacity-20">
                            {[...Array(30)].map((_, i) => (
                                <motion.div 
                                    key={i}
                                    animate={{ height: isPlaying ? [10, 30, 15, 25, 10][i % 5] : 10 }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                    className="flex-1 bg-blue-500"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Float Label & Global Safety Overlay Indicator */}
            <div className="fixed bottom-10 left-10 z-[100] flex gap-10 items-center">
                <div className="text-[7px] font-black text-white/20 uppercase tracking-[1em] vertical-text">NEURAL_DOMAIN_MAESTRO_CHILE_2026</div>
                <div className="px-4 py-2 border border-green-500/30 bg-green-500/10 rounded-full flex items-center gap-2">
                    <ShieldCheck size={12} className="text-green-500" />
                    <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Protocolo de No-Interferencia Activo (Aislamiento VLS)</span>
                </div>
            </div>

            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </div>
    );
}
