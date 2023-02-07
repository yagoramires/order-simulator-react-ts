// ROUTER DOM
import { Routes, Route, Navigate } from 'react-router-dom'

// Context
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

// Components
import Loading from './components/Loading'

// PAGES
import Login from './pages/Login/Login'
import Order from './pages/Order/Order'
import Dashboard from './pages/Dashboard/Dashboard'
import ClientDetails from './pages/Dashboard/Details/ClientDetails'
import OrderDetails from './pages/Dashboard/Details/OrderDetails'
import ProductDetails from './pages/Dashboard/Details/ProductDetails'
import Profile from './pages/Dashboard/Profile'
import IndustryDetails from './pages/Dashboard/Details/IndustryDetails'
import Industries from './components/Dashboard/Items/Industries'
import Clients from './components/Dashboard/Items/Clients'
import Deadlines from './components/Dashboard/Items/Deadlines'
import Orders from './components/Dashboard/Items/Orders'

const routes = () => {
  const { user, userData } = useContext(AuthContext)

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
      {/* <Route path='*' element={<Navigate to='/' />} /> */}
      {user && (
        <>
          <Route
            path='order'
            element={<Order uid={userData?.uid || ''} displayName={userData?.displayName || ''} />}
          />
          <Route path='profile' element={<Profile />} />

          <Route path='/' element={<Dashboard />}>
            <Route path='orders' element={<Orders />} />
            <Route path='industries' element={<Industries />} />
            <Route path='clients' element={<Clients />} />
            <Route path='deadlines' element={<Deadlines />} />
          </Route>

          <Route path='industries/:industryId' element={<IndustryDetails />} />
          <Route path='industries/:industryId/:productId' element={<ProductDetails />} />
          <Route path='orders/:orderId' element={<OrderDetails />} />
          <Route path='clients/:clientId' element={<ClientDetails />} />
        </>
      )}
    </Routes>
  )
}

export default routes
