import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { 
  LandingPage, 
  BrowserProductPage, 
  DetailPage,
  CartPage,


  SignIn,


  MyProfile,
  ProfileAddress,
  ProfileSetting
} from './pages'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProfileLayout } from './components/layouts'
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
    element: <ProfileLayout/>,
    children: [
      {
        index: true, 
        element: <MyProfile/>
      },
      {
        path: 'address',
        element: <ProfileAddress/>
      }, 
      {
        path: 'setting', 
        element: <ProfileSetting/>
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
