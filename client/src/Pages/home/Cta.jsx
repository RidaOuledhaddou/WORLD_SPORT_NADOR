import { useState, useEffect } from 'react';
import product3Img from '../../assets/images/products/product-3.jpeg';
import ctaImg from '../../assets/images/cta.png';
import starsImg from '../../assets/images/five-stars.png';

export default function Cta() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch product data from the API
        fetch('http://127.0.0.1:8000/api/index_Deals')
            .then(response => response.json())
            .then(data => {
                setProducts(data.slice(0, 3)); // Limit to 3 products
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <section className="cta bg-black text-white padding-block-650">
            <div className="container">
                <div className="even-columns">
                    <div className='text-info sm-t-center'>
                        <h2 className="fs-800 sm-fs-650">Respect Your Body, It’s the Only One You Get</h2>
                        <p className="fs-300 fw-light mb-3">
                            It is a long established fact that a reader will be distracted by the readable content
                            of a page when looking at its layout. point of using Lorem Ipsum is
                        </p>
                        {products.map((product) => (
                            <div className="card bg-white m-2 p-2 w-fit-content sm-m-auto" key={product.id}>
                                <div className="img-holder">
                                    <img src={product3Img} alt={product.product.name} />
                                </div>
                                <div className="m-2">
                                    <h3 className="fs-300 fw-light text-black">
                                        {product.product.description.split(' ').slice(0, 19).join(' ') + (product.product.description.split(' ').length > 19 ? '...' : '')}
                                    </h3>
                                    <img src={starsImg} alt="stars" />
                                    <div className="price flex justify-between">
                                        <p className="promotion fs-300 text-gray fw-light"><s>{product.old_price}</s></p>
                                        <p className="fs-300 fw-light text-red">{product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="img-holder">
                            <img src={ctaImg} alt="CTA" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
