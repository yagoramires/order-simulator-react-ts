import { useState } from 'react'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'
import { IClients } from '../../../../interfaces'
import { MdClose } from 'react-icons/md'

interface ClientProps {
  client: IClients
  clientId: string
}

const AddDiscount = ({ client, clientId }: ClientProps) => {
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [open, setOpen] = useState(false)

  const { editClient } = useEditDoc()

  const handleAddDiscount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!discount) return toast.error('Preencha o desconto!')

    const discountProducts = client.discountProducts
      ? [...client.discountProducts, { code, discount }]
      : [{ code, discount }]

    const data = {
      ...client,
      discountProducts,
    }
    editClient(clientId, data)

    setCode('')
    setDiscount(0)
    setOpen(false)
  }

  const handleRemoveDiscount = (code: string) => {
    const discountProducts = client.discountProducts?.filter((product) => product.code !== code)

    const data = {
      ...client,
      discountProducts,
    }

    editClient(clientId, data)
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
        <>
          {client.discountProducts && client.discountProducts?.length > 0 && (
            <ul>
              {client.discountProducts.map((product) => (
                <li key={product.code} className='flex items-center justify-between text-gray-50'>
                  Código: {product.code} - Desconto: {product.discount}%{' '}
                  <button
                    onClick={() => handleRemoveDiscount(product.code)}
                    className='transition-all duration-200 hover:text-red-500'
                  >
                    <MdClose />
                  </button>
                </li>
              ))}
            </ul>
          )}

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
        </>
      }
    />
  )
}

export default AddDiscount
