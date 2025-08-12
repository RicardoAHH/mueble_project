// src/Pages/UserProfile.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile, changeUserPassword } from '../../libs/axios/user';

export default function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [profileFormData, setProfileFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: ''
    });
    const [passwordFormData, setPasswordFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isEditingProfile, setIsEditingProfile] = useState(false); // Para alternar entre vista y edición del perfil
    const [showPasswordChange, setShowPasswordChange] = useState(false); // Para mostrar/ocultar el formulario de cambio de contraseña

    // Función para obtener los datos del usuario
    const getUserProfile = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchUserProfile();
            setUserData(data);
            // Inicializar el formulario de perfil con los datos actuales del usuario
            setProfileFormData({
                name: data.name || '',
                lastname: data.lastname || '',
                email: data.email || '',
                phone: data.phone || ''
            });
        } catch (err) {
            setError('Error al cargar el perfil. Por favor, inténtalo de nuevo.');
            console.error('Error fetching user profile:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    // Manejadores de cambio para los formularios
    const handleProfileChange = (e) => {
        setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordFormData({ ...passwordFormData, [e.target.name]: e.target.value });
    };

    // Manejador para actualizar el perfil
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            await updateUserProfile(profileFormData);
            setMessage('Perfil actualizado exitosamente.');
            setIsEditingProfile(false); // Salir del modo de edición
            // Volver a cargar el perfil para asegurar que los datos mostrados estén actualizados
            await getUserProfile();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar el perfil.');
            console.error('Error updating profile:', err);
        } finally {
            setLoading(false);
        }
    };

    // Manejador para cambiar la contraseña
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
            setError('La nueva contraseña y la confirmación no coinciden.');
            setLoading(false);
            return;
        }

        try {
            await changeUserPassword({
                oldPassword: passwordFormData.oldPassword,
                newPassword: passwordFormData.newPassword
            });
            setMessage('Contraseña cambiada exitosamente.');
            setPasswordFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' }); // Limpiar formulario
            setShowPasswordChange(false); // Ocultar formulario de cambio de contraseña
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cambiar la contraseña. Verifica tu contraseña actual.');
            console.error('Error changing password:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F5EE]">
                <div className="text-gray-700 text-lg">Cargando perfil...</div>
            </div>
        );
    }

    if (error && !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F5EE]">
                <div className="text-red-700 text-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center p-4 pt-20"> {/* pt-20 para dejar espacio al header fijo */}
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Mi Perfil</h2>

                {message && (
                    <div className="p-3 mb-4 rounded-md text-center bg-green-100 text-green-700">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="p-3 mb-4 rounded-md text-center bg-red-100 text-red-700">
                        {error}
                    </div>
                )}

                {/* Sección de visualización del perfil */}
                {!isEditingProfile ? (
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-700">Información Personal</h3>
                            <button
                                onClick={() => setIsEditingProfile(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Editar Perfil
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><span className="font-medium">Nombre:</span> {userData?.name}</p>
                            <p><span className="font-medium">Apellido:</span> {userData?.lastname}</p>
                            <p><span className="font-medium">Email:</span> {userData?.email}</p>
                            <p><span className="font-medium">Teléfono:</span> {userData?.phone || 'N/A'}</p>
                            <p><span className="font-medium">Rol:</span> {userData?.role?.name || 'N/A'}</p>
                        </div>
                    </div>
                ) : (
                    /* Formulario de edición de perfil */
                    <form onSubmit={handleUpdateProfile} className="space-y-4 mb-6 p-4 border border-gray-200 rounded-md">
                        <h3 className="text-xl font-semibold text-gray-700">Editar Información Personal</h3>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profileFormData.name}
                                onChange={handleProfileChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellido:</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={profileFormData.lastname}
                                onChange={handleProfileChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profileFormData.email}
                                onChange={handleProfileChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={profileFormData.phone}
                                onChange={handleProfileChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditingProfile(false);
                                    // Opcional: resetear profileFormData a los userData originales si se cancela
                                    setProfileFormData({
                                        name: userData?.name || '',
                                        lastname: userData?.lastname || '',
                                        email: userData?.email || '',
                                        phone: userData?.phone || ''
                                    });
                                    setError(''); // Limpiar errores al cancelar
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Sección de cambio de contraseña */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Cambiar Contraseña</h3>
                        <button
                            onClick={() => setShowPasswordChange(!showPasswordChange)}
                            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300"
                        >
                            {showPasswordChange ? 'Ocultar Formulario' : 'Cambiar Contraseña'}
                        </button>
                    </div>

                    {showPasswordChange && (
                        <form onSubmit={handleChangePassword} className="space-y-4 p-4 border border-gray-200 rounded-md">
                            <div>
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Contraseña Actual:</label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={passwordFormData.oldPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordFormData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirmar Nueva Contraseña:</label>
                                <input
                                    type="password"
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    value={passwordFormData.confirmNewPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
