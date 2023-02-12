import { useState } from 'react'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { MdClose } from 'react-icons/md'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'
import { IAddIndustry, IIndustries } from '../../../../interfaces'

interface IndustryProps {
  industryId: string
  industryData: IIndustries
}

const EditIndustry = ({ industryId, industryData }: IndustryProps) => {
  const [fantasyName, setFantasyName] = useState(industryData.fantasyName)
  const [socialName, setSocialName] = useState(industryData.socialName)
  const [cnpj, setCnpj] = useState(industryData.cnpj)

  const [open, setOpen] = useState(false)

  const { editIndustry } = useEditDoc()

  const handleIndustry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!fantasyName || !socialName || !cnpj) return toast.error('Preencha todos os campos!')

    editIndustry(industryId, {
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
        <div className='relative flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-600 rounded cursor-pointer focus: hover:bg-blue-500 h-9'>
          Editar
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-1/2 w-[90%] max-w-[800px] rounded-md shadow-lg p-8 translate-x-[-50%] translate-y-[-50%] left-1/2'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-blue-600'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              Editar indústria
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
              value={'Editar'}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditIndustry
