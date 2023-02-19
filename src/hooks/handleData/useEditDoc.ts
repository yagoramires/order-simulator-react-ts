import { useState } from 'react'

import { database, storage } from '../../firebase/config'

import { updateDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

// import { IIndustries, IClients, IDeadlines, IProduct } from '../../interfaces/index'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { IAddNetwork, IAddProduct, IIndustries } from '../../interfaces'

export const useEditDoc = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const editIndustry = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'industries', id)
      await updateDoc(ref, data)
      setLoading(false)
      toast.success('Indústria alterada com sucesso!')
      window.location.reload()
    } catch (e: any) {
      toast.error('Erro ao editar a indústria, tente novamente!')
      setLoading(false)
    }
  }

  const editClient = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'clients', id)
      await updateDoc(ref, data)
      toast.success('Cliente alterado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error('Erro ao editar o cliente, tente novamente!')
      setLoading(false)
    }
  }

  const editDeadline = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'deadlines', id)
      await updateDoc(ref, data)
      toast.success('Cliente alterado com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error('Erro ao editar o cliente, tente novamente!')
      setLoading(false)
    }
  }

  const editNetwork = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'networks', id)
      await updateDoc(ref, data)
      toast.success('Rede alterada com sucesso!')
      setLoading(false)
    } catch (e: any) {
      toast.error('Erro ao editar a rede, tente novamente!')
      setLoading(false)
    }
  }

  const updateProductNetwork = async (id: string, data: any) => {
    setLoading(true)
    try {
      const ref = doc(database, 'networks', id)
      await updateDoc(ref, data)

      toast.success('Produto adicionado com sucesso!')
      window.location.reload()
      setLoading(false)
    } catch (e: any) {
      toast.error('Erro ao adicionar o produto, tente novamente!')
      setLoading(false)
    }
  }

  const updateProductIndustry = async (
    industry: IIndustries,
    productData: IAddProduct,
    img?: File,
  ) => {
    setLoading(true)

    try {
      if (img) {
        const generateName = `industries/${productData.industryId}/${Date.now()}`
        const storageRef = ref(storage, generateName)

        const uploadTask = uploadBytesResumable(storageRef, img)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(uploadProgress)
          },
          (error) => {
            alert(error.message)
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            const ref = doc(database, 'industries', productData.industryId)

            const productWithImg = { ...productData, imagePath: url }

            if (industry.products) {
              const verifyIfProductIsInArray = industry.products.filter(
                (product) => product.code === productData.code,
              )

              if (verifyIfProductIsInArray.length > 0) {
                console.log('ta no array')
                toast.error('Produto já cadastrado!')
                return
              }

              const productsArray = industry.products
              productsArray.push(productWithImg)
              await updateDoc(ref, { ...industry, products: productsArray })
              setLoading(false)
              toast.success('Produto adicionado com sucesso!')
              window.location.reload()
              return
            } else {
              const productsArray = []
              productsArray.push(productWithImg)
              await updateDoc(ref, { ...industry, products: productsArray })
              setLoading(false)
              toast.success('Produto adicionado com sucesso!')
              window.location.reload()
              return
            }
          },
        )
      } else {
        const ref = doc(database, 'industries', productData.industryId)

        if (industry.products) {
          const verifyIfProductIsInArray = industry.products.filter(
            (product) => product.code === productData.code,
          )

          if (verifyIfProductIsInArray.length > 0) {
            console.log('ta no array')
            toast.error('Produto já cadastrado!')
            return
          }

          const productsArray = industry.products
          productsArray.push(productData)
          await updateDoc(ref, { ...industry, products: productsArray })
          setLoading(false)
          toast.success('Produto adicionado com sucesso!')
          window.location.reload()
          return
        } else {
          const productsArray = []
          productsArray.push(productData)
          await updateDoc(ref, { ...industry, products: productsArray })
          setLoading(false)
          toast.success('Produto adicionado com sucesso!')
          window.location.reload()
          return
        }
      }
    } catch (e: any) {
      toast.error(e.message)
      setLoading(false)
    }
  }

  // const editProduct = async (industryId: string, productId: string, data: any, img?: File) => {
  //   setLoading(true)

  //   if (img) {
  //     try {
  //       const generateName = `industries/${data.industry}/${Date.now()}`
  //       const storageRef = ref(storage, generateName)
  //       const uploadTask = uploadBytesResumable(storageRef, img)
  //       uploadTask.on(
  //         'state_changed',
  //         (snapshot) => {
  //           const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           setProgress(uploadProgress)
  //         },
  //         (error) => {
  //           alert(error.message)
  //         },
  //         async () => {
  //           const url = await getDownloadURL(uploadTask.snapshot.ref)
  //           const ref = doc(database, `industries/${industryId}/products`, productId)

  //           const docData = {
  //             imagePath: url,
  //             ...data,
  //           }

  //           await updateDoc(ref, docData)
  //           setLoading(false)
  //           toast.success('Produto alterado com sucesso!')
  //         },
  //       )
  //     } catch (e: any) {
  //       toast.error('Erro ao editar o produto, tente novamente!')
  //       setLoading(false)
  //     }
  //   } else {
  //     try {
  //       const ref = doc(database, `industries/${industryId}/products`, productId)
  //       await updateDoc(ref, data)
  //       toast.success('Produto alterado com sucesso!')
  //       setLoading(false)
  //     } catch (e: any) {
  //       toast.error('Erro ao editar o produto, tente novamente!')
  //       setLoading(false)
  //     }
  //   }
  // }

  return {
    editIndustry,
    editClient,
    editDeadline,
    // editProduct,
    editNetwork,
    updateProductNetwork,
    updateProductIndustry,
    progress,
    loading,
  }
}
