import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext';

import './Navbar.css';

// NAVBAR CSS 

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const { cart } = useCart();

  useEffect(() => {
    let response;

    async function fetchProducts() {
      response = await fetch("http://127.0.0.1:8000/api/ProductsCustomer_all");
      const data = await response.json();
      setSearchResults(data);
      console.log("this all products: ", data);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredResults([]);
    } else {
      const results = searchResults.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [search, searchResults]);

  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="nav-wrapper grid p-2">
            <div className="flex justify-between items-center">
              <Link to="/"><img src="../assets/images/logo.png" alt="Logo" /></Link>

              <div className="input-holder">
                <input
                  type="search"
                  placeholder="search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-search"
                />
                <span className="search-icon">
                  <img src="../assets/images/search-icon.svg" alt="Search Icon" />
                </span>
                {filteredResults.length > 0 && (
                  <ul className="search-results">
                    {filteredResults.slice(0, 4).map((product) => (
                      <li key={product.id}>
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="user-info flex items-center">
                <Link to="/cart" className="p-2 cart-link">
                  <span className="cart-count">{cart.length}</span>
                  <img src="../assets/images/addtocart-icon.svg" alt="Cart Icon" />
                </Link>
                <Link className='fs-300 p-2 mr-2' to='/login'> JOIN US </Link>
                <button id="menu" className="menu-btn" onClick={toggleMenu}>
                  <img src="../assets/images/menu-icon.png" width="26px" height="26px" alt="Menu Icon" />
                </button>
              </div>
            </div>

            <nav className="navbar__nav" style={{ marginLeft: '100px', marginRight: '100px' }}>
              <ul id="navbar__list" className={`navbar__list flex justify-between ${menuActive ? 'active' : ''}`} role="list">
                <li className="navbar__nav-item p-1"><Link to="/products/PREWORKOUT">PREWORKOUT</Link></li>
                <li className="navbar__nav-item p-1"><Link to="/products/CREATINE">CREATINE</Link></li>
                <li className="navbar__nav-item p-1"><Link to="/products/WHEY PROTEIN">WHEY PROTEIN</Link></li>
                <li className="navbar__nav-item p-1"><Link to="/products/MASS PROTEIN">MASS PROTEIN</Link></li>
                <li className="navbar__nav-item p-1"><Link to="/products/VITAMINS">VITAMINS</Link></li>
                <li className="navbar__nav-item p-1"><Link to="/products/ACCESSORIES">ACCESSORIES</Link></li>
                <img className="close-icon" id="close-icon" src="../assets/images/close-icon.png" alt="Close Icon"
                  width="25px" height="25px" onClick={toggleMenu} />
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
