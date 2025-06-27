// src/components/PrivateRoutes.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router'; // Importa Outlet y Navigate

const PrivateRoutes = () => {
    // Verifica si el token existe en localStorage
    const isAuthenticated = localStorage.getItem('authToken');

    // Si isAuthenticated es verdadero (hay token), renderiza las rutas hijas (Outlet).
    // Si no, redirige al usuario a la página de login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/26062025" />;
};

export default PrivateRoutes;