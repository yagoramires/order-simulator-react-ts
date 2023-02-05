import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth/useAuth'

type AuthContextProps = {
  children: React.ReactNode
}

type UserDataProps = {
  userAuth?: any
  displayName: string
  email: string
  photoURL: string
  uid: string
}

const initialValue = {
  user: undefined,
  userData: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
}

export const AuthContext = createContext(initialValue)

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState(initialValue.user)

  const [userData, setUserData] = useState<UserDataProps>(initialValue.userData)

  const { auth, onAuthStateChanged } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user)
      if (user) {
        setUserData({
          userAuth: auth,
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          uid: user.displayName || '',
        })
      }
    })
  }, [auth, onAuthStateChanged])

  return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>
}
