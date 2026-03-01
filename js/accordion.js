document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // 1. 處理手風琴開合邏輯
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
                
                // 2. 處理圖片切換邏輯
                // 尋找點擊項目所在的區塊，並找到該區塊內的圖片容器
                const parentSection = item.closest('.top-container, .hero-container');
                const targetImage = parentSection.querySelector('.image-block');
                const newImgPath = item.getAttribute('data-img');

                if (targetImage && newImgPath) {
                    // 執行淡入淡出動畫
                    targetImage.style.opacity = '0'; 
                    setTimeout(() => {
                        targetImage.src = newImgPath;
                        targetImage.style.opacity = '1';
                    }, 300); // 這裡的時間建議與 CSS transition 一致
                }
            }
        });
    });
});
