/* =====================================================
   SCRIPT MATRIMONIO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTI MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    /* =====================================================
       APERTURA MENU
    ===================================================== */

    function openMenu() {

        if (sideMenu) {
            sideMenu.classList.add("active");
        }

        if (menuOverlay) {
            menuOverlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";
    }

    /* =====================================================
       CHIUSURA MENU
    ===================================================== */

    function closeMenu() {

        if (sideMenu) {
            sideMenu.classList.remove("active");
        }

        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }

        document.body.style.overflow = "";
    }

    /* Pulsante hamburger */

    if (menuToggle) {
        menuToggle.addEventListener("click", openMenu);
    }

    /* Pulsante X */

    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    /* Overlay */

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }


    /* =====================================================
       LINK DEL MENU
    ===================================================== */

    const menuLinks = document.querySelectorAll(".side-menu a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });


    /* =====================================================
       CHIUSURA MENU CON ESC
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       ANIMAZIONI SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    /*
       Mostriamo immediatamente gli elementi che si trovano
       già nella schermata iniziale.
    */

    function revealVisibleElements() {

        revealElements.forEach(function (element) {

            const rect = element.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {
                element.classList.add("visible");
            }

        });

    }


    /*
       IntersectionObserver
    */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.08
            }

        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        /*
           Fallback per browser meno recenti
        */

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /*
       Controllo iniziale.
       Serve soprattutto su smartphone.
    */

    revealVisibleElements();

    window.addEventListener(
        "load",
        revealVisibleElements
    );


    /* =====================================================
       PARALLAX LEGGERO DELLA COPERTINA
    ===================================================== */

    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {

        window.addEventListener(
            "scroll",
            function () {

                const scrollPosition = window.scrollY;

                /*
                   Applichiamo il movimento solo quando
                   siamo nella zona della copertina.
                */

                if (scrollPosition < window.innerHeight) {

                    const movement =
                        scrollPosition * 0.08;

                    heroImage.style.transform =
                        "scale(1.05) translateY(" +
                        movement +
                        "px)";

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       COLORE AUTOMATICO HAMBURGER
    ===================================================== */

    const menuLines =
        document.querySelectorAll(".menu-toggle span");

    const sections =
        document.querySelectorAll("main section");


    function setMenuColor(color) {

        menuLines.forEach(function (line) {

            line.style.backgroundColor = color;

        });

    }


    /*
       Colore iniziale:
       bianco sulla copertina.
    */

    setMenuColor("#ffffff");


    /*
       Determina il colore dell'hamburger
       in base alla sezione visibile.
    */

    function updateMenuColor() {

        const viewportCenter =
            window.innerHeight * 0.25;

        let currentSection = null;

        sections.forEach(function (section) {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <= viewportCenter &&
                rect.bottom >= viewportCenter
            ) {
                currentSection = section;
            }

        });


        if (!currentSection) {
            return;
        }


        /*
           Home e Lista Nozze:
           sfondo scuro → hamburger bianco
        */

        if (
            currentSection.id === "home" ||
            currentSection.id === "lista"
        ) {

            setMenuColor("#ffffff");

        }

        /*
           Evento e Noi:
           sfondo chiaro/blu → hamburger blu
        */

        else {

            setMenuColor("#24364b");

        }

    }


    /*
       Aggiornamento iniziale
    */

    updateMenuColor();


    /*
       Aggiornamento durante lo scroll
    */

    window.addEventListener(
        "scroll",
        updateMenuColor,
        {
            passive: true
        }
    );


    /*
       Aggiornamento quando cambia la dimensione
       dello schermo / rotazione smartphone
    */

    window.addEventListener(
        "resize",
        updateMenuColor
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       FINE SCRIPT
    ===================================================== */

});
