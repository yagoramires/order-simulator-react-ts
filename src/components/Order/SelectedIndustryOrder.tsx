// Components
import Product from './Product'

interface IndustryProps {
  industry: Array<{
    id: number
    name: string
    cnpj?: string
    products?: Array<{
      id: number
      code: string
      name: string
      industry: string
      price: number
    }>
  }>
}

const SelectedIndustryOrder = ({ industry }: IndustryProps) => {
  return (
    <div className='p-4 bg-white w-[90%] rounded-md flex flex-col gap-4'>
      {industry[0]?.products?.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      {industry.length === 0 && <p className='w-full py-20 text-center'>Selecione uma fábrica.</p>}
    </div>
  )
}

export default SelectedIndustryOrder
