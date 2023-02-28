import { FaShoppingCart } from 'react-icons/fa'
import { IClients, IIndustries } from '../../interfaces'
import Cart from './Cart'

interface ClientProps {
  client: IClients
  industry: IIndustries
}

const SelectedItems = ({ client, industry }: ClientProps) => {
  return (
    <div className='bg-gray-900 w-full max-w-[1400px] p-2  text-gray-50 rounded-lg'>
      <div className='flex items-start justify-center w-full gap-2'>
        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Cliente</span>
          <span className='flex items-center justify-between w-full text-xs uppercase break-words rounded-lg lg:text-sm'>
            {client.socialName}
          </span>
        </div>

        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Prazo de pagamento</span>

          <span className='flex items-center justify-between w-full text-xs uppercase break-words rounded-lg lg:text-sm'>
            {client.deadline}
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

        <Cart client={client} industry={industry} />
      </div>
    </div>
  )
}

export default SelectedItems
