import { SetStateAction, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useFetchCollection } from '../../hooks/fetchData/useFetchCollection'

interface SearchProps {
  collection: string
  setResult: React.Dispatch<SetStateAction<any>>
}

const Search = ({ collection, setResult }: SearchProps) => {
  const { searchQuery, setSearchQuery, searchDoc } = useFetchCollection(collection)
  const [search, setSearch] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchDoc(search.toLowerCase())
  }

  useEffect(() => {
    setResult(searchQuery)
  }, [searchQuery])

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
      {searchQuery.length > 0 && (
        <button
          className='w-full p-2 text-gray-50'
          onClick={() => {
            setSearchQuery([])
            setSearch('')
          }}
        >
          Limpar busca
        </button>
      )}
    </div>
  )
}

export default Search
