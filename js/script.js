
setTimeout(() => {
    // 獲取所有相關元素 (放在延遲區塊內，以確保元素已經存在)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('main-navigation');
    const closeBtn = document.querySelector('.close-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // 檢查元素是否成功抓取
    if (!menuToggle || !navMenu) {
        console.error("錯誤：漢堡按鈕或導航選單仍未找到。請檢查 header.html 內容或增加 setTimeout 延遲時間。");
        return; // 如果沒找到元素，則停止執行
    }
    
    // toggleMenu 函數
    function toggleMenu(isOpen) {
        if (isOpen) {
            navMenu.classList.add('is-open');
            body.classList.add('no-scroll'); 
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.classList.remove('is-open');
            body.classList.remove('no-scroll');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // 1. 漢堡選單 (menu-toggle) 點擊事件
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        toggleMenu(!isExpanded);
    });

    // 2. 關閉按鈕 (close-btn) 點擊事件
    closeBtn.addEventListener('click', () => {
        toggleMenu(false);
    });

    // 3. 點擊導航連結後關閉選單 (限行動版)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu(false);
            }
        });
    });
}, 100); // 延遲 100 毫秒