import React, { useEffect, useState } from "react";
import "../TrackOrder/TrackOrder.css";
import { FaRegDotCircle } from "react-icons/fa";
import defaultImage from "../../assets/icons/06.jpg";

const exampleOrders = [{
  id: "11223",
  product: "Smartwatch",
  image: defaultImage,
  totalPrice: 199.99,
  status: "Shipped",
  deliveryDate: "2025-02-15",
  address: "789 Pine St, Springfield, IL, USA",
  hSoldReason: "Weather delay",
}];

const OrderTrackingPage = ({ order = exampleOrders[0] }) => {
  const trackingStages = ["Ordered", "Shipped", "Out Now", "Delivered"];
  const currentStageIndex = trackingStages.indexOf(order.status);
  const [lineHeight, setLineHeight] = useState(0);

  const handleHoldMessage = () =>
    order.status !== "Delivered" && order.hSoldReason ? `${order.hSoldReason}` : "";

  useEffect(() => {
    setLineHeight(((currentStageIndex + 1) / trackingStages.length) * 100);
  }, [currentStageIndex]);

  return (
    <div className="tracking-container responsive">
      <h2  className="TrackTitle">Track Your Order</h2>
      <div className="order-summary">
        <img src={order.image} alt={order.product} className="order-image responsive-image" />
        <div>
          <p className="product-name">{order.product}</p>
          <p className="order-id">Order ID: {order.id}</p>
          <p className="order-price">Total: ${order.totalPrice}</p>
        </div>
      </div>
      <div className="tracking-timeline">
        <div className="timeline-line" style={{ height: `${lineHeight}%` }}>
          {trackingStages.map((stage, index) => (
            <div key={index} className={`timeline-step ${index <= currentStageIndex ? "completed" : "pending"}`}>
              <FaRegDotCircle className="step-icon" />
              <p className="step-label">{stage}</p>
              {order.status === stage && handleHoldMessage() && (
                <div className="hold-popup">{handleHoldMessage()}</div>
              )}
            </div>
          ))}
        </div>
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