import { FaShoppingCart } from 'react-icons/fa'

interface ItemsProps {
  clientName: string
  clientDeadline: string
}

const SelectedItems = ({ clientName, clientDeadline }: ItemsProps) => {
  return (
    <div className='bg-gray-900 w-full max-w-[1400px] p-2  text-gray-50 rounded-lg'>
      <div className='flex items-start justify-center w-full gap-2'>
        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Cliente</span>
          <span className='flex items-center justify-between w-full text-xs uppercase break-words rounded-lg lg:text-sm'>
            {clientName}
          </span>
        </div>

        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Prazo de pagamento</span>

          <span className='flex items-center justify-between w-full text-xs uppercase break-words rounded-lg lg:text-sm'>
            {clientDeadline}
          </span>
        </div>
      </div>

      <div className='flex items-center justify-end mt-2'>
        {/* <div className='flex flex-col'>
          <span className='text-xs text-zinc-500'>Total</span>
          <span className='font-bold'>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div> */}

        <button
          onClick={() => console.log('')}
          className='flex items-center justify-center gap-2 px-2 py-1 font-bold bg-blue-600 rounded-md'
        >
          <FaShoppingCart /> Carrinho
        </button>
      </div>
    </div>
  )
}

export default SelectedItems
