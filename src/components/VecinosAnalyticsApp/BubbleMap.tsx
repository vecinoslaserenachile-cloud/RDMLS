import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Thermometer, TrendingUp, Users, Activity } from 'lucide-react';

interface NodeData {
  id: string;
  name: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral' | 'alert';
  x?: number;
  y?: number;
}

const SAMPLE_DATA: NodeData[] = [
  { id: '1', name: 'TRÁFICO AV. DEL MAR', count: 120, sentiment: 'negative' },
  { id: '2', name: 'ALUMBRADO PÚBLICO', count: 85, sentiment: 'alert' },
  { id: '3', name: 'PARQUE ESPEJO DEL AGUA', count: 200, sentiment: 'positive' },
  { id: '4', name: 'SEGURIDAD CIUDADANA', count: 150, sentiment: 'negative' },
  { id: '5', name: 'EVENTOS MUNICIPALES', count: 95, sentiment: 'positive' },
  { id: '6', name: 'FERIAS LIBRES', count: 70, sentiment: 'neutral' },
  { id: '7', name: 'CORTE DE AGUA', count: 45, sentiment: 'alert' },
  { id: '8', name: 'PLAN REGULADOR', count: 110, sentiment: 'neutral' },
];

export default function BubbleMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const nodes = SAMPLE_DATA.map(d => ({ ...d }));

    const colorScale = {
      positive: '#10b981',
      negative: '#f43f5e',
      neutral: '#94a3b8',
      alert: '#fbbf24'
    };

    const radiusScale = d3.scaleSqrt()
      .domain([0, d3.max(nodes, d => d.count) || 0])
      .range([30, 80]);

    const simulation = d3.forceSimulation(nodes as any)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(30))
      .force('collide', d3.forceCollide().radius(d => radiusScale((d as any).count) + 5))
      .on('tick', () => {
        nodeGroups.attr('transform', d => `translate(${(d as any).x},${(d as any).y})`);
      });

    const nodeGroups = svg.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .on('click', (event, d) => setSelectedNode(d))
      .call(d3.drag<SVGGElement, any>()
        .on('start', (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', (event) => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        })
      );

    // Glow Effect
    nodeGroups.append('circle')
      .attr('r', d => radiusScale(d.count))
      .attr('fill', d => colorScale[d.sentiment])
      .attr('opacity', 0.2)
      .attr('filter', 'blur(8px)');

    // Main Bubble
    nodeGroups.append('circle')
      .attr('r', d => radiusScale(d.count))
      .attr('fill', d => colorScale[d.sentiment])
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer');

    // Label
    nodeGroups.append('text')
      .text(d => d.name.split(' ')[0])
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', 'white')
      .attr('font-size', d => Math.min(10, radiusScale(d.count) / 4))
      .attr('font-weight', 'black')
      .style('pointer-events', 'none')
      .style('text-transform', 'uppercase');

  }, []);

  return (
    <div className="w-full h-full flex gap-6">
      <div className="flex-1 bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
             <Thermometer className="text-sky-400" size={24} /> TERMÓMETRO SOCIAL
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Análisis de sentimiento participativo</p>
        </div>

        <svg ref={svgRef} className="w-full h-full" />
      </div>

      <div className="w-80 flex flex-col gap-4">
         <div className="p-6 bg-slate-900/40 rounded-[2rem] border border-slate-800/50">
           <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Métricas Globales</h3>
           <div className="space-y-4">
             <MetricRow icon={<Users size={16} />} label="VECINOS ACTIVOS" value="1.2K" color="sky" />
             <MetricRow icon={<TrendingUp size={16} />} label="ENGAGEMENT" value="+24%" color="emerald" />
             <MetricRow icon={<Activity size={16} />} label="INTERACCIONES" value="842" color="indigo" />
           </div>
         </div>

         <AnimatePresence>
           {selectedNode && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="flex-1 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-[2rem] border border-sky-500/30 shadow-2xl shadow-sky-500/10"
             >
                <div className="flex items-center gap-3 mb-4">
                   <div className={`w-3 h-3 rounded-full bg-${selectedNode.sentiment === 'positive' ? 'emerald' : selectedNode.sentiment === 'negative' ? 'red' : 'amber'}-500 shadow-lg`} />
                   <h3 className="text-sm font-black text-white uppercase">{selectedNode.name}</h3>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
                  Este tema representa el {Math.round((selectedNode.count / 800) * 100)}% de las conversaciones actuales.
                  <div className="mt-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                    "Los vecinos expresan su {selectedNode.sentiment === 'negative' ? 'descontento' : 'satisfacción'} por el estado actual."
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-sky-500 text-white font-black text-[10px] rounded-xl tracking-tighter hover:bg-sky-400 transition-all flex items-center justify-center gap-2 uppercase">
                  <MousePointer2 size={12} /> Unirse al debate
                </button>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}

function MetricRow({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-slate-400">
        <div className={`text-${color}-400 opacity-60`}>{icon}</div>
        <span className="text-[10px] font-black tracking-tighter uppercase">{label}</span>
      </div>
      <span className="text-sm font-black text-white">{value}</span>
    </div>
  );
}
