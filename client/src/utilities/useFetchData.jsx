import { useEffect, useState } from "react";
import { apiFetch } from "./apiUtils";

export function useFetchData(url){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiFetch(url);
        if(response instanceof Error){
          throw new Error(err);
        }
        setData(response);
      } catch (err) {

        setError(response);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[url]);

  return { data, loading, error };
}

