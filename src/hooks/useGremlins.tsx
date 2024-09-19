import { useEffect, useState } from "react";
import { Gremlin } from "../types/Gremlin";
import GremlinService from "../api/gremlinService";
import { CanceledError } from "axios";

const useGremlins = () => {
  const [gremlins, setGremlins] = useState<Gremlin[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const updateGremlins = () => {
    setLoading(true);
    console.log("updateGremlins called");
    const { request, cancel } = GremlinService.getGremlinsByUser();
    request
      .then((res) => {
        console.log(res.data);
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
