import instance from "."


export async function getProductID(productId) {
    try {
        const { data, status } = await instance.get(`/products/${productId}`)
        return { data, status }
    } catch (error) {
        throw error
    }
}