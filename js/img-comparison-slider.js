document.addEventListener('DOMContentLoaded', () => {
    // 1. 抓取頁面上所有的比較容器
    const allContainers = document.querySelectorAll('.comparison-container');

    allContainers.forEach(container => {
        // 2. 在「當前這一個」容器內尋找它的組件
        // 注意：這裡改用 container.querySelector 確保不會抓到別組的圖片
        const slider = container.querySelector('.slider');
        const afterImg = container.querySelector('.after');
        const sliderBtn = container.querySelector('.slider-button');

        if (slider && afterImg && sliderBtn) {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                
                // 更新當前圖片裁切寬度
                afterImg.style.width = `${value}%`;
                
                // 更新當前中間按鈕的位置
                sliderBtn.style.left = `${value}%`;
            });
        }
    });
});