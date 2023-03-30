import { useState } from 'react'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { IoMdAdd } from 'react-icons/io'

import { useAuth } from '../../../../hooks/auth/useAuth'

const AddUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [open, setOpen] = useState(false)

  const { registerAdmin, signOutUser } = useAuth()

  const handleUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) return toast.error('Preencha o nome!')
    if (!email) return toast.error('Preencha o e-mail!')
    if (!password) return toast.error('Preencha a senha!')
    if (!confirmPassword) return toast.error('Preencha a confirmação de senha!')
    if (password !== confirmPassword) return toast.error('As senhas devem ser iguais!')

    registerAdmin(email, password, name)

    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    signOutUser()
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Adicionar Administrador'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50 '>
          <IoMdAdd /> Novo
        </div>
      }
      childrenForm={
        <form className='flex flex-col w-full gap-2' onSubmit={handleUser}>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Nome</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>E-mail</span>
            <input
              type='email'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Senha</span>
            </label>
            <input
              type='password'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Confirmação de senha</span>
            <input
              type='password'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Confirmação de senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <input
            type='submit'
            className='p-2 mt-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
            value={'Adicionar'}
          />
        </form>
      }
    />
  )
}

export default AddUser
