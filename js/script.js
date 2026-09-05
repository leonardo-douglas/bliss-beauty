// ======================================================
// ICONES
// ======================================================

lucide.createIcons();


// ======================================================
// ANO AUTOMÁTICO
// ======================================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


// ======================================================
// HEADER AO ROLAR
// ======================================================

const header = document.getElementById("header");

function updateHeader() {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


// ======================================================
// BARRA DE PROGRESSO
// ======================================================

const scrollProgress = document.getElementById("scrollProgress");

function updateProgress() {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / documentHeight) * 100;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress);


// ======================================================
// MENU MOBILE
// ======================================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");

  const spans = menuBtn.querySelectorAll("span");

  if (nav.classList.contains("active")) {
    spans[0].style.transform = "translateY(4px) rotate(45deg)";
    spans[1].style.transform = "translateY(-4px) rotate(-45deg)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.transform = "";
  }
});


document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");

    const spans = menuBtn.querySelectorAll("span");

    spans[0].style.transform = "";
    spans[1].style.transform = "";
  });
});


// ======================================================
// ANIMAÇÃO REVEAL
// ======================================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// ======================================================
// MENU ATIVO
// ======================================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

function activeNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activeNavigation);


// ======================================================
// CONTADORES
// ======================================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.number);

      let current = 0;

      const increment = target / 40;

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        if (target === 5) {
          counter.textContent = current.toFixed(1).replace(".", ",");
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 25);

      counterObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.6
  }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});


// ======================================================
// EFEITO PARALLAX SUAVE NO HERO
// ======================================================

const heroImage = document.querySelector(".hero-image-wrapper img");

window.addEventListener("scroll", () => {
  if (!heroImage || window.innerWidth < 900) return;

  const scroll = window.scrollY;

  if (scroll < window.innerHeight) {
    heroImage.style.transform = `scale(1.03) translateY(${scroll * 0.025}px)`;
  }
});


// ======================================================
// SMOOTH SCROLL COM OFFSET DO HEADER
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const headerHeight = header.offsetHeight;

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