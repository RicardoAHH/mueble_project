// src/components/PrivateRoutes.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router'; // Asegúrate de que estás usando react-router-dom

const PrivateRoutes = () => {
    // Verifica si el token existe en localStorage
    const isAuthenticated = localStorage.getItem('authToken');
    // Obtiene el role_id del usuario desde localStorage
    const userRole = localStorage.getItem('userRole');

    // Define el role_id de administrador (asumiendo que es 1)
    const ADMIN_ROLE_ID = '1'; // Lo comparamos como string porque localStorage almacena strings

    // Si hay un token Y el role_id es el de administrador, permite el acceso.
    // De lo contrario, redirige al usuario a la página de login de admin.
    return isAuthenticated && userRole === ADMIN_ROLE_ID ? <Outlet /> : <Navigate to="/26062025" />;
};

export default PrivateRoutes;
