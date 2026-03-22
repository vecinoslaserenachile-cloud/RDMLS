import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronRight, CheckCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

/**
 * MicroTutorialVLS: Sistema de guías rápidas interactivas.
 * Cumple con Regla #4: Micro tutoriales con animaciones para cada sección.
 * Incorpora a "Serenito" como guía 3D humanizado.
 */
export default function MicroTutorialVLS({ section, onFinish, isOpen }) {
    const [step, setStep] = useState(1);
    
    const tutorialData = {
        'vecinofis': [
            { id: 1, title: 'BIENVENIDO A VECINOFIS', text: 'Crea documentos libres y soberanos. Empieza con un lienzo en blanco o usa la IA.', icon: <Sparkles color="#38bdf8" /> },
            { id: 2, title: 'EXTRACCIÓN NEURAL (OCR)', text: 'En el módulo PHOTOS, puedes tomar fotos de documentos físicos para digitalizarlos.', icon: <CheckCircle color="#10b981" /> },
            { id: 3, title: 'EXPORTACIÓN LIBRE', text: 'Descarga tu trabajo en PDF, Word o sincroniza con Google Docs al instante.', icon: <ArrowRight color="#f59e0b" /> }
        ],
        'backoffice': [
            { id: 1, title: 'MONITOREO IN SITU', text: 'Registra baches o reportes de seguridad directamente con la cámara de tu móvil.', icon: <Sparkles color="#38bdf8" /> },
            { id: 2, title: 'GEORREFERENCIACIÓN VLS', text: 'Tus fotos se protocolizan automáticamente con ubicación GPS precisa.', icon: <CheckCircle color="#10b981" /> }
        ],
        'farito': [
            { id: 1, title: 'ASISTENTE NEURAL FARITO', text: 'Pregúntale lo que sea sobre trámites municipales o historia local.', icon: <Sparkles color="#38bdf8" /> },
            { id: 2, title: 'CONTROL POR VOZ', text: 'Puedes hablar con Farito usando el icono del micrófono en la barra superior.', icon: <CheckCircle color="#10b981" /> }
        ]
    };

    const currentTutorial = tutorialData[section] || tutorialData['vecinofis'];
    const totalSteps = currentTutorial.length;

    const nextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            onFinish();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                style={{ 
                    position: 'fixed', bottom: '30px', right: '30px', width: '350px', 
                    background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(56, 189, 248, 0.3)', borderRadius: '24px',
                    padding: '25px', zIndex: 10000000, color: 'white',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                    fontFamily: "'Outfit', sans-serif"
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: '#38bdf8', borderRadius: '50%', padding: '5px' }}><HelpCircle size={16} color="black" /></div>
                        <span style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '2px', color: '#38bdf8' }}>MICRO TUTORIAL VLS</span>
                    </div>
                    <button onClick={onFinish} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
                </div>

                {/* Content */}
                <div style={{ position: 'relative', marginBottom: '80px' }}>
                    <motion.div 
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{ width: '80px', height: '80px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
                            {currentTutorial[step - 1].icon}
                        </div>
                        <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: '900' }}>{currentTutorial[step - 1].title}</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>{currentTutorial[step - 1].text}</p>
                    </motion.div>
                </div>

                {/* Character Anchor (Serenito Mockup) */}
                <div style={{ position: 'absolute', bottom: '0px', left: '-50px', width: '120px' }}>
                     {/* Simulando a Serenito 3D Humanizado */}
                     <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ width: '100px', height: '140px', background: 'url(/img/serenito_guia.png) center/contain no-repeat', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
                     />
                </div>

                {/* Footer Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {Array(totalSteps).fill(0).map((_, i) => (
                            <div key={i} style={{ width: i + 1 === step ? '20px' : '6px', height: '6px', background: i + 1 === step ? '#38bdf8' : '#334155', borderRadius: '10px', transition: '0.3s' }} />
                        ))}
                    </div>
                    <button 
                        onClick={nextStep}
                        style={{ background: '#38bdf8', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                        {step === totalSteps ? '¡LISTO!' : 'CONTINUAR'} <ChevronRight size={16} />
                    </button>
                </div>

                <style>{`
                    @font-face {
                        font-family: 'Outfit';
                        src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;900&display=swap');
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
