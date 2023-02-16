import { useState } from 'react'
import { useAddDoc } from '../../../../hooks/handleData/useAddDoc'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

const AddIndustry = () => {
  const [fantasyName, setFantasyName] = useState('')
  const [socialName, setSocialName] = useState('')
  const [cnpj, setCnpj] = useState('')

  const [open, setOpen] = useState(false)

  const { addIndustry } = useAddDoc()

  const handleIndustry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!fantasyName || !socialName || !cnpj) return toast.error('Preencha todos os campos!')

    addIndustry({
      fantasyName,
      socialName,
      cnpj,
    })

    setFantasyName('')
    setSocialName('')
    setCnpj('')
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
              Adicionar indústria
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          <form className='flex flex-col w-full gap-4' onSubmit={handleIndustry}>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome Fantasia'
              value={fantasyName}
              onChange={(e) => {
                setFantasyName(e.target.value)
              }}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Razão Social'
              value={socialName}
              onChange={(e) => {
                setSocialName(e.target.value)
              }}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='CNPJ'
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value)
              }}
            />
            <input
              type='submit'
              className='p-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              value={'Adicionar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AddIndustry
