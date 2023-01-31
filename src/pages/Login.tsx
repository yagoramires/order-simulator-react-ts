import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'

const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className='flex justify-center items-center min-h-[100vh] bg-image bg-gradient-to-r from-blue-800 to-blue-600'>
      <Tabs.Root
        className='flex flex-col w-[90%] max-w-[600px] shadow-md bg-white rounded-md py-4'
        defaultValue='tab1'
      >
        <Tabs.List className='flex justify-around mb-8'>
          <Tabs.Trigger value='tab1' className='loginTabs'>
            Entrar
          </Tabs.Trigger>
          <Tabs.Trigger value='tab2' className='loginTabs'>
            Cadastrar
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='tab1' className=''>
          <form className='flex flex-col gap-4 px-4'>
            <input
              type='text'
              value={login}
              onChange={(e) => {
                setLogin(e.target.value)
              }}
              className='shadow-sm p-2 bg-gray-300 rounded-md'
              placeholder='E-mail'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='shadow-sm p-2 bg-gray-300 rounded-md'
              placeholder='Senha'
            />

            <input
              type='submit'
              className='bg-gradient-to-r from-blue-600 to-blue-800 my-4 p-2 rounded-md text-white font-medium cursor-pointer shadow-sm'
              value={'Entrar'}
            />
          </form>
        </Tabs.Content>
        <Tabs.Content value='tab2'>
          <form className='flex flex-col gap-4 px-4'>
            <input
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className='shadow-sm p-2 bg-gray-300 rounded-md'
              placeholder='Nome'
            />
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='shadow-sm p-2 bg-gray-300 rounded-md'
              placeholder='E-mail'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='shadow-sm p-2 bg-gray-300 rounded-md'
              placeholder='Senha'
            />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              className='shadow-sm p-2 bg-gray-300 rounded-md'
              placeholder='Confirmação de senha'
            />
            <input
              type='submit'
              className='bg-gradient-to-r from-blue-600 to-blue-800 my-4 p-2 rounded-md text-white font-medium cursor-pointer shadow-sm'
              value={'Registrar'}
            />
          </form>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default Login
