import React from "react";

const useAuth = () => {
    // make a temporary user state and return it
    const [user, setUser] = React.useState(null);
    return { user, setUser };
};

export default useAuth;
