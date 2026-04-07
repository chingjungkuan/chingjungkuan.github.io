# 🎨 Portfolio System - Professional Technical Specification

本文件完整定義了作品集網站的核心樣式架構（對應 `style.css`）。旨在提供開發者與 AI 助手精準的組件使用規範與 HTML 結構參考。

---

## 1. 基礎與文字規範 (Typography & Global)

### 1.1 字體族群 (Font Families)
- **通用/內文**: `'Lato'`, `'Noto Sans TC'`, `'PingFang TC'`, `'Microsoft JhengHei'`, sans-serif.
- **裝飾標題**: `"Rubik Dirt"` (用於 `.display-title` 與數字裝飾)。
- **輔助裝飾**: `"Anton"`, `"Paytone One"`, `"Poetsen One"`.

### 1.2 標題層級 (Headings)
| 類別 | 大小 (Size) | 行高 (LH) | 顏色 | 備註 |
| :--- | :--- | :--- | :--- | :--- |
| `h1` | 36px | 1.4 | `#191919` | 頁面大標 |
| `h2` | 28px | 1.4 | `#191919` | 區塊標題 |
| `h3` | 24px | 1.4 | `#191919` | 次標題 |
| `.display-title` | 40px (M) / 64px (D) | - | `#625043` | 裝飾用超大標 |
| `.sm-title` | 14px | - | `#666` | 灰色小標 |

---

## 2. 設計標記 (Design Tokens)

### 2.1 色彩工具 (Colors)
- **品牌色**: `.text-primary` (#7B6453) - 作品集主視覺色。
- **行動呼籲**: `.text-cta` (#EB9164) / `.text-highlight` (#FF5722)。
- **特殊強調**: `.highlight` (加粗並設為橘色)。
- **狀態色**: `.text-mute` (#666), `.text-primary-blue` (#0040BD), `.text-white` (#FFF)。

### 2.2 背景樣式 (Backgrounds)
- `.noise-bg`: 背景色 `#f0f0f0`，並帶有 SVG 噪點濾鏡裝飾。
- `.hero-bg-grey`: `#efefef` / `.item-bg-grey`: `#f9f9f9`。
- `.hero-bg-blue`: `#185ADB` (Absolute 填滿)。

---

## 3. 佈局與網格系統 (Layout & Grid)

### 3.1 容器與排列
- `.container`: 中軸容器 (1172px)。
- `.layout-center`: 置中容器 (640px)，內容為 Flex 垂直置中排列。
- `.flex-v-[4|8|12|16|24|48]`: 定義內容物之間的垂直間距 (`gap`)。

### 3.2 響應式網格 (Responsive Grid)
- `.two-column-grid`: 預設 1 欄，平板以上轉 2 欄。
- `.three-column-grid`: 預設 1 欄，桌機轉 3 欄。
- `.hero-grid`:
    - `.m-1col-2col`: 桌機比例 1:2。
    - `.d-2col-1col`: 桌機比例 2:1。

---

## 4. 媒體與圖片規範 (Media Handling)

### 4.1 比例與樣式
- `.image-block`: **3:2** 比例容器，適用於專案展示。
- `.image4-3`: **4:3** 比例，帶 20px 圓角。
- `.hero-banner-wrapper`: 作品頁專用 Banner，底部帶有大圓角（手機 40px / PC 80px）。
- `.box-img`: 100% 寬度之塊級圖片。

### 4.2 內容排序 (Responsive Order)
- 使用 `.img-txt` 結構時，在手機端文字 (`.description-text`) 會優先於圖片 (`.image-block`)。

---

## 5. UI 組件庫 (Components)

### 5.1 按鈕 (Buttons)
- `.btn.btn-primary`: 藍底白字實心按鈕。
- `.btn.btn-secondary`: 藍框白底外框按鈕。
- `.btn.btn-basic`: 黑底白字基礎按鈕。
- 尺寸工具: `.btn-lg` (Large) / `.btn-sm` (Small)。

### 5.2 導覽列 (Navigation)
- **主導覽 (.navbar)**: 固定頂部，手機端透過 `#popup-menu:target` 實現漢堡選單顯隱。
- **側邊導覽 (.sub-nav)**: 
    - 手機版: 右下角浮動按鈕 (FAB)。
    - 桌機版: 固定於左側 `top: 120px`。
    - 狀態: 展開時需加入 `.expanded`。

### 5.3 切換與彈窗 (Tabs & Modals)
- **Tab 系統**:
    - `.desktop-tab-labels`: 標籤按鈕排列。
    - `.mobile-selector-wrapper`: 手機版自動顯示為 `select` 下拉選單。
    - `.tab-panel`: 切換面板，需搭配 `.active` 顯示。
- **Modal / Lightbox**:
    - `.lightbox`: 全螢幕圖片檢視，帶有深色半透明背景。
    - `.modal`: 內含彈出視窗內容區塊與關閉按鈕。

---

## 6. 頁尾與功能性元素 (Footer & Tools)

### 6.1 頁尾規範 (Footer)
採用 CSS 變數控制視覺：
- `--footer-bg-color`: `rgba(21, 21, 21, 0.95)`。
- `--footer-link-hover`: `#0040BD`。
- 結構包含 `.footer-brand`, `.footer-nav`, `.footer-copyright`。

### 6.2 置頂按鈕 (#scrollToTopBtn)
- 固定於右下角，具備 Hover 透明度切換特效。

---

## 7. 專案特有佈局 (Special Patterns)

### 7.1 設計流程 (Design Flow)
- **結構**: `.scroll-container` 內含多個 `.step`。
- **樣式**: `.number` 使用 `Rubik Dirt` 字體，並具備負邊距裝飾效果。

### 7.2 概述區塊 (Overview)
- **類別**: `.overview` 搭配 `.team-info`。
- **特徵**: `.team-info` 具備灰色背景與 4px 灰色左邊框。

---

## 8. 互動動畫邏輯 (Animations)

### 8.1 滾動動畫 (Scroll Reveal)
- **觸發類別**: `.animate-on-scroll`。
- **動畫行為**: 當元素被賦予 `.is-visible` 時，由 `translateY(80px)` 位移回原位並淡入。
- **過渡**: `0.6s ease-out`。

### 8.2 滑鼠交互 (Hovers)
- **按鈕**: `all 0.3s` 平滑過渡。
- **圖片**: `.image-block` 具備 `opacity` 過渡效果。
- **Tab 圖片**: `.image-panel` 切換時具備 `fadeIn` 動畫。

---
*文件產生時間：2026-04-07*