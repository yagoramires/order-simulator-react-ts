import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'
import { useFetchDocument } from '../../../../hooks/fetchData/useFetchDocument'

import { IoMdAdd } from 'react-icons/io'
import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [open, setOpen] = useState(false)

  const { networkId } = useParams()
  const { document: network } = useFetchDocument('networks', networkId || '')

  const { updateProductNetwork } = useEditDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!discount) return toast.error('Preencha o desconto!')
    if (!networkId || !network) return

    const product = { code, discount }
    let update = network

    if (network.products) {
      update.products.push(product)
    } else {
      update = { ...network, products: [product] }
    }

    updateProductNetwork(networkId, update)

    setCode('')
    setDiscount(0)
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Adicionar produto'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-between w-full gap-2 px-4 py-4 font-bold bg-blue-600 rounded-lg text-gray-50'>
          Adicionar Produto
        </div>
      }
      childrenForm={
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
            <span className='text-sm text-gray-500'>Desconto</span>

            <input
              type='number'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Preço'
              value={discount}
              onChange={(e) => setDiscount(+e.target.value)}
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

export default AddProduct
