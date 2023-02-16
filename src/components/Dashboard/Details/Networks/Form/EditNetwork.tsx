import { useState } from 'react'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { MdClose } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

import { useEditDoc } from '../../../../../hooks/handleData/useEditDoc'
import { INetworks } from '../../../../../interfaces'

interface NetworkProps {
  networkId: string
  networkData: INetworks
}

const EditNetwork = ({ networkId, networkData }: NetworkProps) => {
  const [name, setName] = useState(networkData.name)

  const [open, setOpen] = useState(false)

  const { editNetwork } = useEditDoc()

  const handleNetwork = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) return toast.error('Preencha todos o nome!')

    editNetwork(networkId, {
      name,
    })

    setName('')

    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className='relative flex items-center justify-center px-8 py-2 font-medium rounded cursor-pointer text-gray-50 lg:bg-blue-600 lg:h-12 lg:py-0'>
          <FaEdit size={23} />
          <span className='hidden'>Editar</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-1/2 w-[90%] max-w-[800px] rounded-lg shadow-md p-8 translate-x-[-50%] translate-y-[-50%] left-1/2 z-10 bg-gray-800'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-gray-50'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Editar indústria
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          <form className='flex flex-col w-full gap-4' onSubmit={handleNetwork}>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Nome</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Nome Fantasia'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </label>

            <input
              type='submit'
              className='p-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              value={'Editar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditNetwork
