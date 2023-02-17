import { SetStateAction } from 'react'

interface SearchProps {
  search: string
  setSearch: React.Dispatch<SetStateAction<string>>
}

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className='flex items-center justify-start w-full bg-dark-100'>
      <input
        type='text'
        className='w-full max-w-[400px] p-2 text-gray-50 rounded-lg bg-gray-900'
        placeholder='Pesquisar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default Search
