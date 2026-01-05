document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      // 1. 先檢查目前點擊的這個是不是已經打開了
      const isActive = item.classList.contains('active');

      // 2. 遍歷所有項目，將它們的 active 類別全部移除（強制收合）
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // 3. 如果原本點擊的項目是關閉的，現在就把它打開
      // 如果原本就是開啟的，經過上面的移除步驟後，它現在會變成收合
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});