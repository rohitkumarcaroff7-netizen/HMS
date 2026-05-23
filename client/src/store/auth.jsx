import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState("");
  const [role, setRole] = useState(localStorage.getItem("role") || null)
  const [userId, setUserId] = useState(localStorage.getItem("id") || null)

  const storeTokenInLS = (serverToken,role,id) => {
    setToken(serverToken);
    setRole(role)
    setUserId(id)
    localStorage.setItem("token", serverToken)
    localStorage.setItem("role", role)
    localStorage.setItem("id",id)
  };

  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token || !userId) {
        setUser("");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/auth/getProfile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [token, userId]);

  //logout token
  const LogoutUser = () => {
    setToken("");
    setRole("")
    setUserId("")
    setUser("")
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    localStorage.removeItem("id")
  };


  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn, storeTokenInLS, LogoutUser, user, role, setUser, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// use auth
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of authprovider.");
  }
  return authContextValue;
};
