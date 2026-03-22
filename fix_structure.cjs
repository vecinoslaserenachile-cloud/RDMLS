const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove duplicate isRDMLS definitions
content = content.replace(/const isRDMLS = _host.includes\('rdmls'\) \|\| _host.includes\('entrevecinas'\);\s*const isVLS = !isRDMLS;/g, 'const isRDMLS = _host.includes(\'rdmls\') || _host.includes(\'entrevecinas\');\n  const isVLS = !isRDMLS;');

// 2. Fix the header structure
// We want to find the whole header block and replace it with a clean one.
// The header starts with <header className="app-header glass-panel"
// and ends with </header>

// Let's identify the start and end of the mess.
// Start: <header className="app-header glass-panel"
// End: </main>

const headerStartStr = '<header className="app-header glass-panel"';
const mainEndStr = '</main>';

const startIdx = content.indexOf(headerStartStr);
const endIdx = content.indexOf(mainEndStr) + mainEndStr.length;

if (startIdx !== -1 && endIdx !== -1) {
    const brokenHeaderSection = content.substring(startIdx, endIdx);
    
    // Check if we can build a clean version
    const cleanSection = `<header className="app-header glass-panel" style={{
        width: '100%',
        borderBottom: isRDMLS ? '3px solid #f59e0b' : '1px solid rgba(255,255,255,0.05)',
        background: isRDMLS ? 'rgba(80, 5, 5, 0.97)' : 'rgba(15, 23, 42, 0.95)',
        padding: '0 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflow: 'hidden', flexShrink: 1 }}>
          <button onClick={() => navigate('/')} className="btn-glass" style={{ padding: '0.35rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} title="Inicio">
            <Home size={16} color="white" />
          </button>
          {location.pathname !== '/' && (
            <button 
              onClick={() => navigate(-1)} 
              className="btn-glass" 
              style={{ 
                padding: '0.35rem 0.6rem', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.15)', 
                flexShrink: 0,
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                border: '1px solid rgba(255,255,255,0.2)'
              }} 
              title="Volver"
            >
              <ArrowLeft size={14} /> VOLVER
            </button>
          )}
          <span className="text-gradient animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 'bold', fontSize: 'clamp(0.85rem, 3.5vw, 1.2rem)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {isRDMLS ? (
              <>
                <img src="/rdmls-logo.png" style={{ height: '24px', marginRight: '6px' }} alt="RDMLS" />
                RADIO DIGITAL MUNICIPAL LA SERENA
              </>
            ) : (
              <>
                <img src="/vls-logo-premium.png" style={{ height: '24px', marginRight: '6px', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} alt="VLS Logo" />
                www.vecinoslaserena.cl
              </>
            )}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
          {weather !== null && (
            <span className="glass-panel desktop-only" style={{ padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', color: '#fcd34d', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              {(() => {
                const { code, isDay } = weather;
                let Icon = isDay ? Sun : Moon;
                if (code === 1 || code === 2 || code === 3) Icon = Cloud;
                return <Icon size={14} color={isDay ? "#fcd34d" : "#bae6fd"} />;
              })()}
              <span>{weather.temp}°C</span>
            </span>
          )}

          <button
            onClick={() => {
              setShowNotificationsMenu(!showNotificationsMenu);
              if (!showNotificationsMenu) markNotificationsAsRead();
            }}
            className="btn-glass"
            style={{ position: 'relative', padding: '0.35rem 0.4rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}
          >
            <Bell size={16} color="white" />
            {unreadCount > 0 && (
              <span className="pulse" style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setShowUserProfile(true)}
            className="user-badge glass-panel"
            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <UserCircle size={14} />
            {currentUser ? \`\${currentUser.displayName?.split(' ')[0]}\` : 'Identidad VLS'}
          </button>

          <button 
            onClick={() => window.location.href = 'https://www.vecinoslaserena.cl'}
            className="btn-glass"
            style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: 'white' }}
          >
            <CloseIcon size={18} color="#ef4444" />
            <span style={{ fontSize: '0.8rem' }}>SALIR</span>
          </button>
        </div>

        {showNotificationsMenu && (
          <div className="glass-panel" style={{ position: 'absolute', top: '50px', right: '10px', width: '300px', maxHeight: '400px', overflowY: 'auto', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--brand-primary)', borderRadius: '12px', zIndex: 100000 }}>
            <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}><Bell size={16} /> Alertas de la Red Vecinal</strong>
              <button onClick={() => setShowNotificationsMenu(false)} className="btn-glass"><CloseIcon size={14} /></button>
            </div>
            {notifications.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>No tienes notificaciones recientes.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.timestamp}</div>
                    <strong style={{ color: 'white', display: 'block' }}>{n.title}</strong>
                    <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{n.body}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      <main className="page-content container" style={{ paddingBottom: '4rem' }}>
        <Outlet context={{ weather, isAuthorized, isGuest, isRegistered }} />
        <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,215,0,0.1)', color: '#94a3b8', fontSize: '0.9rem' }}>
          <p>© 2026 {isVLS ? 'VECINOSLASERENA.CL · INNOVACIÓN CIUDADANA' : 'ILUSTRE MUNICIPALIDAD DE LA SERENA · COMUNICACIONES ESTRATÉGICAS'}</p>
          <p>Contacto: <a href={isVLS ? "mailto:info@vecinoslaserena.cl" : "mailto:comunicaciones@laserena.cl"} style={{ color: '#FFD700' }}>{isVLS ? 'info@vecinoslaserena.cl' : 'comunicaciones@laserena.cl'}</a></p>
        </footer>
      </main>`;

    content = content.substring(0, startIdx) + cleanSection + content.substring(endIdx);
    console.log('✅ Replaced whole header/main section.');
} else {
    console.error('❌ Could not find header start or main end.');
    console.log('startIdx:', startIdx, 'endIdx:', endIdx);
}

fs.writeFileSync(filePath, content);
console.log('Final content size:', content.length);
