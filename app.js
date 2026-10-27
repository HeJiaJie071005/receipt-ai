/* ReceiptAI — AI photo bookkeeping for small shops.
   Data stays in the browser (localStorage). The Gemini API key is sent
   ONLY to Google's Gemini API when the user clicks "recognize". */
'use strict';

/* ---------------- i18n ---------------- */
const I18N = {
  zh: {
    subtitle: 'AI 拍照记账 · 小店账本 · 免费大模型',
    keyNotSet: '未设置 API Key', keySet: 'API Key 已设置',
    tabScan: '拍照记账', tabAdd: '记一笔', tabLedger: '账本', tabInventory: '商品库存', tabStats: '统计',
    keyTitle: '🔑 免费 Gemini API Key（只需设置一次）',
    keyDesc: 'ReceiptAI 使用 Google Gemini 免费套餐识别票据。Key 只保存在你的浏览器本地，不会上传到任何服务器。',
    keyStep1: '打开', keyStep1b: '，用 Google 账号登录',
    keyStep2: '点击「Create API key」生成一个免费 Key（无需绑卡）',
    keyStep3: '把 Key 粘贴到下面，点「保存」',
    save: '保存', clearKey: '清除 Key',
    uploadTitle: '🧾 上传票据照片', dropHint: '把票据照片拖到这里，或点击选择文件，也可直接 Ctrl+V 粘贴截图',
    chooseFile: '选择图片', removeImg: '换一张', recognize: '✨ 识别记账',
    resultTitle: '✅ 识别结果（可修改，确认无误后保存）',
    fMerchant: '商家', fDate: '日期', fType: '类型', fCategory: '分类', fTotal: '总金额 (¥)',
    fCost: '成本价 (¥)', fNote: '备注', expense: '支出', income: '收入',
    itemsTitle: '明细', thItem: '品名', thQty: '数量', thUnit: '单价', thAmt: '金额', addItem: '加一行',
    saveToLedger: '保存到账本',
    apiDocsTitle: '🔌 API 接口文档（给你的下单系统调用）',
    apiDocsDesc: '下面是识别一张票据的完整请求。把 YOUR_API_KEY 换成你的免费 Key，把图片转成 base64 填进去即可。照片只会发给 Google Gemini，不经过任何第三方服务器。',
    copy: '复制', respTitle: '返回示例',
    manualTitle: '✏️ 手动记一笔', fAmount: '金额 (¥)', saveEntry: '保存这笔',
    calcTitle: '🧮 利润计算器', calcDesc: '输入卖出价和成本价，自动算利润和利润率。',
    calcSell: '卖出价 (¥)', calcCost: '成本价 (¥)', profit: '利润',
    marginPrice: '利润率（按卖出价）', marginCost: '利润率（按成本价）',
    calcHint: '利润 = 卖出价 − 成本价；利润率（卖出价）= 利润 ÷ 卖出价；利润率（成本价）= 利润 ÷ 成本价。',
    ledgerTitle: '📒 账本', allTypes: '全部类型', allCats: '全部分类', searchPh: '搜索商家 / 备注…',
    thDate: '日期', thType: '类型', thCat: '分类', thMerchant: '商家', thCost: '成本', thProfit: '利润', thNote: '备注',
    ledgerEmpty: '还没有记录，去「拍照记账」或「记一笔」添加第一笔吧。',
    exportCsv: '导出 CSV', exportJson: '备份 JSON', importJson: '从 JSON 恢复',
    addProductTitle: '➕ 登记商品', pName: '商品名称', pCost: '进货价 (¥)', pSell: '卖出价 (¥)', pStock: '库存数量',
    addProduct: '添加商品', sellTitle: '🛒 卖出一件', sellDesc: '卖出后自动扣库存，并在账本记一笔收入和利润，同时生成电子小票。',
    sellQty: '数量', sellDate: '日期', confirmSell: '确认卖出',
    inventoryTitle: '📦 商品库存', inventoryEmpty: '还没有商品，先登记一个吧。',
    catTitle: '📊 按分类汇总（本月）', trendTitle: '📈 本月每日收支趋势',
    trendHint: '绿色 = 收入，红色 = 支出，高度按当日金额比例显示。',
    profitSummaryTitle: '💰 利润汇总',
    receiptTitle: '电子小票', receiptThanks: '谢谢惠顾，欢迎再来！',
    downloadImg: '下载图片', print: '打印', close: '关闭', cancel: '取消', editTitle: '编辑记录',
    footer: 'ReceiptAI · 数据只存在你的浏览器本地 · API Key 只发给 Google Gemini · 免费套餐 · MIT 开源',
    sumIncome: '本月总收入', sumExpense: '本月总支出', sumNet: '净利润', sumMargin: '整体利润率',
    sumSales: '总销售额', sumCost: '总成本', sumGross: '毛利润',
    noData: '暂无数据', lowStock: '库存不足', soldOut: '已售罄',
    delConfirm: '确定删除这条记录吗？', delProduct: '确定删除这个商品吗？',
  },
  en: {
    subtitle: 'AI photo bookkeeping · Shop ledger · Free AI model',
    keyNotSet: 'API Key not set', keySet: 'API Key saved',
    tabScan: 'Scan Receipt', tabAdd: 'Add Entry', tabLedger: 'Ledger', tabInventory: 'Inventory', tabStats: 'Stats',
    keyTitle: '🔑 Free Gemini API Key (set once)',
    keyDesc: 'ReceiptAI uses Google Gemini free tier to read receipts. The key is stored only in your browser — never uploaded anywhere.',
    keyStep1: 'Open', keyStep1b: ' and sign in with your Google account',
    keyStep2: 'Click "Create API key" to generate a free key (no card needed)',
    keyStep3: 'Paste the key below and click Save',
    save: 'Save', clearKey: 'Clear Key',
    uploadTitle: '🧾 Upload a receipt photo', dropHint: 'Drag a receipt photo here, click to choose a file, or paste a screenshot with Ctrl+V',
    chooseFile: 'Choose image', removeImg: 'Change image', recognize: '✨ Recognize & Book',
    resultTitle: '✅ Recognition result (edit if needed, then save)',
    fMerchant: 'Merchant', fDate: 'Date', fType: 'Type', fCategory: 'Category', fTotal: 'Total (¥)',
    fCost: 'Cost price (¥)', fNote: 'Note', expense: 'Expense', income: 'Income',
    itemsTitle: 'Line items', thItem: 'Item', thQty: 'Qty', thUnit: 'Unit price', thAmt: 'Amount', addItem: 'Add row',
    saveToLedger: 'Save to ledger',
    apiDocsTitle: '🔌 API docs (call from your ordering system)',
    apiDocsDesc: 'Below is the full request to recognize one receipt. Replace YOUR_API_KEY with your free key and put the image in as base64. Photos go only to Google Gemini — no third-party server in between.',
    copy: 'Copy', respTitle: 'Response example',
    manualTitle: '✏️ Add an entry manually', fAmount: 'Amount (¥)', saveEntry: 'Save entry',
    calcTitle: '🧮 Profit calculator', calcDesc: 'Enter sell price and cost price; profit and margins are computed automatically.',
    calcSell: 'Sell price (¥)', calcCost: 'Cost price (¥)', profit: 'Profit',
    marginPrice: 'Margin (on sell price)', marginCost: 'Margin (on cost)',
    calcHint: 'Profit = sell − cost; margin (sell) = profit ÷ sell price; margin (cost) = profit ÷ cost.',
    ledgerTitle: '📒 Ledger', allTypes: 'All types', allCats: 'All categories', searchPh: 'Search merchant / note…',
    thDate: 'Date', thType: 'Type', thCat: 'Category', thMerchant: 'Merchant', thCost: 'Cost', thProfit: 'Profit', thNote: 'Note',
    ledgerEmpty: 'No records yet — add your first one via Scan or Add Entry.',
    exportCsv: 'Export CSV', exportJson: 'Backup JSON', importJson: 'Restore from JSON',
    addProductTitle: '➕ Add a product', pName: 'Product name', pCost: 'Cost price (¥)', pSell: 'Sell price (¥)', pStock: 'Stock qty',
    addProduct: 'Add product', sellTitle: '🛒 Sell an item', sellDesc: 'Selling deducts stock, books income + profit in the ledger, and generates an e-receipt.',
    sellQty: 'Quantity', sellDate: 'Date', confirmSell: 'Confirm sale',
    inventoryTitle: '📦 Inventory', inventoryEmpty: 'No products yet — add one first.',
    catTitle: '📊 Breakdown by category (this month)', trendTitle: '📈 Daily income & expense (this month)',
    trendHint: 'Green = income, red = expense; height is proportional to the day’s amount.',
    profitSummaryTitle: '💰 Profit summary',
    receiptTitle: 'E-Receipt', receiptThanks: 'Thank you, come again!',
    downloadImg: 'Download image', print: 'Print', close: 'Close', cancel: 'Cancel', editTitle: 'Edit entry',
    footer: 'ReceiptAI · Data lives only in your browser · Key goes only to Google Gemini · Free tier · MIT open source',
    sumIncome: 'Income (month)', sumExpense: 'Expense (month)', sumNet: 'Net profit', sumMargin: 'Overall margin',
    sumSales: 'Total sales', sumCost: 'Total cost', sumGross: 'Gross profit',
    noData: 'No data yet', lowStock: 'Low stock', soldOut: 'Sold out',
    delConfirm: 'Delete this entry?', delProduct: 'Delete this product?',
  }
};
const CATS = {
  income: ['销售收入', '其他收入'],
  expense: ['进货', '餐饮', '日用', '交通', '其他'],
};
const CAT_LABEL = { '进货': '进货', '销售收入': '销售收入', '餐饮': '餐饮', '日用': '日用', '交通': '交通', '其他收入': '其他收入', '其他': '其他' };
let lang = localStorage.getItem('receiptai_lang') || 'zh';
const t = k => (I18N[lang] && I18N[lang][k]) || I18N.zh[k] || k;

