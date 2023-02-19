import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../hooks/fetchData/useFetchDocument'

import { useParams } from 'react-router-dom'

import Main from '../../components/Dashboard/Details/Industries/MainIndustry'
import Sidebar from '../../components/Dashboard/Details/Industries/SidebarIndustry'
import Loading from '../../components/GlobalComponents/Loading'

import { IIndustries } from '../../interfaces/index'

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
    <div className='flex w-full'>
      {industry && (
        <>
          <Sidebar industry={industry} />
          <div className='w-full lg:flex lg:items-center lg:justify-center'>
            <Main industry={industry} />
          </div>
        </>
      )}
    </div>
  )
}

export default IndustryDetails
