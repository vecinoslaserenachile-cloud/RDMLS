// --- CONFIGURACIÓN ---
const fbCfg={apiKey:"AIzaSyCDUhik-oYwJ-yBkBYAohw6DJct5FQ78w4",authDomain:"laserena-d1263.firebaseapp.com",projectId:"laserena-d1263",storageBucket:"laserena-d1263.firebasestorage.app",messagingSenderId:"283725387947",appId:"1:283725387947:web:898aa22c80c2fadbe8bfee"};
try { firebase.initializeApp(fbCfg); } catch(e){ console.log("Firebase loaded"); }
const db=firebase.firestore(); const auth=firebase.auth(); let user=null;

const CENTRO = [-29.9027, -71.2520];
let map, marker, polyline, engine, ticketMarker, animInterval;
const radio = document.getElementById('radio');

// --- INICIALIZACIÓN ---
function initApp() {
    setInterval(() => document.getElementById('clock').innerText = new Date().toLocaleTimeString('es-CL'), 1000);
    startSlider();

    fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.90&longitude=-71.25&current_weather=true')
        .then(r=>r.json()).then(d=>{
            document.getElementById('w-temp').innerText = d.current_weather.temperature+"°C";
            document.getElementById('w-wind').innerText = d.current_weather.windspeed+" km/h";
        }).catch(()=>{});

    map = L.map('map', {zoomControl:false}).setView(CENTRO, 15);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(map);

    // RUTAS ACTUALIZADAS A: assets/img/
    const sIcon = L.divIcon({ 
        html: `<div class="pin-wrapper"><img src="assets/img/serenito.png" class="pin-img" onerror="this.src='https://cdn-icons-png.flaticon.com/512/3660/3660358.png'"><div class="pin-arrow"></div></div>`, 
        className: 'dummy', iconSize: [60, 90], iconAnchor: [30, 90] 
    });
    marker = L.marker(CENTRO, {icon: sIcon, draggable: true, zIndexOffset:1000}).addTo(map);

    marker.on('dragend', async (e) => {
        const {lat, lng} = e.target.getLatLng();
        document.getElementById('geo-result').innerText = "Consultando...";
        try {
            const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const d = await r.json();
            const addr = d.address.road || "Calle";
            const num = d.address.house_number ? `#${d.address.house_number}` : "";
            document.getElementById('geo-result').innerText = `📍 ${addr} ${num}`;
        } catch(e) { document.getElementById('geo-result').innerText = "📍 Ubicación manual"; }
    });

    initPoll();
    auth.onAuthStateChanged(u=>{ user=u; if(u) loadHist(); });
}

// --- RUTA ---
function calcRoute(lat, lon, name) {
    if(polyline) map.removeLayer(polyline);
    if(ticketMarker) map.removeLayer(ticketMarker);
    
    polyline = L.polyline([CENTRO, [lat, lon]], {color: '#b71c1c', weight: 5, dashArray: '10, 10'}).addTo(map);
    map.fitBounds(polyline.getBounds(), {padding:[80,80]});

    const km = (map.distance(CENTRO, [lat, lon])/1000).toFixed(1);
    document.getElementById('dist-hud').style.display = 'block';
    document.getElementById('btn-reset').style.display = 'block';
    document.getElementById('lbl-dest').innerText = name;
    
    document.getElementById('v-auto').innerText = (km/0.8).toFixed(0)+" min";
    document.getElementById('v-bus').innerText = (km/0.5).toFixed(0)+" min";
    document.getElementById('v-bici').innerText = (km*4).toFixed(0)+" min";
    document.getElementById('v-pie').innerText = (km*12).toFixed(0)+" min";
    document.getElementById('v-avion').innerText = km>150?(km/12).toFixed(0)+"m":"N/A";

    let p = 0; const steps = 150; 
    if(animInterval) clearInterval(animInterval);
    animInterval = setInterval(() => {
        p++;
        const clat = CENTRO[0] + (lat-CENTRO[0]) * (p/steps);
        const clng = CENTRO[1] + (lon-CENTRO[1]) * (p/steps);
        marker.setLatLng([clat, clng]);
        
        if(p >= steps) {
            clearInterval(animInterval);
            const tIcon = L.divIcon({ html: '<div class="ticket-icon"><i class="fas fa-check"></i></div>', className: 'dummy', iconSize: [40, 40] });
            ticketMarker = L.marker([lat, lon], {icon: tIcon, zIndexOffset:2000}).addTo(map);
        }
    }, 20);
}

function resetRoute() { 
    if(polyline) map.removeLayer(polyline); 
    if(ticketMarker) map.removeLayer(ticketMarker);
    document.getElementById('dist-hud').style.display='none'; 
    document.getElementById('btn-reset').style.display='none'; 
    map.flyTo(CENTRO, 15); 
    marker.setLatLng(CENTRO);
}

