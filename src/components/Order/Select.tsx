import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

interface DataProps {
  clients: Array<{
    id: string
    socialName: string
    fantasyName: string
    cnpj: string
    orders?: any
  }>

  deadlines: Array<{ id: string; value: string }>
}

const Select = ({ deadlines, clients }: DataProps) => {
  const [selectedClient, setSelectedClient] = useState('Selecione um cliente')
  const [clientDropdown, setClientDropdown] = useState(false)
  const [selectedDeadline, setSelectedDeadline] = useState('Selecione um prazo de pagamento')
  const [deadlineDropdown, setDeadlineDropdown] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center p-4 bg-white w-[90%] max-w-[1200px] rounded-md my-4'>
      <div className='flex flex-col w-full gap-1 text-start'>
        <span className='text-xs text-zinc-500'>Cliente</span>

        <div className='w-[100%]'>
          <div
            className='relative flex items-center justify-between p-5 font-normal rounded-md shadow-sm cursor-pointer bg-zinc-200'
            onClick={() => {
              setClientDropdown(!clientDropdown)
              setDeadlineDropdown(false)
            }}
          >
            <span className='sBtn-text'>{selectedClient}</span>
            <RiArrowDownSLine />
          </div>
          <ul
            className={`absolute z-10 overflow-hidden  mt-3 rounded-md shadow-sm bg-zinc-200 w-[calc(90%-32px)] ${
              clientDropdown ? '' : 'hidden'
            }`}
          >
            <div className='p-5 overflow-y-scroll  max-h-[300px]'>
              {clients?.map((client) => (
                <li
                  key={client.id}
                  className='flex items-center py-2 px-4 text-sm rounded-md cursor-pointer w-[100%] hover:bg-zinc-50'
                >
                  <span
                    className='option-text w-[100%]'
                    onClick={() => {
                      setSelectedClient(client.socialName)
                      setClientDropdown(false)
                    }}
                  >
                    {client.socialName}
                  </span>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className='flex flex-col w-full gap-1 mt-4 text-start'>
          <span className='text-xs text-zinc-500'>Prazo de pagamento</span>

          <div className='w-[100%]'>
            <div
              className='relative flex items-center justify-between p-5 font-normal rounded-md shadow-sm cursor-pointer bg-zinc-200'
              onClick={() => {
                setDeadlineDropdown(!deadlineDropdown)
                setClientDropdown(false)
              }}
            >
              <span className='sBtn-text'>{selectedDeadline}</span>
              <RiArrowDownSLine />
            </div>
            <ul
              className={`absolute z-10 overflow-hidden  mt-3 rounded-md shadow-sm bg-zinc-200 w-[calc(90%-32px)] ${
                deadlineDropdown ? '' : 'hidden'
              }`}
            >
              <div className='p-5 overflow-y-scroll  max-h-[300px]'>
                {deadlines?.map((deadline) => (
                  <li
                    key={deadline.id}
                    className='flex items-center py-2 px-4 text-sm rounded-md cursor-pointer w-[100%] hover:bg-zinc-50'
                  >
                    <span
                      className='option-text w-[100%]'
                      onClick={() => {
                        setSelectedDeadline(deadline.value)
                        setDeadlineDropdown(false)
                      }}
                    >
                      {deadline.value}
                    </span>
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
