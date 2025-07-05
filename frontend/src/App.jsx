import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Opening from "./components/Opening"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
    element:  <div className="mt-16">
      <NavBar />
      <Dashboard />
      <FloatingChatButton />
    </div>
  },
  {
    path: '/cart',
    element: <div>
    <NavBar />
    <Cart />
  </div>
  },
  {
    path: '/search',
    element: <div>
    <NavBar />
    <Search />
    <FloatingChatButton />
  </div>
  },
  {
    path: '/history',
    element: <div>
    <NavBar />
    <OrdersHistory />
  </div>
  },
  {
    path: '/orders',
    element:<div>
    <NavBar />
    <Orders />
  </div>
  },
  {
    path: '/edit',
    element: <EditDetails />
  },
  {
    path: '/items/:id',
    element: <div>
      <NavBar />
      <Item />
    </div>
  },
  {
    path: '/chatbot',
    element: <div>
      <NavBar />
      <Chatbot />
    </div>
  },
  {
    path: '*',
    element: <div>404 Not Found</div>
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