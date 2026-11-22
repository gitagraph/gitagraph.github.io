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
  (function () {                                   // today's featured story, by the reader's own date
    var alts = d.querySelectorAll('.hm-feat template.ft-alt'), cur = d.querySelector('.hm-feat .ft');
    if (!alts.length || !cur) return;
    var day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 864e5);
    cur.replaceWith(alts[day % alts.length].content.cloneNode(true));
  })();
  each('[data-share]', function (b) {
    b.onclick = function () {
      var url = location.href.split('#')[0], text = b.dataset.share;
      if (navigator.share) { navigator.share({ title: text, text: text, url: url }).catch(function () {}); return; }
      var done = function () { var o = b.lastChild.textContent; b.lastChild.textContent = b.dataset.done; setTimeout(function () { b.lastChild.textContent = o; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('', url); });
      else prompt('', url);
    };
  });

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
  /* links from a card carry #cards, or #cards-door-<id> for a door. Note it, then take it out
     of the address so a reload does not reopen the deck. A door anchor stays, as #door-<id>. */
  var hash = location.hash, want = null;
  if (hash === '#cards' || hash.indexOf('#cards-') === 0) {
    want = hash.slice(7);
    if (want && d.getElementById(want)) location.replace(location.pathname + location.search + '#' + want);
    else history.replaceState(null, '', location.pathname + location.search);
  }
  if (!show || !play || !show.showModal) return;
  var slides = show.querySelectorAll('.moment'), count = d.getElementById('count'), i = 0;
  var onward = d.getElementById('onward');
  function go(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    Array.prototype.forEach.call(slides, function (el, k) { el.classList.toggle('on', k === i); });
    count.textContent = (i + 1) + ' / ' + slides.length;
    d.getElementById('prev').disabled = i === 0;
    d.getElementById('next').disabled = i === slides.length - 1;
    if (onward) {
      /* the last card: the next step shows under the card, in place of the next arrow */
      onward.hidden = i !== slides.length - 1;
      d.getElementById('next').style.visibility = onward.hidden ? '' : 'hidden';
    }
  }
  if (slides.length < 2) {
    /* a deck of one card: no arrows and no count, only Close */
    d.getElementById('prev').hidden = true;
    d.getElementById('next').hidden = true;
    count.hidden = true;
  }
  play.onclick = function () { go(0); show.showModal(); };
  d.getElementById('prev').onclick = function () { go(i - 1); };
  d.getElementById('next').onclick = function () { go(i + 1); };
  show.querySelector('.stage').addEventListener('click', function (e) {
    /* a tap on a link inside a card (a door card's button) follows the link and does not turn the card */
    if (e.target.closest && e.target.closest('a')) return;
    go(i + 1);
  });
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
  /* opened from a card link: show the deck at once, at the door's card if a door was named */
  if (want !== null && !show.classList.contains('intro')) {
    var at = 0;
    Array.prototype.forEach.call(slides, function (el, k) {
      if (want && el.getAttribute('data-door') === want) at = k;
    });
    go(at);
    show.showModal();
  }
})();
/* welcome cards: open once on a first visit to home; one line, once, on a first visit to a story */
(function () {
  var d = document;
  function get(k) { try { return localStorage.getItem('panchatantra-' + k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem('panchatantra-' + k, v); } catch (e) {} }
  if (d.body.dataset.path === '') {
    var open = d.getElementById('welcomeopen'), sheet = d.getElementById('welcome');
    if (open && sheet && sheet.showModal) {
      open.onclick = function () { sheet.showModal(); sheet.scrollTop = 0; };
      sheet.addEventListener('click', function (e) { if (e.target === sheet) sheet.close(); });
      if (!get('seen') || location.hash === '#intro') {
        set('seen', '1');
        open.click();
        if (location.hash === '#intro') history.replaceState(null, '', location.pathname);
      }
    }
  } else {
    var hint = d.getElementById('newhere');
    var tip = d.getElementById('cardhint');
    /* the card line comes first, once; the first-time line waits for a later view */
    if (tip && !get('cardhint')) { tip.hidden = false; set('cardhint', '1'); }
    else if (hint && !get('seen') && !get('hint')) { hint.hidden = false; set('hint', '1'); }
  }
})();
/* verse lists: three at a time, with back and next */
(function () {
  var d = document, PER = 3;
  Array.prototype.forEach.call(d.querySelectorAll('details.allv'), function (box) {
    var items = box.querySelectorAll('.verse'), n = items.length, page = 0;
    if (n <= PER) return;
    function button(label, arrow) {
      var b = d.createElement('button');
      b.type = 'button';
      b.className = 'ctl';
      b.setAttribute('aria-label', label);
      b.innerHTML = arrow;
      return b;
    }
    var nav = d.createElement('div'), count = d.createElement('span');
    var prev = button(box.dataset.prev || 'Back', '&#8592;'), next = button(box.dataset.next || 'Next', '&#8594;');
    nav.className = 'pager';
    nav.appendChild(prev);
    nav.appendChild(count);
    nav.appendChild(next);
    box.appendChild(nav);
    function show(p, scroll) {
      page = Math.max(0, Math.min(Math.ceil(n / PER) - 1, p));
      Array.prototype.forEach.call(items, function (el, k) { el.hidden = Math.floor(k / PER) !== page; });
      var a = page * PER + 1, b = Math.min(n, a + PER - 1);
      count.textContent = a + '-' + b + ' / ' + n;
      prev.disabled = page === 0;
      next.disabled = b === n;
      if (scroll) box.scrollIntoView({ block: 'start' });
    }
    prev.onclick = function () { show(page - 1, true); };
    next.onclick = function () { show(page + 1, true); };
    show(0, false);
  });
})();
/* card progress dots: one dot per card, for decks of eleven or fewer (ten pictures and the last card) */
(function () {
  var d = document, show = d.getElementById('show'), count = d.getElementById('count');
  if (!show || !count || !window.MutationObserver) return;
  var slides = show.querySelectorAll('.moment'), stage = show.querySelector('.stage');
  if (!stage || slides.length < 2 || slides.length > 11) return;
  var dots = d.createElement('span');
  dots.className = 'dots';
  dots.setAttribute('aria-hidden', 'true');
  for (var k = 0; k < slides.length; k++) dots.appendChild(d.createElement('i'));
  count.parentNode.insertBefore(dots, count);
  count.className = 'sr';
  function paint() {
    Array.prototype.forEach.call(slides, function (el, k) {
      dots.children[k].className = el.classList.contains('on') ? 'on' : '';
    });
  }
  new MutationObserver(paint).observe(stage, { attributes: true, subtree: true, attributeFilter: ['class'] });
  paint();
})();

(function () {
  /* Back trail: when the whole trail does not fit, show only the parent's name (lead, 20 Nov). */
  var up = document.querySelector('.thread .up');
  if (!up) return;
  var trail = up.querySelector('.trail'), short = up.querySelector('.short');
  if (!trail || !short) return;
  function fit() {
    trail.hidden = false; short.hidden = true;
    if (trail.scrollWidth > trail.clientWidth + 1) { trail.hidden = true; short.hidden = false; }
  }
  fit();
  window.addEventListener('resize', fit);
})();
