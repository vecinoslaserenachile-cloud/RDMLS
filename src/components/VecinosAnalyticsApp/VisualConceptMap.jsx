import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Search, Filter } from 'lucide-react';

const mockConceptNodes = [
  { id: 'root', title: 'Seguridad', sentiment: 'preocupación', count: 450 },
  { id: 'c1', title: 'Iluminación Faro', sentiment: 'preocupación', target: 'root', weight: 40 },
  { id: 'c2', title: 'Patrullaje Preventivo', sentiment: 'alegría', target: 'root', weight: 30 },
  { id: 'c3', title: 'Cámaras Barrio Sur', sentiment: 'preocupación', target: 'root', weight: 25 },
  { id: 'c4', title: 'Botón de Pánico', sentiment: 'neutro', target: 'root', weight: 20 },
  { id: 'c5', title: 'Ruidos Molestos', sentiment: 'enojo', target: 'c1', weight: 15 },
  { id: 'c6', title: 'Poste 42 Fundición', sentiment: 'preocupación', target: 'c1', weight: 10 },
  { id: 'c7', title: 'Prueba Beta VLS', sentiment: 'alegría', target: 'c2', weight: 45 },
];

export default function VisualConceptMap({ filteredTopic }) {
  const svgRef = useRef(null);
  const [currentNode, setCurrentNode] = useState('root');
  const [history, setHistory] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Zoom
    const zoom = d3.zoom()
      .scaleExtent([0.1, 8])
      .on('zoom', (event) => g.attr('transform', event.transform));
    svg.call(zoom);

    // Current levels nodes & links
    const visibleNodes = mockConceptNodes.filter(n => n.id === currentNode || n.target === currentNode);
    const visibleLinks = visibleNodes.filter(n => n.target === currentNode)
      .map(n => ({ source: n.target, target: n.id }));

    const simulation = d3.forceSimulation(visibleNodes)
      .force('link', d3.forceLink(visibleLinks).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(80));

    const link = g.append('g')
      .selectAll('line')
      .data(visibleLinks)
      .join('line')
      .attr('stroke', '#334155')
      .attr('stroke-width', 2);

    const node = g.append('g')
      .selectAll('g')
      .data(visibleNodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => {
          if (mockConceptNodes.some(n => n.target === d.id)) {
              setHistory([...history, currentNode]);
              setCurrentNode(d.id);
          }
      })
      .on('mouseenter', (event, d) => setHoveredNode(d))
      .on('mouseleave', () => setHoveredNode(null));

    const colorScale = {
      alegría: '#10b981',
      enojo: '#ef4444',
      preocupación: '#f59e0b',
      neutro: '#94a3b8',
    };

    node.append('circle')
      .attr('r', d => d.id === currentNode ? 60 : 45)
      .attr('fill', d => d.id === currentNode ? '#050b14' : colorScale[d.sentiment] || '#334155')
      .attr('fill-opacity', d => d.id === currentNode ? 1 : 0.1)
      .attr('stroke', d => colorScale[d.sentiment] || '#38bdf8')
      .attr('stroke-width', d => d.id === currentNode ? 4 : 1)
      .style('filter', d => `drop-shadow(0 0 10px ${colorScale[d.sentiment] || '#38bdf8'}30)`);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .style('font-size', d => d.id === currentNode ? '14px' : '10px')
      .style('pointer-events', 'none')
      .text(d => d.title);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      // Mantener "sticky" según el prompt, se suelta con doble clic o se queda ahí d.fx no se anula.
    }

    // Doble clic para soltar
    node.on('dblclick', (event, d) => {
        d.fx = null;
        d.fy = null;
        simulation.alpha(1).restart();
    });

  }, [currentNode, history, filteredTopic]);

  const goBack = () => {
      const prev = history.pop();
      setHistory([...history]);
      setCurrentNode(prev);
  };

  return (
    <div className="w-full h-full flex flex-col p-4 bg-slate-950/20">
      <div className="flex justify-between items-center mb-4 px-4 bg-slate-900/40 p-4 rounded-3xl border border-white/5">
        <div>
           <div className="text-[10px] text-brand-neon font-black tracking-widest uppercase mb-1">Vista B</div>
           <div className="flex items-center gap-2">
             {history.length > 0 && (
                 <button onClick={goBack} className="p-1 hover:bg-slate-800 rounded-full text-brand-neon mr-2">
                   <ChevronLeft size={20} />
                 </button>
             )}
             <h2 className="text-xl font-black text-white">{mockConceptNodes.find(n => n.id === currentNode)?.title.toUpperCase()}</h2>
           </div>
        </div>
        
        <div className="flex gap-4">
           <div className="text-[10px] text-slate-500 font-bold max-w-[200px] text-right">
             Pellízca el nodo para arrastrarlo. <br/> Doble clic para soltar.
           </div>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-slate-950/40 rounded-[30px] border border-white/5">
         <svg ref={svgRef} className="w-full h-full"></svg>

         <AnimatePresence>
           {hoveredNode && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="absolute top-4 right-4 p-4 bg-slate-900/90 backdrop-blur-3xl border border-brand-neon/20 rounded-2xl shadow-2xl z-10 w-56"
             >
                <div className="text-[10px] text-brand-neon font-bold uppercase mb-1">KPIS DE CONCEPTO</div>
                <div className="text-lg font-black text-white mb-2">{hoveredNode.title}</div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] text-slate-400">
                     <span>PARTICIPANTES</span>
                     <span className="text-white font-bold">{Math.floor(Math.random() * 100) + 10}</span>
                   </div>
                   <div className="flex justify-between text-[10px] text-slate-400">
                     <span>ENGAGEMENT</span>
                     <span className="text-emerald-400 font-bold">{Math.floor(Math.random() * 90) + 10}%</span>
                   </div>
                   <div className="flex justify-between text-[10px] text-slate-400">
                     <span>TEMA</span>
                     <span className="text-brand-neon">{filteredTopic || 'General'}</span>
                   </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
}
