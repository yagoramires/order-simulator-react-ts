import { BsCartCheckFill } from 'react-icons/bs'
import { FaPlus, FaIndustry, FaUserAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface userProps {
  name: string
  image?: string
}
const SidebarDashboard = (props: userProps) => {
  return (
    <aside className='flex flex-col gap-16 items-center justify-between p-4 bg-white md:fixed md:left-0 md:right-0 md:bottom-0 md:z-[999] md:w-full md:flex-row w-[450px] shadow-lg'>
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
          <ul className='flex flex-col gap-4'>
            <li>
              <Link
                to='/order'
                className='flex items-center gap-4 p-4 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500'
              >
                <FaPlus />
                Novo Pedido
              </Link>
            </li>
            <li className='flex items-center gap-4 p-4 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500'>
              <BsCartCheckFill />
              Pedidos
            </li>
            <li className='flex items-center gap-4 p-4 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500'>
              <FaIndustry />
              Indústrias
            </li>
            <li className='flex items-center gap-4 p-4 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500'>
              <FaUserAlt />
              Clientes
            </li>
            <li className='flex items-center gap-4 p-4 text-xl font-bold text-white transition-all duration-200 bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-500'>
              <FaRegCalendarAlt />
              Prazos de Pagamento
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default SidebarDashboard
