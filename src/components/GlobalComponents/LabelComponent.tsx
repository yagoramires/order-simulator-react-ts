interface ChildrenProps {
  children: React.ReactNode
}

const LabelComponent = ({ children }: ChildrenProps) => {
  return (
    <div className='flex items-center w-full gap-2 px-2 text-left break-words lg:px-4 text-gray-50'>
      {children}
    </div>
  )
}

export default LabelComponent
