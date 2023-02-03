// Components
import MainDashboard from '../../components/Dashboard/MainDashboard'
import SidebarDashboard from '../../components/Dashboard/SidebarDashboard'

const Dashboard = () => {
  return (
    <section className='flex w-full h-[100vh] bg-black100'>
      <SidebarDashboard />
      <MainDashboard />
    </section>
  )
}

export default Dashboard
