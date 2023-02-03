// Routes
import Routes from './routes'

// Toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
        <Routes />
      </AuthContextProvider>
    </div>
  )
}

export default App
