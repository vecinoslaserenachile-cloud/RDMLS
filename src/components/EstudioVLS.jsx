import React, { useState } from 'react';
import { X, Video, Mic, Radio, Zap, Settings, CreditCard, Clock, Activity, Monitor, ShieldCheck } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './EstudioVLS.module.css'; // CSS Module para encapsulación

/**
 * EstudioVLS Component
 * Professional Broadcast Studio and Booking System for VLS
 */
const EstudioVLS = ({ onClose }) => {
  const [duracion, setDuracion] = useState(30); // Estado para la duración de la sesión

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // Limpiar selección visual

    const start = selectInfo.start;
    const end = new Date(start.getTime() + duracion * 60000);

    // Validación de horario estricto (18:00 - 23:00)
    if ((end.getHours() === 23 && end.getMinutes() > 0) || end.getHours() > 23 || start.getHours() < 18) {
      alert("⚠️ Lo sentimos, las sesiones deben ser agendadas y finalizar dentro del bloque nocturno corporativo: 18:00 a 23:00 hrs.");
      return;
    }

    const confirmacion = window.confirm(
      `🏛️ ¿RESERVAR SESIÓN EN ESTUDIO VLS?\n\n` +
      `📅 Fecha: ${start.toLocaleDateString()}\n` +
      `⏰ Hora: ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}\n` +
      `⏱️ Duración: ${duracion} minutos\n\n` +
      `Serás redirigido a la pasarela de pago segura (VecinityPay / Flow).`
    );

    if (confirmacion) {
      // Payload para integración futura con backend D1/R2 y pasarela de pagos
      console.log("Payload Reserva Estudio VLS:", { 
        inicio: start.toISOString(), 
        fin: end.toISOString(), 
        duracionMinutos: duracion,
        vls_module: 'ESTUDIO_AUDIOVISUAL'
      });
      alert("🚀 Iniciando integración con pasarela de pago... Por favor, no cierres esta ventana.");
      // window.dispatchEvent(new CustomEvent('open-vecinity-pay', { detail: { reservation: 'ESTUDIO' } }));
    }
  };

  return (
    <div className={styles.estudioContainer}>
      <button onClick={onClose} className={styles.closeButton} title="Cerrar Estudio">
        <X size={24} />
      </button>

      <header className={styles.header}>
        <div className={styles.heroImageContainer}>
          <img 
            src="https://raw.githubusercontent.com/vecinoslaserenachile-cloud/juego-serenito/41eb67d558d1ddeb1e54760af1bc6d7a803ef66b/VLStudio.jpeg" 
            alt="Estudio VLS Professional Broadcast Set" 
            className={styles.heroImage}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className={styles.heroOverlay}>
            <Radio size={48} color="#00BCD4" className={styles.pulseIcon} />
            <h1 className={styles.title}>ESTUDIO AUDIOVISUAL VLS</h1>
          </div>
        </div>
        <p className={styles.subtitle}>Servicios y Equipamiento Broadcast de Elite. Arrienda nuestro espacio para tus producciones profesionales.</p>
      </header>

      {/* SHOWROOM TÉCNICO */}
      <section className={styles.gridTech}>
        <div className={styles.cardTech}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Video color="#00BCD4" />
            <h3>Captura Multi-Cámara 4K</h3>
          </div>
          <ul>
            <li><strong>Cámara Principal:</strong> Sony ZV-E10 (Sensor APS-C, 4K nativo)</li>
            <li><strong>Cámara Detalle:</strong> Nikon P900 (Zoom Óptico 83x para inserts)</li>
            <li><strong>Conectividad:</strong> Link360 para flujos directos a red</li>
          </ul>
        </div>

        <div className={styles.cardTech}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Zap color="#00BCD4" />
            <h3>Switching & Live Stream</h3>
          </div>
          <ul>
            <li><strong>Producción:</strong> YoloLiv YoloBox Ultra (Grabación ISO 10bit)</li>
            <li><strong>Switcher Secundario:</strong> Feelworld L4 Profesional</li>
            <li><strong>Estación Central:</strong> PC i5 Custom + Monitoreo 21" 4K</li>
          </ul>
        </div>

        <div className={styles.cardTech}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Mic color="#00BCD4" />
            <h3>Audio High-End</h3>
          </div>
          <ul>
            <li><strong>Mesa de Mezcla:</strong> Zoom L8 (Grabación Multicanal)</li>
            <li><strong>Microfonía:</strong> Samson Q9U (Broadcast) & Shure SM58</li>
            <li><strong>Inalámbricos:</strong> Sistema Samson 2+2 Diversidad</li>
            <li><strong>Monitoreo:</strong> Adam Audio D3V + Par JBL 3mk2</li>
          </ul>
        </div>

        <div className={styles.cardTech}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Monitor color="#00BCD4" />
            <h3>Set & Escenografía</h3>
          </div>
          <ul>
            <li><strong>Control:</strong> Layout "Pecera" aislado acústicamente</li>
            <li><strong>Set Central:</strong> Mesa redonda de alto brillo, pilar aluminio</li>
            <li><strong>Branding:</strong> Pantalla 4K 55" para fondos dinámicos</li>
            <li><strong>Iluminación:</strong> 3 Focos Neewer (Rectangulares + Redondo)</li>
          </ul>
        </div>
      </section>

      {/* FLUJOS DE ENTREGA */}
      <section className={styles.workflowPanel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Activity color="#00BCD4" size={28} />
            <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>Flujos de Entrega de Material</h3>
        </div>
        <div className={styles.workflows}>
          <div className={styles.flowItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#00BCD4" />
                <h4>1. Entrega Directa (Raw Switched)</h4>
            </div>
            <p>Tu sesión grabada en multicámara y switcheada en vivo vía YoloLiv Ultra se entrega al finalizar mediante Google Drive en máxima calidad. Listo para publicar, sin esperas ni edición adicional.</p>
          </div>
          <div className={styles.flowItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={16} color="#00BCD4" />
                <h4>2. Post-producción Profesional</h4>
            </div>
            <p>Nuestro equipo pule tu material en la suite de edición dedicada (Monitoreo Adam/JBL) para entregarte un producto final de nivel televisivo con Motion Graphics, corrección de color y mezcla de audio masterizada.</p>
          </div>
        </div>
      </section>

      {/* AGENDAMIENTO */}
      <section className={styles.bookingSection}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
            <CreditCard color="#00BCD4" />
            <h2 className={styles.bookingTitle}>Sistema de Reserva de Horas</h2>
        </div>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '40px', textTransform: 'uppercase', letterSpacing: '2px' }}>Disponibilidad: Lunes a Domingo (18:00 - 23:00 hrs)</p>
        
        <div className={styles.durationControls}>
          <button 
            className={`${styles.btnDuration} ${duracion === 30 ? styles.active : ''}`}
            onClick={() => setDuracion(30)}
          >
            Sesión 30 Minutos
          </button>
          <button 
            className={`${styles.btnDuration} ${duracion === 60 ? styles.active : ''}`}
            onClick={() => setDuracion(60)}
          >
            Sesión 1 Hora
          </button>
        </div>

        <div className={styles.calendarWrapper}>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            locale="es"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            slotMinTime="18:00:00"
            slotMaxTime="23:00:00"
            slotDuration="00:30:00"
            allDaySlot={false}
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            height="auto"
            events={[]} // Aquí se cargarán las reservas reales desde D1
          />
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', opacity: 0.6 }}>
            <p style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <ShieldCheck size={14} color="#00BCD4" /> 
                Certificación Técnica VLS · I. Municipalidad de La Serena 2026
            </p>
        </div>
      </section>
    </div>
  );
};

export default EstudioVLS;
