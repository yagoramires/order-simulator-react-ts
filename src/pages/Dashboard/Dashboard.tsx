// Components
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'

const Dashboard = () => {
  return (
    <section className='flex w-full h-[100vh] bg-black100'>
      <Sidebar />
      <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
        <Outlet />
      </main>
    </section>
  )
}

export default Dashboard
