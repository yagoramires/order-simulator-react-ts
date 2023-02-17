import { useState } from 'react'
import { useDeleteDoc } from '../../../hooks/handleData/useDeleteDoc'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import { TiDelete } from 'react-icons/ti'

import { IDeadlines } from '../../../interfaces'
import LabelComponent from '../../GlobalComponents/LabelComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import DeadlineForm from './Forms/AddDeadline'
import Search from '../../GlobalComponents/Search'

const Deadlines = () => {
  const [search, setSearch] = useState('')

  const { deadlines } = useFetchCollection('deadlines')
  const { deleteDocument } = useDeleteDoc()

  const filteredDeadlines =
    search.length > 0
      ? deadlines.filter((deadline) => deadline.value?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (deadline: IDeadlines) => {
    return (
      <div
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={deadline.id}
      >
        <span className='w-full font-medium break-words'>{deadline.value}</span>
        <TiDelete
          className='text-red-500 cursor-pointer w-[10%]'
          size={20}
          onClick={() => deleteDocument('deadlines', deadline.id || '')}
        />
      </div>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span>Prazo de pagamento</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />

        <DeadlineForm />
      </div>

      {deadlines.length === 0 && <MessageComponent text='Nenhum prazo de pagamento cadastrado.' />}

      {search && filteredDeadlines.length === 0 && (
        <MessageComponent text='Nenhum  prazo de pagamento encontrado.' />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {deadlines.length > 0 && !search && labelComponent()}
        {search && filteredDeadlines.length > 0 && labelComponent()}

        {!search && deadlines?.map((deadline) => linkComponent(deadline))}

        {search &&
          filteredDeadlines.length > 0 &&
          filteredDeadlines.map((deadline) => linkComponent(deadline))}
      </div>
    </div>
  )
}

export default Deadlines
