import { Outlet } from 'react-router-dom'

const MainDashboard = () => {
  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <Outlet />
    </main>
  )
}

export default MainDashboard
