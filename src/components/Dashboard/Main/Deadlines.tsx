import { useState } from 'react'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import DeadlineForm from './Forms/DeadlineForm'

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
      <div className='flex items-center justify-between w-full gap-4' key={deadline.id}>
        <div className='text-black border-b-[1px] border-b-zinc-200 p-4 rounded-md hover:bg-zinc-200 w-full'>
          <div className='flex items-center justify-between w-full gap-4'>
            <span className='w-full font-medium break-words'>{deadline.value}</span>

            <TiDelete
              className='text-red-400 cursor-pointer w-[10%]'
              size={20}
              onClick={() => deleteDocument('deadlines', deadline.id || '')}
            />
          </div>
        </div>
      </div>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center justify-start w-full pl-4 text-start'>
        <span className='text-xs text-zinc-400'>Prazo</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Prazos de pagamento</h1>
        <DeadlineForm />
      </div>

      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4 p-8 overflow-y-scroll rounded-md max-h-[75vh]'>
          <div className='flex flex-col gap-4'>
            {deadlines.length === 0 ? (
              <p className='w-full text-center text-black my-[5rem]'>Nenhum prazo cadastrado.</p>
            ) : (
              <input
                type='text'
                className='p-2 rounded-md shadow-sm bg-zinc-300'
                placeholder='Pesquisar'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {deadlines.length > 0 && !search && labelComponent()}
            {search && filteredDeadlines.length > 0 && labelComponent()}

            {search && filteredDeadlines.length > 0
              ? filteredDeadlines.map((deadline) => linkComponent(deadline))
              : search && (
                  <p className='w-full text-center text-black my-[5rem]'>
                    Nenhuma prazo de pagamento encontrado.
                  </p>
                )}

            {!search && deadlines?.map((deadline) => linkComponent(deadline))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Deadlines
