import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ChevronRight, FileText } from 'lucide-react';

const pdfList = [
  { id: 'guide', name: 'Production Guide', file: '/pdfs/IMLS_Serenito_Production_Guide.pdf' },
  { id: 'canon', name: 'Canon Visual y Guía de Estilo', file: '/pdfs/VLS_Serenito_3D_Canon_Visual_y_Guia_de_Estilo.pdf' },
  { id: 'biblia', name: 'Biblia Visual de Producción', file: '/pdfs/VLS_Serenito_Produccion_Biblia_Visual.pdf' },
  { id: 'toys', name: 'Toys & Local Hero Story', file: '/pdfs/IMLS_Serenito_Toys_A_Local_Hero_Story.pdf' }
];

const PdfViewerModal = ({ isOpen, onClose }) => {
  const [selectedPdf, setSelectedPdf] = useState(pdfList[0]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(10px)',
        zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.05)',
            width: '100%', maxWidth: '1200px', height: '90vh',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <BookOpen size={24} color="#f59e0b" />
              </div>
              <div>
                <h2 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Propuestas Gráficas (VecinoSmart)</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.2rem 0 0' }}>Biblias visuales y modelos de campañas VLS</p>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem' }} className="hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{ width: '300px', borderRight: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>DOCUMENTOS DISPONIBLES</div>
              {pdfList.map(pdf => (
                <button
                  key={pdf.id}
                  onClick={() => setSelectedPdf(pdf)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem',
                    background: selectedPdf.id === pdf.id ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                    border: selectedPdf.id === pdf.id ? '1px solid rgba(245, 158, 11, 0.2)' : '1px solid transparent',
                    borderRadius: '12px', color: selectedPdf.id === pdf.id ? 'white' : '#94a3b8',
                    cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s'
                  }}
                  className="hover:bg-amber-500/10"
                >
                  <FileText size={18} color={selectedPdf.id === pdf.id ? "#f59e0b" : "#64748b"} />
                  <span style={{ fontSize: '0.85rem', fontWeight: selectedPdf.id === pdf.id ? 700 : 500, lineHeight: 1.3 }}>{pdf.name}</span>
                  {selectedPdf.id === pdf.id && <ChevronRight size={16} color="#f59e0b" style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>

            {/* Viewer */}
            <div style={{ flex: 1, background: '#e2e8f0', position: 'relative' }}>
              <iframe 
                src={`${selectedPdf.file}#view=FitH`}
                title={selectedPdf.name}
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PdfViewerModal;
