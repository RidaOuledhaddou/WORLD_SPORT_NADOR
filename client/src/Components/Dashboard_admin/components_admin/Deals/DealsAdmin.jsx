import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import './DealsAdmin.css';

const DealsAdmin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    end_date: '',
    old_price: '',
    price: ''
  });
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
      fetchProducts(token);
    }
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/Deals_products', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBack = () => {
    navigate('/Dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token_admin');
      const response = await fetch('http://127.0.0.1:8000/api/add-deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setMessage('Deal added successfully');

      setTimeout(() => {
        setMessage('');
      }, 3000);

      console.log(result);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error during the upload:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Deals">
      <Button
        onClick={handleBack}
        style={{ position: 'absolute', top: 10, left: 10, margin: '25px', fontWeight: 'bold' }}
      >
        --Back--
      </Button>
      <div className="DealsGlass">
        <form onSubmit={handleSubmit} className="deal-form">
          <Box sx={{ mb: 2, width: '100%' }}>
            <TextField
              select
              fullWidth
              label="Product"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
              variant="outlined"
            >
              <MenuItem value="">
                <em>Select Product</em>
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ mb: 2, width: '100%' }}>
            <TextField
              fullWidth
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2, width: '100%' }}>
            <TextField
              fullWidth
              type="number"
              label="Old Price"
              name="old_price"
              value={formData.old_price}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2, width: '100%' }}>
            <TextField
              fullWidth
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Deal
          </Button>
        </form>
        {message && (
          <Alert severity={message.startsWith('Error') ? 'error' : 'success'} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DealsAdmin;
