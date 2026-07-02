
(function() {
    // 檢查關鍵元素是否存在
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    // 🎯 檢查關鍵元素是否存在，如果 Lightbox 容器不存在，則停止執行
    if (!lightbox || !lightboxImg) {
        return; 
    }
    
    /**
     * @function closeLightbox - 關閉 Lightbox 函數
     */
    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    // 1. 點擊圖片觸發 Lightbox
    document.querySelectorAll('.lightbox-trigger').forEach(el => {
        el.addEventListener('click', function () {

            // 檢查點擊的元素是否是 <img> 標籤
            if (this.tagName.toLowerCase() === 'img') {
                lightboxImg.src = this.src;
            } else {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                }
            }

            // GA4 追蹤：取檔名作為 image_name
            if (typeof gtag === 'function') {
                const src = this.tagName.toLowerCase() === 'img' ? this.src : (this.querySelector('img') || {}).src || '';
                const imageName = src.split('/').pop().replace(/\.[^.]+$/, '');
                gtag('event', 'click_image_lightbox', { image_name: imageName });
            }

            // 顯示 Lightbox
            lightbox.classList.add('active');
        });
    });

    // 2. 實作關閉機制 (使用 DOMContentLoaded 事件確保所有元素已載入)
    // 由於我們使用了 IIFE，且程式碼位於 </body> 前載入，
    // 這裡可以省略外層的 document.addEventListener('DOMContentLoaded', ...)，直接執行即可。
    
    // 點擊 Lightbox 區域本身時關閉 (點擊半透明背景)
    lightbox.addEventListener('click', function (e) {
        // 檢查點擊的目標是否就是 Lightbox 容器本身
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // 按下 ESC 鍵時關閉
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // 點擊 "關閉按鈕" (假設你的關閉按鈕 class 是 .lightbox-close)
    // const closeBtn = document.querySelector('.lightbox-close'); 
    // if (closeBtn) {
    //     closeBtn.addEventListener('click', closeLightbox);
    // }

})(); // IIFE 結束