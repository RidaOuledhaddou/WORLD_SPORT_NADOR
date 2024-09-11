import './Detai_order.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@mui/material/Button';

const Detai_order = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null); // Initialize as null (or {} if you prefer an empty object)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token_admin');
        if (!token) {
            alert('An error occurred. Please login again.');
            navigate('/login_Admin');
        } else {
            setIsAuthenticated(true);
            fetchOrder(token);
        }
    }, [navigate, id]);

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    async function fetchOrder(token) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/Show_order_id/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch order');
            const data = await response.json();
            setOrder(data); // Expecting a single object
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch order:', error);
        }
    }

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

    const handleBack = () => {
        navigate('/Dashboard/Show_orders');
    };

    const handleStatusChange = async (orderId, newStatus) => {
      const token = localStorage.getItem('token_admin');
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/update_order_status/${orderId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        });
        if (response.ok) {
          console.log("Status updated successfully");
          window.location.reload();  // Function to refresh order data
        } else {
          console.error("Failed to update status:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };

    if (!order) { // Check if the order has been loaded
        return <div>Loading order details...</div>;
    }

    return (
        <div className='DetailOrder'>
        <Button onClick={handleBack} style={{ position: 'absolute', top: 10, left: 10, margin: "25px", fontWeight: "bold" }}>--Back--</Button>
        <select style={{marginRight: '10px'}}
          onChange={(e) => handleStatusChange(order.id, e.target.value)}
          className='statusSelect'
        >
          <option>Choise Pending or Delivered</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
        </select>
        <div className="DetailOrderGlass">
          <div className="OrderDetails">
            <div className="OrderSection">
                <div className="OrderField">
                  <strong>CLIENT NAME :&nbsp;</strong> {order.client.username}
                </div>
                <div className="OrderField">
                  <strong>Email :&nbsp;</strong> {order.client.email}
                </div>
            </div>
            <div className="OrderSection">
                <div className="OrderField">
                  <strong>PHONE :&nbsp;</strong> {order.client.phone_number}
                </div>
                <div className="OrderField">
                  <strong>PRODUCTS :&nbsp;</strong>
                  {order.items.map((item, index) => (
                      <div key={index} className="ProductItem">
                        {item.product.name} - {item.unit_price} DH x {item.quantity}
                      </div>
                  ))}
                </div>
            </div>
            <div className="OrderSection">
                <div className="OrderField">
                  <strong>TOTAL AMOUNT :&nbsp;</strong> {order.total_amount} DH
                </div>
                <div className="OrderField">
                  <strong>STATUS:&nbsp;</strong><span className='status' style={makeStyles(order.status)}>{order.status}</span>
                </div>

            </div>
            <div className="OrderField">
              <strong>ORDER DATE :&nbsp;</strong> {new Date(order.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Detai_order;
