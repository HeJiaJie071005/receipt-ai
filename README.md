# ReceiptAI 🧾 — AI Photo Bookkeeping for Small Shops

> Snap a receipt → AI reads it → it lands in your ledger. Free, private, no server.

**[Live Demo](https://hejiajie071005.github.io/receipt-ai/)** · Open `index.html` and it just works — no build step, no install.

![App UI](screenshots/app.png)

## What it does

| Feature | Description |
|---|---|
| 📷 AI receipt scan | Photograph a receipt/bill; Gemini reads merchant, date, line items, total |
| ✏️ Manual entries | Income / expense entries with date, category, amount, cost, note |
| 🧮 Profit calculator | Sell price − cost = profit; margins on sell price **and** on cost |
| 📒 Ledger | Filter by month / type / category / keyword; edit & delete any entry |
| 📦 Inventory | Products with cost / sell price / stock; selling auto-deducts stock, books income + profit, and prints an e-receipt |
| 📊 Dashboard | This month's income, expense, gross & net profit, overall margin; category breakdown; daily income/expense trend chart |
| 🧾 E-receipts | Generate a receipt on every sale — download as PNG or print |
| 💾 Backup | Export CSV (with profit columns) and full JSON backup; restore from JSON |
| 🔌 API docs | Copy-paste cURL / JS snippets to call the same AI from your ordering system |

## Why Gemini free tier?

- **Free, no card**: Google AI Studio gives every project free Gemini API calls.
- **Vision built in**: `gemini-2.0-flash` reads photos directly — no separate OCR service.
- **Good enough for receipts**: structured JSON output (`response_mime_type: application/json`) with a strict prompt.
- **Private**: your API key lives only in your browser's `localStorage`. Photos go to Google's API only when you click **Recognize** — never to any third-party server.

## How to get a free API key

1. Open [Google AI Studio](https://aistudio.google.com/apikey) and sign in with a Google account.
2. Click **Create API key** — no billing, no card required.
3. Paste the key into ReceiptAI (top of the Scan tab) and click **Save**.

That's it. If the free daily quota runs out, the app tells you clearly — just try again tomorrow or use a key from another Google account.

## How to use

1. **Scan** — upload / drag / paste a receipt photo → **Recognize & Book** → check the editable result → **Save to ledger**.
2. **Add entry** — record income or expense by hand; for income, fill in the cost price and the profit is computed live. The profit calculator on the same page works standalone too.
3. **Ledger** — browse, filter, edit, delete; export CSV or JSON backup.
4. **Inventory** — register products (cost / sell price / stock); sell one and the stock, ledger and receipt update automatically. Stock below 5 is highlighted red.
5. **Stats** — monthly totals, category breakdown and the daily trend chart at a glance.

## API reference

Recognize one receipt (same call the app makes):

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY
Content-Type: application/json
```

```json
{
  "contents": [{
    "parts": [
      {"text": "Extract the receipt into JSON: {\"merchant\": string, \"date\": \"YYYY-MM-DD\", \"items\": [{\"name\": string, \"qty\": number, \"unit_price\": number, \"amount\": number}], \"subtotal\": number, \"tax\": number, \"total\": number, \"currency\": string, \"category\": string}. Reply with JSON only."},
      {"inline_data": {"mime_type": "image/jpeg", "data": "BASE64_IMAGE_HERE"}}
    ]
  }],
  "generationConfig": {"response_mime_type": "application/json", "temperature": 0.1}
}
```

cURL and a `fetch` snippet are also in the app (Scan tab → API docs), with copy buttons. If `gemini-2.0-flash` ever returns 404, fall back to `gemini-1.5-flash` — the app does this automatically.

### Response example

```json
{
  "merchant": "好又多超市",
  "date": "2026-10-27",
  "items": [
    {"name": "可乐 330ml", "qty": 6, "unit_price": 3.5, "amount": 21.0},
    {"name": "方便面", "qty": 10, "unit_price": 4.0, "amount": 40.0}
  ],
  "subtotal": 61.0, "tax": 0, "total": 61.0,
  "currency": "CNY", "category": "进货"
}
```

## Profit math

- **Profit** = sell price − cost price
- **Margin (on sell price)** = profit ÷ sell price × 100%
- **Margin (on cost)** = profit ÷ cost price × 100%
- **Net profit (month)** = gross profit (sales − cost of goods) − expenses

## Privacy

- Ledger, products and API key are stored in your browser's `localStorage` only.
- Receipt photos are sent to Google Gemini **only** when you click Recognize.
- No analytics, no accounts, no server. Export/erase your data anytime (JSON backup in the Ledger tab; clearing browser data wipes everything).

## Tech

Pure HTML + CSS + vanilla JS. No framework, no build step. `html2canvas` is vendored locally (`vendor/`) so receipt-image export works fully offline. Charts are hand-drawn with CSS/JS — no chart library.

## License

MIT © 2026 He Jiajie

---

# ReceiptAI 🧾 — 小店 AI 拍照记账

> 拍一张小票 → AI 读出内容 → 自动记进账本。免费、私密、无服务器。

**[在线演示](https://hejiajie071005.github.io/receipt-ai/)** · 打开 `index.html` 就能用，不用安装、不用构建。

## 能做什么

| 功能 | 说明 |
|---|---|
| 📷 AI 拍照识别 | 拍小票/发票照片，Gemini 读出商家、日期、明细、总金额 |
| ✏️ 手动记账 | 收入/支出，日期、分类、金额、成本、备注 |
| 🧮 利润计算器 | 卖出价 − 成本价 = 利润；同时显示按卖出价和按成本价的利润率 |
| 📒 账本 | 按月份/类型/分类/关键词过滤；每笔可编辑、删除 |
| 📦 商品库存 | 登记商品（进货价/卖出价/库存）；卖出一件自动扣库存、记收入和利润、生成电子小票 |
| 📊 统计 | 本月收入、支出、毛利、净利润、整体利润率；分类汇总；每日收支趋势图 |
| 🧾 电子小票 | 每次卖出生成小票，可下载图片或打印 |
| 💾 备份 | 导出带利润列的 CSV 和完整 JSON 备份；可从 JSON 导入恢复 |
| 🔌 API 文档 | 可复制的 cURL / JS 代码片段，把同样的 AI 识别接进你的下单系统 |

## 为什么用 Gemini 免费套餐

- **免费、无需绑卡**：Google AI Studio 给每个项目免费调用额度。
- **自带视觉能力**：`gemini-2.0-flash` 直接读照片，不用再接 OCR 服务。
- **结构化输出**：`response_mime_type: application/json` + 严格提示词，直接返回可用 JSON。
- **私密**：Key 只存在浏览器 `localStorage`；照片只在你点「识别」时才发给 Google，不经过任何第三方服务器。

## 免费 API Key 获取方法

1. 打开 [Google AI Studio](https://aistudio.google.com/apikey)，用 Google 账号登录。
2. 点 **Create API key** 生成免费 Key（不用绑卡）。
3. 粘贴到 ReceiptAI「拍照记账」页顶部，点「保存」。

免费额度每天有限，用完 App 会明确提示，第二天再试，或换一个 Google 账号的 Key。

## 使用方法

1. **拍照记账**：上传/拖入/粘贴小票照片 → 点「识别记账」→ 核对可修改的结果 →「保存到账本」。
2. **记一笔**：手动记收入或支出；收入填成本价会自动算利润。同页有独立利润计算器。
3. **账本**：查看、筛选、编辑、删除；导出 CSV 或 JSON 备份。
4. **商品库存**：登记商品（进货价/卖出价/库存）；卖出自动扣库存、记收入利润、出小票。库存低于 5 件标红提醒。
5. **统计**：本月收支、利润、分类汇总、每日趋势一目了然。

## API 接口

识别一张票据（和 App 内部调用完全一致）：

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY
```

完整请求体、cURL 示例和 JS `fetch` 示例见 App 内「拍照记账 → API 接口文档」，带一键复制。`gemini-2.0-flash` 若返回 404，可改用 `gemini-1.5-flash`（App 已自动 fallback）。

## 利润计算

- **利润** = 卖出价 − 成本价
- **利润率（按卖出价）** = 利润 ÷ 卖出价 × 100%
- **利润率（按成本价）** = 利润 ÷ 成本价 × 100%
- **净利润（月）** = 毛利润（销售额 − 货品成本）− 支出

## 隐私

- 账本、商品、Key 只存在浏览器 `localStorage`。
- 照片只在点「识别」时发给 Google Gemini。
- 无统计、无账号、无服务器。随时可导出/清除数据（账本页的 JSON 备份；清浏览器数据即全部清除）。

## 技术

纯 HTML + CSS + 原生 JS，无框架、无构建。`html2canvas` 已本地引入（`vendor/`），小票图片导出可离线使用。图表为手写 CSS/JS，无图表库。

## 开源协议

MIT © 2026 He Jiajie
