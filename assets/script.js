// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const drawer = document.getElementById('mobileDrawer');
const closeBtn = document.getElementById('closeDrawer');
if (menuBtn && drawer) {
  menuBtn.addEventListener('click', () => drawer.classList.add('open'));
  closeBtn?.addEventListener('click', () => drawer.classList.remove('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => item.classList.toggle('open'));
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Year in footer
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