/* ---------------- storage ---------------- */
const LS = { key: 'receiptai_key', ledger: 'receiptai_ledger_v1', products: 'receiptai_products_v1' };
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
let ledger = load(LS.ledger, []);
let products = load(LS.products, []);

/* ---------------- helpers ---------------- */
const $ = id => document.getElementById(id);
const fmt = n => '¥' + (Number(n) || 0).toFixed(2);
const pct = n => (n == null || !isFinite(n)) ? '—' : (n * 100).toFixed(1) + '%';
const todayStr = () => new Date().toISOString().slice(0, 10);
const monthStr = d => (d || todayStr()).slice(0, 7);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function profitOf(e) {
  if (e.type === 'income') {
    const cost = Number(e.cost) || 0;
    const profit = (Number(e.amount) || 0) - cost;
    return { profit, marginPrice: e.amount ? profit / e.amount : null, marginCost: cost ? profit / cost : null };
  }
  return { profit: -(Number(e.amount) || 0), marginPrice: null, marginCost: null };
}
function monthStats(month) {
  const rows = ledger.filter(e => monthStr(e.date) === month);
  let sales = 0, cogs = 0, expense = 0;
  rows.forEach(e => {
    if (e.type === 'income') { sales += Number(e.amount) || 0; cogs += Number(e.cost) || 0; }
    else expense += Number(e.amount) || 0;
  });
  const gross = sales - cogs, net = gross - expense;
  return { sales, cogs, expense, gross, net, margin: sales ? gross / sales : null, count: rows.length };
}
function download(name, content, mime) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* ---------------- i18n apply ---------------- */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $('langBtn').textContent = lang === 'zh' ? 'English' : '中文';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  fillCategorySelects();
  renderAll();
}
$('langBtn').addEventListener('click', () => {
  lang = lang === 'zh' ? 'en' : 'zh';
  localStorage.setItem('receiptai_lang', lang);
  applyI18n();
});
function fillCategorySelects() {
  const fill = (sel, type) => {
    if (!sel) return;
    const cur = sel.value;
    sel.innerHTML = CATS[type].map(c => `<option value="${c}">${c}</option>`).join('');
    if (CATS[type].includes(cur)) sel.value = cur;
  };
  fill($('rCategory'), $('rType').value || 'expense');
  fill($('mCategory'), $('mType').value || 'expense');
  fill($('eCategory'), $('eType').value || 'expense');
  const fc = $('filterCategory');
  const cur = fc.value;
  fc.innerHTML = `<option value="">${t('allCats')}</option>` +
    [...CATS.income, ...CATS.expense].map(c => `<option value="${c}">${c}</option>`).join('');
  if (cur) fc.value = cur;
}
['rType', 'mType', 'eType'].forEach(id => $(id).addEventListener('change', () => {
  const map = { rType: 'rCategory', mType: 'mCategory', eType: 'eCategory' };
  fillCategorySelects();
  if (id === 'mType') updateManualProfit();
  if (id === 'rType') updateResultProfit();
}));

