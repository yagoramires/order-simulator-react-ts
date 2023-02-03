import { createContext, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

type AuthContextProps = {
  children: React.ReactNode
}

// type AuthContextType = {
//   user: {
//     userAuth?: any
//     uid?: string
//     email?: string
//     displayName?: string
//     photoUrl?: string
//   }
//   setUser?: React.Dispatch<
//     React.SetStateAction<{
//       userAuth: any
//       uid: string
//       email: string
//       displayName: string
//       photoUrl: string
//     } | null>
//   >
// }

// interface UserInfo {
//   displayName: string | null
//   email: string | null
//   phoneNumber: string | null
//   photoURL: string | null
//   providerId: string
//   uid: string
// }
// interface UserInfo {
//   readonly displayName: string | null
//   readonly email: string | null
//   readonly phoneNumber: string | null
//   readonly photoURL: string | null
//   readonly providerId: string
//   readonly uid: string
// }

const initialValue = {
  user: null,
}

export const AuthContext = createContext(initialValue)

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState(initialValue.user)
  // const [user, setUser] = useState<UserInfo | null>(initialValue.user)
  // const [userData, setUserData] = useState(initialValue.user)

  const { auth, onAuthStateChanged } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setUser(user)
    })
  }, [auth, onAuthStateChanged])

  // useEffect(() => {
  //   if (user !== null) {
  //     setUserData(
  //       {user.displayName}
  //     )
  //   }
  // }, [user])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
