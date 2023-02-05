import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth/useAuth'

import { IUser } from '../interfaces'

type AuthContextProps = {
  children: React.ReactNode
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

  const [userData, setUserData] = useState<IUser>(initialValue.userData)

  const { auth, onAuthStateChanged } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user)
      if (user) {
        setUserData({
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
