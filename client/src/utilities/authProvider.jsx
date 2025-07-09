import { useState, createContext, useEffect, useMemo } from 'react'
import { apiFetch } from './apiUtils';
import { ErrorBoundary } from './errorBoundary';

export const Authorization = createContext();


export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [path, setPath] = useState(null);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  const getUserUrl = import.meta.env.VITE_LOCAL_GET_USER;

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

        console.log("response status: ", response.status);
        const json = await response.json();
        console.dir("user fetch from token: ");
        console.log(json);
        setUser(json);
        setLoading(false);
        setInitializing(false);
        setError(null)
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err);
      }
    };

    setInitializing(true);
    setLoading(true);
    fetchData();
  }, [token]);

  const login = async (url, data) => {
      setLoading(true);
      const response = await apiFetch(
        url,
        null,
        data,
        "POST",
      );

    if(response instanceof Error){

      const errMsg = response.message === "400" ? "Username or password incorrect" : "Other Error Occurred";
      logOut();
      setError(errMsg);
      setLoading(false);
      return new Error(errMsg);
    }

      setToken(response.token);
      setUser(response.user);
      setLoading(false);
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // redirect or navigate?
    return;
  }

  const authContextValue = useMemo(() => ({
    user, path, setPath, mode, token, setToken, login, logOut, loading, setLoading, initializing, setInitializing, error, setError
  }), [user, path, mode, token, loading, initializing, error]);


  return (
    <>
      <Authorization.Provider value={authContextValue}>
        {!loading && children}
      </Authorization.Provider>
    </>
  )

}
