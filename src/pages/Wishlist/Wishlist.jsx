import React from "react";
import defaultImage from "../../assets/icons/06.jpg";
import { useNavigate } from "react-router-dom";
import "../Wishlist/Wishlist.css";

const Wishlist = ({ wishlistItems, removeFromWishlist, moveToCart }) => {
    const navigate = useNavigate();
    wishlistItems = [
        {
            id: 1,
            name: "Organic Fresh Apples",
            price: 299,
            description: "Freshly picked organic apples from the best farms.",
            image: defaultImage,
        },
        {
            id: 2,
            name: "Men's Casual Sneakers",
            price: 1499,
            description: "Stylish and comfortable sneakers for everyday wear.",
            image: defaultImage,
        },
        {
            id: 3,
            name: "Wireless Bluetooth Earbuds",
            price: 1999,
            description: "High-quality sound with noise cancellation.",
            image: defaultImage,
        },
        {
            id: 4,
            name: "Cotton T-Shirt for Men",
            price: 499,
            description: "Soft and breathable cotton fabric.",
            image: defaultImage,
        },
        {
            id: 5,
            name: "Pack of 5 Instant Noodles",
            price: 149,
            description: "Quick and delicious instant noodles pack.",
            image: defaultImage,
        },
    ];

    return (
        <div className="wishlist-container">
            <h2 className="wishlist-title">Your Wishlist ❤️</h2>
            {wishlistItems.length > 0 ? (
                <div className="wishlist-grid">
                    {wishlistItems.map((item) => (
                        <div className="wishlist-card" key={item.id}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="wishlist-img"
                                onClick={() => navigate(`/product/${item.id}`)}
                            />
                            <div className="wishlist-info">
                                <p className="wishlist-name">{item.name}</p>
                                <p className="wishlist-description">{item.description}</p>
                                <p className="wishlist-price">₹{item.price}</p>
                                <div className="wishlist-actions">
                                    <button
                                        className="wishlist-btn move-to-cart"
                                        onClick={() => moveToCart(item)}
                                    >
                                        Move to Cart 🛒
                                    </button>
                                    <button
                                        className="wishlist-btn remove"
                                        onClick={() => removeFromWishlist(item.id)}
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="wishlist-empty">Your wishlist is empty. Start adding products! 😊</p>
            )}
        </div>
    );
};

export default Wishlist;
