'use strict';
(() => {
  const root = document.documentElement;
  const heading = document.getElementById('hero-title');
  const replay = document.getElementById('replay-intro');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const lines = [...heading.querySelectorAll('.title-line')];
  const companions = [...document.querySelectorAll('.signature, .hero-emblem, .hero-bottom')];
  let animations = [], overlay, safetyTimer, generation = 0, running = false;
  const namespace = 'http://www.w3.org/2000/svg';

  function finish() {
    generation++;
    clearTimeout(safetyTimer);
    clearTimeout(window.introSafetyTimer);
    animations.forEach(animation => animation.cancel());
    animations = [];
    overlay?.remove();
    overlay = null;
    root.classList.remove('trace-pending', 'trace-playing');
    running = false;
  }

  function animate(element, frames, duration, delay, easing) {
    const animation = element.animate(frames, { duration, delay, easing, fill: 'both' });
    animations.push(animation);
  }

  // Match each SVG baseline to the live HTML text, including responsive sizes.
  function createLettering() {
    const svg = document.createElementNS(namespace, 'svg');
    const box = heading.getBoundingClientRect();
    svg.setAttribute('class', 'headline-trace');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', Math.ceil(box.width));
    svg.setAttribute('height', Math.ceil(box.height));
    svg.setAttribute('viewBox', `0 0 ${Math.ceil(box.width)} ${Math.ceil(box.height)}`);
    lines.forEach((line, index) => {
      const style = getComputedStyle(line);
      const range = document.createRange();
      range.selectNodeContents(line);
      const bounds = range.getBoundingClientRect();
      const probe = document.createElement('span');
      probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      line.append(probe);
      const baseline = probe.getBoundingClientRect().top - box.top;
      probe.remove();
      const lettering = document.createElementNS(namespace, 'text');
      lettering.textContent = line.textContent;
      lettering.setAttribute('x', bounds.left - box.left);
      lettering.setAttribute('y', baseline);
      lettering.setAttribute('fill', '#eeede7');
      lettering.setAttribute('fill-opacity', '0');
      lettering.setAttribute('stroke', '#eeede7');
      lettering.setAttribute('stroke-width', '1');
      lettering.setAttribute('vector-effect', 'non-scaling-stroke');
      Object.assign(lettering.style, {
        fontFamily: style.fontFamily, fontSize: style.fontSize,
        fontWeight: style.fontWeight, letterSpacing: style.letterSpacing,
        strokeDasharray: `${parseFloat(style.fontSize) * 11}`,
        strokeDashoffset: `${parseFloat(style.fontSize) * 11}`
      });
      svg.append(lettering);
      const offset = parseFloat(style.fontSize) * 11;
      const stagger = index * 180;
      animate(lettering, [{ strokeDashoffset: `${offset}` }, { strokeDashoffset: '0' }], 1800, 250 + stagger, 'cubic-bezier(.65,0,.35,1)');
      animate(lettering, [{ fillOpacity: 0 }, { fillOpacity: 1 }], 900, 1500 + stagger, 'ease-in-out');
      animate(lettering, [{ strokeOpacity: 1 }, { strokeOpacity: 0 }], 600, 2150 + stagger, 'ease-out');
    });
    heading.append(svg);
    return svg;
  }

  async function start(isReplay = false) {
    finish();
    if (media.matches || typeof heading.animate !== 'function') return;
    const current = generation;
    running = true;
    if (isReplay) window.scrollTo({ top: 0, behavior: 'instant' });
    root.classList.add('trace-pending');
    safetyTimer = setTimeout(finish, 4400);
    try {
      if (document.fonts) await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 700))]);
      if (current !== generation || media.matches) return;
      overlay = createLettering();
      root.classList.add('trace-playing');
      companions.forEach((element, index) => {
        // Resolve the existing entrance animation to its final frame first.
        element.getAnimations().forEach(animation => { try { animation.finish(); } catch {} });
        animate(element, [
          { opacity: 0, filter: 'blur(10px)', translate: '0 -20px' },
          { opacity: 1, filter: 'blur(0px)', translate: '0 0' }
        ], 800, 2450 + index * 100, 'cubic-bezier(.22,1,.36,1)');
      });
      safetyTimer = (clearTimeout(safetyTimer), setTimeout(finish, 3650));
    } catch { finish(); }
  }
  replay.addEventListener('click', () => start(true));
  window.addEventListener('resize', () => { if (running) finish(); }, { passive: true });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && running) finish(); });
  media.addEventListener('change', () => { if (media.matches) finish(); });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  if (root.classList.contains('trace-pending')) start();
})();
