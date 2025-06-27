// src/libs/axios/products.js (o un archivo similar para tus peticiones de productos)
import { instance } from './index'; // Asegúrate de importar tu instancia configurada de Axios

/**
 * Realiza una petición GET para obtener todos los productos.
 * Utiliza la instancia de Axios configurada (que ya incluye el token JWT si está presente).
 *
 * @returns {Promise<Array>} Una promesa que resuelve con un array de productos si la petición es exitosa.
 * @throws {Error} Lanza un error si la petición falla.
 */
export async function getProducts() {
    try {
        const response = await instance.get('/products');
        // Si tu API envuelve los datos en una propiedad 'data', accede a ella así:
        return response.data;
        // Si tu API devuelve el array directamente en la raíz de la respuesta, simplemente:
        // return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        // Puedes lanzar el error de nuevo para que el componente que llama lo maneje
        throw error;
    }
}