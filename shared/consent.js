// Cookie consent for Google Analytics (GDPR).
// Google Analytics is NOT loaded until the visitor clicks "Sure, have one".
// The choice is remembered in this browser; "Cookie settings" in the footer reopens the banner.
(function () {
  var KEY = 'fvb-consent';
  var GA_ID = 'G-Q17LMV3HV0';
  var loaded = false, banner = null;
  var ROOT = document.body.getAttribute('data-root') || '';

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
        '<div><h2 id="cookie-title">Blob wants a cookie.</h2>' +
        '<p>We use Google Analytics cookies to count readers and see which episodes you like. No ads, no selling your data. Say no and nothing is tracked. <a href="' + ROOT + 'privacy.html">Privacy policy</a></p>' +
        '<div class="row"><button type="button" class="yes">Sure, have one</button>' +
        '<button type="button" class="no">No thanks</button></div></div>';
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
  document.querySelectorAll('.copy').forEach(function (p) {
    var a = document.createElement('a');
    a.href = ROOT + 'privacy.html'; a.textContent = 'Privacy';
    p.appendChild(document.createTextNode(' · '));
    p.appendChild(a);
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'cookie-link'; b.textContent = 'Cookie settings';
    b.addEventListener('click', show);
    p.appendChild(document.createTextNode(' · '));
    p.appendChild(b);
  });

  var choice = getChoice();
  if (choice === 'granted') loadAnalytics();
  else if (choice !== 'denied') show();
})();
