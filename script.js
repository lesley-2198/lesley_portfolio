/* ══════════════════════════════════════
   LESLEY NGCOBO — script.js
══════════════════════════════════════ */

// ── NAV: scroll shadow + mobile toggle ──
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle?.addEventListener('click', () => {
    const open = navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navMobile.classList.toggle('open', open);
});

// Close mobile nav on link click
navMobile?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// ── HERO: stagger line reveal on load ──
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.line').forEach(el => {
        el.style.animationPlayState = 'running';
    });
});

// ── PROJECT FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.cat;

        projectCards.forEach(card => {
            const match = cat === 'all' || card.dataset.cat === cat;
            if (match) {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.35s ease';
                    card.style.opacity = '1';
                });
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    formNote.textContent = '';
    formNote.className = 'form-note';

    try {
        const res = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' }
        });

        if (res.ok) {
            formNote.textContent = 'Message sent. I\'ll be in touch.';
            formNote.className = 'form-note success';
            form.reset();
        } else {
            throw new Error('Server error');
        }
    } catch {
        formNote.textContent = 'Something went wrong. Try emailing me directly.';
        formNote.className = 'form-note error';
    } finally {
        submitBtn.disabled = false;
        btnText.textContent = originalText;
    }
});

// ── SCROLL REVEAL (lightweight IntersectionObserver) ──
const revealElements = document.querySelectorAll(
    '.timeline-item, .edu-card, .project-card, .about-strip-inner'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
});

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.style.color = link.getAttribute('href') === `#${id}`
                    ? 'var(--ink)'
                    : '';
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
