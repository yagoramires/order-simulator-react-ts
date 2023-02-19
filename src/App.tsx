import Routes from './routes'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthContextProvider } from './context/AuthContext'
import { NewOrderProvider } from './context/NewOrderContext'
import { DataFetchContextProvider } from './context/DataFetchContext'

function App() {
  return (
    <div className='App bg-dark-100 min-h-[100vh]'>
      <AuthContextProvider>
        <DataFetchContextProvider>
          <NewOrderProvider>
            <Routes />
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
          </NewOrderProvider>
        </DataFetchContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App
