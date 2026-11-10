// 千禧论坛前端小脚本：UBB 工具栏、确认框、返回上一页
(function () {
  document.addEventListener('submit', function (e) {
    var msg = e.target.getAttribute('data-confirm');
    if (msg && !window.confirm(msg)) e.preventDefault();
  }, true);

  document.addEventListener('click', function (e) {
    var back = e.target.closest('a.back');
    if (back && history.length > 1) { e.preventDefault(); history.back(); }
  });

  function wrap(ta, open, close) {
    var s = ta.selectionStart, en = ta.selectionEnd, v = ta.value;
    var sel = v.slice(s, en);
    ta.value = v.slice(0, s) + open + sel + close + v.slice(en);
    ta.focus();
    ta.selectionStart = s + open.length;
    ta.selectionEnd = s + open.length + sel.length;
  }

  document.querySelectorAll('.ubb-bar').forEach(function (bar) {
    var ta = document.getElementById(bar.getAttribute('data-for'));
    if (!ta) return;
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-tag]');
      var sm = e.target.closest('a[data-smile]');
      if (sm) { e.preventDefault(); wrap(ta, ' ' + sm.getAttribute('data-smile') + ' ', ''); return; }
      if (!b) return;
      var tag = b.getAttribute('data-tag');
      if (tag === 'url') {
        var u = prompt('请输入链接地址：', 'http://');
        if (u) wrap(ta, '[url=' + u + ']', '[/url]');
      } else if (tag === 'img') {
        var i = prompt('请输入图片地址：', 'http://');
        if (i) wrap(ta, '[img]' + i, '[/img]');
      } else {
        wrap(ta, '[' + tag + ']', '[/' + tag + ']');
      }
    });
    bar.querySelectorAll('select[data-tag]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        if (!sel.value) return;
        var tag = sel.getAttribute('data-tag');
        wrap(ta, '[' + tag + '=' + sel.value + ']', '[/' + tag + ']');
        sel.value = '';
      });
    });
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && ta.form) ta.form.requestSubmit();
    });
  });

  var mq = document.querySelector('.marquee-box marquee');
  if (mq && mq.stop) {
    mq.addEventListener('mouseover', function () { mq.stop(); });
    mq.addEventListener('mouseout', function () { mq.start(); });
  }
})();
