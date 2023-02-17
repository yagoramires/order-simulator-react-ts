import { useState } from 'react'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'

import { FaEdit } from 'react-icons/fa'
import { INetworks } from '../../../../interfaces'

interface NetworkProps {
  networkId: string
  networkData: INetworks
}

const EditNetwork = ({ networkId, networkData }: NetworkProps) => {
  const [name, setName] = useState(networkData.name)
  const [open, setOpen] = useState(false)

  const { editNetwork } = useEditDoc()

  const handleNetwork = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name) return toast.error('Preencha todos o nome!')

    editNetwork(networkId, {
      name,
    })
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Adicionar Rede'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-center px-8 py-2 font-medium rounded cursor-pointer text-gray-50 lg:bg-blue-600 lg:h-12 lg:py-0'>
          <FaEdit size={23} />
          <span className='hidden'>Editar</span>
        </div>
      }
      childrenForm={
        <form className='flex flex-col w-full gap-4' onSubmit={handleNetwork}>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Nome</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Nome Fantasia'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </label>

          <input
            type='submit'
            className='p-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
            value={'Editar'}
          />
        </form>
      }
    />
  )
}

export default EditNetwork
