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
    <div className='w-full p-2 bg-white max-w-[1200px] lg:rounded-md lg:p-4'>
      <div className='flex flex-col w-full gap-2 text-start'>
        <div>
          <span className='hidden text-xs text-zinc-500 md:inline'>Indústria</span>
          <div
            className='relative flex items-center justify-between px-4 lg:py-2 font-normal rounded-md border-[1px] border-zinc-300 cursor-pointer bg-zinc-200 '
            onClick={() => {
              setIndustryDropdown(!industryDropdown)
              setClientDropdown(false)
              setDeadlineDropdown(false)
            }}
          >
            <span className='sBtn-text'>{selectedIndustry.fantasyName}</span>
            <RiArrowDownSLine />
          </div>
          <ul
            className={`absolute z-10 overflow-hidden rounded-md border-[1px] border-zinc-300 bg-zinc-200 w-[calc(100%-16px)] mt-2 ${
              industryDropdown ? '' : 'hidden'
            }`}
          >
            <div className='p-2 overflow-y-scroll  max-h-[400px]'>
              {industries?.map((industry) => (
                <li
                  key={industry.id}
                  className='flex items-center py-2 px-4 text-sm rounded-md cursor-pointer w-[100%] hover:bg-zinc-50'
                >
                  <span
                    className='option-text w-[100%]'
                    onClick={() =>
                      handleSelectedIndustry(
                        industry.id || '',
                        industry.fantasyName || '',
                        industry.cnpj || '',
                      )
                    }
                  >
                    {industry.fantasyName}
                  </span>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className='w-[100%]'>
          <span className='hidden text-xs text-zinc-500 md:inline'>Cliente</span>
          <div
            className='relative flex items-center justify-between px-4 lg:py-2 font-normal rounded-md border-[1px] border-zinc-300 cursor-pointer bg-zinc-200 '
            onClick={() => {
              setClientDropdown(!clientDropdown)
              setDeadlineDropdown(false)
            }}
          >
            <span className='sBtn-text'>{selectedClient.socialName}</span>
            <RiArrowDownSLine />
          </div>
          <ul
            className={`absolute z-10 overflow-hidden rounded-md border-[1px] border-zinc-300 bg-zinc-200 w-[calc(100%-16px)] mt-2 ${
              clientDropdown ? '' : 'hidden'
            }`}
          >
            <div className='p-2 overflow-y-scroll  max-h-[300px]'>
              {clients?.map((client) => (
                <li
                  key={client.id}
                  className='flex items-center py-2 px-4 text-sm rounded-md cursor-pointer w-[100%] hover:bg-zinc-50'
                >
                  <span
                    className='option-text w-[100%]'
                    onClick={() =>
                      handleSelectClient(
                        client.id || '',
                        client.socialName || '',
                        client.cnpj || '',
                      )
                    }
                  >
                    {client.socialName}
                  </span>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className='flex flex-col w-full gap-1 text-start'>
          <span className='hidden text-xs text-zinc-500 md:inline'>Prazo de pagamento</span>

          <div className='w-[100%]'>
            <div
              className='relative flex items-center justify-between px-4 lg:py-2 font-normal rounded-md border-[1px] border-zinc-300 cursor-pointer bg-zinc-200 '
              onClick={() => {
                setDeadlineDropdown(!deadlineDropdown)
                setClientDropdown(false)
              }}
            >
              <span className='sBtn-text'>{selectedDeadline.value}</span>
              <RiArrowDownSLine />
            </div>
            <ul
              className={`absolute z-10 overflow-hidden rounded-md border-[1px] border-zinc-300 bg-zinc-200 w-[calc(100%-16px)] mt-2 ${
                deadlineDropdown ? '' : 'hidden'
              }`}
            >
              <div className='p-2 overflow-y-scroll  max-h-[300px]'>
                {deadlines?.map((deadline) => (
                  <li
                    key={deadline.id}
                    className='flex items-center py-2 px-4 text-sm rounded-md cursor-pointer w-[100%] hover:bg-zinc-50'
                  >
                    <span
                      className='option-text w-[100%]'
                      onClick={() => handleSelectDeadline(deadline.id || '', deadline.value || '')}
                    >
                      {deadline.value}
                    </span>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>

        <div className='flex justify-between w-full'>
          <div className='flex flex-col gap-1 text-start'>
            <span className='text-xs text-zinc-500'>Total</span>
            <span className='font-bold'>
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <button
            onClick={createNewOrder}
            className='p-2 font-bold text-white bg-blue-600 rounded-md lg:p-4'
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  )
}

export default Select
