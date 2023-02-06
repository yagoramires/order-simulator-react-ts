import { IOrder } from './IOrders'

export interface IClients {
  id?: string
  socialName?: string
  fantasyName?: string
  cnpj?: string
  discount?: number
  network?: string
  orders?: Array<IOrder>
}

export interface IAddClient {
  socialName: string
  fantasyName: string
  cnpj: string
  discount: number
  network?: string
}
