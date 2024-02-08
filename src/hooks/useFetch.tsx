import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useFetch(url: string): [string[], boolean, boolean, string[] | null] {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let unmounted = false;

    (async function () {
      try {
        setLoading(true);
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        if (unmounted) return;
        setLoading(false);
        setData(data);
      } catch (error: string[] | any) {
        if (unmounted) return;
        if (error.response.status === 401) {
          toast("Token is obsolete", { type: "error" });
          navigate("/admin/login");
        }
        setIsError(true);
        setError(error);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [setData, setLoading, setIsError, setError]);

  return [data, loading, isError, error];
}

export default useFetch;
