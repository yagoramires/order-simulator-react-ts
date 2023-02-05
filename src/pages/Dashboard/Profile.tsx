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
    <main className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 flex justify-center items-center py-4'>
      <div className='w-[90%] bg-white max-w-[1200px] rounded-md shadow-md p-8 flex flex-col gap-4'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-end w-full font-medium text-blue-600'
        >
          <MdKeyboardArrowLeft size={20} />
          Voltar
        </button>
        <div className='flex flex-col items-center justify-center gap-4 mb-4'>
          {userData?.photoURL ? (
            <img
              src={profileImg ? URL.createObjectURL(profileImg) : userData.photoURL}
              alt=''
              className='w-48 h-48 border-4 border-blue-600 rounded-full md:w-36 md:h-36 '
            />
          ) : (
            <div className='flex items-center justify-center w-48 h-48 overflow-hidden border-4 border-blue-600 rounded-full md:w-36 md:h-36'>
              {profileImg ? (
                <img
                  src={URL.createObjectURL(profileImg)}
                  alt=''
                  className='w-48 h-48 rounded-full md:w-36 md:h-36 '
                />
              ) : (
                <FaUserAlt className='text-blue-600 text-[100px] md:text-[50px]' />
              )}
            </div>
          )}
          <h1 className='text-2xl font-medium text-blue-600 cursor-pointer md:text-xl'>
            {userData.displayName}
          </h1>
        </div>

        <form onSubmit={handleUpdateProfile} className='flex flex-col w-full gap-4'>
          <input
            type='file'
            placeholder='Nome'
            className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
            onChange={handleSelectImage}
          />
          <input
            type='text'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Nome'
            className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='E-mail'
            className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Senha'
            className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
            autoComplete='false'
          />
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirmação de senha'
            className='w-full p-2 bg-gray-300 rounded-md shadow-sm'
            autoComplete='false'
          />
          {loadingImg || loadingName || loadingEmail || loadingPassword ? (
            <div className='flex justify-center w-full'>
              <Loading size='30px' />
            </div>
          ) : (
            <input
              type='submit'
              className='p-2 my-4 font-medium text-white rounded-md shadow-sm cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800'
              value={'Atualizar'}
            />
          )}
        </form>
      </div>
    </main>
  )
}

export default Profile
