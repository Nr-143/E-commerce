import React, { useState } from "react";
import PlacedOrders from "../../components/PlacedOrderComponent/PlacedOrderComponent";
// import OrderTracking from "../components/OrderTrackin";
import defaultImage from "../../assets/icons/06.jpg";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: "12345",
      product: "Fresh Apples (1kg)",
      date: "2025-02-10",
      status: "Shipped",
      image:defaultImage,
      totalPrice: 5.99,
      updates: [
        { status: "Order Placed", date: "2025-02-08" },
        { status: "Packed", date: "2025-02-09" },
        { status: "Shipped", date: "2025-02-10" },
        { status: "Out for Delivery", date: "Pending", reason: "Weather delay" },
      ],
    },
    {
      id: "67890",
      product: "Organic Bananas (1 Dozen)",
      date: "2025-02-09",
      status: "Delivered",
      image:defaultImage,
      totalPrice: 4.49,
      updates: [
        { status: "Order Placed", date: "2025-02-07" },
        { status: "Packed", date: "2025-02-08" },
        { status: "Shipped", date: "2025-02-09" },
        { status: "Delivered", date: "2025-02-10" },
      ],
    },
  ];

  return (
    <div className="orders-page">
      {!selectedOrder ? (
        <PlacedOrders orders={orders} onSelectOrder={setSelectedOrder} />
      ) : ( ""
        // <OrderTracking order={selectedOrder} />
      )}
    </div>
  );
};

export default OrdersPage;
