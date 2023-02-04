// Icons
import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

// Component Dialog Radix
import * as Dialog from '@radix-ui/react-dialog'

interface industryProps {
  industry: string
}

const ProductForm = ({ industry }: industryProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className='relative flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md'>
          <IoMdAdd /> Novo
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-[25%] left-[10%] w-[80%]  md:left-[5%] md:w-[90%] rounded-md shadow-lg p-8'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-blue-600'>
            Adicione um novo produto
            <Dialog.Close>
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>

          <form className='flex flex-col w-full gap-4'>
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Código'
            />
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Nome'
            />

            <input
              type='number'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Preço'
            />
            <input
              type='submit'
              className='p-2 font-medium text-white rounded-md shadow-sm cursor-pointer bg-gradient-to-r from-blue-800 to-blue-600'
              value={'Adicionar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ProductForm
