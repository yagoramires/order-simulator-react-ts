// Components
import CardDetails from './CardDetails'
import FormDetails from './FormDetails'

const MainDetails = () => {
  return (
    <main className='bg-gradient-to-r from-blue-800 to-blue-600 h-[100vh] w-full text-white p-8'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Produtos</h1>

        <FormDetails type={'deadlines'} />
      </div>
      <div className='p-8 my-10 bg-white  shadow-md h-[75vh] overflow-y-scroll'>
        <CardDetails type={'orders'} />
      </div>
    </main>
  )
}

export default MainDetails
