import { useState } from 'react'
import { useDeleteDoc } from '../../../hooks/handleData/useDeleteDoc'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import { TiDelete } from 'react-icons/ti'

import LabelComponent from '../../GlobalComponents/LabelComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import DeadlineForm from './Forms/AddDeadline'
import Search from '../../GlobalComponents/Search'
import LoadMoreBtn from '../../GlobalComponents/LoadMoreBtn'

import { IDeadlines } from '../../../interfaces'

const Deadlines = () => {
  const { deadlinesFetch, fetchMore } = useFetchCollection('deadlines')
  const [result, setResult] = useState([])

  const { deleteDocument } = useDeleteDoc()

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
        <Search collection='deadlines' setResult={setResult} />

        <DeadlineForm />
      </div>

      {deadlinesFetch.length === 0 && (
        <MessageComponent text='Nenhum prazo de pagamento cadastrado.' />
      )}

      <div className='h-[calc(100vh-160px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {deadlinesFetch.length > 0 && result.length === 0 && labelComponent()}
        {result.length > 0 && labelComponent()}

        {deadlinesFetch.length > 0 &&
          result.length === 0 &&
          deadlinesFetch?.map((deadline) => linkComponent(deadline))}

        {result.length > 0 && result.map((deadline) => linkComponent(deadline))}
      </div>
      {result.length === 0 && deadlinesFetch.length > 0 && <LoadMoreBtn fetchMore={fetchMore} />}
    </div>
  )
}

export default Deadlines
