import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'
import { IIndustries } from '../../../interfaces'
import IndustryForm from './AddForm/AddIndustry'

const Industries = () => {
  const { industries } = useFetchCollection('industries')

  const [search, setSearch] = useState('')

  const nameFilter =
    search.length > 0
      ? industries.filter((industry) =>
          industry.socialName?.toLowerCase().includes(search.toLowerCase()),
        )
      : []
  const cnpjFilter =
    search.length > 0
      ? industries.filter((industry) => industry.cnpj?.toLowerCase().includes(search.toLowerCase()))
      : []

  const linkComponent = (industry: IIndustries) => {
    return (
      <Link
        to={`${industry.id}`}
        className='flex items-center w-full gap-2 p-2 break-words bg-gray-900 rounded-lg lg:p-4 text-gray-50'
        key={industry.id}
      >
        <span className='w-[70%]'>{industry.socialName}</span>
        <span className='w-[30%]'>{industry.cnpj}</span>
      </Link>
    )
  }

  const labelComponent = () => {
    return (
      <div className='flex items-center w-full gap-2 p-2 text-left break-words lg:p-4 text-gray-50'>
        <span className='w-[70%]'>Indústria</span>
        <span className='w-[30%]'>CNPJ</span>
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
        <IndustryForm />
      </div>

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {industries.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && cnpjFilter.length > 0 && labelComponent()}

        {industries.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhuma indústria cadastrada.</p>
        )}

        {search && nameFilter.length > 0 && nameFilter.map((industry) => linkComponent(industry))}

        {cnpjFilter &&
          cnpjFilter.length > 0 &&
          cnpjFilter?.map((industry) => linkComponent(industry))}

        {search && nameFilter.length === 0 && cnpjFilter.length === 0 && (
          <p className='w-full mt-5 text-center text-gray-50'>Nenhuma indústria encontrada.</p>
        )}

        {!search && industries?.map((industry) => linkComponent(industry))}
      </div>
    </div>
  )
}

export default Industries
