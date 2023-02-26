/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { database } from '../../firebase/config'

import * as interfaces from '../../interfaces/index'

export const useFetchCollection = (docCollection: string) => {
  const [ordersFetch, setOrdersFetch] = useState<interfaces.IOrder[]>([])
  const [lastOrdersFetch, setLastOrdersFetch] = useState<DocumentData>()

  const [industriesFetch, setIndustriesFetch] = useState<interfaces.IIndustries[]>([])
  const [lastIndustriesFetch, setLastIndustriesFetch] = useState<DocumentData>()

  const [clientsFetch, setClientsFetch] = useState<interfaces.IClients[]>([])
  const [lastClientsFetch, setLastClientsFetch] = useState<DocumentData>()

  const [deadlinesFetch, setDeadlinesFetch] = useState<interfaces.IDeadlines[]>([])
  const [lastDeadlinesFetch, setLastDeadlinesFetch] = useState<DocumentData>()

  const [networksFetch, setNetworksFetch] = useState<interfaces.INetworks[]>([])
  const [lastNetworksFetch, setLastNetworksFetch] = useState<DocumentData>()

  const [productsFetch, setProductsFetch] = useState<interfaces.IProduct[]>([])
  const [lastProductsFetch, setLastProductsFetch] = useState<DocumentData>()

  const [searchQuery, setSearchQuery] = useState<DocumentData>([])

  useEffect(() => {
    if (docCollection === '') return

    const fetchData = () => {
      const collectionRef = collection(database, docCollection)
      try {
        const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(25))

        onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
          const snapshot = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          if (docCollection === 'industries') {
            setIndustriesFetch(snapshot)
            setLastIndustriesFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
          } else if (docCollection === 'orders') {
            setOrdersFetch(snapshot)
            setLastOrdersFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
          } else if (docCollection === 'clients') {
            setClientsFetch(snapshot)
            setLastClientsFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
          } else if (docCollection === 'deadlines') {
            setDeadlinesFetch(snapshot)
            setLastDeadlinesFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
          } else if (docCollection.includes('networks')) {
            setNetworksFetch(snapshot)
            setLastNetworksFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
          } else if (docCollection.includes('products')) {
            setProductsFetch(snapshot)
            setLastProductsFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
          }
        })
      } catch (e: any) {
        toast.error(e.message)
      }
    }
    fetchData()
  }, [docCollection])

  const fetchMore = () => {
    const collectionRef = collection(database, docCollection)

    try {
      let q

      if (docCollection === 'industries') {
        q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastIndustriesFetch),
          limit(25),
        )
      } else if (docCollection === 'orders') {
        q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastOrdersFetch),
          limit(25),
        )
      } else if (docCollection === 'clients') {
        q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastClientsFetch),
          limit(25),
        )
      } else if (docCollection === 'deadlines') {
        q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastDeadlinesFetch),
          limit(25),
        )
      } else if (docCollection.includes('networks')) {
        q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastNetworksFetch),
          limit(25),
        )
      } else if (docCollection.includes('products')) {
        q = query(
          collectionRef,
          orderBy('createdAt', 'asc'),
          startAfter(lastProductsFetch),
          limit(25),
        )
      } else {
        return
      }

      onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const snapshot = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (docCollection === 'industries') {
          setIndustriesFetch([...industriesFetch, ...snapshot])
          setLastIndustriesFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
        } else if (docCollection === 'orders') {
          setOrdersFetch([...ordersFetch, ...snapshot])
          setLastOrdersFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
        } else if (docCollection === 'clients') {
          setClientsFetch([...clientsFetch, ...snapshot])
          setLastClientsFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
        } else if (docCollection === 'deadlines') {
          setDeadlinesFetch([...deadlinesFetch, ...snapshot])
          setLastDeadlinesFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
        } else if (docCollection.includes('networks')) {
          setNetworksFetch([...networksFetch, ...snapshot])
          setLastNetworksFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
        } else if (docCollection.includes('products')) {
          setProductsFetch([...productsFetch, ...snapshot])
          setLastProductsFetch(querySnapshot.docs[querySnapshot.docs.length - 1])
        }
      })
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  const searchDoc = (search: string) => {
    setSearchQuery([])
    const collectionRef = collection(database, docCollection)

    try {
      let q

      if (docCollection === 'industries') {
        q = query(
          collectionRef,
          where('fantasyName', '>=', search),
          where('fantasyName', '<=', search + '~'),
        )
      } else if (docCollection === 'orders') {
        q = query(
          collectionRef,
          where('clientName', '>=', search),
          where('clientName', '<=', search + '~'),
        )
      } else if (docCollection === 'clients') {
        q = query(
          collectionRef,
          where('socialName', '>=', search),
          where('socialName', '<=', search + '~'),
        )
      } else if (docCollection === 'deadlines') {
        q = query(collectionRef, where('value', '>=', search), where('value', '<=', search + '~'))
      } else if (docCollection.includes('networks')) {
        q = query(collectionRef, where('name', '>=', search), where('name', '<=', search + '~'))
      } else {
        return
      }

      onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const snapshot = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        if (snapshot.length > 0) {
          setSearchQuery(snapshot)
        } else {
          setSearchQuery([])
        }

        return
      })
    } catch (e: any) {
      toast.error(e.message)
      return
    }
  }

  return {
    industriesFetch,
    clientsFetch,
    deadlinesFetch,
    ordersFetch,
    networksFetch,
    productsFetch,
    fetchMore,
    searchDoc,
    searchQuery,
    setSearchQuery,
  }
}
