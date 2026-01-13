document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("commonModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalImg = document.getElementById("modalImg");
  const triggers = document.querySelectorAll(".modal-trigger");
  const closeBtn = document.querySelector(".close-btn");

  // 1. 點擊任何觸發按鈕
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      // 抓取按鈕上的自定義資訊
      const title = this.getAttribute('data-title');
      const desc = this.getAttribute('data-desc');
      const imgUrl = this.getAttribute('data-img');
      
      // 動態更新 Modal 內容
      if(modalTitle) modalTitle.innerText = title;
      if(modalDesc) modalDesc.innerText = desc;
      if(modalImg) modalImg.src = imgUrl;
      
      // 顯示 Modal
      modal.style.display = "flex";
    });
  });

  // 2. 叉叉按鈕關閉邏輯 (現在只會抓到那唯一的關閉按鈕)
  if (closeBtn) {
    closeBtn.onclick = function() {
      modal.style.display = "none";
    };
  }

  // 3. 點擊遮罩關閉
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});