// ROUTER DOM
import { Routes, Route, Navigate } from 'react-router-dom'

// PAGES
import Login from './pages/Login'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import ClientDetails from './pages/ClientDetails'
import IndustriesDetails from './pages/IndustriesDetails'
import OrderDetails from './pages/OrderDetails'
import ProductDetails from './pages/ProductDetails'

const routes = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Login />} /> */}
      <Route path='/' element={<Navigate to='dashboard/orders' />} />
      <Route path='dashboard'>
        <Route path='orders' element={<Dashboard />} />
        <Route path='industries' element={<Dashboard />} />
        <Route path='clients' element={<Dashboard />} />
        <Route path='deadlines' element={<Dashboard />} />
      </Route>
      <Route path='dashboard/orders/:orderId' element={<OrderDetails />} />
      <Route path='dashboard/industries/:industryId' element={<IndustriesDetails />} />
      <Route path='dashboard/industries/:industryId/:productId' element={<ProductDetails />} />
      <Route path='dashboard/clients/:clientId' element={<ClientDetails />} />
      <Route path='order' element={<Order />} />
      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default routes
