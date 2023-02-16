import { useState } from 'react'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { MdClose } from 'react-icons/md'
import { useEditDoc } from '../../../../../hooks/handleData/useEditDoc'
import { IClients } from '../../../../../interfaces'
import { FaEdit } from 'react-icons/fa'

interface ClientProps {
  clientId: string
  clientData: IClients
}

const EditClient = ({ clientId, clientData }: ClientProps) => {
  const [code, setCode] = useState(clientData.code)
  const [socialName, setSocialName] = useState(clientData.socialName)
  const [cnpj, setCnpj] = useState(clientData.cnpj)
  const [network, setNetwork] = useState(clientData.network)
  const [engefer, setEngefer] = useState(clientData.engefer)
  const [discountA, setDiscountA] = useState(clientData.discountA)
  const [discountB, setDiscountB] = useState(clientData.discountB)
  const [discountC, setDiscountC] = useState(clientData.discountC)

  const [open, setOpen] = useState(false)

  const { editClient } = useEditDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code || !socialName || !cnpj) return toast.error('Preencha todos os campos!')

    editClient(clientId, {
      code,
      socialName,
      cnpj,
      network,
      engefer,
      discountA,
      discountB,
      discountC,
    })

    setNetwork('')
    setSocialName('')
    setCnpj('')
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
        <Dialog.Content className='fixed top-1/2 w-[90%] max-w-[800px] rounded-lg shadow-md p-8 translate-x-[-50%] translate-y-[-50%] left-1/2 z-10 bg-gray-800'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-gray-50'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Editar cliente
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
              <span className='text-sm text-gray-500'>Razão Social</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Razão Social'
                value={socialName}
                onChange={(e) => setSocialName(e.target.value)}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>CNPJ</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='CNPJ'
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Rede</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Rede'
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Cliente Engefer</span>
              <select
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Rede'
                value={`${engefer}`}
                onChange={(e) => setEngefer(Boolean(e.target.value))}
              >
                <option value='true'>Sim</option>
                <option value='false'>Não</option>
              </select>
            </label>
            {/* <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Desconto</span>
              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Desconto'
                value={discount}
                onChange={(e) => setDiscount(+e.target.value)}
              />
            </label> */}
            <input
              type='submit'
              className='p-2 mt-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              value={'Atualizar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditClient
