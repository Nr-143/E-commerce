import React from "react";
import { useNavigate } from "react-router-dom";
import "../PlacedOrderComponent/PlacedOrderComponent.css";

const PlacedOrders = ({ orders }) => {
  const navigate = useNavigate();

  const handleTrackOrder = (order) => {
    navigate("/TrackOrder", { state: { order } });
  };

  const handleCustomerService = () => {
    alert("Contact Customer Care: 1800-123-456 | support@dailymart.com");
  };

  return (
    <div className="placed-orders-container">
      {orders.length === 0 ? (
        <p className="no-orders">You have no placed orders.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <img src={order.image} alt={order.product} className="order-image" />
                <div className="order-info">
                  <p className="order-productName"><strong>{order.product}</strong></p>
                  <p className="order-productId">Order ID: {order.id}</p>
                  <p className="order-date">Ordered on: {order.date}</p>
                  <p className="order-delivery-date">📦 Delivery by: {order.deliveryDate}</p>
                  <p className="order-address">📍 {order.address}</p>
                </div>
              </div>
              <div className="order-status">
                <p>Status: <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
              </div>
              <div className="order-actions">
                <button className="track-order-btn" onClick={() => handleTrackOrder(order)}>Track</button>
                <button className="cancel-order-btn">Cancel</button>
                <button className="help-btn" onClick={handleCustomerService}>Help</button>
              </div>
              <div className="order-footer">
                <p className="order-price">Total: ${order.totalPrice}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacedOrders;
