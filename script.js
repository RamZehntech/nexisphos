'use strict';

/* ── Scroll reveal ─────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach((el) => revealObserver.observe(el));

/* ── Animated counters ─────────────────────────────── */
const counters = document.querySelectorAll('.count');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
          return;
        }
        el.textContent = Math.floor(current);
      }, 16);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach((c) => counterObserver.observe(c));

/* ── Mobile hamburger ──────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/* ── Terminal typewriter ───────────────────────────── */
const termBody = document.getElementById('termBody');
if (termBody) {
  const lines = [
    '$ npx nexisphos init --fellowship\n',
    '\n',
    '  Initializing cohort-04...\n',
    '\n',
    '  Frontend  : React + Tailwind      ✓\n',
    '  Backend   : Node + PostgreSQL     ✓\n',
    '  Cloud     : AWS + Vercel          ✓\n',
    '  AI Layer  : Claude + LangChain    ✓\n',
    '  Mobile    : Flutter (iOS + Drd)   ✓\n',
    '\n',
    '  Mentor online. Stack ready.\n',
    '  8 weeks → Solution Architect.\n',
    '\n',
    '  $ build --live --ship-real _',
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let text = '';

  function type() {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      text += line[charIdx];
      termBody.textContent = text;
      charIdx++;
      const delay = charIdx === 1 && lineIdx > 0 ? 55 : 22;
      setTimeout(type, delay);
    } else {
      lineIdx++;
      charIdx = 0;
      const pause = lineIdx === 1 ? 140 : 40;
      setTimeout(type, pause);
    }
  }

  setTimeout(type, 900);
}

/* ── Footer year ───────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

