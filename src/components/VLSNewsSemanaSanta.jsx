import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, Share2, ArrowDown, Globe, BookOpen, Quote,
  ChevronDown, ChevronRight, MapPin, Music, Heart, Church,
  Twitter, Facebook, Linkedin, Layers, Star, Brain
} from 'lucide-react';
import CommentSection from './CommentSection';

/* ─── DATA ─────────────────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'origen', emoji: '✡️', color: '#6366f1',
    title: 'El Origen: Un evento que partió la historia en dos',
    content: `Históricamente, la Semana Santa conmemora la Pasión, Muerte y Resurrección de Jesús de Nazaret. Sus raíces se hunden en la festividad judía de la Pascua (Pésaj), que celebra la liberación del pueblo hebreo de la esclavitud en Egipto.

Fue en el Concilio de Nicea (año 325 d.C.) donde la Iglesia, ya consolidada en el Imperio Romano, estableció la fecha de esta conmemoración: el primer domingo después de la primera luna llena de la primavera en el hemisferio norte. Por esto, la Semana Santa cambia de fecha cada año.`,
    dato: 'La palabra "Pascua" viene del hebreo Pésaj, que significa "paso" o "salto", aludiendo al paso del ángel exterminador sobre los hogares hebreos marcados con sangre de cordero.'
  },
  {
    id: 'mundo', emoji: '🌍', color: '#10b981',
    title: 'Una conmemoración a escala global',
    content: `Con la expansión del cristianismo, la forma de recordar estos días adquirió matices únicos en cada continente. En España, especialmente en Andalucía, las procesiones con cofradías, capirotes y pasos monumentales son un espectáculo de devoción y arte barroco. En Roma, el epicentro católico, el Vía Crucis en el Coliseo liderado por el Papa es el evento central.

En Filipinas, el país con más católicos de Asia, la devoción llega a extremos físicos, con representaciones hiperrealistas que incluyen crucifixiones y flagelaciones voluntarias. En África, comunidades coptas en Egipto y ortodoxos viven la celebración con liturgias antiquísimas cantadas en arameo o copto, centradas profundamente en el ayuno estricto y la vigilia.`,
    dato: 'Más de 2.000 millones de personas celebran la Semana Santa en el mundo, convirtiéndola en una de las festividades religiosas más masivas de la humanidad.'
  },
  {
    id: 'latam', emoji: '🌎', color: '#f59e0b',
    title: 'Sincretismo en Latinoamérica: Color, Sangre y Tierra',
    content: `Cuando los españoles llegaron a América, trajeron consigo la cruz y la espada. La catequización de los pueblos originarios utilizó la teatralidad de la Semana Santa europea para enseñar la historia de Jesús. Sin embargo, América Latina no fue un receptor pasivo.

Se produjo un fascinante sincretismo religioso. Las deidades indígenas, los ciclos agrícolas y las tradiciones africanas traídas por los esclavos se fundieron con la liturgia católica. En México, la representación de Iztapalapa congrega a millones. En Perú y Bolivia, las procesiones andinas visten a Cristo y la Virgen con mantos de telares locales, mientras bandas de bronces mezclan el luto católico con la melancolía del altiplano.`,
    dato: 'La procesión de Iztapalapa en Ciudad de México congrega más de 2 millones de personas cada año, siendo considerada la representación de la Pasión más grande del mundo.'
  },
  {
    id: 'chile', emoji: '🇨🇱', color: '#ef4444',
    title: 'La Semana Santa en Chile: De la Colonia a nuestra mesa',
    content: `En nuestro país, la Semana Santa tiene un carácter que oscila entre el recogimiento heredado de la austeridad colonial y tradiciones muy propias de nuestra geografía y folclore.

La prohibición católica de comer carnes rojas se transformó en un festín de los productos de nuestra costa. La empanada de mariscos, el pescado frito, el caldillo de congrio o las machas a la parmesana pasaron de ser un "sacrificio" a una de las tradiciones culinarias familiares más esperadas del año.`,
    dato: 'El caldillo de congrio fue inmortalizado por Pablo Neruda en su "Oda al Caldillo de Congrio", convirtiéndose en uno de los platos más emblemáticos de la cultura chilena.'
  },
];

const TRADITIONS_CHILE = [
  {
    icon: '🔥', title: 'Quema de Judas',
    desc: 'Tradición colonial, hoy menos común pero aún viva en ciertos cerros de Valparaíso y barrios antiguos. Se confecciona un muñeco que se quema el Domingo de Resurrección, simbolizando la purificación y el castigo a la traición.',
    color: '#ef4444'
  },
  {
    icon: '🐟', title: 'Menú de Resguardo',
    desc: 'Chile abrazado por el mar convirtió la abstinencia de carnes rojas en un festín costero. Empanadas de mariscos, pescado frito, caldillo de congrio y machas a la parmesana son las estrellas inevitables de las mesas familiares.',
    color: '#3b82f6'
  },
  {
    icon: '🐴', title: 'Cuasimodo',
    desc: 'Quizás la tradición más exclusivamente chilena. Nace en la Colonia cuando los sacerdotes llevaban la comunión a enfermos. Como los caminos eran peligrosos, los huasos escoltaban al cura a caballo. Hoy, miles de cuasimodistas cabalgan escoltando la eucaristía.',
    color: '#10b981'
  },
];

const WORLD_MAP = [
  { region: 'España (Sevilla)', icon: '🕯️', custom: 'Procesiones con cofradías y pasos monumentales', bg: '#7f1d1d' },
  { region: 'Filipinas', icon: '✝️', custom: 'Representaciones con crucifixiones voluntarias reales', bg: '#1e3a5f' },
  { region: 'México (Iztapalapa)', icon: '🎭', custom: '2 millones de espectadores en drama comunitario', bg: '#14532d' },
  { region: 'Egipto (Coptos)', icon: '📜', custom: 'Liturgias en copto y arameo con ayuno de 55 días', bg: '#92400e' },
  { region: 'Bolivia / Perú', icon: '🎺', custom: 'Bandas de bronce fusionando luto y melancolía andina', bg: '#312e81' },
  { region: 'Chile', icon: '🐎', custom: 'Cuasimodo: caballería escoltando la eucaristía', bg: '#7f1d1d' },
];

const QUIZ = [
  { q: '¿En qué año el Concilio de Nicea estableció la fecha de la Semana Santa?', opts: ['325 d.C.', '451 d.C.', '787 d.C.', '100 d.C.'], ans: 0 },
  { q: '¿Qué conmemora la festividad judía Pésaj que inspiró la Semana Santa?', opts: ['La creación del mundo', 'La liberación del pueblo hebreo de Egipto', 'El diluvio universal', 'La llegada a la Tierra Prometida'], ans: 1 },
  { q: '¿Cuál es la tradición más exclusivamente chilena de Semana Santa?', opts: ['La Quema de Judas', 'La empanada de mariscos', 'El Cuasimodo', 'El Vía Crucis'], ans: 2 },
  { q: '¿En qué país asiático se realizan crucifixiones reales durante Semana Santa?', opts: ['India', 'Japón', 'Tailandia', 'Filipinas'], ans: 3 },
];

/* ─── COMPONENTE ────────────────────────────────────────────────────── */
export default function VLSNewsSemanaSanta({ onClose }) {
  const [scrollProgress, setScrollProgress]   = useState(0);
  const [expandSection, setExpandSection]     = useState(null);
  const [quizIdx, setQuizIdx]                 = useState(0);
  const [quizAnswered, setQuizAnswered]        = useState(false);
  const [quizSelected, setQuizSelected]        = useState(null);
  const [quizScore, setQuizScore]              = useState(0);
  const [quizDone, setQuizDone]                = useState(false);
  const [shared, setShared]                    = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    console.log("VLSNewsSemanaSanta Portal Mounted OK");
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    
    let lastProgress = 0;
    const handleScroll = () => {
      const el = document.getElementById('ss-scroll');
      if (el) {
        const progress = Math.round((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
        if (Math.abs(progress - lastProgress) >= 1) {
            lastProgress = progress;
            setScrollProgress(progress);
        }
      }
    };
    const el = document.getElementById('ss-scroll');
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        el && el.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleQuiz = (idx) => {
    if (quizAnswered) return;
    setQuizSelected(idx);
    setQuizAnswered(true);
    if (idx === QUIZ[quizIdx].ans) setQuizScore(s => s + 1);
  };

  const nextQuiz = () => {
    if (quizIdx < QUIZ.length - 1) { setQuizIdx(i => i + 1); setQuizAnswered(false); setQuizSelected(null); }
    else setQuizDone(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Semana Santa · VLS', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return typeof document !== 'undefined' ? createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#ffffff',
      zIndex: 2147483647,
      display: 'flex',
      flexDirection: 'column',
      color: '#111827',
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      {/* Barra de progreso */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px', background: 'linear-gradient(90deg,#7c3aed,#ef4444,#f59e0b)', zIndex: 9999, transition: 'width 0.2s' }} />

      {/* HEADER */}
      <header style={{ padding: isMobile ? '0.8rem 1rem' : '1rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', zIndex: 500 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '12px' }}>
          <div style={{ background: '#1a1a1a', color: 'white', padding: '4px 10px', fontWeight: '900', fontSize: isMobile ? '1rem' : '1.1rem', letterSpacing: '-1px' }}>VLS</div>
          {!isMobile && <span style={{ fontWeight: '700', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>INVESTIGACIÓN ESPECIAL · SEMANA SANTA</span>}
        </div>
        <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '15px', alignItems: 'center' }}>
          <button 
            onClick={() => {
               const shareUrl = `${window.location.origin}${window.location.pathname}?news=semanasanta`;
               window.open(`https://wa.me/?text=${encodeURIComponent('Hemeroteca VLS: Semana Santa 2026. Lee aquí: ' + shareUrl)}`, '_blank')
            }}
            style={{ background: '#25D366', color: 'white', border: 'none', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Compartir en WhatsApp"
          >
            <Share2 size={16} />
          </button>
          {!isMobile && (
            <>
              <button className="icon-btn-news"><Twitter size={18} /></button>
              <button className="icon-btn-news"><Facebook size={18} /></button>
            </>
          )}
          <button onClick={onClose} style={{ background: '#7c3aed', border: 'none', color: 'white', padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
            {isMobile ? 'X' : 'CERRAR'} <X size={isMobile ? 14 : 18} />
          </button>
        </div>
      </header>

      {/* SCROLL CONTAINER */}
      <div id="ss-scroll" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>

        {/* ── HERO ── */}
        <section style={{ 
          minHeight: '80vh', 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end', 
          padding: isMobile ? '2.5rem 1.5rem' : '4rem 6rem', 
          background: '#0a0414', 
          color: 'white' 
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <img src="https://images.unsplash.com/photo-1582638562732-2e12b91ef9f8?w=1600&auto=format&fit=crop&q=80" alt="Semana Santa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0414 10%, transparent 70%)' }} />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#7c3aed', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE ESPECIAL</span>
              <span style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>SEMANA SANTA 2026</span>
              <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}><Clock size={13} /> 9 min lectura</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-0.03em', marginBottom: '1.5rem', fontFamily: "'Georgia', serif" }}>
              Más allá de la Fe: Historia, Cultura y Tradición de la{' '}
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Semana Santa
              </span>
              {' '}en Chile y el Mundo
            </h1>
            <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', color: '#d1d5db', maxWidth: '800px', lineHeight: 1.6, fontWeight: '300' }}>
              ¿Qué celebramos realmente estos días? Un viaje histórico que entrelaza Jerusalén, Roma y las tradiciones de nuestro territorio.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem' }}>VLS</div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem' }}>Unidad de Investigación VLS</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>26 DE MARZO, 2026</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── INTRO ── */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
          <p style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', lineHeight: 1.8, color: '#111827', fontFamily: "'Georgia',serif" }}>
            Cada año, el calendario marca una pausa. Para millones, estos días representan la cumbre de su fe; para otros, un momento de reflexión. Esta conmemoración es un fascinante viaje histórico.
          </p>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ background: '#f8fafc', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.5rem' : '2.2rem', fontWeight: '900', marginBottom: '2.5rem' }}>2.000 años de historia</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SECTIONS.map((s, i) => (
                <div key={s.id}>
                  <div
                    onClick={() => setExpandSection(expandSection === s.id ? null : s.id)}
                    style={{
                      background: 'white', borderRadius: '16px', padding: '1.2rem',
                      cursor: 'pointer', border: `2px solid ${expandSection === s.id ? s.color : '#e5e7eb'}`,
                      display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.5rem' }}>{s.emoji}</span>
                      <h3 style={{ margin: 0, fontWeight: '800', fontSize: '1rem' }}>{s.title}</h3>
                    </div>
                    <ChevronDown size={18} />
                  </div>
                  {expandSection === s.id && (
                    <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '1.5rem', borderLeft: `4px solid ${s.color}`, marginTop: '-4px' }}>
                      {s.content.split('\n\n').map((p, pi) => (
                        <p key={pi} style={{ color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRADICIONES CHILE ── */}
        <section style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', marginBottom: '3rem' }}>🇨🇱 Tradiciones Chilenas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {TRADITIONS_CHILE.map((t, i) => (
                <div key={i} style={{ background: 'white', borderTop: `4px solid ${t.color}`, borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{t.icon}</div>
                  <h3 style={{ fontWeight: '800', marginBottom: '0.8rem' }}>{t.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CommentSection themeColor="#7c3aed" reportTitle="Semana Santa 2026 · VLS" />

        <footer style={{ background: '#000', color: 'white', padding: isMobile ? '3rem 1.5rem' : '4rem 6rem', textAlign: 'center' }}>
           <p style={{ fontSize: '0.8rem', color: '#4b5563' }}>VLS Investigative Unit · Soberanía Cultural</p>
        </footer>
      </div>
    </div>,
    document.body
  ) : null;
}
