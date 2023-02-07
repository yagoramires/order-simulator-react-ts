import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import DeadlineForm from '../Forms/DeadlineForm'

import { IDeadlines } from '../../../interfaces'

const Deadlines = () => {
  const { deadlines } = useFetchCollection('deadlines')

  const [search, setSearch] = useState('')

  const filteredDeadlines =
    search.length > 0
      ? deadlines.filter((deadline) => deadline.value?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (deadline: IDeadlines) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={deadline.id}>
        <Link
          to={`${deadline.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex flex-col'>
            <span className='text-xs text-zinc-400'>Prazo</span>
            <span className='font-medium'>{deadline.value}</span>
          </div>
        </Link>
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
              <p className='text-black'>Nenhum prazo cadastrado.</p>
            ) : (
              <input
                type='text'
                className='p-2 rounded-md shadow-sm bg-zinc-300'
                placeholder='Pesquisar'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {search
              ? filteredDeadlines.map((deadline) => linkComponent(deadline))
              : deadlines?.map((deadline) => linkComponent(deadline))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Deadlines
