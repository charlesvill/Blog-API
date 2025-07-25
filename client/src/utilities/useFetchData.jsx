import { useEffect, useState } from "react";
import { apiFetch } from "./apiUtils";

export function useFetchData(url, dependentVar){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiFetch(url);
        if(response instanceof Error){
          throw new Error(response.message);
        }
        setData(response);
      } catch (err) {

        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[url, dependentVar]);

  return { data, loading, error };
}

