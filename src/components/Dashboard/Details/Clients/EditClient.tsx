import { useState } from 'react'
import { useEditDoc } from '../../../../hooks/handleData/useEditDoc'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { FaEdit } from 'react-icons/fa'
import { IClients } from '../../../../interfaces'

interface ClientProps {
  clientId: string
  clientData: IClients
}

const EditClient = ({ clientId, clientData }: ClientProps) => {
  const [code, setCode] = useState(clientData.code || '')
  const [socialName, setSocialName] = useState(clientData.socialName || '')
  const [cnpj, setCnpj] = useState(clientData.cnpj || '')
  const [network, setNetwork] = useState(clientData.network || '')
  const [engefer, setEngefer] = useState(clientData.engefer)
  const [deadline, setDeadline] = useState(clientData.deadline || '')
  const [discountA, setDiscountA] = useState(clientData.discountA || '')
  const [discountB, setDiscountB] = useState(clientData.discountB || '')
  const [discountC, setDiscountC] = useState(clientData.discountC || '')

  const [open, setOpen] = useState(false)

  const { editClient } = useEditDoc()

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code || !socialName || !cnpj) return toast.error('Preencha todos os campos!')

    editClient(clientId, {
      code,
      socialName,
      cnpj,
      network,
      engefer,
      deadline,
      discountA,
      discountB,
      discountC,
    })
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Editar Cliente'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-center px-8 py-2 font-medium rounded cursor-pointer text-gray-50 lg:bg-blue-600 lg:h-12 lg:py-0'>
          <FaEdit size={23} />
          <span className='hidden'>Editar</span>
        </div>
      }
      childrenForm={
        <form className='flex flex-col w-full gap-2' onSubmit={handleClient}>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Código</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Código'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Razão Social</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Razão Social'
              value={socialName}
              onChange={(e) => setSocialName(e.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>CNPJ</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='CNPJ'
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Rede</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Rede'
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Cliente Engefer</span>
            <select
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Rede'
              value={engefer}
              onChange={(e) => setEngefer(e.target.value)}
            >
              <option value='true'>Sim</option>
              <option value='false'>Não</option>
            </select>
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm text-gray-500'>Prazo padrão</span>
            <input
              type='text'
              className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
              placeholder='Prazo de pagamento'
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
          <div className='flex items-center justify-between w-full'>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Desconto Ilumi</span>
              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Desconto ilumi'
                value={discountA}
                onChange={(e) => setDiscountA(+e.target.value)}
                min={0}
                pattern='[0-9]+([,\.][0-9]+)?'
                step='any'
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Desconto adicional</span>
              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Desconto adicional'
                value={discountB}
                onChange={(e) => setDiscountB(+e.target.value)}
                min={0}
                pattern='[0-9]+([,\.][0-9]+)?'
                step='any'
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>Desconto à vista</span>
              <input
                type='number'
                className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
                placeholder='Desconto à vista'
                value={discountC}
                onChange={(e) => setDiscountC(+e.target.value)}
                min={0}
                pattern='[0-9]+([,\.][0-9]+)?'
                step='any'
              />
            </label>
          </div>
          <input
            type='submit'
            className='p-2 mt-2 font-bold bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
            value={'Atualizar'}
          />
        </form>
      }
    />
  )
}

export default EditClient
