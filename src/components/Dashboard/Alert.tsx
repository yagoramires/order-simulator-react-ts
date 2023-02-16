import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useDeleteDoc } from '../../hooks/handleData/useDeleteDoc'

import { MdDeleteForever } from 'react-icons/md'

interface AlertProps {
  data: {
    type: string
    id: string
    collectionId?: string
  }
}

const Alert = ({ data }: AlertProps) => {
  const { deleteDocument } = useDeleteDoc()

  const handleDelete = () => {
    if (data.type === 'order') {
      deleteDocument(`clients/${data.collectionId}/orders` || '', data.id)
      return
    }

    if (data.type === 'product') {
      deleteDocument(`industries/${data.collectionId}/products`, data.id)
      return
    }

    if (data.type === 'industry') {
      deleteDocument(`industries/`, data.id)
      return
    }

    if (data.type === 'client') {
      deleteDocument(`clients/`, data.id)
      return
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className='flex items-center justify-center px-8 py-2 font-medium text-white duration-200 rounded cursor-pointer lg:bg-red-500 lg:h-12 lg:py-0 text-gray-50'>
          <MdDeleteForever size={27} />
          <span className='hidden'>Remover</span>
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='fixed dialogAnimationOverlay' />
        <AlertDialog.Content className='fixed  bg-gray-800 rounded-lg shadow-md focus:outline-none top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[500px] max-h-[85vh] p-6 dialogAnimationContent text-gray-50'>
          <AlertDialog.Title className='text-[17px] font-bold'>Você tem certeza?</AlertDialog.Title>
          <AlertDialog.Description className='mb-5 text-[15px] text-gray-500'>
            Esta ação não poderá ser desfeita. Isso irá remover o item permanentemente dos nossos
            servidores.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className='flex items-center justify-center px-4 font-medium bg-blue-600 rounded cursor-pointer h-9'>
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className='flex items-center justify-center px-4 font-medium bg-red-500 rounded cursor-pointer h-9'
                onClick={handleDelete}
              >
                Sim, remover
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default Alert
