import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url, params) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(url, { params })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    // Use JSON.stringify to deeply compare params
  }, [url, JSON.stringify(params)]);

  return { data, error, loading };
}
