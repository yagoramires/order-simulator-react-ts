import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth/useAuth'

import { toast } from 'react-toastify'

import * as Tabs from '@radix-ui/react-tabs'
import Loading from '../components/GlobalComponents/Loading'

const Login = () => {
  const [email, setEmail] = useState('')
  const [socialName, setSocialName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [deadline, setDeadline] = useState('')
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
    if (!email || !password || !socialName || !cnpj || deadline === 'disabled') {
      toast.error('Preencha todos os campos!')
      return
    }

    if (!validarCNPJ(cnpj)) {
      toast.error('CNPJ Inválido')
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas precisam ser iguais!')
      return
    }

    registerUser(email, password, socialName, cnpj, deadline)
  }

  function validarCNPJ(cnpj: string) {
    const cnpjNumb = cnpj.replace(/[^\d]+/g, '')
    console.log(cnpjNumb)

    if (cnpjNumb == '') return false

    if (cnpjNumb.length != 14) return false

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpjNumb == '00000000000000' ||
      cnpjNumb == '11111111111111' ||
      cnpjNumb == '22222222222222' ||
      cnpjNumb == '33333333333333' ||
      cnpjNumb == '44444444444444' ||
      cnpjNumb == '55555555555555' ||
      cnpjNumb == '66666666666666' ||
      cnpjNumb == '77777777777777' ||
      cnpjNumb == '88888888888888' ||
      cnpjNumb == '99999999999999'
    )
      return false

    // Valida DVs
    let size = String(cnpjNumb).length - 2
    let numbers = cnpjNumb.substring(0, size)
    const digits = cnpjNumb.substring(size)
    let sum = 0
    let position = size - 7
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * position--
      if (position < 2) position = 9
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (result != Number(digits.charAt(0))) return false

    size = size + 1
    numbers = cnpj.substring(0, size)
    sum = 0
    position = size - 7
    for (let i = size; i >= 1; i--) {
      sum += Number(numbers.charAt(size - i)) * position--
      if (position < 2) position = 9
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    return true
    if (result != Number(digits.charAt(1))) return false
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
              value={socialName}
              onChange={(e) => {
                setSocialName(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Razão Social'
              autoComplete='false'
              required
            />
            <input
              type='cnpj'
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='CNPJ'
              autoComplete='false'
              required
            />
            <select
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              defaultValue='disabled'
              required
            >
              <option value='disabled' disabled>
                Selecione o Prazo de Pagamento
              </option>
              <option value={'14/21/28'}>14/21/28 DD (Desconto adicional de 3%)</option>
              <option value={'28/42/56/70/84'}>28/42/56/70/84 DD (Sem desconto adicional)</option>
            </select>
            <input
              type='email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='E-mail'
              autoComplete='true'
              required
            />
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Senha'
              autoComplete='false'
              required
            />
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
              className='p-2 bg-gray-300 rounded-md shadow-sm'
              placeholder='Confirmação de senha'
              autoComplete='false'
              required
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
