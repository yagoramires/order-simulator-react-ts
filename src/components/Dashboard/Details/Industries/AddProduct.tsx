import { useState } from 'react'

import { useParams } from 'react-router-dom'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { IoMdAdd } from 'react-icons/io'
import { useFetchDocument } from '../../../../hooks/fetchData/useFetchDocument'
import { useAddDoc } from '../../../../hooks/handleData/useAddDoc'
import { doc } from 'firebase/firestore'
import mock from '../../../../productsMock'
import { IProduct } from '../../../../interfaces'

const AddProduct = () => {
  const [productImg, setProductImage] = useState(null)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [family, setFamily] = useState('')
  const [minValue, setMinValue] = useState('')
  const [unityType, setUnityType] = useState('')
  const [open, setOpen] = useState(false)

  const { industryId } = useParams()
  // const { document: industry } = useFetchDocument('industries', industryId)
  const { addProduct } = useAddDoc()

  // const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   mock.forEach(async (product: any) => {
  //     // console.log(product)
  //     await addProduct({ ...product, industryId })
  //   })
  //   return
  // }

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!name) return toast.error('Preencha o nome!')
    if (!price) return toast.error('Preencha o preço!')
    if (!industryId) return

    const product = {
      code,
      name,
      industryId,
      family,
      unityType,
      price: Number(price),
      minValue: Number(minValue),
    }

    if (productImg) {
      addProduct(product, productImg)
    } else {
      addProduct(product)
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
    <DialogComponent
      type={'Adicionar Produto'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50 '>
          <IoMdAdd /> Novo
        </div>
      }
      childrenForm={
        <>
          <div className='flex items-center justify-center w-full text-blue-600'>
            {productImg && (
              <img
                src={URL.createObjectURL(productImg)}
                alt='preview'
                className='w-[150px] md:w-[80px]'
              />
            )}
          </div>
          <form className='flex flex-col w-full gap-2' onSubmit={handleAddProduct}>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Imagem</span>
              <input
                type='file'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                onChange={handleSelectImage}
              />
            </label>
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
              <span className='text-sm text-gray-500'>Nome</span>

              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Nome'
                value={name}
                onChange={(e) => setName(e.target.value.toLowerCase())}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Preço unitário</span>

              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Preço'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Linha</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Linha'
                value={family}
                onChange={(e) => setFamily(e.target.value.toLowerCase())}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Unidade</span>
              <input
                type='text'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Unidade'
                value={unityType}
                onChange={(e) => setUnityType(e.target.value.toLowerCase())}
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Embalagem</span>
              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Embalagem'
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
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

export default AddProduct
