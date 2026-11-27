/* Ventilux Plan – fotos af papir-skemaer (fase 1). Ingen data eller koder i denne fil – alt hentes efter PIN.
   Billeder gemmes i OneDrive: Ventilux App / Kunder / <Kunde> / <Adresse> / ÅÅÅÅ-MM-DD Skema side N.jpg */
(function () {
  var css =
    '.felt select{width:100%;height:44px;border:1px solid var(--linje2);border-radius:8px;padding:0 10px;background:var(--bg);color:var(--tekst);font:inherit;font-size:15px}' +
    '.f-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px;margin-top:14px}' +
    '.f-side{position:relative;border:1px solid var(--linje2);border-radius:10px;overflow:hidden;background:var(--flade2);aspect-ratio:3/4}' +
    '.f-side img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.f-side .nr{position:absolute;left:6px;top:6px;background:rgba(0,0,0,.65);color:#fff;font-size:11.5px;font-weight:600;padding:2px 7px;border-radius:999px}' +
    '.f-side .x{position:absolute;right:5px;top:5px;width:28px;height:28px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;font-size:17px;line-height:28px;cursor:pointer;padding:0}' +
    '.f-side .fl{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;padding:4px}' +
    '.f-side .fl button{width:30px;height:26px;border-radius:7px;border:0;background:rgba(0,0,0,.6);color:#fff;cursor:pointer;font-size:14px}' +
    '.f-side.ok::after{content:"\\2713";position:absolute;inset:0;display:grid;place-items:center;font-size:34px;color:#fff;background:rgba(22,163,74,.55)}' +
    '.f-side.fejl{outline:2px solid #e5484d}' +
    '.f-tom{margin-top:14px;border:1.5px dashed var(--linje2);border-radius:12px;padding:22px 14px;text-align:center;color:var(--svag)}' +
    '.f-tom b{display:block;color:var(--tekst);font-size:15px;margin-bottom:4px}' +
    '.f-sti{margin-top:12px;padding:10px 12px;border-radius:8px;background:var(--brandsvag);font-size:12.5px;word-break:break-word}' +
    '.f-sti b{font-weight:600}' +
    '.f-bar{height:6px;border-radius:9px;background:var(--linje);overflow:hidden;margin-top:12px}.f-bar i{display:block;height:100%;background:var(--brand);transition:width .3s}' +
    '.f-liste{margin-top:8px;border:1px solid var(--linje);border-radius:10px;overflow:hidden}' +
    '.f-liste .r{display:flex;gap:10px;align-items:center;padding:9px 12px;border-top:1px solid var(--linje);font-size:13px}.f-liste .r:first-child{border-top:0}' +
    '.f-liste .r .t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.f-adr{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}' +
    '.f-stor{height:52px;font-size:15.5px;font-weight:600}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  IK.kamera = '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>';
  IK.billede = '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>';
  IK.sky = '<path d="M16 16l-4-4-4 4M12 12v9"/><path d="M20.4 18.4A5 5 0 0 0 18 9h-1.3A8 8 0 1 0 4 16.3"/>';
  IK.mappe = '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>';

  var MAKS = 2400, KVALITET = 0.85;
  var F = null;     // foto-skærmens tilstand
  var INFO = {};    // svar fra fotoInfo pr. kalender-tekst

  function kald(fn, args) {
    return fetch(API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({fn: fn, args: args})})
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (r) { if (r && r.__fejl) throw new Error(r.__fejl); if (r && r.fejl) throw new Error(r.fejl === 'pin' ? 'Log ind igen' : r.fejl); return r; });
  }

  /* ---------- Knap på opgaven / service-besøget ---------- */
  var orig = window.visDetalje;
  window.visDetalje = function (i) {
    orig(i);
    var r = REF[i]; if (!r) return;
    var tekst = r.t === 'opg' ? r.o.tekst : r.s.kunde;
    if (!tekst || (r.t === 'opg' && erFri(tekst))) return;
    var k = document.querySelector('#lag .knapper'); if (!k) return;
    var b = document.createElement('button');
    b.className = 'k'; b.innerHTML = ik('kamera') + 'Fotos af skema';
    b.onclick = function () { aabn({tekst: tekst, dato: r.dato, ref: i}); };
    var p = k.querySelector('.primaer');
    k.insertBefore(b, p ? p.nextSibling : k.firstChild);
  };

  /* ---------- Gæt kunde og adresse ud fra teksten i kalenderen ---------- */
  function gaetKunde(t, kunder) {
    var s = String(t || '');
    if (/(^|[\s(])a\s?\/\s?b(?=[\s.,]|$)|andelsbolig/i.test(s)) return find(kunder, /^Andelsbolig/i);
    if (/(^|[\s(])e\s?\/\s?f(?=[\s.,]|$)|ejerforening/i.test(s)) return find(kunder, /^Ejerforening/i);
    var bedst = '';
    kunder.forEach(function (k) {
      if (/^(Øvrige|Andelsbolig|Ejerforening)/i.test(k)) return;
      var navne = [k];
      var f = k.split(/\s+/)[0];
      if (f !== k && /^[A-ZÆØÅ.]{2,}$/.test(f)) navne.push(f);            // "GAB Glostrup" → også "GAB"
      navne.forEach(function (n) {
        var re = new RegExp('(^|[^a-zæøå0-9])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![a-zæøå])', 'i');
        if (re.test(s) && n.length > bedst.length) bedst = k;
      });
    });
    return bedst || 'Øvrige';
  }
  function find(liste, re) { for (var i = 0; i < liste.length; i++) if (re.test(liste[i])) return liste[i]; return 'Øvrige'; }
  function rensAdresse(t) {
    return String(t || '')
      .replace(/"[^"]*"|“[^”]*”/g, ' ')
      .replace(/\bkl\.?\s*\d{1,2}([.:]\d{2})?/gi, ' ')
      .replace(/\b\d{1,2}[:.]\d{2}\b(?!\s*[a-zæøå])/gi, ' ')
      .replace(/\b([AaEe])\s?\/\s?([BbFf])\b/g, function (m, a, b) { return a.toUpperCase() + b.toUpperCase(); })
      .replace(/[\\\/:*?"<>|#%]/g, ' ')
      .replace(/\s+/g, ' ').replace(/^[\s,.-]+|[\s,.-]+$/g, '');
  }
  function adresseValg(t) {
    var dele = String(t || '').split(/\s*\/\s*(?![BbFf]\b)/).map(rensAdresse).filter(function (x) { return x.length > 2; });
    var hel = rensAdresse(t), ud = [];
    dele.forEach(function (d) { if (ud.indexOf(d) < 0) ud.push(d); });
    if (!ud.length && hel) ud.push(hel);
    return ud;
  }

  /* ---------- Skærmen ---------- */
  function aabn(o) {
    if (F && F.travl) { tegn(); return; }   // upload i gang – vis den
    F = {tekst: o.tekst, dato: o.dato || idagTekst(), ref: o.ref, kunde: '', adresse: '', sider: [], note: '', travl: false, info: INFO[o.tekst] || null, valg: adresseValg(o.tekst)};
    F.adresse = F.valg[0] || rensAdresse(o.tekst);
    try { var husk = JSON.parse(localStorage.getItem('vxplan_foto|' + o.tekst) || 'null'); if (husk) { F.kunde = husk.kunde; F.adresse = husk.adresse; } } catch (e) {}
    tegn();
    kald('fotoInfo', [S.pin, o.tekst, '']).then(function (r) {
      var ko = new Intl.Collator('en', {sensitivity: 'base'});
      r.kunder.sort(function (a, b) { return a === 'Øvrige' ? 1 : b === 'Øvrige' ? -1 : ko.compare(a, b); });
      INFO[o.tekst] = r;
      if (!F || F.tekst !== o.tekst) return;
      laes(); F.info = r;
      if (r.tidligere && !F.rettet) { F.kunde = r.tidligere.kunde; F.adresse = r.tidligere.adresse; }
      if (!F.kunde || r.kunder.indexOf(F.kunde) < 0) F.kunde = gaetKunde(o.tekst, r.kunder);
      if (aaben()) tegn();
    }).catch(function (e) { if (F) { F.infoFejl = e.message || 'fejl'; if (aaben()) tegn(); } });
  }
  function aaben() { return !!document.querySelector('#lag .fo-ark'); }
  function laes() {
    if (!F) return;
    var k = document.getElementById('fo_kunde'), a = document.getElementById('fo_adr'), d = document.getElementById('fo_dato'), n = document.getElementById('fo_note');
    if (k) F.kunde = k.value; if (a) F.adresse = a.value; if (d) F.dato = d.value || F.dato; if (n) F.note = n.value;
  }
  function sti() {
    var a = rensAdresse(F.adresse) || '…';
    return 'Ventilux App › Kunder › <b>' + esc(F.kunde || '…') + '</b> › <b>' + esc(a) + '</b>';
  }
  function tegn() {
    if (!F) return;
    var h = '<span class="fo-ark" hidden></span>', info = F.info, n = F.sider.length;
    h += '<div class="over">' + ik('kamera') + 'Fotos af skema · ' + esc(stort(langDato(F.dato))) + '</div>';
    h += '<h2>' + esc(F.tekst) + '</h2>';
    if (F.faerdig) return tegnFaerdig();

    // 1. Hvor skal det gemmes
    if (!info && !F.infoFejl) h += '<div class="lille" style="margin-top:10px">Henter kunder …</div>';
    if (F.infoFejl) h += '<div class="boks note" style="border-left-color:#e5484d">Kunne ikke hente kundelisten: ' + esc(F.infoFejl) + '</div>';
    if (info) {
      h += '<div class="felt"><label>Kunde</label><select id="fo_kunde" onchange="VXF.rettet()">';
      info.kunder.forEach(function (k) { h += '<option' + (k === F.kunde ? ' selected' : '') + '>' + esc(k) + '</option>'; });
      h += '</select></div>';
    }
    h += '<div class="felt"><label>Adresse (bliver mappens navn)</label><input id="fo_adr" list="fo_adrl" value="' + esc(F.adresse) + '" placeholder="Fx Højstrupvej 57" oninput="VXF.adr()">';
    if (info) {
      h += '<datalist id="fo_adrl">';
      info.adresser.forEach(function (x) { if (x.kunde === F.kunde) h += '<option value="' + esc(x.adresse) + '">'; });
      h += '</datalist>';
    }
    if (F.valg.length > 1) {
      h += '<div class="f-adr">';
      F.valg.forEach(function (v, i) { h += '<button type="button" class="chip' + (v === F.adresse ? ' valgt' : '') + '" onclick="VXF.valg(' + i + ')">' + esc(v) + '</button>'; });
      h += '</div>';
    }
    h += '</div>';
    h += '<div class="f-sti" id="fo_sti">' + ik('mappe') + ' ' + sti() + '</div>';

    // 2. Billederne
    if (!n) {
      h += '<div class="f-tom"><b>Tag et billede af hver side af skemaet</b>Hold telefonen lige over papiret, så hele siden er med.</div>';
    } else {
      h += '<div class="f-grid">';
      F.sider.forEach(function (s, i) {
        h += '<div class="f-side' + (s.ok ? ' ok' : '') + (s.fejl ? ' fejl' : '') + '"><img src="' + s.lille + '" alt="">' +
          '<span class="nr">Side ' + (i + 1) + '</span>' +
          (F.travl || s.ok ? '' : '<button class="x" onclick="VXF.fjern(' + i + ')" aria-label="Fjern">×</button>' +
          '<div class="fl"><button onclick="VXF.flyt(' + i + ',-1)" aria-label="Flyt frem"' + (i ? '' : ' style="visibility:hidden"') + '>‹</button><button onclick="VXF.flyt(' + i + ',1)" aria-label="Flyt tilbage"' + (i < n - 1 ? '' : ' style="visibility:hidden"') + '>›</button></div>') +
          '</div>';
      });
      h += '</div>';
    }
    h += '<div class="knapper"><button class="k' + (n ? '' : ' primaer') + '" onclick="VXF.kamera()"' + (F.travl ? ' disabled' : '') + '>' + ik('kamera') + (n ? 'Tag næste side' : 'Tag billede') + '</button>' +
      '<button class="k" onclick="VXF.galleri()"' + (F.travl ? ' disabled' : '') + '>' + ik('billede') + 'Vælg fra billeder</button></div>';

    // 3. Gem
    if (n) {
      h += '<div class="raekke2"><div class="felt"><label>Dato for skemaet</label><input type="date" id="fo_dato" value="' + F.dato + '"></div></div>';
      h += '<div class="felt"><label>Bemærkning til ledelsen (valgfri)</label><input id="fo_note" value="' + esc(F.note) + '" placeholder="Fx: 3 lejligheder ikke hjemme"></div>';
      if (F.travl) h += '<div class="f-bar"><i style="width:' + Math.round(F.fremdrift * 100) + '%"></i></div><div class="lille" style="margin-top:6px">' + esc(F.status || '') + ' Luk ikke appen.</div>';
      if (F.fejlTekst) h += '<div class="boks note" style="border-left-color:#e5484d">' + esc(F.fejlTekst) + '</div>';
      h += '<div class="knapper"><button class="k primaer f-stor" onclick="VXF.gem()"' + (F.travl || !info ? ' disabled' : '') + '>' + ik('sky') +
        (F.travl ? 'Gemmer …' : F.fejlTekst ? 'Prøv igen' : 'Gem ' + n + ' side' + (n === 1 ? '' : 'r') + ' i OneDrive') + '</button></div>';
    }
    h += '<div class="knapper" style="margin-top:10px"><button class="k" onclick="VXF.luk()">' + (n && !F.travl ? 'Annullér' : 'Luk') + '</button></div>';
    h += tidligere();
    h += '<input type="file" id="fo_kam" accept="image/*" capture="environment" hidden onchange="VXF.filer(this)">' +
      '<input type="file" id="fo_gal" accept="image/*" multiple hidden onchange="VXF.filer(this)">';
    aabnArk(h);
  }
  function tidligere() {
    var info = F.info; if (!info || !info.fotos || !info.fotos.length) return '';
    var h = '<div class="felt"><label>Allerede gemt for denne adresse (' + info.fotos.length + ')</label><div class="f-liste">';
    info.fotos.slice(0, 12).forEach(function (f) {
      var t = esc(f.fil) + ' · ' + esc(f.navn);
      h += '<div class="r">' + ik('billede') + '<span class="t">' + (f.link ? '<a href="' + esc(f.link) + '" target="_blank">' + t + '</a>' : t) + '</span></div>';
    });
    return h + '</div></div>';
  }
  function tegnFaerdig() {
    var h = '<span class="fo-ark" hidden></span><div class="over">' + ik('kamera') + 'Fotos af skema</div><h2>' + F.faerdig.antal + ' side' + (F.faerdig.antal === 1 ? '' : 'r') + ' gemt ✓</h2>' +
      '<div class="under">Skemaet ligger nu i OneDrive, og ledelsen kan se det.</div>' +
      '<div class="f-sti">' + ik('mappe') + ' ' + esc(F.faerdig.mappe) + '</div><div class="f-liste" style="margin-top:12px">';
    F.faerdig.filer.forEach(function (f) { h += '<div class="r">' + ik('billede') + '<span class="t">' + esc(f) + '</span></div>'; });
    h += '</div><div class="knapper"><button class="k primaer" onclick="VXF.igen()">' + ik('kamera') + 'Tag flere sider</button><button class="k" onclick="VXF.luk()">Færdig</button></div>';
    aabnArk(h);
  }

  /* ---------- Billeder ind: kamera eller galleri ---------- */
  function vaelgFil(id) { laes(); var x = document.getElementById(id); if (x) { x.value = ''; x.click(); } }
  function filer(inp) {
    var liste = [].slice.call(inp.files || []).filter(function (f) { return /^image\//.test(f.type) || /\.(jpe?g|png|heic|heif|webp)$/i.test(f.name); });
    if (!liste.length) return;
    toast(liste.length > 1 ? 'Klargør ' + liste.length + ' billeder …' : 'Klargør billedet …');
    var i = 0;
    (function naeste() {
      if (i >= liste.length) { tegn(); return; }
      formindsk(liste[i++]).then(function (s) { F.sider.push(s); naeste(); })
        .catch(function () { toast('Et billede kunne ikke læses – prøv at tage det igen'); naeste(); });
    })();
  }
  function formindsk(fil) {
    return new Promise(function (ok, fejl) {
      var url = URL.createObjectURL(fil), img = new Image();
      img.onload = function () {
        try {
          var w = img.naturalWidth, h = img.naturalHeight, f = Math.min(1, MAKS / Math.max(w, h));
          var c = document.createElement('canvas'); c.width = Math.round(w * f); c.height = Math.round(h * f);
          var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
          var stor = c.toDataURL('image/jpeg', KVALITET);
          var m = document.createElement('canvas'), g = 240 / Math.max(c.width, c.height); m.width = Math.round(c.width * g); m.height = Math.round(c.height * g);
          m.getContext('2d').drawImage(c, 0, 0, m.width, m.height);
          URL.revokeObjectURL(url);
          ok({data: stor, lille: m.toDataURL('image/jpeg', 0.7)});
        } catch (e) { URL.revokeObjectURL(url); fejl(e); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); fejl(new Error('billede')); };
      img.src = url;
    });
  }

  /* ---------- Gem i OneDrive – én side ad gangen ---------- */
  function gem() {
    laes();
    var adr = rensAdresse(F.adresse);
    if (!adr) { toast('Skriv adressen først'); var a = document.getElementById('fo_adr'); if (a) a.focus(); return; }
    F.adresse = adr; F.travl = true; F.fejlTekst = ''; F.gemte = F.gemte || [];
    try { localStorage.setItem('vxplan_foto|' + F.tekst, JSON.stringify({kunde: F.kunde, adresse: adr})); } catch (e) {}
    var i = 0, alle = F.sider.length;
    function naeste() {
      while (i < F.sider.length && F.sider[i].ok) i++;
      var tilbage = F.sider.filter(function (s) { return !s.ok; }).length;
      F.fremdrift = (alle - tilbage) / alle;
      if (i >= F.sider.length) return faerdig();
      F.status = 'Gemmer side ' + (alle - tilbage + 1) + ' af ' + alle + ' …';
      if (aaben()) tegn();
      var s = F.sider[i];
      kald('fotoGem', [S.pin, {kunde: F.kunde, adresse: adr, opgave: F.tekst, dato: F.dato, navn: S.data && S.data.mig || S.person || '', note: F.note, billede: s.data}])
        .then(function (r) { s.ok = true; s.fejl = false; s.data = null; F.gemte.push(r.fil); F.mappe = r.mappe; naeste(); })
        .catch(function (e) { s.fejl = true; F.travl = false; F.fejlTekst = 'Side ' + (i + 1) + ' blev ikke gemt (' + (e.message || 'ingen forbindelse') + '). Billederne er ikke tabt – tryk "Prøv igen".'; if (aaben()) tegn(); else toast('Skemafoto blev ikke gemt – åbn opgaven og prøv igen'); });
    }
    naeste();
  }
  function faerdig() {
    F.travl = false;
    F.faerdig = {antal: F.gemte.length, filer: F.gemte.slice(), mappe: F.mappe || ''};
    delete INFO[F.tekst];
    if (aaben()) tegn(); else toast(F.faerdig.antal + ' skemafoto' + (F.faerdig.antal === 1 ? '' : 's') + ' gemt i OneDrive ✓');
  }
  window.addEventListener('beforeunload', function (e) { if (F && F.travl) { e.preventDefault(); e.returnValue = ''; } });

  window.VXF = {
    aabn: aabn,
    kamera: function () { vaelgFil('fo_kam'); },
    galleri: function () { vaelgFil('fo_gal'); },
    filer: filer,
    fjern: function (i) { laes(); F.sider.splice(i, 1); tegn(); },
    flyt: function (i, d) { laes(); var j = i + d; if (j < 0 || j >= F.sider.length) return; var t = F.sider[i]; F.sider[i] = F.sider[j]; F.sider[j] = t; tegn(); },
    valg: function (i) { laes(); F.adresse = F.valg[i]; F.rettet = true; tegn(); },
    rettet: function () { laes(); F.rettet = true; tegn(); },
    adr: function () { laes(); F.rettet = true; var s = document.getElementById('fo_sti'); if (s) s.innerHTML = ik('mappe') + ' ' + sti(); },
    gem: gem,
    igen: function () { var t = F.tekst, d = F.dato, r = F.ref; F = null; aabn({tekst: t, dato: d, ref: r}); },
    luk: function () {
      if (F && F.travl) return toast('Vent – billederne er ved at blive gemt');
      if (F && !F.faerdig && F.sider.some(function (s) { return !s.ok; }) && !F.bekraeft) { F.bekraeft = true; return toast('Tryk Annullér igen for at kassere billederne'); }
      var r = F && F.ref; F = null;
      if (r != null && REF[r]) window.visDetalje(r); else lukArk();
    }
  };
})();
