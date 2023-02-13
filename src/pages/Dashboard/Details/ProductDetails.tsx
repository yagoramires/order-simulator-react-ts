import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'
import { useEditDoc } from '../../../hooks/handleData/useEditDoc'

import { useNavigate, useParams } from 'react-router-dom'

import Loading from '../../../components/Loading'

import { MdKeyboardArrowLeft, MdNoPhotography } from 'react-icons/md'
import Alert from '../../../components/Dashboard/Alert'
import { toast } from 'react-toastify'

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

  useEffect(() => {
    if (product) {
      setImage(product?.imagePath)
      setName(product?.name)
      setCode(product?.code)
      setFamily(product?.family)
      setPrice(product?.price)
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
      })
    }

    setCode('')
    setName('')
    setPrice('')
    setFamily('')
  }

  if (loading || !product)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className=' w-[90%] max-w-[1200px] bg-white flex gap-4  rounded-md shadow-md h-[90vh] max-h-[900px]  overflow-hidden'>
        <div className=' w-full max-w-[1200px] flex flex-col items-center gap-4 p-8 overflow-y-scroll'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center justify-end w-full font-medium text-blue-600'
          >
            <MdKeyboardArrowLeft size={20} />
            Voltar
          </button>

          <div className='flex items-center justify-center w-full mb-4 text-blue-600'>
            {image && !productImg && (
              <img src={image} alt={product.name} className='w-[150px] md:w-[80px] ' />
            )}

            {productImg && (
              <img
                src={URL.createObjectURL(productImg)}
                alt={product.name}
                className='w-[150px] md:w-[80px] '
              />
            )}

            {!image && !productImg && <MdNoPhotography className='text-[100px] md:text-[80px] ' />}
          </div>
          <form className='flex flex-col gap-4 w-[90%] max-w-[800px]' onSubmit={handleUpdate}>
            <label className='flex flex-col gap-2'>
              <span className='md:md:text-xs text-zinc-400'>Imagem</span>
              <input
                type='file'
                className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
                onChange={handleSelectImage}
              />
            </label>
            <label className='flex flex-col gap-2'>
              <span className='md:md:text-xs text-zinc-400'>Produto</span>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='p-2 rounded-md shadow-sm bg-zinc-200'
              />
            </label>
            <label className='flex flex-col gap-2'>
              <span className='md:text-xs text-zinc-400'>Código</span>
              <input
                type='text'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className='p-2 rounded-md shadow-sm bg-zinc-200'
              />
            </label>
            <label className='flex flex-col gap-2'>
              <span className='md:text-xs text-zinc-400'>Linha</span>
              <input
                type='text'
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                className='p-2 rounded-md shadow-sm bg-zinc-200'
              />
            </label>
            <label className='flex flex-col gap-2'>
              <span className='md:text-xs text-zinc-400'>Valor</span>
              <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='p-2 rounded-md shadow-sm bg-zinc-200'
              />
            </label>
            <div className='flex items-center justify-center gap-4 mt-4'>
              <input
                type='submit'
                className='flex items-center justify-center px-4 py-2 font-medium text-white transition-all duration-200 bg-blue-600 rounded shadow-md cursor-pointer hover:bg-blue-400 h-9'
                value='Atualizar'
              />
              <Alert
                data={{ type: 'product', id: productId || '', collectionId: industryId || '' }}
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ProductDetails
