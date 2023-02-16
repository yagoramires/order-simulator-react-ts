import { useState, useContext } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

const Select = () => {
  const [clientDropdown, setClientDropdown] = useState(false)
  const [deadlineDropdown, setDeadlineDropdown] = useState(false)
  const [industryDropdown, setIndustryDropdown] = useState(false)

  const [industry, setIndustry] = useState('')
  const [deadline, setDeadline] = useState('')
  const [client, setClient] = useState('')

  const {
    createNewOrder,
    selectedClient,
    setSelectedClient,
    selectedIndustry,
    setSelectedIndustry,
    selectedDeadline,
    setSelectedDeadline,
    total,
  } = useContext(NewOrderContext)

  const { industries } = useFetchCollection('industries')
  const { clients } = useFetchCollection('clients')
  const { deadlines } = useFetchCollection('deadlines')

  const industriesFilter =
    industry.length > 0
      ? industries.filter((item) =>
          item.fantasyName?.toLowerCase().includes(industry.toLowerCase()),
        )
      : []

  const deadlinesFilter =
    deadline.length > 0
      ? deadlines.filter((item) => item.value?.toLowerCase().includes(deadline.toLowerCase()))
      : []

  const clientsFilter =
    client.length > 0
      ? clients.filter((item) => item.socialName?.toLowerCase().includes(client.toLowerCase()))
      : []

  const handleSelectClient = (id: string, socialName: string, cnpj: string) => {
    setSelectedClient({
      id,
      socialName,
      cnpj,
    })
    setClientDropdown(false)
  }

  const handleSelectedIndustry = (id: string, fantasyName: string, cnpj: string) => {
    setSelectedIndustry({
      id,
      fantasyName,
      cnpj,
    })
    setIndustryDropdown(false)
  }

  const handleSelectDeadline = (id: string, value: string) => {
    setSelectedDeadline({ id, value })
    setDeadlineDropdown(false)
  }

  return (
    <div className='bg-gray-900 w-full max-w-[1400px] p-2 md:p-4 text-gray-50 lg:rounded-lg'>
      <div className='flex items-start justify-center w-full gap-2'>
        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Indústria</span>
          {/* <div
            className='flex items-center justify-between p-2 break-words bg-gray-800 rounded-lg'
            onClick={() => {
              setIndustryDropdown(!industryDropdown)
              setClientDropdown(false)
              setDeadlineDropdown(false)
            }}
          >
            <span>{selectedIndustry.fantasyName}</span>
            <RiArrowDownSLine />
          </div> */}
          <input
            type='text'
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value)
              setIndustryDropdown(true)
              setClientDropdown(false)
              setDeadlineDropdown(false)
            }}
            placeholder='Indústria'
            className='flex items-center justify-between w-full p-2 break-words bg-gray-800 rounded-lg'
          />
          <ul
            className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] md:max-h-[100px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
              industryDropdown ? '' : 'hidden '
            } ${industriesFilter.length === 0 && 'hidden'}`}
          >
            {industriesFilter?.map((industry) => (
              <li
                key={industry.id}
                className='w-full px-2 bg-gray-700 rounded-lg cursor-pointer lg:p-2'
                onClick={() => {
                  handleSelectedIndustry(
                    industry.id || '',
                    industry.fantasyName || '',
                    industry.cnpj || '',
                  )
                  setIndustry(industry.fantasyName || '')
                }}
              >
                <span className='break-words'>{industry.fantasyName}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Prazo de pagamento</span>
          {/* <div
            className='flex items-center justify-between p-2 break-words bg-gray-800 rounded-lg'
            onClick={() => {
              setDeadlineDropdown(!deadlineDropdown)
              setClientDropdown(false)
              setIndustryDropdown(false)
            }}
          >
            <span>{selectedDeadline.value}</span>
            <RiArrowDownSLine />
          </div> */}
          <input
            type='text'
            value={deadline}
            onChange={(e) => {
              setDeadline(e.target.value)
              setIndustryDropdown(false)
              setClientDropdown(false)
              setDeadlineDropdown(true)
            }}
            placeholder='Prazo de pagamento'
            className='flex items-center justify-between w-full p-2 break-words bg-gray-800 rounded-lg'
          />
          <ul
            className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] md:max-h-[100px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
              deadlineDropdown ? '' : 'hidden'
            } ${deadlinesFilter.length === 0 && 'hidden'}`}
          >
            {deadlinesFilter?.map((deadline) => (
              <li
                key={deadline.id}
                className='w-full px-2 bg-gray-700 rounded-lg cursor-pointer lg:p-2'
                onClick={() => {
                  handleSelectDeadline(deadline.id || '', deadline.value || '')
                  setDeadline(deadline.value || '')
                }}
              >
                <span className='break-words'>{deadline.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='relative'>
        <span className='text-xs text-gray-500 lg:text-sm'>Cliente</span>
        {/* <div
          className='flex items-center justify-between p-2 break-words bg-gray-800 rounded-lg'
          onClick={() => {
            setClientDropdown(!clientDropdown)
            setDeadlineDropdown(false)
            setIndustryDropdown(false)
          }}
        >
          <span>{selectedClient.socialName}</span>
          <RiArrowDownSLine />
        </div> */}
        <input
          type='text'
          value={client}
          onChange={(e) => {
            setClient(e.target.value)
            setIndustryDropdown(false)
            setClientDropdown(true)
            setDeadlineDropdown(false)
          }}
          placeholder='Cliente'
          className='flex items-center justify-between w-full p-2 break-words bg-gray-800 rounded-lg'
        />
        <ul
          className={`selectScroll absolute z-50 mt-2 rounded-lg p-2 bg-gray-800 w-full overflow-y-auto shadow-md flex flex-col gap-1 ${
            clientDropdown ? '' : 'hidden'
          } ${clientsFilter.length === 0 && 'hidden'}`}
        >
          {clientsFilter?.map((client) => (
            <li
              key={client.id}
              className='w-full px-2 bg-gray-700 rounded-lg cursor-pointer lg:p-2'
              onClick={() => {
                handleSelectClient(client.id || '', client.socialName || '', client.cnpj || '')
                setClient(client.socialName || '')
              }}
            >
              <span className='break-words'>{client.socialName}</span>
            </li>
          ))}
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
