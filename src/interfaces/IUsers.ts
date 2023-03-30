export interface IUser {
  id?: string
  email?: string
  displayName?: string
  type?: string
  name?: string
  admin?: boolean
}

export interface IAddUser {
  email?: string
  displayName?: string
  type?: string
}
