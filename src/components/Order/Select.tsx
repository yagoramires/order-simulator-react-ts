import { useState, useContext } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { NewOrderContext } from '../../context/NewOrderContext'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

import './Select.css'

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
    <div className='selects'>
      <div className='selectContainer'>
        <span className='selectContainer__label'>Indústria</span>
        <div
          className='selectContainer__input'
          onClick={() => {
            setIndustryDropdown(!industryDropdown)
            setClientDropdown(false)
            setDeadlineDropdown(false)
          }}
        >
          <span>{selectedIndustry.fantasyName}</span>
          <RiArrowDownSLine />
        </div>
        <ul className={`selectContainer__ul ${industryDropdown ? '' : 'hidden'}`}>
          <div>
            {industries?.map((industry) => (
              <li key={industry.id} className='selectContainer__li'>
                <span
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

      <div className='selectContainer'>
        <span className='selectContainer__label'>Cliente</span>
        <div
          className='selectContainer__input'
          onClick={() => {
            setClientDropdown(!clientDropdown)
            setDeadlineDropdown(false)
          }}
        >
          <span>{selectedClient.socialName}</span>
          <RiArrowDownSLine />
        </div>
        <ul className={`selectContainer__ul ${clientDropdown ? '' : 'hidden'}`}>
          <div>
            {clients?.map((client) => (
              <li key={client.id} className='selectContainer__li'>
                <span
                  onClick={() =>
                    handleSelectClient(client.id || '', client.socialName || '', client.cnpj || '')
                  }
                >
                  {client.socialName}
                </span>
              </li>
            ))}
          </div>
        </ul>
      </div>

      <div className='selectContainer'>
        <span className='selectContainer__label'>Prazo de pagamento</span>
        <div
          className='selectContainer__input'
          onClick={() => {
            setDeadlineDropdown(!deadlineDropdown)
            setClientDropdown(false)
          }}
        >
          <span>{selectedDeadline.value}</span>
          <RiArrowDownSLine />
        </div>
        <ul className={`selectContainer__ul ${deadlineDropdown ? '' : 'hidden'}`}>
          <div>
            {deadlines?.map((deadline) => (
              <li key={deadline.id} className='selectContainer__li'>
                <span onClick={() => handleSelectDeadline(deadline.id || '', deadline.value || '')}>
                  {deadline.value}
                </span>
              </li>
            ))}
          </div>
        </ul>
      </div>

      <div className='buttonsContainer'>
        <div className='buttonsContainer__total'>
          <span className='text-xs text-zinc-500'>Total</span>
          <span className='font-bold'>
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
        <button onClick={createNewOrder} className='buttonsContainer__btn'>
          Finalizar Pedido
        </button>
      </div>
    </div>
  )
}

export default Select
