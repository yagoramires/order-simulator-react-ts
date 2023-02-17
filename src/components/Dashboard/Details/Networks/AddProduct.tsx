import { useState } from 'react'
import { useFetchCollection } from '../../../../hooks/fetchData/useFetchCollection'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import { IoMdAdd } from 'react-icons/io'
import DialogComponent from '../../../GlobalComponents/DialogComponent'

const AddProduct = () => {
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [open, setOpen] = useState(false)

  const { networkId } = useParams()
  const { networks } = useFetchCollection('networks')

  console.log(networks)

  const { updateProductNetwork } = useEditDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!discount) return toast.error('Preencha o desconto!')
    if (!networkId) return

    const networkFilter = networks.filter((network) => network.id === networkId)
    let network = networkFilter[0]
    const product = { code, discount }

    if (network.products) {
      network.products.push(product)
    } else {
      network = { ...network, products: [product] }
    }

    updateProductNetwork(networkId, network)

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
        <div className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50 '>
          <IoMdAdd /> Novo
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
