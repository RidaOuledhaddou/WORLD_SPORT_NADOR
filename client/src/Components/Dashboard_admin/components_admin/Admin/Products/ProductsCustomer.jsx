import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './ProductsCustomer.css';

const ProductsCustomer = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token_admin'); // Adjust token key as needed
        if (!token) return;
        
        let response;
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        if (search.trim()) {
          response = await fetch(`http://127.0.0.1:8000/api/Search_ProductsCustomer/${encodeURIComponent(search)}`, { headers });
        } else {
          response = await fetch("http://127.0.0.1:8000/api/ProductsCustomer_all", { headers });
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    fetchProducts();
  }, [search]);

  useEffect(() => {
    // Reset page index to 0 when products data changes
    setCurrentPage(0);
  }, [products]);

  const handleBack = () => {
    navigate('/Dashboard');
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token_admin'); // Adjust token key as needed
      if (!token) return;

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const response = await fetch(`http://127.0.0.1:8000/api/delete_product/${id}`, { method: 'DELETE', headers });
      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } else {
        console.error('Failed to delete product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const nextPage = () => {
    setCurrentPage(current => current + 1);
  };

  const prevPage = () => {
    setCurrentPage(current => Math.max(0, current - 1));
  };

  // Calculate the current slice of products to display
  const currentProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleAddProduct = () => {
    navigate('/Dashboard/add-product'); // Adjust the route as needed
  };
  const handleAddFlavor = () => {
    navigate('/Dashboard/add_flavors'); // Adjust the route as needed
  };
  const handleAddCategory = () => {
    navigate('/Dashboard/add_categories'); // Adjust the route as needed
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Products'>
      <Button onClick={handleBack} style={{ position: 'absolute', top: 10, left: 10, margin: "25px", fontWeight: "bold" }}>--Back--</Button>
      <TextField
        label="SEARCH BY ANYTHING"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: 20, width: '40%', fontWeight:'bold' }}
      />
      <div className="ProductsGlass">
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" onClick={handleAddProduct} style={{ fontWeight: 'bold', background: 'blue' }}>
            Add Product
          </Button>
          <Button variant="contained" onClick={handleAddFlavor} style={{ fontWeight: 'bold', background: 'orange' }}>
            Add Flavor
          </Button>
          <Button variant="contained" onClick={handleAddCategory} style={{ fontWeight: 'bold', background: 'purple' }}>
            Add Category
          </Button>
        </div>
        <TableContainer component={Paper} style={{marginTop: '-80px'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell align="left">SUBTITLE</TableCell>
                <TableCell align="left">OLD PRICE</TableCell>
                <TableCell align="left">PRICE</TableCell>
                <TableCell align="left">STATUS</TableCell>
                <TableCell align="left">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="left">{row.subtitle}</TableCell>
                  <TableCell align="left">{row.old_price}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                  <TableCell align="left">
                    <Link to={`/update-product/${row.id}`} className='Update' style={{fontWeight: 'bold'}}>UPDATE</Link>
                    <Button onClick={() => deleteProduct(row.id)} color="error" style={{fontWeight: 'bold'}}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              {currentProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No products to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          left: 440,
          right: 0,
          bottom: 10,
          marginBottom: '20px'
        }}>
          <Button onClick={prevPage} disabled={currentPage === 0} style={{fontWeight: 'bold', marginRight: '10px'}}>Previous</Button>
          <Button onClick={nextPage} disabled={currentPage * itemsPerPage >= products.length} style={{fontWeight: 'bold'}}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductsCustomer;
