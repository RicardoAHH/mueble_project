// src/pages/ProductDetailCard/index.jsx (o la ruta real de tu componente)
import { useParams } from "react-router";
import ProductGallery from "../../Components/ProductDetailCard/ProductGallery";
import ProductInfo from "../../Components/ProductDetailCard/ProductInfo";
import Cotizaciones from "../../Components/ProductDetailCard/Cotizaciones";
import CustomerOpinions from "../../Components/ProductDetailCard/Ratings";
import Sugest from "../../Components/ProductDetailCard/Sugest";
import { getProductID } from "../../libs/axios/getProductID";
import { useEffect, useState } from "react";

export default function ProductDetailCard() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Nuevo estado de carga
    const [error, setError] = useState(null);   // Nuevo estado de error

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Inicia la carga
            setError(null);   // Limpia errores anteriores
            try {
                const response = await getProductID(id);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("No se pudo cargar la información del producto."); // Mensaje de error para el usuario
            } finally {
                setLoading(false); // Finaliza la carga
            }
        }

        fetchProduct();
    }, [id]);

    // Renderizado condicional si está cargando o hay un error
    if (loading) {
        return (
            <div className="pt-20 bg-[#F8F5EE] min-h-screen flex items-center justify-center">
                <p>Cargando detalles del producto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-20 bg-[#F8F5EE] min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    // Asegúrate de que 'data' y 'images' existan antes de acceder a ellas
    // También verifica que `category_id` exista
    const images = data?.images || [];
    const currentProductId = data?.id; // Para excluir el producto actual de las sugerencias
    const currentProductCategoryId = data?.category_id; // <-- Esta es la clave



    return (
        <>
            <div className='pt-20 bg-[#F8F5EE] min-h-screen'>
                <h1 className="text-3xl font-bold text-center py-4">{data.name || "Detalle del Producto"}</h1>
                <div className="w-full flex max-lg:flex-col justify-center">
                    <div className="lg:w-[40%]">
                        <ProductGallery images={images} />
                    </div>
                    <div className="lg:w-[50%] flex justify-center items-center">
                        {/* <-- ESTE ES EL CAMBIO CLAVE AQUÍ: Pasas el objeto 'data' */}
                        <ProductInfo product={data} />
                    </div>
                </div>
                <div className="flex justify-center p-10">
                    <Cotizaciones />
                </div>
                <div>
                    <CustomerOpinions />
                </div>
                {currentProductCategoryId && (
                    <Sugest
                        currentProductCategoryId={currentProductCategoryId}
                        currentProductId={currentProductId}
                    />
                )}
            </div>
        </>
    );
}