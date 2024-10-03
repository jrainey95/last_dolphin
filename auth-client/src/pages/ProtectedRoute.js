// src/components/ProtectedRoute.js
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAccount } from "../api/auth"; // Import the API function to check user authentication

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getAccount(); // Try to fetch account info
        setIsAuthenticated(true); // If successful, set authenticated
      } catch {
        setIsAuthenticated(false); // If failed, set not authenticated
      }
    };

    checkAuth();
  }, []);

  // Handle the loading state or redirect
  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
