import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Network, MousePointer2, Focus, Target, HelpCircle, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  group: number;
  val: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

const DATA = {
  nodes: [
    { id: '1', name: 'TRANSPORTE PÚBLICO', group: 1, val: 30 },
    { id: '2', name: 'LÍNEA 5', group: 1, val: 15 },
    { id: '3', name: 'LÍNEA 33', group: 1, val: 12 },
    { id: '4', name: 'INFRAESTRUCTURA', group: 2, val: 25 },
    { id: '5', name: 'CALLES RURALES', group: 2, val: 18 },
    { id: '6', name: 'CICLOVÍAS', group: 2, val: 20 },
    { id: '7', name: 'SEGURIDAD VIAL', group: 3, val: 22 },
    { id: '8', name: 'SEMAFORIZACIÓN', group: 3, val: 14 },
    { id: '9', name: 'ILUMINACIÓN', group: 3, val: 16 },
  ],
  links: [
    { source: '1', target: '2', value: 10 },
    { source: '1', target: '3', value: 8 },
    { source: '4', target: '5', value: 12 },
    { source: '4', target: '6', value: 9 },
    { source: '1', target: '4', value: 15 },
    { source: '7', target: '1', value: 7 },
    { source: '7', target: '8', value: 11 },
    { source: '7', target: '9', value: 13 },
  ]
};

export default function VisualConceptMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 500;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Zoom setup
    const g = svg.append('g');
    svg.call(d3.zoom<SVGSVGElement, any>()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => g.attr('transform', event.transform)));

    const links = DATA.links.map(d => ({ ...d })) as Link[];
    const nodes = DATA.nodes.map(d => ({ ...d })) as Node[];

    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        linkLines.attr('x1', d => ((d.source as unknown) as Node).x || 0)
                 .attr('y1', d => ((d.source as unknown) as Node).y || 0)
                 .attr('x2', d => ((d.target as unknown) as Node).x || 0)
                 .attr('y2', d => ((d.target as unknown) as Node).y || 0);

        nodeGroups.attr('transform', d => `translate(${d.x},${d.y})`);
      });

    const linkLines = g.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5);

    const nodeGroups = g.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .on('click', (event, d) => setSelectedNode(d))
      .on('dblclick', (event, d) => {
        d.fx = null;
        d.fy = null;
        simulation.alpha(1).restart();
      })
      .call(d3.drag<SVGGElement, Node>()
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
        })
      );

    const colorScale = d3.scaleOrdinal(d3.schemeSpectral[10]);

    // Circle Shape
    nodeGroups.append('circle')
      .attr('r', d => 10 + d.val/2)
      .attr('fill', d => colorScale(d.group.toString()))
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer');

    // Aura
    nodeGroups.append('circle')
      .attr('r', d => 15 + d.val/2)
      .attr('fill', d => colorScale(d.group.toString()))
      .attr('opacity', 0.1)
      .attr('filter', 'blur(6px)');

    // Label
    nodeGroups.append('text')
      .text(d => d.name)
      .attr('dy', d => -20 - d.val/2)
      .attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8')
      .attr('font-size', '8px')
      .attr('font-weight', 'black')
      .style('pointer-events', 'none')
      .style('text-transform', 'uppercase');

  }, []);

  return (
    <div className="w-full h-full flex gap-6">
      <div className="flex-1 bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase">
             <Network className="text-emerald-400" size={24} /> Esquema de Conceptos
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Mapa de problemáticas estructurales</p>
        </div>

        <div className="absolute top-8 right-8 z-10 flex gap-2">
           <button className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700/50 text-[10px] font-black tracking-tighter transition-all flex items-center gap-2 uppercase">
              <Focus size={14} /> Re-Centrar
           </button>
        </div>

        <svg ref={svgRef} className="w-full h-full" />

        <div className="absolute bottom-8 left-8 p-4 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-slate-800 text-[10px] font-bold text-slate-500 animate-pulse uppercase">
           💡 Doble clic para soltar un nodo fijado
        </div>
      </div>

      <div className="w-80 flex flex-col gap-4">
         <div className="p-6 bg-slate-900/40 rounded-[2rem] border border-slate-800/50">
           <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Ayuda Interactiva</h3>
           <div className="space-y-4">
              <HelpItem icon={<MousePointer2 size={16} />} title="ARRASTRAR" desc="Fija el nodo en una posición específica de interés." />
              <HelpItem icon={<Target size={16} />} title="CLIC" desc="Focaliza el análisis en una problemática secundaria." />
              <HelpItem icon={<LayoutGrid size={16} />} title="SCROLL" desc="Usa el zoom para explorar la red estructural." />
           </div>
         </div>

         <AnimatePresence>
            {selectedNode && (
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="flex-1 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-[2rem] border border-emerald-500/30 shadow-2xl shadow-emerald-500/10"
               >
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg">
                        <Network size={20} />
                     </div>
                     <h3 className="text-sm font-black text-white uppercase">{selectedNode.name}</h3>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Impacto Sistémico</div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: `${selectedNode.val * 3}%` }} />
                        </div>
                     </div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose mt-4">
                        Este nodo está conectado a 4 problemáticas críticas de infraestructura ciudadana.
                     </p>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}

function HelpItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-emerald-400 opacity-60 mt-1">{icon}</div>
      <div>
        <div className="text-[10px] font-black text-slate-300 uppercase leading-none mb-1">{title}</div>
        <div className="text-[9px] text-slate-500 font-bold leading-tight">{desc}</div>
      </div>
    </div>
  );
}
