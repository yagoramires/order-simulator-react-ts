import { type } from 'os'
import { SetStateAction, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'
import { useSearch } from '../../hooks/fetchData/useSearch'

interface SearchProps {
  collection: string
  setResult: React.Dispatch<SetStateAction<any>>
  type: string
}

const SearchComponent = ({ collection, setResult, type }: SearchProps) => {
  const {
    searchProduct,
    searchClient,
    searchIndustries,
    searchNetworks,
    searchOrders,
    productsQuery,
    clientsQuery,
    industriesQuery,
    ordersQuery,
    networksQuery,
  } = useSearch(collection)
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (type === 'products') {
      searchProduct(search)
      return
    }

    if (type === 'clients') {
      searchClient(search)
      return
    }

    if (type === 'networks') {
      searchNetworks(search)
      return
    }

    if (type === 'orders') {
      searchOrders(search)
      return
    }

    if (type === 'industries') {
      searchIndustries(search)
      return
    }
  }

  useEffect(() => {
    if (type === 'products') {
      setResult(productsQuery)
      return
    }

    if (type === 'clients') {
      setResult(clientsQuery)
      return
    }

    if (type === 'industries') {
      setResult(industriesQuery)
      return
    }

    if (type === 'orders') {
      setResult(ordersQuery)
      return
    }

    if (type === 'networks') {
      setResult(networksQuery)
      return
    }
  }, [productsQuery, clientsQuery])

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <form className='flex items-center justify-center w-full bg-dark-100' onSubmit={handleSearch}>
        <input
          type='text'
          className='w-full max-w-[400px] p-2 text-gray-50 rounded-l-lg bg-gray-900'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type='submit'
          className='w-[50px] p-3 text-gray-50 rounded-r-lg bg-blue-600 flex justify-center'
        >
          <FaSearch />
        </button>
      </form>
      {search.length > 0 && (
        <button
          className='w-full p-2 text-gray-50'
          onClick={() => {
            setResult([])
            setSearch('')
          }}
        >
          Limpar busca
        </button>
      )}
    </div>
  )
}

export default SearchComponent
