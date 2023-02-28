import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import IndustryForm from './Forms/AddIndustry'
import Search from '../../GlobalComponents/Search'
import LoadMoreBtn from '../../GlobalComponents/LoadMoreBtn'

import { IIndustries } from '../../../interfaces'

const Industries = () => {
  const { industriesFetch, fetchMore } = useFetchCollection('industries')
  const [result, setResult] = useState([])

  const linkComponent = (industry: IIndustries) => {
    return (
      <LinkComponent id={industry.id || ''} key={industry.id}>
        <span className='w-[70%]'>{industry.socialName?.toUpperCase()}</span>
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
        <Search collection='industries' setResult={setResult} />

        <IndustryForm />
      </div>

      {result.length === 0 && industriesFetch.length === 0 && (
        <MessageComponent
          text='Nenhuma indústria
         cadastrada.'
        />
      )}

      <div className='h-[calc(100vh-160px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {industriesFetch.length > 0 && result.length === 0 && labelComponent()}
        {result.length > 0 && labelComponent()}

        {industriesFetch.length > 0 &&
          result.length === 0 &&
          industriesFetch?.map((industry) => linkComponent(industry))}

        {result.length > 0 && result.map((industry) => linkComponent(industry))}
      </div>

      {result.length === 0 && industriesFetch.length % 25 === 0 && (
        <LoadMoreBtn fetchMore={fetchMore} />
      )}
    </div>
  )
}

export default Industries
