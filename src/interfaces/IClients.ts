import { IOrder } from './IOrders'

export interface IClients {
  id?: string
  code?: string
  socialName?: string
  cnpj?: string
  network?: string
  engefer?: string
  discountA?: number
  discountB?: number
  discountC?: number
  deadline?: string
  orders?: Array<IOrder>
  discountProducts?: Array<{ code: string; discount: string }>
}

export interface IAddClient {
  code: string
  socialName: string
  cnpj: string
  network?: string
  deadline: string
  engefer: string
  discountA: number
  discountB: number
  discountC: number
}