/* ---------------- tabs ---------------- */
$('tabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab'); if (!btn) return;
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b === btn));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + btn.dataset.tab));
  if (btn.dataset.tab === 'stats') renderStats();
  if (btn.dataset.tab === 'ledger') renderLedger();
  if (btn.dataset.tab === 'inventory') renderInventory();
});

/* ---------------- API key ---------------- */
function refreshKeyBadge() {
  const has = !!localStorage.getItem(LS.key);
  const b = $('keyBadge');
  b.textContent = has ? t('keySet') : t('keyNotSet');
  b.className = 'badge ' + (has ? 'badge-on' : 'badge-off');
}
$('saveKeyBtn').addEventListener('click', () => {
  const v = $('apiKeyInput').value.trim();
  if (!v) { $('keyHint').textContent = lang === 'zh' ? '请先粘贴 Key' : 'Paste your key first'; return; }
  localStorage.setItem(LS.key, v);
  $('apiKeyInput').value = '';
  $('keyHint').textContent = lang === 'zh' ? '✅ 已保存到浏览器本地' : '✅ Saved in this browser only';
  refreshKeyBadge();
});
$('clearKeyBtn').addEventListener('click', () => {
  localStorage.removeItem(LS.key);
  $('keyHint').textContent = lang === 'zh' ? 'Key 已清除' : 'Key cleared';
  refreshKeyBadge();
});
$('toggleKeyBtn').addEventListener('click', () => {
  const i = $('apiKeyInput');
  i.type = i.type === 'password' ? 'text' : 'password';
});

/* ---------------- image upload ---------------- */
let currentImage = null; // {base64, mime}
function setImage(dataUrl, mime) {
  currentImage = { base64: dataUrl.split(',')[1], mime: mime || 'image/jpeg' };
  $('previewImg').src = dataUrl;
  $('previewWrap').classList.remove('hidden');
  $('scanStatus').textContent = '';
  $('resultCard').classList.add('hidden');
}
function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    $('scanStatus').textContent = lang === 'zh' ? '请选择一张图片文件' : 'Please choose an image file';
    $('scanStatus').className = 'status err'; return;
  }
  const reader = new FileReader();
  reader.onload = e => setImage(e.target.result, file.type);
  reader.readAsDataURL(file);
}
$('pickFileBtn').addEventListener('click', () => $('fileInput').click());
$('fileInput').addEventListener('change', e => handleFile(e.target.files[0]));
$('dropZone').addEventListener('click', e => { if (e.target.id !== 'pickFileBtn') $('fileInput').click(); });
$('dropZone').addEventListener('dragover', e => { e.preventDefault(); $('dropZone').classList.add('drag'); });
$('dropZone').addEventListener('dragleave', () => $('dropZone').classList.remove('drag'));
$('dropZone').addEventListener('drop', e => {
  e.preventDefault(); $('dropZone').classList.remove('drag');
  handleFile(e.dataTransfer.files[0]);
});
document.addEventListener('paste', e => {
  const item = [...(e.clipboardData || {}).items || []].find(i => i.type.startsWith('image/'));
  if (item) handleFile(item.getAsFile());
});
$('removeImgBtn').addEventListener('click', () => {
  currentImage = null;
  $('previewWrap').classList.add('hidden');
  $('resultCard').classList.add('hidden');
});

/* ---------------- Gemini recognize ---------------- */
const GEMINI_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];
const RECEIPT_PROMPT = `You are a bookkeeping assistant. Read this receipt/bill photo carefully and extract structured data.
Reply with JSON ONLY, no markdown fences, no explanation:
{"merchant": string, "date": "YYYY-MM-DD", "items": [{"name": string, "qty": number, "unit_price": number, "amount": number}], "subtotal": number, "tax": number, "total": number, "currency": string, "category": string}
Rules: date — use the date printed on the receipt; if none, use today. category — pick the best of: 进货, 餐饮, 日用, 交通, 其他. If a field is unknown use null. Amounts as numbers.`;

