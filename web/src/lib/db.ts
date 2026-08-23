import type { Order, OrderStage } from './types'
const KEY = 'order-tracker:db'
interface DBSchema { orders: Order[] }
function read(): DBSchema {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const p = JSON.parse(raw); if (Array.isArray(p.orders)) return p }
  } catch {}
  return { orders: [] }
}
function write(db: DBSchema) { try { localStorage.setItem(KEY, JSON.stringify(db)) } catch {} }

const DEFAULT_QUALITY = [
  { key: 'size', name: '尺寸規格', passed: true },
  { key: 'appearance', name: '外觀檢驗', passed: true },
  { key: 'hardness', name: '硬度檢驗', passed: true },
  { key: 'roughness', name: '表面粗糙度', passed: true },
]
const DEFAULT_DOCS = [
  { key: 'invoice', name: '商業發票', ready: true },
  { key: 'packing', name: '裝箱單', ready: true },
  { key: 'origin', name: '原產地證明', ready: true },
  { key: 'customs', name: '海關文件', ready: true },
  { key: 'inspection', name: '檢驗報告', ready: true },
]
const DEFAULT_MESSAGES = [
  { id: 'm1', customer: '王經理(鋐昇)', preview: '請問 PO-20240517-001 進度?', timestamp: Date.now() - 3600 * 1000, unread: true },
  { id: 'm2', customer: '林課長(精工)', preview: '品檢報告可傳一份嗎?', timestamp: Date.now() - 2 * 3600 * 1000, unread: true },
  { id: 'm3', customer: '陳總(瑞德)', preview: '出貨文件能否今天給?', timestamp: Date.now() - 5 * 3600 * 1000, unread: false },
  { id: 'm4', customer: '何先生(亞科)', preview: '感謝及時出貨!', timestamp: Date.now() - 24 * 3600 * 1000, unread: false },
  { id: 'm5', customer: '吳經理(大昌)', preview: '交期可以提前嗎?', timestamp: Date.now() - 26 * 3600 * 1000, unread: false },
]
const STAGE_NEXT: Record<OrderStage, OrderStage | null> = {
  '訂單確認': '備料中', '備料中': '加工中', '加工中': '品檢中', '品檢中': '包裝中',
  '包裝中': '待出貨', '待出貨': '已出貨', '已出貨': null,
}

export function seedDemoData() {
  const db = read()
  if (db.orders.length > 0) return
  db.orders.push({
    id: 'PO-20240517-001', customer: '精選機械股份有限公司',
    orderDate: '2024-05-17', shipDate: '2024-06-18', amountTWD: 1250000,
    supplier: '示範工廠', currentStage: '品檢中',
    completedStages: ['訂單確認', '備料中', '加工中'],
    quality: DEFAULT_QUALITY.map(q => ({...q})), shipments: DEFAULT_DOCS.map(d => ({...d})),
    messages: DEFAULT_MESSAGES.map(m => ({...m})),
    createdAt: Date.now(),
  })
  db.orders.push({
    id: 'PO-20240601-002', customer: '亞科精密',
    orderDate: '2024-06-01', shipDate: '2024-06-30', amountTWD: 480000,
    supplier: '示範工廠', currentStage: '備料中',
    completedStages: ['訂單確認'],
    quality: DEFAULT_QUALITY.map(q => ({...q, passed: false})),
    shipments: DEFAULT_DOCS.map(d => ({...d, ready: false})),
    messages: DEFAULT_MESSAGES.slice(0, 2).map(m => ({...m})),
    createdAt: Date.now() - 5 * 86400 * 1000,
  })
  write(db)
}
export function getDB(): DBSchema { return read() }
export function listOrders(): Order[] { return [...read().orders].sort((a, b) => b.createdAt - a.createdAt) }
export function getOrder(id: string): Order | undefined { return read().orders.find(o => o.id === id) }
export function advanceOrderStage(id: string) {
  const db = read()
  const o = db.orders.find(x => x.id === id)
  if (!o) return
  const next = STAGE_NEXT[o.currentStage]
  if (!next) return
  if (!o.completedStages.includes(o.currentStage)) o.completedStages.push(o.currentStage)
  o.currentStage = next
  write(db)
}
