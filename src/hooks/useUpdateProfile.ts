// Firebase Config
import { app, storage } from '../firebase/config'

// Firebase functions
import { getAuth, updatePassword, updateProfile, updateEmail } from 'firebase/auth'

// React Hooks
import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

// Toast
import { toast } from 'react-toastify'

export const useUpdateProfile = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [loadingImg, setLoadingImg] = useState(false)
  const [loadingName, setLoadingName] = useState(false)
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)

  const auth = getAuth(app)
  const user = auth.currentUser

  const updateImage = async (image: File) => {
    setLoadingImg(true)
    try {
      const generateName = `profileImg/${Date.now()}`
      const storageRef = ref(storage, generateName)

      const uploadingTask = uploadBytesResumable(storageRef, image)

      uploadingTask.on(
        'state_changed',
        (snapshot) => {
          const uploadingProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(uploadingProgress)
        },
        (error) => {
          toast.error(error.message)
        },
        async () => {
          const url = await getDownloadURL(uploadingTask.snapshot.ref)
          if (user) {
            await updateProfile(user, { photoURL: url })
            toast.success('Imagem de perfil atualizada com sucesso!')
            setLoadingImg(false)
          }
        },
      )
    } catch (e: any) {
      toast.error(e.message)
      setLoadingImg(false)
    }
  }

  const updateDisplayName = async (displayname: string) => {
    setLoadingName(true)
    try {
      if (user && user.displayName !== displayname) {
        await updateProfile(user, { displayName: displayname })
        toast.success('Nome atualizado com sucesso!')
        setLoadingName(false)
      }
    } catch (e: any) {
      toast.error(e.message)
      setLoadingName(false)
    }
  }

  const updateUserEmail = async (email: string) => {
    setLoadingEmail(true)
    try {
      if (user && user.email !== email) {
        await updateEmail(user, email)
        toast.success('E-mail atualizado com sucesso!')
        setLoadingEmail(false)
      }
    } catch (e: any) {
      toast.error(e.message)
      setLoadingEmail(false)
    }
  }

  const updateUserPassword = async (password: string) => {
    setLoadingPassword(true)
    try {
      if (user) {
        await updatePassword(user, password)
        toast.success('Senha atualizada com sucesso!')
        setLoadingPassword(false)
      }
    } catch (e: any) {
      toast.error(e.message)
      setLoadingPassword(false)
    }
  }

  return {
    updateImage,
    updateDisplayName,
    updateUserEmail,
    updateUserPassword,
    uploadProgress,
    loadingImg,
    loadingName,
    loadingEmail,
    loadingPassword,
  }
}
