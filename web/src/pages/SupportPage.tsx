import { useState } from 'react'
export default function SupportPage() {
  const [sent, setSent] = useState(false)
  const [msg, setMsg] = useState('')
  function submit() { if (msg.trim()) setSent(true) }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🛟 聯絡業務支援</h1>
      <div className="border border-slate-200 rounded p-4 max-w-md">
        <div className="text-sm text-slate-500 mb-3">服務時間:09:00-18:00(週一至五)</div>
        {sent ? <div className="text-green-600 font-medium" data-testid="sent-confirm">✓ 已送出,業務 1 小時內回覆</div> : <>
          <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={6} placeholder="說明你的問題..." className="w-full mb-3 px-3 py-2 border rounded text-sm" data-testid="support-msg" />
          <button onClick={submit} className="w-full px-4 py-2 bg-orange-500 text-white rounded" data-testid="submit-support">送出</button>
        </>}
      </div>
    </div>
  )
}
