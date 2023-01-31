// Components
import MainDetails from '../components/MainDetails'
import SidebarDetails from '../components/SidebarDetails'

const IndustriesDetails = () => {
  return (
    <div className='flex gap-10'>
      <SidebarDetails
        industry={{
          name: 'ILUMI',
          cnpj: '00.000.000/0000-01',
          socialname: 'ILUMI INDUSTRIA E COMERCIO LTDA',
        }}
      />
      <MainDetails
        products={[{ id: 1, code: '21321123', name: 'Product 1', industry: 'ILUMI', price: 3.76 }]}
      />
    </div>
  )
}

export default IndustriesDetails
