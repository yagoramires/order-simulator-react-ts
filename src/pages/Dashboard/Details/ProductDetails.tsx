// Hooks
import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'

// Router
import { useNavigate, useParams } from 'react-router-dom'

// Components
import Loading from '../../../components/Loading'

// Icons
import { MdKeyboardArrowLeft, MdNoPhotography } from 'react-icons/md'

const ProductDetails = () => {
  const navigate = useNavigate()

  const { industryId, productId } = useParams()

  const { document: product, loading } = useFetchDocument(
    `industries/${industryId}/products`,
    productId,
  )

  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [family, setFamily] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    if (product) {
      setName(product?.name)
      setCode(product?.code)
      setFamily(product?.family)
      setPrice(product?.price)
    }
  }, [product])

  const handleSelectImage = (e: any) => {
    setImage(e.target.files[0])
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('teste')
  }

  if (loading || !product)
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] flex justify-center items-center'>
      <div className=' w-[90%] max-w-[1200px] bg-white p-8 flex flex-col gap-4 rounded-md shadow-md h-[90vh] max-h-[900px] items-center '>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full font-medium text-blue-600'
        >
          <MdKeyboardArrowLeft size={40} />
          Voltar
        </button>

        <div className='flex items-center justify-center w-full mb-4 text-blue-600'>
          {image || product.imagePath ? (
            <img
              src={image ? URL.createObjectURL(image) : product?.imagePath}
              alt={product.name}
              className='w-[150px] md:w-[100px] '
            />
          ) : (
            <MdNoPhotography className='text-[100px] md:text-[60px] ' />
          )}
        </div>
        <form className='flex flex-col gap-4 w-[90%] max-w-[800px]' onSubmit={handleUpdate}>
          <input
            type='file'
            onChange={handleSelectImage}
            className='p-2 rounded-md shadow-sm bg-zinc-200'
          />
          <label className='flex flex-col '>
            <span className='md:md:text-xs text-zinc-400'>Produto</span>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>Código</span>
            <input
              type='text'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>Linha</span>
            <input
              type='text'
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='md:text-xs text-zinc-400'>Valor</span>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='p-2 rounded-md shadow-sm bg-zinc-200'
            />
          </label>
          <input
            type='submit'
            className='p-2 mt-4 font-medium text-white rounded-md shadow-sm cursor-pointer bg-gradient-to-r from-blue-800 to-blue-600 hover:bg-none hover:bg-blue-500'
            value='Atualizar'
          />
        </form>
      </div>
    </main>
  )
}

export default ProductDetails
