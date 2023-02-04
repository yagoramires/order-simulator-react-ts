// Router

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ProductDetails = () => {
  const navigate = useNavigate()

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className='h-[80vh] w-[90%] bg-white p-8 flex flex-col gap-4 rounded-md shadow-md'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full font-medium text-blue-600'
        >
          <MdKeyboardArrowLeft size={20} />
          Voltar
        </button>
        <div className='flex flex-col '>
          <span className='text-xs text-zinc-400'>Produto</span>
          <span className='font-bold'></span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Código</span>
          <span className='font-bold'></span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Valor</span>
          <span className='font-bold'></span>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-zinc-400'>Imagem</span>
          <span className='font-bold'></span>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
