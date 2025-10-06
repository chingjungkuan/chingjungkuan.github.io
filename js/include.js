// /js/include.js
(async () => {
  // 找出所有 data-include 區塊
  const targets = document.querySelectorAll('[data-include]');

  // 逐一載入對應的 HTML 片段
  for (const el of targets) {
    const src = el.getAttribute('data-include') || '';
    const url = src.startsWith('/') ? src : '/' + src;

    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);

      const html = await res.text();
      el.outerHTML = html; // 取代掉占位元素
    } catch (err) {
      console.error('[include] failed:', url, err);
    }
  }

  // 片段插入完成後：更新年份
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
})();
