import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, MapPin, ShieldCheck, TrendingUp, Mic2, Download, 
  Play, Pause, Globe, Cpu, Users, ChevronRight, Share2, 
  Volume2, Music, Target, Briefcase, ChevronDown
} from 'lucide-react';

const COLORS = {
  navy: '#0f172a',
  gold: '#fbbf24',
  accent: '#3b82f6',
  white: '#ffffff',
  muted: '#94a3b8'
};

const PILLARS = [
  {
    icon: Globe,
    title: "Descentralización Real",
    desc: "Lucha frontal contra el 'factor centralismo'. Empoderamiento de los 16 comités territoriales con voz y voto efectivo.",
    detail: "Basta de estaciones repetidoras sin identidad. Solange defiende la soberanía informativa desde las regiones hacia Santiago."
  },
  {
    icon: Cpu,
    title: "Innovación Digital",
    desc: "Implementación de la 'App Innovación y Desarrollo' para streaming de audio/video y publicidad autogestionada.",
    detail: "Alianza con Google para capacitación masiva y herramientas de monetización directa para radios locales."
  },
  {
    icon: TrendingUp,
    title: "Gestión y Eficiencia",
    desc: "Transparencia financiera garantizada. Desburocratización de pagos SCD vía Internet y Portal de Miembros.",
    detail: "Como Tesorera Nacional, Solange ya ha demostrado orden y eficiencia. Ahora llevará esa transparencia a la presidencia."
  },
  {
    icon: ShieldCheck,
    title: "Defensa Gremial",
    desc: "Protección inquebrantable de la radiodifusión privada frente a la competencia desleal del Estado.",
    detail: "Rechazo firme al proyecto de radios públicas privilegiadas y defensa de la banda 86-88 MHz."
  }
];

// Componente Custom para Audio (Estilo Chequia Premium)
const PremiumAudioPlayer = ({ title, subtitle, src, icon: Icon, colorClass, gradientClass }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.03)', 
      border: '1px solid rgba(255,255,255,0.05)', 
      borderRadius: '25px', 
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }} className="hover:-translate-y-1 hover:shadow-2xl">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ 
          width: '60px', height: '60px', borderRadius: '20px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${gradientClass[0]}, ${gradientClass[1]})`,
          boxShadow: `0 10px 20px ${gradientClass[0]}40`
        }}>
          <Icon size={30} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: colorClass, fontSize: '0.7rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '5px' }}>
            {subtitle}
          </div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
            {title}
          </h4>
        </div>
        
        <button 
          onClick={togglePlay}
          style={{
            width: '50px', height: '50px', borderRadius: '50%',
            background: isPlaying ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)',
            border: `1px solid ${isPlaying ? '#ef4444' : '#3b82f6'}`,
            color: isPlaying ? '#ef4444' : '#3b82f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
            outline: 'none'
          }}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" style={{ marginLeft: '4px' }} />}
        </button>
      </div>

      {/* Progress Bar Custom */}
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', position: 'relative', marginTop: '10px' }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`,
          background: colorClass, transition: 'width 0.1s linear', borderRadius: '10px'
        }} />
      </div>
    </div>
  );
};


