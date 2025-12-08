// sub-nav.js - 處理側邊導航的滾動高亮和浮動功能

(function() {
    // 取得 sub-nav 和對應的內容區塊
    const subNav = document.getElementById('sub-nav');
    const designProcess = document.getElementById('overview');
    
    // 檢查關鍵元素是否存在，確保程式碼只在有 sub-nav 的頁面執行
    if (!subNav || !designProcess) {
        // 如果找不到其中任一元素，則停止執行後續程式碼
        return; 
    }

    const links = document.querySelectorAll('.sub-nav a');

    // 預處理 sections 陣列，儲存連結和對應的目標區塊
    const sections = Array.from(links).map(link => {
        // 處理 href 可能包含多個 ID 的情況 (例如: #id1,id2)
        const ids = link.getAttribute('href').replace('#', '').split(',');
        const targets = ids.map(id => document.getElementById(id.trim())).filter(Boolean);
        return { link, targets };
    });

    // 點擊 a 時：移除 active、加到點擊的項目、滾動到第一個對應區塊
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            
            // 移除所有連結的 active 狀態
            links.forEach(l => l.classList.remove('active'));
            // 將 active 狀態加到當前點擊的連結
            this.classList.add('active');

            // 滾動到第一個目標區塊
            const firstId = this.getAttribute('href').replace('#', '').split(',')[0].trim();
            const firstTarget = document.getElementById(firstId);
            
            if (firstTarget) {
                window.scrollTo({
                    // 減去 80px 作為 Header 或 Navigation 的高度偏移
                    top: firstTarget.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // 當頁面滾動時
    window.addEventListener('scroll', () => {
        
        // 讓 sub-nav 浮動 (當設計流程區塊滾動到視窗頂部時)
        const designProcessTop = designProcess.getBoundingClientRect().top;
        subNav.classList.toggle('active', designProcessTop <= 0);

        const scrollY = window.scrollY;
        // 判斷當前視窗中心點的位置
        const viewportMiddle = scrollY + window.innerHeight / 2;

        let found = false;
        
        // 遍歷所有區塊來判斷哪個連結應該被高亮
        sections.forEach(({ link, targets }) => {
            let active = false;

            targets.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                // 判斷視窗中心點是否落在此區塊範圍內
                if (viewportMiddle >= top && viewportMiddle < bottom) {
                    active = true;
                }
            });

            if (active) {
                // 如果找到匹配的區塊，則高亮連結
                link.classList.add('active');
                found = true;
            } else {
                // 否則移除 active 狀態
                link.classList.remove('active');
            }
        });

        // 如果滾到底部，強制亮最後一個 (處理最後一塊內容較短時的邊界情況)
        // 判斷是否滾動到整個文件底部
        if (!found && window.innerHeight + scrollY >= document.body.offsetHeight) {
            sections.forEach(({ link }, idx) => {
                if (idx === sections.length - 1) {
                    link.classList.add('active'); // 亮起最後一個連結
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

})(); 