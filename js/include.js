// header footer 共用元件載入＆禁止按右鍵
(async () => {
  const targets = document.querySelectorAll('[data-include]');

  for (const el of targets) {
    const src = el.getAttribute('data-include') || '';
    const url = src.startsWith('/') ? src : '/' + src;

    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);

      const html = await res.text();
      el.outerHTML = html; 
    } catch (err) {
      console.error('[include] failed:', url, err);
    }
  }

  // 1. 更新年份
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // 2. 停用全站右鍵 (放在這裡最保險)
  document.addEventListener('contextmenu', event => event.preventDefault());

  // 3. 額外保險：禁止圖片被拖拽 (選配)
  document.addEventListener('dragstart', event => {
    if (event.target.tagName === 'IMG') event.preventDefault();
  });
})();
