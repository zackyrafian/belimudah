import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { 
  LandingPage, 
  BrowserProductPage, 
  DetailPage,
  CartPage,


  SignIn,


  MyProfile
} from './pages'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: '/browser-product',
    element: <BrowserProductPage/>
  },
  {
    path: '/detail',
    element: <DetailPage/>
  }, 
  {
    path: '/cart',
    element: <CartPage/>
  }, 

  // AUTH
  {
    path: '/sign-in',
    element: <SignIn/>
  },
  {
    path: "/profile",
    element: <MyProfile/>,
    children: [
      {
        path: 'address',
        element: <MyProfile/>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
