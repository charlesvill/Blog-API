import { useState, createContext, useEffect, useMemo } from 'react'

export const Authorization = createContext();


export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getUserUrl = import.meta.env.VITE_LOCAL_GET_USER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(getUserUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const json = await response.json();
        console.dir("user fetch from token: ");
        console.log(json);
        setUser(json);
        setLoading(false);
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);


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

  const logOut = (next = null) => {
    localStorage.removeItem("token");
    setToken(null)
    setUser(null);
    // redirect or navigate?
    return next && next;
  }

  const authContextValue = useMemo(() => ({
    user, mode, setToken, login, logOut
  }), [user, mode, setToken, login, logOut]);

  return (
    <>
      <Authorization.Provider value={authContextValue}>
        {!loading && children}
      </Authorization.Provider>
    </>
  )

}
