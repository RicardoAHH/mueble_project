import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Asegúrate de que la ruta a tu archivo de configuración de Firebase sea correcta

/**
 * Obtiene los detalles de un producto de Firestore por su ID de documento.
 * @param {string} productId - El ID del documento del producto.
 * @returns {Promise<{data: object | null, error: string | null}>} Un objeto con los datos del producto o un mensaje de error.
 */
export async function getProductID(productId) {
    try {
        // Obtenemos una referencia al documento del producto en la colección 'products'
        const productRef = doc(db, 'products', productId);
        // Hacemos una solicitud para obtener el documento
        const docSnap = await getDoc(productRef);

        // Si el documento existe, devolvemos sus datos
        if (docSnap.exists()) {
            return {
                data: {
                    id: docSnap.id,
                    ...docSnap.data()
                },
                status: 200 // Simula un estado HTTP de éxito
            };
        } else {
            // Si el documento no existe, devolvemos un error
            console.error("No se encontró el documento del producto con ID:", productId);
            return { data: null, status: 404, error: "Producto no encontrado" };
        }
    } catch (error) {
        console.error("Error al obtener el documento del producto:", error);
        return { data: null, status: 500, error: "Error interno del servidor" };
    }
}