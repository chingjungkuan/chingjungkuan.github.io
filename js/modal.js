document.addEventListener('DOMContentLoaded', () => {
  // 使用事件代理，確保 include.js 載入後的按鈕也能被監聽到
  document.addEventListener('click', (e) => {
    
    // 1. 處理開啟邏輯：尋找點擊目標是否為 .modal-trigger 或其內部元素
    const trigger = e.target.closest(".modal-trigger");
    
    if (trigger) {
      // 獲取 Modal 容器（確保它存在）
      const modal = document.getElementById("commonModal");
      if (!modal) return;

      // 直接使用全局 ID 選取 Modal 內部的元件（最保險的做法）
      const modalTitle = document.getElementById("modalTitle");
      const modalDesc = document.getElementById("modalDesc");
      const modalImg = document.getElementById("modalImg");

      // 從按鈕（trigger）抓取正確的 data 屬性
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');
      const imgUrl = trigger.getAttribute('data-img');

      // 更新 Modal 內容
      if (modalTitle) modalTitle.innerText = title;
      if (modalDesc) modalDesc.innerText = desc;
      
      // 關鍵修復：更新圖片路徑
      if (modalImg && imgUrl) {
        modalImg.src = imgUrl; 
        // 除錯提示：如果圖片還是沒出來，請按 F12 打開 Console 看看路徑是否正確
        console.log("成功切換圖片路徑為:", imgUrl);
      }
      
      modal.style.display = "flex";
      document.body.style.overflow = 'hidden'; // 禁止背景捲動
    }

    // 2. 處理關閉邏輯：點擊叉叉、背景、或 Esc 鍵
    const modal = document.getElementById("commonModal");
    if (modal && modal.style.display === "flex") {
      if (e.target.classList.contains('close-btn') || e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // 恢復背景捲動
      }
    }
  });

  // 鍵盤 Esc 關閉支援
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById("commonModal");
    if (e.key === 'Escape' && modal && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = 'auto';
    }
  });
});
