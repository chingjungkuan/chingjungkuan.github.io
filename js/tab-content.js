      document.addEventListener('DOMContentLoaded', function() {
        
        // 找出頁面上所有的 Tab 容器
        const tabContainers = document.querySelectorAll('.project-sections-container');

        tabContainers.forEach(container => {
          const tabs = container.querySelectorAll('.tab-btn');
          const dropdown = container.querySelector('.tab-dropdown');
          const textPanels = container.querySelectorAll('.tab-panel');
          const imagePanels = container.querySelectorAll('.image-panel');

          function switchTab(index) {
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

          // 綁定點擊事件
          tabs.forEach(tab => {
            tab.addEventListener('click', function() {
              switchTab(this.getAttribute('data-index'));
            });
          });

          // 綁定下拉事件
          if (dropdown) {
            dropdown.addEventListener('change', function() {
              switchTab(this.value);
            });
          }
        });
      });