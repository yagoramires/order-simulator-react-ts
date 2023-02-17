import { SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from 'react-icons/md'

interface DialogProps {
  childrenButton: React.ReactNode
  childrenForm: React.ReactNode
  type: string
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

const DialogComponent = ({ open, setOpen, childrenButton, childrenForm, type }: DialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{childrenButton}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/80' />
        <Dialog.Content className='fixed bg-white top-1/2 w-[90%] max-w-[800px] rounded-lg shadow-md p-8 translate-x-[-50%] translate-y-[-50%] left-1/2 z-10 bg-gray-800'>
          <Dialog.Title className='flex justify-between mb-4 font-bold text-gray-50'>
            <Dialog.Close className='flex justify-between w-full mb-4'>
              {type}
              <MdClose className='text-xl' />
            </Dialog.Close>
          </Dialog.Title>
          {childrenForm}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogComponent
