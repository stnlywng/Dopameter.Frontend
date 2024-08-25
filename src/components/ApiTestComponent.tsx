import { useEffect } from "react";
import useGremlins from "../hooks/useGremlins";
import { useUser } from "../state-management/contexts/userContext";

const ApiTestComponent = () => {
    const { gremlins, error, isLoading, setGremlins, setError } = useGremlins();

    // useEffect(() => {
    //     const { request, cancel } = GremlinService.getGremlinsByUser(10);
    //     request.then((res) => setGremlins(res.data));
    // }, []);

    return (
        <>
            <ul>
                {gremlins.map((gremlin) => (
                    <li key={gremlin.gremlinID}>{gremlin.name}</li>
                ))}
            </ul>
        </>
    );
};

export default ApiTestComponent;
