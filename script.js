/*
 * Portfolio behaviour.
 *
 * Everything here is progressive enhancement: the page is fully readable with
 * JavaScript disabled (see the <noscript> block in index.html). Where the
 * browser supports CSS scroll-driven animations, the reveal and progress-bar
 * work is handed over to CSS entirely and this file does much less.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var supportsScrollAnim =
    window.CSS &&
    CSS.supports &&
    CSS.supports('animation-timeline', 'view()');

  if (supportsScrollAnim) root.classList.add('has-scroll-anim');

  /* ------------------------------------------------------------------ theme */
  var THEME_KEY = 'alif-portfolio-theme';
  var themeToggle = document.getElementById('themeToggle');

  function syncThemeLabel() {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  themeToggle.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, root.dataset.theme); } catch (e) { /* private mode */ }
    syncThemeLabel();
  });

  syncThemeLabel();

  /* ------------------------------------------------------------- mobile nav */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var mobileQuery = window.matchMedia('(max-width: 780px)');

  function syncNav() {
    var open = navLinks.classList.contains('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    // Keep the collapsed menu out of the tab order on small screens only.
    navLinks.inert = mobileQuery.matches && !open;
  }

  function closeNav(refocus) {
    if (!navLinks.classList.contains('is-open')) return;
    navLinks.classList.remove('is-open');
    syncNav();
    if (refocus) navToggle.focus();
  }

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('is-open');
    syncNav();
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav(true);
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('#nav')) closeNav(false);
  });

  mobileQuery.addEventListener('change', function () {
    closeNav(false);
    syncNav();
  });

  syncNav();

  /* ------------------------------------------- sticky header + read progress */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  var ticking = false;

  function updateScrollState() {
    ticking = false;
    nav.classList.toggle('is-stuck', window.scrollY > 8);
    toTop.classList.toggle('is-visible', window.scrollY > 500);

    if (supportsScrollAnim) return; // CSS owns the progress bar
    var max = root.scrollHeight - window.innerHeight;
    progress.style.setProperty('--progress', max > 0 ? window.scrollY / max : 0);
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollState);
  }, { passive: true });

  updateScrollState();

  /* ----------------------------------------------------- reveal on scroll */
  var revealables = document.querySelectorAll('.reveal');

  if (supportsScrollAnim) {
    /* CSS handles it via animation-timeline: view(). */
  } else if (reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------- scroll spy */
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.setAttribute('aria-current', 'true');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------ stat counters */
  var counters = document.querySelectorAll('[data-count]');

  function runCounter(el) {
    var target = Number(el.dataset.count) || 0;
    var suffix = el.dataset.suffix || '';

    if (reduceMotionQuery.matches) return; // the markup already shows the value

    var start = performance.now();

    function step(now) {
      var t = Math.min((now - start) / 1100, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ------------------------------------------------------- footer year */
  var year = document.getElementById('year');
  var now = String(new Date().getFullYear());
  year.textContent = now;
  year.setAttribute('datetime', now);
})();
