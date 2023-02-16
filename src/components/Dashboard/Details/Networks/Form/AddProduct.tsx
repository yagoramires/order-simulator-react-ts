import { useState } from 'react'
import { useAddDoc } from '../../../../../hooks/handleData/useAddDoc'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

const AddProduct = () => {
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [open, setOpen] = useState(false)

  const { networkId } = useParams()

  const { addProductNetwork } = useAddDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!discount) return toast.error('Preencha o desconto!')

    addProductNetwork({
      networkId: networkId || '',
      code,
      discount,
    })

    setCode('')
    setDiscount(0)
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50 '>
          <IoMdAdd /> Novo
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed top-1/2 w-[90%] max-w-[800px] rounded-lg shadow-md p-8 translate-x-[-50%] translate-y-[-50%] left-1/2 z-10 bg-gray-800'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-gray-50'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Adicionar produto
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>

          <form className='flex flex-col w-full gap-2' onSubmit={handleClient}>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Código</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Código'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Desconto</span>

              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Preço'
                value={discount}
                onChange={(e) => setDiscount(+e.target.value)}
              />
            </label>

            <input
              type='submit'
              className='p-2 mt-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              value={'Adicionar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AddProduct
