// scroll-to-top.js

(function() {
    // 取得按鈕元素
    const topButton = document.getElementById("scrollToTopBtn");
    
    // 檢查元素是否存在，避免找不到元素時報錯
    if (!topButton) {
        return;
    }

    // 定義顯示按鈕的滾動門檻 (例如：滾動超過 200 像素後顯示)
    const scrollThreshold = 200;

    // 滾動事件：控制按鈕的顯示/隱藏
    window.onscroll = function() {
        // 使用 document.documentElement.scrollTop 確保跨瀏覽器兼容性
        if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    };

    // 點擊事件：滾動回頂部
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();