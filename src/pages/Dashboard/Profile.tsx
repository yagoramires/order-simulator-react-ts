// Context
import React, { useContext, useState } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'
import { AuthContext } from '../../context/AuthContext'
import { useUpdateProfile } from '../../hooks/auth/useUpdateProfile'

const Profile = () => {
  const { userData } = useContext(AuthContext)
  const {
    updateImage,
    updateDisplayName,
    updateUserEmail,
    updateUserPassword,
    loadingImg,
    loadingName,
    loadingEmail,
    loadingPassword,
  } = useUpdateProfile()

  const navigate = useNavigate()

  const [profileImg, setProfileImg] = useState(null)
  const [displayName, setDisplayName] = useState(userData.displayName || '')
  const [email, setEmail] = useState(userData.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (profileImg) {
      updateImage(profileImg)
    }

    if (displayName !== userData.displayName && displayName !== '') {
      updateDisplayName(displayName)
    }

    if (email !== userData.email && email !== '') {
      updateUserEmail(email)
    }

    if (password !== '' && password === confirmPassword) {
      updateUserPassword(password)
    }
  }

  const handleSelectImage = (e: any) => {
    setProfileImg(e.target.files[0])
  }

  return (
    <div className='min-h-[100vh] flex flex-col justify-start items-center p-2 w-full'>
      <div className='max-w-[800px] w-full lg:p-8'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full mb-8 font-medium text-gray-50'
        >
          <MdKeyboardArrowLeft size={20} />
          Voltar
        </button>
        <div className='flex flex-col items-center justify-center gap-4 mb-8'>
          {userData?.photoURL ? (
            <img
              src={profileImg ? URL.createObjectURL(profileImg) : userData.photoURL}
              alt=''
              className='w-24 h-24 border-2 border-blue-600 rounded-full md:w-32 md:h-32 lg:w-48 lg:h-48'
            />
          ) : (
            <div className='flex items-center justify-center w-24 h-24 border-2 border-blue-600 rounded-full md:w-32 md:h-32 lg:w-48 lg:h-48overflow-hidden'>
              {profileImg ? (
                <img
                  src={URL.createObjectURL(profileImg)}
                  alt=''
                  className='w-24 h-24 border-4 border-blue-600 rounded-full md:w-32 md:h-32 lg:w-48 lg:h-48'
                />
              ) : (
                <FaUserAlt className='text-blue-600 text-[100px] md:text-[50px]' />
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleUpdateProfile} className='flex flex-col w-full gap-4'>
          <input
            type='file'
            placeholder='Nome'
            className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            onChange={handleSelectImage}
          />
          <input
            type='text'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Nome'
            className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail'
            className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Senha'
            className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            autoComplete='false'
          />
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirmação de senha'
            className='w-full p-2 bg-gray-900 rounded-lg text-gray-50'
            autoComplete='false'
          />
          {loadingImg || loadingName || loadingEmail || loadingPassword ? (
            <div className='flex justify-center w-full'>
              <Loading size='30px' />
            </div>
          ) : (
            <input
              type='submit'
              className='p-2 my-4 font-bold text-white bg-blue-600 rounded-md shadow-sm cursor-pointer text-gray-50'
              value={'Atualizar'}
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile
