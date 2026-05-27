/* =============================================
   RADIO MONTECARLO · 40 AÑOS
   main.js – Lógica de Interacción
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const introScreen = document.getElementById('intro-screen');
  const hero        = document.getElementById('hero');
  const audioBtn    = document.getElementById('audio-btn');
  const particlesCtr= document.getElementById('particles-container');

  // YouTube Video ID
  const YT_VIDEO_ID = 'ouWjOCHGjZY';

  // ---- 1. INTRO SCREEN: simula "encendido de radio" ----
  setTimeout(() => {
    introScreen.classList.add('fade-out');
    hero.classList.remove('hidden');
    // Generar partículas doradas
    generateParticles();
  }, 2200);

  // ---- 2. MODAL YOUTUBE: abrir/cerrar ----
  const videoModal  = document.getElementById('video-modal');
  const modalOverlay= document.getElementById('modal-overlay');
  const modalClose  = document.getElementById('modal-close');
  const ytPlayer    = document.getElementById('yt-player');

  function openModal() {
    ytPlayer.src = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    videoModal.classList.remove('active');
    ytPlayer.src = '';
    document.body.style.overflow = '';
  }

  audioBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ---- 3. PARTÍCULAS DE POLVO DORADO ----
  function generateParticles() {
    const count = 35;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size = Math.random() * 4 + 2;
      const leftPct = Math.random() * 100;
      const duration = Math.random() * 12 + 8;
      const delay = Math.random() * 8;
      const opacity = Math.random() * 0.6 + 0.2;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${leftPct}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
        background: hsl(${43 + Math.random() * 15}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 20}%);
      `;
      particlesCtr.appendChild(p);
    }
  }

  // ---- 4. DIAL: rotación al hover con scroll ----
  const dial = document.getElementById('dial');
  let dialAngle = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    dialAngle = scrollY * 0.15;
    if (dial) {
      dial.style.transform = `rotate(${dialAngle}deg)`;
    }
  });

  // ---- 5. INTERSECTION OBSERVER: animaciones al scroll ----
  const cards = document.querySelectorAll('.decade-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(card);
  });

  // ---- 6. BARRA DE SEÑAL: variación aleatoria ----
  const signalBars = document.querySelectorAll('.signal-bar');
  function randomizeSignal() {
    signalBars.forEach(bar => {
      const h = Math.floor(Math.random() * 80 + 20);
      bar.style.height = h + '%';
    });
  }
  setInterval(randomizeSignal, 800);

  // ---- 7. REPRODUCTOR DE RADIO EN VIVO ----
  const liveAudio    = document.getElementById('live-audio');
  const playerPlayBtn= document.getElementById('player-play');
  const iconPlay     = document.getElementById('icon-play');
  const iconPause    = document.getElementById('icon-pause');
  const playerEq     = document.getElementById('player-eq');
  const volumeSlider = document.getElementById('volume-slider');
  let isPlaying = false;
  let eqInterval = null;

  // Volumen inicial
  if (liveAudio) liveAudio.volume = 0.8;

  // Play / Pause
  playerPlayBtn.addEventListener('click', () => {
    if (!isPlaying) {
      liveAudio.play().then(() => {
        isPlaying = true;
        playerPlayBtn.classList.add('playing');
        iconPlay.classList.add('hidden-icon');
        iconPause.classList.remove('hidden-icon');
        playerEq.classList.add('active');
        startEqualizer();
      }).catch(err => {
        console.warn('Error reproduciendo stream:', err);
      });
    } else {
      liveAudio.pause();
      isPlaying = false;
      playerPlayBtn.classList.remove('playing');
      iconPause.classList.add('hidden-icon');
      iconPlay.classList.remove('hidden-icon');
      playerEq.classList.remove('active');
      stopEqualizer();
    }
  });

  // Control de volumen
  volumeSlider.addEventListener('input', (e) => {
    liveAudio.volume = e.target.value / 100;
  });

  // Ecualizador animado
  function startEqualizer() {
    const eqBars = playerEq.querySelectorAll('span');
    eqInterval = setInterval(() => {
      eqBars.forEach(bar => {
        const h = Math.floor(Math.random() * 22 + 6);
        bar.style.height = h + 'px';
      });
    }, 150);
  }

  function stopEqualizer() {
    clearInterval(eqInterval);
    const eqBars = playerEq.querySelectorAll('span');
    eqBars[0].style.height = '8px';
    eqBars[1].style.height = '14px';
    eqBars[2].style.height = '22px';
    eqBars[3].style.height = '12px';
    eqBars[4].style.height = '6px';
  }

});
