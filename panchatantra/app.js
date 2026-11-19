(function () {
  var d = document, root = d.documentElement;
  function get(k) { try { return localStorage.getItem('panchatantra-' + k); } catch (e) { return null; } }
  function set(k, v) {
    try {
      if (v === null) localStorage.removeItem('panchatantra-' + k);
      else localStorage.setItem('panchatantra-' + k, v);
    } catch (e) {}
  }
  function each(sel, fn) { Array.prototype.forEach.call(d.querySelectorAll(sel), fn); }

  var SIZES = [0.9, 1, 1.15, 1.3], LABELS = ['A\u2212', 'A', 'A+', 'A++'];
  function paint() {
    var scale = parseFloat(get('scale') || '1');
    var step = d.getElementById('step');
    if (step) step.textContent = LABELS[SIZES.indexOf(scale)] || 'A';
    var mode = d.getElementById('mode');
    if (mode) mode.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'night' ? 'true' : 'false');
    each('[data-scale]', function (b) { b.classList.toggle('on', parseFloat(b.dataset.scale) === scale); });
  }
  each('[data-scale]', function (b) {
    b.onclick = function () {
      set('scale', b.dataset.scale);
      root.style.setProperty('--scale', b.dataset.scale);
      paint();
    };
  });
  var modeBtn = d.getElementById('mode');
  if (modeBtn) {
    modeBtn.onclick = function () {
      if (root.getAttribute('data-theme') === 'night') { set('theme', 'day'); root.removeAttribute('data-theme'); }
      else { set('theme', 'night'); root.setAttribute('data-theme', 'night'); }
      paint();
    };
  }
  var stepper = d.getElementById('step');
  if (stepper) {
    stepper.onclick = function () {
      var cur = parseFloat(get('scale') || '1');
      var next = SIZES[(SIZES.indexOf(cur) + 1) % SIZES.length];
      set('scale', String(next));
      root.style.setProperty('--scale', next);
      paint();
    };
  }
  paint();

  var sheet = d.getElementById('sheet'), opener = d.getElementById('open');
  if (sheet && opener && sheet.showModal) {
    opener.onclick = function () { sheet.showModal(); };
    sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
  }

  var path = d.body.dataset.path, base = d.body.dataset.root;
  function room() { return root.scrollHeight - window.innerHeight; }
  function save() {
    var h = room();
    set('last', JSON.stringify({ p: path, y: h > 0 ? window.scrollY / h : 0 }));
  }
  function last() { try { return JSON.parse(get('last')); } catch (e) { return null; } }

  if (path && path !== 'about/') {
    var timer;
    window.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(save, 300);
    }, { passive: true });
    window.addEventListener('pagehide', save);
    if (location.hash === '#resume') {
      var l = last();
      window.addEventListener('load', function () {
        if (l && l.p === path) window.scrollTo(0, l.y * room());
        history.replaceState(null, '', location.pathname);
      });
    } else {
      save();
    }
  } else {
    var btn = d.getElementById('start'), box = d.getElementById('titles'), seen = last();
    if (btn && box && seen) {
      try {
        var titles = JSON.parse(box.textContent);
        if (titles[seen.p]) {
          btn.textContent = btn.dataset.continue + ' ' + titles[seen.p];
          btn.href = base + seen.p + '#resume';
          var began = d.getElementById('began');
          if (began) began.hidden = false;
        }
      } catch (e) {}
    }
  }
})();
(function () {
  var d = document, show = d.getElementById('show'), play = d.getElementById('play');
  if (!show || !play || !show.showModal) return;
  var slides = show.querySelectorAll('.moment'), count = d.getElementById('count'), i = 0;
  function go(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    Array.prototype.forEach.call(slides, function (el, k) { el.classList.toggle('on', k === i); });
    count.textContent = (i + 1) + ' / ' + slides.length;
    d.getElementById('prev').disabled = i === 0;
    d.getElementById('next').disabled = i === slides.length - 1;
  }
  play.onclick = function () { go(0); show.showModal(); };
  d.getElementById('prev').onclick = function () { go(i - 1); };
  d.getElementById('next').onclick = function () { go(i + 1); };
  show.querySelector('.stage').addEventListener('click', function () { go(i + 1); });
  var sx = 0, sy = 0;
  show.addEventListener('touchstart', function (e) {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
  }, { passive: true });
  show.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? i + 1 : i - 1);
  }, { passive: true });
  show.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') go(i + 1);
    if (e.key === 'ArrowLeft') go(i - 1);
  });
  show.addEventListener('click', function (e) { if (e.target === show) show.close(); });
})();
/* welcome cards: open once on a first visit to home; one line, once, on a first visit to a story */
(function () {
  var d = document;
  function get(k) { try { return localStorage.getItem('panchatantra-' + k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem('panchatantra-' + k, v); } catch (e) {} }
  if (d.body.dataset.path === '') {
    var play = d.getElementById('play'), cards = d.getElementById('show');
    if (play && cards && cards.classList.contains('intro') && (!get('seen') || location.hash === '#intro')) {
      set('seen', '1');
      play.click();
      if (location.hash === '#intro') history.replaceState(null, '', location.pathname);
    }
  } else {
    var hint = d.getElementById('newhere');
    if (hint && !get('seen') && !get('hint')) { hint.hidden = false; set('hint', '1'); }
  }
})();
