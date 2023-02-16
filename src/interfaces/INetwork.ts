import { IOrder } from './IOrders'

export interface INetwork {
  id?: string
  socialName?: string
  fantasyName?: string
  cnpj?: string
  discount?: number
  network?: string
  orders?: Array<IOrder>
}

export interface IAddNetwork {
  socialName: string
  fantasyName: string
  cnpj: string
  discount: number
  network?: string
}
