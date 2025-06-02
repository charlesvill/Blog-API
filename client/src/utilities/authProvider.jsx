import { useState, createContext, useEffect } from 'react'

export const Authorization = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
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
        console.dir("user fetch from token: ", json);
        console.log(json)
        setUser(json);
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]); // dependency array here
  //useEffect() only on mount of component and on token change
  // checks if token present, does nothing if no token
  // with provided url and token requests the user object
  // adds user object to the useContext 
  const url = "http://localhost:5000/users";



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

  return (
    <>
      <Authorization.Provider value={{ user, mode, setToken, login }}>
        {!loading && children}
      </Authorization.Provider>
    </>
  )

}
