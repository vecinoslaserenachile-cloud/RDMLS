import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Camera } from 'lucide-react';
import ArchiPosterCard from '../components/ArchiPosterCard';

// Base de datos de candidatos/as para generar afiches
const candidatesData = [
  {
    id: 'solange',
    name: 'Solange Gómez',
    role: 'CANDIDATA A PRESIDENTA',
    image: '/archi-media/FOTOS REALES ARCHI/Solange.png',
    pillar: 'Liderazgo con Nueva Energía',
    text: 'Queremos modernizar la radiodifusión chilena con visión de futuro y una protección real para nuestras regiones.'
  },
  {
    id: 'rodrigo',
    name: 'Rodrigo',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/Rodrigo Jofré.png',
    pillar: 'Descentralización Real',
    text: 'Fortalecer a las radios locales y comunitarias es fortalecer la voz de todo Chile, desde las provincias hacia el centro.'
  },
  {
    id: 'ximena',
    name: 'Ximena',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/Ximena Callejón.png',
    pillar: 'Innovación Radial',
    text: 'Avanzaremos en la transformación digital, conectando nuestra tradición con las nuevas audiencias y tecnologías.'
  },
  {
    id: 'fernando',
    name: 'Fernando',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/Fernando Zambra.png',
    pillar: 'Sostenibilidad de los Medios',
    text: 'Por un modelo de gestión moderno y sustentable que garantice el futuro de nuestras emisoras.'
  },
  {
    id: 'mariagraciela',
    name: 'María Graciela',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/María Graciela.png',
    pillar: 'Transparencia Total',
    text: 'Una gestión abierta y de puertas abiertas para todos los radiodifusores.'
  },
  {
    id: 'rene',
    name: 'René',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/René Venegas.png',
    pillar: 'Representación Local Activa',
    text: 'Defensa activa de los intereses gremiales y protección frente a monopolios y legislaciones perjudiciales.'
  },
  {
    id: 'xavier',
    name: 'Xavier',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/Xavier Araya .png',
    pillar: 'Defensa de la Libertad de Expresión',
    text: 'Construyamos juntos la Archi que soñamos, con más participación y energía colectiva.'
  },
  {
    id: 'elicena',
    name: 'Elicena',
    role: 'MESA DIRECTIVA NACIONAL',
    image: '/archi-media/FOTOS REALES ARCHI/Elicena Gómez.png',
    pillar: 'Futuro de la Radio',
    text: 'La identidad de las regiones debe ser el corazón del nuevo modelo de la Archi.'
  },
  {
    id: 'mesa-completa',
    name: 'Lista Archi Nueva Energía',
    role: 'Directiva 2026',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Equipo Comprometido',
    text: 'Vota por la Lista Nueva Energía. Juntos renovaremos la voz de la radiodifusión en Chile.'
  },
  {
    id: 'pilar1',
    name: 'Soberanía Digital',
    role: 'PILAR 1',
    image: '/archi-media/3d/pillar1.png',
    pillar: 'Soberanía Digital y Código Abierto',
    text: 'Fin a la dependencia. Entregaremos a las emisoras locales herramientas multiplataforma de código abierto para streaming y publicidad.'
  },
  {
    id: 'pilar2',
    name: 'OIP y Equidad',
    role: 'PILAR 2',
    image: '/archi-media/3d/pillar2.png',
    pillar: 'OIP y Equidad Territorial',
    text: 'Creación del Observatorio de Inversión Pública (OIP). Asegurando que el 40% del avisaje estatal se destine mayoritariamente a medios regionales.'
  },
  {
    id: 'pilar3',
    name: 'Motor Económico',
    role: 'PILAR 3',
    image: '/archi-media/3d/pillar3.png',
    pillar: 'El Motor Económico de las Regiones',
    text: 'La radio es la inversión transaccional más rentable del retail local, movilizando la Economía Naranja con gran agilidad.'
  },
  {
    id: 'pilar4',
    name: 'Escudo Civil',
    role: 'PILAR 4',
    image: '/archi-media/3d/pillar4.png',
    pillar: 'Soporte en emergencias',
    text: 'La única red a prueba de apagones. La radio es la infraestructura crítica de seguridad nacional que salva vidas en emergencias.'
  }
];

export default function ArchiSocialHub() {
  const gold = '#d4af37';
  
  useEffect(() => {
    document.title = 'Social Hub | Archi Nueva Energía';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #001b54 50%, #020617 100%)',
      padding: '40px 20px',
      color: 'white',
      fontFamily: '"Outfit", sans-serif'
    }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '800px', margin: '0 auto 50px' }}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', 
            background: 'rgba(212,175,55,0.1)', border: `1px solid ${gold}`, 
            padding: '8px 20px', borderRadius: '30px', color: gold,
            fontWeight: 'bold', marginBottom: '20px'
          }}
        >
          <Camera size={18} /> Social Media Hub
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '15px' }}
        >
          Comparte Nuestra <span style={{ color: gold }}>Nueva Energía</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.6 }}
        >
          Ayúdanos a difundir el mensaje. Descarga los afiches de nuestra directiva o compártelos directamente en tus redes sociales para llegar a todos los radiodifusores del país.
        </motion.p>
      </div>

      {/* GALERÍA DE AFICHES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '100px'
      }}>
        {candidatesData.map((candidate, i) => (
          <motion.div 
            key={candidate.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
          >
            <ArchiPosterCard data={candidate} />
          </motion.div>
        ))}
      </div>
      
      {/* Botón flotante para volver al Home */}
      <motion.a 
        href="https://www.archinuevaenergia.cl"
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'fixed', bottom: '30px', left: '30px',
          background: 'rgba(0,0,0,0.6)', border: `1px solid ${gold}`,
          color: 'white', padding: '12px 20px', borderRadius: '30px',
          textDecoration: 'none', fontWeight: 'bold', zIndex: 1000,
          backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}
      >
        ← Volver al Inicio
      </motion.a>
    </div>
  );
}
