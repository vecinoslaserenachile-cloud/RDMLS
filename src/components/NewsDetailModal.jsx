import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Tag, Clock, ExternalLink, Share2, Printer, MapPin } from 'lucide-react';

export default function NewsDetailModal({ item, onClose }) {
  if (!item) return null;

  // Simulate real images if not provided
  const images = [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop"
  ];
  
  const randomImg = images[Math.floor(Math.random() * images.length)];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200000,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="animate-slide-up" style={{
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        background: '#1a1a1a',
        borderRadius: '24px',
        border: '1px solid rgba(255,215,0,0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.1)'
      }}>
        {/* Banner Imagen */}
        <div style={{ position: 'relative', height: '300px', width: '100%', overflow: 'hidden' }}>
          <img 
            src={item.imageUrl || randomImg} 
            alt={item.title} 
            style={{ width: '100%', height: '100%', objectFit: 'crop' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(26,26,26,1) 100%)' }}></div>
          
          <button 
            onClick={onClose}
            className="btn-glass"
            style={{ position: 'absolute', top: '20px', right: '20px', padding: '0.6rem', borderRadius: '50%', color: 'white' }}
          >
            <X size={24} />
          </button>

          <div style={{ position: 'absolute', bottom: '20px', left: '30px', right: '30px' }}>
            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
              <span style={{ background: '#FFD700', color: '#000', padding: '0.3rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {item.category || item.type || 'Municipal'}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.3rem 1rem', borderRadius: '50px', fontSize: '0.75rem', backdropFilter: 'blur(5px)' }}>
                {item.date || 'Hoy'}
              </span>
            </div>
            <h1 style={{ color: 'white', fontSize: '2.2rem', margin: 0, lineHeight: '1.2', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {item.title}
            </h1>
          </div>
        </div>

        {/* Contenido */}
        <div style={{ padding: '2rem 3rem', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
              <User size={16} color="#FFD700" />
              <span>Escrito por: <strong>Redacción Radio VLS</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
              <Clock size={16} color="#FFD700" />
              <span>Lectura: <strong>3 min</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
              <MapPin size={16} color="#FFD700" />
              <span>Ubicación: <strong>La Serena, Chile</strong></span>
            </div>
          </div>

          <div style={{ color: '#e5e7eb', lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
            {item.content || `
En un esfuerzo continuo por modernizar la gestión territorial, la Municipalidad de La Serena ha desplegado un conjunto de nuevas capacidades tecnológicas bajo el estándar Smart City.

Esta iniciativa, liderada por la actual administración, contempla no solo la digitalización de procesos, sino también la integración de Inteligencia Artificial para el monitoreo preventivo y la atención ciudadana 24/7.

"Estamos construyendo la comuna del futuro hoy", indicaron las autoridades durante el despacho radial de esta mañana. Los vecinos pueden interactuar con estas nuevas herramientas a través del Portal Vecinal y la señal de Radio VLS.

Detalles Clave:
• Integración de cámaras C5 con análisis predictivo.
• Nueva flota de vehículos eléctricos para patrullaje.
• Sistema de alerta temprana para servicios básicos.
• Faro IA: El primer asistente cognitivo municipal de Chile.

Seguiremos informando sobre los avances de esta implementación en nuestras próximas emisiones.
            `}
          </div>

          <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(255,215,0,0.05)', borderRadius: '16px', border: '1px solid rgba(255,215,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Share2 size={16} /> Compartir
              </button>
              <button className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Printer size={16} /> Imprimir Nota
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Tag size={18} color="#FFD700" />
                <span style={{ fontSize: '0.8rem', color: '#FFD700' }}>#SmartCity #LaSerena #Radio VLS #Innovacion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
