import React from 'react';

export default function DomoticaVecinosYa() {
    return (
        <div style={{ width: '100%', height: '100vh', overflow: 'hidden', paddingTop: '60px' }}>
            <iframe 
                src={`/vecinosya_domotica.html?v=${Date.now()}`}
                title="VecinosYa Domótica"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    display: 'block'
                }}
            />
        </div>
    );
}
