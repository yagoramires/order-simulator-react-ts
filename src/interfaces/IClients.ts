import { IOrder } from './IOrders'

export interface IClients {
  id?: string
  code?: string
  socialName?: string
  cnpj?: string
  network?: string
  engefer?: boolean
  discountA?: number
  discountB?: number
  discountC?: number
  deadline?: string
  orders?: Array<IOrder>
}

export interface IAddClient {
  code: string
  socialName: string
  cnpj: string
  network?: string
  deadline: string
  engefer: boolean
  discountA: number
  discountB: number
  discountC: number
}
