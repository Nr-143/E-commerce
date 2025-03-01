import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import deafultImage from "../../assets/icons/06.jpg"
import "./RecentView.css";

const RecentView = () => {
    const [recentProducts, setRecentProducts] = useState([]);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // const storedProducts = JSON.parse(localStorage.getItem("recentProducts")) || [];
        const storedProducts = [
            {
                "id": "1",
                "name": "Fresh Apples",
                "image": deafultImage,
                "price": 2.99
            },
            {
                "id": "2",
                "name": "Organic Bananas",
                "image": deafultImage,
                "price": 1.49
            },
            {
                "id": "3",
                "name": "Whole Wheat Bread",
                "image": deafultImage,
                "price": 3.29
            },
            {
                "id": "4",
                "name": "Dairy Milk 500ml",
                "image": deafultImage,
                "price": 2.19
            },
            {
                "id": "5",
                "name": "Eggs - Dozen",
                "image": deafultImage,
                "price": 4.50
            }
        ]

        setRecentProducts(storedProducts);
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Enable horizontal scrolling with mouse wheel
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY * 2; // Adjust scroll speed
        };

        container.addEventListener("wheel", handleScroll);
        return () => container.removeEventListener("wheel", handleScroll);
    }, []);

    return (
        <section className="recent-view-section">
            <h2 className="section-title">Recently Viewed</h2>
            <div ref={containerRef} className="recent-view-container">
                {recentProducts.length === 0 ? (
                    <p className="no-recent-text">No recently viewed products.</p>
                ) : (
                    recentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="recent-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} className="recent-image" />
                            <div className="recent-details">
                                <p className="recent-name">{product.name}</p>
                                <p className="recent-price">${product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default RecentView;
