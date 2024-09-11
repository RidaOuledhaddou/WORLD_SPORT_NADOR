import React from 'react';
import topSellerImg from '../../assets/images/right-arrow-icon.svg';
import { Link } from 'react-router-dom';
import Card from '../products/Card';

export default function Category({ title, category, products = [] }) {
    // Slice the products array to show only the first 4 products
    const limitedProducts = products.slice(0, 4);

    return (
        <section className="category padding-block-650">
            <div className="container">
                <div className="flex justify-between">
                    <h2 className="secondary-heading fs-700 sm-fs-650">{title}</h2>
                    <div className=''>
                        <Link to={`/products/${category}`}>
                            <div className='flex items-center'>
                                See All &ensp; <span><img src={topSellerImg} alt="See All" /></span>
                            </div>
                        </Link> 
                    </div>
                </div>
                <div className="even-columns justify-center mt-2">
                    {limitedProducts.length > 0 ? (
                        limitedProducts.map((p) => (
                            <Card key={p.id} product={p} />
                        ))
                    ) : (
                        <p>No products available in this category.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
