export interface IProduct {
  id: string
  code: string
  name: string
  price: number
  industry: string
  imagePath?: string
  family?: string
  createdAt?: Date
  quantity?: number
}
export interface IAddProduct {
  code: string
  name: string
  price: number
  industry: string
  imagePath?: string
  family?: string
}
