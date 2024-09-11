export const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
};

export const addToCart = (product) => {
    const cart = getCartItems();
    const existingProduct = cart.find(item => item.product_id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ product_id: product.id, quantity: 1, image_url: product.main_image_url });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
    const cart = getCartItems().filter(item => item.product_id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
};
export const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
};

export const updateCartItemQuantity = (productId, amount) => {
    const cart = getCartItems();
    const product = cart.find(item => item.product_id === productId);
    if (product) {
        product.quantity += amount;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
};
