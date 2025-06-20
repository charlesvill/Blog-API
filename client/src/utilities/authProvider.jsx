import { useState, createContext, useEffect, useMemo } from 'react'
import { apiFetch } from './apiUtils';

export const Authorization = createContext();


export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  const getUserUrl = import.meta.env.VITE_LOCAL_GET_USER;

  console.log("this is the root of the AuthProvider");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getUserUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          mode: 'cors',
        });

        if (!response.ok) {
          //jweb token expires need to reauthenticate
          if (response.status === 401) {
            setLoading(false);
            setInitializing(false);
            return logOut();
          }
          setLoading(false);
          setInitializing(false);
          setError("response code: " + response.status);
        }

        const json = await response.json();
        console.dir("user fetch from token: ");
        console.log(json);
        setUser(json);
        setLoading(false);
        setInitializing(false);
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      }
    };

    console.log("this should be triggering before the authenticate path");
    setInitializing(true);
    setLoading(true);
    fetchData();
  }, [token]);

  const login = async (url, data) => {
    try {
      setLoading(true);
      const response = await apiFetch(
        url,
        "POST",
        { "Content-Type": "application/json" },
        data
      );

      setToken(response.token);
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // redirect or navigate?
    return;
  }

  const authContextValue = useMemo(() => ({
    user, mode, setToken, login, logOut, loading, setLoading, initializing, setInitializing,
  }), [user, mode, loading, initializing]);


  return (
    <>
      <Authorization.Provider value={authContextValue}>
        {!loading && children}
      </Authorization.Provider>
    </>
  )

}
