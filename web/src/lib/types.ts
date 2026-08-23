export type OrderStage = '訂單確認' | '備料中' | '加工中' | '品檢中' | '包裝中' | '待出貨' | '已出貨'
export const ALL_STAGES: OrderStage[] = ['訂單確認', '備料中', '加工中', '品檢中', '包裝中', '待出貨', '已出貨']
export interface QualityItem { key: string; name: string; passed: boolean }
export interface ShipDocument { key: string; name: string; ready: boolean }
export interface Message { id: string; customer: string; preview: string; timestamp: number; unread: boolean }
export interface Order {
  id: string; customer: string; orderDate: string; shipDate: string
  amountTWD: number; supplier: string; currentStage: OrderStage; completedStages: OrderStage[]
  quality: QualityItem[]; shipments: ShipDocument[]; messages: Message[]; createdAt: number
}
