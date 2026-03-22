import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    Bot, 
    User, 
    Sparkles, 
    MapPin, 
    Phone, 
    ChevronRight,
    Search,
    MessageCircle
} from 'lucide-react';

export default function FaritoChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy Farito, tu guía inteligente de La Serena. ¿En qué puedo ayudarte hoy? Reportar un bache, buscar talleres de oficio o ver el radar vecinal.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          history: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }))
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, perdí la conexión con el Faro. Intenta de nuevo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: 'Radiografía de baches', action: '¿Dónde reporto baches?' },
    { label: 'Radar Vecinal', action: '¿Cómo funciona el radar?' },
    { label: 'Escuela de Oficios', action: 'Talleres disponibles' },
    { label: 'Emergencia', action: 'Números de ayuda' },
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-slate-900/40 rounded-[30px] overflow-hidden border border-white/5">
      
      {/* Sidebar Suggestions */}
      <div className="w-full md:w-64 bg-slate-950/40 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-col">
         <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-brand-neon rounded-lg text-slate-950"><Search size={16}/></div>
            <span className="text-xs font-black text-white uppercase tracking-widest">Enrutador Inteligente</span>
         </div>
         
         <div className="space-y-2 flex-1 overflow-y-auto">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => setInput(s.action)}
                className="w-full text-left p-3 rounded-xl bg-slate-900/50 hover:bg-brand-neon hover:text-slate-950 text-slate-300 text-[10px] font-bold uppercase transition-all flex justify-between items-center group"
              >
                {s.label}
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all"/>
              </button>
            ))}
         </div>
         
         <div className="mt-4 p-4 bg-brand-neon/5 border border-brand-neon/20 rounded-2xl">
            <div className="text-[10px] text-brand-neon font-black uppercase mb-1">Farito Tip</div>
            <p className="text-[9px] text-slate-400 leading-relaxed italic">"Si ves una luminaria apagada, usa el Radar Vecinal para georreferenciarla al instante."</p>
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900/20">
         <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            <AnimatePresence>
               {messages.map((m, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: m.role === 'assistant' ? -10 : 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                 >
                    <div className={`flex gap-3 max-w-[85%] ${m.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'assistant' ? 'bg-brand-neon text-slate-950 shadow-lg shadow-brand-neon/20' : 'bg-slate-700'}`}>
                          {m.role === 'assistant' ? <Bot size={18}/> : <User size={18}/>}
                       </div>
                       
                       <div className={`p-4 rounded-3xl text-sm leading-relaxed ${m.role === 'assistant' ? 'bg-slate-800 text-slate-100 rounded-tl-sm' : 'bg-brand-neon/20 border border-brand-neon/30 text-white rounded-tr-sm'}`}>
                          {m.content}
                       </div>
                    </div>
                 </motion.div>
               ))}
               {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                     <div className="p-4 bg-slate-800 rounded-2xl flex gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-bounce"/>
                        <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
                        <span className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}/>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
         
         {/* Input Area */}
         <div className="p-4 border-t border-white/5 bg-slate-950/20">
            <div className="max-w-3xl mx-auto flex gap-2 p-1.5 bg-slate-800 border border-brand-neon/20 rounded-3xl shadow-2xl focus-within:border-brand-neon transition-all">
               <input 
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 onKeyPress={e => e.key === 'Enter' && sendMessage()}
                 placeholder="Pregúntale a Farito..."
                 className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4"
               />
               <button 
                 onClick={sendMessage}
                 className="p-3 bg-brand-neon text-slate-950 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg"
               >
                 <Send size={20} />
               </button>
            </div>
         </div>
      </div>

    </div>
  );
}
