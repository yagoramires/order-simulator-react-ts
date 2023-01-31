// ROUTER DOM
import { Routes, Route, Navigate } from 'react-router-dom'

// PAGES
import Login from './pages/Login'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import Details from './pages/Details'
import IndustriesDetails from './pages/IndustriesDetails'

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
      <Route path='dashboard/orders/:id' element={<Details />} />
      <Route path='dashboard/industries/:id' element={<IndustriesDetails />} />
      <Route path='dashboard/clients/:id' element={<Details />} />
      <Route path='dashboard/deadlines/:id' element={<Details />} />
      <Route path='order' element={<Order />} />
      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default routes
