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

// ── Nav hide on scroll ──
function initNav() {
  const nav = document.querySelector('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100 && current > lastScroll) {
      nav.classList.add('hidden-nav');
    } else {
      nav.classList.remove('hidden-nav');
    }
    lastScroll = current;
  });

  // Active link highlight
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

// ── Toast ──
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── RSVP Form ──
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  const thankYou = document.getElementById('thank-you');
  const guestsGroup = document.getElementById('guests-group');
  const attendBtns = document.querySelectorAll('.attend-btn');
  let attending = '';

  attendBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      attendBtns.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      attending = btn.dataset.value;
      if (attending === 'accept') {
        guestsGroup.classList.remove('hidden');
      } else {
        guestsGroup.classList.add('hidden');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value.trim();
    if (!name || !attending) {
      showToast('Please fill in your name and attendance.');
      return;
    }
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
    document.getElementById('thank-name').textContent = name;
    showToast('Thank you for your response!');
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

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNav();
  initCountdown();
  initRSVP();
});
