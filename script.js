// ── Scroll Reveal ──
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));
}

// ── Nav active link highlight ──
function initNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 200) {
        current = sec.id;
      }
    });
    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}


// ── Countdown ──
function initCountdown() {
  const target = new Date('2026-04-11T15:00:00').getTime();

  function update() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-minutes').textContent = '00';
      document.getElementById('cd-seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ── Lightbox / Slideshow ──
function initLightbox() {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbCounter = document.getElementById('lightbox-counter');
  const btnClose  = document.getElementById('lightbox-close');
  const btnPrev   = document.getElementById('lightbox-prev');
  const btnNext   = document.getElementById('lightbox-next');

  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  let current = 0;

  function open(index) {
    current = index;
    update();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function update() {
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
  }

  function next() {
    current = (current + 1) % images.length;
    update();
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    update();
  }

  // Click on gallery images
  images.forEach((img, i) => {
    img.closest('.gallery-item').addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) next();
      else prev();
    }
  }, { passive: true });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNav();
  initCountdown();
  initLightbox();
});
