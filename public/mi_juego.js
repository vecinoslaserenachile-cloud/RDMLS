/* ==========================================
   SMART COMUNA - MINIJUEGO GAMIFICADO
   ESTILO RALLY-X / MOON PATROL / INVADERS
   ========================================== */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();

// Carga de Audios
const bgmSuspense = new Audio('https://kappa.vgmsite.com/soundtracks/super-mario-bros-nes/jssbzzxy/01%20-%20Super%20Mario%20Bros.mp3'); // Fallback placeholder music
bgmSuspense.loop = true;
bgmSuspense.volume = 0.3;

const sfxCoin = new Audio('https://kappa.vgmsite.com/soundtracks/super-mario-bros-nes/stqhgbsk/16%20-%20Coin.mp3');
const sfxWin = new Audio('https://kappa.vgmsite.com/soundtracks/super-mario-bros-nes/bofcrxrt/05%20-%20Stage%20Clear.mp3');
const sfxGameOver = new Audio('https://kappa.vgmsite.com/soundtracks/super-mario-bros-nes/wfttmsyx/07%20-%20Game%20Over.mp3');

// Variables de Juego
let score = 0;
let gameOver = false;
let gameWon = false;
let camera = { x: 0, y: 0 };
let level = 1;
let velX = 0;
let velY = 0;
let friction = 0.85;
let speed = 2.5;

let enemies = []; // Nuevos enemigos para generar suspenso
let isAlertActive = false;
let alertTimer = 0;
let alertCooldown = 0;

const monoImg = new Image();
monoImg.src = 'https://cdn-icons-png.flaticon.com/512/826/826963.png'; // Cara de mono

// Carga de imágenes
const bgImage = new Image();
bgImage.src = 'mapa.jpg'; // El mapa de la ciudad

const playerImg = new Image();
playerImg.src = 'serenito.png';

// Array de 14 "Personajes" / "Items" a recolectar
const collectibleImages = [
    'comic-aves.jpg', 'comic-bici.jpg', 'comic-cielo.jpg',
    'comic-patrimonio.jpg', 'comic-playa.jpg', 'escudo.png',
    'serenito-bus.jpg', 'serenito-museo.jpg'
    // Se reutilizan hasta llegar a 14 instancias en el mapa
];
const loadedCollectibles = collectibleImages.map(src => {
    let img = new Image();
    img.src = src;
    return img;
});

const serenito = { x: 500, y: 500, ancho: 60, alto: 80, velocidad: 8 };
const teclas = {};
window.addEventListener('keydown', e => teclas[e.key] = true);
window.addEventListener('keyup', e => teclas[e.key] = false);

// Instanciar Items en el Mapa
let items = [];
function initGame() {
    score = 0;
    level = 1;
    startLevel();
}

function startLevel() {
    serenito.x = 500;
    serenito.y = 500;
    velX = 0;
    velY = 0;
    items = [];
    enemies = [];
    let numItems = 10 + (level * 5);
    let mapSize = 2500 + (level * 500);

    // Audio Playbeat
    if (bgmSuspense.paused) {
        bgmSuspense.play().catch(e => console.log('Audio requires interaction first'));
    }

    for (let i = 0; i < numItems; i++) {
        items.push({
            x: Math.random() * (mapSize - 100),
            y: Math.random() * (mapSize - 100),
            width: 50, height: 50,
            img: loadedCollectibles[i % loadedCollectibles.length],
            collected: false
        });
    }

    // Agregar enemigos basados en el nivel (Suspenso)
    isAlertActive = false;
    alertTimer = 0;
    alertCooldown = 0;
    if (level > 0) { // Ahora en todos los niveles
        let numEnemies = level * 2 + 1;
        for (let i = 0; i < numEnemies; i++) {
            enemies.push({
                x: Math.random() * mapSize,
                y: Math.random() * mapSize,
                width: 60, height: 60,
                speed: 1.5 + (level * 0.5),
                dead: false
            });
        }
    }
}

