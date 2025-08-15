import React, { useState, useEffect } from 'react';
import { useAuth } from '../../App'; // Ruta de importación corregida
import { useNavigate } from 'react-router';
import { doc, getFirestore, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

const UserProfile = () => {
    // Obtenemos el usuario actual y la función de cierre de sesión desde el contexto
    const { currentUser, userProfile, handleLogout } = useAuth();
    const navigate = useNavigate();

    // Estados para el modo de edición y los datos del formulario
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phoneNumber: '',
    });

    // Efecto para inicializar el formulario con los datos del usuario
    useEffect(() => {
        if (currentUser && userProfile) {
            setFormData({
                // Inicializamos los campos con los datos de Firestore
                name: userProfile.name || '',
                lastName: userProfile.lastName || '',
                // Corregido para leer del campo 'phone' de Firestore
                phoneNumber: userProfile.phone || '',
            });
        }
    }, [currentUser, userProfile]);

    // Función para manejar el clic en el botón de cerrar sesión
    const handleSignOut = async () => {
        try {
            await handleLogout();
            // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión desde el perfil:", error);
        }
    };

    // Función para manejar los cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para guardar los cambios en el perfil
    const handleSaveChanges = async () => {
        if (!currentUser) return;

        try {
            // Concatenar nombre y apellido para actualizar displayName en Firebase Auth
            const combinedDisplayName = `${formData.name} ${formData.lastName}`.trim();
            await updateProfile(currentUser, {
                displayName: combinedDisplayName,
            });

            // Actualizar el documento en Firestore con campos separados
            const auth = getAuth();
            const db = getFirestore();
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const userProfileRef = doc(db, `/artifacts/${appId}/users/${currentUser.uid}/profile`, currentUser.uid);

            await setDoc(userProfileRef, {
                ...userProfile,
                name: formData.name,
                lastName: formData.lastName,
                phone: formData.phoneNumber,
                lastUpdated: new Date().toISOString(),
            }, { merge: true });

            console.log('Perfil actualizado exitosamente.');
            setIsEditing(false); // Volver al modo de visualización
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            // Revertir a la vista de visualización en caso de error
            setIsEditing(false);
        }
    };

    // Si el usuario no está autenticado, no se muestra el perfil
    if (!currentUser) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#F8F5EE]">
                <p className="text-gray-700 text-lg">Debes iniciar sesión para ver esta página.</p>
            </div>
        );
    }

    // Se muestran los datos del perfil del usuario en modo de visualización
    if (!isEditing) {
        const fullName = `${userProfile?.name || ''} ${userProfile?.lastName || ''}`.trim() || 'N/A';
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 transform transition-transform duration-300 hover:scale-105">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Mi Perfil</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-500">Nombre Completo</h3>
                            <p className="text-lg font-medium text-gray-900">{fullName}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-500">Correo Electrónico</h3>
                            <p className="text-lg font-medium text-gray-900">{currentUser?.email || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-500">UID</h3>
                            <p className="text-lg font-medium text-gray-900 break-words">{currentUser.uid}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-500">Teléfono</h3>
                            <p className="text-lg font-medium text-gray-900">{userProfile?.phone || 'N/A'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Editar Perfil
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }

    // Vista de formulario para editar el perfil
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-6 transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Editar Perfil</h2>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-500">Nombre</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-500">Apellido</span>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-500">Correo Electrónico</span>
                        <input
                            type="email"
                            value={currentUser?.email || ''}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-500">Teléfono</span>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-500">UID</span>
                        <input
                            type="text"
                            value={currentUser?.uid || ''}
                            readOnly
                            className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
                        />
                    </label>
                </div>
                <div className="flex justify-between space-x-4">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSaveChanges}
                        className="flex-1 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;