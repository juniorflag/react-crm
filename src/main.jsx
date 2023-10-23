import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'

import NuevoCliente ,{action as nuevoClienteAction} from './pages/NuevoCliente'
import Index, {loader as clienteLoader} from './pages/Index'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [

      {
        index: true,
        element: <Index/>,
        loader:clienteLoader
      },

      {
        path: '/cliente/nuevo',
        element: <NuevoCliente/>,
        action: nuevoClienteAction
      }

    ]
  },

 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  
  </React.StrictMode>,
)
