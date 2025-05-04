import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a Context for Auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // Fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/current-user",
          {
            withCredentials: true,
          }
        );
        setRole(response.data.role); // Set role after successful fetch
        console.log("Role", role);
      } catch (error) {
        console.log("User not authenticated", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      setRole(response.data.userData.role); // Set the role after login
      return response.data;
    } catch (error) {
      throw new error();
    }
  };

  // Logout function (now using POST to clear the session cookie)
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );
      setRole(null); // Clear the role from the state after logout
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext); // Hook to access auth context values
};
