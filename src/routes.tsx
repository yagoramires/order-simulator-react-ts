// ROUTER DOM
import { Routes, Route, Navigate } from 'react-router-dom'

// Context
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

// Components
import PageLoading from './components/GlobalComponents/PageLoading'

// PAGES
import Login from './pages/Login'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import Profile from './components/Dashboard/Outlet/Profile'

import Orders from './components/Dashboard/Outlet/Orders'
import OrderDetails from './pages/Details/OrderDetails'

import Industries from './components/Dashboard/Outlet/Industries'
import IndustryDetails from './pages/Details/IndustryDetails'
import ProductDetails from './pages/Details/Products'

import Clients from './components/Dashboard/Outlet/Clients'
import ClientDetails from './pages/Details/ClientDetails'

import Networks from './components/Dashboard/Outlet/Networks'
import NetworkDetails from './pages/Details/NetworkDetails'

import Deadlines from './components/Dashboard/Outlet/Deadlines'

const routes = () => {
  const { user } = useContext(AuthContext)

  if (user === undefined) {
    return <PageLoading />
  }

  return (
    <Routes>
      <Route path='/' element={user ? <Navigate to='/orders' /> : <Login />} />
      <Route path='*' element={<Navigate to='/' />} />
      <Route path='order/:industryId/:clientId' element={<Order />} />
      {user && (
        <>
          <Route path='profile' element={<Profile />} />

          <Route path='/' element={<Dashboard />}>
            <Route path='orders' element={<Orders />} />
            <Route path='industries' element={<Industries />} />
            <Route path='clients' element={<Clients />} />
            <Route path='deadlines' element={<Deadlines />} />
            <Route path='networks' element={<Networks />} />
          </Route>

          <Route path='industries/:industryId' element={<IndustryDetails />} />
          <Route path='industries/:industryId/product/:productId' element={<ProductDetails />} />
          <Route path='orders/:orderId' element={<OrderDetails />} />
          <Route path='clients/:clientId' element={<ClientDetails />} />
          <Route path='networks/:networkId' element={<NetworkDetails />} />
        </>
      )}
    </Routes>
  )
}

export default routes
