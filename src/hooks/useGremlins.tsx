import { useEffect, useState } from "react";
import { Gremlin } from "../types/Gremlin";
import GremlinService from "../api/gremlinService";
import { CanceledError } from "axios";

const useGremlins = () => {
  const [gremlins, setGremlins] = useState<Gremlin[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const userID = Number(localStorage.getItem("userID"));

  const updateGremlins = () => {
    setLoading(true);
    const { request, cancel } = GremlinService.getGremlinsByUser(userID);
    request
      .then((res) => {
        setGremlins(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  };

  useEffect(() => {
    updateGremlins();
  }, []);

  return {
    gremlins,
    error,
    isLoading,
    updateGremlins, // Expose this so you can call it manually to trigger an update
    setGremlins,
    setError,
  };
};

export default useGremlins;
