import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Share2, UserCheck, HardHat, Building2, ExternalLink } from 'lucide-react';

export default function VLSNewsAcciona({ onClose }) {

  const handleShare = () => {
    const url = 'https://vecinoslaserena.cl/acciona';
    const text = 'Acciona abre capacitaciones en construcción exclusivas para mujeres de La Serena. ¡Inscríbete!';
    if (navigator.share) {
      navigator.share({ title: 'Acciona Mujeres - VLS', text, url });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    }
  };

  return (
    <>
      <style>{`
        .acciona-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999999;
          background: rgba(2, 6, 23, 0.98);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        .acciona-modal {
          width: 100%;
          max-width: 1200px;
          height: 95vh;
          background: #ffffff;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 50px 100px -20px rgba(0,0,0,0.5);
          box-sizing: border-box;
          max-height: 95vh;
        }
        .acciona-header {
          display: flex;
          flex-shrink: 0;
          height: 40vh;
          min-height: 180px;
          max-height: 280px;
          background: #0a0000;
          overflow: hidden;
          position: relative;
        }
        .acciona-header-text {
          flex: 1;
          background: linear-gradient(135deg, #1a0000 0%, #2d0000 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          position: relative;
          z-index: 2;
          min-width: 0;
        }
        .acciona-header-video {
          width: 38%;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .acciona-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .acciona-grid {
          display: grid;
          grid-template-columns: 7fr 5fr;
          gap: 1.5rem;
          padding: 2rem;
          box-sizing: border-box;
        }
        .acciona-afiche {
          padding: 0 2rem 2rem;
          box-sizing: border-box;
        }
        .acciona-h1 {
          color: white;
          font-size: clamp(1.1rem, 3.5vw, 2.4rem);
          font-weight: 900;
          margin: 0;
          line-height: 1.15;
          word-break: break-word;
        }
        @media (max-width: 639px) {
          .acciona-modal {
            border-radius: 18px;
            height: 97vh;
          }
          .acciona-header {
            height: 32vh;
            min-height: 160px;
            max-height: 220px;
          }
          .acciona-header-text {
            padding: 1rem;
            flex: 1;
            min-width: 0;
          }
          .acciona-header-video {
            width: 35%;
          }
          .acciona-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
            gap: 1rem;
          }
          .acciona-afiche {
            padding: 0 1rem 1rem;
          }
        }
      `}</style>

      <div className="acciona-overlay">
        <motion.div
          className="acciona-modal"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
        >
          {/* ── HEADER SPLIT ── */}
          <div className="acciona-header">

            {/* Columna izquierda: Título */}
            <div className="acciona-header-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#ff0000', color: 'white', padding: '3px 10px', borderRadius: '7px', fontSize: '0.65rem', fontWeight: '900', letterSpacing: '1px', whiteSpace: 'nowrap' }}>CONVOCATORIA</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <HardHat size={14} color="#ff0000" /> Nuevo Hospital La Serena
                </div>
              </div>
              <h1 className="acciona-h1">Acciona abre capacitaciones exclusivas para mujeres</h1>

              {/* Botón compartir */}
              <button onClick={handleShare} style={{ position: 'absolute', top: '12px', left: '12px', background: '#25D366', border: 'none', borderRadius: '50px', padding: '6px 12px', color: 'white', fontWeight: '900', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', zIndex: 5 }}>
                <Share2 size={13} /> COMPARTIR
              </button>
            </div>

            {/* Columna derecha: Video */}
            <div className="acciona-header-video">
              <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.5)' }}>
                <source src="/acciona/clip_vertical.mp4" type="video/mp4" />
              </video>
              <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }}>
                <source src="/acciona/clip_vertical.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Botón cerrar — siempre visible */}
            <button onClick={onClose} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10 }}>
              <X size={20} />
            </button>
          </div>

          {/* ── CONTENIDO SCROLLABLE ── */}
          <div className="acciona-scroll">

            {/* Grid artículo + CTA */}
            <div className="acciona-grid">

              {/* Columna artículo */}
              <div>
                <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '16px', borderLeft: '6px solid #ff0000', marginBottom: '1.2rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', margin: 0, lineHeight: '1.5' }}>
                    La empresa a cargo de las obras del nuevo hospital busca integrar mano de obra femenina local a través de un curso gratuito de terminaciones.
                  </p>
                </div>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.8', color: '#334155' }}>
                  <p>En un esfuerzo por fomentar la inclusión laboral, la empresa <strong>Acciona</strong> ha lanzado una convocatoria para su nuevo <strong>Curso de Formación: Aplicación y ejecución de terminaciones en construcción</strong>.</p>
                  <p>Esta iniciativa está dirigida especialmente a mujeres de La Serena que deseen aprender un oficio con alta demanda en los proyectos de infraestructura de la zona.</p>
                  <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '20px', color: 'white', marginTop: '1rem' }}>
                    <h4 style={{ color: '#ff0000', fontWeight: '900', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <Building2 size={18} /> NOTA DE VECINOS LA SERENA
                    </h4>
                    <p style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: 0, opacity: 0.9 }}>
                      "Iniciativas como esta no solo fortalecen el perfil laboral de nuestras vecinas, sino que aseguran que el progreso de las grandes obras de la comuna también se traduzca en oportunidades reales para las familias locales."
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna CTA + Detalles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #ff0000 0%, #b91c1c 100%)', padding: '1.5rem', borderRadius: '22px', color: 'white', textAlign: 'center', boxShadow: '0 15px 35px rgba(185,28,28,0.3)' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UserCheck size={30} />
                  </div>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.4rem', fontWeight: '900' }}>¡Únete hoy!</h3>
                  <p style={{ opacity: 0.9, marginBottom: '1.2rem', fontWeight: 'bold', fontSize: '0.85rem' }}>Capacitación exclusiva para mujeres de La Serena</p>
                  <button
                    onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSf3bMCGef-FHClemUb2fV6BWTyUbNlVMzQAZMYeKEqrd8_0_w/viewform?pli=1', '_blank')}
                    style={{ width: '100%', background: '#ffffff', color: '#ff0000', border: 'none', padding: '0.9rem', borderRadius: '14px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    FORMULARIO DE INSCRIPCIÓN <ExternalLink size={16} />
                  </button>
                  <div style={{ marginTop: '0.8rem', fontSize: '0.7rem', fontWeight: 'bold', opacity: 0.8 }}>CIERRE: 15 DE ABRIL, 2026</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '22px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', fontWeight: '900', color: '#64748b', letterSpacing: '1px' }}>DETALLES LOGÍSTICOS</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { icon: <MapPin size={18}/>, color: '#ff0000', bg: '#ff000010', title: 'Colegio Maristas', desc: 'Av. Isidoro Campaña 2878' },
                      { icon: <Calendar size={18}/>, color: '#3b82f6', bg: '#3b82f610', title: '20 Abril — 27 Mayo', desc: 'Duración de la capacitación' },
                      { icon: <Clock size={18}/>, color: '#10b981', bg: '#10b98110', title: '16:30 a 20:30 hrs', desc: 'Lunes a Viernes' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <div style={{ background: item.bg, color: item.color, padding: '8px', borderRadius: '10px', flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontWeight: '900', color: '#1e293b', fontSize: '0.85rem' }}>{item.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── AFICHE FULL WIDTH ── */}
            <div className="acciona-afiche">
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.08)', border: '2px solid #ff000015' }}>
                <img src="/acciona/afiche_horizontal.png" style={{ width: '100%', height: 'auto', display: 'block' }} alt="Gráfica Oficial Acciona" />
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
}
