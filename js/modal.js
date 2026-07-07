document.addEventListener('DOMContentLoaded', () => {
  // 使用事件代理，監聽全文件的點擊事件
  document.addEventListener('click', (e) => {

    // 1. 處理開啟邏輯：尋找點擊目標
    const trigger = e.target.closest(".modal-trigger");

    // 1a. 富 HTML 內容 modal（data-html-modal）
    if (trigger && trigger.hasAttribute('data-html-modal')) {
      e.preventDefault();
      const templateId = trigger.getAttribute('data-html-modal');
      const template = document.getElementById(templateId);
      const htmlModal = document.getElementById('html-modal');
      if (!template || !htmlModal) return;
      document.getElementById('html-modal-body').innerHTML = template.innerHTML;
      htmlModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      return;
    }

    if (trigger) {
      const modal = document.getElementById("commonModal");
      if (!modal) return;

      const modalTitle = document.getElementById("modalTitle");
      const modalDesc = document.getElementById("modalDesc");
      const modalImg = document.getElementById("modalImg");

      // 抓取自定義屬性
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');
      const imgUrl = trigger.getAttribute('data-img');

      // 更新標題
      if (modalTitle) modalTitle.innerText = title;

      // --- 核心更新：處理描述文字轉列點 ---
      if (modalDesc && desc) {
        // 以分號切割並移除多餘空白
        const points = desc.split(';').map(p => p.trim()).filter(p => p !== "");
        
        if (points.length > 1) {
          // 如果有多個項目，轉化為 <ul> 結構
          modalDesc.innerHTML = `<ul class="modal-list">${points.map(p => `<li>${p}</li>`).join('')}</ul>`;
        } else {
          // 如果只有單一項目，保持原本文字呈現
          modalDesc.innerText = desc;
        }
      }
      
      // 更新圖片路徑
      if (modalImg && imgUrl) {
        modalImg.src = imgUrl; 
        console.log("Modal 圖片成功切換:", imgUrl);
      }
      
      modal.style.display = "flex";
      document.body.style.overflow = 'hidden'; // 禁止背景捲動
    }

    // 2. 處理關閉邏輯：html-modal
    const htmlModal = document.getElementById('html-modal');
    if (htmlModal && htmlModal.classList.contains('active')) {
      if (e.target.classList.contains('html-modal-close') || e.target === htmlModal) {
        htmlModal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    }

    // 3. 處理關閉邏輯：commonModal（點擊叉叉、背景）
    const modal = document.getElementById("commonModal");
    if (modal && modal.style.display === "flex") {
      if (e.target.classList.contains('close-btn') || e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
      }
    }
  });

  // 4. 鍵盤 Esc 關閉支援
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const htmlModal = document.getElementById('html-modal');
      if (htmlModal && htmlModal.classList.contains('active')) {
        htmlModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        return;
      }
      const modal = document.getElementById("commonModal");
      if (modal && modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
      }
    }
  });
});
