// Builds prev/next navigation, the archive list, share buttons and the Replay button.
// Text comes from shared/i18n.js (window.FVB), so it follows the language dropdown.
(function () {
  var T = function (k, f) { return window.FVB ? window.FVB.t(k, f) : f; };
  var L = function () { return window.FVB ? window.FVB.lang : 'en'; };
  var eps = (window.EPISODES || []).slice().sort(function (a, b) { return a.num - b.num; });
  var root = document.body.getAttribute('data-root') || '';
  var link = function (ep) { return root + 'episodes/' + ep.file; };
  var pad = function (n) { return String(n).padStart(3, '0'); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var field = function (e, k) { return e[k + '_' + L()] || e[k] || ''; };
  var current = Number(document.body.getAttribute('data-episode'));

  // Share box (episode pages only), placed above the bottom navigation
  var share = null, url = location.href, title = document.title;
  if (current) {
    var navs = document.querySelectorAll('.ep-nav');
    var bottom = navs[navs.length - 1];
    var canon = document.querySelector('link[rel="canonical"]');
    url = canon ? canon.href : location.href;
    var ogt = document.querySelector('meta[property="og:title"]');
    title = ogt ? ogt.content : document.title;
    share = document.createElement('section');
    share.className = 'share';
    if (bottom) bottom.parentNode.insertBefore(share, bottom);
  }

  function render() {
    // prev / all / next
    document.querySelectorAll('.ep-nav').forEach(function (nav) {
      if (!current) return;
      var i = eps.findIndex(function (e) { return e.num === current; });
      var prev = eps[i - 1], next = eps[i + 1];
      nav.innerHTML =
        (prev ? '<a class="navbtn" href="' + link(prev) + '">← Ep. ' + prev.num + '</a>'
              : '<span class="navbtn off">' + T('ui.first') + '</span>') +
        '<a class="navbtn" href="' + root + 'index.html">' + T('ui.all') + '</a>' +
        (next ? '<a class="navbtn primary" href="' + link(next) + '">Ep. ' + next.num + ' →</a>'
              : '<span class="navbtn off">' + T('ui.nextWeek') + '</span>');
    });

    // home page: latest + archive
    var latest = eps[eps.length - 1];
    var latestEl = document.getElementById('latest');
    if (latestEl && latest) {
      latestEl.href = link(latest);
      latestEl.querySelector('.kicker').textContent = T('ui.new') + latest.num;
      latestEl.querySelector('h2').textContent = field(latest, 'title');
      latestEl.querySelector('p').textContent = field(latest, 'teaser');
    }
    var list = document.getElementById('archive');
    if (list) {
      list.innerHTML = eps.slice().reverse().map(function (e) {
        return '<li><a href="' + link(e) + '"><span class="num">#' + pad(e.num) + '</span>' +
               '<span class="t">' + esc(field(e, 'title')) + '</span><span class="d">' + esc(e.date || '') + '</span></a></li>';
      }).join('');
    }

    // share box
    if (share) {
      var u = encodeURIComponent(url), t = encodeURIComponent(title);
      share.setAttribute('aria-label', T('ui.shareAria'));
      share.innerHTML =
        '<p class="share-title">' + T('ui.shareTitle') + '</p>' +
        '<div class="share-row">' +
        '<a class="sbtn wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + t + '%20' + u + '">WhatsApp</a>' +
        '<a class="sbtn fb" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + u + '">Facebook</a>' +
        '<a class="sbtn xx" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + t + '&url=' + u + '">X</a>' +
        '<a class="sbtn rd" target="_blank" rel="noopener" href="https://www.reddit.com/submit?url=' + u + '&title=' + t + '">Reddit</a>' +
        '<button type="button" class="sbtn cp">' + T('ui.copyLink') + '</button>' +
        (navigator.share ? '<button type="button" class="sbtn more">' + T('ui.more') + '</button>' : '') +
        '</div>';
      share.querySelector('.cp').addEventListener('click', function (ev) {
        var b = ev.currentTarget;
        var done = function () { b.textContent = T('ui.copied'); setTimeout(function () { b.textContent = T('ui.copyLink'); }, 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { window.prompt(T('ui.copyPrompt'), url); });
        else window.prompt(T('ui.copyPrompt'), url);
      });
      var more = share.querySelector('.more');
      if (more) more.addEventListener('click', function () { navigator.share({ title: title, url: url }).catch(function () {}); });
    }
  }
  render();
  if (window.FVB) window.FVB.onChange(render);

  // Replay button
  var btn = document.getElementById('replay');
  if (btn) btn.addEventListener('click', function () {
    var c = document.getElementById('comic');
    c.classList.remove('play'); void c.offsetWidth; c.classList.add('play');
  });
})();
