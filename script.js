'use strict';

/* ═══════════════════════════════════════════════════════════════════════
   NEXISPHOS — script.js (v2)

   ──────────────────────────────────────────────────────────────────────
   ⚠️  ACTION REQUIRED BEFORE LAUNCH
   ──────────────────────────────────────────────────────────────────────
   Replace the two URLs in NEXISPHOS_LINKS below with your real ones:

   1. fellowshipApply  → your Tally / Typeform / Google Form URL
                         (recommended: Tally, free, https://tally.so)
   2. businessCall     → your Cal.com / Calendly booking URL
                         (recommended: Cal.com, free, https://cal.com)

   Until you replace these, the buttons fall back to WhatsApp.
   ═══════════════════════════════════════════════════════════════════════ */

const NEXISPHOS_LINKS = {
  fellowshipApply: 'https://tally.so/r/REPLACE_WITH_YOUR_FORM_ID',
  businessCall:    'https://cal.com/REPLACE_WITH_YOUR_USERNAME/discovery',
  // Fallback used if either URL above still contains "REPLACE_WITH"
  whatsappFellowship: 'https://wa.me/916266106690?text=Hi%20Nexisphos%2C%20I%20want%20to%20apply%20for%20the%20Founding%20Cohort.',
  whatsappBusiness:   'https://wa.me/916266106690?text=Hi%20Nexisphos%2C%20I%20want%20to%20book%20a%20discovery%20call%20for%20my%20business.'
};

/* ── Wire up form/booking buttons ───────────────────────── */
function isPlaceholder(url) {
  return !url || url.includes('REPLACE_WITH');
}

function wireButton(id, primaryUrl, fallbackUrl) {
  const btn = document.getElementById(id);
  if (!btn) return;
  const url = isPlaceholder(primaryUrl) ? fallbackUrl : primaryUrl;
  btn.setAttribute('href', url);
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
}

document.addEventListener('DOMContentLoaded', () => {
  wireButton('ctaFellowshipBtn', NEXISPHOS_LINKS.fellowshipApply, NEXISPHOS_LINKS.whatsappFellowship);
  wireButton('ctaBusinessBtn',   NEXISPHOS_LINKS.businessCall,    NEXISPHOS_LINKS.whatsappBusiness);
  wireButton('fellowshipApplyBtn', NEXISPHOS_LINKS.fellowshipApply, NEXISPHOS_LINKS.whatsappFellowship);
  wireButton('businessCallBtn',    NEXISPHOS_LINKS.businessCall,    NEXISPHOS_LINKS.whatsappBusiness);
});

/* ── Scroll reveal ─────────────────────────────────────── */
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

/* ── Animated counters ─────────────────────────────────── */
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

/* ── Mobile hamburger ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
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

/* ── Terminal typewriter ───────────────────────────────── */
/* v2: removed the "Solution Architect in 8 weeks" claim.
   Replaced with honest copy aligned to fellowship outcomes. */
const termBody = document.getElementById('termBody');
if (termBody) {
  const lines = [
    '$ npx nexisphos init --founding-cohort\n',
    '\n',
    '  Bootstrapping cohort 01...\n',
    '\n',
    '  Frontend  : React + Tailwind      \u2713\n',
    '  Backend   : Node + PostgreSQL     \u2713\n',
    '  Cloud     : AWS + Vercel          \u2713\n',
    '  AI Layer  : Claude + LangChain    \u2713\n',
    '  Mobile    : Flutter (iOS + Drd)   \u2713\n',
    '\n',
    '  Mentor online. Stack ready.\n',
    '  8 weeks. Real client work.\n',
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

/* ── Smooth scroll for in-page anchors (better UX) ─────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 70; // header height
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Footer year ───────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
