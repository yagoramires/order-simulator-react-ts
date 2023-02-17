import { Link } from 'react-router-dom'

interface ChildrenProps {
  children: React.ReactNode
  id: string
}

const LinkComponent = ({ children, id }: ChildrenProps) => {
  return (
    <Link
      to={`${id}`}
      className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
    >
      {children}
    </Link>
  )
}

export default LinkComponent
