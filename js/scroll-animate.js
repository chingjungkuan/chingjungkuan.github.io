gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, y: 80 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
            }
        }
    );
});

// include.js 非同步載入 header 後，重新計算 ScrollTrigger 位置
document.addEventListener('includesLoaded', () => {
    ScrollTrigger.refresh();
});
