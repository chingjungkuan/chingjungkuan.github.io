// 透明 Header：捲過 hero banner 後切換為白底黑字
document.addEventListener('includesLoaded', () => {
  const hero = document.querySelector('.hero-banner-wrapper, .hero-banner-container, .hero-bg-blue');
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle('header-scrolled', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  observer.observe(hero);
});
