// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";

// // Create a Context for Auth
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState(null);

//   // Fetch user on load
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/current-user",
//           {
//             withCredentials: true,
//           }
//         );
//         setRole(response.data.role); // Set role after successful fetch
//         console.log("Role", role);
//       } catch (error) {
//         console.log("User not authenticated", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Login function
//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password },
//         {
//           withCredentials: true,
//         }
//       );
//       setRole(response.data.userData.role); // Set the role after login
//       return response.data;
//     } catch (error) {
//       throw new error();
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       setRole(null);
//     } catch (error) {
//       console.error("Logout error", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ role, login, logout }}>
//       {!loading && children}{" "}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// i

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a Context for Auth
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
        console.log("Role fetched", response.data.role); // Debug log
      } catch (error) {
        console.log("User not authenticated", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUser();
  }, []);

  // Regular login function
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
      console.log("Error", error);
    }
  };

  const googleLogin = async (token, inputRole) => {
    // Extract the role value properly
    let userRole = "";

    if (typeof inputRole === "object" && inputRole !== null) {
      // Handle case where inputRole is an object with a role property
      userRole = inputRole.role || "";
    } else {
      // Handle case where inputRole is directly a string
      userRole = inputRole || "";
    }

    console.log("User Role =", userRole);
    console.log("GoogleLogin function Token and Role", token, userRole);

    try {
      // The API expects 'role' not 'userRole' in the request body
      const response = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { token, role: userRole }, // Changed from userRole to role
        {
          withCredentials: true,
        }
      );

      console.log("Response from API:", response.data);

      // Make sure we're setting the role correctly from the response
      const newRole = response.data.userData.role;
      console.log("Setting role to:", newRole);

      setRole(newRole);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      throw error; // Rethrow the error so it can be caught by the calling component
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
