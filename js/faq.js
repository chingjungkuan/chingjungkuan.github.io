const faqData = {
    'design': {
        'question': '如何定義「好的設計」？',
        'answer': '視覺美感是基礎，真正的設計核心在於**資訊準確性與可驗證性**。比起感性的「我覺得」，更傾向研究產業趨勢與用戶數據。希望透過查證、解決真實痛點，並同時達成商業指標。'
    },
    'team': {
        'question': '偏好的團隊協作模式？',
        'answer': '喜歡簡潔有力的溝通，和大家一起專注解決問題的感覺。在團隊中習慣**直切重點、分析核心**，並提供基於事實的方案。會把精力花在確保設計到實作之間的「零誤差」；如果開發遇到限制，也會快速切換心態確保專案推進。'
    },
    'setback': {
        'question': '當設計成效不如預期時，如何應對？',
        'answer': '過程中遇到挫折，會第一時間**查證異常的原因，而不是盲目修改**。透過回溯用戶路徑與最新的測試反饋，找出邏輯斷點。精準找出錯誤並快速迭代，就是往正確的方向邁進。'
    },
    'ai_comp': {
        'question': '在 AI 工具盛行的當下，如何維持競爭力？',
        'answer': '喜歡接受挑戰，面對 AI 的盛行，思考的是如何建立「人機協作」的高效工作流。習慣先求證技術的邊界，再將其轉化為設計效能——讓 AI 處理自動化繁瑣，將精力留給**複雜決策與使用者同理心**。在變動中尋找邏輯，並將 AI 的高效轉化為更穩定的數位體驗。'
    }
};

const chatContent = document.getElementById('chat-content');
const chatWindow = document.getElementById('chat-window');

// 同步切換視窗與遮罩
function toggleChat() {
    const mask = document.getElementById('chat-mask');
    const isHidden = chatWindow.classList.toggle('chat-hidden');
    
    if (!isHidden) {
        mask.classList.add('active');
        chatContent.scrollTop = chatContent.scrollHeight;
    } else {
        mask.classList.remove('active');
    }
}

// 處理選擇
function handleSelect(key) {
    const data = faqData[key];
    
    // 顯示完整問題描述
    appendMessage(data.question, 'user-msg');

    // 模擬回覆延遲 (思考感)
    setTimeout(() => {
        appendMessage(data.answer, 'bot-msg');
        // 顯示返回選單
        addResetMenu();
    }, 600);
}

// 新增訊息
function appendMessage(text, className) {
    // 處理粗體語法
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    if (className === 'bot-msg') {
        const wrapper = document.createElement('div');
        wrapper.className = 'msg-wrapper bot-wrapper';

        // 建立頭像節點
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        const avatarImg = document.createElement('img');
        avatarImg.src = '../images/homepage/img_avatar.jpg'; 
        avatarImg.alt = 'Lucy';
        avatarDiv.appendChild(avatarImg);

        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${className}`;
        msgDiv.innerHTML = formattedText;

        // 組合：頭像在左，氣泡在右
        wrapper.appendChild(avatarDiv);
        wrapper.appendChild(msgDiv);

        // 加入到對話內容
        chatContent.appendChild(wrapper);
    } 
    else {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${className}`;
        msgDiv.innerHTML = formattedText;
        chatContent.appendChild(msgDiv);
    }
    
    // 滾動到底部
    chatContent.scrollTop = chatContent.scrollHeight;
}

// 建立返回選單
function addResetMenu() {
    const container = document.createElement('div');
    container.className = 'option-container';
    
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn btn-secondary btn-sm';
    resetBtn.innerText = '選擇其他問題';
    resetBtn.onclick = () => {
        appendMessage('看其他問題', 'user-msg');
        setTimeout(() => {
            const menu = document.getElementById('main-options').cloneNode(true);
            chatContent.appendChild(menu);
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 300);
    };
    
    container.appendChild(resetBtn);
    chatContent.appendChild(container);
    chatContent.scrollTop = chatContent.scrollHeight;
}