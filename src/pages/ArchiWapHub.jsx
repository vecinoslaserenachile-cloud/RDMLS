import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText, Send, Phone, Search, AlertCircle, RefreshCw, CheckCircle, Database } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function ArchiWapHub() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Plantilla de mensaje por defecto
  const [messageTemplate, setMessageTemplate] = useState(
    "Hola {Nombre}, soy Solange Gómez y te invito a ser parte de la Lista Nueva Energía para la directiva nacional de ARCHI. ¡Inyectemos nueva energía juntos! Visita www.archinuevaenergia.cl"
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Trackear a quiénes ya se les envió click
  const [sentLog, setSentLog] = useState({});
  const [selectedIds, setSelectedIds] = useState({});

  useEffect(() => {
    document.title = "WhatsApp Hub | ARCHI Nueva Energía";
    loadDatabase();
  }, []);

  const loadDatabase = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/archi-media/BASE MSGG.xlsx');
      if (!response.ok) {
        throw new Error('No se pudo encontrar el archivo BASE MSGG.xlsx en /archi-media/');
      }
      const arrayBuffer = await response.arrayBuffer();
      
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      const json = XLSX.utils.sheet_to_json(worksheet);
      
      // Intentar detectar columnas automáticamente
      const parsedContacts = json.map((row, index) => {
        // Encontrar columna de teléfono
        const phoneKey = Object.keys(row).find(key => key.toLowerCase().includes('telef') || key.toLowerCase().includes('celular') || key.toLowerCase().includes('fono') || key.toLowerCase().includes('wa'));
        // Encontrar columna de nombre
        const nameKey = Object.keys(row).find(key => key.toLowerCase().includes('nombre') || key.toLowerCase().includes('dirigente') || key.toLowerCase().includes('contacto') || key.toLowerCase().includes('radio'));
        
        let phoneRaw = phoneKey ? String(row[phoneKey]).replace(/\D/g, '') : '';
        // Asumir Chile por defecto si no tiene 56
        if (phoneRaw.length === 9) phoneRaw = '56' + phoneRaw;
        if (phoneRaw.length === 8) phoneRaw = '569' + phoneRaw;
        
        const name = nameKey ? String(row[nameKey]) : `Contacto ${index + 1}`;
        
        return {
          id: index,
          name: name,
          phone: phoneRaw,
          originalData: row
        };
      }).filter(c => c.phone.length >= 9); // Solo mantener los que parecen tener teléfono válido
      
      setContacts(parsedContacts);
    } catch (err) {
      console.error("Error al cargar la base de datos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendWA = (contact) => {
    // Reemplazar variables
    let finalMessage = messageTemplate.replace(/{Nombre}/gi, contact.name);
    finalMessage = finalMessage.trim();
    
    const encodedMessage = encodeURIComponent(finalMessage);
    const waUrl = `https://wa.me/${contact.phone}?text=${encodedMessage}`;
    
    // Marcar como enviado (local state)
    setSentLog(prev => ({ ...prev, [contact.id]: true }));
    
    // Abrir en nueva pestaña
    window.open(waUrl, '_blank');
  };

  const handleSendMultiple = async () => {
    const selected = contacts.filter(c => selectedIds[c.id]);
    if (selected.length === 0) {
      alert("Por favor selecciona al menos un contacto.");
      return;
    }
    
    if (!window.confirm(`Se abrirán ${selected.length} pestañas de WhatsApp. Asegúrate de permitir las ventanas emergentes (pop-ups) en tu navegador para que esto funcione.`)) {
      return;
    }

    for (const contact of selected) {
      let finalMessage = messageTemplate.replace(/{Nombre}/gi, contact.name).trim();
      const encodedMessage = encodeURIComponent(finalMessage);
      const waUrl = `https://wa.me/${contact.phone}?text=${encodedMessage}`;
      
      setSentLog(prev => ({ ...prev, [contact.id]: true }));
      window.open(waUrl, '_blank');
      
      // Pequeña pausa para no bloquear el navegador abruptamente
      await new Promise(r => setTimeout(r, 600));
    }
    
    // Deseleccionar todos después del envío masivo
    setSelectedIds({});
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelectAll = () => {
    const allSelected = filteredContacts.every(c => selectedIds[c.id]);
    const newSelected = { ...selectedIds };
    filteredContacts.forEach(c => {
      newSelected[c.id] = !allSelected;
    });
    setSelectedIds(newSelected);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div style={{ minHeight: '100vh', background: '#002D8B', padding: '100px 20px 40px', fontFamily: '"Outfit", sans-serif' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>
            WhatsApp <span style={{ color: '#d4af37' }}>Elite Hub</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Central de despachos masivos ARCHI Nueva Energía
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '350px 1fr', gap: '30px' }}>
          
          {/* PANEL IZQUIERDO: CONFIGURACIÓN */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(15,23,42,0.9)', borderRadius: '20px', padding: '25px', border: '1px solid rgba(212,175,55,0.3)', height: 'fit-content' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#d4af37' }}>
              <MessageCircle size={24} />
              <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Plantilla de Mensaje</h2>
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '15px' }}>
              Puedes usar <code>{'{Nombre}'}</code> para insertar dinámicamente el nombre de la base de datos.
            </p>
            
            <textarea
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              style={{
                width: '100%', height: '200px', background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)', color: 'white',
                padding: '15px', borderRadius: '12px', fontSize: '0.95rem',
                resize: 'none', outline: 'none', lineHeight: 1.5
              }}
            />
            
            <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h3 style={{ color: 'white', fontSize: '1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={18} color="#d4af37" /> Estado Base de Datos
              </h3>
              
              {loading ? (
                <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RefreshCw size={16} className="spin-anim" /> Leyendo BASE MSGG.xlsx...
                </div>
              ) : error ? (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px' }}>
                  <AlertCircle size={16} style={{ marginBottom: '5px' }} /> <br/>
                  {error}
                </div>
              ) : (
                <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', padding: '12px', borderRadius: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle size={18} style={{ float: 'left', marginRight: '8px' }} />
                  <strong>{contacts.length} contactos</strong> extraídos con números válidos de la planilla.
                </div>
              )}
            </div>

            <button onClick={loadDatabase} disabled={loading} style={{
              width: '100%', marginTop: '15px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', padding: '10px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              <RefreshCw size={14} /> Recargar Archivo
            </button>
            
          </motion.div>

          {/* PANEL DERECHO: LISTA DE CONTACTOS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '25px', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 style={{ color: 'white', fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Directorio de Envíos</h2>
                {Object.values(selectedIds).some(v => v) && (
                  <button 
                    onClick={handleSendMultiple}
                    style={{
                      background: '#25D366', color: 'white', border: 'none', padding: '8px 15px', 
                      borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem',
                      boxShadow: '0 4px 15px rgba(37,211,102,0.4)'
                    }}
                  >
                    <Send size={14} /> Enviar a Seleccionados ({Object.values(selectedIds).filter(v => v).length})
                  </button>
                )}
              </div>
              
              <div style={{ position: 'relative', width: window.innerWidth < 768 ? '100%' : '300px' }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input 
                  type="text" 
                  placeholder="Buscar nombre o número..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', padding: '10px 10px 10px 40px', borderRadius: '10px', outline: 'none'
                  }}
                />
              </div>
            </div>
            
            {filteredContacts.length > 0 && (
              <div style={{ marginBottom: '15px', padding: '0 10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input 
                    type="checkbox" 
                    checked={filteredContacts.length > 0 && filteredContacts.every(c => selectedIds[c.id])}
                    onChange={toggleSelectAll}
                    style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#d4af37' }}
                  />
                  Seleccionar todos ({filteredContacts.length})
                </label>
              </div>
            )}

            <div style={{ display: 'grid', gap: '10px' }}>
              {filteredContacts.map(contact => (
                <label key={contact.id} style={{ 
                  background: selectedIds[contact.id] ? 'rgba(212,175,55,0.1)' : 'rgba(15,23,42,0.6)', 
                  padding: '15px', borderRadius: '12px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  border: `1px solid ${selectedIds[contact.id] ? 'rgba(212,175,55,0.5)' : sentLog[contact.id] ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.05)'}`,
                  transition: 'all 0.2s',
                  flexWrap: 'wrap', gap: '15px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <input 
                      type="checkbox" 
                      checked={!!selectedIds[contact.id]}
                      onChange={() => toggleSelect(contact.id)}
                      style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: '#d4af37' }}
                    />
                    <div>
                      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '4px' }}>
                        {contact.name}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Phone size={12} /> {contact.phone}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.preventDefault(); handleSendWA(contact); }}
                    style={{
                      background: sentLog[contact.id] ? 'transparent' : '#25D366',
                      color: sentLog[contact.id] ? '#4ade80' : 'white',
                      border: sentLog[contact.id] ? '1px solid #4ade80' : 'none',
                      padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: sentLog[contact.id] ? 'none' : '0 4px 15px rgba(37,211,102,0.4)',
                      transition: 'all 0.3s'
                    }}
                  >
                    {sentLog[contact.id] ? (
                      <><CheckCircle size={18} /> Enviado</>
                    ) : (
                      <><Send size={18} /> Enviar WA</>
                    )}
                  </button>
                </label>
              ))}

              {filteredContacts.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  <FileText size={40} style={{ opacity: 0.5, marginBottom: '15px' }} />
                  <p>No se encontraron contactos para enviar mensajes.</p>
                </div>
              )}
            </div>
            
          </motion.div>
        </div>
      </div>
      
      <style>{`
        .spin-anim { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
