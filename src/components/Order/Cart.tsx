import { useContext, useState } from 'react'

import DialogComponent from '../GlobalComponents/DialogComponent'
import { FaShoppingCart } from 'react-icons/fa'
import { NewOrderContext } from '../../context/NewOrderContext'
import Product from './Product'
import { IClients } from '../../interfaces'
import MessageComponent from '../GlobalComponents/MessageComponent'

interface ClientProps {
  client: IClients
  industry: IClients
}

const Cart = ({ client, industry }: ClientProps) => {
  const [open, setOpen] = useState(false)

  const { productsArray, total, createNewOrder } = useContext(NewOrderContext)

  const handleCreateNewOrder = () => {
    createNewOrder(client, industry)
    setOpen(false)
  }

  return (
    <DialogComponent
      type={'Carrinho'}
      open={open}
      setOpen={setOpen}
      childrenButton={
        <span className='flex items-center justify-center gap-2 px-2 py-1 font-bold bg-blue-600 rounded-md lg:hover:bg-blue-500'>
          <FaShoppingCart /> Carrinho {`(${productsArray.length})`}
        </span>
      }
      childrenForm={
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col max-w-full gap-2 overflow-auto max-h-[400px] md:max-h-[600px]'>
            {productsArray.length > 0 ? (
              productsArray.map((product) => (
                <Product product={product} key={product.id} client={client} type='cart' />
              ))
            ) : (
              <div className='mb-20'>
                <MessageComponent text={'Nenhum produto selecionado.'} />
              </div>
            )}
          </div>
          <div className='flex items-end justify-between'>
            <div className='flex flex-col mt-4 text-gray-50'>
              <span className='text-xs text-zinc-500'>Total</span>
              <span className='font-bold'>
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
            {productsArray.length > 0 && (
              <button
                onClick={handleCreateNewOrder}
                className='px-2 py-1 font-bold bg-blue-600 rounded-md text-gray-50'
              >
                Finalizar Pedido
              </button>
            )}
          </div>
        </div>
      }
    />
  )
}

export default Cart
