import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'

import { useParams } from 'react-router-dom'

import MainDetails from '../../../components/Dashboard/IndustryDetails/MainDetails'
import SidebarDetails from '../../../components/Dashboard/IndustryDetails/SidebarDetails'
import Loading from '../../../components/Loading'

import { IIndustries } from '../../../interfaces/index'

const IndustryDetails = () => {
  const { industryId } = useParams()
  const { document, loading } = useFetchDocument('industries', industryId || '')
  const [industry, setIndustry] = useState<IIndustries>()

  useEffect(() => {
    if (document) {
      setIndustry(document)
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
    <div className='flex gap-10'>
      {industry && (
        <>
          <SidebarDetails industry={industry} />
          <MainDetails />
        </>
      )}
    </div>
  )
}

export default IndustryDetails
