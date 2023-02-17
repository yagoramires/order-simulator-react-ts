import { MdKeyboardArrowLeft } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className='flex items-center justify-end px-8 font-medium lg:w-full lg:mb-8 lg:p-0 text-gray-50'
    >
      <MdKeyboardArrowLeft size={30} />
    </button>
  )
}

export default BackButton
