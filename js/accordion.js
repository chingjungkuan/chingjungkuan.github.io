document.addEventListener('DOMContentLoaded', () => {
    // 1. 先處理頁面載入時的「初始狀態」
    const allActiveItems = document.querySelectorAll('.accordion-item.active');
    allActiveItems.forEach(item => {
        updateAccordionImage(item);
    });

    // 2. 處理點擊互動
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 找到該項目所屬的「群組容器」，只針對該群組內的項目做切換
            const group = item.closest('.accordion-group') || item.parentElement;
            const groupItems = group.querySelectorAll('.accordion-item');

            // 移除同群組內其他項目的 active 狀態
            groupItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
                updateAccordionImage(item);
            }
        });
    });

    // 統一更換圖片的邏輯函數
    function updateAccordionImage(item) {
        const parentSection = item.closest('.top-container, .hero-grid, #solution, #ia');
        if (!parentSection) return;

        const targetImage = parentSection.querySelector('.image-block, .lightbox-trigger');
        const newImgPath = item.getAttribute('data-img');

        if (targetImage && newImgPath) {
            // 增加透明度過場動畫
            targetImage.style.opacity = '0';
            setTimeout(() => {
                targetImage.src = newImgPath;
                targetImage.style.opacity = '1';
            }, 250); 
        }
    }
});
