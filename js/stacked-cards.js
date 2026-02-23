document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card');
    
    window.addEventListener('scroll', () => {
        cards.forEach((card, index) => {
            let totalScale = 1;
            
            // 檢查這張卡片「後面的每一張卡」
            for (let i = index + 1; i < cards.length; i++) {
                const nextCard = cards[i];
                const cardTop = card.getBoundingClientRect().top;
                const nextTop = nextCard.getBoundingClientRect().top;
                const distance = nextTop - cardTop;
                
                // 設定視窗高度 80% 作為開始動畫的觸發點
                const startDistance = window.innerHeight * 0.8; 
                
                if (distance < startDistance) {
                    // 計算滑動進度比例
                    let progress = (startDistance - distance) / startDistance;
                    progress = Math.max(0, Math.min(1, progress)); 
                    
                    // 【修正】：拔除變暗效果，只保留縮小！每被蓋一張卡，縮小 4%
                    totalScale *= (1 - 0.04 * progress);
                }
            }
            
            // 寫入 CSS 樣式 (只有縮小，確保背景維持純白)
            card.style.transform = `scale(${totalScale})`;
        });
    }, { passive: true });
});