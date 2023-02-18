import { useState } from 'react'
import { useAddDoc } from '../../../../hooks/handleData/useAddDoc'

import { toast } from 'react-toastify'

import DialogComponent from '../../../GlobalComponents/DialogComponent'
import { IoMdAdd } from 'react-icons/io'

const AddClient = () => {
  const [code, setCode] = useState('')
  const [socialName, setSocialName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [network, setNetwork] = useState('')
  const [engefer, setEngefer] = useState('false')
  const [deadline, setDeadline] = useState('')
  const [discountA, setDiscountA] = useState(0)
  const [discountB, setDiscountB] = useState(0)
  const [discountC, setDiscountC] = useState(0)

  const [open, setOpen] = useState(false)

  const { addClient } = useAddDoc()

  // const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   mock.forEach((client: any) => {
  //     addClient({
  //       code: String(client.code),
  //       socialName: String(client.socialName),
  //       cnpj: String(client.cnpj),
  //       network: String(client.network),
  //       deadline: String(client.deadline),
  //       engefer: String(client.engefer),
  //       discountA: Number(client.discountA),
  //       discountB: Number(client.discountB),
  //       discountC: Number(client.discountC),
  //     })
  //   })
  // }

  const handleClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!code) return toast.error('Preencha o nome fantasia!')
    if (!socialName) return toast.error('Preencha a razão social!')
    if (!cnpj) return toast.error('Preencha todos o cnpj!')

    addClient({
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

    setCode('')
    setSocialName('')
    setCnpj('')
    setNetwork('')
    setDiscountA(0)
    setDiscountB(0)
    setDiscountC(0)
    setDeadline('')
    setEngefer('false')
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Adicionar Cliente'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <div className='relative flex items-center justify-between gap-2 px-4 py-2 font-bold bg-blue-600 rounded-lg text-gray-50 '>
          <IoMdAdd /> Novo
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
            <label className='flex flex-col gap-1'>
              <span className='text-sm text-gray-500'>CNPJ</span>
            </label>
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
          <div className='flex items-center justify-between w-full gap-2'>
            <label className='flex flex-col items-center gap-1'>
              <span className='text-sm text-gray-500'>Desconto Ilumi</span>
              <input
                type='number'
                className='w-[25%] p-2 bg-gray-900 rounded-lg text-gray-50 text-center'
                placeholder='Desconto ilumi'
                value={discountA}
                onChange={(e) => setDiscountA(+e.target.value)}
                min={0}
                pattern='[0-9]+([,\.][0-9]+)?'
                step='any'
              />
            </label>
            <label className='flex flex-col items-center gap-1'>
              <span className='text-sm text-gray-500'>Desconto adicional</span>
              <input
                type='number'
                className='w-[25%]  p-2 bg-gray-900 rounded-lg text-gray-50 text-center'
                placeholder='Desconto adicional'
                value={discountB}
                onChange={(e) => setDiscountB(+e.target.value)}
                min={0}
                pattern='[0-9]+([,\.][0-9]+)?'
                step='any'
              />
            </label>
            <label className='flex flex-col items-center gap-1'>
              <span className='text-sm text-gray-500'>Desconto à vista</span>
              <input
                type='number'
                className='w-[25%]  p-2 bg-gray-900 rounded-lg text-gray-50 text-center'
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
            value={'Adicionar'}
          />
        </form>
      }
    />
  )
}

export default AddClient
