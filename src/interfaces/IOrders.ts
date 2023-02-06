import { IProduct } from './IProducts'

export interface IOrder {
  id?: string
  createdAt?: {
    nanoseconds: number
    seconds: number
  }
  clientId?: string
  clientName?: string
  industryId?: string
  industryName?: string
  sellerId?: string
  sellerName?: string
  products?: Array<IProduct>
  total?: number
}

export interface IAddOrder {
  clientId: string
  clientName: string
  industryId: string
  industryName: string
  sellerId: string
  sellerName: string
  products: Array<IProduct>
  total: number
}
