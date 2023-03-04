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

  const [networksFetch, setNetworksFetch] = useState<interfaces.INetworks[]>([])
  const [lastNetworksFetch, setLastNetworksFetch] = useState<DocumentData>()

  const [productsFetch, setProductsFetch] = useState<interfaces.IProduct[]>([])
  const [lastProductsFetch, setLastProductsFetch] = useState<DocumentData>()

  useEffect(() => {
    if (docCollection === '') return
    if (docCollection === 'industries//products') return

    const fetchData = () => {
      const collectionRef = collection(database, docCollection)
      try {
        let q
        if (docCollection.includes('products')) {
          q = query(collectionRef, orderBy('createdAt', 'asc'), limit(50))
        } else {
          q = query(collectionRef, orderBy('createdAt', 'desc'), limit(25))
        }

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

  return {
    industriesFetch,
    clientsFetch,
    ordersFetch,
    networksFetch,
    productsFetch,
    fetchMore,
  }
}
