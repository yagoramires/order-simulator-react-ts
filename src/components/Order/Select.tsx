import { useState, useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'
import { IClients, IIndustries } from '../../interfaces'

const Select = () => {
  const [clientDropdown, setClientDropdown] = useState(false)
  const [industryDropdown, setIndustryDropdown] = useState(false)

  const [industry, setIndustry] = useState('')
  const [deadline, setDeadline] = useState('')
  const [client, setClient] = useState('')

  const { createNewOrder, setSelectedClient, setSelectedIndustry, setSelectedDeadline, total } =
    useContext(NewOrderContext)

  const { searchQuery: searchIndustryQuery, searchDoc: searchIndustry } =
    useFetchCollection('industries')
  const { searchQuery: searchClientQuery, searchDoc: searchClient } = useFetchCollection('clients')

  const handleSearchIndustry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIndustryDropdown(true)
    setClientDropdown(false)
    searchIndustry(industry.toLowerCase())
  }

  const handleSearchClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setClientDropdown(true)
    setIndustryDropdown(false)
    searchClient(client.toLowerCase())
  }

  return (
    <div className='bg-gray-900 w-full max-w-[1400px] p-2 md:p-4 text-gray-50 lg:rounded-lg'>
      <div className='flex items-start justify-center w-full gap-2'>
        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Indústria</span>

          <form onSubmit={handleSearchIndustry} className='flex'>
            <input
              type='text'
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value)
              }}
              placeholder='Indústria'
              className='flex items-center justify-between w-full p-2 uppercase break-words bg-gray-800 rounded-l-lg'
            />
            <button className='flex items-center justify-center w-[50px] p-2 bg-blue-600 rounded-r-lg'>
              <FaSearch />
            </button>
          </form>
          <ul
            className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] md:max-h-[100px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
              industryDropdown ? '' : 'hidden '
            } `}
          >
            {searchIndustryQuery?.map((industry: IIndustries, index: number) => (
              <li
                key={index}
                className='w-full px-2 uppercase bg-gray-700 rounded-lg cursor-pointer lg:p-2'
                onClick={() => {
                  setSelectedIndustry(industry)
                  setIndustryDropdown(false)
                  setIndustry(industry.fantasyName || '')
                }}
              >
                <span className='break-words'>{industry.fantasyName}</span>
              </li>
            ))}

            {searchIndustryQuery.length === 0 && <p>Nenhuma indústria encontrada.</p>}
          </ul>
        </div>

        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Prazo de pagamento</span>

          <p className='flex items-center justify-between w-full p-2 break-words bg-gray-800 rounded-lg'>
            {deadline || 'Selecione um cliente'}
          </p>
        </div>
      </div>

      <div className='relative'>
        <span className='text-xs text-gray-500 lg:text-sm'>Cliente</span>

        <form onSubmit={handleSearchClient} className='flex'>
          <input
            type='text'
            value={client}
            onChange={(e) => {
              setClient(e.target.value)
            }}
            placeholder='Cliente'
            className='flex items-center justify-between w-full p-2 uppercase break-words bg-gray-800 rounded-l-lg'
          />
          <button className='flex items-center justify-center w-[50px] p-2 bg-blue-600 rounded-r-lg'>
            <FaSearch />
          </button>
        </form>
        <ul
          className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] md:max-h-[100px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
            clientDropdown ? '' : 'hidden '
          } `}
        >
          {searchClientQuery?.map((client: IClients, index: number) => (
            <li
              key={index}
              className='w-full px-2 uppercase bg-gray-700 rounded-lg cursor-pointer lg:p-2'
              onClick={() => {
                setSelectedClient(client)
                setClientDropdown(false)
                setDeadline(client.deadline || '')
                setSelectedDeadline(client.deadline || '')
                setClient(client.socialName || '')
              }}
            >
              <span className='break-words'>{client.socialName}</span>
            </li>
          ))}

          {searchClientQuery.length === 0 && <p>Nenhum cliente encontrado.</p>}
        </ul>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <div className='flex flex-col'>
          <span className='text-xs text-zinc-500'>Total</span>
          <span className='font-bold'>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>

        <button onClick={createNewOrder} className='px-2 py-1 font-bold bg-blue-600 rounded-md'>
          Finalizar Pedido
        </button>
      </div>
    </div>
  )
}

export default Select
