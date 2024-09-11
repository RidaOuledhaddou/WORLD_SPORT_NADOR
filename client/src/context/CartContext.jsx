import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartItems, addToCart, removeFromCart, updateCartItemQuantity,clearCart } from '../utils/cartUtils';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setCart(getCartItems());
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(getCartItems());
    };

    const handleIncrementQuantity = (productId) => {
        updateCartItemQuantity(productId, 1);
        setCart(getCartItems());
    };

    const handleDecrementQuantity = (productId) => {
        updateCartItemQuantity(productId, -1);
        setCart(getCartItems());
    };
    const handleClearCart = () => {
        clearCart();
        setCart([]);
    };
    useEffect(() => {
        setCart(getCartItems());
    }, []);

    return (
        <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, handleIncrementQuantity, handleDecrementQuantity,handleClearCart }}>
            {children}
        </CartContext.Provider>
    );
};
