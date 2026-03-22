/* ========================================
   TideOps — Main JavaScript
   ======================================== */

(function () {
  'use strict';

  // ---- GSAP Registration ----
  gsap.registerPlugin(ScrollTrigger);

  // Ensure smooth GSAP performance
  gsap.ticker.lagSmoothing(0);

  // ---- Detect Mobile ----
  const isMobile = window.innerWidth <= 768;

  // Refresh ScrollTrigger after everything loads
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // ========================================
  // SCROLL-DRIVEN FRAME ANIMATION (HERO)
  // ========================================
  const canvas = document.getElementById('hero-canvas');
  const heroSection = document.getElementById('hero');

  if (canvas && heroSection) {
    const ctx = canvas.getContext('2d');
    const frameCount = 121;
    const frames = [];
    let framesLoaded = 0;
    let currentFrame = 0;

    // Size canvas to viewport
    function resizeCanvas() {
      const w = canvas.offsetWidth || window.innerWidth || document.documentElement.clientWidth;
      const h = canvas.offsetHeight || window.innerHeight || document.documentElement.clientHeight;
      canvas.width = w;
      canvas.height = h;
      renderFrame(currentFrame);
    }

    // Render a specific frame
    function renderFrame(index) {
      const img = frames[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Mobile: contain-fit to show full image; Desktop: cover-fit
      const scale = isMobile
        ? Math.min(cw / iw, ch / ih)
        : Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    }

    // Preload all frames
    function preloadFrames() {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `assets/frames/hero/frame_${String(i).padStart(4, '0')}.webp`;
        img.onload = () => {
          framesLoaded++;
          if (framesLoaded === 1) {
            // Render first frame immediately
            resizeCanvas();
          }
        };
        frames.push(img);
      }
    }

    preloadFrames();
    window.addEventListener('resize', resizeCanvas);

    // Use GSAP ScrollTrigger to drive the frame animation
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(self.progress * frameCount)
        );
        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex;
          renderFrame(currentFrame);
        }
      }
    });

    // Fade out and hide hero content + overlay when scrolling past hero
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroContent = document.querySelector('.hero-content');
    const scrollHintEl = document.getElementById('scrollHint');

    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        if (heroOverlay) heroOverlay.style.display = 'none';
        if (heroContent) heroContent.style.display = 'none';
        if (scrollHintEl) scrollHintEl.style.display = 'none';
      },
      onEnterBack: () => {
        if (heroOverlay) heroOverlay.style.display = '';
        if (heroContent) heroContent.style.display = '';
        if (scrollHintEl) scrollHintEl.style.display = '';
      }
    });

    // Fade out hero content near end of scroll
    gsap.to('.hero-content', {
      opacity: 0,
      y: -40,
      scrollTrigger: {
        trigger: heroSection,
        start: isMobile ? '30% top' : '55% top',
        end: isMobile ? '50% top' : '80% top',
        scrub: 1
      }
    });

    // Fade out the hero canvas itself so it doesn't bleed into next section
    gsap.to('#hero-canvas', {
      opacity: 0,
      scrollTrigger: {
        trigger: heroSection,
        start: isMobile ? '40% top' : '75% top',
        end: isMobile ? '60% top' : '95% top',
        scrub: 1
      }
    });
  }

  // ========================================
  // SCROLL HINT
  // ========================================
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    function hideScrollHint() {
      if (window.scrollY > 100) {
        scrollHint.classList.add('hidden');
        window.removeEventListener('scroll', hideScrollHint);
      }
    }
    window.addEventListener('scroll', hideScrollHint, { passive: true });
  }

  // ========================================
  // NAVIGATION
  // ========================================
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Frosted nav on scroll
  if (nav && !nav.classList.contains('nav-scrolled-always')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ========================================
  // HERO TEXT — Letter-by-letter animation
  // ========================================
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = text.split(' ').map(word =>
      `<span class="word">${word.split('').map(char =>
        `<span class="char">${char}</span>`
      ).join('')}</span>`
    ).join(' ');

    // Use a timeline to ensure animations play in sequence
    function playHeroAnimation() {
      const tl = gsap.timeline();
      tl.fromTo('.hero-title .char',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.025, ease: 'power3.out' },
        0.3
      );
      tl.fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        1
      );
      tl.fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        1.3
      );
    }

    // Handle the case where the tab might not be visible yet
    if (document.visibilityState === 'visible') {
      playHeroAnimation();
    } else {
      document.addEventListener('visibilitychange', function onVisible() {
        if (document.visibilityState === 'visible') {
          document.removeEventListener('visibilitychange', onVisible);
          playHeroAnimation();
        }
      });
    }
  }

  // ========================================
  // SCROLL ANIMATIONS — Fade up
  // ========================================
  gsap.utils.toArray('.animate-fade-up').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    });
  });

  // Staggered card reveals
  gsap.utils.toArray('.cards-container').forEach(container => {
    const cards = container.querySelectorAll('.glass-card');
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%'
      }
    });
  });

  // Staggered step reveals
  const stepsContainer = document.querySelector('.steps-container');
  if (stepsContainer) {
    const steps = stepsContainer.querySelectorAll('.step');
    gsap.from(steps, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: stepsContainer,
        start: 'top 85%'
      }
    });
  }

  // ========================================
  // ANIMATED STAT COUNTERS
  // ========================================
  gsap.utils.toArray('.counter').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.val);
          }
        });
      },
      once: true
    });
  });

  // ========================================
  // MAGNETIC CTA BUTTONS — 50px proximity pull
  // ========================================
  if (!isMobile) {
    const MAGNETIC_RANGE = 50;
    const MAX_PULL = 8;
    const magneticBtns = document.querySelectorAll('.cta-button');
    let magneticActive = new Map();

    document.addEventListener('mousemove', (e) => {
      magneticBtns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = Math.max(rect.width, rect.height) / 2 + MAGNETIC_RANGE;

        if (dist < threshold) {
          const pull = Math.min(MAX_PULL, (1 - dist / threshold) * MAX_PULL);
          const angle = Math.atan2(dy, dx);
          gsap.to(btn, {
            x: Math.cos(angle) * pull,
            y: Math.sin(angle) * pull,
            duration: 0.3,
            ease: 'power2.out'
          });
          magneticActive.set(btn, true);
        } else if (magneticActive.get(btn)) {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
          });
          magneticActive.set(btn, false);
        }
      });
    });
  }

  // ========================================
  // CUSTOM CURSOR
  // ========================================
  if (!isMobile) {
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing) {
      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;

      // Mouse glow element
      const mouseGlow = document.createElement('div');
      mouseGlow.className = 'mouse-glow';
      document.body.appendChild(mouseGlow);

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.1 });
        mouseGlow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      });

      // Smooth ring follow
      function updateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        gsap.set(cursorRing, { x: ringX, y: ringY });
        requestAnimationFrame(updateRing);
      }
      updateRing();

      // Hover effect on interactive elements
      const interactiveEls = document.querySelectorAll('a, button, input, textarea, .glass-card');
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
    }
  }

  // ========================================
  // CONTACT FORM — Formspree submission
  // ========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      function showError() {
        btn.textContent = 'Error — Try Again';
        btn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
        btn.disabled = false;
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          contactForm.style.display = 'none';
          const successEl = document.getElementById('formSuccess');
          if (successEl) successEl.style.display = 'block';
        } else {
          showError();
        }
      })
      .catch(showError);
    });
  }

  // ========================================
  // SMOOTH SCROLL for anchor links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================================
  // PARTICLE NETWORK — Hero section only
  // ========================================
  {
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
      const pCtx = particleCanvas.getContext('2d');
      const PARTICLE_COUNT = isMobile ? 35 : 55;
      const CONNECTION_DIST = 120;
      let particles = [];
      let pW, pH;
      let particleAnimId;
      let heroVisible = true;

      function resizeParticleCanvas() {
        pW = window.innerWidth;
        pH = window.innerHeight;
        particleCanvas.width = pW;
        particleCanvas.height = pH;
      }

      function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push({
            x: Math.random() * pW,
            y: Math.random() * pH,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1 + 1
          });
        }
      }

      function drawParticles() {
        if (!heroVisible) return;

        pCtx.clearRect(0, 0, pW, pH);

        // Draw connections
        pCtx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        pCtx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = dx * dx + dy * dy;
            if (dist < CONNECTION_DIST * CONNECTION_DIST) {
              const alpha = 1 - Math.sqrt(dist) / CONNECTION_DIST;
              pCtx.globalAlpha = alpha * 0.5;
              pCtx.beginPath();
              pCtx.moveTo(particles[i].x, particles[i].y);
              pCtx.lineTo(particles[j].x, particles[j].y);
              pCtx.stroke();
            }
          }
        }

        // Draw particles
        pCtx.globalAlpha = 1;
        pCtx.fillStyle = '#fff';
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around edges
          if (p.x < 0) p.x = pW;
          if (p.x > pW) p.x = 0;
          if (p.y < 0) p.y = pH;
          if (p.y > pH) p.y = 0;

          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          pCtx.fill();
        }

        particleAnimId = requestAnimationFrame(drawParticles);
      }

      // Hide particles once scrolled past hero, restart RAF on return
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        onLeave: () => {
          heroVisible = false;
          particleCanvas.style.opacity = '0';
        },
        onEnterBack: () => {
          heroVisible = true;
          particleCanvas.style.opacity = '0.3';
          drawParticles();
        }
      });

      resizeParticleCanvas();
      createParticles();
      drawParticles();

      window.addEventListener('resize', () => {
        resizeParticleCanvas();
        createParticles();
      });
    }
  }

})();
