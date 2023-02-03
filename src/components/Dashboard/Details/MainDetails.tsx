// Components
import CardDetails from './CardDetails'
import FormDetails from './FormDetails'

interface IndustryProps {
  industry: {
    id: number
    fantasyName: string
    socialName: string
    cnpj: string
    products?: Array<{
      id: number
      code: string
      name: string
      industry: string
      price: number
    }>
  }
}

const MainDetails = ({ industry }: IndustryProps) => {
  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Produtos</h1>

        <FormDetails industry={'ILUMI'} />
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4  p-8  overflow-y-scroll rounded-md max-h-[75vh]'>
          {industry.products ? (
            industry.products.map((product) => <CardDetails product={product} key={product.id} />)
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
