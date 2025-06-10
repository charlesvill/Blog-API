import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './utilities/authProvider.jsx'
import { Login } from './utilities/login.jsx'
import HomePage from './endUser/homepage.jsx'
import { Dashboard } from './publisher/dashboard/dashboard.jsx'
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
      <Dashboard />
      // will need to make a protected route wrapper component bc I delted it
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
