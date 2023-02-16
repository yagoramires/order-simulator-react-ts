import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useEditDoc } from '../../../hooks/handleData/useEditDoc'

import { useNavigate, useParams } from 'react-router-dom'

import Loading from '../../../components/Loading'

import { MdKeyboardArrowLeft, MdNoPhotography } from 'react-icons/md'
import Alert from '../../../components/Dashboard/Alert'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'

const ProductDetails = () => {
  const navigate = useNavigate()

  const { industryId, productId } = useParams()

  const { document: product, loading } = useFetchDocument(
    `industries/${industryId}/products`,
    productId,
  )

  const { editProduct } = useEditDoc()

  const [productImg, setProductImage] = useState(null)
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [family, setFamily] = useState('')
  const [price, setPrice] = useState('')
  const [minValue, setMinValue] = useState('')
  const [unityType, setUnityType] = useState('')

  useEffect(() => {
    if (product) {
      setImage(product.imagePath || '')
      setName(product.name || '')
      setCode(product.code || '')
      setFamily(product.family || '')
      setPrice(product.price || '')
      setMinValue(product.minValue || '')
      setUnityType(product.unityType || '')
    }
  }, [product])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = (e: any) => {
    setProductImage(e.target.files[0])
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o código!')
    if (!name) return toast.error('Preencha o nome!')
    if (!price) return toast.error('Preencha o preço!')

    if (industryId && productImg) {
      editProduct(
        industryId,
        productId || '',
        {
          code,
          name,
          industry: industryId,
          price: Number(price),
          family,
          unityType,
          minValue: Number(minValue),
        },
        productImg,
      )
    } else if (industryId) {
      editProduct(industryId, productId || '', {
        code,
        name,
        industry: industryId,
        price: Number(price),
        family,
        unityType,
        minValue: Number(minValue),
      })
    }

    setCode('')
    setName('')
    setPrice('')
    setFamily('')
    navigate(-1)
  }

  if (loading || !product)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <div className='min-h-[100vh] flex flex-col justify-start items-center p-2 w-full'>
      <div className='max-w-[800px] w-full lg:p-8'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full mb-8 font-medium text-gray-50'
        >
          <MdKeyboardArrowLeft size={20} />
          Voltar
        </button>

        <div className='flex flex-col items-center justify-center gap-4 mb-8'>
          {image && !productImg && <img src={image} alt={product.name} className='w-24 md:w-32' />}

          {productImg && (
            <img
              src={URL.createObjectURL(productImg)}
              alt={product.name}
              className='w-24 md:w-32'
            />
          )}

          {!image && !productImg && <MdNoPhotography className='text-[100px] md:text-[80px] ' />}
        </div>

        <form onSubmit={handleUpdate} className='flex flex-col w-full gap-2'>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Imagem</span>
            <input
              type='file'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              onChange={handleSelectImage}
            />
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Produto</span>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            />
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Código</span>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            />
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Linha</span>
            <input
              type='text'
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            />
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Valor</span>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            />
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Unidade</span>
            <input
              type='text'
              value={unityType}
              onChange={(e) => setUnityType(e.target.value)}
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            />
          </label>
          <label className='flex flex-col gap-2'>
            <span className='text-sm text-gray-700'>Embalagem</span>
            <input
              type='number'
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            />
          </label>
          <div className='flex items-center justify-center gap-4 mt-4'>
            <button
              type='submit'
              className='px-8 py-2 font-bold text-white rounded-md cursor-pointer lg:bg-blue-600 text-gray-50 lg:h-12'
            >
              <FaEdit size={23} />
            </button>
            <Alert
              data={{ type: 'product', id: productId || '', collectionId: industryId || '' }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductDetails
