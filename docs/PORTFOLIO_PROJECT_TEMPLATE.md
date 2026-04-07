# 📄 Portfolio Project Page Template (Blueprint)

本文件定義了作品集專案頁面的標準 HTML 結構規範，適用於所有專案細節頁面（如 Account, Showcase 等）。

---

## 1. 頁面骨架 (Page Skeleton)
所有頁面必須包含以下全域組件與結構：
- **Header**: `#site-header` (使用 `data-include` 引入)。
- **Sub-nav**: 浮動釘選導覽列，包含 `#impact`, `#overview`, `#flow`, `#ia`, `#ui-design`, `#style-guide`, `#takeaway`。
- **Footer**: `#site-footer` (使用 `data-include` 引入)。

---

## 2. 模組化區塊規範 (Section Modules)

### 2.1 Hero Banner (首頁大圖區)
位於 `<main class="main">` 內的第一個區塊，使用 `<picture>` 處理響應式圖片（Desktop、Pad、Mobile），並設定 `loading="eager"` 確保首屏載入效能。
- **容器**: `.hero-banner-wrapper`
- **程式碼結構**:
    ```html
    <section class="hero-banner-wrapper">
      <picture>
          <source srcset="../images/[專案資料夾]/img_banner-desktop.jpg" media="(min-width: 992px)">
          <source srcset="../images/[專案資料夾]/img_banner-pad.jpg" media="(min-width: 768px)">
          <img class="hero-banner-img" src="../images/[專案資料夾]/img_banner-mobile.jpg" alt="[專案名稱] banner圖片" loading="eager">
      </picture>
    </section>
    ```

### 2.2 Overview & Tabs (概述與切換內容)
- **容器**: `.border-container` > `.notop-container` > `.overview`
- **結構**:
    - **左側**: 標題、副標、`#B2C` 標籤、`.team-info` (Team/Role/Collaborators)。
    - **右側**: `.project-sections-container`。
        - 必須包含 `.mobile-selector-wrapper` (手機下拉選單) 與 `.desktop-tab-labels` (桌機按鈕)。
        - `.tab-content-container`: 放置多個 `.tab-panel`。

### 2.3 Design Flow (設計流程步奏)
- **容器**: `.top-container.scroll-container#flow`
- **結構**: `h2` 標題 + 多個 `.step` 區塊。
- **每個 Step**: 包含 `.number` 與 `.bg-white.flex-v-8` (標題與清單)。

### 2.4 Content Grid (圖文混合區塊)
常用於「痛點觀察」、「資訊架構」、「UI 細節」：
- **通用類別**: `.top-container.hero-grid`
- **佈局組合**:
    - `.d-7col-5col`: 左 7 右 5。
    - `.d-2col-1col`: 左 2 右 1。
- **內容**: `.description-text` (文字說明) + `.tab-image-view` (圖片展示)。

### 2.5 Accordion Group (摺疊手風琴)
用於展示多個優化重點或 User Flow：
- **結構**: `.accordion-group` > `.accordion-item`
- **屬性**: `data-img` 屬性用於點擊時同步切換右側的 `.image-block`。

### 2.6 UI Design (介面設計展示)
- **Before/After 對比**: 使用 `.editor2-stepper-container` 結構呈現流程演變。
- **舊版查看按鈕**: `.btn.btn-secondary.modal-trigger`，需帶有 `data-title`, `data-desc`, `data-img` 供 Modal 讀取。

### 2.7 Style Guide & UI Kit
- **網格**: `.three-column-grid` 展示設計理念。
- **圖片**: 使用 `.box-img.lightbox-trigger` 展示顏色、字體、按鈕組件圖。

---

## 3. CSS 命名、容器與間距慣例

### 3.1 容器使用規範 (Container Rules)
為確保頁面垂直方向的留白與節奏感，請依情境使用以下外層容器：
- `.hero-container`: **上下皆有 padding**。適用於上下皆需留白的情境（如首屏 Banner 或獨立展示區）。
- `.top-container`: **僅上方有 padding**。適用於上方需留白的情境（作為多個連續區塊間的間隔起點）。
- `.notop-container`: **上下皆無 padding**。適用於上下皆不需留白的情境（如需要滿版或緊湊銜接的區塊）。

