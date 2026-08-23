import { Link } from 'react-router-dom'
import { listOrders } from '../lib/db'
export default function MessagesPage() {
  const all = listOrders().flatMap(o => o.messages.map(m => ({ ...m, orderId: o.id }))).sort((a, b) => b.timestamp - a.timestamp)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">訊息中心</h1>
      {all.length === 0 && <div className="text-center text-slate-400 py-12">目前沒有訊息</div>}
      <div className="space-y-2" data-testid="messages-list">
        {all.map(m => (
          <Link key={m.id + m.orderId} to={`/order/${m.orderId}`} className="block border border-slate-200 rounded p-3 hover:bg-slate-50">
            <div className="flex items-center gap-2">
              {m.unread && <span className="w-2 h-2 bg-orange-500 rounded-full" data-testid="unread-dot" />}
              <span className="font-medium text-sm">{m.customer}</span>
              <span className="text-xs text-slate-400 ml-auto">{new Date(m.timestamp).toLocaleString('zh-Hant')}</span>
            </div>
            <div className="text-sm text-slate-600 mt-1">{m.preview}</div>
            <div className="text-xs text-slate-400 mt-1">訂單 {m.orderId}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
