import { useState } from 'react'
import { useFetchCollection } from '../../../hooks/fetchData/useFetchCollection'

import UserForm from './Forms/AddUser'
import LabelComponent from '../../GlobalComponents/LabelComponent'
import LinkComponent from '../../GlobalComponents/LinkComponent'
import MessageComponent from '../../GlobalComponents/MessageComponent'
import Search from '../../GlobalComponents/SearchComponent'
import LoadMoreBtn from '../../GlobalComponents/LoadMoreBtn'

import { IUser } from '../../../interfaces'

const Users = () => {
  const { usersFetch, fetchMore } = useFetchCollection('users')
  const [result, setResult] = useState([])

  const linkComponent = (user: IUser) => {
    return (
      <LinkComponent id={user.id || ''} key={user.id}>
        <span className='w-[40%] '>{user.name?.toUpperCase()}</span>
        <span className='w-[60%] '>{user.email}</span>
      </LinkComponent>
    )
  }

  const labelComponent = () => {
    return (
      <LabelComponent>
        <span className='w-[40%]'>Nome</span>
        <span className='w-[60%]'>E-mail</span>
      </LabelComponent>
    )
  }

  return (
    <div className='max-w-[1400px] w-full'>
      <div className='flex items-start justify-between w-full gap-2 p-2 bg-dark-100'>
        <Search type='users' collection='users' setResult={setResult} />

        <UserForm />
      </div>

      {result.length === 0 && usersFetch.length === 0 && (
        <MessageComponent
          text='Nenhum cliente
         cadastrado.'
        />
      )}

      <div className='h-[calc(100vh-110px)] flex flex-col items-start w-full gap-2 p-2 overflow-auto'>
        {usersFetch.length > 0 && result.length === 0 && labelComponent()}
        {result.length > 0 && labelComponent()}

        {usersFetch.length > 0 &&
          result.length === 0 &&
          usersFetch?.map((user) => user.admin && linkComponent(user))}

        {result.length > 0 && result.map((user: IUser) => user.admin && linkComponent(user))}
      </div>

      {result.length === 0 && usersFetch.length % 25 === 0 && <LoadMoreBtn fetchMore={fetchMore} />}
    </div>
  )
}

export default Users
