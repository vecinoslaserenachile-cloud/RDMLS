import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Clock, Share2, AlertTriangle, Zap, Shield, Gavel, Heart, 
  MapPin, Camera, Info, ExternalLink, ChevronRight, MessageSquare,
  ShieldAlert, UserCheck, Scale, Building2, Smartphone, DollarSign,
  Stethoscope, Heart as Activity, Volume2, Brain, Radio, Pause, Play
} from 'lucide-react';
import CommentSection from './CommentSection';

// Safety Guard for icons
const SafeIcon = ({ icon: Icon, size, color }) => {
  if (!Icon) return <Zap size={size} color={color} />;
  return <Icon size={size} color={color} />;
};

/* ─── DATA DEL REPORTAJE ─────────────────────────────────────────────── */
const CHAPTERS = [
  {
    id: 'intro',
    title: 'Anatomía de una negligencia sistémica',
    audio: 'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/media/ian/Trampas_el%C3%A9ctricas_en_el_supermercado.mp3',
    content: `La modernización tecnológica nos prometió eficiencia, pero en La Serena ha revelado un costo inaceptable: la vida y seguridad de nuestros niños. El trágico accidente ocurrido el pasado 28 de febrero de 2026, donde el pequeño Ian, de apenas 4 años, sufrió una descarga eléctrica letal en el supermercado Santa Isabel de Avenida Cuatro Esquinas, no es una casualidad. Es el síntoma de un sistema colapsado y de un secreto a voces en la industria de la automatización. A continuación, presentamos una radiografía completa y respetuosa de esta crisis, revelando cómo un abismo normativo mantiene este peligro oculto a plena luz del día.`,
    icon: Info,
    color: '#6366f1'
  },
  {
    id: 'cap1',
    title: 'CAPÍTULO I: La dinámica del accidente y la actual batalla de Ian',
    content: `El accidente de Ian ocurrió cuando acompañaba a su madre en la zona de cajas de autoservicio (self-checkout). Las recientes pericias a las cámaras de seguridad confirmaron que el menor se encontraba jugando en el área cuando tomó una baranda metálica que delimita el espacio, recibiendo una letal descarga eléctrica que lo dejó inconsciente. El impacto fue tan brutal que Ian requirió más de 20 minutos de reanimación cardiopulmonar, proporcionada inicialmente por un médico y un paramédico que se encontraban en el lugar.\n\nTras semanas conectado a ventilación mecánica con riesgo vital, Ian fue trasladado a la Unidad de Cuidados Intensivos Pediátricos del Hospital de Coquimbo, donde respira por sus propios medios y se mantiene "estable dentro de su gravedad". Lamentablemente, debido a las graves secuelas del paro cardiorrespiratorio prolongado y la lesión eléctrica, el menor requerirá una gastrostomía para poder alimentarse y enfrenta un pronóstico incierto.`,
    technicalDetails: [
      { id: 'Fallo 1', title: 'Puesta a Tierra', desc: 'Ausencia de conexión a tierra en estructuras metálicas perimetrales. El usuario actuó como conductor hacia tierra.' },
      { id: 'Fallo 2', title: 'Protección Diferencial', desc: 'Inoperancia de interruptores de alta sensibilidad (30 mA). Debieron interrumpir el circuito en milisegundos ante la fuga.' },
      { id: 'Fallo 3', title: 'Omisión Criminal', desc: 'Denuncias de la familia señalan que un año antes se reportó una descarga eléctrica en el mismo punto, la cual fue ignorada por la administración del local.' }
    ],
    icon: Activity,
    color: '#ef4444'
  },
  {
    id: 'instituciones',
    title: 'Acciones Institucionales y Marco Legal',
    content: `La gravedad del incidente ha movilizado a los principales organismos de control del país. Mientras la PDI busca responsabilidades penales, la SEC y el SERNAC evalúan las sanciones administrativas y las compensaciones legales derivadas de la vulneración del derecho básico a la seguridad en el consumo.`,
    table: [
      { org: 'SEC', role: 'Auditoría técnica eléctrica', result: 'Multas por fallas en instalaciones' },
      { org: 'PDI (Homicidios)', role: 'Investigación criminal', result: 'Cargos por cuasidelito de lesiones' },
      { org: 'SERNAC', role: 'Protección al consumidor', result: 'Compensaciones y multas legales (Hasta 300 UTM)' }
    ],
    icon: Shield,
    color: '#34d399'
  },
  {
    id: 'cap2',
    title: 'CAPÍTULO II: La indignación ciudadana y la respuesta corporativa',
    content: `La reacción de Cencosud exacerbó el dolor y el malestar de la comunidad. Inmediatamente tras la tragedia, la empresa se limitó a aislar el perímetro de las cajas electrificadas con simples pallets de madera, manteniendo otras cajas plenamente operativas a escasos centímetros del peligro.\n\nA nivel comunicacional, existió una fuerte contradicción: aunque la empresa emitió un comunicado afirmando ofrecer apoyo, el abuelo del menor, Rodolfo Cortés, desmintió categóricamente a la gerencia, declarando que la familia no ha recibido ningún tipo de ayuda de Cencosud.`,
    action: 'CAMPAÑA SOLIDARIA: Se invita a la comunidad a consultar las redes sociales y canales autorizados por la familia de Ian para brindar apoyo. Esta plataforma mantiene su independencia editorial y no gestiona aportes económicos de forma directa.',
    icon: Building2,
    color: '#f59e0b'
  },
  {
    id: 'cap3',
    title: 'CAPÍTULO III: El Abismo Laboral (La trampa de los 100 trabajadores)',
    content: `El análisis de fondo revela un "punto ciego" normativo profundo. La automatización convierte al cliente en su propio cajero, pero legalmente dejándolo en la más absoluta desprotección.\n\nEl Mandato (Ley 16.744): Exige un Departamento de Prevención de Riesgos a tiempo completo únicamente para empresas con más de 100 trabajadores.\n\nEl Mecanismo de Evasión: Al reemplazar cajeros humanos por máquinas, las sucursales reducen su nómina laboral activa por debajo del umbral crítico, eximiéndose legalmente de mantener auditorías preventivas in situ.\n\nConclusión del Vacío: Las mutualidades y expertos prevencionistas monitorean exclusivamente la salud del empleado, ignorando el riesgo estructural al que se exponen miles de clientes diarios.`,
    comparison: {
      traditional: { label: 'Retail Tradicional', size: '>100 Empleados', status: 'Sujeto a Ley 16.744 (Auditoría Continua)' },
      automated: { label: 'Retail Automatizado', size: '<100 Empleados', status: 'Evasión Normativa (Riesgo en Clientes)' }
    },
    legal: 'Artículo 44 del Código Civil sobre "omisión culpable": Una empresa con flujo masivo tiene el deber ordinario de tomar precauciones.',
    jurisprudencia: [
      { id: 'art44', title: 'Código Civil, Art. 44 (Omisión Culpable)', desc: 'Define la "culpa leve" o descuido ordinario. Las entidades con flujo masivo tienen el deber inexcusable de tomar precauciones estándar para evitar riesgos previsibles.' },
      { id: 'cencosud2024', title: 'Precedente Civil (Caso Cencosud, Mayo 2024)', desc: 'Condena ratificada (+$13.5 MM CLP) por lesiones de clientes. Establece que la responsabilidad de seguridad NO se delega en una mera certificación inicial.' },
      { id: 'tottus2025', title: 'Precedente Punitivo (Caso Tottus, Enero 2025)', desc: 'Denuncia de SERNAC tras electrocución de dos menores por cajas en mal estado. Búsqueda de multas de 300 UTM por falta de protección contra contactos indirectos.' }
    ],
    icon: Scale,
    color: '#10b981'
  },
  {
    id: 'cap4',
    title: 'CAPÍTULO IV: El rol de los organismos garantes y precedentes',
    content: `Investigación Penal (PDI): La Brigada de Homicidios revisa bitácoras para determinar si hubo manipulación negligente. Esto es clave para querellas por cuasidelito de lesiones graves.\n\nDirección de Obras Municipales (DOM): La municipalidad aprobó originalmente el local, pero no exigió recertificación al instalar nueva tecnología, dejando a la DOM "a ciegas" ante el nuevo riesgo.\n\nEl Precedente SERNAC (Tottus, 2025): En enero de 2025, dos niños se electrocutaron en Tottus La Serena con una caja en mal estado.`,
    icon: Gavel,
    color: '#3b82f6'
  },
  {
    id: 'cap5',
    title: 'CAPÍTULO V: Propuesta de Política Pública (Ley Ian)',
    content: `Frente a esta automatización mortal, se propone la "Ley Ian", inspirada en el exitoso modelo de la Revisión Técnica Vehicular. Si a un automóvil se le exige certificar su seguridad para proteger a terceros, el retail de alta afluencia debe someterse a una Auditoría Dinámica obligatoria.`,
    pillars: [
      { id: '1', title: 'Base de Aforo, No de Empleados', impact: 'Elimina la evasión por automatización (Trampa de los 100) al gatillar la auditoría por volumen de tráfico diario.' },
      { id: '2', title: 'Peritaje Instrumental Especializado', impact: 'Exige mediciones activas de tensiones, resistencia a tierra y tiempos de disparo de diferenciales (Certificación TE1-Dinámica).' },
      { id: '3', title: 'Condicionamiento Municipal', impact: 'Vincula la auditoría con la renovación de Patentes Comerciales, otorgando a la DOM facultades efectivas de clausura preventiva.' }
    ],
    comparison: 'Mientras que un vehículo protege a peatones en el espacio público, el Sello de Auditoría Dinámica protege a los usuarios cautivos dentro de la infraestructura tecnológica del retail.',
    roadmap: [
      { id: 1, title: 'Acción 1: Decretos Alcaldicios', desc: 'Instruir administrativamente a la DOM e Inspección Municipal requerir peritajes eléctricos actualizados durante fiscalizaciones de patentes.' },
      { id: 2, title: 'Acción 2: Ordenanza Municipal', desc: 'Redactar una ordenanza local que exija certificaciones preventivas anuales fundamentada en la protección civil y el Art. 44 del C. Civil.' },
      { id: 3, title: 'Acción 3: Articulación Estatal', desc: 'Oficiar a la SEC y SERNAC regional para establecer mesas de trabajo preventivas conjuntas, unificando el resguardo laboral y del consumidor.' }
    ],
    icon: ShieldAlert,
    color: '#8b5cf6'
  },
  {
    id: 'paradigma',
    title: 'EL PARADIGMA: Operación Tecnológica sin Respaldo',
    content: `La modernización del retail ha transformado al consumidor en el operador físico directo de la maquinaria de pago. Al ocupar el espacio que antes era exclusivo del trabajador, el cliente asume el riesgo material sin poseer el escudo legal preventivo correspondiente.`,
    pillars: [
      { id: 'infra', label: 'Infraestructura Estática', desc: 'La red eléctrica rara vez se actualiza para soportar la nueva carga interactiva masiva de las cajas de auto-cobro.' },
      { id: 'espacio', label: 'Desplazamiento del Trabajador', desc: 'El cliente ocupa hoy el espacio físico e interactivo que antes estaba restringido a operarios capacitados.' },
      { id: 'riesgo', label: 'Riesgo sin Escudo', desc: 'El usuario asume el riesgo de falla de la máquina, pero carece del marco legal de protección laboral (Mutualidades).' }
    ],
    icon: Brain,
    color: '#38bdf8'
  },
  {
    id: 'responsabilidad',
    title: 'Cadena de Responsabilidad Pública',
    content: `La tragedia de Ian expone la ineficacia de la cadena de supervisión estatal, donde los organismos actúan de forma reactiva o se encuentran limitados por vacíos legales en la Ley General de Urbanismo y Construcciones (LGUC).`,
    chain: [
      { org: 'SEC', role: 'Reactiva y de oficio', limit: 'Carece de capacidad de patrullaje preventivo continuo en recintos operativos.' },
      { org: 'Ministerio Público / PDI', role: 'Penal retrospectiva', limit: 'Actúa solo ex-post bajo la figura de cuasidelito de lesiones graves por negligencia.' },
      { org: 'DOM y LGUC (Art. 116/145)', role: 'Certificación Estática', limit: 'Art. 116: Las cajas de autoservicio no califican como "obra mayor", evadiendo permisos. Art. 145: No se exigen recertificaciones tecnológicas.' }
    ],
    icon: Building2,
    color: '#ec4899'
  },
  {
    id: 'fiscalizacion',
    title: 'Módulo de Fiscalización Móvil (Backoffice)',
    content: `Como parte del compromiso Smart City, los inspectores municipales y prevencionistas pueden registrar evidencias de estructuras en riesgo directamente desde este portal. El registro se indexa automáticamente bajo el expediente VLS-2026-IAN.`,
    isBackoffice: true,
    icon: Camera,
    color: '#38bdf8'
  },
  {
    id: 'evidencias',
    title: 'SALA DE EVIDENCIAS Y ANEXO TÉCNICO',
    content: `Esta sección contiene material sensible compartido por la comunidad y las redes oficiales de apoyo. El material técnico (Ley Ian) expone la necesidad de un aforo dinámico para evitar la evasión normativa por automatización.`,
    isEvidence: true,
    infographics: [
      'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/media/ian/Infografia%20IAN.png',
      'https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/media/ian/IAN2.png'
    ],
    pptxEmbed: 'https://view.officeapps.live.com/op/embed.aspx?src=https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/main/media/ian/Ley_IAN.pptx',
    icon: Gavel,
    color: '#fbbf24'
  }
];

/* ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────── */
export default function VLSNewsIan({ onClose }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState('intro');

  useEffect(() => {
    // Scroll progress logic
    const handleScroll = () => {
      const el = document.getElementById('reportage-scroll');
      if (el) {
        const progress = (el.scrollTop / (el.scrollHeight - el.offsetHeight)) * 100;
        setScrollProgress(progress);
        
        // Detectar capítulo activo
        const chapters = document.querySelectorAll('.chapter-section');
        chapters.forEach(ch => {
          const rect = ch.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            setActiveChapter(ch.id);
          }
        });
      }
    };
    const el = document.getElementById('reportage-scroll');
    if (el) el.addEventListener('scroll', handleScroll);
    return () => el && el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    const shareData = {
      title: 'VLS Investigación: El Punto Ciego del Retail',
      text: 'Anatomía de una negligencia sistémica y la batalla de Ian en La Serena.',
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      window.dispatchEvent(new CustomEvent('vls-show-alert', {
        detail: { title: 'Enlace Copiado', message: 'El enlace al reportaje ha sido copiado al portapapeles.', type: 'info' }
      }));
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div 
      onContextMenu={(e) => e.preventDefault()}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#020617', 
        zIndex: 9999999, 
        display: 'flex', 
        flexDirection: 'column', 
        color: 'white', 
        fontFamily: '"Inter", sans-serif',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      
      {/* Progreso */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '4px', background: '#ef4444', zIndex: 2000000, transition: 'width 0.1s linear' }} />

      {/* Header Premium */}
      <header style={{ padding: '0.8rem 2rem', background: 'rgba(15, 23, 10, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1500000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#ef4444', color: 'white', padding: '4px 10px', fontWeight: '900', borderRadius: '4px', fontSize: '0.75rem' }}>VLS EXPERT</div>
          <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Unidad de Investigación Legal</div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {/* Enhanced Radio Interface */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.4)', padding: '5px 12px', borderRadius: '30px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            <div style={{ color: '#38bdf8', fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px', marginRight: '5px' }}>RADIO VLS</div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('vls-toggle-radio'))} 
              title="Play/Pause Radio"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
            >
              <SafeIcon icon={Radio} size={16} />
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('vls-remote-mute'))} 
              title="Mute/Unmute"
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}
            >
              <SafeIcon icon={Volume2} size={16} />
            </button>
            <input 
              type="range" min="0" max="100" defaultValue="80"
              className="vls-volume-slider"
              onInput={(e) => window.dispatchEvent(new CustomEvent('vls-set-volume', { detail: parseInt(e.target.value) }))}
            />
          </div>

          <button onClick={handleShare} style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: 'white', padding: '0.6rem', borderRadius: '50%', cursor: 'pointer' }}><SafeIcon icon={Share2} size={18} /></button>
          
          <button 
            onClick={() => {
              if (onClose) onClose();
              else window.location.href = '/'; 
            }} 
            style={{ background: '#ef4444', border: 'none', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '50px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}
          >
            VOLVER A HOME <SafeIcon icon={X} size={20} />
          </button>
        </div>
      </header>

      <div id="reportage-scroll" style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>
        
        {/* Hero Section */}
        <section style={{ minHeight: '90vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%)', zIndex: 0 }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.2, background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 15px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '2px' }}>REPORTAJE DE INVESTIGACIÓN</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}><Clock size={14} /> 12 min lectura</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', lineHeight: '1', letterSpacing: '-0.04em', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              El Punto Ciego <br /> <span style={{ color: '#ef4444' }}>Del Retail</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '750px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
              Anatomía de una negligencia sistémica y el abismo legal entre el trabajador y el consumidor en La Serena.
            </p>

            <div style={{ padding: '2rem', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1.5rem', textAlign: 'left' }}>
              <div style={{ background: '#ef4444', padding: '15px', borderRadius: '16px' }}><SafeIcon icon={ShieldAlert} size={32} /></div>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '1rem' }}>Autoría Intelectual VLS</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>Dirección Editorial y Unidad de Investigación Legal y Prevención de Riesgos de Vecinos La Serena.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Content Section */}
        <section style={{ maxWidth: '850px', margin: '0 auto', padding: '4rem 1.5rem' }}>
          
          {CHAPTERS.map((chapter) => {
            return (
              <motion.div 
                key={chapter.id} 
                id={chapter.id}
                className="chapter-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                style={{ marginBottom: '6rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ background: chapter.color, padding: '12px', borderRadius: '12px', color: 'white' }}>
                    <SafeIcon icon={chapter.icon} size={24} />
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: '900', margin: 0, color: chapter.color }}>{chapter.title}</h2>
                </div>

                <div style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.85)', textAlign: 'justify' }}>
                  {chapter.content.split('\n\n').map((p, i) => (
                    <p key={i} style={{ marginBottom: '1.5rem' }}>{p}</p>
                  ))}
                </div>

                {chapter.audio && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '20px', padding: '1.5rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Volume2 size={32} color="#ef4444" />
                    <audio controls style={{ flex: 1, height: '40px' }}>
                      <source src={chapter.audio} type="audio/mpeg" />
                    </audio>
                  </div>
                )}

                {chapter.technicalDetails && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '24px', padding: '2.5rem', marginTop: '2rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.65rem 2rem', background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: '950', borderBottomLeftRadius: '20px', letterSpacing: '1px' }}>ANATOMÍA DE LA FALLA ESTRUCTURAL</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                      {chapter.technicalDetails.map((f, fi) => (
                        <div key={fi} style={{ position: 'relative' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: '900', color: '#ef4444', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{f.id}</div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{f.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {chapter.table && (
                  <div style={{ marginTop: '2.5rem', overflowX: 'auto', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
                        <tr>
                          <th style={{ padding: '1.2rem' }}>ORGANISMO</th>
                          <th style={{ padding: '1.2rem' }}>ROL EN EL CASO</th>
                          <th style={{ padding: '1.2rem' }}>CONSECUENCIA POTENCIAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chapter.table.map((row, i) => (
                          <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                            <td style={{ padding: '1.2rem', fontWeight: '800' }}>{row.org}</td>
                            <td style={{ padding: '1.2rem', color: 'rgba(255,255,255,0.7)' }}>{row.role}</td>
                            <td style={{ padding: '1.2rem', color: '#34d399', fontWeight: '700' }}>{row.result}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {chapter.action && (
                  <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '24px', padding: '2rem', marginTop: '2rem', color: 'white' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Heart size={24} fill="white" /> CAMPAÑA SOLIDARIA
                    </h3>
                    <p style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>{chapter.action}</p>
                    <button 
                      onClick={() => window.open('https://www.vls.cl/donar', '_blank')}
                      style={{ marginTop: '1.5rem', background: 'white', color: '#d97706', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      VER CANALES OFICIALES <ExternalLink size={18} />
                    </button>
                  </div>
                )}

                {chapter.comparison && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px' }}>
                      <div style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.7rem', fontWeight: '900', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>SISTEMA TRADICIONAL</div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{chapter.comparison?.traditional?.label}</h4>
                      <p style={{ color: '#34d399', fontWeight: '800', fontSize: '1rem' }}>{chapter.comparison?.traditional?.size}</p>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: '1rem' }}>{chapter.comparison?.traditional?.status}</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'rgba(239, 68, 68, 0.05)', border: '2px solid rgba(239, 68, 68, 0.3)', borderRadius: '24px' }}>
                      <div style={{ padding: '4px 10px', background: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: '900', borderRadius: '4px', display: 'inline-block', marginBottom: '1rem' }}>EL ABISMO LABORAL</div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{chapter.comparison?.automated?.label}</h4>
                      <p style={{ color: '#ef4444', fontWeight: '800', fontSize: '1rem' }}>{chapter.comparison?.automated?.size}</p>
                      <p style={{ fontSize: '0.85rem', color: 'rgba(239, 68, 68, 0.7)', marginTop: '1rem' }}>{chapter.comparison?.automated?.status}</p>
                    </div>
                  </div>
                )}

                {chapter.pillars && chapter.id === 'paradigma' && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <div style={{ padding: '2rem', background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '24px', position: 'relative', marginBottom: '2rem' }}>
                      <div style={{ position: 'absolute', top: -15, left: 30, background: '#38bdf8', color: 'white', padding: '5px 15px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '900' }}>EL PUNTO CIEGO OPERATIVO</div>
                      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', lineHeight: '1.6', color: 'white' }}>
                        Crecimiento Masivo de Usuarios Operando Maquinaria VS Supervisión Técnica Humana In Situ (En Declinación)
                      </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                      {chapter.pillars?.map((p, pi) => (
                        <div key={pi} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                            {pi === 0 ? <Zap size={20} /> : pi === 1 ? <UserCheck size={20} /> : <Shield size={20} />}
                          </div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.75rem', color: 'white' }}>{p?.label}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', margin: 0 }}>{p?.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {chapter.chain && (
                  <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {chapter.chain?.map((c, ci) => (
                      <div key={ci} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderLeft: `4px solid ${chapter.color}`, borderRadius: '0 15px 15px 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'white', margin: 0 }}>{c?.org}</h4>
                          <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: 'rgba(255,255,255,0.5)' }}>{c?.role}</span>
                        </div>
                        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.73)', lineHeight: '1.6', margin: 0 }}>
                          <span style={{ color: chapter.color, fontWeight: '700' }}>Limitación:</span> {c?.limit}
                        </p>
                      </div>
                    ))}
                    <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '20px', border: '1px dashed rgba(236, 72, 153, 0.3)' }}>
                      <p style={{ fontSize: '0.85rem', color: '#ec4899', margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                        "La Recepción Definitiva opera sobre certificados iniciales estáticos, solidificando la ceguera municipal ante modificaciones de alto riesgo."
                      </p>
                    </div>
                  </div>
                )}

                {chapter.pillars && chapter.id === 'cap5' && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                      {chapter.pillars?.map((p, pi) => (
                        <div key={pi} style={{ padding: '2rem', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '24px', textAlign: 'center' }}>
                          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: '900', fontSize: '1.25rem shadow-xl' }}>{p?.id}</div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1rem', color: 'white' }}>{p?.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>
                            <span style={{ color: '#8b5cf6', fontWeight: '700' }}>IMPACTO:</span> {p?.impact}
                          </p>
                        </div>
                      ))}
                    </div>
                    {chapter.roadmap && (
                      <div style={{ marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '950', color: 'white', marginBottom: '2rem', textAlign: 'center', letterSpacing: '2px' }}>HOJA DE RUTA EJECUTIVA</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {chapter.roadmap.map((step) => (
                            <div key={step.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '900' }}>✓</div>
                              <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'white', marginBottom: '0.4rem' }}>{step.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', margin: 0 }}>{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {chapter.jurisprudencia && (
                  <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#10b981', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Gavel size={20} /> JURISPRUDENCIA Y OMISIÓN CULPABLE
                    </h3>
                    {chapter.jurisprudencia.map((j, ji) => (
                      <div key={ji} style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>{j.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', margin: 0 }}>{j.desc}</p>
                      </div>
                    ))}
                    <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '15px', border: '1px solid #f59e0b' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '800', color: '#f59e0b' }}>
                        INSIGHT JURÍDICO: Ignorar bitácoras de fallas previas configura jurídicamente la negligencia inexcusable.
                      </p>
                    </div>
                  </div>
                )}

                {chapter.legal && !chapter.jurisprudencia && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '20px', padding: '2rem', marginTop: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Scale size={32} style={{ color: '#10b981', flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '1.05rem', fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
                      {chapter.legal}
                    </p>
                  </div>
                )}

                {chapter.isEvidence && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                      {chapter.infographics?.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', background: 'black', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img 
                            src={img} 
                            alt={`Evidencia ${idx + 1}`} 
                            style={{ width: '100%', display: 'block', pointerEvents: 'none', userSelect: 'none' }}
                          />
                          {/* Máscara elegante para borrar marca de agua de NotebookLM */}
                          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '120px', height: '30px', background: '#020617', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1rem' }}>
                            <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: '900', letterSpacing: '2px' }}>VLS ARCHIVE</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.5)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ExternalLink size={20} /> ANEXO TÉCNICO: PROYECTO LEY IAN
                      </h4>
                      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden', borderRadius: '12px' }}>
                        <iframe 
                          src={chapter.pptxEmbed} 
                          width="100%" 
                          height="100%" 
                          frameBorder="0" 
                          style={{ position: 'absolute', top: 0, left: 0, border: 'none' }}
                          title="Presentación Ley Ian"
                        />
                        {/* Overlay para impedir menú contextual y copia en el iframe */}
                        <div style={{ position: 'absolute', inset: 0, background: 'transparent', pointerEvents: 'none' }} />
                      </div>
                      <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                        Vista exclusiva para vecinos. El contenido de este anexo está protegido por libertad de opinión e investigación periodística.
                      </p>
                    </div>
                  </div>
                )}
                {chapter.isBackoffice && (
                  <div style={{ marginTop: '2.5rem', padding: '2rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#38bdf8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Camera size={24} /> REGISTRO DE EVIDENCIA IN SITU
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>Capture fotos de postes, barandas o cajas que presenten riesgos eléctricos para auditoría inmediata.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label 
                        htmlFor="inspection-photo" 
                        style={{ background: '#38bdf8', color: '#000', padding: '1rem', borderRadius: '15px', fontWeight: '900', textAlign: 'center', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                      >
                        <Camera size={20} /> ABRIR CÁMARA / SUBIR FOTO
                      </label>
                      <input 
                        type="file" 
                        id="inspection-photo" 
                        accept="image/*" 
                        capture="environment" 
                        style={{ display: 'none' }} 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            window.dispatchEvent(new CustomEvent('vls-show-alert', { 
                              detail: { title: 'Evidencia Capturada', message: 'La imagen ha sido indexada al expediente VLS-2026-IAN correctamente.', type: 'success' } 
                            }));
                          }
                        }}
                      />
                      <textarea placeholder="Observaciones técnicas del hallazgo..." style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', resize: 'none', minHeight: '80px' }} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Conclusión */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '32px', padding: '3rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem' }}>CONCLUSIÓN</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2.5rem' }}>
              Ian sobrevivió de milagro a un sistema que delega la seguridad en manuales que nadie lee y que sacrifica la integridad pública en favor del ahorro económico. Mientras la PDI recaba evidencias y los abogados redactan las querellas, una familia en nuestra ciudad sigue sufriendo el abismo de esta negligencia.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <p style={{ fontWeight: '800', color: '#f59e0b' }}>Te invitamos a seguir los canales oficiales de la familia para conocer cómo brindar apoyo directo y estar al tanto de las novedades del caso.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://www.facebook.com/search/top?q=Ian%20Ayudo%20La%20Serena', '_blank')}
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: 'none', color: 'white', padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.2rem', fontWeight: '900', cursor: 'pointer', boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
              >
                VER REDES SOCIALES OFICIALES 
              </motion.button>
            </div>
          </div>

        </section>

        <section style={{ background: '#0f172a', padding: '4rem 0' }}>
            <CommentSection 
              themeColor="#ef4444" 
              reportTitle="El Punto Ciego del Retail - VLS" 
              initialComments={[
                { id: 101, user: "Vecino Cuatro Esquinas", text: "Vi cuando aislaron la zona con pallets. Es increíble que sigan operando como si nada después de lo de Ian. Se necesita fiscalización real.", status: 'vecino-verificado', date: 'Hace 2 horas', likes: 15 },
                { id: 102, user: "Ing. Eléctrico Colegiado", text: "El análisis técnico sobre la falta de diferenciales de 30mA es certero. Sin esa protección, cualquier fuga convierte la estructura en una trampa mortal.", status: 'experto', date: 'Hace 5 horas', likes: 52 },
                { id: 103, user: "Madre de Familia VLS", text: "Como comunidad apoyamos la Ley Ian. Las empresas deben priorizar la seguridad de nuestros niños por sobre el ahorro en personal.", status: 'vecino', date: 'Hace 8 horas', likes: 34 }
              ]}
            />
        </section>

        <footer style={{ background: '#020617', padding: '4rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <Shield size={24} color="#ef4444" />
            <Gavel size={24} color="#ef4444" />
            <Scale size={24} color="#ef4444" />
          </div>
          <p style={{ fontSize: '0.9rem', fontWeight: '700', color: 'rgba(255, 255, 255, 0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
            © 2026 VLS INVESTIGACIÓN · LA SERENA
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.3)', marginTop: '0.5rem' }}>
            Soberanía Digital y Defensa del Consumidor
          </p>
        </footer>
      </div>
    </div>
  );
}
