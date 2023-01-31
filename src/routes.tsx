// ROUTER DOM
import { Routes, Route } from 'react-router-dom'

// PAGES
import Login from './pages/Login'
import Order from './pages/Order'

const routes = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Login />} />
      <Route path='/order' element={<Order />} /> */}
      <Route path='/' element={<Order />} />
      {/* <Route path='*' element={<NotFoundPage />} /> */}
    </Routes>
  )
}

export default routes
