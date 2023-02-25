const Label = () => {
  return (
    <div className='flex items-center justify-start min-w-[600px] w-full gap-2 p-2 text-gray-50'>
      <span className='w-10 lg:w-20'></span>
      <span className='w-32 lg:w-52'>Código</span>
      <span className='w-52 lg:w-full'>Nome</span>
      <span className='w-24'>Vlr. Un.</span>
      <span className='w-16'>Qnt.</span>
      <span className='w-32 lg:36'>Total</span>
    </div>
  )
}

export default Label
