export interface IProduct {
  id?: string
  industryId?: string
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
  searchstr?: Array<string>
}
export interface IAddProduct {
  industryId: string
  imagePath?: string
  code: string
  name: string
  family?: string
  discount?: number
  unityType: string
  minValue: number
  price: number
  searchstr: Array<string>
}
