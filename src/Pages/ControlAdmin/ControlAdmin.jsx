import React from 'react';
import PanelControl from '../../Components/ControlAdmin/PanelControl';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductTable from '../../Components/ControlAdmin/ProductTable';
import AddProductForm from '../../Components/ControlAdmin/AddProductForm';
import { getQuotes, updateQuoteStatus } from '../../libs/axios/quotes';
import QuoteTable from '../../Components/ControlAdmin/quoteTable';

export default function ControlAdmin() {
    const [productsData, setProductsData] = useState([]);
    const [quotesData, setQuotesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error("No se encontró un token de autenticación. Por favor, inicia sesión.");
            }
            const headers = {
                'Authorization': `${token}`
            };

            const response = await axios.get('http://localhost:3000/api/v1/products', { headers });
            setProductsData(response.data);
            setActiveView('products');
        } catch (err) {
            console.error("Error al cargar los productos:", err);
            if (err.message === "No se encontró un token de autenticación. Por favor, inicia sesión.") {
                setError(err.message);
            } else if (err.response && err.response.status === 401) {
                setError("Acceso no autorizado. Tu sesión puede haber expirado. Por favor, vuelve a iniciar sesión.");
            } else if (err.response && err.response.data && err.response.data.message) {
                setError(`Error del servidor: ${err.response.data.message}`);
            } else {
                setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // --- Nueva función para obtener cotizaciones ---
    const fetchQuotes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('authToken');

            if (!token) {
                throw new Error("No se encontró un token de autenticación. Por favor, inicia sesión.");
            }
            // Tu `getQuotes` hook ya debería incluir el token en la instancia de Axios si la configuraste así.
            // Si no, puedes modificar `getQuotes` o pasar el token aquí.
            // Asumiendo que `instance` en `quotes.js` ya maneja el token:
            const { data, status } = await getQuotes(); // Llama a tu hook de Axios

            if (status === 200) {
                setQuotesData(data);
                setActiveView('quotes');
            } else {
                setError(`Error al cargar cotizaciones: Código de estado ${status}`);
            }

        } catch (err) {
            console.error("Error al cargar las cotizaciones:", err);
            let errorMessage = "No se pudieron cargar las cotizaciones. Inténtalo de nuevo más tarde.";

            if (err.message === "No se encontró un token de autenticación. Por favor, inicia sesión.") {
                errorMessage = err.message;
            } else if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMessage = "Acceso no autorizado. Tu sesión puede haber expirado o no tienes permisos. Por favor, vuelve a iniciar sesión.";
                } else if (err.response.data && err.response.data.message) {
                    errorMessage = `Error del servidor: ${err.response.data.message}`;
                }
            } else if (err.request) {
                errorMessage = "No se pudo conectar con el servidor para obtener cotizaciones. Verifica tu conexión.";
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleMarkQuoteAsReviewed = useCallback(async (quoteId) => {
        setLoading(true);
        setError(null);
        try {
            // Enviamos el nuevo estado como "reviewed"
            const { data, status } = await updateQuoteStatus(quoteId, "reviewed");

            if (status === 200) {
                // Actualiza el estado de quotesData para reflejar el cambio
                setQuotesData(prevQuotes =>
                    prevQuotes.map(quote =>
                        quote.id === quoteId ? { ...quote, status: "reviewed" } : quote // Actualiza el campo 'status'
                    )
                );
                alert('Cotización marcada como revisada con éxito.');
            } else {
                setError(`Error al actualizar cotización: Código de estado ${status}`);
            }
        } catch (err) {
            console.error("Error al marcar cotización como revisada:", err);
            let errorMessage = "Hubo un error al marcar la cotización como revisada.";
            if (err.response) {
                errorMessage = err.response.data.message || errorMessage;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleShowProductsClick = () => {
        setActiveView('products');
        fetchProducts();
    };

    // Función para manejar el clic en "Adicionar Producto" 
    const handleAddProductClick = () => {
        setActiveView('addProductForm'); // Por ejemplo, mostrar un formulario
        setProductsData([]);
        setQuotesData([]);
    };

    // Función para manejar el clic en "Mostrar Ventas" 
    const handleShowSalesClick = () => {
        setActiveView('sales'); // Mostrar vista de ventas
        setProductsData([]);
        setQuotesData([]);
        // Aquí podrías llamar a una función fetchSales()
    };

    // Función para manejar el clic en "Mostrar Cotizaciones" 
    const handleShowQuotesClick = () => {
        setActiveView('quotes'); // Mostrar vista de cotizaciones
        setProductsData([]);
        fetchQuotes();
        // Aquí podrías llamar a una función fetchQuotes()
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
                <p className="text-gray-700 text-lg">Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center">
                <p className="text-red-600 text-lg text-center p-4 rounded-md bg-red-100 border border-red-300 mx-auto max-w-sm">
                    {error}
                </p>
            </div>
        );
    }


    const renderContentView = () => {
        switch (activeView) {
            case 'products':
                return (
                    <div className='w-full p-4 overflow-y-auto'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Administración de Productos</h2>
                        <ProductTable products={productsData} />
                    </div>
                );
            case 'addProductForm':
                return (
                    <div className='w-full p-4'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Formulario para Adicionar Producto</h2>
                        <AddProductForm />
                        <p className="text-gray-600">Formulario para agregar un nuevo producto...</p>
                    </div>
                );
            case 'sales':
                return (
                    <div className='w-full p-4'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Ventas</h2>
                        <p className="text-gray-600">Aquí se mostrarán las ventas...</p>
                    </div>
                );
            case 'quotes':
                return (
                    <div className='w-full p-4'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Cotizaciones</h2>
                        <QuoteTable quotes={quotesData} onMarkAsReviewed={handleMarkQuoteAsReviewed} /> {/* Pasa las cotizaciones al nuevo componente */}
                    </div>
                );
            default:
                return (
                    <div className='w-full p-4 text-center text-gray-600'>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bienvenido al Panel de Administración</h2>
                        <p>Selecciona una opción del menú lateral para comenzar.</p>
                    </div>
                );
        }
    };

    return (
        <>
            <div className='pt-30'>ControlAdmin</div>
            <div className='flex'>
                <div className='border-1 w-[350px]  flex justify-center'>
                    <PanelControl
                        onShowProducts={handleShowProductsClick}
                        onAddProduct={handleAddProductClick}
                        onShowSales={handleShowSalesClick}
                        onShowQuotes={handleShowQuotesClick}

                    />
                </div>
                <div className='w-full'>
                    {renderContentView()}
                </div>
            </div>
        </>
    );
}