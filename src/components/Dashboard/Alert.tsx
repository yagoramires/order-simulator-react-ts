import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useDeleteDoc } from '../../hooks/handleData/useDeleteDoc'

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
        <button className='flex items-center justify-center px-4 py-2 font-medium text-white transition-all duration-200 bg-red-500 rounded shadow-md cursor-pointer focus: hover:bg-red-400 h-9'>
          Remover
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className='fixed dialogAnimationOverlay' />
        <AlertDialog.Content className='fixed bg-white rounded-md shadow-md focus:outline-none top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-[500px] max-h-[85vh] p-6 dialogAnimationContent'>
          <AlertDialog.Title className='text-[17px] font-bold'>Você tem certeza?</AlertDialog.Title>
          <AlertDialog.Description className='mb-5 text-[15px]'>
            Esta ação não poderá ser desfeita. Isso irá remover o item permanentemente dos nossos
            servidores.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className='flex items-center justify-center px-4 font-medium text-blue-600 transition-all duration-200 border-2 border-solid rounded cursor-pointer border-zinc-300 focus: hover:bg-zinc-200 h-9'>
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className='flex items-center justify-center px-4 font-medium text-white transition-all duration-200 bg-red-500 border-2 border-red-600 border-solid rounded shadow-md cursor-pointer focus: hover:bg-red-400 h-9'
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
