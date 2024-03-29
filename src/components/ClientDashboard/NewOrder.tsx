import { useState, useContext } from 'react'

import DialogComponent from '../GlobalComponents/DialogComponent'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { IClients, IIndustries } from '../../interfaces'
import { Link, useParams } from 'react-router-dom'
import { useSearch } from '../../hooks/fetchData/useSearch'
import { useFetchDocument } from '../../hooks/fetchData/useFetchDocument'
import { AuthContext } from '../../context/AuthContext'

const NewOrder = () => {
  const [open, setOpen] = useState(false)
  const { userData } = useContext(AuthContext)

  // const [clientDropdown, setClientDropdown] = useState(false)
  const [industryDropdown, setIndustryDropdown] = useState(false)

  const [industry, setIndustry] = useState('')
  // const [client, setClient] = useState('')

  const [selectedIndustry, setSelectedIndustry] = useState<IIndustries>()
  // const [selectedClient, setSelectedClient] = useState<IClients>()

  const { searchIndustries, industriesQuery } = useSearch('industries')
  // const { searchClient, clientsQuery } = useSearch('clients')

  const handleSearchIndustry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIndustryDropdown(true)
    // setClientDropdown(false)
    searchIndustries(industry.toLowerCase())
  }

  // const handleSearchClient = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setClientDropdown(true)
  //   setIndustryDropdown(false)
  //   searchClient(client.toLowerCase())
  // }

  return (
    <DialogComponent
      type={'Novo Pedido'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <span className='flex items-center justify-center w-full p-2 transition-all rounded-lg lg:px-4 lg:py-3 lg:shadow-sm lg:gap-2 lg:bg-blue-600 lg:justify-start lg:hover:bg-blue-500'>
          <FaPlus size={22} /> <span className='hidden lg:inline'>Novo Pedido</span>
        </span>
      }
      childrenForm={
        <div>
          <div className='relative'>
            <span className='text-xs text-gray-500 lg:text-sm'>Indústria</span>

            <form onSubmit={handleSearchIndustry} className='flex'>
              <input
                type='text'
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value)
                }}
                placeholder='Indústria'
                className='flex items-center justify-between w-full p-2 uppercase break-words bg-gray-900 rounded-l-lg text-gray-50'
              />
              <button className='flex items-center justify-center w-[50px] p-2 bg-blue-600 rounded-r-lg'>
                <FaSearch />
              </button>
            </form>

            <ul
              className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[200px] md:max-h-[400px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
                industryDropdown ? '' : 'hidden '
              } `}
            >
              {industriesQuery?.map((industry: IIndustries, index: number) => (
                <li
                  key={index}
                  className='w-full px-2 uppercase bg-gray-700 rounded-lg cursor-pointer lg:p-2'
                  onClick={() => {
                    setSelectedIndustry(industry)
                    setIndustryDropdown(false)
                    setIndustry(industry.fantasyName || '')
                  }}
                >
                  <span className='break-words text-gray-50'>{industry.fantasyName}</span>
                </li>
              ))}

              {industriesQuery.length === 0 && (
                <p className='text-gray-50'>Nenhuma indústria encontrada.</p>
              )}
            </ul>
          </div>
          {/* <div className='relative'>
            <span className='text-xs text-gray-500 lg:text-sm'>Cliente</span>

            <form onSubmit={handleSearchClient} className='flex'>
              <input
                type='text'
                value={client}
                onChange={(e) => {
                  setClient(e.target.value)
                }}
                placeholder='Cliente'
                className='flex items-center justify-between w-full p-2 uppercase break-words bg-gray-900 rounded-l-lg text-gray-50'
              />
              <button className='flex items-center justify-center w-[50px] p-2 bg-blue-600 rounded-r-lg'>
                <FaSearch />
              </button>
            </form>
            <ul
              className={`selectScroll absolute z-10 mt-2 rounded-lg p-2 bg-gray-800 w-full max-h-[200px] md:max-h-[400px]  overflow-y-auto shadow-md flex flex-col gap-1 ${
                clientDropdown ? '' : 'hidden '
              } `}
            >
              {clientsQuery?.map((client: IClients, index: number) => (
                <li
                  key={index}
                  className='w-full px-2 uppercase bg-gray-700 rounded-lg cursor-pointer lg:p-2'
                  onClick={() => {
                    setSelectedClient(client)
                    setClientDropdown(false)
                    setClient(client.socialName || '')
                  }}
                >
                  <span className='break-words text-gray-50'>{client.socialName}</span>
                </li>
              ))}

              {clientsQuery.length === 0 && (
                <p className='text-gray-50'>Nenhum cliente encontrado.</p>
              )}
            </ul>

          </div> */}
          {selectedIndustry && (
            <div className='flex items-center justify-center mt-4'>
              <Link
                to={`order/${selectedIndustry?.id}/${userData.uid}`}
                type='submit'
                className='p-2 mt-2 font-bold text-center bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              >
                Novo pedido
              </Link>
            </div>
          )}
        </div>
      }
    />
  )
}

export default NewOrder
