// 透明 Header：捲過 hero banner 後切換為白底黑字
document.addEventListener('includesLoaded', () => {
  const hero = document.querySelector('.hero-banner-wrapper, .hero-banner-container, .hero-bg-blue');
  if (!hero) return;

  function updateHeader() {
    // 當 hero 底部已滾出 viewport 上方時，切換為白底
    const heroBottom = hero.getBoundingClientRect().bottom;
    document.body.classList.toggle('header-scrolled', heroBottom <= 0);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // 初始化時也執行一次（處理重新整理後已捲動的情況）
});
