import { useState, createContext, useEffect } from 'react'

export const Authorization = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // store token in ls
    localStorage.setItem("token", token);
  }, [token]);

  // login function sets token and sets user

  // will need to import the url from login 
  const login = async (url, data) => {
    try {
      setLoading(true);
      const response = await fetch(
        url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: 'cors'
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          const json = await response.json();
          // update to userInput state when finished. 
          console.dir(json);
          setToken(json.token);
          setUser(json.user);
          setLoading(false);
        }
      });

    } catch (error) {
      console.error(error);
    }
  }


  // return the context provider with the children in the middle if no loading or error


  return (
    <>
      <Authorization.Provider value={{ user, mode, setToken, login }}>
        {!loading && children}
      </Authorization.Provider>

    </>

  )

}