const ArchiCampaign = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ 
        position: 'fixed', inset: 0, zIndex: 100080, background: '#0f172a', 
        display: 'block', overflowY: 'auto', paddingBottom: isMobile ? '80px' : '40px',
        fontFamily: '"Outfit", sans-serif', color: 'white', scrollBehavior: 'smooth'
    }}>
      
      {/* ── HEADER PREMIUM (Estilo Chequia) ── */}
      <header style={{ 
          position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15, 23, 42, 0.9)', 
          backdropFilter: 'blur(20px)', padding: isMobile ? '1rem' : '1.2rem 2.5rem', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          borderBottom: '1px solid rgba(251, 191, 36, 0.2)' 
      }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '15px' }}>
              <div style={{ background: '#fbbf24', padding: isMobile ? '6px' : '10px', borderRadius: '12px', boxShadow: '0 0 20px rgba(251, 191, 36, 0.4)' }}>
                  <Radio size={isMobile ? 18 : 24} color="#0f172a" />
              </div>
              <div>
                  <h1 style={{ color: 'white', fontSize: isMobile ? '1rem' : '1.4rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '0.1rem', letterSpacing: '-0.5px', margin: 0 }}>
                      ARCHI <span style={{ color: '#fbbf24' }}>NACIONAL</span>
                  </h1>
                  <div style={{ display: 'flex', gap: isMobile ? '5px' : '15px', color: '#fbbf24', fontSize: isMobile ? '0.6rem' : '0.85rem', fontWeight: 'bold', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📡 ELECCIONES 2025</span>
                      <span style={{ opacity: 0.5 }}>|</span>
                      <span style={{ color: '#ef4444' }}>SOLANGE GÓMEZ</span>
                      {!isMobile && (
                        <>
                          <span style={{ opacity: 0.5 }}>|</span>
                          <span>NUEVA ENERGÍA</span>
                        </>
                      )}
                  </div>
              </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                  onClick={() => {
                      const shareData = {
                          title: 'Solange Gómez: Presidenta ARCHI',
                          text: 'Únete a la Lista Nueva Energía. Verdadera Independencia, Fuerza Regional.',
                          url: 'https://radiovecinos.cl'
                      };
                      if (navigator.share) {
                          navigator.share(shareData);
                      } else {
                          navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                          alert('Link y mensaje copiados al portapapeles');
                      }
                  }}
                  style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.5)', padding: isMobile ? '8px 12px' : '10px 20px', borderRadius: '15px', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                  <Share2 size={16} /> COMPARTIR
              </button>
              <button onClick={() => window.location.href = '/'} style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: isMobile ? '8px 12px' : '10px 20px', borderRadius: '15px', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: '900', cursor: 'pointer' }}>
                  INICIO VLS
              </button>
          </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section style={{ position: 'relative', minHeight: isMobile ? 'auto' : '65vh', background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '5rem', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                  <span style={{ background: '#fbbf24', color: '#0f172a', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 900, marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}><TrendingUp size={14}/> HITO HISTÓRICO: PRIMERA MUJER PRESIDENTA</span>
                  <h2 style={{ fontSize: isMobile ? '3.5rem' : '5rem', fontWeight: 900, lineHeight: 0.9, marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
                    SOLANGE <br/> <span style={{ color: '#fbbf24' }}>GÓMEZ</span>
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 500 }}>
                      "Verdadera Independencia, <strong style={{color: 'white'}}>Fuerza Regional</strong> para liderar ARCHI."<br/>
                      Únete a la Lista Nueva Energía y dejemos atrás más de 90 años de monopolio.
                  </p>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      <a 
                          href="/archi-media/plan_gobierno.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ background: '#fbbf24', color: '#0f172a', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)' }}
                      >
                          PLAN DE GOBIERNO <Download size={18} />
                      </a>
                      <button 
                          onClick={() => document.getElementById('activos').scrollIntoView({ behavior: 'smooth' })}
                          style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.5)', padding: '1rem 2rem', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                      >
                          <Music size={18} /> MULTIMEDIA
                      </button>
                  </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, #fbbf2430 0%, transparent 70%)', filter: 'blur(40px)' }} />
                  <img 
                      src="/archi-media/poster.jpg" 
                      alt="Solange Gómez - Lista Nueva Energía" 
                      style={{ 
                          width: '100%', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', 
                          boxShadow: '0 30px 60px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1 
                      }} 
                  />
                  <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 20, maxWidth: '200px' }}>
                    <div style={{ color: '#fbbf24', fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>90+</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' }}>Años de monopolio que vamos a romper</div>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* ── EJES DE TRANSFORMACIÓN (Almanaque Style) ── */}
      <section style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 5.5rem', background: '#0b1120', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>EJES DE <span style={{ color: '#fbbf24' }}>TRANSFORMACIÓN</span></h3>
                  <p style={{ color: '#64748b', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem', marginTop: '10px' }}>VISIÓN ESTRATÉGICA ARCHI 2025</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                  {PILLARS.map((p, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem 1.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease' }} className="hover:-translate-y-2 hover:bg-slate-800">
                          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                            <p.icon size={150} />
                          </div>
                          <div style={{ background: 'rgba(251, 191, 36, 0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <p.icon size={30} color="#fbbf24" />
                          </div>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', margin: '0 0 1rem 0' }}>{p.title}</h4>
                          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* ── SECCIÓN MULTIMEDIA (ATLAS STYLE REPLACEMENT) ── */}
      <section id="activos" style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 5.5rem', background: '#0f172a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>MATERIAL DE <span style={{ color: '#fbbf24' }}>CAMPAÑA</span></h3>
                  <p style={{ color: '#64748b', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    ACTIVOS OFICIALES PARA RADIODIFUSORES
                    <a href="/archi-media/playlist.m3u" style={{ color: '#fbbf24', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                       (Descargar M3U <Download size={14}/>)
                    </a>
                  </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '2rem' }}>
                  <PremiumAudioPlayer 
                    title="¿Por qué Chile confía en la Radio?"
                    subtitle="Podcast Oficial"
                    src="/archi-media/podcast.m4a"
                    icon={Mic2}
                    colorClass="#3b82f6"
                    gradientClass={['#2563eb', '#1e3a8a']}
                  />
                  <PremiumAudioPlayer 
                    title="La Sole Gómez"
                    subtitle="Jingle Remasterizado"
                    src="/archi-media/jingle_remastered.mp3"
                    icon={Music}
                    colorClass="#fbbf24"
                    gradientClass={['#f59e0b', '#b45309']}
                  />
                  <PremiumAudioPlayer 
                    title="Sole Presidenta ARCHI"
                    subtitle="Jingle Alternativo"
                    src="/archi-media/RADIO%20MP3/Sole%20Presidenta%20(Remastered).mp3"
                    icon={Radio}
                    colorClass="#ef4444"
                    gradientClass={['#ef4444', '#7f1d1d']}
                  />
              </div>
          </div>
      </section>

      {/* ── FOOTER SOBERANO ── */}
      <footer style={{ 
          background: '#020617', padding: isMobile ? '4rem 1.5rem' : '6rem 5.5rem', 
          borderTop: '1px solid rgba(251, 191, 36, 0.2)', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
          
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: isMobile ? '3rem' : '5rem', fontWeight: 900, lineHeight: 0.9, marginBottom: '2rem' }}>
              EL MOMENTO <br /> <span style={{ color: '#fbbf24' }}>ES AHORA.</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>
              Únete a los cientos de radiodifusores que ya creen en la <strong style={{color: 'white'}}>Lista Nueva Energía</strong>. Defendamos juntos el futuro de nuestra industria.
            </p>
            <button 
              onClick={() => window.open('/archi-media/plan_gobierno.pdf', '_blank')}
              style={{ background: '#fbbf24', color: '#0f172a', padding: '1.2rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 10px 40px rgba(251, 191, 36, 0.4)' }}
            >
              CONOCER MANIFIESTO
            </button>
            
            <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Briefcase size={24} color="#fbbf24" />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>SOLANGE GÓMEZ</div>
                        <div style={{ color: '#64748b', fontSize: '0.6rem', letterSpacing: '1px' }}>PRESIDENTA ARCHI 2025</div>
                    </div>
                </div>
                <p style={{ color: '#334155', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', margin: 0 }}>
                    © 2025 LISTA NUEVA ENERGÍA - VECINOS LA SERENA
                </p>
            </div>
          </div>
      </footer>

    </div>
  );
};

export default ArchiCampaign;
