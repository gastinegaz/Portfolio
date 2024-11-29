document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".bar");

    const animateBars = () => {
        bars.forEach(bar => {
            const level = bar.getAttribute("data-level");
            bar.style.width = `${level}%`;
        });
    };

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const checkBarsInView = () => {
        bars.forEach(bar => {
            if (isInViewport(bar)) {
                const level = bar.getAttribute("data-level");
                bar.style.width = `${level}%`;
            }
        });
    };

    window.addEventListener("scroll", checkBarsInView);
    checkBarsInView(); // Trigger animation on load if already in viewport
});
