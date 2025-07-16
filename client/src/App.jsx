import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthProvider } from './utilities/authProvider.jsx'
import { ErrorBoundary } from './utilities/errorBoundary.jsx'
import { NotFound } from './utilities/notFound.jsx'
import { Login } from './utilities/login.jsx'
import HomePage from './endUser/homepage/homepage.jsx'
import { Dashboard } from './publisher/dashboard/dashboard.jsx'
import { AuthGate } from './utilities/authenticatePath.jsx'
import { PostForm } from './publisher/dashboard/postForm.jsx'
import { PostCollection } from './publisher/dashboard/postCollection.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
