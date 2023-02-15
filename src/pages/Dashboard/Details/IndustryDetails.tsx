import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../../hooks/fetchData/useFetchDocument'

import { useParams } from 'react-router-dom'

import Main from '../../../components/Dashboard/Details/Industries/Main'
import Sidebar from '../../../components/Dashboard/Details/Industries/Sidebar'
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
    <div className='flex'>
      {industry && (
        <>
          <Sidebar industry={industry} />
          <div className='lg:flex lg:items-center lg:justify-center lg:w-full'>
            <Main />
          </div>
        </>
      )}
    </div>
  )
}

export default IndustryDetails
