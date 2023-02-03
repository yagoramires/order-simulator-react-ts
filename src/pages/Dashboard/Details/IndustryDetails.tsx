// Routes
import { useParams } from 'react-router-dom'

// React
import { useEffect, useState } from 'react'

// Fetch Data
import { useFetchDocument } from '../../../hooks/useFetchDocument'

// Components
import Details from '../../../components/Dashboard/Details/IndustryDetails'
import SidebarDetails from '../../../components/Dashboard/Details/SidebarDetails'
import Loading from '../../../components/Loading'

interface IndustryProps {
  id: string
  socialName: string
  fantasyName: string
  cnpj: string
  products?: Array<{
    id: string
    code: string
    name: string
    industry: string
    price: number
  }>
}

const IndustryDetails = () => {
  const { industryId } = useParams()
  const { document, loading } = useFetchDocument('industries', industryId || '')
  const [industry, setIndustry] = useState<IndustryProps>()

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
          <Details industry={industry} />
        </>
      )}
    </div>
  )
}

export default IndustryDetails
