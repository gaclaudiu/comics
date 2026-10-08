// Cookie consent for Google Analytics (GDPR).
// Google Analytics is NOT loaded until the visitor clicks "Sure, have one".
// The choice is remembered in this browser; "Cookie settings" in the footer reopens the banner.
(function () {
  var KEY = 'fvb-consent';
  var GA_ID = 'G-Q17LMV3HV0';
  var loaded = false, banner = null;
  var ROOT = document.body.getAttribute('data-root') || '';
  var T = function (k, f) { return window.FVB ? window.FVB.t(k, f) : f; };

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    gtag('consent', 'update', { analytics_storage: 'granted' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function removeAnalyticsCookies() {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name.indexOf('_ga') !== 0) return;
      ['', '; domain=' + location.hostname, '; domain=.' + host].forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + d;
      });
    });
  }

  function label() {
    if (!banner) return;
    banner.querySelector('#cookie-title').textContent = T('ui.cookieTitle', 'Blob wants a cookie.');
    banner.querySelector('.ctext').textContent = T('ui.cookieText', '');
    banner.querySelector('p a').textContent = T('ui.cookiePolicy', 'Privacy policy');
    banner.querySelector('.yes').textContent = T('ui.cookieYes', 'Sure, have one');
    banner.querySelector('.no').textContent = T('ui.cookieNo', 'No thanks');
  }

  function hide() { if (banner) banner.hidden = true; }

  function show() {
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'cookie';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-labelledby', 'cookie-title');
      banner.innerHTML =
        '<svg viewBox="-86 -70 190 140" aria-hidden="true"><use href="#blobBody"/><use href="#blobSmug"/>' +
        '<use href="#cookie" transform="translate(74,16) scale(1.35)"/></svg>' +
        '<div><h2 id="cookie-title"></h2><p><span class="ctext"></span> <a href="' + ROOT + 'privacy.html"></a></p>' +
        '<div class="row"><button type="button" class="yes"></button>' +
        '<button type="button" class="no"></button></div></div>';
      label();
      banner.querySelector('.yes').addEventListener('click', function () {
        saveChoice('granted'); loadAnalytics(); hide();
      });
      banner.querySelector('.no').addEventListener('click', function () {
        var wasOn = loaded;
        saveChoice('denied'); removeAnalyticsCookies(); hide();
        if (wasOn) location.reload(); // fully stop analytics that already ran on this page
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
    banner.querySelector('.yes').focus({ preventScroll: true });
  }

  // "Privacy" and "Cookie settings" links in every footer
  var footLinks = [];
  document.querySelectorAll('.copy').forEach(function (p) {
    var a = document.createElement('a');
    a.href = ROOT + 'privacy.html';
    p.appendChild(document.createTextNode(' · '));
    p.appendChild(a);
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'cookie-link';
    b.addEventListener('click', show);
    p.appendChild(document.createTextNode(' · '));
    p.appendChild(b);
    footLinks.push([a, b]);
  });
  function labelFooter() {
    footLinks.forEach(function (x) { x[0].textContent = T('ui.privacy', 'Privacy'); x[1].textContent = T('ui.cookieSettings', 'Cookie settings'); });
  }
  labelFooter();
  if (window.FVB) window.FVB.onChange(function () { labelFooter(); label(); });

  var choice = getChoice();
  if (choice === 'granted') loadAnalytics();
  else if (choice !== 'denied') show();
})();
