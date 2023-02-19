import React from 'react'

interface LoadBtnProps {
  fetchMore: () => void
}

const LoadMoreBtn = ({ fetchMore }: LoadBtnProps) => {
  const handleClick = () => {
    fetchMore()
  }
  return (
    <div className='flex items-center justify-center w-full'>
      <button
        className='p-2 mt-2 font-bold bg-blue-600 rounded-lg text-gray-50'
        onClick={handleClick}
      >
        Carregar mais
      </button>
    </div>
  )
}

export default LoadMoreBtn
