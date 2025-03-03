import React from "react";
import "./MobileListing.css";
import defaultImage from "../../assets/icons/06.jpg";
import { useNavigate } from "react-router-dom";

const OrderCardMobile = () => {
    const navigate = useNavigate();

    const orders = [
        {
            id: "123",
            image: defaultImage,
            name: "Wireless Earbuds",
            description: "High-quality wireless earbuds with noise cancellation.",
            oldPrice: 59.99,
            price: 49.99,
            offerEndTime: "2025-03-10T23:59:59Z",
        },
        {
            id: "456",
            image: defaultImage,
            name: "Organic Green Tea",
            description: "Fresh and organic green tea for a healthy lifestyle.",
            oldPrice: 14.99,
            price: 9.99,
            offerEndTime: "2025-03-05T23:59:59Z",
        },
        {
            id: "789",
            name: "Smartphone Stand",
            image: defaultImage,
            description: "Adjustable stand for your smartphone and tablets.",
            oldPrice: 19.99,
            price: 14.99,
            offerEndTime: null,
        },
        {
            id: "101",
            name: "Wireless Charger",
            image: defaultImage,
            description: "Fast-charging wireless pad for all compatible devices.",
            oldPrice: 39.99,
            price: 29.99,
            offerEndTime: "2025-03-12T23:59:59Z",
        },
    ];

    const getTimeLeft = (offerEndTime) => {
        if (!offerEndTime) return null;
        const timeLeft = new Date(offerEndTime) - new Date();
        if (timeLeft <= 0) return "Offer Ended";

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        return `${hours}h ${minutes}m left`;
    };

    return (
        <div className="mobile-order-listing">
            <h2 className="listing-title">My Orders</h2>
            <div className="order-grid">
                {orders.map((order) => (
                    <div key={order.id} className="order-card-mobile">
                        {order.offerEndTime && (
                            <span className="offer-badge">{getTimeLeft(order.offerEndTime)}</span>
                        )}
                        <img
                            src={order.image}
                            alt={order.name}
                            className="order-image"
                            onClick={() => navigate(`/product/${order.id}`)}
                        />
                        <div className="order-info">
                            <h4 className="order-name">{order.name}</h4>
                            <p className="order-desc">{order.description.slice(0, 30)}...</p>
                            <div className="price-section">
                                <span className="old-price">${order.oldPrice.toFixed(2)}</span>
                                <span className="new-price">${order.price.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="order-actions">
                            <button className="buy-btn" onClick={() => navigate(`/checkout/${order.id}`)}>Buy Now</button>
                            <button className="cart-btn" onClick={() => alert("Added to cart!")}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCardMobile;
