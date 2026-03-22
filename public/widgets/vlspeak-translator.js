/**
 * Hermes Universal Widget V3.5
 * Inyectable en cualquier dominio VLS vía <script>
 */

(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        #hermes-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .hermes-trigger {
            width: 60px; height: 60px;
            border-radius: 50%;
            background: #a78bfa;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(167, 139, 250, 0.4);
            display: flex; alignItems: center; justifyContent: center;
            transition: transform 0.3s;
        }
        .hermes-trigger:hover { transform: scale(1.1); }
        .hermes-bubble {
            display: none;
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            border: 1px solid rgba(167, 139, 250, 0.3);
            padding: 20px;
            color: white;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .hermes-bubble.active { display: block; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'vlspeak-widget-container';
    container.innerHTML = `
        <div id="vlspeak-bubble" class="hermes-bubble">
            <h3 style="margin: 0 0 10px 0; color: #a78bfa;">VLSpeak</h3>
            <p style="font-size: 0.8rem; color: #94a3b8;">Traducción instantánea P2P.</p>
            <textarea id="vlspeak-input" style="width: 100%; height: 80px; background: rgba(0,0,0,0.3); border: 1px solid #334155; border-radius: 10px; color: white; padding: 10px; font-size: 0.9rem;"></textarea>
            <button id="vlspeak-translate-btn" style="width: 100%; margin-top: 10px; padding: 10px; background: #a78bfa; border: none; border-radius: 10px; font-weight: bold; cursor: pointer;">TRADUCIR</button>
            <div id="vlspeak-output" style="margin-top: 15px; font-weight: bold; border-top: 1px solid #334155; padding-top: 10px;"></div>
        </div>
        <button id="vlspeak-trigger" class="hermes-trigger">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
        </button>
    `;
    document.body.appendChild(container);

    const trigger = document.getElementById('vlspeak-trigger');
    const bubble = document.getElementById('vlspeak-bubble');
    const btn = document.getElementById('vlspeak-translate-btn');
    const input = document.getElementById('vlspeak-input');
    const output = document.getElementById('vlspeak-output');

    trigger.onclick = () => bubble.classList.toggle('active');

    btn.onclick = async () => {
        const text = input.value;
        if (!text) return;
        btn.innerText = 'PROCESANDO...';
        
        // Simulación de llamada a vecinoslaserena.cl/api/v1/ai/process
        setTimeout(() => {
            output.innerText = `Resultado (EN): "The conciliation hearing will be held at the Local Police Court."`;
            btn.innerText = 'TRADUCIR';
        }, 1500);
    };
})();
