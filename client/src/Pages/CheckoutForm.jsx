import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../Components/common/Navbar';


const fetchProductDetails = async (productId) => {
    const response = await fetch(`http://127.0.0.1:8000/api/product/${productId}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch product details');
    }
    return response.json();
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const fetchClientInfo = async (guestToken) => {
    const response = await fetch(`http://127.0.0.1:8000/api/client-by-token?guest_token=${guestToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch client info');
    }
    return response.json();
};

export default function CheckoutForm() {
    const { cart, handleIncrementQuantity, handleDecrementQuantity, handleRemoveFromCart, handleClearCart } = useCart();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
    });
    const [products, setProducts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        const loadClientInfo = async () => {
            const guestToken = getCookie('guest_token');
            if (guestToken) {
                try {
                    const clientInfo = await fetchClientInfo(guestToken);
                    setUserInfo({
                        username: clientInfo.username,
                        email: clientInfo.email,
                        phone: clientInfo.phone_number,
                        address: clientInfo.address,
                    });
                } catch (error) {
                    console.error('Error fetching client info:', error);
                }
            }
        };

        loadClientInfo();
    }, []);

    useEffect(() => {
        const loadProductDetails = async () => {
            try {
                const productsData = {};
                for (const cartItem of cart) {
                    const product = await fetchProductDetails(cartItem.product_id);
                    productsData[cartItem.product_id] = product;
                }
                setProducts(productsData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setIsLoading(false);
            }
        };

        if (cart.length > 0) {
            loadProductDetails();
        } else {
            setProducts({});
            setIsLoading(false);
        }
    }, [cart]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            client: userInfo,
            items: cart.map(({ product_id, quantity }) => ({ product_id, quantity }))
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY',
                },
                body: JSON.stringify(order),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                setApiResponse(data);
                handleClearCart();

                const expiresIn = 365; // days until expiration
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + expiresIn);
                document.cookie = `guest_token=${data.guest_token};expires=${expirationDate.toUTCString()};path=/;Secure;HttpOnly`;

            } else {
                console.error('Failed to place order:', data);
                setApiResponse(data);
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            setApiResponse({ message: 'Failed to place order', error: error.message });
        }
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, cartItem) => {
            const product = products[cartItem.product_id];
            return total + (product ? cartItem.quantity * product.price : 0);
        }, 0).toFixed(2);
    };

    const styles = {
        wrapper: { height: '1000px' },
        cart: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            boxShadow: '0 8px 17px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        tCenter: { textAlign: 'center' },
        cartList: { marginTop: '20px' },
        cartItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #ccc',
        },
        imgContainer: { width: '100px' },
        img: { width: '100%', height: 'auto', borderRadius: '4px' },
        cartItemDetails: { padding: '0 10px' },
        cartItemTitle: { marginBottom: '5px' },
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
        cartSummary: { paddingTop: '20px', textAlign: 'center' },
        form: {
            maxWidth: '450px',
            margin: '0 auto',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        formGroup: { marginBottom: '15px' },
        label: { display: 'block', marginBottom: '5px', color: '#333' },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '6px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        buttonForm: {
            width: '100%',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
        },
    };

    return (
        <>
            <Navbar />
            <div style={styles.wrapper}>
                <div className="form">
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name</label>
                            <input type="text" name="username" value={userInfo.username} onChange={handleChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input type="email" name="email" value={userInfo.email} onChange={handleChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone</label>
                            <input type="tel" name="phone" value={userInfo.phone} onChange={handleChange} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address</label>
                            <input type="text" name="address" value={userInfo.address} onChange={handleChange} required style={styles.input} />
                        </div>
                        <button type="submit" style={styles.button}>Place Order</button>
                    </form>
                </div>
                <br /><br />
                <div className="cart" style={styles.cart}>
                    <h3 style={styles.tCenter}>Your Cart</h3>
                    <div className="cart-list" style={styles.cartList}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : cart.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            cart.map((cartItem) => {
                                const product = products[cartItem.product_id];
                                return (
                                    <div key={cartItem.product_id}>
                                        <div className="cart-item flex justify-between p-2" style={styles.cartItem}>
                                            <div className="img-container" style={styles.imgContainer}>
                                                <img src={`../assets/images/products/${cartItem.image_url}`} alt={product ? product.name : 'Loading...'} style={styles.img} />
                                            </div>
                                            <div>
                                                <h3>{product ? product.name : 'Loading...'}</h3>
                                                <p>Quantity: {cartItem.quantity}</p>
                                                <p>Price: {product ? `$${(cartItem.quantity * product.price).toFixed(2)}` : 'Loading...'}</p>
                                            </div>
                                            <div>
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
                        </div>
                    )}
                </div>
                {apiResponse && (
                    <div className="api-response">
                        <h3>API Response</h3>
                        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    </div>
                )}
            </div>
        </>
    );
}
