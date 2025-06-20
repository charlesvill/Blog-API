import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './utilities/authProvider.jsx'
import { Authorization } from './utilities/authProvider.jsx'
import { useContext } from 'react'
import { Login } from './utilities/login.jsx'
import HomePage from './endUser/homepage.jsx'
import { Dashboard } from './publisher/dashboard/dashboard.jsx'
import { AuthGate } from './utilities/authenticatePath.jsx'
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
