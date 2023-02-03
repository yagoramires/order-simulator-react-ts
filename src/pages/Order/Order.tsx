// Hooks
import { useEffect, useState } from 'react'

// Components
import Header from '../../components/Order/Header'
import SelectedIndustryOrder from '../../components/Order/SelectedIndustryOrder'

// API
import { getClients, getDeadLines, getIndustries } from '../../services/api'

// interface dataProps {
//   id: number
//   name: string
//   cnpj?: string
//   products?: Array<{
//     id: number
//     code: string
//     name: string
//     industry: string
//     price: number
//   }>
//   discount?: number
//   deadline?: string
// }

const Order = () => {
  const total = 0

  // const [industries, setIndustries] = useState<dataProps[]>([])
  // const [deadlines, setDeadlines] = useState<dataProps[]>([])
  // const [clients, setClients] = useState<dataProps[]>([])
  // const [selectedIndustry, setSelectedIndustry] = useState<dataProps[]>([])

  const [industry, setIndustry] = useState('')

  // useEffect(() => {
  //   ;(async () => {
  //     const industriesRequest = await getIndustries()
  //     setIndustries(industriesRequest.data)
  //   })()
  // }, [])

  // useEffect(() => {
  //   ;(async () => {
  //     const deadlinesRequest = await getDeadLines()
  //     setDeadlines(deadlinesRequest.data)
  //   })()
  // }, [])

  // useEffect(() => {
  //   ;(async () => {
  //     const clientsRequest = await getClients()
  //     setClients(clientsRequest.data)
  //   })()
  // }, [])

  // useEffect(() => {
  //   const filteredIndustry = industries.filter((item) => industry === item.name)
  //   setSelectedIndustry(filteredIndustry)
  // }, [industry])

  return (
    <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600'>
      <Header industry={industry} setIndustry={setIndustry} />

      <main>
        <form className='flex flex-col items-center justify-center'>
          <div className='flex md:flex-col items-end justify-center gap-4 p-4 bg-white w-[90%] rounded-md my-4'>
            <div className='flex flex-col w-full gap-1 text-start'>
              <span className='text-xs text-zinc-500'>Cliente</span>

              <select
                name='clients'
                defaultValue={'selecione'}
                className='shadow-sm p-2 bg-zinc-300 rounded-md w-full border-[1px] border-zinc-400'
              >
                <option value='selecione' disabled>
                  Selecione
                </option>
                {/* {clients.length > 0 &&
                  clients.map((client) => (
                    <option value={client.name} key={client.id}>
                      {client.name}
                    </option>
                  ))} */}
              </select>
            </div>
            <div className='flex flex-col w-full gap-1 text-start'>
              <span className='text-xs text-zinc-500'>Cliente</span>
              <select
                name='prazo'
                defaultValue={'selecione'}
                className='shadow-sm p-2 bg-zinc-300 rounded-md w-full border-[1px] border-zinc-400'
              >
                <option value='selecione' disabled>
                  Selecione
                </option>
                {/* {deadlines.map((deadline) => (
                  <option value={deadline.deadline} key={deadline.id}>
                    {deadline.deadline}
                  </option>
                ))} */}
              </select>
            </div>

            <div className='flex w-full gap-2 font-bold md:flex-col md:gap-0 text-start'>
              <h2>Total do pedido:</h2>
              <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
          </div>

          {/* <SelectedIndustryOrder industry={selectedIndustry} /> */}

          <input
            type='submit'
            className='fixed right-[5%] bottom-0 bg-gradient-to-l text-white border-t-[1px] border-x-[1px] border-blue-900 from-blue-800 to-blue-600 py-2 px-4 rounded-t-md cursor-pointer font-bold shadow-md'
            value={'Finalizar Pedido'}
          />
        </form>
      </main>
    </div>
  )
}

export default Order
