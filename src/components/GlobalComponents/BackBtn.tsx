import { MdKeyboardArrowLeft } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className='flex items-center justify-end w-full mb-8 font-medium text-gray-50'
    >
      <MdKeyboardArrowLeft size={20} />
      Voltar
    </button>
  )
}

export default BackButton
