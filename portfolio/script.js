/* ─────────────────────────────────────────
   PORTFOLIO JS  — Alex Morgan
   Features:
   • Typewriter role effect
   • Navbar scroll + active-link highlight
   • Hamburger / mobile nav
   • Scroll-reveal animations
   • Skill progress bars triggered on scroll
   • 3D tilt on profile card (mouse tracking)
   • Contact form handling (demo)
   • Back-to-top button
───────────────────────────────────────── */

'use strict';

/* ─── Typewriter ─── */
(function initTypewriter() {
  const roles = [
    'Data Science Student',
    'AI Enthusiast',
    'ML (Learning)',
    'Web Developer',
    'Problem Solver',
  ];
  const el = document.getElementById('typedRole');
  if (!el) return;

  let roleIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = roles[roleIndex];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 55 : 95);
  }
  type();
})();


/* ─── Navbar — scroll style + active link ─── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const links    = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // sticky style
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─── Hamburger / mobile nav ─── */
(function initHamburger() {
  const btn      = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();


/* ─── Scroll-reveal ─── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // stagger siblings inside same parent
  document.querySelectorAll('.projects-grid, .cert-grid, .about-cards, .skills-grid').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();


/* ─── Skill progress bars ─── */
(function initProgressBars() {
  const bars = document.querySelectorAll('.bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.w + '%';
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(b => observer.observe(b));
})();


/* ─── 3-D tilt on profile card ─── */
(function initTilt() {
  const card = document.getElementById('profileCard');
  if (!card) return;

  const MAX_TILT = 14; // degrees

  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const rotateY =  dx * MAX_TILT;
    const rotateX = -dy * MAX_TILT;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    card.style.boxShadow = `
      ${-rotateY * 1.5}px ${rotateX * 1.5}px 50px rgba(108,99,255,0.35),
      0 20px 60px rgba(0,0,0,0.5)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
})();


/* ─── Contact form (demo) ─── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      shakeForm(form);
      return;
    }
    if (!isValidEmail(email)) {
      shakeForm(form);
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled  = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulate network request (replace with your back-end call / EmailJS)
    setTimeout(() => {
      form.reset();
      btn.disabled  = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1400);
  });

  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function shakeForm(el) {
    el.style.animation = 'none';
    el.offsetHeight;   // reflow
    el.style.animation = 'shake 0.4s ease';
    el.addEventListener('animationend', () => el.style.animation = '', { once: true });
  }
})();

/* shake keyframes injected via JS so no extra CSS file edits needed */
(function injectShakeKeyframe() {
  const s = document.createElement('style');
  s.textContent = `@keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-5px)}
    80%{transform:translateX(5px)}
  }`;
  document.head.appendChild(s);
})();


/* ─── Back-to-top button ─── */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ─── Smooth scroll for anchor links (fallback for older browsers) ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    // Skip bare "#" links (e.g. placeholder external-link icons) — let browser handle them
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});


/* ─── Subtle parallax on hero shapes ─── */
(function initParallax() {
  const shapes = document.querySelectorAll('.hero-bg-shapes .shape');
  if (!shapes.length) return;
  const factors = [0.04, 0.07, 0.055];
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    shapes.forEach((s, i) => {
      const f  = factors[i] || 0.05;
      const tx = (e.clientX - cx) * f;
      const ty = (e.clientY - cy) * f;
      s.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });
})();
