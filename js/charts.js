/* StudyLoop charts — small dependency-free SVG charts reading real learning data */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc;
  var C = SL.chart = {};

  function niceMax(v) {
    if (v <= 5) return 5;
    var p = Math.pow(10, Math.floor(Math.log10(v)));
    var m = v / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  }

  /* charts render at the host's real pixel width so text stays 11px on every screen */
  var REG = {}, seq = 0;
  function host(kind, args, h) {
    var id = 'ch' + (++seq);
    REG[id] = { kind: kind, args: args };
    return '<div class="chart-host" data-chart="' + id + '" style="min-height:' + (h || 200) + 'px"></div>';
  }
  C.reset = function () { REG = {}; };
  C.mount = function (root) {
    (root || document).querySelectorAll('.chart-host').forEach(function (el) {
      var spec = REG[el.getAttribute('data-chart')]; if (!spec) return;
      var w = Math.max(260, Math.round(el.clientWidth || 600));
      var a = spec.args.slice(); var o = Object.assign({}, a[a.length - 1] || {}, { w: w }); a[a.length - 1] = o;
      el.innerHTML = (spec.kind === 'bars' ? barsSvg : lineSvg).apply(null, a);
      el.style.minHeight = '';
    });
  };
  var rT = null;
  window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(function () { C.mount(); }, 150); });

  /* vertical bars, single series. data: [{label, value, tip}] */
  C.bars = function (data, opts) { return host('bars', [data, opts || {}], (opts || {}).h); };
  function barsSvg(data, opts) {
    opts = opts || {};
    var W = opts.w || 640, H = opts.h || 200, padL = 34, padR = 8, padT = 12, padB = 26;
    var max = niceMax(Math.max.apply(null, data.map(function (d) { return d.value; }).concat([1])));
    var iw = W - padL - padR, ih = H - padT - padB;
    var bw = iw / data.length;
    var barW = Math.min(36, bw - 2 * Math.max(2, bw * 0.18));
    var color = opts.color || 'var(--c-main)';
    var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(opts.aria || '') + '">';
    [0, 0.5, 1].forEach(function (f) {
      var y = padT + ih - ih * f;
      s += '<line class="grid-line" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y + '" y2="' + y + '"/>';
      s += '<text x="' + (padL - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(max * f) + '</text>';
    });
    var every = Math.max(1, Math.ceil(data.length / Math.max(2, Math.floor(iw / 46))));
    data.forEach(function (d, i) {
      var x = padL + i * bw, h = max ? ih * d.value / max : 0;
      var bx = x + (bw - barW) / 2, by = padT + ih - h;
      s += '<g class="hit-g" tabindex="0" data-tip="' + esc(d.tip || (d.label + ': ' + d.value)) + '">';
      s += '<rect class="hit" x="' + x + '" y="' + padT + '" width="' + bw + '" height="' + ih + '"/>';
      if (h > 0) {
        var r = Math.min(4, barW / 2, h);
        s += '<path class="bar-m" fill="' + color + '" d="M' + bx + ',' + (padT + ih) + 'V' + (by + r) + 'Q' + bx + ',' + by + ' ' + (bx + r) + ',' + by +
          'H' + (bx + barW - r) + 'Q' + (bx + barW) + ',' + by + ' ' + (bx + barW) + ',' + (by + r) + 'V' + (padT + ih) + 'Z"/>';
      }
      s += '</g>';
      if (i % every === 0 || i === data.length - 1) s += '<text x="' + (x + bw / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(d.label) + '</text>';
    });
    s += '<line class="axis" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + (padT + ih) + '" y2="' + (padT + ih) + '"/>';
    return s + '</svg>';
  }

  /* line chart; series: [{name, color, values:[number|null]}], labels: [] ; yMax default 100 */
  C.line = function (labels, series, opts) { return host('line', [labels, series, opts || {}], (opts || {}).h); };
  function lineSvg(labels, series, opts) {
    opts = opts || {};
    var W = opts.w || 640, H = opts.h || 200, padL = opts.unit ? 44 : 34, padR = 12, padT = 12, padB = 26;
    var all = []; series.forEach(function (s) { s.values.forEach(function (v) { if (v != null) all.push(v); }); });
    var max = opts.yMax || niceMax(Math.max.apply(null, all.concat([1])));
    var iw = W - padL - padR, ih = H - padT - padB;
    var step = labels.length > 1 ? iw / (labels.length - 1) : 0;
    function X(i) { return padL + (labels.length > 1 ? i * step : iw / 2); }
    function Y(v) { return padT + ih - ih * v / max; }
    var s = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(opts.aria || '') + '">';
    [0, 0.5, 1].forEach(function (f) {
      var y = padT + ih - ih * f;
      s += '<line class="grid-line" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y + '" y2="' + y + '"/>';
      s += '<text x="' + (padL - 6) + '" y="' + (y + 4) + '" text-anchor="end">' + Math.round(max * f) + (opts.unit || '') + '</text>';
    });
    series.forEach(function (se) {
      var d = '', pen = false;
      se.values.forEach(function (v, i) {
        if (v == null) { pen = false; return; }
        d += (pen ? 'L' : 'M') + X(i).toFixed(1) + ',' + Y(v).toFixed(1); pen = true;
      });
      s += '<path d="' + d + '" fill="none" stroke="' + se.color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
      se.values.forEach(function (v, i) {
        if (v == null) return;
        s += '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="4" fill="' + se.color + '" stroke="var(--surface)" stroke-width="2"/>';
      });
    });
    var every = Math.max(1, Math.ceil(labels.length / Math.max(2, Math.floor(iw / 50))));
    labels.forEach(function (lb, i) {
      var tip = lb + ' — ' + series.map(function (se) { return se.name + ': ' + (se.values[i] == null ? '—' : se.values[i] + (opts.unit || '')); }).join(' · ');
      var x0 = X(i) - (step || iw) / 2;
      s += '<g class="hit-g" tabindex="0" data-tip="' + esc(tip) + '"><rect class="hit" x="' + Math.max(padL - 6, x0) + '" y="' + padT + '" width="' + (step || iw) + '" height="' + ih + '"/>' +
        '<line class="hair" x1="' + X(i) + '" x2="' + X(i) + '" y1="' + padT + '" y2="' + (padT + ih) + '"/></g>';
      if (i % every === 0 || i === labels.length - 1) s += '<text x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(lb) + '</text>';
    });
    s += '</svg>';
    if (series.length > 1) {
      s += '<div class="legend">' + series.map(function (se) { return '<span><i style="background:' + se.color + ';height:3px;border-radius:2px"></i>' + esc(se.name) + '</span>'; }).join('') + '</div>';
    }
    return s;
  }

  /* horizontal bars with direct labels. data: [{label, value (0-100|null), color, sub}] */
  C.hbars = function (data) {
    return '<div class="stack" style="gap:12px">' + data.map(function (d) {
      var v = d.value == null ? 0 : d.value;
      return '<div data-tip="' + esc(d.label + ': ' + (d.value == null ? SL.L('暂无数据', 'no data') : d.value + '%') + (d.sub ? ' · ' + d.sub : '')) + '" tabindex="0">' +
        '<div class="row between small"><span class="row" style="gap:8px"><span class="subj-dot" style="background:' + d.color + '"></span><b>' + esc(d.label) + '</b></span>' +
        '<span class="bold">' + (d.value == null ? '—' : d.value + '%') + (d.sub ? ' <span class="faint xs">' + esc(d.sub) + '</span>' : '') + '</span></div>' +
        '<div class="bar mt8"><i style="width:' + v + '%;background:' + d.color + '"></i></div></div>';
    }).join('') + '</div>';
  };

  C.ring = function (pct, size, color, label) {
    size = size || 84;
    var sw = Math.max(6, size / 10), r = (size - sw) / 2, c = 2 * Math.PI * r;
    var v = pct == null ? 0 : SL.clamp(pct, 0, 100);
    return '<div class="ring" style="width:' + size + 'px;height:' + size + 'px" role="img" aria-label="' + esc((label || '') + ' ' + (pct == null ? '—' : pct + '%')) + '">' +
      '<svg width="' + size + '" height="' + size + '"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--surface-3)" stroke-width="' + sw + '"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + (color || 'var(--c-main)') + '" stroke-width="' + sw + '" stroke-linecap="round" stroke-dasharray="' + (c * v / 100).toFixed(1) + ' ' + c.toFixed(1) + '"/></svg>' +
      '<span class="ring-label" style="font-size:' + Math.max(12, size / 5.2) + 'px">' + (pct == null ? '—' : pct + '%') + '</span></div>';
  };

  C.heatClass = function (m) {
    if (m == null) return 'none';
    return m < 25 ? 'h0' : m < 50 ? 'h1' : m < 70 ? 'h2' : m < 85 ? 'h3' : 'h4';
  };

  /* global tooltip for [data-tip] */
  var tip = null;
  function showTip(el, x, y) {
    if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; document.body.appendChild(tip); }
    tip.textContent = el.getAttribute('data-tip');
    tip.style.display = 'block';
    var r = tip.getBoundingClientRect();
    var left = Math.min(window.innerWidth - r.width - 8, Math.max(8, x - r.width / 2));
    var top = y - r.height - 12; if (top < 8) top = y + 18;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  }
  function hideTip() { if (tip) tip.style.display = 'none'; }
  document.addEventListener('pointermove', function (e) {
    var el = e.target.closest ? e.target.closest('[data-tip]') : null;
    if (el) showTip(el, e.clientX, e.clientY); else hideTip();
  });
  document.addEventListener('focusin', function (e) {
    var el = e.target.closest ? e.target.closest('[data-tip]') : null;
    if (el) { var r = el.getBoundingClientRect(); showTip(el, r.left + r.width / 2, r.top); }
  });
  document.addEventListener('focusout', hideTip);
  document.addEventListener('scroll', hideTip, true);
})();
