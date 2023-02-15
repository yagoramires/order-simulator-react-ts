// Components
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'

const Dashboard = () => {
  return (
    <div className='lg:flex'>
      <Sidebar />
      <div className='lg:flex lg:items-center lg:justify-center lg:w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
