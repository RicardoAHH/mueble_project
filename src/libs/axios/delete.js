import instance from "."


export async function deleteProduct(productId) {
    try {
        const { data, status } = await instance.delete(`/products/${productId}`)
        return { data, status }
    } catch (error) {
        throw error
    }
}