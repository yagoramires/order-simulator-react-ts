import { useState, useContext } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

const Select = () => {
  const [clientDropdown, setClientDropdown] = useState(false)
  const [deadlineDropdown, setDeadlineDropdown] = useState(false)
  const [industryDropdown, setIndustryDropdown] = useState(false)

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
          <div
            className='flex items-center justify-between p-2 break-words bg-gray-800 rounded-lg'
            onClick={() => {
              setIndustryDropdown(!industryDropdown)
              setClientDropdown(false)
              setDeadlineDropdown(false)
            }}
          >
            <span>{selectedIndustry.fantasyName}</span>
            <RiArrowDownSLine />
          </div>
          <ul
            className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] md:max-h-[100px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
              industryDropdown ? '' : 'hidden'
            }`}
          >
            {industries?.map((industry) => (
              <li
                key={industry.id}
                className='w-full px-2 bg-gray-700 rounded-lg cursor-pointer lg:p-2'
              >
                <span
                  onClick={() =>
                    handleSelectedIndustry(
                      industry.id || '',
                      industry.fantasyName || '',
                      industry.cnpj || '',
                    )
                  }
                  className='break-words'
                >
                  {industry.fantasyName}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className='relative w-[50%]'>
          <span className='text-xs text-gray-500 lg:text-sm'>Prazo de pagamento</span>
          <div
            className='flex items-center justify-between p-2 break-words bg-gray-800 rounded-lg'
            onClick={() => {
              setDeadlineDropdown(!deadlineDropdown)
              setClientDropdown(false)
              setIndustryDropdown(false)
            }}
          >
            <span>{selectedDeadline.value}</span>
            <RiArrowDownSLine />
          </div>
          <ul
            className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] md:max-h-[100px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
              deadlineDropdown ? '' : 'hidden'
            }`}
          >
            {deadlines?.map((deadline) => (
              <li
                key={deadline.id}
                className='w-full px-2 bg-gray-700 rounded-lg cursor-pointer lg:p-2'
              >
                <span
                  onClick={() => handleSelectDeadline(deadline.id || '', deadline.value || '')}
                  className='break-words'
                >
                  {deadline.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='relative'>
        <span className='text-xs text-gray-500 lg:text-sm'>Cliente</span>
        <div
          className='flex items-center justify-between p-2 break-words bg-gray-800 rounded-lg'
          onClick={() => {
            setClientDropdown(!clientDropdown)
            setDeadlineDropdown(false)
            setIndustryDropdown(false)
          }}
        >
          <span>{selectedClient.socialName}</span>
          <RiArrowDownSLine />
        </div>
        <ul
          className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[50px] overflow-y-auto shadow-md flex flex-col gap-1 ${
            clientDropdown ? '' : 'hidden'
          }`}
        >
          {clients?.map((client) => (
            <li
              key={client.id}
              className='w-full px-2 bg-gray-700 rounded-lg cursor-pointer lg:p-2'
            >
              <span
                onClick={() =>
                  handleSelectClient(client.id || '', client.socialName || '', client.cnpj || '')
                }
                className='break-words'
              >
                {client.socialName}
              </span>
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
