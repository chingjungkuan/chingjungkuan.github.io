(function () {
  const KEY = 'homepageScrollPos';

  // 離開首頁時記錄目前捲動位置
  window.addEventListener('pagehide', () => {
    sessionStorage.setItem(KEY, window.scrollY);
  });

  // include.js 載入完成（header/footer 都掛上去）後再還原位置
  // 只在「上一頁返回」時執行，正常進入首頁不還原
  document.addEventListener('includesLoaded', () => {
    const navType = performance.getEntriesByType('navigation')[0]?.type;
    if (navType !== 'back_forward') return;

    const saved = sessionStorage.getItem(KEY);
    if (saved !== null) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
      sessionStorage.removeItem(KEY);
    }
  });
})();
