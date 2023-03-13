import { doc, getDoc } from 'firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { database } from '../firebase/config'
import { useAuth } from '../hooks/auth/useAuth'

import { IUserAuth } from '../interfaces'

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
    admin: false,
  },
}

export const AuthContext = createContext(initialValue)

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState(initialValue.user)

  const [userData, setUserData] = useState<IUserAuth>(initialValue.userData)

  const { auth, onAuthStateChanged } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async (user: any) => {
      setUser(user)
      let userData
      if (user && user.uid !== null) {
        const docRef = doc(database, 'users', user.uid)
        const docSnap = await getDoc(docRef)
        userData = docSnap.data()
      }

      if (user && userData) {
        setUserData({
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          uid: user.uid || '',
          admin: userData.admin || false,
        })
      }
    })
  }, [auth])

  return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>
}
