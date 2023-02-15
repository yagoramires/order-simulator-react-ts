import { useState } from 'react'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { MdClose } from 'react-icons/md'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'
import { IClients } from '../../../../interfaces'
import { FaEdit } from 'react-icons/fa'

interface ClientProps {
  clientId: string
  clientData: IClients
}

const EditClient = ({ clientId, clientData }: ClientProps) => {
  const [fantasyName, setFantasyName] = useState(clientData.fantasyName)
  const [socialName, setSocialName] = useState(clientData.socialName)
  const [cnpj, setCnpj] = useState(clientData.cnpj)
  const [network, setNetwork] = useState(clientData.network)
  const [discount, setDiscount] = useState(clientData.discount)

  const [open, setOpen] = useState(false)

  const { editClient } = useEditDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!fantasyName || !socialName || !cnpj) return toast.error('Preencha todos os campos!')

    editClient(clientId, {
      fantasyName,
      socialName,
      cnpj,
      network,
      discount: discount,
    })

    setFantasyName('')
    setSocialName('')
    setCnpj('')
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <div className='relative flex items-center justify-center px-8 py-2 font-medium text-white rounded cursor-pointer lg:bg-blue-600 lg:h-12 lg:py-0'>
          <FaEdit size={23} />
          <span className='hidden'>Editar</span>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-1/2 w-[90%] max-w-[800px] rounded-lg shadow-md p-8 translate-x-[-50%] translate-y-[-50%] left-1/2 z-10 bg-gray-800'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-gray-50'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Editar cliente
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          <form className='flex flex-col w-full gap-4' onSubmit={handleClient}>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome Fantasia'
              value={fantasyName}
              onChange={(e) => setFantasyName(e.target.value)}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Razão Social'
              value={socialName}
              onChange={(e) => setSocialName(e.target.value)}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='CNPJ'
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Rede'
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            />
            <input
              type='number'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Desconto'
              value={discount}
              onChange={(e) => setDiscount(+e.target.value)}
            />
            <input
              type='submit'
              className='p-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              value={'Atualizar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditClient
