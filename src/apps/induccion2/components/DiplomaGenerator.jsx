import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Download, Share2, Award, Zap } from 'lucide-react';

export default function DiplomaGenerator({ name }) {
  // Fecha actual formateada
  const today = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="diploma-page"
    >
      <div className="diploma-canvas">
        {/* Frame / Borde Institucional */}
        <div className="diploma-main-border">
          <div className="diploma-inner-border">
            
            <header className="diploma-header">
               <div className="muni-shield">
                  <ShieldCheck size={40} color="#fbbf24" strokeWidth={3} />
               </div>
               <div className="institution-info">
                  <span className="inst-name">ILUSTRE MUNICIPALIDAD DE LA SERENA</span>
                  <span className="inst-sub">Portal de Innovación y Soberanía Digital</span>
               </div>
            </header>

            <section className="diploma-body">
               <p className="certify-text">CERTIFICA QUE EL FUNCIONARIO(A):</p>
               <h2 className="recipient-name">{name.toUpperCase()}</h2>
               
               <p className="body-text">
                  Ha completado satisfactoriamente el curso de inducción y acreditación del
               </p>
               
               <div className="ecosystem-badge-diploma">
                  <Award size={20} />
                  ECOSISTEMA MUNICIPAL DE LA SERENA
               </div>

               <p className="validity-text">
                  Con excelencia académica (100% de aprobación) acreditada el {today}.
               </p>
            </section>

            <footer className="diploma-footer">
               <div className="sign-box">
                  <div className="sign-line" />
                  <span className="sign-label">Validación Electrónica</span>
                  <span className="sign-detail">Dirección de Transformación Digital</span>
               </div>
               <div className="seal-box">
                  <div className="seal-inner">
                     <Zap size={24} color="#fbbf24" />
                     <span>VLS 2026</span>
                  </div>
               </div>
            </footer>

            <div className="watermark">VLS-INDUCCION-02-MASTER</div>
          </div>
        </div>
      </div>
      
      <div className="diploma-toolbar">
         <button className="tb-btn main" onClick={() => window.print()}>
            <Download size={20} /> Guardar Certificado
         </button>
         <button className="tb-btn secundario" onClick={() => window.location.reload()}>
            <RotateCcw size={18} /> Finalizar Sesión
         </button>
      </div>

      <style>{`
        .diploma-page { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 900px; padding: 2rem; }
        .diploma-canvas { 
            background: #fff; width: 100%; aspect-ratio: 1.414 / 1; 
            padding: 20px; border-radius: 4px; box-shadow: 0 50px 100px rgba(0,0,0,0.8);
            position: relative; color: #0f172a;
        }
        .diploma-main-border { 
            border: 15px double #fbbf24; height: 100%; padding: 10px; 
            background: radial-gradient(circle, #ffffff 0%, #fffbeb 100%);
        }
        .diploma-inner-border {
            border: 2px solid #000; height: 100%; padding: 40px;
            display: flex; flex-direction: column; align-items: center;
            position: relative;
        }
        .diploma-header { display: flex; flex-direction: column; align-items: center; border-bottom: 2px solid #fbbf24; width: 100%; padding-bottom: 1.5rem; margin-bottom: 2.5rem; }
        .inst-name { font-size: 1.2rem; font-weight: 900; letter-spacing: 3px; color: #000; display: block; }
        .inst-sub { font-size: 0.7rem; color: #64748b; font-weight: bold; letter-spacing: 1px; }
        .certify-text { font-size: 1rem; font-family: 'Georgia', serif; font-style: italic; margin-bottom: 1rem; }
        .recipient-name { font-size: 3.2rem; font-weight: 900; margin: 10px 0 2rem 0; color: #000; border-bottom: 3px solid #000; padding: 0 40px; }
        .body-text { font-size: 1.2rem; font-family: 'Georgia', serif; margin-bottom: 1.5rem; }
        .ecosystem-badge-diploma { 
            background: #000; color: #fbbf24; padding: 8px 30px; 
            font-weight: 900; letter-spacing: 2px; border-radius: 5px;
            display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem;
        }
        .validity-text { font-size: 0.9rem; font-style: italic; color: #64748b; }
        .diploma-footer { display: flex; justify-content: space-between; width: 100%; margin-top: auto; padding-top: 2rem; }
        .sign-box { display: flex; flex-direction: column; align-items: center; width: 250px; }
        .sign-line { width: 100%; height: 2px; background: #000; margin-bottom: 8px; }
        .sign-label { font-weight: 900; font-size: 0.8rem; }
        .sign-detail { font-size: 0.6rem; color: #64748b; }
        .seal-box { border: 4px solid #fbbf24; border-radius: 50%; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; position: relative; opacity: 0.8; }
        .seal-inner { display: flex; flex-direction: column; align-items: center; font-size: 0.6rem; font-weight: 900; }
        .watermark { position: absolute; bottom: 10px; right: 10px; font-size: 0.5rem; color: rgba(0,0,0,0.1); font-weight: bold; }
        .diploma-toolbar { display: flex; gap: 1.5rem; margin-top: 3rem; }
        .tb-btn { border: none; padding: 1rem 2rem; border-radius: 50px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-weight: bold; transition: all 0.3s; }
        .tb-btn.main { background: #fbbf24; color: black; box-shadow: 0 10px 30px rgba(251, 191, 36, 0.4); }
        .tb-btn.secundario { background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); }
        .tb-btn:hover { transform: translateY(-3px); }
        @media print { .diploma-toolbar { display: none; } body { background: #fff !important; } .diploma-page { padding: 0; } }
      `}</style>
    </motion.div>
  );
}
