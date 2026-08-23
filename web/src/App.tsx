import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import OrderDetailPage from './pages/OrderDetailPage'
import OrdersPage from './pages/OrdersPage'
import MessagesPage from './pages/MessagesPage'
import SupportPage from './pages/SupportPage'
import './lib/bootstrap'
export default function App() {
  return <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/order/:id" element={<OrderDetailPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  </Layout>
}
