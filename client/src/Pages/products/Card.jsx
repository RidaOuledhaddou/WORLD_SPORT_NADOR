import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import goalImg1 from '../../assets/images/products/product-1.jpeg'; // temporary image ;

export default function Card({ product }) {
    const { handleAddToCart } = useCart();

    const description = product.description || '';
    const imageUrl = `http://localhost:8000${product.image_url}` || goalImg1;

    return (
        <div className="card">
            <Link to={`/product/${product.id}`} className="card-link">
                <div className="img-holder bg-silver m-auto">
                    <img className='m-auto' src={goalImg1} alt={product.name} />  {/* temporary image */}
                </div>
                <div className="product-info mt-2">
                    <h2 className="fs-500 fw-bold">{product.name}</h2>
                    <h3 className="fs-300 fw-regular text-gray">
                        {description.split(' ').slice(0, 19).join(' ') + (description.split(' ').length > 19 ? '...' : '')}
                    </h3>
                    <div className="price-review flex justify-between w-full mt-1">
                        <p className="fs-400">{product.price} DH</p>
                        <img src="../assets/images/five-stars.png" alt="Rating" />
                    </div>
                </div>
            </Link>
            <button className="btn bg-white text-primary w-full mt-1" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
        </div>
    );
}
