import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthApi, logoutApi } from "../api/AuthApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAutheticated, setIsAutheticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthApi();
        setIsAutheticated(true);
        setUser(res.data.user);
        console.log(res.data);
        
      } catch (error) {
        setIsAutheticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await logoutApi();
      alert(res.data.message);
      setUser(null);
      setIsAutheticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAutheticated,
        setIsAutheticated,
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
