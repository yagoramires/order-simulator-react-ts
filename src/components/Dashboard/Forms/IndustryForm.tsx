import { useState } from 'react'
import { useHandleIndustries } from '../../../hooks/handleData/useHandleIndustries'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

const IndustryForm = () => {
  const [fantasyName, setFantasyName] = useState('')
  const [socialName, setSocialName] = useState('')
  const [cnpj, setCnpj] = useState('')

  const [open, setOpen] = useState(false)

  const { addIndustry } = useHandleIndustries()

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
        <div className='relative flex items-center self-end justify-between gap-4 p-4 text-xl font-bold text-blue-600 bg-white rounded-md shadow-md'>
          <IoMdAdd /> Novo
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-[25%] left-[calc(50vw-400px)] md:left-[5%] md:w-[90%] w-[800px] rounded-md shadow-lg p-8'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-blue-600'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Adicionar indústria
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          <form className='flex flex-col w-full gap-4' onSubmit={handleIndustry}>
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Nome Fantasia'
              value={fantasyName}
              onChange={(e) => {
                setFantasyName(e.target.value)
              }}
            />
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Razão Social'
              value={socialName}
              onChange={(e) => {
                setSocialName(e.target.value)
              }}
            />
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='CNPJ'
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value)
              }}
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

export default IndustryForm