// --- ENCUESTA (Rutas Assets Actualizadas) ---
const qs = [
    {i:"assets/img/serenito.png", q:"¿Seguridad Centro?", o:["Cámaras", "Rondas"]},
    {i:"assets/img/serenito.png", q:"¿Deporte?", o:["Canchas", "Talleres"]},
    {i:"assets/img/serenito.png", q:"¿Mascotas?", o:["Parques", "Clínica"]}
];
function initPoll() { renderPollStep(0); }
function renderPollStep(i) {
    if(i >= qs.length) { document.getElementById('poll-interface').style.display='none'; document.getElementById('poll-results').style.display='block'; return; }
    const q = qs[i]; document.getElementById('q-idx').innerText = i+1;
    document.getElementById('poll-interface').innerHTML = `
        <div class="poll-item"><img src="${q.i}" class="poll-av" onerror="this.src='https://cdn-icons-png.flaticon.com/512/149/149071.png'"><div style="font-size:12px; font-weight:bold;">${q.q}</div></div>
        ${q.o.map(opt => `<button class="poll-btn" onclick="renderPollStep(${i+1})"><span>${opt}</span> <i class="fas fa-chevron-right"></i></button>`).join('')}
    `;
}

// --- 3D MODE (Ruta Assets Models) ---
function abrirTour3D() {
    document.getElementById('modal-tour-3d').style.display='flex';
    if(!engine) {
        const c = document.getElementById('renderCanvas'); engine = new BABYLON.Engine(c, true);
        const s = new BABYLON.Scene(engine); s.clearColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        const cam = new BABYLON.FreeCamera("tank", new BABYLON.Vector3(0, 5, -20), s);
        cam.attachControl(c, true); cam.keysUp=[87]; cam.keysDown=[83]; cam.keysLeft=[65]; cam.keysRight=[68];
        new BABYLON.HemisphericLight("l", new BABYLON.Vector3(0,1,0), s);
        const g = BABYLON.MeshBuilder.CreateGround("g", {width:500, height:500}, s);
        g.material = new BABYLON.StandardMaterial("m", s); g.material.wireframe=true;
        // Apunta a assets/models/
        try{ BABYLON.SceneLoader.ImportMesh("","assets/models/","municipalidad.glb",s, (m)=>{m[0].position.y=0}, null, ()=>{ const b=BABYLON.MeshBuilder.CreateBox("e",{size:5},s); b.position.y=2.5; }); }catch(e){}
        engine.runRenderLoop(()=>s.render());
    }
}
function cerrarTour() { document.getElementById('modal-tour-3d').style.display='none'; }

// --- UTILS ---
function toggleVideo(s) { document.getElementById('modal-video').style.display = s ? 'flex' : 'none'; const v = document.getElementById('inst-video'); s ? v.play() : v.pause(); }
function toggleRadio() { if(radio.paused){ radio.play(); document.getElementById('play-icon').className='fas fa-pause'; } else { radio.pause(); document.getElementById('play-icon').className='fas fa-play'; } }
function setVolume(v) { radio.volume = v; }
function abrirCamara() { document.getElementById('modal-camara').style.display='flex'; navigator.mediaDevices.getUserMedia({video:true}).then(s=>document.getElementById('cam-video').srcObject=s); }
function cerrarCamara() { document.getElementById('modal-camara').style.display='none'; }
function loginGoogle() { auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); }
function enviarReporte() { 
    if(!user) return alert("Inicia sesión primero");
    db.collection("tickets_ia").add({ userId:user.uid, asunto:document.getElementById('req-asunto').value, fecha:new Date() });
    alert("Enviado"); loadHist();
}
function loadHist() {
    db.collection("tickets_ia").where("userId","==",user.uid).onSnapshot(s=>{
        document.getElementById('hist-list').innerHTML="";
        s.forEach(d=> document.getElementById('hist-list').innerHTML+=`<div>✔ ${d.data().asunto}</div>`);
    });
}
function chatIA(el) { if(!el.value) return; document.getElementById('chat-ia').innerHTML += `<br><b>Tú:</b> ${el.value}<br><b>Serenito:</b> Procesando...`; el.value = ""; }
function startSlider() { 
    let cur = 0; const imgs = document.querySelectorAll('.slide-img'); 
    if(imgs.length > 0) {
        setInterval(() => { 
            imgs[cur].classList.remove('active'); 
            cur = (cur + 1) % imgs.length; 
            imgs[cur].classList.add('active'); 
        }, 4000); 
    }
}
