import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './Contex/AuthProvider'
import { RouterProvider } from 'react-router'
import { router } from './Routers/Router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
     </AuthProvider>
  </StrictMode>,
)
