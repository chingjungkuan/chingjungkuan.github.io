(function () {
    if (window.innerWidth < 768) return;

    const frames = Array.from(document.querySelectorAll('[data-strip-frame]'));
    if (frames.length < 2) return;

    const container = document.querySelector('.hire-strip-inner');
    const hero = document.querySelector('.hire-hero');
    if (!container || !hero) return;

    const OFFSET_X = -10;
    const OFFSET_Y = 10;
    const ROTATE = 5;

    // order[0] = 最前面，order[last] = 最後面
    let order = [...frames];

    function applyStack(animate) {
        order.forEach((frame, i) => {
            const props = {
                x: OFFSET_X * i,
                y: OFFSET_Y * i,
                rotation: ROTATE * i,
                zIndex: order.length - i,
            };
            animate
                ? gsap.to(frame, { ...props, duration: 0.5, ease: 'power3.out' })
                : gsap.set(frame, props);
        });
    }

    // 初始化位置
    gsap.set(frames, { opacity: 0 });
    applyStack(false);

    // 入場：從後到前逐張淡入
    [...frames].reverse().forEach((frame, i) => {
        const currentY = Number(gsap.getProperty(frame, 'y'));
        gsap.fromTo(frame,
            { y: currentY + 30, opacity: 0 },
            { y: currentY, opacity: 1, duration: 0.6, delay: 0.3 + i * 0.12, ease: 'back.out(1.2)' }
        );
    });

    // 滑鼠傾斜（整組卡片隨游標微微旋轉）
    const xTo = gsap.quickTo(container, 'rotateY', { duration: 0.5, ease: 'power2.out' });
    const yTo = gsap.quickTo(container, 'rotateX', { duration: 0.5, ease: 'power2.out' });

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        xTo(dx * 12);
        yTo(-dy * 8);
    });

    hero.addEventListener('mouseleave', () => { xTo(0); yTo(0); });

    // 自動輪播：最前面的牌移到最後面
    let isAnimating = false;

    function cycleCards() {
        if (isAnimating) return;
        isAnimating = true;

        const front = order[0];
        const backDepth = order.length - 1;

        gsap.to(front, {
            y: -120, opacity: 0, duration: 0.4, ease: 'power2.in',
            onComplete: () => {
                gsap.set(front, {
                    x: OFFSET_X * backDepth,
                    y: OFFSET_Y * backDepth,
                    rotation: ROTATE * backDepth,
                    zIndex: 1,
                });

                order = [...order.slice(1), front];
                applyStack(true);
                gsap.to(front, { opacity: 1, duration: 0.4, delay: 0.1 });

                setTimeout(() => { isAnimating = false; }, 550);
            }
        });
    }

    setInterval(cycleCards, 3500);
})();
