import React from 'react';
import { Shield, Cpu, Users, Radar, Zap, Activity, Brain, ExternalLink } from 'lucide-react';

const MonarchReview = () => {
    return (
        <article className="monarch-review-section max-w-4xl mx-auto p-6 bg-slate-50 text-slate-800 rounded-2xl shadow-lg font-sans">
            {/* Header / Titular Institucional */}
            <header className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <div>
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">MONARCH REVIEW</h2>
                   <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resumen Ejecutivo de Gestión · 2026</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-tighter">Nivel de Acceso: Master CEO</span>
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                        <ExternalLink size={18} />
                    </button>
                </div>
            </header>

            {/* Análisis Cuantitativo (KPIs) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Indice de Transparencia', value: '98.4%', trend: '+2.1%', icon: Shield },
                    { label: 'Soberanía Tecnológica', value: '100%', trend: 'Estable', icon: Cpu },
                    { label: 'Satisfacción Ciudadana', value: '89.2%', trend: '+5.4%', icon: Users }
                ].map((kpi, idx) => (
                    <div key={idx} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <kpi.icon size={16} className="text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-2xl font-black text-slate-800">{kpi.value}</span>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{kpi.trend}</span>
                        </div>
                    </div>
                ))}
            </section>

            {/* Los 4 Pilares del Ecosistema */}
            <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Estado de los 4 Pilares (Smart Comuna)</h3>
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { name: 'Smart Citizens', desc: 'Atención y Reportes', color: 'bg-emerald-500' },
                        { name: 'Smart Administration', desc: 'Gestión Interna', color: 'bg-blue-500' },
                        { name: 'Smart Events', desc: 'Protocolo y Precedencias', color: 'bg-amber-500' },
                        { name: 'Smart Listening', desc: 'Inteligencia Sentinel', color: 'bg-purple-500' }
                    ].map((pillar, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                            <div className={`w-1.5 h-12 ${pillar.color} rounded-full`} />
                            <div>
                                <h4 className="text-sm font-black text-slate-800">{pillar.name}</h4>
                                <p className="text-[11px] text-slate-500">{pillar.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vigía Sentinel - Resumen de Alertas */}
            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Radar size={18} className="text-slate-900" />
                        <h3 className="text-sm font-black text-slate-900 uppercase">Alertas Vigía Activas</h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Tiempo Real</span>
                </div>
                <div className="space-y-3">
                    <div className="p-4 bg-slate-900 text-white rounded-xl flex justify-between items-center">
                        <div className="flex-1">
                            <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block mb-1">Impacto Crítico: Productividad</span>
                            <p className="text-sm font-bold">Crisis Combustible: Impacto en Pesca Artesanal y Camiones Aljibe</p>
                        </div>
                        <Zap size={20} className="text-amber-400 fill-amber-400 ml-4" />
                    </div>
                    <div className="p-4 bg-white border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Impacto Medio</span>
                            <p className="text-sm font-bold text-slate-700">Sequía Humedal El Culebrón: Monitoreo preventivo</p>
                        </div>
                        <Activity size={20} className="text-blue-500" />
                    </div>
                </div>
            </section>

            {/* Master CEO Insights */}
            <footer className="pt-6 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                            <Brain size={16} className="text-slate-600" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold max-w-[200px] leading-tight">
                            Algoritmo <span className="text-slate-900">Sentinel Master</span>: Iniciativa legislativa detectada para este Lunes (Mitigación Alza Combustibles).
                        </p>
                    </div>
                    <button className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-full hover:bg-slate-800 transition-colors uppercase tracking-widest shadow-lg">
                        Generar Reporte Completo
                    </button>
                </div>
            </footer>
        </article>
    );
};

export default MonarchReview;
