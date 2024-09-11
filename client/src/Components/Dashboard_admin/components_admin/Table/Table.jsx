import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import './Table.css';

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

export default function BasicTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    show_orders();
  }, []);

  async function show_orders() {
    const res = await fetch("http://127.0.0.1:8000/api/Show_orders");
    const data = await res.json();
    setOrders(data);
    console.log(data);
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div className="Table">
      <TableContainer component={Paper} style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CUSTOMER</TableCell>
              <TableCell align="left">PHONE NUMBER</TableCell>
              <TableCell align="left">TOTAL AMOUNT</TableCell>
              <TableCell align="left">DATE</TableCell>
              <TableCell align="left">STATUS</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.client.username}
                </TableCell>
                <TableCell align="left">{row.client.phone_number}</TableCell>
                <TableCell align="left">{row.total_amount}</TableCell>
                <TableCell align="left">{formatDate(row.created_at)}</TableCell>
                <TableCell align="left">
                  <span className='status' style={makeStyles(row.status)}>{row.status}</span>
                </TableCell>
                <Link to={`/details/${row.id}`}>
                  <TableCell align="left" className='Details' style={{ fontWeight: 'bold' }}>DETAIL</TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
