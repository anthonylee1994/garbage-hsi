# Garbage HSI

一個用 React + Vite + TanStack Router 整嘅垃圾恒指新聞產生器。

個 app 會隨機生成一篇港股垃圾新聞，連埋指數數字、板塊原因、國際局勢同名家金句一齊砌出嚟。金句會喺沈振盈同譚朗蔚之間 random 抽，header 個專欄名都會跟住變。

## Features

- 隨機生成恒指頭條、內文、記者名同時間
- 顯示模擬 ticker 同指數升跌
- 保留最近 8 則歷史文章
- 用 `localStorage` 記住目前主文章同歷史紀錄
- 金句作者會同步反映喺 sidebar 同 header 專欄名

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS 4

## Run Locally

如果你用 `npm`：

```bash
npm install
npm run dev
```

如果你用 `bun`：

```bash
bun install
bun run dev
```

預設開發網址通常係 `http://localhost:5173`。

## Scripts

```bash
npm run dev
npm run build
npm run build:dev
npm run preview
npm run format
```

Type check:

```bash
npx tsc --noEmit
```

## Project Structure

```text
src/
  components/home/     page sections
  components/ui/       shared UI primitives
  hooks/               stateful page logic
  lib/                 article generation and persistence logic
  routes/              TanStack Router route files
```

而家核心檔案大概係：

- `src/lib/garbageHsi.ts`: 隨機新聞資料、文章生成、localStorage 讀寫
- `src/hooks/useGarbageHsi.ts`: page state、初始化、生成下一則文章
- `src/components/home/GarbageHsiPage.tsx`: 首頁組裝
- `src/routes/index.tsx`: route entry

## Notes

- 歷史文章最多保留 8 筆
- localStorage key 係 `garbage-hsi:articles`
- 舊版 localStorage 資料格式仲有兼容處理

## License

MIT
