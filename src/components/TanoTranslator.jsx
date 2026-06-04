import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, ArrowRightLeft, Search, Loader2 } from 'lucide-react';

const DICTIONARY = [
  { it: "Andiamo", cl: "Vamos al toque", es: "Vamos" },
  { it: "Bravissimo", cl: "Bacán", es: "Muy bien" },
  { it: "Ragazzo", cl: "Cabro", es: "Chico" },
  { it: "Ragazza", cl: "Cabra", es: "Chica" },
  { it: "Che cazzo fai?", cl: "¿Qué estai haciendo?", es: "¿Qué haces?" },
  { it: "Ho fame", cl: "Tengo el manso bajón", es: "Tengo hambre" },
  { it: "Non capisco", cl: "No cacho nada", es: "No entiendo" },
  { it: "Perfetto", cl: "Filete", es: "Perfecto" },
  { it: "Amico mio", cl: "Gancho", es: "Amigo mío" },
  { it: "Sono stanco", cl: "Estoy raja", es: "Estoy cansado" },
  { it: "Che noia", cl: "Qué lata", es: "Qué aburrimiento" },
  { it: "Fare casino", cl: "Dejar la escoba", es: "Hacer un lío" },
  { it: "Tranquillo", cl: "Relaja la vena", es: "Tranquilo" },
  { it: "Scherzi?", cl: "¿Me estai webeando?", es: "¿Bromeas?" },
  { it: "Tutto a posto", cl: "Todo tiquitaca", es: "Todo bien" },
  { it: "Certo", cl: "Obvio microbio", es: "Claro" },
  { it: "Figurati", cl: "Dale no más", es: "De nada / No te preocupes" },
  { it: "Che bella festa", cl: "Medio carrete", es: "Qué buena fiesta" },
  { it: "Sono ubriaco", cl: "Estoy curao", es: "Estoy borracho" },
  { it: "Lavorare molto", cl: "Sacarse la cresta", es: "Trabajar mucho" },
];

export const TanoTranslator = () => {
  const [direction, setDirection] = useState('it-cl'); // 'it-cl' or 'cl-it'
  const [searchTerm, setSearchTerm] = useState('');
  const [speaking, setSpeaking] = useState(null);
  const [dynamicTranslation, setDynamicTranslation] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const toggleDirection = () => {
    setDirection(prev => prev === 'it-cl' ? 'cl-it' : 'it-cl');
    setSearchTerm('');
    setDynamicTranslation(null);
  };

  const filteredDict = DICTIONARY.filter(item => {
    const term = searchTerm.toLowerCase();
    return item.it.toLowerCase().includes(term) || item.cl.toLowerCase().includes(term);
  });

  useEffect(() => {
    const term = searchTerm.trim();
    if (term.length > 2 && filteredDict.length === 0) {
      const delayDebounceFn = setTimeout(async () => {
        setIsTranslating(true);
        try {
          const langpair = direction === 'it-cl' ? 'it|es' : 'es|it';
          const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(term)}&langpair=${langpair}`);
          const data = await res.json();
          if (data && data.responseData && data.responseData.translatedText) {
            setDynamicTranslation({
              it: direction === 'it-cl' ? term : data.responseData.translatedText,
              cl: direction === 'cl-it' ? term : data.responseData.translatedText,
              es: "Traducción en línea"
            });
          }
        } catch (e) {
          console.error(e);
        }
        setIsTranslating(false);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setDynamicTranslation(null);
      setIsTranslating(false);
    }
  }, [searchTerm, direction, filteredDict.length]);

  const speak = (text, lang, index) => {
    setSpeaking(index);
    
    const tl = lang === 'es-CL' ? 'es-CL' : 'it'; 
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(text)}&tl=${tl}`;
    
    const audio = new Audio(url);
    audio.onended = () => setSpeaking(null);
    audio.onerror = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onend = () => setSpeaking(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeaking(null);
      }
    };
    audio.play().catch(e => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onend = () => setSpeaking(null);
        window.speechSynthesis.speak(utterance);
      } else {
        setSpeaking(null);
      }
    });
  };

  const renderItem = (item, i) => {
    const isItToCl = direction === 'it-cl';
    const sourceText = isItToCl ? item.it : item.cl;
    const targetText = isItToCl ? item.cl : item.it;
    const sourceLang = isItToCl ? 'it-IT' : 'es-CL';
    const targetLang = isItToCl ? 'es-CL' : 'it-IT';

    return (
      <motion.div 
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{isItToCl ? '🇮🇹 Italiano' : '🇨🇱 Chileno'}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white', marginTop: '0.2rem' }}>{sourceText}</div>
          </div>
          <button onClick={() => speak(sourceText, sourceLang, `source_${i}`)} style={{ background: speaking === `source_${i}` ? '#10b981' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
            <Volume2 size={20} />
          </button>
        </div>
        
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', width: '100%' }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{isItToCl ? '🇨🇱 Chileno' : '🇮🇹 Italiano'}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: isItToCl ? '#fcd34d' : '#10b981', marginTop: '0.2rem' }}>{targetText}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginTop: '0.3rem' }}>{item.es}</div>
          </div>
          <button onClick={() => speak(targetText, targetLang, `target_${i}`)} style={{ background: speaking === `target_${i}` ? '#10b981' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
            <Volume2 size={20} />
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '24px', padding: '2rem', color: 'white', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 900, background: 'linear-gradient(to right, #10b981, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Traductor Chileno-Italiano</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Aprende modismos italianos y traduce cualquier frase.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', fontWeight: 'bold', border: direction === 'it-cl' ? '2px solid #10b981' : '2px solid transparent' }}>
          {direction === 'it-cl' ? '🇮🇹 Italiano' : '🇨🇱 Chileno'}
        </div>
        <button onClick={toggleDirection} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(59,130,246,0.3)' }}>
          <ArrowRightLeft size={24} />
        </button>
        <div style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', fontWeight: 'bold', border: direction === 'cl-it' ? '2px solid #ef4444' : '2px solid transparent' }}>
          {direction === 'it-cl' ? '🇨🇱 Chileno' : '🇮🇹 Italiano'}
        </div>
      </div>

      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 2rem auto', width: '100%' }}>
        <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Busca un modismo o traduce una frase..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', color: 'white', fontSize: '1.1rem', outline: 'none' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredDict.length > 0 ? (
          filteredDict.map((item, i) => renderItem(item, i))
        ) : isTranslating ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', gridColumn: '1 / -1', padding: '3rem', color: '#94a3b8' }}>
            <Loader2 className="animate-spin" size={40} color="#3b82f6" />
            <p>Traduciendo en línea...</p>
          </div>
        ) : dynamicTranslation ? (
          <div style={{ gridColumn: '1 / -1', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
            {renderItem(dynamicTranslation, 'dynamic')}
          </div>
        ) : searchTerm.length > 2 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: '#94a3b8' }}>
            <p>No se encontraron resultados ni se pudo traducir.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem', color: '#94a3b8' }}>
            <p>Escribe al menos 3 letras para buscar o traducir online.</p>
          </div>
        )}
      </div>
    </div>
  );
};

