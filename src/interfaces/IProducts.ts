export interface IProduct {
  id?: string
  industry?: string
  imagePath?: string
  code?: string
  name?: string
  price?: number
  family?: string
  unityType?: string
  minValue?: number
  quantity?: number
  discount?: number
  total?: number
  createdAt?: Date
}
export interface IAddProduct {
  industry: string
  imagePath?: string
  code: string
  name: string
  family?: string
  unityType: string
  minValue: number
  price: number
}
