import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { 
  LandingPage, 
  BrowserProductPage, 
  DetailPage,
  CartPage,
  Product,


  SignIn,
  SignUpPage,
  ForgetPasswordPage,

  CheckoutAddress, 
  CheckoutPaymentPage,
  CheckoutConfirmPage,
  CheckoutSuccessPage,


  MyProfile,
  ProfileAddress,
  ProfileSetting,
  ProfileWishList,

  DashboardMainPage,
  DashboardProductPage,
  DashboardOrderPage,
  DashboardCustomersPage,
  
  NotFound
} from '../pages'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProfileLayout, DashboardLayout } from '../components/layouts'
import CheckoutLayout from '../components/layouts/checkout.layout'
import { Provider } from 'react-redux'
import { persistor, store } from '@/features/store'
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRouter from './ProtectedRouter'
import ProctedCheckoutRouter from './ProctedCheckoutRouter'
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
  {
    path: '/product/:id',
    element: <Product/>
  },

  // AUTH
  {
    path: '/sign-in',
    element: <SignIn/>
  },

  {
    path: '/sign-up', 
    element: <SignUpPage/>
  },
  {
    path: '/forget-password', 
    element: <ForgetPasswordPage/>
  },


  {
    path: "", 
    element: <ProtectedRouter />,
    children: [
      {
        element: <ProctedCheckoutRouter />,
        children: [
            {
              path: "/checkout",
              element: <CheckoutLayout/>, 
              children: [ 
                { 
                  path: 'address', 
                  element: <CheckoutAddress />
                }, 
                { 
                  path: 'payment', 
                  element: <CheckoutPaymentPage/>
                },
                {
                  path: 'confirm', 
                  element: <CheckoutConfirmPage/>
                },
              ]
            }, 
          ]
      },
      {
        path: 'checkout/success', 
        element: <CheckoutSuccessPage/>
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
          },
          {
            path: 'wishlist',
            element: <ProfileWishList/>
          }
        ]
      },
    ]
  }, 
  
  { 
    path: "/dashboard", 
    element: <DashboardLayout/>, 
    children: [ 
      { 
        index: true, 
        element: <DashboardMainPage/>
      },
      {
        path: 'product', 
        element: <DashboardProductPage/>
      },
      {
        path: 'order', 
        element: <DashboardOrderPage/>
      },
      {
        path: 'customers', 
        element: <DashboardCustomersPage/>
      },
    ]
  },
  {
    path: '*', 
    element: <NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
