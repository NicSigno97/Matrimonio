/* =====================================================
   MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


function openMenu() {

    if (sideMenu) {
        sideMenu.classList.add("active");
    }

    if (menuOverlay) {
        menuOverlay.classList.add("active");
    }

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    if (sideMenu) {
        sideMenu.classList.remove("active");
    }

    if (menuOverlay) {
        menuOverlay.classList.remove("active");
    }

    document.body.style.overflow = "";
}


/* Apertura menu */

if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
}


/* Chiusura con X */

if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
}


/* Chiusura cliccando sull'overlay */

if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
}


/* =====================================================
   LINK DEL MENU
===================================================== */

const menuLinks = document.querySelectorAll(".side-menu a");

menuLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        closeMenu();

    });

});


/* =====================================================
   CHIUSURA CON ESC
===================================================== */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        sideMenu &&
        sideMenu.classList.contains("active")
    ) {

        closeMenu();

    }

});


/* =====================================================
   ANIMAZIONI DURANTE LO SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function(element) {

        revealObserver.observe(element);

    });

} else {

    /*
       Se il browser non supporta IntersectionObserver,
       mostriamo comunque tutti gli elementi.
    */

    revealElements.forEach(function(element) {

        element.classList.add("visible");

    });

}


/* =====================================================
   PARALLAX LEGGERO DELLA COPERTINA
===================================================== */

const heroImage =
    document.querySelector(".hero-image");


window.addEventListener(
    "scroll",
    function() {

        if (!heroImage) {
            return;
        }

        const scrollPosition = window.scrollY;


        if (scrollPosition < window.innerHeight) {

            heroImage.style.transform =
                `scale(1.05) translateY(${scrollPosition * 0.12}px)`;

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   COLORE AUTOMATICO DEL MENU
===================================================== */

const menuLines =
    document.querySelectorAll(".menu-toggle span");


const sections =
    document.querySelectorAll("main section");


function setMenuColor(color) {

    menuLines.forEach(function(line) {

        line.style.background = color;

    });

}


/*
   All'inizio siamo sulla copertina,
   quindi hamburger bianco.
*/

setMenuColor("white");


if ("IntersectionObserver" in window) {

    const colorObserver = new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (!entry.isIntersecting) {
                    return;
                }


                const section =
                    entry.target;


                /*
                   Sezione scura:
                   hamburger bianco.
                */

                if (
                    section.id === "home" ||
                    section.id === "lista"
                ) {

                    setMenuColor("white");

                }


                /*
                   Sezione chiara/blu:
                   hamburger blu.
                */

                else {

                    setMenuColor("#24364b");

                }

            });

        },

        {
            threshold: 0.45
        }

    );


    sections.forEach(function(section) {

        colorObserver.observe(section);

    });

}
