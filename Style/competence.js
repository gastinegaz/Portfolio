document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header-section");

    /* ===== Header show/hide on scroll ===== */
    const onScrollHeader = () => {
        if (window.scrollY === 0) {
            header.style.transform = "translateY(0)";
            header.style.opacity = "1";
        } else {
            header.style.transform = "translateY(-100%)";
            header.style.opacity = "0";
        }
    };
    window.addEventListener("scroll", onScrollHeader, { passive: true });
    onScrollHeader();

    /* ===== Mode clair/sombre (localStorage) ===== */
    const html = document.documentElement;
    const THEME_KEY = "theme";
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) html.dataset.theme = savedTheme;
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn?.addEventListener("click", () => {
        const next = html.dataset.theme === "light" ? "dark" : "light";
        html.dataset.theme = next;
        localStorage.setItem(THEME_KEY, next);
    });

    /* ===== Compétences: barres segmentées ===== */
    const buildSegments = () => {
        document.querySelectorAll(".segmented").forEach(seg => {
            if (seg.childElementCount > 0) return; // éviter double init
            const lvl = Number(seg.dataset.level || 0); // /20
            for (let i = 1; i <= 20; i++) {
                const d = document.createElement("div");
                d.className = "segment" + (i <= lvl ? " filled" : "");
                seg.appendChild(d);
            }
        });
    };
    buildSegments();

    /* ===== Carrousel Projets : coverflow ===== */
    const slides = Array.from(document.querySelectorAll(".project-slide"));
    const prevBtn = document.querySelector(".nav-btn.prev");
    const nextBtn = document.querySelector(".nav-btn.next");
    const dots = Array.from(document.querySelectorAll(".dot"));
    let current = 0;

    const updateCarousel = () => {
        const total = slides.length;
        slides.forEach(slide => {
            slide.className = "project-slide"; // reset
            slide.setAttribute("aria-hidden", "true");
            slide.style.zIndex = "1";
        });

        const left = (current - 1 + total) % total;
        const right = (current + 1) % total;

        slides[current].classList.add("active");
        slides[current].setAttribute("aria-hidden", "false");
        slides[current].style.zIndex = "3";
        slides[left].classList.add("left");
        slides[left].style.zIndex = "2";
        slides[right].classList.add("right");
        slides[right].style.zIndex = "2";

        dots.forEach(d => d.classList.remove("active"));
        const cd = dots.find(d => Number(d.dataset.go) === current);
        if (cd) cd.classList.add("active");
    };

    const goTo = (idx) => {
        const total = slides.length;
        current = ((idx % total) + total) % total;
        updateCarousel();
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    nextBtn?.addEventListener("click", next);
    prevBtn?.addEventListener("click", prev);

    slides.forEach(slide => {
        slide.addEventListener("click", () => {
            if (slide.classList.contains("left")) prev();
            else if (slide.classList.contains("right")) next();
        });
    });

    dots.forEach(dot => {
        dot.addEventListener("click", () => goTo(Number(dot.dataset.go)));
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    });

    updateCarousel();

    /* ===== Bouton “Remonter” ===== */
    const toTop = document.getElementById("to-top");
    if (toTop) {
        const toggleTop = () => toTop.classList.toggle("show", window.scrollY > 600);
        window.addEventListener("scroll", toggleTop, { passive: true });
        toggleTop();
        toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    /* ===== Respecte prefers-reduced-motion ===== */
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
        // Pas d’animations additionnelles ici, CSS gère déjà la réduction.
    }
});
