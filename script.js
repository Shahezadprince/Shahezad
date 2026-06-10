/* =============================================================
   SHAHEZAD PORTFOLIO — script.js
   ============================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     THEME TOGGLE
  ---------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const body        = document.body;

  function applyTheme(mode) {
    if (mode === 'light') {
      body.classList.add('light');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      body.classList.remove('light');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    localStorage.setItem('ssTheme', mode);
  }

  // Restore saved preference
  applyTheme(localStorage.getItem('ssTheme') || 'dark');

  themeToggle.addEventListener('click', () => {
    applyTheme(body.classList.contains('light') ? 'dark' : 'light');
  });


  /* ----------------------------------------------------------
     NAVBAR — scroll effect
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  /* ----------------------------------------------------------
     MOBILE HAMBURGER
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close when a link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });


  /* ----------------------------------------------------------
     ACTIVE NAV LINK on scroll
  ---------------------------------------------------------- */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function syncActiveLink() {
    const offset = window.scrollY + 110;
    sections.forEach(sec => {
      if (offset >= sec.offsetTop && offset < sec.offsetTop + sec.offsetHeight) {
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  }

  window.addEventListener('scroll', syncActiveLink, { passive: true });


  /* ----------------------------------------------------------
     RESUME DROPDOWN
  ---------------------------------------------------------- */
  const resumeDropdown = document.getElementById('resumeDropdown');
  const resumeToggle   = document.getElementById('resumeToggle');

  resumeToggle.addEventListener('click', e => {
    e.stopPropagation();
    resumeDropdown.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!resumeDropdown.contains(e.target)) {
      resumeDropdown.classList.remove('open');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') resumeDropdown.classList.remove('open');
  });


  /* ----------------------------------------------------------
     SCROLL ANIMATIONS — IntersectionObserver
  ---------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  // Add stagger delays for sibling groups
  const staggerParents = document.querySelectorAll(
    '.stats-grid, .skills-grid, .certs-grid, .projects-grid, .contact-grid, .timeline'
  );

  staggerParents.forEach(parent => {
    parent.querySelectorAll('[data-animate]').forEach((el, i) => {
      el.style.transitionDelay = (i * 75) + 'ms';
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  animatedEls.forEach(el => revealObserver.observe(el));


  /* ----------------------------------------------------------
     STAT COUNTER ANIMATION
  ---------------------------------------------------------- */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400; // ms
    const start = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statNums.forEach(el => counterObserver.observe(el));


  /* ----------------------------------------------------------
     SMOOTH SCROLL for anchor links (fallback for older browsers)
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
