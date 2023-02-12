import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IIndustries } from '../../../interfaces'
import IndustryForm from './AddForm/AddIndustry'

const Industries = () => {
  const { industries } = useFetchCollection('industries')

  const [search, setSearch] = useState('')

  const filteredIndustriesName =
    search.length > 0
      ? industries.filter((industry) =>
          industry.socialName?.toLowerCase().includes(search.toLowerCase()),
        )
      : []
  const filteredIndustriesCnpj =
    search.length > 0
      ? industries.filter((industry) => industry.cnpj?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (industry: IIndustries) => {
    return (
      <div className='flex items-center justify-between w-full gap-4' key={industry.id}>
        <Link
          to={`${industry.id}`}
          className='text-black border-b-[1px] border-b-zinc-200 p-4 rounded-md hover:bg-zinc-200 w-full'
        >
          <div className='flex items-center justify-between w-full gap-4'>
            <span className='font-medium w-[70%] md:w-full'>{industry.socialName}</span>

            <span className='text-sm font-normal  w-[30%] md:hidden'>{industry.cnpj}</span>
          </div>
        </Link>
      </div>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center justify-start w-full gap-4 pl-4 text-start'>
        <span className='text-xs text-zinc-400 w-[70%] md:w-full'>Indústria</span>
        <span className='text-xs text-zinc-400 lg:hidden w-[30%] md:hidden'>CNPJ</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Indústrias</h1>
        <IndustryForm />
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4 p-8 overflow-y-scroll rounded-md max-h-[75vh]'>
          <div className='flex flex-col gap-4'>
            {industries.length === 0 ? (
              <p className='w-full text-center text-black my-[5rem]'>
                Nenhuma indústria cadastrada.
              </p>
            ) : (
              <input
                type='text'
                className='p-2 rounded-md shadow-sm bg-zinc-300'
                placeholder='Pesquisar'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {industries.length > 0 && !search && labelComponent()}
            {search && filteredIndustriesName.length > 0 && labelComponent()}
            {search && filteredIndustriesCnpj.length > 0 && labelComponent()}

            {search && filteredIndustriesName.length > 0
              ? filteredIndustriesName.map((industry) => linkComponent(industry))
              : filteredIndustriesCnpj.length > 0
              ? filteredIndustriesCnpj?.map((industry) => linkComponent(industry))
              : search && (
                  <p className='w-full text-center text-black my-[5rem]'>
                    Nenhuma indústria encontrada.
                  </p>
                )}

            {!search && industries?.map((industry) => linkComponent(industry))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Industries
