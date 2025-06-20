import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './utilities/authProvider.jsx'
import { Authorization } from './utilities/authProvider.jsx'
import { useContext } from 'react'
import { Login } from './utilities/login.jsx'
import HomePage from './endUser/homepage.jsx'
import { Dashboard } from './publisher/dashboard/dashboard.jsx'
import { AuthGate } from './utilities/authenticatePath.jsx'
import { PostForm } from './publisher/dashboard/postForm.jsx'
import { PostCollection } from './publisher/dashboard/postCollection.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <AuthGate>
        <Dashboard />
      </AuthGate>
    ),
    children: [
      {
        index: true, 
        element: <PostCollection />
      },
      {
        path: "create-post",
        element: <PostForm />,
      },
    ],
  },
]);

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
