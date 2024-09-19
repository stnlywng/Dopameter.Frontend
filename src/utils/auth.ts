// utils/auth.ts
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("email");
    if(username === "demo") return false;
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      const isExpired = payload.exp * 1000 < Date.now(); // Check if token is expired
      return !isExpired;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };
  