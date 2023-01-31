import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/',
})

export const getIndustries = () => api.get('/industries')
export const getClients = () => api.get('/clients')
export const getDeadLines = () => api.get('/deadlines')
export const getOrders = () => api.get('/orders')

export default api
