import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Send, MessageSquare, BookOpen, Quote, Star, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const INITIAL_APORTES = [
  {
    id: 1,
    name: "Raúl M.",
    sector: "Las Compañías",
    title: "La Versión del Abuelo",
    content: "Mi abuelo contaba que Juan Soldado no murió en el cerro, sino que se integró a las luces que se ven desde la costa. Cada vez que hay neblina espesa (camanchaca), es Juan bajando a vigilar que los pescadores regresen a salvo.",
    date: "2024-03-20"
  },
  {
    id: 2,
    name: "Elena S.",
    sector: "El Milagro",
    title: "El Encuentro en la Cima",
    content: "Subí con mi grupo de trekking y en la cumbre sentimos una paz inexplicable. Un señor mayor nos dijo que Juan Soldado permitía el paso solo a quienes subían con respeto. Esa tarde las luces del Elqui brillaron más que nunca.",
    date: "2023-11-15"
  }
];

export default function JuanSoldadoAportes() {
  const [aportes, setAportes] = useState(INITIAL_APORTES);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    title: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.content) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newAporte = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      
      setAportes([newAporte, ...aportes]);
      setFormData({ name: '', sector: '', title: '', content: '' });
      setShowForm(false);
      setIsSubmitting(false);
      alert("¡Gracias por tu aporte vecinal! Tu versión ha sido publicada.");
    }, 1200);
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '950', color: '#e11d48', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Sparkles size={32} /> APORTES VECINALES
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '0.5rem' }}>Escribe la versión de la leyenda que escuchaste de tus antepasados.</p>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ 
            background: showForm ? '#334155' : '#e11d48', 
            color: 'white', border: 'none', padding: '1rem 2rem', 
            borderRadius: '15px', fontWeight: '900', cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 15px rgba(225, 29, 72, 0.3)'
          }}
        >
          {showForm ? 'CANCELAR' : 'SUBIR MI VERSIÓN'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              borderRadius: '24px', padding: '2.5rem', 
              border: '1px solid rgba(225, 29, 72, 0.2)',
              marginBottom: '4rem', overflow: 'hidden'
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#e11d48', letterSpacing: '1px' }}>NOMBRE</label>
                  <input 
                    type="text" required placeholder="Tu nombre" 
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    style={inputStyle} 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#e11d48', letterSpacing: '1px' }}>SECTOR / BARRIO (OPCIONAL)</label>
                  <input 
                    type="text" placeholder="Ej: Las Compañías" 
                    value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}
                    style={inputStyle} 
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#e11d48', letterSpacing: '1px' }}>TÍTULO DE LA VERSIÓN</label>
                <input 
                  type="text" required placeholder="Ej: La Ciudad de Niebla de mis abuelos" 
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  style={inputStyle} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#e11d48', letterSpacing: '1px' }}>RELATO DE LA LEYENDA</label>
                <textarea 
                  required rows="5" placeholder="Escribe aquí tu versión de Juan Soldado..." 
                  value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
                  style={{...inputStyle, resize: 'none'}} 
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  type="submit" disabled={isSubmitting}
                  style={{ 
                    background: '#e11d48', color: 'white', border: 'none', 
                    padding: '1rem 3rem', borderRadius: '15px', fontWeight: '900', 
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: '10px',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'PUBLICANDO...' : <><Send size={20} /> PUBLICAR VERSIÓN</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST OF APORTES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {aportes.map(aporte => (
          <motion.div 
            key={aporte.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.05)',
              padding: '2rem', transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: '#e11d48', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Quote size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white' }}>{aporte.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.3rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#94a3b8' }}>
                      <User size={14} color="#e11d48" /> {aporte.name}
                    </span>
                    {aporte.sector && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#94a3b8' }}>
                        <MapPin size={14} color="#e11d48" /> {aporte.sector}
                      </span>
                    )}
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>| {aporte.date}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleToggleExpand(aporte.id)}
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
              >
                {expandedId === aporte.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            <p style={{ 
              fontSize: '1.1rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.7)',
              display: '-webkit-box', WebkitLineClamp: expandedId === aporte.id ? 'unset' : '3', 
              WebkitBoxOrient: 'vertical', overflow: 'hidden', textAlign: 'justify'
            }}>
              {aporte.content}
            </p>

            {expandedId !== aporte.id && (
              <button 
                onClick={() => handleToggleExpand(aporte.id)}
                style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: '900', cursor: 'pointer', padding: 0, marginTop: '1rem', fontSize: '0.85rem' }}
              >
                LEER VERSIÓN COMPLETA
              </button>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.3)' }}>
                <BookOpen size={14} /> PUBLICACIÓN VECINAL VERIFICADA
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  background: 'rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '1rem 1.5rem',
  borderRadius: '15px',
  color: 'white',
  fontFamily: '"Outfit", sans-serif',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    borderColor: '#e11d48'
  }
};
