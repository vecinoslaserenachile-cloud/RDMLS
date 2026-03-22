import React, { useState, useEffect } from 'react';
import { 
    Languages, Mic, Play, Square, 
    Settings, Globe, ShieldCheck, 
    MessageSquare, X, Wifi
} from 'lucide-react';

export default function VLSpeakTranslator({ onClose }) {
    const [isListening, setIsListening] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [targetLang, setTargetLang] = useState('en');

    const languages = [
        { code: 'en', name: 'English (US/UK)', flag: '🇺🇸' },
        { code: 'ht', name: 'Creole (Haití)', flag: '🇭🇹' },
        { code: 'arn', name: 'Mapudungun', flag: '🏳️' },
        { code: 'zh', name: 'Portugués (BR)', flag: '🇧🇷' }
    ];

    const simulateTranslation = () => {
        if (!isListening) {
            setIsListening(true);
            setOriginalText('Detectando audio... hable ahora.');
            setTranslatedText('');
            
            setTimeout(() => {
                setOriginalText('El comparendo de conciliación se realizará en el Juzgado de Policía Local.');
                setIsListening(false);
                
                // Simulación de respuesta del modelo Gemini de AI Studio
                const mockTranslations = {
                    en: 'The conciliation hearing will be held at the Local Police Court.',
                    ht: 'Odyans konsilyasyon an ap fèt nan Tribinal Polis Lokal la.',
                    arn: 'Kiñe tati nutramkawün amuleay ta tati Juzgado de Policía Local mew.'
                };
                setTranslatedText(mockTranslations[targetLang] || 'Translation in progress...');
            }, 3000);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100090, background: 'rgba(2, 6, 23, 0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(15px)' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', borderRadius: '32px', overflow: 'hidden', border: '1px solid #38bdf840' }}>
                
                {/* Header */}
                <div style={{ padding: '1.5rem 2rem', background: 'linear-gradient(90deg, #1e293b, #0f172a)', borderBottom: '1px solid #38bdf830', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#a78bfa', padding: '10px', borderRadius: '12px' }}>
                            <Languages size={24} color="#000" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900' }}>VLSpeak</h2>
                            <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 'bold' }}>TRADUCTOR SIMULTÁNEO TRANSVERSAL</div>
                        </div>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>

                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Language Selector */}
                    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                        {languages.map(lang => (
                            <button 
                                key={lang.code}
                                onClick={() => setTargetLang(lang.code)}
                                style={{ 
                                    padding: '0.8rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', 
                                    background: targetLang === lang.code ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.5)',
                                    color: targetLang === lang.code ? '#38bdf8' : 'white',
                                    whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
                                    fontWeight: targetLang === lang.code ? 'bold' : 'normal'
                                }}
                            >
                                {lang.flag} {lang.name}
                            </button>
                        ))}
                    </div>

                    {/* Simulation Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', minHeight: '150px' }}>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '10px', fontWeight: 'bold' }}>ENTRADA (ES-CL)</div>
                            <div style={{ fontSize: '1.2rem', color: isListening ? '#38bdf8' : 'white', fontStyle: isListening ? 'italic' : 'normal' }}>
                                {originalText || 'Presione el micrófono para iniciar la traducción...'}
                            </div>
                        </div>

                        <div style={{ background: 'rgba(56, 189, 248, 0.05)', borderRadius: '24px', padding: '2rem', border: '1px solid #38bdf840', minHeight: '150px' }}>
                            <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginBottom: '10px', fontWeight: 'bold' }}>SALIDA ({targetLang.toUpperCase()})</div>
                            <div style={{ fontSize: '1.4rem', color: 'white', fontWeight: 'bold' }}>
                                {translatedText}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                         <button 
                            onClick={simulateTranslation}
                            style={{ 
                                width: '80px', height: '80px', borderRadius: '50%', background: isListening ? '#ef4444' : '#38bdf8', 
                                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                cursor: 'pointer', boxShadow: isListening ? '0 0 30px rgba(239, 68, 68, 0.4)' : '0 10px 30px rgba(56, 189, 248, 0.3)',
                                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                         >
                             {isListening ? <Square size={32} color="white" fill="white" /> : <Mic size={32} color="black" fill="black" />}
                         </button>
                    </div>

                    {/* Footer Info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.75rem' }}>
                            <Wifi size={14} color="#10b981" /> LATENCIA: 85ms (Local via Gemini AI Studio)
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.75rem' }}>
                            <ShieldCheck size={14} /> ENCRIPTACIÓN PUNTA A PUNTA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
