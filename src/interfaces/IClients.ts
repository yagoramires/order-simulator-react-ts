import { IOrder } from './IOrders'

export interface IClients {
  id?: string
  code?: string
  socialName?: string
  cnpj?: string
  discount?: number
  network?: string
  engefer?: boolean
  orders?: Array<IOrder>
}

export interface IAddClient {
  code: string
  socialName: string
  cnpj: string
  discount: number
  network?: string
  engefer?: boolean
}
