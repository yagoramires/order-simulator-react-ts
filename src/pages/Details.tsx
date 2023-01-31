import React from 'react'
import { Link } from 'react-router-dom'

const Details = () => {
  return (
    <div className='flex flex-col gap-10'>
      Details
      <Link to='/dashboard/orders' className='text-5xl'>
        Voltar
      </Link>
    </div>
  )
}

export default Details
