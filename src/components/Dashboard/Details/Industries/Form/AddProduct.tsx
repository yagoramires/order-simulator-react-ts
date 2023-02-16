import { useState } from 'react'
import { useAddDoc } from '../../../../../hooks/handleData/useAddDoc'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import * as Dialog from '@radix-ui/react-dialog'

import { IoMdAdd } from 'react-icons/io'
import { MdClose } from 'react-icons/md'

const AddProduct = () => {
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

    if (industryId && productImg) {
      addProduct(
        {
          code,
          name,
          industry: industryId,
          price: Number(price),
          family,
        },
        productImg,
      )
    } else if (industryId) {
      addProduct({
        code,
        name,
        industry: industryId,
        price: Number(price),
        family,
      })
    }

    setCode('')
    setName('')
    setPrice('')
    setFamily('')
    setProductImage(null)
    setOpen(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = (e: any) => {
    setProductImage(e.target.files[0])
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
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              onChange={handleSelectImage}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Código'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='number'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Preço'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Linha'
              value={family}
              onChange={(e) => setFamily(e.target.value)}
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

export default AddProduct
