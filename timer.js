/* Ventilux Plan – timeregistrering. Ingen data eller koder i denne fil – alt hentes efter PIN. */
(function () {
  var css =
    '.ark.bred{max-width:1100px}' +
    '.t-hoved{display:flex;align-items:center;gap:8px;margin-top:10px}' +
    '.t-hoved .per{flex:1;text-align:center;font-weight:600}' +
    '.t-hoved .per small{display:block;color:var(--svag);font-weight:500;font-size:12px}' +
    '.t-status{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;padding:4px 10px;border-radius:999px;border:1px solid var(--linje2);color:var(--svag);margin-top:10px}' +
    '.t-status.laast{color:var(--gron);border-color:rgba(63,178,127,.45)}' +
    '.t-sum{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--linje);border-radius:10px;margin-top:12px;overflow:hidden}' +
    '.t-sum div{padding:10px 14px}.t-sum div+div{border-left:1px solid var(--linje)}' +
    '.t-sum b{display:block;font-size:20px;font-weight:600}.t-sum span{font-size:12px;color:var(--svag)}' +
    '.t-kal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px;margin-top:12px}' +
    '.t-kal .uh{font-size:11px;color:var(--svag);text-align:center;padding:2px 0}' +
    '.t-dag{border:1px solid var(--linje);background:var(--flade);border-radius:8px;min-height:54px;padding:5px 6px;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between;text-align:left;font:inherit;color:inherit}' +
    '.t-dag:hover{background:var(--hover)}' +
    '.t-dag .n{font-size:11.5px;color:var(--svag)}' +
    '.t-dag .h{font-size:15px;font-weight:600}' +
    '.t-dag.wk{background:var(--flade2)}' +
    '.t-dag.har{border-color:rgba(79,140,255,.45);background:var(--brandsvag)}' +
    '.t-dag.idag{box-shadow:inset 0 0 0 2px var(--brand)}' +
    '.t-dag.valgt{outline:2px solid var(--brand);outline-offset:1px}' +
    '.t-dag.frem{opacity:.5}' +
    '.t-dag[disabled]{cursor:default}' +
    '.t-dag .nt{font-size:10px;color:var(--svag);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.t-red{margin-top:14px;padding:14px;border:1px solid var(--linje);border-radius:10px;background:var(--flade2)}' +
    '.t-red h4{margin:0 0 8px;font-size:14px;font-weight:600}' +
    '.t-red .rk{display:flex;gap:8px;align-items:center;flex-wrap:wrap}' +
    '.t-red input.timer{width:110px;font-size:22px;font-weight:600;text-align:center;border:1px solid var(--linje2);border-radius:8px;padding:8px;background:var(--bg);color:var(--tekst)}' +
    '.t-red input.note{flex:1;min-width:180px;border:1px solid var(--linje2);border-radius:8px;padding:10px 12px;background:var(--bg);color:var(--tekst);font-size:14px}' +
    '.t-hurtig{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}' +
    '.t-tabel-wrap{overflow:auto;border:1px solid var(--linje);border-radius:10px;margin-top:12px;max-height:60vh}' +
    'table.t-tabel{border-collapse:separate;border-spacing:0;width:100%;font-size:13px}' +
    '.t-tabel th,.t-tabel td{padding:8px 10px;border-bottom:1px solid var(--linje);text-align:left;white-space:nowrap}' +
    '.t-tabel thead th{position:sticky;top:0;background:var(--flade2);font-weight:600;font-size:12px;color:var(--svag);z-index:1}' +
    '.t-tabel td.tal,.t-tabel th.tal{text-align:right;font-variant-numeric:tabular-nums}' +
    '.t-tabel tr:hover td{background:var(--hover)}' +
    '.t-tabel .navn{font-weight:600;cursor:pointer;color:var(--brand)}' +
    '.t-tabel .ok{color:var(--gron);font-weight:600}' +
    '.t-tabel .aaben{color:var(--service)}' +
    '.t-matrix th,.t-matrix td{padding:6px 7px;font-size:12px}' +
    '.t-matrix th.dg{text-align:center;min-width:34px}.t-matrix td.dg{text-align:center}' +
    '.t-matrix td.wk,.t-matrix th.wk{background:var(--flade2)}' +
    '.t-matrix td:first-child,.t-matrix th:first-child{position:sticky;left:0;background:var(--flade);z-index:2}' +
    '.t-knap-lille{height:30px;border:1px solid var(--linje2);border-radius:7px;background:var(--flade);color:var(--tekst);padding:0 10px;font:inherit;font-size:12.5px;cursor:pointer}' +
    '.t-knap-lille.gron{background:var(--gron);border-color:var(--gron);color:#fff}' +
    '@media print{.slor{position:static;background:none}.ark{max-height:none;box-shadow:none;border:0}.knapper,.t-hoved button{display:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  IK.ur = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
  IK.liste = '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>';
  IK.hent = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>';
  IK.laas = '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>';

  function kald(fn, args) {
    return fetch(API, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({fn: fn, args: args})})
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (r) { if (r && r.__fejl) throw new Error(r.__fejl); return r; });
  }
  function tt(n) { return String(Math.round(n * 100) / 100).replace('.', ','); }
  function plus(t, n) { return plusDage(t, n); }
  function datoer(fra, til) { var o = [], d = fra; while (d <= til) { o.push(d); d = plus(d, 1); } return o; }
  function kortPer(fra, til) { var a = tilDato(fra), b = tilDato(til); return a.getDate() + '. ' + MDR[a.getMonth()].slice(0, 3) + ' – ' + b.getDate() + '. ' + MDR[b.getMonth()].slice(0, 3) + ' ' + b.getFullYear(); }
  function forrige(fra) { var d = tilDato(fra); d.setMonth(d.getMonth() - 1); return tilTekst(d); }
  function naeste(fra) { var d = tilDato(fra); d.setMonth(d.getMonth() + 1); return tilTekst(d); }
  function bred() { var a = document.querySelector('.ark'); if (a) a.classList.add('bred'); }
  function venter(t) { aabnArk('<div class="spinner" style="margin:40px auto"></div><div class="lille" style="text-align:center">' + esc(t || 'Henter…') + '</div>'); }

  var T = {fra: '', navn: '', data: null, valgt: '', ov: null, matrix: false};

  /* ---------- Mine timer (medarbejder – eller ledelsen for en bestemt person) ---------- */
  function mine(fra, navn) {
    T.fra = fra || ''; T.navn = navn || '';
    venter('Henter timer…');
    kald('timerHent', [S.pin, T.fra, T.navn]).then(function (r) {
      if (r.fejl === 'pin') return logUd();
      if (r.fejl) { if (S.rolle === 'admin') return oversigt(); return aabnArk('<h2>Timer</h2><div class="under">' + esc(r.fejl) + '</div><div class="knapper"><button class="k" onclick="lukArk()">Luk</button></div>'); }
      T.data = r; T.fra = r.fra;
      if (!T.valgt || T.valgt < r.fra || T.valgt > r.til) T.valgt = (r.idag >= r.fra && r.idag <= r.til) ? r.idag : '';
      visMine();
    }).catch(function (e) { toast('Kunne ikke hente timer – ' + e.message); lukArk(); });
  }
  function visMine() {
    var r = T.data, h = '';
    var andenPerson = r.admin && r.person !== r.mig;
    h += '<div class="over">' + ik('ur') + (andenPerson ? 'Timer for ' + esc(r.person) + ' (ledelsen retter)' : 'Mine timer · ' + esc(r.person)) + '</div>';
    h += '<div class="t-hoved"><button class="tk ikon" onclick="VXT.mine(\'' + forrige(r.fra) + '\',\'' + jsq(T.navn) + '\')" aria-label="Forrige periode">' + ik('venstre') + '</button>' +
      '<div class="per">' + kortPer(r.fra, r.til) + '<small>Lønperiode' + (r.fra === r.aktuel ? ' · nuværende' : '') + '</small></div>' +
      ((r.admin || r.fra < r.aktuel) ? '<button class="tk ikon" onclick="VXT.mine(\'' + naeste(r.fra) + '\',\'' + jsq(T.navn) + '\')" aria-label="Næste periode">' + ik('hoejre') + '</button>' : '<span style="width:34px"></span>') + '</div>';
    h += r.godkendt ? '<div class="t-status laast">' + ik('laas') + 'Godkendt af ' + esc(r.godkendt.af) + ' ' + esc(r.godkendt.tid) + (r.kanRette ? ' – ledelsen kan stadig rette' : ' – kan ikke længere rettes') + '</div>'
      : '<div class="t-status">Åben – du kan rette, indtil ledelsen har godkendt perioden</div>';
    h += '<div class="t-sum"><div><b>' + tt(r.sum) + '</b><span>timer i alt</span></div><div><b>' + r.antal + '</b><span>dage registreret</span></div></div>';
    h += '<div class="t-kal">';
    ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].forEach(function (u) { h += '<div class="uh">' + u + '</div>'; });
    var ds = datoer(r.fra, r.til), pad = (tilDato(r.fra).getDay() + 6) % 7, slutPer = r.aktuel ? plus(naeste(r.aktuel), -1) : r.til;
    for (var i = 0; i < pad; i++) h += '<div></div>';
    ds.forEach(function (d) {
      var x = r.dage[d], dt = tilDato(d), wk = erWeekend(d), frem = d > r.idag;
      var spaerret = !r.kanRette || (!r.admin && d > slutPer);
      h += '<button class="t-dag' + (wk ? ' wk' : '') + (x ? ' har' : '') + (d === r.idag ? ' idag' : '') + (d === T.valgt ? ' valgt' : '') + (frem ? ' frem' : '') + '"' +
        (spaerret ? ' disabled' : ' onclick="VXT.vaelg(\'' + d + '\')"') + '>' +
        '<span class="n">' + dt.getDate() + (dt.getDate() === 1 || d === r.fra ? '. ' + MDR[dt.getMonth()].slice(0, 3) : '') + '</span>' +
        '<span class="h">' + (x ? tt(x.timer) : '') + '</span>' + (x && x.note ? '<span class="nt">' + esc(x.note) + '</span>' : '') + '</button>';
    });
    h += '</div>';
    if (T.valgt && r.kanRette) {
      var x = r.dage[T.valgt] || {};
      h += '<div class="t-red"><h4>' + esc(stort(langDato(T.valgt))) + '</h4>' +
        '<div class="rk"><input class="timer" id="t_timer" inputmode="decimal" placeholder="0" value="' + (x.timer != null ? tt(x.timer) : '') + '"><span class="lille">timer</span>' +
        '<input class="note" id="t_note" maxlength="200" placeholder="Bemærkning (valgfri) – fx syg, ferie, kørsel" value="' + esc(x.note || '') + '"></div>' +
        '<div class="t-hurtig">' + ['7,5', '8', '7', '6', '4'].map(function (v) { return '<button class="chip" onclick="VXT.hurtig(\'' + v + '\')">' + v + ' t</button>'; }).join('') + '</div>' +
        '<div class="knapper" style="margin-top:6px"><button class="k primaer" id="t_gem" onclick="VXT.gem()">Gem</button>' +
        (x.timer != null ? '<button class="k fare" onclick="VXT.slet(this)">' + ik('slet') + 'Slet dagen</button>' : '') + '</div></div>';
    } else if (r.kanRette) {
      h += '<div class="lille" style="margin-top:12px">Tryk på en dag i kalenderen for at skrive timer – også dage du har glemt.</div>';
    }
    h += '<div class="knapper">' + (r.admin ? '<button class="k" onclick="VXT.oversigt(\'' + r.fra + '\')">' + ik('liste') + 'Til timeoverblik</button>' : '') + '<button class="k" onclick="lukArk()">Luk</button></div>';
    aabnArk(h); bred();
    var f = document.getElementById('t_timer');
    if (f) { f.addEventListener('keydown', function (e) { if (e.key === 'Enter') VXT.gem(); }); if (PC) f.focus(); }
  }
  function vaelg(d) { T.valgt = d; visMine(); }
  function hurtig(v) { var f = document.getElementById('t_timer'); if (f) f.value = v; gem(); }
  function gem(slet) {
    var timer = slet ? '' : (document.getElementById('t_timer') || {}).value || '';
    var note = slet ? '' : (document.getElementById('t_note') || {}).value || '';
    if (!slet && !String(timer).trim()) return toast('Skriv antal timer – fx 7,5');
    var b = document.getElementById('t_gem'); if (b) { b.disabled = true; b.textContent = 'Gemmer…'; }
    kald('timerGem', [S.pin, {dato: T.valgt, timer: timer, note: note, navn: T.navn}]).then(function (r) {
      if (r.fejl) { toast(r.fejl); if (b) { b.disabled = false; b.textContent = 'Gem'; } return; }
      var d = T.data, gl = d.dage[T.valgt];
      if (gl) { d.sum -= gl.timer; d.antal--; delete d.dage[T.valgt]; }
      if (r.timer != null) { d.dage[T.valgt] = {timer: r.timer, note: note.trim()}; d.sum += r.timer; d.antal++; }
      toast(slet ? 'Dagen er slettet' : 'Gemt: ' + tt(r.timer) + ' timer');
      var nxt = plus(T.valgt, 1);
      while (nxt <= d.til && nxt <= d.idag && (erWeekend(nxt) || d.dage[nxt])) nxt = plus(nxt, 1);
      T.valgt = (!slet && nxt <= d.til && nxt <= d.idag) ? nxt : T.valgt;
      visMine();
    }).catch(function (e) { toast('Kunne ikke gemme – ' + e.message); if (b) { b.disabled = false; b.textContent = 'Gem'; } });
  }
  function slet(b) { if (b.getAttribute('data-ok')) return gem(true); b.setAttribute('data-ok', '1'); b.innerHTML = 'Klik igen for at slette'; }

  /* ---------- Timeoverblik (kun ledelsen) ---------- */
  function oversigt(fra) {
    venter('Henter alle medarbejderes timer…');
    kald('timerOversigt', [S.pin, fra || '']).then(function (r) {
      if (r.fejl) return aabnArk('<h2>Timeoverblik</h2><div class="under">' + esc(r.fejl) + '</div><div class="knapper"><button class="k" onclick="lukArk()">Luk</button></div>');
      T.ov = r; visOversigt();
    }).catch(function (e) { toast('Kunne ikke hente – ' + e.message); lukArk(); });
  }
  function visOversigt() {
    var r = T.ov, h = '', total = 0, godk = 0;
    r.personer.forEach(function (p) { total += p.sum; if (p.godkendt) godk++; });
    h += '<div class="over">' + ik('liste') + 'Timeoverblik – til lønnen</div>';
    h += '<div class="t-hoved"><button class="tk ikon" onclick="VXT.oversigt(\'' + forrige(r.fra) + '\')">' + ik('venstre') + '</button>' +
      '<div class="per">' + kortPer(r.fra, r.til) + '<small>Lønperiode' + (r.fra === r.aktuel ? ' · nuværende' : '') + '</small></div>' +
      '<button class="tk ikon" onclick="VXT.oversigt(\'' + naeste(r.fra) + '\')">' + ik('hoejre') + '</button></div>';
    h += '<div class="t-sum"><div><b>' + tt(total) + '</b><span>timer i alt</span></div><div><b>' + godk + ' / ' + r.personer.length + '</b><span>godkendt</span></div></div>';
    if (!T.matrix) {
      h += '<div class="t-tabel-wrap"><table class="t-tabel"><thead><tr><th>Medarbejder</th><th class="tal">Dage</th><th class="tal">Timer</th><th>Status</th><th></th></tr></thead><tbody>';
      r.personer.forEach(function (p) {
        h += '<tr><td class="navn" onclick="VXT.mine(\'' + r.fra + '\',\'' + jsq(p.navn) + '\')">' + esc(p.navn) + '</td><td class="tal">' + p.antal + '</td><td class="tal"><b>' + tt(p.sum) + '</b></td>' +
          '<td>' + (p.godkendt ? '<span class="ok">✓ Godkendt</span> <span class="lille">' + esc(p.godkendt.af) + ' ' + esc(p.godkendt.tid) + '</span>' : '<span class="aaben">Åben</span>') + '</td>' +
          '<td>' + (p.godkendt ? '<button class="t-knap-lille" onclick="VXT.godkend(this,\'' + jsq(p.navn) + '\',false)">Genåbn</button>'
            : '<button class="t-knap-lille gron" onclick="VXT.godkend(this,\'' + jsq(p.navn) + '\',true)">Godkend</button>') + '</td></tr>';
      });
      h += '</tbody></table></div>';
      h += '<div class="lille" style="margin-top:8px">Tryk på et navn for at se dagene og rette. Godkend låser perioden for medarbejderen.</div>';
    } else {
      var ds = datoer(r.fra, r.til);
      h += '<div class="t-tabel-wrap"><table class="t-tabel t-matrix"><thead><tr><th>Medarbejder</th>';
      ds.forEach(function (d) { var dt = tilDato(d); h += '<th class="dg' + (erWeekend(d) ? ' wk' : '') + '">' + dt.getDate() + '/' + (dt.getMonth() + 1) + '</th>'; });
      h += '<th class="tal">I alt</th></tr></thead><tbody>';
      r.personer.forEach(function (p) {
        h += '<tr><td class="navn" onclick="VXT.mine(\'' + r.fra + '\',\'' + jsq(p.navn) + '\')">' + esc(p.navn) + (p.godkendt ? ' ✓' : '') + '</td>';
        ds.forEach(function (d) { var x = p.dage[d]; h += '<td class="dg' + (erWeekend(d) ? ' wk' : '') + '"' + (x && x.note ? ' title="' + esc(x.note) + '"' : '') + '>' + (x ? tt(x.timer) + (x.note ? '*' : '') : '') + '</td>'; });
        h += '<td class="tal"><b>' + tt(p.sum) + '</b></td></tr>';
      });
      h += '</tbody></table></div><div class="lille" style="margin-top:8px">* = der er en bemærkning (hold musen over feltet).</div>';
    }
    h += '<div class="knapper"><button class="k" onclick="VXT.skiftVisning()">' + ik('uge') + (T.matrix ? 'Vis oversigt' : 'Vis alle dage') + '</button>' +
      '<button class="k" onclick="VXT.csv()">' + ik('hent') + 'Download til Excel</button>' +
      '<button class="k" onclick="window.print()">' + ik('print') + 'Udskriv</button>' +
      (r.mig ? '<button class="k" onclick="VXT.mine(\'' + r.fra + '\',\'\')">' + ik('ur') + 'Mine timer</button>' : '') +
      '<button class="k" onclick="lukArk()">Luk</button></div>';
    aabnArk(h); bred();
  }
  function godkend(b, navn, ja) {
    if (!b.getAttribute('data-ok')) { b.setAttribute('data-ok', '1'); b.textContent = ja ? 'Klik igen – godkend' : 'Klik igen – genåbn'; return; }
    b.disabled = true; b.textContent = '…';
    kald('timerGodkend', [S.pin, T.ov.fra, navn, ja]).then(function (r) {
      if (r.fejl) return toast(r.fejl);
      toast(ja ? navn + ' er godkendt og låst' : navn + ' er åbnet igen'); oversigt(T.ov.fra);
    }).catch(function (e) { toast('Fejl – ' + e.message); b.disabled = false; });
  }
  function csv() {
    var r = T.ov, ds = datoer(r.fra, r.til), sep = ';', lin = [];
    var q = function (s) { s = String(s == null ? '' : s); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    lin.push(['Medarbejder', 'Timer i alt', 'Dage', 'Status'].concat(ds.map(function (d) { var x = tilDato(d); return x.getDate() + '/' + (x.getMonth() + 1); })).concat(['Bemærkninger']).join(sep));
    r.personer.forEach(function (p) {
      var noter = ds.filter(function (d) { return p.dage[d] && p.dage[d].note; }).map(function (d) { var x = tilDato(d); return x.getDate() + '/' + (x.getMonth() + 1) + ': ' + p.dage[d].note; }).join(' | ');
      lin.push([q(p.navn), tt(p.sum), p.antal, p.godkendt ? 'Godkendt ' + p.godkendt.tid : 'Åben'].concat(ds.map(function (d) { return p.dage[d] ? tt(p.dage[d].timer) : ''; })).concat([q(noter)]).join(sep));
    });
    var blob = new Blob(['﻿' + lin.join('\r\n')], {type: 'text/csv;charset=utf-8'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Ventilux timer ' + r.fra + ' til ' + r.til + '.csv';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  window.VXT = {
    mine: mine, vaelg: vaelg, hurtig: hurtig, gem: function () { gem(false); }, slet: slet,
    oversigt: oversigt, godkend: godkend, csv: csv,
    skiftVisning: function () { T.matrix = !T.matrix; visOversigt(); },
    aabn: function () { if (S.rolle === 'admin') oversigt(); else mine(); }
  };

  /* ---------- Knapper i appen ---------- */
  var _tegn = window.tegn;
  window.tegn = function () {
    _tegn.apply(this, arguments);
    var top = document.querySelector('.top-indre');
    if (top && !top.querySelector('.t-knap')) {
      var b = document.createElement('button');
      b.className = 'tk t-knap' + (S.rolle === 'admin' ? '' : ' primaer');
      b.title = S.rolle === 'admin' ? 'Timeoverblik (løn)' : 'Mine timer';
      b.innerHTML = ik(S.rolle === 'admin' ? 'liste' : 'ur') + '<span class="kun-pc">' + (S.rolle === 'admin' ? 'Timeoverblik' : 'Mine timer') + '</span>';
      b.onclick = VXT.aabn;
      var tema = top.querySelector('[onclick="skiftTema()"]');
      top.insertBefore(b, tema);
    }
    var bund = document.querySelector('.bund');
    if (bund && !bund.querySelector('.t-knap')) {
      var c = document.createElement('button'); c.className = 't-knap';
      c.innerHTML = ik(S.rolle === 'admin' ? 'liste' : 'ur') + (S.rolle === 'admin' ? 'Løn' : 'Timer');
      c.onclick = VXT.aabn; bund.appendChild(c);
    }
  };
  if (S.data && document.querySelector('.top-indre')) window.tegn();
})();
