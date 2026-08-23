import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold">📦 訂單追蹤神器</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="hover:underline">訂單總覽</Link>
            <Link to="/orders" className="hover:underline">所有訂單</Link>
            <Link to="/messages" className="hover:underline">訊息中心</Link>
            <Link to="/support" className="hover:underline">業務支援</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">訂單追蹤神器 · Sprint 1 · Mock B2B</footer>
    </div>
  )
}
