/* ============================================================
   IITH GARAGE — "THE PROVING GROUND"  (redesign, preview only)
   Renders from data.js. No libraries, no build step.
   ============================================================ */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  function pv(slug) { return 'assets/previews/' + slug + '.jpg?v=2.5'; }
  function pad(n) { return String(n).padStart(2, '0'); }
  function statusMeta(k) { return (typeof STATUS !== 'undefined' && STATUS[k]) || { label: k, tone: 'soon' }; }
  function chip(k, dark) {
    var m = statusMeta(k);
    return '<span class="chip chip--' + m.tone + '"><i></i>' + esc(m.label) + '</span>';
  }

  /* ---------- LOADER ------------------------------------ */
  function loader() {
    var l = $('#loader');
    if (!l) return;
    if (reduce) { l.remove(); return; }
    window.addEventListener('load', function () {
      setTimeout(function () { l.classList.add('is-done'); setTimeout(function () { l.remove(); }, 900); }, 620);
    });
    setTimeout(function () { if (document.body.contains(l)) { l.classList.add('is-done'); setTimeout(function () { l.remove(); }, 900); } }, 2600);
  }

  /* ---------- HERO ------------------------------------- */
  function hero() {
    $('#hero-lede').textContent = SITE.tagline;
    $('#hero-cred').textContent = 'Built at ' + SITE.coordinates.replace(/,\s*/, ' ');

    var deployed = PROJECTS.filter(function (p) { return !!p.url; }).length;
    var cells = [
      [pad(PROJECTS.length) + '+', 'Builds & counting'],
      [pad(deployed), 'Deployed'],
      ['00', 'Build steps'],
      ['00', 'Trackers']
    ];
    var sc = $('#statcard');
    cells.forEach(function (c) { sc.appendChild(el('div', '', '<b class="tnum">' + c[0] + '</b><span>' + c[1] + '</span>')); });

    // marquee — every preview, doubled for a seamless loop
    var mq = $('#marquee');
    var set = PROJECTS.concat(PROJECTS);
    set.forEach(function (p) { var i = el('img'); i.src = pv(p.slug); i.alt = ''; i.loading = 'lazy'; mq.appendChild(i); });
  }

  /* ---------- THE RUNWAY ------------------------------ */
  function runway() {
    var host = $('#panels');
    PROJECTS.forEach(function (p, i) {
      var wip = p.status === 'testing' || p.status === 'soon' || p.status === 'building';
      var pn = el('article', 'panel' + (wip ? ' panel--wip' : ''));
      pn.id = 'build-' + p.slug;
      var cta = wip
        ? (p.url ? '<a class="btn btn--ghost" href="' + esc(p.url) + '" target="_blank" rel="noopener">Preview ↗</a>' : '')
        : (p.url ? '<a class="btn btn--flame" href="' + esc(p.url) + '" target="_blank" rel="noopener">Launch ↗</a>' : '');
      var src = p.github ? '<a class="btn btn--ghost" href="' + esc(p.github) + '" target="_blank" rel="noopener">Source ↗</a>' : '';
      pn.innerHTML =
        '<div class="panel__ghost" aria-hidden="true">' + pad(i + 1) + '</div>' +
        '<div class="panel__body reveal">' +
          '<div class="panel__cat">' + pad(i + 1) + ' / ' + esc(p.zone) + (wip ? ' / <span class="panel__wiptag">In development</span>' : '') + '</div>' +
          '<h3 class="panel__name">' + esc(p.name) + '</h3>' +
          '<p class="panel__lede">' + esc(p.blurb) + '</p>' +
          '<div class="panel__stat"><b class="tnum">' + esc(p.metric.value) + '</b><span>' + esc(p.metric.label) + '</span></div>' +
          '<div class="panel__chips">' + (p.stack || []).map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
          '<div class="panel__cta">' + cta + src + '<span style="align-self:center">' + chip(p.status) + '</span></div>' +
        '</div>' +
        '<div class="panel__media reveal reveal-wipe">' +
          '<div class="panel__frame">' +
            '<div class="panel__bar"><i></i><i></i><i></i><span>' + (p.url ? esc(p.url.replace(/^https?:\/\//, '')) : 'not yet deployed') + '</span></div>' +
            '<img src="' + pv(p.slug) + '" alt="Screenshot of ' + esc(p.name) + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">' +
            (wip ? '<div class="panel__cover"><span>Coming soon</span><small>Still being built</small></div>' : '') +
          '</div>' +
        '</div>';
      host.appendChild(pn);
    });
  }

  /* ---------- INDEX (compact) ------------------------ */
  var activeCat = 'all';
  function indexList() {
    var fb = $('#filterbar');
    CATEGORIES.forEach(function (c) {
      var b = el('button', c.id === 'all' ? 'is-on' : '', esc(c.label));
      b.addEventListener('click', function () {
        activeCat = c.id;
        $$('#filterbar button').forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        rows();
      });
      fb.appendChild(b);
    });
    rows();
  }
  function rows() {
    var list = $('#ilist'); list.innerHTML = '';
    PROJECTS.filter(function (p) { return activeCat === 'all' || p.category === activeCat; })
      .forEach(function (p, i) {
        var a = el('a', 'irow reveal');
        a.href = '#build-' + p.slug;
        a.style.transitionDelay = (i * 40) + 'ms';
        a.innerHTML =
          '<span class="irow__n tnum">' + pad(i + 1) + '</span>' +
          '<span class="irow__main"><span class="irow__name">' + esc(p.name) + '</span>' +
            '<span class="irow__blurb">' + esc(p.blurb) + '</span></span>' +
          '<span class="irow__chip">' + chip(p.status) + '</span>' +
          '<span class="irow__arrow"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg></span>';
        list.appendChild(a);
      });
    observe(list);
  }

  /* ---------- ROADMAP ------------------------------ */
  function roadmap() {
    var grid = $('#board');
    BOARD.forEach(function (col) {
      var w = el('div', 'bcol reveal');
      var rows = col.items.map(function (it) {
        var right = it.date
          ? '<span class="brow__date">' + esc(it.date) + '</span>'
          : (it.meta ? '<span class="brow__meta is-' + esc(it.meta.state || '') + '">' + esc(it.meta.text) + '</span>' : '');
        var prog = (typeof it.progress === 'number')
          ? '<div class="pbar"><i style="width:' + it.progress + '%"></i></div><div class="pnote">' + esc(it.progressNote || (it.progress + '%')) + '</div>'
          : '';
        return '<li class="brow">' +
          '<div class="brow__top"><span class="brow__title">' + esc(it.title) +
            (it.isNew ? ' <span class="bcard__new">NEW</span>' : '') + '</span>' + right + '</div>' + prog + '</li>';
      }).join('');
      w.innerHTML = '<div class="col__head"><h3>' + esc(col.title) + '</h3><span>' + col.items.length + '</span></div>' +
        '<ul class="brows">' + rows + '</ul>';
      grid.appendChild(w);
    });
  }

  /* ---------- TIMELINE ---------------------------- */
  function timeline() {
    var ol = $('#tl');
    TIMELINE.forEach(function (t) {
      var isNew = /aug 2026|19 aug/i.test(t.date) && /consolidation|named/i.test(t.title);
      var li = el('li', 'reveal' + (isNew ? ' is-new' : ''));
      li.innerHTML = '<div class="tl__date">' + esc(t.date) + '</div><div class="tl__title">' + esc(t.title) + '</div><div class="tl__body">' + esc(t.body) + '</div>';
      ol.appendChild(li);
    });
  }

  /* ---------- STACK ------------------------------ */
  function stack() {
    var box = $('#stackm');
    STACK_MATRIX.forEach(function (s) {
      box.appendChild(el('div', 'srow reveal',
        '<div class="srow__tech">' + esc(s.tech) + '</div>' +
        '<div class="srow__note">' + esc(s.note) + '</div>' +
        '<div class="srow__proj">' + s.projects.map(function (p) { return '<span>' + esc(p) + '</span>'; }).join('') + '</div>'));
    });
  }

  /* ---------- REVEALS + NAV ---------------------- */
  var io;
  function observe(root) {
    var nodes = $$('.reveal:not(.is-in)', root || document);
    if (reduce || !('IntersectionObserver' in window)) { nodes.forEach(function (n) { n.classList.add('is-in'); }); return; }
    if (!io) io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .12 });
    nodes.forEach(function (n) { io.observe(n); });
  }
  // failsafe: never leave content invisible if the observer misfires
  function forceReveal() { $$('.reveal:not(.is-in)').forEach(function (n) { n.classList.add('is-in'); }); }
  setTimeout(forceReveal, 1400);
  window.addEventListener('load', function () { setTimeout(forceReveal, 300); });

  function navWatch() {
    var nav = $('#nav');
    var linkEls = $$('.nav__links a');
    var targets = linkEls.map(function (a) { return document.querySelector(a.getAttribute('href')); });

    // colour flip: which [data-nav] section sits under the nav line
    var zones = $$('[data-nav]');
    function flip() {
      nav.classList.toggle('is-stuck', window.scrollY > 12);
      var line = 40, cur = 'light';
      zones.forEach(function (z) {
        var r = z.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) cur = z.getAttribute('data-nav');
      });
      nav.classList.toggle('on-dark', cur === 'dark');
      var y = window.scrollY + 80, idx = -1;
      targets.forEach(function (t, i) { if (t && t.offsetTop <= y) idx = i; });
      linkEls.forEach(function (a, i) { a.classList.toggle('is-active', i === idx); });
    }
    window.addEventListener('scroll', flip, { passive: true });
    window.addEventListener('resize', flip);
    flip();
  }

  /* ---------- BOOT ------------------------------- */
  loader();
  hero();
  runway();
  indexList();
  roadmap();
  timeline();
  stack();
  observe(document);
  navWatch();
})();
