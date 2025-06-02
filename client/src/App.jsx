import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './utilities/authProvider.jsx'
import { Login } from './utilities/login.jsx'
import HomePage from './endUser/homepage.jsx'
import ProtectedRoute from './utilities/ProtectedRoute.jsx'
import TestAdmin from './publisher/testadmin.jsx'

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
      <ProtectedRoute>
        <TestAdmin />
      </ProtectedRoute>
    ),
  },
]);

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
