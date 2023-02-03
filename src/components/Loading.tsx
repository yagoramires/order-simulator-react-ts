interface sizeProps {
  size: string
}

const Loading = ({ size }: sizeProps) => {
  return (
    <div className='lds-ring'>
      <div style={{ width: `${size}`, height: `${size}` }}></div>
      <div style={{ width: `${size}`, height: `${size}` }}></div>
      <div style={{ width: `${size}`, height: `${size}` }}></div>
      <div style={{ width: `${size}`, height: `${size}` }}></div>
    </div>
  )
}

export default Loading
