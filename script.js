// script.js — Portfolio RPG
// Funcionalidades: navbar móvil, estrellas, scroll reveal, año footer, nav activo

document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  setupMobileNav();
  setupScrollReveal();
  setupActiveNav();
  setCurrentYear();
});

/* ── Estrellas del hero ── */
function generateStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'rpg-star';
    star.style.left   = Math.random() * 100 + '%';
    star.style.top    = Math.random() * 100 + '%';
    star.style.animationDelay    = (Math.random() * 3).toFixed(2) + 's';
    star.style.animationDuration = (2 + Math.random() * 2).toFixed(2) + 's';
    star.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
    container.appendChild(star);
  }
}

/* ── Menú hamburguesa ── */
function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Cerrar al hacer clic en un link
  nav.querySelectorAll('.rpg-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Cerrar al redimensionar a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

/* ── Scroll reveal ── */
function setupScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* ── Nav activo según sección visible ── */
function setupActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.rpg-nav__link');

  // Scroll suave
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      if (!target || target === '#') return;
      const section = document.querySelector(target);
      if (!section) return;
      e.preventDefault();
      const headerH = document.querySelector('.rpg-header')?.offsetHeight || 70;
      const top = section.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  if (!('IntersectionObserver' in window)) return;

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.rpg-nav__link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObs.observe(s));
}

/* ── Año footer ── */
function setCurrentYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
