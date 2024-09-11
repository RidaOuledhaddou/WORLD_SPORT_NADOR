import React from 'react';
import Navbar from '../../Components/common/Navbar';
import { useQuery } from '@tanstack/react-query';
import fetchOrders from './fetchOrders';
import '../test.css';

export default function OrdersPage() {
    const { data: orders, isLoading, isError } = useQuery(['orders'], fetchOrders);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading orders</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="t-center">Orders</h2>
                <div className="orders-list">
                    {orders.length === 0 ? (
                        <p>No orders found</p>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="order-item">
                                <div className="order-details">
                                    <h3>Order #{order.id}</h3>
                                    <p>Status: {order.status}</p>
                                    <p>Total Amount: {order.total_amount} DH</p>
                                    <ul>
                                        {order.items.map((item) => (
                                            <li key={item.id}>
                                                {item.product.name} - Quantity: {item.quantity} - Unit Price: ${item.unit_price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {order.status !== 'cancelled' && (
                                    <button className="btn bg-red text-white">
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
