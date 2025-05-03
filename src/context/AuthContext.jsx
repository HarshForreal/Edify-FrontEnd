import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a Context for Auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/current-user",
          {
            withCredentials: true,
          }
        );
        setRole(response.data.role);
        console.log("Role", role);
      } catch (error) {
        console.log("User not authenticated", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setRole(response.data.userData.role);
      return response.data;
    } catch (error) {
      throw new error();
    }
  };

  const logout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout", {
      withCredentials: true,
    });
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};
