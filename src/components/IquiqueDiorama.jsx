import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, Globe, Sparkles, BookOpen, Quote, ShieldAlert, Share2 } from 'lucide-react';

function AnchorIcon({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 22V8" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
    );
}

export default function IquiqueDiorama({ onClose }) {
    const [lang, setLang] = useState('es');
    const [isThinking, setIsThinking] = useState(false);

    const narrations = {
        es: {
            title: "¡AL ABORDAJE, MUCHACHOS!",
            event: "Combate Naval de Iquique - 21 de Mayo de 1879",
            speech: "¡Muchachos! La contienda es desigual, pero ánimo y valor. Nunca se ha arriado nuestra bandera ante el enemigo, y espero que esta no sea la ocasión de hacerlo. Por mi parte, yo os aseguro que mientras yo viva, esa bandera flameará en su lugar, y si yo muero, mis oficiales sabrán cumplir con su deber.",
            context: "El salto de Arturo Prat desde la Esmeralda al Huáscar simboliza el honor máximo de la Armada de Chile."
        },
        en: {
            title: "ABOARD, MY MEN!",
            event: "Naval Battle of Iquique - May 21st, 1879",
            speech: "Lads! The struggle is unequal, but have courage and valor. Our flag has never been lowered before the enemy, and I hope this will not be the occasion to do so. For my part, I assure you that as long as I live, that flag will fly in its place, and if I die, my officers will know how to fulfill their duty.",
            context: "Arturo Prat's leap from the Esmeralda to the Huáscar represents the highest honor of the Chilean Navy."
        },
        jp: {
            title: "突撃せよ、若者たちよ！ (Totsugeki seyo!)",
            event: "イキケの海戦 - 1879年5月21日",
            speech: "諸君！戦いは不平等だが、勇気と価値を持って。我々の旗は敵の前で一度も降ろされたことはなく、今回もそうならないことを願う。私としては、私が生きている限りその旗は掲げられ続け、もし私が倒れても、部下たちがその義務を果たしてくれると確信している。",
            context: "アルトゥーロ・プラットの犠牲的精神は、日本の武士道にも通じる名誉の象徴として称えられています。"
        },
        fr: {
            title: "À L'ABORDAGE !",
            event: "Bataille Navale d'Iquique - 21 Mai 1879",
            speech: "Mes enfants ! La lutte est inégale, mais courage et valeur. Jamais notre drapeau n'a été abaissé devant l'ennemi, et j'espère que ce ne será pas l'occasion de le faire. Pour ma part, je vous assure que tant que je vivrai, ce drapeau flottera à sa place, et si je meurs, mes officiers sauront faire leur devoir.",
            context: "Le saut d'Arturo Prat de l'Esmeralda au Huáscar symbolise l'honneur suprême de la Marine Chilienne."
        }
    };

    const playSpeech = () => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setIsThinking(true);
        const utterance = new SpeechSynthesisUtterance(narrations[lang].speech);
        
        const langMap = { es: 'es-CL', en: 'en-US', jp: 'ja-JP', fr: 'fr-FR' };
        utterance.lang = langMap[lang];
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        
        utterance.onend = () => setIsThinking(false);
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        return () => window.speechSynthesis.cancel();
    }, []);

    const current = narrations[lang];

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100060, background: '#050510', color: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                <img src="/combate_naval_iquique_diorama.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Diorama Iquique" />
            </div>

            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, background: 'linear-gradient(to bottom, rgba(5, 5, 16, 0.9), transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', background: '#ef4444', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px #ef444450' }}>
                        <AnchorIcon size={28} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, letterSpacing: '4px', fontWeight: '900', color: '#ef4444' }}>VLS_EPIC_HISTORIA</h2>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6, letterSpacing: '2px' }}>PROYECTO ILUSTRACIÓN 3D - SEREMIX AI</span>
                    </div>
                </div>
                <button onClick={onClose} className="btn-glass" style={{ width: '50px', height: '50px', borderRadius: '50%', color: 'white' }}><X size={30} /></button>
            </div>

            <div style={{ flex: 1, display: 'flex', gap: '2rem', padding: '0 3rem 2rem 3rem', zIndex: 10 }}>
                <div style={{ flex: 1.5, position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '2px solid rgba(239, 68, 68, 0.3)', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>
                    <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} style={{ width: '100%', height: '100%' }}>
                        <img src="/prat_epic_jump_v2.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Arturo Prat al Salto" />
                    </motion.div>
                    <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: 'rgba(0,0,0,0.85)', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #ef4444', maxWidth: '400px', backdropFilter: 'blur(10px)' }}>
                        <span style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{current.event}</span>
                        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900' }}>{current.title}</h3>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.4' }}>{current.context}</p>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {[
                            { id: 'es', label: 'Castellano (Chile)', icon: '🇨🇱' },
                            { id: 'en', label: 'English (Narrator)', icon: '🇺🇸' },
                            { id: 'jp', label: '日本語 (Bushido)', icon: '🇯🇵' },
                            { id: 'fr', label: 'Français (Historique)', icon: '🇫🇷' }
                        ].map(l => (
                            <button key={l.id} onClick={() => setLang(l.id)} style={{ padding: '1rem', border: `2px solid ${lang === l.id ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, background: lang === l.id ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)', color: lang === l.id ? 'white' : '#94a3b8', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '1.5rem' }}>{l.icon}</span>
                                <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{l.label}</span>
                            </button>
                        ))}
                    </div>

                    <div style={{ flex: 1, padding: '2rem', borderRadius: '24px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: 'white', fontSize: '1.2rem', lineHeight: '1.6', fontFamily: 'serif', fontStyle: 'italic', flex: 1 }}>
                            "{current.speech}"
                        </div>
                        <button onClick={playSpeech} style={{ width: '100%', padding: '1.2rem', background: '#ef4444', color: 'white', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <Play size={20} fill="white" /> REPRODUCIR RELATO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
