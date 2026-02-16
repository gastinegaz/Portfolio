document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initBackToTop();
    initAnimations();
    initSkillBars();
});

function initTheme() {
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme');

    if (saved) {
        html.dataset.theme = saved;
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = html.dataset.theme === 'light' ? 'dark' : 'light';
            html.dataset.theme = next;
            localStorage.setItem('theme', next);
            updateThemeIcon(themeBtn, next);
        });
        updateThemeIcon(themeBtn, html.dataset.theme || 'dark');
    }
}

function updateThemeIcon(btn, theme) {
    btn.textContent = theme === 'light' ? '🌙' : '☀️';
}

function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    const toggle = () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card, .skill-card, .skill-category, .timeline-item, .contact-link').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-in, .project-card, .skill-card, .skill-category, .timeline-item, .contact-link').forEach(el => {
        if (el.classList.contains('animate-in') || el.getBoundingClientRect().top < window.innerHeight) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

document.head.insertAdjacentHTML('beforeend', `
<style>
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
</style>
`);

function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.dataset.level;
                bar.querySelector('.skill-progress').style.width = level + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.querySelector('.skill-progress').style.width = '0%';
        observer.observe(bar);
    });
}