// Importa las dependencias necesarias.
// Necesitarás instalar la librería de Mercado Pago: npm install mercadopago
const mercadopago = require('mercadopago');

// Configura las credenciales de Mercado Pago usando una variable de entorno.
// Esto es crucial para la seguridad.
// En Vercel, configúrala como MERCADOPAGO_ACCESS_TOKEN.
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

// La función principal que Vercel ejecutará
export default async function createPreference(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { cartItems, shippingInfo } = req.body;

        // Validar que el carrito no esté vacío
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'El carrito de compras está vacío.' });
        }

        // Crear el objeto de preferencia para Mercado Pago
        const preference = {
            items: cartItems.map(item => ({
                title: item.name,
                unit_price: item.price,
                quantity: item.quantity,
            })),
            payer: {
                name: shippingInfo.name,
                email: shippingInfo.email,
            },
            // URLs de redirección al finalizar el pago.
            // Reemplaza con tus URLs. Vercel te dará una URL pública.
            back_urls: {
                success: 'https://tu-sitio.com/pago-exitoso',
                failure: 'https://tu-sitio.com/pago-fallido',
                pending: 'https://tu-sitio.com/pago-pendiente'
            },
            auto_return: 'approved'
        };

        const response = await mercadopago.preferences.create(preference);

        // Retorna la URL de redirección al frontend
        res.status(200).json({ redirectUrl: response.body.init_point });

    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        res.status(500).json({ error: 'Error interno del servidor al procesar el pago.' });
    }
}