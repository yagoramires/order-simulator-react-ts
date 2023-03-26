import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { useAddDoc } from '../../../../hooks/handleData/useAddDoc'

const AddDiscount = () => {
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [open, setOpen] = useState(false)

  const { industryId } = useParams()
  // const { addDiscount } = useAddDoc()

  const handleAddDiscount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!discount) return toast.error('Preencha o desconto!')

    const data = {
      code,
      discount,
    }

    setCode('')
    setDiscount(0)
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Adicionar Desconto'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-between w-full gap-2 px-4 py-4 font-bold bg-blue-600 rounded-lg text-gray-50'>
          Desconto Adicional
        </div>
      }
      childrenForm={
        <form className='flex flex-col w-full gap-2' onSubmit={handleAddDiscount}>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Código</span>

            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Código'
              value={code}
              onChange={(e) => setCode(e.target.value.toLowerCase())}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Desconto</span>

            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome'
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value.toLowerCase()))}
            />
          </label>

          <input
            type='submit'
            className='p-2 mt-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
            value={'Adicionar'}
          />
        </form>
      }
    />
  )
}

export default AddDiscount
