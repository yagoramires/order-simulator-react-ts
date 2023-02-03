// ROUTER DOM
import { Routes, Route, Navigate } from 'react-router-dom'

// Context
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

// Components
import Loading from './components/Loading'

// PAGES
import Login from './pages/Login'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import ClientDetails from './pages/ClientDetails'
import IndustriesDetails from './pages/IndustriesDetails'
import OrderDetails from './pages/OrderDetails'
import ProductDetails from './pages/ProductDetails'
import Profile from './pages/Profile'

const routes = () => {
  const { user } = useContext(AuthContext)

  if (user === undefined) {
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={user ? <Navigate to='/order' /> : <Login />} />
      <Route path='*' element={<Navigate to='/' />} />
      {user && (
        <>
          <Route path='order' element={<Order />} />
          <Route path='orders' element={<Dashboard />} />
          <Route path='industries' element={<Dashboard />} />
          <Route path='clients' element={<Dashboard />} />
          <Route path='deadlines' element={<Dashboard />} />
          <Route path='orders/:orderId' element={<OrderDetails />} />
          <Route path='industries/:industryId' element={<IndustriesDetails />} />
          <Route path='industries/:industryId/:productId' element={<ProductDetails />} />
          <Route path='clients/:clientId' element={<ClientDetails />} />
          <Route path='profile' element={<Profile />} />
        </>
      )}
    </Routes>
  )
}

export default routes
