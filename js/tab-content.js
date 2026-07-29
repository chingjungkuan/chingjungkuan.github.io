document.addEventListener('DOMContentLoaded', function() {

  function switchTab(container, index) {
    const tabs = container.querySelectorAll('.tab-btn');
    const dropdown = container.querySelector('.tab-dropdown');
    const textPanels = container.querySelectorAll('.tab-panel');
    const imagePanels = container.querySelectorAll('.image-panel');

    // --- 1. 只更新目前這個 container 內的按鈕 ---
    tabs.forEach(t => t.classList.remove('active'));
    const targetTab = container.querySelector(`.tab-btn[data-index="${index}"]`);
    if (targetTab) targetTab.classList.add('active');

    // --- 2. 只更新目前這個 container 內的文字 ---
    textPanels.forEach(p => p.classList.remove('active'));
    // 這裡改用索引位置或 ID 尋找，為了穩定性建議用索引
    if (textPanels[index - 1]) textPanels[index - 1].classList.add('active');

    // --- 3. 只更新目前這個 container 內的圖片 (如果有的話) ---
    if (imagePanels.length > 0) {
      imagePanels.forEach(img => img.classList.remove('active'));
      if (imagePanels[index - 1]) imagePanels[index - 1].classList.add('active');
    }

    // --- 4. 同步目前這個 container 內的下拉選單 ---
    if (dropdown) dropdown.value = index;
  }

  // 使用事件代理，讓動態插入的內容（例如 Modal 內的 Tab）也能正常運作
  document.addEventListener('click', function(e) {
    const tab = e.target.closest('.tab-btn');
    if (!tab) return;
    const container = tab.closest('.project-sections-container');
    if (!container) return;
    switchTab(container, tab.getAttribute('data-index'));
  });

  document.addEventListener('change', function(e) {
    if (!e.target.classList.contains('tab-dropdown')) return;
    const container = e.target.closest('.project-sections-container');
    if (!container) return;
    switchTab(container, e.target.value);
  });
});
