import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

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
        setRole(response.data.role);
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
      console.log("Error", error);
    }
  };

  const googleLogin = async (token, inputRole) => {
    let userRole = "";
    if (typeof inputRole === "object" && inputRole !== null) {
      userRole = inputRole.role || "";
    } else {
      userRole = inputRole || "";
    }

    console.log("User Role =", userRole);
    console.log("GoogleLogin function Token and Role", token, userRole);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { token, role: userRole },
        {
          withCredentials: true,
        }
      );

      console.log("Response from API:", response.data);
      const newRole = response.data.userData.role;
      console.log("Setting role to:", newRole);

      setRole(newRole);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setRole(null);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ role, loading, login, googleLogin, logout }}>
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
