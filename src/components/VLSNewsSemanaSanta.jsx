import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, Share2, ArrowDown, Globe, BookOpen, Quote,
  ChevronDown, ChevronRight, MapPin, Music, Heart, Church,
  Twitter, Facebook, Linkedin, Layers, Star
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

  useEffect(() => {
    document.title = 'Semana Santa: Historia, Cultura y Tradición · VLS';
    const el = document.getElementById('ss-scroll');
    if (!el) return;
    const h = () => setScrollProgress((el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100);
    el.addEventListener('scroll', h);
    return () => el.removeEventListener('scroll', h);
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

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 2000000, display: 'flex', flexDirection: 'column', fontFamily: "'Inter', system-ui, sans-serif", color: '#111827' }}>

      {/* Barra de progreso */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px', background: 'linear-gradient(90deg,#7c3aed,#ef4444,#f59e0b)', zIndex: 9999, transition: 'width 0.2s' }} />

      {/* HEADER */}
      <header style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(10px)', zIndex: 50, position: 'sticky', top: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#1a1a1a', color: 'white', padding: '4px 10px', fontWeight: '900', fontSize: '1.1rem', letterSpacing: '-1px' }}>VLS</div>
          <span style={{ fontWeight: '700', fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '1px' }}>INVESTIGACIÓN ESPECIAL · SEMANA SANTA</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={handleShare} style={{ padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: '20px', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: '600' }}>
            <Share2 size={14} /> {shared ? '¡Copiado!' : 'Compartir'}
          </button>
          <button onClick={() => window.print()} style={{ padding: '6px 14px', border: '1px solid #e5e7eb', borderRadius: '20px', background: 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}>🖨️</button>
          <button onClick={onClose} style={{ background: '#7c3aed', border: 'none', color: 'white', padding: '7px 18px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            CERRAR <X size={14} />
          </button>
        </div>
      </header>

      {/* SCROLL CONTAINER */}
      <div id="ss-scroll" style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: '92vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2rem,5vw,5rem) clamp(1.5rem,6vw,6rem)', background: '#0a0414', color: 'white' }}>
          {/* Fondo gradiente animado */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)', top: '-100px', left: '-100px', filter: 'blur(60px)' }} />
            <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)', bottom: '100px', right: '0', filter: 'blur(60px)' }} />
            <img src="https://images.unsplash.com/photo-1582638562732-2e12b91ef9f8?w=1600&auto=format&fit=crop&q=80" alt="Semana Santa" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0414 30%, rgba(10,4,20,0.6) 70%)' }} />
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#7c3aed', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE ESPECIAL</span>
              <span style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>SEMANA SANTA 2026</span>
              <span style={{ color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}><Clock size={13} /> 9 min de lectura</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem,5.5vw,5rem)', fontWeight: '900', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem', fontFamily: "'Georgia', serif" }}>
              Más allá de la Fe: Historia, Cultura y Tradición de la{' '}
              <span style={{ background: 'linear-gradient(135deg,#a78bfa,#f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Semana Santa
              </span>
              {' '}en Chile y el Mundo
            </h1>
            <p style={{ fontSize: 'clamp(1rem,2vw,1.4rem)', color: '#d1d5db', maxWidth: '700px', lineHeight: 1.6, fontWeight: '300' }}>
              ¿Qué celebramos realmente estos días? Más allá de los huevos de chocolate o el fin de semana largo, un fascinante viaje histórico que entrelaza Jerusalén, Roma, la colonización de América y las tradiciones más arraigadas de nuestro territorio.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem' }}>VLS</div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem' }}>Unidad de Investigación VLS</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>26 de Marzo, 2026 · Especial Semana Santa</p>
              </div>
            </div>
          </motion.div>
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
            <ArrowDown size={30} color="rgba(255,255,255,0.4)" />
          </div>
        </section>

        {/* ── INTRO ── */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(2rem,4vw,5rem) 1.5rem' }}>
          <p style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', lineHeight: 1.8, color: '#111827', fontFamily: "'Georgia',serif", fontWeight: '400' }}>
            Cada año, el calendario marca una pausa. Para millones de personas, estos días representan la cumbre de su fe; para otros, un momento de descanso o reflexión. Pero, ¿qué celebramos realmente en Semana Santa? Esta conmemoración es un fascinante viaje histórico que entrelaza la antigua Jerusalén, el Imperio Romano, la colonización de América y las tradiciones más arraigadas de nuestro propio territorio.
          </p>
        </section>

        {/* ── TIMELINE INTERACTIVO ── */}
        <section style={{ background: '#f8fafc', padding: 'clamp(2rem,4vw,4rem) 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: '900', marginBottom: '0.5rem', fontFamily: "'Georgia',serif" }}>
              2.000 años de historia
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Toca cada sección para explorar</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SECTIONS.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div
                    onClick={() => setExpandSection(expandSection === s.id ? null : s.id)}
                    style={{
                      background: 'white', borderRadius: '16px', padding: '1.2rem 1.5rem',
                      cursor: 'pointer', border: `2px solid ${expandSection === s.id ? s.color : '#e5e7eb'}`,
                      boxShadow: expandSection === s.id ? `0 8px 30px ${s.color}22` : '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '1.8rem' }}>{s.emoji}</span>
                      <div>
                        <div style={{ fontSize: '0.6rem', color: s.color, fontWeight: '800', letterSpacing: '1.5px', marginBottom: '2px' }}>SECCIÓN {i + 1}</div>
                        <h3 style={{ margin: 0, fontWeight: '800', fontSize: 'clamp(0.85rem,2vw,1rem)', color: '#111827' }}>{s.title}</h3>
                      </div>
                    </div>
                    <ChevronDown size={18} color={s.color} style={{ transform: expandSection === s.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
                  </div>
                  <AnimatePresence>
                    {expandSection === s.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ background: 'white', borderRadius: '0 0 16px 16px', padding: '1.5rem 1.8rem', borderLeft: `4px solid ${s.color}`, borderRight: `2px solid ${s.color}22`, borderBottom: `2px solid ${s.color}22`, marginTop: '-4px' }}>
                          {s.content.split('\n\n').map((p, pi) => (
                            <p key={pi} style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1rem', fontFamily: "'Georgia',serif" }}>{p}</p>
                          ))}
                          <div style={{ background: `${s.color}0f`, border: `1px solid ${s.color}30`, borderRadius: '12px', padding: '1rem 1.2rem', marginTop: '1rem' }}>
                            <div style={{ fontSize: '0.6rem', color: s.color, fontWeight: '800', letterSpacing: '1.5px', marginBottom: '5px' }}>💡 ¿SABÍAS QUE?</div>
                            <p style={{ margin: 0, color: '#374151', fontSize: '0.85rem', lineHeight: 1.6, fontStyle: 'italic' }}>{s.dato}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAPA MUNDIAL DE TRADICIONES ── */}
        <section style={{ padding: 'clamp(2rem,4vw,4rem) 1.5rem', background: '#0a0414', color: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <Globe size={32} color="#a78bfa" style={{ marginBottom: '0.8rem' }} />
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: '900', margin: '0 0 0.5rem', fontFamily: "'Georgia',serif" }}>El mundo celebra diferente</h2>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>6 expresiones únicas del mismo evento</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1rem' }}>
              {WORLD_MAP.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ background: `${w.bg}88`, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.3rem', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '2rem', flexShrink: 0 }}>{w.icon}</span>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '0.85rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={11} color="#a78bfa" /> {w.region}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#d1d5db', lineHeight: 1.5 }}>{w.custom}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LAS 3 TRADICIONES CHILENAS ── */}
        <section style={{ padding: 'clamp(2rem,4vw,4rem) 1.5rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.4rem,3vw,2.2rem)', fontWeight: '900', marginBottom: '0.5rem', fontFamily: "'Georgia',serif" }}>
              🇨🇱 Las tradiciones más chilenas
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2.5rem', fontSize: '0.85rem' }}>De la colonia a nuestra mesa</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
              {TRADITIONS_CHILE.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  style={{ background: 'white', border: `2px solid ${t.color}22`, borderTop: `4px solid ${t.color}`, borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{t.icon}</div>
                  <h3 style={{ fontWeight: '800', fontSize: '1rem', marginBottom: '0.8rem', color: '#111827' }}>{t.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CITA DESTACADA ── */}
        <section style={{ background: 'linear-gradient(135deg,#4c1d95,#7c3aed)', padding: 'clamp(2.5rem,5vw,5rem) clamp(1.5rem,6vw,6rem)', color: 'white', textAlign: 'center' }}>
          <Quote size={40} color="rgba(255,255,255,0.4)" style={{ margin: '0 auto 1.5rem' }} />
          <blockquote style={{ fontSize: 'clamp(1.2rem,3vw,2.2rem)', fontWeight: '700', fontFamily: "'Georgia',serif", fontStyle: 'italic', maxWidth: '700px', margin: '0 auto 1.5rem', lineHeight: 1.4 }}>
            "La Semana Santa es un espejo de nuestra identidad. Nos muestra cómo una historia nacida en el Medio Oriente cruzó océanos para fundirse con la identidad latinoamericana y chilena."
          </blockquote>
          <cite style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 'bold', letterSpacing: '1px' }}>— Unidad de Investigación VLS, 2026</cite>
        </section>

        {/* ── TRIVIA INTERACTIVA ── */}
        <section style={{ padding: 'clamp(2rem,4vw,4rem) 1.5rem', background: '#f8fafc' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Star size={28} color="#7c3aed" style={{ marginBottom: '0.5rem' }} />
              <h2 style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: '900', marginBottom: '0.3rem', fontFamily: "'Georgia',serif" }}>¿Cuánto sabes de Semana Santa?</h2>
              <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>Trivia interactiva · {QUIZ.length} preguntas</p>
            </div>

            {!quizDone ? (
              <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#7c3aed', fontWeight: '800', letterSpacing: '1px' }}>PREGUNTA {quizIdx + 1} / {QUIZ.length}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>Score: {quizScore} ⭐</span>
                </div>
                <div style={{ height: '4px', background: '#e5e7eb', borderRadius: '2px', marginBottom: '1.5rem' }}>
                  <div style={{ height: '100%', width: `${((quizIdx) / QUIZ.length) * 100}%`, background: '#7c3aed', borderRadius: '2px', transition: 'width 0.4s' }} />
                </div>
                <p style={{ fontWeight: '700', fontSize: '1rem', lineHeight: 1.5, marginBottom: '1.5rem', color: '#111827' }}>{QUIZ[quizIdx].q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {QUIZ[quizIdx].opts.map((opt, i) => {
                    const isCorrect = QUIZ[quizIdx].ans === i;
                    let bg = '#f8fafc'; let border = '#e5e7eb'; let color = '#374151';
                    if (quizAnswered) {
                      if (isCorrect) { bg = '#f0fdf4'; border = '#22c55e'; color = '#166534'; }
                      else if (quizSelected === i) { bg = '#fef2f2'; border = '#ef4444'; color = '#991b1b'; }
                    }
                    return (
                      <button key={i} onClick={() => handleQuiz(i)} style={{
                        background: bg, border: `2px solid ${border}`, color, padding: '0.9rem 1rem',
                        borderRadius: '12px', fontWeight: '600', fontSize: '0.88rem',
                        cursor: quizAnswered ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.25s',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: quizAnswered && isCorrect ? '#22c55e' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '900', color: quizAnswered && isCorrect ? 'white' : '#6b7280', flexShrink: 0 }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizAnswered && (
                  <button onClick={nextQuiz} style={{ width: '100%', marginTop: '1.2rem', background: '#7c3aed', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem' }}>
                    {quizIdx < QUIZ.length - 1 ? 'SIGUIENTE PREGUNTA →' : 'VER RESULTADO 🏆'}
                  </button>
                )}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {quizScore === QUIZ.length ? '🏆' : quizScore >= QUIZ.length / 2 ? '⭐' : '📚'}
                </div>
                <h3 style={{ fontWeight: '900', fontSize: '1.4rem', color: '#111827', marginBottom: '0.5rem' }}>
                  {quizScore}/{QUIZ.length} respuestas correctas
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  {quizScore === QUIZ.length ? '¡Experto en Semana Santa!' : quizScore >= 2 ? '¡Buen conocimiento histórico!' : '¡El artículo te lo explicó todo, reléelo!'}
                </p>
                <button onClick={() => { setQuizIdx(0); setQuizAnswered(false); setQuizSelected(null); setQuizScore(0); setQuizDone(false); }} style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '10px 28px', borderRadius: '20px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                  REPETIR TRIVIA
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── CONCLUSIÓN ── */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) 1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: '900', marginBottom: '1.2rem', fontFamily: "'Georgia',serif" }}>Conclusión</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#374151', fontFamily: "'Georgia',serif", marginBottom: '1.5rem' }}>
            Para nuestra comunidad, la Semana Santa es un espejo de nuestra identidad. Nos muestra cómo una historia nacida en el Medio Oriente cruzó océanos para fundirse con la identidad latinoamericana y chilena. Ya sea que vivas estos días desde la fe profunda en las parroquias locales, desde la tradición en la mesa familiar, o simplemente como un momento de pausa en la vida moderna, la Semana Santa sigue siendo un pilar fundamental para entender de dónde venimos y cómo celebramos nuestra humanidad compartida.
          </p>
          <div style={{ background: '#f3f0ff', border: '1px solid #c4b5fd', borderRadius: '16px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={18} color="#7c3aed" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#5b21b6', fontWeight: '600' }}>
              ¡Felices fiestas a toda la comunidad de Vecinos La Serena! Que esta Semana Santa sea de reflexión, descanso y buena mesa. 🐟🌊
            </p>
          </div>
        </section>

        {/* ── COMPARTIR ── */}
        <section style={{ background: '#1a1a1a', padding: 'clamp(1.5rem,3vw,3rem) 1.5rem', textAlign: 'center', color: 'white' }}>
          <p style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '0.85rem', color: '#9ca3af' }}>COMPARTE ESTE ARTÍCULO</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: Twitter, label: 'Twitter', bg: '#1da1f2' },
              { icon: Facebook, label: 'Facebook', bg: '#1877f2' },
              { icon: Linkedin, label: 'LinkedIn', bg: '#0a66c2' },
            ].map(({ icon: Icon, label, bg }) => (
              <button key={label} style={{ background: bg, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </section>

        {/* ── COMENTARIOS ── */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <CommentSection themeColor="#7c3aed" reportTitle="Semana Santa 2026 · VLS" />
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }
        @media (max-width: 640px) { #ss-scroll article { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
