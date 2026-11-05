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
    '.t-sum.tre{grid-template-columns:1fr 1fr 1fr}.t-sum .ot b{color:var(--service)}' +
    '.t-dag .n{display:flex;justify-content:space-between;gap:2px}' +
    '.t-dag .otm{color:var(--service);font-weight:700;font-size:10.5px}' +
    '.t-dag .tl{font-size:9.5px;color:var(--svag);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}' +
    '.t-felt{display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--svag);font-weight:500}' +
    '.t-tid{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap}' +
    '.t-tid input[type=time]{font:inherit;font-size:22px;font-weight:600;width:132px;height:50px;text-align:center;border:1px solid var(--linje2);border-radius:8px;padding:0 8px;background:var(--bg);color:var(--tekst);color-scheme:light dark}' +
    '.t-tid .pil{font-size:20px;color:var(--svag);padding-bottom:12px}' +
    '.t-beregn{font-size:13px;color:var(--svag);margin:8px 0 2px;min-height:18px}.t-beregn b{color:var(--tekst)}' +
    '.t-linje{height:1px;background:var(--linje);margin:14px 0}' +
    '.t-red input.timer.ot{border-color:rgba(217,164,65,.55)}' +
    '.t-red .chip.ot{border-color:rgba(217,164,65,.45)}' +
    '.t-hjaelp{font-size:12.5px;color:var(--svag);margin:0 0 12px}' +
    '.t-tabel .otc{color:var(--service);font-weight:600}' +
    '@media (max-width:560px){.t-tid input[type=time]{width:120px;font-size:20px}.t-sum b{font-size:18px}.t-sum div{padding:8px 10px}}' +
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
  function kort(k) { return k ? k.replace(/^0/, '').replace(/:00$/, '') : ''; }
  function mini(k) { return k ? kort(k).replace(/:30$/, '½').replace(/:15$/, '¼').replace(/:45$/, '¾') : ''; }
  function tidTilMin(k) { var m = /^(\d{1,2}):(\d{2})/.exec(k || ''); return m ? +m[1] * 60 + +m[2] : null; }
  function tOgMin(t) { var h = Math.floor(t + 1e-9), m = Math.round((t - h) * 60); if (m === 60) { h++; m = 0; } return h + ' t' + (m ? ' ' + m + ' min' : ''); }
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
    h += '<div class="t-sum tre"><div><b>' + tt(r.sum) + '</b><span>timer i alt</span></div><div class="ot"><b>' + tt(r.over || 0) + '</b><span>heraf overarbejde</span></div><div><b>' + r.antal + '</b><span>dage</span></div></div>';
    h += '<div class="t-kal">';
    ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].forEach(function (u) { h += '<div class="uh">' + u + '</div>'; });
    var ds = datoer(r.fra, r.til), pad = (tilDato(r.fra).getDay() + 6) % 7, slutPer = r.aktuel ? plus(naeste(r.aktuel), -1) : r.til;
    for (var i = 0; i < pad; i++) h += '<div></div>';
    ds.forEach(function (d) {
      var x = r.dage[d], dt = tilDato(d), wk = erWeekend(d), frem = d > r.idag;
      var spaerret = !r.kanRette || (!r.admin && d > slutPer);
      h += '<button class="t-dag' + (wk ? ' wk' : '') + (x ? ' har' : '') + (d === r.idag ? ' idag' : '') + (d === T.valgt ? ' valgt' : '') + (frem ? ' frem' : '') + '"' +
        (spaerret ? ' disabled' : ' onclick="VXT.vaelg(\'' + d + '\')"') + '>' +
        '<span class="n"><span>' + dt.getDate() + (dt.getDate() === 1 || d === r.fra ? '. ' + MDR[dt.getMonth()].slice(0, 3) : '') + '</span>' + (x && x.over ? '<span class="otm">+' + tt(x.over) + '</span>' : '') + '</span>' +
        '<span class="h">' + (x ? tt(x.timer) : '') + '</span>' + (x && x.start && x.slut ? '<span class="tl">' + mini(x.start) + '–' + mini(x.slut) + '</span>' : (x && x.note ? '<span class="nt">' + esc(x.note) + '</span>' : '')) + '</button>';
    });
    h += '</div>';
    if (T.valgt && r.kanRette) {
      var x = r.dage[T.valgt] || {}, sd = r.sidst;
      h += '<div class="t-red"><h4>' + esc(stort(langDato(T.valgt))) + '</h4>' +
        '<p class="t-hjaelp">Skriv hvornår du mødte og fik fri – så regner appen selv timerne ud.</p>' +
        '<div class="t-tid"><label class="t-felt">Mødt<input type="time" id="t_start" step="300" value="' + esc(x.start || '') + '"></label>' +
        '<span class="pil">→</span>' +
        '<label class="t-felt">Fri<input type="time" id="t_slut" step="300" value="' + esc(x.slut || '') + '"></label></div>' +
        (sd && !x.timer && x.timer !== 0 ? '<div class="t-hurtig"><button class="chip" onclick="VXT.sidst()">↺ Samme tider som sidst (' + kort(sd.start) + '–' + kort(sd.slut) + ')</button></div>' : '') +
        '<div class="t-beregn" id="t_beregn"></div>' +
        '<div class="rk"><label class="t-felt">Timer i alt<input class="timer" id="t_timer" inputmode="decimal" placeholder="0" value="' + (x.timer != null ? tt(x.timer) : '') + '"></label>' +
        '<label class="t-felt">Heraf overarbejde<input class="timer ot" id="t_over" inputmode="decimal" placeholder="0" value="' + (x.over ? tt(x.over) : '') + '"></label></div>' +
        '<div class="t-hurtig"><span class="lille" style="align-self:center">Overarbejde:</span>' + ['0', '0,5', '1', '1,5', '2', '3'].map(function (v) { return '<button class="chip ot" onclick="VXT.over(\'' + v + '\')">' + v + ' t</button>'; }).join('') + '</div>' +
        '<input class="note" id="t_note" style="width:100%" maxlength="200" placeholder="Bemærkning (valgfri) – fx syg, ferie, hvorfor overarbejde" value="' + esc(x.note || '') + '">' +
        '<div class="knapper" style="margin-top:12px"><button class="k primaer" id="t_gem" onclick="VXT.gem()">Gem</button>' +
        (x.timer != null ? '<button class="k fare" onclick="VXT.slet(this)">' + ik('slet') + 'Slet dagen</button>' : '') + '</div></div>';
    } else if (r.kanRette) {
      h += '<div class="lille" style="margin-top:12px">Tryk på en dag i kalenderen for at skrive timer – også dage du har glemt.</div>';
    }
    h += '<div class="knapper">' + (r.admin ? '<button class="k" onclick="VXT.oversigt(\'' + r.fra + '\')">' + ik('liste') + 'Til timeoverblik</button>' : '') + '<button class="k" onclick="lukArk()">Luk</button></div>';
    aabnArk(h); bred();
    ['t_timer', 't_over', 't_note'].forEach(function (id) { var e = document.getElementById(id); if (e) e.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') VXT.gem(); }); });
    ['t_start', 't_slut'].forEach(function (id) { var e = document.getElementById(id); if (e) { e.addEventListener('input', beregn); e.addEventListener('change', beregn); } });
    beregn(true);
  }
  function beregn(stille) {
    var a = document.getElementById('t_start'), b = document.getElementById('t_slut'), f = document.getElementById('t_timer'), o = document.getElementById('t_beregn');
    if (!a || !b || !o) return;
    var s1 = tidTilMin(a.value), s2 = tidTilMin(b.value);
    if (s1 == null || s2 == null) { o.innerHTML = ''; return; }
    if (s2 <= s1) { o.innerHTML = '<span style="color:var(--rod)">Fri skal være senere end mødt</span>'; return; }
    var t = (s2 - s1) / 60;
    o.innerHTML = kort(a.value) + ' → ' + kort(b.value) + ' = <b>' + tOgMin(t) + '</b>';
    if (stille !== true) f.value = tt(t);
  }
  function sidst() {
    var sd = T.data.sidst; if (!sd) return;
    document.getElementById('t_start').value = sd.start; document.getElementById('t_slut').value = sd.slut; beregn();
  }
  function over(v) { var f = document.getElementById('t_over'); if (f) f.value = v === '0' ? '' : v; }
  function vaelg(d) { T.valgt = d; visMine(); }
  function hurtig(v) { var f = document.getElementById('t_timer'); if (f) f.value = v; gem(); }
  function gem(slet) {
    var val = function (id) { return slet ? '' : ((document.getElementById(id) || {}).value || ''); };
    var timer = val('t_timer'), note = val('t_note'), start = val('t_start'), slut = val('t_slut'), ov = val('t_over');
    if (!slet && !String(timer).trim() && !(start && slut)) return toast('Skriv hvornår du mødte og fik fri – eller antal timer');
    if (!slet && (start && !slut || slut && !start)) return toast('Skriv både mødt og fri');
    var b = document.getElementById('t_gem'); if (b) { b.disabled = true; b.textContent = 'Gemmer…'; }
    kald('timerGem', [S.pin, {dato: T.valgt, timer: timer, note: note, navn: T.navn, start: start, slut: slut, over: ov}]).then(function (r) {
      if (r.fejl) { toast(r.fejl); if (b) { b.disabled = false; b.textContent = 'Gem'; } return; }
      var d = T.data, gl = d.dage[T.valgt];
      d.over = d.over || 0;
      if (gl) { d.sum -= gl.timer; d.over -= (gl.over || 0); d.antal--; delete d.dage[T.valgt]; }
      if (r.timer != null) {
        d.dage[T.valgt] = {timer: r.timer, note: note.trim(), start: r.start || '', slut: r.slut || '', over: r.over || 0};
        d.sum += r.timer; d.over += (r.over || 0); d.antal++;
        if (r.start && r.slut && (!d.sidst || T.valgt >= d.sidst.dato)) d.sidst = {dato: T.valgt, start: r.start, slut: r.slut};
      }
      d.sum = Math.round(d.sum * 100) / 100; d.over = Math.round(d.over * 100) / 100;
      toast(slet ? 'Dagen er slettet' : 'Gemt: ' + tt(r.timer) + ' timer' + (r.over ? ' (heraf ' + tt(r.over) + ' overarbejde)' : ''));
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
    var r = T.ov, h = '', total = 0, godk = 0, ovt = 0;
    r.personer.forEach(function (p) { total += p.sum; ovt += (p.over || 0); if (p.godkendt) godk++; });
    h += '<div class="over">' + ik('liste') + 'Timeoverblik – til lønnen</div>';
    h += '<div class="t-hoved"><button class="tk ikon" onclick="VXT.oversigt(\'' + forrige(r.fra) + '\')">' + ik('venstre') + '</button>' +
      '<div class="per">' + kortPer(r.fra, r.til) + '<small>Lønperiode' + (r.fra === r.aktuel ? ' · nuværende' : '') + '</small></div>' +
      '<button class="tk ikon" onclick="VXT.oversigt(\'' + naeste(r.fra) + '\')">' + ik('hoejre') + '</button></div>';
    h += '<div class="t-sum tre"><div><b>' + tt(total) + '</b><span>timer i alt</span></div><div class="ot"><b>' + tt(ovt) + '</b><span>heraf overarbejde</span></div><div><b>' + godk + ' / ' + r.personer.length + '</b><span>godkendt</span></div></div>';
    if (!T.matrix) {
      h += '<div class="t-tabel-wrap"><table class="t-tabel"><thead><tr><th>Medarbejder</th><th class="tal">Dage</th><th class="tal">Timer</th><th class="tal">Overarb.</th><th>Status</th><th></th></tr></thead><tbody>';
      r.personer.forEach(function (p) {
        h += '<tr><td class="navn" onclick="VXT.mine(\'' + r.fra + '\',\'' + jsq(p.navn) + '\')">' + esc(p.navn) + '</td><td class="tal">' + p.antal + '</td><td class="tal"><b>' + tt(p.sum) + '</b></td><td class="tal' + (p.over ? ' otc' : '') + '">' + (p.over ? tt(p.over) : '–') + '</td>' +
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
        ds.forEach(function (d) {
          var x = p.dage[d], tip = x ? [x.start && x.slut ? x.start + '–' + x.slut : '', x.over ? 'Overarbejde ' + tt(x.over) + ' t' : '', x.note || ''].filter(Boolean).join(' · ') : '';
          h += '<td class="dg' + (erWeekend(d) ? ' wk' : '') + (x && x.over ? ' otc' : '') + '"' + (tip ? ' title="' + esc(tip) + '"' : '') + '>' + (x ? tt(x.timer) + (x.note ? '*' : '') : '') + '</td>';
        });
        h += '<td class="tal"><b>' + tt(p.sum) + '</b>' + (p.over ? '<div class="otc lille">+' + tt(p.over) + '</div>' : '') + '</td></tr>';
      });
      h += '</tbody></table></div><div class="lille" style="margin-top:8px">Orange = dag med overarbejde · * = bemærkning. Hold musen over et felt for at se mødt/fri.</div>';
    }
    h += '<div class="knapper"><button class="k" onclick="VXT.skiftVisning()">' + ik('uge') + (T.matrix ? 'Vis oversigt' : 'Vis alle dage') + '</button>' +
      '<button class="k" onclick="VXT.csv()">' + ik('hent') + 'Excel – oversigt</button>' +
      '<button class="k" onclick="VXT.csvDage()">' + ik('hent') + 'Excel pr. dag</button>' +
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
    lin.push(['Medarbejder', 'Timer i alt', 'Heraf overarbejde', 'Dage', 'Status'].concat(ds.map(function (d) { var x = tilDato(d); return x.getDate() + '/' + (x.getMonth() + 1); })).concat(['Bemærkninger']).join(sep));
    r.personer.forEach(function (p) {
      var noter = ds.filter(function (d) { return p.dage[d] && p.dage[d].note; }).map(function (d) { var x = tilDato(d); return x.getDate() + '/' + (x.getMonth() + 1) + ': ' + p.dage[d].note; }).join(' | ');
      lin.push([q(p.navn), tt(p.sum), tt(p.over || 0), p.antal, p.godkendt ? 'Godkendt ' + p.godkendt.tid : 'Åben'].concat(ds.map(function (d) { return p.dage[d] ? tt(p.dage[d].timer) : ''; })).concat([q(noter)]).join(sep));
    });
    hentFil(lin, 'Ventilux timer ' + r.fra + ' til ' + r.til + '.csv');
  }
  function hentFil(lin, navn) {
    var blob = new Blob(['\ufeff' + lin.join('\r\n')], {type: 'text/csv;charset=utf-8'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = navn;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function csvDage() {
    var r = T.ov, ds = datoer(r.fra, r.til), sep = ';', lin = [];
    var q = function (s) { s = String(s == null ? '' : s); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
    lin.push(['Medarbejder', 'Dato', 'Ugedag', 'Mødt', 'Fri', 'Timer', 'Heraf overarbejde', 'Bemærkning'].join(sep));
    r.personer.forEach(function (p) {
      ds.forEach(function (d) {
        var x = p.dage[d]; if (!x) return; var dt = tilDato(d);
        lin.push([q(p.navn), dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear(), DAGE[dt.getDay()], x.start || '', x.slut || '', tt(x.timer), x.over ? tt(x.over) : '', q(x.note)].join(sep));
      });
      if (p.antal) lin.push([q(p.navn + ' – i alt'), '', '', '', '', tt(p.sum), tt(p.over || 0), ''].join(sep));
    });
    hentFil(lin, 'Ventilux timer dag for dag ' + r.fra + ' til ' + r.til + '.csv');
  }

  window.VXT = {
    mine: mine, vaelg: vaelg, hurtig: hurtig, gem: function () { gem(false); }, slet: slet, sidst: sidst, over: over,
    oversigt: oversigt, godkend: godkend, csv: csv, csvDage: csvDage,
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
