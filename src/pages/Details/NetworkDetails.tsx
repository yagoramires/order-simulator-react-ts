import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../hooks/fetchData/useFetchDocument'

import { useParams } from 'react-router-dom'

import Loading from '../../components/GlobalComponents/Loading'

import { INetworks } from '../../interfaces'
import Sidebar from '../../components/Dashboard/Details/Networks/Sidebar'
import Main from '../../components/Dashboard/Details/Networks/Main'

const NetworkDetails = () => {
  const { networkId } = useParams()
  const { document, loading } = useFetchDocument('networks', networkId || '')
  const [network, setNetwork] = useState<INetworks>()

  useEffect(() => {
    if (document) {
      setNetwork(document)
    }
  }, [document])

  if (loading) {
    return (
      <div className='min-h-[100vh] bg-gradient-to-r from-blue-800 to-blue-600 justify-center items-center flex'>
        <Loading size={'60px'} />
      </div>
    )
  }

  return (
    <div className='flex w-full'>
      {network && (
        <>
          <Sidebar network={network} />
          <div className='w-full lg:flex lg:items-center lg:justify-center'>
            <Main />
          </div>
        </>
      )}
    </div>
  )
}

export default NetworkDetails
