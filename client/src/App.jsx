import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState, createContext } from 'react'
import TestAdmin from './publisher/testadmin.jsx'
import TestLogin from './publisher/login.jsx'
import HomePage from './endUser/homepage.jsx'

// local storage for token pull & push 
// state for token
// authenticator to check token validity & navigate 
// based on results from API response

// useeffect to configure local storage on comp mount?
// global context for { user: , mode: }


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

export const Context = createContext();


// may need to move this so setToken is in the same scope as createContext invocation


function App() {

  const [token, setToken] = useState("");
  const [user, setUser] = useState("charles");
  const [mode, setMode] = useState("client");


  const lsContent = localStorage.getItem("token");

  if (token !== "") {
    console.log("token pushed to ls");
    localStorage.setItem("token", token);
  } else if (token === "" && lsContent) {
    setToken(lsContent);
  }

  return (
    <>
      <Context.Provider value={{ user, mode, setToken }}>
        <RouterProvider router={router} />
      </Context.Provider>
    </>
  )
}

export default App
