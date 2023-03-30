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

import Users from './components/Dashboard/Outlet/Users'

import Networks from './components/Dashboard/Outlet/Networks'
import NetworkDetails from './pages/Details/NetworkDetails'
import ClientDashboard from './pages/ClientDashboard'
import ClientOrder from './pages/Details/ClientOrder'

const routes = () => {
  const { user, userData } = useContext(AuthContext)
  if (user === undefined || !userData) {
    return <PageLoading />
  }

  return (
    <Routes>
      {!user && <Route path='/' element={<Login />} />}
      <Route path='*' element={<Navigate to='/' />} />
      {user && (
        <>
          <Route
            path='order/:industryId/:clientId'
            element={!userData.admin ? <Order /> : <Navigate to='/' />}
          />
          <Route path='/' element={userData.admin ? <Dashboard /> : <ClientDashboard />}>
            {/* <Route path='orders' element={userData.admin ? <Orders /> : <Navigate to='/' />} />
            <Route
              path='industries'
              element={userData.admin ? <Industries /> : <Navigate to='/' />}
            />
            <Route path='clients' element={userData.admin ? <Clients /> : <Navigate to='/' />} />
            <Route path='networks' element={userData.admin ? <Networks /> : <Navigate to='/' />} /> */}
            <Route path='/' element={<Navigate to='/orders' />} />
            <Route path='orders' element={<Orders />} />
            <Route path='industries' element={<Industries />} />
            <Route path='clients' element={<Clients />} />
            <Route path='users' element={<Users />} />
            <Route path='networks' element={<Networks />} />
          </Route>

          <Route path='profile' element={<Profile />} />

          <Route
            path='industries/:industryId'
            element={userData.admin ? <IndustryDetails /> : <Navigate to='/' />}
          />
          <Route
            path='industries/:industryId/product/:productId'
            element={userData.admin ? <ProductDetails /> : <Navigate to='/' />}
          />
          <Route
            path='orders/:orderId'
            element={userData.admin ? <OrderDetails /> : <ClientOrder />}
          />
          <Route
            path='clients/:clientId'
            element={userData.admin ? <ClientDetails /> : <Navigate to='/' />}
          />
          <Route
            path='networks/:networkId'
            element={userData.admin ? <NetworkDetails /> : <Navigate to='/' />}
          />
        </>
      )}
    </Routes>
  )
}

export default routes
