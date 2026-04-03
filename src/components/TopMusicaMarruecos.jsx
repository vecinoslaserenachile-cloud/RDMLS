import React from 'react';

const TopMusicaMarruecos = () => {
  const topNacional = [
    { id: 1, song: "KALIMAT", artist: "Manal" },
    { id: 2, song: "WARDA", artist: "Inkonnu (feat. Manal)" },
    { id: 3, song: "MOON", artist: "Stormy" },
    { id: 4, song: "Bali maak", artist: "Amine Farsi (feat. Stormy)" },
    { id: 5, song: "3DABI", artist: "Draganov" }
  ];

  const topInternacional = [
    { id: 1, song: "SWIM", artist: "BTS" },
    { id: 2, song: "Raindance", artist: "Dave (feat. Tems)" },
    { id: 3, song: "love nwantiti", artist: "CKay" },
    { id: 4, song: "Body to Body", artist: "BTS" },
    { id: 5, song: "Babydoll", artist: "Dominic Fike" }
  ];

  const sectionStyle = {
    backgroundColor: '#1e293b',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(56,189,248,0.15)',
  };

  const headerNacStyle = {
    fontSize: '16px', fontWeight: 'bold', marginBottom: '16px',
    borderBottom: '2px solid #ef4444', paddingBottom: '8px',
    display: 'flex', alignItems: 'center', color: '#f1f5f9',
  };

  const headerIntStyle = {
    ...headerNacStyle,
    borderBottom: '2px solid #3b82f6',
  };

  const listItemStyle = {
    display: 'flex', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '12px', borderRadius: '8px', marginBottom: '8px',
    transition: 'background 0.2s ease',
  };

  return (
    <div style={{ width: '100%', padding: '24px 0', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '24px', textAlign: 'center', color: '#f8fafc', letterSpacing: '-0.5px' }}>
        🎵 Tendencias Musicales en Marruecos
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>

        {/* Nacional */}
        <div style={sectionStyle}>
          <h3 style={headerNacStyle}>
            <span style={{ marginRight: '8px', fontSize: '20px' }}>🇲🇦</span> Top 5 Nacional
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topNacional.map((track) => (
              <li key={track.id} style={listItemStyle}>
                <span style={{ fontWeight: '900', fontSize: '18px', color: '#ef4444', width: '32px', textAlign: 'center', flexShrink: 0 }}>{track.id}</span>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ fontWeight: 'bold', color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>{track.song}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{track.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Internacional */}
        <div style={sectionStyle}>
          <h3 style={headerIntStyle}>
            <span style={{ marginRight: '8px', fontSize: '20px' }}>🌍</span> Top 5 Internacional
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topInternacional.map((track) => (
              <li key={track.id} style={listItemStyle}>
                <span style={{ fontWeight: '900', fontSize: '18px', color: '#3b82f6', width: '32px', textAlign: 'center', flexShrink: 0 }}>{track.id}</span>
                <div style={{ marginLeft: '12px' }}>
                  <p style={{ fontWeight: 'bold', color: '#f1f5f9', margin: 0, lineHeight: 1.3 }}>{track.song}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{track.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default TopMusicaMarruecos;
