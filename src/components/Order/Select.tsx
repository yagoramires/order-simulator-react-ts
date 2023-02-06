import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

interface DataProps {
  // clients: Array<IClients>
  // deadlines: Array<IDeadlines>
  total: number
  selectedClient: { id: string; socialName: string }
  setSelectedClient: React.Dispatch<
    React.SetStateAction<{ id: string; socialName: string; cnpj: string }>
  >
  selectedDeadline: string
  setSelectedDeadline: React.Dispatch<React.SetStateAction<string>>
}

const Select = ({
  total,
  selectedClient,
  setSelectedClient,
  selectedDeadline,
  setSelectedDeadline,
}: DataProps) => {
  const [clientDropdown, setClientDropdown] = useState(false)
  const [deadlineDropdown, setDeadlineDropdown] = useState(false)

  const { deadlines } = useFetchCollection('deadlines')
  const { clients } = useFetchCollection('clients')

  const handleSelectClient = (id: string, socialName: string, cnpj: string) => {
    setSelectedClient({
      id,
      socialName,
      cnpj,
    })
    setClientDropdown(false)
  }

  const handleSelectDeadline = (deadline: string) => {
    setSelectedDeadline(deadline)
    setDeadlineDropdown(false)
  }

  return (
    <div className='flex items-center justify-center p-4 bg-white w-[90%] max-w-[1200px] rounded-md my-4'>
      <div className='flex flex-col w-full gap-4 text-start'>
        <div className='w-[100%]'>
          <span className='text-xs text-zinc-500'>Cliente</span>
          <div
            className='relative flex items-center justify-between px-4 py-2 font-normal rounded-md shadow-sm cursor-pointer bg-zinc-200 '
            onClick={() => {
              setClientDropdown(!clientDropdown)
              setDeadlineDropdown(false)
            }}
          >
            <span className='sBtn-text'>{selectedClient.socialName}</span>
            <RiArrowDownSLine />
          </div>
          <ul
            className={`absolute z-10 overflow-hidden rounded-md shadow-sm bg-zinc-200 w-[calc(90%-32px)] max-w-[calc(1200px-32px)] ${
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
          <span className='text-xs text-zinc-500'>Prazo de pagamento</span>

          <div className='w-[100%]'>
            <div
              className='relative flex items-center justify-between px-4 py-2 font-normal rounded-md shadow-sm cursor-pointer bg-zinc-200'
              onClick={() => {
                setDeadlineDropdown(!deadlineDropdown)
                setClientDropdown(false)
              }}
            >
              <span className='sBtn-text'>{selectedDeadline}</span>
              <RiArrowDownSLine />
            </div>
            <ul
              className={`absolute z-10 overflow-hidden rounded-md shadow-sm bg-zinc-200 w-[calc(90%-32px)] max-w-[calc(1200px-32px)] ${
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
                      onClick={() => handleSelectDeadline(deadline.value || '')}
                    >
                      {deadline.value}
                    </span>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>

        <div className='flex flex-col w-full gap-1 text-start'>
          <span className='text-xs text-zinc-500'>Total</span>
          <span className='font-bold'>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Select
