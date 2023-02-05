import { useState } from 'react'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { database, storage } from '../../firebase/config'

import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { IAddProduct } from '../../interfaces/index'

export const useHandleProducts = () => {
  const [loading, setLoading] = useState(false)

  const addProduct = async (productData: IAddProduct, img: File | '') => {
    setLoading(true)

    try {
      if (img !== '') {
        const generateName = `industries/${productData.industry}/${Date.now()}`
        const storageRef = ref(storage, generateName)

        const uploadTask = uploadBytesResumable(storageRef, img)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(uploadProgress)
          },
          (error) => {
            alert(error.message)
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            const docRef = collection(database, `industries/${productData.industry}/products`)

            const docData = {
              imagePath: url,
              createdAt: Timestamp.now(),
              ...productData,
            }

            await addDoc(docRef, docData)
            setLoading(false)
            toast.success('Produto adicionado com sucesso!')
          },
        )
      } else {
        const docRef = collection(database, `industries/${productData.industry}/products`)

        const docData = {
          createdAt: Timestamp.now(),
          ...productData,
        }

        await addDoc(docRef, docData)
        setLoading(false)
        toast.success('Produto adicionado com sucesso!')
      }
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  const updateProduct = () => {
    console.log('teste')
  }

  return { addProduct, updateProduct, loading }
}
