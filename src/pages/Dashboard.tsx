// Components
import MainDashboard from '../components/MainDashboard'
import SidebarDashboard from '../components/SidebarDashboard'

const Dashboard = () => {
  return (
    <section className='flex w-full h-[100vh] bg-black100'>
      <SidebarDashboard
        name='Yago Ramires'
        image={'https://avatars.githubusercontent.com/u/77733200?v=4'}
      />
      <MainDashboard />
    </section>
  )
}

export default Dashboard
