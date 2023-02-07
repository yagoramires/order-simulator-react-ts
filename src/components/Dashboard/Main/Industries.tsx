import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IIndustries } from '../../../interfaces'
import IndustryForm from './Forms/IndustryForm'

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
    <>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-2xl font-medium'>Indústrias</h1>
        <IndustryForm />
      </div>
      <div className=' bg-white shadow-md max-h-[75vh] rounded-md overflow-hidden my-10'>
        <div className='flex flex-col gap-4 p-8 overflow-y-scroll rounded-md max-h-[75vh]'>
          <div className='flex flex-col gap-4'>
            {industries.length === 0 ? (
              <p className='text-black'>Nenhuma indústria cadastrada.</p>
            ) : (
              <input
                type='text'
                className='p-2 rounded-md shadow-sm bg-zinc-300'
                placeholder='Pesquisar'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {search && filteredIndustriesName.length > 0
              ? filteredIndustriesName.map((industry) => linkComponent(industry))
              : filteredIndustriesCnpj.length > 0
              ? filteredIndustriesCnpj?.map((industry) => linkComponent(industry))
              : search && <p className='text-black'> Nenhuma indústria encontrada.</p>}

            {!search && industries?.map((industry) => linkComponent(industry))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Industries
