import { useState } from 'react'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import DeadlineForm from './AddForm/AddDeadline'

import { IDeadlines } from '../../../interfaces'
import { TiDelete } from 'react-icons/ti'
import { useDeleteDoc } from '../../../hooks/handleData/useDeleteDoc'

const Deadlines = () => {
  const { deadlines } = useFetchCollection('deadlines')
  const { deleteDocument } = useDeleteDoc()

  const [search, setSearch] = useState('')

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
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span>Prazo de pagamento</span>
      </div>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full p-2 bg-dark-100'>
        <input
          type='text'
          className='p-2 bg-gray-900 rounded-lg placeholder:text-center text-gray-50 md:w-[300px]'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DeadlineForm />
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {deadlines.length > 0 && !search && labelComponent()}
        {search && filteredDeadlines.length > 0 && labelComponent()}

        {deadlines.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>
            Nenhum prazo de pagamento cadastrado.
          </p>
        )}

        {search &&
          filteredDeadlines.length > 0 &&
          filteredDeadlines.map((deadline) => linkComponent(deadline))}

        {search && filteredDeadlines.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>
            Nenhum prazo de pagamento encontrado.
          </p>
        )}

        {!search && deadlines?.map((deadline) => linkComponent(deadline))}
      </div>
    </div>
  )
}

export default Deadlines
