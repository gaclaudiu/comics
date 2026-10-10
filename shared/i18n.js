// Language support (English / Romanian).
// English text stays in the HTML. Translations live in:
//   * UI below (buttons, share box, cookie banner, home page…)
//   * window.I18N_PAGE in each page (episode text), e.g. { ro: { "p1.cap": "…" } }
// Mark translatable elements with data-t="key" (text) or data-t-aria="key" (aria-label).
// Long blocks can be written twice with data-lang-block="en" / "ro".
(function () {
  var KEY = 'fvb-lang';
  var LANGS = { en: 'English', ro: 'Română' };
  var CODES = { en: 'EN', ro: 'RO' };

  var UI = {
    ro: {
      'ui.replay': '▶ Din nou',
      'ui.subtitle': 'Un conflict interior, o pagină pe rând.',
      'ui.copy': '© 2026 Flex vs Blob. Toate drepturile rezervate.',
      'ui.first': '← Primul episod',
      'ui.all': 'Toate episoadele',
      'ui.nextWeek': 'Săptămâna viitoare →',
      'ui.shareTitle': 'Știi un Dan? Trimite-i asta.',
      'ui.shareAria': 'Distribuie episodul',
      'ui.copyLink': 'Copiază linkul',
      'ui.copied': 'Copiat!',
      'ui.more': 'Mai mult…',
      'ui.copyPrompt': 'Copiază linkul:',
      'ui.privacy': 'Confidențialitate',
      'ui.cookieSettings': 'Setări cookie',
      'ui.cookieTitle': 'Blob vrea un cookie.',
      'ui.cookieText': 'Folosim cookie-uri Google Analytics ca să numărăm cititorii și să vedem ce episoade vă plac. Fără reclame, fără vânzarea datelor. Dacă spui nu, nu urmărim nimic.',
      'ui.cookiePolicy': 'Politica de confidențialitate',
      'ui.cookieYes': 'Sigur, ia unul',
      'ui.cookieNo': 'Nu, mersi',
      'ui.tagline': 'Mușchiul vrea progres. Grăsimea vrea gustări. Dan vrea să creadă fiecare etichetă pe care o citește. O pagină nouă în fiecare săptămână.',
      'ui.allEpisodes': 'Toate episoadele',
      'ui.readIt': 'Citește →',
      'ui.new': 'NOU · Episodul ',
      'ui.notTranslated': 'Episodul acesta nu e tradus încă, așa că îl citești în engleză. Traducerea vine curând.',
      'ui.langLabel': 'Limba',
      'ui.hint': 'Citește în română →',
      'ui.hintClose': 'Închide',
      'ui.allMyths': 'Vezi toate miturile demontate →',
      'ui.mythsCta': 'Mituri demontate: toate miturile din benzi →',
      'ui.startHere': 'Ești nou? Începe aici →'
    },
    en: {
      'ui.first': '← First episode', 'ui.all': 'All episodes', 'ui.nextWeek': 'Next week →',
      'ui.shareTitle': 'Know a Dan? Send him this.', 'ui.shareAria': 'Share this episode',
      'ui.copyLink': 'Copy link', 'ui.copied': 'Copied!', 'ui.more': 'More…', 'ui.copyPrompt': 'Copy this link:',
      'ui.privacy': 'Privacy', 'ui.cookieSettings': 'Cookie settings',
      'ui.cookieTitle': 'Blob wants a cookie.',
      'ui.cookieText': 'We use Google Analytics cookies to count readers and see which episodes you like. No ads, no selling your data. Say no and nothing is tracked.',
      'ui.cookiePolicy': 'Privacy policy', 'ui.cookieYes': 'Sure, have one', 'ui.cookieNo': 'No thanks',
      'ui.new': 'NEW · Episode ', 'ui.langLabel': 'Language',
      'ui.hint': 'Citește în română →', 'ui.hintClose': 'Close',
      'ui.allMyths': 'See all myths busted →', 'ui.mythsCta': 'Myths Busted: every myth from the comic →',
      'ui.startHere': 'New here? Start here →'
    }
  };
  var PAGE = window.I18N_PAGE || {};

  function saved() { try { var v = localStorage.getItem(KEY); return LANGS[v] ? v : null; } catch (e) { return null; } }
  function pick() {
    var q = (location.search.match(/[?&]lang=(en|ro)\b/) || [])[1];
    if (q) { save(q); return q; }
    try { var s = localStorage.getItem(KEY); if (LANGS[s]) return s; } catch (e) {}
    return 'en'; // default: always English (the browser's language is ignored)
  }
  function save(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  var lang = pick();
  var listeners = [];

  function t(key, fallback) {
    var p = PAGE[lang], u = UI[lang];
    if (p && p[key] != null) return p[key];
    if (u && u[key] != null) return u[key];
    if (UI.en[key] != null) return UI.en[key];
    return fallback != null ? fallback : key;
  }
  function isSvg(el) { return el instanceof SVGElement; }

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) {
      if (el.dataset.en == null) el.dataset.en = isSvg(el) ? el.textContent : el.innerHTML;
      var k = el.getAttribute('data-t');
      var v = (lang !== 'en' && ((PAGE[lang] && PAGE[lang][k]) || (UI[lang] && UI[lang][k]))) || null;
      var out = v != null ? v : el.dataset.en;
      if (isSvg(el)) el.textContent = out; else el.innerHTML = out;
    });
    document.querySelectorAll('[data-t-aria]').forEach(function (el) {
      if (el.dataset.enAria == null) el.dataset.enAria = el.getAttribute('aria-label') || '';
      var k = el.getAttribute('data-t-aria');
      var v = lang !== 'en' && PAGE[lang] && PAGE[lang][k];
      el.setAttribute('aria-label', v || el.dataset.enAria);
    });
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-block') !== lang;
    });
    if (window.__fvbTitleEn == null) window.__fvbTitleEn = document.title;
    document.title = (lang !== 'en' && PAGE[lang] && PAGE[lang].title) || window.__fvbTitleEn;

    // "not translated yet" notice on episode pages
    var notice = document.getElementById('lang-notice');
    var isEpisode = !!document.body.getAttribute('data-episode');
    var missing = lang !== 'en' && isEpisode && !PAGE[lang];
    if (missing && !notice) {
      notice = document.createElement('p');
      notice.id = 'lang-notice'; notice.className = 'lang-notice';
      var nav = document.querySelector('.ep-nav');
      if (nav) nav.parentNode.insertBefore(notice, nav.nextSibling);
    }
    if (notice) { notice.hidden = !missing; notice.textContent = t('ui.notTranslated'); }

    var tog = document.getElementById('lang-toggle');
    if (tog) {
      tog.setAttribute('aria-label', t('ui.langLabel'));
      tog.querySelectorAll('button').forEach(function (b) {
        var on = b.getAttribute('data-lang') === lang;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
  }

  function setLang(l) {
    if (!LANGS[l] || l === lang) return;
    lang = l; save(l);
    document.body.classList.remove('lang-swap'); void document.body.offsetWidth; document.body.classList.add('lang-swap');
    apply();
    listeners.forEach(function (fn) { fn(lang); });
  }

  // EN | RO toggle, top-right of the header (above the Replay button on episode pages)
  var header = document.querySelector('header');
  if (header) {
    var right = document.createElement('div');
    right.className = 'hdr-right';
    var tog = document.createElement('div');
    tog.id = 'lang-toggle'; tog.className = 'lang-toggle'; tog.setAttribute('role', 'group');
    Object.keys(LANGS).forEach(function (k) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('data-lang', k); b.setAttribute('lang', k);
      b.title = LANGS[k]; b.textContent = CODES[k];
      b.addEventListener('click', function () { setLang(k); hideHint(); });
      tog.appendChild(b);
    });
    right.appendChild(tog);
    var replay = document.getElementById('replay');
    if (replay) right.appendChild(replay);
    header.appendChild(right);
  }

  // One-time hint for Romanian browsers that haven't chosen a language yet.
  // The site still opens in English; the hint only offers the switch.
  var hint = null;
  function hideHint() { if (hint) { hint.remove(); hint = null; } }
  var browserRo = /^ro/i.test((navigator.languages && navigator.languages[0]) || navigator.language || '');
  if (browserRo && lang === 'en' && !saved() && header) {
    hint = document.createElement('div');
    hint.className = 'lang-hint'; hint.setAttribute('lang', 'ro');
    var go = document.createElement('button');
    go.type = 'button'; go.className = 'lang-hint-go'; go.textContent = UI.ro['ui.hint'];
    go.addEventListener('click', function () { setLang('ro'); hideHint(); });
    var x = document.createElement('button');
    x.type = 'button'; x.className = 'lang-hint-x'; x.textContent = '×';
    x.setAttribute('aria-label', UI.en['ui.hintClose']);
    x.addEventListener('click', function () { save('en'); hideHint(); });   // remembers "English, thanks"
    hint.appendChild(go); hint.appendChild(x);
    header.parentNode.insertBefore(hint, header.nextSibling);
  }

  window.FVB = {
    get lang() { return lang; },
    t: t,
    setLang: setLang,
    onChange: function (fn) { listeners.push(fn); }
  };
  apply();
})();
