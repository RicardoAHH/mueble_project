import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: { 'Content-Type': 'application/json' },

});

// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken'); // Obtén el token guardado
//         if (token) {
//             // Si existe un token, añádelo al encabezado 'Authorization'
//             // El formato 'Bearer TU_TOKEN' es estándar para JWT
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config; // Devuelve la configuración modificada
//     },
//     (error) => {
//         return Promise.reject(error); // Maneja errores de la solicitud
//     }
// );

// instance.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     // Esta lógica de redirección es un buen comienzo para tokens inválidos/expirados
//     if (error.response && error.response.status === 401 && window.location.pathname !== '/login') { // Cambiado a '/login'
//         localStorage.removeItem('authToken'); // Borra el token inválido
//         window.location.href = '/login'; // Redirige al login
//     }
//     return Promise.reject(error);
// });


// export default instance;

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.status === 401 && window.location.pathname !== '/') {
        window.location.href = '/';
    }

    return Promise.reject(error);
});


export default instance;

