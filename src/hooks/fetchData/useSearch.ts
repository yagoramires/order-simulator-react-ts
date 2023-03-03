import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { database } from '../../firebase/config'

export const useSearch = (docCollection: string) => {
  const [productsQuery, setProductsQuery] = useState<DocumentData>([])
  const [clientsQuery, setClientsQuery] = useState<DocumentData>([])
  const [industriesQuery, setIndustriesQuery] = useState<DocumentData>([])
  const [ordersQuery, setOrdersQuery] = useState<DocumentData>([])
  const [networksQuery, setNetworksQuery] = useState<DocumentData>([])

  const searchProduct = (search: string) => {
    if (search === '') return
    setProductsQuery([])
    const collectionRef = collection(database, docCollection)

    try {
      const qCode = query(
        collectionRef,
        where('code', '>=', search),
        where('code', '<=', search + '~'),
        limit(25),
      )

      onSnapshot(qCode, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const searchCode = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (searchCode.length > 0) {
          setProductsQuery(searchCode)
        } else {
          const qArray = query(
            collectionRef,
            where('searchstr', 'array-contains', search),
            limit(25),
          )

          onSnapshot(qArray, (querySnapshot: QuerySnapshot<DocumentData>) => {
            const searchArr = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))

            if (searchArr.length > 0) {
              setProductsQuery(searchArr)
            } else {
              toast.error('Nenhum produto encontrado.')
            }
          })
        }
      })
    } catch (e: any) {
      toast.error(e.message)
      return
    }
  }

  const searchClient = (search: string) => {
    if (search === '') return
    setClientsQuery([])
    const collectionRef = collection(database, docCollection)

    try {
      const qCode = query(
        collectionRef,
        where('code', '>=', search),
        where('code', '<=', search + '~'),
        limit(25),
      )

      onSnapshot(qCode, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const searchCode = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (searchCode.length > 0) {
          setClientsQuery(searchCode)
        } else {
          const qArray = query(
            collectionRef,
            where('searchstr', 'array-contains', search),
            limit(25),
          )

          onSnapshot(qArray, (querySnapshot: QuerySnapshot<DocumentData>) => {
            const searchArr = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))

            if (searchArr.length > 0) {
              setClientsQuery(searchArr)
            } else {
              toast.error('Nenhum cliente encontrado.')
            }
          })
        }
      })
    } catch (e: any) {
      toast.error(e.message)
      return
    }
  }

  const searchIndustries = (search: string) => {
    setIndustriesQuery([])
    if (search === '') return
    const collectionRef = collection(database, docCollection)

    try {
      const q = query(
        collectionRef,
        where('socialName', '>=', search.toLowerCase()),
        where('socialName', '<=', search.toLowerCase() + '~'),
      )

      onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const snapshot = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (snapshot.length > 0) {
          setIndustriesQuery(snapshot)
        } else {
          toast.error('Nenhuma indústria encontrada.')
        }
        return
      })
    } catch (e: any) {
      console.log(e.message)
      toast.error(e.message)
      return
    }
  }

  const searchOrders = (search: string) => {
    setIndustriesQuery([])
    if (search === '') return
    const collectionRef = collection(database, docCollection)

    try {
      const q = query(
        collectionRef,
        where('clientName', '>=', search.toLowerCase()),
        where('clientName', '<=', search.toLowerCase() + '~'),
      )

      onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const snapshot = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (snapshot.length > 0) {
          setIndustriesQuery(snapshot)
        } else {
          toast.error('Nenhum pedido encontrado.')
        }
        return
      })
    } catch (e: any) {
      console.log(e.message)
      toast.error(e.message)
      return
    }
  }

  const searchNetworks = (search: string) => {
    setIndustriesQuery([])
    if (search === '') return
    const collectionRef = collection(database, docCollection)

    try {
      const q = query(
        collectionRef,
        where('name', '>=', search.toLowerCase()),
        where('name', '<=', search.toLowerCase() + '~'),
      )

      onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const snapshot = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (snapshot.length > 0) {
          setIndustriesQuery(snapshot)
        } else {
          toast.error('Nenhum rede encontrada.')
        }
        return
      })
    } catch (e: any) {
      console.log(e.message)
      toast.error(e.message)
      return
    }
  }

  return {
    searchProduct,
    searchClient,
    searchIndustries,
    searchNetworks,
    searchOrders,
    productsQuery,
    clientsQuery,
    industriesQuery,
    ordersQuery,
    networksQuery,
  }
}
