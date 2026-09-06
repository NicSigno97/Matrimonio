/* =========================================
   MENU
========================================= */

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".menu-link");


function openMenu() {

    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow = "hidden";
}


function closeSideMenu() {

    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow = "";
}


menuButton.addEventListener(
    "click",
    openMenu
);


closeMenu.addEventListener(
    "click",
    closeSideMenu
);


menuOverlay.addEventListener(
    "click",
    closeSideMenu
);


menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeSideMenu
    );

});


/* =========================================
   CHIUDI MENU CON ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            sideMenu.classList.contains("active")
        ) {

            closeSideMenu();

        }

    }
);


/* =========================================
   ANIMAZIONI DURANTE LO SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   AGGIUNTA RITARDO ALLE ANIMAZIONI
========================================= */

const cards =
    document.querySelectorAll(".event-card");


cards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 120}ms`;

    }
);


/* =========================================
   PARALLAX LEGGERO HERO
========================================= */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener(
    "scroll",
    () => {

        if (!heroImage) {
            return;
        }

        const scrollPosition =
            window.scrollY;

        if (
            scrollPosition <
            window.innerHeight
        ) {

            heroImage.style.transform =
                `translateY(${scrollPosition * 0.15}px)`;

        }

    },
    {
        passive: true
    }
);

/* =========================================
   COLORE MENU IN BASE ALLA SEZIONE
========================================= */

const header = document.querySelector(".site-header");
const menuButtonLines = document.querySelectorAll(".menu-button span");

const sections = document.querySelectorAll("main section");


const colorObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const section = entry.target;

                /*
                 * Se la sezione ha sfondo scuro,
                 * il menu diventa bianco.
                 */

                const darkSections = [
                    "home",
                    "lista"
                ];

                if (darkSections.includes(section.id)) {

                    menuButtonLines.forEach(line => {
                        line.style.background = "#ffffff";
                    });

                } else {

                    /*
                     * Sezione chiara:
                     * menu blu.
                     */

                    menuButtonLines.forEach(line => {
                        line.style.background = "#17324d";
                    });

                }

            }

        });

    },
    {
        threshold: 0.45
    }
);


sections.forEach(section => {
    colorObserver.observe(section);
});
