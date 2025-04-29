// src/HOC/withAuth.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

// HOC to check authentication and role-based access
const withAuth = (Component, allowedRoles = []) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toastShown, setToastShown] = useState(false); // To prevent multiple toasts

    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          // Fetch the current user role from backend
          const response = await axios.get(
            "http://localhost:5000/api/auth/current-user",
            {
              withCredentials: true, // Ensure cookies are sent
            }
          );

          if (response.data && response.data.role) {
            setUserRole(response.data.role); // Set the role from the response
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      };

      fetchUserRole();
    }, []);

    // Show loading message while fetching the user data
    if (loading) {
      return <div>Loading...</div>;
    }

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    // Check if the user's role is included in allowed roles
    if (!allowedRoles.includes(userRole)) {
      if (!toastShown) {
        toast.error("You don't have permission to access this page.", {
          autoClose: 3000, // Auto close the toast after 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setToastShown(true);
      }
      // Instead of navigating, return null to keep the user on the current page
      return null;
    }

    // Render the component if authenticated and role is authorized
    return <Component {...props} />;
  };
};

export default withAuth;
