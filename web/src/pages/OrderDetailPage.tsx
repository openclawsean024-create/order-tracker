import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrder, advanceOrderStage } from '../lib/db'
import { ALL_STAGES } from '../lib/types'
export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [, setTick] = useState(0)
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 10000); return () => clearInterval(t) }, [])
  if (!id) return <div>訂單不存在</div>
  const order = getOrder(id)
  if (!order) return <div data-testid="order-not-found">訂單不存在</div>
  const stageIdx = ALL_STAGES.indexOf(order.currentStage)
  const isFinished = order.currentStage === '已出貨'
  const passedQ = order.quality.filter(q => q.passed).length
  return (
    <div>
      <Link to="/" className="text-xs text-slate-500 hover:underline">← 回總覽</Link>
      <h1 className="text-2xl font-bold mt-2 mb-4" data-testid="order-title">{order.id}</h1>
      <div className="border border-slate-200 rounded p-4 mb-4">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div><span className="text-xs text-slate-500">客戶</span><div className="font-medium">{order.customer}</div></div>
          <div><span className="text-xs text-slate-500">下單</span><div>{order.orderDate}</div></div>
          <div><span className="text-xs text-slate-500">預計出貨</span><div>{order.shipDate}</div></div>
          <div><span className="text-xs text-slate-500">金額</span><div className="font-bold text-orange-600">{order.amountTWD.toLocaleString()} TWD</div></div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">訂單進度(7 階段)</h3>
          <div className="flex gap-1 mb-2" data-testid="progress-bar">
            {ALL_STAGES.map((s, i) => (
              <div key={s} className="flex-1 px-2 py-2 text-center text-xs rounded" data-testid={`stage-cell-${s}`}>
                <div className={i <= stageIdx ? 'text-orange-600 font-medium' : 'text-slate-400'}>{s}</div>
                <div className={`h-1 mt-1 ${i <= stageIdx ? 'bg-orange-500' : 'bg-slate-200'}`} />
              </div>
            ))}
          </div>
          {!isFinished && (
            <button onClick={() => { advanceOrderStage(order.id); setTick(t => t + 1) }}
              className="w-full mt-3 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              data-testid="advance-stage">
              推進 → {ALL_STAGES[stageIdx + 1]}
            </button>
          )}
          {isFinished && (
            <div className="text-center text-green-600 font-medium mt-3" data-testid="order-complete">✅ 訂單完成,已出貨</div>
          )}
        </div>
      </div>
      <div className="border border-slate-200 rounded p-4 mb-4">
        <h3 className="font-medium mb-2">品檢報告({passedQ}/{order.quality.length})</h3>
        <div className="grid grid-cols-2 gap-2 text-sm" data-testid="quality-list">
          {order.quality.map(q => (
            <div key={q.key} className={`px-2 py-1 rounded ${q.passed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`} data-testid={`quality-${q.key}`}>
              {q.passed ? '✓' : '○'} {q.name}
            </div>
          ))}
        </div>
      </div>
      <div className="border border-slate-200 rounded p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">出貨文件</h3>
          <button className="text-xs px-2 py-1 bg-slate-100 rounded hover:bg-slate-200" data-testid="download-docs">全部下載</button>
        </div>
        <div className="space-y-1 text-sm" data-testid="docs-list">
          {order.shipments.map(d => (
            <div key={d.key} className="flex items-center justify-between border-b last:border-b-0 py-1">
              <span>{d.name}</span>
              <span className={`text-xs ${d.ready ? 'text-green-600' : 'text-amber-600'}`} data-testid={`doc-${d.key}`}>{d.ready ? '✓ 準備完成' : '✗ 準備中'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-orange-300 bg-orange-50 rounded p-3 text-sm mb-4">
        <div className="font-medium text-orange-700">需要協助?</div>
        <p className="text-xs text-orange-600 mt-1">聯絡業務支援專員(9:00-18:00)</p>
        <Link to="/support" className="text-xs text-orange-700 hover:underline" data-testid="contact-support">聯絡業務 →</Link>
      </div>
    </div>
  )
}
