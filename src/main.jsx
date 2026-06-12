import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LandingPage, BrowserProductPage } from './pages'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: '/browser-product',
    element: <BrowserProductPage/>
  }
  // {
    // element: </>,
    // path: "/contact",
  // },
  // {
    // element: <About />,
    // path: "/about",
  // },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
