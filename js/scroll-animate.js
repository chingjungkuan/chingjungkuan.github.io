
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // 檢查元素是否進入視窗 (isIntersecting 為 true)
    if (entry.isIntersecting) {
      // 進入視窗則加上 is-visible class 觸發動畫
      entry.target.classList.add('is-visible');
      // 停止觀察，避免重複觸發
      observer.unobserve(entry.target); 
    }
  });
}, {
  // 選項：在元素進入視窗的最後 10% 時就觸發
  rootMargin: '0px 0px -10% 0px' 
});

// 尋找所有需要動畫的元素並開始觀察
document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});