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
import "./Show_orders.css";

const Show_orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
      fetchOrders(token);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  async function fetchOrders(token) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/Show_orders_all", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      // Sorting orders to show pending first
      data.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') {
          return -1; // a comes first
        }
        if (a.status !== 'pending' && b.status === 'pending') {
          return 1; // b comes first
        }
        return 0; // no change
      });
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  }

  const handleBack = () => {
    navigate('/Dashboard');
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const indexOfLastOrder = (currentPage + 1) * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const makeStyles = (status) => {
    if (status === "delivered") {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green'
      }
    } else if (status === "pending") {
      return {
        background: '#ffadadBf',
        color: 'red'
      }
    } else {
      return {
        background: 'blue',
        color: 'white'
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div className='ShowOrder'>
      <Button onClick={handleBack} style={{ position: 'absolute', top: 10, left: 10, margin: "25px", fontWeight: "bold" }}>--Back--</Button>
      <div className="ShowOrderGlass">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Products</TableCell>
                <TableCell align="left">Total Amount</TableCell>
                <TableCell align="left">DATE</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.client.username}</TableCell>
                  <TableCell align="left">{row.client.phone_number}</TableCell>
                  <TableCell align="left">{row.client.email}</TableCell>
                  <TableCell align="left">{row.items.map(item => item.product.name).join(", ")}</TableCell>
                  <TableCell align="left">{row.total_amount}</TableCell>
                  <TableCell align="left">{formatDate(row.created_at)}</TableCell>
                  <TableCell align="left">
                    <span className='status' style={makeStyles(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left">
                    <Link to={`/details/${row.id}`} className='Details' style={{fontWeight: 'bold'}}>DETAIL</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px',
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: '20px'
        }}>
          <Button onClick={prevPage} disabled={currentPage === 0} style={{fontWeight: 'bold', marginRight: '10px'}}>Previous</Button>
          <Button onClick={nextPage} disabled={indexOfLastOrder >= orders.length} style={{fontWeight: 'bold'}}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default Show_orders;
