import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import { listOrders, getOrder, advanceOrderStage, seedDemoData } from '../src/lib/db'
import { ALL_STAGES } from '../src/lib/types'

function renderAt(p: string) { return render(<MemoryRouter initialEntries={[p]}><App /></MemoryRouter>) }

beforeEach(async () => {
  localStorage.clear()
  seedDemoData()
})

describe('Sprint 1 E2E - 訂單追蹤神器', () => {
  it('總覽顯示 2 個訂單', () => {
    renderAt('/')
    expect(listOrders().length).toBe(2)
    expect(screen.getByTestId('orders-list')).toBeInTheDocument()
  })

  it('總覽列出每筆訂單的目前階段 testid', () => {
    renderAt('/')
    expect(screen.getByTestId('stage-PO-20240517-001')).toBeInTheDocument()
  })

  it('訂單詳情 7 階段時間軸', () => {
    renderAt('/order/PO-20240517-001')
    const bar = screen.getByTestId('progress-bar')
    expect(bar.children.length).toBe(7)
    expect(screen.getByTestId('stage-cell-品檢中')).toBeInTheDocument()
  })

  it('推進按鈕可推進狀態', () => {
    const before = getOrder('PO-20240517-001')!.currentStage
    advanceOrderStage('PO-20240517-001')
    expect(getOrder('PO-20240517-001')!.currentStage).not.toBe(before)
  })

  it('品檢報告 4 項目(預設全 ✓)', () => {
    const order = getOrder('PO-20240517-001')!
    expect(order.quality.length).toBe(4)
    expect(order.quality.every(q => q.passed)).toBe(true)
  })

  it('出貨文件 5 個', () => {
    const order = getOrder('PO-20240517-001')!
    expect(order.shipments.length).toBe(5)
  })

  it('訊息中心聚合所有訂單對話', () => {
    expect(listOrders().reduce((s, o) => s + o.messages.length, 0)).toBeGreaterThan(0)
  })

  it('所有訂單頁表格顯示 2 筆', () => {
    renderAt('/orders')
    expect(screen.getByTestId('orders-table').children.length).toBe(2)
  })

  it('7 階段正確排序', () => {
    expect(ALL_STAGES.length).toBe(7)
    expect(ALL_STAGES[0]).toBe('訂單確認')
    expect(ALL_STAGES[6]).toBe('已出貨')
  })

  it('業務支援頁顯示訊息輸入', () => {
    renderAt('/support')
    expect(screen.getByTestId('support-msg')).toBeInTheDocument()
  })
})
