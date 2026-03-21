/* ============================================================
   TideOps v2 — Main JavaScript
   ============================================================ */

// ===== Mobile Nav =====
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ===== Sticky Nav =====
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// ===== Active Nav Link =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== Intersection Observer — Fade Up =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ===== Staggered Card Animations =====
// Cards inside a .card-grid get a sequential delay
document.querySelectorAll('.card-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });
});

// Steps stagger
document.querySelectorAll('.steps').forEach(steps => {
  const items = steps.querySelectorAll('.step');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.15}s`;
  });
});

// Approach steps stagger
document.querySelectorAll('.approach-steps').forEach(wrap => {
  const items = wrap.querySelectorAll('.approach-step');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });
});

// Values grid stagger
document.querySelectorAll('.values-grid').forEach(wrap => {
  const items = wrap.querySelectorAll('.value-item');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks) navLinks.classList.remove('open');
      if (hamburger) hamburger.classList.remove('active');
    }
  });
});

// ===== Subtle parallax on hero mesh orbs =====
const heroSection = document.querySelector('.hero');
const meshOrbs = document.querySelectorAll('.mesh-orb');
if (heroSection && meshOrbs.length) {
  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const rx = (e.clientX / innerWidth  - 0.5) * 2; // -1 to 1
    const ry = (e.clientY / innerHeight - 0.5) * 2;
    meshOrbs.forEach((orb, i) => {
      const factor = (i + 1) * 14;
      orb.style.transform = `translate(${rx * factor}px, ${ry * factor}px)`;
    });
  }, { passive: true });
}

// ===== Floating geo elements mouse parallax =====
const geoElems = document.querySelectorAll('.geo');
if (geoElems.length) {
  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const rx = (e.clientX / innerWidth  - 0.5) * 2;
    const ry = (e.clientY / innerHeight - 0.5) * 2;
    geoElems.forEach((el, i) => {
      const factor = (i + 1) * 6;
      el.style.transform = `translate(${rx * factor}px, ${ry * factor}px)`;
    });
  }, { passive: true });
}

// ===== Form: subtle submit feedback =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '0.8';
    }
  });
}
