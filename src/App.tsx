import Routes from './routes'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthContextProvider } from './context/AuthContext'
import { NewOrderProvider } from './context/NewOrderContext'

function App() {
  return (
    <div className='App min-h-[100vh] max-w-[100vw] bg-gradient-to-r from-blue-800 to-blue-600 overflow-scroll'>
      <AuthContextProvider>
        <NewOrderProvider>
          <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
          <Routes />
        </NewOrderProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
