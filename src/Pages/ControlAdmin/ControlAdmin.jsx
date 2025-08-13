import React, { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------
// Importamos las funciones necesarias de Firestore
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Asegúrate de la ruta correcta
// ----------------------------------------------------

// Importaciones de tus componentes
import PanelControl from '../../Components/ControlAdmin/PanelControl';
import ProductTable from '../../Components/ControlAdmin/ProductTable';
import AddProductForm from '../../Components/ControlAdmin/AddProductForm';
import QuoteTable from '../../Components/ControlAdmin/quoteTable';

export default function ControlAdmin() {
    const [productsData, setProductsData] = useState([]);
    const [quotesData, setQuotesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState('products'); // Vista inicial por defecto

    // --- Adaptación para obtener productos con Firestore ---
    const fetchProducts = useCallback(() => {
        setLoading(true);
        setError(null);

        const productsRef = collection(db, 'products');

        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
            const productsList = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convierte las marcas de tiempo a un objeto Date
                    created_at: data.created_at ? data.created_at.toDate() : null,
                    updated_at: data.updated_at ? data.updated_at.toDate() : null,
                };
            });
            setProductsData(productsList);
            setLoading(false);
        }, (err) => {
            console.error("Error al cargar los productos:", err);
            setError("No se pudieron cargar los productos. Inténtalo de nuevo más tarde.");
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // --- Adaptación para obtener cotizaciones con Firestore ---
    const fetchQuotes = useCallback(() => {
        setLoading(true);
        setError(null);

        const quotesRef = collection(db, 'quotes');

        const unsubscribe = onSnapshot(quotesRef, (snapshot) => {
            const quotesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Asegurarse de que createdAt es un objeto Date
                createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
            }));

            // Ordenar por fecha de creación (las más nuevas primero)
            quotesList.sort((a, b) => b.createdAt - a.createdAt);

            setQuotesData(quotesList);
            setLoading(false);
        }, (err) => {
            console.error("Error al cargar las cotizaciones:", err);
            setError("No se pudieron cargar las cotizaciones. Inténtalo de nuevo más tarde.");
            setLoading(false);
        });

        // Retorna la función de desuscripción para limpiar el listener
        return unsubscribe;
    }, []);


    // --- Lógica para marcar como revisado (adaptada para Firestore) ---
    const handleMarkQuoteAsReviewed = useCallback(async (quoteId) => {
        try {
            // Referencia al documento de la cotización
            const quoteRef = doc(db, 'quotes', quoteId);
            // Actualiza el campo 'status' del documento
            await updateDoc(quoteRef, { status: "revisado" });
            console.log(`Cotización ${quoteId} marcada como revisada.`);
        } catch (error) {
            console.error('Error al actualizar la cotización:', error);
            setError("Hubo un error al actualizar la cotización.");
        }
    }, []);

    const handleShowProductsClick = () => {
        setActiveView('products');
    };

    const handleAddProductClick = () => {
        setActiveView('addProductForm');
    };

    const handleShowSalesClick = () => {
        setActiveView('sales');
    };

    const handleShowQuotesClick = () => {
        setActiveView('quotes');
    };

    // Usamos useEffect para cargar los datos y limpiar los listeners
    useEffect(() => {
        let unsubscribeProducts;
        let unsubscribeQuotes;

        // Carga los productos al inicio
        if (activeView === 'products') {
            unsubscribeProducts = fetchProducts();
        }

        // Carga las cotizaciones
        if (activeView === 'quotes') {
            unsubscribeQuotes = fetchQuotes();
        }

        // Retorna una función de limpieza para desuscribirse de ambos listeners
        return () => {
            if (unsubscribeProducts) unsubscribeProducts();
            if (unsubscribeQuotes) unsubscribeQuotes();
        };
    }, [activeView, fetchProducts, fetchQuotes]);


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
                        <QuoteTable quotes={quotesData} onMarkAsReviewed={handleMarkQuoteAsReviewed} />
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