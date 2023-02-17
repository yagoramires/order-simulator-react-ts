import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth/useAuth'

import { toast } from 'react-toastify'

import * as Tabs from '@radix-ui/react-tabs'
import Loading from '../components/GlobalComponents/Loading'

const Login = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { signInUser, registerUser, loading, error } = useAuth()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return toast.error('Preencha todos os campos!')

    signInUser(email, password)
  }
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password || !name) return toast.error('Preencha todos os campos!')
    if (password !== confirmPassword) return toast.error('As senhas precisam ser iguais!')

    registerUser(email, password, name)
  }

  useEffect(() => {
    if (error !== '') {
      toast.error(error)
    }
  }, [error])

  return (
    <div className='min-h-[100vh] flex flex-col justify-center items-center'>
      <h1 className='mb-4 text-5xl text-center text-gray-50'>
        <span className='font-bold'>
          D<span className='text-blue-600'>2</span>B
        </span>
        Sales Platform
      </h1>

      <Tabs.Root
        className='flex flex-col w-[90%] max-w-[600px] shadow-md bg-gray-900 rounded-md py-4'
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
          <form className='flex flex-col gap-4 px-4' onSubmit={handleLogin}>
            <input
              type='text'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='E-mail'
              autoComplete='true'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Senha'
              autoComplete='true'
            />
            {loading ? (
              <div className='flex justify-center w-full'>
                <Loading size='30px' />
              </div>
            ) : (
              <input
                type='submit'
                className='p-2 my-4 font-medium text-white bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
                value={'Entrar'}
              />
            )}
          </form>
        </Tabs.Content>
        <Tabs.Content value='tab2'>
          <form className='flex flex-col gap-4 px-4' onSubmit={handleRegister}>
            <input
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Nome'
              autoComplete='true'
            />
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='E-mail'
              autoComplete='true'
            />
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Senha'
              autoComplete='true'
            />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Confirmação de senha'
              autoComplete='true'
            />
            {loading ? (
              <div className='flex justify-center w-full'>
                <Loading size='30px' />
              </div>
            ) : (
              <input
                type='submit'
                className='p-2 my-4 font-medium text-white bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
                value={'Registrar'}
              />
            )}
          </form>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default Login
