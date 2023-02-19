import { Link } from 'react-router-dom'

interface ChildrenProps {
  children: React.ReactNode
  id: string
}

const LinkComponent = ({ children, id }: ChildrenProps) => {
  return (
    <Link
      to={`${id}`}
      className='flex items-center w-full gap-2 p-2 py-3 break-words transition-all duration-200 bg-gray-900 rounded-lg lg:p-4 text-gray-50 hover:bg-gray-800'
    >
      {children}
    </Link>
  )
}

export default LinkComponent
