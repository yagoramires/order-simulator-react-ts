// Components
import CardDetails from './CardDetails'
import FormDetails from './FormDetails'

interface productProps {
  products: Array<{
    id: number
    code: string
    name: string
    industry: string
    price: number
  }>
}

const MainDetails = ({ products }: productProps) => {
  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Produtos</h1>

        <FormDetails industry={'ILUMI'} />
      </div>
      <div className='flex flex-col gap-4 p-8 my-10 bg-white  shadow-md max-h-[75vh] overflow-y-scroll rounded-md'>
        {products && products.map((product) => <CardDetails product={product} key={product.id} />)}
      </div>
    </main>
  )
}

export default MainDetails
