/**
 * PawSpa — script.js
 * Fonctionnalités :
 *  1. Ombre + classe "scrolled" sur la nav au défilement
 *  2. Menu hamburger mobile (toggle is-open)
 *  3. Lien actif dans la nav (IntersectionObserver)
 *  4. Reveal au scroll (IntersectionObserver)
 *  5. Validation + soumission simulée du formulaire de contact
 *  6. Bouton scroll-to-top (créé dynamiquement)
 *  7. Scroll fluide : fallback JS pour navigateurs anciens
 */

(function () {
  'use strict';

  /* ── Références DOM ──────────────────────────────────────────────────────── */
  const navHeader   = document.getElementById('nav-header');
  const navToggle   = document.getElementById('nav-toggle');
  const navMenu     = document.getElementById('nav-menu');
  const navLinks    = document.querySelectorAll('.nav-link');
  const sections    = document.querySelectorAll('section[id]');
  const revealEls   = document.querySelectorAll('.reveal');
  const form        = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  /* ── Utilitaire : hauteur nav ────────────────────────────────────────────── */
  function getNavHeight () {
    const h = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
      10
    );
    return isNaN(h) ? 68 : h;
  }

  /* ── 1. Ombre nav + scroll-to-top visibility ─────────────────────────────── */
  let scrollTopBtn;

  function onScroll () {
    navHeader.classList.toggle('scrolled', window.scrollY > 10);
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. Menu hamburger mobile ────────────────────────────────────────────── */
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Fermer le menu' : 'Ouvrir le menu'
    );
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  function closeMenu () {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
  }

  // Fermer en cliquant sur un lien
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Fermer avec Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  /* ── 3. Lien actif dans la nav (IntersectionObserver) ───────────────────── */
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add('active');
      });
    },
    {
      rootMargin: `-${getNavHeight()}px 0px -55% 0px`,
      threshold: 0,
    }
  );
  sections.forEach(s => navObserver.observe(s));

  /* ── 4. Reveal au scroll ────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        // Décalage en cascade pour les éléments voisins dans la même grille
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 75);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  /* ── 5. Bouton scroll-to-top (injecté dynamiquement) ────────────────────── */
  scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.setAttribute('aria-label', 'Retour en haut de page');
  scrollTopBtn.innerHTML = '&#8593;'; // ↑
  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 6. Validation + soumission simulée du formulaire ───────────────────── */
  if (form) {
    form.addEventListener('submit', handleSubmit);

    form.querySelectorAll('.form-input').forEach(input => {
      // Effacer l'erreur dès que l'utilisateur modifie le champ
      input.addEventListener('input', () => clearError(input));
      // Valider à la sortie du champ
      input.addEventListener('blur', () => validateField(input));
    });
  }

  function handleSubmit (e) {
    e.preventDefault();

    const nomInput     = document.getElementById('nom');
    const emailInput   = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nomOk     = validateField(nomInput);
    const emailOk   = validateField(emailInput);
    const messageOk = validateField(messageInput);

    if (!nomOk || !emailOk || !messageOk) {
      // Focus sur le premier champ invalide pour l'accessibilité
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Simulation : désactiver le bouton, délai, puis afficher le succès
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    setTimeout(() => {
      form.hidden = true;
      formSuccess.hidden = false;
      formSuccess.setAttribute('tabindex', '-1');
      formSuccess.focus();
    }, 900);
  }

  /**
   * Valide un champ et affiche/masque son message d'erreur.
   * @returns {boolean} true si valide
   */
  function validateField (input) {
    const value = input.value.trim();
    let errorMsg = '';

    if (!value) {
      errorMsg = 'Ce champ est obligatoire.';
    } else if (input.type === 'email' && !isValidEmail(value)) {
      errorMsg = 'Veuillez saisir une adresse email valide.';
    } else if (input.tagName === 'TEXTAREA' && value.length < 10) {
      errorMsg = 'Le message doit contenir au moins 10 caractères.';
    }

    if (errorMsg) {
      showError(input, errorMsg);
      return false;
    }

    clearError(input);
    return true;
  }

  function showError (input, msg) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError (input) {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = '';
  }

  function isValidEmail (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── 7. Scroll fluide : fallback pour navigateurs sans scroll-behavior CSS ─ */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      // Si le CSS natif gère smooth scroll, on le laisse faire
      if ('scrollBehavior' in document.documentElement.style) return;
      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - getNavHeight();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Init ────────────────────────────────────────────────────────────────── */
  onScroll();

})();
