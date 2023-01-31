// Components
import MainDetails from '../components/MainDetails'
import SidebarDetails from '../components/SidebarDetails'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getIndustries } from '../services/api'

interface industriesProps {
  id: number
  name: string
  socialname: string
  cnpj: string
  products: Array<{
    id: number
    code: string
    name: string
    industry: string
    price: number
  }>
}

const IndustriesDetails = () => {
  const { id } = useParams()
  const [industries, setIndustries] = useState<industriesProps[]>([])
  const [industry, setIndustry] = useState<industriesProps[]>([])

  useEffect(() => {
    ;(async () => {
      const industriesRequest = await getIndustries()
      setIndustries(industriesRequest.data)
    })()
  }, [])

  useEffect(() => {
    const industryFilter = industries.filter((item) => `${item.id}` === `${id}`)
    setIndustry(industryFilter)
  }, [id, industries])

  if (industry.length === 0) return <p>loading</p>

  return (
    <div className='flex gap-10'>
      <SidebarDetails industry={industry[0]} />
      <MainDetails products={industry[0].products} />
    </div>
  )
}

export default IndustriesDetails
