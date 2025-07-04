import instance from "."
export async function sendQuote(body) {
    try {
        const { data, status } = await instance.post('/quotes', body)
        return { data, status }
    } catch (error) {
        throw error
    }
}
export async function getQuotes() {
    try {
        const { data, status } = await instance.get('/quotes')
        return { data, status }
    } catch (error) {
        throw error
    }
}
export async function updateQuoteStatus(id, newStatus) { // newStatus será 'reviewed'
    try {
        // Enviar el nuevo estado como un objeto { status: "reviewed" }
        const { data, status } = await instance.put(`/quotes/${id}`, { status: newStatus });
        return { data, status };
    } catch (error) {
        if (error.response) {
            console.error('Error de respuesta del servidor (updateQuoteStatus):', error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor (updateQuoteStatus):', error.request);
        } else {
            console.error('Error al configurar la solicitud (updateQuoteStatus):', error.message);
        }
        throw error;
    }
}