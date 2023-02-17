import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../hooks/fetchData/useFetchDocument'

import { useParams } from 'react-router-dom'

import Loading from '../../components/GlobalComponents/Loading'

import { IClients } from '../../interfaces'
import Sidebar from '../../components/Dashboard/Details/Clients/SidebarClient'
import Main from '../../components/Dashboard/Details/Clients/MainClient'

const ClientDetails = () => {
  const { clientId } = useParams()
  const { document, loading } = useFetchDocument('clients', clientId || '')
  const [client, setClient] = useState<IClients>()

  useEffect(() => {
    if (document) {
      setClient(document)
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
      {client && (
        <>
          <Sidebar client={client} />
          <div className='w-full lg:flex lg:items-center lg:justify-center'>
            <Main />
          </div>
        </>
      )}
    </div>
  )
}

export default ClientDetails
