import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categories from '../../data/categories.json';
import brands from '../../data/brands.json';
import { getCartItems, removeFromCart,addToCart } from '../../utils/cartUtils';
import Card from './Card';


export default function Content({ products }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    /* ***** CART **** */
    const [cart, setCart] = useState([]);
    const handleAddToCart = (product) => {
        console.log("zzzzz")
        addToCart(product);
        setCart(getCartItems());
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(getCartItems());
    };

    useEffect(() => {
        setCart(getCartItems());
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);
    /* ***** CART **** */
    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        setMinPrice(value === '' ? '' : Number(value));
    };

    const handleMaxPriceChange = (e) => {
        const value = e.target.value;
        setMaxPrice(value === '' ? '' : Number(value));
    };

    const handleFilterByPrice = () => {
        if (minPrice > maxPrice) {
            alert("Minimum price cannot be greater than maximum price");
            return;
        }

        const filtered = products.filter(product => {
            return product.price >= minPrice && product.price <= maxPrice;
        });

        setFilteredProducts(filtered);
    };

    const handleSortChange = (e) => {
        const criteria = e.target.value;
        setSortCriteria(criteria);

        let sortedProducts = [...filteredProducts];

        if (criteria === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (criteria === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (criteria === 'name-asc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === 'name-desc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(sortedProducts);
    };

    return (
        <>
            <div className={`overlay ${isSidebarVisible ? 'active' : ''}`} onClick={() => setIsSidebarVisible(false)}></div>
            <section className="products-section padding-block-800">
                <div className="container">
                    <button
                        className="btn bg-red text-white toggle-sidebar-btn"
                        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                    >
                        {isSidebarVisible ? 'Close Filters' : 'Open Filters'}
                    </button>
                    <div className={`even-columns ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
                        <aside className={`filter- ${isSidebarVisible ? 'active' : ''}`}>
                            <div>
                                <button className="btn close-sidebar-btn lg-d-none" onClick={() => setIsSidebarVisible(false)}>Close</button>
                            </div>
                            {/* <div className="flex justify-between items-center">
                                <span>Filters</span>
                                <span><button className="btn clearBtn" onClick={() => setFilteredProducts(products)}>Clear All</button></span>
                            </div> */}

                            <div className="group mt-3">
                                <h2 className="fw-bold fs-600">Product Categories</h2>
                                <div className="devider"></div>
                                <ol role="list" className="mt-2 p-1">
                                    {categories.map(category => (
                                        <li key={category.id} className="flex justify-between ml-2 border-b-1 p-2">
                                            <Link to={`/products/${category.route}`} className="fs-300 text-gray fw-regular">
                                                {category.name}
                                            </Link>
                                            <span>+</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="filter-price group pt-3">
                                <h2 className="fw-bold fs-600">Filter by Price </h2>
                                <div className="">
                                    <div>
                                        <input
                                            type="number"
                                            id="min_price"
                                            name="min_price"
                                            value={minPrice}
                                            data-min="0"
                                            placeholder="Min Price"
                                            className="t-center m-1 overflow-v"
                                            onChange={handleMinPriceChange}
                                            onFocus={(e) => e.target.select()} // Select the input field content on focus
                                        />
                                        <input
                                            type="number"
                                            id="max_price"
                                            name="max_price"
                                            value={maxPrice}
                                            data-max="1000"
                                            placeholder="Max Price"
                                            className="t-center m-1 overflow-v"
                                            onChange={handleMaxPriceChange}
                                            onFocus={(e) => e.target.select()} // Select the input field content on focus
                                        />
                                        <button
                                            className="btn bg-red text-white"
                                            onClick={handleFilterByPrice}
                                        >
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="group mt-3">
                                <h2 className="fw-bold fs-600">Filter by Brand</h2>
                                <ol role="list" className="mt-2 p-1">
                                    {brands.map(brand => (
                                        <li key={brand.id} className="flex justify-between ml-2 border-b-1 p-2">
                                            <Link to={`/brands/${brand.route}`} className="fs-300 text-gray fw-regular">
                                                {brand.name}
                                            </Link>
                                            <span>+</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                            <div className="group mt-3">
                                <h2 className="fw-bold fs-600">Filter by Tags</h2>
                                <ol role="list" className="mt-2 p-1">
                                    {/* Add your tags here */}
                                    <li className="flex justify-between ml-2 border-b-1 p-2"><a href="" className="fs-300 text-gray fw-regular">Tag 1</a><span>+</span></li>
                                    {/* Repeat for other tags */}
                                </ol>
                            </div>
                        </aside>

                        <div className="ml-2">
                            <div className="flex justify-between">
                                <span className="fs-500 text-gray fw-light">Showing {filteredProducts.length} Result(s) from total {products.length}</span>
                                <select name="sort" id="sort" className="p-1" onChange={handleSortChange} value={sortCriteria}>
                                    <option value="">Sort by</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A-Z</option>
                                    <option value="name-desc">Name: Z-A</option>
                                </select>
                            </div>

                            <div className="card-columns mt-4">
                                {filteredProducts.length === 0 ? (
                                    <p className="m-auto">No Products Within this category</p>
                                ) : (
                                    filteredProducts.map((p) => (
                                    <Card key={p.id} product={p} />

                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
