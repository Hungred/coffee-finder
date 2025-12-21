# ☕ Coffee Finder - 咖啡廳尋找小助手 (Mobile Web)

這是一個基於 **React** 和 **TypeScript** 開發的行動優先 (Mobile-First) 咖啡廳地圖網頁。專為「數位遊牧民族」設計，讓使用者在移動過程中，能快速在台灣各城市找到最理想的工作空間。

---

## 🚀 技術棧 (Tech Stack)

- **核心框架**: React 18 (Vite)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **圖標**: Lucide React
- **路由**: React Router

---

## 🛠️ 技術挑戰與解決方案 (Technical Highlights)

在開發過程中，我針對行動端瀏覽器（如 iOS Safari）常見的 UI/UX 問題提出了以下技術方案：

### 即時交叉篩選演算法 (Real-time Filter)

- **問題**: 需要在大量咖啡廳資料中，同時進行「關鍵字」與「多重功能標籤」的比對。
- **解決方案**:
  - 實作即時過濾邏輯，支援店名、行政區關鍵字與多個功能標籤（WiFi, Plug, Quiet...）的組合篩選。
  - 透過 TypeScript 的 `Interface` 嚴格定義資料格式，避免在複雜篩選過程中出現 Undefined 錯誤。

---

## ✨ 核心功能 (Features)

- **多維度搜尋**: 支援店名、城市、行政區快速搜尋。
- **條件篩選**: 提供 6+ 種功能條件（如不限時、有插座、安靜）進行即時過濾。
- **城市導覽**: 結構化的城市入口頁，顯示各城市已

---

## 📂 專案結構 (Project Structure)

```text
src/
├── components/     # 存放共用組件 (如 BottomNav)
├── data/           # 靜態資料中心 (城市資訊、咖啡廳清單)
├── pages/          # 頁面邏輯 (Home, City, CityList, MapView)
├── types/          # TypeScript 型別定義中心
├── App.tsx         # 全域佈局框架與路由配置
└── index.css       # Tailwind 基礎設定與滾動條美化
```

---

## 📁 安裝與使用 (Quick Start)

# 安裝依賴

```
npm install
```

# 啟動開發伺服器

```
npm run dev
```
