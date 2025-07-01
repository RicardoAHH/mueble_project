import React, { useState } from 'react';

const ProductGallery = ({ images }) => {

    const [mainImage, setMainImage] = useState(images[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para cambiar la imagen principal al hacer clic en una miniatura
    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    // Función para abrir la vista grande de la imagen principal
    const handleMainImageClick = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar la vista grande (modal)
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="product-gallery-container p-4">
            {/* Área de la foto principal */}
            <div className="main-image-area mb-4">
                <img
                    src={mainImage ? mainImage : images[0]}
                    alt="Producto principal"
                    className="w-full bg-white h-96 object-contain cursor-pointer rounded-xl shadow-md"
                    onClick={handleMainImageClick}
                />
            </div>

            {/* Miniaturas de las fotos */}
            <div className="thumbnails-area flex justify-center gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        // Usa un tamaño fijo para las miniaturas para consistencia
                        className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer
              ${mainImage === image ? 'border-blue-500' : 'border-gray-300'}`}
                        onClick={() => handleThumbnailClick(image)}
                    />
                ))}
            </div>

            {/* Modal para la vista grande de la imagen */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={handleCloseModal} // Cierra el modal al hacer clic fuera de la imagen
                >
                    <div className="relative " onClick={(e) => e.stopPropagation()}> {/* Evita que el click en la imagen cierre el modal */}
                        <img
                            src={mainImage}
                            alt="Vista detallada del producto"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
                        />
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-2 text-lg font-bold leading-none"
                            aria-label="Cerrar"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductGallery;