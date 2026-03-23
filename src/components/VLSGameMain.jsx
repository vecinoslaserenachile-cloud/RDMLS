import React, { useEffect } from 'react';
import VLSTriviaMain from './vls_trivia/VLSTriviaMain';

export default function VLSGameMain({ onClose }) {
  useEffect(() => {
    // Detener cualquier radio o TV en la plataforma al abrir el juego
    window.dispatchEvent(new CustomEvent('stop-all-audio'));
    window.dispatchEvent(new CustomEvent('stop-radio'));
  }, []);

  return (
    <div 
      className="fixed inset-0 min-h-screen bg-slate-950 text-white z-[9999999]"
      style={{
        zIndex: 9999999,
        background: '#020617',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <VLSTriviaMain onClose={onClose} />
    </div>
  );
}