function gameLoop() {
    if (gameOver) return;

    // Controles (Movimiento más suave con físicas)
    if (teclas['ArrowRight'] || teclas['d']) velX += speed;
    if (teclas['ArrowLeft'] || teclas['a']) velX -= speed;
    if (teclas['ArrowUp'] || teclas['w']) velY -= speed;
    if (teclas['ArrowDown'] || teclas['s']) velY += speed;

    // Activar Alerta
    if (teclas[' '] && alertCooldown <= 0) {
        isAlertActive = true;
        alertTimer = 300; // 5 segundos a 60 fps aprox
        alertCooldown = 600; // 10 segundos
        bgmSuspense.playbackRate = 1.5; // Música más rápida
    }

    if (alertTimer > 0) {
        alertTimer--;
        if (alertTimer <= 0) {
            isAlertActive = false;
            bgmSuspense.playbackRate = 1.0;
        }
    }
    if (alertCooldown > 0 && !isAlertActive) {
        alertCooldown--;
    }

    velX *= friction;
    velY *= friction;

    serenito.x += velX;
    serenito.y += velY;

    // Limites del mapa (Dependiente del nivel)
    let currentMapSize = 2000 + (level * 500);
    serenito.x = Math.max(0, Math.min(serenito.x, currentMapSize));
    serenito.y = Math.max(0, Math.min(serenito.y, currentMapSize));

    // Cámara sigue a Serenito
    camera.x = serenito.x - canvas.width / 2 + serenito.ancho / 2;
    camera.y = serenito.y - canvas.height / 2 + serenito.alto / 2;

    // Dibujar Fondo (Rally X Style)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pattern map
    if (bgImage.complete) {
        let pattern = ctx.createPattern(bgImage, 'repeat');
        ctx.save();
        ctx.translate(-camera.x * 0.5, -camera.y * 0.5); // Efecto Paralaje
        ctx.fillStyle = pattern;
        ctx.fillRect(camera.x * 0.5, camera.y * 0.5, canvas.width + 1000, canvas.height + 1000);
        ctx.restore();
    } else {
        ctx.fillStyle = "#2b2b2b";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Dibujar Mundo
    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    // Dibujar Items y Colisiones
    items.forEach(item => {
        if (!item.collected) {
            // Animacion flotación simple
            let floatY = Math.sin(Date.now() / 200) * 10;
            if (item.img.complete) {
                ctx.drawImage(item.img, item.x, item.y + floatY, item.width, item.height);
            } else {
                ctx.fillStyle = 'gold';
                ctx.fillRect(item.x, item.y + floatY, item.width, item.height);
            }

            // Colision
            if (serenito.x < item.x + item.width &&
                serenito.x + serenito.ancho > item.x &&
                serenito.y < item.y + item.height &&
                serenito.y + serenito.alto > item.y) {
                item.collected = true;
                score += (100 * level);

                // Efecto de sonido (clonado para múltiples a la vez)
                let clonSfx = sfxCoin.cloneNode();
                clonSfx.volume = 0.5;
                clonSfx.play().catch(e => e);
            }
        }
    });

    // Dibujar Enemigos y Colisiones (Peligro/Suspenso)
    enemies.forEach(enemy => {
        if (enemy.dead) return;

        // IA de Persecución o Fuga
        let dx = serenito.x - enemy.x;
        let dy = serenito.y - enemy.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0 && dist < 800) { // Radio de visión
            let dirX = (dx / dist) * enemy.speed;
            let dirY = (dy / dist) * enemy.speed;

            if (isAlertActive) {
                // Fuga (se invierte la dirección y corren más lento)
                enemy.x -= dirX * 0.8;
                enemy.y -= dirY * 0.8;

                // Limitar enemigos para que no salgan del mapa
                enemy.x = Math.max(0, Math.min(enemy.x, currentMapSize));
                enemy.y = Math.max(0, Math.min(enemy.y, currentMapSize));
            } else {
                // Persecución
                enemy.x += dirX;
                enemy.y += dirY;
            }
        }

        // Render Enemigo (Mono)
        if (isAlertActive) {
            ctx.fillStyle = '#3b82f6'; // Azul huyendo (estilo Pacman)
            ctx.beginPath();
            ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (monoImg.complete) {
            ctx.drawImage(monoImg, enemy.x, enemy.y, enemy.width, enemy.height);
        } else {
            ctx.fillStyle = '#dc2626'; // Rojo Peligro por defecto
            ctx.beginPath();
            ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.stroke();
        }

        // Colision Fatal o Eliminación con enemigo
        if (serenito.x < enemy.x + enemy.width &&
            serenito.x + serenito.ancho > enemy.x &&
            serenito.y < enemy.y + enemy.height &&
            serenito.y + serenito.alto > enemy.y) {

            if (isAlertActive) {
                // Serenito se come al enemigo
                enemy.dead = true;
                score += 500;
                let clonSfx = sfxCoin.cloneNode();
                clonSfx.volume = 0.8;
                clonSfx.play().catch(e => e);
            } else {
                gameOver = true;
                bgmSuspense.pause();
                sfxGameOver.play().catch(e => e);

                ctx.fillStyle = "rgba(220, 38, 38, 0.9)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "bold 40px Arial";
                ctx.fillText("¡TE ATRAPARON LOS MONOS!", canvas.width / 2, canvas.height / 2);
                ctx.font = "20px Arial";
                ctx.fillText("Presiona F5 o reinicia el módulo para intentar de nuevo.", canvas.width / 2, canvas.height / 2 + 50);
            }
        }
    });

    // Dibujar a Serenito (Player)
    if (playerImg.complete) {
        ctx.drawImage(playerImg, serenito.x, serenito.y, serenito.ancho, serenito.alto);
    } else {
        ctx.fillStyle = 'salmon';
        ctx.fillRect(serenito.x, serenito.y, serenito.ancho, serenito.alto);
    }

    ctx.restore();

    // UI Superior (Fija)
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, 60);

    ctx.fillStyle = "white";
    ctx.font = "24px 'Arial Black', sans-serif";
    ctx.fillText(`PUNTAJE: ${score}`, 150, 40);

    let faltan = items.filter(i => !i.collected).length;
    ctx.fillStyle = "#ec4899";
    ctx.fillText(`NIVEL ${level} - RESTANTES: ${faltan}`, canvas.width / 2, 40);

    // Barra de Alerta Vecinal
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Alerta (Espacio):", canvas.width - 200, 20);

    ctx.fillStyle = "#444";
    ctx.fillRect(canvas.width - 250, 30, 200, 15);

    if (isAlertActive) {
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(canvas.width - 250, 30, (alertTimer / 300) * 200, 15);
        ctx.fillStyle = "white";
        ctx.fillText("¡HUYEN!", canvas.width - 150, 20);
    } else if (alertCooldown > 0) {
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(canvas.width - 250, 30, (1 - alertCooldown / 600) * 200, 15);
    } else {
        ctx.fillStyle = "#10b981";
        ctx.fillRect(canvas.width - 250, 30, 200, 15);
        ctx.fillStyle = "white";
        ctx.fillText("LISTA", canvas.width - 150, 20);
    }

    if (faltan === 0) {
        if (level < 5) {
            score += 1000 * level; // Bono de nivel
            level++;
            sfxWin.play().catch(e => e);
            alert(`¡NUEVO NIVEL DESBLOQUEADO!\n\nRecompensa: +${1000 * (level - 1)} Puntos Vecinales.\n¡Prepárate! El nivel ${level} será más desafiante y con persecución intensa.`);
            startLevel();
        } else {
            bgmSuspense.pause();
            sfxWin.play().catch(e => e);

            ctx.fillStyle = "rgba(0,0,0,0.9)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#10b981";
            ctx.font = "bold 50px Arial";
            ctx.textAlign = "center";
            ctx.fillText("¡MISIÓN COMPLETADA! CIUDAD SEGURA", canvas.width / 2, canvas.height / 2 - 50);

            ctx.fillStyle = "white";
            ctx.font = "24px Arial";
            ctx.fillText(`PUNTAJE FINAL: ${score}`, canvas.width / 2, canvas.height / 2 + 10);

            ctx.fillStyle = "#fcd34d";
            ctx.font = "20px Arial";
            ctx.fillText("Has ganado: ★ Insignia 'Ojos en la Calle'", canvas.width / 2, canvas.height / 2 + 60);
            ctx.fillText("Has ganado: 💳 30% Dscto. en Comercio Local Adherido", canvas.width / 2, canvas.height / 2 + 90);
            ctx.fillText("Tus logros fueron transferidos a la Red Vecinos Smart", canvas.width / 2, canvas.height / 2 + 120);

            gameOver = true;
            gameWon = true;
        }
    }

    requestAnimationFrame(gameLoop);
}

// Iniciar al cargar
bgImage.onload = () => {
    initGame();
    gameLoop();
};