### 3.2 垂直間距與文字樣式
- **垂直間距**: 區塊內元件間距一律使用 `.flex-v-4`, `.flex-v-8`, `.flex-v-16`, `.flex-v-24`。
- **文字樣式**:
    - 主標題使用 `.title` 或 `h2`。
    - 強調文字使用 `.text-primary` (品牌色)。
    - 內文使用 `.para` 或 `.para-16`。
- **互動類別**:
    - 圖片放大需加 `.lightbox-trigger`。
    - 彈窗觸發需加 `.modal-trigger`。

---

## 4. 腳本引入規範 (Scripts Dependency)

為了優化頁面載入速度，請採取「隨選引入」策略。除了核心腳本外，僅在頁面包含對應組件時才引入相關 JS。

| 腳本名稱 | 類型 | 引入時機 / 觸發組件 |
| :--- | :--- | :--- |
| `include.js` | **核心** | 必選。用於載入 `#site-header` 與 `#site-footer`。 |
| `scroll-to-top.js` | **核心** | 必選。提供全站 `#scrollToTopBtn` 回頂部功能。 |
| `sub-nav.js` | **核心** | 專案頁面必選。驅動 `#sub-nav` 的捲動偵測與 FAB 展開。 |
| `tab-content.js` | 選配 | 頁面包含 `.tab-panel` 或 `.project-sections-container` 時引入。 |
| `accordion.js` | 選配 | 頁面包含 `.accordion-group` 時引入。 |
| `lightbox.js` | 選配 | 頁面圖片包含 `.lightbox-trigger` 類別時引入。 |
| `modal.js` | 選配 | 頁面包含 `.modal-trigger` 或 `.modal` 結構時引入。 |

---

## 5. 根據 Figma 製作新頁面的提示 (AI 指令範例)

當你完成 Figma 設計稿，需要請 AI 轉換為程式碼時，請將本文件 (`TEMPLATE.md`)、`STYLE_GUIDE.md` 以及 Figma 連結（或設計稿截圖）提供給 AI，並使用以下指令：

> 「請讀取我提供的 Figma 設計稿，並嚴格遵循附上的 `PORTFOLIO_PROJECT_TEMPLATE.md` (HTML 結構) 與 `STYLE_GUIDE.md` (樣式系統)，幫我製作 [專案名稱] 的專案頁面 HTML，以及該專案專屬的特規 CSS 檔案 (`[project-name].css`)。
> 
> **【核心原則：Figma 決定內容視覺，MD 規範決定代碼骨架】**
> 
> **【HTML 產出要求】**
> 1. **結構映射**：請分析 Figma 中的區塊，將其精準映射到 2.1 到 2.7 的既有模組（如：看到首屏 Banner 就必須用 `<picture>` 結構；看到切換頁籤就必須用 `.project-sections-container`）。
> 2. **容器判斷**：請根據 Figma 設計稿中的區塊留白，正確使用 `.hero-container`, `.top-container`, `.notop-container` 作為外層容器。
> 3. **網格與間距**：佈局請優先使用 `.hero-grid` 或 `.two-column-grid`。Figma 中的物件間距，請就近轉換為對應的 `.flex-v-xx` 類別，絕對禁止在 HTML 寫 inline-style。
> 4. **互動元件**：請自行判斷 Figma 中哪些是需要放大的圖片（加上 `.lightbox-trigger`）或彈窗按鈕（加上 `.modal-trigger`）。
> 5. **按需加載**：依照『腳本引入規範』，將沒用到的 JS 標籤從 HTML 底部刪除。
> 
> **【CSS 產出要求】**
> 1. **禁止重複造輪子**：絕對不要覆寫全域樣式（如 `body`, `h1~h6`, `.container`, `.flex-v-xx`, `.btn` 等），這些已存在於主 `style.css`。
> 2. **對齊設計系統**：Figma 中的顏色與字級，請優先使用 `STYLE_GUIDE.md` 內的變數或共用 Class（如 `.text-primary`）來實現。
> 3. **行動優先 (Mobile-first)**：撰寫特規樣式時，預設為手機版，並統一使用 `@media (min-width: 768px)` 處理桌機版斷點。
> 4. **特規隔離**：若 Figma 中出現現有 MD 規範無法涵蓋的特殊 UI，請寫在專案專屬 CSS 中，並加上專案前綴（如 `.pj-[name]-custom-card`），確保不污染全域。
> 
> Figma 連結 / 截圖 / 補充說明如下：
> [貼上連結或說明]」
