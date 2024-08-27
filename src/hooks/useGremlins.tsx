import { useEffect, useState } from "react";
import { Gremlin } from "../types/Gremlin";
import GremlinService from "../api/gremlinService";
import { CanceledError } from "axios";

const useGremlins = () => {
  const [gremlins, setGremlins] = useState<Gremlin[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const userID = Number(localStorage.getItem("userID"));

  useEffect(() => {
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
  }, []);

  return { gremlins, error, isLoading, setGremlins, setError };
};

export default useGremlins;
