import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X as CloseIcon, Cpu, Zap, Activity, HardDrive, 
  Smartphone, Monitor, Radio, Award, Trophy, 
  MessageCircle, MapPin, ExternalLink, Settings, 
  ShieldCheck, Wrench, Microscope, Laptop
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, ContactShadows, Environment } from '@react-three/drei';
import UniversalSerenito from '../components/UniversalSerenito';

/* --- 3D Character Container --- */
function SerenitoHardware() {
  return (
    <group scale={0.08} position={[0, -2, 0]} rotation={[0, -0.4, 0]}>
      <UniversalSerenito animation="Idle" />
    </group>
  );
}

export default function AkichipPortal({ onClose }) {
  const [activeTab, setActiveTab] = useState('hardware'); // hardware, microsoldadura, futbol, contacto
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hardwareGallery = [
    { name: "Reballing GPU", desc: "Intervención de alta precisión en procesadores gráficos.", icon: Cpu, color: "#38bdf8" },
    { name: "Microsoldadura", desc: "Recuperación de pistas y componentes SMD nivel 3.", icon: Microscope, color: "#10b981" },
    { name: "Hardware Maestro", desc: "Modding y optimización de sistemas críticos.", icon: HardDrive, color: "#facc15" },
    { name: "Recuperación Data", desc: "Extracción forense de información en chips dañados.", icon: Activity, color: "#ef4444" }
  ];

  const futbolData = [
    { team: "CD La Serena", status: "Socio Protector", desc: "Apoyo tecnológico al granate del norte.", color: "#ef4444" },
    { team: "Coquimbo Unido", status: "Alianza Técnica", desc: "Soporte de hardware para la zona puerto.", color: "#facc15" },
    { team: "Ligas Vecinales", status: "Patrocinio 2025", desc: "Fomentando el deporte en los barrios de la región.", color: "#38bdf8" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 100000, 
        background: 'rgba(2, 6, 23, 0.98)', 
        backdropFilter: 'blur(30px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '0' : '2rem',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '1400px', 
          height: isMobile ? '100vh' : '90vh', 
          background: 'rgba(15, 23, 42, 0.7)',
          borderRadius: isMobile ? '0' : '40px',
          border: isMobile ? 'none' : '1px solid rgba(56, 189, 248, 0.2)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
          boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
          position: 'relative'
        }}
      >
        {/* Background Accent */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: '#38bdf8', opacity: 0.05, borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
        
        {/* SIDEBAR NAVIGATION */}
        <div style={{ 
          width: isMobile ? '100%' : '350px', 
          background: 'rgba(2, 6, 23, 0.4)', 
          borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.05)',
          borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
            <div style={{ background: '#38bdf8', padding: '10px', borderRadius: '15px', boxShadow: '0 0 20px rgba(56,189,248,0.3)' }}>
              <Cpu size={32} color="#020617" />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>AKICHIP <span style={{ color: '#38bdf8' }}>PORTAL</span></h1>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>Local 204 • La Serena</span>
            </div>
          </div>

          {[
            { id: 'hardware', icon: Wrench, label: 'Hardware Maestro' },
            { id: 'microsoldadura', icon: Microscope, label: 'Microsoldadura' },
            { id: 'futbol', icon: Trophy, label: 'Pasión Regional' },
            { id: 'contacto', icon: MapPin, label: 'Ubicación & Contacto' }
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileHover={{ x: 10, background: 'rgba(56, 189, 248, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '1.2rem',
                borderRadius: '20px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                color: activeTab === tab.id ? '#38bdf8' : '#64748b',
                cursor: 'pointer',
                textAlign: 'left',
                transition: '0.3s'
              }}
            >
              <tab.icon size={22} />
              <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{tab.label}</span>
              {activeTab === tab.id && <motion.div layoutId="indicator" style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />}
            </motion.button>
          ))}

          <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
               "Nuestra ciencia es el hardware. Nuestra pasión es La Serena."
             </p>
             <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
                <div style={{ background: '#10b981', width: '8px', height: '8px', borderRadius: '50%' }} />
                <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold' }}>SISTEMA ONLINE (LAB-204)</span>
             </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header Actions */}
          <div style={{ padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', zIndex: 10 }}>
            <button 
              onClick={() => window.open('https://wa.me/56900000000', '_blank')}
              style={{ background: '#22c55e', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '15px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <MessageCircle size={18} /> CONSULTA WHATSAPP
            </button>
            <button 
              onClick={onClose}
              style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '15px', cursor: 'pointer' }}
            >
              <CloseIcon size={24} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '1rem 4rem 4rem 4rem', overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'hardware' && (
                <motion.div 
                  key="hardware"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Hardware <span style={{ color: '#38bdf8' }}>Maestro</span></h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px' }}>Ingeniería de recuperación y optimización nivel quirúrgico.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {hardwareGallery.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        style={{ 
                          background: 'rgba(255,255,255,0.02)', 
                          padding: '2.5rem', 
                          borderRadius: '32px', 
                          border: `1px solid ${item.color}20`,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: item.color, opacity: 0.05, borderRadius: '50%', filter: 'blur(40px)' }} />
                        <div style={{ background: `${item.color}15`, width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                          <item.icon size={30} color={item.color} />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 10px 0' }}>{item.name}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* 3D AVATAR SECTION */}
                  <div style={{ 
                    marginTop: '4rem', 
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(15, 23, 42, 0) 100%)',
                    borderRadius: '40px',
                    padding: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    border: '1px solid rgba(56, 189, 248, 0.1)'
                  }}>
                    <div style={{ width: '250px', height: '250px', background: 'rgba(0,0,0,0.2)', borderRadius: '30px', overflow: 'hidden' }}>
                       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                          <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                              <SerenitoHardware />
                            </Float>
                            <Environment preset="city" />
                            <ContactShadows opacity={0.4} />
                          </Suspense>
                       </Canvas>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Asesoría Maestra</h3>
                      <p style={{ color: '#94a3b8', maxWidth: '500px', lineHeight: 1.6 }}>
                        ¿Tu equipo no enciende o tiene fallas extrañas? Nuestro "Serenito Hardware" te guía en el diagnóstico preventivo antes de la intervención física.
                      </p>
                      <button className="btn-primary" style={{ marginTop: '1.5rem', background: '#38bdf8', color: '#020617', padding: '1rem 2rem', borderRadius: '15px', fontWeight: '900' }}>INICIAR DIAGNÓSTICO IA</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'microsoldadura' && (
                <motion.div 
                  key="microsoldadura"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Microsoldadura <span style={{ color: '#10b981' }}>Quirúrgica</span></h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px' }}>Intervenciones de alta complejidad a nivel de placa madre y circuitos integrados SMD.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {[
                      { name: "Reconstrucción de Pistas", desc: "Unión y puenteado microscópico de líneas de cobre dañadas por corrosión, humedad o impacto físico.", color: "#10b981", icon: Cpu },
                      { name: "Puertos HDMI & Tipo C", desc: "Remoción e instalación de conectores con soldadura de alta precisión y aleaciones para transferencia de señal óptima.", color: "#0ea5e9", icon: Zap },
                      { name: "Diagnóstico Térmico", desc: "Monitoreo con cámaras infrarrojas para detectar cortocircuitos de corriente exactos en micro-capacitores.", color: "#facc15", icon: Activity },
                      { name: "Reparación de PMIC", desc: "Reemplazo de chips controladores de energía y reguladores de voltaje principales en consolas y laptops.", color: "#f43f5e", icon: HardDrive }
                    ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -10 }}
                        style={{ 
                          background: 'rgba(255,255,255,0.02)', 
                          padding: '2.5rem', 
                          borderRadius: '32px', 
                          border: `1px solid ${item.color}20`,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: item.color, opacity: 0.05, borderRadius: '50%', filter: 'blur(40px)' }} />
                        <div style={{ background: `${item.color}15`, width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                          <item.icon size={30} color={item.color} />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 10px 0' }}>{item.name}</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* LIVE SOLDERING STATION CARD */}
                  <div style={{ 
                    marginTop: '4rem', 
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0) 100%)',
                    borderRadius: '40px',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    gap: '3rem',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                  }}>
                    <div style={{ 
                      background: 'rgba(0,0,0,0.4)', 
                      padding: '2rem', 
                      borderRadius: '30px', 
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      width: isMobile ? '100%' : '300px',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold', letterSpacing: '2px', display: 'block', marginBottom: '1rem' }}>ESTACIÓN DE SOLDADURA JBC v2025</span>
                      <div style={{ fontSize: '3rem', fontWeight: 950, color: '#f97316', textShadow: '0 0 20px rgba(249, 115, 22, 0.3)' }}>
                        385°C
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>Punta C210-002 (Ultra Fina)</div>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem' }}>
                        <div style={{ background: '#10b981', width: '8px', height: '8px', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
                        <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold' }}>TEMPERATURA ESTABLECIDA</span>
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Estándar Quirúrgico ESD</h3>
                      <p style={{ color: '#94a3b8', maxWidth: '500px', lineHeight: 1.6 }}>
                        Todas nuestras intervenciones se realizan bajo estrictas normas de protección ESD (descarga electroestática) y microscopía digital avanzada, garantizando que el circuito integrado de tu dispositivo no sufra estrés térmico destructivo.
                      </p>
                      <button 
                        onClick={() => window.open('https://wa.me/56985902025', '_blank')}
                        style={{ marginTop: '1.5rem', background: '#10b981', color: '#020617', border: 'none', padding: '1rem 2.5rem', borderRadius: '15px', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}
                      >
                        RESERVAR HORA EN TALLER
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'futbol' && (
                <motion.div 
                  key="futbol"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Pasión <span style={{ color: '#ef4444' }}>Granate y Aurinegra</span></h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px' }}>Comprometidos con el desarrollo del deporte en la Región de Coquimbo.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {futbolData.map((club, idx) => (
                      <div key={idx} style={{ 
                        background: 'rgba(255,255,255,0.02)', 
                        borderRadius: '35px', 
                        padding: '2.5rem', 
                        border: `2px solid ${club.color}30`,
                        position: 'relative'
                      }}>
                         <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                            <Award color={club.color} size={32} />
                         </div>
                         <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: club.color, marginBottom: '5px' }}>{club.team}</h3>
                         <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#fff', background: `${club.color}40`, padding: '4px 12px', borderRadius: '50px', display: 'inline-block', marginBottom: '1.5rem' }}>{club.status}</div>
                         <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{club.desc}</p>
                         <button style={{ marginTop: '2rem', background: 'transparent', border: `1px solid ${club.color}`, color: club.color, padding: '0.8rem 1.5rem', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>VER CONVENIO CLUB</button>
                      </div>
                    ))}
                  </div>

                  <div style={{ 
                    marginTop: '4rem', 
                    padding: '3rem', 
                    borderRadius: '40px', 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    textAlign: 'center'
                  }}>
                     <Trophy size={60} color="#facc15" style={{ marginBottom: '1.5rem' }} />
                     <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>Campeones del Servicio</h3>
                     <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '1rem auto' }}>
                       En Akichip no solo soldamos componentes, forjamos el futuro tecnológico de nuestros deportistas y vecinos.
                     </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'contacto' && (
                <motion.div 
                  key="contacto"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3rem' }}>
                    <div>
                      <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Local <span style={{ color: '#38bdf8' }}>204</span></h2>
                      <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px', marginBottom: '3rem' }}>Visítanos en el corazón de La Serena. Laboratorio experto 24/7.</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                          <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '20px' }}>
                            <MapPin size={28} color="#38bdf8" />
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'white', fontSize: '1.1rem' }}>Dirección</strong>
                            <span style={{ color: '#94a3b8' }}>Calle Brasil 204, Sector Centro, La Serena.</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                          <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '20px' }}>
                            <Smartphone size={28} color="#22c55e" />
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'white', fontSize: '1.1rem' }}>Teléfono Maestro</strong>
                            <span style={{ color: '#94a3b8' }}>+56 9 8590 2025</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '20px' }}>
                            <Radio size={28} color="#ef4444" />
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'white', fontSize: '1.1rem' }}>Canal RDMLS</strong>
                            <span style={{ color: '#94a3b8' }}>Frecuencia Interna 96.0 FM (Local Only)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ 
                      background: 'rgba(0,0,0,0.3)', 
                      borderRadius: '40px', 
                      padding: '2rem', 
                      border: '1px solid rgba(255,255,255,0.05)',
                      height: '450px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                       <div style={{ position: 'absolute', inset: 0, opacity: 0.4, background: 'url("https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop") center/cover' }} />
                       <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                          <div style={{ background: 'rgba(56, 189, 248, 0.9)', color: '#020617', padding: '1rem 2rem', borderRadius: '20px', fontWeight: '900', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(56,189,248,0.4)', marginBottom: '1.5rem' }}>
                            UBICACIÓN EXACTA
                          </div>
                          <button style={{ background: 'white', color: 'black', border: 'none', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            ABRIR GOOGLE MAPS <ExternalLink size={18} />
                          </button>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div style={{ padding: '2rem 4rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2, 6, 23, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
               <ShieldCheck color="#38bdf8" size={18} />
               <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>CERTIFICACIÓN SMART BUSINESS VLS-2025</span>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
               <span style={{ fontSize: '0.75rem', color: '#475569' }}>TÉRMINOS Y CONDICIONES</span>
               <span style={{ fontSize: '0.75rem', color: '#475569' }}>POLÍTICA DE PRIVACIDAD</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function Suspense({ children, fallback }) {
  return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
}
