/* ═══════ SZENARIO-SWITCHER ═══════ */

(function() {
  'use strict';

  function revealScenario(idx) {
    const rb = document.getElementById('rb-' + idx);
    const ins = document.getElementById('ins-' + idx);
    const panel = document.getElementById('p-' + idx);
    if (!rb || rb.classList.contains('visible')) return;

    const oldPath = panel ? panel.querySelector('.path--old') : null;
    const newPath = panel ? panel.querySelector('.path--new') : null;
    if (oldPath) oldPath.classList.add('dimmed');
    if (newPath) newPath.classList.add('lit');

    rb.classList.add('visible');
    setTimeout(function() {
      rb.querySelectorAll('.rb-fill').forEach(function(f) {
        f.style.width = (f.dataset.w || 0) + '%';
      });
    }, 80);

    setTimeout(function() {
      if (ins) ins.classList.add('visible');
    }, 500);
  }

  // Tab Switching
  document.querySelectorAll('.sc-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      const idx = tab.dataset.sc;

      document.querySelectorAll('.sc-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      document.querySelectorAll('.sc-panel').forEach(function(p) { p.classList.remove('active'); });
      const panel = document.getElementById('p-' + idx);
      if (panel) panel.classList.add('active');

      const rb = document.getElementById('rb-' + idx);
      if (rb && !rb.classList.contains('visible')) {
        setTimeout(function() { revealScenario(idx); }, 700);
      }
    });
  });

  // Click AI-First Path to Reveal
  document.querySelectorAll('.path--new').forEach(function(p) {
    p.addEventListener('click', function() {
      revealScenario(p.dataset.panel);
    });
  });

  // Easter Egg: "Gewohnter Reflex" Click
  const oldPathClicks = {};

  document.querySelectorAll('.path--old').forEach(function(oldPath) {
    oldPath.addEventListener('click', function(e) {
      e.stopPropagation();
      const idx = oldPath.dataset.panel;
      const panel = document.getElementById('p-' + idx);
      const newPath = panel ? panel.querySelector('.path--new') : null;
      const wrapper = oldPath.closest('.path-wrapper');
      const hint = wrapper ? wrapper.querySelector('.old-path-hint') : null;

      if (!oldPathClicks[idx]) oldPathClicks[idx] = 0;
      oldPathClicks[idx]++;

      const clickCount = oldPathClicks[idx];

      oldPath.classList.remove('shaking');
      if (newPath) newPath.classList.remove('glow', 'glow-strong');
      if (hint) hint.classList.remove('visible');

      void oldPath.offsetWidth; // Force reflow

      if (clickCount === 1) {
        oldPath.classList.add('shaking');
        if (hint) {
          hint.textContent = 'Wirklich? Es gibt einen besseren Weg \u2192';
          hint.classList.add('visible');
        }
        if (newPath) newPath.classList.add('glow');
      } else {
        oldPath.classList.add('shaking');
        if (hint) {
          hint.textContent = 'Immer noch? Probier\u2019s rechts \u2192';
          hint.classList.add('visible');
        }
        if (newPath) newPath.classList.add('glow-strong');
      }

      setTimeout(function() {
        oldPath.classList.remove('shaking');
        if (newPath) newPath.classList.remove('glow', 'glow-strong');
      }, 1000);

      setTimeout(function() {
        if (hint) hint.classList.remove('visible');
      }, 2500);

      revealScenario(idx);
    });
  });

  // Auto-reveal erstes Szenario (nur wenn Section sichtbar)
  const aiFirstSection = document.getElementById('ai-first');
  if (aiFirstSection) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setTimeout(function() { revealScenario('0'); }, 1000);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(aiFirstSection);
  }
})();
