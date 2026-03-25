import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, BookOpen, User, Calendar, ExternalLink, X, MessageSquare, Share2, Music, Video, Newspaper, Users, Award, Heart, Globe, Mic } from 'lucide-react';

const LEGACY_NOTES = [
    { 
        id: "e4AYdzIF6OQ", type: "MÚSICA", cat: "Sesiones Musicales", title: "Los Vikings 5", 
        titular: "Los Vikings 5: La Epopeya de la Cumbia Eléctrica en el Puerto", 
        bajada: "Más de medio siglo de historia: Cómo una familia de carpinteros de Coquimbo transformó la música tropical chilena.", 
        body: "La historia de Los Vikings 5 no es solo una biografía musical, es el relato antropológico de Coquimbo. Inspirados por el rock and roll, incorporaron la guitarra eléctrica como voz principal, creando un sonido único que hoy es Patrimonio Vivo de la Región.",
        contacto: "Instagram: @losvikings5oficial", cita: "Sin los Vikings, Chile no tiene fiesta.",
        color: "#f59e0b"
    },
    { 
        id: "R-hC2QuUdE8", type: "MÚSICA", cat: "Sesiones Musicales", title: "Grupo Colapso", 
        titular: "Colapso: El Grito Visceral del Rock en el Valle del Elqui", 
        bajada: "Una propuesta de rock alternativo que canaliza la aridez del paisaje y la crítica social en un sonido demoledor.", 
        body: "Colapso irrumpe con una propuesta que abraza la distorsión para hablar de la tierra quebrada y la supervivencia en el semiárido, demostrando que el rock regional tiene una potencia inigualable.",
        contacto: "VLS Audio: Grupo Colapso", cita: "Nuestro rock nace de la grieta en la tierra seca.",
        color: "#ef4444"
    },
    { 
        id: "wzNKbSUFHQk", type: "MÚSICA", cat: "Sesiones Musicales", title: "Fernando Figueroa", 
        titular: "Fernando Figueroa: Crónicas Cantadas de Montegrande", 
        bajada: "Una sesión íntima donde la guitarra se convierte en pincel para retratar la memoria del agua y la poesía del valle.", 
        body: "Fernando es un cronista con guitarra que rescata historias de abuelos y mitos locales, fusionando la nueva trova con ritmos andinos en una defensa apasionada de los ríos libres.",
        contacto: "@ferfigueroa_musica", cita: "Mi música brota del agua clara de la cordillera.",
        color: "#10b981"
    },
    { 
        id: "ZAJpC9o-Mok", type: "MÚSICA", cat: "Sesiones Musicales", title: "Jorge Campos", 
        titular: "Jorge Campos: La Arquitectura del Bajo Eléctrico", 
        bajada: "El virtuoso ex bajista de Congreso y Fulano ofrece una clase magistral sobre técnica y libertad creativa.", 
        body: "Campos deconstruye su instrumento convirtiéndolo en una orquesta solista, explorando desde el folklore imaginario hasta el jazz fusión más agresivo.",
        contacto: "Web: jorgecampos.cl", cita: "El bajo es el corazón que conecta la tierra con el cielo.",
        color: "#3b82f6"
    },
    { 
        id: "EoIE7lVYWIw?start=1977", type: "ENTREVISTA", cat: "EntreVecinas", title: "Solange Miranda", 
        titular: "Adobe Vivo: El Renacimiento de la Arquitectura de Tierra", 
        bajada: "Solange Miranda desmantela los prejuicios contra el adobe y revela su potencial bioclimático futuro.", 
        body: "La arquitectura de tierra no es cosa del pasado; es una solución de eficiencia térmica y sanidad habitacional que Solange lidera en la Región.",
        contacto: "@mastierra_arquitectura", cita: "El adobe nos permite respirar con el entorno.",
        color: "#8b5cf6"
    },
    { 
        id: "EoIE7lVYWIw?start=1174", type: "ENTREVISTA", cat: "EntreVecinas", title: "Javiera Campos", 
        titular: "Alerta en la Desembocadura: Misión Javiera Campos", 
        bajada: "La protección del Pilpilén y el humedal del Río Elqui frente a la invasión de vehículos motorizados.", 
        body: "Educación ambiental para salvar el último refugio verde de La Serena. Javiera lucha contra el ingreso ilegal de camiones y jeeps.",
        contacto: "Depto. Medio Ambiente LS", cita: "Si el humedal muere, la ciudad queda desprotegida.",
        color: "#14b8a6"
    },
    { 
        id: "FBI_LIARS_VLS", type: "INTELIGENCIA", cat: "INTELIGENCIA", title: "Centinel Faro: Señales de Mentira", 
        titular: "12 Señales del FBI para detectar un mentiroso", 
        bajada: "Basado en el análisis de Mark Bouton, ex-agente del FBI. Cómo las micro-expresiones delatan el engaño.", 
        body: "Una guía técnica integrada en el motor de Smart Listening. El parpadeo rápido, la dirección de la mirada (arriba a la derecha en diestros indica invención) y la sudoración excesiva son indicadores clave. Este conocimiento se integra como capa de análisis en nuestro Centinel Faro para la detección de veracidad en reportes críticos.",
        contacto: "Unidad Centinel Faro VLS", cita: "Los ojos nunca mienten si sabes qué buscar.",
        color: "#38bdf8"
    },
    { 
        id: "ESTUDIOS_2023_VLS", type: "INVESTIGACIÓN", cat: "Protocolo", title: "Guía de Estudios 2023", 
        titular: "Oferta Académica 2023: Más de 9.000 vacantes en la Conurbación", 
        bajada: "Investigación Personal VLS: Conversaciones con directivos de AIEP, Santo Tomás e Inacap.", 
        body: "Un análisis detallado de la infraestructura educativa privada en La Serena y Coquimbo. Con más de 4500 estudiantes solo en AIEP y una oferta de 30 carreras técnicas, la región se consolida como un polo de formación profesional. El estudio destaca la importancia de la vinculación activa con el mundo laboral y la actualización de mallas cada 2 años para responder a la demanda estratégica regional.",
        contacto: "Redacción VLS Intelligence", cita: "La brecha no es técnica, es pedagógica.",
        color: "#14b8a6"
    },

    { 
        id: "MOVISTAR_CABLES_VLS", type: "TECNOLOGÍA", cat: "Hemeroteca", title: "Plan de Retiro Movistar", 
        titular: "El Fin del Cobre: El gran retiro de cables en La Serena", 
        bajada: "Actualización 2026: De la concesión española a la era de Onnet Fiber y KKR.", 
        body: "Lo que comenzó como un anuncio de retiro de cables de cobre hoy es una realidad de fibra total. Tras la venta del 60% de la infraestructura a KKR (Onnet Fiber), la ciudad ha visto una limpieza masiva de cables aéreos obsoletos, migrando hacia una infraestructura digital de alta velocidad. Chile lidera el retiro de cobre en el cono sur.",
        contacto: "Monitor de Infraestructura VLS", cita: "La fibra es el tejido de la nueva soberanía.",
        color: "#059669"
    },
    { 
        id: "NIETOS_ALEJO_VLS", type: "MÚSICA", cat: "Sesiones Musicales", title: "Los Nietos de Don Alejo", 
        titular: "Los Nietos de Don Alejo: Producción Original VLS", 
        bajada: "Nuestra creación: El sonido auténtico de la región capturado en los estudios VLS.", 
        body: "Una producción 100% propia de Vecinos La Serena. Grabada con el espíritu de la conurbación, esta sesión musical captura el talento local bajo la dirección técnica de nuestro pilar de Smart Citizens. Es parte de nuestro catálogo de preservación cultural regional.",
        contacto: "VLS Records / Producción Propia", cita: "Música con identidad serenense.",
        color: "#f472b6"
    },
    { 
        id: "HERMOSILLA_VLS", type: "HUMOR", cat: "HUMOR", title: "Hermosilla y Quintanilla", 
        titular: "De Chincol a Jote: Hermosilla y Quintanilla (1990)", 
        bajada: "Investigación Humorística: Las aventuras de los empleados públicos más famosos de la transición chilena.", 
        body: "Un registro histórico invaluable de 1990. Hermógenes Hermosilla y Quintalicio Quintanilla representan la burocracia de una oficina de archivos y partes bajo el mando de la señorita Astrid. Esta sátira, emitida originalmente en Canal 13, hoy sirve como espejo de la administración pública que el Pilar #2 de VLS (Smart Administration) busca modernizar definitivamente.",
        contacto: "Archivo REC TV / Memoria VLS", cita: "El trámite es mañana, caballero.",
        color: "#f43f5e"
    },
    { 
        id: "CHAGO_CHEF_VLS", type: "HUMOR", cat: "HUMOR", title: "Primo Chago Pinochef", 
        titular: "Primo Chago Pinochef del Palacio El Billete: ¡Sátira de Poder!", 
        bajada: "El primo Chago nos revela los secretos culinarios del Palacio El Billete y su parentesco con la 'Nueva Orden'.", 
        body: "Humor y política en una videollamada que revela cómo el menú presidencial de 'carne con puré' terminó sabiendo a pescados tras un 'Jueves de Pololeo' mal sanitizado. Una sátira necesaria en el Chile de 2026.",
        contacto: "Videollamada Privada VLS (Pinochef)", cita: "PRONTO DISPONIBLE",
        color: "#f43f5e"
    },
    { 
        id: "AGUAS_VALLE_VLS", type: "INVESTIGACIÓN", cat: "Hemeroteca", title: "Aguas del Valle", 
        titular: "Sanitaria dispuesta a evaluar el Emisario Submarino (Investigación 2023)", 
        bajada: "Sanitaria de La Serena dispuesta a evaluar mantener tratamiento y disposición instalada en 1987.", 
        body: "Publicado originalmente en Diciembre de 2023. Desde Vecinos La Serena contactamos a Aguas del Valle respecto al emisario submarino. Mientras la OCDE ya no los reconoce como sistemas de tratamiento propiamente tal, la conurbación sigue descargando aguas residuales con tratamiento primario, en contraste con modelos de cero descarga como los de Tongoy y Guanaqueros.",
        contacto: "Autor VLS Intelligence / Blog Noticioso", cita: "OCDE cuestiona: no es tratamiento propiamente tal.",
        color: "#38bdf8"
    },

];

