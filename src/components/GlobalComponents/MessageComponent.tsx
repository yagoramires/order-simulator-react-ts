interface TextProps {
  text: string
}

const MessageComponent = ({ text }: TextProps) => {
  return <h3 className='w-full mt-20 text-center text-gray-50'>{text}</h3>
}

export default MessageComponent
