import React, { createContext, useState, useContext } from 'react';

// Crea el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
    return useContext(CartContext);
};

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // *** FUNCIÓN CORREGIDA: Ahora acepta una 'quantity' como parámetro opcional. ***
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Revisa si el producto ya está en el carrito
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Si existe, aumenta la cantidad con la cantidad nueva
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                // Si no existe, agrégalo con la cantidad especificada
                return [...prevItems, { ...product, quantity: quantity }];
            }
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Función para incrementar la cantidad de un producto
    const incrementQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Función para decrementar la cantidad de un producto
    const decrementQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0) // Elimina el producto si la cantidad llega a 0
        );
    };

    // Calcula el total de artículos
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Calcula el precio total
    const cartTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cartItemCount,
        cartTotalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};