// React
import { useState } from 'react'

// Icons
import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

// Component Dialog Radix
import * as Dialog from '@radix-ui/react-dialog'

// Hooks
import { useHandleDeadlines } from '../../../hooks/handleData/useHandleDeadlines'
import { toast } from 'react-toastify'

const DeadlineForm = () => {
  const [value, setValue] = useState('')

  const [open, setOpen] = useState(false)

  const { addDeadline } = useHandleDeadlines()

  const handleDeadline = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!value) return toast.error('Preencha o prazo de pagamento!')

    addDeadline({
      value,
    })

    setValue('')
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className='relative flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md shadow-md'>
          <IoMdAdd /> Novo
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-[25%] left-[10%] w-[80%]  md:left-[5%] md:w-[90%] rounded-md shadow-lg p-8'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-blue-600'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Adicionar indústria
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          <form className='flex flex-col w-full gap-4' onSubmit={handleDeadline}>
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Prazo de pagamento'
              value={value}
              onChange={(e) => setValue(e.target.value)}
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

export default DeadlineForm
