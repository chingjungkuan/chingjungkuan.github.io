(function () {
    // 觸控裝置不啟用
    if ('ontouchstart' in window) return;

    // 建立 canvas 畫墨水軌跡
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
        position: 'fixed', top: '0', left: '0',
        pointerEvents: 'none', zIndex: '9997'
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 建立圓點游標元素（以圓心對齊滑鼠，offset -6px）
    const cursorEl = document.createElement('div');
    cursorEl.id = 'custom-cursor';
    Object.assign(cursorEl.style, {
        position: 'fixed', top: '0', left: '0',
        width: '12px', height: '12px',
        borderRadius: '50%',
        background: '#FFCC00',
        pointerEvents: 'none', zIndex: '9999',
        opacity: '0'
    });
    document.body.appendChild(cursorEl);

    // 隱藏系統游標
    document.body.style.cursor = 'none';

    // GSAP 平滑跟隨（圓心 offset: -6px）
    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.15, ease: 'power3.out' });

    // 滑過連結/按鈕時游標放大
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button')) {
            gsap.to(cursorEl, { scale: 1.4, duration: 0.2 });
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button')) {
            gsap.to(cursorEl, { scale: 1, duration: 0.2 });
        }
    });

    // 墨水軌跡陣列
    const trail = [];
    let lastX = -999, lastY = -999, initialized = false;

    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;

        // 第一次進入：直接設定位置，不播動畫
        if (!initialized) {
            gsap.set(cursorEl, { x: x - 6, y: y - 6, opacity: 1 });
            initialized = true;
        }

        xTo(x - 6);
        yTo(y - 6);

        // 移動超過 2px 才加軌跡點（避免密集重疊）
        const dx = x - lastX, dy = y - lastY;
        if (dx * dx + dy * dy > 4) {
            const speed = Math.sqrt(dx * dx + dy * dy);
            trail.push({
                x, y,
                opacity: 0.65,
                width: Math.max(1.5, 5 - speed * 0.08)
            });
            lastX = x;
            lastY = y;
        }
    });

    // 渲染迴圈
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 1; i < trail.length; i++) {
            const curr = trail[i];
            const prev = trail[i - 1];
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.strokeStyle = `rgba(255, 204, 0, ${curr.opacity})`;
            ctx.lineWidth = curr.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            curr.opacity -= 0.022;
        }

        while (trail.length > 0 && trail[0].opacity <= 0) trail.shift();

        requestAnimationFrame(render);
    }

    render();
})();
