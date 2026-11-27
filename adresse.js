/* Ventilux Plan – adressekort. Ingen data eller koder i denne fil – alt hentes efter PIN.
   Kortet vises på opgaven: advarsler, kontakter (ring), adgang, praktisk, filer og tidligere besøg. Ledelsen retter. */
(function () {
  var css =
    '.ak-boks{margin-top:14px}' +
    '.ak-adv{margin-top:10px;padding:10px 12px;border-radius:8px;background:rgba(229,72,77,.1);border:1px solid rgba(229,72,77,.45);color:#e5484d;font-weight:600;white-space:pre-wrap}' +
    '.ak-sek{margin-top:14px;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:var(--svag)}' +
    '.ak-kont{display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid var(--linje)}.ak-kont:last-child{border-bottom:0}' +
    '.ak-kont .nv{flex:1;min-width:0}.ak-kont .nv small{display:block;color:var(--svag)}' +
    '.ak-kont a{height:36px;min-width:44px;border-radius:8px;border:1px solid var(--linje2);display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:0 10px;color:var(--tekst);font-size:13px}' +
    '.ak-kont a.p{background:var(--brand);border-color:var(--brand);color:#fff}' +
    '.ak-txt{margin-top:6px;padding:10px 12px;border-radius:8px;background:var(--flade2);border:1px solid var(--linje);white-space:pre-wrap;word-break:break-word}' +
    '.ak-txt.kode{font-variant-numeric:tabular-nums;font-size:15px;border-left:3px solid var(--brand)}' +
    '.ak-txt.intern{border-left:3px solid #b7791f}' +
    '.ak-fil{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--linje);font-size:13.5px}.ak-fil:last-child{border-bottom:0}' +
    '.ak-fil a{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ak-fil small{color:var(--svag)}' +
    '.ak-tom{margin-top:14px;padding:12px;border:1.5px dashed var(--linje2);border-radius:10px;color:var(--svag);font-size:13px}' +
    '.ak-tag{font-size:10.5px;font-weight:700;color:#b7791f;border:1px solid rgba(183,121,31,.45);border-radius:999px;padding:1px 6px}' +
    '.ak-krow{display:grid;grid-template-columns:1.2fr 1fr 1fr 1.3fr auto;gap:6px;margin-top:6px}@media(max-width:640px){.ak-krow{grid-template-columns:1fr 1fr}}' +
    '.ak-krow input{width:100%;border:1px solid var(--linje2);border-radius:8px;padding:9px 10px;background:var(--bg);color:var(--tekst);font-size:14px}' +
    '.ak-krow button{height:38px;width:38px;border-radius:8px;border:1px solid var(--linje2);background:var(--flade);color:var(--tekst);cursor:pointer}' +
    '.ak-boks details summary{cursor:pointer}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  IK.adr = '<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6M9 10h.01M15 10h.01"/>';
  IK.mail = IK.mail || '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>';
  IK.fil = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>';

  var CACHE = {}, LISTE = null, KUNDER = null, FN = [], E = null, LV = [], LVALG = null;

  function kald(fn, args) {
    return fetch(API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({fn: fn, args: args})})
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (r) { if (r && r.__fejl) throw new Error(r.__fejl); if (r && r.fejl) throw new Error(r.fejl === 'pin' ? 'Log ind igen' : r.fejl); return r; });
  }
  function admin() { return S.rolle === 'admin'; }
  function mig() { return (S.data && S.data.mig) || S.person || ''; }
  function fn(f) { FN.push(f); return 'VXA.f(' + (FN.length - 1) + ',this,event)'; }
  function dmy(d) { var s = String(d || '').split('-'); return s.length === 3 ? s[2] + '/' + s[1] + '/' + s[0] : d; }
  function str(b) { return b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' kB'; }
  function tlf(t) { return String(t || '').replace(/[^\d+]/g, ''); }
  function nl(t) { return esc(t || ''); }

  /* ---------- Kortet på opgaven ---------- */
  function kortHtml(k, tekst, ref) {
    var h = '';
    if (k.advarsler) h += '<div class="ak-adv">⚠ ' + nl(k.advarsler) + '</div>';
    h += '<div class="ak-sek" style="display:flex;justify-content:space-between;align-items:center"><span>' + ik('adr') + ' Adressekort · ' + esc(k.adresse) + '</span>' +
      (admin() ? '<button class="chip" onclick="' + fn(function () { redigerId(k.id, tekst, ref); }) + '">Ret</button>' : '') + '</div>';
    if (k.kontakter.length) {
      h += '<div class="ak-txt" style="padding:2px 12px">';
      k.kontakter.forEach(function (c) {
        h += '<div class="ak-kont"><span class="nv">' + esc(c.navn || c.tlf) + (c.rolle ? '<small>' + esc(c.rolle) + '</small>' : '') + '</span>' +
          (c.tlf ? '<a class="p" href="tel:' + esc(tlf(c.tlf)) + '">' + ik('tlf') + 'Ring</a>' : '') +
          (c.mail ? '<a href="mailto:' + esc(c.mail) + '">' + ik('mail') + '</a>' : '') + '</div>';
      });
      h += '</div>';
    }
    if (k.adgang) h += '<div class="ak-sek">Adgang</div><div class="ak-txt kode">' + nl(k.adgang) + '</div>';
    if (k.praktisk) h += '<div class="ak-sek">Praktisk</div><div class="ak-txt">' + linkify(k.praktisk) + '</div>';
    if (k.bygning) h += '<div class="ak-sek">Bygningen</div><div class="ak-txt">' + nl(k.bygning) + '</div>';
    if (admin() && k.intern) h += '<div class="ak-sek">Interne noter <span class="ak-tag">kun ledelsen</span></div><div class="ak-txt intern">' + linkify(k.intern) + '</div>';
    if (k.filer && k.filer.length) {
      h += '<div class="ak-sek">Filer (' + k.filer.length + ')</div><div class="ak-txt" style="padding:2px 12px">';
      k.filer.forEach(function (f) {
        var url = (admin() && f.web) || f.url;
        h += '<div class="ak-fil">' + ik('fil') + '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(f.navn) + '</a>' + (f.intern ? '<span class="ak-tag">intern</span>' : '') + '<small>' + str(f.str) + '</small></div>';
      });
      h += '</div>';
    }
    if (k.besoeg && k.besoeg.length) {
      h += '<details><summary class="ak-sek">Tidligere besøg (' + k.besoeg.length + ')</summary><div class="ak-txt" style="padding:2px 12px">';
      k.besoeg.forEach(function (b) {
        h += '<div class="ak-fil">' + (b.type === 'rapport' ? ik('billede') + '<span style="flex:1">' + esc(dmy(b.dato)) + ' · Fotorapport ' + esc(b.nr) + ' · ' + esc(b.status) + '<br><small>' + esc(b.tekst) + (b.af ? ' · ' + esc(b.af) : '') + '</small></span>'
          : ik('billede') + '<span style="flex:1">' + esc(dmy(b.dato)) + ' · Skema-fotos<br><small>' + esc(b.tekst) + (b.af ? ' · ' + esc(b.af) : '') + '</small></span>') + '</div>';
      });
      h += '</div></details>';
    }
    return h;
  }
  function vis(tekst, ref, res) {
    var box = document.getElementById('ak_boks'); if (!box) return;
    FN = [];
    if (res.kort) { box.innerHTML = kortHtml(res.kort, tekst, ref); return; }
    if (!admin()) { box.remove(); return; }
    box.innerHTML = '<div class="ak-tom">' + ik('adr') + ' Intet adressekort til denne opgave endnu.<div class="knapper" style="margin-top:10px">' +
      '<button class="k" onclick="' + fn(function () { nyt(tekst, ref); }) + '">Opret adressekort</button>' +
      '<button class="k" onclick="' + fn(function () { kobl(tekst, ref); }) + '">Kobl til eksisterende</button></div></div>';
  }
  var origDetalje = window.visDetalje;
  window.visDetalje = function (i) {
    origDetalje(i);
    var r = REF[i]; if (!r) return;
    var tekst = r.t === 'opg' ? r.o.tekst : r.s.kunde;
    if (!tekst || (r.t === 'opg' && erFri(tekst))) return;
    var k = document.querySelector('#lag .knapper'); if (!k) return;
    var box = document.createElement('div'); box.id = 'ak_boks'; box.className = 'ak-boks';
    box.innerHTML = '<div class="lille">' + ik('adr') + ' Henter adressekort …</div>';
    k.parentNode.insertBefore(box, k);
    var c = CACHE[tekst];
    if (c && Date.now() - c.t < 120000) return vis(tekst, i, c.r);
    kald('adressekortFind', [S.pin, tekst]).then(function (res) { CACHE[tekst] = {t: Date.now(), r: res}; vis(tekst, i, res); })
      .catch(function () { var b = document.getElementById('ak_boks'); if (b) b.remove(); });
  };

  /* ---------- Redigering (ledelsen) ---------- */
  function hentKunder() {
    if (KUNDER) return Promise.resolve(KUNDER);
    return kald('fotoInfo', [S.pin, '', '']).then(function (r) {
      var ko = new Intl.Collator('en', {sensitivity: 'base'});
      KUNDER = r.kunder.sort(function (a, b) { return a === 'Øvrige' ? 1 : b === 'Øvrige' ? -1 : ko.compare(a, b); });
      return KUNDER;
    });
  }
  function gaetKunde(t) {
    var s = String(t || '');
    if (/(^|[\s(])a\s?\/\s?b(?=[\s.,]|$)|andelsbolig/i.test(s)) return (KUNDER || []).filter(function (k) { return /^Andelsbolig/.test(k); })[0] || 'Øvrige';
    if (/(^|[\s(])e\s?\/\s?f(?=[\s.,]|$)|ejerforening/i.test(s)) return (KUNDER || []).filter(function (k) { return /^Ejerforening/.test(k); })[0] || 'Øvrige';
    var b = '', len = 0;
    (KUNDER || []).forEach(function (k) {
      if (/^(Øvrige|Andelsbolig|Ejerforening)/.test(k)) return;
      [k, k.split(/\s+/)[0]].forEach(function (n) {
        if (n.length < 2) return;
        if (new RegExp('(^|[^a-zæøå0-9])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![a-zæøå])', 'i').test(s) && n.length > len) { b = k; len = n.length; }
      });
    });
    return b || 'Øvrige';
  }
  function rensAdr(t) { return String(t || '').replace(/"[^"]*"/g, ' ').replace(/\bkl\.?\s*\d{1,2}([.:]\d{2})?/gi, ' ').replace(/\b\d{1,2}[:.]\d{2}\b/g, ' ').split(/\s*\/\s*(?![BbFf]\b)/)[0].replace(/\s+/g, ' ').trim(); }

  function nyt(tekst, ref) {
    hentKunder().then(function () {
      E = {ref: ref, tekst: tekst, k: {id: '', kunde: gaetKunde(tekst), adresse: rensAdr(tekst), alias: tekst ? [tekst] : [], advarsler: '', kontakter: [{navn: '', rolle: '', tlf: '', mail: ''}], adgang: '', praktisk: '', bygning: '', intern: '', interneFiler: [], filer: []}};
      tegnRet();
    }).catch(function (e) { toast(e.message); });
  }
  function redigerId(id, tekst, ref) {
    aabnArk('<div class="lille" style="padding:30px 0;text-align:center">Henter adressekort …</div>');
    Promise.all([hentKunder(), kald('adressekortHent', [S.pin, id])]).then(function (r) {
      var k = r[1].kort; if (!k.kontakter.length) k.kontakter.push({navn: '', rolle: '', tlf: '', mail: ''});
      E = {ref: ref, tekst: tekst, k: k}; tegnRet();
    }).catch(function (e) { aabnArk('<h2>Fejl</h2><div class="under">' + esc(e.message) + '</div><div class="knapper"><button class="k" onclick="lukArk()">Luk</button></div>'); });
  }
  function laes() {
    var g = function (id) { var x = document.getElementById(id); return x ? x.value : ''; };
    var k = E.k;
    k.kunde = g('ak_kunde') || k.kunde; k.adresse = g('ak_adr'); k.advarsler = g('ak_adv'); k.adgang = g('ak_adg');
    k.praktisk = g('ak_prak'); k.bygning = g('ak_byg'); k.intern = g('ak_int');
    k.alias = g('ak_alias').split('\n').map(function (s) { return s.trim(); }).filter(String);
    k.kontakter = [].slice.call(document.querySelectorAll('.ak-krow')).map(function (r) {
      var i = r.querySelectorAll('input'); return {navn: i[0].value.trim(), rolle: i[1].value.trim(), tlf: i[2].value.trim(), mail: i[3].value.trim()};
    });
    k.interneFiler = [].slice.call(document.querySelectorAll('.ak-ifil')).filter(function (c) { return c.checked; }).map(function (c) { return c.getAttribute('data-n'); });
  }
  function tegnRet() {
    FN = [];
    var k = E.k, h = '<div class="over">' + ik('adr') + 'Adressekort' + (k.id ? ' · ' + esc(k.id) : ' · nyt') + '</div><h2>' + esc(k.adresse || 'Nyt adressekort') + '</h2>';
    h += '<div class="under">Medarbejdere på opgaven ser alt undtagen interne noter og interne filer.</div>';
    h += '<div class="raekke2"><div class="felt"><label>Kunde</label><select id="ak_kunde">';
    (KUNDER || ['Øvrige']).forEach(function (c) { h += '<option' + (c === k.kunde ? ' selected' : '') + '>' + esc(c) + '</option>'; });
    h += '</select></div><div class="felt"><label>Adresse</label><input id="ak_adr" value="' + esc(k.adresse) + '" placeholder="Fx Højstrupvej 57"></div></div>';
    h += '<div class="felt"><label>⚠ Advarsler (vises med rødt øverst)</label><textarea id="ak_adv" style="min-height:60px" placeholder="Fx: Hund i 2 TH. Ring til beboer i 1 MF først.">' + esc(k.advarsler) + '</textarea></div>';
    h += '<div class="felt"><label>Kontakter</label>';
    k.kontakter.forEach(function (c, i) {
      h += '<div class="ak-krow"><input placeholder="Navn" value="' + esc(c.navn) + '"><input placeholder="Rolle, fx vicevært" value="' + esc(c.rolle) + '"><input placeholder="Telefon" inputmode="tel" value="' + esc(c.tlf) + '"><input placeholder="Mail" inputmode="email" value="' + esc(c.mail) + '">' +
        '<button onclick="' + fn(function () { laes(); E.k.kontakter.splice(i, 1); if (!E.k.kontakter.length) E.k.kontakter.push({navn: '', rolle: '', tlf: '', mail: ''}); tegnRet(); }) + '" aria-label="Fjern">✕</button></div>';
    });
    h += '<button class="chip" style="margin-top:8px" onclick="' + fn(function () { laes(); E.k.kontakter.push({navn: '', rolle: '', tlf: '', mail: ''}); tegnRet(); }) + '">+ Kontakt</button></div>';
    h += '<div class="felt"><label>Adgang (portkode, nøgleboks, hvor nøglen hentes)</label><textarea id="ak_adg" style="min-height:70px" placeholder="Fx: Portkode 1234. Nøgleboks ved kælderdør, kode 5678.">' + esc(k.adgang) + '</textarea></div>';
    h += '<div class="felt"><label>Praktisk (parkering, åbningstider, hvor anlægget sidder)</label><textarea id="ak_prak" style="min-height:60px">' + esc(k.praktisk) + '</textarea></div>';
    h += '<div class="felt"><label>Bygningen / opgange</label><textarea id="ak_byg" style="min-height:50px" placeholder="Fx: 57, 55, 53, 51 – ST til 3. sal, TV/TH">' + esc(k.bygning) + '</textarea></div>';
    h += '<div class="felt"><label>Interne noter – kun ledelsen (priser, aftaler)</label><textarea id="ak_int" style="min-height:50px">' + esc(k.intern) + '</textarea></div>';
    h += '<div class="felt"><label>Tekster i kalenderen der hører til kortet (én pr. linje)</label><textarea id="ak_alias" style="min-height:50px">' + esc(k.alias.join('\n')) + '</textarea>' +
      '<div class="lille" style="margin-top:4px">Kortet findes også automatisk, når adressen står i opgavens tekst.</div></div>';
    if (k.id) {
      h += '<div class="felt"><label>Filer (tegninger, varslinger, fuldmagter …)</label>';
      if (k.filer && k.filer.length) {
        h += '<div class="ak-txt" style="padding:2px 12px">';
        k.filer.forEach(function (f) {
          h += '<div class="ak-fil">' + ik('fil') + '<a href="' + esc(f.web || f.url) + '" target="_blank" rel="noopener">' + esc(f.navn) + '</a>' +
            '<label class="lille" style="display:flex;gap:4px;align-items:center"><input type="checkbox" class="ak-ifil" data-n="' + esc(f.navn) + '"' + (k.interneFiler.indexOf(f.navn) >= 0 ? ' checked' : '') + '> intern</label></div>';
        });
        h += '</div>';
      }
      h += '<div class="knapper" style="margin-top:8px"><button class="k" id="ak_upknap" onclick="' + fn(function () { uploadFiler(false); }) + '">' + ik('fil') + 'Tilføj filer</button>' +
        '<button class="k" onclick="' + fn(function () { uploadFiler(true); }) + '">Tilføj interne filer</button></div>' +
        '<div class="lille" style="margin-top:4px">Gemmes i OneDrive: Ventilux App\\' + esc(String(k.mappe || '').replace(/\//g, '\\')) + '</div></div>';
    } else h += '<div class="lille" style="margin-top:12px">Filer kan tilføjes, når kortet er gemt.</div>';
    if (k.historik) h += '<details style="margin-top:12px"><summary class="lille" style="cursor:pointer">Historik (også gamle koder)</summary><div class="lille" style="white-space:pre-wrap;margin-top:6px">' + esc(k.historik) + '</div></details>';
    h += '<div class="knapper"><button class="k primaer f-stor" id="ak_gem" onclick="' + fn(gem) + '">Gem adressekort</button><button class="k" onclick="' + fn(tilbage) + '">Annullér</button></div>';
    aabnArk(h);
    var ark = document.querySelector('#lag .ark'); if (ark) ark.classList.add('r-bred');
  }
  function gem() {
    laes();
    if (!E.k.adresse.trim()) { toast('Skriv adressen'); return; }
    var b = document.getElementById('ak_gem'); if (b) { b.disabled = true; b.textContent = 'Gemmer …'; }
    kald('adressekortGem', [S.pin, E.k, mig()]).then(function (r) {
      CACHE = {}; LISTE = null;
      toast('Adressekortet er gemt ✓');
      if (!E.k.id) { E.k.id = r.id; redigerId(r.id, E.tekst, E.ref); return; }
      tilbage();
    }).catch(function (e) { toast('Kunne ikke gemme: ' + e.message); if (b) { b.disabled = false; b.textContent = 'Gem adressekort'; } });
  }
  function tilbage() {
    var ref = E && E.ref; E = null;
    if (ref != null && REF[ref]) visDetalje(ref); else liste();
  }
  function uploadFiler(intern) {
    laes();
    var inp = document.createElement('input'); inp.type = 'file'; inp.multiple = true; inp.style.display = 'none';
    inp.onchange = function () {
      var filer = [].slice.call(inp.files || []); inp.remove();
      if (!filer.length) return;
      var for_ = filer.filter(function (f) { return f.size > 25 * 1048576; });
      if (for_.length) { toast('Filer over 25 MB kan ikke lægges op her'); filer = filer.filter(function (f) { return f.size <= 25 * 1048576; }); }
      var i = 0, b = document.getElementById('ak_upknap');
      (function naeste() {
        if (i >= filer.length) { CACHE = {}; toast(filer.length + ' fil' + (filer.length === 1 ? '' : 'er') + ' lagt op ✓'); redigerId(E.k.id, E.tekst, E.ref); return; }
        var f = filer[i++];
        if (b) b.textContent = 'Lægger op ' + i + ' af ' + filer.length + ' …';
        var rd = new FileReader();
        rd.onload = function () {
          kald('adressekortFil', [S.pin, E.k.id, f.name, String(rd.result).split(',')[1] || '', intern]).then(naeste)
            .catch(function (e) { toast(f.name + ': ' + e.message); naeste(); });
        };
        rd.readAsDataURL(f);
      })();
    };
    document.body.appendChild(inp); inp.click();
  }

  /* ---------- Liste + kobling ---------- */
  function hentListe() {
    if (LISTE) return Promise.resolve(LISTE);
    return kald('adressekortListe', [S.pin]).then(function (r) { LISTE = r.kort; return LISTE; });
  }
  function listeHtml(l, q, valg) {
    q = String(q || '').toLowerCase().trim();
    var v = l.filter(function (k) { return !q || (k.adresse + ' ' + k.kunde + ' ' + k.id).toLowerCase().indexOf(q) >= 0; });
    if (!v.length) return '<div class="lille" style="padding:16px 0">Ingen adressekort fundet.</div>';
    LV = v.slice(0, 150); LVALG = valg;
    var h = '<div class="r-liste" style="margin-top:8px;border:1px solid var(--linje);border-radius:10px;overflow:hidden">';
    LV.forEach(function (k, i) {
      h += '<div class="raekke" onclick="VXA.v(' + i + ')"><span class="mk"></span><div class="krop"><div class="titel">' + esc(k.adresse) + (k.advarsel ? ' <span style="color:#e5484d">⚠</span>' : '') + '</div>' +
        '<div class="meta"><span>' + esc(k.kunde) + '</span><span>' + k.kontakter + ' kontakt' + (k.kontakter === 1 ? '' : 'er') + '</span><span>' + esc(k.id) + '</span></div></div><span class="pil-h">' + ik('hoejre') + '</span></div>';
    });
    return h + '</div>';
  }
  function liste(q) {
    FN = [];
    aabnArk('<div class="over">' + ik('adr') + 'Adressekort</div><h2>Adressekort</h2><div class="lille" style="padding:20px 0">Henter …</div>');
    hentListe().then(function (l) {
      var t = function (qq) {
        FN = [];
        var h = '<div class="over">' + ik('adr') + 'Adressekort</div><h2>Adressekort (' + l.length + ')</h2>' +
          '<div class="felt"><input id="ak_soeg" placeholder="Søg på adresse eller kunde" value="' + esc(qq || '') + '"></div>' +
          '<div id="ak_res">' + listeHtml(l, qq, function (k) { redigerId(k.id, '', null); }) + '</div>' +
          '<div class="knapper"><button class="k primaer" onclick="' + fn(function () { nyt('', null); }) + '">' + ik('plus') + 'Nyt adressekort</button><button class="k" onclick="lukArk()">Luk</button></div>';
        aabnArk(h);
        var s = document.getElementById('ak_soeg');
        if (s) s.oninput = function () { document.getElementById('ak_res').innerHTML = listeHtml(l, s.value, function (k) { redigerId(k.id, '', null); }); };
      };
      t(q);
    }).catch(function (e) { aabnArk('<h2>Fejl</h2><div class="under">' + esc(e.message) + '</div><div class="knapper"><button class="k" onclick="lukArk()">Luk</button></div>'); });
  }
  function kobl(tekst, ref) {
    FN = [];
    hentListe().then(function (l) {
      var valg = function (k) {
        kald('adressekortKobl', [S.pin, k.id, tekst]).then(function () { CACHE = {}; toast('Koblet til ' + k.adresse + ' ✓'); visDetalje(ref); })
          .catch(function (e) { toast(e.message); });
      };
      aabnArk('<div class="over">' + ik('adr') + 'Kobl opgaven til et adressekort</div><h2>' + esc(tekst) + '</h2>' +
        '<div class="felt"><input id="ak_soeg" placeholder="Søg på adresse eller kunde" value="' + esc(rensAdr(tekst).split(' ')[0]) + '"></div><div id="ak_res"></div>' +
        '<div class="knapper"><button class="k" onclick="' + fn(function () { visDetalje(ref); }) + '">Tilbage</button></div>');
      var s = document.getElementById('ak_soeg'), r = function () { document.getElementById('ak_res').innerHTML = listeHtml(l, s.value, valg); };
      s.oninput = r; r();
    }).catch(function (e) { toast(e.message); });
  }

  /* ---------- Menu og ny opgave ---------- */
  var origMenu = window.visMenu;
  window.visMenu = function () {
    origMenu();
    if (!admin()) return;
    var k = document.querySelector('#lag .knapper'); if (!k) return;
    var b = document.createElement('button'); b.className = 'k'; b.innerHTML = ik('adr') + 'Adressekort'; b.onclick = function () { liste(''); };
    k.insertBefore(b, k.children[1] || null);
  };
  var origForm = window.visForm;
  if (origForm) window.visForm = function () {
    origForm();
    var inp = document.getElementById('f_tekst'); if (!inp || !admin()) return;
    hentListe().then(function (l) {
      var dl = document.createElement('datalist'); dl.id = 'ak_dl';
      l.forEach(function (k) { var o = document.createElement('option'); o.value = k.adresse; o.label = k.kunde; dl.appendChild(o); });
      inp.parentNode.appendChild(dl); inp.setAttribute('list', 'ak_dl');
    }).catch(function () {});
  };

  window.VXA = {
    f: function (i, el, ev) { if (ev && ev.stopPropagation) ev.stopPropagation(); var f = FN[i]; if (f) f(el, ev); },
    v: function (i) { if (LVALG && LV[i]) LVALG(LV[i]); },
    liste: liste, nyt: nyt
  };
})();
