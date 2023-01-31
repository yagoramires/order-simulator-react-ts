// COMPONENTS
import Header from '../components/Header'
import Product from '../components/Product'

const Order = () => {
  const clientsMock = [
    {
      name: 'Cofeos Ferragens',
    },
    {
      name: 'Fluzão Malvadão',
    },
    {
      name: 'Trenamar ',
    },
    {
      name: 'DIBA 695 ',
    },
  ]

  const prazoMock = [
    {
      prazo: '14/28/42',
    },
    {
      prazo: '63/70/77/84/91/98/105/112',
    },
    {
      prazo: '26/56',
    },
    {
      prazo: '56',
    },
  ]

  const productsMock = [
    {
      name: 'Produto 1',
      code: '784234329',
      value: 7.28,
    },
    {
      name: 'Produto 2',
      code: '784234329',
      value: 3.75,
    },
    {
      name: 'Produto 3',
      code: '784234329',
      value: 1.42,
    },
    {
      name: 'Produto 4',
      code: '784234329',
      value: 13.5,
    },
    {
      name: 'Produto 5',
      code: '784234329',
      value: 4.25,
    },
    {
      name: 'BLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLA',
      code: '784234329',
      value: 4.25,
    },
  ]

  const total = 14765.23

  return (
    <div className='min-h-[100vh] bg-image bg-gradient-to-r from-blue-800 to-blue-600 '>
      <Header />

      <main>
        <form className='flex flex-col justify-center items-center'>
          <div className='flex md:flex-col items-end justify-center gap-4 p-4 bg-white w-[90%] rounded-md my-4'>
            <div className='flex flex-col gap-1 text-start w-full'>
              <span className='text-xs text-zinc-500'>Cliente</span>

              <select
                name='clients'
                defaultValue={'selecione'}
                className='shadow-sm p-2 bg-zinc-300 rounded-md w-full border-[1px] border-zinc-400'
              >
                <option value='selecione' disabled>
                  Selecione
                </option>
                {clientsMock.map((client, index) => (
                  <option value={client.name} key={index}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1 text-start w-full'>
              <span className='text-xs text-zinc-500'>Cliente</span>
              <select
                name='prazo'
                defaultValue={'selecione'}
                className='shadow-sm p-2 bg-zinc-300 rounded-md w-full border-[1px] border-zinc-400'
              >
                <option value='selecione' disabled>
                  Selecione
                </option>
                {prazoMock.map((prazo, index) => (
                  <option value={prazo.prazo} key={index}>
                    {prazo.prazo}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex md:flex-col font-bold gap-2 md:gap-0 text-start w-full'>
              <h2>Total do pedido:</h2>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          <div className='p-4 bg-white w-[90%] rounded-md flex flex-col gap-4'>
            {productsMock.map((product, index) => (
              <Product name={product.name} value={product.value} code={product.code} key={index} />
            ))}
          </div>
          <input
            type='submit'
            className='fixed right-[5%] bottom-0 bg-gradient-to-l text-white border-t-[1px] border-x-[1px] border-black from-blue-800 to-blue-600 py-2 px-4 rounded-t-md cursor-pointer font-bold shadow-md'
            value={'Finalizar Pedido'}
          />
        </form>
      </main>
    </div>
  )
}

export default Order
