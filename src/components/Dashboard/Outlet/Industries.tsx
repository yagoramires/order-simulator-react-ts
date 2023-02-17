import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import IndustryForm from './Forms/AddIndustry'
import Search from '../../GlobalComponents/Search'

import { IIndustries } from '../../../interfaces'

const Industries = () => {
  const [search, setSearch] = useState('')

  const { industries } = useFetchCollection('industries')

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
      <LinkComponent id={industry.id || ''} key={industry.id}>
        <span className='w-[70%]'>{industry.socialName}</span>
        <span className='w-[30%]'>{industry.cnpj}</span>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[70%]'>Indústria</span>
        <span className='w-[30%]'>CNPJ</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-center justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search search={search} setSearch={setSearch} />

        <IndustryForm />
      </div>

      {!search && industries.length === 0 && (
        <MessageComponent
          text='Nenhuma indústria
         cadastrada.'
        />
      )}
      {search && nameFilter.length === 0 && cnpjFilter.length === 0 && (
        <MessageComponent
          text='Nenhuma indústria
        encontrada.'
        />
      )}

      <div className='h-[calc(100vh-130px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {industries.length > 0 && !search && labelComponent()}
        {search && nameFilter.length > 0 && labelComponent()}
        {search && cnpjFilter.length > 0 && labelComponent()}

        {!search && industries?.map((industry) => linkComponent(industry))}

        {search && nameFilter.length > 0 && nameFilter.map((industry) => linkComponent(industry))}

        {cnpjFilter &&
          cnpjFilter.length > 0 &&
          cnpjFilter?.map((industry) => linkComponent(industry))}
      </div>
    </div>
  )
}

export default Industries
