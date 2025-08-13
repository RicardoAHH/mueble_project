// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // Si hay un usuario, permite el acceso a la ruta
    // Si no, redirige a la página de login
    return currentUser ? children : <Navigate to="/26062025" />;
};

export default PrivateRoute;