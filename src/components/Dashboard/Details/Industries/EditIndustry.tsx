import { useState } from 'react'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'

import { toast } from 'react-toastify'

import { FaEdit } from 'react-icons/fa'

import { IIndustries } from '../../../../interfaces'
import DialogComponent from '../../../GlobalComponents/DialogComponent'

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
      products: industryData.products || [],
    })

    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Editar Indústria'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-center px-8 py-2 font-medium rounded cursor-pointer text-gray-50 lg:bg-blue-600 lg:h-12 lg:py-0'>
          <FaEdit size={23} />
          <span className='hidden'>Editar</span>
        </div>
      }
      childrenForm={
        <form className='flex flex-col w-full gap-4' onSubmit={handleIndustry}>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Nome fantasia</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome Fantasia'
              value={fantasyName}
              onChange={(e) => {
                setFantasyName(e.target.value.toLowerCase())
              }}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Razão social</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Razão Social'
              value={socialName}
              onChange={(e) => {
                setSocialName(e.target.value.toLowerCase())
              }}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>CNPJ</span>

            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='CNPJ'
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value)
              }}
            />
          </label>
          <input
            type='submit'
            className='p-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
            value={'Editar'}
          />
        </form>
      }
    />
  )
}

export default EditIndustry
