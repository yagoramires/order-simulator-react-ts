import { IProduct } from './IProducts'

export interface INetwork {
  id?: string
  name?: string
  products?: Array<IProduct>
}

export interface IAddNetwork {
  name?: string
  products?: Array<IProduct>
}
