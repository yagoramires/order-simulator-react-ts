export interface INetworks {
  id?: string
  name?: string
  products?: Array<INetworkProduct>
}

export interface IAddNetwork {
  name?: string
  products?: Array<INetworkProduct>
}

export interface INetworkProduct {
  id?: string
  networkId?: string
  code?: string
  discount?: number
}

export interface IAddNetworkProduct {
  networkId: string
  code: string
  discount: number
}
