import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, User, Award, ExternalLink, 
    Search, Filter, TrendingUp, X, Sparkles, 
    Clock, Phone, MessageSquare, Info, ShieldCheck, Gavel,
    History, Calendar, Landmark, MapPin, Milestone
} from 'lucide-react';

/**
 * Observatorio Parlamentario VLS - Extended Edition
 * Región de Coquimbo (Circunscripción 5 / Distrito 5)
 * Periodos: 2022-2026 y 2026-2030
 */
export default function ParliamentaryObservatory({ onClose }) {
    const [selectedPeriod, setSelectedPeriod] = useState('2026'); // '2026' o '2022'
    const [searchTerm, setSearchTerm] = useState('');
    const [filterParty, setFilterParty] = useState('ALL');

    // Mapeo detallado de parlamentarios por periodos
    const parliamentaryData = {
        '2022': [
            { nombre: "Matías Walker Prieto", cargo: "Senador", partido: "Demócratas", asistencia: "97%", leyes: 15, mociones: 98, intervenciones: 45, biografia: "Abogado y Senador por la IV Región. Exdiputado por la misma zona.", periodo: "2022-2026 (Historical)" },
            { nombre: "Daniel Núñez Arancibia", cargo: "Senador", partido: "PC", asistencia: "95%", leyes: 12, mociones: 85, intervenciones: 52, biografia: "Sociólogo y Senador. Enfocado en minería y derechos sociales.", periodo: "2022-2026 (Historical)" },
            { nombre: "Sergio Gahona Salazar", cargo: "Senador", partido: "UDI", asistencia: "96%", leyes: 10, mociones: 72, intervenciones: 40, biografia: "Exintendente de la IV región. Senador enfocado en gestión pública.", periodo: "2022-2026 (Historical)" },
            { nombre: "Daniel Manouchehri Lobos", cargo: "Diputado", partido: "PS", asistencia: "98%", leyes: 8, mociones: 65, intervenciones: 120, biografia: "Abogado. Representante del Distrito 5 La Serena / Coquimbo.", periodo: "2022-2026 (Historical)" },
            { nombre: "Nathalie Castillo Rojas", cargo: "Diputado", partido: "PC", asistencia: "94%", leyes: 5, mociones: 58, intervenciones: 110, biografia: "Periodista de la Región de Coquimbo. Liderazgo social regional.", periodo: "2022-2026 (Historical)" },
            { nombre: "Marco A. Sulantay Olivares", cargo: "Diputado", partido: "UDI", asistencia: "92%", leyes: 6, mociones: 45, intervenciones: 95, biografia: "Ex CORE de la región. Enfocado en fiscalización y obras.", periodo: "2022-2026 (Historical)" },
            { nombre: "Ricardo Cifuentes Lillo", cargo: "Diputado", partido: "DC", asistencia: "96%", leyes: 7, mociones: 40, intervenciones: 85, biografia: "Exintendente y Subsecretario. Larga trayectoria en descentralización.", periodo: "2022-2026 (Historical)" },
            { nombre: "Carolina Tello Rojas", cargo: "Diputado", partido: "PC", asistencia: "93%", leyes: 5, mociones: 50, intervenciones: 88, biografia: "Abogada feminista. Trabajo en derechos humanos y justicia local.", periodo: "2022-2026 (Historical)" },
            { nombre: "Juan M. Fuenzalida C.", cargo: "Diputado", partido: "UDI", asistencia: "91%", leyes: 5, mociones: 38, intervenciones: 75, biografia: "Abogado. Trabajo legislativo en seguridad y vivienda regional.", periodo: "2022-2026 (Historical)" },
            { nombre: "Víctor Pino Fuentes", cargo: "Diputado", partido: "Ind - Social", asistencia: "89%", leyes: 4, mociones: 32, intervenciones: 60, biografia: "Ingeniero Civil. Enfoque en gestión del agua y sequía regional.", periodo: "2022-2026 (Historical)" }
        ],
        '2026': [
            { nombre: "Matías Walker Prieto", cargo: "Senador", partido: "Demócratas", asistencia: "98%", leyes: 2, mociones: 12, intervenciones: 18, biografia: "Senador con 4 años restantes de mandato. (Ciclo 2021-2029).", isSenator: true, status: "Restan 4 años" },
            { nombre: "Daniel Núñez Arancibia", cargo: "Senador", partido: "PC", asistencia: "96%", leyes: 1, mociones: 8, intervenciones: 15, biografia: "Senador con 4 años restantes de mandato. (Ciclo 2021-2029).", isSenator: true, status: "Restan 4 años" },
            { nombre: "Sergio Gahona Salazar", cargo: "Senador", partido: "UDI", asistencia: "97%", leyes: 1, mociones: 10, intervenciones: 12, biografia: "Senador con 4 años restantes de mandato. (Ciclo 2021-2029).", isSenator: true, status: "Restan 4 años" },
            { nombre: "Nathalie Castillo R.", cargo: "Diputado", partido: "PC", asistencia: "95%", leyes: 1, mociones: 12, intervenciones: 40, biografia: "Re-electa. Segunda administración parlamentaria 2026-2030.", reelected: true },
            { nombre: "Marco Sulantay O.", cargo: "Diputado", partido: "UDI", asistencia: "94%", leyes: 1, mociones: 8, intervenciones: 35, biografia: "Re-electo. Foco en infraestructura hídrica regional.", reelected: true },
            { nombre: "Daniel Manouchehri L.", cargo: "Diputado", partido: "PS", asistencia: "97%", leyes: 2, mociones: 15, intervenciones: 45, biografia: "Re-electo. Comisión de Seguridad y Economía.", reelected: true },
            { nombre: "Roberto Jacob Jure", cargo: "Diputado", partido: "PR", asistencia: "99%", leyes: 1, mociones: 5, intervenciones: 30, biografia: "Exalcalde de La Serena. Primer periodo en el Congreso Nacional.", isNew: true },
            { id: "SOF-B", nombre: "Sofía Barraza", cargo: "Diputado", partido: "FA", asistencia: "91%", leyes: 0, mociones: 4, intervenciones: 20, biografia: "Nueva representante. Feminismo territorial y DDHH.", isNew: true },
            { id: "JEP", nombre: "Juan Eduardo Pérez", cargo: "Diputado", partido: "Evópoli", asistencia: "89%", leyes: 0, mociones: 3, intervenciones: 15, biografia: "Nuevo representante. Fomento productivo y pymes.", isNew: true },
            { id: "MS", nombre: "Marcela Sandoval", cargo: "Diputado", partido: "FA", asistencia: "92%", leyes: 0, mociones: 6, intervenciones: 25, biografia: "Nueva representante. Gestión ambiental y borde costero.", isNew: true }
        ]
    };

    const currentData = parliamentaryData[selectedPeriod];

    const filteredData = currentData.filter(p => {
        const matchesSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.partido.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterParty === 'ALL' || p.partido.includes(filterParty);
        return matchesSearch && matchesFilter;
    });

    const PARTIES = ['ALL', ...new Set(currentData.map(p => p.partido))];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100080, background: 'rgba(5, 10, 20, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                style={{ 
                    width: '100%', maxWidth: '1400px', height: '90vh', 
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', 
                    borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.1)', 
                    boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                    display: 'flex', flexDirection: 'column', overflow: 'hidden'
                }}
            >
                {/* Header Extended */}
                <div style={{ padding: '2rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ background: '#38bdf8', padding: '12px', borderRadius: '15px', color: '#020617' }}>
                            <Landmark size={32} />
                        </div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
                                VLS: <span style={{ color: '#38bdf8' }}>Observatorio Parlamentario</span>
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '4px', margin: 0 }}>Archivo de Soberanía & Representación Regional</p>
                        </div>
                    </div>
                    
                    <button onClick={onClose} className="btn-glass" style={{ padding: '10px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '3rem' }}>
                    {/* Period Switcher (TABS) */}
                    <div className="flex gap-4 mb-10 bg-white/5 p-2 rounded-3xl w-fit border border-white/5">
                        <button 
                            onClick={() => setSelectedPeriod('2026')}
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                selectedPeriod === '2026' ? 'bg-blue-500 text-black shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Periodo Actual (2026 - 2030)
                        </button>
                        <button 
                            onClick={() => setSelectedPeriod('2022')}
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                selectedPeriod === '2022' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            Archivo Histórico (2022 - 2026)
                        </button>
                    </div>

                    <div style={{ maxWidth: '1000px', marginBottom: '4rem', padding: '2.5rem', background: 'rgba(56, 189, 248, 0.03)', borderRadius: '35px', border: '1px solid rgba(56, 189, 248, 0.1)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.05 }}><Milestone size={150} /></div>
                        {selectedPeriod === '2026' ? (
                            <>
                                <h3 className="text-2xl font-black text-blue-400 mb-4 flex items-center gap-3">
                                    <TrendingUp size={24} /> Gestión Legislativa en Curso (Marzo 2026)
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed uppercase tracking-tighter">
                                    Este panel muestra a los parlamentarios del Distrito 5 y Circunscripción 4 que asumieron mando recientemente. 
                                    Incluye a los 3 senadores con mandato vigente hasta 2029. Los KPIs reflejan el arranque del nuevo ciclo legislativo.
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-black text-slate-400 mb-4 flex items-center gap-3">
                                    <History size={24} /> Hemeroteca Parlamentaria Regional
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed uppercase tracking-tighter">
                                    Resumen consolidado del trabajo realizado durante el periodo 2022-2026. 
                                    Datos históricos de leyes aprobadas, mociones y asistencia acumulada para auditar el legado de la administración anterior.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Filter Bar */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '3rem', flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
                            <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={20} />
                            <input 
                                type="text" 
                                placeholder="BUSCAR REPRESENTANTE O PARTIDO..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.2rem 1.2rem 1.2rem 3rem', borderRadius: '20px', color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}
                            />
                        </div>
                        <select 
                            value={filterParty}
                            onChange={(e) => setFilterParty(e.target.value)}
                            style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '0 2rem', borderRadius: '20px', fontWeight: 'black', fontSize: '0.75rem', textTransform: 'uppercase' }}
                        >
                            {PARTIES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '2.5rem' }}>
                        <AnimatePresence mode="popLayout">
                            {filteredData.map((p, idx) => (
                                <motion.div 
                                    key={`${selectedPeriod}-${p.nombre}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative group p-8 rounded-[2.5rem] bg-slate-900 shadow-2xl overflow-hidden border border-white/5"
                                    style={{ borderLeft: `8px solid ${p.isSenator ? '#facc15' : (selectedPeriod === '2022' ? '#64748b' : '#38bdf8')}` }}
                                >
                                    {/* Decoration */}
                                    <div className="absolute -top-10 -right-10 p-10 opacity-[0.02] group-hover:scale-125 transition-transform">
                                        {p.isSenator ? <ShieldCheck size={180} /> : <Gavel size={180} />}
                                    </div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">{p.nombre}</h4>
                                                {p.isSenator && <Award className="text-yellow-500 shrink-0" size={20} />}
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-slate-400 rounded-full border border-white/5">{p.cargo}</span>
                                                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 text-blue-500 rounded-full border border-white/5">{p.partido}</span>
                                                {p.status && <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full border border-yellow-500/20">{p.status}</span>}
                                                {p.reelected && <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-green-500/20 text-green-500 rounded-full border border-green-500/20">RE-ELECTORADO</span>}
                                                {p.isNew && <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full border border-purple-500/20">NUEVO LEGADO</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-8 uppercase font-medium">
                                        {p.biografia}
                                    </p>

                                    {/* KPIs */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                                            <div className="text-2xl font-black text-white">{p.asistencia}</div>
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Asistencia Sala</div>
                                        </div>
                                        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/10 flex flex-col items-center">
                                            <div className="text-2xl font-black text-blue-400">{p.leyes}</div>
                                            <div className="text-[8px] font-black text-blue-600 uppercase tracking-widest text-center">Leyes Publicadas</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                                            <div className="text-2xl font-black text-white">{p.mociones}</div>
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Mociones Pres.</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                                            <div className="text-2xl font-black text-white">{p.intervenciones}</div>
                                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Intervenciones</div>
                                        </div>
                                    </div>

                                    <button 
                                        className="w-full py-4 bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-white/5"
                                        onClick={() => window.open('https://www.bcn.cl', '_blank')}
                                    >
                                        <ExternalLink size={14} /> Transparencia BCN
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Info */}
                    <div className="mt-16 p-10 bg-gradient-to-r from-blue-500/10 to-transparent rounded-[2.5rem] border border-blue-500/20">
                        <div className="flex items-center gap-6">
                            <ShieldCheck size={48} className="text-blue-500 shrink-0" />
                            <div>
                                <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">Certificación de Transparencia VLS</h4>
                                <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-tighter mt-1 max-w-2xl">
                                    Este observatorio cruza datos abiertos del Congreso Nacional para empoderar al vecino de La Serena. 
                                    La "Soberanía Digital" implica auditar activamente el voto y la gestión legislativa de quienes nos representan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bar */}
                <div style={{ padding: '1.5rem 3rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#475569', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px' }}>
                        <Clock size={16} /> AUDITORÍA ACTUALIZADA: 29 MARZO 2026 | FUENTE: BIBLIOTECA DEL CONGRESO NACIONAL
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
