import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Componet/Home/Home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Componet/Layout/Layout'
import Regester from './Componet/Regester/Regester'
import Login from './Componet/Login/Login'
import CounterContextProvider from './Context/CounterContext'
import Logout from './Componet/Logout/Logout'

import Cart from './Componet/Cart/Cart'
import Porducts from './Componet/Products/Porducts'
import Brands from './Componet/Brands/Brands'
import Categories from './Componet/Categories/Categories'
import UserContextProvider from './Context/UserContext'
import NotFounded from './Componet/NotFounded/NotFounded'
import Protectedroote from './Componet/Protectedroote/Protectedroote'
import ProductDetails from './Componet/ProductDetails/ProductDetails'
import RecentProudcts from './Componet/RecentProudcts/RecentProudcts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvaider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import AllOrders from './Componet/AllOrders/AllOrders'
import Pay from './Componet/Pay/Pay'
let query = new QueryClient();



let x = createBrowserRouter([{
  path: "", element: <Layout />, children: [
    { index: true, element: <Protectedroote><Home /></Protectedroote> },
    { path: "proudcts", element: <Protectedroote><Porducts /></Protectedroote> },
    { path: "AllOrders", element: <Protectedroote><AllOrders /></Protectedroote> },
    { path: "cart", element: <Protectedroote><Cart /></Protectedroote> },
    { path: "Pay", element: <Protectedroote><Pay /></Protectedroote> },
    { path: "Brands", element: <Protectedroote><Brands /></Protectedroote> },
    { path: "categories", element: <Protectedroote><Categories /></Protectedroote> },
    { path: "productdatials/:id/:category", element: <Protectedroote><ProductDetails /></Protectedroote> },
    { path: "RecentProudcts/:id/:category", element: <Protectedroote><RecentProudcts /></Protectedroote> },
    { path: "Login", element: <Login /> },
    { path: "Regester", element: <Regester /> },
    { path: "Logout", element: <Logout /> },
    { path: "*", element: <NotFounded /> },
  ]
}
])
function App() {
  const [count, setCount] = useState(0)

  return <CartContextProvaider><QueryClientProvider client={query}><UserContextProvider><CounterContextProvider><RouterProvider router={x}>
  </RouterProvider>
    <Toaster/>
  <ReactQueryDevtools/></CounterContextProvider>
  </UserContextProvider></QueryClientProvider>
</CartContextProvaider>

}

export default App
