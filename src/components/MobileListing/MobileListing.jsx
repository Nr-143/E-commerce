import React from "react";
import "./MobileListing.css"
import { useNavigate } from "react-router-dom";

const OrderCardMobile = () => {
    const navigate = useNavigate();

    const orders = [
        {
            id: "123",
            name: "Wireless Earbuds",
            description: "High-quality wireless earbuds with noise cancellation.",
            price: 49.99,
            offerEndTime: "2025-03-10T23:59:59Z",
        },
        {
            id: "456",
            name: "Organic Green Tea",
            description: "Fresh and organic green tea for a healthy lifestyle.",
            price: 9.99,
            offerEndTime: "2025-03-05T23:59:59Z",
        },
        {
            id: "789",
            name: "Smartphone Stand",
            description: "Adjustable stand for your smartphone and tablets.",
            price: 14.99,
            offerEndTime: null, // No offer
        },
    ];

    return (
        <div>
            <h2>My Orders</h2>
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="order-card-mobile"
                    onClick={() => navigate(`/product/${order.id}`)}
                >
                    <h4 className="order-name">{order.name}</h4>
                    <p className="order-desc">{order.description.slice(0, 30)}...</p>
                    <p className="order-price">${order.price.toFixed(2)}</p>
                    {order.offerEndTime && (
                        <span className="offer-badge">
                            Ends: {new Date(order.offerEndTime).toLocaleDateString()}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderCardMobile;
