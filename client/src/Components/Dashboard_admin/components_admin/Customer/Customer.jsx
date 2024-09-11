import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "./Customer.css";

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const itemsPerPage = 5; // Define how many rows you want per page

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
      fetchCustomers(token);
    }
  }, [navigate]);

  const fetchCustomers = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/Show_Customer_all", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const handleBack = () => {
    navigate('/Dashboard');
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Calculate the current slice of customers to display
  const indexOfLastCustomer = (currentPage + 1) * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Customer'>
      <Button onClick={handleBack} style={{ position: 'absolute', top: 10, left: 10, margin: "25px", fontWeight: "bold" }}>
        --Back--
      </Button>
      <div className="CustomerGlass">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>CUSTOMER</TableCell>
                <TableCell align="left">EMAIL</TableCell>
                <TableCell align="left">ADDRESS</TableCell>
                <TableCell align="left">PHONE NUMBER</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell component="th" scope="row">{customer.username}</TableCell>
                  <TableCell align="left">{customer.email}</TableCell>
                  <TableCell align="left">{customer.address}</TableCell>
                  <TableCell align="left">{customer.phone_number}</TableCell>
                </TableRow>
              ))}
              {currentCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    No customers to display
                  </TableCell>
                </TableRow>
              )}
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
              bottom: '40px'  // Adjust this value as needed to fit your design
          }}>
          <Button onClick={prevPage} disabled={currentPage === 0} style={{fontWeight: 'bold'}}>Previous</Button>
          <Button onClick={nextPage} disabled={indexOfLastCustomer >= customers.length} style={{fontWeight: 'bold'}}>Next</Button>
        </div>
      </div>
    </div>
  );
}

export default Customer;
