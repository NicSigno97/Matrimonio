/* =====================================================
   MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");


function openMenu() {

    sideMenu.classList.add("active");

    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeMenu() {

    sideMenu.classList.remove("active");

    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";
}


if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
}


if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
}


if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
}


/* =====================================================
   CHIUDI MENU QUANDO SI CLICCA SU UN LINK
===================================================== */

const menuLinks = document.querySelectorAll(".side-menu a");

menuLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        closeMenu();

    });

});


/* =====================================================
   ANIMAZIONI ALLO SCROLL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(function(element) {

    observer.observe(element);

});


/* =====================================================
   COLORE HAMBURGER AUTOMATICO
===================================================== */

const menuLines = document.querySelectorAll(".menu-toggle span");


const darkSections = document.querySelectorAll(
    ".section-dark, .registry-preview"
);


const lightSections = document.querySelectorAll(
    ".section-light, .section-blue"
);


function setMenuColor(color) {

    menuLines.forEach(function(line) {

        line.style.background = color;

    });

}


const sectionObserver = new IntersectionObserver(

    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                if (
                    entry.target.classList.contains("section-dark") ||
                    entry.target.classList.contains("registry-preview")
                ) {

                    setMenuColor("white");

                } else {

                    setMenuColor("#24364b");

                }

            }

        });

    },

    {
        threshold: 0.5
    }

);


darkSections.forEach(function(section) {

    sectionObserver.observe(section);

});


lightSections.forEach(function(section) {

    sectionObserver.observe(section);

});


/* =====================================================
   PARALLAX LEGGERO IMMAGINE HERO
===================================================== */

const heroImage = document.querySelector(".hero-image");


window.addEventListener("scroll", function() {

    if (!heroImage) return;

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {

        heroImage.style.transform =
            `scale(1.05) translateY(${scrollPosition * 0.12}px)`;

    }

});
