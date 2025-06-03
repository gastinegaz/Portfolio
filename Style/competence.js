document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header-section");

    // Suivi de la dernière position de défilement
    let lastScrollY = window.scrollY;

    // Fonction pour gérer la visibilité de l'en-tête
    const handleHeaderVisibility = () => {
        window.addEventListener("scroll", () => {
            if (window.scrollY === 0) {
                // Si on est tout en haut, afficher le titre
                header.style.transform = "translateY(0)";
                header.style.opacity = "1";
            } else {
                // Sinon, cacher l'en-tête
                header.style.transform = "translateY(-100%)";
                header.style.opacity = "0";
            }
            lastScrollY = window.scrollY; // Mettre à jour la position de défilement
        });
    };

    // Fonction pour animer les barres de progression
    const handleCompetenceBars = () => {
        const bars = document.querySelectorAll(".bar");

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
            bars.forEach((bar) => {
                if (isInViewport(bar)) {
                    const level = bar.getAttribute("data-level");
                    bar.style.width = `${level}%`;
                }
            });
        };

        window.addEventListener("scroll", checkBarsInView);
        checkBarsInView(); // Animer les barres visibles au chargement
    };

    // Appeler les deux fonctions pour header et barres
    handleHeaderVisibility();
    handleCompetenceBars();

    /* ===========================================
       PARTIE AJOUTÉE : Gestion des modals Projets
       =========================================== */

    // Ouvrir le modal correspondant au clic sur une carte
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
        card.addEventListener("click", () => {
            const modalId = card.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "flex";
            }
        });
    });

    // Fermer le modal quand on clique sur la croix
    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const parentModal = btn.closest(".project-modal");
            if (parentModal) {
                parentModal.style.display = "none";
            }
        });
    });

    // Fermer le modal si on clique hors du contenu (sur le fond sombre)
    const modals = document.querySelectorAll(".project-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            // Si la cible du clic est bien le conteneur .project-modal (pas le .modal-content)
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});
