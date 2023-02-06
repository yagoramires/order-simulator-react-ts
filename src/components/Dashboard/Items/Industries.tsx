import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IIndustries } from '../../../interfaces'

const Industries = () => {
  const { industries } = useFetchCollection('industries')

  const [search, setSearch] = useState('')

  const filteredIndustries =
    search.length > 0
      ? industries.filter((industry) =>
          industry.socialName?.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const linkComponent = (industry: IIndustries) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={industry.id}>
        <Link
          to={`${industry.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-2 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex items-center justify-between w-full gap-4'>
            <div className='flex flex-col w-full'>
              <span className='text-xs text-zinc-400'>Indústria</span>
              <span className='font-medium'>{industry.socialName}</span>
            </div>
            <div className='flex flex-col w-full lg:hidden'>
              <span className='text-xs text-zinc-400'>CNPJ</span>
              <span className='text-sm font-normal '>{industry.cnpj}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <input
        type='text'
        className='p-2 rounded-md shadow-sm bg-zinc-300'
        placeholder='Pesquisar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search
        ? filteredIndustries.map((industry) => linkComponent(industry))
        : industries?.map((industry) => linkComponent(industry))}
    </div>
  )
}

export default Industries
