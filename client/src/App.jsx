import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestAdmin from './publisher/testadmin.jsx'
import TestLogin from './publisher/login.jsx'
import HomePage from './endUser/homepage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin.blog",
    element: <TestAdmin />,
    children: [
      { path: "login", element: <TestLogin /> },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
