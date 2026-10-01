// Builds prev/next navigation, the archive list, and the Replay button.
(function () {
  var eps = (window.EPISODES || []).slice().sort(function (a, b) { return a.num - b.num; });
  var root = document.body.getAttribute('data-root') || '';
  var link = function (ep) { return root + 'episodes/' + ep.file; };
  var pad = function (n) { return String(n).padStart(3, '0'); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };

  // Episode page: prev / all / next
  var current = Number(document.body.getAttribute('data-episode'));
  document.querySelectorAll('.ep-nav').forEach(function (nav) {
    var i = eps.findIndex(function (e) { return e.num === current; });
    var prev = eps[i - 1], next = eps[i + 1];
    nav.innerHTML =
      (prev ? '<a class="navbtn" href="' + link(prev) + '">← Ep. ' + prev.num + '</a>'
            : '<span class="navbtn off">← First episode</span>') +
      '<a class="navbtn" href="' + root + 'index.html">All episodes</a>' +
      (next ? '<a class="navbtn primary" href="' + link(next) + '">Ep. ' + next.num + ' →</a>'
            : '<span class="navbtn off">Next week →</span>');
  });

  // Home page: latest + archive
  var latest = eps[eps.length - 1];
  var latestEl = document.getElementById('latest');
  if (latestEl && latest) {
    latestEl.href = link(latest);
    latestEl.querySelector('.kicker').textContent = 'NEW · Episode ' + latest.num;
    latestEl.querySelector('h2').textContent = latest.title;
    latestEl.querySelector('p').textContent = latest.teaser || '';
  }
  var list = document.getElementById('archive');
  if (list) {
    list.innerHTML = eps.slice().reverse().map(function (e) {
      return '<li><a href="' + link(e) + '"><span class="num">#' + pad(e.num) + '</span>' +
             '<span class="t">' + esc(e.title) + '</span><span class="d">' + esc(e.date || '') + '</span></a></li>';
    }).join('');
  }

  // Share buttons (episode pages only), placed above the bottom navigation
  if (current) {
    var navs = document.querySelectorAll('.ep-nav');
    var bottom = navs[navs.length - 1];
    var canon = document.querySelector('link[rel="canonical"]');
    var url = canon ? canon.href : location.href;
    var ogt = document.querySelector('meta[property="og:title"]');
    var title = ogt ? ogt.content : document.title;
    var u = encodeURIComponent(url), t = encodeURIComponent(title);
    var box = document.createElement('section');
    box.className = 'share';
    box.setAttribute('aria-label', 'Share this episode');
    box.innerHTML =
      '<p class="share-title">Know a Dan? Send him this.</p>' +
      '<div class="share-row">' +
      '<a class="sbtn wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + t + '%20' + u + '">WhatsApp</a>' +
      '<a class="sbtn fb" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + u + '">Facebook</a>' +
      '<a class="sbtn xx" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + t + '&url=' + u + '">X</a>' +
      '<a class="sbtn rd" target="_blank" rel="noopener" href="https://www.reddit.com/submit?url=' + u + '&title=' + t + '">Reddit</a>' +
      '<button type="button" class="sbtn cp">Copy link</button>' +
      (navigator.share ? '<button type="button" class="sbtn more">More…</button>' : '') +
      '</div>';
    box.querySelector('.cp').addEventListener('click', function (ev) {
      var b = ev.currentTarget;
      var done = function () { b.textContent = 'Copied!'; setTimeout(function () { b.textContent = 'Copy link'; }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { window.prompt('Copy this link:', url); });
      else window.prompt('Copy this link:', url);
    });
    var more = box.querySelector('.more');
    if (more) more.addEventListener('click', function () { navigator.share({ title: title, url: url }).catch(function () {}); });
    if (bottom) bottom.parentNode.insertBefore(box, bottom);
  }

  // Replay button
  var btn = document.getElementById('replay');
  if (btn) btn.addEventListener('click', function () {
    var c = document.getElementById('comic');
    c.classList.remove('play'); void c.offsetWidth; c.classList.add('play');
  });
})();
