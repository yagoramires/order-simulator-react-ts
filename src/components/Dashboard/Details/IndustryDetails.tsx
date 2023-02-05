// Components
import ProductCard from '../Cards/ProductCard'
import ProductForm from '../Forms/ProductForm'
import { useParams } from 'react-router-dom'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

const MainDetails = () => {
  const { industryId } = useParams()
  const { products } = useFetchCollection(`industries/${industryId}/products`)

  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Produtos</h1>

        <ProductForm />
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4  p-8  overflow-y-scroll rounded-md max-h-[75vh]'>
          {products && products?.length > 0 ? (
            products?.map((product) => <ProductCard product={product} key={product.id} />)
          ) : (
            <>
              <p className=' text-zinc-800'>Nenhum produto cadastrado.</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default MainDetails