function setStatus(el, msg, kind) { el.textContent = msg; el.className = 'status ' + (kind || ''); }

$('recognizeBtn').addEventListener('click', async () => {
  const key = localStorage.getItem(LS.key);
  const st = $('scanStatus');
  if (!key) {
    setStatus(st, lang === 'zh' ? '⚠️ 请先在上方设置免费 Gemini API Key（Google AI Studio 申请，免费、无需绑卡）。' : '⚠️ Set your free Gemini API key above first (Google AI Studio, free, no card).', 'err');
    return;
  }
  if (!currentImage) {
    setStatus(st, lang === 'zh' ? '⚠️ 请先上传一张票据照片。' : '⚠️ Upload a receipt photo first.', 'err');
    return;
  }
  const btn = $('recognizeBtn');
  btn.disabled = true;
  setStatus(st, lang === 'zh' ? '⏳ 正在识别，请稍候…' : '⏳ Recognizing, please wait…', 'busy');
  let lastErr = null, data = null;
  for (const model of GEMINI_MODELS) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [
            { text: RECEIPT_PROMPT },
            { inline_data: { mime_type: currentImage.mime, data: currentImage.base64 } }
          ] }],
          generationConfig: { response_mime_type: 'application/json', temperature: 0.1 }
        })
      });
      const json = await res.json();
      if (!res.ok) { lastErr = json.error || {}; throw new Error(json.error?.message || ('HTTP ' + res.status)); }
      const raw = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
      data = JSON.parse(raw.replace(/```json|```/g, '').trim());
      break;
    } catch (err) { lastErr = err; data = null; }
  }
  btn.disabled = false;
  if (!data) {
    const msg = String(lastErr?.message || lastErr || '');
    let hint;
    if (/API key not valid|API_KEY_INVALID/i.test(msg)) hint = lang === 'zh' ? 'Key 无效：请检查 Key 是否复制完整，或重新在 Google AI Studio 生成一个。' : 'Invalid API key: check it was copied fully, or generate a new one in Google AI Studio.';
    else if (/quota|429|RESOURCE_EXHAUSTED/i.test(msg)) hint = lang === 'zh' ? '免费额度用完了：Gemini 免费套餐每天有次数上限，明天再试，或换一个 Google 账号的 Key。' : 'Free quota exhausted: the Gemini free tier has a daily limit — try again tomorrow or use a key from another Google account.';
    else if (/Failed to fetch|NetworkError|network/i.test(msg)) hint = lang === 'zh' ? '网络连接失败：请检查网络后重试（需要能访问 Google 服务）。' : 'Network error: check your connection and retry (Google services must be reachable).';
    else hint = (lang === 'zh' ? '识别失败：' : 'Recognition failed: ') + msg;
    setStatus(st, '❌ ' + hint, 'err');
    return;
  }
  fillResultForm(data);
  setStatus(st, lang === 'zh' ? '✅ 识别完成，请核对后保存。' : '✅ Done — please check and save.', 'ok');
});

