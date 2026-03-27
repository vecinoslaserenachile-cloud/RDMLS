import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    History, Map, Users, Trophy, Milestone, 
    ArrowRight, ChevronRight, Search, Filter, 
    Calendar, User, Landmark, TrendingUp,
    Shield, CheckCircle2, Award
} from 'lucide-react';

const alcaldesData = [
    { periodo: "2024 - 2028", nombre: "Daniela Norambuena", partido: "RN", genero: "F", porcentaje: "20.4%", tipo: "Elección Directa", hito: "Primera alcaldesa RN electa en democracia moderna.", legado: "Proyección de modernización digital y seguridad vecinal.", color: "#1e40af" },
    { periodo: "2012 - 2024", nombre: "Roberto Jacob Jure", partido: "PR", genero: "M", porcentaje: "48.6% (Prom.)", tipo: "Elección Directa", hito: "Tres periodos consecutivos de gestión radical.", legado: "Fomento del patrimonio cultural y eventos masivos.", color: "#dc2626" },
    { periodo: "2004 - 2012", nombre: "Raúl Saldívar Auger", partido: "PS", genero: "M", porcentaje: "46.5% (Prom.)", tipo: "Elección Directa", hito: "Consolidación del borde costero.", legado: "Modernización de infraestructura urbana y plazas.", color: "#ef4444" },
    { periodo: "1992 - 2004", nombre: "Adriana Peñafiel V.", partido: "RN", genero: "F", porcentaje: "34.2% (Prom.)", tipo: "Regidor más votado", hito: "Liderazgo en la transición democrática local.", legado: "Impulso al turismo y preservación del casco histórico.", color: "#1e3a8a" },
    { periodo: "1989 - 1992", nombre: "Lowell S. Wigodski Behar", partido: "Indep. Derecha", genero: "M", porcentaje: "N/A", tipo: "Designado", hito: "Último alcalde designado de la transición.", legado: "Gestión administrativa post-militar.", color: "#64748b" },
    { periodo: "1986 - 1989", nombre: "Adriana Peñafiel Villafañe", partido: "RN", genero: "F", porcentaje: "N/A", tipo: "Designado", hito: "Primera mujer en liderar la alcaldía (designada).", legado: "Gestión de servicios municipales.", color: "#1e3a8a" },
    { periodo: "1978 - 1986", nombre: "Eugenio Munizaga Rodríguez", partido: "RN", genero: "M", porcentaje: "N/A", tipo: "Designado", hito: "Larga permanencia durante el periodo militar.", legado: "Obras públicas provinciales.", color: "#1e3a8a" },
    { periodo: "1973 - 1978", nombre: "Jorge Morales Adriasola", partido: "Indep. Derecha", genero: "M", porcentaje: "N/A", tipo: "Designado", hito: "Inicio del periodo de designación directa.", legado: "Intervención institucional.", color: "#64748b" },
    { periodo: "1967 - 1973", nombre: "Carlos Galleguillos B.", partido: "PR", genero: "M", porcentaje: "N/A", tipo: "Regidor (Electo)", hito: "Último alcalde electo antes de la interrupción.", legado: "Apoyo a movimientos sociales locales.", color: "#dc2626" },
    { periodo: "1960 - 1967", nombre: "Jorge Morales A.", partido: "PR", genero: "M", porcentaje: "N/A", tipo: "Regidor (Electo)", hito: "Hegemonía radical en los años 60.", legado: "Desarrollo de barrios residenciales.", color: "#dc2626" },
    { periodo: "1956 - 1960", nombre: "Victoria Pinto Durán", partido: "PCU", genero: "F", porcentaje: "N/A", tipo: "Regidor (Electo)", hito: "Primera mujer alcaldesa en la historia de Chile.", legado: "Ruptura de la hegemonía masculina patricial.", color: "#334155" },
    { periodo: "1944 - 1950", nombre: "Ernesto Aguirre Valín", partido: "PR", genero: "M", porcentaje: "N/A", tipo: "Regidor (Electo)", hito: "Alcalde durante la ejecución del Plan Serena.", legado: "Transformación urbana total de la ciudad.", color: "#dc2626" },
    { periodo: "1831", nombre: "Pedro Nolasco Humeres", partido: "Liberal", genero: "M", porcentaje: "N/A", tipo: "Designación Noble", hito: "Primer alcalde registrado bajo régimen republicano.", legado: "Organización municipal fundacional.", color: "#0369a1" }
];

