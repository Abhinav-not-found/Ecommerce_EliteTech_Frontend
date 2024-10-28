import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// Component to protect routes based on authentication
export const PrivateRoute = ({ element, redirectPath = '/' }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // Render the protected route only if the user is authenticated
    return isAuthenticated ? element : <Navigate to={redirectPath} replace />;
};

// Component for routes that should not be accessible if logged in
export const PublicRoute = ({ element, redirectPath = '/' }) => {
    const { isAuthenticated } = useContext(AuthContext);

    // Render the public route if the user is NOT authenticated
    return !isAuthenticated ? element : <Navigate to={redirectPath} replace />;
};
