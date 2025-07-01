// src/libs/axios/update.js
import instance from './index'; // Asumo que tu instancia de Axios configurada está en './index'

export async function updateProduct(productId, productData) {
    try {
        // La instancia ya debería incluir el token por el interceptor
        const { data, status } = await instance.put(`/products/${productId}`, productData);
        return { data, status };
    } catch (error) {
        throw error;
    }
}