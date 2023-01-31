// Icons
import { BsCartCheckFill } from 'react-icons/bs'
import { FaPlus, FaIndustry, FaUserAlt, FaRegCalendarAlt } from 'react-icons/fa'

// Router
import { Link } from 'react-router-dom'

interface userProps {
  name: string
  image?: string
}
const SidebarDashboard = (props: userProps) => {
  return (
    <aside className='flex flex-col gap-16 items-center justify-between p-4 md:p-0 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] shadow-lg'>
      <div className='flex flex-col items-center justify-center gap-4 md:hidden'>
        <img
          src={props.image}
          alt=''
          className='w-48 h-48 border-4 border-blue-600 rounded-full cursor-pointer'
        />
        <h1 className='text-2xl font-medium text-blue-600 cursor-pointer'>{props.name}</h1>
      </div>

      <div className='w-full h-full'>
        <nav>
          <ul className='flex flex-col gap-4 md:flex-row md:justify-center md:gap-0'>
            <li className='md:w-[20%]'>
              <Link
                to='/order'
                className='flex items-center gap-4 p-4 md:p-6 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none border-r-zinc-300 border-r-[1px] md:justify-center md:w-[full]'
              >
                <FaPlus />
                <span className='md:hidden'>Novo Pedido</span>
              </Link>
            </li>

            <li className='md:w-[20%]'>
              <Link
                to='/dashboard/orders'
                className='flex items-center gap-4 p-4 md:p-6 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none border-r-zinc-300 border-r-[1px] md:justify-center md:w-full'
              >
                <BsCartCheckFill />
                <span className='md:hidden'>Pedidos</span>
              </Link>
            </li>
            <li className='md:w-[20%]'>
              <Link
                to='/dashboard/industries'
                className='flex items-center gap-4 p-4 md:p-6 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none border-r-zinc-300 border-r-[1px] md:justify-center md:w-full'
              >
                <FaIndustry />
                <span className='md:hidden'>Indústrias</span>
              </Link>
            </li>
            <li className='md:w-[20%]'>
              <Link
                to='/dashboard/clients'
                className='flex items-center gap-4 p-4 md:p-6 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none border-r-zinc-300 border-r-[1px] md:justify-center md:w-full'
              >
                <FaUserAlt />
                <span className='md:hidden'>Clientes</span>
              </Link>
            </li>
            <li className='md:w-[20%]'>
              <Link
                to='/dashboard/deadlines'
                className='flex items-center gap-4 p-4 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer md:p-6 md:bg-white md:text-blue-600 hover:bg-blue-500 md:hover:bg-white md:shadow-none md:rounded-none md:justify-center md:w-full'
              >
                <FaRegCalendarAlt />
                <span className='md:hidden'>Prazos de Pagamento</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default SidebarDashboard
