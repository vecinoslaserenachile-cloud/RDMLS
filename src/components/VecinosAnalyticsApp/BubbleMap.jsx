import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, BarChart } from 'lucide-react';

const mockData = [
  { id: 't1', topic: 'Seguridad', count: 450, sentiment: 'preocupación' },
  { id: 't2', topic: 'Tráfico P. de Aguirre', count: 320, sentiment: 'enojo' },
  { id: 't3', topic: 'Plazas Limpias', count: 180, sentiment: 'alegría' },
  { id: 't4', topic: 'Alumbrado Faro', count: 210, sentiment: 'neutro' },
  { id: 't5', topic: 'Red Digital', count: 390, sentiment: 'alegría' },
  { id: 't6', topic: 'Humedal Río Elqui', count: 150, sentiment: 'preocupación' },
  { id: 't7', topic: 'Comercio Local', count: 280, sentiment: 'alegría' },
];

export default function BubbleMap({ onTopicSelect }) {
  const svgRef = useRef(null);
  const [selectedBubble, setSelectedBubble] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    const colorScale = {
      alegría: '#10b981', // Emerald
      enojo: '#ef4444',   // Red
      preocupación: '#f59e0b', // Amber
      neutro: '#94a3b8',   // Slate
    };

    const root = d3.pack()
      .size([width - 40, height - 40])
      .padding(15)(d3.hierarchy({ children: mockData }).sum(d => d.count));

    const node = svg.selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x + 20},${d.y + 20})`)
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => setSelectedBubble(d.data))
      .on('mouseleave', () => setSelectedBubble(null))
      .on('click', (event, d) => onTopicSelect(d.data.topic));

    // Force animation
    node.attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('opacity', 1);

    node.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => colorScale[d.data.sentiment])
      .attr('fill-opacity', 0.2)
      .attr('stroke', d => colorScale[d.data.sentiment])
      .attr('stroke-width', 2);

    node.append('circle')
      .attr('r', d => d.r * 0.8)
      .attr('fill', d => colorScale[d.data.sentiment])
      .attr('fill-opacity', 0.1);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .style('font-size', d => Math.min(d.r / 3, 14))
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('pointer-events', 'none')
      .text(d => d.data.topic);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.8em')
      .style('font-size', d => Math.min(d.r / 5, 10))
      .style('fill', 'rgba(255,255,255,0.6)')
      .style('pointer-events', 'none')
      .text(d => `${d.data.count} Vecinos`);

  }, [onTopicSelect]);

  return (
    <div className="w-full h-full flex flex-col p-4 bg-slate-900/30">
      <div className="flex justify-between items-center mb-4 px-4 bg-slate-900/50 p-4 rounded-3xl border border-white/5">
        <div>
           <div className="text-[10px] text-brand-neon font-black tracking-widest uppercase">Vista A</div>
           <h2 className="text-xl font-black text-white">TERMÓMETRO SOCIAL</h2>
        </div>
        
        <div className="flex gap-4">
           {['alegría', 'enojo', 'preocupación'].map(s => (
             <div key={s} className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
               <div className={`w-2 h-2 rounded-full ${s === 'alegría' ? 'bg-emerald-500' : s === 'enojo' ? 'bg-red-500' : 'bg-amber-500'}`} />
               {s}
             </div>
           ))}
        </div>
      </div>
      
      <div className="flex-1 relative" ref={svgRef}>
         <AnimatePresence>
           {selectedBubble && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 10 }}
               className="absolute top-4 left-4 p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-10 w-48"
             >
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Impacto Detectado</div>
                <div className="text-lg font-black text-white mb-2">{selectedBubble.topic}</div>
                <div className="flex items-center gap-2 mb-3">
                   <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${selectedBubble.sentiment === 'alegría' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-500'}`}>
                     {selectedBubble.sentiment}
                   </div>
                </div>
                <div className="text-xs text-slate-400">Clic para ver desglose de conceptos relacionados.</div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

    </div>
  );
}
