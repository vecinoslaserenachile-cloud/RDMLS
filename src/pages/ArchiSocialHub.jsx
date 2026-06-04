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
    id: 'prop-oip',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: OIP',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Observatorio de Inversión Pública',
    text: 'Garantizar que el 40% del avisaje estatal se destine a radios regionales y locales, monitoreado por el OIP para asegurar una distribución equitativa.'
  },
  {
    id: 'prop-escudo',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Escudo Civil',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Escudo Radial de Emergencias',
    text: 'Consolidar la infraestructura de transmisión crítica regional. La radio es el único medio que salva vidas y permanece activo en catástrofes.'
  },
  {
    id: 'prop-transparencia',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Transparencia',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Gestión de Puertas Abiertas',
    text: 'Transparencia total y auditoría periódica de recursos en la Archi. Cuentas claras y procesos abiertos para todos los radiodifusores.'
  },
  {
    id: 'prop-soberania',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Soberanía Digital',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Código Abierto Gremial',
    text: 'Independencia tecnológica para las emisoras locales: entregaremos herramientas de código abierto para streaming, servidores y control publicitario.'
  },
  {
    id: 'prop-defensa',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Blindaje Legal',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Defensa de Concesiones',
    text: 'Creación de un equipo legal experto permanente en Archi para defender y agilizar los trámites de renovación de espectro y concesión en todo Chile.'
  },
  {
    id: 'prop-naranja',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Economía Naranja',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Motor del Retail Local',
    text: 'La radio es el medio transaccional más rentable y ágil para movilizar el comercio y el desarrollo local de las provincias.'
  },
  {
    id: 'prop-equidad',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Equidad Territorial',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Descentralización Publicitaria',
    text: 'Terminar con el centralismo que concentra la pauta publicitaria nacional. Lucharemos por un avisaje estatal verdaderamente descentralizado.'
  },
  {
    id: 'prop-capacitacion',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Innovación',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Capacitación Multiplataforma',
    text: 'Desarrollo de aulas digitales E-Learning de formación continua para tecnificar y guiar a las radios de regiones en el ecosistema digital.'
  },
  {
    id: 'prop-democracia',
    name: 'Directiva Nueva Energía',
    role: 'Propuesta: Pluralismo',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Voz Gremial Democrática',
    text: 'Garantizar y proteger el pluralismo informativo regional frente a monopolios y legislaciones perjudiciales para la libertad de expresión.'
  },
  {
    id: 'prop-liderazgo',
    name: 'Solange Gómez Presidenta',
    role: 'Propuesta: Lista Completa',
    image: '/archi-media/fotos/Mesa postula ARCHI.png',
    pillar: 'Nueva Energía para la Archi',
    text: 'Vota Lista Nueva Energía: un equipo multidisciplinario con visión de futuro para una Archi descentralizada, representativa y unida.'
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
