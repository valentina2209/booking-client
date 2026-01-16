import { Toaster } from 'react-hot-toast'
import './App.css'
import AppRoutes from '@/routes/AppRoutes'

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
      <AppRoutes />

    </>
  )
}

export default App