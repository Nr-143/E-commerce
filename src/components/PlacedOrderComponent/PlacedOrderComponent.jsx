import React from "react";
import { useNavigate } from "react-router-dom";
import "../PlacedOrderComponent/PlacedOrderComponent.css";

const PlacedOrders = ({ orders }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleTrackOrder = (order) => {
    navigate("/TrackOrder", { state: { order } }); // Redirect with order details
  };

  return (
    <div className="placed-orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">You have no placed orders.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <img src={order.image} alt={order.product} className="order-image" />
                <div className="order-info">
                  <p className="order-product"><strong>{order.product}</strong></p>
                  <p className="order-id">Order ID: {order.id}</p>
                  <p className="order-date">Ordered on: {order.date}</p>
                  <p className="order-delivery-date">📦 Delivery by: <strong>{order.deliveryDate}</strong></p>
                  <p className="order-address">📍 {order.address}</p>
                </div>
              </div>
              <div className="order-status">
                <p>Status: <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
              </div>
              <div className="order-footer">
                <p className="order-price">Total: ${order.totalPrice}</p>
                <button className="track-order-btn" onClick={() => handleTrackOrder(order)}>Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacedOrders;
