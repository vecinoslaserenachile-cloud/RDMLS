import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Mail, User, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulamos envío exitoso
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100050, 
      background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{
          background: 'linear-gradient(145deg, #1e293b, #0f172a)',
          borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '500px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(56, 189, 248, 0.2)',
          position: 'relative', color: 'white'
        }}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
              <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
            </motion.div>
            <h2 style={{ fontSize: '2rem', margin: '0 0 1rem', color: '#10b981' }}>¡Mensaje Enviado!</h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.5 }}>
              Gracias por contactarte. Nuestro equipo revisará tu mensaje y se pondrá en contacto pronto.
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <Mail size={32} color="#38bdf8" />
              </div>
              <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Contáctanos</h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '1rem' }}>Déjanos tu mensaje y te responderemos a la brevedad.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ position: 'relative' }}>
                <User size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Tu Nombre" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid #334155', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <Mail size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  placeholder="Correo Electrónico" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid #334155', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <MessageSquare size={20} color="#64748b" style={{ position: 'absolute', left: '1rem', top: '1.2rem' }} />
                <textarea 
                  placeholder="¿En qué te podemos ayudar?" 
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  required
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid #334155', borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                />
              </div>

              <button 
                type="submit" 
                style={{
                  background: 'linear-gradient(90deg, #38bdf8, #2563eb)', color: 'white', border: 'none',
                  padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  cursor: 'pointer', marginTop: '0.5rem', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Send size={20} /> ENVIAR MENSAJE
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
