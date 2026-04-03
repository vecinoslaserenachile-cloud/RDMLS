import React, { useState } from 'react';
import TopMusicaMarruecos from './TopMusicaMarruecos';

export default function MarruecosPortal() {
  // Estado de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Estado para las pestañas
  const [activeTab, setActiveTab] = useState('pauta');

  // Función de validación
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'laserena2026') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
    }
  };

  // 1. Pantalla de Login
  if (!isLoggedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.loginCard}>
          <h2 style={styles.title}>Acceso Reservado: Marruecos</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="password"
              placeholder="Ingresa la clave de acceso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.button}>Ingresar al Panel</button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Pantalla Principal (Dashboard y Pestañas)
  return (
    <div style={styles.container}>
      <div style={styles.dashboardCard}>
        <h1 style={styles.title}>Dossier Especial: Embajadora Kenza El Ghali</h1>

        {/* Navegación de Pestañas */}
        <div style={styles.tabContainer}>
          <button onClick={() => setActiveTab('pauta')} style={activeTab === 'pauta' ? styles.activeTab : styles.tab}>Pauta Entrevista</button>
          <button onClick={() => setActiveTab('checklist')} style={activeTab === 'checklist' ? styles.activeTab : styles.tab}>Checklist Interactivo</button>
          <button onClick={() => setActiveTab('pdf')} style={activeTab === 'pdf' ? styles.activeTab : styles.tab}>Reporte PDF</button>
          <button onClick={() => setActiveTab('podcast')} style={activeTab === 'podcast' ? styles.activeTab : styles.tab}>Podcast (Audio)</button>
          <button onClick={() => setActiveTab('musica')} style={activeTab === 'musica' ? styles.activeTab : styles.tab}>🎵 Top Musical</button>
        </div>

        {/* Contenido Dinámico */}
        <div style={styles.contentArea}>
          
          {/* Pestaña: Pauta */}
          {activeTab === 'pauta' && (
            <div>
              <h2 style={styles.contentTitle}>Pauta de Entrevista Oficial</h2>
              <div style={styles.textContent}>
                <p><strong>BLOQUE 1:</strong> El Escenario Local y la Diplomacia Cultural</p>
                <p><strong>BLOQUE 2:</strong> Perfil Humano y Derechos de la Mujer</p>
                <p><strong>BLOQUE 3:</strong> Geopolítica, Megaproyectos y Visión 2030</p>
                <p><strong>BLOQUE 4:</strong> Desafíos Sociales y Climáticos</p>
              </div>
            </div>
          )}

          {/* Pestaña: Checklist */}
          {activeTab === 'checklist' && (
            <div>
              <h2 style={styles.contentTitle}>Checklist de Producción (Post-Producido)</h2>
              <label style={styles.checkboxLabel}><input type="checkbox" /> 1. Confirmar permisos y protocolo en Mezquita de Coquimbo</label>
              <label style={styles.checkboxLabel}><input type="checkbox" /> 2. Sincronización de 3 cámaras y uso de Claqueta</label>
              <label style={styles.checkboxLabel}><input type="checkbox" /> 3. Configuración de micrófonos Lavalier ocultos</label>
              <label style={styles.checkboxLabel}><input type="checkbox" /> 4. Grabación B-Roll: Mosaicos Zellij y contexto</label>
              <label style={styles.checkboxLabel}><input type="checkbox" /> 5. Ingesta a discos dobles al finalizar grabación</label>
            </div>
          )}

          {/* Pestaña: PDF */}
          {activeTab === 'pdf' && (
            <div>
              <h2 style={styles.contentTitle}>Investigación Extendida (PDF)</h2>
              <iframe src="/reporte-marruecos.pdf" width="100%" height="500px" style={{border: '1px solid #ccc', borderRadius: '4px'}}></iframe>
            </div>
          )}

          {/* Pestaña: Top Musical */}
          {activeTab === 'musica' && (
            <div>
              <TopMusicaMarruecos />
            </div>
          )}

          {/* Pestaña: Podcast */}
          {activeTab === 'podcast' && (
            <div>
              <h2 style={styles.contentTitle}>Podcast: Análisis Marruecos 2030</h2>
              <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <p style={{marginBottom: '10px'}}>Escucha el overview especial de nuestro equipo de investigación:</p>
                <audio controls style={{width: '100%'}}>
                  <source src="/podcast-marruecos.mp3" type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Objeto de estilos aislados para evitar conflictos con el sitio en vivo
const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' },
  loginCard: { backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  dashboardCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '900px', minHeight: '600px' },
  title: { textAlign: 'center', color: '#1f2937', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { padding: '12px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '16px' },
  button: { padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background 0.3s' },
  error: { color: '#ef4444', fontSize: '14px', marginBottom: '15px', textAlign: 'center', fontWeight: '500' },
  tabContainer: { display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '25px', overflowX: 'auto' },
  tab: { padding: '10px 20px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', fontSize: '15px', color: '#6b7280', whiteSpace: 'nowrap' },
  activeTab: { padding: '10px 20px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', fontSize: '15px', fontWeight: 'bold', color: '#2563eb', borderBottom: '3px solid #2563eb', whiteSpace: 'nowrap' },
  contentArea: { padding: '10px 0' },
  contentTitle: { color: '#111827', marginBottom: '20px', fontSize: '20px' },
  textContent: { lineHeight: '1.6', color: '#374151' },
  checkboxLabel: { display: 'block', marginBottom: '12px', fontSize: '16px', cursor: 'pointer', color: '#4b5563' }
};
