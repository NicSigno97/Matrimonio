document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // ELEMENTI PRINCIPALI
    // =========================================================

    const header = document.getElementById("siteHeader");

    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBackdrop = document.getElementById("menuBackdrop");

    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    const desktopLinks = document.querySelectorAll(".desktop-nav a");

    const sections = document.querySelectorAll("main section[id]");


    // =========================================================
    // HEADER — CAMBIO STATO DURANTE LO SCROLL
    // =========================================================

    const updateHeader = () => {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    // =========================================================
    // MENU MOBILE
    // =========================================================

    const openMenu = () => {
        if (!mobileMenu || !menuBackdrop || !menuToggle) return;

        mobileMenu.classList.add("is-open");
        menuBackdrop.classList.add("is-visible");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");
    };


    const closeMenu = () => {
        if (!mobileMenu || !menuBackdrop || !menuToggle) return;

        mobileMenu.classList.remove("is-open");
        menuBackdrop.classList.remove("is-visible");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
    };


    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mobileMenu?.classList.contains("is-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }


    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }


    if (menuBackdrop) {
        menuBackdrop.addEventListener("click", closeMenu);
    }


    // Chiude il menu quando si seleziona una voce
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    // Chiude il menu premendo ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    // Se si passa da mobile a desktop mentre il menu è aperto
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });


    // =========================================================
    // ANIMAZIONI DI APPARIZIONE
    // =========================================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-up, .section-heading, .event-card, .story-item, .location-card"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback per browser molto vecchi
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }


    // =========================================================
    // NAVIGAZIONE — SEZIONE ATTIVA
    // =========================================================

    if (
        "IntersectionObserver" in window &&
        sections.length &&
        desktopLinks.length
    ) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.getAttribute("id");

                    desktopLinks.forEach((link) => {

                        const linkTarget = link.getAttribute("href");

                        if (linkTarget === `#${currentId}`) {
                            link.classList.add("active");
                        } else {
                            link.classList.remove("active");
                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    // =========================================================
    // SCROLL FLUIDO PER I LINK INTERNI
    // =========================================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId) return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    // =========================================================
    // ANIMAZIONE LEGGERA DELL'IMMAGINE HERO
    // =========================================================

    const heroImage = document.querySelector(".hero-image");


    if (heroImage && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {

        let ticking = false;


        const updateHero = () => {

            const scrollY = window.scrollY;

            // Evita effetti eccessivi
            if (scrollY < window.innerHeight) {

                const movement = Math.min(scrollY * 0.12, 80);

                heroImage.style.transform =
                    `scale(1.04) translateY(${movement}px)`;

            }

            ticking = false;
        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {
                    window.requestAnimationFrame(updateHero);
                    ticking = true;
                }

            },
            { passive: true }
        );

    }


    // =========================================================
    // GESTIONE LINK ALLA LISTA NOZZE
    // =========================================================

    const registryLinks = document.querySelectorAll(
        'a[href="lista-nozze.html"]'
    );


    registryLinks.forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    // =========================================================
    // ANNO AUTOMATICO NEL FOOTER
    // =========================================================

    const currentYear = document.querySelector("[data-current-year]");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =========================================================
    // ACCESSIBILITÀ MENU
    // =========================================================

    if (mobileMenu) {
        mobileMenu.setAttribute("aria-hidden", "true");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-controls", "mobileMenu");
    }


    // =========================================================
    // PREVENZIONE SCROLL DELLA PAGINA CON MENU APERTO
    // =========================================================

    // La classe viene gestita dal CSS:
    // body.menu-open { overflow: hidden; }

});
