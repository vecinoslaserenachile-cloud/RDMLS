import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, Save, Trash2, Code2, Eye, Sparkles, Send, Cpu, Globe, Database, Flame } from 'lucide-react';

export default function IdeaTerminal() {
    const [lang, setLang] = useState('html');
    const [code, setCode] = useState({
        html: `<!-- VLS OS: IDEAS SANDBOX -->
<div class="vls-container">
  <div class="serenito-avatar">🤖</div>
  <h1>Propuesta Ciudadana</h1>
  <p>Escribe tu idea aquí para la Serena 2026...</p>
  <button id="vls-action">ENVIAR A LA NUBE</button>
</div>

<style>
  body { 
    background: #020617; color: white; 
    font-family: 'Outfit', sans-serif;
    display: flex; justify-content: center; align-items: center; 
    height: 100vh; margin: 0;
  }
  .vls-container {
    background: rgba(255,255,255,0.05);
    padding: 3rem; border-radius: 30px;
    border: 2px solid #38bdf8;
    text-align: center; max-width: 400px;
    box-shadow: 0 0 50px rgba(56, 189, 248, 0.2);
  }
  .serenito-avatar { font-size: 3rem; margin-bottom: 1rem; animation: float 3s infinite ease-in-out; }
  h1 { color: #38bdf8; letter-spacing: -1px; }
  button { 
    background: #38bdf8; color: #020617; border: none; 
    padding: 12px 25px; border-radius: 15px; font-weight: 900;
    cursor: pointer; transition: 0.3s; margin-top: 20px;
  }
  button:hover { background: #10b981; transform: scale(1.05); }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
</style>

<script>
  document.getElementById('vls-action').addEventListener('click', () => {
    alert('VLS_CORE: Idea encapsulada correctamente. \\n\\nEnviando al Nodo de Desarrollo...');
  });
</script>`,
        javascript: `// Lógica avanzada VLS
const serenitoIA = {
  version: "3.5.0",
  vision: "Soberanía Digital",
  sayHello: () => {
    console.log("¡Hola desde el motor VLS!");
    return "Serenito Activo";
  }
};

console.log(serenitoIA.sayHello());`,
        css: `/* Estilos Globales ComunaSmart */
:root {
  --vls-primary: #38bdf8;
  --vls-secondary: #10b981;
}

.card-digital {
  background: linear-gradient(135deg, var(--vls-primary), var(--vls-secondary));
  padding: 2rem;
  border-radius: 20px;
}`,
        python: `# VLS AI Predictor (Simulado)
import random

def predecir_impacto(idea):
    score = random.randint(80, 100)
    return f"Impacto de '{idea}': {score}% Soberanía"

print(predecir_impacto("Nueva Radio Digital"))`,
        react: `// VLS React Component (Placeholder)
import React from 'react';

const VLSApp = () => {
  return (
    <div className="p-10 bg-slate-900 border-2 border-green-500 rounded-3xl">
       <h1 className="text-3xl text-green-400">VLS React Engine v1.0</h1>
    </div>
  );
};

export default VLSApp;`
    });

    const [srcDoc, setSrcDoc] = useState('');
    const [activeCode, setActiveCode] = useState(code.html);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (lang === 'html') {
                setSrcDoc(activeCode);
            } else {
                // Wrap JS/CSS/Py in HTML for preview
                let wrapped = '';
                if (lang === 'css') wrapped = `<html><style>${activeCode}</style><body><div class="card-digital"><h1>Vista Previa CSS</h1></div></body></html>`;
                else if (lang === 'javascript') wrapped = `<html><body style="background:#000; color:#10b981; font-family:monospace; padding:2rem;"><h3>Consola JS VLS:</h3><pre id="log"></pre><script>const originalLog = console.log; console.log = (...args) => { document.getElementById('log').innerHTML += args.join(' ') + '\\n'; originalLog(...args); }; ${activeCode}</script></body></html>`;
                else if (lang === 'python') wrapped = `<html><body style="background:#020617; color:#fcd34d; font-family:monospace; padding:3rem;"><h3>VLS_PYTHON_RUNNER:</h3><pre>${activeCode}</pre><p style="color:#64748b">Nota: El motor Python requiere VLS-Cloud backend v3.5.</p></body></html>`;
                else if (lang === 'react') wrapped = `<html><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><body style="background:#020617; color:white; font-family:sans-serif;"><div id="root"></div><script type="text/babel">const App = () => <div><h1 style="color:#61dafb">VLS React Sandbox</h1><p>Demo activa mediante Babel CDN</p></div>; const root = ReactDOM.createRoot(document.getElementById('root')); root.render(<App />);</script></body></html>`;
                setSrcDoc(wrapped);
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [activeCode, lang]);

    const handleLangChange = (l) => {
        // Save current code
        setCode(prev => ({ ...prev, [lang]: activeCode }));
        setLang(l);
        setActiveCode(code[l]);
    };

    return (
        <div className="idea-terminal-layout" style={{ display: 'grid', gap: '2rem', height: '100%', minHeight: '700px', background: '#020617', borderRadius: '40px', padding: '2rem', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
            
            {/* EDITOR SIDE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '1rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Terminal size={20} color="#38bdf8" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '2px', color: '#38bdf8' }}>VLS_IDEAS_ENGINE.sh</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {['html', 'css', 'javascript', 'python', 'react'].map(l => (
                            <button 
                                key={l}
                                onClick={() => handleLangChange(l)}
                                style={{ 
                                    background: lang === l ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                                    border: lang === l ? '1px solid #38bdf8' : '1px solid transparent',
                                    color: lang === l ? 'white' : '#64748b',
                                    padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase'
                                }}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
                
                <textarea
                    value={activeCode}
                    onChange={(e) => setActiveCode(e.target.value)}
                    spellCheck="false"
                    style={{
                        flex: 1,
                        background: '#000',
                        color: lang === 'python' ? '#fcd34d' : '#38bdf8',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.95rem',
                        padding: '2rem',
                        borderRadius: '25px',
                        border: '1px solid rgba(56, 189, 248, 0.1)',
                        outline: 'none',
                        resize: 'none',
                        lineHeight: '1.6',
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)'
                    }}
                />
                
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                   <div style={{ flex: 1, background: 'rgba(56, 189, 248, 0.05)', padding: '12px 20px', borderRadius: '15px', border: '1px solid rgba(56, 189, 248, 0.1)', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Cpu size={16} color="#38bdf8" />
                       <span>Compilador VLS Alpha: <strong>Online</strong></span>
                   </div>
                   <button 
                        className="pulse-vls"
                        style={{ 
                            background: 'linear-gradient(90deg, #38bdf8, #10b981)', 
                            color: '#020617', border: 'none', 
                            padding: '12px 30px', borderRadius: '15px', fontWeight: 900, 
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                            boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)'
                        }}
                    >
                        <Send size={20} /> ENVIAR AL VLS-CLOUD
                    </button>
                </div>
            </div>

            {/* PREVIEW SIDE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '1rem 1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Eye size={20} color="#10b981" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '2px', color: '#10b981' }}>PREVIEW_HOT_RELOAD.run</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Globe size={16} color="#64748b" />
                        <Database size={16} color="#64748b" />
                    </div>
                </div>
                
                <div style={{ flex: 1, background: '#fff', borderRadius: '30px', overflow: 'hidden', border: '6px solid rgba(56, 189, 248, 0.15)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative' }}>
                    <iframe
                        key={lang}
                        srcDoc={srcDoc}
                        title="VLS Preview"
                        sandbox="allow-scripts"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    />
                    {lang === 'python' && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', background: 'rgba(252, 211, 77, 0.9)', color: '#020617', fontSize: '0.7rem', fontWeight: 'bold', textAlign: 'center' }}>
                           ⚠️ MOTOR PYTHON_VLS_WASM EN CARGA...
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                .pulse-vls { animation: pulse-vls-anim 2s infinite; }
                @keyframes pulse-vls-anim { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
                
                .idea-terminal-layout { grid-template-columns: minmax(400px, 1fr) 1fr; }
                @media (max-width: 1024px) {
                    .idea-terminal-layout { grid-template-columns: 1fr !important; padding: 1rem !important; gap: 1rem !important; }
                }
            `}</style>
        </div>
    );
}
