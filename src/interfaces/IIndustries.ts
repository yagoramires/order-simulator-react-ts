import { IProduct } from './IProducts'

export interface IIndustries {
  id?: string
  socialName?: string
  fantasyName?: string
  cnpj?: string
  products?: Array<IProduct>
}

export interface IAddIndustry {
  socialName: string
  fantasyName: string
  cnpj: string
}
