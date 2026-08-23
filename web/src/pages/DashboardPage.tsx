import { Link } from 'react-router-dom'
import { listOrders } from '../lib/db'
import { ALL_STAGES } from '../lib/types'
export default function DashboardPage() {
  const orders = listOrders()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">📦 訂單總覽</h1>
      <p className="text-sm text-slate-500 mb-6">訂單進度像包裹一樣清楚</p>
      {orders.length === 0 && <div className="text-center text-slate-400 py-12">目前沒有訂單</div>}
      <div className="space-y-3" data-testid="orders-list">
        {orders.map(o => {
          const stageIdx = ALL_STAGES.indexOf(o.currentStage)
          const pct = Math.round(((o.completedStages.length + 1) / ALL_STAGES.length) * 100)
          return (
            <Link key={o.id} to={`/order/${o.id}`} className="block border border-slate-200 rounded p-4 hover:shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{o.id}</div>
                  <div className="text-xs text-slate-500">{o.customer} · {o.supplier}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">{o.amountTWD.toLocaleString()} TWD</div>
                  <div className="text-xs">目前階段:<span className="font-medium" data-testid={`stage-${o.id}`}>{o.currentStage}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {ALL_STAGES.map((s, i) => (
                  <div key={s} className={`flex-1 h-1 ${i <= stageIdx ? 'bg-orange-500' : 'bg-slate-100'}`} />
                ))}
              </div>
              <div className="text-xs text-slate-500 mt-1">進度 {pct}% · 出貨日 {o.shipDate}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
