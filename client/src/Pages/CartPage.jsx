import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import Navbar from '../Components/common/Navbar';

const fetchProductDetails = async (productId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/product/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
};




const styles = {
    cart: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      boxShadow: '0 8px 17px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
    tCenter: {
      textAlign: 'center',
    },
    cartList: {
      marginTop: '20px',
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #ccc',
    },
    imgContainer: {
      width: '100px',
    },
    img: {
      width: '100%',
      height: 'auto',
      borderRadius: '4px',
    },
    cartItemDetails: {
      padding: '0 10px',
    },
    cartItemTitle: {
      marginBottom: '5px',
    },
    button: {
      margin: '2px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#800080',
      color: 'white',
      cursor: 'pointer',
    },
    buttonsend: {
      margin: '2px',
      padding: '8px 15px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#800080',
      color: 'white',
      cursor: 'pointer',
    },
    buttonDelete: {
      margin: '2px',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#e53935',
      color: 'white',
      cursor: 'pointer',
    },
    cartSummary: {
      paddingTop: '20px',
      textAlign: 'center',
    },
    '@media (max-width: 200px)': {
        cartItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          flexDirection: 'column',
        },
        imgContainer: {
          width: '100%',
          marginBottom: '10px',
        },
        cartItemDetails: {
          padding: '0',
          width: '100%',
        },
        button: {
          width: '50%',
        },
        buttonDelete: {
          width: '50%',
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        },
    },
  };

  
export default function Cart() {
    const { cart, handleRemoveFromCart, handleIncrementQuantity, handleDecrementQuantity } = useCart();
    const navigate = useNavigate();

    const productQueries = useQueries({
        queries: cart.map((cartItem) => ({
            queryKey: ['product', cartItem.product_id],
            queryFn: () => fetchProductDetails(cartItem.product_id),
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 10, // 10 minutes
        })),
    });

    const isLoading = productQueries.some(query => query.isLoading);
    const isError = productQueries.some(query => query.isError);

    const calculateTotalPrice = () => {
        return cart.reduce((total, cartItem) => {
            const productQuery = productQueries.find(query => query.data && query.data.id === cartItem.product_id);
            const product = productQuery ? productQuery.data : null;
            return total + (product ? cartItem.quantity * product.price : 0);
        }, 0).toFixed(2);
    };

    return (
        <>
            <Navbar />
            <div className='cart' style={styles.cart}>
                <h2 className='t-center' style={styles.tCenter}>Cart</h2>
                <div className="cart-list" style={styles.cartList}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map((cartItem) => {
                            const productQuery = productQueries.find(query => query.data && query.data.id === cartItem.product_id);
                            const product = productQuery ? productQuery.data : null;
                            return (
                                <div key={cartItem.product_id}>
                                    <div className="cart-item flex justify-between p-2" style={styles.cartItem}>
                                        <div className="img-container" style={styles.imgContainer}>
                                            <img src={`../assets/images/products/${cartItem.image_url}`} alt={product ? product.name : 'Loading...'} style={styles.img} />
                                        </div>
                                        <div style={styles.cartItemDetails}>
                                            <h3 style={styles.cartItemTitle}>{product ? product.name : 'Loading...'}</h3>
                                            <p>Quantity: {cartItem.quantity}</p>
                                            <p>Price: {product ? `$${(cartItem.quantity * product.price).toFixed(2)}` : 'Loading...'}</p>
                                        </div>
                                        <div style={styles.buttonContainer}>
                                            <button className='m-2' style={styles.button} onClick={() => handleIncrementQuantity(cartItem.product_id)}>Add One More</button>
                                            <button className='m-2' style={styles.buttonDelete} onClick={() => handleDecrementQuantity(cartItem.product_id)}>Remove One</button>
                                            <button className='m-2' style={styles.buttonDelete} onClick={() => handleRemoveFromCart(cartItem.product_id)}>Remove</button>
                                        </div>
                                    </div>
                                    <div style={{ border: '1px solid black' }}></div>
                                </div>
                            );
                        })
                    )}
                </div>
                {cart.length > 0 && !isLoading && (
                    <div className="cart-summary">
                        <h3>Total: ${calculateTotalPrice()}</h3>
                        <button style={styles.buttonsend} className='btn bg-red text-white' onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    </div>
                )}
            </div>
        </>
    );

}
