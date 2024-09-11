import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchProduct from './fetchProduct';
import fetchProdsByCtg from '../products/fetchProducts';
import Navbar from '../../Components/common/Navbar';
import Footer from '../../Components/common/Footer';
import Category from '../home/Category';
import ProductDesc from './ProductDesc';
import ProductOverview from './ProductOverview';


export default function ProductDetails() {
    let { id } = useParams();
    const results = useQuery(["details", id], fetchProduct);
    const similarPrds = useQuery(["similair","top-sellers",4],fetchProdsByCtg)
    

    if (results.isLoading || similarPrds.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🌀</h2>
            </div>
        );
    }
    const product = results.data;
    const simil = similarPrds.data;
    console.log(product)
    
    return (
        <>
            <Navbar />
            <main>
                <ProductDesc product={product} />
                <ProductOverview />
                <Category title="TOP SELLERS" category="top-sellers" products={simil} />
            </main>
            <Footer />
        </>
    )
}