function fillResultForm(d) {
  $('rMerchant').value = d.merchant || '';
  $('rDate').value = (d.date && /^\d{4}-\d{2}-\d{2}$/.test(d.date)) ? d.date : todayStr();
  $('rType').value = 'expense';
  fillCategorySelects();
  const cat = d.category && CATS.expense.includes(d.category) ? d.category : '其他';
  $('rCategory').value = cat;
  $('rTotal').value = d.total != null ? d.total : '';
  $('rCost').value = '';
  $('rNote').value = '';
  const body = $('rItemsBody');
  body.innerHTML = '';
  (Array.isArray(d.items) && d.items.length ? d.items : [{ name: '', qty: 1, unit_price: '', amount: '' }])
    .forEach(it => addItemRow(it));
  $('resultCard').classList.remove('hidden');
  updateResultProfit();
  $('resultCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function addItemRow(it) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="text" value="${esc(it.name || '')}" class="it-name"></td>
    <td><input type="number" step="1" min="0" value="${it.qty ?? 1}" class="it-qty" style="width:64px"></td>
    <td><input type="number" step="0.01" min="0" value="${it.unit_price ?? ''}" class="it-unit" style="width:90px"></td>
    <td><input type="number" step="0.01" min="0" value="${it.amount ?? ''}" class="it-amt" style="width:90px"></td>
    <td><button class="btn btn-ghost row-btn it-del">✕</button></td>`;
  tr.querySelector('.it-del').addEventListener('click', () => tr.remove());
  tr.querySelectorAll('input').forEach(i => i.addEventListener('input', () => {
    const q = parseFloat(tr.querySelector('.it-qty').value) || 0;
    const u = parseFloat(tr.querySelector('.it-unit').value) || 0;
    if (q && u) tr.querySelector('.it-amt').value = (q * u).toFixed(2);
    updateResultProfit();
  }));
  $('rItemsBody').appendChild(tr);
}
$('addItemRowBtn').addEventListener('click', () => addItemRow({ name: '', qty: 1, unit_price: '', amount: '' }));

function readItems() {
  return [...$('rItemsBody').querySelectorAll('tr')].map(tr => ({
    name: tr.querySelector('.it-name').value.trim(),
    qty: parseFloat(tr.querySelector('.it-qty').value) || 0,
    unit_price: parseFloat(tr.querySelector('.it-unit').value) || 0,
    amount: parseFloat(tr.querySelector('.it-amt').value) || 0,
  })).filter(i => i.name || i.amount);
}
function profitHtml(amount, cost) {
  const p = profitOf({ type: 'income', amount, cost });
  const cls = p.profit >= 0 ? '' : 'neg';
  return `<span class="${cls}">${lang === 'zh' ? '利润' : 'Profit'}: <b>${fmt(p.profit)}</b></span> &nbsp;·&nbsp; ${t('marginPrice')}: <b>${pct(p.marginPrice)}</b> &nbsp;·&nbsp; ${t('marginCost')}: <b>${pct(p.marginCost)}</b>`;
}
function updateResultProfit() {
  const el = $('profitPreview');
  if ($('rType').value !== 'income') { el.classList.remove('show'); return; }
  el.innerHTML = profitHtml(parseFloat($('rTotal').value) || 0, parseFloat($('rCost').value) || 0);
  el.classList.add('show');
}
['rTotal', 'rCost', 'rType'].forEach(id => $(id).addEventListener('input', updateResultProfit));

$('saveScanBtn').addEventListener('click', () => {
  const total = parseFloat($('rTotal').value);
  if (!total && total !== 0) { setStatus($('scanStatus'), lang === 'zh' ? '⚠️ 请填写总金额' : '⚠️ Enter the total amount', 'err'); return; }
  const entry = {
    id: uid(), date: $('rDate').value || todayStr(), type: $('rType').value,
    category: $('rCategory').value, merchant: $('rMerchant').value.trim() || '—',
    amount: total, cost: parseFloat($('rCost').value) || 0,
    note: $('rNote').value.trim(), items: readItems(), source: 'scan',
  };
  ledger.push(entry);
  save(LS.ledger, ledger);
  setStatus($('scanStatus'), lang === 'zh' ? '✅ 已保存到账本。' : '✅ Saved to ledger.', 'ok');
  $('resultCard').classList.add('hidden');
  currentImage = null;
  $('previewWrap').classList.add('hidden');
  renderAll();
});

/* ---------------- manual entry + profit calculator ---------------- */
function updateManualProfit() {
  const el = $('manualProfitPreview');
  if ($('mType').value !== 'income') { el.classList.remove('show'); return; }
  el.innerHTML = profitHtml(parseFloat($('mAmount').value) || 0, parseFloat($('mCost').value) || 0);
  el.classList.add('show');
}
['mAmount', 'mCost', 'mType'].forEach(id => $(id).addEventListener('input', updateManualProfit));

$('saveManualBtn').addEventListener('click', () => {
  const amount = parseFloat($('mAmount').value);
  if (!amount && amount !== 0) { setStatus($('manualStatus'), lang === 'zh' ? '⚠️ 请填写金额' : '⚠️ Enter the amount', 'err'); return; }
  ledger.push({
    id: uid(), date: $('mDate').value || todayStr(), type: $('mType').value,
    category: $('mCategory').value, merchant: $('mMerchant').value.trim() || '—',
    amount, cost: parseFloat($('mCost').value) || 0,
    note: $('mNote').value.trim(), items: [], source: 'manual',
  });
  save(LS.ledger, ledger);
  setStatus($('manualStatus'), lang === 'zh' ? '✅ 已保存。' : '✅ Saved.', 'ok');
  $('mMerchant').value = ''; $('mAmount').value = ''; $('mCost').value = ''; $('mNote').value = '';
  updateManualProfit();
  renderAll();
});

function updateCalc() {
  const sell = parseFloat($('calcSell').value) || 0;
  const cost = parseFloat($('calcCost').value) || 0;
  const profit = sell - cost;
  $('calcProfit').textContent = fmt(profit);
  $('calcProfit').className = profit >= 0 ? 'good' : 'bad';
  $('calcMarginPrice').textContent = sell ? pct(profit / sell) : '—';
  $('calcMarginCost').textContent = cost ? pct(profit / cost) : '—';
}
['calcSell', 'calcCost'].forEach(id => $(id).addEventListener('input', updateCalc));

/* ---------------- ledger ---------------- */
function filteredLedger() {
  const m = $('filterMonth').value, ty = $('filterType').value, cat = $('filterCategory').value;
  const kw = $('filterKeyword').value.trim().toLowerCase();
  return ledger.filter(e =>
    (!m || monthStr(e.date) === m) &&
    (!ty || e.type === ty) &&
    (!cat || e.category === cat) &&
    (!kw || (e.merchant + ' ' + (e.note || '')).toLowerCase().includes(kw))
  ).sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.id.localeCompare(a.id));
}
function summaryCards(stats) {
  return `
    <div class="sum-card"><div class="label">${t('sumSales')}</div><div class="value green">${fmt(stats.sales)}</div><div class="sub">${t('sumCost')}: ${fmt(stats.cogs)}</div></div>
    <div class="sum-card"><div class="label">${t('sumExpense')}</div><div class="value red">${fmt(stats.expense)}</div><div class="sub">${stats.count} ${lang === 'zh' ? '笔' : 'entries'}</div></div>
    <div class="sum-card"><div class="label">${t('sumGross')}</div><div class="value ${stats.gross >= 0 ? 'green' : 'red'}">${fmt(stats.gross)}</div><div class="sub">${t('sumMargin')}: ${pct(stats.margin)}</div></div>
    <div class="sum-card"><div class="label">${t('sumNet')}</div><div class="value ${stats.net >= 0 ? 'green' : 'red'}">${fmt(stats.net)}</div><div class="sub">${lang === 'zh' ? '毛利润 − 支出' : 'Gross profit − expenses'}</div></div>`;
}
function renderLedger() {
  const rows = filteredLedger();
  const month = $('filterMonth').value || monthStr();
  $('ledgerSummary').innerHTML = summaryCards(monthStats(month));
  const body = $('ledgerBody');
  body.innerHTML = rows.map(e => {
    const p = profitOf(e);
    const pHtml = e.type === 'income'
      ? `<span class="${p.profit >= 0 ? 'profit-pos' : 'profit-neg'}">${fmt(p.profit)}</span>`
      : `<span class="profit-neg">${fmt(p.profit)}</span>`;
    return `<tr>
      <td>${esc(e.date)}</td>
      <td><span class="tag tag-${e.type}">${e.type === 'income' ? t('income') : t('expense')}</span></td>
      <td>${esc(e.category)}</td>
      <td>${esc(e.merchant)}</td>
      <td class="num">${fmt(e.amount)}</td>
      <td class="num">${e.type === 'income' ? fmt(e.cost || 0) : '—'}</td>
      <td class="num">${pHtml}</td>
      <td>${esc(e.note || '')}</td>
      <td>
        <button class="btn btn-ghost row-btn" data-edit="${e.id}">${lang === 'zh' ? '编辑' : 'Edit'}</button>
        <button class="btn btn-ghost row-btn" data-del="${e.id}">✕</button>
      </td>
    </tr>`;
  }).join('');
  $('ledgerEmpty').style.display = rows.length ? 'none' : 'block';
  body.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
    if (!confirm(t('delConfirm'))) return;
    ledger = ledger.filter(e => e.id !== b.dataset.del);
    save(LS.ledger, ledger); renderAll();
  }));
  body.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openEdit(b.dataset.edit)));
}
function fillMonthFilter() {
  const months = [...new Set(ledger.map(e => monthStr(e.date)))].sort().reverse();
  const cur = monthStr();
  if (!months.includes(cur)) months.unshift(cur);
  const sel = $('filterMonth');
  const prev = sel.value;
  sel.innerHTML = months.map(m => `<option value="${m}">${m}</option>`).join('');
  sel.value = prev || cur;
}
['filterMonth', 'filterType', 'filterCategory', 'filterKeyword'].forEach(id =>
  $(id).addEventListener('input', renderLedger));

/* edit modal */
let editingId = null;
function openEdit(id) {
  const e = ledger.find(x => x.id === id); if (!e) return;
  editingId = id;
  $('eDate').value = e.date; $('eType').value = e.type;
  fillCategorySelects(); $('eCategory').value = e.category;
  $('eMerchant').value = e.merchant; $('eAmount').value = e.amount;
  $('eCost').value = e.cost || ''; $('eNote').value = e.note || '';
  $('editModal').classList.remove('hidden');
}
$('editCancelBtn').addEventListener('click', () => $('editModal').classList.add('hidden'));
$('editSaveBtn').addEventListener('click', () => {
  const e = ledger.find(x => x.id === editingId); if (!e) return;
  e.date = $('eDate').value || e.date; e.type = $('eType').value;
  e.category = $('eCategory').value; e.merchant = $('eMerchant').value.trim() || '—';
  e.amount = parseFloat($('eAmount').value) || 0; e.cost = parseFloat($('eCost').value) || 0;
  e.note = $('eNote').value.trim();
  save(LS.ledger, ledger);
  $('editModal').classList.add('hidden');
  renderAll();
});

/* export / import */
$('exportCsvBtn').addEventListener('click', () => {
  const head = ['date', 'type', 'category', 'merchant', 'amount', 'cost', 'profit', 'margin_on_price', 'note', 'items'];
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const lines = [head.join(',')];
  ledger.forEach(e => {
    const p = profitOf(e);
    lines.push([
      e.date, e.type, e.category, e.merchant, e.amount, e.cost || 0,
      p.profit.toFixed(2), p.marginPrice == null ? '' : (p.marginPrice * 100).toFixed(1) + '%',
      e.note || '', (e.items || []).map(i => `${i.name}x${i.qty}`).join('; ')
    ].map(q).join(','));
  });
  download(`receiptai-ledger-${todayStr()}.csv`, '\ufeff' + lines.join('\n'), 'text/csv;charset=utf-8');
});
$('exportJsonBtn').addEventListener('click', () => {
  download(`receiptai-backup-${todayStr()}.json`,
    JSON.stringify({ app: 'ReceiptAI', version: 1, exported: new Date().toISOString(), ledger, products }, null, 2),
    'application/json');
});
$('importJsonBtn').addEventListener('click', () => $('importFileInput').click());
$('importFileInput').addEventListener('change', e => {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      const l = Array.isArray(d) ? d : d.ledger;
      if (!Array.isArray(l)) throw new Error('bad file');
      ledger = l; if (Array.isArray(d.products)) products = d.products;
      save(LS.ledger, ledger); save(LS.products, products);
      fillMonthFilter(); renderAll();
      alert(lang === 'zh' ? `✅ 已恢复 ${l.length} 条记录。` : `✅ Restored ${l.length} entries.`);
    } catch (err) { alert(lang === 'zh' ? '❌ 文件格式不对，请选择 ReceiptAI 导出的 JSON 备份。' : '❌ Invalid file — choose a ReceiptAI JSON backup.'); }
  };
  r.readAsText(f);
  e.target.value = '';
});

/* ---------------- inventory ---------------- */
$('addProductBtn').addEventListener('click', () => {
  const name = $('pName').value.trim();
  const cost = parseFloat($('pCost').value), sell = parseFloat($('pSell').value), stock = parseInt($('pStock').value, 10);
  if (!name) { setStatus($('productStatus'), lang === 'zh' ? '⚠️ 请填写商品名称' : '⚠️ Enter a product name', 'err'); return; }
  if (!(sell >= 0) || !(cost >= 0) || !(stock >= 0)) { setStatus($('productStatus'), lang === 'zh' ? '⚠️ 请填写正确的价格和库存' : '⚠️ Enter valid prices and stock', 'err'); return; }
  products.push({ id: uid(), name, costPrice: cost, sellPrice: sell, stock });
  save(LS.products, products);
  setStatus($('productStatus'), lang === 'zh' ? '✅ 商品已添加。' : '✅ Product added.', 'ok');
  $('pName').value = ''; $('pCost').value = ''; $('pSell').value = ''; $('pStock').value = '';
  renderInventory(); renderSellOptions();
});
function renderSellOptions() {
  const sel = $('sellProduct');
  sel.innerHTML = products.map(p => `<option value="${p.id}">${esc(p.name)} (${fmt(p.sellPrice)})</option>`).join('');
  updateSellPreview();
}
function updateSellPreview() {
  const p = products.find(x => x.id === $('sellProduct').value);
  const qty = parseInt($('sellQty').value, 10) || 0;
  const el = $('sellPreview');
  if (!p || !qty) { el.classList.remove('show'); return; }
  const total = p.sellPrice * qty, cost = p.costPrice * qty, profit = total - cost;
  el.innerHTML = `${lang === 'zh' ? '总价' : 'Total'}: <b>${fmt(total)}</b> · ${t('profit')}: <b>${fmt(profit)}</b> · ${t('marginPrice')}: <b>${pct(total ? profit / total : null)}</b> · ${lang === 'zh' ? '剩余库存' : 'Stock left'}: <b>${p.stock - qty}</b>`;
  el.classList.add('show');
}
['sellProduct', 'sellQty'].forEach(id => $(id).addEventListener('input', updateSellPreview));

$('sellBtn').addEventListener('click', () => {
  const p = products.find(x => x.id === $('sellProduct').value);
  const qty = parseInt($('sellQty').value, 10) || 0;
  if (!p) { setStatus($('sellStatus'), lang === 'zh' ? '⚠️ 请先登记商品' : '⚠️ Add a product first', 'err'); return; }
  if (qty <= 0) { setStatus($('sellStatus'), lang === 'zh' ? '⚠️ 数量至少为 1' : '⚠️ Quantity must be at least 1', 'err'); return; }
  if (qty > p.stock) { setStatus($('sellStatus'), lang === 'zh' ? `⚠️ 库存不足（仅剩 ${p.stock} 件）` : `⚠️ Not enough stock (only ${p.stock} left)`, 'err'); return; }
  const total = p.sellPrice * qty, cost = p.costPrice * qty;
  p.stock -= qty;
  save(LS.products, products);
  ledger.push({
    id: uid(), date: $('sellDate').value || todayStr(), type: 'income',
    category: '销售收入', merchant: p.name, amount: total, cost,
    note: lang === 'zh' ? `卖出 ${p.name} × ${qty}` : `Sold ${p.name} × ${qty}`,
    items: [{ name: p.name, qty, unit_price: p.sellPrice, amount: total }],
    source: 'sale', productId: p.id,
  });
  save(LS.ledger, ledger);
  setStatus($('sellStatus'), lang === 'zh' ? `✅ 已卖出 ${qty} 件，利润 ${fmt(total - cost)}。` : `✅ Sold ${qty}, profit ${fmt(total - cost)}.`, 'ok');
  renderInventory(); renderSellOptions(); renderAll();
  showReceipt(p, qty, total, $('sellDate').value || todayStr());
});
function renderInventory() {
  const body = $('inventoryBody');
  body.innerHTML = products.map(p => {
    const unitProfit = p.sellPrice - p.costPrice;
    const stockHtml = p.stock === 0 ? `<span class="low-stock">${t('soldOut')}</span>`
      : p.stock < 5 ? `<span class="low-stock">${p.stock} ⚠️ ${t('lowStock')}</span>` : p.stock;
    return `<tr>
      <td>${esc(p.name)}</td>
      <td class="num">${fmt(p.costPrice)}</td>
      <td class="num">${fmt(p.sellPrice)}</td>
      <td class="num ${unitProfit >= 0 ? 'profit-pos' : 'profit-neg'}">${fmt(unitProfit)}</td>
      <td>${stockHtml}</td>
      <td><button class="btn btn-ghost row-btn" data-delp="${p.id}">✕</button></td>
    </tr>`;
  }).join('');
  $('inventoryEmpty').style.display = products.length ? 'none' : 'block';
  body.querySelectorAll('[data-delp]').forEach(b => b.addEventListener('click', () => {
    if (!confirm(t('delProduct'))) return;
    products = products.filter(p => p.id !== b.dataset.delp);
    save(LS.products, products); renderInventory(); renderSellOptions();
  }));
}

/* ---------------- receipt ---------------- */
function showReceipt(p, qty, total, date) {
  $('receiptLines').innerHTML = `
    <div class="receipt-line"><span>${esc(p.name)} × ${qty}</span><span>${fmt(p.sellPrice)} / ${lang === 'zh' ? '件' : 'pc'}</span></div>
    <div class="receipt-line"><span>${lang === 'zh' ? '数量' : 'Qty'}</span><span>${qty}</span></div>`;
  $('receiptTotal').textContent = fmt(total);
  $('receiptMeta').textContent = `${lang === 'zh' ? '日期' : 'Date'}: ${date} · ${lang === 'zh' ? '单号' : 'No.'} ${uid().toUpperCase()}`;
  $('receiptModal').classList.remove('hidden');
}
$('receiptCloseBtn').addEventListener('click', () => $('receiptModal').classList.add('hidden'));
$('receiptPrintBtn').addEventListener('click', () => window.print());
$('receiptImgBtn').addEventListener('click', () => {
  if (typeof html2canvas === 'undefined') { alert('html2canvas not loaded'); return; }
  html2canvas($('receiptCard'), { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
    canvas.toBlob(b => download(`receipt-${todayStr()}.png`, b, 'image/png'));
  });
});

/* ---------------- stats ---------------- */
function renderStats() {
  const m = monthStr();
  const s = monthStats(m);
  $('statsSummary').innerHTML = summaryCards(s);
  // category breakdown
  const rows = ledger.filter(e => monthStr(e.date) === m);
  const cats = {};
  rows.forEach(e => {
    const k = (e.type === 'income' ? '＋ ' : '－ ') + e.category;
    cats[k] = (cats[k] || 0) + (Number(e.amount) || 0);
  });
  const max = Math.max(0, ...Object.values(cats));
  const wrap = $('catBreakdown');
  if (!Object.keys(cats).length) { wrap.innerHTML = `<p class="muted">${t('noData')}</p>`; }
  else {
    wrap.innerHTML = Object.entries(cats).sort((a, b) => b[1] - a[1]).map(([k, v]) => `
      <div class="cat-bar-row">
        <div class="cat-head"><span>${esc(k)}</span><b>${fmt(v)}</b></div>
        <div class="cat-bar ${k.startsWith('＋') ? 'in' : 'out'}"><div style="width:${max ? (v / max * 100).toFixed(1) : 0}%"></div></div>
      </div>`).join('');
  }
  // daily trend
  const days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const daily = Array.from({ length: days }, () => ({ in: 0, out: 0 }));
  rows.forEach(e => {
    const d = parseInt(e.date.slice(8, 10), 10) - 1;
    if (d >= 0 && d < days) daily[d][e.type === 'income' ? 'in' : 'out'] += Number(e.amount) || 0;
  });
  const dmax = Math.max(1, ...daily.flatMap(d => [d.in, d.out]));
  $('trendChart').innerHTML = daily.map(d => `
    <div class="trend-col">
      <div class="bar bar-in" style="height:${(d.in / dmax * 70).toFixed(1)}px" title="${lang === 'zh' ? '收入' : 'Income'} ${fmt(d.in)}"></div>
      <div class="bar bar-out" style="height:${(d.out / dmax * 70).toFixed(1)}px" title="${lang === 'zh' ? '支出' : 'Expense'} ${fmt(d.out)}"></div>
    </div>`).join('') +
    `<div style="display:none"></div>`;
  // profit summary
  $('profitSummary').innerHTML = `
    <div class="calc-line"><span>${t('sumSales')}</span><b>${fmt(s.sales)}</b></div>
    <div class="calc-line"><span>${t('sumCost')}</span><b>${fmt(s.cogs)}</b></div>
    <div class="calc-line"><span>${t('sumGross')}</span><b class="${s.gross >= 0 ? 'good' : 'bad'}">${fmt(s.gross)}</b></div>
    <div class="calc-line"><span>${t('sumExpense')}</span><b>${fmt(s.expense)}</b></div>
    <div class="calc-line"><span>${t('sumNet')}</span><b class="${s.net >= 0 ? 'good' : 'bad'}">${fmt(s.net)}</b></div>
    <div class="calc-line"><span>${t('sumMargin')}</span><b>${pct(s.margin)}</b></div>`;
}

/* ---------------- copy buttons ---------------- */
document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
  const el = $(btn.dataset.copy);
  try { await navigator.clipboard.writeText(el.textContent); btn.textContent = '✅'; }
  catch (e) {
    const ta = document.createElement('textarea');
    ta.value = el.textContent; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove(); btn.textContent = '✅';
  }
  setTimeout(() => { btn.textContent = t('copy'); }, 1500);
}));

/* ---------------- render all / init ---------------- */
function renderAll() {
  fillMonthFilter();
  renderLedger();
  renderInventory();
  renderSellOptions();
}
function seedDemo() {
  if (ledger.length || products.length) return;
  const m = monthStr();
  ledger = [
    { id: uid(), date: `${m}-03`, type: 'expense', category: '进货', merchant: '好又多批发', amount: 486, cost: 0, note: '饮料零食进货', items: [{ name: '可乐 330ml', qty: 24, unit_price: 3.2, amount: 76.8 }], source: 'scan' },
    { id: uid(), date: `${m}-05`, type: 'income', category: '销售收入', merchant: '可乐 330ml', amount: 120, cost: 76.8, note: '卖出 24 瓶', items: [{ name: '可乐 330ml', qty: 24, unit_price: 5, amount: 120 }], source: 'sale' },
    { id: uid(), date: `${m}-08`, type: 'expense', category: '日用', merchant: '文具店', amount: 35.5, cost: 0, note: '记账本和笔', items: [], source: 'manual' },
    { id: uid(), date: `${m}-12`, type: 'income', category: '销售收入', merchant: '方便面', amount: 60, cost: 36, note: '卖出 12 包', items: [{ name: '方便面', qty: 12, unit_price: 5, amount: 60 }], source: 'sale' },
  ];
  products = [
    { id: uid(), name: '可乐 330ml', costPrice: 3.2, sellPrice: 5, stock: 3 },
    { id: uid(), name: '方便面', costPrice: 3, sellPrice: 5, stock: 18 },
    { id: uid(), name: '矿泉水 550ml', costPrice: 1, sellPrice: 2, stock: 42 },
  ];
  save(LS.ledger, ledger); save(LS.products, products);
}
(function init() {
  const params = new URLSearchParams(location.search);
  if (params.get('demo') === '1') seedDemo();
  $('mDate').value = todayStr();
  $('sellDate').value = todayStr();
  refreshKeyBadge();
  applyI18n();
  updateCalc();
})();
