/* =========================================================
   THE BUILDS FOR IIT-H — CORE INTERACTION & KINETIC ENGINE
   Awwwards-grade interactive physics, particle canvas,
   magnetic cursor, command palette, 3D spotlight, and theme engine.
   ========================================================= */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine   = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* =========================================================
     1 — AMBIENT WEB AUDIO SYNTHESIS (MICRO-HAPTICS)
     Subtle acoustic clicks on interaction (ultra quiet, opt-in)
     ========================================================= */
  var audioCtx = null;
  var soundEnabled = false;

  function initAudio() {
    var btn = $('sound-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      soundEnabled = !soundEnabled;
      btn.setAttribute('aria-pressed', String(soundEnabled));
      btn.classList.toggle('is-active', soundEnabled);
      if (soundEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      playBlip(soundEnabled ? 640 : 320, 0.05);
    });
  }

  function playBlip(freq, duration) {
    if (!soundEnabled || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq || 520, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.018, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + (duration || 0.04));
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (duration || 0.04));
    } catch (e) {}
  }

  /* =========================================================
     2 — MAGNETIC CURSOR WITH CONTEXTUAL TEXT
     ========================================================= */
  function initCursor() {
    if (!fine || reduce) return;

    var cur = $('cursor');
    if (!cur) return;

    var dot = cur.querySelector('.cursor__dot');
    var ring = cur.querySelector('.cursor__ring');
    var lbl = cur.querySelector('.cursor__label');

    var mx = innerWidth / 2, my = innerHeight / 2;
    var rx = mx, ry = my;

    addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cur.classList.add('is-active');
    }, { passive: true });

    addEventListener('mouseleave', function () {
      cur.classList.remove('is-active');
    });

    (function frame() {
      rx = lerp(rx, mx, 0.16);
      ry = lerp(ry, my, 0.16);
      dot.style.transform  = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      requestAnimationFrame(frame);
    })();

    document.addEventListener('mouseover', function (e) {
      var target = e.target.closest('a, button, [data-cursor], .idx-row');
      if (target) {
        cur.classList.add('is-hovering');
        var customLabel = target.getAttribute('data-cursor');
        if (customLabel) {
          lbl.textContent = customLabel;
        } else if (target.closest('.idx-row')) {
          lbl.textContent = 'Explore';
        } else if (target.tagName === 'A' && target.target === '_blank') {
          lbl.textContent = 'Visit ↗';
        } else {
          lbl.textContent = 'Select';
        }
        playBlip(720, 0.02);
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, [data-cursor], .idx-row')) {
        cur.classList.remove('is-hovering');
      }
    });
  }

  /* =========================================================
     5 — ATMOSPHERIC THEME ENGINE WITH VELVET CURTAIN
     ========================================================= */
  var THEMES = [
    { id: 'travertine', c: '#8C6D53', label: 'Travertine Linen' },
    { id: 'sand',       c: '#9A6A42', label: 'Sandstone' },
    { id: 'chalk',      c: '#71717A', label: 'Warm Alabaster' },
    { id: 'zinc',       c: '#18181B', label: 'Minimal Zinc' }
  ];
  var SLATS = 9;
  var busy = false;

  function initThemes() {
    var wrap = $('theme-swatches');
    var curtain = $('curtain');
    if (!wrap || !curtain) return;

    for (var i = 0; i < SLATS; i++) curtain.appendChild(el('span'));
    var slats = Array.prototype.slice.call(curtain.children);

    THEMES.forEach(function (t) {
      var b = el('button', 'theme-btn');
      b.type = 'button';
      b.style.setProperty('--btn-c', t.c);
      b.setAttribute('aria-label', t.label + ' Theme');
      b.setAttribute('data-cursor', t.label);
      if (t.id === 'travertine') b.classList.add('is-active');
      b.addEventListener('click', function () { swapTheme(t, b); });
      wrap.appendChild(b);
    });

    function swapTheme(t, btn) {
      if (busy) return;
      playBlip(580, 0.05);

      if (reduce) {
        applyTheme(t);
        markActive(btn);
        return;
      }

      busy = true;
      curtain.classList.add('is-busy');
      curtain.style.setProperty('--fall', t.c);
      markActive(btn);

      var FALL = 380, HOLD = 60, LIFT = 360, STEP = 24;

      slats.forEach(function (s, i) {
        s.style.transformOrigin = 'top';
        s.animate(
          [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
          { duration: FALL, delay: i * STEP, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }
        );
      });

      var covered = FALL + (SLATS - 1) * STEP;

      setTimeout(function () {
        applyTheme(t);
      }, covered + 10);

      setTimeout(function () {
        slats.forEach(function (s, i) {
          s.style.transformOrigin = 'bottom';
          s.animate(
            [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }],
            { duration: LIFT, delay: i * STEP, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'forwards' }
          );
        });

        setTimeout(function () {
          slats.forEach(function (s) { s.style.transformOrigin = 'top'; });
          curtain.classList.remove('is-busy');
          busy = false;
        }, LIFT + (SLATS - 1) * STEP + 40);
      }, covered + HOLD);
    }

    function applyTheme(t) {
      if (t.id === 'travertine') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', t.id);
    }

    function markActive(btn) {
      wrap.querySelectorAll('.theme-btn').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
    }

    window.switchThemeById = function (themeId) {
      var target = THEMES.find(function (t) { return t.id === themeId; });
      if (target) {
        var btn = Array.prototype.slice.call(wrap.children).find(function (b, idx) {
          return THEMES[idx].id === themeId;
        });
        swapTheme(target, btn);
      }
    };
  }

  /* =========================================================
     6 — PROJECT INDEX TABLE (FILTERING, SEARCH & HOVER PEEK)
     ========================================================= */
  var activeCategory = 'all';
  var searchQuery = '';

  function initIndex() {
    var table = $('idx-table');
    var catWrap = $('category-pills');
    var searchInput = $('index-search');
    var peek = $('peek');
    var peekImg = $('peek-img');
    if (!table) return;

    // Render Category Pills
    CATEGORIES.forEach(function (cat) {
      var pill = el('button', 'cat-pill' + (cat.id === 'all' ? ' is-active' : ''));
      pill.textContent = cat.label;
      pill.setAttribute('data-cursor', cat.label);
      pill.addEventListener('click', function () {
        catWrap.querySelectorAll('.cat-pill').forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        activeCategory = cat.id;
        renderIndexRows();
        playBlip(540, 0.03);
      });
      catWrap.appendChild(pill);
    });

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value.toLowerCase().trim();
        renderIndexRows();
      });
    }

    function renderIndexRows() {
      table.innerHTML = '';

      var filtered = PROJECTS.filter(function (p) {
        var matchCat = (activeCategory === 'all' || p.category === activeCategory);
        var matchSearch = !searchQuery ||
          p.name.toLowerCase().includes(searchQuery) ||
          p.blurb.toLowerCase().includes(searchQuery) ||
          p.zone.toLowerCase().includes(searchQuery) ||
          p.stack.some(function (st) { return st.toLowerCase().includes(searchQuery); });
        return matchCat && matchSearch;
      });

      if (filtered.length === 0) {
        var emptyLi = el('li', 'idx-row');
        var emptyDiv = el('div', 'idx-row__inner');
        emptyDiv.style.justifyContent = 'center';
        emptyDiv.appendChild(el('p', null, 'No projects matching filter criteria.'));
        emptyLi.appendChild(emptyDiv);
        table.appendChild(emptyLi);
        return;
      }

      filtered.forEach(function (p, i) {
        var li = el('li', 'idx-row');
        li.setAttribute('data-slug', p.slug);

        var inner = el('div', 'idx-row__inner');

        // Row Index Number
        inner.appendChild(el('span', 'idx-row__num', String(i + 1).padStart(2, '0')));

        // Logo / Emblem Container
        var logoBox = el('div', 'idx-row__logo');
        var logoImg = document.createElement('img');
        logoImg.src = 'assets/logos/' + p.logo;
        logoImg.alt = p.name + ' emblem';
        logoBox.appendChild(logoImg);
        inner.appendChild(logoBox);

        // Project Info (Name & Blurb)
        var info = el('div', 'idx-row__info');
        var name = el('h3', 'idx-row__name', p.name);
        var blurb = el('p', 'idx-row__blurb', p.blurb);
        info.appendChild(name);
        info.appendChild(blurb);
        inner.appendChild(info);

        // Live Key Metric
        if (p.metric) {
          var metricBox = el('div', 'idx-row__metric');
          metricBox.appendChild(el('span', 'idx-row__metric-val', p.metric.value));
          metricBox.appendChild(el('span', 'idx-row__metric-lbl', p.metric.label));
          inner.appendChild(metricBox);
        }

        // Tech Stack Tags
        var tagsBox = el('div', 'idx-row__tags');
        p.stack.slice(0, 2).forEach(function (tag) {
          tagsBox.appendChild(el('span', 'idx-tag', tag));
        });
        inner.appendChild(tagsBox);

        // Action & Status
        var actBox = el('div', 'idx-row__actions');
        var statusBadge = el('span', 'badge-status badge-status--' + p.status, p.status === 'live' ? 'Live' : 'Building');
        actBox.appendChild(statusBadge);

        var openBtn = el('button', 'btn-open-detail');
        openBtn.setAttribute('aria-label', 'Open deep dive for ' + p.name);
        openBtn.setAttribute('data-cursor', 'Deep Dive');
        openBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>';
        actBox.appendChild(openBtn);

        inner.appendChild(actBox);

        // Mobile Inline Preview
        var mobShot = el('div', 'idx-row__mobile-shot');
        var mobImg = document.createElement('img');
        mobImg.src = 'assets/previews/' + p.slug + '.jpg';
        mobImg.alt = 'Screenshot of ' + p.name;
        mobImg.loading = 'lazy';
        mobShot.appendChild(mobImg);
        inner.appendChild(mobShot);

        li.appendChild(inner);
        table.appendChild(li);

        // Hover & Focus Interactions
        inner.addEventListener('mouseenter', function () {
          table.classList.add('is-focused');
          li.classList.add('is-active');
          if (peek && peekImg) {
            peekImg.src = 'assets/previews/' + p.slug + '.jpg';
            peek.classList.add('is-on');
          }
        });

        inner.addEventListener('mouseleave', function () {
          table.classList.remove('is-focused');
          li.classList.remove('is-active');
          if (peek) peek.classList.remove('is-on');
        });

        // Click to Open Deep Dive Modal
        inner.addEventListener('click', function () {
          openProjectDetail(p);
        });
      });
    }

    renderIndexRows();

    // Mouse Tracking for Desktop Peek
    if (fine && !reduce && peek) {
      var px = 0, py = 0, tx = 0, ty = 0, isRunning = false;
      table.addEventListener('pointermove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        if (!isRunning) { isRunning = true; peekFrame(); }
      }, { passive: true });

      function peekFrame() {
        px = lerp(px, tx, 0.14);
        py = lerp(py, ty, 0.14);
        peek.style.left = px + 'px';
        peek.style.top  = py + 'px';
        if (Math.abs(px - tx) > 0.5 || Math.abs(py - ty) > 0.5) {
          requestAnimationFrame(peekFrame);
        } else {
          isRunning = false;
        }
      }
    }
  }

  /* =========================================================
     7 — CINEMATIC 3D SPOTLIGHT STAGE
     ========================================================= */
  var activeSlide = 0;

  function initSpotlightStage() {
    var stage = $('stage-container');
    var track = $('stage-track');
    var counterEl = $('stage-counter-current');
    var totalEl = $('stage-counter-total');
    var descEl = $('stage-desc');
    var titleEl = $('stage-title');
    var linkWrap = $('stage-links');
    var prevBtn = $('stage-prev');
    var nextBtn = $('stage-next');
    if (!stage || !track) return;

    totalEl.textContent = PROJECTS.length;

    // Build spotlight cards
    PROJECTS.forEach(function (p, idx) {
      var card = el('div', 'spotlight-card' + (idx === 0 ? ' is-active' : ''));
      card.setAttribute('data-index', idx);
      card.setAttribute('data-cursor', 'Zoom');

      var img = document.createElement('img');
      img.className = 'spotlight-card__shot';
      img.src = 'assets/previews/' + p.slug + '.jpg';
      img.alt = p.name + ' preview screenshot';
      img.loading = idx === 0 ? 'eager' : 'lazy';
      card.appendChild(img);

      var overlay = el('div', 'spotlight-card__overlay');
      card.appendChild(overlay);

      var badge = el('div', 'spotlight-card__badge', p.zone + ' • ' + p.year);
      card.appendChild(badge);

      card.addEventListener('click', function () {
        if (idx === activeSlide) {
          openProjectDetail(p);
        } else {
          goToSlide(idx);
        }
      });

      track.appendChild(card);
    });

    function getCardMetrics() {
      var first = track.children[0];
      if (!first) return { cardWidth: 0, gap: 0, step: 0 };
      var cardWidth = first.getBoundingClientRect().width;
      var gap = parseFloat(getComputedStyle(track).gap) || 28;
      return { cardWidth: cardWidth, gap: gap, step: cardWidth + gap };
    }

    function calculateCenterOffset(slideIndex) {
      var metrics = getCardMetrics();
      var stageWidth = stage.getBoundingClientRect().width;
      return (stageWidth / 2) - (slideIndex * metrics.step) - (metrics.cardWidth / 2);
    }

    function updateStageUI() {
      var p = PROJECTS[activeSlide];
      if (counterEl) counterEl.textContent = activeSlide + 1;

      var offset = calculateCenterOffset(activeSlide);
      track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';

      Array.prototype.forEach.call(track.children, function (card, i) {
        card.classList.toggle('is-active', i === activeSlide);
      });

      if (titleEl) titleEl.textContent = p.name;
      if (descEl) descEl.textContent = p.blurb;

      if (linkWrap) {
        linkWrap.innerHTML = '';
        if (p.url) {
          var visitA = el('a', 'btn-primary', 'Launch Deployment ↗');
          visitA.href = p.url;
          visitA.target = '_blank';
          visitA.rel = 'noopener';
          visitA.setAttribute('data-cursor', 'Launch');
          linkWrap.appendChild(visitA);
        }
        var deepBtn = el('button', 'btn-secondary', 'Technical Specs');
        deepBtn.type = 'button';
        deepBtn.setAttribute('data-cursor', 'Inspect');
        deepBtn.addEventListener('click', function () { openProjectDetail(p); });
        linkWrap.appendChild(deepBtn);
      }
    }

    function goToSlide(n) {
      activeSlide = Math.max(0, Math.min(PROJECTS.length - 1, n));
      track.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      updateStageUI();
      playBlip(600 + activeSlide * 30, 0.03);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(activeSlide - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(activeSlide + 1); });

    // Drag / Swipe Gestures
    var isDragging = false, startX = 0, currentMoved = 0, baseTransform = 0;

    stage.addEventListener('pointerdown', function (e) {
      isDragging = true;
      startX = e.clientX;
      currentMoved = 0;
      baseTransform = calculateCenterOffset(activeSlide);
      track.style.transition = 'none';
    });

    addEventListener('pointermove', function (e) {
      if (!isDragging) return;
      currentMoved = e.clientX - startX;
      track.style.transform = 'translate3d(' + (baseTransform + currentMoved) + 'px, 0, 0)';
    }, { passive: true });

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      var metrics = getCardMetrics();
      var threshold = metrics.step * 0.16;
      if (Math.abs(currentMoved) > threshold) {
        goToSlide(activeSlide + (currentMoved < 0 ? 1 : -1));
      } else {
        updateStageUI();
      }
    }

    addEventListener('pointerup', endDrag);
    addEventListener('pointercancel', endDrag);

    window.addEventListener('resize', function () {
      track.style.transition = 'none';
      updateStageUI();
    });

    // Initial render
    requestAnimationFrame(function () {
      updateStageUI();
    });
  }

  /* =========================================================
     8 — MISSION CONTROL ROADMAP & TELEMETRY TABS
     ========================================================= */
  function initRoadmap() {
    var tabsWrap = $('status-tabs');
    var ink = $('status-tabs-ink');
    var grid = $('roadmap-grid');
    if (!tabsWrap || !grid) return;

    var currentTab = 1; // Default to 'Building Now'

    BOARD.forEach(function (section, idx) {
      var btn = el('button', 'status-tab-btn' + (idx === currentTab ? ' is-active' : ''));
      btn.textContent = section.title + ' (' + section.items.length + ')';
      btn.setAttribute('data-cursor', section.title);
      btn.addEventListener('click', function () {
        selectTab(idx);
      });
      tabsWrap.appendChild(btn);
    });

    function updateInk() {
      var activeBtn = tabsWrap.querySelectorAll('.status-tab-btn')[currentTab];
      if (!activeBtn || !ink) return;
      ink.style.width = activeBtn.offsetWidth + 'px';
      ink.style.transform = 'translateX(' + activeBtn.offsetLeft + 'px)';
    }

    function selectTab(idx) {
      currentTab = idx;
      tabsWrap.querySelectorAll('.status-tab-btn').forEach(function (b, i) {
        b.classList.toggle('is-active', i === idx);
      });
      updateInk();
      renderItems();
      playBlip(560, 0.03);
    }

    function renderItems() {
      grid.innerHTML = '';
      var data = BOARD[currentTab];

      data.items.forEach(function (item, i) {
        var card = el('article', 'roadmap-item');
        card.style.setProperty('--ri', i);

        var infoCol = el('div');
        var title = el('h4', 'roadmap-item__title');
        title.appendChild(document.createTextNode(item.title));
        if (item.isNew) {
          var newBadge = el('span', 'badge-new', 'NEW');
          title.appendChild(newBadge);
        }
        infoCol.appendChild(title);

        var body = el('p', 'roadmap-item__body', item.body);
        infoCol.appendChild(body);

        var tags = el('div', 'roadmap-item__tags');
        (item.tags || []).forEach(function (t) {
          tags.appendChild(el('span', 'idx-tag', t));
        });
        infoCol.appendChild(tags);

        card.appendChild(infoCol);

        // Progress Metric or Date
        var metaCol = el('div');
        if (typeof item.progress === 'number') {
          var pbox = el('div', 'progress-box');
          pbox.appendChild(el('span', 'progress-box__val', item.progress + '% Complete'));
          var ptrack = el('div', 'progress-box__track');
          var pfill = el('div', 'progress-box__fill');
          ptrack.appendChild(pfill);
          pbox.appendChild(ptrack);
          card.style.setProperty('--prog', item.progress / 100);
          metaCol.appendChild(pbox);
        } else if (item.date) {
          var dbox = el('span', 'badge-status badge-status--live', item.date);
          metaCol.appendChild(dbox);
        }
        card.appendChild(metaCol);

        grid.appendChild(card);

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            card.classList.add('is-in');
          });
        });
      });
    }

    selectTab(1);
    window.addEventListener('resize', updateInk);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateInk);
    }
  }

  /* =========================================================
     9 — ARCHITECTURE & SUSTAINABILITY SECTION
     ========================================================= */
  function initArchitecture() {
    var archGrid = $('arch-grid');
    var costTable = $('cost-table');
    if (!archGrid || !costTable) return;

    // Render 4 Pillars
    ARCHITECTURE.pillars.forEach(function (p) {
      var card = el('div', 'arch-card');
      var icon = el('div', 'arch-card__icon');
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';
      card.appendChild(icon);

      card.appendChild(el('h4', 'arch-card__title', p.title));
      card.appendChild(el('p', 'arch-card__desc', p.desc));
      archGrid.appendChild(card);
    });

    // Render Cost Table
    ARCHITECTURE.costs.items.forEach(function (c) {
      var row = el('div', 'cost-row');
      row.appendChild(el('span', 'cost-row__label', c.label));
      row.appendChild(el('span', 'cost-row__note', c.note + ' (' + c.period + ')'));
      row.appendChild(el('span', 'cost-row__amount', ARCHITECTURE.costs.currency + c.amount.toLocaleString('en-IN')));
      costTable.appendChild(row);
    });
  }

  /* =========================================================
     10 — COMMAND PALETTE MODAL (⌘K / Ctrl+K)
     ========================================================= */
  function initCommandPalette() {
    var modal = $('palette-modal');
    var input = $('palette-input');
    var list = $('palette-results');
    var openBtn = $('btn-open-palette');
    if (!modal || !input || !list) return;

    var isPaletteOpen = false;
    var selectedIndex = 0;
    var commands = [];

    // Build searchable catalog
    PROJECTS.forEach(function (p) {
      commands.push({
        type: 'project',
        title: p.name,
        badge: p.zone,
        action: function () { openProjectDetail(p); }
      });
    });
    commands.push({
      type: 'nav',
      title: 'Jump to Project Index',
      badge: 'Section',
      action: function () { scrollToSection('index'); }
    });
    commands.push({
      type: 'nav',
      title: 'Jump to 3D Previews Stage',
      badge: 'Section',
      action: function () { scrollToSection('previews'); }
    });
    commands.push({
      type: 'nav',
      title: 'Jump to Mission Control Status',
      badge: 'Section',
      action: function () { scrollToSection('status'); }
    });
    commands.push({
      type: 'nav',
      title: 'Jump to Architecture & Costs',
      badge: 'Section',
      action: function () { scrollToSection('costs'); }
    });
    THEMES.forEach(function (t) {
      commands.push({
        type: 'theme',
        title: 'Switch to ' + t.label + ' Theme',
        badge: 'Atmosphere',
        action: function () { window.switchThemeById(t.id); }
      });
    });

    function openPalette() {
      isPaletteOpen = true;
      modal.classList.add('is-open');
      input.value = '';
      selectedIndex = 0;
      renderPaletteResults('');
      setTimeout(function () { input.focus(); }, 50);
      playBlip(700, 0.04);
    }

    function closePalette() {
      isPaletteOpen = false;
      modal.classList.remove('is-open');
    }

    function renderPaletteResults(query) {
      list.innerHTML = '';
      var q = query.toLowerCase().trim();
      var matches = commands.filter(function (cmd) {
        return !q || cmd.title.toLowerCase().includes(q) || cmd.badge.toLowerCase().includes(q);
      });

      if (matches.length === 0) {
        var empty = el('li', 'palette-item');
        empty.appendChild(el('span', null, 'No matching commands found.'));
        list.appendChild(empty);
        return;
      }

      matches.forEach(function (cmd, idx) {
        var li = el('li', 'palette-item' + (idx === selectedIndex ? ' is-selected' : ''));
        var titleWrap = el('span', 'palette-item__title');
        titleWrap.textContent = cmd.title;
        li.appendChild(titleWrap);

        var badge = el('span', 'palette-item__badge', cmd.badge);
        li.appendChild(badge);

        li.addEventListener('click', function () {
          cmd.action();
          closePalette();
        });

        li.addEventListener('mouseenter', function () {
          selectedIndex = idx;
          updateSelectedPaletteItem();
        });

        list.appendChild(li);
      });
    }

    function updateSelectedPaletteItem() {
      list.querySelectorAll('.palette-item').forEach(function (item, idx) {
        item.classList.toggle('is-selected', idx === selectedIndex);
      });
    }

    input.addEventListener('input', function (e) {
      selectedIndex = 0;
      renderPaletteResults(e.target.value);
    });

    input.addEventListener('keydown', function (e) {
      var items = list.querySelectorAll('.palette-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelectedPaletteItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelectedPaletteItem();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        var selected = items[selectedIndex];
        if (selected) selected.click();
      } else if (e.key === 'Escape') {
        closePalette();
      }
    });

    if (openBtn) openBtn.addEventListener('click', openPalette);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closePalette();
    });

    // Global Keybinding: ⌘K or Ctrl+K or /
    window.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isPaletteOpen) closePalette();
        else openPalette();
      }
    });
  }

  /* =========================================================
     11 — PROJECT DEEP DIVE MODAL DIALOG
     ========================================================= */
  function openProjectDetail(p) {
    var dialog = $('detail-dialog');
    if (!dialog) return;

    $('detail-modal-banner-img').src = 'assets/previews/' + p.slug + '.jpg';
    $('detail-modal-banner-img').alt = p.name + ' preview screenshot';
    $('detail-modal-title').textContent = p.name;
    $('detail-modal-category').textContent = p.zone + ' • ' + p.year;
    $('detail-modal-blurb').textContent = p.blurb;

    // Highlights
    var highList = $('detail-modal-highlights');
    highList.innerHTML = '';
    (p.highlights || []).forEach(function (h) {
      var li = el('li');
      li.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg><span>' + h + '</span>';
      highList.appendChild(li);
    });

    // Specs
    var specsWrap = $('detail-modal-specs');
    specsWrap.innerHTML = '';
    if (p.specs) {
      Object.keys(p.specs).forEach(function (key) {
        var box = el('div', 'detail-spec-item');
        box.appendChild(el('span', 'detail-spec-item__lbl', key));
        box.appendChild(el('span', 'detail-spec-item__val', p.specs[key]));
        specsWrap.appendChild(box);
      });
    }

    // Launch Link
    var launchBtn = $('detail-modal-launch');
    if (p.url) {
      launchBtn.href = p.url;
      launchBtn.style.display = 'inline-flex';
      launchBtn.textContent = 'Launch Live Project ↗';
    } else {
      launchBtn.style.display = 'none';
    }

    dialog.showModal();
    playBlip(750, 0.05);

    $('btn-close-detail').onclick = function () {
      dialog.close();
    };
    dialog.onclick = function (e) {
      if (e.target === dialog) dialog.close();
    };
  }

  function scrollToSection(id) {
    var sec = $(id);
    if (sec) sec.scrollIntoView({ behavior: 'smooth' });
  }

  /* =========================================================
     12 — FLOATING NAVIGATION SCROLL WATCHER & LIVE TIME
     ========================================================= */
  function initNavWatcher() {
    var nav = $('nav-header');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }, { passive: true });

    // Live Campus IST Clock
    var clockEl = $('live-clock');
    if (clockEl) {
      function updateTime() {
        var now = new Date();
        var ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        var hrs = String(ist.getHours()).padStart(2, '0');
        var mins = String(ist.getMinutes()).padStart(2, '0');
        var secs = String(ist.getSeconds()).padStart(2, '0');
        clockEl.textContent = hrs + ':' + mins + ':' + secs + ' IST';
      }
      updateTime();
      setInterval(updateTime, 1000);
    }
  }

  /* ---------------------------------------------------------
     INITIALIZATION PIPELINE
     --------------------------------------------------------- */
  initAudio();
  initCursor();
  initIndex();
  initSpotlightStage();
  initRoadmap();
  initArchitecture();
  initCommandPalette();
  initNavWatcher();

})();
