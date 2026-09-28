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

  // Replay button
  var btn = document.getElementById('replay');
  if (btn) btn.addEventListener('click', function () {
    var c = document.getElementById('comic');
    c.classList.remove('play'); void c.offsetWidth; c.classList.add('play');
  });
})();
