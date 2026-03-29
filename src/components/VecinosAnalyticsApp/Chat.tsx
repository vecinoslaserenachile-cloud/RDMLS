import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Sparkles, Image, Camera, AlertCircle, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: '¡Bienvenido a la Plaza Vecinal! Soy Farito, tu guía inteligente. ¿En qué puedo ayudarte hoy?', timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
        })
      });

      const data = await response.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.response || 'No pude procesar tu mensaje.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex gap-6">
      <div className="flex-1 flex flex-col bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 overflow-hidden relative">
        {/* CHAT MESSAGES */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* AVATAR DINÁMICO */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden shrink-0 ${msg.role === 'model' ? 'bg-gradient-to-br from-sky-400 to-sky-600 border border-sky-400/30' : 'bg-slate-700 border border-slate-600'}`}>
                {msg.role === 'model' ? (
                  <img src="/serenito_3d_avatar_render_1773414152010.png" alt="Farito" className="w-full h-full object-cover scale-150" />
                ) : (
                  <User size={20} className="text-slate-300" />
                )}
              </div>

              {/* BURBUJA DE MENSAJE */}
              <div className={`flex flex-col gap-1 max-w-[70%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`px-5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest leading-relaxed ${msg.role === 'model' ? 'bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-tl-none' : 'bg-sky-600 border border-sky-500/30 text-white rounded-tr-none'}`}>
                  {msg.text}
                </div>
                <span className="text-[7px] text-slate-500 font-black tracking-widest opacity-60">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30 animate-pulse">
                <Sparkles size={16} className="text-sky-400" />
              </div>
              <div className="flex items-center gap-2 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 italic text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <Loader2 size={12} className="animate-spin" /> Farito está procesando tu reporte...
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="p-6 bg-slate-900/60 border-t border-slate-800/50 backdrop-blur-md">
          <div className="flex items-center gap-4 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 focus-within:border-sky-500/50 transition-all shadow-inner">
            <button className="p-3 text-slate-500 hover:text-sky-400 hover:bg-sky-500/5 rounded-xl transition-all" title="Adjuntar Registro">
               <Camera size={20} />
            </button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje o reporte..."
              className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-white uppercase tracking-widest placeholder:text-slate-600 px-2"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-white flex items-center justify-center shadow-lg transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-80 flex flex-col gap-4">
         <div className="p-6 bg-slate-900/40 rounded-[2rem] border border-slate-800/50">
           <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Estado del Nodo</h3>
           <div className="space-y-4">
              <div className="flex flex-col gap-2 p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                 <div className="flex items-center justify-between text-[8px] font-black tracking-widest text-slate-500 uppercase">
                    MODERACIÓN IA <span className="text-emerald-400 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ONLINE</span>
                 </div>
                 <div className="text-[10px] font-black text-slate-400 mt-2 uppercase">Filtrando comentarios tóxicos en tiempo real</div>
              </div>

              <div className="p-4 bg-amber-500/5 rounded-2xl border border-amber-500/20 text-[9px] font-bold text-amber-500 leading-normal uppercase flex gap-3">
                 <AlertCircle size={14} className="shrink-0" />
                 Reportar incidentes críticos vía Radar Vecinal para respuesta prioritaria.
              </div>
           </div>
         </div>

         <div className="flex-1 p-6 relative rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-sky-900/20 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
               <img src="/serenito_3d_avatar_render_1773414152010.png" alt="Farito" className="w-40 drop-shadow-2xl animate-bounce-slow" />
               <h3 className="text-md font-black text-white mt-4 uppercase tracking-tighter shadow-sm">FARITO ASSISTANT</h3>
               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-[200px]">Enrutando tus sugerencias hacia los departamentos municipales.</p>
            </div>
         </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
