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
    '.t-rv-top{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}' +
    '.t-rv-liste{border:1px solid var(--linje);border-radius:10px;overflow:hidden}' +
    '.t-rv{display:flex;align-items:center;gap:12px;padding:11px 14px;border-bottom:1px solid var(--linje);cursor:pointer}.t-rv:last-child{border-bottom:0}' +
    '.t-rv input{width:20px;height:20px;accent-color:var(--brand,#3b82f6);flex:none}.t-rv .nv{flex:1;font-weight:500}' +
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
    '.t-norm{display:flex;align-items:center;gap:14px;width:100%;padding:14px 16px;border:2px solid var(--linje2);border-radius:12px;background:var(--bg);cursor:pointer;font:inherit;color:inherit;text-align:left;-webkit-tap-highlight-color:transparent}' +
    '.t-norm .bx{flex:none;width:30px;height:30px;border-radius:8px;border:2px solid var(--linje2);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#fff}' +
    '.t-norm b{display:block;font-size:16px;color:var(--tekst)}.t-norm span{font-size:13px;color:var(--svag)}' +
    '.t-norm.paa{border-color:var(--gron);background:rgba(63,178,127,.10)}.t-norm.paa .bx{background:var(--gron);border-color:var(--gron)}' +
    '.t-anden{margin-top:12px;padding:12px;border:1px dashed var(--linje2);border-radius:10px}' +
    '.t-anden .lbl{font-size:13px;font-weight:600;margin-bottom:8px}' +
    '.t-ot{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:14px}' +
    '.t-ot .lbl{font-size:14px;font-weight:600}' +
    '.t-step{display:flex;align-items:center;border:1px solid var(--linje2);border-radius:10px;overflow:hidden;background:var(--bg)}' +
    '.t-step button{width:46px;height:48px;border:0;background:var(--flade);color:var(--tekst);font-size:22px;cursor:pointer}' +
    '.t-step input{width:72px;height:48px;border:0;text-align:center;font-size:20px;font-weight:600;background:var(--bg);color:var(--tekst)}' +
    '.t-dag .nm{font-size:10px;color:var(--gron);font-weight:600}' +
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
  function normal(d) { var w = tilDato(d).getDay(); if (w === 0 || w === 6) return null; return w === 5 ? {start: '07:00', slut: '14:00', timer: 7} : {start: '07:00', slut: '14:30', timer: 7.5}; }
  function erNormal(d, x) { var n = normal(d); return !!(n && x && x.start === n.start && x.slut === n.slut && x.timer === n.timer); }
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
    h += '<div class="t-sum tre"><div><b>' + tt(r.sum) + '</b><span>timer normal tid</span></div><div class="ot"><b>' + tt(r.over || 0) + '</b><span>overarbejde</span></div><div><b>' + r.antal + '</b><span>dage</span></div></div>';
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
        '<span class="h">' + (x ? tt(x.timer) : '') + '</span>' + (x && erNormal(d, x) ? '<span class="nm">✓ Normal</span>' : x && x.start && x.slut ? '<span class="tl">' + mini(x.start) + '–' + mini(x.slut) + '</span>' : (x && x.note ? '<span class="nt">' + esc(x.note) + '</span>' : '')) + '</button>';
    });
    h += '</div>';
    if (T.valgt && r.kanRette) {
      var x = r.dage[T.valgt] || {}, n = normal(T.valgt), ny = x.timer == null;
      T.norm = !!n && (ny ? true : erNormal(T.valgt, x));
      h += '<div class="t-red"><h4>' + esc(stort(langDato(T.valgt))) + '</h4>';
      if (n) h += '<button type="button" class="t-norm' + (T.norm ? ' paa' : '') + '" id="t_norm" onclick="VXT.norm()"><span class="bx">' + (T.norm ? '✓' : '') + '</span>' +
        '<span><b>Normal arbejdsdag</b><span>' + n.start + ' – ' + n.slut + ' · ' + tt(n.timer) + ' timer</span></span></button>';
      h += '<div class="t-anden" id="t_anden"' + (T.norm ? ' style="display:none"' : '') + '><div class="lbl">' + (n ? 'Anden arbejdstid i dag' : 'Weekend – skriv dine timer') + '</div>' +
        '<div class="t-tid"><label class="t-felt">Mødt<input type="time" id="t_start" step="300" value="' + esc(x.start || '') + '"></label>' +
        '<span class="pil">→</span>' +
        '<label class="t-felt">Fri<input type="time" id="t_slut" step="300" value="' + esc(x.slut || '') + '"></label></div>' +
        '<div class="t-beregn" id="t_beregn"></div>' +
        '<label class="t-felt">Timer<input class="timer" id="t_timer" inputmode="decimal" placeholder="0" value="' + (x.timer != null ? tt(x.timer) : '') + '"></label>' +
        '<div class="lille" style="margin-top:6px">Syg, ferie eller fri? Skriv 0 timer og en bemærkning.</div></div>';
      h += '<div class="t-ot"><span class="lbl">Overarbejde</span><div class="t-step"><button type="button" onclick="VXT.step(-0.5)" aria-label="Mindre">−</button>' +
        '<input id="t_over" inputmode="decimal" placeholder="0" value="' + (x.over ? tt(x.over) : '') + '"><button type="button" onclick="VXT.step(0.5)" aria-label="Mere">+</button></div><span class="lille">timer ekstra</span></div>' +
        '<input class="note" id="t_note" style="width:100%;margin-top:12px" maxlength="200" placeholder="Bemærkning (valgfri) – fx hvorfor overarbejde" value="' + esc(x.note || '') + '">' +
        '<div class="knapper" style="margin-top:12px"><button class="k primaer" id="t_gem" onclick="VXT.gem()">Gem</button>' +
        (!ny ? '<button class="k fare" onclick="VXT.slet(this)">' + ik('slet') + 'Slet dagen</button>' : '') + '</div></div>';
    } else if (r.kanRette) {
      h += '<div class="lille" style="margin-top:12px">Tryk på en dag i kalenderen for at skrive timer – også dage du har glemt.</div>';
    }
    h += '<div class="knapper">' + (r.admin ? '<button class="k" onclick="VXT.oversigt(\'' + r.fra + '\')">' + ik('liste') + 'Til timeoverblik</button>' : '') + '<button class="k" onclick="VXT.rapport(1)">' + ik('print') + 'Udskriv rapport</button><button class="k" onclick="lukArk()">Luk</button></div>';
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
  function norm() {
    T.norm = !T.norm;
    var b = document.getElementById('t_norm'), a = document.getElementById('t_anden');
    b.classList.toggle('paa', T.norm); b.querySelector('.bx').textContent = T.norm ? '✓' : '';
    a.style.display = T.norm ? 'none' : '';
    if (!T.norm) { var f = document.getElementById('t_start'); if (f && PC) f.focus(); }
  }
  function step(d) {
    var f = document.getElementById('t_over'); if (!f) return;
    var v = Number(String(f.value || '0').replace(',', '.')) || 0; v = Math.max(0, Math.round((v + d) * 2) / 2);
    f.value = v ? tt(v) : '';
  }
  function vaelg(d) { T.valgt = d; visMine(); }
  function hurtig(v) { var f = document.getElementById('t_timer'); if (f) f.value = v; gem(); }
  function gem(slet) {
    var val = function (id) { return slet ? '' : ((document.getElementById(id) || {}).value || ''); };
    var timer = val('t_timer'), note = val('t_note'), start = val('t_start'), slut = val('t_slut'), ov = val('t_over');
    var n = normal(T.valgt);
    if (!slet && n && T.norm) { start = n.start; slut = n.slut; timer = String(n.timer); }
    if (!slet && !T.norm && !String(timer).trim() && !(start && slut)) return toast('Skriv hvornår du mødte og fik fri – eller antal timer');
    if (!slet && !T.norm && (start && !slut || slut && !start)) return toast('Skriv både mødt og fri');
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
      toast(slet ? 'Dagen er slettet' : 'Gemt: ' + tt(r.timer) + ' timer' + (r.over ? ' + ' + tt(r.over) + ' t overarbejde' : ''));
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
    h += '<div class="t-sum tre"><div><b>' + tt(total) + '</b><span>timer normal tid</span></div><div class="ot"><b>' + tt(ovt) + '</b><span>overarbejde</span></div><div><b>' + godk + ' / ' + r.personer.length + '</b><span>godkendt</span></div></div>';
    if (!T.matrix) {
      h += '<div class="t-tabel-wrap"><table class="t-tabel"><thead><tr><th>Medarbejder</th><th class="tal">Dage</th><th class="tal">Timer</th><th class="tal">Overarb.</th><th class="tal">I alt</th><th>Status</th><th></th></tr></thead><tbody>';
      r.personer.forEach(function (p) {
        h += '<tr><td class="navn" onclick="VXT.mine(\'' + r.fra + '\',\'' + jsq(p.navn) + '\')">' + esc(p.navn) + '</td><td class="tal">' + p.antal + '</td><td class="tal"><b>' + tt(p.sum) + '</b></td><td class="tal' + (p.over ? ' otc' : '') + '">' + (p.over ? tt(p.over) : '–') + '</td><td class="tal">' + tt(p.sum + (p.over || 0)) + '</td>' +
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
      '<button class="k" onclick="VXT.rapport()">' + ik('print') + 'Udskriv rapport</button>' +
      (r.mig ? '<button class="k" onclick="VXT.mine(\'' + r.fra + '\',\'\')">' + ik('ur') + 'Mine timer</button>' : '') +
      '<button class="k" onclick="lukArk()">Luk</button></div>';
    aabnArk(h); bred();
  }
  /* ---------- Udskriv: periode-rapport (samlet + én side pr. medarbejder) ---------- */
  function dmy(d) { var t = tilDato(d); return ('0' + t.getDate()).slice(-2) + '/' + ('0' + (t.getMonth() + 1)).slice(-2) + '/' + t.getFullYear(); }
  function rapportHtml(personer, fra, til, opt) {
    opt = opt || {oversigt: true, sider: true};
    var nu = new Date(), udskr = ('0' + nu.getDate()).slice(-2) + '/' + ('0' + (nu.getMonth() + 1)).slice(-2) + '/' + nu.getFullYear() + ' kl. ' + ('0' + nu.getHours()).slice(-2) + ':' + ('0' + nu.getMinutes()).slice(-2);
    var af = (T.ov && T.ov.mig) || (T.data && T.data.mig) || 'Ledelse';
    var ds = datoer(fra, til), per = dmy(fra) + ' – ' + dmy(til);
    var t2 = function (n) { return tt(n || 0) + ' t'; };
    var hoved = function (titel, hoejre) {
      return '<header><div><div class="kick">Officiel timeregistrering &amp; rapport</div><h1>' + titel + '</h1><div class="per">Lønperiode: <b>' + per + '</b></div></div>' +
        '<div class="firma"><div class="fn">Ventilux ApS</div>' + hoejre + '</div></header>';
    };
    var kort = function (a) {
      return '<div class="kort">' + a.map(function (k) { return '<div class="k ' + k[2] + '"><span>' + k[0] + '</span><b>' + k[1] + '</b></div>'; }).join('') + '</div>';
    };
    var sider = [];
    if (opt.oversigt) {
      var S1 = 0, S2 = 0, g = 0;
      personer.forEach(function (p) { S1 += p.sum; S2 += (p.over || 0); if (p.godkendt) g++; });
      var h = hoved('Samlet lønoversigt', '<div class="sm">' + (opt.alle ? 'Alle medarbejdere' : personer.length + (personer.length === 1 ? ' udvalgt medarbejder' : ' udvalgte medarbejdere')) + '</div>') +
        kort([['Normale timer', t2(S1), ''], ['Overarbejde', '+' + t2(S2), 'gron'], ['Godkendt', g + ' af ' + personer.length, 'lilla'], ['Timer i alt', t2(S1 + S2), 'bla']]) +
        '<h2>Oversigt pr. medarbejder</h2><table><thead><tr><th>Medarbejder</th><th class="n">Dage</th><th class="n">Normale timer</th><th class="n">Overarbejde</th><th class="n">I alt</th><th class="n">Syg / fri</th><th>Status</th></tr></thead><tbody>';
      personer.forEach(function (p) {
        var fri = 0; Object.keys(p.dage).forEach(function (d) { if (!p.dage[d].timer && !p.dage[d].over) fri++; });
        h += '<tr' + (p.antal ? '' : ' class="tom"') + '><td><b>' + esc(p.navn) + '</b></td><td class="n">' + p.antal + '</td><td class="n">' + tt(p.sum) + '</td><td class="n' + (p.over ? ' ot' : '') + '">' + (p.over ? '+' + tt(p.over) : '–') + '</td><td class="n"><b>' + tt(p.sum + (p.over || 0)) + '</b></td><td class="n">' + (fri || '–') + '</td><td>' +
          (p.godkendt ? '<span class="ok">✓ Godkendt</span><div class="sm">' + esc(p.godkendt.af) + ' · ' + esc(p.godkendt.tid) + '</div>' : (p.antal ? '<span class="aab">Åben</span>' : '<span class="sm">Ingen timer</span>')) + '</td></tr>';
      });
      h += '</tbody><tfoot><tr><td>I alt</td><td></td><td class="n">' + tt(S1) + '</td><td class="n ot">+' + tt(S2) + '</td><td class="n">' + tt(S1 + S2) + '</td><td></td><td></td></tr></tfoot></table>' +
        (opt.sider ? '<p class="sm" style="margin-top:10px">De følgende sider viser den daglige opgørelse for hver medarbejder.</p>' : '');
      sider.push(h);
    }
    (opt.sider ? personer : []).forEach(function (p) {
      var fri = 0, h = hoved('Samlet perioderapport', '<div class="sm">Medarbejder: <b>' + esc(p.navn) + '</b></div>');
      h += kort([['Normale timer', t2(p.sum), ''], ['Overarbejde', '+' + t2(p.over), 'gron'], ['Dage registreret', String(p.antal), 'lilla'], ['Timer i alt', t2(p.sum + (p.over || 0)), 'bla']]);
      h += '<h2>Daglig opgørelse</h2><table class="dag"><thead><tr><th>Dato</th><th>Ugedag</th><th>Arbejdstid</th><th class="n">Normal tid</th><th class="n">Overarbejde</th><th class="n">I alt</th><th>Bemærkning</th></tr></thead><tbody>';
      ds.forEach(function (d) {
        var x = p.dage[d], we = erWeekend(d), dt = tilDato(d);
        if (!x && we) return;
        var dag = DAGE[dt.getDay()];
        if (!x) { h += '<tr class="tom"><td>' + dmy(d) + '</td><td>' + dag + '</td><td colspan="5">Ikke registreret</td></tr>'; return; }
        if (!x.timer && !x.over) fri++;
        h += '<tr' + (we ? ' class="we"' : '') + '><td>' + dmy(d) + '</td><td>' + dag + '</td><td>' + (erNormal(d, x) ? '<span class="nm">✓ Normal</span> ' : '') + (x.start && x.slut ? x.start + '–' + x.slut : '–') + '</td><td class="n">' + tt(x.timer) + '</td><td class="n' + (x.over ? ' ot' : '') + '">' + (x.over ? '+' + tt(x.over) : '') + '</td><td class="n"><b>' + tt(x.timer + (x.over || 0)) + '</b></td><td class="note">' + esc(x.note || '') + '</td></tr>';
      });
      h += '</tbody><tfoot><tr><td colspan="3">I alt for perioden</td><td class="n">' + tt(p.sum) + '</td><td class="n ot">+' + tt(p.over || 0) + '</td><td class="n">' + tt(p.sum + (p.over || 0)) + '</td><td>' + (fri ? fri + ' dag' + (fri > 1 ? 'e' : '') + ' syg/fri' : '') + '</td></tr></tfoot></table>';
      h += '<div class="status">' + (p.godkendt ? '<span class="ok">✓ Godkendt af ' + esc(p.godkendt.af) + ' · ' + esc(p.godkendt.tid) + '</span>' : '<span class="aab">Ikke godkendt endnu – perioden er åben</span>') + '</div>';
      h += '<div class="sign"><div><span></span>Medarbejder</div><div><span></span>Ledelse</div></div>';
      sider.push(h);
    });
    if (!sider.length) sider.push(hoved('Samlet perioderapport', '') + '<p>Ingen registrerede timer i perioden.</p>');
    var css = '@page{size:A4;margin:14mm 14mm 16mm}*{box-sizing:border-box}' +
      'body{margin:0;font:10pt/1.4 Inter,"Segoe UI",Arial,sans-serif;color:#0f172a;-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#eef0f4}' +
      '.side{background:#fff;max-width:210mm;margin:18px auto;padding:14mm;box-shadow:0 2px 12px rgba(0,0,0,.1)}' +
      '@media print{body{background:#fff}.side{margin:0;padding:0;box-shadow:none;max-width:none}.side+.side{page-break-before:always;break-before:page}.bar{display:none}}' +
      'header{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #0f172a;padding-bottom:10px;margin-bottom:16px;gap:16px}' +
      '.kick{font-size:7.5pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1e3a8a}' +
      'h1{font-size:19pt;margin:2px 0 4px;letter-spacing:-.01em}.per{font-size:9pt;color:#475569}.per b{font-family:ui-monospace,Menlo,Consolas,monospace;color:#0f172a}' +
      '.firma{text-align:right}.fn{font-size:18pt;font-weight:800;letter-spacing:-.01em}.sm{font-size:8.5pt;color:#64748b}.sm b{color:#0f172a}' +
      '.kort{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:18px}' +
      '.k{border:1px solid #e2e8f0;background:#f8fafc;border-radius:9px;padding:9px 11px}.k span{display:block;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#475569;margin-bottom:5px}' +
      '.k b{font:700 15pt/1.1 ui-monospace,Menlo,Consolas,monospace}.k.gron{background:#ecfdf5;border-color:#86efac}.k.gron b,.k.gron span{color:#047857}' +
      '.k.lilla{background:#eef2ff;border-color:#c7d2fe}.k.lilla b{color:#4338ca}.k.lilla span{color:#3730a3}.k.bla{background:#1e3a8a;border-color:#1e3a8a}.k.bla b,.k.bla span{color:#fff}' +
      'h2{font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px;color:#0f172a}' +
      'table{width:100%;border-collapse:collapse;font-size:8.8pt}th{text-align:left;font-size:7.3pt;text-transform:uppercase;letter-spacing:.04em;color:#475569;border-bottom:1.5px solid #0f172a;padding:5px 6px}' +
      'td{padding:4px 6px;border-bottom:1px solid #e5e7eb;vertical-align:top}.n{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}' +
      'tr{break-inside:avoid}tr.tom td{color:#94a3b8;font-style:italic}tr.we td{background:#f8fafc}td.ot{color:#047857;font-weight:600}.nm{color:#047857;font-size:7.5pt;font-weight:700}.note{color:#334155;font-size:8.3pt}' +
      'tfoot td{font-weight:700;border-top:1.5px solid #0f172a;border-bottom:0;padding-top:6px}' +
      '.ok{color:#047857;font-weight:600}.aab{color:#b45309;font-weight:600}.status{margin-top:12px;font-size:9pt}' +
      '.sign{display:flex;gap:40px;margin-top:34px}.sign div{flex:1;font-size:8pt;color:#64748b}.sign span{display:block;border-bottom:1px solid #0f172a;height:26px;margin-bottom:4px}' +
      '.fod{font-size:7pt;color:#94a3b8;margin-top:14px}' +
      '.bar{position:sticky;top:0;background:#1e3a8a;color:#fff;padding:10px 16px;display:flex;gap:10px;align-items:center;justify-content:center;font-size:13px;z-index:2}' +
      '.bar button{font:inherit;font-weight:600;border:0;border-radius:8px;padding:8px 16px;cursor:pointer;background:#fff;color:#1e3a8a}.bar button.s{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5)}@media print{.bar{display:none}}';
    return '<!doctype html><html lang="da"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ventilux timer ' + per + '</title>' +
      '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"><style>' + css + '</style></head><body>' +
      '<div class="bar">Ventilux · Perioderapport ' + per + '<button onclick="window.print()">Udskriv / gem som PDF</button><button class="s" onclick="window.close()">Luk</button></div>' +
      sider.map(function (s) { return '<section class="side">' + s + '<div class="fod">Udskrevet ' + udskr + ' af ' + esc(af) + ' · Ventilux Plan</div></section>'; }).join('') +
      '<script>window.onload=function(){setTimeout(function(){window.print()},400)}<\/script></body></html>';
  }
  function aabnRapport(html) {
    var w = window.open('', '_blank');
    if (w) { w.document.open(); w.document.write(html); w.document.close(); return; }
    var blob = new Blob([html], {type: 'text/html'}), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.target = '_blank'; document.body.appendChild(a); a.click(); setTimeout(function () { a.remove(); }, 1000);
  }
  function rapport(navn) {
    if (navn && T.data) {
      var p = {navn: T.data.person, dage: T.data.dage, sum: T.data.sum, over: T.data.over || 0, antal: T.data.antal, godkendt: T.data.godkendt};
      return aabnRapport(rapportHtml([p], T.data.fra, T.data.til, {oversigt: false, sider: true}));
    }
    var r = T.ov, h = '';
    h += '<div class="over">' + ik('print') + 'Udskriv lønrapport</div>';
    h += '<div class="t-hoved"><div class="per">' + kortPer(r.fra, r.til) + '<small>Lønperiode</small></div></div>';
    h += '<div class="t-rv-top"><b>Hvem skal med?</b><span><button class="t-knap-lille" onclick="VXT.rvAlle(1)">Vælg alle</button> <button class="t-knap-lille" onclick="VXT.rvAlle(2)">Kun med timer</button> <button class="t-knap-lille" onclick="VXT.rvAlle(0)">Ingen</button></span></div>';
    h += '<div class="t-rv-liste">';
    r.personer.forEach(function (p, i) {
      h += '<label class="t-rv"><input type="checkbox" class="rv-p" data-i="' + i + '"' + (p.antal ? ' checked' : '') + ' onchange="VXT.rvTael()"><span class="nv">' + esc(p.navn) + '</span>' +
        '<span class="lille">' + (p.antal ? tt(p.sum + (p.over || 0)) + ' t · ' + p.antal + ' dage' + (p.godkendt ? ' · ✓ godkendt' : '') : 'ingen timer') + '</span></label>';
    });
    h += '</div>';
    h += '<div class="t-rv-top" style="margin-top:14px"><b>Hvad skal udskrives?</b></div><div class="t-rv-liste">' +
      '<label class="t-rv"><input type="radio" name="rv-type" value="begge" checked><span class="nv">Samlet oversigt + én side pr. medarbejder</span></label>' +
      '<label class="t-rv"><input type="radio" name="rv-type" value="oversigt"><span class="nv">Kun samlet oversigt (1 side)</span></label>' +
      '<label class="t-rv"><input type="radio" name="rv-type" value="sider"><span class="nv">Kun siderne pr. medarbejder</span></label></div>';
    h += '<div class="knapper"><button class="k primaer" id="rv_knap" onclick="VXT.rvUdskriv()">' + ik('print') + 'Udskriv</button><button class="k" onclick="VXT.oversigt(\'' + r.fra + '\')">Tilbage</button></div>';
    aabnArk(h); bred(); rvTael();
  }
  function rvValgte() { return [].slice.call(document.querySelectorAll('.rv-p')).filter(function (c) { return c.checked; }).map(function (c) { return T.ov.personer[+c.getAttribute('data-i')]; }); }
  function rvTael() { var n = rvValgte().length, b = document.getElementById('rv_knap'); if (b) { b.disabled = !n; b.lastChild.textContent = n ? 'Udskriv (' + n + ' medarbejder' + (n === 1 ? '' : 'e') + ')' : 'Vælg mindst én'; } }
  function rvAlle(m) { [].slice.call(document.querySelectorAll('.rv-p')).forEach(function (c) { var p = T.ov.personer[+c.getAttribute('data-i')]; c.checked = m === 1 || (m === 2 && !!p.antal); }); rvTael(); }
  function rvUdskriv() {
    var valgte = rvValgte(); if (!valgte.length) return toast('Vælg mindst én medarbejder');
    var t = (document.querySelector('input[name=rv-type]:checked') || {}).value || 'begge';
    aabnRapport(rapportHtml(valgte, T.ov.fra, T.ov.til, {oversigt: t !== 'sider', sider: t !== 'oversigt', alle: valgte.length === T.ov.personer.length}));
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
    lin.push(['Medarbejder', 'Timer (normal)', 'Overarbejde', 'I alt', 'Dage', 'Status'].concat(ds.map(function (d) { var x = tilDato(d); return x.getDate() + '/' + (x.getMonth() + 1); })).concat(['Bemærkninger']).join(sep));
    r.personer.forEach(function (p) {
      var noter = ds.filter(function (d) { return p.dage[d] && p.dage[d].note; }).map(function (d) { var x = tilDato(d); return x.getDate() + '/' + (x.getMonth() + 1) + ': ' + p.dage[d].note; }).join(' | ');
      lin.push([q(p.navn), tt(p.sum), tt(p.over || 0), tt(p.sum + (p.over || 0)), p.antal, p.godkendt ? 'Godkendt ' + p.godkendt.tid : 'Åben'].concat(ds.map(function (d) { return p.dage[d] ? tt(p.dage[d].timer) : ''; })).concat([q(noter)]).join(sep));
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
    lin.push(['Medarbejder', 'Dato', 'Ugedag', 'Normal dag', 'Mødt', 'Fri', 'Timer', 'Overarbejde', 'I alt', 'Bemærkning'].join(sep));
    r.personer.forEach(function (p) {
      ds.forEach(function (d) {
        var x = p.dage[d]; if (!x) return; var dt = tilDato(d);
        lin.push([q(p.navn), dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear(), DAGE[dt.getDay()], erNormal(d, x) ? 'Ja' : 'Nej', x.start || '', x.slut || '', tt(x.timer), x.over ? tt(x.over) : '', tt(x.timer + (x.over || 0)), q(x.note)].join(sep));
      });
      if (p.antal) lin.push([q(p.navn + ' – i alt'), '', '', '', '', '', tt(p.sum), tt(p.over || 0), tt(p.sum + (p.over || 0)), ''].join(sep));
    });
    hentFil(lin, 'Ventilux timer dag for dag ' + r.fra + ' til ' + r.til + '.csv');
  }

  window.VXT = {
    mine: mine, vaelg: vaelg, hurtig: hurtig, gem: function () { gem(false); }, slet: slet, norm: norm, step: step,
    oversigt: oversigt, godkend: godkend, csv: csv, csvDage: csvDage, rapport: rapport, rvAlle: rvAlle, rvTael: rvTael, rvUdskriv: rvUdskriv,
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
