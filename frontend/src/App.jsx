import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Opening from "./components/Opening"
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from "../context/myContext"
import Dashboard from "./components/Dashboard"
import Cart from "./components/Cart"
import Search from "./components/Search"
import OrdersHistory from "./components/OrdersHistory"
import Orders from "./components/Orders"
import NavBar from "./components/NavBar"
import EditDetails from "./components/EditDetails"
import Item from "./components/Item"
import Chatbot from "./components/Chatbot"
import FloatingChatButton from "./components/FloatingChatButton"
import AddItem from "./components/AddItem"

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
const router = createBrowserRouter([
  {
    path: '/',
    element: <Opening />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: (
      <div className="pt-20">
        <NavBar />
        <Dashboard />
        <FloatingChatButton />
      </div>
    )
  },
  {
    path: '/cart',
    element: (
      <div className="pt-20">
        <NavBar />
        <Cart />
      </div>
    )
  },
  {
    path: '/search',
    element: (
      <div className="pt-20">
        <NavBar />
        <Search />
        <FloatingChatButton />
      </div>
    )
  },
  {
    path: '/history',
    element: (
      <div className="pt-20">
        <NavBar />
        <OrdersHistory />
      </div>
    )
  },
  {
    path: '/orders',
    element: (
      <div className="pt-20">
        <NavBar />
        <Orders />
      </div>
    )
  },
  {
    path: '/add-item',
    element: (
      <div className="pt-20">
        <NavBar />
        <AddItem />
      </div>
    )
  },
  {
    path: '/edit',
    element: <EditDetails />
  },
  {
    path: '/items/:id',
    element: (
      <div className="pt-20">
        <NavBar />
        <Item />
      </div>
    )
  },
  {
    path: '/chatbot',
    element: (
      <div className="pt-20">
        <NavBar />
        <Chatbot />
      </div>
    )
  },
  {
    path: '*',
    element: (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-neutral-300 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-neutral-800 mb-2">Page Not Found</h2>
            <p className="text-neutral-600 mb-8">The page you're looking for doesn't exist.</p>
          </div>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    )
  }
])

function App() {
  return (
    <UserContextProvider>
      <Toaster toastOptions={{duration: 2000}} position='top-center' />
      <RouterProvider router={router}>
        <Opening />
      </RouterProvider>
    </UserContextProvider>
  )
}

export default App;