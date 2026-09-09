/* =========================================================
   BLISS — script.js
   Header scroll state, menu mobile, reveal on scroll,
   lightbox da galeria e carrossel de avaliações.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- HEADER: estado ao rolar ---------- */
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- GALERIA: LIGHTBOX ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function getImageSrc(item) {
    const img = item.querySelector('img');
    return img ? img.getAttribute('src') : '';
  }

  function getImageAlt(item) {
    const img = item.querySelector('img');
    return img ? img.getAttribute('alt') : '';
  }

  function itemHasImage(item) {
    return !item.classList.contains('no-image');
  }

  function openLightbox(index) {
    const item = galleryItems[index];
    if (!item || !itemHasImage(item)) return;
    currentIndex = index;
    lightboxImg.src = getImageSrc(item);
    lightboxImg.alt = getImageAlt(item);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showRelative(offset) {
    if (!galleryItems.length) return;
    let nextIndex = currentIndex;
    for (let i = 0; i < galleryItems.length; i++) {
      nextIndex = (nextIndex + offset + galleryItems.length) % galleryItems.length;
      if (itemHasImage(galleryItems[nextIndex])) {
        openLightbox(nextIndex);
        return;
      }
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showRelative(-1));
  lightboxNext.addEventListener('click', () => showRelative(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* ---------- CARROSSEL DE AVALIAÇÕES ---------- */
  const track = document.getElementById('testimonialTrack');
  const slides = Array.from(track.children);
  const dotsWrap = document.getElementById('testimonialDots');
  let activeSlide = 0;
  let autoTimer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Avaliação ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goToSlide(index, userTriggered) {
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === activeSlide));
    if (userTriggered) restartAutoplay();
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    autoTimer = setInterval(() => goToSlide(activeSlide + 1, false), 6000);
  }
  function restartAutoplay() {
    clearInterval(autoTimer);
    startAutoplay();
  }
  startAutoplay();

});