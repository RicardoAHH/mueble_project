// libs/axios/user.js
import { instance as api } from './index'; // Importa la instancia ya configurada de Axios

// NOTA IMPORTANTE: La URL base ya está configurada en libs/axios/index.js
// y el interceptor para añadir el token también.
// Por lo tanto, no necesitamos redefinir baseURL ni el interceptor aquí.
// Asegúrate de que la baseURL en libs/axios/index.js sea correcta
// (ej: 'http://localhost:3000/api/v1') para que las rutas '/users/profile', etc.,
// se construyan correctamente.

/**
 * Fetches the authenticated user's profile.
 * @returns {Promise<Object>} User profile data.
 */
export const fetchUserProfile = async () => {
    try {
        // La instancia 'api' ya tiene el token añadido por el interceptor de index.js
        const response = await api.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        throw error;
    }
};

/**
 * Updates the authenticated user's profile.
 * Assumes the backend uses req.auth.id to identify the user for PUT /users/.
 * @param {Object} userData - Data to update (name, lastname, email, phone).
 * @returns {Promise<Object>} Response data from the update.
 */
export const updateUserProfile = async (userData) => {
    try {
        // La instancia 'api' ya tiene el token añadido
        const response = await api.put('/users/', userData); // Asumiendo que esta ruta actualiza el perfil del usuario autenticado
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario:', error);
        throw error;
    }
};

/**
 * Changes the authenticated user's password.
 * @param {Object} passwordData - oldPassword and newPassword.
 * @returns {Promise<Object>} Response data from the password change.
 */
export const changeUserPassword = async (passwordData) => {
    try {
        // La instancia 'api' ya tiene el token añadido
        const response = await api.patch('/users/change-password', passwordData);
        return response.data;
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        throw error;
    }
};
