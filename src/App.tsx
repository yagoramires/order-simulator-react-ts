import Routes from './routes'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthContextProvider } from './context/AuthContext'
import { NewOrderProvider } from './context/NewOrderContext'

function App() {
  return (
    <div className='App bg-dark-100 min-h-[100vh]'>
      <AuthContextProvider>
        <NewOrderProvider>
          <Routes />
          <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        </NewOrderProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