export default function VLSNotesGallery({ isOpen, onClose }) {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const categories = ['ALL', 'Sesiones Musicales', 'EntreVecinas', 'Hemeroteca', 'Protocolo', 'HUMOR'];

  const filteredNotes = LEGACY_NOTES.filter(n => {
    const matchesFilter = filter === 'ALL' || n.cat === filter;
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.titular.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '12px',
                background: filter === cat ? 'var(--brand-primary, #3b82f6)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Buscar en el archivo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div
              layout
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => {
                if (note.id === 'CHAGO_CHEF_VLS') {
                   // Disabled until content is ready
                   return;
                }
                if (note.id === 'AGUAS_VALLE_VLS') {
                   window.dispatchEvent(new CustomEvent('open-vls-aguas'));
                   onClose && onClose();
                   return;
                }
                setSelectedNote(note);
              }}
              className="glass-panel hover-lift"
              style={{
                padding: '2rem',
                borderRadius: '24px',
                cursor: note.id === 'CHAGO_CHEF_VLS' ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background: 'rgba(15,23,42,0.6)',
                border: `1px solid ${note.color}40`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px'
              }}
            >
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05, zIndex: 0 }}>
                {note.type === 'MÚSICA' ? <Music size={180} color={note.color} /> : <Users size={180} color={note.color} />}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', color: note.color, textTransform: 'uppercase', border: `1px solid ${note.color}`, padding: '2px 8px', borderRadius: '4px' }}>
                        {note.cat}
                    </span>
                    <button style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none' }}><Share2 size={16}/></button>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>{note.titular}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{note.bajada}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: note.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} color="white" />
                 </div>
                 <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>{note.title}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Note Detail Modal */}
      <AnimatePresence>
        {selectedNote && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000005, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              style={{ 
                width: '100%', 
                maxWidth: '900px', 
                background: 'white', 
                borderRadius: '35px', 
                maxHeight: '90vh', 
                overflowY: 'auto',
                color: '#111827',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setSelectedNote(null)}
                style={{ position: 'sticky', top: '20px', left: 'calc(100% - 70px)', background: '#000', color: 'white', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
              >
                <X size={24} />
              </button>

              <div style={{ padding: '4rem' }}>
                <span style={{ color: selectedNote.color, fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>{selectedNote.cat}</span>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '1rem 0 2rem 0', lineHeight: '1.1', color: '#000' }}>{selectedNote.titular}</h1>
                
                <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '24px', marginBottom: '2rem', borderLeft: `8px solid ${selectedNote.color}` }}>
                  <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0, color: '#334155' }}>{selectedNote.bajada}</p>
                </div>

                {/* YOUTUBE CLIP INTEGRATION */}
                {selectedNote.id && !selectedNote.id.includes('Heme') && (
                  <div style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '16/9', background: '#000', marginBottom: '3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${selectedNote.id}`} 
                      title={selectedNote.titular} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                  {selectedNote.body}
                </div>

                <div style={{ padding: '2rem', background: '#0a0a0a', color: 'white', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {selectedNote.id === 'HERMOSILLA_VLS' && (
                      <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '15px', overflow: 'hidden', border: '5px solid #334155' }}>
                         <iframe 
                            width="100%" height="100%" 
                            src="https://www.youtube.com/embed/XW67J9C-t-k?autoplay=1" 
                            title="Hermosilla y Quintanilla" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                         ></iframe>
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                       <div>
                          <span style={{ fontSize: '0.7rem', color: selectedNote.color, fontWeight: '900', textTransform: 'uppercase' }}>CONTACTO / ORIGEN</span>
                          <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedNote.contacto}</p>
                       </div>
                       <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: '900', textTransform: 'uppercase' }}>VLS ARCHIVE</span>
                          <p style={{ margin: '4px 0 0 0', fontSize: '1.1rem', fontStyle: 'italic' }}>"{selectedNote.cita}"</p>
                       </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
