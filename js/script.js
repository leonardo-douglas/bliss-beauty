/* ============================================
   HEADER NO SCROLL
============================================ */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ============================================
   MENU MOBILE
============================================ */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");

});


/* Fecha o menu depois de clicar em algum link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");
        menuToggle.classList.remove("active");

    });

});


/* ============================================
   ANIMAÇÕES AO ROLAR
============================================ */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ============================================
   SCROLL SUAVE
============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* ============================================
   IMAGENS QUE NÃO EXISTEM
============================================ */

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener("error", () => {

        const parent = image.parentElement;

        image.style.display = "none";

        if (!parent.querySelector(".image-placeholder")) {

            const placeholder = document.createElement("div");

            placeholder.classList.add("image-placeholder");

            placeholder.innerHTML = `
                <span>BLISS</span>
                <small>Adicione a imagem na pasta assets</small>
            `;

            placeholder.style.width = "100%";
            placeholder.style.height = "100%";
            placeholder.style.minHeight = "180px";
            placeholder.style.display = "flex";
            placeholder.style.flexDirection = "column";
            placeholder.style.alignItems = "center";
            placeholder.style.justifyContent = "center";
            placeholder.style.background = "#111";
            placeholder.style.color = "#d6b36a";
            placeholder.style.fontWeight = "800";
            placeholder.style.letterSpacing = "4px";

            placeholder.querySelector("small").style.marginTop = "10px";
            placeholder.querySelector("small").style.fontSize = "9px";
            placeholder.querySelector("small").style.color = "#777";
            placeholder.querySelector("small").style.letterSpacing = "1px";

            parent.appendChild(placeholder);

        }

    });

});


/* ============================================
   EFEITO SUTIL NOS CARDS
============================================ */

const procedureCards =
    document.querySelectorAll(".procedure-card");

procedureCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -1.5;

        const rotateY =
            ((x - centerX) / centerX) * 1.5;

        card.style.transform =
            `translateY(-8px)
             perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});