import { useState } from 'react'
import { useAddDoc } from '../../../../../hooks/handleData/useAddDoc'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

const ProductForm = () => {
  const [productImg, setProductImage] = useState(null)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [family, setFamily] = useState('')
  const [open, setOpen] = useState(false)

  const { industryId } = useParams()

  const { addProduct } = useAddDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!name) return toast.error('Preencha o nome!')
    if (!price) return toast.error('Preencha o preço!')

    if (industryId) {
      addProduct(
        {
          code,
          name,
          industry: industryId,
          price: Number(price),
          family,
        },
        productImg || '',
      )
    }

    setCode('')
    setName('')
    setPrice('')
    setFamily('')
    setOpen(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = (e: any) => {
    setProductImage(e.target.files[0])
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
              Adicionar produto
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          <div className='flex items-center justify-center w-full text-blue-600'>
            {productImg && (
              <img
                src={URL.createObjectURL(productImg)}
                alt='preview'
                className='w-[150px] md:w-[80px]'
              />
            )}
          </div>
          <form className='flex flex-col w-full gap-4' onSubmit={handleClient}>
            <input
              type='file'
              placeholder='Nome'
              className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
              onChange={handleSelectImage}
            />
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Código'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='number'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Preço'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type='text'
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Linha'
              value={family}
              onChange={(e) => setFamily(e.target.value)}
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

export default ProductForm
