import React, { useEffect, useState } from "react";
import "./TrackOrder.css";
import { FaRegDotCircle } from "react-icons/fa";
import defaultImage from "../../assets/icons/06.jpg";

const exampleOrders = [{
  id: "11223",
  product: "Smartwatch",
  image: defaultImage,
  totalPrice: 199.99,
  status: "Shipped",
  deliveryDate: "2025-02-15",
  orderDate: "2025-02-10",
  estimatedTime: "3-5 Days",
  paymentMethod: "Credit Card",
  seller: "TechStore",
  address: "789 Pine St, Springfield, IL, USA",
  hSoldReason: "Weather delay",
}];

const OrderTrackingPage = ({ order = exampleOrders[0] }) => {
  const trackingStages = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];
  const currentStageIndex = trackingStages.indexOf(order.status);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    setLineHeight(((currentStageIndex + 1) / trackingStages.length) * 100);
  }, [currentStageIndex]);

  return (
    <div className="tracking-container">
      <h2 className="track-title">Track Your Order</h2>
      <div className="order-summary">
        <img src={order.image} alt={order.product} className="order-image" />
        <div className="order-details">
          <p className="product-name">{order.product}</p>
          <p className="order-id">Order ID: {order.id}</p>
          <p className="order-price">Total: ${order.totalPrice}</p>
          <p className="order-date">Ordered on: {order.orderDate}</p>
          <p className="estimated-time">Estimated Delivery: {order.estimatedTime}</p>
          <p className="payment-method">Payment: {order.paymentMethod}</p>
          <p className="seller">Sold by: {order.seller}</p>
        </div>
      </div>

      <div className="tracking-timeline">
        <div className="timeline-line" style={{ height: `${lineHeight}%` }}></div>
        {trackingStages.map((stage, index) => (
          <div key={index} className={`timeline-step ${index <= currentStageIndex ? "completed" : "pending"}`}>
            <FaRegDotCircle className="step-icon" />
            <p className="step-label">{stage}</p>
            {order.status === stage && order.hSoldReason && (
              <div className="hold-popup">{order.hSoldReason}</div>
            )}
          </div>
        ))}
      </div>

      <p className="delivery-info">📦 Estimated Delivery: <strong>{order.deliveryDate}</strong></p>
      <p className="delivery-address">📍 {order.address}</p>

      <div className="order-actions">
        {order.status !== "Delivered" && (
          <button className="cancel-order-btn">❌ Cancel Order</button>
        )}
        <button className="help-btn">🆘 Help</button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
