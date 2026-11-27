/* Ventilux Plan – digitale fotorapporter (fase 2). Ingen data eller koder i denne fil – alt hentes efter PIN.
   Rapporten: forside, bygning/opgange, lejligheder med FØR/EFTER pr. komponent. Fotos uploades løbende til OneDrive
   (også offline: de venter på telefonen). Ledelsen godkender, og appen laver PDF'en som Ventilux Pro. */
(function () {
  var css =
    '.ark.r-bred{max-width:820px}' +
    '.r-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:var(--svag);font-size:12.5px}' +
    '.r-chip{display:inline-flex;align-items:center;gap:5px;height:22px;padding:0 9px;border-radius:999px;font-size:11.5px;font-weight:600;border:1px solid var(--linje2);color:var(--svag);white-space:nowrap}' +
    '.r-chip.Kladde{color:#b7791f;border-color:rgba(183,121,31,.4)}.r-chip.Indsendt{color:var(--brand);border-color:var(--brand)}' +
    '.r-chip.Returneret{color:#e5484d;border-color:rgba(229,72,77,.5)}.r-chip.Godkendt{color:#16a34a;border-color:rgba(22,163,74,.5)}' +
    '.r-sek{margin-top:22px;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--svag);display:flex;justify-content:space-between;align-items:center}' +
    '.r-liste{margin-top:8px;border:1px solid var(--linje);border-radius:10px;overflow:hidden;background:var(--flade)}' +
    '.r-rk{display:flex;align-items:center;gap:10px;padding:12px 14px;border-top:1px solid var(--linje);cursor:pointer}.r-rk:first-child{border-top:0}.r-rk:hover{background:var(--hover)}' +
    '.r-rk .nv{font-weight:600;min-width:90px}.r-rk .info{flex:1;min-width:0;color:var(--svag);font-size:12.5px}.r-rk .adv{color:#e5484d;font-size:12px}' +
    '.r-res{font-size:11.5px;font-weight:600;padding:2px 8px;border-radius:999px;background:var(--flade2);border:1px solid var(--linje2);white-space:nowrap}' +
    '.r-res.udfoert{color:#16a34a;border-color:rgba(22,163,74,.45)}.r-res.ikke{color:#b7791f;border-color:rgba(183,121,31,.45)}' +
    '.r-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-top:8px}' +
    '.r-foto{position:relative;border-radius:10px;overflow:hidden;background:var(--flade2);border:1px solid var(--linje2);aspect-ratio:16/9}' +
    '.r-foto img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.r-foto .dot{position:absolute;right:6px;bottom:6px;width:11px;height:11px;border-radius:50%;background:#f59e0b;box-shadow:0 0 0 2px rgba(0,0,0,.35)}.r-foto .dot.ok{background:#16a34a}' +
    '.r-foto .ov{position:absolute;left:0;right:0;top:0;display:flex;justify-content:space-between;padding:5px}' +
    '.r-foto .ov button,.r-mini{width:30px;height:30px;border-radius:8px;border:0;background:rgba(0,0,0,.62);color:#fff;cursor:pointer;font-size:15px;display:inline-grid;place-items:center;padding:0}' +
    '.r-foto select{position:absolute;left:5px;bottom:5px;max-width:calc(100% - 30px);height:26px;border-radius:7px;border:0;background:rgba(0,0,0,.62);color:#fff;font-size:11.5px;padding:0 4px}' +
    '.r-tom{border:1.5px dashed var(--linje2);border-radius:10px;aspect-ratio:16/9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--svag);font-size:12px;font-weight:600;background:var(--bg)}' +
    '.r-tom.naeste{border-color:var(--brand);background:var(--brandsvag)}' +
    '.r-tom .bk{display:flex;gap:8px}.r-tom .bk button{height:40px;min-width:48px;border-radius:9px;border:1px solid var(--linje2);background:var(--flade);color:var(--tekst);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 10px;font:inherit;font-size:13px}' +
    '.r-tom .bk button.p{background:var(--brand);border-color:var(--brand);color:#fff}' +
    '.r-lbl{font-size:11px;font-weight:700;letter-spacing:.5px;margin-bottom:5px}.r-lbl.f{color:#e5484d}.r-lbl.e{color:#16a34a}' +
    '.r-par{display:grid;grid-template-columns:1fr auto 1fr;gap:8px;align-items:end;margin-top:10px}' +
    '.r-par .mid{display:flex;flex-direction:column;gap:6px;padding-bottom:4px}' +
    '.r-komp{margin-top:14px;padding:12px;border:1px solid var(--linje);border-radius:12px;background:var(--flade2)}' +
    '.r-komp h4{margin:0;font-size:13px;font-weight:700;letter-spacing:.4px;display:flex;justify-content:space-between;align-items:center;gap:8px}' +
    '.r-seg{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.r-seg button{height:40px;padding:0 14px;border-radius:9px;border:1px solid var(--linje2);background:var(--flade);color:var(--tekst);font:inherit;font-size:13.5px;cursor:pointer}' +
    '.r-seg button.on{background:var(--brand);border-color:var(--brand);color:#fff;font-weight:600}' +
    '.r-seg.stor button{min-width:54px;height:46px;font-size:15px;font-weight:600}' +
    '.r-adv{margin-top:12px;padding:10px 12px;border-radius:8px;border-left:3px solid #e5484d;background:var(--flade2);font-size:13px}' +
    '.r-ok{margin-top:12px;padding:10px 12px;border-radius:8px;border-left:3px solid #16a34a;background:var(--flade2);font-size:13px}' +
    '.r-status{font-size:12px;color:var(--svag)}.r-status.fejl{color:#e5484d}' +
    '.r-felter{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}@media(max-width:600px){.r-felter{grid-template-columns:1fr}}' +
    '.r-nav{display:flex;gap:8px;align-items:center;justify-content:space-between;margin-bottom:4px}' +
    '.r-nav button{height:34px;border-radius:8px;border:1px solid var(--linje2);background:var(--flade);color:var(--tekst);padding:0 12px;cursor:pointer;font:inherit;font-size:13px;display:inline-flex;align-items:center;gap:6px}' +
    '.r-bar{height:8px;border-radius:9px;background:var(--linje);overflow:hidden;margin-top:14px}.r-bar i{display:block;height:100%;background:var(--brand);transition:width .25s}' +
    '.r-filter{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}' +
    '.k .tal{background:#e5484d;color:#fff;border-radius:999px;font-size:11px;font-weight:700;padding:1px 7px;margin-left:4px}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  IK.rapport = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/>';
  IK.kamera = IK.kamera || '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>';
  IK.billede = IK.billede || '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>';
  IK.plus = '<path d="M12 5v14M5 12h14"/>';
  IK.pil = '<path d="M15 18l-6-6 6-6"/>';
  IK.hpil = '<path d="M9 18l6-6-6-6"/>';

  var KOMPONENTER = ['VENTIL', 'UDSUG WC', 'UDSUG BAD', 'EMHÆTTE', 'EMHÆTTE FILTER', 'TØRRETUMBLER', 'INDBLÆS', 'INDTAG ANLÆG', 'UDSUG ANLÆG', 'KRYDSVEKSLER'];
  var RESULTAT = [['udfoert', '✓ Udført'], ['ikkehjemme', 'Ikke hjemme'], ['naegtet', 'Nægtet adgang'], ['ingennoegle', 'Ingen nøgle'], ['kunneikke', 'Kunne ikke udføres']];
  var RES_TEKST = {udfoert: 'Udført', ikkehjemme: 'Ikke hjemme', naegtet: 'Nægtet adgang', ingennoegle: 'Ingen nøgle', kunneikke: 'Kunne ikke udføres'};
  var ETAGER = ['KL', 'ST', '1', '2', '3', '4', '5', '6', '7', '8'], SIDER = ['TV', 'MF', 'TH'];

  var R = null;        // åben rapport: {nr, data, version, status, billeder, mappe, kommentar, admin, pdf}
  var V = {s: 'start'}; // visning
  var THUMB = {};      // billednøgle → lille dataURL (fra denne telefon)
  var LINKS = {t: 0, l: {}};
  var GEM = {travl: false, igen: false, fejl: '', timer: null};
  var KOE = {koerer: false, antal: 0, fejl: 0};
  var FN = [];
  var LISTE_CACHE = {};

  function kald(fn, args) {
    return fetch(API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({fn: fn, args: args})})
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (r) { if (r && r.__fejl) throw new Error(r.__fejl); if (r && r.fejl) throw new Error(r.fejl === 'pin' ? 'Log ind igen' : r.fejl); return r; });
  }
  function mig() { return (S.data && S.data.mig) || S.person || ''; }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function fn(f) { FN.push(f); return 'VXR.f(' + (FN.length - 1) + ',this,event)'; }
  function admin() { return S.rolle === 'admin'; }
  function laast() { return !R || (!admin() && (R.status === 'Indsendt' || R.status === 'Godkendt')); }
  function dmy(d) { var s = String(d || '').split('-'); return s.length === 3 ? s[2] + '/' + s[1] + '/' + s[0] : d; }
  function aktive(l) { return (l || []).filter(function (x) { return x && !x.slet; }); }

  /* ---------- IndexedDB: fotos venter her, til de er uploadet ---------- */
  var DBP = null;
  function db() {
    if (!DBP) DBP = new Promise(function (ok, fejl) {
      var q = indexedDB.open('vxplan_rapport', 1);
      q.onupgradeneeded = function () { var d = q.result; d.createObjectStore('koe', {keyPath: 'k'}); d.createObjectStore('bill', {keyPath: 'k'}); };
      q.onsuccess = function () { ok(q.result); }; q.onerror = function () { fejl(q.error); };
    });
    return DBP;
  }
  function idb(store, mode, f) {
    return db().then(function (d) { return new Promise(function (ok, fejl) {
      var t = d.transaction(store, mode), s = t.objectStore(store), res = f(s);
      t.oncomplete = function () { ok(res && res.result !== undefined ? res.result : undefined); }; t.onerror = function () { fejl(t.error); };
    }); });
  }
  function idbPut(store, o) { return idb(store, 'readwrite', function (s) { return s.put(o); }); }
  function idbGet(store, k) { return idb(store, 'readonly', function (s) { return s.get(k); }); }
  function idbSlet(store, k) { return idb(store, 'readwrite', function (s) { return s.delete(k); }); }
  function idbAlle(store) { return idb(store, 'readonly', function (s) { return s.getAll(); }); }

  /* ---------- Upload-kø ---------- */
  function koeStart() {
    if (KOE.koerer || !S.pin) return;
    KOE.koerer = true;
    (function naeste() {
      idbAlle('koe').then(function (l) {
        KOE.antal = l.length; maerker();
        if (!l.length) { KOE.koerer = false; return; }
        l.sort(function (a, b) { return a.t - b.t; });
        var e = l[0];
        return kald('rapportBillede', [S.pin, e.nr, e.k, e.navn, e.data]).then(function (r) {
          if (R && R.nr === e.nr) R.billeder[e.k] = [r.id, r.navn];
          return idbSlet('koe', e.k);
        }).then(function () {
          KOE.fejl = 0; prik(e.k, true); naeste();
        }).catch(function (err) {
          KOE.koerer = false; KOE.fejl++;
          if (/findes ikke|Ugyldigt/.test(err.message)) idbSlet('koe', e.k);
          maerker();
          setTimeout(koeStart, Math.min(60000, 3000 * KOE.fejl));
        });
      }).catch(function () { KOE.koerer = false; });
    })();
  }
  window.addEventListener('online', koeStart);
  setInterval(koeStart, 20000);
  setTimeout(koeStart, 4000);
  // Ryd gamle lokale kopier (over 21 dage og allerede uploadet)
  setTimeout(function () {
    Promise.all([idbAlle('bill'), idbAlle('koe')]).then(function (r) {
      var vent = {}; r[1].forEach(function (e) { vent[e.k] = 1; });
      r[0].forEach(function (b) { if (!vent[b.k] && Date.now() - b.t > 21 * 864e5) idbSlet('bill', b.k); });
    }).catch(function () {});
  }, 15000);

  /* ---------- Billeder ind ---------- */
  var MAKS = 1600;
  function formindsk(fil) {
    return new Promise(function (ok, fejl) {
      var url = URL.createObjectURL(fil), img = new Image();
      img.onload = function () {
        try {
          var w = img.naturalWidth, h = img.naturalHeight, f = Math.min(1, MAKS / Math.max(w, h));
          var c = document.createElement('canvas'); c.width = Math.round(w * f); c.height = Math.round(h * f);
          var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
          var m = document.createElement('canvas'), g = 320 / Math.max(c.width, c.height); m.width = Math.round(c.width * g); m.height = Math.round(c.height * g);
          m.getContext('2d').drawImage(c, 0, 0, m.width, m.height);
          URL.revokeObjectURL(url);
          ok({data: c.toDataURL('image/jpeg', 0.82), lille: m.toDataURL('image/jpeg', 0.7), t: fil.lastModified || Date.now()});
        } catch (e) { URL.revokeObjectURL(url); fejl(e); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); fejl(new Error('billede')); };
      img.src = url;
    });
  }
  // Læg ét foto i kø → returnerer billednøglen
  function nytFoto(fil, filnavn) {
    var nr = R.nr;
    return formindsk(fil).then(function (b) {
      var k = uid();
      THUMB[k] = b.lille;
      return idbPut('bill', {k: k, nr: nr, data: b.data, lille: b.lille, t: Date.now()})
        .then(function () { return idbPut('koe', {k: k, nr: nr, navn: filnavn, data: b.data, t: Date.now()}); })
        .then(function () { KOE.antal++; maerker(); koeStart(); return {k: k, t: b.t}; });
    });
  }
  function vaelgFiler(kamera, flere, cb) {
    var inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; if (kamera) inp.setAttribute('capture', 'environment'); if (flere) inp.multiple = true;
    inp.style.display = 'none';
    inp.onchange = function () {
      var l = [].slice.call(inp.files || []); inp.remove();
      if (l.length) cb(l);
    };
    document.body.appendChild(inp); inp.click();
  }
  // Flere filer → nøgler i rækkefølge (sorteret efter tidspunkt)
  function mangeFotos(filer, navnF) {
    filer.sort(function (a, b) { return (a.lastModified || 0) - (b.lastModified || 0); });
    toast(filer.length > 1 ? 'Klargør ' + filer.length + ' billeder …' : 'Klargør billedet …');
    var ud = [], i = 0;
    return new Promise(function (ok) {
      (function naeste() {
        if (i >= filer.length) return ok(ud);
        var n = i++;
        nytFoto(filer[n], navnF(n)).then(function (r) { ud.push(r.k); naeste(); })
          .catch(function () { toast('Et billede kunne ikke læses'); naeste(); });
      })();
    });
  }

  /* ---------- Miniaturer ---------- */
  function harBillede(k) { return !!(k && typeof k === 'string'); }
  function uploadet(k) { return !!(R && R.billeder[k]); }
  function thumbSrc(k) {
    if (THUMB[k]) return THUMB[k];
    var b = R && R.billeder[k];
    if (b && LINKS.l[b[0]]) return LINKS.l[b[0]].lille || LINKS.l[b[0]].stor || '';
    return '';
  }
  function hentLinks(tving) {
    if (!R) return Promise.resolve();
    var mangler = alleNoegler().some(function (k) { return !THUMB[k] && uploadet(k) && !LINKS.l[R.billeder[k][0]]; });
    if (!tving && !mangler && Date.now() - LINKS.t < 40 * 60000) return Promise.resolve();
    var nr = R.nr;
    return kald('rapportBilledLinks', [S.pin, nr]).then(function (r) {
      if (!R || R.nr !== nr) return;
      LINKS = {t: Date.now(), l: r.links || {}, nr: nr};
      alleNoegler().forEach(function (k) {
        var src = thumbSrc(k);
        [].slice.call(document.querySelectorAll('img[data-k="' + k + '"]')).forEach(function (im) { if (src && !im.getAttribute('src')) im.src = src; });
      });
    }).catch(function () {});
  }
  function alleNoegler() {
    var ud = [];
    if (!R) return ud;
    aktive(R.data.bygning).forEach(function (b) { if (harBillede(b.f)) ud.push(b.f); });
    aktive(R.data.lejl).forEach(function (l) {
      if (harBillede(l.idf)) ud.push(l.idf);
      aktive(l.komp).forEach(function (c) { aktive(c.par).forEach(function (p) { if (harBillede(p.foer)) ud.push(p.foer); if (harBillede(p.efter)) ud.push(p.efter); }); });
    });
    return ud;
  }
  function prik(k, ok) { [].slice.call(document.querySelectorAll('.dot[data-k="' + k + '"]')).forEach(function (d) { d.className = 'dot' + (ok ? ' ok' : ''); }); }
  function fotoHtml(k, knapper, ekstra) {
    var src = thumbSrc(k);
    return '<div class="r-foto"><img data-k="' + k + '"' + (src ? ' src="' + src + '"' : '') + ' alt="">' +
      '<span class="dot' + (uploadet(k) ? ' ok' : '') + '" data-k="' + k + '" title="' + (uploadet(k) ? 'Gemt i OneDrive' : 'Venter på upload') + '"></span>' +
      (knapper ? '<div class="ov">' + knapper + '</div>' : '') + (ekstra || '') + '</div>';
  }
  function tomHtml(lbl, naeste, kam, gal) {
    return '<div class="r-tom' + (naeste ? ' naeste' : '') + '">' + (lbl ? '<span>' + lbl + '</span>' : '') +
      '<div class="bk"><button class="p" onclick="' + kam + '" aria-label="Tag billede">' + ik('kamera') + '</button>' +
      '<button onclick="' + gal + '" aria-label="Vælg fra billeder">' + ik('billede') + '</button></div></div>';
  }

  /* ---------- Gem (automatisk) ---------- */
  function aendret(tegnIgen) {
    if (!R) return;
    R.dirty = true;
    try { localStorage.setItem('vxplan_rap|' + R.nr, JSON.stringify({v: R.version, d: R.data})); } catch (e) {}
    clearTimeout(GEM.timer); GEM.timer = setTimeout(gemNu, 1200);
    maerker();
    if (tegnIgen) tegn();
  }
  function gemNu() {
    if (!R || !R.dirty) return;
    if (GEM.travl) { GEM.igen = true; return; }
    GEM.travl = true; R.dirty = false; maerker();
    var nr = R.nr, snap = JSON.parse(JSON.stringify(R.data));
    kald('rapportGem', [S.pin, nr, snap, R.version, mig()]).then(function (r) {
      GEM.travl = false;
      if (!R || R.nr !== nr) return;
      if (r.konflikt) { R.data = flet(r.data, R.data); R.version = r.version; R.dirty = true; if (V.s !== 'start') tegn(); return gemNu(); }
      R.version = r.version; if (r.status) R.status = r.status; GEM.fejl = '';
      if (!R.dirty) try { localStorage.removeItem('vxplan_rap|' + nr); } catch (e) {}
      maerker();
      if (GEM.igen || R.dirty) { GEM.igen = false; gemNu(); }
    }).catch(function (e) {
      GEM.travl = false;
      if (!R || R.nr !== nr) return;
      GEM.fejl = e.message || 'ingen forbindelse';
      if (/kan kun rettes af ledelsen/.test(GEM.fejl)) { R.status = 'Indsendt'; R.dirty = false; tegn(); return; }
      R.dirty = true; maerker();
      setTimeout(gemNu, 8000);
    });
  }
  // Flet to udgaver (fx to medarbejdere på samme rapport): lister flettes efter id, lokale ændringer vinder
  function flet(s, l) {
    if (l === undefined) return s;
    if (Array.isArray(s) && Array.isArray(l)) {
      var m = {}, ud = [];
      s.forEach(function (x) { if (x && x.id) m[x.id] = x; });
      l.forEach(function (x) { if (x && x.id && m[x.id]) { ud.push(flet(m[x.id], x)); delete m[x.id]; } else ud.push(x); });
      s.forEach(function (x) { if (x && x.id && m[x.id]) ud.push(x); });
      return ud;
    }
    if (s && l && typeof s === 'object' && typeof l === 'object') {
      var o = {};
      Object.keys(s).forEach(function (k) { o[k] = s[k]; });
      Object.keys(l).forEach(function (k) { o[k] = (k in s) ? ((l[k] === null || l[k] === '') && s[k] ? s[k] : flet(s[k], l[k])) : l[k]; });
      return o;
    }
    return l;
  }
  function maerker() {
    var el = document.getElementById('r_gem'); if (!el) return;
    var t, kl = 'r-status';
    var vent = KOE.antal;
    if (GEM.fejl && R && R.dirty) { t = 'Ikke gemt endnu – prøver igen'; kl += ' fejl'; }
    else if (GEM.travl || (R && R.dirty)) t = 'Gemmer …';
    else t = 'Gemt ✓';
    if (vent) t += ' · ' + vent + ' billede' + (vent === 1 ? '' : 'r') + ' venter på upload' + (navigator.onLine === false ? ' (ingen net)' : '');
    el.className = kl; el.textContent = t;
  }

  /* ---------- Åbn / opret ---------- */
  function aabnRapport(nr, skaerm) {
    aabnArk('<div class="lille" style="padding:30px 0;text-align:center">Henter rapport …</div>');
    return kald('rapportHent', [S.pin, nr, mig()]).then(function (r) {
      R = {nr: nr, data: r.data, version: r.version, status: r.status, billeder: r.billeder || {}, mappe: r.mappe, pdf: r.pdf, kommentar: r.kommentar, historik: r.historik, dirty: false};
      LINKS = {t: 0, l: {}};
      try {
        var b = JSON.parse(localStorage.getItem('vxplan_rap|' + nr) || 'null');
        if (b && b.d && !laast()) { R.data = flet(R.data, b.d); R.dirty = true; setTimeout(gemNu, 500); }
      } catch (e) {}
      return idbAlle('bill').then(function (l) { l.forEach(function (x) { if (x.nr === nr) THUMB[x.k] = x.lille; }); }).catch(function () {});
    }).then(function () {
      V = {s: skaerm || 'rapport'}; tegn(); hentLinks();
    }).catch(function (e) { aabnArk('<h2>Kunne ikke åbne rapporten</h2><div class="under">' + esc(e.message) + '</div><div class="knapper"><button class="k" onclick="lukArk()">Luk</button></div>'); });
  }

  // Fra en opgave i kalenderen
  function start(o) {
    V = {s: 'start', tekst: o.tekst, dato: o.dato || idagTekst(), ref: o.ref, liste: null, info: null};
    var a = adresseForslag(o.tekst);
    V.adresse = a[0] || ''; V.valg = a; V.kunde = '';
    tegn();
    if (!o.tekst) V.liste = [];
    else kald('rapportListe', [S.pin, o.tekst, mig()]).then(function (r) { if (V.s === 'start' && V.tekst === o.tekst) { V.liste = r.rapporter; tegn(); } }).catch(function (e) { V.liste = []; V.fejl = e.message; tegn(); });
    kald('fotoInfo', [S.pin, o.tekst, '']).then(function (r) {
      if (V.s !== 'start' || V.tekst !== o.tekst) return;
      var ko = new Intl.Collator('en', {sensitivity: 'base'});
      r.kunder.sort(function (a, b) { return a === 'Øvrige' ? 1 : b === 'Øvrige' ? -1 : ko.compare(a, b); });
      V.info = r;
      if (r.tidligere) { V.kunde = r.tidligere.kunde; V.adresse = r.tidligere.adresse; }
      if (!V.kunde) V.kunde = gaetKunde(o.tekst, r.kunder);
      tegn();
    }).catch(function (e) { V.fejl = e.message; tegn(); });
  }
  function opret() {
    var k = document.getElementById('r_kunde'), a = document.getElementById('r_adr'), d = document.getElementById('r_dato'), om = document.getElementById('r_omr');
    var adr = rensAdresse(a ? a.value : '');
    if (!adr) { toast('Skriv adressen først'); return; }
    var b = document.getElementById('r_opret'); if (b) { b.disabled = true; b.textContent = 'Opretter …'; }
    kald('rapportNy', [S.pin, {kunde: k ? k.value : 'Øvrige', adresse: adr, dato: d ? d.value : V.dato, opgave: V.tekst || '', omraade: om ? om.value : '', navn: mig()}]).then(function (r) {
      R = {nr: r.data.nr, data: r.data, version: r.version, status: r.status, billeder: {}, mappe: r.mappe, pdf: '', kommentar: '', dirty: false};
      delete LISTE_CACHE[V.tekst || ''];
      V = {s: 'rapport'}; tegn();
    }).catch(function (e) { toast('Kunne ikke oprette: ' + e.message); if (b) { b.disabled = false; b.textContent = 'Start rapport'; } });
  }

  /* ---------- Gæt kunde og adresse (som ved skema-fotos) ---------- */
  function gaetKunde(t, kunder) {
    var s = String(t || '');
    if (/(^|[\s(])a\s?\/\s?b(?=[\s.,]|$)|andelsbolig/i.test(s)) return find(kunder, /^Andelsbolig/i);
    if (/(^|[\s(])e\s?\/\s?f(?=[\s.,]|$)|ejerforening/i.test(s)) return find(kunder, /^Ejerforening/i);
    var bedst = '', len = 0;
    kunder.forEach(function (k) {
      if (/^(Øvrige|Andelsbolig|Ejerforening)/i.test(k)) return;
      var navne = [k], f = k.split(/\s+/)[0];
      if (f !== k && /^[A-ZÆØÅ.]{2,}$/.test(f)) navne.push(f);
      navne.forEach(function (n) {
        var re = new RegExp('(^|[^a-zæøå0-9])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![a-zæøå])', 'i');
        if (re.test(s) && n.length > len) { bedst = k; len = n.length; }
      });
    });
    return bedst || 'Øvrige';
  }
  function find(l, re) { for (var i = 0; i < l.length; i++) if (re.test(l[i])) return l[i]; return 'Øvrige'; }
  function rensAdresse(t) {
    return String(t || '').replace(/"[^"]*"|“[^”]*”/g, ' ').replace(/\bkl\.?\s*\d{1,2}([.:]\d{2})?/gi, ' ')
      .replace(/\b\d{1,2}[:.]\d{2}\b(?!\s*[a-zæøå])/gi, ' ')
      .replace(/\b([AaEe])\s?\/\s?([BbFf])\b/g, function (m, a, b) { return a.toUpperCase() + b.toUpperCase(); })
      .replace(/[\\\/:*?"<>|#%]/g, ' ').replace(/\s+/g, ' ').replace(/^[\s,.-]+|[\s,.-]+$/g, '');
  }
  function adresseForslag(t) {
    var ud = [];
    String(t || '').split(/\s*\/\s*(?![BbFf]\b)/).map(rensAdresse).forEach(function (d) { if (d.length > 2 && ud.indexOf(d) < 0) ud.push(d); });
    if (!ud.length && rensAdresse(t)) ud.push(rensAdresse(t));
    return ud;
  }

  /* ---------- Tegning ---------- */
  function tegn() {
    FN = [];
    var lag = document.querySelector('#lag .ark'), sc = lag ? lag.scrollTop : 0, samme = lag && lag.getAttribute('data-r') === V.s + (V.lejl || '');
    var h = ({start: skStart, rapport: skRapport, lejl: skLejl, ny: skNy, indsend: skIndsend, liste: skListe, pdf: skPdf, retur: skRetur}[V.s] || skRapport)();
    aabnArk(h);
    var ark = document.querySelector('#lag .ark');
    if (ark) { ark.classList.add('r-bred'); ark.setAttribute('data-r', V.s + (V.lejl || '')); if (samme) ark.scrollTop = sc; }
    maerker();
  }
  function hoved(titel, under) {
    var h = '<div class="r-top">' + ik('rapport') + '<span>Fotorapport' + (R ? ' · ' + esc(R.nr) : '') + '</span>' +
      (R ? '<span class="r-chip ' + esc(R.status) + '">' + esc(R.status) + '</span>' : '') + '<span id="r_gem" class="r-status"></span></div>';
    return h + '<h2>' + titel + '</h2>' + (under ? '<div class="under">' + under + '</div>' : '');
  }

  function skStart() {
    var h = '<div class="over">' + ik('rapport') + 'Fotorapport · ' + esc(stort(langDato(V.dato))) + '</div>';
    h += '<h2>' + esc(V.tekst || 'Ny fotorapport') + '</h2>';
    if (V.liste && V.liste.length) {
      h += '<div class="r-sek">Rapporter på denne opgave</div><div class="r-liste">';
      V.liste.forEach(function (m) {
        h += '<div class="r-rk" onclick="' + fn(function () { aabnRapport(m.nr); }) + '"><span class="nv">' + esc(m.nr) + '</span>' +
          '<span class="info">' + esc(m.adresse) + ' · ' + esc(dmy(m.dato)) + ' · ' + m.antal + ' lejl.' + (m.med ? ' · ' + esc(m.med) : '') + '</span><span class="r-chip ' + esc(m.status) + '">' + esc(m.status) + '</span></div>';
      });
      h += '</div><div class="r-sek">Eller start en ny</div>';
    } else if (!V.liste) h += '<div class="lille" style="margin-top:10px">Henter …</div>';
    var info = V.info;
    if (V.fejl) h += '<div class="r-adv">' + esc(V.fejl) + '</div>';
    h += '<div class="r-felter"><div class="felt"><label>Kunde</label><select id="r_kunde">';
    (info ? info.kunder : [V.kunde || 'Øvrige']).forEach(function (k) { h += '<option' + (k === V.kunde ? ' selected' : '') + '>' + esc(k) + '</option>'; });
    h += '</select></div><div class="felt"><label>Dato</label><input type="date" id="r_dato" value="' + esc(V.dato) + '"></div></div>';
    h += '<div class="felt"><label>Adresse (bliver mappens navn)</label><input id="r_adr" list="r_adrl" value="' + esc(V.adresse) + '" placeholder="Fx Holbæk Have 6">';
    if (info) { h += '<datalist id="r_adrl">'; info.adresser.forEach(function (x) { h += '<option value="' + esc(x.adresse) + '">'; }); h += '</datalist>'; }
    if (V.valg && V.valg.length > 1) {
      h += '<div class="vaelg" style="margin-top:6px">';
      V.valg.forEach(function (v) { h += '<button type="button" class="chip" onclick="' + fn(function () { var a = document.getElementById('r_adr'); if (a) a.value = v; }) + '">' + esc(v) + '</button>'; });
      h += '</div>';
    }
    h += '</div><div class="felt"><label>Område (by – kommer på forsiden)</label><input id="r_omr" placeholder="Fx Holbæk"></div>';
    h += '<div class="knapper"><button class="k primaer f-stor" id="r_opret" onclick="' + fn(opret) + '"' + (info ? '' : ' disabled') + '>' + ik('plus') + 'Start rapport</button>' +
      '<button class="k" onclick="' + fn(function () { if (V.ref != null && REF[V.ref]) visDetalje(V.ref); else lukArk(); }) + '">Tilbage</button></div>';
    h += '<div class="lille" style="margin-top:10px">Fotos gemmes i OneDrive under Kunder › kunde › adresse › dato Fotorapport.</div>';
    return h;
  }

  function lejlInfo(l) {
    var par = 0, mangler = 0, fotos = 0;
    aktive(l.komp).forEach(function (c) { aktive(c.par).forEach(function (p) {
      var f = harBillede(p.foer), e = harBillede(p.efter);
      if (f || e) par++; if (f) fotos++; if (e) fotos++;
      if (f !== e) mangler++;
    }); });
    return {par: par, mangler: mangler, fotos: fotos};
  }
  function resChip(l) {
    if (!l.resultat) return '<span class="r-res">Ingen resultat</span>';
    return '<span class="r-res ' + (l.resultat === 'udfoert' ? 'udfoert' : 'ikke') + '">' + esc(RES_TEKST[l.resultat]) + '</span>';
  }

  function skRapport() {
    var d = R.data, lk = laast(), h = hoved(esc(d.adresse), esc(d.kunde) + ' · ' + esc(dmy(d.dato)));
    if (R.status === 'Returneret' && R.kommentar) h += '<div class="r-adv"><b>Sendt retur af ledelsen:</b> ' + esc(R.kommentar) + '</div>';
    if (lk) h += '<div class="r-ok">Rapporten er ' + esc(R.status.toLowerCase()) + '. Kun ledelsen kan rette i den nu.</div>';
    var lj = aktive(d.lejl), udf = 0, ikke = 0, adv = 0;
    lj.forEach(function (l) { if (l.resultat === 'udfoert') udf++; else if (l.resultat) ikke++; if (lejlInfo(l).mangler || !l.resultat) adv++; });
    // Bygning
    var byg = aktive(d.bygning);
    h += '<div class="r-sek"><span>Bygning og opgange (' + byg.length + ')</span></div><div class="r-grid">';
    byg.forEach(function (b, i) {
      var sel = lk ? '' : '<select onchange="' + fn(function (el) { b.tekst = el.value; aendret(); }) + '">' +
        ['BYGNING', 'DOKUMENTATION'].map(function (t) { return '<option' + (b.tekst === t ? ' selected' : '') + '>' + t + '</option>'; }).join('') + '</select>';
      var kn = lk ? '' : '<span></span><button onclick="' + fn(function () { b.slet = true; aendret(true); }) + '" aria-label="Slet">✕</button>';
      h += fotoHtml(b.f, kn, sel);
    });
    if (!lk) h += tomHtml(byg.length ? 'Flere' : 'Bygning / husnummer', false, fn(function () { bygFoto(true); }), fn(function () { bygFoto(false); }));
    h += '</div>';

    // Lejligheder
    h += '<div class="r-sek"><span>Lejligheder (' + lj.length + ')</span><span style="text-transform:none;letter-spacing:0">' + udf + ' udført · ' + ikke + ' ikke udført</span></div>';
    if (lj.length) {
      h += '<div class="r-liste">';
      lj.forEach(function (l) {
        var li = lejlInfo(l);
        h += '<div class="r-rk" onclick="' + fn(function () { V = {s: 'lejl', lejl: l.id}; tegn(); }) + '"><span class="nv">' + esc(l.navn) + '</span>' +
          '<span class="info">' + (li.par ? li.par + ' par' : 'ingen fotos') + (li.mangler ? ' · <span class="adv">mangler ' + li.mangler + ' foto' + (li.mangler === 1 ? '' : 's') + '</span>' : '') + '</span>' + resChip(l) + '<span class="pil-h">' + ik('hoejre') + '</span></div>';
      });
      h += '</div>';
    } else h += '<div class="lille" style="margin-top:8px">Ingen lejligheder endnu.</div>';
    if (!lk) h += '<div class="knapper"><button class="k primaer f-stor" onclick="' + fn(function () { V = {s: 'ny'}; tegn(); }) + '">' + ik('plus') + 'Lejlighed</button></div>';

    h += '<details class="r-forside"' + (d.sag || d.statusTekst || d.note ? ' open' : '') + '><summary class="r-sek" style="cursor:pointer">Forside i PDF\'en (sag, område, status, noter)</summary>';
    var dis = lk ? ' disabled' : '';
    h += '<div class="r-felter">' +
      '<div class="felt"><label>Sag / emne</label><input id="r_sag" value="' + esc(d.sag) + '"' + dis + ' onchange="' + fn(function (el) { d.sag = el.value; aendret(); }) + '"></div>' +
      '<div class="felt"><label>Område</label><input value="' + esc(d.omraade) + '"' + dis + ' onchange="' + fn(function (el) { d.omraade = el.value; aendret(); }) + '"></div>' +
      '<div class="felt"><label>Status (tekst på forsiden)</label><input value="' + esc(d.statusTekst) + '"' + dis + ' placeholder="Fx Udført" onchange="' + fn(function (el) { d.statusTekst = el.value; aendret(); }) + '"></div>' +
      '<div class="felt"><label>Dato</label><input type="date" value="' + esc(d.dato) + '"' + dis + ' onchange="' + fn(function (el) { if (el.value) { d.dato = el.value; aendret(); } }) + '"></div></div>' +
      '<div class="felt"><label>Noter generelt (kommer med på forsiden)</label><textarea' + dis + ' onchange="' + fn(function (el) { d.note = el.value; aendret(); }) + '">' + esc(d.note) + '</textarea></div>';
    h += '</details>';
    // Handlinger
    h += '<div class="r-sek">Afslut</div><div class="knapper" style="margin-top:8px">';
    if (!lk && !admin()) h += '<button class="k primaer" onclick="' + fn(function () { V = {s: 'indsend'}; tegn(); }) + '">Indsend til ledelsen</button>';
    if (admin()) {
      h += '<button class="k primaer" onclick="' + fn(function () { V = {s: 'pdf'}; tegn(); }) + '">' + (R.status === 'Godkendt' ? 'Lav PDF igen' : 'Godkend og lav PDF') + '</button>';
      if (R.status !== 'Returneret') h += '<button class="k" onclick="' + fn(function () { V = {s: 'retur'}; tegn(); }) + '">Send retur</button>';
      if (R.status === 'Kladde' || R.status === 'Returneret') h += '<button class="k" onclick="' + fn(function () { V = {s: 'indsend'}; tegn(); }) + '">Markér som indsendt</button>';
    }
    if (R.pdf) h += '<a class="k" href="' + esc(R.pdf) + '" target="_blank">' + ik('rapport') + 'Åbn PDF</a>';
    h += '<button class="k" onclick="' + fn(luk) + '">Luk</button></div>';
    h += '<div class="lille" style="margin-top:10px">Mappe: Ventilux App\\' + esc(String(R.mappe || '').replace(/\//g, '\\')) + '</div>';
    if (admin() && R.historik) h += '<details style="margin-top:8px"><summary class="lille" style="cursor:pointer">Historik</summary><div class="lille" style="white-space:pre-wrap;margin-top:6px">' + esc(R.historik) + '</div></details>';
    return h;
  }
  function bygFoto(kamera) {
    vaelgFiler(kamera, !kamera, function (filer) {
      var n0 = aktive(R.data.bygning).length;
      mangeFotos(filer, function (i) { return 'Bygning ' + (n0 + i + 1); }).then(function (ks) {
        ks.forEach(function (k, i) { R.data.bygning.push({id: uid(), f: k, tekst: (n0 + i) === 0 ? 'BYGNING' : 'DOKUMENTATION'}); });
        aendret(true);
      });
    });
  }

  function forslagNy() {
    var lj = aktive(R.data.lejl), sidst = lj[lj.length - 1];
    var f = {opgang: '', etage: 'ST', side: 'TV', komp: ['VENTIL']};
    if (!sidst) return f;
    f.opgang = sidst.opgang || '';
    f.komp = aktive(sidst.komp).map(function (c) { return c.navn; });
    if (!f.komp.length) f.komp = ['VENTIL'];
    var e = sidst.etage, s = sidst.side;
    if (ETAGER.indexOf(e) < 0 || SIDER.indexOf(s) < 0) { f.etage = e || 'ST'; f.side = ''; return f; }
    var brugt = {}; lj.forEach(function (l) { if ((l.opgang || '') === f.opgang) brugt[l.etage + ' ' + l.side] = 1; });
    var sider = SIDER.filter(function (x) { return lj.some(function (l) { return l.side === x && (l.opgang || '') === f.opgang; }); });
    if (sider.length < 2) sider = ['TV', 'TH'];
    var i = sider.indexOf(s);
    if (i >= 0 && i < sider.length - 1) { f.etage = e; f.side = sider[i + 1]; }
    else { f.etage = ETAGER[Math.min(ETAGER.length - 1, ETAGER.indexOf(e) + 1)]; f.side = sider[0]; }
    if (brugt[f.etage + ' ' + f.side]) f.side = '';
    return f;
  }
  function skNy() {
    if (!V.f) V.f = forslagNy();
    var f = V.f, opgange = [];
    aktive(R.data.lejl).forEach(function (l) { if (l.opgang && opgange.indexOf(l.opgang) < 0) opgange.push(l.opgang); });
    var navn = V.fri != null ? V.fri : ((f.opgang ? f.opgang + ' ' : '') + f.etage + (f.side ? ' ' + f.side : ''));
    var h = hoved('Ny lejlighed', 'Vælg etage og side – eller skriv navnet selv.');
    h += '<div class="felt"><label>Opgang / husnummer (valgfri)</label><div class="vaelg">';
    opgange.forEach(function (o) { h += '<button class="chip' + (f.opgang === o ? ' valgt' : '') + '" onclick="' + fn(function () { f.opgang = o; V.fri = null; tegn(); }) + '">' + esc(o) + '</button>'; });
    h += '<button class="chip' + (!f.opgang ? ' valgt' : '') + '" onclick="' + fn(function () { f.opgang = ''; V.fri = null; tegn(); }) + '">Ingen</button></div>' +
      '<input style="margin-top:8px" placeholder="Ny opgang, fx 57" onchange="' + fn(function (el) { f.opgang = el.value.trim(); V.fri = null; tegn(); }) + '"></div>';
    h += '<div class="felt"><label>Etage</label><div class="r-seg stor">';
    ETAGER.forEach(function (e) { h += '<button class="' + (f.etage === e ? 'on' : '') + '" onclick="' + fn(function () { f.etage = e; V.fri = null; tegn(); }) + '">' + e + '</button>'; });
    h += '</div></div><div class="felt"><label>Side</label><div class="r-seg stor">';
    SIDER.concat(['']).forEach(function (s) { h += '<button class="' + (f.side === s ? 'on' : '') + '" onclick="' + fn(function () { f.side = s; V.fri = null; tegn(); }) + '">' + (s || '–') + '</button>'; });
    h += '</div></div>';
    h += '<div class="felt"><label>Lejlighedens navn (står i PDF\'en som LEJL. …)</label><input id="r_lnavn" value="' + esc(navn) + '" oninput="' + fn(function (el) { V.fri = el.value; }) + '"></div>';
    h += '<div class="felt"><label>Komponenter</label><div class="vaelg">';
    KOMPONENTER.forEach(function (k) { h += '<button class="chip' + (f.komp.indexOf(k) >= 0 ? ' valgt' : '') + '" onclick="' + fn(function () { var i = f.komp.indexOf(k); if (i >= 0) f.komp.splice(i, 1); else f.komp.push(k); tegn(); }) + '">' + esc(k) + '</button>'; });
    h += '</div></div>';
    var dublet = aktive(R.data.lejl).some(function (l) { return l.navn.toLowerCase() === String(navn).trim().toLowerCase(); });
    if (dublet) h += '<div class="r-adv">Der findes allerede en lejlighed med det navn.</div>';
    h += '<div class="knapper"><button class="k primaer f-stor" onclick="' + fn(nyLejl) + '">' + ik('kamera') + 'Opret og tag billeder</button>' +
      '<button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Tilbage</button></div>';
    return h;
  }
  function nyLejl() {
    var f = V.f, el = document.getElementById('r_lnavn');
    var navn = String(el ? el.value : '').trim().replace(/\s+/g, ' ');
    if (!navn) { toast('Skriv lejlighedens navn'); return; }
    if (aktive(R.data.lejl).some(function (l) { return l.navn.toLowerCase() === navn.toLowerCase(); })) { toast('Den lejlighed findes allerede'); return; }
    var l = {id: uid(), navn: navn, opgang: f.opgang, etage: f.etage, side: f.side, resultat: '', idf: 0, note: '', af: mig(),
      komp: (f.komp.length ? f.komp : ['VENTIL']).map(function (k) { return {id: uid(), navn: k, par: [{id: uid(), foer: 0, efter: 0}]}; })};
    R.data.lejl.push(l);
    V = {s: 'lejl', lejl: l.id};
    aendret(true);
  }

  function findLejl(id) { var l = aktive(R.data.lejl); for (var i = 0; i < l.length; i++) if (l[i].id === id) return {l: l[i], i: i, alle: l}; return null; }
  function skLejl() {
    var x = findLejl(V.lejl);
    if (!x) { V = {s: 'rapport'}; return skRapport(); }
    var l = x.l, lk = laast(), h = '';
    h += '<div class="r-nav"><button onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">' + ik('pil') + 'Oversigt</button><span class="lille">' + (x.i + 1) + ' af ' + x.alle.length + '</span><span>' +
      (x.i > 0 ? '<button onclick="' + fn(function () { V = {s: 'lejl', lejl: x.alle[x.i - 1].id}; tegn(); }) + '" aria-label="Forrige">' + ik('pil') + '</button> ' : '') +
      (x.i < x.alle.length - 1 ? '<button onclick="' + fn(function () { V = {s: 'lejl', lejl: x.alle[x.i + 1].id}; tegn(); }) + '" aria-label="Næste">' + ik('hpil') + '</button>' : '') + '</span></div>';
    h += hoved('LEJL. ' + esc(l.navn), l.af ? 'Oprettet af ' + esc(l.af) : '');
    h += '<div class="felt"><label>Resultat</label><div class="r-seg">';
    RESULTAT.forEach(function (r) { h += '<button class="' + (l.resultat === r[0] ? 'on' : '') + '"' + (lk ? ' disabled' : '') + ' onclick="' + fn(function () { l.resultat = l.resultat === r[0] ? '' : r[0]; aendret(true); }) + '">' + r[1] + '</button>'; });
    h += '</div></div>';
    var ikkeUdf = l.resultat && l.resultat !== 'udfoert';
    h += '<div class="felt"><label>' + (ikkeUdf ? 'Foto af døren' : 'Dør / navneskilt (valgfrit)') + '</label><div class="r-grid">';
    if (harBillede(l.idf)) h += fotoHtml(l.idf, lk ? '' : '<span></span><button onclick="' + fn(function () { l.idf = 0; aendret(true); }) + '" aria-label="Fjern">✕</button>');
    else if (!lk) h += tomHtml(ikkeUdf ? 'Døren' : 'Dør / skilt', ikkeUdf, fn(function () { enkeltFoto(l, true); }), fn(function () { enkeltFoto(l, false); }));
    h += '</div></div>';

    if (!ikkeUdf) {
      var naeste = naesteTom(l);
      aktive(l.komp).forEach(function (c, ci) {
        h += '<div class="r-komp"><h4><span>' + esc(c.navn) + '</span>' + (lk ? '' : '<span>' +
          '<button class="r-mini" title="Vælg flere billeder – FØR/EFTER parres efter tidspunkt" onclick="' + fn(function () { flereFotos(l, c); }) + '">' + ik('billede') + '</button> ' +
          '<button class="r-mini" title="Fjern komponent" onclick="' + fn(function (el) { if (!el.getAttribute('data-ok')) { el.setAttribute('data-ok', 1); toast('Tryk igen for at fjerne ' + c.navn); return; } c.slet = true; aendret(true); }) + '">✕</button></span>') + '</h4>';
        aktive(c.par).forEach(function (p, pi) {
          h += '<div class="r-par">' + slot(l, c, p, 'foer', pi, naeste) +
            '<div class="mid">' + (lk ? '' : '<button class="r-mini" title="Byt FØR og EFTER" onclick="' + fn(function () { var t = p.foer; p.foer = p.efter; p.efter = t; aendret(true); }) + '">⇄</button>' +
            '<button class="r-mini" title="Fjern par" onclick="' + fn(function (el) { if ((harBillede(p.foer) || harBillede(p.efter)) && !el.getAttribute('data-ok')) { el.setAttribute('data-ok', 1); toast('Tryk igen for at fjerne parret'); return; } p.slet = true; aendret(true); }) + '">✕</button>') + '</div>' +
            slot(l, c, p, 'efter', pi, naeste) + '</div>';
        });
        if (!lk) h += '<div class="knapper" style="margin-top:10px"><button class="k" onclick="' + fn(function () { c.par.push({id: uid(), foer: 0, efter: 0}); aendret(true); }) + '">' + ik('plus') + 'Par mere</button></div>';
        h += '</div>';
      });
      if (!lk) {
        h += '<div class="felt"><label>Tilføj komponent</label><div class="vaelg">';
        KOMPONENTER.forEach(function (k) { h += '<button class="chip" onclick="' + fn(function () { l.komp.push({id: uid(), navn: k, par: [{id: uid(), foer: 0, efter: 0}]}); aendret(true); }) + '">+ ' + esc(k) + '</button>'; });
        h += '<button class="chip" onclick="' + fn(function () { var n = prompt('Navn på komponent'); if (n && n.trim()) { l.komp.push({id: uid(), navn: n.trim().toUpperCase(), par: [{id: uid(), foer: 0, efter: 0}]}); aendret(true); } }) + '">+ Andet …</button></div></div>';
      }
    }
    h += '<div class="felt"><label>Bemærkning (intern – kommer ikke med i PDF\'en)</label><input value="' + esc(l.note) + '"' + (lk ? ' disabled' : '') + ' onchange="' + fn(function (el) { l.note = el.value; aendret(); }) + '"></div>';
    h += '<div class="knapper">';
    if (!lk) h += '<button class="k primaer f-stor" onclick="' + fn(function () {
      if (x.i < x.alle.length - 1) { V = {s: 'lejl', lejl: x.alle[x.i + 1].id}; } else { V = {s: 'ny'}; }
      tegn();
    }) + '">' + (x.i < x.alle.length - 1 ? 'Næste lejlighed' : ik('plus') + 'Ny lejlighed') + '</button>';
    h += '<button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Oversigt</button></div>';
    if (!lk) h += '<div class="knapper" style="margin-top:10px"><button class="k" onclick="' + fn(function () { var n = prompt('Lejlighedens navn', l.navn); if (n && n.trim()) { l.navn = n.trim(); aendret(true); } }) + '">Omdøb</button>' +
      '<button class="k fare" onclick="' + fn(function (el) { if (!el.getAttribute('data-ok')) { el.setAttribute('data-ok', 1); el.textContent = 'Tryk igen for at slette'; return; } l.slet = true; V = {s: 'rapport'}; aendret(true); }) + '">Slet lejlighed</button></div>';
    return h;
  }
  function naesteTom(l) {
    var cs = aktive(l.komp);
    for (var i = 0; i < cs.length; i++) { var ps = aktive(cs[i].par); for (var j = 0; j < ps.length; j++) { if (!harBillede(ps[j].foer)) return ps[j].id + 'foer'; if (!harBillede(ps[j].efter)) return ps[j].id + 'efter'; } }
    return '';
  }
  function slot(l, c, p, side, pi, naeste) {
    var lbl = '<div class="r-lbl ' + (side === 'foer' ? 'f' : 'e') + '">' + (side === 'foer' ? 'FØR' : 'EFTER') + '</div>';
    var k = p[side];
    if (harBillede(k)) return '<div>' + lbl + fotoHtml(k, laast() ? '' : '<button onclick="' + fn(function () { parFoto(l, c, p, side, pi, true); }) + '" aria-label="Tag om">' + ik('kamera') + '</button>' +
      '<button onclick="' + fn(function () { p[side] = 0; aendret(true); }) + '" aria-label="Fjern">✕</button>') + '</div>';
    if (laast()) return '<div>' + lbl + '<div class="r-tom"><span>Mangler</span></div></div>';
    return '<div>' + lbl + tomHtml('', naeste === p.id + side, fn(function () { parFoto(l, c, p, side, pi, true); }), fn(function () { parFoto(l, c, p, side, pi, false); })) + '</div>';
  }
  function fotoNavn(l, c, pi, side) { return 'Lejl ' + l.navn + ' - ' + stort(c.navn.toLowerCase()) + ' ' + (pi + 1) + ' ' + (side === 'foer' ? 'FØR' : 'EFTER'); }
  function parFoto(l, c, p, side, pi, kamera) {
    var nr = R.nr;
    vaelgFiler(kamera, false, function (filer) {
      mangeFotos(filer.slice(0, 1), function () { return fotoNavn(l, c, pi, side); }).then(function (ks) {
        if (!R || R.nr !== nr || !ks[0]) return;
        p[side] = ks[0];
        if (!l.resultat) l.resultat = 'udfoert';
        aendret(V.s === 'lejl');
      });
    });
  }
  function enkeltFoto(l, kamera) {
    var nr = R.nr;
    vaelgFiler(kamera, false, function (filer) {
      mangeFotos(filer.slice(0, 1), function () { return 'Lejl ' + l.navn + ' - ' + (l.resultat && l.resultat !== 'udfoert' ? RES_TEKST[l.resultat] : 'Dør'); }).then(function (ks) {
        if (!R || R.nr !== nr || !ks[0]) return;
        l.idf = ks[0]; aendret(V.s === 'lejl');
      });
    });
  }
  // Mange billeder på én gang: sorteres efter tidspunkt og fyldes i tomme felter FØR, EFTER, FØR, EFTER …
  function flereFotos(l, c) {
    var nr = R.nr;
    vaelgFiler(false, true, function (filer) {
      var pladser = [];
      aktive(c.par).forEach(function (p) { if (!harBillede(p.foer)) pladser.push([p, 'foer']); if (!harBillede(p.efter)) pladser.push([p, 'efter']); });
      var n = aktive(c.par).length;
      while (pladser.length < filer.length) { var p = {id: uid(), foer: 0, efter: 0}; c.par.push(p); pladser.push([p, 'foer'], [p, 'efter']); }
      var par = aktive(c.par);
      mangeFotos(filer, function (i) { var ps = pladser[i]; return fotoNavn(l, c, par.indexOf(ps[0]), ps[1]); }).then(function (ks) {
        if (!R || R.nr !== nr) return;
        ks.forEach(function (k, i) { pladser[i][0][pladser[i][1]] = k; });
        c.par = c.par.filter(function (p, i) { return i < n || harBillede(p.foer) || harBillede(p.efter); });
        if (ks.length && !l.resultat) l.resultat = 'udfoert';
        aendret(V.s === 'lejl');
        toast(ks.length + ' billeder lagt ind – tjek at FØR og EFTER passer (⇄ bytter)');
      });
    });
  }

  /* ---------- Indsend (tjek først) ---------- */
  function tjek() {
    var lj = aktive(R.data.lejl), adv = [], udf = 0, ikke = 0;
    lj.forEach(function (l) {
      var li = lejlInfo(l);
      if (l.resultat === 'udfoert') udf++; else if (l.resultat) ikke++;
      if (!l.resultat) adv.push(['LEJL. ' + l.navn, 'har intet resultat (udført / ikke hjemme …)', l.id]);
      if (l.resultat === 'udfoert' && !li.fotos) adv.push(['LEJL. ' + l.navn, 'er markeret udført men har ingen fotos', l.id]);
      if (l.resultat === 'udfoert' && li.mangler) adv.push(['LEJL. ' + l.navn, 'mangler ' + li.mangler + ' FØR/EFTER-foto' + (li.mangler === 1 ? '' : 's'), l.id]);
    });
    if (!lj.length) adv.push(['Rapporten', 'har ingen lejligheder', '']);
    var vent = alleNoegler().filter(function (k) { return !uploadet(k); }).length;
    return {lj: lj.length, udf: udf, ikke: ikke, adv: adv, vent: vent};
  }
  function skIndsend() {
    var t = tjek(), h = hoved('Indsend rapporten', esc(R.data.adresse));
    h += '<div class="r-ok"><b>' + t.lj + ' lejlighed' + (t.lj === 1 ? '' : 'er') + ':</b> ' + t.udf + ' udført, ' + t.ikke + ' ikke udført.</div>';
    if (t.vent) h += '<div class="r-adv"><b>' + t.vent + ' billede' + (t.vent === 1 ? '' : 'r') + ' er ikke uploadet endnu.</b> Hold appen åben med net, så sendes de automatisk. Du kan indsende, når alle er oppe.</div>';
    t.adv.forEach(function (a) { h += '<div class="r-adv" style="cursor:pointer" onclick="' + fn(function () { if (a[2]) { V = {s: 'lejl', lejl: a[2]}; tegn(); } }) + '"><b>' + esc(a[0]) + '</b> ' + esc(a[1]) + (a[2] ? ' – tryk for at rette' : '') + '</div>'; });
    h += '<div class="knapper"><button class="k primaer f-stor"' + (t.vent ? ' disabled' : '') + ' onclick="' + fn(function (el) {
      el.disabled = true; el.textContent = 'Indsender …';
      gemNu();
      kald('rapportStatus', [S.pin, R.nr, 'Indsendt', '', mig()]).then(function (r) {
        R.status = 'Indsendt'; R.version = r.version || R.version; delete LISTE_CACHE[R.data.opgave || ''];
        toast('Rapporten er sendt til ledelsen ✓'); V = {s: 'rapport'}; tegn();
      }).catch(function (e) { toast('Kunne ikke indsende: ' + e.message); el.disabled = false; el.textContent = 'Indsend'; });
    }) + '">' + (t.adv.length ? 'Indsend alligevel' : 'Indsend') + '</button><button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Tilbage</button></div>';
    return h;
  }
  function skRetur() {
    var h = hoved('Send retur til medarbejderen', esc(R.data.adresse));
    h += '<div class="felt"><label>Hvad skal rettes?</label><textarea id="r_komm" placeholder="Fx: Mangler EFTER-foto i 1 TH"></textarea></div>';
    h += '<div class="knapper"><button class="k primaer" onclick="' + fn(function (el) {
      var k = (document.getElementById('r_komm') || {}).value || '';
      if (!k.trim()) { toast('Skriv hvad der skal rettes'); return; }
      el.disabled = true;
      kald('rapportStatus', [S.pin, R.nr, 'Returneret', k, mig()]).then(function (r) { R.status = 'Returneret'; R.kommentar = k; R.version = r.version || R.version; toast('Sendt retur'); V = {s: 'rapport'}; tegn(); })
        .catch(function (e) { el.disabled = false; toast(e.message); });
    }) + '">Send retur</button><button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Annullér</button></div>';
    return h;
  }

  /* ---------- Ledelsen: alle fotorapporter ---------- */
  function liste() {
    V = {s: 'liste', filter: admin() ? 'Indsendt' : 'Alle', soeg: '', rap: null};
    tegn();
    kald('rapportListe', [S.pin, '', mig()]).then(function (r) {
      if (V.s !== 'liste') return;
      V.rap = r.rapporter;
      if (admin() && !V.rap.some(function (m) { return m.status === 'Indsendt'; })) V.filter = 'Alle';
      tegn();
    }).catch(function (e) { V.rap = []; V.fejl = e.message; tegn(); });
  }
  function skListe() {
    R = null;
    var h = '<div class="over">' + ik('rapport') + 'Fotorapporter</div><h2>' + (admin() ? 'Alle fotorapporter' : 'Mine fotorapporter') + '</h2>';
    if (!V.rap) return h + '<div class="lille" style="padding:20px 0">Henter …</div>';
    var ant = {}; V.rap.forEach(function (m) { ant[m.status] = (ant[m.status] || 0) + 1; });
    h += '<div class="r-filter">';
    ['Alle', 'Indsendt', 'Kladde', 'Returneret', 'Godkendt'].forEach(function (f) {
      h += '<button class="chip' + (V.filter === f ? ' valgt' : '') + '" onclick="' + fn(function () { V.filter = f; tegn(); }) + '">' + f + (f === 'Alle' ? ' (' + V.rap.length + ')' : ant[f] ? ' (' + ant[f] + ')' : '') + '</button>';
    });
    h += '</div><div class="felt"><input placeholder="Søg på adresse, kunde, nummer eller medarbejder" value="' + esc(V.soeg) + '" oninput="' + fn(function (el) { V.soeg = el.value; var s = el.selectionStart; tegn(); var n = document.querySelector('#lag .felt input'); if (n) { n.focus(); n.setSelectionRange(s, s); } }) + '"></div>';
    var q = V.soeg.trim().toLowerCase();
    var l = V.rap.filter(function (m) { return (V.filter === 'Alle' || m.status === V.filter) && (!q || (m.nr + ' ' + m.adresse + ' ' + m.kunde + ' ' + m.med + ' ' + m.opgave).toLowerCase().indexOf(q) >= 0); });
    if (V.fejl) h += '<div class="r-adv">' + esc(V.fejl) + '</div>';
    if (!l.length) h += '<div class="lille" style="padding:20px 0">Ingen rapporter her.</div>';
    else {
      h += '<div class="r-liste">';
      l.forEach(function (m) {
        h += '<div class="r-rk" onclick="' + fn(function () { aabnRapport(m.nr); }) + '"><span class="nv">' + esc(m.adresse) + '<div class="lille" style="font-weight:400">' + esc(m.nr) + ' · ' + esc(m.kunde) + '</div></span>' +
          '<span class="info">' + esc(dmy(m.dato)) + ' · ' + m.antal + ' lejl. (' + m.udfoert + ' udført' + (m.ikke ? ', ' + m.ikke + ' ikke' : '') + ')' + (m.med ? '<br>' + esc(m.med) : '') + '</span>' +
          '<span class="r-chip ' + esc(m.status) + '">' + esc(m.status) + '</span></div>';
      });
      h += '</div>';
    }
    h += '<div class="knapper"><button class="k" onclick="' + fn(function () { start({tekst: '', dato: idagTekst()}); }) + '">' + ik('plus') + 'Ny rapport uden opgave</button><button class="k" onclick="lukArk()">Luk</button></div>';
    return h;
  }

  /* ---------- PDF (som Ventilux Pro) ---------- */
  function skPdf() {
    var t = tjek(), h = hoved(R.status === 'Godkendt' ? 'Lav PDF igen' : 'Godkend og lav PDF', esc(R.data.adresse));
    if (!V.koer) {
      h += '<div class="r-ok"><b>' + t.lj + ' lejligheder:</b> ' + t.udf + ' udført, ' + t.ikke + ' ikke udført.</div>';
      if (t.vent) h += '<div class="r-adv">' + t.vent + ' billede' + (t.vent === 1 ? '' : 'r') + ' er endnu ikke uploadet fra medarbejderens telefon og kommer ikke med.</div>';
      t.adv.forEach(function (a) { h += '<div class="r-adv"><b>' + esc(a[0]) + '</b> ' + esc(a[1]) + '</div>'; });
      h += '<div class="lille" style="margin-top:12px">PDF\'en laves her på enheden og gemmes i rapportens mappe i OneDrive. Det tager typisk 10–60 sekunder.</div>';
      h += '<div class="knapper"><button class="k primaer f-stor" onclick="' + fn(function () { V.koer = {pct: 0, tekst: 'Starter …'}; tegn(); godkend(); }) + '">' + (R.status === 'Godkendt' ? 'Lav PDF' : 'Godkend og lav PDF') + '</button>' +
        '<button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Tilbage</button></div>';
      return h;
    }
    var k = V.koer;
    if (k.fejl) h += '<div class="r-adv">' + esc(k.fejl) + '</div>';
    if (k.faerdig) {
      h += '<div class="r-ok"><b>PDF\'en er gemt ✓</b><br>' + esc(k.mappe || '') + '\\' + esc(k.navn || '') + '</div>';
      h += '<div class="knapper">' + (k.link ? '<a class="k primaer" href="' + esc(k.link) + '" target="_blank">Åbn i OneDrive</a>' : '') +
        (k.blobUrl ? '<a class="k" href="' + k.blobUrl + '" download="' + esc(k.navn || 'Fotodokumentation.pdf') + '">Hent PDF</a>' : '') +
        '<button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Tilbage til rapporten</button></div>';
    } else {
      h += '<div class="r-bar"><i id="r_pct" style="width:' + Math.round(k.pct * 100) + '%"></i></div><div class="lille" id="r_ptxt" style="margin-top:8px">' + esc(k.tekst) + '</div>';
      if (k.fejl) h += '<div class="knapper"><button class="k primaer" onclick="' + fn(function () { V.koer = {pct: 0, tekst: 'Starter …'}; tegn(); godkend(); }) + '">Prøv igen</button><button class="k" onclick="' + fn(function () { V = {s: 'rapport'}; tegn(); }) + '">Tilbage</button></div>';
    }
    return h;
  }
  function fremdrift(pct, tekst) {
    if (!V.koer) return; V.koer.pct = pct; V.koer.tekst = tekst;
    var a = document.getElementById('r_pct'), b = document.getElementById('r_ptxt');
    if (a) a.style.width = Math.round(pct * 100) + '%'; if (b) b.textContent = tekst;
  }
  function godkend() {
    var nr = R.nr;
    gemNu();
    VXPDF.lav(R, fremdrift).then(function (res) {
      fremdrift(0.9, 'Gemmer PDF i OneDrive …');
      return upload(nr, res.blob).then(function (u) {
        return kald('rapportStatus', [S.pin, nr, 'Godkendt', '', mig()]).then(function (s) {
          if (R && R.nr === nr) { R.status = 'Godkendt'; R.pdf = u.link || R.pdf; R.version = s.version || R.version; }
          V.koer = {faerdig: true, link: u.link, navn: u.navn, mappe: u.mappe, blobUrl: URL.createObjectURL(res.blob), pct: 1};
          if (V.s === 'pdf') tegn();
        });
      });
    }).catch(function (e) { if (V.koer) { V.koer.fejl = 'PDF kunne ikke laves: ' + (e && e.message || e); tegn(); } });
  }
  function upload(nr, blob) {
    var DEL = 3276800;
    return blob.arrayBuffer().then(function (buf) {
      var bytes = new Uint8Array(buf), n = Math.max(1, Math.ceil(bytes.length / DEL)), i = 0;
      return new Promise(function (ok, fejl) {
        (function naeste() {
          var stk = bytes.subarray(i * DEL, Math.min(bytes.length, (i + 1) * DEL)), s = '';
          for (var j = 0; j < stk.length; j += 32768) s += String.fromCharCode.apply(null, stk.subarray(j, j + 32768));
          kald('rapportPdf', [S.pin, nr, i, n, bytes.length, btoa(s)]).then(function (r) {
            i++; fremdrift(0.9 + 0.09 * i / n, 'Gemmer PDF i OneDrive … ' + Math.round(100 * i / n) + '%');
            if (r.faerdig) ok(r); else if (i < n) naeste(); else fejl(new Error('Upload ufuldstændig'));
          }).catch(fejl);
        })();
      });
    });
  }

  function luk() {
    if (R && R.dirty) gemNu();
    var tekst = R && R.data && R.data.opgave;
    R = null; V = {s: 'start'};
    lukArk();
    if (tekst) delete LISTE_CACHE[tekst];
  }

  /* ---------- Knapper i opgaven og menuen ---------- */
  var origDetalje = window.visDetalje;
  window.visDetalje = function (i) {
    origDetalje(i);
    var r = REF[i]; if (!r) return;
    var tekst = r.t === 'opg' ? r.o.tekst : r.s.kunde;
    if (!tekst || (r.t === 'opg' && erFri(tekst))) return;
    var k = document.querySelector('#lag .knapper'); if (!k) return;
    var b = document.createElement('button');
    b.className = 'k'; b.id = 'r_opgknap'; b.innerHTML = ik('rapport') + 'Fotorapport';
    b.onclick = function () { start({tekst: tekst, dato: r.dato, ref: i}); };
    var p = k.querySelector('.primaer');
    k.insertBefore(b, p ? p.nextSibling : k.firstChild);
    var c = LISTE_CACHE[tekst];
    var vis = function (l) {
      var el = document.getElementById('r_opgknap'); if (!el || !l || !l.length) return;
      var m = l[0];
      el.innerHTML = ik('rapport') + 'Fotorapport · ' + esc(m.status) + (m.antal ? ' (' + m.antal + ')' : '');
      if (m.status === 'Returneret') el.style.borderColor = '#e5484d';
    };
    if (c && Date.now() - c.t < 60000) vis(c.l);
    else kald('rapportListe', [S.pin, tekst, mig()]).then(function (res) { LISTE_CACHE[tekst] = {t: Date.now(), l: res.rapporter}; vis(res.rapporter); }).catch(function () {});
  };
  var origMenu = window.visMenu;
  window.visMenu = function () {
    origMenu();
    var k = document.querySelector('#lag .knapper'); if (!k) return;
    var b = document.createElement('button');
    b.className = 'k'; b.innerHTML = ik('rapport') + (admin() ? 'Fotorapporter' : 'Mine fotorapporter') + '<span id="r_menutal"></span>';
    b.onclick = liste;
    k.insertBefore(b, k.firstChild);
    if (admin()) kald('rapportListe', [S.pin, '', mig()]).then(function (r) {
      var n = r.rapporter.filter(function (m) { return m.status === 'Indsendt'; }).length, el = document.getElementById('r_menutal');
      if (el && n) el.innerHTML = '<span class="tal">' + n + ' venter</span>';
    }).catch(function () {});
  };

  window.VXR = {
    f: function (i, el, ev) { if (ev && ev.stopPropagation && el && el.tagName === 'BUTTON') ev.stopPropagation(); var f = FN[i]; if (f) f(el, ev); },
    start: start, aabn: aabnRapport, liste: liste,
    _t: {flet: flet, forslagNy: function () { return forslagNy(); }, gaetKunde: gaetKunde, adresseForslag: adresseForslag, tjek: function () { return tjek(); }, R: function () { return R; }}
  };
  window.addEventListener('beforeunload', function (e) { if (R && R.dirty) { gemNu(); e.preventDefault(); e.returnValue = ''; } });
})();

/* ===================== PDF-motor (layout målt fra Ventilux Pros "Holbæk Have 6") ===================== */
var VXPDF = (function () {
  var BLAA = [0, 82, 255], BG = [242, 244, 246], LBL = [226, 232, 240], BUND = 688;
  var JSPDF = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  function hentScript(src) {
    if (window.jspdf) return Promise.resolve();
    return new Promise(function (ok, fejl) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = function () { fejl(new Error('Kunne ikke hente PDF-værktøjet')); }; document.head.appendChild(s); });
  }
  function kald(fn, args) {
    return fetch(API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({fn: fn, args: args})})
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (r) { if (r && (r.__fejl || r.fejl)) throw new Error(r.__fejl || r.fejl); return r; });
  }
  function aktive(l) { return (l || []).filter(function (x) { return x && !x.slet; }); }
  function har(k) { return !!(k && typeof k === 'string'); }
  function dmy(d) { var s = String(d || '').split('-'); return s.length === 3 ? s[2] + '/' + s[1] + '/' + s[0] : d; }

  // Billede → beskåret JPEG i præcis skabelonens format (dækker feltet, centreret)
  function beskaer(src, w, h) {
    return new Promise(function (ok, fejl) {
      var img = new Image();
      img.onload = function () {
        var c = document.createElement('canvas'); c.width = w; c.height = h;
        var x = c.getContext('2d'), s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        var sw = w / s, sh = h / s;
        x.fillStyle = '#fff'; x.fillRect(0, 0, w, h);
        x.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, w, h);
        ok(c.toDataURL('image/jpeg', 0.86));
      };
      img.onerror = function () { fejl(new Error('billede')); };
      img.src = src;
    });
  }
  function blobTilUrl(b) { return new Promise(function (ok) { var r = new FileReader(); r.onload = function () { ok(r.result); }; r.readAsDataURL(b); }); }

  // Hent alle billeder: fra denne enhed hvis muligt, ellers fra OneDrive
  function hentBilleder(R, noegler, frem) {
    var ud = {}, mangler = [];
    var dbp = new Promise(function (ok) {
      try {
        var q = indexedDB.open('vxplan_rapport', 1);
        q.onupgradeneeded = function () { var d = q.result; d.createObjectStore('koe', {keyPath: 'k'}); d.createObjectStore('bill', {keyPath: 'k'}); };
        q.onsuccess = function () { ok(q.result); }; q.onerror = function () { ok(null); };
      } catch (e) { ok(null); }
    });
    return dbp.then(function (d) {
      return Promise.all(noegler.map(function (k) {
        if (!d) return null;
        return new Promise(function (ok) { var g = d.transaction('bill').objectStore('bill').get(k); g.onsuccess = function () { if (g.result) ud[k] = g.result.data; ok(); }; g.onerror = function () { ok(); }; });
      }));
    }).then(function () {
      mangler = noegler.filter(function (k) { return !ud[k] && R.billeder[k]; });
      if (!mangler.length) return;
      return kald('rapportBilledLinks', [S.pin, R.nr]).then(function (r) {
        var links = r.links || {}, i = 0, faerdig = 0, direkteFejl = [];
        return new Promise(function (ok) {
          function en() {
            if (i >= mangler.length) return;
            var k = mangler[i++], id = R.billeder[k][0], l = links[id];
            (l && l.url ? fetch(l.url).then(function (x) { if (!x.ok) throw 0; return x.blob(); }).then(blobTilUrl) : Promise.reject())
              .then(function (u) { ud[k] = u; }).catch(function () { direkteFejl.push(k); })
              .then(function () { faerdig++; frem(0.05 + 0.45 * faerdig / mangler.length, 'Henter billeder fra OneDrive … ' + faerdig + ' af ' + mangler.length); if (faerdig === mangler.length) ok(direkteFejl); else en(); });
          }
          for (var n = 0; n < 4; n++) en();
        });
      }).then(function (fejlede) {
        // Reserve: via serveren, 6 ad gangen
        var grupper = [];
        for (var i = 0; i < fejlede.length; i += 6) grupper.push(fejlede.slice(i, i + 6));
        return grupper.reduce(function (p, g) {
          return p.then(function () {
            return kald('rapportBilledHent', [S.pin, g.map(function (k) { return R.billeder[k][0]; })]).then(function (r) {
              g.forEach(function (k) { var b = r.billeder[R.billeder[k][0]]; if (b) ud[k] = 'data:image/jpeg;base64,' + b; });
            });
          });
        }, Promise.resolve());
      });
    }).then(function () { return ud; });
  }

  function lav(R, frem) {
    var d = R.data, noegler = [], logo = null;
    aktive(d.bygning).forEach(function (b) { if (har(b.f)) noegler.push(b.f); });
    aktive(d.lejl).forEach(function (l) {
      if (har(l.idf)) noegler.push(l.idf);
      if (!l.resultat || l.resultat === 'udfoert') aktive(l.komp).forEach(function (c) { aktive(c.par).forEach(function (p) { if (har(p.foer)) noegler.push(p.foer); if (har(p.efter)) noegler.push(p.efter); }); });
    });
    frem(0.02, 'Henter PDF-værktøj …');
    return hentScript(JSPDF).then(function () {
      return kald('rapportLogo', [S.pin]).then(function (r) { logo = 'data:image/png;base64,' + r.png; }).catch(function () {});
    }).then(function () {
      return hentBilleder(R, noegler, frem);
    }).then(function (bill) {
      frem(0.5, 'Bygger siderne …');
      return byg(d, bill, logo, frem);
    });
  }

  function byg(d, bill, logo, frem) {
    var doc = new window.jspdf.jsPDF({unit: 'pt', format: 'letter', compress: true});
    var W = 612, y = null, efter = 'top', sideNr = 1;
    function bg() { doc.setFillColor(BG[0], BG[1], BG[2]); doc.rect(0, 0, W, 792, 'F'); }
    function nySide() { doc.addPage('letter'); sideNr++; bg(); y = null; efter = 'top'; }
    function tekst(t, x, baseline, opt) {
      opt = opt || {};
      doc.setFont(opt.font || 'times', opt.stil || 'bold'); doc.setFontSize(opt.str || 11);
      var c = opt.farve || BLAA; doc.setTextColor(c[0], c[1], c[2]);
      doc.text(String(t), x, baseline, {align: opt.align || 'center', maxWidth: opt.maks});
    }
    function overskrift(t) { tekst(t, W / 2, 56.5, {font: 'helvetica', str: 28}); y = 108.1; efter = 'overskrift'; }
    function plads(hoejde) { return y + hoejde <= BUND; }
    function startY(type) {
      if (y === null) return type === 'sub' ? 30.8 : 36;
      if (efter === 'kort') return y + (type === 'kort' ? 41.5 : type === 'sub' ? 11.9 : 20);
      if (efter === 'enkelt' && type === 'kort') return y + 17.7;
      return y;
    }
    var jobs = [];
    function enkelt(k, caption) {
      var top = startY('enkelt');
      if (top + 150 > BUND) { nySide(); top = 36; }
      if (bill[k]) jobs.push({k: k, w: 600, h: 338, x: 198, y: top, bw: 216, bh: 121.5, side: sideNr});
      tekst(caption, W / 2, top + 135.6 + 8.6);
      y = top + 185.3; efter = 'enkelt';
    }
    function sub(t) {
      var top = startY('sub');
      if (top + 47.6 + 173.2 > BUND) { nySide(); top = 30.8; }
      tekst(t, W / 2, top + 8.6);
      y = top + 47.6; efter = 'sub';
    }
    function kort(a, b, capA, capB) {
      var top = startY('kort');
      if (top + 173.2 > BUND) { nySide(); top = 36; }
      doc.setFillColor(255, 255, 255); doc.rect(36, top, 540.2, 173.2, 'F');
      if (b === undefined) {
        if (bill[a]) jobs.push({k: a, w: 680, h: 383, x: 183.6, y: top, bw: 244.8, bh: 137.7, side: sideNr});
        tekst(capA, W / 2, top + 151.6 + 7.9, {str: 10.1});
      } else {
        if (a && bill[a]) jobs.push({k: a, w: 680, h: 383, x: 48.6, y: top, bw: 244.8, bh: 137.7, side: sideNr});
        if (b && bill[b]) jobs.push({k: b, w: 680, h: 383, x: 318.6, y: top, bw: 244.8, bh: 137.7, side: sideNr});
        if (a) tekst(capA, 171, top + 151.6 + 7.9, {str: 10.1});
        if (b) tekst(capB, 441, top + 151.6 + 7.9, {str: 10.1});
      }
      y = top + 173.2; efter = 'kort';
    }

    // Forside
    bg();
    if (logo) { try { var lp = doc.getImageProperties(logo), lw = 240, lh = lw * lp.height / lp.width; doc.addImage(logo, 'PNG', (W - lw) / 2, 204.35 - lh / 2, lw, lh); } catch (e) {} }
    tekst('FOTODOKUMENTATION', W / 2, 336.1, {str: 19.9});
    var rk = [['ADRESSE', d.adresse], ['DATO', dmy(d.dato)], ['SAG / EMNE', d.sag], ['OMRÅDE', d.omraade], ['STATUS', d.statusTekst], ['NOTER GENERELT', d.note]];
    var ty = 429;
    rk.forEach(function (r) {
      doc.setFont('times', 'normal'); doc.setFontSize(11);
      var linjer = doc.splitTextToSize(String(r[1] || ''), 250), hh = Math.max(24.85, 9 + linjer.length * 13);
      doc.setFillColor(LBL[0], LBL[1], LBL[2]); doc.rect(36, ty, 270.1, hh, 'F');
      doc.setFillColor(255, 255, 255); doc.rect(306.1, ty, 270.1, hh, 'F');
      tekst(r[0], 300.6, ty + 10.6, {farve: [0, 0, 0], align: 'right'});
      doc.setFont('times', 'normal'); doc.setTextColor(0, 0, 0); doc.text(linjer, 318.6, ty + 10.6);
      ty += hh;
    });

    // Bygning
    var byg = aktive(d.bygning).filter(function (b) { return har(b.f); });
    if (byg.length) {
      nySide(); overskrift('BYGNING');
      byg.forEach(function (b) { if (b.tekst === 'DOKUMENTATION') kort(b.f, undefined, 'DOKUMENTATION'); else enkelt(b.f, 'BYGNING'); });
    }
    // Lejligheder
    var ikkeUdf = [];
    aktive(d.lejl).forEach(function (l) {
      var udf = !l.resultat || l.resultat === 'udfoert';
      if (!udf) ikkeUdf.push(l);
      var komp = udf ? aktive(l.komp).map(function (c) { return {navn: c.navn, par: aktive(c.par).filter(function (p) { return har(p.foer) || har(p.efter); })}; }).filter(function (c) { return c.par.length; }) : [];
      if (udf && !komp.length && !har(l.idf)) return;
      nySide(); overskrift('LEJL. ' + String(l.navn).toUpperCase());
      var navne = {udfoert: 'BYGNING', ikkehjemme: 'IKKE HJEMME', naegtet: 'NÆGTET ADGANG', ingennoegle: 'INGEN NØGLE', kunneikke: 'KUNNE IKKE UDFØRES'};
      if (har(l.idf)) enkelt(l.idf, navne[l.resultat || 'udfoert']);
      else if (!udf) { tekst(navne[l.resultat], W / 2, 130); y = 160; efter = 'enkelt'; }
      komp.forEach(function (c, ci) {
        sub(String(c.navn).toUpperCase() + (ci === 0 ? ' • ' + String(l.navn).toUpperCase() : ''));
        c.par.forEach(function (p) { kort(har(p.foer) ? p.foer : '', har(p.efter) ? p.efter : '', 'FØR RENS', 'EFTER RENS'); });
      });
    });
    // Ikke udførte lejligheder (til genbesøg)
    if (ikkeUdf.length) {
      nySide(); overskrift('IKKE UDFØRT');
      var yy = 108.1;
      ikkeUdf.forEach(function (l) {
        if (yy + 24.85 > BUND) { nySide(); yy = 36; }
        doc.setFillColor(LBL[0], LBL[1], LBL[2]); doc.rect(36, yy, 270.1, 24.85, 'F');
        doc.setFillColor(255, 255, 255); doc.rect(306.1, yy, 270.1, 24.85, 'F');
        tekst('LEJL. ' + String(l.navn).toUpperCase(), 300.6, yy + 15.5, {farve: [0, 0, 0], align: 'right'});
        tekst({ikkehjemme: 'Ikke hjemme', naegtet: 'Nægtet adgang', ingennoegle: 'Ingen nøgle', kunneikke: 'Kunne ikke udføres'}[l.resultat] || '', 318.6, yy + 15.5, {farve: [0, 0, 0], align: 'left', stil: 'normal'});
        yy += 24.85;
      });
    }

    // Billeder (beskæres i skabelonens format)
    var i = 0;
    return jobs.reduce(function (p, j) {
      return p.then(function () {
        return beskaer(bill[j.k], j.w, j.h).then(function (u) {
          doc.setPage(j.side); doc.addImage(u, 'JPEG', j.x, j.y, j.bw, j.bh, undefined, 'FAST');
        }).catch(function () {}).then(function () { i++; if (i % 4 === 0) frem(0.5 + 0.38 * i / jobs.length, 'Lægger billeder ind … ' + i + ' af ' + jobs.length); });
      });
    }, Promise.resolve()).then(function () {
      // Sidefod på alle sider
      var n = doc.getNumberOfPages();
      for (var s = 1; s <= n; s++) {
        doc.setPage(s);
        doc.setDrawColor(BLAA[0], BLAA[1], BLAA[2]); doc.setLineWidth(0.5); doc.line(175.5, 710.5, 436.4, 710.5);
        doc.setFont('times', 'bold'); doc.setFontSize(9.1); doc.setTextColor(0, 0, 0); doc.text('VENTILUX FOTODOKUMENTATION', W / 2, 720.7, {align: 'center'});
        doc.setFont('times', 'normal'); doc.setTextColor(153, 153, 153); doc.text('Side ' + s + ' af ' + n, W / 2, 742.8, {align: 'center'});
      }
      return {blob: doc.output('blob'), sider: n};
    });
  }
  return {lav: lav, byg: byg};
})();
