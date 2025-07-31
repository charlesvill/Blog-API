import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utilities/authProvider.jsx";
import { ErrorBoundary } from "./utilities/errorBoundary.jsx";
import { NotFound } from "./utilities/notFound.jsx";
import { Login } from "./utilities/login.jsx";
import { SignUp } from "./utilities/signup.jsx";
import { LogOut } from "./utilities/logout.jsx";
import HomePage from "./endUser/homepage/homepage.jsx";
import { HomeContent } from "./endUser/homepage/homeContent/homeContent.jsx";
import { Dashboard } from "./publisher/dashboard/dashboard.jsx";
import { AuthGate } from "./utilities/authenticatePath.jsx";
import { PostForm } from "./publisher/dashboard/postForm.jsx";
import { UpdatePostForm } from "./publisher/dashboard/updateForm.jsx";
import { PostCollection } from "./publisher/dashboard/postCollection.jsx";
import { Post } from "./endUser/post/Post.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomeContent />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/logout",
    element: <LogOut />,
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
        element: <PostCollection />,
      },
      {
        path: "create-post",
        element: <PostForm />,
      },
      {
        path: "update-post/:postid",
        element: <UpdatePostForm />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