const StatCard = ({ icon: Icon, title, value, subtext, color = "#3b82f6" }) => (
    <motion.div 
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col gap-2 relative overflow-hidden group"
    >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-all duration-700">
            <Icon size={80} color={color} />
        </div>
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20` }}>
                <Icon size={20} color={color} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{title}</span>
        </div>
        <div className="text-3xl font-black text-white">{value}</div>
        <div className="text-[10px] text-white/40 font-bold uppercase">{subtext}</div>
    </motion.div>
);

export default function AlcaldesHistory({ onClose }) {
    const [selectedAlcalde, setSelectedAlcalde] = useState(null);
    const [filter, setFilter] = useState("");

    const filteredData = alcaldesData.filter(a => 
        a.nombre.toLowerCase().includes(filter.toLowerCase()) || 
        a.periodo.includes(filter)
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white font-['Inter'] relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 blur-[150px] rounded-full" />
            
            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase">
                                Archivo Soberano & Memoria
                            </div>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
                            HISTORIAL <br/>
                            <span className="text-blue-500">ALCALDICIO</span>
                        </h1>
                        <p className="text-white/40 max-w-xl text-sm font-medium leading-relaxed uppercase tracking-tighter">
                            Un recorrido por los liderazgos que han forjado el destino de La Serena desde su era fundacional en 1831 hasta la modernidad del 2028.
                        </p>
                    </div>

                    <div className="flex-shrink-0 flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                            <input 
                                type="text" 
                                placeholder="BUSCAR NOMBRE O AÑO..." 
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 transition-all w-full md:w-[300px] text-xs font-black uppercase tracking-widest"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <StatCard icon={Users} title="Cuota de Género" value="3" subtext="Mujeres en el Sillón" color="#f472b6" />
                    <StatCard icon={Landmark} title="Hegemonía Radical" value="45%" subtext="Tiempo Total PR" color="#dc2626" />
                    <StatCard icon={TrendingUp} title="Elección Popular" value="~30" subtext="Procesos Democráticos" color="#10b981" />
                    <StatCard icon={Map} title="Gente de la Zona" value="95%" subtext="Liderazgo Local" color="#38bdf8" />
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-2/3">
                        <div className="bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                                <h3 className="text-xs font-black tracking-widest uppercase text-white/60">Registros Cronológicos (1831 - 2028)</h3>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase text-blue-500">Live Archives</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto vls-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="p-6 text-[10px] font-black uppercase text-white/30 tracking-widest">Periodo</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-white/30 tracking-widest">Alcalde / Alcaldesa</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-white/30 tracking-widest">Identidad</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-white/30 tracking-widest"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((a, idx) => (
                                            <motion.tr 
                                                key={idx}
                                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                                onClick={() => setSelectedAlcalde(a)}
                                                className={`cursor-pointer transition-all border-b border-white/5 ${selectedAlcalde?.nombre === a.nombre ? 'bg-blue-500/10' : ''}`}
                                            >
                                                <td className="p-6 font-mono text-xs text-blue-400 font-bold">{a.periodo}</td>
                                                <td className="p-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-white text-lg leading-tight uppercase tracking-tighter">{a.nombre}</span>
                                                        <span className="text-[10px] text-white/40 font-bold uppercase">{a.tipo}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color }} />
                                                        <span className="text-xs font-black uppercase tracking-widest" style={{ color: a.color }}>{a.partido}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <ChevronRight className="inline-block text-white/20" size={20} />
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <AnimatePresence mode="wait">
                            {selectedAlcalde ? (
                                <motion.div 
                                    key={selectedAlcalde.nombre}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sticky top-20 backdrop-blur-3xl overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: selectedAlcalde.color }} />
                                    <div className="mb-8 p-6 bg-white/[0.03] rounded-3xl border border-white/5 flex flex-col items-center text-center">
                                        <div className="w-24 h-24 rounded-full bg-white/5 border-4 border-white/10 flex items-center justify-center mb-4 overflow-hidden"><User size={48} className="text-white/20" /></div>
                                        <h2 className="text-3xl font-black text-white leading-none uppercase tracking-tighter mb-2">{selectedAlcalde.nombre}</h2>
                                        <div className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: `${selectedAlcalde.color}30`, color: selectedAlcalde.color }}>{selectedAlcalde.partido}</div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"><Calendar className="text-blue-500 shrink-0" size={20} /><div><div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Periodo de Mando</div><div className="text-sm font-bold text-white">{selectedAlcalde.periodo}</div></div></div>
                                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"><Award className="text-blue-500 shrink-0" size={20} /><div><div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Hito Histórico</div><div className="text-xs font-medium text-white/80 leading-relaxed uppercase">{selectedAlcalde.hito}</div></div></div>
                                        <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"><Landmark className="text-blue-500 shrink-0" size={20} /><div><div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Legado Institucional</div><div className="text-xs font-medium text-white/80 leading-relaxed uppercase">{selectedAlcalde.legado}</div></div></div>
                                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-between"><div className="flex items-center gap-2"><Shield className="text-blue-400" size={16} /><span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Respaldo Ciudadano</span></div><span className="text-sm font-black text-white">{selectedAlcalde.porcentaje}</span></div>
                                    </div>
                                    <button onClick={onClose} className="w-full mt-10 py-5 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5">Cerrar Archivo de Legado</button>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[400px] border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center text-white/20">
                                    <History size={64} className="mb-6 opacity-20" />
                                    <div className="text-xs font-black uppercase tracking-[0.2em]">Selecciona un registro para ver su Ficha Técnica de Legado</div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-24">
                    <h3 className="text-xl font-black text-white mb-10 flex items-center gap-4"><Milestone size={24} className="text-blue-500" /> ERAS DEL PODER MUNICIPAL</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: "Era Fundacional", range: "1831 - 1934", desc: "Poder ejercido por familias patricias y asambleas nobles.", color: "#0369a1" },
                            { title: "Hegemonía Radical", range: "1935 - 1973", desc: "Sistema de regidores y dominio absoluto del PR.", color: "#dc2626" },
                            { title: "Interrupción", range: "1973 - 1992", desc: "Designación directa sin procesos electorales.", color: "#64748b" },
                            { title: "Voto Popular", range: "1992 - 2028", desc: "Retorno a la democracia moderna y elección directa.", color: "#10b981" }
                        ].map((era, i) => (
                            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl relative group overflow-hidden">
                                <div className="absolute top-0 left-0 w-1.5 h-full opacity-50 transition-all duration-500 group-hover:w-full group-hover:opacity-10" style={{ backgroundColor: era.color }} />
                                <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: era.color }}>{era.range}</div>
                                <h4 className="text-lg font-black text-white mb-4 uppercase tracking-tighter">{era.title}</h4>
                                <p className="text-xs text-white/40 font-medium leading-relaxed uppercase">{era.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
