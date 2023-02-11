import { IProduct } from './IProducts'

export interface IOrder {
  id?: string
  createdAt?: {
    nanoseconds: number
    seconds: number
  }
  clientId?: string
  clientName?: string
  clientCnpj?: string
  industryId?: string
  industryName?: string
  sellerId?: string
  sellerName?: string
  deadline?: string
  products?: Array<IProduct>
  total?: number
  orderId?: string
}

export interface IAddOrder {
  clientId: string
  clientName: string
  clientCnpj: string
  industryId: string
  industryName: string
  sellerId: string
  sellerName: string
  products: Array<IProduct>
  deadline: string
  total: number
  orderId: string
}
