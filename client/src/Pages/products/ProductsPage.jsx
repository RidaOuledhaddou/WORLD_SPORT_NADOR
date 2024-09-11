import React from 'react';
import Banner from "./Banner";
import Navbar from '../../Components/common/Navbar';
import Footer from '../../Components/common/Footer';
import Content from "./Content";
import { useQuery } from "@tanstack/react-query";
import fetchProducts from "./fetchProducts";
import { useParams } from "react-router-dom";

export default function Products() {
    const { category } = useParams();
    const selectedCategory = category ? category : "top-sellers";
    const limit = 20; // Example limit, you can adjust as needed

    const { data: products, isLoading, error } = useQuery(["products", selectedCategory, limit], fetchProducts);

    if (isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-pane">
                <h2 className="error-message">Error: {error.message}</h2>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <main>
                <Banner />
                {products.length === 0 ? (
                    <h1 className="mt-4 t-center">No Products Found</h1>
                ) : (
                    <Content products={products} />
                )}
            </main>
            <Footer />
        </>
    );
}
