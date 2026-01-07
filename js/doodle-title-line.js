document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.3 // 30% 出現時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 進入畫面時：貼上標籤，觸發畫線動畫
                entry.target.classList.add('is-active');
            } else {
                // 離開畫面時：移除標籤，讓線條重置回隱藏狀態
                entry.target.classList.remove('is-active');
            }
        });
    }, observerOptions);

    const target = document.querySelector('.animate-trigger');
    if (target) {
        observer.observe(target);
    }
});