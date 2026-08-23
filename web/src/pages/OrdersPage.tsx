import { Link } from 'react-router-dom'
import { listOrders } from '../lib/db'
export default function OrdersPage() {
  const orders = listOrders()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">所有訂單({orders.length})</h1>
      <table className="w-full text-sm">
        <thead className="text-left border-b"><tr><th className="py-1">訂單</th><th>客戶</th><th>金額</th><th>階段</th><th>出貨</th><th></th></tr></thead>
        <tbody data-testid="orders-table">
          {orders.map(o => (
            <tr key={o.id} className="border-b">
              <td className="py-2 font-medium">{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.amountTWD.toLocaleString()}</td>
              <td>{o.currentStage}</td>
              <td>{o.shipDate}</td>
              <td><Link to={`/order/${o.id}`} className="text-orange-600 text-xs hover:underline">查看</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
