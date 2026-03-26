import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VLSTriviaMain from './vls_trivia/VLSTriviaMain';

export default function VLSGameMain({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Detener cualquier radio o TV en la plataforma al abrir el juego
    window.dispatchEvent(new CustomEvent('stop-all-audio'));
    window.dispatchEvent(new CustomEvent('stop-radio'));
    // Asegurarse de que el body no haga scroll
    document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
      if (onClose) onClose();
      else navigate('/');
  };

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
      <VLSTriviaMain onClose={handleClose} />
    </div>
  );
}
