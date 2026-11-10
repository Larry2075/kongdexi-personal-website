'use strict';
(() => {
  const root = document.documentElement;
  const overlay = document.getElementById('site-intro');
  const word = document.getElementById('intro-word');
  const skip = document.getElementById('skip-intro');
  const replay = document.getElementById('replay-intro');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let timers = [], returnFocus = null, running = false;
  const later = (callback, delay) => timers.push(setTimeout(callback, delay));
  const clear = () => { timers.forEach(clearTimeout); timers = []; };
  function finish() {
    clear();
    clearTimeout(window.introSafetyTimer);
    root.classList.remove('intro-active', 'intro-pending', 'intro-leaving');
    overlay.setAttribute('aria-hidden', 'true');
    skip.tabIndex = -1;
    running = false;
    if (returnFocus) { returnFocus.focus({ preventScroll: true }); returnFocus = null; }
  }
  function leave() {
    if (!running || root.classList.contains('intro-leaving')) return;
    clear();
    root.classList.remove('intro-pending');
    root.classList.add('intro-leaving');
    skip.tabIndex = -1;
    later(finish, 1050);
  }
  function start(isReplay = false) {
    if (running) return;
    if (reduced.matches) { finish(); return; }
    clearTimeout(window.introSafetyTimer);
    clear();
    running = true;
    returnFocus = isReplay ? replay : null;
    if (isReplay) window.scrollTo({ top: 0, behavior: 'instant' });
    root.classList.remove('intro-leaving');
    root.classList.add('intro-active', 'intro-pending');
    overlay.setAttribute('aria-hidden', 'false');
    skip.tabIndex = 0;
    word.textContent = 'Hello.';
    later(() => { word.textContent = 'Bonjour.'; }, 360);
    later(() => { word.textContent = '你好。'; }, 720);
    later(() => { word.textContent = '我是孔德曦。'; }, 1080);
    later(leave, 1580);
    // Guarantee a usable page even when animation events are suppressed.
    window.introSafetyTimer = setTimeout(finish, 4200);
  }
  skip.addEventListener('click', leave);
  replay.addEventListener('click', () => start(true));
  document.addEventListener('keydown', event => {
    if (!running) return;
    if (event.key === 'Escape') { event.preventDefault(); finish(); }
    // Do not let keyboard focus move into content hidden behind the curtain.
    if (event.key === 'Tab') { event.preventDefault(); skip.focus(); }
  });
  reduced.addEventListener('change', () => { if (reduced.matches) finish(); });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  if (root.classList.contains('intro-active')) start();
})();
