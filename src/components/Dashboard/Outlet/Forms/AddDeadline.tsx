import { useState } from 'react'
import { useAddDoc } from '../../../../hooks/handleData/useAddDoc'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { IoMdAdd } from 'react-icons/io'

const AddDeadline = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const { addDeadline } = useAddDoc()

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
    <DialogComponent
      type={'Adicionar Prazo de pagamento'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50 '>
          <IoMdAdd /> Novo
        </div>
      }
      childrenForm={
        <form className='flex flex-col w-full gap-4' onSubmit={handleDeadline}>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Prazo de pagamento</span>

            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Prazo de pagamento'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </label>
          <input
            type='submit'
            className='p-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
            value={'Adicionar'}
          />
        </form>
      }
    />
  )
}

export default AddDeadline
