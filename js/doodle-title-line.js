document.addEventListener("DOMContentLoaded", function() {
    // 1. 定義觀察員邏輯
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 進入畫面時加入 class
                entry.target.classList.add('is-active');
            } else {
                // 離開畫面時移除（如果你想要重複觸發動畫）
                entry.target.classList.remove('is-active');
            }
        });
    }, { 
        threshold: 0.3 
    });

    // 2. 關鍵修正：抓取頁面上「所有」標記為 animate-trigger 的元素
    const targets = document.querySelectorAll('.animate-trigger');
    
    // 3. 循環每一個目標並開始觀察
    targets.forEach(target => {
        observer.observe(target);
    });
});
