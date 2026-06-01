V2.2 deploy fix

這包已修正 Vercel npm install 逾時問題的主要風險：
1. package-lock.json 的 resolved URL 已改回 https://registry.npmjs.org/
2. 新增 .npmrc 指定 public npm registry
3. 保留 V2.2 Final Production / Blueprint Update 的頁面、圖片、Google Form 串接與 vercel.json

上傳 GitHub 時請確認根目錄直接包含 package.json、package-lock.json、.npmrc、index.html、vite.config.js、vercel.json、src/、public/。
若 GitHub 根目錄已有舊 package-lock.json，請用本包覆蓋。
Vercel 建議使用 Redeploy without Build Cache。
