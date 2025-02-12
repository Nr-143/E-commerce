import React, { useEffect, useState } from "react";
import "../TrackOrder/TrackOrder.css";
import { FaRegDotCircle } from "react-icons/fa"; // For the pin icon

const exampleOrders = [
  {
    id: "11223",
    product: "Smartwatch",
    image: "https://example.com/smartwatch.jpg",
    totalPrice: 199.99,
    status: "shipped",
    deliveryDate: "2025-02-15",
    address: "789 Pine St, Springfield, IL, USA",
    holdReason: "",
  },
];

const OrderTrackingPage = ({ order = exampleOrders[0] }) => {
  const trackingStages = ["Ordered", "Shipped", "Out Now", "Delivered"];
  const currentStageIndex = trackingStages.indexOf(order.status);
  
  const [lineHeight, setLineHeight] = useState(0);

  const handleHoldMessage = () => {
    if (order.status === "Shipped") {
      return `Your order is shipped but is currently on hold due to: ${order.holdReason}`;
    } else if (order.status === "Out for Delivery") {
      return `Your order is out for delivery but is currently on hold due to: ${order.holdReason}`;
    }
    return "";
  };

  useEffect(() => {
    // Dynamically set the height of the progress line based on the current stage index
    setLineHeight((currentStageIndex + 1) * (100 / trackingStages.length));
  }, [currentStageIndex]);

  return (
    <div className="tracking-container">
      <h2>Track Your Order</h2>
      <div className="order-summary">
        <img src={order.image} alt={order.product} className="order-image" />
        <div>
          <p className="product-name">{order.product}</p>
          <p className="order-id">Order ID: {order.id}</p>
          <p className="order-price">Total: ${order.totalPrice}</p>
        </div>
      </div>

      {/* Tracking Stages Timeline */}
      <div className="tracking-timeline">
        <div
          className={`timeline-line ${lineHeight > 0 ? 'timeline-line-filled' : ''}`}
          style={{
            height: `${lineHeight}%`,
            transition: 'height 0.5s ease-out',
            backgroundColor: lineHeight > 0 ? 'green' : 'gray'
          }}
        >
          {trackingStages.map((stage, index) => (
            <div
              key={index}
              className={`timeline-step ${index <= currentStageIndex ? "completed" : "pending"}`}
            >
              <div className={`step-circle ${index <= currentStageIndex ? "completed" : ""}`}>
                <FaRegDotCircle className="step-icon" />
              </div>
              <p className={`step-label ${index <= currentStageIndex ? "completed" : ""}`}>{stage}</p>

              {/* Display Hold Message Popup */}
              {order.status === stage && order.status !== "Delivered" && (
                <div className="hold-popup">
                  {handleHoldMessage()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Handling "On Hold" Status */}
      {order.status === "On Hold" && (
        <div className="on-hold-message">
          <p><strong>⚠️ Order on Hold</strong></p>
          <p>Reason: {order.holdReason}</p>
        </div>
      )}

      <p className="delivery-date">📦 Estimated Delivery: <strong>{order.deliveryDate}</strong></p>
      <p className="delivery-address">📍 Delivery Address: {order.address}</p>

      <div className="order-actions">
        {order.status !== "Delivered" && order.status !== "On Hold" && (
          <button className="cancel-order-btn">❌ Cancel Order</button>
        )}
        <button className="help-btn">🆘 Help</button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
